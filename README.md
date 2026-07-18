# Operation Better Together Website

A responsive, multi-page static website for Operation Better Together, built from the
program's logo, website outline, referral QR code, mission, vision, values, goal, and
slogan. It is a launch-ready starting point &mdash; see "Content still needed before launch"
below for the remaining items to fill in before going live.

## Preview
Open `index.html` in a browser, or run a local web server:

    python -m http.server 8000

Then visit `http://localhost:8000`.

## Pages
- Home
- Our Story
- Community Partners
- Behavioral Health Team
- FAQs
- Resources
- Referrals
- News & Recognition
- Events & Programs
- Contact
- Accessibility

## Content still needed before launch
- Final domain and hosting platform
- Program phone number, hours, and confirmed addresses
- Leadership and clinical-team names, biographies, photos, and credentials
- Partner logos and permission to display them
- Final events and resource-library materials
- Verification that the referral short link remains active
- Privacy policy and any required legal review
- Final accessibility testing

## Contact form
The general contact form (`contact.html`) submits to `ohiooperationbettertogeth@gmail.com`
via [FormSubmit](https://formsubmit.co/), a free form-to-email relay that requires no
backend or API keys. **The first submission after deploying triggers a one-time
confirmation email from FormSubmit to that inbox** &mdash; someone must click the activation
link in it before the form will deliver any further messages. After that, every submission
is emailed to the inbox with the sender's reply-to address set automatically.

Do not use this general form to collect protected health information (PHI). Referrals and
clinical details should go through the secure referral link on the Referrals page instead.
