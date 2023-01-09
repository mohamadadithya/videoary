import { Videoary } from "./main";
const container = document.querySelector('#app');
const videoary = new Videoary({
    containerArea: container,
    video: {
        src: "ramble-on",
        poster: null
    },
    subtitles: [
        {
            short: "en",
            long: "English"
        }
    ]
});
videoary.init();
