'use strict';

function flipMap(map) {
  const out = {};
  for(const key in map) {
    out[map[key]] = key;
  }
  return out;
}

export default function projectMapIdName({data}) {

  let parsedData = flipMap(data);
  return parsedData;

}
