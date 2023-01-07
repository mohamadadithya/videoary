import './scss/main.scss';
import { formatDuration, render } from './utils/helpers';
export class Videoary {
    constructor(options) {
        var _a;
        this.isPlayed = false;
        this.currentVolume = 1;
        this.playbackSpeed = 1;
        this.idleTimer = 0;
        this.idleState = false;
        this.idleDuration = 3500;
        this.playbackSpeeds = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2];
        this.options = Object.assign(this, options);
        this.subtitles = options.subtitles;
        this.video = options.video;
        this.videoCaption = this.subtitles ? this.subtitles[0].short : null;
        this.containerArea = options.containerArea;
        render(this.containerArea, this.video, this.subtitles, this.playbackSpeed, this.playbackSpeeds, this.videoCaption);
        this.container = this.containerArea.querySelector('.videoary');
        this.settingsMenuPanels = this.container.querySelectorAll('.settings-menu-panel');
        this.tooltips = this.container.querySelectorAll('div[role="tooltip"]');
        this.settingsButtons = this.container.querySelectorAll('.settings-menu > li button');
        this.durationSlider = this.container.querySelector('input:is(#duration)');
        this.volumeSlider = this.container.querySelector('input:is(#volume)');
        this.durationIndicator = this.container.querySelector('#duration-indicator');
        this.videoEl = this.container.querySelector('video');
        this.bottomPanel = this.container.querySelector('.videoary__bottom-panel');
        this.toast = this.container.querySelector('.toast');
        this.posterEl = this.container.querySelector('.poster');
        this.settingsMenu = this.container.querySelector('.settings-menu');
        this.captionsWrapper = this.container.querySelector('.captions-wrapper');
        this.captionsArray = Array.from(this.videoEl.textTracks);
        this.selectedCaption = this.captionsArray.find(caption => caption.language == this.videoCaption);
        this.buttons = {
            play: this.container.querySelector('#play-button'),
            volume: this.container.querySelector('#volume-button'),
            fullscreen: this.container.querySelector('#fullscreen-button'),
            captions: this.container.querySelector('#closed-captions-button'),
            picInPic: this.container.querySelector('#pic-in-pic-button'),
            theater: this.container.querySelector('#theater-button'),
            settings: this.container.querySelector('#settings-button')
        };
        this.playIcon = (_a = this.buttons.play) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        this.videoCaptions = this.container.querySelectorAll('track');
    }
    init() {
        var _a, _b, _c, _d, _e, _f, _g;
        this.videoCaptions.forEach(caption => caption.track.mode = "hidden");
        this.container.addEventListener('contextmenu', (event) => event.preventDefault());
        this.bottomPanel.classList.add('showed-up');
        this.videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this));
        this.videoEl.addEventListener('click', this.playVideo.bind(this));
        this.videoEl.addEventListener('ended', () => this.playIcon.classList.replace('fa-pause', 'fa-play'));
        this.videoEl.addEventListener('timeupdate', this.runDuration.bind(this));
        this.container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this));
        this.container.addEventListener('mousemove', this.idleWatch.bind(this));
        this.videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this));
        this.bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this));
        this.container.addEventListener('mouseout', this.hideBottomPanel.bind(this));
        document.addEventListener('keydown', this.keyEvents.bind(this));
        document.addEventListener('click', this.hideSettingsPanelOutside.bind(this));
        this.durationSlider.addEventListener('input', this.seekingVideo.bind(this));
        this.durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this));
        this.volumeSlider.addEventListener('click', (event) => event.stopPropagation());
        this.volumeSlider.addEventListener('input', this.seekingVolume.bind(this));
        window.addEventListener('click', () => this.volumeSlider.classList.remove('active'));
        this.runCaptions(this.selectedCaption);
        this.videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this));
        // Hide All Settings Buttons
        this.settingsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.settingsMenu.classList.add('hide');
                const panel = this.settingsMenuPanels[index];
                panel.classList.add('show');
                const backButton = panel.querySelector('button:is(.action)');
                backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this));
            });
        });
        // For Playback Speed Changer
        const playbackSpeedButtons = this.settingsPanelButtons(1);
        this.settingsAction(playbackSpeedButtons, this.playbackSpeed, 'data-speed', (speed) => {
            this.videoEl.playbackRate = speed;
            const indicatorEl = this.settingsButtons[1].querySelector('span:nth-child(2)');
            indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`;
        });
        // For Subtitle Changer
        const captionsButtons = this.settingsPanelButtons(0);
        this.settingsAction(captionsButtons, this.videoCaption, 'data-lang', (caption) => {
            var _a;
            this.videoCaption = caption;
            this.selectedCaption = this.captionsArray.find(caption => caption.language == this.videoCaption);
            this.runCaptions(this.selectedCaption);
            const indicatorEl = this.settingsButtons[0].querySelector('span:nth-child(2)');
            indicatorEl.innerHTML = `${`${(_a = this.selectedCaption) === null || _a === void 0 ? void 0 : _a.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
        });
        (_a = this.buttons.play) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.playVideo.bind(this));
        (_b = this.buttons.fullscreen) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.openFullScreen.bind(this));
        (_c = this.buttons.picInPic) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.openPIP.bind(this));
        (_d = this.buttons.captions) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.showCaptions.bind(this));
        (_e = this.buttons.volume) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.muteVolume.bind(this));
        (_f = this.buttons.theater) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.theaterMode.bind(this));
        (_g = this.buttons.settings) === null || _g === void 0 ? void 0 : _g.addEventListener('click', this.openSettings.bind(this));
    }
    hideSettingsPanelOutside(event) {
        const targetElement = event.target;
        if (targetElement.closest('#settings-button') || targetElement.closest('.settings-menu'))
            return;
        this.settingsMenu.classList.remove('active');
        setTimeout(() => this.hideSettingsMenuPanel(), 300);
        if (!targetElement.closest('#videoary video'))
            this.hideBottomPanel();
    }
    fullscreenChange() {
        var _a;
        const icon = (_a = this.buttons.fullscreen) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress');
        }
        else {
            icon.classList.replace('fa-compress', 'fa-expand');
        }
    }
    seekingVideo(event) {
        const targetElement = event.target;
        this.videoEl.pause();
        this.videoEl.currentTime = Number(targetElement.value);
        this.container.classList.add('seeking');
        this.videoEl.volume = 0;
    }
    seekingVideoPaused() {
        this.isPlayed ? this.videoEl.play() : this.videoEl.pause();
        this.container.classList.remove('seeking');
        this.videoEl.volume = 1;
    }
    seekingVolume(event) {
        this.volumeSlider.classList.add('active');
        const targetElement = event.target;
        this.videoEl.volume = Number(targetElement.value);
        this.videoEl.volume > 0 ? this.videoEl.muted = false : this.videoEl.muted = true;
        this.changeMuteIcon();
    }
    keyEvents(event) {
        this.showBottomPanel();
        setTimeout(() => {
            this.hideBottomPanel();
            this.container.style.cursor = "none";
        }, this.idleDuration);
        if (event.key == "ArrowRight") {
            this.videoEl.currentTime += 5;
        }
        else if (event.key == "ArrowLeft") {
            this.videoEl.currentTime -= 5;
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
        this.durationIndicator.textContent = `0:00 / ${formatDuration(indicatorEl.duration)}`;
        this.durationSlider.max = indicatorEl.duration.toString();
        this.volumeSlider.value = indicatorEl.volume.toString();
    }
    runDuration() {
        const time = this.videoEl.currentTime;
        this.durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(this.videoEl.duration)}`;
        this.durationSlider.value = time.toString();
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
        this.videoCaptions.forEach(caption => caption.track.mode = "disabled");
        caption.mode = "hidden";
        caption.addEventListener("cuechange", (event) => {
            const cues = event.target.activeCues;
            if (cues && cues.length > 0) {
                const cue = cues[0];
                this.captionsWrapper.textContent = cue.text;
            }
            else {
                this.captionsWrapper.textContent = "";
            }
            this.videoEl.addEventListener('ended', () => this.captionsWrapper.textContent = "");
        });
    }
    openFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
                .then(() => console.log('Document exited from fullscreen mode'))
                .catch((error) => console.error(error));
        }
        else {
            this.container.requestFullscreen();
        }
    }
    openSettings(event) {
        const icon = event.target;
        icon.style.transition = '.3s all ease';
        this.settingsMenu.classList.toggle('active');
        setTimeout(this.hideSettingsMenuPanel, 300);
        if (this.settingsMenu.classList.contains('active')) {
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
        this.settingsMenu.classList.remove('hide');
    }
    showToast(text) {
        this.toast.classList.add("active");
        setTimeout(() => this.toast.classList.remove('active'), 2000);
        this.toast.textContent = text;
    }
    showCaptions() {
        var _a;
        this.captionsWrapper.classList.toggle('active');
        const icon = (_a = this.buttons.captions) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        if (this.captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('far', 'fas');
        }
        else {
            this.showToast('Closed Captions is Off');
            icon === null || icon === void 0 ? void 0 : icon.classList.replace('fas', 'far');
        }
    }
    playVideo() {
        this.posterEl.classList.add('hide');
        if (this.videoEl.paused) {
            this.playIcon.classList.replace('fa-play', 'fa-pause');
            this.videoEl.play();
            this.isPlayed = true;
        }
        else {
            this.playIcon.classList.replace('fa-pause', 'fa-play');
            this.videoEl.pause();
            this.showBottomPanel();
            this.isPlayed = false;
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
                this.container.style.cursor = "none";
            }
        }, this.idleDuration);
    }
    hideBottomPanel() {
        if (this.videoEl.paused || this.settingsMenu.classList.contains('active')) {
            this.showBottomPanel();
        }
        else {
            this.captionsWrapper.classList.add('get-down');
            this.bottomPanel.classList.remove('showed-up');
        }
    }
    showBottomPanel() {
        this.container.style.cursor = "default";
        this.bottomPanel.classList.add('showed-up');
        this.captionsWrapper.classList.remove('get-down');
    }
    openPIP() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        }
        else if (document.pictureInPictureEnabled) {
            this.videoEl.requestPictureInPicture();
        }
    }
    changeMuteIcon() {
        const icon = this.buttons.volume;
        const { volume } = this.videoEl;
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
        const { muted } = this.videoEl;
        if (muted) {
            this.videoEl.muted = false;
            this.videoEl.volume = this.currentVolume;
            this.volumeSlider.value = this.currentVolume.toString();
        }
        else if (!muted) {
            this.currentVolume = Number(this.volumeSlider.value);
            this.videoEl.muted = true;
            this.videoEl.volume = 0;
            this.volumeSlider.value = "0";
        }
    }
    theaterMode() {
        var _a, _b;
        this.container.classList.toggle('theater-mode');
        const icon = (_a = this.buttons.theater) === null || _a === void 0 ? void 0 : _a.querySelector('i');
        const tooltip = (_b = this.buttons.theater) === null || _b === void 0 ? void 0 : _b.nextElementSibling;
        if (this.container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On');
            this.container.style.height = `${this.videoEl.videoHeight}px`;
            icon.style.fontSize = '.9rem';
            tooltip.textContent = "Default View (t)";
        }
        else {
            this.showToast('Theater Mode is Off');
            this.container.style.height = `100%`;
            icon.style.fontSize = '1.3rem';
            tooltip.textContent = "Theater Mode (t)";
        }
    }
    leavePIP() {
        const wasPlaying = !this.videoEl.paused;
        setTimeout(() => {
            if (!this.videoEl.paused) {
                this.playIcon.classList.replace('fa-play', 'fa-play');
            }
            else if (wasPlaying) {
                this.playIcon.classList.replace('fa-pause', 'fa-play');
            }
        }, 0);
    }
}
