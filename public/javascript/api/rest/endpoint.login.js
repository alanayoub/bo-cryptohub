export default function (api) {
  return {
    root: 'login',
    post(access) {
      const endpoint = [api.options.origin];
      const meta = {
        successCode: 200,
        requestType: 'POST'
      };
      endpoint.push('auth/google');
      const data = {};
      return api.request(endpoint, {data, meta});
    }
  };
}
