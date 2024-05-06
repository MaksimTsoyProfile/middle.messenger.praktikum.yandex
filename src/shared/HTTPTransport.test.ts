import { expect } from 'chai';
import Sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import HTTPTransport from '../shared/HTTPTransport.ts';
import { describe, it, beforeEach, afterEach } from 'mocha';

describe('Test HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let httpClient: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
    httpClient = new HTTPTransport();
  });

  afterEach(() => {
    requests = [];
  });

  it('Test GET request', () => {
    httpClient.get('/auth/user', {});
    const [request] = requests;
    console.log(request);
    expect(request.method).to.eq('GET');
  });
});
