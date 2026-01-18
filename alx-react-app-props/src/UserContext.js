// src/UserContext.js
import { createContext } from 'react';

// Create the context (we'll provide a default value for better DX)
export const UserContext = createContext({
  name: 'Guest',
  email: 'guest@example.com'
});