import type { AvailabilityStatus, ProductRecord } from '../data/product-schema';

export function availabilityLabel(status: AvailabilityStatus): string {
  return status === 'in_stock' ? 'In Stock' : 'Availability to be Confirmed';
}

export function hasApplicableLeadTime(product: ProductRecord): boolean {
  return product.lead_time_note?.verified === true;
}

export const deliveryNotice =
  'In-stock material may generally be delivered the same day from Baddi against advance payment, subject to order timing and logistics.';

export const largerRequirementNotice = 'Lead time: up to 7 business days';

export const liveStockQuantitiesEnabled = false;

export const deliveryCoverage: undefined = undefined;
export const logisticsCharges: undefined = undefined;

export function shouldRenderQuantity(): false {
  return false;
}

export function isAvailabilityStatus(value: string): value is AvailabilityStatus {
  return value === 'in_stock' || value === 'availability_to_be_confirmed';
}

export function isPublicProduct(product: ProductRecord): boolean {
  return product.launch_decision === 'available_at_launch' && isAvailabilityStatus(product.availability_status);
}
