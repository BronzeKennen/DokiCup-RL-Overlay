<script>
    import "./+layout.js";
    let seriesName = 'Series Name';
    
    let teams = {
        'Lteam' : {
            name : 'L Team',
            score : 0,        
        },
        'Rteam' : {
            name: 'R Team',
            score : 0,
            
        }
    };
    let scorebug = {
        name: 'Series Name',
        series_length : 3,
    }

    function update_teams() {
        window.api.update_teams(teams);
    }
    function reset_teams() {
        teams = {
            'Lteam' : {
                name: 'L Team',
                score: 0
            },
            'Rteam' : {
                name: 'R Team',
                score: 0
            }
        }
        window.api.reset_teams(teams);
    }
    function update_scorebug() {
        window.api.update_scorebug(scorebug);
    }
    function reset_scorebug() {        
        scorebug = {
            name: 'Series Name',
            series_length : 3
        }
        window.api.reset_scorebug(scorebug);
    }
    function swap_teams() {
        let placeholder = teams.Lteam;
        teams.Lteam = teams.Rteam;
        teams.Rteam = placeholder;
        window.api.update_teams(teams);
    }

</script>
<main>
    <div class="scorebug">
            <div class="scorebug-settings">
                Scorebug <button class="update" on:click={update_scorebug}>Update</button> <button class="reset" on:click={reset_scorebug}>Reset</button><br>
                Series Name <input bind:value={scorebug.name} id="seriesName"><br>
            
                Best of <button on:click={() => {
                        if(scorebug.series_length<=5) scorebug.series_length+=2
                    }}>+</button>
                <button on:click={() => {
                        if(scorebug.series_length>=3) scorebug.series_length-=2
                    }}>-</button>
                <input type="number" bind:value={scorebug.series_length} class="shortbutton">
            </div>
    </div>
    <div class="teams">
        Teams <button class="update" on:click={update_teams}>Update Teams</button> <button class="reset" on:click={reset_teams}>Reset Teams</button>  <button id="swap" type="button" on:click={swap_teams}>Swap teams</button><br> 
        <div class="team" id="blue-team" align="center">
            <h2 align="center">Blue Team</h2>
            Name <input bind:value={teams['Lteam'].name}><br>
            Series Score <button on:click={() => {
                if(teams['Lteam'].score <= (scorebug.series_length/2)) teams['Lteam'].score++; 
            }}>+</button>
        <button on:click={() => {
                if(teams['Lteam'].score > 0) teams['Lteam'].score--;
            }}>-</button>
            <input type="number" bind:value={teams['Lteam'].score} class="shortbutton">
        </div>
        <div class="team" id="orange-team" align="center">
            <h2 align="center">Orange Team</h2>
            Name <input bind:value={teams['Rteam'].name}><br>
            Series Score <button on:click={() => {
                if(teams['Rteam'].score <= (scorebug.series_length/2)) teams['Rteam'].score++; 
            }}>+</button>
        <button on:click={() => {
                if(teams['Rteam'].score > 0) teams['Rteam'].score--;
            }}>-</button>
            <input type="number" bind:value={teams['Rteam'].score} class="shortbutton">

        </div>
    </div>
</main>
<style>
    #swap {
        background-color:orange;
        color:white;
        width:120px;
        font-size:16px;
    }
    #swap:hover {
        background-color:white;
        color:black;
    }
    button:hover {
        background-color:white;
        color:black;
        cursor:pointer;
    }
    .update {
        background-color:green;
        color:white;
        width:120px;
        font-size:16px;
    }
    .reset {
        background-color:red;
        color:white;
        width:120px;
        font-size:16px;

    }
    main {
        width:800px;
        height:600px;
        border:2px yellow solid;
        border-radius:4px;
        color:white;
        background-image:linear-gradient(black,rgb(20, 28, 73));
        font-size:20px;
        font-family: Helvetica, sans-serif;
        padding:35px;
}
.scorebug-settings {
    border:1px purple solid;
    border-radius:4px;
    padding:10px;
}
button {
    background-color:yellow;
    border-radius: 4px;
    width:30px;
    height:30px;
}

input {
    height:25px;
    border-radius: 5px;
    background-color:beige    
}
#seriesName {
    width:300px;
}
.shortbutton {
    text-align: center;
    width:30px;
}
.teams {
    border:1px purple solid;
    border-radius: 4px;
    margin-top:10px;
    padding:15px;
}
.team {
    display:inline-block;

}
#blue-team {
    border:1px blue solid;
    border-radius: 4px;
    padding:5px;
    width:40%;

}
#orange-team {
    border:1px orange solid;
    border-radius: 4px;
    padding:5px;
    width:40%    
}
</style>