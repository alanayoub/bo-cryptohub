export default function (api) {
  return {
    root: 'user',
    get(config, options = {}) {
      const endpoint = [api.options.origin, this.root];
      const data = {};
      const meta = {
        successCode: 200,
        requestType: 'GET'
      };
      return api.request(endpoint, {data, meta}, options);
    }
  };
}
