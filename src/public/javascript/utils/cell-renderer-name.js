import isObject from '../libs/bo-utils/object-is-object.js';

/**
 *
 *
 *
 */
export default function cellRendererName(params) {
  const baseUrl = 'https://www.cryptocompare.com';
  let imgUrl = params.data['cc-total-vol-full-ImageUrl'];
  imgUrl = isObject(imgUrl) && imgUrl.value;
  imgUrl = `${baseUrl}${imgUrl}`;
  const val = params.value;
  const css = 'width: 22px; height: 22px; margin: 1px; margin: 1px 5px 1px 2px; vertical-align: bottom;';
  const img = `<img src="${imgUrl}" style="${css}" />${val}`;
  return imgUrl ? img : val;
};
