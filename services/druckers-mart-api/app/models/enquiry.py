from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class EnquiryPayload(BaseModel):
    product_id: Optional[str] = None
    product_name_snapshot: Optional[str] = None
    category: Optional[Literal['pre-press', 'press', 'post-press']] = None
    quantity_requirement: str = Field(..., min_length=1)
    delivery_location: str = Field(..., min_length=1)
    required_by_date: Optional[str] = None
    buyer_name: str = Field(..., min_length=1)
    company: Optional[str] = None
    work_email: EmailStr
    phone: str = Field(..., min_length=1)
    additional_notes: Optional[str] = None
    consent_contact: Literal[True]
    privacy_policy_version: str
    honeypot: Optional[str] = None
    form_started_at: str