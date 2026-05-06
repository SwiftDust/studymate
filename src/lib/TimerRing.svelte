<script lang="ts">
    import "./timerring.css";

    let {
        children,
        progress = 1,
    } = $props<{
        children?: import("svelte").Snippet;
        progress?: number;
    }>();

    const clamped = $derived(Math.min(1, Math.max(0, progress)));
    const countdownPct = $derived(`${clamped * 100}%`);
    const capAngle = $derived(`${(1 - clamped) * 360}deg`);
</script>

<div class="ring" style="--countdown: {countdownPct}; --cap-angle: {capAngle};">
    {@render children?.()}
</div>
