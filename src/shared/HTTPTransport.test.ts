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
    xhr.restore();
  });

  it('Test GET request', () => {
    httpClient.get('/auth/user', {});
    const [request] = requests;
    console.log(request);
    expect(request.method).to.eq('GET');
  });

  it('Test POST request', () => {
    httpClient.post('/auth/signin', {
      data: { login: 'Test', password: 'test' },
    });

    const [request] = requests;

    expect(request.method).to.equal('POST');
  });

  it('Test PUT request', () => {
    httpClient.put('/user/profile', {
      data: {
        first_name: 'test',
        second_name: 'test',
        display_name: 'test',
        login: 'test',
        email: 'test@gmail.com',
        phone: '123123123',
      },
    });

    const [request] = requests;

    expect(request.method).to.equal('PUT');
  });

  it('Test DELETE request', () => {
    httpClient.delete('/chats');

    const [request] = requests;

    expect(request.method).to.equal('DELETE');
  });
});
