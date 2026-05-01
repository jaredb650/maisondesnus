# Client V4 Feedback — Context File

Saved 2026-04-24. Re-read these screenshots and the feedback text below at session start before doing analysis.

## Screenshots to re-read

### Comparison pairs (OI = orseundiris.com reference, MdN = our build)
- `/Users/jaredbeguelin/Downloads/OI header.png`
- `/Users/jaredbeguelin/Downloads/MdN header.png`
- `/Users/jaredbeguelin/Downloads/OI footer.png`
- `/Users/jaredbeguelin/Downloads/MdN footer.png`
- `/Users/jaredbeguelin/Downloads/OI filter.png`
- `/Users/jaredbeguelin/Downloads/MdN filter.png`
- `/Users/jaredbeguelin/Downloads/OI preview text.png`
- `/Users/jaredbeguelin/Downloads/MdN preview text.png`

### Singles
- `/Users/jaredbeguelin/Downloads/OI Shop Dropdown.png`
- `/Users/jaredbeguelin/Downloads/MdN Product.png`

### iMessage conversation context
- `/var/folders/w6/3gxyhk953bjbvxscccgb74zh0000gn/T/TemporaryItems/NSIRD_screencaptureui_UKRs2I/Screenshot 2026-04-24 at 7.39.47 PM.png`
- `/var/folders/w6/3gxyhk953bjbvxscccgb74zh0000gn/T/TemporaryItems/NSIRD_screencaptureui_LjP7KQ/Screenshot 2026-04-24 at 7.40.03 PM.png`

> Note: `/var/folders/...` paths are macOS temp screenshot dirs and may be cleaned up between reboots. If they 404, re-request from user.

## Verbatim V4 client feedback

**General Website**
- Reduce font sizes site-wide further

**Header**
- Tighten gap between "MAISON DES NUS" wordmark and "NEW YORK" tag
- Make logo larger
- Shift logo slightly higher
- Spread nav items further apart (OI-style wide gaps)
- Header text/logo color should dynamically adapt to background image (workshop)

**Footer**
- Reduce font sizes further
- Redesign to OI layout: section headers in a LEFT column beside the link list (currently stacked above)

**Search Bar**
- Longer and thinner pill

**Shop Page**
- Make header sticky on shop page (verify behavior)
- Fix Shop dropdown — caret doesn't open the menu (needs click toggle, not hover-only)
- Add more filter options matching OI's filter system (workshop — need OI filter inventory)
- Move "Few Left" / "New" badges from LEFT to RIGHT of card
- Hide badges on hover
- Add zoom-in effect on hover

**Product Page**
- Remove dividing lines between info-row sections
- Smaller fonts
- Only right-column images scroll; left column stays sticky (workshop — current layout has center images / left meta / right form; clarify)
- Hide reviews section until reviews exist
- Match OI exactly — client mentioned a voice note coming with specifics
- "You May Also Like" with exactly 3 products (currently 4)
- Remove sticky bottom Add to Cart
- Match product description/details layout exactly to OI

## User's original ask (paraphrased)
> Make sense of it. Find immediately actionable items vs. items we need to workshop. Come up with a plan. Repeat back understanding.

## Outstanding from V3 (still pending)
- Task #9: Font swap when paid font (PP Editorial New) license is acquired
- Demo data: import `products.csv`, attach images, create "All" collection so "You Might Also Like" populates
- Custom page form: client owes spec
- Reviews app: client to choose Judge.me / Shopify Product Reviews / Yotpo

## Theme deployment
- Working theme: `#160943603931` "Maison des Nus V3" on `mdn-demos.myshopify.com`
- Storefront password: `baufay`
