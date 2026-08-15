# Stage 4.1 architecture

## Runtime

Astro with static output for a low-cost deployment. Astro remains SSR-compatible if output mode is changed later. The initial live demo is seeded from the approved AGK catalogue through an explicit source adapter; additional Druckers products use the same ProductRecord contract.

## Boundaries

- `src/data/agk-catalogue-source.ts`: AGK-derived source boundary only.
- `src/data/druckers-business.ts`: approved Druckers company/supply claims only.
- `src/data/product-schema.ts`: canonical product contract and public eligibility helpers.
- `src/data/products.ts`: launch catalogue (intentionally empty in scaffold).
- `src/lib/availability.ts`: availability-language and rendering guards.
- `src/lib/enquiry-contract.ts`: stable UI-to-adapter enquiry contract; no endpoint implementation yet.
- `src/components/`: reusable UI components, to be added in the page implementation stage.
- `src/layouts/`: shared layouts, to be added in the page implementation stage.
- `src/pages/`: public routes, deliberately empty in Stage 4.1.

## Data safety

A product is not public merely because it exists in the AGK source. It needs an explicit Druckers `launch_decision` and a valid `availability_status`. Unverified fields are omitted by contract. Live quantities, pricing, contacts, delivery coverage, and logistics charges are not represented.

## Enquiries

The form will later post to `POST /enquiry/submit`. The contract already supports a local JSONL/SQLite development sink and a future email/CRM adapter. No email/CRM destination exists in this scaffold.

## No page implementation

This stage deliberately does not create an `index.astro`, public routes, page copy, product cards, or visual CSS. That work belongs to the next approved implementation stage.

## Open configuration

`astro.config.mjs` contains a non-production placeholder `site` URL because the official domain is not yet approved. It must be replaced before canonical URLs or deployment are configured.
