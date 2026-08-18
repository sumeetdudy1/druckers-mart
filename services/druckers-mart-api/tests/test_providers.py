import pytest
import httpx
from app.main import app
from app.providers.factory import get_email_provider
from app.providers.mock_email import MockEmailProvider
from app.providers.resend_email import ResendEmailProvider
from app.models.enquiry import EnquiryPayload


@pytest.fixture(autouse=True)
def clean_env(monkeypatch):
    """Ensure each test starts with a clean email environment."""
    for var in ["EMAIL_PROVIDER", "EMAIL_API_KEY", "FROM_EMAIL", "ENQUIRY_TO_EMAIL"]:
        monkeypatch.delenv(var, raising=False)
    monkeypatch.setenv("EMAIL_PROVIDER", "mock")
    yield
    for var in ["EMAIL_PROVIDER", "EMAIL_API_KEY", "FROM_EMAIL", "ENQUIRY_TO_EMAIL"]:
        monkeypatch.delenv(var, raising=False)


# 1. MOCK MODE TESTS
@pytest.mark.asyncio
async def test_mock_provider_default():
    """Mock provider should be selected by default when EMAIL_PROVIDER is mock."""
    provider = get_email_provider()
    assert isinstance(provider, MockEmailProvider)


@pytest.mark.asyncio
async def test_mock_provider_empty_env():
    """Mock provider should be selected when EMAIL_PROVIDER is not set."""
    import os
    os.environ.pop("EMAIL_PROVIDER", None)
    provider = get_email_provider()
    assert isinstance(provider, MockEmailProvider)


@pytest.mark.asyncio
async def test_mock_provider_delivers_successfully():
    """Mock provider should always return True (success)."""
    provider = MockEmailProvider()
    payload = EnquiryPayload(
        quantity_requirement="1000",
        delivery_location="Baddi",
        buyer_name="Test User",
        work_email="test@example.com",
        phone="1234567890",
        consent_contact=True,
        privacy_policy_version="v1",
        form_started_at="2026-08-17T00:00:00Z",
    )
    result = await provider.send_enquiry(payload)
    assert result is True


# 2. PRODUCTION PROVIDER SELECTION
@pytest.mark.asyncio
async def test_resend_provider_selected_with_config():
    """Resend provider should be selected when EMAIL_PROVIDER=resend and all vars present."""
    import os
    os.environ["EMAIL_PROVIDER"] = "resend"
    os.environ["EMAIL_API_KEY"] = "re_test_key_123"
    os.environ["FROM_EMAIL"] = "noreply@druckersmart.com"
    os.environ["ENQUIRY_TO_EMAIL"] = "enquiries@druckersmart.com"
    provider = get_email_provider()
    assert isinstance(provider, ResendEmailProvider)
    assert provider.api_key == "re_test_key_123"
    assert provider.from_email == "noreply@druckersmart.com"
    assert provider.to_email == "enquiries@druckersmart.com"


@pytest.mark.asyncio
async def test_unknown_provider_raises():
    """Unknown EMAIL_PROVIDER value should raise ValueError."""
    import os
    os.environ["EMAIL_PROVIDER"] = "sendgrid"
    with pytest.raises(ValueError, match="Unknown EMAIL_PROVIDER"):
        get_email_provider()


# 3. MISSING CONFIGURATION TESTS
@pytest.mark.asyncio
async def test_resend_missing_api_key():
    """Resend selected but missing EMAIL_API_KEY should raise ValueError."""
    import os
    os.environ["EMAIL_PROVIDER"] = "resend"
    os.environ.pop("EMAIL_API_KEY", None)
    os.environ["FROM_EMAIL"] = "noreply@druckersmart.com"
    os.environ["ENQUIRY_TO_EMAIL"] = "enquiries@druckersmart.com"
    with pytest.raises(ValueError, match="EMAIL_API_KEY"):
        get_email_provider()


@pytest.mark.asyncio
async def test_resend_missing_from_email():
    """Resend selected but missing FROM_EMAIL should raise ValueError."""
    import os
    os.environ["EMAIL_PROVIDER"] = "resend"
    os.environ["EMAIL_API_KEY"] = "re_test_key_123"
    os.environ.pop("FROM_EMAIL", None)
    os.environ["ENQUIRY_TO_EMAIL"] = "enquiries@druckersmart.com"
    with pytest.raises(ValueError, match="FROM_EMAIL"):
        get_email_provider()


@pytest.mark.asyncio
async def test_resend_missing_to_email():
    """Resend selected but missing ENQUIRY_TO_EMAIL should raise ValueError."""
    import os
    os.environ["EMAIL_PROVIDER"] = "resend"
    os.environ["EMAIL_API_KEY"] = "re_test_key_123"
    os.environ["FROM_EMAIL"] = "noreply@druckersmart.com"
    os.environ.pop("ENQUIRY_TO_EMAIL", None)
    with pytest.raises(ValueError, match="ENQUIRY_TO_EMAIL"):
        get_email_provider()


# 4. ENQUIRY DELIVERY HANDLING
@pytest.mark.asyncio
async def test_api_enquiry_endpoint_mock_mode():
    """POST /api/enquiries should succeed in mock mode."""
    payload = {
        "quantity_requirement": "1000",
        "delivery_location": "Baddi",
        "buyer_name": "Test User",
        "work_email": "test@example.com",
        "phone": "1234567890",
        "consent_contact": True,
        "privacy_policy_version": "v1",
        "form_started_at": "2026-08-17T00:00:00Z",
    }
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/enquiries", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "success"}


@pytest.mark.asyncio
async def test_api_enquiry_endpoint_invalid_payload():
    """POST /api/enquiries with missing required fields should return 422."""
    payload = {
        "quantity_requirement": "1000",
        # missing buyer_name, work_email, etc.
    }
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/enquiries", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_api_enquiry_honeypot_returns_success():
    """Honeypot field populated should return success without sending email."""
    payload = {
        "quantity_requirement": "1000",
        "delivery_location": "Baddi",
        "buyer_name": "Test User",
        "work_email": "test@example.com",
        "phone": "1234567890",
        "consent_contact": True,
        "privacy_policy_version": "v1",
        "form_started_at": "2026-08-17T00:00:00Z",
        "honeypot": "spam",
    }
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/enquiries", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "success"}


@pytest.mark.asyncio
async def test_resend_provider_builds_html_and_text():
    """Resend provider should build valid HTML and text content from payload."""
    import os
    os.environ["EMAIL_PROVIDER"] = "resend"
    os.environ["EMAIL_API_KEY"] = "re_test_key_123"
    os.environ["FROM_EMAIL"] = "noreply@druckersmart.com"
    os.environ["ENQUIRY_TO_EMAIL"] = "enquiries@druckersmart.com"
    provider = get_email_provider()
    payload = EnquiryPayload(
        product_name_snapshot="Business Card",
        category="pre-press",
        quantity_requirement="5000",
        delivery_location="Mumbai",
        required_by_date="2026-09-01",
        buyer_name="Jane Doe",
        company="Acme Corp",
        work_email="jane@acme.com",
        phone="+919999999999",
        additional_notes="Need glossy finish",
        consent_contact=True,
        privacy_policy_version="v2",
        form_started_at="2026-08-17T00:00:00Z",
    )
    html = provider._build_html(payload)
    text = provider._build_text(payload)
    assert "Business Card" in html
    assert "Jane Doe" in html
    assert "Acme Corp" in text
    assert "Mumbai" in text