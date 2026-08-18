from typing import Optional
import resend
from .base import EmailProvider
from ..models.enquiry import EnquiryPayload
import logging

logger = logging.getLogger(__name__)


class ResendEmailProvider(EmailProvider):
    def __init__(self, api_key: str, from_email: str, to_email: str):
        self.api_key = api_key
        self.from_email = from_email
        self.to_email = to_email
        resend.api_key = api_key

    async def send_enquiry(self, payload: EnquiryPayload) -> bool:
        try:
            subject = f"New Enquiry: {payload.product_name_snapshot or payload.product_id or 'General'}"
            html_content = self._build_html(payload)
            text_content = self._build_text(payload)

            params = {
                "from": self.from_email,
                "to": [self.to_email],
                "subject": subject,
                "html": html_content,
                "text": text_content,
            }

            response = resend.Emails.send(params)
            logger.info(f"Resend email sent successfully: {response.get('id')}")
            return True
        except Exception as e:
            logger.error(f"Resend email failed: {e}")
            return False

    def _build_html(self, payload: EnquiryPayload) -> str:
        lines = [
            "<h2>New Enquiry Received</h2>",
            "<table style='font-family: sans-serif; border-collapse: collapse;'>",
        ]

        def row(label: str, value: str):
            if value:
                lines.append(
                    f"<tr><td style='padding: 8px; border: 1px solid #ddd; font-weight: bold;'>{label}</td>"
                    f"<td style='padding: 8px; border: 1px solid #ddd;'>{value}</td></tr>"
                )

        row("Product", payload.product_name_snapshot or payload.product_id or "General enquiry")
        row("Category", payload.category or "—")
        row("Quantity / Requirement", payload.quantity_requirement)
        row("Delivery Location", payload.delivery_location)
        row("Required By", payload.required_by_date or "—")
        row("Buyer Name", payload.buyer_name)
        row("Company", payload.company or "—")
        row("Work Email", payload.work_email)
        row("Phone", payload.phone)
        row("Additional Notes", payload.additional_notes or "—")
        row("Consent", "Yes" if payload.consent_contact else "No")
        row("Privacy Policy Version", payload.privacy_policy_version)
        row("Form Started At", payload.form_started_at)

        lines.append("</table>")
        return "\n".join(lines)

    def _build_text(self, payload: EnquiryPayload) -> str:
        parts = [
            "New Enquiry Received",
            "=" * 30,
        ]

        def add(label: str, value: Optional[str]):
            if value:
                parts.append(f"{label}: {value}")

        add("Product", payload.product_name_snapshot or payload.product_id)
        add("Category", payload.category)
        add("Quantity / Requirement", payload.quantity_requirement)
        add("Delivery Location", payload.delivery_location)
        add("Required By", payload.required_by_date)
        add("Buyer Name", payload.buyer_name)
        add("Company", payload.company)
        add("Work Email", payload.work_email)
        add("Phone", payload.phone)
        add("Additional Notes", payload.additional_notes)
        add("Consent", "Yes" if payload.consent_contact else "No")
        add("Privacy Policy Version", payload.privacy_policy_version)
        add("Form Started At", payload.form_started_at)

        return "\n".join(parts)