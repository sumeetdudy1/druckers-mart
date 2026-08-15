# Druckers Mart website

Stage 4.3 system/UI implementation. The live demo is seeded from the approved AGK product catalogue as an initial source, while AGK branding, copy, imagery, company claims, and identity remain separate. The intended production domain is `https://druckersmart.com`; deployment and DNS are not configured here.

## Architecture

- Astro static/SSR-ready project (`output: static` for the current low-cost launch)
- TypeScript data contracts and reusable-component directories
- Structured product data with explicit availability and launch gates
- AGK-derived catalogue source separated from Druckers business claims
- Stable enquiry contract reserved for a future `POST /enquiry/submit` adapter

## Development

```bash
npm install
npm run check
npm run build
npm run dev
```

The scaffold intentionally has no route/page implementation yet. Product records remain empty until Druckers approves launch decisions and per-product statuses.

## Pending before pages

- Add an Astro page entry and shared layout/components in a later stage.
- Add approved product records from the AGK-derived source with explicit `launch_decision` and `availability_status`.
- Implement the development-safe enquiry sink in the later enquiry stage.
- Replace the placeholder site URL in `astro.config.mjs` when the official domain is approved.

No contact destination, customer claim, stock quantity, or delivery coverage is defined here.
