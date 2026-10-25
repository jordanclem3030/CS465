# CS-465 Module 7-1 — Travlr Security Submission

This ZIP contains the full Travlr project source.

## Project layout
- `travlr/app_admin/`: Angular administrator SPA (login, trip management)
- `travlr/app_server/`: Node.js/Express server
- `travlr/app_server/app_api/`: REST API, authentication and MongoDB models
- `travlr/app_server/app_server/`: public-facing website MVC files

The `app_api` folder is intentionally **inside** the backend project. It is not missing.

## Local setup
1. Install Node.js and have MongoDB running locally.
2. Open a terminal in `travlr/app_server`, run `npm install`.
3. Create `travlr/app_server/.env` with a locally generated `JWT_SECRET` value. Do not commit real secrets.
4. Run `npm start` from `travlr/app_server`; browse `http://localhost:3000/travel`.
5. In a second terminal, open `travlr/app_admin`, run `npm install` and `npm start`; browse `http://localhost:4200`.
6. Administrator login requires a user record in the local MongoDB database; database contents are not stored in this source ZIP.

## Security verification performed by student
- Public GET `/api/trips` returned vacation data.
- Unauthenticated POST `/api/trips` returned HTTP 401 with `Unauthorized access. A valid login token is required.`
- Angular administrator login page and trip-management UI loaded locally.

## Notes
Generated `node_modules` and Angular cache directories are intentionally excluded; restore dependencies with `npm install`. The private `.env` file is excluded.
