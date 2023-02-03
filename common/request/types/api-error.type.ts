export const API_ERROR_TYPE_ERROR = 'error';
export const API_ERROR_TYPE_ALERT_POPUP = 'alert-popup';
export const API_ERROR_TYPE_SYSTEM_ERROR = 'system-error';
export const API_ERROR_TYPE_NOSESSION = 'nosession';
export const API_ERROR_TYPE_UNAUTHENTICATED = 'unauthenticated';
export const API_ERROR_TYPE_UNAUTHORIZED = 'unauthorized';

export type ApiErrorType =
    typeof API_ERROR_TYPE_ERROR |
    typeof API_ERROR_TYPE_ALERT_POPUP |
    typeof API_ERROR_TYPE_SYSTEM_ERROR |
    typeof API_ERROR_TYPE_NOSESSION |
    typeof API_ERROR_TYPE_UNAUTHENTICATED |
    typeof API_ERROR_TYPE_UNAUTHORIZED;
