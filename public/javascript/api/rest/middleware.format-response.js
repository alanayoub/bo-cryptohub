/**
 * Format Response
 */
export default function formatResponse(api) {
  return next => {
    if (api.data.meta.printFriendly) {
      const format = api.data.meta.contentType;
      if (format === 'json') {
        api.data.data = JSON.stringify(api.data.data, null, 2);
      }
      if (format === 'text') {
        api.data.data = api.data.data
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      next();
    }
    else next();
  };
}
