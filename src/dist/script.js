import { Videoary } from "./main";
const container = document.querySelector('#app');
const videoary = new Videoary({
    accentColor: "rebeccapurple",
    containerArea: container,
    video: {
        poster: null,
        source: 'https://vz-f1461169-909.b-cdn.net/b95a2566-eda2-4e7b-a8c0-b1ba611f7a1e/playlist.m3u8',
        next: null,
        prev: null
    },
    subtitles: null
});
videoary.init();
