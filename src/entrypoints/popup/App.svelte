<script lang="ts">
    import Start from "@/lib/buttons/Start.svelte";
    import TimerType from "@/lib/buttons/TimerType.svelte";
    import SwitchMode from "@/lib/buttons/SwitchMode.svelte";
    import TimerRing from "@/lib/TimerRing.svelte";

    let timer: HTMLElement | null | undefined = $state();
    let timerType: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK" =
        $state("POMODORO");
    let buttonState: "START" | "PAUSE" = $state("START");
    let completedSessions = $state({
        completedPomodoros: 0,
        completedShortBreaks: 0,
        completedLongBreaks: 0,
    });

    import { time, timerRing } from "@/lib/state.svelte";

    const ringProgress = $derived(
        timerRing.totalMs > 0
            ? Math.min(
                  1,
                  Math.max(0, timerRing.remainingMs / timerRing.totalMs),
              )
            : 1,
    );
</script>

<main>
    <div class="header">
        <div class="spacer"></div>
        <div class="name">
            <h2>StudyMate</h2>
        </div>
        <div class="switch-mode"><SwitchMode /></div>
    </div>

    <div class="timer-selection">
        <TimerType bind:timerType bind:buttonState bind:completedSessions />
        <div class="reset-container">
            <a
                href="#"
                onclick={async () => {
                    const response = await browser.runtime.sendMessage({
                        type: "RESET_SESSIONS",
                    });

                    if (response && response.completedSessions) {
                        completedSessions = response.completedSessions;
                    }
                }}
            >
                Reset finished timer count
            </a>
        </div>
    </div>
    <div class="pomodoro">
        <TimerRing progress={ringProgress}>
            <h1 id="timer" bind:this={timer}>
                {time.setMinutes}:{time.setSeconds}
            </h1>
        </TimerRing>
    </div>

    <div class="buttons">
        <Start bind:buttonState {timer} {timerType} bind:completedSessions />
    </div>
</main>
