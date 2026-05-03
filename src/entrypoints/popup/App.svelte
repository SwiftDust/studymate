<script lang="ts">
    import Start from "@/lib/buttons/Start.svelte";
    import TimerType from "@/lib/buttons/TimerType.svelte";
    import SwitchMode from "@/lib/buttons/SwitchMode.svelte";

    let timer: HTMLElement | null | undefined = $state();
    let timerType: "POMODORO" | "SHORT_BREAK" | "LONG_BREAK" =
        $state("POMODORO");
    let buttonState: "START" | "PAUSE" = $state("START");
    let completedSessions = $state({
        completedPomodoros: 0,
        completedShortBreaks: 0,
        completedLongBreaks: 0,
    });
</script>

<main>
    <div class="header">
        <div class="spacer"></div>
        <div class="name">
            <h2>StudyMate</h2>
        </div>
        <div class="switch-mode"><SwitchMode /></div>
    </div>

    <div class="timer-type">
        <TimerType bind:timerType bind:buttonState bind:completedSessions />
    </div>
    <div class="pomodoro">
        <h1 id="timer" bind:this={timer}>--:--</h1>
    </div>

    <div class="buttons">
        <Start bind:buttonState {timer} {timerType} bind:completedSessions />
    </div>
</main>
