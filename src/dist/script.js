import { Videoary } from "./main";
const container = document.querySelector('#app');
const videoary = new Videoary({
    accentColor: "rebeccapurple",
    containerArea: container,
    video: {
        poster: null,
        source: 'https://vz-caebc87f-166.b-cdn.net/648c6da0-6c39-4a07-94ed-f05f916d3fc5/playlist.m3u8'
    },
    subtitles: [
        {
            short: "en",
            long: "English",
            source: "https://dl.dropboxusercontent.com/s/bpi0shihyknapu4/english.vtt?dl=0"
        }
    ]
});
videoary.init();
