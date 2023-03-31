<script>
    import {fade} from 'svelte/transition';
    import {targetplayer} from "./processor.js"
</script>
<div class="target-size"     out:fade={{delay:2000,duration:350}}
>
<div class="targetplayer">
    <p style="margin-left:20px; margin-top:5px; position:absolute;">{$targetplayer.name}</p>
    <table class="stats">
        <td align="center">{$targetplayer.goals}</td>
        <td align="center">{$targetplayer.assists}</td>
        <td align="center">{$targetplayer.saves}</td>
        <td align="center">{$targetplayer.shots}</td>
    </table>
        <div class="boost boost-bg" style="width: {$targetplayer.boost * 0.91}%; transition-duration: 700ms">
        <span id="target-boost">{$targetplayer.boost} </span>
    </div>
</div>
</div>
<style>
    .target-size {
        width:80%;
    }
    .targetplayer {
        position:absolute;
        background:url('../images/TARGETPLAYER.png');
        background-size:100%;
        width:350px;
        height:108px;
        color:white;
        font-family:BenzinBold;
        font-size:22.5px;
        margin-top:530px;
        margin-left:80px;
    }
    .stats {
        table-layout: fixed;
        position:absolute;
        width:334px;
        margin-left:25px;
        margin-top:40px;
    }   

    .boost {
        margin-top:-30px;
        position:relative;
        height: 20px;
        background-color: yellow;
        font-size:20px;
    }
    .boost-bg {
        margin-top:78px;
        margin-left:13.5px;
        width:300px;
        background-image: linear-gradient(to right, #534318, #bfb841);
        border-radius: 6px;
    }
    #target-boost {
        margin-left:5px;
        margin-top:-5px;
        position:absolute;
    }
</style>