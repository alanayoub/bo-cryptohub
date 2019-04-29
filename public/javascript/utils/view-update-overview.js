'use strict';

import { objectIsObject as isObject } from '../libs/bo-utils-client';

/**
 *
 * @param {Object} data
 * @return {Object}
 *
 */
export default function (data) {

  if (!isObject(data)) return false;

  let key;
  let val;
  let up = 0;
  let dn = 0;
  let nc = 0;
  for (key of Object.keys(data)) {
    if (!data[key]) continue;
    val = data[key]['cc-total-vol-full-CHANGEPCTDAY'];
    if (val > 0) up++;
    else if (val < 0) dn++;
    else nc++;
  }

  const total = up + dn + nc;
  const placeholder = '-';
  let upPer = Math.floor(up / (total / 100));
  let dnPer = Math.floor(dn / (total / 100));
  let ncPer = Math.floor(nc / (total / 100));
  upPer = isNaN(upPer) ? placeholder : upPer;
  dnPer = isNaN(upPer) ? placeholder : dnPer;
  ncPer = isNaN(upPer) ? placeholder : ncPer;
  document.querySelector('.ch-direction .ch-up .ch-val').innerHTML = `${upPer}%`;
  document.querySelector('.ch-direction .ch-dn .ch-val').innerHTML = `${dnPer}%`;
  document.querySelector('.ch-direction .ch-nc .ch-val').innerHTML = `${ncPer}%`;
  document.querySelector('.ch-direction .ch-total .ch-val').innerHTML = `${total}`;

}
