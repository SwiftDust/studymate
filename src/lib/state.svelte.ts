export const time = $state({
  setMinutes: "00",
  setSeconds: "00",
});

export const timerRing = $state({
  remainingMs: 0,
  totalMs: 1,
});

export const updateTime = (minutes: string, seconds: string): void => {
  time.setMinutes = minutes;
  time.setSeconds = seconds;
};
