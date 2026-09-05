# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small internal teams sharing project work: a creator/owner who defines a project and assigns it to one or more teammates, and assigned teammates who view what's assigned to them and comment on it. The data model has no role hierarchy beyond "creator" — any authenticated user can create and assign projects. *(Inferred from `Create.js`, `Dashboard.js`, and `firestore.rules`; the intended audience was not independently confirmed — see Capabilities and Constraints.)*

## Product Purpose

A lightweight team project tracker: authenticated users create a project (name, details, due date, category), assign it to teammates, and follow it via a filterable dashboard, project-level comments, and a live "who's online" list. There is no separate completion/status field — "Mark as Complete" deletes the project outright. *(Inferred from source; not independently confirmed.)*

## Positioning

Not established. This codebase implements a well-known React + Firebase tutorial pattern ("The Dojo") rather than a differentiated product, and it was not confirmed whether this is a real internal tool, a personal/learning project, or a portfolio piece. Record this as an open decision rather than inventing a mechanism.

## Operating Context

- Auth is Firebase email/password. Sign-up requires a display name and a profile thumbnail image (client-validated: must be an image, under 200KB).
- Firestore holds two collections: `users` (profile + online presence) and `projects` (name, details, category, due date, `createdBy`, `assignedUsersList`, `comments[]`).
- A persistent "all users" list shows who's online, sourced from the `users` collection's `online` flag.
- Project categories are a fixed, hardcoded set: Development, Design, Sales, Marketing.

## Capabilities and Constraints

- Firestore rules: any authenticated user can read/create/update any project or user document; only the creator can delete a project ("complete" = delete) or update their own user document.
- No workflow states beyond "exists" (open) and "deleted" (complete) — no in-progress/partial states.
- No tests beyond Create React App's scaffold defaults; no accessibility, i18n, or error-boundary work has been done.
- Early-stage signals: `package.json` is `dojo@0.1.0` (private), and `src/App.js` still contains an unused debug `console.log` over a practice array-reduce. Treat the app as practice/early-stage rather than hardened for production traffic.
- **Undecided:** whether this project is for real team use or personal/learning purposes — asked directly and left unanswered.

## Brand Commitments

None confirmed as binding. The app currently ships as "The Dojo" with a temple logo (`src/assets/temple.svg`) and package name `dojo` — this reads as carried-over tutorial branding, not a deliberate identity choice, and was not confirmed as something to preserve. Treat the name/logo as changeable unless the user says otherwise.

## Evidence on Hand

No real user content, testimonials, or case studies exist; all project/user data is created live in Firestore by whoever uses the app. Design assets are limited to a small icon set in `src/assets/` (dashboard, add, activity icons) plus the temple logo. Nothing here should be treated as proof of real customers, usage, or results.

## Product Principles

- Keep project creation and assignment fast: a small, required field set (name, details, due date, category, assignees) rather than a heavyweight workflow.
- Surface team state at a glance: who's online, what's assigned to me, filterable by category.
- Ownership stays simple and explicit: only the creator can remove a project; everyone authenticated can otherwise read, update, and comment freely.

## Accessibility & Inclusion

No accessibility requirement has been established yet.
