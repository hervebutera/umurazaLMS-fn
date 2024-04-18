export const {
    NODE_ENV,
    VITE_APP_LIVE_API_URL,
    VITE_APP_LOCAL_API_URL,
} = import.meta.env

const API_URL = VITE_APP_LOCAL_API_URL || VITE_APP_LIVE_API_URL

export default API_URL;
  