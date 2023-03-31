
<script>
    import "./TargetPlayer.svelte";
    import Sideboost from "./SideBoost.svelte";
    import { writable } from "svelte/store";
    import { replayStart, targetplayer, updateState , goalScored,matchEnded } from "./processor.js";
    import {socket, socketMessageStore} from "./socket.js"
    import TargetPlayer from "./TargetPlayer.svelte";
    import Scorebug from "./Scorebug.svelte";
    import SideBoost from "./SideBoost.svelte";
    import './Replay.svelte';
    import Replay from "./Replay.svelte";
    import "./+layout.js";
    import { gameInitialized } from "./processor.js";
</script>

<main>
    {#if $gameInitialized && !$matchEnded}
    {#if $updateState && !$goalScored}
        {#if $updateState.game.time_seconds % 60 < 10}
        <Scorebug minutes="{Math.floor($updateState.game.time_seconds / 60)}" seconds="{'0' + String($updateState.game.time_seconds % 60)}"/>
        {:else}
        <Scorebug minutes="{Math.floor($updateState.game.time_seconds / 60)}" seconds="{$updateState.game.time_seconds % 60}"/>
        {/if}
        <SideBoost/>
    {/if}
    {#if $targetplayer?.name && !$goalScored}
    <TargetPlayer/>
    {/if}    
    {#if $replayStart}
        <Replay/>
    {/if}
    {/if}
</main>
<style>
    @font-face {
        font-family: BenzinBold;
        src: url("../images/BenzinBold.ttf");
    }
    @font-face {
        font-family: AvertaBold;
        src: url("../images/AvertaBold.otf");
    }/*# sourceMappingURL=style.css.map */
</style>