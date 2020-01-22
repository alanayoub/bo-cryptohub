import API from '../../libs/rest';
import formatResponse from './middleware.format-response';
import user from './endpoint.user';
import login from './endpoint.login';

const api = new API({
  cors: 'no-cors',
  origin: window.location.origin,
  credentials: 'same-origin',
  defaultCache: 1500,
  authorization() {},
  unauthorizedHandler(next) {}
});

// Add middleware functions that run before the request
api.preFetch.use(next => {
  next();
});

// Add endpoints
api.addEndPoint(login(api));
api.addEndPoint(user(api));

// Add middleware functions that run on the response
api.postFetch.use(formatResponse(api));

const rest = api.rest;
export default rest;
