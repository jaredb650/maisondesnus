# Demo Products — Import Instructions

Purpose: placeholder products so collection + PDP pages actually render with content for the client preview. These are throwaway — replace with her real catalog when she's ready.

## What's in this folder

- `products.csv` — 6 products, 26 variants (sizes XS–XL). Imports into Shopify with titles, prices, variants, stock, tags.
- `images/` — 12 curated product images (2 per product), named by product handle.

## Step 1 — Import the CSV

1. In the Shopify admin at `mdn-demos.myshopify.com/admin`, go to **Products** (left sidebar)
2. Top right → **Import**
3. Upload `products.csv`
4. Preview shows 6 new products — confirm and click **Import products**
5. Wait for import to finish (a minute or two). You'll get 6 products, 26 variants total.

## Step 2 — Attach images (6 products × 2 images = ~15 min)

CSV import doesn't include images because Shopify needs public URLs for that. Do this manually:

For **each product** in the admin (Products → click product name):

1. Scroll to the **Media** section (below the title)
2. Click **Add** → **Add files** (or drag-drop)
3. Pick the 2 matching images from `demo-products/images/` — they're named with the product handle:
   - `signature-hoodie-navy_01.jpg` + `signature-hoodie-navy_02.jpg` → Signature Hoodie — Navy
   - `signature-sweatpants-navy_01.jpg` + `_02.jpg` → Signature Sweatpants — Navy
   - `cropped-sweatshirt-red_01.jpg` + `_02.jpg` → Cropped Sweatshirt — Red
   - `sweatshorts-red_01.jpg` + `_02.jpg` → Sweatshorts — Red
   - `playing-cards-hoodie-navy_01.jpg` + `_02.jpg` → Playing Cards Hoodie — Navy
   - `turtleneck-red_01.jpg` + `_02.jpg` → Turtleneck Sweatshirt — Red
4. First image uploaded = featured image (shows on collection grid). Second = hover state + product page secondary.
5. **Save** the product.

Repeat for all 6 products.

## Step 3 — Create a collection (optional but recommended)

So the collection page has something to point at:

1. Products → **Collections** → **Create collection**
2. Title: `All` (slug `all` — the theme links `/collections/all` from the header's SHOP link)
3. Conditions: Automated → "Product tag is equal to" → doesn't matter what, OR easier: switch to Manual and just add all 6 products
4. Save

Now the theme's SHOP link and filter bar will render a real 4/2 grid.

## Products at a glance

| Handle | Title | Price | Sizes | Tags |
|---|---|---|---|---|
| signature-hoodie-navy | Signature Hoodie — Navy | $145 | XS–XL | new, unisex |
| signature-sweatpants-navy | Signature Sweatpants — Navy | $115 | XS–XL | unisex |
| cropped-sweatshirt-red | Cropped Sweatshirt — Red | $125 | XS–L | final-few, womens |
| sweatshorts-red | Sweatshorts — Red | $85 | XS–L | womens |
| playing-cards-hoodie-navy | Playing Cards Hoodie — Navy | $165 | S–XL | new, unisex |
| turtleneck-red | Turtleneck Sweatshirt — Red | $135 | XS–L | new, womens |

The `new` and `final-few` tags trigger badges on product cards in the theme.

## When she's ready with real products

Delete these via Admin → Products → select all → Delete. Fresh start, ~30 seconds.
