export const URL_BASE = "https://localhost:7003/api";
// endpoints.ts

// Identity endpoints
export const IDENTITY_PREFIX = "/auth";
export const URL_REGISTER = `${IDENTITY_PREFIX}/register`;
export const URL_LOGIN = `${IDENTITY_PREFIX}/login`;

// Products endpoints
export const PRODUCTS_PREFIX = "/products";
export const URL_GET_PRODUCTS = `${PRODUCTS_PREFIX}`;
export const URL_GET_PRODUCT = (id: number) => `${PRODUCTS_PREFIX}/${id}`;
export const URL_CREATE_PRODUCT = `${PRODUCTS_PREFIX}`;
export const URL_UPDATE_PRODUCT = (id: number) => `${PRODUCTS_PREFIX}/${id}`;
export const URL_DELETE_PRODUCT = (id: number) => `${PRODUCTS_PREFIX}/${id}`;
