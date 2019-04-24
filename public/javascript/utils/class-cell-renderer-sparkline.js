'use strict';

import { d3Sparkline }      from '../libs/bo-utils-client';
import { arrayAverage }     from '../libs/bo-utils-client';
import { d3SimpleBarChart } from '../libs/bo-utils-client';


/**
 *
 * Price
 *
 * @param {Array} arr
 * @param {Boolean} range
 *
 */
function price(arr, range) {

  const priceData = arr.reduce((acc, val) => {
    acc.push({
      x: val.timestamp, y: val.price
    });
    return acc;
  }, []);

  return d3Sparkline({
    range,
    data: priceData,
    width: 100,
    height: 32,
    styles: 'position: absolute; top: 0; right: 11px'
  });

}

/**
 *
 * Volume
 *
 * @param {Array} arr
 * @param {Boolean} range
 * @param {Object} [volumeDays]
 *
 */
function volume(arr, range, volumeDays = 7) {

  const volumeData = [];
  const data = arr.reduce((acc, val) => {
    acc.push({
      x: val.timestamp, y: val.volume
    });
    return acc;
  }, []);

  const numDays = volumeDays;
  const steps = Math.max(Math.floor(data.length / numDays), 1);
  for (let i = 0; i < data.length; i = i + steps) {

    const p0 = data[i];
    const p1 = data[i + 1];
    const p2 = data[i + 2];
    const y0 = p0.y;
    const y1 = p1 ? p1.y : y0;
    const y2 = p2 ? p2.y : y1;

    // Take the average of 3 volumes and the middle timestamp
    volumeData.push({
      x: p1 ? p1.x : p0.x,
      y: arrayAverage([y0, y1, y2])
    });

  }

  return d3SimpleBarChart({
    range,
    data: volumeData,
    width: 100,
    height: 10,
    fill: '#caecfc',
    styles: 'position: absolute; bottom: 0; right: 11px'
  });

}

/**
 *
 * Cell renderer class
 *
 */
export default class cellRendererSparkline {

  // gets called once before the renderer is used
  init(params) {

    if (!params.value) return;

    let ts = JSON.parse(JSON.stringify(params.value));

    if (params.price)  this.price  = price(ts, !!params.range);
    if (params.volume) this.volume = volume(ts, !!params.range, params.volumeDays);

  }

  // gets called once when grid ready to insert the element
  getGui() {

    const div = document.createElement('div');

    if (this.volume) {
      div.appendChild(this.volume.node());
    }
    if (this.price) {
      div.appendChild(this.price.node());
    }

    this.eGui = div;
    return this.eGui;

  }

}
