# Shiv Prem Agencies

A premium storefront for candle fragrances and aroma oils.

## Current implementation

- Next.js App Router + TypeScript starter
- Botanical green, cream, and earthy visual system
- Responsive landing page at `/`
- Searchable, filterable catalogue at `/catalogue`
- Candle fragrance and aroma oil categories
- Pack options from 500 ml through 10 kg
- Custom kg input in the catalogue
- Client-side cart at `/cart` with localStorage persistence
- Central pricing and quantity validation helpers in `lib/pricing.ts`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000, then visit `/catalogue`.

## Important catalogue note

The current data in `lib/catalog.ts` is a starter catalogue. Replace it with the complete, verified fragrance list from the supplied PDF before launch. Starter prices are configurable placeholders and must be verified before accepting orders.

## Next milestones

1. Import and verify the complete supplied fragrance list.
2. Add Prisma/PostgreSQL persistence for products, variants, inventory, customers, addresses, and orders.
3. Add secure authentication and protected customer/admin routes.
4. Connect cart checkout and payment-provider-ready order creation.
5. Add the admin dashboard for catalogue, pricing, inventory, customers, and orders.
