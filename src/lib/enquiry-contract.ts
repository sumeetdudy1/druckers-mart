export const enquiryEndpoint = '/enquiry/submit' as const;

export interface EnquiryPayload {
  product_id?: string;
  product_name_snapshot?: string;
  category?: 'pre-press' | 'press' | 'post-press';
  quantity_requirement: string;
  delivery_location: string;
  required_by_date?: string;
  buyer_name: string;
  company?: string;
  work_email: string;
  phone: string;
  additional_notes?: string;
  consent_contact: true;
  privacy_policy_version: string;
  honeypot: string;
  form_started_at: string;
}

export interface EnquiryResponse {
  accepted: boolean;
  errors?: Record<string, string>;
}

/** Adapter boundary for the future email/CRM integration. */
export interface EnquirySink {
  submit(payload: EnquiryPayload): Promise<EnquiryResponse>;
}

/** Development sink is intentionally not implemented in Stage 4.1. */
export const developmentSink = 'local-jsonl-or-sqlite-outside-public-directory' as const;

/** Future route contract; this scaffold does not add a live endpoint yet. */
export const submitEnquiry = async (
  payload: EnquiryPayload,
): Promise<EnquiryResponse> => {
  void payload;
  throw new Error('Enquiry submission is not implemented in Stage 4.1 scaffold.');
};
