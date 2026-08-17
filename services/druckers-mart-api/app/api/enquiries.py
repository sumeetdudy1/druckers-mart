from fastapi import APIRouter, HTTPException, Depends
from ..models.enquiry import EnquiryPayload
from ..services.enquiry_service import EnquiryService
from ..providers.mock_email import MockEmailProvider

router = APIRouter()

def get_service():
    return EnquiryService(MockEmailProvider())

@router.post("/api/enquiries")
async def create_enquiry(payload: EnquiryPayload, service: EnquiryService = Depends(get_service)):
    if await service.process_enquiry(payload):
        return {"status": "success"}
    raise HTTPException(status_code=500, detail="Submission failed")