import type { ProductRecord, ProductCategory } from './product-schema';
import { agkCatalogueSource } from './agk-catalogue-source.ts';

/**
 * Initial Druckers live-demo catalogue, seeded from the approved AGK source.
 * Source provenance remains explicit; later Druckers rows use the same shape.
 * Availability is deliberately not inferred as in-stock.
 */

const categoryLabelMap: Record<ProductCategory, string> = {
  'pre-press': 'Pre-press',
  press: 'Press',
  'post-press': 'Post-press',
} as const;

export const products: ProductRecord[] = agkCatalogueSource.map((source): ProductRecord => {
  const id = source.source_ref.replace(/^agk:india-mart:/, '').replaceAll(':', '-');
  const specs = Object.fromEntries(
    Object.entries(source.publicly_stated_fields).map(([key, value]) => [key, { value, verified: true }]),
  );
  const displayName = source.public_name ?? source.name
    .replace('Technova Offset Printing Plate', 'Offset Plate')
    .replace('Inkredible Turbo Chrom ', 'Offset Printing Ink — ')
    .replace('Bottcher Pro Calciumfix Cleaning Gel', 'Press Cleaning Gel')
    .replace('Boettcher Offset 4015 Printing Ink Wash', 'Offset Printing Ink Wash')
    .replace('Boettcher S3012 Offset Printing Chemical', 'Offset Printing Chemical')
    .replace('Pre-Sensitized Offset Printing Plate', 'Pre-sensitized Offset Plate')
    .replace('Polyester Rigid Box Corner Tape', 'Polyester Rigid Box Corner Tape')
    .replace('Cotton Cloth Rigid Box Corner Tape', 'Cotton Cloth Rigid Box Corner Tape');
  return {
    id,
    name: displayName,
    category: source.category as ProductCategory,
    availability_status: 'availability_to_be_confirmed',
    launch_decision: 'available_at_launch',
    claim_class: 'agk_catalogue',
    source_ref: source.source_ref,
    specs,
  };
});

export function publicProducts(): ProductRecord[] {
  return products.filter((product) => product.launch_decision === 'available_at_launch');
}

export function productCategoryLabel(category: ProductCategory): string {
  return categoryLabelMap[category] ?? 'Press';
}

export function sourceCatalogueCount(): number {
  return agkCatalogueSource.length;
}
