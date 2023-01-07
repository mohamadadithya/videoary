import '../scss/main.scss'
import { formatDuration, render } from './utils/helpers'
import { Video, Subtitle } from './utils/types'

export class Videoary {
    public containerArea: HTMLAreaElement
    public subtitles?: Subtitle[]
    public video?: Video
    public options
    private isPlayed: Boolean = false
    private currentVolume: number = 1
    private playbackSpeed: number = 1
    private container: HTMLAreaElement
    private idleTimer: ReturnType<typeof setTimeout> = 0
    private idleState: boolean = false
    private idleDuration: number = 3500
    private playbackSpeeds: Number[] = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2]
    private settingsMenuPanels: NodeListOf<HTMLAreaElement>
    private tooltips: NodeListOf<HTMLDivElement>
    private settingsButtons: NodeListOf<HTMLButtonElement>
    private durationSlider
    private volumeSlider
    private durationIndicator
    private videoEl
    private bottomPanel
    private toast
    private posterEl
    private settingsMenu
    private captionsWrapper
    private captionsArray: TextTrack[]
    private selectedCaption: TextTrack
    private buttons
    private playIcon: HTMLElement
    private videoCaptions: NodeListOf<HTMLTrackElement>
    private videoCaption: String | null

    constructor(options: Partial<Videoary>) {
        this.options = Object.assign(this, options)
        this.subtitles = options.subtitles
        this.video = options.video
        this.videoCaption = this.subtitles ? this.subtitles[0].short : null
        this.containerArea = options.containerArea as HTMLAreaElement
        render(this.containerArea, this.video, this.subtitles, this.playbackSpeed, this.playbackSpeeds, this.videoCaption)
        this.container = this.containerArea.querySelector('.videoary') as HTMLAreaElement
        this.settingsMenuPanels = this.container.querySelectorAll('.settings-menu-panel')
        this.tooltips = this.container.querySelectorAll('div[role="tooltip"]')
        this.settingsButtons = this.container.querySelectorAll('.settings-menu > li button')
        this.durationSlider = this.container.querySelector('input:is(#duration)') as HTMLInputElement
        this.volumeSlider = this.container.querySelector('input:is(#volume)') as HTMLInputElement
        this.durationIndicator = this.container.querySelector('#duration-indicator') as HTMLElement
        this.videoEl = this.container.querySelector('video') as HTMLVideoElement
        this.bottomPanel = this.container.querySelector('.videoary__bottom-panel') as HTMLAreaElement
        this.toast = this.container.querySelector('.toast') as HTMLParagraphElement
        this.posterEl = this.container.querySelector('.poster') as HTMLImageElement
        this.settingsMenu = this.container.querySelector('.settings-menu') as HTMLAreaElement
        this.captionsWrapper = this.container.querySelector('.captions-wrapper') as HTMLAreaElement
        this.captionsArray = Array.from(this.videoEl.textTracks)
        this.selectedCaption = this.captionsArray.find(caption => caption.language == this.videoCaption) as TextTrack
        this.buttons = {
            play: this.container.querySelector('#play-button'),
            volume: this.container.querySelector('#volume-button'),
            fullscreen: this.container.querySelector('#fullscreen-button'),
            captions: this.container.querySelector('#closed-captions-button'),
            picInPic: this.container.querySelector('#pic-in-pic-button'),
            theater: this.container.querySelector('#theater-button'),
            settings: this.container.querySelector('#settings-button')
        }
        this.playIcon = this.buttons.play?.querySelector('i') as HTMLElement
        this.videoCaptions = this.container.querySelectorAll('track')
    }

    init() {
        this.videoCaptions.forEach(caption => caption.track.mode = "hidden")
        this.container.addEventListener('contextmenu', (event: MouseEvent) => event.preventDefault())
        this.bottomPanel.classList.add('showed-up')

        this.videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this))
        this.videoEl.addEventListener('click', this.playVideo.bind(this))
        this.videoEl.addEventListener('ended', () => this.playIcon.classList.replace('fa-pause', 'fa-play'))
        this.videoEl.addEventListener('timeupdate', this.runDuration.bind(this))

        this.container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this))

        this.container.addEventListener('mousemove', this.idleWatch.bind(this))
        this.videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this))
        this.bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this))
        this.container.addEventListener('mouseout', this.hideBottomPanel.bind(this))

        document.addEventListener('keydown', this.keyEvents.bind(this))
        document.addEventListener('click', this.hideSettingsPanelOutside.bind(this))

        this.durationSlider.addEventListener('input', this.seekingVideo.bind(this))
        this.durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this))
        this.volumeSlider.addEventListener('click', (event: Event) => event.stopPropagation())
        this.volumeSlider.addEventListener('input', this.seekingVolume.bind(this))
        
        window.addEventListener('click', () => this.volumeSlider.classList.remove('active'))

        this.runCaptions(this.selectedCaption)
        this.videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this))

        // Hide All Settings Buttons
        this.settingsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              this.settingsMenu.classList.add('hide')
              const panel = this.settingsMenuPanels[index]
              panel.classList.add('show')
              const backButton = panel.querySelector('button:is(.action)') as HTMLButtonElement
              backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this))
            })
        })

        // For Playback Speed Changer
        const playbackSpeedButtons = this.settingsPanelButtons(1) as NodeListOf<HTMLButtonElement>

        this.settingsAction(playbackSpeedButtons, this.playbackSpeed, 'data-speed', (speed: number) => {
            this.videoEl.playbackRate = speed
            const indicatorEl = this.settingsButtons[1].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        // For Subtitle Changer
        const captionsButtons = this.settingsPanelButtons(0) as NodeListOf<HTMLButtonElement>
        this.settingsAction(captionsButtons, this.videoCaption, 'data-lang', (caption: any) => {
            this.videoCaption = caption
            this.selectedCaption = this.captionsArray.find(caption => caption.language == this.videoCaption) as TextTrack
            this.runCaptions(this.selectedCaption)
            const indicatorEl = this.settingsButtons[0].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${this.selectedCaption?.label} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        this.buttons.play?.addEventListener('click', this.playVideo.bind(this))
        this.buttons.fullscreen?.addEventListener('click', this.openFullScreen.bind(this))
        this.buttons.picInPic?.addEventListener('click', this.openPIP.bind(this))
        this.buttons.captions?.addEventListener('click', this.showCaptions.bind(this))
        this.buttons.volume?.addEventListener('click', this.muteVolume.bind(this))
        this.buttons.theater?.addEventListener('click', this.theaterMode.bind(this))
        this.buttons.settings?.addEventListener('click', this.openSettings.bind(this))
    }

    private hideSettingsPanelOutside(event: Event) {
        const targetElement = event.target as HTMLButtonElement
        if(targetElement.closest('#settings-button') || targetElement.closest('.settings-menu')) return
        this.settingsMenu.classList.remove('active')
        setTimeout(() => this.hideSettingsMenuPanel(), 300)
        if(!targetElement.closest('#videoary video')) this.hideBottomPanel()
    }

    private fullscreenChange() {
        const icon = this.buttons.fullscreen?.querySelector('i') as HTMLElement
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress')
        } else {
            icon.classList.replace('fa-compress', 'fa-expand')
        }
    }

    private seekingVideo(event: Event) {
        const targetElement = event.target as HTMLInputElement
        this.videoEl.pause()
        this.videoEl.currentTime = Number(targetElement.value)
        this.container.classList.add('seeking')
        this.videoEl.volume = 0
    }

    private seekingVideoPaused() {
        this.isPlayed ? this.videoEl.play() : this.videoEl.pause()
        this.container.classList.remove('seeking')
        this.videoEl.volume = 1
    }

    private seekingVolume(event: Event) {
        this.volumeSlider.classList.add('active')
        const targetElement = event.target as HTMLInputElement
        this.videoEl.volume = Number(targetElement.value)
        this.videoEl.volume > 0 ? this.videoEl.muted = false : this.videoEl.muted = true
        this.changeMuteIcon()
    }

    private keyEvents(event: KeyboardEvent) {
        this.showBottomPanel()
        setTimeout(() => {
            this.hideBottomPanel()
            this.container.style.cursor = "none"
        }, this.idleDuration)
          if (event.key == "ArrowRight") {
            this.videoEl.currentTime += 5
        } else if (event.key == "ArrowLeft") {
            this.videoEl.currentTime -= 5
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

    private loadedVideo(event: Event) {
        const indicatorEl = event.target as HTMLVideoElement
        this.durationIndicator.textContent = `0:00 / ${formatDuration(indicatorEl.duration)}`
        this.durationSlider.max = indicatorEl.duration.toString()
        this.volumeSlider.value = indicatorEl.volume.toString()
    }

    private runDuration() {
        const time = this.videoEl.currentTime
        this.durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(this.videoEl.duration)}`
        this.durationSlider.value = time.toString()
    }

    private settingsPanelButtons(panelIndex: number) {
        return this.settingsMenuPanels[panelIndex].querySelectorAll('button:not(.action)')
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
        this.videoCaptions.forEach(caption => caption.track.mode = "disabled")
        caption.mode = "hidden"
        
        caption.addEventListener("cuechange", (event) => {
            const cues = (event.target as TextTrack).activeCues
    
            if(cues && cues.length > 0) {
                const cue = cues[0] as VTTCue
                this.captionsWrapper.textContent = cue.text
            } else {
                this.captionsWrapper.textContent = ""
            }
            this.videoEl.addEventListener('ended', () => this.captionsWrapper.textContent = "")
        })
    }

    private openFullScreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen()
                    .then(() => console.log('Document exited from fullscreen mode'))
                    .catch((error) => console.error(error))
        } else {
            this.container.requestFullscreen()
        }
    }

    private openSettings(event: Event) {
        const icon = event.target as HTMLElement
        icon.style.transition = '.3s all ease'
        this.settingsMenu.classList.toggle('active')
        setTimeout(this.hideSettingsMenuPanel, 300)
        if(this.settingsMenu.classList.contains('active')) {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'true'))
            icon.style.rotate = "30deg"
        } else {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'false'))
            icon.style.rotate = "0deg"
        }
    }

    private hideSettingsMenuPanel() {
        this.settingsMenuPanels.forEach(panel => panel.classList.remove('show'))
        this.settingsMenu.classList.remove('hide')
    }

    private showToast(text: string) {
        this.toast.classList.add("active")
        setTimeout(() => this.toast.classList.remove('active'), 2000)
        this.toast.textContent = text
    }

    private showCaptions() {
        this.captionsWrapper.classList.toggle('active')
        const icon = this.buttons.captions?.querySelector('i')
        if(this.captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On')
            icon?.classList.replace('far', 'fas')
        } else {
            this.showToast('Closed Captions is Off')
            icon?.classList.replace('fas', 'far')
        }
    }

    private playVideo() {
        this.posterEl.classList.add('hide')
        if(this.videoEl.paused) {
            this.playIcon.classList.replace('fa-play', 'fa-pause')
            this.videoEl.play()
            this.isPlayed = true
        } else {
            this.playIcon.classList.replace('fa-pause', 'fa-play')
            this.videoEl.pause()
            this.showBottomPanel()
            this.isPlayed = false
        }
    }

    private idleWatch(event: Event) {
        const elementTarget = event.target as Element
        clearTimeout(this.idleTimer)
        if(this.idleState) this.showBottomPanel()
        this.idleState = false
        this.idleTimer = setTimeout(() => {
            if(!elementTarget.closest('.videoary__bottom-panel')) {
                console.log();
                this.hideBottomPanel()
                this.idleState = true
                this.container.style.cursor = "none"
            }
        }, this.idleDuration)
    }

    private hideBottomPanel() {
        if(this.videoEl.paused || this.settingsMenu.classList.contains('active')) {
            this.showBottomPanel()
        } else {
            this.captionsWrapper.classList.add('get-down')
            this.bottomPanel.classList.remove('showed-up')
        }
    }

    private showBottomPanel() {
        this.container.style.cursor = "default"
        this.bottomPanel.classList.add('showed-up')
        this.captionsWrapper.classList.remove('get-down')
    }

    private openPIP() {
        if(document.pictureInPictureElement) {
            document.exitPictureInPicture()
        } else if(document.pictureInPictureEnabled) {
            this.videoEl.requestPictureInPicture()
        }
    }

    private changeMuteIcon() {
        const icon = this.buttons.volume as HTMLElement
        const { volume } = this.videoEl
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
        const { muted } = this.videoEl
        if(muted) {
            this.videoEl.muted = false
            this.videoEl.volume = this.currentVolume
            this.volumeSlider.value = this.currentVolume.toString()
        } else if(!muted) {
            this.currentVolume = Number(this.volumeSlider.value)
            this.videoEl.muted = true
            this.videoEl.volume = 0
            this.volumeSlider.value = "0"
        }
    }

    private theaterMode() {
        this.container.classList.toggle('theater-mode')
        const icon = this.buttons.theater?.querySelector('i') as HTMLElement
        const tooltip = this.buttons.theater?.nextElementSibling as HTMLElement
        if (this.container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On')
            this.container.style.height = `${this.videoEl.videoHeight}px`
            icon.style.fontSize = '.9rem'
            tooltip.textContent = "Default View (t)"
        } else {
            this.showToast('Theater Mode is Off')
            this.container.style.height = `100%`
            icon.style.fontSize = '1.3rem'
            tooltip.textContent = "Theater Mode (t)"
        }
    }

    private leavePIP() {
        const wasPlaying: boolean = !this.videoEl.paused
        setTimeout(() => {
            if (!this.videoEl.paused) {
                this.playIcon.classList.replace('fa-play', 'fa-play')
            } else if (wasPlaying) {
                this.playIcon.classList.replace('fa-pause', 'fa-play')
            }
        }, 0)
    }
}