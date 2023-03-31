<script>
    import { slide } from 'svelte/transition';
    import { fly,fade } from 'svelte/transition';
    import { backOut } from 'svelte/easing';
    import { updateState ,updateScorebug,updateTeams } from "./processor";
    import  { onMount } from 'svelte';
    export let seconds = 0;
    export let minutes = 5;
    let series_empty = '../images/SERIES_EMPTY.png';
    let series_orange = [];
    let series_blue = [];
    onMount(() =>{
        updateScorebug.subscribe(value => {
            if(value) {
                series_blue = [];
                series_orange = [];
                for(let i = 0; i <= $updateScorebug.series_length/2;i++) {
                    series_blue.push('series-icon');
                    series_orange.push('series-icon');
                }
                  
            }
        })
        updateTeams.subscribe(value => {
            if(value) {
                for(let i = 0; i <= $updateScorebug.series_length/2;i++) {
                    series_blue[i] = 'series-icon';
                    series_orange[i] = 'series-icon';
                }

                for(let i = 0; i < value.Lteam.score; i++) {
                    series_blue[i] = 'series-icon-full';
                }
                for(let i = 0; i< value.Rteam.score; i++) {
                    series_orange[i] = 'series-icon-full';
                }
            }
        });

    })
</script>
<div
in:fly={{
    duration:1200,
    y: -200,
}}
out:fade={{
    duration:500,
    delay:2000
}}
class="scorebug-align">
<div class="scorebug">
    {#if $updateState}
    <span align="center" class="goals" id="bluegoals">{$updateState.game.teams[0].score}</span>
    <span align="center" class="goals" id="orangegoals">{$updateState.game.teams[1].score}</span>
    {/if}
    {#if $updateScorebug}
    <p class="header" align="center">{$updateScorebug.name}</p>
    <p class="bo" align="center">BO{$updateScorebug.series_length}</p>
    {:else}
    <p class="header" align="center">Header here</p>
    
    {/if}
    {#if $updateTeams}
    <p id="team1" align="center">{$updateTeams.Lteam.name}</p>
    <p id="team2" align="center">{$updateTeams.Rteam.name}</p>
    {:else}
    <p id="team1" align="center">{$updateState.game.teams[0].name}</p>
    <p id="team2" align="center">{$updateState.game.teams[1].name}</p>
    {/if}
    <p id="time" align="center">{minutes}:{seconds}</p>
    {#if $updateScorebug}
    <table class="series-score">
            {#if $updateScorebug.series_length === 5}
            <td></td>
            <td class={series_blue[2]} id="series-1"></td>
                {:else if $updateScorebug.series_length === 7}
                <td class={series_blue[3]} id="series-1"></td>
                <td class={series_blue[2]} id="series-2"></td>
                {:else}
                <td></td>
                <td></td>
            {/if}
            <td class={series_blue[1]} id="series-3"></td>
            <td class={series_blue[0]} id="series-4"></td>
            <td></td>
            <td class={series_orange[0]} id="series-5"></td>
            <td class={series_orange[1]} id="series-6"></td>
            {#if $updateScorebug.series_length === 5}
            <td class={series_orange[2]} id="series-7"></td>
            <td></td>
                {:else if $updateScorebug.series_length === 7}
                <td class={series_orange[2]} id="series-7"></td>
                <td class={series_orange[3]} id="series-8"></td>
                {:else}
                <td></td>
                <td></td>

            {/if}
        </table>
    {/if}
</div>
</div>
<style>
    .goals {
        position:absolute;
        font-size:28px;
        width:53px;
    }
    #bluegoals {
        margin-top:21px;
        margin-left:258px;
        /* border:1px red solid; */
        
    }
    #orangegoals {
        margin-top:21px;
        margin-left:459px;
    }
    .scorebug-align {
        width:90%;
        position:absolute;
        margin-left:250px;
    }
    .scorebug {
        color:white;
        font-family: BenzinBold;
        background-image: url("../images/SCOREBOARD.png");
        height:220px;
        width:800px;
        background-repeat: no-repeat;
    }
    .header {
        font-family: AvertaBold;
        letter-spacing: 3px;
        margin-left:227px;
        width:39%;
    }
    #team1 {
        margin-top:-2px;
        margin-left:20px;
        font-size: 15px;
        width:25%;
        height:30px;
        
    }
    #team2 {
        font-size: 15px;
        width:25%;
        height:30px;
        margin-top:-45px;
        margin-left:550px;
    }
    #time {
        font-size:23px;
        letter-spacing: 2px;
        margin-top:-55px;
        margin-left:245px;
        width:35%;
    }
    .series-icon-full {
        background:url("../images/SERIES_FULL.png");
        background-position:center;
        background-repeat: no-repeat;
        margin-left:50px;
        width:16px;
        height:16px;        
    }
    .series-icon {
        background:url("../images/SERIES_EMPTY.png");
        background-position:center;
        background-repeat: no-repeat;
        margin-left:50px;
        width:16px;
        height:16px;
    }
    .series-score {
        width:180px;
        margin-left:295px;
        margin-top:-5px;
        table-layout: fixed;
    }
    .bo {
        /* order:1px solid red; */
        position:absolute;
        color:black;
        font-size:12px;
        margin-left:369px;
        margin-top:63.5px;
    }
</style>