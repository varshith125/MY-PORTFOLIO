# Varshith portfolio

React and Vite with Framer Motion and GSAP. Run `npm install` then `npm run dev` in this directory. Production: `npm run build`; output is `dist`.

All published facts are maintained in `src/data/profile.js`, transcribed from the supplied resume; DocuLens is an additional project in development. The project illustrations are labelled concept interfaces.

The assistant runs entirely in the browser with deterministic profile lookup (`src/lib/chat.js`). No AI key, external model, backend, or network request is needed. It supports project names, skills, education, experience, certifications, testing, and contact questions, and declines to invent missing information. It is not a general-purpose ChatGPT model.

The legacy backend is not used by this frontend. Do not deploy or configure it for the portfolio assistant.

Animations: GSAP hero entrance and scroll motion; Framer Motion section reveals, navigation, skills, project expansion, and chat. Reduced-motion preferences are respected. Source updates require rebuilding before static deployment.

## Resume and project screenshots
The hero links to `public/resume.html`, a printable resume rendered from the profile data by `make-resume.mjs`. The production build regenerates it automatically. It is a web rendition, not the original uploaded PDF.

For real project screenshots, add an image under `public/projects/`, then set `screenshot: "/projects/filename.webp"` and `screenshotAlt` on the matching project in `src/data/profile.js`. Only use actual app captures with private data removed. Until supplied, the site retains concept illustrations.

Responsive layouts include narrow phones, tablet stacking, touch targets, wrapping text, and reduced-motion support. Device/browser visual verification is still pending.
