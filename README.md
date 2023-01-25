# Videoary

Videoary is a simple video player build with Typescript.

To use Videoary
```js
import { Videoary } from "videoary"

const container = document.querySelector('#app') // Root area to append

const videoary = new Videoary({
    accentColor: "red",
    containerArea: container,
    video: {
        src: "example", // Hls source
        poster: null, // Poster or thumbnail extension must be .png,
        next: null, // Optional page link to play next video
        prev: null // Optional page link to play prev video
    },
    subtitles: [
        {
            source: "example.vtt", // Subtitle source
            short: "en",
            long: "English"
        }
    ]
})
```
