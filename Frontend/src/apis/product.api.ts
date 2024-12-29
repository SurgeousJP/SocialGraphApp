import {
  URL_CREATE_PRODUCT,
  URL_DELETE_PRODUCT,
  URL_GET_PRODUCT,
  URL_GET_PRODUCTS,
  URL_UPDATE_PRODUCT,
} from "../constants/endpoints";
import http from "../utils/http";

export const productsApi = {
  getProducts() {
    return http.get(URL_GET_PRODUCTS);
  },

  getProduct(id: number) {
    return http.get(URL_GET_PRODUCT(id));
  },

  createProduct(body: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) {
    return http.post(URL_CREATE_PRODUCT, body);
  },

  updateProduct(
    id: number,
    body: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
    }
  ) {
    return http.put(URL_UPDATE_PRODUCT(id), body);
  },

  deleteProduct(id: number) {
    return http.delete(URL_DELETE_PRODUCT(id));
  },
};

export default productsApi;
