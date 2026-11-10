# FixItGuyFL

Static GitHub Pages website for https://www.fixitguyfl.com.

## Updating
- `index.html`: page content, service directory, and FormSubmit form.
- `css/style.css`: responsive navy/orange design.
- `js/script.js`: search, filtering, selected-task summary, and form validation.
- `images/`: generated brand and service imagery. Imagery illustrates service categories, not completed customer work.
- Keep `CNAME` as `www.fixitguyfl.com`.

## Quotes
The form posts directly to `https://formsubmit.co/Owner@FixItGuyFL.com`, preserving the existing endpoint. It sends name, email, optional phone, service street address, optional unit, city, state, ZIP code, request type, job details and selected service tasks. FormSubmit controls its CAPTCHA, confirmation screen and delivery. No API keys are used. End-to-end inbox delivery must be confirmed by the owner.

## Analytics
Existing GTM-MFBPFD99 snippet is preserved.

## Local preview
Serve this directory with a static HTTP server, for example `python -m http.server 4173`. Open http://localhost:4173. No build or dependencies are required for production.

## Validation
Check desktop and mobile layout, service search/category filters, selecting and clearing tasks, navigation, required fields and form destination. Publishing occurs when the deployment branch is updated.

## Project attachments and team estimates
The quote form uses a native multipart POST to FormSubmit.co. Three optional file inputs accept JPG, PNG, and PDF files. Browser validation blocks unsupported extensions and combined files above 10,000,000 bytes; FormSubmit enforces its own upload limits. File type filtering is a convenience, not a security scan. Treat received attachments as untrusted. Customers may instead supply a viewing link for larger files. Files are sent through FormSubmit, not stored in this public repository. Confirm attachment delivery with a real owner-approved submission; do not rely on FormSubmit's archive as an attachment backup.

The specialized directory contains 50 original service categories and 50 additional projects. Its estimate requests are referrals. The customer hires and pays the independent provider directly, and the provider prices and contracts for the work and handles required permits. Confirm license or registration and insurance for the scope before making a referral. Ask the customer before sharing their details with an independent provider.

The additional project ideas draw on the [Angi home spending survey](https://ir.angi.com/node/12961/pdf), the [Houzz renovation survey](https://www.houzz.com/magazine/2026-u-s-houzz-and-home-study-renovation-trends-stsetivw-vs~185090855), and the [Thumbtack project directory](https://www.thumbtack.com/near-me). The list is organized by trade. It reflects common request types rather than a ranking by search volume.

Florida references: [DBPR licensing examples](https://www2.myfloridalicense.com/services-requiring-a-dbpr-license/), [construction contracting and exemptions](https://www.flsenate.gov/Laws/Statutes/2026/Chapter489/All), [building permits](https://www.flsenate.gov/Laws/Statutes/2026/553.79), and [vehicle repair registration](https://www.fdacs.gov/Business-Services/Motor-Vehicle-Repair).
