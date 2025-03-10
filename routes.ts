/**
 * This is an array of route that accessible for public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/articles"];

/**
 * This is an array of route that accessible for authenticated user
 * These routes will redirect unauthenticated user to /login
 * @type {string[]}
 */
export const privateRoutes = ["/admin"];

/**
 * This is an array of route that accessible for authentication
 * These routes will redirect logged in user to /admin
 * @type {string[]}
 */
export const authRoute = ["/admin/login"];

/**
 * This prefix for api authentication route
 * Routes that start with this prefixd are use for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Route for redirect after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";
