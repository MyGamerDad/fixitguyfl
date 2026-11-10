# FixItGuyFL

Static GitHub Pages website for https://www.fixitguyfl.com.

## Updating
- `index.html`: page content, service directory, and FormSubmit form.
- `css/style.css`: responsive navy/orange design.
- `js/script.js`: search, filtering, selected-task summary, and form validation.
- `images/`: generated brand and service imagery. Imagery illustrates service categories, not completed customer work.
- Keep `CNAME` as `www.fixitguyfl.com`.

## Quotes
The form posts directly to `https://formsubmit.co/Owner@FixItGuyFL.com`, preserving the existing endpoint. It sends name, email, optional phone, ZIP code, job details and selected service tasks. FormSubmit controls its CAPTCHA, confirmation screen and delivery. No API keys are used. End-to-end inbox delivery must be confirmed by the owner.

## Analytics
Existing GTM-MFBPFD99 snippet is preserved.

## Local preview
Serve this directory with a static HTTP server, for example `python -m http.server 4173`. Open http://localhost:4173. No build or dependencies are required for production.

## Validation
Check desktop and mobile layout, service search/category filters, selecting and clearing tasks, navigation, required fields and form destination. Publishing occurs when the deployment branch is updated.
