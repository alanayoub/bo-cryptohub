import barChart from '../libs/bo-utils/d3-simple-bar-chart.js';
import sparkline from '../libs/bo-utils/d3-sparkline.js';
import arrayAverage from '../libs/bo-utils/array-average.js';

/**
 *
 * Price
 *
 * @param {String} str
 * @param {Object} params
 *
 */
function price(str, params) {

  let price;
  let timestamp;
  const priceData = [];
  str.split(',').forEach(d => {
    [timestamp, price] = d.split('|');
    priceData.push({
      x: +timestamp, y: +price
    });
  });

  return sparkline({
    data: priceData,
    range: !!params.range,
    width: 100,
    height: 32,
    styles: 'position: absolute; top: 0; right: 11px'
  });

}

function volume(str, params) {

  const volumeData = [];
  const data = [];

  let volume;
  let timestamp;
  str.split(',').forEach(d => {
    [timestamp, volume] = d.split('|');
    data.push({
      x: +timestamp, y: +volume
    });
  });

  const numDays = params.volumeDays || 7;
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

  return barChart({
    data: volumeData,
    range: !!params.range,
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

    let timestamp;
    const str = params.value;

    if (params.price) this.price = price(str, params);
    if (params.volume) this.volume = volume(str, params);

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
