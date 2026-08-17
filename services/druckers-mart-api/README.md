# Druckers Mart Enquiry API

Independent Python FastAPI backend for handling enquiry submissions.

## Deployment

### Docker
1. Build the image:
   ```bash
   docker build -t druckers-mart-api .
   ```
2. Run the container:
   ```bash
   docker run -p 8000:8000 --env-file .env druckers-mart-api
   ```

### Coolify / Hostinger
- Configure the container to listen on port 8000.
- Provide required environment variables in the dashboard:
  - `ALLOWED_ORIGINS`
  - `EMAIL_PROVIDER`
  - `EMAIL_API_KEY`
  - `ENQUIRY_TO_EMAIL`
  - `FROM_EMAIL`
- Set health check to `GET /api/health` on port 8000.

## Environment Variables
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins (e.g., `https://druckersmart.com`).
- `EMAIL_PROVIDER`: e.g., `mock`, `resend`, `sendgrid`.
- `EMAIL_API_KEY`: API key for the selected provider.
- `ENQUIRY_TO_EMAIL`: Destination email for enquiries.
- `FROM_EMAIL`: Sender email address.
