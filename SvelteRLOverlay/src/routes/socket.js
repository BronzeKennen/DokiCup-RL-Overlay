import { writable } from "svelte/store";
import {browser} from '$app/environment';
export var socket;
export var dashboard;
export const socketMessageStore = writable({
    event: "default",
    data: {},
})

export const dashboardMessageStore = writable({
    event : "default",
    data: {},
})
if (browser) {
    socket = new WebSocket("ws://localhost:49122");
    socket.onopen = () => {
        console.log("Connected to SOS.");
    }
    socket.onerror = (err) => {
        console.error("WebSocket error", err);
    }
    socket.onmessage = ({ data }) => {
        const parsed = JSON.parse(data);
        console.log("Message[SOS]: ", parsed);

        socketMessageStore.set(parsed);
    }

    dashboard = new WebSocket("ws://localhost:49123");
    dashboard.onopen = () => {
        console.log("Connected to Dashboard.");
    }
    dashboard.onerror = (err) => {
        console.error("WebSocket error", err);
    }

    dashboard.onmessage = ({ data }) => {
        const parsedDashboard = JSON.parse(data);
        console.log("Message[DASHBOARD] ", parsedDashboard);

        dashboardMessageStore.set(parsedDashboard);
    }
}



