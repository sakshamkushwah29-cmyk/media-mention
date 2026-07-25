# DESIGN.md: Thinkin Birds Rebuilt

## Source
- **URL**: https://www.thinkinbirds.com/
- **Capture Date**: 2026-07-18
- **Evidence**: Extracted from local source HTML (`www_thinkinbirds_com.html`), parsed CSS stylesheets, and generated visual representation models.

## Reference Screenshot
![Full-page screenshot of Thinkin Birds](file:///Users/prathamsinghkushwah/thinkin-birds-rebuilt/.firecrawl/thinkinbirds-screenshot.jpg)

Use this screenshot as the visual source of truth for layout, hierarchy, density, and feel. Tokens below describe the same page in machine-readable form.

## Design Summary
Thinkin Birds is a premium, high-conversion design subscription agency. The visual language is high-contrast, playful yet professional, combining bold modernist typography, clean layout containers, and flat vector bird-themed graphics. The site uses a "flat" hierarchy to quickly steer visitors from a punchy hero section to a portfolio, pricing details, and booking call-to-actions.

## Design Tokens

### Colors
- **Brand Crimson Red** (Primary Accent): `#9762fd`
- **Dark Charcoal Anthracite** (Secondary Background & Text): `#282829`
- **Soft Light Gray** (Container background): `#fafafa`
- **Peach/Coral** (Secondary Accent): `#ff715b`
- **Light Peach** (Accent Background): `#ffbba6`
- **Pure Black**: `#000000`
- **Pure White**: `#ffffff`
- **Accent Link Blue**: `#0050bd`
- **Light Accent Blue**: `#3898ec`

### Typography
- **Primary Headings**: `MORTEND BOLD` (bold, geometric display sans-serif) fallback to `Impact`, `Arial Black`, `sans-serif`.
- **Secondary Headings & UI**: `Gilroy` (Light, Regular, Medium, Bold, Heavy) fallback to `Inter`, `system-ui`, `sans-serif`.
- **Stylized Serif Copy**: `Merriweather` (for quotes and specific italicized labels) fallback to `Georgia`, `serif`.
- **Monospace accents**: `Inconsolata` fallback to `monospace`.

### Spacing and Layout
- **Container Max-Width**: `1440px` (`container1440` in source) centered with padding `0 24px` on mobile/tablet.
- **Section Rhythm**: Heavy vertical padding (e.g., `80px` to `120px` top/bottom).
- **Radius**: Medium-large border-radius on cards (`12px` to `16px`).
- **Borders**: Sharp solid borders (`2px solid #282829` or `#000000`).
- **Gaps**: `24px` for grid items, `16px` for flex layouts.

## Components

### 1. Navigation Bar
- Horizontal sticky navigation with a centered logo.
- Main links: `How it works`, `Portfolio`, `Services`, `Pricing`, `Benefits`.
- CTA Button: "Book free demo" (`#9762fd` background, white text).
- Includes mobile collapsible slide-out drawer menu.

### 2. Hero Section
- Centered grid with heavy typography: `Presentin' Brand & Product Design Magicians Who Make You Fly High`.
- Sub-text with Gilroy Medium: `Fast & Scalable design membership for your biz without breaking the bank`.
- Huge call-to-action button: `Reserve Free Call | Limited Slots left` with timer/clock icon.

### 3. Portfolio Carousel / Scroller
- Auto-scrolling grid featuring beautiful, high-contrast case studies.
- Slide entries for active projects:
  - **Royal Empire** (Branding & Advertisement)
  - **Shabana Bakery** (Rebranding & Social Media)
  - **Diet** (Branding & Design)
  - **Double Decker Diner** (Branding & Social Media)
  - **OhNo** (Branding & Social Media)
  - **Jagsons** (Branding & Advertisement)

### 4. How it Works (3 Easy Steps)
- Numbered list layout detailing the client engagement model:
  1. **Subscribe**: Queue up as many requests as you’d like on Trello. We’ll keep on delivering one by one.
  2. **Request**: Your request is hatched within 24-48 hours.
  3. **Review**: Tweak until it's pitch-perfect.
- CTA Button: `Book a call`.

### 5. Membership Benefits
- Grid cards with checks/arrows highlighting service perks:
  - Unlimited designs
  - Elite designers
  - Unlimited revisions
  - Flexible & Scalable
  - Avian speed delivery
  - No contracts ever
  - Affordable pricing
  - Async communication
  - Prompt & reliable

### 6. Services list (From / To)
- Columns lists for what the artists cover:
  - Brand Identity, Web Design, App Design, Pitch Decks, Logo Design, Social Media Graphics, presentations, etc.
- Missing service CTA: `Need A Service That's Missing On The List? Reach Out To Us...`

### 7. Pricing Matrix
- Comparison cards for:
  - **Falcon Plan** ($2495/mo): 1 request at a time, unlimited revisions, 24-48 hr delivery, website/app design, pitch decks, brand design.
  - **Eagle Plan** ($4495/mo): 2 requests at a time, priority support, Webflow development, plus everything in Falcon.
  - Callout for **14-day trial at $299**.

### 8. FAQ Section
- Accordion component with collapsible answers answering speed of delivery, request limits, tools used (Figma, Trello), cancellation options, refund policy.

### 9. Testimonials
- Avatar circles, star ratings, and review cards.
- Testimonials from clients (e.g. Vijay Rathod, Founder at OhNo Xperience).

### 10. Footer
- Links for `PRIVACY POLICY`, `TERMS OF SERVICE`, `CONTACT US`, and copyright notice: `© 2025 . All rights reserved`.

## Page Patterns
- **Main Page Sequence**: Nav → Hero → Portfolio Carousel → Trusted By → 3 Easy Steps → Benefits → Services → Case Studies Grid → Pricing Matrix → FAQs → Testimonials → Final CTAs → Footer.
- Sub-pages/Modals: Detailed views for the 6 case studies (/royal-empire, etc.).

## Agent Build Instructions
1. Initialize standard **React + Vite** template.
2. Establish a responsive navbar that collapses on mobile.
3. Import google fonts `Inconsolata`, `Merriweather`, and map display fonts to a custom typeface (we'll package clean web-safe fallbacks for Gilroy and Mortend).
4. Implement the custom styling system in `index.css` using custom properties/CSS variables for colors, spacing, and typography.
5. Create reusable components: `<Button>`, `<Card>`, `<SectionHeader>`, `<FAQAccordion>`, `<TestimonialCard>`, `<PricingCard>`.
6. Implement a local dev environment running on port 3000 or default Vite port.

## Rerun Inputs
- **workflow**: firecrawl-website-design-clone
- **source_url**: https://www.thinkinbirds.com/
- **target_stack**: React + Vite + CSS Variables
- **output**: DESIGN.md
