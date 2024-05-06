import { config } from '../shared/config.ts';

const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  timeout?: number;
  headers?: string;
  retries?: number;
  data?: unknown;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod,
) => Promise<unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: Record<string, unknown>) {
  const params = [];

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        params.push(`${encodeURIComponent(key)}=${value.join(',')}`);
      } else if (typeof value === 'object') {
        params.push(`${encodeURIComponent(key)}=[object Object]`);
      } else {
        params.push(`${encodeURIComponent(key)}=${JSON.stringify(value)}`);
      }
    }
  }

  return params.length ? `?${params.join('&')}` : '';
}

class HTTPTransport {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.baseUrl;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      `${this.baseUrl}${url}`,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request(url: string, options: Options, timeout = 5000) {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET) {
        xhr.open(
          method,
          `${url}${queryStringify(data as Record<string, unknown>)}`,
        );
      } else {
        xhr.open(method, url);
      }

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }
      xhr.withCredentials = true;
      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
