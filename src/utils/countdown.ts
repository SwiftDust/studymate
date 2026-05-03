/**
 * This function will countdown from a certain time and update the timer element.
 * @param time The time you want to countdown from in milliseconds.
 * @param onUpdate A callback function that will be called with the remaining time.
 * @param onFinish A callback function that will be called when the countdown finishes.
 * @returns The interval ID which can be used to clear the interval.
 */

import toDoubleDigit from "./toDoubleDigit";

export function countdown(
  time: number,
  onUpdate?: (timeBetween: number) => void,
  onFinish?: () => void,
): NodeJS.Timeout {
  let now = Date.now();
  let completed = now + time;

  const countdown = setInterval(function () {
    now = Date.now();
    let timeBetween = completed - now;
    if (onUpdate) onUpdate(timeBetween);

    if (timeBetween <= 0) {
      clearInterval(countdown);
      if (onFinish) onFinish();
    }
  }, 500);

  return countdown;
}
