# Employment Consultancy - USWTS Website

## Current State
The site has the following main sections in order: Hero, Services, US Visa Services, Media, About, Why Trust Us, How Process Works, Alumni Promise, Testimonials, Contact, Footer. The About section (`id="about"`) ends at line ~2004 in App.tsx, followed immediately by the Why Trust Us section.

## Requested Changes (Diff)

### Add
- New section "From the Founder's Desk" placed immediately after the About section and before the Why Trust Us section.
- Section displays two co-founders side by side: Hassan Ameen and Tyler Chi Wang, both with title "Co-Founder & CEO".
- Two uploaded CEO photos:
  - Hassan Ameen: `/assets/whatsapp_image_2026-04-02_at_11.33.26_pm_2-019d5227-ce61-7501-a1ba-649a70ce82ba.jpeg`
  - Tyler Chi Wang: `/assets/bc3d117d-9844-447e-bb0f-d94e4e7ed3c6-019d5228-0573-7183-9dab-5855dae65433.png`
- Founder's message text (shared, shown once above or between the two cards):
  > "At US Workforce Transition Services, we believe that every individual deserves the opportunity to build a successful future in the United States.
  > As someone who has personally experienced the challenges of navigating careers, visas, and international transitions, I understand how overwhelming the process can be.
  > That is why we are committed to more than just consultancy."

### Modify
- Nothing else changes in the existing sections.

### Remove
- Nothing removed.

## Implementation Plan
1. In `App.tsx`, insert a new `<section>` block with `id="founders"` between the closing tag of the About section and the opening tag of the Why Trust Us section (after line ~2004).
2. Section layout: centered heading "From the Founder's Desk", the shared founder's message paragraph, then two side-by-side cards (responsive: stacked on mobile, 2 columns on md+).
3. Each card: circular or rounded photo, name, title "Co-Founder & CEO", and a short personal tagline.
4. Use motion.div animations consistent with other sections (fadeIn/slideUp on whileInView).
5. Style consistent with site design (navy/teal color palette, rounded cards with subtle shadow).
6. No backend changes needed.
