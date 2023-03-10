var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './scss/main.scss';
import { formatDuration, render } from './utils/helpers';
import Hls from 'hls.js';
export class Videoary {
    constructor(options) {
        var _a;
        this.accentColor = "hsl(353, 86%, 54%)";
        this.theatreMode = true;
        this._isPlayed = false;
        this._currentVolume = 1;
        this._playbackSpeed = 1;
        this._idleTimer = null;
        this._idleState = false;
        this._idleDuration = 3500;
        this._playbackSpeeds = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2];
        this.options = Object.assign(this, options);
        this.subtitles = options.subtitles;
        this.video = options.video;
        this.theatreMode = options.theatreMode;
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
        this._durationIndicatorMobile = this._container.querySelector('#duration-indicator-mobile');
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
            settings: this._container.querySelector('#settings-button'),
            mobile: {
                play: this._container.querySelector('.play-btn-mobile'),
                fullscreen: this._container.querySelector('.fullscreen-btn-mobile'),
                volume: this._container.querySelector('.volume-btn-mobile'),
                settings: this._container.querySelector('.settings-btn-mobile'),
                captions: this._container.querySelector('.captions-btn-mobile')
            }
        };
        this._playIcon = (_a = this._buttons.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        this._videoCaptions = this._container.querySelectorAll('track');
        this._ambientCanvas = this._container.querySelector('canvas');
        this._ctx = this._ambientCanvas.getContext('2d');
        this._loader = this._container.querySelector('.loader');
        this._actionsWrapperMobile = this._container.querySelector('.actions-wrapper-mobile');
        this._settingsPanelMobile = this._container.querySelector('.settings-panel-mobile');
        this._settingsMenuPanelsMobile = this._settingsPanelMobile.querySelectorAll('.list li');
        this._overlay = this._container.querySelector('.overlay');
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function* () {
            document.documentElement.style.setProperty('--primaryColor', this.accentColor);
            if (!this.subtitles) {
                this._settingsButtons[1].classList.add('hidden');
                this._settingsMenuPanels[1].classList.add('hidden');
                (_a = this._buttons.captions) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
                (_b = this._buttons.mobile.captions) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
            }
            if (!this.theatreMode)
                (_d = (_c = this._buttons.theater) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add('hidden');
            yield this.loadVideo((_e = this.video) === null || _e === void 0 ? void 0 : _e.source);
            this.showLoader(false);
            this._videoCaptions.forEach(caption => caption.track.mode = "hidden");
            this.showBottomPanel();
            this._videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this));
            this._videoEl.addEventListener('ended', () => {
                var _a;
                this._playIcon.classList.replace('fa-pause', 'fa-play');
                const mobileIcon = (_a = this._buttons.mobile.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
                mobileIcon === null || mobileIcon === void 0 ? void 0 : mobileIcon.classList.replace('fa-pause', 'fa-play');
            });
            this._videoEl.addEventListener('timeupdate', this.runDuration.bind(this));
            this._videoEl.addEventListener('play', this.runAmbient.bind(this));
            this._container.addEventListener('contextmenu', (event) => event.preventDefault());
            this._container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this));
            this._videoEl.addEventListener('touchstart', () => {
                if (!this._videoEl.paused)
                    this._actionsWrapperMobile.classList.toggle('hide');
                if (this._actionsWrapperMobile.classList.contains('hide')) {
                    this._bottomPanel.classList.remove('showed-up');
                    this._captionsWrapper.classList.add('get-down');
                    this._overlay.classList.add('invisible');
                }
                else {
                    this._bottomPanel.classList.add('showed-up');
                    this._captionsWrapper.classList.remove('get-down');
                    this._overlay.classList.remove('invisible');
                }
            });
            document.addEventListener('touchstart', (event) => {
                const targetElement = event.target;
                if (!targetElement.closest('.videoary')) {
                    if (!this._videoEl.paused) {
                        this._actionsWrapperMobile.classList.add('hide');
                        this._bottomPanel.classList.remove('showed-up');
                        this._captionsWrapper.classList.add('get-down');
                        this._overlay.classList.add('invisible');
                    }
                }
            });
            this._settingsPanelMobile.addEventListener('touchstart', (event) => {
                const targetElement = event.target;
                if (!targetElement.closest('.settings-panel-mobile .wrapper'))
                    this._settingsPanelMobile.classList.remove('showed');
            });
            if (window.matchMedia('screen and (min-width: 768px)').matches) {
                this._videoEl.addEventListener('click', this.playVideo.bind(this));
                this._container.addEventListener('mousemove', this.idlingWatch.bind(this));
                this._container.addEventListener('mouseout', this.hideBottomPanel.bind(this));
                this._overlay.addEventListener('mouseover', this.showBottomPanel.bind(this));
                this._videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this));
                this._bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this));
                document.addEventListener('click', this.hideSettingsPanelOutside.bind(this));
            }
            document.addEventListener('keydown', this.keyEvents.bind(this));
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
            if (this.subtitles)
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
            const playbackSpeedButtons = this.settingsPanelButtons(2);
            this.settingsAction(playbackSpeedButtons, this._playbackSpeed, 'data-speed', (speed) => {
                this._videoEl.playbackRate = speed;
                const indicatorEl = this._settingsButtons[2].querySelector('span:nth-child(2)');
                indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`;
            });
            // For Subtitle Changer
            const captionsButtons = this.settingsPanelButtons(1);
            this.settingsAction(captionsButtons, this._videoCaption, 'data-lang', (caption) => {
                var _a;
                this._videoCaption = caption;
                this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption);
                this.runCaptions(this._selectedCaption);
                const indicatorEl = this._settingsButtons[1].querySelector('span:nth-child(2)');
                indicatorEl.innerHTML = `${`${(_a = this._selectedCaption) === null || _a === void 0 ? void 0 : _a.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
            });
            (_f = this._buttons.play) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.playVideo.bind(this));
            (_g = this._buttons.fullscreen) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.openFullScreen.bind(this));
            (_h = this._buttons.picInPic) === null || _h === void 0 ? void 0 : _h.addEventListener('click', this.openPIP.bind(this));
            (_j = this._buttons.captions) === null || _j === void 0 ? void 0 : _j.addEventListener('click', this.showCaptions.bind(this));
            (_k = this._buttons.volume) === null || _k === void 0 ? void 0 : _k.addEventListener('click', this.muteVolume.bind(this));
            (_l = this._buttons.theater) === null || _l === void 0 ? void 0 : _l.addEventListener('click', this.theaterMode.bind(this));
            (_m = this._buttons.settings) === null || _m === void 0 ? void 0 : _m.addEventListener('click', this.openSettings.bind(this));
            (_o = this._buttons.mobile.play) === null || _o === void 0 ? void 0 : _o.addEventListener('click', this.playVideo.bind(this));
            (_p = this._buttons.mobile.fullscreen) === null || _p === void 0 ? void 0 : _p.addEventListener('click', this.openFullScreen.bind(this));
            (_q = this._buttons.mobile.volume) === null || _q === void 0 ? void 0 : _q.addEventListener('click', () => {
                var _a;
                this.muteVolume();
                const icon = (_a = this._buttons.mobile.volume) === null || _a === void 0 ? void 0 : _a.querySelector('i');
                if (this._videoEl.muted) {
                    icon === null || icon === void 0 ? void 0 : icon.classList.replace('fa-volume', 'fa-volume-mute');
                }
                else {
                    icon === null || icon === void 0 ? void 0 : icon.classList.replace('fa-volume-mute', 'fa-volume');
                }
            });
            (_r = this._buttons.mobile.captions) === null || _r === void 0 ? void 0 : _r.addEventListener('click', this.showCaptions.bind(this));
            (_s = this._buttons.mobile.settings) === null || _s === void 0 ? void 0 : _s.addEventListener('click', () => this._settingsPanelMobile.classList.add('showed'));
            const settingsPanelMobileCloseButton = (_t = this._settingsPanelMobile) === null || _t === void 0 ? void 0 : _t.querySelector('.close-btn');
            settingsPanelMobileCloseButton === null || settingsPanelMobileCloseButton === void 0 ? void 0 : settingsPanelMobileCloseButton.addEventListener('click', () => this._settingsPanelMobile.classList.remove('showed'));
        });
    }
    showLoader(status) {
        status ? this._loader.classList.remove('hide') : this._loader.classList.add('hide');
    }
    loadVideo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Hls.isSupported()) {
                const hls = new Hls({ startLevel: -1 });
                hls.attachMedia(this._videoEl);
                hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(url));
                hls.on(Hls.Events.ERROR, (event, { details }) => {
                    if (details === Hls.ErrorDetails.BUFFER_STALLED_ERROR)
                        this.showLoader(true);
                });
                hls.on(Hls.Events.FRAG_LOADING, () => this.showLoader(true));
                hls.on(Hls.Events.BUFFER_APPENDED, () => this.showLoader(false));
                hls.on(Hls.Events.FRAG_BUFFERED, () => this.showLoader(false));
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    var _a, _b;
                    const availableQualities = hls.levels.map((level, index) => {
                        return { resolution: level.height, index };
                    });
                    availableQualities.unshift({ resolution: 0, index: -1 });
                    const captionsSelect = this._settingsMenuPanelsMobile[0].querySelector('select');
                    const mobileQualitySelect = this._settingsMenuPanelsMobile[1].querySelector('select');
                    const playbackSpeedSelect = this._settingsMenuPanelsMobile[2].querySelector('select');
                    if (!this.subtitles)
                        (_a = captionsSelect.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
                    captionsSelect.addEventListener('change', (event) => {
                        const targetElement = event.target;
                        this._videoCaption = targetElement.value;
                        this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption);
                        this.runCaptions(this._selectedCaption);
                    });
                    mobileQualitySelect.addEventListener('change', (event) => {
                        const targetElement = event.target;
                        hls.nextLevel = Number(targetElement.value);
                    });
                    playbackSpeedSelect.addEventListener('change', (event) => {
                        const targetElement = event.target;
                        this._videoEl.playbackRate = Number(targetElement.value);
                    });
                    (_b = this.subtitles) === null || _b === void 0 ? void 0 : _b.forEach(caption => captionsSelect.innerHTML += `<option value="${caption.short}">${caption.long}</option>`);
                    this._playbackSpeeds.forEach(speed => {
                        playbackSpeedSelect.innerHTML += `<option ${speed == 1 ? 'selected' : ''} value="${speed}">${`${speed == 1 ? 'Normal' : speed}`}</option>`;
                    });
                    availableQualities.forEach((quality) => {
                        this._settingsMenuPanels[0].innerHTML += `<li><button data-quality="${quality.index}" type="button" class="w-full text-left quality-button">${quality.resolution == 0 ? "Auto" : `${quality.resolution}p`} <i class="fas fa-fw fa-check ${quality.index != -1 ? "hidden" : ""}"></i></button></li>`;
                        // For Mobile
                        mobileQualitySelect.innerHTML += `<option value="${quality.index}">${quality.resolution == 0 ? "Auto" : `${quality.resolution}p`}</option>`;
                    });
                    const qualityButtons = this._container.querySelectorAll('.quality-button');
                    const qualitySettingIndicator = this._settingsButtons[0].querySelector('span:last-child');
                    qualityButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            qualityButtons.forEach(button => {
                                const icon = button.querySelector('i');
                                icon === null || icon === void 0 ? void 0 : icon.classList.add('hidden');
                            });
                            const qualityIndex = button.getAttribute('data-quality');
                            hls.nextLevel = Number(qualityIndex);
                            qualitySettingIndicator.innerHTML = `${button.textContent} <i class="far fa-fw fa-chevron-right"></i>`;
                            const icon = button.querySelector('i');
                            icon === null || icon === void 0 ? void 0 : icon.classList.remove('hidden');
                            this.hideSettingsMenuPanel();
                        });
                    });
                });
            }
            this._videoEl.load();
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
        var _a, _b;
        const icon = (_a = this._buttons.fullscreen) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        const mobileIcon = (_b = this._buttons.mobile.fullscreen) === null || _b === void 0 ? void 0 : _b.querySelector('i');
        if (document.fullscreenElement) {
            mobileIcon.classList.replace('fa-expand', 'fa-compress');
            icon.classList.replace('fa-expand', 'fa-compress');
        }
        else {
            mobileIcon.classList.replace('fa-compress', 'fa-expand');
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
    loadedVideo() {
        this._durationIndicator.textContent = `0:00 / ${formatDuration(this._videoEl.duration)}`;
        this._durationIndicatorMobile.textContent = `0:00 / ${formatDuration(this._videoEl.duration)}`;
        this._durationSlider.max = String(this._videoEl.duration);
        this._volumeSlider.value = String(this._videoEl.volume);
    }
    runDuration() {
        const time = this._videoEl.currentTime;
        const duration = this._videoEl.duration;
        const bufferedProgressEl = this._container.querySelector('.buffered-progress');
        if (this._videoEl.buffered.length > 0) {
            let width = 100 * (this._videoEl.buffered.end(0)) / duration;
            bufferedProgressEl.style.width = `${String(width)}%`;
        }
        this._durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(duration)}`;
        this._durationIndicatorMobile.textContent = `${formatDuration(time)} / ${formatDuration(duration)}`;
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
        var _a, _b;
        this._captionsWrapper.classList.toggle('active');
        const icon = (_a = this._buttons.captions) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        const mobileIcon = (_b = this._buttons.mobile.captions) === null || _b === void 0 ? void 0 : _b.querySelector('i');
        if (this._captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('far', 'fas');
            mobileIcon === null || mobileIcon === void 0 ? void 0 : mobileIcon.classList.replace('far', 'fas');
        }
        else {
            this.showToast('Closed Captions is Off');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('fas', 'far');
            mobileIcon === null || mobileIcon === void 0 ? void 0 : mobileIcon.classList.replace('fas', 'far');
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
        var _a;
        this._posterEl.classList.add('hide');
        const mobileIcon = (_a = this._buttons.mobile.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (this._videoEl.paused) {
            mobileIcon.classList.replace('fa-play', 'fa-pause');
            this._playIcon.classList.replace('fa-play', 'fa-pause');
            this._videoEl.play();
            this._isPlayed = true;
        }
        else {
            mobileIcon.classList.replace('fa-pause', 'fa-play');
            this._playIcon.classList.replace('fa-pause', 'fa-play');
            this._videoEl.pause();
            this.showBottomPanel();
            this._isPlayed = false;
        }
    }
    idlingWatch(event) {
        const elementTarget = event.target;
        clearTimeout(this._idleTimer || 0);
        if (this._idleState) {
            this._actionsWrapperMobile.classList.remove('hide');
            this.showBottomPanel();
        }
        this._idleState = false;
        this._idleTimer = setTimeout(() => {
            if (!elementTarget.closest('.videoary__bottom-panel') || !elementTarget.closest('.play-btn-mobile')) {
                if (!this._videoEl.paused) {
                    this.hideBottomPanel();
                }
                this._idleState = true;
                this._container.style.cursor = "none";
            }
        }, this._idleDuration);
    }
    hideBottomPanel() {
        if (this._videoEl.paused || this._settingsMenu.classList.contains('active')) {
            this.showBottomPanel();
            this._overlay.classList.remove('invisible');
        }
        else {
            this._captionsWrapper.classList.add('get-down');
            this._bottomPanel.classList.remove('showed-up');
            this._overlay.classList.add('invisible');
        }
    }
    showBottomPanel() {
        this._actionsWrapperMobile.classList.remove('hide');
        this._container.style.cursor = "default";
        this._bottomPanel.classList.add('showed-up');
        this._captionsWrapper.classList.remove('get-down');
        this._overlay.classList.remove('invisible');
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
