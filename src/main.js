var _a;
import './scss/main.scss';
import { formatDuration } from './utils/helpers';
const video = {
    src: 'dumb',
    poster: null
};
const subtitles = [
    {
        short: "en",
        long: 'English'
    }
];
const playbackSpeeds = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2];
let isPlayed = false;
let currentVolume;
let playbackSpeed;
let videoCaption = subtitles[0].short;
const appRoot = document.querySelector('#app');
appRoot.innerHTML = `
<div class="container videoary" id="videoary">
  <div class="toast"></div>
  <img class="poster" ${video.poster ? `src="/posters/${video.poster}"` : ''} />
  <video preload>
    <source src="/videos/${video.src}.mp4" type="video/mp4" />
    ${subtitles.map((caption) => {
    return `<track label="${caption.long}" kind="subtitles" srclang="${caption.short}" src="/captions/${video.src}/${caption.long.toLowerCase()}.vtt" default />`;
}).join('')}
  </video>
  <div class="captions-wrapper"></div>
  <div class="videoary__bottom-panel">
      <div class="duration-wrapper">
        <input type="range" name="duration" id="duration" value="0" min="0" step=".001">
      </div>
      <div class="actions-wrapper">
          <ul class="videoary__bottom-panel__actions">
              <li>
                <button id="play-button"><i class="fas fa-fw fa-play"></i></button>
                <div role="tooltip" aria-disabled="false" class="tooltip">Play (p)</div>
              </li>
              <li>
                <button><i class="fas fa-fw fa-volume" id="volume-button"></i></button>
                <div role="tooltip" aria-disabled="false" class="tooltip">Mute (m)</div>
                  <input type="range" name="volume" id="volume" min="0" max="1" step=".001" value="0">
              </li>
              <li>
                  <p id="duration-indicator"></p>
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
          <i class="far fa-fw fa-closed-captioning"></i>
          Subtitles/CC
        </span>
        <span>
          ${subtitles[0].long}
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
      <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Subtitles/CC</li>
      ${subtitles.map((caption) => {
    return `<li><button data-lang="${caption.short}" type="button" class="w-full text-left">${caption.long} <i class="fas fa-fw fa-check ${caption.short == videoCaption ? "" : "hidden"}"></i></button></li>`;
}).join('')}
    </ul>
    <ul class="settings-menu-panel text-sm">
      <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Playback Speed</li>
      ${playbackSpeeds.map((speed) => {
    return `<li><button data-speed="${speed}" type="button" class="w-full text-left">${speed == 1 ? "Normal" : speed} <i class="fas fa-fw fa-check ${speed == playbackSpeed ? "" : "hidden"}"></i></button></li>`;
}).join('')}
    </ul>
  </ul>
  </div>
</div>
`;
const container = document.getElementById('videoary');
const durationSlider = container.querySelector('input:is(#duration)');
const volumeSlider = container.querySelector('input:is(#volume)');
const durationIndicator = container.querySelector('#duration-indicator');
const videoEl = container.querySelector('video');
const bottomPanel = container.querySelector('.videoary__bottom-panel');
const toast = container.querySelector('.toast');
const posterEl = container.querySelector('.poster');
const settingsMenu = container.querySelector('.settings-menu');
const captionsWrapper = container.querySelector('.captions-wrapper');
const buttons = {
    play: document.querySelector('#play-button'),
    volume: document.getElementById('volume-button'),
    fullscreen: document.getElementById('fullscreen-button'),
    captions: document.getElementById('closed-captions-button'),
    picInPic: document.getElementById('pic-in-pic-button'),
    theater: document.getElementById('theater-button'),
    settings: document.getElementById('settings-button')
};
const playIcon = (_a = buttons.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
container.addEventListener('contextmenu', (e) => e.preventDefault());
// Default States //
bottomPanel.classList.add('showed-up');
const videoCaptions = container.querySelectorAll('track');
videoCaptions.forEach(caption => caption.track.mode = "hidden");
// Transform videoCaptions node list to array
const captionsArray = Array.from(videoEl.textTracks);
// Default caption
let selectedCaption = captionsArray.find(caption => caption.language == videoCaption);
class Videoary {
    constructor() {
        this.idleTimer = 0;
        this.idleState = false;
        this.idleDuration = 3500;
        this.settingsMenuPanels = container.querySelectorAll('.settings-menu-panel');
        this.tooltips = container.querySelectorAll('div[role="tooltip"]');
        this.settingsButtons = container.querySelectorAll('.settings-menu > li button');
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g;
        videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this));
        videoEl.addEventListener('click', this.playVideo.bind(this));
        videoEl.addEventListener('ended', () => playIcon.classList.replace('fa-pause', 'fa-play'));
        videoEl.addEventListener('timeupdate', this.runDuration.bind(this));
        container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this));
        container.addEventListener('mousemove', this.idleWatch.bind(this));
        videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this));
        bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this));
        container.addEventListener('mouseout', this.hideBottomPanel.bind(this));
        document.addEventListener('keydown', this.keyEvents.bind(this));
        document.addEventListener('click', this.hideSettingsPanelOutside.bind(this));
        durationSlider.addEventListener('input', this.seekingVideo.bind(this));
        durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this));
        volumeSlider.addEventListener('click', (event) => event.stopPropagation());
        volumeSlider.addEventListener('input', this.seekingVolume.bind(this));
        window.addEventListener('click', () => volumeSlider.classList.remove('active'));
        this.runCaptions(selectedCaption);
        videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this));
        // Hide All Settings Buttons
        this.settingsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.add('hide');
                const panel = this.settingsMenuPanels[index];
                panel.classList.add('show');
                const backButton = panel.querySelector('button:is(.action)');
                backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this));
            });
        });
        // For Playback Speed Changer
        const playbackSpeedButtons = this.settingsPanelButtons(1);
        this.settingsAction(playbackSpeedButtons, playbackSpeed, 'data-speed', (speed) => {
            videoEl.playbackRate = speed;
            const indicatorEl = this.settingsButtons[1].querySelector('span:nth-child(2)');
            indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`;
        });
        // For Subtitle Changer
        const captionsButtons = this.settingsPanelButtons(0);
        this.settingsAction(captionsButtons, videoCaption, 'data-lang', (caption) => {
            videoCaption = caption;
            selectedCaption = captionsArray.find(caption => caption.language == videoCaption);
            this.runCaptions(selectedCaption);
            const indicatorEl = this.settingsButtons[0].querySelector('span:nth-child(2)');
            indicatorEl.innerHTML = `${`${selectedCaption === null || selectedCaption === void 0 ? void 0 : selectedCaption.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
        });
        (_a = buttons.play) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.playVideo.bind(this));
        (_b = buttons.fullscreen) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.openFullScreen.bind(this));
        (_c = buttons.picInPic) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.openPIP.bind(this));
        (_d = buttons.captions) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.showCaptions.bind(this));
        (_e = buttons.volume) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.muteVolume.bind(this));
        (_f = buttons.theater) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.theaterMode.bind(this));
        (_g = buttons.settings) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.openSettings.bind(this));
    }
    hideSettingsPanelOutside(event) {
        const targetElement = event.target;
        if (targetElement.closest('#settings-button') || targetElement.closest('.settings-menu'))
            return;
        settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.remove('active');
        setTimeout(() => this.hideSettingsMenuPanel(), 300);
        if (!targetElement.closest('#videoary video'))
            this.hideBottomPanel();
    }
    fullscreenChange() {
        var _a;
        const icon = (_a = buttons.fullscreen) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress');
        }
        else {
            icon.classList.replace('fa-compress', 'fa-expand');
        }
    }
    seekingVideo(event) {
        const targetElement = event.target;
        videoEl.pause();
        videoEl.currentTime = Number(targetElement.value);
        container.classList.add('seeking');
        videoEl.volume = 0;
    }
    seekingVideoPaused() {
        isPlayed ? videoEl.play() : videoEl.pause();
        container.classList.remove('seeking');
        videoEl.volume = 1;
    }
    seekingVolume(event) {
        volumeSlider.classList.add('active');
        const targetElement = event.target;
        videoEl.volume = Number(targetElement.value);
        videoEl.volume > 0 ? videoEl.muted = false : videoEl.muted = true;
        this.changeMuteIcon();
    }
    keyEvents(event) {
        this.showBottomPanel();
        setTimeout(() => {
            this.hideBottomPanel();
            container.style.cursor = "none";
        }, this.idleDuration);
        if (event.key == "ArrowRight") {
            videoEl.currentTime += 5;
        }
        else if (event.key == "ArrowLeft") {
            videoEl.currentTime -= 5;
        }
        else if (event.key == " " || event.key == "p") {
            this.playVideo();
        }
        else if (event.key == "m") {
            this.muteVolume();
            this.changeMuteIcon();
        }
        else if (event.key == "i") {
            this.openPIP();
        }
        else if (event.key == "f") {
            this.openFullScreen();
        }
        else if (event.key == "t") {
            this.theaterMode();
        }
        else if (event.key == "c" && !event.ctrlKey) {
            this.showCaptions();
        }
    }
    loadedVideo(event) {
        const indicatorEl = event.target;
        durationIndicator.textContent = `0:00 / ${formatDuration(indicatorEl.duration)}`;
        durationSlider.max = indicatorEl.duration.toString();
        volumeSlider.value = indicatorEl.volume.toString();
    }
    runDuration() {
        const time = videoEl.currentTime;
        durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(videoEl.duration)}`;
        durationSlider.value = time.toString();
    }
    settingsPanelButtons(panelIndex) {
        return this.settingsMenuPanels[panelIndex].querySelectorAll('button:not(.action)');
    }
    settingsAction(actionButtons, initVariable, dataEl, callback) {
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                actionButtons.forEach(button => {
                    button.classList.remove('active');
                    const icon = button.querySelector('i');
                    icon.classList.add('hidden');
                });
                button.classList.add('active');
                const checkIcon = button.querySelector('i');
                checkIcon.classList.remove('hidden');
                this.hideSettingsMenuPanel();
                initVariable = button.getAttribute(dataEl);
                callback(initVariable);
            });
        });
    }
    runCaptions(caption) {
        videoCaptions.forEach(caption => caption.track.mode = "disabled");
        caption.mode = "hidden";
        caption.addEventListener("cuechange", function (event) {
            const cues = event.target.activeCues;
            if (cues && cues.length > 0) {
                const cue = cues[0];
                captionsWrapper.textContent = cue.text;
            }
            else {
                captionsWrapper.textContent = "";
            }
            videoEl.addEventListener('ended', () => captionsWrapper.textContent = "");
        });
    }
    openFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
                .then(() => console.log('Document exited from fullscreen mode'))
                .catch((error) => console.error(error));
        }
        else {
            container.requestFullscreen();
        }
    }
    openSettings(event) {
        const icon = event.target;
        icon.style.transition = '.3s all ease';
        settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.toggle('active');
        setTimeout(this.hideSettingsMenuPanel, 300);
        if (settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.contains('active')) {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'true'));
            icon.style.rotate = "30deg";
        }
        else {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'false'));
            icon.style.rotate = "0deg";
        }
    }
    hideSettingsMenuPanel() {
        this.settingsMenuPanels.forEach(panel => panel.classList.remove('show'));
        settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.remove('hide');
    }
    showToast(text) {
        toast.classList.add("active");
        setTimeout(() => toast.classList.remove('active'), 2000);
        toast.textContent = text;
    }
    showCaptions() {
        var _a;
        captionsWrapper.classList.toggle('active');
        const icon = (_a = buttons.captions) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('far', 'fas');
        }
        else {
            this.showToast('Closed Captions is Off');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('fas', 'far');
        }
    }
    playVideo() {
        posterEl.classList.add('hide');
        if (videoEl.paused) {
            playIcon.classList.replace('fa-play', 'fa-pause');
            videoEl.play();
            isPlayed = true;
        }
        else {
            playIcon.classList.replace('fa-pause', 'fa-play');
            videoEl.pause();
            this.showBottomPanel();
            isPlayed = false;
        }
    }
    idleWatch(event) {
        const elementTarget = event.target;
        clearTimeout(this.idleTimer);
        if (this.idleState)
            this.showBottomPanel();
        this.idleState = false;
        this.idleTimer = setTimeout(() => {
            if (!elementTarget.closest('.videoary__bottom-panel')) {
                console.log();
                this.hideBottomPanel();
                this.idleState = true;
                container.style.cursor = "none";
            }
        }, this.idleDuration);
    }
    hideBottomPanel() {
        if (videoEl.paused || (settingsMenu === null || settingsMenu === void 0 ? void 0 : settingsMenu.classList.contains('active'))) {
            this.showBottomPanel();
        }
        else {
            captionsWrapper.classList.add('get-down');
            bottomPanel.classList.remove('showed-up');
        }
    }
    showBottomPanel() {
        container.style.cursor = "default";
        bottomPanel.classList.add('showed-up');
        captionsWrapper.classList.remove('get-down');
    }
    openPIP() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
        else if (document.pictureInPictureEnabled) {
            videoEl.requestPictureInPicture();
        }
    }
    changeMuteIcon() {
        const icon = buttons.volume;
        const { volume } = videoEl;
        if (volume == 0) {
            if (icon.classList.contains('fa-volume-down')) {
                icon.classList.replace('fa-volume-down', 'fa-volume-mute');
            }
            else if (icon.classList.contains('fa-volume')) {
                icon.classList.replace('fa-volume', 'fa-volume-mute');
            }
        }
        else if (volume <= 0.5) {
            if (icon.classList.contains('fa-volume-mute')) {
                icon.classList.replace('fa-volume-mute', 'fa-volume-down');
            }
            else if (icon.classList.contains('fa-volume')) {
                icon.classList.replace('fa-volume', 'fa-volume-down');
            }
        }
        else {
            if (icon.classList.contains('fa-volume-mute')) {
                icon.classList.replace('fa-volume-mute', 'fa-volume');
            }
            else if (icon.classList.contains('fa-volume-down')) {
                icon.classList.replace('fa-volume-down', 'fa-volume');
            }
        }
    }
    muteVolume() {
        const { muted } = videoEl;
        if (muted) {
            videoEl.muted = false;
            videoEl.volume = currentVolume;
            volumeSlider.value = currentVolume.toString();
        }
        else if (!muted) {
            currentVolume = Number(volumeSlider.value);
            videoEl.muted = true;
            videoEl.volume = 0;
            volumeSlider.value = "0";
        }
    }
    theaterMode() {
        var _a, _b;
        container.classList.toggle('theater-mode');
        const icon = (_a = buttons.theater) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        const tooltip = (_b = buttons.theater) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
        if (container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On');
            container.style.height = `${videoEl.videoHeight}px`;
            icon.style.fontSize = '.9rem';
            tooltip.textContent = "Default View (t)";
        }
        else {
            this.showToast('Theater Mode is Off');
            container.style.height = `100%`;
            icon.style.fontSize = '1.3rem';
            tooltip.textContent = "Theater Mode (t)";
        }
    }
    leavePIP() {
        const wasPlaying = !videoEl.paused;
        setTimeout(() => {
            if (!videoEl.paused) {
                playIcon.classList.replace('fa-play', 'fa-play');
            }
            else if (wasPlaying) {
                playIcon.classList.replace('fa-pause', 'fa-play');
            }
        }, 0);
    }
}
const videoary = new Videoary();
videoary.init();
