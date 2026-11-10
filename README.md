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

## Project attachments and team estimates
The quote form uses a native multipart POST to FormSubmit.co. Three optional file inputs accept JPG, PNG, and PDF files. Browser validation blocks unsupported extensions and combined files above 10,000,000 bytes; FormSubmit enforces its own upload limits. File type filtering is a convenience, not a security scan. Treat received attachments as untrusted. Customers may instead supply a viewing link for larger files. Files are sent through FormSubmit, not stored in this public repository. Confirm attachment delivery with a real owner-approved submission; do not rely on FormSubmit's archive as an attachment backup.

The team section describes subcontractor availability and estimate requests. It does not assert any specific license, insurance, or permit status. Confirm scope and professional requirements before accepting work.
