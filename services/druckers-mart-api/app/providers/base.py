from abc import ABC, abstractmethod
from ..models.enquiry import EnquiryPayload

class EmailProvider(ABC):
    @abstractmethod
    async def send_enquiry(self, payload: EnquiryPayload) -> bool:
        pass