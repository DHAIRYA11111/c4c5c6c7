# Shiv Prem Agencies

A premium storefront starter for candle fragrances and aroma oils.

## Current starter scope

- Responsive botanical storefront homepage
- Product catalogue data layer in `lib/catalog.ts`
- Standard pack sizes: 500 ml and 1 kg through 10 kg
- Custom quantity placeholder in the product model
- Premium green, cream, and botanical visual system
- No credentials or external services committed

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Next implementation milestones

1. Replace the seed catalogue in `lib/catalog.ts` with the verified fragrance list from the supplied PDF.
2. Add Prisma/PostgreSQL models for products, variants, inventory, customers, addresses, and orders.
3. Add Auth.js (or managed auth), protected account routes, and server-side admin authorization.
4. Add cart, checkout, order creation, and payment-provider-ready APIs.
5. Add the admin dashboard for catalogue, pricing, inventory, customers, and orders.

Prices currently act as configurable starter values and should be verified before launch.
