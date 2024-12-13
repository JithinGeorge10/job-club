const DOMAIN = "https://jobclub.live";

// const AUTH_SERVICE_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
// const USER_SERVICE_DOMAIN = process.env.NEXT_PUBLIC_USER_DOMAIN;
// const COMPANY_SERVICE_DOMAIN = process.env.NEXT_PUBLIC_COMPANY_DOMAIN;
// const CHAT_SERVICE_DOMAIN = process.env.NEXT_PUBLIC_CHAT_DOMAIN;

const AUTH_SERVICE_DOMAIN = DOMAIN;
const USER_SERVICE_DOMAIN = DOMAIN;
const COMPANY_SERVICE_DOMAIN = DOMAIN;
const CHAT_SERVICE_DOMAIN = DOMAIN;


export const AUTH_SERVICE_URL = `${AUTH_SERVICE_DOMAIN}/api/auth-service`
export const USER_SERVICE_URL = `${USER_SERVICE_DOMAIN}/api/user-service`;
export const COMPANY_SERVICE_URL = `${COMPANY_SERVICE_DOMAIN}/api/company-service`;
export const CHAT_SERVICE_URL = `${CHAT_SERVICE_DOMAIN}/api/chat-service`;


export const APIKEY = process.env.NEXT_PUBLIC_APIKEY
export const AUTHDOMAIN = process.env.NEXT_PUBLIC_AUTHDOMAIN
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
export const STORAGEBUCKET = process.env.NEXT_PUBLIC_STORAGEBUCKET
export const MESSAGINGSENDER_ID = process.env.NEXT_PUBLIC_MESSAGINGSENDER_ID
export const APP_ID = process.env.NEXT_PUBLIC_APP_ID
export const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID


export const PAYU_MERCHANT_KEY = process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY
export const PAYU_MERCHANT_SALT = process.env.NEXT_PUBLIC_PAYU_MERCHANT_SALT
export const PAYU_TEST_URL = process.env.NEXT_PUBLIC_PAYU_TEST_URL
export const PUBLIC_SERVER_URL = "https://jobclub.live"
export const PUBLIC_PAYMENT_SUCCESS_URL = process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL
export const PUBLIC_PAYMENT_FAILURE_URL = process.env.NEXT_PUBLIC_PAYMENT_FAILURE_URL


export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET

