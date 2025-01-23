// cms-dashboard/src/utils/authStorage.ts

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const TOKEN_EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

/**
 * Checks if an auth token exists and is still valid.
 * @returns {boolean} True if the token exists and is valid, false otherwise.
 */
export const hasAuthToken = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Return false during SSR
  }

  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const expiry = localStorage.getItem(AUTH_TOKEN_EXPIRY_KEY);

  if (!authToken || !expiry) {
    return false; // No token or expiry found
  }

  const now = Date.now();
  if (now > parseInt(expiry, 10)) {
    clearAuthToken(); // Clear expired token
    return false; // Token is expired
  }

  return true; // Token exists and is valid
};

/**
 * Stores the auth token and sets its expiry time to 1 day from now.
 * @param {string} authToken - The token to store.
 */
export const storeAuthToken = (authToken: string): void => {
  if (typeof window === 'undefined') {
    return; // Do nothing during SSR
  }

  const now = Date.now();
  const expiry = now + TOKEN_EXPIRY_DURATION;

  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  localStorage.setItem(AUTH_TOKEN_EXPIRY_KEY, expiry.toString());
};

/**
 * Clears the auth token and its expiry time from localStorage.
 * Redirects the user to the login page.
 */
export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') {
    return; // Do nothing during SSR
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_EXPIRY_KEY);
  window.location.href = '/login'; // Redirect to login
};
