import './scss/main.scss'
import { formatDuration } from './utils/helpers'

const video = {
  src: 'dumb',
  poster: null,
}

const subtitles = [
  {
    short: 'en',
    long: 'English'
  },
  {
    short: 'pl',
    long: 'Polish'
  },
  {
    short: 'es',
    long: 'Spanish'
  },
  {
    short: 'de',
    long: 'German'
  },
  {
    short: 'ja',
    long: 'Japanese'
  },
  {
    short: 'id',
    long: 'Indonesian'
  }
]

const playbackSpeeds = [0.25, 0.5, 0.7 , 1, 1.25, 1.5, 1.75, 2]

let isPlayed = false
let currentVolume
let playbackSpeed = 1
let videoCaption = subtitles[0].short

document.querySelector('#app').innerHTML = `
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

const container = document.getElementById('videoary')
const durationSlider = document.getElementById('duration')
const volumeSlider = document.getElementById('volume')
const durationIndicator = document.getElementById('duration-indicator')
const videoEl = document.querySelector('#videoary video')
const bottomPanel = document.querySelector('#videoary .videoary__bottom-panel')
const toast = document.querySelector('.toast')
const posterEl = document.querySelector('.poster')
const buttons = {
  play: document.getElementById('play-button'),
  volume: document.getElementById('volume-button'),
  fullscreen: document.getElementById('fullscreen-button'),
  captions: document.getElementById('closed-captions-button'),
  picInPic: document.getElementById('pic-in-pic-button'),
  theater: document.getElementById('theater-button'),
  settings: document.getElementById('settings-button'),
}
const settingsMenu = container.querySelector('.settings-menu')
const playIcon = buttons.play.querySelector('i')
const captionsWrapper = document.querySelector('.captions-wrapper')

container.addEventListener('contextmenu', (e) => e.preventDefault())

// Default
bottomPanel.classList.add('showed-up')
const videoCaptions = document.querySelectorAll('track')
videoCaptions.forEach(caption => caption.track.mode = "hidden")

const captionsArray = Array.from(videoEl.textTracks)
let selectedCaption = captionsArray.find(caption => caption.language == videoCaption)

const captionsAction = (caption) => {
  videoCaptions.forEach(caption => caption.track.mode = "disabled")
  caption.mode = "hidden"
  caption.addEventListener('cuechange', function () {
    let cues = this.activeCues
  
    if (cues.length > 0) {
      captionsWrapper.textContent = cues[0].text
    } else {
      if (cues[0]?.endTime) {
        captionsWrapper.textContent = '[Music]'
      } else {
        captionsWrapper.textContent = ''
      }
    }
    videoEl.addEventListener('ended', () => (captionsWrapper.textContent = ''))
  })
}

captionsAction(selectedCaption)

const showToast = (text) => {
  toast.classList.add('active')
  setTimeout(() => toast.classList.remove('active'), 2000)
  toast.textContent = text
}

const showCaptions = () => {
  captionsWrapper.classList.toggle('active')
  const icon = buttons.captions.querySelector('i')
  if (captionsWrapper.classList.contains('active')) {
    showToast('Closed Captions is On')
    icon.classList.replace('far', 'fas')
  } else {
    showToast('Closed Captions is Off')
    icon.classList.replace('fas', 'far')
  }
}

const playVideo = () => {
  posterEl.classList.add('hide')
  if (videoEl.paused) {
    playIcon.classList.replace('fa-play', 'fa-pause')
    videoEl.play()
    isPlayed = true
  } else {
    playIcon.classList.replace('fa-pause', 'fa-play')
    videoEl.pause()
    showBottomPanel()
    isPlayed = false
  }
}

videoEl.addEventListener('loadeddata', (e) => {
  durationIndicator.textContent = `0:00 / ${formatDuration(e.target.duration)}`
  durationSlider.max = e.target.duration
  volumeSlider.value = e.target.volume
})

videoEl.addEventListener('ended', () =>
  playIcon.classList.replace('fa-pause', 'fa-play'),
)

videoEl.addEventListener('timeupdate', () => {
  const time = videoEl.currentTime

  durationIndicator.textContent = `${formatDuration(time)} / ${formatDuration(videoEl.duration)}`
  durationSlider.value = time
})

const hideBottomPanel = () => {
  if (videoEl.paused || settingsMenu.classList.contains('active')) {
    captionsWrapper.classList.remove('get-down')
    bottomPanel.classList.add('showed-up')
  } else {
    captionsWrapper.classList.add('get-down')
    bottomPanel.classList.remove('showed-up')
  }
}

const showBottomPanel = () => {
  container.style.cursor = "default"
  bottomPanel.classList.add('showed-up')
  captionsWrapper.classList.remove('get-down')
}

videoEl.addEventListener('leavepictureinpicture', () => {
  const wasPlaying = !videoEl.paused
  setTimeout(() => {
    if (!videoEl.paused) {
      playIcon.classList.replace('fa-play', 'fa-play')
    } else if (wasPlaying) {
      playIcon.classList.replace('fa-pause', 'fa-play')
    }
  }, 0)
})

let idleTimer = null
let idleState = false

const idleWatch = (time) => {
  clearTimeout(idleTimer)
  if(idleState) showBottomPanel()
  idleState = false
  idleTimer = setTimeout(() => {
    hideBottomPanel()
    idleState = true
    container.style.cursor = "none"
  }, time)
}

videoEl.addEventListener('mousemove', () => idleWatch(3500))
videoEl.addEventListener('mouseover', showBottomPanel)
bottomPanel.addEventListener('mouseover', showBottomPanel)
container.addEventListener('mouseout', hideBottomPanel)

const keyEvents = (e) => {
  showBottomPanel()
  setTimeout(() => {
    hideBottomPanel()
    container.style.cursor = "none"
  }, 3500)
  if (e.keyCode == 39) {
    videoEl.currentTime += 5
  } else if (e.keyCode == 37) {
    videoEl.currentTime -= 5
  } else if (e.keyCode == 32 || e.keyCode == 80) {
    playVideo()
  } else if (e.keyCode == 77) {
    muteVolume()
    changeMuteIcon()
  } else if (e.keyCode == 73) {
    pictureInPicture()
  } else if (e.keyCode == 70) {
    openFullscreen()
  } else if (e.keyCode == 84) {
    theaterMode()
  } else if (e.keyCode == 67 && !e.ctrlKey) {
    showCaptions()
  }
}

document.addEventListener('keydown', keyEvents)
videoEl.addEventListener('click', playVideo)

durationSlider.addEventListener('input', (e) => {
  videoEl.pause()
  videoEl.currentTime = e.target.value
  container.classList.add('seeking')
  videoEl.volume = 0
})

durationSlider.addEventListener('change', () => {
  isPlayed ? videoEl.play() : videoEl.pause()
  container.classList.remove('seeking')
  videoEl.volume = 1
})

volumeSlider.addEventListener('input', (e) => {
  videoEl.volume = e.target.value
  if (videoEl.volume > 0) {
    videoEl.muted = false
  } else {
    videoEl.muted = true
  }
  changeMuteIcon()
})

volumeSlider.addEventListener('input', () => volumeSlider.classList.add('active'))
volumeSlider.addEventListener('click', (e) => e.stopPropagation())
window.addEventListener('click', () => volumeSlider.classList.remove('active'))

const openFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
      .then(() => console.log('Document Exited from Full screen mode'))
      .catch((err) => console.error(err))
  } else {
    container.requestFullscreen()
  }
}

const openSettings = (e) => {
  const icon = e.target
  icon.style.transition = '.3s all ease'
  settingsMenu.classList.toggle('active')
  setTimeout(() => hideSettingsMenuPanel(), 300)
  const tooltips = container.querySelectorAll('div[role="tooltip"]')
  if(settingsMenu.classList.contains('active')) {
    tooltips.forEach(tip => tip.setAttribute('aria-disabled', true))
    icon.style.rotate = "30deg"
  } else {
    tooltips.forEach(tip => tip.setAttribute('aria-disabled', false))
    icon.style.rotate = "0deg"
  }
}

container.addEventListener('fullscreenchange', () => {
  const icon = buttons.fullscreen.querySelector('i')
  if (document.fullscreenElement) {
    icon.classList.replace('fa-expand', 'fa-compress')
  } else {
    icon.classList.replace('fa-compress', 'fa-expand')
  }
})

const pictureInPicture = () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture()
  } else if (document.pictureInPictureEnabled) {
    videoEl.requestPictureInPicture()
  }
}

const changeMuteIcon = () => {
  const icon = buttons.volume
  if (videoEl.volume == 0) {
    if (icon.classList.contains('fa-volume-down')) {
      icon.classList.replace('fa-volume-down', 'fa-volume-mute')
    } else if (icon.classList.contains('fa-volume')) {
      icon.classList.replace('fa-volume', 'fa-volume-mute')
    }
  } else if (videoEl.volume <= 0.5) {
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

const muteVolume = () => {
  if (videoEl.muted) {
    videoEl.muted = false
    videoEl.volume = currentVolume
    volumeSlider.value = currentVolume
  } else if (!videoEl.muted) {
    currentVolume = volumeSlider.value
    videoEl.muted = true
    videoEl.volume = 0
    volumeSlider.value = 0
  }
  changeMuteIcon()
}

const theaterMode = async () => {
  container.classList.toggle('theater-mode')
  const icon = buttons.theater.querySelector('i')
  const tooltip = buttons.theater.nextElementSibling
  if (container.classList.contains('theater-mode')) {
    showToast('Theater Mode is On')
    container.style.height = `${videoEl.videoHeight}px`
    icon.style.fontSize = '.9rem'
    tooltip.textContent = "Default View (t)"
  } else {
    showToast('Theater Mode is Off')
    container.style.height = `100%`
    icon.style.fontSize = '1.3rem'
    tooltip.textContent = "Theater Mode (t)"
  }
}

const settingsButtons = document.querySelectorAll('.settings-menu > li button')
const settingsMenuPanels = document.querySelectorAll('.settings-menu-panel')

document.addEventListener('click', (e) => {
  if(e.target.closest('#settings-button') || e.target.closest('.settings-menu')) return
  settingsMenu.classList.remove('active')
  setTimeout(() => hideSettingsMenuPanel(), 300)
})

settingsButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    settingsMenu.classList.add('hide')
    const panel = settingsMenuPanels[index]
    panel.classList.add('show')
    const backButton = panel.querySelector('button:is(.action)')
    backButton.addEventListener('click', hideSettingsMenuPanel)
  })
})

const hideSettingsMenuPanel = () => {
  settingsMenuPanels.forEach(panel => panel.classList.remove('show'))
  settingsMenu.classList.remove('hide')
}

const settingsPanelButtons = (panelIndex) => settingsMenuPanels[panelIndex].querySelectorAll('button:not(.action)')

const playbackSpeedButtons = settingsPanelButtons(1)

const settingsAction = (actionButtons, initVariable, dataEl, callback) => {
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      actionButtons.forEach(button => {
        button.classList.remove('active')
        const icon = button.querySelector('i')
        icon.classList.add('hidden')
      })
      this.classList.add('active')
      const checkIcon = this.querySelector('i')
      checkIcon.classList.remove('hidden')
      hideSettingsMenuPanel()
      
      initVariable = this.getAttribute(dataEl)
      callback(initVariable)
    })
  })
}

// For Playback Speed Changer
settingsAction(playbackSpeedButtons, playbackSpeed, 'data-speed', (initVariable) => {
  videoEl.playbackRate = initVariable
  const indicatorEl = settingsButtons[1].querySelector('span:nth-child(2)')
  indicatorEl.innerHTML = `${`${initVariable == 1 ? 'Normal' : initVariable} <i class="far fa-fw fa-chevron-right"></i>`}`
})

const captionsButtons = settingsPanelButtons(0)

// For Subtitle Changer
settingsAction(captionsButtons, videoCaption, 'data-lang', (initVariable) => {
  videoCaption = initVariable
  selectedCaption = captionsArray.find(caption => caption.language == videoCaption)
  captionsAction(selectedCaption)
  const indicatorEl = settingsButtons[0].querySelector('span:nth-child(2)')
  indicatorEl.innerHTML = `${`${selectedCaption.label} <i class="far fa-fw fa-chevron-right"></i>`}`
})

buttons.play.addEventListener('click', playVideo)
buttons.fullscreen.addEventListener('click', openFullscreen)
buttons.picInPic.addEventListener('click', pictureInPicture)
buttons.captions.addEventListener('click', showCaptions)
buttons.volume.addEventListener('click', muteVolume)
buttons.theater.addEventListener('click', theaterMode)
buttons.settings.addEventListener('click', openSettings)
