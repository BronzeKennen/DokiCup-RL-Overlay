<script>
    import { goalScored, replayStart,updateState } from "./processor";
    import  { onMount } from 'svelte';
    let replay_card = 'replay-card';
    let img = "../images/goal.png"
</script>

<div align="center" class="replay-card">
    <table id="stats">
        {#if $replayStart}
            <td align="right" id="shotspeed"><span align="left" id="shot">{Math.floor($goalScored.goalspeed)}</span></td>
            <td align="right" id="scorer"><span align="left" class="text">{$goalScored.scorer.name}</span></td>
        {#if $goalScored.assister?.name}
            <td align="right" id="playmaker"><span align="left" class="text">{$goalScored.assister.name}</span></td>
        {/if}
        {/if}
    </table>
</div>

<style>
    #shot {
        width:50px;
        margin-left:-45px;
        position:absolute;
        margin-top:6px;
    }
    .text {
        position:absolute;
        margin-top:5px;
        margin-left:-110px;
        width:100px;
    }
    #stats {
        background-image:linear-gradient(rgb(51, 113, 20),rgb(0, 0, 0));
        border-radius: 7px;
        /* margin-left:-60px; */
        margin-top:30px;
        color:rgb(207, 223, 188);
        padding:10px;
        /* width:450px; */
        border:1px yellow solid;
        height:60px;
    }
    .replay-card {
        width:500px;
        height:70px;
        margin-top:550px;
        margin-left:380px;
        font-family:AvertaBold;

    }
    #scorer {
        width:170px;
        background: url('../images/goal.png');
        background-repeat:no-repeat;
    }
    #playmaker {
        width:170px;
        background: url('../images/assist.png');
        background-repeat:no-repeat;
    }
    #shotspeed {
        width:100px;
        background: url('../images/shot-on-goal.png');
        background-repeat:no-repeat;
    }
    
</style>