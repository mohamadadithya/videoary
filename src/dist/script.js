import { Videoary } from "./main";
const container = document.querySelector('#app');
const videoary = new Videoary({
    accentColor: "rebeccapurple",
    containerArea: container,
    video: {
        poster: null,
        source: 'https://vz-caebc87f-166.b-cdn.net/9e2ca161-819c-4027-84be-6719d7af55fd/playlist.m3u8',
        next: null,
        prev: null
    },
    subtitles: [
        {
            short: 'id',
            source: 'https://dl.dropboxusercontent.com/s/m9haowyiats3gg4/VEED-subtitles_%5BIndonesian%5D%20The%20Rolling%20Stones%20-%20We%20Love%20You%20%28Official%20Video%29%20%5BDownSub.vtt?dl=0',
            long: 'Indonesian'
        },
        {
            short: 'jv',
            source: 'https://dl.dropboxusercontent.com/s/kh1awxil8gk67bp/VEED-subtitles_%5BJavanese%5D%20The%20Rolling%20Stones%20-%20We%20Love%20You%20%28Official%20Video%29%20%5BDownSub.vtt?dl=0',
            long: 'Javanese'
        },
        {
            short: 'sd',
            source: 'https://dl.dropboxusercontent.com/s/bfl70mdfdw1p208/VEED-subtitles_%5BSundanese%5D%20The%20Rolling%20Stones%20-%20We%20Love%20You%20%28Official%20Video%29%20%5BDownSub.vtt?dl=0',
            long: 'Sundanese'
        }
    ]
});
videoary.init();
