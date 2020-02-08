export default function (api) {
  return {
    root: 'views',
    get(config, options = {}) {
      const endpoint = [api.options.origin, this.root];
      const data = {};
      const meta = {
        successCode: 200,
        requestType: 'GET'
      };
      return api.request(endpoint, {data, meta}, options);
    },
    post(config, options = {}) {
      const endpoint = [api.options.origin, this.root];
      const fields = ['slot', 'name', 'view', 'del'];
      const data = {};
      const meta = {
        successCode: 201,
        requestType: 'POST'
      };
      if (typeof config.slot === 'number') {
        data.slot = config.slot;
      }
      if (typeof config.name === 'string') {
        data.name = config.name;
      }
      if (typeof config.view === 'string') {
        data.view = config.view;
      }
      if (typeof config.del === 'boolean') {
        data.del = config.del;
      }
      api.check({
        bundle: {method: `${this.root}.post`, config},
        required: [
          {all_of: ['slot']}
        ],
        dependencies: [
          {fields: ['view'], require: 'name'},
        ]
      });
      return api.request(endpoint, {data, meta}, options);
    }
  };
}
