# Aqila Digital

Personal portfolio website of **Aqila Beenish**: web developer (HTML & CSS) and lead generation.

Built with plain HTML, CSS and JavaScript only. No frameworks, no build tools.
To view it, double-click `index.html`. No server is needed.

## Files

| File | What it does |
|---|---|
| `index.html` | **Home page.** Intro with code-card, services strip, short About, My skills cards, Featured work (3 sample projects), How I work steps, and the Hire Me band |
| `about.html` | **About page.** My story, skill pills, journey timeline, what I value, and the Hire Me band |
| `skills.html` | **Skills page.** Web Development and Lead Generation cards, "Currently learning", FAQ, and the Hire Me band. No prices are shown anywhere on the site |
| `portfolio.html` | **Portfolio page.** Filter buttons (All Work, Websites, Lead Generation) and 6 sample project cards |
| `contact.html` | **Contact page.** Email, WhatsApp and a form with two tabs ("Hire Me" and "Free 5 Leads"). The form prepares a message to send by email, send on WhatsApp, or copy |
| `styles.css` | **All the styles for every page.** Colours and fonts are saved as variables at the top (`:root`). Also has the layout, phone and tablet views, scroll-reveal styles and keyboard focus outlines |
| `main.js` | **All the JavaScript for every page.** Mobile menu, scroll reveal, footer year, portfolio filter, and the contact form |
| `README.md` | This file |

## Colours and fonts

- Colours: maroon `#6B1E2E`, deep maroon `#45111D`, soft maroon `#8C3446`, peach `#F3B49A`, light peach `#F9D9C8`, beige `#F3E8D8`, cream `#FBF6EF`, text `#2B1A1D`, muted text `#4E3B3E`
- Headings: Playfair Display. Body text: Poppins (both loaded from Google Fonts, so they need an internet connection)

## Contact details used on the site

- Email: drawingacadmey@gmail.com
- WhatsApp: +92 317 6497826 (link: `https://wa.me/923176497826`)

If these ever change, search all files for the old value. The form's email and WhatsApp number are two variables at the top of the contact section in `main.js`.

## How to change things

- **Add a project:** copy one whole `<article class="project">` block in `portfolio.html` (and in `index.html` if you want it on Home). Change the colours, the tag, title, text and chips. Use `data-cat="web"` or `data-cat="leads"` so the filter works.
- **Add the Hire Me band to a page:** copy the `<section class="cta-band">` block to the bottom of that page's `<main>`.
- **Change a colour for the whole site:** edit it once in `:root` at the top of `styles.css`.

## To do

- [ ] Add my LinkedIn link (footer and Contact page)
- [ ] Replace the sample projects with real ones (`portfolio.html` and `index.html`), ideally with real screenshots
- [ ] Remove the "Sample" tags and the "Real client projects will be added soon" note once real projects are in
- [ ] Publish the site (Netlify or GitHub Pages) and add the final web address to the README
- [ ] After publishing, replace `YOUR-SITE-ADDRESS` with the real address in the `og:image` and `twitter:image` tags in the `<head>` of all 5 pages (search for it). Without this, link previews will not show the picture
- [ ] Optional: add a small site icon (favicon) so the browser tab shows a logo
