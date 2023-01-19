import { Video, Subtitle } from "./types"

const formatDuration = (time: number) => {
    if(!isNaN(time)) {
        const seconds = Math.floor(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
        const minutes = (Math.floor(time / 60) % 60)
        const hours = Math.floor(time / 3600)
        if(hours >= 1) {
            return `${hours}:${minutes}:${seconds}`
        } else {
            return `${minutes}:${seconds}`
        }
    } else {
        return "0:00"
    }
}

const render = (container: HTMLAreaElement, video: Video | undefined, subtitles: Subtitle[] | undefined, playbackSpeed: number, playbackSpeeds: Number[], videoCaption: String | null) => {
    container.innerHTML = `
    <div class="container videoary" id="videoary">
    <div class="loader">
        <i class="fas fa-fw fa-spin fa-spinner-third"></i>
    </div>
    <div class="toast"></div>
    <img class="poster" ${video?.poster ? `src="/posters/${video.poster}"` : ''} />
    <canvas class="ambient-background"></canvas>
    <div class="actions-wrapper-mobile">
        <button type="button" class="settings-btn-mobile"><i class="fas fa-fw fa-gear"></i></button>
        <ul>
            <li class="${!video?.next ? "hidden" : ""}">
                <button type="button"><i class="fas fa-fw fa-step-backward"></i></button>
            </li>
            <li>
                <button type="button" class="play-btn-mobile"><i class="fas fa-fw fa-play"></i></button>
            </li>
            <li class="${!video?.prev ? "hidden" : ""}">
                <button type="button"><i class="fas fa-fw fa-step-forward"></i></button>
            </li>
        </ul>
    </div>
    <video controlslist="nodownload" crossorigin="anonymous">
        ${subtitles?.map((caption) => {
        return `<track label="${caption.long}" kind="subtitles" srclang="${caption.short}" src="${caption.source}" default />`
        }).join('')}
    </video>
    <div class="captions-wrapper"></div>
    <div class="videoary__bottom-panel">
        <div class="mobile-wrapper">
            <p id="duration-indicator-mobile">0:00</p>
            <button type="button" class="volume-btn-mobile"><i class="fas fa-fw fa-volume"></i></button>
            <button type="button" class="fullscreen-btn-mobile"><i class="fas fa-fw fa-expand"></i></button>
        </div>
        <div class="duration-wrapper">
            <div class="buffered-progress"></div>
            <input type="range" name="duration" id="duration" value="0" min="0" step=".001">
        </div>
        <div class="actions-wrapper">
            <ul class="videoary__bottom-panel__actions">
                <li>
                    <button id="play-button"><i class="fas fa-fw fa-play"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Play (p)</div>
                </li>
                <li class="${!video?.next ? "hidden" : ""}">
                    <button id="next-button"><i class="fas fa-fw fa-forward-step"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Next (n)</div>
                </li>
                <li>
                    <button><i class="fas fa-fw fa-volume" id="volume-button"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Mute (m)</div>
                    <input type="range" name="volume" id="volume" min="0" max="1" step=".001" value="0">
                </li>
                <li>
                    <p id="duration-indicator">0:00</p>
                </li>
            </ul>
            <ul class="videoary__bottom-panel__actions">
                <li>
                    <button id="closed-captions-button"><i class="far fa-fw fa-closed-captioning"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Subtitles (c)</div>
                </li>
                <li>
                    <button id="pic-in-pic-button"><i class="far fa-fw fa-tv-alt"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Picture in Picture (i)</div>
                </li>
                <li>
                    <button id="fullscreen-button"><i class="far fa-fw fa-expand"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Fullscreen (f)</div>
                </li>
                <li>
                <button id="settings-button"><i class="fas fa-fw fa-gear"></i></button>
                </li>
                <li>
                    <button id="theater-button"><i class="far fa-fw fa-rectangle-wide"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Theater Mode (t)</div>
                </li>
            </ul>
        </div>
        <ul class="settings-menu">
        <li>
        <button type="button" class="flex justify-between items-center w-full">
            <span>
            <i class="far fa-fw fa-sliders"></i>
            Quality
            </span>
            <span>
            Auto
            <i class="far fa-fw fa-chevron-right"></i>
            </span>
        </button>
        </li>
        <li>
        <button type="button" class="flex justify-between items-center w-full">
            <span>
            <i class="far fa-fw fa-closed-captioning"></i>
            Subtitles/CC
            </span>
            <span>
            ${subtitles ? subtitles[0].long : null}
            <i class="far fa-fw fa-chevron-right"></i>
            </span>
        </button>
        </li>
        <li>
        <button type="button" id="playback-speed" class="flex justify-between items-center w-full text-left">
            <span>
            <i class="far fa-fw fa-gauge"></i> Playback Speed
            </span>
            <span class="indicator">
            Normal <i class="far fa-fw fa-chevron-right"></i>
            </span>
        </button>
        </li>
        <ul class="settings-menu-panel text-sm">
        <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Quality</li>
        </ul>
        <ul class="settings-menu-panel text-sm">
        <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Subtitles/CC</li>
        ${subtitles?.map((caption) => {
            return `<li><button data-lang="${caption.short}" type="button" class="w-full text-left">${caption.long} <i class="fas fa-fw fa-check ${caption.short == videoCaption ? "" : "hidden"}"></i></button></li>`
        }).join('')}
        </ul>
        <ul class="settings-menu-panel text-sm">
        <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Playback Speed</li>
        ${playbackSpeeds.map((speed) => {
            return `<li><button data-speed="${speed}" type="button" class="w-full text-left">${speed == 1 ? "Normal" : speed} <i class="fas fa-fw fa-check ${speed == playbackSpeed ? "" : "hidden"}"></i></button></li>`
        }).join('')}
        </ul>
    </ul>
    </div>
    </div>
    `
}

export { formatDuration, render }