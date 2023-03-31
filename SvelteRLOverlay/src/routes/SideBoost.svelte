<script>
    import { slide ,fade} from 'svelte/transition';
    import { updateState } from "./processor";
    import  { onMount } from 'svelte';
    let player_names_blue = [];
    let player_names_orange = [];
    onMount(() => {
        updateState.subscribe(value => {
            if(value) {
                player_names_blue = [];
                player_names_orange = [];
                let players = $updateState.players;
                for(let player in players) {
                    if($updateState.players[player].team === 0) {
                        player_names_blue.push(player);
                    }
                }
                for(let player in players) {
                    if($updateState.players[player].team === 1) {
                        player_names_orange.push(player);
                    }
                }
            }
        })
    })
</script>
<div class="side-boost-blue"
    out:fade={{delay:2000,duration:350}}
>
    {#each player_names_blue as i}
    <div in:slide|local={{delay:600 * player_names_blue.indexOf(i),duration:1500}} id="playername">{$updateState.players[i].name}</div> 
    <div in:slide|local={{delay:750 * player_names_blue.indexOf(i),duration:2300}} class="boost" style= "transition-duration: 700ms;width: {$updateState.players[i].boost < 10 ? $updateState.players[i].boost + 5 : $updateState.players[i].boost}%" align="right"></div>
        <span in:slide|local={{delay:750 * player_names_blue.indexOf(i),duration:2300}} id="boost_num">{$updateState.players[i].boost}</span>
        {/each}
</div>
<div class="side-boost-orange"
    out:fade={{delay:2000,duration:350}}
>
    {#each player_names_orange as i}
        <div  in:slide|local={{delay:600 * player_names_orange.indexOf(i),duration:1500}}  id="playername_orange" align="right">{$updateState.players[i].name}</div> 
        <div  in:slide|local={{delay:750 * player_names_orange.indexOf(i),duration:2300}} id="boost-orange" class="boost" style= "transition-duration: 700ms;width: {$updateState.players[i].boost < 10 ? $updateState.players[i].boost + 5 : $updateState.players[i].boost}%" align="right"> </div>
        <span in:slide|local={{delay:750 * player_names_orange.indexOf(i),duration:2300}}  id="boost_num_orange">{$updateState.players[i].boost}</span>
    {/each}
</div>

<style>
    #playername {
        color:white;
        width:200px;
    }
    .side-boost-blue {
        box-shadow: 7px 7px;
        margin-left:20px;
        transform:skewX(-5deg);
        border-radius:5px;
        background:linear-gradient(#225727,black);
        width:200px;
        font-family:BenzinBold;
        color:black;
        padding:10px;
        margin-top:230px;

        position:absolute;
    }
    .boost {
        color:black;
        font-size:9px;
        background-color:rgb(203, 223, 25);
        position:relative;
        border-radius: 2px;
        height:9px;
    }
    #boost_num {
        color:black;
        font-size:9px;
        position:absolute;
        margin-top:-11px;
        /* margin-left:-10px; */
    }

    .side-boost-orange {
        box-shadow: 7px 7px;
        position:absolute;
        margin-left:1040px;
        margin-top:230px;
        transform:skewX(5deg) scaleX(-1);
        border-radius:5px;
        background:linear-gradient(#225727,black);
        width:200px;
        font-family:BenzinBold;
        color:black;
        padding:10px;
    }
    #playername_orange {
        color:white;
        transform: scaleX(-1);
    }
    #boost_num_orange {
        transform: scaleX(-1);        
        color:black;
        font-size:9px;
        position:absolute;
        margin-top:-11px;

    }
</style>