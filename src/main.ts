import '../scss/main.scss'
import { formatDuration, render } from './utils/helpers'
import { Video, Subtitle } from './utils/types'
import Hls from 'hls.js'

export class Videoary {
    public containerArea: HTMLAreaElement
    public subtitles?: Subtitle[] | null
    public video?: Video
    public accentColor: string = "hsl(353, 86%, 54%)"
    public options
    private _isPlayed: Boolean = false
    private _currentVolume: number = 1
    private _playbackSpeed: number = 1
    private _container: HTMLAreaElement
    private _idleTimer: ReturnType<typeof setTimeout> = 0
    private _idleState: boolean = false
    private _idleDuration: number = 3500
    private _playbackSpeeds: Number[] = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2]
    private _settingsMenuPanels: NodeListOf<HTMLAreaElement>
    private _tooltips: NodeListOf<HTMLDivElement>
    private _settingsButtons: NodeListOf<HTMLButtonElement>
    private _durationSlider
    private _volumeSlider
    private _durationIndicator
    private _durationIndicatorMobile
    private _videoEl
    private _bottomPanel
    private _toast
    private _posterEl
    private _settingsMenu
    private _captionsWrapper
    private _captionsArray: TextTrack[]
    private _selectedCaption: TextTrack
    private _buttons
    private _playIcon: HTMLElement
    private _videoCaptions: NodeListOf<HTMLTrackElement>
    private _videoCaption: String | null
    private _ambientCanvas
    private _ctx
    private _loader
    private _actionsWrapperMobile: HTMLAreaElement
    private _settingsPanelMobile: HTMLAreaElement
    private _settingsMenuPanelsMobile: NodeListOf<HTMLAreaElement>

    constructor(options: Partial<Videoary>) {
        this.options = Object.assign(this, options)
        this.subtitles = options.subtitles
        this.video = options.video
        this._videoCaption = this.subtitles ? this.subtitles[0].short : null
        this.containerArea = options.containerArea as HTMLAreaElement
        render(this.containerArea, this.video, this.subtitles!, this._playbackSpeed, this._playbackSpeeds, this._videoCaption)
        this._container = this.containerArea.querySelector('.videoary') as HTMLAreaElement
        this._settingsMenuPanels = this._container.querySelectorAll('.settings-menu-panel')
        this._tooltips = this._container.querySelectorAll('div[role="tooltip"]')
        this._settingsButtons = this._container.querySelectorAll('.settings-menu > li button')
        this._durationSlider = this._container.querySelector('input:is(#duration)') as HTMLInputElement
        this._volumeSlider = this._container.querySelector('input:is(#volume)') as HTMLInputElement
        this._durationIndicator = this._container.querySelector('#duration-indicator') as HTMLElement
        this._durationIndicatorMobile = this._container.querySelector('#duration-indicator-mobile') as HTMLElement
        this._videoEl = this._container.querySelector('video') as HTMLVideoElement
        this._bottomPanel = this._container.querySelector('.videoary__bottom-panel') as HTMLAreaElement
        this._toast = this._container.querySelector('.toast') as HTMLParagraphElement
        this._posterEl = this._container.querySelector('.poster') as HTMLImageElement
        this._settingsMenu = this._container.querySelector('.settings-menu') as HTMLAreaElement
        this._captionsWrapper = this._container.querySelector('.captions-wrapper') as HTMLAreaElement
        this._captionsArray = Array.from(this._videoEl.textTracks)
        this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption) as TextTrack
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
                settings: this._container.querySelector('.settings-btn-mobile')
            }
        }
        this._playIcon = this._buttons.play?.querySelector('i') as HTMLElement
        this._videoCaptions = this._container.querySelectorAll('track')
        this._ambientCanvas = this._container.querySelector('canvas') as HTMLCanvasElement
        this._ctx = this._ambientCanvas.getContext('2d') as CanvasDrawImage
        this._loader = this._container.querySelector('.loader') as HTMLDivElement
        this._actionsWrapperMobile = this._container.querySelector('.actions-wrapper-mobile') as HTMLAreaElement
        this._settingsPanelMobile = this._container.querySelector('.settings-panel-mobile') as HTMLAreaElement
        this._settingsMenuPanelsMobile = this._settingsPanelMobile.querySelectorAll('.list li') as NodeListOf<HTMLAreaElement>
    }

    async init() {
        document.documentElement.style.setProperty('--primaryColor', this.accentColor)
        if(!this.subtitles) {
            this._settingsButtons[1].classList.add('hidden')
            this._settingsMenuPanels[1].classList.add('hidden')
            this._buttons.captions?.classList.add('hidden')
        }

        await this.loadVideo(this.video?.source!)
        this.showLoader(false)

        this._videoCaptions.forEach(caption => caption.track.mode = "hidden")
        this.showBottomPanel()

        this._videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this))
        this._videoEl.addEventListener('ended', () => this._playIcon.classList.replace('fa-pause', 'fa-play'))
        this._videoEl.addEventListener('timeupdate', this.runDuration.bind(this))
        this._videoEl.addEventListener('play', this.runAmbient.bind(this))

        this._container.addEventListener('contextmenu', (event: MouseEvent) => event.preventDefault())
        this._container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this))

        this._videoEl.addEventListener('touchstart', () => {
            this._actionsWrapperMobile.classList.toggle('hide')
            if(this._actionsWrapperMobile.classList.contains('hide')) {
                this._bottomPanel.classList.remove('showed-up')
                this._captionsWrapper.classList.add('get-down')
            } else {
                this._bottomPanel.classList.add('showed-up')
                this._captionsWrapper.classList.remove('get-down')
            }
        })
        
        document.addEventListener('touchstart', (event) => {
            const targetElement = event.target as HTMLElement
            if(!targetElement.closest('.videoary')) {
                this._actionsWrapperMobile.classList.add('hide')
                this._bottomPanel.classList.remove('showed-up')
                this._captionsWrapper.classList.add('get-down')
            }
        })

        if (window.matchMedia('screen and (min-width: 768px)').matches) {
            this._videoEl.addEventListener('click', this.playVideo.bind(this))
            this._container.addEventListener('mousemove', this.idlingWatch.bind(this))
            this._container.addEventListener('mouseout', this.hideBottomPanel.bind(this))
            this._videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this))
            this._bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this))
            document.addEventListener('click', this.hideSettingsPanelOutside.bind(this))
        }

        document.addEventListener('keydown', this.keyEvents.bind(this))

        this._durationSlider.addEventListener('input', this.seekingVideo.bind(this))
        this._durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this))
        this._volumeSlider.addEventListener('click', (event: Event) => event.stopPropagation())
        this._volumeSlider.addEventListener('input', this.seekingVolume.bind(this))
        
        window.addEventListener('click', () => this._volumeSlider.classList.remove('active'))
        window.addEventListener('resize', () => {
            this.setCanvasDimension()
            if(this._videoEl.paused) this.paintStaticVideo()
        })
        this._videoEl.addEventListener('seeked', this.paintStaticVideo.bind(this))

        if(this.subtitles) this.runCaptions(this._selectedCaption)
        this._videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this))

        // Hide All Settings Buttons
        this._settingsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              this._settingsMenu.classList.add('hide')
              const panel = this._settingsMenuPanels[index]
              panel.classList.add('show')
              const backButton = panel.querySelector('button:is(.action)') as HTMLButtonElement
              backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this))
            })
        })

        // For Playback Speed Changer
        const playbackSpeedButtons = this.settingsPanelButtons(2) as NodeListOf<HTMLButtonElement>

        this.settingsAction(playbackSpeedButtons, this._playbackSpeed, 'data-speed', (speed: number) => {
            this._videoEl.playbackRate = speed
            const indicatorEl = this._settingsButtons[2].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        // For Subtitle Changer
        const captionsButtons = this.settingsPanelButtons(1) as NodeListOf<HTMLButtonElement>
        this.settingsAction(captionsButtons, this._videoCaption, 'data-lang', (caption: any) => {
            this._videoCaption = caption
            this._selectedCaption = this._captionsArray.find(caption => caption.language == this._videoCaption) as TextTrack
            this.runCaptions(this._selectedCaption)
            const indicatorEl = this._settingsButtons[1].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${this._selectedCaption?.label} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        this._buttons.play?.addEventListener('click', this.playVideo.bind(this))
        this._buttons.fullscreen?.addEventListener('click', this.openFullScreen.bind(this))
        this._buttons.picInPic?.addEventListener('click', this.openPIP.bind(this))
        this._buttons.captions?.addEventListener('click', this.showCaptions.bind(this))
        this._buttons.volume?.addEventListener('click', this.muteVolume.bind(this))
        this._buttons.theater?.addEventListener('click', this.theaterMode.bind(this))
        this._buttons.settings?.addEventListener('click', this.openSettings.bind(this))
        this._buttons.mobile.play?.addEventListener('click', this.playVideo.bind(this))
        this._buttons.mobile.fullscreen?.addEventListener('click', this.openFullScreen.bind(this))
        this._buttons.mobile.volume?.addEventListener('click', () => {
            this.muteVolume()
            const icon = this._buttons.mobile.volume?.querySelector('i')
            if(this._videoEl.muted) {
                icon?.classList.replace('fa-volume', 'fa-volume-mute')
            } else {
                icon?.classList.replace('fa-volume-mute', 'fa-volume')
            }
        })
        this._buttons.mobile.settings?.addEventListener('click', () => this._settingsPanelMobile.classList.add('showed'))
        const settingsPanelMobileCloseButton = this._settingsPanelMobile?.querySelector('.close-btn')
        settingsPanelMobileCloseButton?.addEventListener('click', () => this._settingsPanelMobile.classList.remove('showed'))
    }

    private showLoader(status: boolean) {
        status ? this._loader.classList.remove('hide') : this._loader.classList.add('hide')
    }

    private async loadVideo(url: string) {
        if(Hls.isSupported()) {
            const hls = new Hls({ startLevel: -1 })
            hls.attachMedia(this._videoEl)
            hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(url))
            hls.on(Hls.Events.ERROR, (event, { details }) => {
                if(details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) this.showLoader(true)
            })
            hls.on(Hls.Events.FRAG_LOADING, () => this.showLoader(true))
            hls.on(Hls.Events.BUFFER_APPENDED, () => this.showLoader(false))
            hls.on(Hls.Events.FRAG_BUFFERED, () => this.showLoader(false))
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                const availableQualities = hls.levels.map((level, index) => {
                    return { resolution: level.height, index }
                })
                availableQualities.unshift({ resolution: 0, index: -1 })
                const captionsSelect = this._settingsMenuPanelsMobile[0].querySelector('select') as HTMLSelectElement
                const mobileQualitySelect = this._settingsMenuPanelsMobile[1].querySelector('select') as HTMLSelectElement
                const playbackSpeedSelect = this._settingsMenuPanelsMobile[2].querySelector('select') as HTMLSelectElement

                this.subtitles?.forEach(caption => {
                    captionsSelect.innerHTML += `<option value="${caption.short}">${caption.long}</option>`
                })

                this._playbackSpeeds.forEach(speed => {
                    playbackSpeedSelect.innerHTML += `<option ${speed == 1 ? 'selected' : ''} value="${speed}">${`${speed == 1 ? 'Normal' : speed}`}</option>`
                })
                
                availableQualities.forEach((quality) => {
                    this._settingsMenuPanels[0].innerHTML += `<li><button data-quality="${quality.index}" type="button" class="w-full text-left quality-button">${quality.resolution == 0 ? "Auto" : `${quality.resolution}p`} <i class="fas fa-fw fa-check ${quality.index != -1 ? "hidden" : ""}"></i></button></li>`
                    // For Mobile
                    mobileQualitySelect.innerHTML += `<option value="${quality.index}">${quality.resolution == 0 ? "Auto" : `${quality.resolution}p`}</option>`
                })

                const qualityButtons = this._container.querySelectorAll('.quality-button')
                const qualitySettingIndicator = this._settingsButtons[0].querySelector('span:last-child') as HTMLSpanElement
                qualityButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        qualityButtons.forEach(button => {
                            const icon = button.querySelector('i')
                            icon?.classList.add('hidden')
                        })
                        const qualityIndex = button.getAttribute('data-quality')
                        hls.nextLevel = Number(qualityIndex)
                        qualitySettingIndicator.innerHTML = `${button.textContent} <i class="far fa-fw fa-chevron-right"></i>`
                        const icon = button.querySelector('i')
                        icon?.classList.remove('hidden')
                        this.hideSettingsMenuPanel()
                    })
                })
            })
        }
        this._videoEl.load()
    }

    private setCanvasDimension() {
        this._ambientCanvas.height = this._videoEl.offsetHeight
        this._ambientCanvas.width = this._videoEl.offsetWidth
    }

    private paintStaticVideo() {
        this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight)
    }

    private hideSettingsPanelOutside(event: Event) {
        const targetElement = event.target as HTMLButtonElement
        if(targetElement.closest('#settings-button') || targetElement.closest('.settings-menu')) return
        this._settingsMenu.classList.remove('active')
        setTimeout(() => this.hideSettingsMenuPanel(), 300)
        if(!targetElement.closest('#videoary video')) this.hideBottomPanel()
    }

    private fullscreenChange() {
        const icon = this._buttons.fullscreen?.querySelector('i') as HTMLElement
        const mobileIcon = this._buttons.mobile.fullscreen?.querySelector('i') as HTMLElement
        if (document.fullscreenElement) {
            mobileIcon.classList.replace('fa-expand', 'fa-compress')
            icon.classList.replace('fa-expand', 'fa-compress')
        } else {
            mobileIcon.classList.replace('fa-compress', 'fa-expand')
            icon.classList.replace('fa-compress', 'fa-expand')
        }
    }

    private seekingVideo(event: Event) {
        const targetElement = event.target as HTMLInputElement
        this._videoEl.pause()
        this._videoEl.currentTime = Number(targetElement.value)
        this._container.classList.add('seeking')
        this._videoEl.volume = 0
    }

    private seekingVideoPaused() {
        this._isPlayed ? this._videoEl.play() : this._videoEl.pause()
        this._container.classList.remove('seeking')
        this._videoEl.volume = 1
    }

    private seekingVolume(event: Event) {
        this._volumeSlider.classList.add('active')
        const targetElement = event.target as HTMLInputElement
        this._videoEl.volume = Number(targetElement.value)
        this._videoEl.volume > 0 ? this._videoEl.muted = false : this._videoEl.muted = true
        this.changeMuteIcon()
    }

    private keyEvents(event: KeyboardEvent) {
        if (event.key == "ArrowRight") {
            this._videoEl.currentTime += 5
        } else if (event.key == "ArrowLeft") {
            this._videoEl.currentTime -= 5
        } else if (event.key == " " || event.key == "p") {
            this.playVideo()
        } else if (event.key == "m") {
            this.muteVolume()
            this.changeMuteIcon()
        } else if (event.key == "i") {
            this.openPIP()
        } else if (event.key == "f") {
            this.openFullScreen()
        } else if (event.key == "t") {
            this.theaterMode()
        } else if (event.key == "c" && !event.ctrlKey) {
            this.showCaptions()
        }
    }

    private loadedVideo() {
        this._durationIndicator.textContent = `0:00 / ${formatDuration(this._videoEl.duration)}`
        this._durationIndicatorMobile.textContent = `0:00 / ${formatDuration(this._videoEl.duration)}`
        this._durationSlider.max = String(this._videoEl.duration)
        this._volumeSlider.value = String(this._videoEl.volume)
    }

    private runDuration() {
        const time = this._videoEl.currentTime
        const duration = this._videoEl.duration
        const bufferedProgressEl = this._container.querySelector('.buffered-progress') as HTMLDivElement
        if(this._videoEl.buffered.length > 0) {
            let width = 100 * (this._videoEl.buffered.end(0)) / duration
            bufferedProgressEl.style.width = `${String(width)}%`
        }
        this._durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(duration)}`
        this._durationIndicatorMobile.textContent = `${formatDuration(time)} / ${formatDuration(duration)}`
        this._durationSlider.value = time.toString()
    }

    private settingsPanelButtons(panelIndex: number) {
        return this._settingsMenuPanels[panelIndex].querySelectorAll('button:not(.action)')
    }

    private settingsAction(actionButtons: NodeListOf<HTMLButtonElement>, initVariable: unknown, dataEl: string, callback: any) {
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
              actionButtons.forEach(button => {
                button.classList.remove('active')
                const icon = button.querySelector('i') as HTMLElement
                icon.classList.add('hidden')
              })
              button.classList.add('active')
              const checkIcon = button.querySelector('i') as HTMLElement
              checkIcon.classList.remove('hidden')
              this.hideSettingsMenuPanel()
              
              initVariable = button.getAttribute(dataEl)
              callback(initVariable)
            })
        })
    }

    private runCaptions(caption: TextTrack) {
        this._videoCaptions.forEach(caption => caption.track.mode = "disabled")
        caption.mode = "hidden"
        
        caption.addEventListener("cuechange", (event) => {
            const cues = (event.target as TextTrack).activeCues
    
            if(cues && cues.length > 0) {
                const cue = cues[0] as VTTCue
                this._captionsWrapper.textContent = cue.text
            } else {
                this._captionsWrapper.textContent = ""
            }
            this._videoEl.addEventListener('ended', () => this._captionsWrapper.textContent = "")
        })
    }

    private openFullScreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen()
                    .then(() => console.log('Document exited from fullscreen mode'))
                    .catch((error) => console.error(error))
        } else {
            this._container.requestFullscreen()
        }
    }

    private openSettings(event: Event) {
        const icon = event.target as HTMLElement
        icon.style.transition = '.3s all ease'
        this._settingsMenu.classList.toggle('active')
        if(this._settingsMenu.classList.contains('active')) {
            this._tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'true'))
            icon.style.rotate = "30deg"
        } else {
            this._tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'false'))
            icon.style.rotate = "0deg"
        }
    }

    private hideSettingsMenuPanel() {
        this._settingsMenuPanels.forEach(panel => panel.classList.remove('show'))
        this._settingsMenu.classList.remove('hide')
    }

    private showToast(text: string) {
        this._toast.classList.add("active")
        setTimeout(() => this._toast.classList.remove('active'), 2000)
        this._toast.textContent = text
    }

    private showCaptions() {
        this._captionsWrapper.classList.toggle('active')
        const icon = this._buttons.captions?.querySelector('i')
        if(this._captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On')
            icon?.classList.replace('far', 'fas')
        } else {
            this.showToast('Closed Captions is Off')
            icon?.classList.replace('fas', 'far')
        }
    }

    private runAmbient() {
        const loop = () => {
            if(!this._videoEl.paused && !this._videoEl.ended) {
                this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight)
                setTimeout(loop, 1000 / 30)
            }
        }
        loop()
    }

    private playVideo() {
        this._posterEl.classList.add('hide')
        const mobileIcon = this._buttons.mobile.play?.querySelector('i') as HTMLElement
        if(this._videoEl.paused) {
            mobileIcon.classList.replace('fa-play', 'fa-pause')
            this._playIcon.classList.replace('fa-play', 'fa-pause')
            this._videoEl.play()
            this._isPlayed = true
        } else {
            mobileIcon.classList.replace('fa-pause', 'fa-play')
            this._playIcon.classList.replace('fa-pause', 'fa-play')
            this._videoEl.pause()
            this.showBottomPanel()
            this._isPlayed = false
        }
    }

    private idlingWatch(event: Event) {
        const elementTarget = event.target as Element
        clearTimeout(this._idleTimer)
        if(this._idleState) {
            this._actionsWrapperMobile.classList.remove('hide')
            this.showBottomPanel()
        }
        this._idleState = false
        this._idleTimer = setTimeout(() => {
            if(!elementTarget.closest('.videoary__bottom-panel') || !elementTarget.closest('.play-btn-mobile')) {
                if(!this._videoEl.paused) {
                    this.hideBottomPanel()
                }
                this._idleState = true
                this._container.style.cursor = "none"
            }
        }, this._idleDuration)
    }

    private hideBottomPanel() {
        if(this._videoEl.paused || this._settingsMenu.classList.contains('active')) {
            this.showBottomPanel()
        } else {
            this._captionsWrapper.classList.add('get-down')
            this._bottomPanel.classList.remove('showed-up')
        }
    }

    private showBottomPanel() {
        this._actionsWrapperMobile.classList.remove('hide')
        this._container.style.cursor = "default"
        this._bottomPanel.classList.add('showed-up')
        this._captionsWrapper.classList.remove('get-down')
    }

    private openPIP() {
        if(document.pictureInPictureElement) {
            document.exitPictureInPicture()
        } else if(document.pictureInPictureEnabled) {
            this._videoEl.requestPictureInPicture()
        }
    }

    private changeMuteIcon() {
        const icon = this._buttons.volume as HTMLElement
        const { volume } = this._videoEl
        if (volume == 0) {
            if (icon.classList.contains('fa-volume-down')) {
              icon.classList.replace('fa-volume-down', 'fa-volume-mute')
            } else if (icon.classList.contains('fa-volume')) {
              icon.classList.replace('fa-volume', 'fa-volume-mute')
            }
        } else if (volume <= 0.5) {
            if (icon.classList.contains('fa-volume-mute')) {
              icon.classList.replace('fa-volume-mute', 'fa-volume-down')
            } else if (icon.classList.contains('fa-volume')) {
              icon.classList.replace('fa-volume', 'fa-volume-down')
            }
        } else {
            if (icon.classList.contains('fa-volume-mute')) {
              icon.classList.replace('fa-volume-mute', 'fa-volume')
            } else if (icon.classList.contains('fa-volume-down')) {
              icon.classList.replace('fa-volume-down', 'fa-volume')
            }
        }
    }

    private muteVolume() {
        const { muted } = this._videoEl
        if(muted) {
            this._videoEl.muted = false
            this._videoEl.volume = this._currentVolume
            this._volumeSlider.value = this._currentVolume.toString()
        } else if(!muted) {
            this._currentVolume = Number(this._volumeSlider.value)
            this._videoEl.muted = true
            this._videoEl.volume = 0
            this._volumeSlider.value = "0"
        }
    }

    private theaterMode() {
        this._container.classList.toggle('theater-mode')
        const icon = this._buttons.theater?.querySelector('i') as HTMLElement
        const tooltip = this._buttons.theater?.nextElementSibling as HTMLElement
        if (this._container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On')
            this._container.style.height = `${this._videoEl.videoHeight}px`
            icon.style.fontSize = '.9rem'
            tooltip.textContent = "Default View (t)"
        } else {
            this.showToast('Theater Mode is Off')
            this._container.style.height = `100%`
            icon.style.fontSize = '1.3rem'
            tooltip.textContent = "Theater Mode (t)"
        }
    }

    private leavePIP() {
        const wasPlaying: boolean = !this._videoEl.paused
        setTimeout(() => {
            if (!this._videoEl.paused) {
                this._playIcon.classList.replace('fa-play', 'fa-play')
            } else if (wasPlaying) {
                this._playIcon.classList.replace('fa-pause', 'fa-play')
            }
        }, 0)
    }
}