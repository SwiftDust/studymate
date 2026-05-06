import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { sameLocalDay } from "../sameLocalDay";

const getResetState = (lastUpdated: number, now: Date) => {
  if (lastUpdated !== 0 && !sameLocalDay(lastUpdated, now)) {
    return {
      shouldReset: true,
      newSessions: {
        completedPomodoros: 0,
        completedShortBreaks: 0,
        completedLongBreaks: 0,
      },
      newLastUpdated: now.getTime(),
    };
  }
  return { shouldReset: false };
};

describe("sameLocalDay", () => {
  it("should return true for same local day", () => {
    const date1 = new Date("1970-01-01");
    const date2 = new Date("1970-01-01");
    expect(sameLocalDay(date1, date2)).toBe(true);
  });

  it("should return false for different local day", () => {
    const date1 = new Date("1970-01-01");
    const date2 = new Date("1970-01-02");
    expect(sameLocalDay(date1, date2)).toBe(false);
  });
});

describe("Session reset logic", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return a reset state when the day has changed", () => {
    const monday = new Date("1970-01-01T10:00:00");
    vi.setSystemTime(monday);
    const lastUpdated = monday.getTime();

    const tuesday = new Date("1970-01-02T09:00:00");
    vi.setSystemTime(tuesday);

    const result = getResetState(lastUpdated, tuesday);

    expect(result.shouldReset).toBe(true);
    expect(result.newSessions?.completedPomodoros).toBe(0);
  });

  it("should NOT reset if it is still the same day", () => {
    const morning = new Date("1970-01-01T08:00:00");
    const evening = new Date("1970-01-01T20:00:00");

    const result = getResetState(morning.getTime(), evening);
    expect(result.shouldReset).toBe(false);
  });
});
