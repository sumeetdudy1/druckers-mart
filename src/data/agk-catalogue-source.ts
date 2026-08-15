/**
 * Initial source catalogue for the Druckers Mart live demo.
 *
 * These are source facts from AGK_PRODUCT_CATALOGUE.md only. AGK branding,
 * copy, imagery, company claims, and identity are deliberately not imported.
 * Additional Druckers-owned source rows can be added without changing the
 * ProductRecord shape.
 */
export interface AgkCatalogueSourceRow {
  source_ref: string;
  name: string;
  public_name?: string;
  category: 'pre-press' | 'press' | 'post-press';
  publicly_stated_fields: Record<string, string>;
  source_status: string;
}

export const agkCatalogueSource: AgkCatalogueSourceRow[] = [
  { source_ref: 'agk:india-mart:pre-press:plate-470-620', name: 'Pre-Sensitized Offset Printing Plate', category: 'pre-press', publicly_stated_fields: { size: '470 × 620 mm' }, source_status: 'Verified public AGK listing' },
  { source_ref: 'agk:india-mart:pre-press:technova-470-620', name: 'Technova Offset Printing Plate', category: 'pre-press', publicly_stated_fields: { size: '470 × 620 mm' }, source_status: 'Verified public AGK listing' },
  { source_ref: 'agk:india-mart:pre-press:plate-560-760', name: 'Pre-Sensitized Offset Printing Plate', category: 'pre-press', publicly_stated_fields: { size: '560 × 760 mm' }, source_status: 'Verified public AGK listing' },
  { source_ref: 'agk:india-mart:press:inkredible-magenta-1kg', name: 'Inkredible Turbo Chrom Magenta Printing Ink', category: 'press', publicly_stated_fields: { pack_size: '1 kg' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:inkredible-yellow-1kg', name: 'Inkredible Turbo Chrom Yellow Printing Ink', category: 'press', publicly_stated_fields: { pack_size: '1 kg' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:inkredible-cyan-1kg', name: 'Inkredible Turbo Chrom Cyan Printing Ink', category: 'press', publicly_stated_fields: { pack_size: '1 kg' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:calciumfix-500g', name: 'Bottcher Pro Calciumfix Cleaning Gel', category: 'press', publicly_stated_fields: { pack_size: '500 g' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:offset-wash-25l', name: 'Offset Wash Chemical', category: 'press', publicly_stated_fields: { pack_size: '25 L' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:boettcher-4015-20l', name: 'Boettcher Offset 4015 Printing Ink Wash', category: 'press', publicly_stated_fields: { pack_size: '20 L' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:boettcher-s3012-200kg', name: 'Boettcher S3012 Offset Printing Chemical', category: 'press', publicly_stated_fields: { pack_size: '200 kg' }, source_status: 'Verified public AGK listing; availability to confirm' },
  { source_ref: 'agk:india-mart:press:uv-varnish', name: 'UV Varnish Coating', category: 'press', publicly_stated_fields: {}, source_status: 'Verified public AGK listing; specifications to confirm' },
  { source_ref: 'agk:india-mart:post-press:polyester-corner-tape-19mm', name: 'Polyester Rigid Box Corner Tape', category: 'post-press', publicly_stated_fields: { size: '19 mm' }, source_status: 'Verified public AGK listing' },
  { source_ref: 'agk:india-mart:post-press:cotton-corner-tape-15mm', name: 'Cotton Cloth Rigid Box Corner Tape', category: 'post-press', publicly_stated_fields: { size: '15 mm' }, source_status: 'Verified public AGK listing' },
  { source_ref: 'agk:india-mart:post-press:cotton-corner-tape-18mm', name: 'Cotton Cloth Rigid Box Corner Tape', category: 'post-press', publicly_stated_fields: { size: '18 mm' }, source_status: 'Verified public AGK listing' },
];
