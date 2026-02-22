// Re-export client env (safe for both client and server)
export { envClient, type ClientEnv } from './client'

// Note: envServer is NOT exported here to prevent accidental client imports
// Import directly from './server' only in server-side code
