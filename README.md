# SmartReads

# Premium Digital Library System for Authors, Readers, and Publishers

**Project Owner:** Niyonkuru Shema Arsene

---

## Objective

Building a modern, non-standard, interactive UI that reproduces the core layout, typography and scroll-driven experience of the reference cinematic site (`https://wakanda-forever-master.dogstudio-dev.co/zerolimits`) while replacing the heavy 3D model with a creative alternative that preserves the immersive, cinematic feel.

---

## Deliverables

- Link to the live deployed site: `https://smart-reads-psi.vercel.app/`
- Repository with source code: `https://github.com/Shema-arsene/SmartReads`

---

## Summary of what I implemented

This project reproduces the visual and interaction essence of the reference site with the following design decisions:

- **Framework & tools:** Next.js, Node.js/Express.js, Tailwind CSS (v4), ShadCn.

- **Features:**

---

## Project structure

```
app/
├─ api/
├─ about/
├─ audio-books/
├─ book-insights/
├─ checkout/
├─ contact/
├─ context/
├─ e-books/
├─ profile/
├─ publish/
├─ signin/
├─ signup/
├─ components/
│  ├─ ui/
│  ├─ alert-dialog.tsx              # Component
│  ├─ avatar.tsx                    # Component
│  ├─ card.tsx                      # Component
│  ├─ carousel.tsx                  # Component
│  ├─ menubar.tsx                   # Component
│  ├─ select.tsx                    # Component
│  ├─ skeleton.tsx                  # Component
│  ├─ tabs.tsx                      # Component
│  ├─ uiComponent/                  # Component
│  ├─ LogOutButton.tsx              # Component
│  ├─ ProfileAvatar.tsx             # Component
│  ├─ UserDropdown.tsx              # Component

│  ├─ AuthorPublisherHomepage.tsx   # Homepage for Authors and Publishers
│  ├─ BookCard.tsx                  # Component
│  └─ BookComponent.tsx             # Component
│
├─ backend/
│  ├─ lib/
│  ├─ lib/db.ts
│  ├─ middleware/
│  ├─ middleware/verifyToken.ts
│  ├─ models/
│  ├─ models/ Book.ts              # Book model
│  └─ models/ User.ts              # User model
|
├─ globals.css
├─ layout.tsx
├─ page.tsx

```

---

## How to run locally

1. Clone repository

```bash
git clone https://github.com/Shema-arsene/SmartReads
cd repo-folder
```

2. Install

```bash
npm install
```

3. Run dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm run preview # optional
```
