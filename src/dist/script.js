import { Videoary } from "./main";
const container = document.querySelector('#app');
const videoary = new Videoary({
    containerArea: container,
    video: {
        source: "https://dl.dropboxusercontent.com/s/8v7q999tockekbd/aneurysm.mp4?dl=0",
        poster: null
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
