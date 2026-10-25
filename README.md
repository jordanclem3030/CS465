# Travlr Getaways — CS 465 Full Stack Development

## Project Overview

Travlr Getaways is a full stack travel application with a customer-facing website and a separate administrator single-page application (SPA). Customers can browse trips, while authorized administrators can manage trip information. The project uses Node.js, Express, MongoDB with Mongoose, Angular, and token-based authentication.

## Architecture

**Compare and contrast the types of frontend development you used, including Express HTML, JavaScript, and the SPA.**

In this project, I worked with a traditional customer-facing site served by Express and a separate Angular single-page application for administrators. The Express side uses server-side routing and Handlebars templates to render trip information into web pages. JavaScript adds behavior and also powers the server-side application through Node.js. The Angular SPA works differently because it uses components and client-side navigation to update what the administrator sees without requiring a full page reload for each action. The public website focuses on presenting trip details, while the SPA is designed for interacting with and managing that information.

**Why did the backend use a NoSQL MongoDB database?**

MongoDB stores information as flexible documents, which works well for the trip records in Travlr. Each trip includes fields such as a code, name, dates, resort, price, image, and description. Mongoose provides schemas and model methods that make it easier to validate, retrieve, and update those records from Express. This approach allowed the API to exchange trip data as JSON without having to convert it from relational tables.

## Functionality

**How is JSON different from JavaScript, and how does JSON tie together the frontend and backend?**

JavaScript is a programming language used to write logic and interactive behavior. JSON is a text format used to represent and transfer structured data. JSON resembles JavaScript object notation, but it is not executable program code. In Travlr, the backend returns trip records in JSON through REST API endpoints, and the Angular application reads that data to display trip cards and populate forms. When an administrator makes a permitted change, the frontend sends data back to the API in JSON format.

**Where did you refactor code, and what are the benefits of reusable UI components?**

As the project developed, I separated responsibilities between routes, controllers, database models, and the API instead of keeping everything in one place. I also moved the administrator interface into Angular components such as trip listing, trip card, add trip, edit trip, and login. A shared trip data service keeps HTTP requests in one location rather than repeating request code in every component. Reusable UI components make the application more consistent, easier to maintain, and faster to update because a change to a shared component can improve multiple screens.

## Testing

**Explain your understanding of methods, endpoints, and security in a full stack application.**

API endpoints are URLs that expose specific operations or resources. HTTP methods tell the server what action is requested: GET retrieves information, POST creates a new record, PUT updates an existing record, and DELETE removes one. Testing must check not only whether an endpoint returns the expected data but also whether it handles invalid requests and prevents unauthorized changes. Adding security makes testing more involved because protected endpoints need to be checked with and without valid authentication tokens. During local testing, the public GET `/api/trips` endpoint returned trip data, while a POST request to `/api/trips` without a token returned `401 Unauthorized`. I also ran the Express backend, connected to MongoDB, started the Angular application, and confirmed that a fresh browser session showed the administrator login page. These checks helped me understand why both functionality and access control matter.

## Reflection

**How has this course helped you reach your professional goals?**

This course gave me a better understanding of how a complete software project is organized and delivered. I had to work across frontend interfaces, backend routes, a database, API integration, authentication, and testing rather than focusing on only one piece. One of my biggest lessons was the importance of verifying that the entire project can run from the files being submitted, not just that it works on my computer. My professional goal is to move into project management in a STEM-related field. Being able to understand the technical work, coordinate different parts of a project, troubleshoot problems, document decisions, and communicate results will help me work more effectively with development teams and other stakeholders. I feel more prepared to contribute to projects that involve both technical requirements and team coordination.

## Project Structure

- `app_admin/` — Angular administrator SPA
- `app_server/` — Express application and backend dependencies
- `app_server/app_api/` — REST routes, controllers, database models, and authentication
- `app_server/app_server/` — customer-facing server routes, controllers, and templates
- `app_server/public/` — static public website resources

## Running Locally

The application requires Node.js, npm, and a locally running MongoDB instance. Install dependencies separately inside `app_server` and `app_admin` with `npm install`. Configure a local `.env` in `app_server` with an appropriate `JWT_SECRET` value (do not commit the secret), then start the Express backend with `npm start`. Start the Angular application from `app_admin` using `npm start`. The public travel page is available at `http://localhost:3000/travel` and the Angular app at `http://localhost:4200/` under the tested local configuration. Database seed data is in `app_server/data/trips.json`; an administrator account is needed to test authenticated changes.

## Security Notes

Never commit `.env` files, authentication tokens, or passwords. The application is a course project and should be reviewed and hardened before any public deployment.
