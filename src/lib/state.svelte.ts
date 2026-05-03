export const time = $state({
  setMinutes: "00",
  setSeconds: "00",
});

export const updateTime = (minutes: string, seconds: string): void => {
  time.setMinutes = minutes;
  time.setSeconds = seconds;
};
