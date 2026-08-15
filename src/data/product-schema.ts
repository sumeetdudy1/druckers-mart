export const productCategories = ['pre-press', 'press', 'post-press'] as const;
export type ProductCategory = (typeof productCategories)[number];

export const availabilityStatuses = [
  'in_stock',
  'availability_to_be_confirmed',
] as const;
export type AvailabilityStatus = (typeof availabilityStatuses)[number];

export const launchDecisions = ['available_at_launch', 'not_listed'] as const;
export type LaunchDecision = (typeof launchDecisions)[number];

export const claimClasses = ['agk_catalogue', 'druckers_business'] as const;
export type ClaimClass = (typeof claimClasses)[number];

export interface VerifiedValue {
  value: string;
  verified: boolean;
}

export interface ProductRecord {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  availability_status: AvailabilityStatus;
  launch_decision: LaunchDecision;
  claim_class: ClaimClass;
  source_ref: string;
  brand?: {
    name: string;
    approved_for_display: boolean;
  };
  specs?: Record<string, VerifiedValue>;
  application?: VerifiedValue;
  pack_sizes?: VerifiedValue[];
  size?: VerifiedValue;
  weight?: VerifiedValue;
  volume?: VerifiedValue;
  lead_time_note?: VerifiedValue;
  images?: Array<{
    src: string;
    alt: string;
    licensed: boolean;
  }>;
}

export function isPublicProduct(product: ProductRecord): boolean {
  return product.launch_decision === 'available_at_launch'
    && availabilityStatuses.includes(product.availability_status)
    && product.name.length > 0
    && product.source_ref.length > 0;
}

export function verifiedFields(product: ProductRecord): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const [key, field] of Object.entries(product.specs ?? {})) {
    if (field.verified) fields[key] = field.value;
  }
  return fields;
}
