/** Approved Druckers business claims only. Keep separate from catalogue records. */
export const druckersBusiness = {
  legalName: 'Druckers Mart Private Limited',
  publicDescription:
    'Druckers Mart Private Limited is a B2B supplier of printing and packaging consumables, serving printers, packaging converters, and other commercial buyers with production-focused products and supply support.',
  location: 'Baddi, Solan, Himachal Pradesh, India',
  phone: '+919968275213',
  whatsapp: '+919968275213',
  email: 'druckersmart@gmail.com',
} as const;

export const supplyRules = {
  availabilityStatuses: ['In Stock', 'Availability to be Confirmed'],
  sameDayNote:
    'In-stock material may generally be delivered the same day from Baddi against advance payment, subject to order timing and logistics.',
  largerRequirementNote: 'Lead time: up to 7 business days',
  showLiveStockQuantities: false,
  deliveryCoverage: undefined,
  logisticsCharges: undefined,
} as const;

export const publicContact = druckersBusiness;