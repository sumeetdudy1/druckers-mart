from ..models.enquiry import EnquiryPayload
from ..providers.base import EmailProvider

class EnquiryService:
    def __init__(self, provider: EmailProvider):
        self.provider = provider

    async def process_enquiry(self, payload: EnquiryPayload) -> bool:
        if payload.honeypot:
            return True # Pretend to succeed but ignore
        return await self.provider.send_enquiry(payload)