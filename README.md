# Double InternHub

Complete Vite + React + TypeScript + Redux + React Router demo application for intern onboarding and supervisor support.

## Demo Accounts

- Supervisor: `Aina Rahman`
- Frontend Dev intern: `Daniel Tan`
- Backend Dev intern: `Sofia Lim`
- QA intern: `Amir Hakim`

Use the login screen account selector to switch roles.

## Features

- Role-based authentication and route protection
- Intern dashboard with progress, pending setup, supervisor replies, announcements, and quick links
- Onboarding plan for Hostinger Mail, Productive, Slack, GitLab, GitHub Desktop, VS Code, and Kakitangan
- Docs-style learning pages with instructions, learning documents, links, images, snippets, status tracking, and mark-as-done controls
- Intern Ask page with category dropdown, description field, history, replies, and resolved status
- Supervisor dashboard with intern progress table, open question totals, and completion metrics
- Supervisor Answer page with status/category filters, text replies, and optional image URL attachments
- CRUD management for interns, FAQs, and announcements
- FAQ, announcements, seed users, seed progress, seed questions, and typed mock API route definitions

## Project Structure

- `src/types.ts`: database model types
- `src/data/seed.ts`: demo database seed data
- `src/api/mockApi.ts`: mock API route map and read helpers
- `src/store/*`: Redux store, auth slice, and app data slice
- `src/pages/*`: route pages for both roles
- `src/components/*`: shared layout and dashboard UI components

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```
