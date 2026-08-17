from .base import EmailProvider
from ..models.enquiry import EnquiryPayload
import logging

class MockEmailProvider(EmailProvider):
    async def send_enquiry(self, payload: EnquiryPayload) -> bool:
        logging.info(f"Mock email sent for enquiry: {payload.buyer_name}")
        return True