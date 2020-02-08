import API from '../../libs/rest';
import formatResponse from './middleware.format-response';
import user from './endpoint.user';
import login from './endpoint.login';
import views from './endpoint.views';

const api = new API({
  cors: 'cors',
  origin: `${window.location.origin}/api`,
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
api.addEndPoint(user(api));
api.addEndPoint(views(api));
api.addEndPoint(login(api));

// Add middleware functions that run on the response
api.postFetch.use(formatResponse(api));

const rest = api.rest;
export default rest;
