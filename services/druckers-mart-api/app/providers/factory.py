from typing import Optional
from .base import EmailProvider
from .mock_email import MockEmailProvider
from .resend_email import ResendEmailProvider
from ..models.enquiry import EnquiryPayload
import os
import logging

logger = logging.getLogger(__name__)


def get_email_provider() -> EmailProvider:
    """Factory function to create the appropriate email provider based on environment configuration."""
    provider_type = os.getenv("EMAIL_PROVIDER", "mock").lower()

    if provider_type == "mock":
        logger.info("Using MockEmailProvider (development/testing)")
        return MockEmailProvider()

    elif provider_type == "resend":
        api_key = os.getenv("EMAIL_API_KEY")
        from_email = os.getenv("FROM_EMAIL")
        to_email = os.getenv("ENQUIRY_TO_EMAIL")

        missing = []
        if not api_key:
            missing.append("EMAIL_API_KEY")
        if not from_email:
            missing.append("FROM_EMAIL")
        if not to_email:
            missing.append("ENQUIRY_TO_EMAIL")

        if missing:
            raise ValueError(
                f"Resend provider selected but missing required environment variables: {', '.join(missing)}. "
                f"Set these in your environment or switch to 'mock' provider for testing."
            )

        logger.info(f"Using ResendEmailProvider (from: {from_email}, to: {to_email})")
        return ResendEmailProvider(api_key=api_key, from_email=from_email, to_email=to_email)

    else:
        raise ValueError(
            f"Unknown EMAIL_PROVIDER: '{provider_type}'. Supported values: 'mock', 'resend'"
        )