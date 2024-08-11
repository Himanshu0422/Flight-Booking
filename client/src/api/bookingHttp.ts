import { bookingInstance } from "./instance"


export const bookingHttp = {
  get: (url: string, params?: any, headers?: string) =>
    bookingInstance({
      method: 'GET',
      url,
      params: params || undefined,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    }),
  post: (url: string, payload: any = {}, headers?: string) =>
    bookingInstance({
      method: 'POST',
      url,
      data: payload,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    }),
  put: (url: string, params: any = {}, headers?: string) => {
    console.log('PUT', url, ' :: ', headers, ' :: ', params);
    return bookingInstance({
      method: 'PUT',
      url,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      data: params,
      transformResponse: [data => JSON.parse(data)],
    });
  },
  patch: (url: string, params: any = {}, headers?: string) =>
    bookingInstance({
      method: 'PATCH',
      url,
      data: params,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [
        data => {
          try {
            return JSON.parse(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
          }
        },
      ],
    }),
  delete: (url: string, params: any = {}, headers?: string) =>
    bookingInstance({
      method: 'DELETE',
      url,
      data: params,
      headers: {
        'Content-Type': headers || 'application/json',
      },
      transformResponse: [data => JSON.parse(data)],
    }),
};