'use strict';

import settings                        from '../../settings';

import formatterBinaryoverdose from './formatter-binaryoverdose.js';

const logger = require('../../logger');

const { scrapeDir } = settings;

const config = {
  cacheFor: 0,
  bootstrap: cache => {return {}},
  rateLimitDelayMs: 1000 * 60 * 60 * 24,
};

const custom = {
  event: 'data',
  name: 'bo-custom',
  interval: 1000 * 5,
  formatter: () {

  },
};

export default {
  config,
  custom,
}
