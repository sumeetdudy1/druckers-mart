from typing import Optional
from ..models.enquiry import EnquiryPayload
from ..providers.factory import get_email_provider
from ..providers.base import EmailProvider


class EnquiryService:
    def __init__(self, provider: Optional[EmailProvider] = None):
        self.provider = provider or get_email_provider()

    async def process_enquiry(self, payload: EnquiryPayload) -> bool:
        if payload.honeypot:
            return True  # Pretend to succeed but ignore
        return await self.provider.send_enquiry(payload)