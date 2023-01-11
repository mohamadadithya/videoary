var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import '../scss/main.scss';
import { formatDuration, render } from './utils/helpers';
export class Videoary {
    constructor(options) {
        var _a;
        this._isPlayed = false;
        this._currentVolume = 1;
        this._playbackSpeed = 1;
        this._idleTimer = 0;
        this._idleState = false;
        this._idleDuration = 3500;
        this._playbackSpeeds = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2];
        this.options = Object.assign(this, options);
        this.subtitles = options.subtitles;
        this.video = options.video;
        this._videoCaption = this.subtitles ? this.subtitles[0].short : null;
        this.containerArea = options.containerArea;
        render(this.containerArea, this.video, this.subtitles, this._playbackSpeed, this._playbackSpeeds, this._videoCaption);
        this._container = this.containerArea.querySelector('.videoary');
        this._settingsMenuPanels = this._container.querySelectorAll('.settings-menu-panel');
        this._tooltips = this._container.querySelectorAll('div[role="tooltip"]');
        this._settingsButtons = this._container.querySelectorAll('.settings-menu > li button');
        this._durationSlider = this._container.querySelector('input:is(#duration)');
        this._volumeSlider = this._container.querySelector('input:is(#volume)');
        this._durationIndicator = this._container.querySelector('#duration-indicator');
        this._videoEl = this._container.querySelector('video');
        this._bottomPanel = this._container.querySelector('.videoary__bottom-panel');
        this._toast = this._container.querySelector('.toast');
        this._posterEl = this._container.querySelector('.poster');
        this._settingsMenu = this._container.querySelector('.settings-menu');
        this._captionsWrapper = this._container.querySelector('.captions-wrapper');
        this._captionsArray = Array.from(this._videoEl.textTracks);
        this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption);
        this._buttons = {
            play: this._container.querySelector('#play-button'),
            volume: this._container.querySelector('#volume-button'),
            fullscreen: this._container.querySelector('#fullscreen-button'),
            captions: this._container.querySelector('#closed-captions-button'),
            picInPic: this._container.querySelector('#pic-in-pic-button'),
            theater: this._container.querySelector('#theater-button'),
            settings: this._container.querySelector('#settings-button')
        };
        this._playIcon = (_a = this._buttons.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        this._videoCaptions = this._container.querySelectorAll('track');
        this._ambientCanvas = this._container.querySelector('canvas');
        this._ctx = this._ambientCanvas.getContext('2d');
        this._loader = this._container.querySelector('.loader');
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.convertToBlob((_a = this.video) === null || _a === void 0 ? void 0 : _a.source);
            this._loader.classList.add('hide');
            this._videoCaptions.forEach(caption => caption.track.mode = "hidden");
            this._bottomPanel.classList.add('showed-up');
            this._videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this));
            this._videoEl.addEventListener('click', this.playVideo.bind(this));
            this._videoEl.addEventListener('ended', () => this._playIcon.classList.replace('fa-pause', 'fa-play'));
            this._videoEl.addEventListener('timeupdate', this.runDuration.bind(this));
            this._videoEl.addEventListener('play', this.runAmbient.bind(this));
            this._container.addEventListener('contextmenu', (event) => event.preventDefault());
            this._container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this));
            this._container.addEventListener('mousemove', this.idlingWatch.bind(this));
            this._container.addEventListener('mouseout', this.hideBottomPanel.bind(this));
            this._videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this));
            this._bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this));
            document.addEventListener('keydown', this.keyEvents.bind(this));
            document.addEventListener('click', this.hideSettingsPanelOutside.bind(this));
            this._durationSlider.addEventListener('input', this.seekingVideo.bind(this));
            this._durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this));
            this._volumeSlider.addEventListener('click', (event) => event.stopPropagation());
            this._volumeSlider.addEventListener('input', this.seekingVolume.bind(this));
            window.addEventListener('click', () => this._volumeSlider.classList.remove('active'));
            window.addEventListener('resize', () => {
                this.setCanvasDimension();
                if (this._videoEl.paused)
                    this.paintStaticVideo();
            });
            this._videoEl.addEventListener('seeked', this.paintStaticVideo.bind(this));
            this.runCaptions(this._selectedCaption);
            this._videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this));
            // Hide All Settings Buttons
            this._settingsButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    this._settingsMenu.classList.add('hide');
                    const panel = this._settingsMenuPanels[index];
                    panel.classList.add('show');
                    const backButton = panel.querySelector('button:is(.action)');
                    backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this));
                });
            });
            // For Playback Speed Changer
            const playbackSpeedButtons = this.settingsPanelButtons(1);
            this.settingsAction(playbackSpeedButtons, this._playbackSpeed, 'data-speed', (speed) => {
                this._videoEl.playbackRate = speed;
                const indicatorEl = this._settingsButtons[1].querySelector('span:nth-child(2)');
                indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`;
            });
            // For Subtitle Changer
            const captionsButtons = this.settingsPanelButtons(0);
            this.settingsAction(captionsButtons, this._videoCaption, 'data-lang', (caption) => {
                var _a;
                this._videoCaption = caption;
                this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption);
                this.runCaptions(this._selectedCaption);
                const indicatorEl = this._settingsButtons[0].querySelector('span:nth-child(2)');
                indicatorEl.innerHTML = `${`${(_a = this._selectedCaption) === null || _a === void 0 ? void 0 : _a.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
            });
            (_b = this._buttons.play) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.playVideo.bind(this));
            (_c = this._buttons.fullscreen) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.openFullScreen.bind(this));
            (_d = this._buttons.picInPic) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.openPIP.bind(this));
            (_e = this._buttons.captions) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.showCaptions.bind(this));
            (_f = this._buttons.volume) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.muteVolume.bind(this));
            (_g = this._buttons.theater) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.theaterMode.bind(this));
            (_h = this._buttons.settings) === null || _h === void 0 ? void 0 : _h.addEventListener('click', this.openSettings.bind(this));
        });
    }
    convertToBlob(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(url);
            const response = yield request.blob();
            const objectURL = URL.createObjectURL(response);
            this._videoEl.src = objectURL;
            const sourceEls = this._videoEl.querySelectorAll('source');
            sourceEls.forEach(element => element.src = objectURL);
        });
    }
    setCanvasDimension() {
        this._ambientCanvas.height = this._videoEl.offsetHeight;
        this._ambientCanvas.width = this._videoEl.offsetWidth;
    }
    paintStaticVideo() {
        this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight);
    }
    hideSettingsPanelOutside(event) {
        const targetElement = event.target;
        if (targetElement.closest('#settings-button') || targetElement.closest('.settings-menu'))
            return;
        this._settingsMenu.classList.remove('active');
        setTimeout(() => this.hideSettingsMenuPanel(), 300);
        if (!targetElement.closest('#videoary video'))
            this.hideBottomPanel();
    }
    fullscreenChange() {
        var _a;
        const icon = (_a = this._buttons.fullscreen) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress');
        }
        else {
            icon.classList.replace('fa-compress', 'fa-expand');
        }
    }
    seekingVideo(event) {
        const targetElement = event.target;
        this._videoEl.pause();
        this._videoEl.currentTime = Number(targetElement.value);
        this._container.classList.add('seeking');
        this._videoEl.volume = 0;
    }
    seekingVideoPaused() {
        this._isPlayed ? this._videoEl.play() : this._videoEl.pause();
        this._container.classList.remove('seeking');
        this._videoEl.volume = 1;
    }
    seekingVolume(event) {
        this._volumeSlider.classList.add('active');
        const targetElement = event.target;
        this._videoEl.volume = Number(targetElement.value);
        this._videoEl.volume > 0 ? this._videoEl.muted = false : this._videoEl.muted = true;
        this.changeMuteIcon();
    }
    keyEvents(event) {
        this.showBottomPanel();
        setTimeout(() => {
            this.hideBottomPanel();
            this._container.style.cursor = "none";
        }, this._idleDuration);
        if (event.key == "ArrowRight") {
            this._videoEl.currentTime += 5;
        }
        else if (event.key == "ArrowLeft") {
            this._videoEl.currentTime -= 5;
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
        this._durationIndicator.textContent = `0:00 / ${formatDuration(indicatorEl.duration)}`;
        this._durationSlider.max = indicatorEl.duration.toString();
        this._volumeSlider.value = indicatorEl.volume.toString();
    }
    runDuration() {
        const time = this._videoEl.currentTime;
        this._durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(this._videoEl.duration)}`;
        this._durationSlider.value = time.toString();
    }
    settingsPanelButtons(panelIndex) {
        return this._settingsMenuPanels[panelIndex].querySelectorAll('button:not(.action)');
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
        this._videoCaptions.forEach(caption => caption.track.mode = "disabled");
        caption.mode = "hidden";
        caption.addEventListener("cuechange", (event) => {
            const cues = event.target.activeCues;
            if (cues && cues.length > 0) {
                const cue = cues[0];
                this._captionsWrapper.textContent = cue.text;
            }
            else {
                this._captionsWrapper.textContent = "";
            }
            this._videoEl.addEventListener('ended', () => this._captionsWrapper.textContent = "");
        });
    }
    openFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
                .then(() => console.log('Document exited from fullscreen mode'))
                .catch((error) => console.error(error));
        }
        else {
            this._container.requestFullscreen();
        }
    }
    openSettings(event) {
        const icon = event.target;
        icon.style.transition = '.3s all ease';
        this._settingsMenu.classList.toggle('active');
        setTimeout(this.hideSettingsMenuPanel, 300);
        if (this._settingsMenu.classList.contains('active')) {
            this._tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'true'));
            icon.style.rotate = "30deg";
        }
        else {
            this._tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'false'));
            icon.style.rotate = "0deg";
        }
    }
    hideSettingsMenuPanel() {
        this._settingsMenuPanels.forEach(panel => panel.classList.remove('show'));
        this._settingsMenu.classList.remove('hide');
    }
    showToast(text) {
        this._toast.classList.add("active");
        setTimeout(() => this._toast.classList.remove('active'), 2000);
        this._toast.textContent = text;
    }
    showCaptions() {
        var _a;
        this._captionsWrapper.classList.toggle('active');
        const icon = (_a = this._buttons.captions) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (this._captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('far', 'fas');
        }
        else {
            this.showToast('Closed Captions is Off');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('fas', 'far');
        }
    }
    runAmbient() {
        const loop = () => {
            if (!this._videoEl.paused && !this._videoEl.ended) {
                this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight);
                setTimeout(loop, 1000 / 30);
            }
        };
        loop();
    }
    playVideo() {
        this._posterEl.classList.add('hide');
        if (this._videoEl.paused) {
            this._playIcon.classList.replace('fa-play', 'fa-pause');
            this._videoEl.play();
            this._isPlayed = true;
        }
        else {
            this._playIcon.classList.replace('fa-pause', 'fa-play');
            this._videoEl.pause();
            this.showBottomPanel();
            this._isPlayed = false;
        }
    }
    idlingWatch(event) {
        const elementTarget = event.target;
        clearTimeout(this._idleTimer);
        if (this._idleState)
            this.showBottomPanel();
        this._idleState = false;
        this._idleTimer = setTimeout(() => {
            if (!elementTarget.closest('.videoary__bottom-panel')) {
                console.log();
                this.hideBottomPanel();
                this._idleState = true;
                this._container.style.cursor = "none";
            }
        }, this._idleDuration);
    }
    hideBottomPanel() {
        if (this._videoEl.paused || this._settingsMenu.classList.contains('active')) {
            this.showBottomPanel();
        }
        else {
            this._captionsWrapper.classList.add('get-down');
            this._bottomPanel.classList.remove('showed-up');
        }
    }
    showBottomPanel() {
        this._container.style.cursor = "default";
        this._bottomPanel.classList.add('showed-up');
        this._captionsWrapper.classList.remove('get-down');
    }
    openPIP() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
        else if (document.pictureInPictureEnabled) {
            this._videoEl.requestPictureInPicture();
        }
    }
    changeMuteIcon() {
        const icon = this._buttons.volume;
        const { volume } = this._videoEl;
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
        const { muted } = this._videoEl;
        if (muted) {
            this._videoEl.muted = false;
            this._videoEl.volume = this._currentVolume;
            this._volumeSlider.value = this._currentVolume.toString();
        }
        else if (!muted) {
            this._currentVolume = Number(this._volumeSlider.value);
            this._videoEl.muted = true;
            this._videoEl.volume = 0;
            this._volumeSlider.value = "0";
        }
    }
    theaterMode() {
        var _a, _b;
        this._container.classList.toggle('theater-mode');
        const icon = (_a = this._buttons.theater) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        const tooltip = (_b = this._buttons.theater) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
        if (this._container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On');
            this._container.style.height = `${this._videoEl.videoHeight}px`;
            icon.style.fontSize = '.9rem';
            tooltip.textContent = "Default View (t)";
        }
        else {
            this.showToast('Theater Mode is Off');
            this._container.style.height = `100%`;
            icon.style.fontSize = '1.3rem';
            tooltip.textContent = "Theater Mode (t)";
        }
    }
    leavePIP() {
        const wasPlaying = !this._videoEl.paused;
        setTimeout(() => {
            if (!this._videoEl.paused) {
                this._playIcon.classList.replace('fa-play', 'fa-play');
            }
            else if (wasPlaying) {
                this._playIcon.classList.replace('fa-pause', 'fa-play');
            }
        }, 0);
    }
}
