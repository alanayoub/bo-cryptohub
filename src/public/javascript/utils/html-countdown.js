'use strict';

/**
 *
 * htmlCountdown
 *
 * @param {Object} param
 * @return {String} - html string
 *
 */
export default function htmlCountdown(params) {

  const fullTime = 1000 * 60 * 5; // 5 min
  const field = params.data[params.colDef.field];
  const timestamp = field && field.timestamp;
  const startDate = moment(timestamp);
  const endDate = moment(new Date);
  const ms = startDate.diff(endDate);
  const timeLeft = fullTime - Math.abs(ms);

  return timeLeft;

}

//
// Older version where we had a reverse loading bar
//
// @keyframes unload {
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-100%);
//   }
// }
//
// export default function htmlCountdown(params) {
//
//   const fullTime = 1000 * 60 * 5; // 5 min
//   const field = params.data[params.colDef.field];
//   const timestamp = field && field.timestamp;
//   const startDate = moment(timestamp);
//   const endDate = moment(new Date);
//   const ms = startDate.diff(endDate);
//   const timeLeft = fullTime - Math.abs(ms);
//   let percentage = (timeLeft / fullTime) * 100;
//   let animationTime = timeLeft / 1000;
//   percentage = percentage > 0 ? percentage : 0;
//   animationTime = animationTime > 0 ? animationTime : 0;
//   const css = `
//     width: ${percentage}%;
//     animation: ${animationTime}s linear 0s 1 unload; animation-fill-mode: forwards;
//     transform: translateX(0%);
//   `;
//   const countdown = `
//     <div class="cryptohub-cell-meter">
//        <span style="${css}"></span>
//      </div>
//   `;
//
//   return countdown;
//
// }
