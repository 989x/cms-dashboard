// cms-dashboard/src/utils/authStorage.ts

export const hasAuthToken = (): boolean => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken; // Returns true if the token exists
};

export const storeAuthToken = (authToken: string): void => {
  localStorage.setItem('authToken', authToken); // Save token to localStorage
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken'); // Remove token from localStorage
  window.location.href = '/login'; // Redirect to login page
};
