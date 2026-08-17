
import pytest
import httpx
from app.main import app

@pytest.mark.asyncio
async def test_health():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_valid_enquiry():
    payload = {
        "quantity_requirement": "1000",
        "delivery_location": "Baddi",
        "buyer_name": "Test User",
        "work_email": "test@example.com",
        "phone": "1234567890",
        "consent_contact": True,
        "privacy_policy_version": "v1",
        "form_started_at": "2026-08-17T00:00:00Z"
    }
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/enquiries", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "success"}

@pytest.mark.asyncio
async def test_invalid_enquiry():
    payload = {
        "quantity_requirement": "1000",
        # missing fields...
    }
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/enquiries", json=payload)
    assert response.status_code == 422 # FastAPI validation error
