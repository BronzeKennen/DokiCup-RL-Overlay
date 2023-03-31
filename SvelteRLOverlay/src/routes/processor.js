import { derived } from "svelte/store";
import { socketMessageStore,dashboardMessageStore } from "./socket";

export const updateState = derived(socketMessageStore, ($msg, set) => {
    if (!$msg) return;
  
    if ($msg.event === "game:update_state") {
      set($msg.data);
    }
});
export const gameInitialized = derived(socketMessageStore, ($msg, set) => {
    if (!$msg) return;
  
    if ($msg.event === "game:initialized") {
      set($msg.data);
    }
});


export const goalScored = derived(socketMessageStore, ($msg, set) => { 
    if(!$msg) return;

    if ($msg.event === "game:goal_scored") {
        set($msg.data);
    } else if ($msg.event === "game:replay_end") {
        set(null);
    }
})
export const matchEnded = derived(socketMessageStore, ($msg, set) => { 
    if(!$msg) return;

    if ($msg.event === "game:match_ended") {
        set($msg.data);
    } 
})
export const replayStart = derived(socketMessageStore, ($msg, set) => { 
    if(!$msg) return;

    if ($msg.event === "game:replay_start") {
        set($msg.data);
    }else if ($msg.event === "game:replay_end") {
        set(null);
    }
})

export const targetplayer = derived(updateState, ($update, set) => {
    if(!$update) return;

    if ($update.game.hasTarget) {
        const player = $update.players[$update.game.target];
        set(player)
    } else {
        set({});
    }

});

export const updateScorebug = derived(dashboardMessageStore, ($msg, set) => {
    if(!$msg) return;
    if($msg.event === 'update_scorebug') {
        set($msg.data);
    }
})

export const updateTeams = derived(dashboardMessageStore, ($msg,set) => {
    if(!$msg) return;
    if($msg.event === 'update_teams') {
        set($msg.data);
    }
})


