import { Videoary } from "./main";

const container = document.querySelector('#app') as HTMLAreaElement
const videoary = new Videoary({
    accentColor: "rebeccapurple",
    containerArea: container,
    video: {
        poster: null,
        source: 'https://vz-caebc87f-166.b-cdn.net/648c6da0-6c39-4a07-94ed-f05f916d3fc5/playlist.m3u8'
    },
    subtitles: null
})
videoary.init()