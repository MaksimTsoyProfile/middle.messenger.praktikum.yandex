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
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: Record<string, any>) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data object provided');
  }

  const params = [];

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        params.push(`${encodeURIComponent(key)}=${value.join(',')}`);
      } else if (typeof value === 'object') {
        params.push(`${encodeURIComponent(key)}=[object Object]`);
      } else {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return params.length ? `?${params.join('&')}` : '';
}

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  }

  request(url: string, options: Options, timeout = 5000) {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (method === METHODS.GET) {
        xhr.open(method, `${url}${queryStringify(data)}`);
      } else {
        xhr.open(method, url);
      }

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
