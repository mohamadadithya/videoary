import './scss/main.scss'
import { formatDuration } from './utils/helpers'

interface Video {
    src: String,
    poster: unknown
}

type Subtitle = {
    short: String,
    long: String
}

const video: Video = {
    src: 'dumb',
    poster: null
}

const subtitles: Array<Subtitle> = [
    {
        short: "en",
        long: 'English'
    }
]

const playbackSpeeds: Array<Number> = [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2]

let isPlayed: Boolean = false
let currentVolume: number
let playbackSpeed: number
let videoCaption: String = subtitles[0].short

const appRoot = document.querySelector('#app') as HTMLAreaElement

appRoot.innerHTML = `
<div class="container videoary" id="videoary">
  <div class="toast"></div>
  <img class="poster" ${video.poster ? `src="/posters/${video.poster}"` : ''} />
  <video preload>
    <source src="/videos/${video.src}.mp4" type="video/mp4" />
    ${subtitles.map((caption) => {
      return `<track label="${caption.long}" kind="subtitles" srclang="${caption.short}" src="/captions/${video.src}/${caption.long.toLowerCase()}.vtt" default />`
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

const container = document.getElementById('videoary') as HTMLAreaElement
const durationSlider = container.querySelector('input:is(#duration)') as HTMLInputElement
const volumeSlider = container.querySelector('input:is(#volume)') as HTMLInputElement
const durationIndicator = container.querySelector('#duration-indicator') as HTMLElement
const videoEl = container.querySelector('video') as HTMLVideoElement
const bottomPanel = container.querySelector('.videoary__bottom-panel') as HTMLAreaElement
const toast = container.querySelector('.toast') as HTMLParagraphElement
const posterEl = container.querySelector('.poster') as HTMLImageElement
const settingsMenu = container.querySelector('.settings-menu')
const captionsWrapper = container.querySelector('.captions-wrapper') as HTMLAreaElement

const buttons = {
    play: document.querySelector('#play-button'),
    volume: document.getElementById('volume-button'),
    fullscreen: document.getElementById('fullscreen-button'),
    captions: document.getElementById('closed-captions-button'),
    picInPic: document.getElementById('pic-in-pic-button'),
    theater: document.getElementById('theater-button'),
    settings: document.getElementById('settings-button')
}

const playIcon = buttons.play?.querySelector('i') as HTMLElement

container.addEventListener('contextmenu', (e) => e.preventDefault())

// Default States //
bottomPanel.classList.add('showed-up')
const videoCaptions: NodeListOf<HTMLTrackElement> = container.querySelectorAll('track')
videoCaptions.forEach(caption => caption.track.mode = "hidden")

// Transform videoCaptions node list to array
const captionsArray = Array.from(videoEl.textTracks)
// Default caption
let selectedCaption: any = captionsArray.find(caption => caption.language == videoCaption)

class Videoary {
    private idleTimer: ReturnType<typeof setTimeout> = 0
    private idleState: boolean = false
    private idleDuration: number = 3500
    private settingsMenuPanels: NodeListOf<HTMLAreaElement>
    private tooltips: NodeListOf<HTMLDivElement>
    private settingsButtons: NodeListOf<HTMLButtonElement>

    constructor() {
        this.settingsMenuPanels = container.querySelectorAll('.settings-menu-panel')
        this.tooltips = container.querySelectorAll('div[role="tooltip"]')
        this.settingsButtons = container.querySelectorAll('.settings-menu > li button')
    }

    init() {
        videoEl.addEventListener('loadeddata', this.loadedVideo.bind(this))
        videoEl.addEventListener('click', this.playVideo.bind(this))
        videoEl.addEventListener('ended', () => playIcon.classList.replace('fa-pause', 'fa-play'))
        videoEl.addEventListener('timeupdate', this.runDuration.bind(this))

        container.addEventListener('fullscreenchange', this.fullscreenChange.bind(this))

        container.addEventListener('mousemove', this.idleWatch.bind(this))
        videoEl.addEventListener('mouseover', this.showBottomPanel.bind(this))
        bottomPanel.addEventListener('mouseover', this.showBottomPanel.bind(this))
        container.addEventListener('mouseout', this.hideBottomPanel.bind(this))

        document.addEventListener('keydown', this.keyEvents.bind(this))
        document.addEventListener('click', this.hideSettingsPanelOutside.bind(this))

        durationSlider.addEventListener('input', this.seekingVideo.bind(this))
        durationSlider.addEventListener('change', this.seekingVideoPaused.bind(this))
        volumeSlider.addEventListener('click', (event: Event) => event.stopPropagation())
        volumeSlider.addEventListener('input', this.seekingVolume.bind(this))
        
        window.addEventListener('click', () => volumeSlider.classList.remove('active'))

        this.runCaptions(selectedCaption)
        videoEl.addEventListener('leavepictureinpicture', this.leavePIP.bind(this))

        // Hide All Settings Buttons
        this.settingsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
              settingsMenu?.classList.add('hide')
              const panel = this.settingsMenuPanels[index]
              panel.classList.add('show')
              const backButton = panel.querySelector('button:is(.action)') as HTMLButtonElement
              backButton.addEventListener('click', this.hideSettingsMenuPanel.bind(this))
            })
        })

        // For Playback Speed Changer
        const playbackSpeedButtons = this.settingsPanelButtons(1) as NodeListOf<HTMLButtonElement>

        this.settingsAction(playbackSpeedButtons, playbackSpeed, 'data-speed', (speed: number) => {
            videoEl.playbackRate = speed
            const indicatorEl = this.settingsButtons[1].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${speed == 1 ? 'Normal' : speed} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        // For Subtitle Changer
        const captionsButtons = this.settingsPanelButtons(0) as NodeListOf<HTMLButtonElement>
        this.settingsAction(captionsButtons, videoCaption, 'data-lang', (caption: any) => {
            videoCaption = caption
            selectedCaption = captionsArray.find(caption => caption.language == videoCaption)
            this.runCaptions(selectedCaption)
            const indicatorEl = this.settingsButtons[0].querySelector('span:nth-child(2)') as HTMLElement
            indicatorEl.innerHTML = `${`${selectedCaption?.label} <i class="far fa-fw fa-chevron-right"></i>`}`
        })

        buttons.play?.addEventListener('click', this.playVideo.bind(this))
        buttons.fullscreen?.addEventListener('click', this.openFullScreen.bind(this))
        buttons.picInPic?.addEventListener('click', this.openPIP.bind(this))
        buttons.captions?.addEventListener('click', this.showCaptions.bind(this))
        buttons.volume?.addEventListener('click', this.muteVolume.bind(this))
        buttons.theater?.addEventListener('click', this.theaterMode.bind(this))
        buttons.settings?.addEventListener('click', this.openSettings.bind(this))
    }

    private hideSettingsPanelOutside(event: Event) {
        const targetElement = event.target as HTMLButtonElement
        if(targetElement.closest('#settings-button') || targetElement.closest('.settings-menu')) return
        settingsMenu?.classList.remove('active')
        setTimeout(() => this.hideSettingsMenuPanel(), 300)
        if(!targetElement.closest('#videoary video')) this.hideBottomPanel()
    }

    private fullscreenChange() {
        const icon = buttons.fullscreen?.querySelector('i') as HTMLElement
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress')
        } else {
            icon.classList.replace('fa-compress', 'fa-expand')
        }
    }

    private seekingVideo(event: Event) {
        const targetElement = event.target as HTMLInputElement
        videoEl.pause()
        videoEl.currentTime = Number(targetElement.value)
        container.classList.add('seeking')
        videoEl.volume = 0
    }

    private seekingVideoPaused() {
        isPlayed ? videoEl.play() : videoEl.pause()
        container.classList.remove('seeking')
        videoEl.volume = 1
    }

    private seekingVolume(event: Event) {
        volumeSlider.classList.add('active')
        const targetElement = event.target as HTMLInputElement
        videoEl.volume = Number(targetElement.value)
        videoEl.volume > 0 ? videoEl.muted = false : videoEl.muted = true
        this.changeMuteIcon()
    }

    private keyEvents(event: KeyboardEvent) {
        this.showBottomPanel()
        setTimeout(() => {
            this.hideBottomPanel()
            container.style.cursor = "none"
        }, this.idleDuration)
          if (event.key == "ArrowRight") {
            videoEl.currentTime += 5
        } else if (event.key == "ArrowLeft") {
            videoEl.currentTime -= 5
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
        durationIndicator.textContent = `0:00 / ${formatDuration(indicatorEl.duration)}`
        durationSlider.max = indicatorEl.duration.toString()
        volumeSlider.value = indicatorEl.volume.toString()
    }

    private runDuration() {
        const time = videoEl.currentTime
        durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(videoEl.duration)}`
        durationSlider.value = time.toString()
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
        videoCaptions.forEach(caption => caption.track.mode = "disabled")
        caption.mode = "hidden"
        
        caption.addEventListener("cuechange", function(event) {
            const cues = (event.target as TextTrack).activeCues
    
            if(cues && cues.length > 0) {
                const cue = cues[0] as VTTCue
                captionsWrapper.textContent = cue.text
            } else {
                captionsWrapper.textContent = ""
            }
            videoEl.addEventListener('ended', () => captionsWrapper.textContent = "")
        })
    }

    private openFullScreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen()
                    .then(() => console.log('Document exited from fullscreen mode'))
                    .catch((error) => console.error(error))
        } else {
            container.requestFullscreen()
        }
    }

    private openSettings(event: Event) {
        const icon = event.target as HTMLElement
        icon.style.transition = '.3s all ease'
        settingsMenu?.classList.toggle('active')
        setTimeout(this.hideSettingsMenuPanel, 300)
        if(settingsMenu?.classList.contains('active')) {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'true'))
            icon.style.rotate = "30deg"
        } else {
            this.tooltips.forEach(tip => tip.setAttribute('aria-disabled', 'false'))
            icon.style.rotate = "0deg"
        }
    }

    private hideSettingsMenuPanel() {
        this.settingsMenuPanels.forEach(panel => panel.classList.remove('show'))
        settingsMenu?.classList.remove('hide')
    }

    private showToast(text: string) {
        toast.classList.add("active")
        setTimeout(() => toast.classList.remove('active'), 2000)
        toast.textContent = text
    }

    private showCaptions() {
        captionsWrapper.classList.toggle('active')
        const icon = buttons.captions?.querySelector('i')
        if(captionsWrapper.classList.contains('active')) {
            this.showToast('Closed Captions is On')
            icon?.classList.replace('far', 'fas')
        } else {
            this.showToast('Closed Captions is Off')
            icon?.classList.replace('fas', 'far')
        }
    }

    private playVideo() {
        posterEl.classList.add('hide')
        if(videoEl.paused) {
            playIcon.classList.replace('fa-play', 'fa-pause')
            videoEl.play()
            isPlayed = true
        } else {
            playIcon.classList.replace('fa-pause', 'fa-play')
            videoEl.pause()
            this.showBottomPanel()
            isPlayed = false
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
                container.style.cursor = "none"
            }
        }, this.idleDuration)
    }

    private hideBottomPanel() {
        if(videoEl.paused || settingsMenu?.classList.contains('active')) {
            this.showBottomPanel()
        } else {
            captionsWrapper.classList.add('get-down')
            bottomPanel.classList.remove('showed-up')
        }
    }

    private showBottomPanel() {
        container.style.cursor = "default"
        bottomPanel.classList.add('showed-up')
        captionsWrapper.classList.remove('get-down')
    }

    private openPIP() {
        if(document.pictureInPictureElement) {
            document.exitPictureInPicture()
        } else if(document.pictureInPictureEnabled) {
            videoEl.requestPictureInPicture()
        }
    }

    private changeMuteIcon() {
        const icon = buttons.volume as HTMLElement
        const { volume } = videoEl
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
        const { muted } = videoEl
        if(muted) {
            videoEl.muted = false
            videoEl.volume = currentVolume
            volumeSlider.value = currentVolume.toString()
        } else if(!muted) {
            currentVolume = Number(volumeSlider.value)
            videoEl.muted = true
            videoEl.volume = 0
            volumeSlider.value = "0"
        }
    }

    private theaterMode() {
        container.classList.toggle('theater-mode')
        const icon = buttons.theater?.querySelector('i') as HTMLElement
        const tooltip = buttons.theater?.nextElementSibling as HTMLElement
        if (container.classList.contains('theater-mode')) {
            this.showToast('Theater Mode is On')
            container.style.height = `${videoEl.videoHeight}px`
            icon.style.fontSize = '.9rem'
            tooltip.textContent = "Default View (t)"
        } else {
            this.showToast('Theater Mode is Off')
            container.style.height = `100%`
            icon.style.fontSize = '1.3rem'
            tooltip.textContent = "Theater Mode (t)"
        }
    }

    private leavePIP() {
        const wasPlaying: boolean = !videoEl.paused
        setTimeout(() => {
            if (!videoEl.paused) {
                playIcon.classList.replace('fa-play', 'fa-play')
            } else if (wasPlaying) {
                playIcon.classList.replace('fa-pause', 'fa-play')
            }
        }, 0)
    }
}

const videoary = new Videoary()
videoary.init()