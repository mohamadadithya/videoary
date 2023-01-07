# Videoary

Videoary is a simple video player build with Typescript.

To use Videoary
```js
import { Videoary } from "videoary"

const videoary = new Videoary({
    containerArea: container,
    video: {
        src: "example", // The extension must be .mp4
        poster: null // Poster or thumbnail extension must be .png
    },
    subtitles: [
        {
            short: "en",
            long: "English"
        }
    ]
})
```
