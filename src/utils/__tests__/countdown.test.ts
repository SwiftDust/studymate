import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { countdown } from "../countdown";

describe("countdown utility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("1970-01-01T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should call onUpdate with decreasing time", () => {
    const onUpdate = vi.fn();
    const duration = 5000;
    countdown(duration, onUpdate);

    vi.advanceTimersByTime(1000); // updates every 500ms so this advances onUpdate twice

    expect(onUpdate).toHaveBeenCalled();
    const lastCallValue =
      onUpdate.mock.calls[onUpdate.mock.calls.length - 1][0];
    expect(lastCallValue).toBeLessThanOrEqual(4000); // four seconds should be left after two ticks
  });

  it("should call onFinish and clear interval when time is up", () => {
    const onFinish = vi.fn();
    const duration = 1000;

    countdown(duration, undefined, onFinish);

    vi.advanceTimersByTime(1500); // negatives timer

    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it("should handle zero or negative time immediately", () => {
    const onFinish = vi.fn();

    countdown(-100, undefined, onFinish);

    vi.advanceTimersByTime(500);

    expect(onFinish).toHaveBeenCalled();
  });
});
