const Fe = (fe) => {
  if (isNaN(fe))
    return "0:00";
  {
    const Y = Math.floor(fe % 60).toLocaleString("en-US", { minimumIntegerDigits: 2 }), Q = Math.floor(fe / 60) % 60, ee = Math.floor(fe / 3600);
    return ee >= 1 ? `${ee}:${Q}:${Y}` : `${Q}:${Y}`;
  }
}, rt = (fe, Y, Q, ee, te, ge) => {
  fe.innerHTML = `
    <div class="container videoary" id="videoary">
    <div class="loader">
        <i class="fas fa-fw fa-spin fa-spinner-third"></i>
    </div>
    <div class="toast"></div>
    <img class="poster" ${Y != null && Y.poster ? `src="/posters/${Y.poster}"` : ""} />
    <canvas class="ambient-background"></canvas>
    <div class="actions-wrapper-mobile">
        <button type="button" class="settings-btn-mobile head-btn-mobile"><i class="fas fa-fw fa-gear"></i></button>
        <button type="button" class="captions-btn-mobile head-btn-mobile"><i class="far fa-fw fa-closed-captioning"></i></button>
        <ul>
            <li class="${Y != null && Y.next ? "" : "hidden"}">
                <button type="button"><i class="fas fa-fw fa-step-backward"></i></button>
            </li>
            <li>
                <button type="button" class="play-btn-mobile"><i class="fas fa-fw fa-play"></i></button>
            </li>
            <li class="${Y != null && Y.prev ? "" : "hidden"}">
                <button type="button"><i class="fas fa-fw fa-step-forward"></i></button>
            </li>
        </ul>
    </div>
    <div class="settings-panel-mobile">
        <div class="wrapper">
            <div class="head">
                <h3>Settings</h3>
            </div>
            <div class="wrapper-child">
            <ul class="list">
                <li>
                    <label for="captions">Captions</label>
                    <select name="captions" id="captions"></select>
                </li>
                <li>
                    <label for="quality">Quality</label>
                    <select name="quality" id="quality"></select>
                </li>
                <li>
                    <label for="speed">Speed</label>
                    <select name="speed" id="speed"></select>
                </li>
            </ul>
            <button class="close-btn" type="button">OK</button>
            </div>
        </div>
    </div>
    <video controlslist="nodownload" crossorigin="anonymous">
        ${Q == null ? void 0 : Q.map((V) => `<track label="${V.long}" kind="subtitles" srclang="${V.short}" src="${V.source}" default />`).join("")}
    </video>
    <div class="overlay"></div>
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
                <li class="${Y != null && Y.next ? "" : "hidden"}">
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
                <button id="settings-button"><i class="fas fa-fw fa-gear"></i></button>
                </li>
                <li>
                    <button id="theater-button"><i class="far fa-fw fa-rectangle-wide"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Theater Mode (t)</div>
                </li>
                <li>
                    <button id="fullscreen-button"><i class="far fa-fw fa-expand"></i></button>
                    <div role="tooltip" aria-disabled="false" class="tooltip">Fullscreen (f)</div>
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
            ${Q ? Q[0].long : null}
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
        ${Q == null ? void 0 : Q.map((V) => `<li><button data-lang="${V.short}" type="button" class="w-full text-left">${V.long} <i class="fas fa-fw fa-check ${V.short == ge ? "" : "hidden"}"></i></button></li>`).join("")}
        </ul>
        <ul class="settings-menu-panel text-sm">
        <li><button type="button" class="action"><i class="far fa-fw fa-chevron-left"></i></button> Playback Speed</li>
        ${te.map((V) => `<li><button data-speed="${V}" type="button" class="w-full text-left">${V == 1 ? "Normal" : V} <i class="fas fa-fw fa-check ${V == ee ? "" : "hidden"}"></i></button></li>`).join("")}
        </ul>
    </ul>
    </div>
    </div>
    `;
};
var it = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function nt(fe) {
  return fe && fe.__esModule && Object.prototype.hasOwnProperty.call(fe, "default") ? fe.default : fe;
}
var Ye = { exports: {} };
(function(fe, Y) {
  typeof window != "undefined" && function(ee, te) {
    fe.exports = te();
  }(it, () => (() => {
    var Q = {
      "./src/config.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          enableStreamingMode: () => c,
          hlsDefaultConfig: () => u,
          mergeConfig: () => t
        });
        var F = S("./src/controller/abr-controller.ts"), A = S("./src/controller/audio-stream-controller.ts"), C = S("./src/controller/audio-track-controller.ts"), I = S("./src/controller/subtitle-stream-controller.ts"), k = S("./src/controller/subtitle-track-controller.ts"), P = S("./src/controller/buffer-controller.ts"), L = S("./src/controller/timeline-controller.ts"), x = S("./src/controller/cap-level-controller.ts"), _ = S("./src/controller/fps-controller.ts"), T = S("./src/controller/eme-controller.ts"), h = S("./src/controller/cmcd-controller.ts"), y = S("./src/utils/xhr-loader.ts"), m = S("./src/utils/fetch-loader.ts"), s = S("./src/utils/cues.ts"), f = S("./src/utils/mediakeys-helper.ts"), a = S("./src/utils/logger.ts");
        function i() {
          return i = Object.assign ? Object.assign.bind() : function(e) {
            for (var d = 1; d < arguments.length; d++) {
              var E = arguments[d];
              for (var p in E)
                Object.prototype.hasOwnProperty.call(E, p) && (e[p] = E[p]);
            }
            return e;
          }, i.apply(this, arguments);
        }
        function g(e, d) {
          var E = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var p = Object.getOwnPropertySymbols(e);
            d && (p = p.filter(function(D) {
              return Object.getOwnPropertyDescriptor(e, D).enumerable;
            })), E.push.apply(E, p);
          }
          return E;
        }
        function o(e) {
          for (var d = 1; d < arguments.length; d++) {
            var E = arguments[d] != null ? arguments[d] : {};
            d % 2 ? g(Object(E), !0).forEach(function(p) {
              r(e, p, E[p]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(E)) : g(Object(E)).forEach(function(p) {
              Object.defineProperty(e, p, Object.getOwnPropertyDescriptor(E, p));
            });
          }
          return e;
        }
        function r(e, d, E) {
          return d = l(d), d in e ? Object.defineProperty(e, d, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : e[d] = E, e;
        }
        function l(e) {
          var d = v(e, "string");
          return typeof d == "symbol" ? d : String(d);
        }
        function v(e, d) {
          if (typeof e != "object" || e === null)
            return e;
          var E = e[Symbol.toPrimitive];
          if (E !== void 0) {
            var p = E.call(e, d || "default");
            if (typeof p != "object")
              return p;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (d === "string" ? String : Number)(e);
        }
        var u = o(o({
          autoStartLoad: !0,
          startPosition: -1,
          defaultAudioCodec: void 0,
          debug: !1,
          capLevelOnFPSDrop: !1,
          capLevelToPlayerSize: !1,
          ignoreDevicePixelRatio: !1,
          initialLiveManifestSize: 1,
          maxBufferLength: 30,
          backBufferLength: 1 / 0,
          maxBufferSize: 60 * 1e3 * 1e3,
          maxBufferHole: 0.1,
          highBufferWatchdogPeriod: 2,
          nudgeOffset: 0.1,
          nudgeMaxRetry: 3,
          maxFragLookUpTolerance: 0.25,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 1 / 0,
          liveSyncDuration: void 0,
          liveMaxLatencyDuration: void 0,
          maxLiveSyncPlaybackRate: 1,
          liveDurationInfinity: !1,
          liveBackBufferLength: null,
          maxMaxBufferLength: 600,
          enableWorker: !0,
          enableSoftwareAES: !0,
          manifestLoadingTimeOut: 1e4,
          manifestLoadingMaxRetry: 1,
          manifestLoadingRetryDelay: 1e3,
          manifestLoadingMaxRetryTimeout: 64e3,
          startLevel: void 0,
          levelLoadingTimeOut: 1e4,
          levelLoadingMaxRetry: 4,
          levelLoadingRetryDelay: 1e3,
          levelLoadingMaxRetryTimeout: 64e3,
          fragLoadingTimeOut: 2e4,
          fragLoadingMaxRetry: 6,
          fragLoadingRetryDelay: 1e3,
          fragLoadingMaxRetryTimeout: 64e3,
          startFragPrefetch: !1,
          fpsDroppedMonitoringPeriod: 5e3,
          fpsDroppedMonitoringThreshold: 0.2,
          appendErrorMaxRetry: 3,
          loader: y.default,
          fLoader: void 0,
          pLoader: void 0,
          xhrSetup: void 0,
          licenseXhrSetup: void 0,
          licenseResponseCallback: void 0,
          abrController: F.default,
          bufferController: P.default,
          capLevelController: x.default,
          fpsController: _.default,
          stretchShortVideoTrack: !1,
          maxAudioFramesDrift: 1,
          forceKeyFrameOnDiscontinuity: !0,
          abrEwmaFastLive: 3,
          abrEwmaSlowLive: 9,
          abrEwmaFastVoD: 3,
          abrEwmaSlowVoD: 9,
          abrEwmaDefaultEstimate: 5e5,
          abrBandWidthFactor: 0.95,
          abrBandWidthUpFactor: 0.7,
          abrMaxWithRealBitrate: !1,
          maxStarvationDelay: 4,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          emeEnabled: !1,
          widevineLicenseUrl: void 0,
          drmSystems: {},
          drmSystemOptions: {},
          requestMediaKeySystemAccessFunc: f.requestMediaKeySystemAccess,
          testBandwidth: !0,
          progressive: !1,
          lowLatencyMode: !0,
          cmcd: void 0,
          enableDateRangeMetadataCues: !0,
          enableEmsgMetadataCues: !0,
          enableID3MetadataCues: !0
        }, n()), {}, {
          subtitleStreamController: I.SubtitleStreamController,
          subtitleTrackController: k.default,
          timelineController: L.TimelineController,
          audioStreamController: A.default,
          audioTrackController: C.default,
          emeController: T.default,
          cmcdController: h.default
        });
        function n() {
          return {
            cueHandler: s.default,
            enableWebVTT: !0,
            enableIMSC1: !0,
            enableCEA708Captions: !0,
            captionsTextTrack1Label: "English",
            captionsTextTrack1LanguageCode: "en",
            captionsTextTrack2Label: "Spanish",
            captionsTextTrack2LanguageCode: "es",
            captionsTextTrack3Label: "Unknown CC",
            captionsTextTrack3LanguageCode: "",
            captionsTextTrack4Label: "Unknown CC",
            captionsTextTrack4LanguageCode: "",
            renderTextTracksNatively: !0
          };
        }
        function t(e, d) {
          if ((d.liveSyncDurationCount || d.liveMaxLatencyDurationCount) && (d.liveSyncDuration || d.liveMaxLatencyDuration))
            throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
          if (d.liveMaxLatencyDurationCount !== void 0 && (d.liveSyncDurationCount === void 0 || d.liveMaxLatencyDurationCount <= d.liveSyncDurationCount))
            throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
          if (d.liveMaxLatencyDuration !== void 0 && (d.liveSyncDuration === void 0 || d.liveMaxLatencyDuration <= d.liveSyncDuration))
            throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
          return i({}, e, d);
        }
        function c(e) {
          var d = e.loader;
          if (d !== m.default && d !== y.default)
            a.logger.log("[config]: Custom loader detected, cannot enable progressive streaming"), e.progressive = !1;
          else {
            var E = (0, m.fetchSupported)();
            E && (e.loader = m.default, e.progressive = !0, e.enableSoftwareAES = !0, a.logger.log("[config]: Progressive streaming enabled, using FetchLoader"));
          }
        }
      },
      "./src/controller/abr-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => y
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/ewma-bandwidth-estimator.ts"), C = S("./src/events.ts"), I = S("./src/errors.ts"), k = S("./src/types/loader.ts"), P = S("./src/utils/logger.ts");
        function L(m, s) {
          for (var f = 0; f < s.length; f++) {
            var a = s[f];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(m, _(a.key), a);
          }
        }
        function x(m, s, f) {
          return s && L(m.prototype, s), f && L(m, f), Object.defineProperty(m, "prototype", { writable: !1 }), m;
        }
        function _(m) {
          var s = T(m, "string");
          return typeof s == "symbol" ? s : String(s);
        }
        function T(m, s) {
          if (typeof m != "object" || m === null)
            return m;
          var f = m[Symbol.toPrimitive];
          if (f !== void 0) {
            var a = f.call(m, s || "default");
            if (typeof a != "object")
              return a;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (s === "string" ? String : Number)(m);
        }
        var h = /* @__PURE__ */ function() {
          function m(f) {
            this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = f;
            var a = f.config;
            this.bwEstimator = new A.default(a.abrEwmaSlowVoD, a.abrEwmaFastVoD, a.abrEwmaDefaultEstimate), this.registerListeners();
          }
          var s = m.prototype;
          return s.registerListeners = function() {
            var a = this.hls;
            a.on(C.Events.FRAG_LOADING, this.onFragLoading, this), a.on(C.Events.FRAG_LOADED, this.onFragLoaded, this), a.on(C.Events.FRAG_BUFFERED, this.onFragBuffered, this), a.on(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), a.on(C.Events.ERROR, this.onError, this);
          }, s.unregisterListeners = function() {
            var a = this.hls;
            a.off(C.Events.FRAG_LOADING, this.onFragLoading, this), a.off(C.Events.FRAG_LOADED, this.onFragLoaded, this), a.off(C.Events.FRAG_BUFFERED, this.onFragBuffered, this), a.off(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), a.off(C.Events.ERROR, this.onError, this);
          }, s.destroy = function() {
            this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null;
          }, s.onFragLoading = function(a, i) {
            var g = i.frag;
            if (g.type === k.PlaylistLevelType.MAIN && !this.timer) {
              var o;
              this.fragCurrent = g, this.partCurrent = (o = i.part) != null ? o : null, this.timer = self.setInterval(this.onCheck, 100);
            }
          }, s.onLevelLoaded = function(a, i) {
            var g = this.hls.config;
            i.details.live ? this.bwEstimator.update(g.abrEwmaSlowLive, g.abrEwmaFastLive) : this.bwEstimator.update(g.abrEwmaSlowVoD, g.abrEwmaFastVoD);
          }, s._abandonRulesCheck = function() {
            var a = this.fragCurrent, i = this.partCurrent, g = this.hls, o = g.autoLevelEnabled, r = g.media;
            if (!(!a || !r)) {
              var l = i ? i.stats : a.stats, v = i ? i.duration : a.duration;
              if (l.aborted || l.loaded && l.loaded === l.total || a.level === 0) {
                this.clearTimer(), this._nextAutoLevel = -1;
                return;
              }
              if (!(!o || r.paused || !r.playbackRate || !r.readyState)) {
                var u = g.mainForwardBufferInfo;
                if (u !== null) {
                  var n = performance.now() - l.loading.start, t = Math.abs(r.playbackRate);
                  if (!(n <= 500 * v / t)) {
                    var c = l.loaded && l.loading.first, e = this.bwEstimator.getEstimate(), d = g.levels, E = g.minAutoLevel, p = d[a.level], D = l.total || Math.max(l.loaded, Math.round(v * p.maxBitrate / 8)), R = c ? l.loaded * 1e3 / n : 0, b = R ? (D - l.loaded) / R : D * 8 / e, O = u.len / t;
                    if (!(b <= O)) {
                      var M = Number.POSITIVE_INFINITY, w;
                      for (w = a.level - 1; w > E; w--) {
                        var U = d[w].maxBitrate;
                        if (M = R ? v * U / (8 * 0.8 * R) : v * U / e, M < O)
                          break;
                      }
                      M >= b || (P.logger.warn("Fragment " + a.sn + (i ? " part " + i.index : "") + " of level " + a.level + " is loading too slowly and will cause an underbuffer; aborting and switching to level " + w + `
      Current BW estimate: ` + ((0, F.isFiniteNumber)(e) ? (e / 1024).toFixed(3) : "Unknown") + ` Kb/s
      Estimated load time for current fragment: ` + b.toFixed(3) + ` s
      Estimated load time for the next fragment: ` + M.toFixed(3) + ` s
      Time to underbuffer: ` + O.toFixed(3) + " s"), g.nextLoadLevel = w, c && this.bwEstimator.sample(n, l.loaded), this.clearTimer(), (a.loader || a.keyLoader) && (this.fragCurrent = this.partCurrent = null, a.abortRequests()), g.trigger(C.Events.FRAG_LOAD_EMERGENCY_ABORTED, {
                        frag: a,
                        part: i,
                        stats: l
                      }));
                    }
                  }
                }
              }
            }
          }, s.onFragLoaded = function(a, i) {
            var g = i.frag, o = i.part;
            if (g.type === k.PlaylistLevelType.MAIN && (0, F.isFiniteNumber)(g.sn)) {
              var r = o ? o.stats : g.stats, l = o ? o.duration : g.duration;
              if (this.clearTimer(), this.lastLoadedFragLevel = g.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                var v = this.hls.levels[g.level], u = (v.loaded ? v.loaded.bytes : 0) + r.loaded, n = (v.loaded ? v.loaded.duration : 0) + l;
                v.loaded = {
                  bytes: u,
                  duration: n
                }, v.realBitrate = Math.round(8 * u / n);
              }
              if (g.bitrateTest) {
                var t = {
                  stats: r,
                  frag: g,
                  part: o,
                  id: g.type
                };
                this.onFragBuffered(C.Events.FRAG_BUFFERED, t);
              }
            }
          }, s.onFragBuffered = function(a, i) {
            var g = i.frag, o = i.part, r = o ? o.stats : g.stats;
            if (!r.aborted && !(g.type !== k.PlaylistLevelType.MAIN || g.sn === "initSegment")) {
              var l = r.parsing.end - r.loading.start;
              this.bwEstimator.sample(l, r.loaded), r.bwEstimate = this.bwEstimator.getEstimate(), g.bitrateTest ? this.bitrateTestDelay = l / 1e3 : this.bitrateTestDelay = 0;
            }
          }, s.onError = function(a, i) {
            var g;
            if (((g = i.frag) === null || g === void 0 ? void 0 : g.type) === k.PlaylistLevelType.MAIN) {
              if (i.type === I.ErrorTypes.KEY_SYSTEM_ERROR) {
                this.clearTimer();
                return;
              }
              switch (i.details) {
                case I.ErrorDetails.FRAG_LOAD_ERROR:
                case I.ErrorDetails.FRAG_LOAD_TIMEOUT:
                case I.ErrorDetails.KEY_LOAD_ERROR:
                case I.ErrorDetails.KEY_LOAD_TIMEOUT:
                  this.clearTimer();
                  break;
              }
            }
          }, s.clearTimer = function() {
            self.clearInterval(this.timer), this.timer = void 0;
          }, s.getNextABRAutoLevel = function() {
            var a = this.fragCurrent, i = this.partCurrent, g = this.hls, o = g.maxAutoLevel, r = g.config, l = g.minAutoLevel, v = g.media, u = i ? i.duration : a ? a.duration : 0, n = v && v.playbackRate !== 0 ? Math.abs(v.playbackRate) : 1, t = this.bwEstimator ? this.bwEstimator.getEstimate() : r.abrEwmaDefaultEstimate, c = g.mainForwardBufferInfo, e = (c ? c.len : 0) / n, d = this.findBestLevel(t, l, o, e, r.abrBandWidthFactor, r.abrBandWidthUpFactor);
            if (d >= 0)
              return d;
            P.logger.trace((e ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
            var E = u ? Math.min(u, r.maxStarvationDelay) : r.maxStarvationDelay, p = r.abrBandWidthFactor, D = r.abrBandWidthUpFactor;
            if (!e) {
              var R = this.bitrateTestDelay;
              if (R) {
                var b = u ? Math.min(u, r.maxLoadingDelay) : r.maxLoadingDelay;
                E = b - R, P.logger.trace("bitrate test took " + Math.round(1e3 * R) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * E) + " ms"), p = D = 1;
              }
            }
            return d = this.findBestLevel(t, l, o, e + E, p, D), Math.max(d, 0);
          }, s.findBestLevel = function(a, i, g, o, r, l) {
            for (var v, u = this.fragCurrent, n = this.partCurrent, t = this.lastLoadedFragLevel, c = this.hls.levels, e = c[t], d = !!(e != null && (v = e.details) !== null && v !== void 0 && v.live), E = e == null ? void 0 : e.codecSet, p = n ? n.duration : u ? u.duration : 0, D = g; D >= i; D--) {
              var R = c[D];
              if (!(!R || E && R.codecSet !== E)) {
                var b = R.details, O = (n ? b == null ? void 0 : b.partTarget : b == null ? void 0 : b.averagetargetduration) || p, M = void 0;
                D <= t ? M = r * a : M = l * a;
                var w = c[D].maxBitrate, U = w * O / M;
                if (P.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + D + "/" + Math.round(M) + "/" + w + "/" + O + "/" + o + "/" + U), M > w && (U === 0 || !(0, F.isFiniteNumber)(U) || d && !this.bitrateTestDelay || U < o))
                  return D;
              }
            }
            return -1;
          }, x(m, [{
            key: "nextAutoLevel",
            get: function() {
              var a = this._nextAutoLevel, i = this.bwEstimator;
              if (a !== -1 && !i.canEstimate())
                return a;
              var g = this.getNextABRAutoLevel();
              return a !== -1 && this.hls.levels[g].loadError ? a : (a !== -1 && (g = Math.min(a, g)), g);
            },
            set: function(a) {
              this._nextAutoLevel = a;
            }
          }]), m;
        }();
        const y = h;
      },
      "./src/controller/audio-stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => r
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/controller/base-stream-controller.ts"), C = S("./src/events.ts"), I = S("./src/utils/buffer-helper.ts"), k = S("./src/controller/fragment-tracker.ts"), P = S("./src/types/level.ts"), L = S("./src/types/loader.ts"), x = S("./src/loader/fragment.ts"), _ = S("./src/demux/chunk-cache.ts"), T = S("./src/demux/transmuxer-interface.ts"), h = S("./src/types/transmuxer.ts"), y = S("./src/controller/fragment-finders.ts"), m = S("./src/utils/discontinuities.ts"), s = S("./src/errors.ts");
        function f() {
          return f = Object.assign ? Object.assign.bind() : function(l) {
            for (var v = 1; v < arguments.length; v++) {
              var u = arguments[v];
              for (var n in u)
                Object.prototype.hasOwnProperty.call(u, n) && (l[n] = u[n]);
            }
            return l;
          }, f.apply(this, arguments);
        }
        function a(l, v) {
          l.prototype = Object.create(v.prototype), l.prototype.constructor = l, i(l, v);
        }
        function i(l, v) {
          return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, t) {
            return n.__proto__ = t, n;
          }, i(l, v);
        }
        var g = 100, o = /* @__PURE__ */ function(l) {
          a(v, l);
          function v(n, t, c) {
            var e;
            return e = l.call(this, n, t, c, "[audio-stream-controller]") || this, e.videoBuffer = null, e.videoTrackCC = -1, e.waitingVideoCC = -1, e.audioSwitch = !1, e.trackId = -1, e.waitingData = null, e.mainDetails = null, e.bufferFlushed = !1, e.cachedTrackLoadedData = null, e._registerListeners(), e;
          }
          var u = v.prototype;
          return u.onHandlerDestroying = function() {
            this._unregisterListeners(), this.mainDetails = null;
          }, u._registerListeners = function() {
            var t = this.hls;
            t.on(C.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(C.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(C.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(C.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.on(C.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(C.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(C.Events.ERROR, this.onError, this), t.on(C.Events.BUFFER_RESET, this.onBufferReset, this), t.on(C.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(C.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(C.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(C.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u._unregisterListeners = function() {
            var t = this.hls;
            t.off(C.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(C.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(C.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(C.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.off(C.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(C.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(C.Events.ERROR, this.onError, this), t.off(C.Events.BUFFER_RESET, this.onBufferReset, this), t.off(C.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(C.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(C.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(C.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u.onInitPtsFound = function(t, c) {
            var e = c.frag, d = c.id, E = c.initPTS;
            if (d === "main") {
              var p = e.cc;
              this.initPTS[e.cc] = E, this.log("InitPTS for cc: " + p + " found from main: " + E), this.videoTrackCC = p, this.state === A.State.WAITING_INIT_PTS && this.tick();
            }
          }, u.startLoad = function(t) {
            if (!this.levels) {
              this.startPosition = t, this.state = A.State.STOPPED;
              return;
            }
            var c = this.lastCurrentTime;
            this.stopLoad(), this.setInterval(g), this.fragLoadError = 0, c > 0 && t === -1 ? (this.log("Override startPosition with lastCurrentTime @" + c.toFixed(3)), t = c, this.state = A.State.IDLE) : (this.loadedmetadata = !1, this.state = A.State.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick();
          }, u.doTick = function() {
            switch (this.state) {
              case A.State.IDLE:
                this.doTickIdle();
                break;
              case A.State.WAITING_TRACK: {
                var t, c = this.levels, e = this.trackId, d = c == null || (t = c[e]) === null || t === void 0 ? void 0 : t.details;
                if (d) {
                  if (this.waitForCdnTuneIn(d))
                    break;
                  this.state = A.State.WAITING_INIT_PTS;
                }
                break;
              }
              case A.State.FRAG_LOADING_WAITING_RETRY: {
                var E, p = performance.now(), D = this.retryDate;
                (!D || p >= D || (E = this.media) !== null && E !== void 0 && E.seeking) && (this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.trackId), this.state = A.State.IDLE);
                break;
              }
              case A.State.WAITING_INIT_PTS: {
                var R = this.waitingData;
                if (R) {
                  var b = R.frag, O = R.part, M = R.cache, w = R.complete;
                  if (this.initPTS[b.cc] !== void 0) {
                    this.waitingData = null, this.waitingVideoCC = -1, this.state = A.State.FRAG_LOADING;
                    var U = M.flush(), N = {
                      frag: b,
                      part: O,
                      payload: U,
                      networkDetails: null
                    };
                    this._handleFragmentLoadProgress(N), w && l.prototype._handleFragmentLoadComplete.call(this, N);
                  } else if (this.videoTrackCC !== this.waitingVideoCC)
                    this.log("Waiting fragment cc (" + b.cc + ") cancelled because video is at cc " + this.videoTrackCC), this.clearWaitingFragment();
                  else {
                    var K = this.getLoadPosition(), W = I.BufferHelper.bufferInfo(this.mediaBuffer, K, this.config.maxBufferHole), G = (0, y.fragmentWithinToleranceTest)(W.end, this.config.maxFragLookUpTolerance, b);
                    G < 0 && (this.log("Waiting fragment cc (" + b.cc + ") @ " + b.start + " cancelled because another fragment at " + W.end + " is needed"), this.clearWaitingFragment());
                  }
                } else
                  this.state = A.State.IDLE;
              }
            }
            this.onTickEnd();
          }, u.clearWaitingFragment = function() {
            var t = this.waitingData;
            t && (this.fragmentTracker.removeFragment(t.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = A.State.IDLE);
          }, u.resetLoadingState = function() {
            this.clearWaitingFragment(), l.prototype.resetLoadingState.call(this);
          }, u.onTickEnd = function() {
            var t = this.media;
            !t || !t.readyState || (this.lastCurrentTime = t.currentTime);
          }, u.doTickIdle = function() {
            var t = this.hls, c = this.levels, e = this.media, d = this.trackId, E = t.config;
            if (!(!c || !c[d]) && !(!e && (this.startFragRequested || !E.startFragPrefetch))) {
              var p = c[d], D = p.details;
              if (!D || D.live && this.levelLastLoaded !== d || this.waitForCdnTuneIn(D)) {
                this.state = A.State.WAITING_TRACK;
                return;
              }
              var R = this.mediaBuffer ? this.mediaBuffer : this.media;
              this.bufferFlushed && R && (this.bufferFlushed = !1, this.afterBufferFlushed(R, x.ElementaryStreamTypes.AUDIO, L.PlaylistLevelType.AUDIO));
              var b = this.getFwdBufferInfo(R, L.PlaylistLevelType.AUDIO);
              if (b !== null) {
                var O = this.audioSwitch;
                if (!O && this._streamEnded(b, D)) {
                  t.trigger(C.Events.BUFFER_EOS, {
                    type: "audio"
                  }), this.state = A.State.ENDED;
                  return;
                }
                var M = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, L.PlaylistLevelType.MAIN), w = b.len, U = this.getMaxBufferLength(M == null ? void 0 : M.len);
                if (!(w >= U && !O)) {
                  var N = D.fragments, K = N[0].start, W = b.end;
                  if (O && e) {
                    var G = this.getLoadPosition();
                    W = G, D.PTSKnown && G < K && (b.end > K || b.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), e.currentTime = K + 0.05);
                  }
                  if (!(M && W > M.end + D.targetduration) && !((!M || !M.len) && b.len)) {
                    var j = this.getNextFragment(W, D);
                    if (!j) {
                      this.bufferFlushed = !0;
                      return;
                    }
                    this.loadFragment(j, D, W);
                  }
                }
              }
            }
          }, u.getMaxBufferLength = function(t) {
            var c = l.prototype.getMaxBufferLength.call(this);
            return t ? Math.max(c, t) : c;
          }, u.onMediaDetaching = function() {
            this.videoBuffer = null, l.prototype.onMediaDetaching.call(this);
          }, u.onAudioTracksUpdated = function(t, c) {
            var e = c.audioTracks;
            this.resetTransmuxer(), this.levels = e.map(function(d) {
              return new P.Level(d);
            });
          }, u.onAudioTrackSwitching = function(t, c) {
            var e = !!c.url;
            this.trackId = c.id;
            var d = this.fragCurrent;
            d && d.abortRequests(), this.fragCurrent = null, this.clearWaitingFragment(), e ? this.setInterval(g) : this.resetTransmuxer(), e ? (this.audioSwitch = !0, this.state = A.State.IDLE) : this.state = A.State.STOPPED, this.tick();
          }, u.onManifestLoading = function() {
            this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1;
          }, u.onLevelLoaded = function(t, c) {
            this.mainDetails = c.details, this.cachedTrackLoadedData !== null && (this.hls.trigger(C.Events.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null);
          }, u.onAudioTrackLoaded = function(t, c) {
            var e;
            if (this.mainDetails == null) {
              this.cachedTrackLoadedData = c;
              return;
            }
            var d = this.levels, E = c.details, p = c.id;
            if (!d) {
              this.warn("Audio tracks were reset while loading level " + p);
              return;
            }
            this.log("Track " + p + " loaded [" + E.startSN + "," + E.endSN + "],duration:" + E.totalduration);
            var D = d[p], R = 0;
            if (E.live || (e = D.details) !== null && e !== void 0 && e.live) {
              var b = this.mainDetails;
              if (E.fragments[0] || (E.deltaUpdateFailed = !0), E.deltaUpdateFailed || !b)
                return;
              !D.details && E.hasProgramDateTime && b.hasProgramDateTime ? ((0, m.alignMediaPlaylistByPDT)(E, b), R = E.fragments[0].start) : R = this.alignPlaylists(E, D.details);
            }
            D.details = E, this.levelLastLoaded = p, !this.startFragRequested && (this.mainDetails || !E.live) && this.setStartPosition(D.details, R), this.state === A.State.WAITING_TRACK && !this.waitForCdnTuneIn(E) && (this.state = A.State.IDLE), this.tick();
          }, u._handleFragmentLoadProgress = function(t) {
            var c, e = t.frag, d = t.part, E = t.payload, p = this.config, D = this.trackId, R = this.levels;
            if (!R) {
              this.warn("Audio tracks were reset while fragment load was in progress. Fragment " + e.sn + " of level " + e.level + " will not be buffered");
              return;
            }
            var b = R[D];
            console.assert(b, "Audio track is defined on fragment load progress");
            var O = b.details;
            console.assert(O, "Audio track details are defined on fragment load progress");
            var M = p.defaultAudioCodec || b.audioCodec || "mp4a.40.2", w = this.transmuxer;
            w || (w = this.transmuxer = new T.default(this.hls, L.PlaylistLevelType.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
            var U = this.initPTS[e.cc], N = (c = e.initSegment) === null || c === void 0 ? void 0 : c.data;
            if (U !== void 0) {
              var K = !1, W = d ? d.index : -1, G = W !== -1, j = new h.ChunkMetadata(e.level, e.sn, e.stats.chunkCount, E.byteLength, W, G);
              w.push(E, N, M, "", e, d, O.totalduration, K, j, U);
            } else {
              this.log("Unknown video PTS for cc " + e.cc + ", waiting for video PTS before demuxing audio frag " + e.sn + " of [" + O.startSN + " ," + O.endSN + "],track " + D);
              var H = this.waitingData = this.waitingData || {
                frag: e,
                part: d,
                cache: new _.default(),
                complete: !1
              }, X = H.cache;
              X.push(new Uint8Array(E)), this.waitingVideoCC = this.videoTrackCC, this.state = A.State.WAITING_INIT_PTS;
            }
          }, u._handleFragmentLoadComplete = function(t) {
            if (this.waitingData) {
              this.waitingData.complete = !0;
              return;
            }
            l.prototype._handleFragmentLoadComplete.call(this, t);
          }, u.onBufferReset = function() {
            this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1;
          }, u.onBufferCreated = function(t, c) {
            var e = c.tracks.audio;
            e && (this.mediaBuffer = e.buffer || null), c.tracks.video && (this.videoBuffer = c.tracks.video.buffer || null);
          }, u.onFragBuffered = function(t, c) {
            var e = c.frag, d = c.part;
            if (e.type !== L.PlaylistLevelType.AUDIO) {
              if (!this.loadedmetadata && e.type === L.PlaylistLevelType.MAIN) {
                var E;
                (E = this.videoBuffer || this.media) !== null && E !== void 0 && E.buffered.length && (this.loadedmetadata = !0);
              }
              return;
            }
            if (this.fragContextChanged(e)) {
              this.warn("Fragment " + e.sn + (d ? " p: " + d.index : "") + " of level " + e.level + " finished buffering, but was aborted. state: " + this.state + ", audioSwitch: " + this.audioSwitch);
              return;
            }
            e.sn !== "initSegment" && (this.fragPrevious = e, this.audioSwitch && (this.audioSwitch = !1, this.hls.trigger(C.Events.AUDIO_TRACK_SWITCHED, {
              id: this.trackId
            }))), this.fragBufferedComplete(e, d);
          }, u.onError = function(t, c) {
            if (c.type === s.ErrorTypes.KEY_SYSTEM_ERROR) {
              this.onFragmentOrKeyLoadError(L.PlaylistLevelType.AUDIO, c);
              return;
            }
            switch (c.details) {
              case s.ErrorDetails.FRAG_LOAD_ERROR:
              case s.ErrorDetails.FRAG_LOAD_TIMEOUT:
              case s.ErrorDetails.FRAG_PARSING_ERROR:
              case s.ErrorDetails.KEY_LOAD_ERROR:
              case s.ErrorDetails.KEY_LOAD_TIMEOUT:
                this.onFragmentOrKeyLoadError(L.PlaylistLevelType.AUDIO, c);
                break;
              case s.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
              case s.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                this.state !== A.State.ERROR && this.state !== A.State.STOPPED && (this.state = c.fatal ? A.State.ERROR : A.State.IDLE, this.warn(c.details + " while loading frag, switching to " + this.state + " state"));
                break;
              case s.ErrorDetails.BUFFER_FULL_ERROR:
                if (c.parent === "audio" && (this.state === A.State.PARSING || this.state === A.State.PARSED)) {
                  var e = !0, d = this.getFwdBufferInfo(this.mediaBuffer, L.PlaylistLevelType.AUDIO);
                  d && d.len > 0.5 && (e = !this.reduceMaxBufferLength(d.len)), e && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, l.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState();
                }
                break;
            }
          }, u.onBufferFlushed = function(t, c) {
            var e = c.type;
            e === x.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0, this.state === A.State.ENDED && (this.state = A.State.IDLE));
          }, u._handleTransmuxComplete = function(t) {
            var c, e = "audio", d = this.hls, E = t.remuxResult, p = t.chunkMeta, D = this.getCurrentContext(p);
            if (!D) {
              this.warn("The loading context changed while buffering fragment " + p.sn + " of level " + p.level + ". This chunk will not be buffered."), this.resetStartWhenNotLoaded(p.level);
              return;
            }
            var R = D.frag, b = D.part, O = D.level.details, M = E.audio, w = E.text, U = E.id3, N = E.initSegment;
            if (!(this.fragContextChanged(R) || !O)) {
              if (this.state = A.State.PARSING, this.audioSwitch && M && this.completeAudioSwitch(), N != null && N.tracks && (this._bufferInitSegment(N.tracks, R, p), d.trigger(C.Events.FRAG_PARSING_INIT_SEGMENT, {
                frag: R,
                id: e,
                tracks: N.tracks
              })), M) {
                var K = M.startPTS, W = M.endPTS, G = M.startDTS, j = M.endDTS;
                b && (b.elementaryStreams[x.ElementaryStreamTypes.AUDIO] = {
                  startPTS: K,
                  endPTS: W,
                  startDTS: G,
                  endDTS: j
                }), R.setElementaryStreamInfo(x.ElementaryStreamTypes.AUDIO, K, W, G, j), this.bufferFragmentData(M, R, b, p);
              }
              if (U != null && (c = U.samples) !== null && c !== void 0 && c.length) {
                var H = f({
                  id: e,
                  frag: R,
                  details: O
                }, U);
                d.trigger(C.Events.FRAG_PARSING_METADATA, H);
              }
              if (w) {
                var X = f({
                  id: e,
                  frag: R,
                  details: O
                }, w);
                d.trigger(C.Events.FRAG_PARSING_USERDATA, X);
              }
            }
          }, u._bufferInitSegment = function(t, c, e) {
            if (this.state === A.State.PARSING) {
              t.video && delete t.video;
              var d = t.audio;
              if (!!d) {
                d.levelCodec = d.codec, d.id = "audio", this.log("Init audio buffer, container:" + d.container + ", codecs[parsed]=[" + d.codec + "]"), this.hls.trigger(C.Events.BUFFER_CODECS, t);
                var E = d.initSegment;
                if (E != null && E.byteLength) {
                  var p = {
                    type: "audio",
                    frag: c,
                    part: null,
                    chunkMeta: e,
                    parent: c.type,
                    data: E
                  };
                  this.hls.trigger(C.Events.BUFFER_APPENDING, p);
                }
                this.tick();
              }
            }
          }, u.loadFragment = function(t, c, e) {
            var d = this.fragmentTracker.getState(t);
            this.fragCurrent = t, (this.audioSwitch || d === k.FragmentState.NOT_LOADED || d === k.FragmentState.PARTIAL) && (t.sn === "initSegment" ? this._loadInitSegment(t, c) : c.live && !(0, F.isFiniteNumber)(this.initPTS[t.cc]) ? (this.log("Waiting for video PTS in continuity counter " + t.cc + " of live stream before loading audio fragment " + t.sn + " of level " + this.trackId), this.state = A.State.WAITING_INIT_PTS) : (this.startFragRequested = !0, l.prototype.loadFragment.call(this, t, c, e)));
          }, u.completeAudioSwitch = function() {
            var t = this.hls, c = this.media, e = this.trackId;
            c && (this.log("Switching audio track : flushing all audio"), l.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, t.trigger(C.Events.AUDIO_TRACK_SWITCHED, {
              id: e
            });
          }, v;
        }(A.default);
        const r = o;
      },
      "./src/controller/audio-track-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => y
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/controller/base-playlist-controller.ts"), I = S("./src/types/loader.ts");
        function k(m, s) {
          for (var f = 0; f < s.length; f++) {
            var a = s[f];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(m, L(a.key), a);
          }
        }
        function P(m, s, f) {
          return s && k(m.prototype, s), f && k(m, f), Object.defineProperty(m, "prototype", { writable: !1 }), m;
        }
        function L(m) {
          var s = x(m, "string");
          return typeof s == "symbol" ? s : String(s);
        }
        function x(m, s) {
          if (typeof m != "object" || m === null)
            return m;
          var f = m[Symbol.toPrimitive];
          if (f !== void 0) {
            var a = f.call(m, s || "default");
            if (typeof a != "object")
              return a;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (s === "string" ? String : Number)(m);
        }
        function _(m, s) {
          m.prototype = Object.create(s.prototype), m.prototype.constructor = m, T(m, s);
        }
        function T(m, s) {
          return T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, i) {
            return a.__proto__ = i, a;
          }, T(m, s);
        }
        var h = /* @__PURE__ */ function(m) {
          _(s, m);
          function s(a) {
            var i;
            return i = m.call(this, a, "[audio-track-controller]") || this, i.tracks = [], i.groupId = null, i.tracksInGroup = [], i.trackId = -1, i.trackName = "", i.selectDefaultTrack = !0, i.registerListeners(), i;
          }
          var f = s.prototype;
          return f.registerListeners = function() {
            var i = this.hls;
            i.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), i.on(F.Events.LEVEL_LOADING, this.onLevelLoading, this), i.on(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), i.on(F.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), i.on(F.Events.ERROR, this.onError, this);
          }, f.unregisterListeners = function() {
            var i = this.hls;
            i.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), i.off(F.Events.LEVEL_LOADING, this.onLevelLoading, this), i.off(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), i.off(F.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), i.off(F.Events.ERROR, this.onError, this);
          }, f.destroy = function() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, m.prototype.destroy.call(this);
          }, f.onManifestLoading = function() {
            this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0;
          }, f.onManifestParsed = function(i, g) {
            this.tracks = g.audioTracks || [];
          }, f.onAudioTrackLoaded = function(i, g) {
            var o = g.id, r = g.details, l = this.tracksInGroup[o];
            if (!l) {
              this.warn("Invalid audio track id " + o);
              return;
            }
            var v = l.details;
            l.details = g.details, this.log("audioTrack " + o + " loaded [" + r.startSN + "-" + r.endSN + "]"), o === this.trackId && (this.retryCount = 0, this.playlistLoaded(o, g, v));
          }, f.onLevelLoading = function(i, g) {
            this.switchLevel(g.level);
          }, f.onLevelSwitching = function(i, g) {
            this.switchLevel(g.level);
          }, f.switchLevel = function(i) {
            var g = this.hls.levels[i];
            if (!!(g != null && g.audioGroupIds)) {
              var o = g.audioGroupIds[g.urlId];
              if (this.groupId !== o) {
                this.groupId = o;
                var r = this.tracks.filter(function(v) {
                  return !o || v.groupId === o;
                });
                this.selectDefaultTrack && !r.some(function(v) {
                  return v.default;
                }) && (this.selectDefaultTrack = !1), this.tracksInGroup = r;
                var l = {
                  audioTracks: r
                };
                this.log("Updating audio tracks, " + r.length + ' track(s) found in "' + o + '" group-id'), this.hls.trigger(F.Events.AUDIO_TRACKS_UPDATED, l), this.selectInitialTrack();
              }
            }
          }, f.onError = function(i, g) {
            m.prototype.onError.call(this, i, g), !(g.fatal || !g.context) && g.context.type === I.PlaylistContextType.AUDIO_TRACK && g.context.id === this.trackId && g.context.groupId === this.groupId && this.retryLoadingOrFail(g);
          }, f.setAudioTrack = function(i) {
            var g = this.tracksInGroup;
            if (i < 0 || i >= g.length) {
              this.warn("Invalid id passed to audio-track controller");
              return;
            }
            this.clearTimer();
            var o = g[this.trackId];
            this.log("Now switching to audio-track index " + i);
            var r = g[i], l = r.id, v = r.groupId, u = v === void 0 ? "" : v, n = r.name, t = r.type, c = r.url;
            if (this.trackId = i, this.trackName = n, this.selectDefaultTrack = !1, this.hls.trigger(F.Events.AUDIO_TRACK_SWITCHING, {
              id: l,
              groupId: u,
              name: n,
              type: t,
              url: c
            }), !(r.details && !r.details.live)) {
              var e = this.switchParams(r.url, o == null ? void 0 : o.details);
              this.loadPlaylist(e);
            }
          }, f.selectInitialTrack = function() {
            var i = this.tracksInGroup;
            console.assert(i.length, "Initial audio track should be selected when tracks are known");
            var g = this.trackName, o = this.findTrackId(g) || this.findTrackId();
            o !== -1 ? this.setAudioTrack(o) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(F.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
              fatal: !0
            }));
          }, f.findTrackId = function(i) {
            for (var g = this.tracksInGroup, o = 0; o < g.length; o++) {
              var r = g[o];
              if ((!this.selectDefaultTrack || r.default) && (!i || i === r.name))
                return r.id;
            }
            return -1;
          }, f.loadPlaylist = function(i) {
            m.prototype.loadPlaylist.call(this);
            var g = this.tracksInGroup[this.trackId];
            if (this.shouldLoadTrack(g)) {
              var o = g.id, r = g.groupId, l = g.url;
              if (i)
                try {
                  l = i.addDirectives(l);
                } catch (v) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + v);
                }
              this.log("loading audio-track playlist for id: " + o), this.clearTimer(), this.hls.trigger(F.Events.AUDIO_TRACK_LOADING, {
                url: l,
                id: o,
                groupId: r,
                deliveryDirectives: i || null
              });
            }
          }, P(s, [{
            key: "audioTracks",
            get: function() {
              return this.tracksInGroup;
            }
          }, {
            key: "audioTrack",
            get: function() {
              return this.trackId;
            },
            set: function(i) {
              this.selectDefaultTrack = !1, this.setAudioTrack(i);
            }
          }]), s;
        }(C.default);
        const y = h;
      },
      "./src/controller/base-playlist-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => k
        });
        var F = S("./src/types/level.ts"), A = S("./src/controller/level-helper.ts"), C = S("./src/utils/logger.ts"), I = S("./src/errors.ts"), k = /* @__PURE__ */ function() {
          function P(x, _) {
            this.hls = void 0, this.timer = -1, this.requestScheduled = -1, this.canLoad = !1, this.retryCount = 0, this.log = void 0, this.warn = void 0, this.log = C.logger.log.bind(C.logger, _ + ":"), this.warn = C.logger.warn.bind(C.logger, _ + ":"), this.hls = x;
          }
          var L = P.prototype;
          return L.destroy = function() {
            this.clearTimer(), this.hls = this.log = this.warn = null;
          }, L.onError = function(_, T) {
            T.fatal && (T.type === I.ErrorTypes.NETWORK_ERROR || T.type === I.ErrorTypes.KEY_SYSTEM_ERROR) && this.stopLoad();
          }, L.clearTimer = function() {
            clearTimeout(this.timer), this.timer = -1;
          }, L.startLoad = function() {
            this.canLoad = !0, this.retryCount = 0, this.requestScheduled = -1, this.loadPlaylist();
          }, L.stopLoad = function() {
            this.canLoad = !1, this.clearTimer();
          }, L.switchParams = function(_, T) {
            var h = T == null ? void 0 : T.renditionReports;
            if (h)
              for (var y = 0; y < h.length; y++) {
                var m = h[y], s = void 0;
                try {
                  s = new self.URL(m.URI, T.url).href;
                } catch (g) {
                  C.logger.warn("Could not construct new URL for Rendition Report: " + g), s = m.URI || "";
                }
                if (s === _.slice(-s.length)) {
                  var f = parseInt(m["LAST-MSN"]) || (T == null ? void 0 : T.lastPartSn), a = parseInt(m["LAST-PART"]) || (T == null ? void 0 : T.lastPartIndex);
                  if (this.hls.config.lowLatencyMode) {
                    var i = Math.min(T.age - T.partTarget, T.targetduration);
                    a >= 0 && i > T.partTarget && (a += 1);
                  }
                  return new F.HlsUrlParameters(f, a >= 0 ? a : void 0, F.HlsSkip.No);
                }
              }
          }, L.loadPlaylist = function(_) {
            this.requestScheduled === -1 && (this.requestScheduled = self.performance.now());
          }, L.shouldLoadTrack = function(_) {
            return this.canLoad && _ && !!_.url && (!_.details || _.details.live);
          }, L.playlistLoaded = function(_, T, h) {
            var y = this, m = T.details, s = T.stats, f = self.performance.now(), a = s.loading.first ? Math.max(0, f - s.loading.first) : 0;
            if (m.advancedDateTime = Date.now() - a, m.live || h != null && h.live) {
              if (m.reloaded(h), h && this.log("live playlist " + _ + " " + (m.advanced ? "REFRESHED " + m.lastPartSn + "-" + m.lastPartIndex : "MISSED")), h && m.fragments.length > 0 && (0, A.mergeDetails)(h, m), !this.canLoad || !m.live)
                return;
              var i, g = void 0, o = void 0;
              if (m.canBlockReload && m.endSN && m.advanced) {
                var r = this.hls.config.lowLatencyMode, l = m.lastPartSn, v = m.endSN, u = m.lastPartIndex, n = u !== -1, t = l === v, c = r ? 0 : u;
                n ? (g = t ? v + 1 : l, o = t ? c : u + 1) : g = v + 1;
                var e = m.age, d = e + m.ageHeader, E = Math.min(d - m.partTarget, m.targetduration * 1.5);
                if (E > 0) {
                  if (h && E > h.tuneInGoal)
                    this.warn("CDN Tune-in goal increased from: " + h.tuneInGoal + " to: " + E + " with playlist age: " + m.age), E = 0;
                  else {
                    var p = Math.floor(E / m.targetduration);
                    if (g += p, o !== void 0) {
                      var D = Math.round(E % m.targetduration / m.partTarget);
                      o += D;
                    }
                    this.log("CDN Tune-in age: " + m.ageHeader + "s last advanced " + e.toFixed(2) + "s goal: " + E + " skip sn " + p + " to part " + o);
                  }
                  m.tuneInGoal = E;
                }
                if (i = this.getDeliveryDirectives(m, T.deliveryDirectives, g, o), r || !t) {
                  this.loadPlaylist(i);
                  return;
                }
              } else
                i = this.getDeliveryDirectives(m, T.deliveryDirectives, g, o);
              var R = this.hls.mainForwardBufferInfo, b = R ? R.end - R.len : 0, O = (m.edge - b) * 1e3, M = (0, A.computeReloadInterval)(m, O);
              m.updated ? f > this.requestScheduled + M && (this.requestScheduled = s.loading.start) : this.requestScheduled = -1, g !== void 0 && m.canBlockReload ? this.requestScheduled = s.loading.first + M - (m.partTarget * 1e3 || 1e3) : this.requestScheduled = (this.requestScheduled === -1 ? f : this.requestScheduled) + M;
              var w = this.requestScheduled - f;
              w = Math.max(0, w), this.log("reload live playlist " + _ + " in " + Math.round(w) + " ms"), this.timer = self.setTimeout(function() {
                return y.loadPlaylist(i);
              }, w);
            } else
              this.clearTimer();
          }, L.getDeliveryDirectives = function(_, T, h, y) {
            var m = (0, F.getSkipValue)(_, h);
            return T != null && T.skip && _.deltaUpdateFailed && (h = T.msn, y = T.part, m = F.HlsSkip.No), new F.HlsUrlParameters(h, y, m);
          }, L.retryLoadingOrFail = function(_) {
            var T = this, h = this.hls.config, y = this.retryCount < h.levelLoadingMaxRetry;
            if (y) {
              var m;
              if (this.requestScheduled = -1, this.retryCount++, _.details.indexOf("LoadTimeOut") > -1 && (m = _.context) !== null && m !== void 0 && m.deliveryDirectives)
                this.warn("retry playlist loading #" + this.retryCount + ' after "' + _.details + '"'), this.loadPlaylist();
              else {
                var s = Math.min(Math.pow(2, this.retryCount) * h.levelLoadingRetryDelay, h.levelLoadingMaxRetryTimeout);
                this.timer = self.setTimeout(function() {
                  return T.loadPlaylist();
                }, s), this.warn("retry playlist loading #" + this.retryCount + " in " + s + ' ms after "' + _.details + '"');
              }
            } else
              this.warn('cannot recover from error "' + _.details + '"'), this.clearTimer(), _.fatal = !0;
            return y;
          }, P;
        }();
      },
      "./src/controller/base-stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          State: () => n,
          default: () => t
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/task-loop.ts"), C = S("./src/controller/fragment-tracker.ts"), I = S("./src/utils/buffer-helper.ts"), k = S("./src/utils/logger.ts"), P = S("./src/events.ts"), L = S("./src/errors.ts"), x = S("./src/types/transmuxer.ts"), _ = S("./src/utils/mp4-tools.ts"), T = S("./src/utils/discontinuities.ts"), h = S("./src/controller/fragment-finders.ts"), y = S("./src/controller/level-helper.ts"), m = S("./src/loader/fragment-loader.ts"), s = S("./src/crypt/decrypter.ts"), f = S("./src/utils/time-ranges.ts"), a = S("./src/types/loader.ts");
        function i(c, e) {
          for (var d = 0; d < e.length; d++) {
            var E = e[d];
            E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(c, o(E.key), E);
          }
        }
        function g(c, e, d) {
          return e && i(c.prototype, e), d && i(c, d), Object.defineProperty(c, "prototype", { writable: !1 }), c;
        }
        function o(c) {
          var e = r(c, "string");
          return typeof e == "symbol" ? e : String(e);
        }
        function r(c, e) {
          if (typeof c != "object" || c === null)
            return c;
          var d = c[Symbol.toPrimitive];
          if (d !== void 0) {
            var E = d.call(c, e || "default");
            if (typeof E != "object")
              return E;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(c);
        }
        function l(c) {
          if (c === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return c;
        }
        function v(c, e) {
          c.prototype = Object.create(e.prototype), c.prototype.constructor = c, u(c, e);
        }
        function u(c, e) {
          return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(E, p) {
            return E.__proto__ = p, E;
          }, u(c, e);
        }
        var n = {
          STOPPED: "STOPPED",
          IDLE: "IDLE",
          KEY_LOADING: "KEY_LOADING",
          FRAG_LOADING: "FRAG_LOADING",
          FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
          WAITING_TRACK: "WAITING_TRACK",
          PARSING: "PARSING",
          PARSED: "PARSED",
          ENDED: "ENDED",
          ERROR: "ERROR",
          WAITING_INIT_PTS: "WAITING_INIT_PTS",
          WAITING_LEVEL: "WAITING_LEVEL"
        }, t = /* @__PURE__ */ function(c) {
          v(e, c);
          function e(E, p, D, R) {
            var b;
            return b = c.call(this) || this, b.hls = void 0, b.fragPrevious = null, b.fragCurrent = null, b.fragmentTracker = void 0, b.transmuxer = null, b._state = n.STOPPED, b.media = null, b.mediaBuffer = null, b.config = void 0, b.bitrateTest = !1, b.lastCurrentTime = 0, b.nextLoadPosition = 0, b.startPosition = 0, b.loadedmetadata = !1, b.fragLoadError = 0, b.retryDate = 0, b.levels = null, b.fragmentLoader = void 0, b.keyLoader = void 0, b.levelLastLoaded = null, b.startFragRequested = !1, b.decrypter = void 0, b.initPTS = [], b.onvseeking = null, b.onvended = null, b.logPrefix = "", b.log = void 0, b.warn = void 0, b.logPrefix = R, b.log = k.logger.log.bind(k.logger, R + ":"), b.warn = k.logger.warn.bind(k.logger, R + ":"), b.hls = E, b.fragmentLoader = new m.default(E.config), b.keyLoader = D, b.fragmentTracker = p, b.config = E.config, b.decrypter = new s.default(E.config), E.on(P.Events.LEVEL_SWITCHING, b.onLevelSwitching, l(b)), b;
          }
          var d = e.prototype;
          return d.doTick = function() {
            this.onTickEnd();
          }, d.onTickEnd = function() {
          }, d.startLoad = function(p) {
          }, d.stopLoad = function() {
            this.fragmentLoader.abort(), this.keyLoader.abort();
            var p = this.fragCurrent;
            p && (p.abortRequests(), this.fragmentTracker.removeFragment(p)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = n.STOPPED;
          }, d._streamEnded = function(p, D) {
            if (D.live || p.nextStart || !p.end || !this.media)
              return !1;
            var R = D.partList;
            if (R != null && R.length) {
              var b = R[R.length - 1], O = I.BufferHelper.isBuffered(this.media, b.start + b.duration / 2);
              return O;
            }
            var M = D.fragments[D.fragments.length - 1].type;
            return this.fragmentTracker.isEndListAppended(M);
          }, d.getLevelDetails = function() {
            if (this.levels && this.levelLastLoaded !== null) {
              var p;
              return (p = this.levels[this.levelLastLoaded]) === null || p === void 0 ? void 0 : p.details;
            }
          }, d.onMediaAttached = function(p, D) {
            var R = this.media = this.mediaBuffer = D.media;
            this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), R.addEventListener("seeking", this.onvseeking), R.addEventListener("ended", this.onvended);
            var b = this.config;
            this.levels && b.autoStartLoad && this.state === n.STOPPED && this.startLoad(b.startPosition);
          }, d.onMediaDetaching = function() {
            var p = this.media;
            p != null && p.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), p && this.onvseeking && this.onvended && (p.removeEventListener("seeking", this.onvseeking), p.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.keyLoader && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
          }, d.onMediaSeeking = function() {
            var p = this.config, D = this.fragCurrent, R = this.media, b = this.mediaBuffer, O = this.state, M = R ? R.currentTime : 0, w = I.BufferHelper.bufferInfo(b || R, M, p.maxBufferHole);
            if (this.log("media seeking to " + ((0, F.isFiniteNumber)(M) ? M.toFixed(3) : M) + ", state: " + O), this.state === n.ENDED)
              this.resetLoadingState();
            else if (D) {
              var U = p.maxFragLookUpTolerance, N = D.start - U, K = D.start + D.duration + U;
              if (!w.len || K < w.start || N > w.end) {
                var W = M > K;
                (M < N || W) && (W && D.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), D.abortRequests()), this.resetLoadingState());
              }
            }
            R && (this.lastCurrentTime = M), !this.loadedmetadata && !w.len && (this.nextLoadPosition = this.startPosition = M), this.tickImmediate();
          }, d.onMediaEnded = function() {
            this.startPosition = this.lastCurrentTime = 0;
          }, d.onLevelSwitching = function(p, D) {
            this.fragLoadError = 0;
          }, d.onHandlerDestroying = function() {
            this.stopLoad(), c.prototype.onHandlerDestroying.call(this);
          }, d.onHandlerDestroyed = function() {
            this.state = n.STOPPED, this.hls.off(P.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, c.prototype.onHandlerDestroyed.call(this);
          }, d.loadFragment = function(p, D, R) {
            this._loadFragForPlayback(p, D, R);
          }, d._loadFragForPlayback = function(p, D, R) {
            var b = this, O = function(w) {
              if (b.fragContextChanged(p)) {
                b.warn("Fragment " + p.sn + (w.part ? " p: " + w.part.index : "") + " of level " + p.level + " was dropped during download."), b.fragmentTracker.removeFragment(p);
                return;
              }
              p.stats.chunkCount++, b._handleFragmentLoadProgress(w);
            };
            this._doFragLoad(p, D, R, O).then(function(M) {
              if (!!M) {
                b.fragLoadError = 0;
                var w = b.state;
                if (b.fragContextChanged(p)) {
                  (w === n.FRAG_LOADING || !b.fragCurrent && w === n.PARSING) && (b.fragmentTracker.removeFragment(p), b.state = n.IDLE);
                  return;
                }
                "payload" in M && (b.log("Loaded fragment " + p.sn + " of level " + p.level), b.hls.trigger(P.Events.FRAG_LOADED, M)), b._handleFragmentLoadComplete(M);
              }
            }).catch(function(M) {
              b.state === n.STOPPED || b.state === n.ERROR || (b.warn(M), b.resetFragmentLoading(p));
            });
          }, d.flushMainBuffer = function(p, D, R) {
            if (R === void 0 && (R = null), !!(p - D)) {
              var b = {
                startOffset: p,
                endOffset: D,
                type: R
              };
              this.fragLoadError = 0, this.hls.trigger(P.Events.BUFFER_FLUSHING, b);
            }
          }, d._loadInitSegment = function(p, D) {
            var R = this;
            this._doFragLoad(p, D).then(function(b) {
              if (!b || R.fragContextChanged(p) || !R.levels)
                throw new Error("init load aborted");
              return b;
            }).then(function(b) {
              var O = R.hls, M = b.payload, w = p.decryptdata;
              if (M && M.byteLength > 0 && w && w.key && w.iv && w.method === "AES-128") {
                var U = self.performance.now();
                return R.decrypter.decrypt(new Uint8Array(M), w.key.buffer, w.iv.buffer).then(function(N) {
                  var K = self.performance.now();
                  return O.trigger(P.Events.FRAG_DECRYPTED, {
                    frag: p,
                    payload: N,
                    stats: {
                      tstart: U,
                      tdecrypt: K
                    }
                  }), b.payload = N, b;
                });
              }
              return b;
            }).then(function(b) {
              var O = R.fragCurrent, M = R.hls, w = R.levels;
              if (!w)
                throw new Error("init load aborted, missing levels");
              var U = w[p.level].details;
              console.assert(U, "Level details are defined when init segment is loaded");
              var N = p.stats;
              R.state = n.IDLE, R.fragLoadError = 0, p.data = new Uint8Array(b.payload), N.parsing.start = N.buffering.start = self.performance.now(), N.parsing.end = N.buffering.end = self.performance.now(), b.frag === O && M.trigger(P.Events.FRAG_BUFFERED, {
                stats: N,
                frag: O,
                part: null,
                id: p.type
              }), R.tick();
            }).catch(function(b) {
              R.state === n.STOPPED || R.state === n.ERROR || (R.warn(b), R.resetFragmentLoading(p));
            });
          }, d.fragContextChanged = function(p) {
            var D = this.fragCurrent;
            return !p || !D || p.level !== D.level || p.sn !== D.sn || p.urlId !== D.urlId;
          }, d.fragBufferedComplete = function(p, D) {
            var R, b, O = this.mediaBuffer ? this.mediaBuffer : this.media;
            this.log("Buffered " + p.type + " sn: " + p.sn + (D ? " part: " + D.index : "") + " of " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + p.level + " " + (O ? f.default.toString(I.BufferHelper.getBuffered(O)) : "(detached)")), this.state = n.IDLE, O && (!this.loadedmetadata && p.type == a.PlaylistLevelType.MAIN && O.buffered.length && ((R = this.fragCurrent) === null || R === void 0 ? void 0 : R.sn) === ((b = this.fragPrevious) === null || b === void 0 ? void 0 : b.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick());
          }, d.seekToStartPos = function() {
          }, d._handleFragmentLoadComplete = function(p) {
            var D = this.transmuxer;
            if (!!D) {
              var R = p.frag, b = p.part, O = p.partsLoaded, M = !O || O.length === 0 || O.some(function(U) {
                return !U;
              }), w = new x.ChunkMetadata(R.level, R.sn, R.stats.chunkCount + 1, 0, b ? b.index : -1, !M);
              D.flush(w);
            }
          }, d._handleFragmentLoadProgress = function(p) {
          }, d._doFragLoad = function(p, D, R, b) {
            var O, M = this;
            if (R === void 0 && (R = null), !this.levels)
              throw new Error("frag load aborted, missing levels");
            var w = null;
            if (p.encrypted && !((O = p.decryptdata) !== null && O !== void 0 && O.key) ? (this.log("Loading key for " + p.sn + " of [" + D.startSN + "-" + D.endSN + "], " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + p.level), this.state = n.KEY_LOADING, this.fragCurrent = p, w = this.keyLoader.load(p).then(function(G) {
              if (!M.fragContextChanged(G.frag))
                return M.hls.trigger(P.Events.KEY_LOADED, G), G;
            }), this.hls.trigger(P.Events.KEY_LOADING, {
              frag: p
            }), this.throwIfFragContextChanged("KEY_LOADING")) : !p.encrypted && D.encryptedFragments.length && this.keyLoader.loadClear(p, D.encryptedFragments), R = Math.max(p.start, R || 0), this.config.lowLatencyMode && D) {
              var U = D.partList;
              if (U && b) {
                R > p.end && D.fragmentHint && (p = D.fragmentHint);
                var N = this.getNextPart(U, p, R);
                if (N > -1) {
                  var K = U[N];
                  return this.log("Loading part sn: " + p.sn + " p: " + K.index + " cc: " + p.cc + " of playlist [" + D.startSN + "-" + D.endSN + "] parts [0-" + N + "-" + (U.length - 1) + "] " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + p.level + ", target: " + parseFloat(R.toFixed(3))), this.nextLoadPosition = K.start + K.duration, this.state = n.FRAG_LOADING, this.hls.trigger(P.Events.FRAG_LOADING, {
                    frag: p,
                    part: U[N],
                    targetBufferTime: R
                  }), this.throwIfFragContextChanged("FRAG_LOADING parts"), w ? w.then(function(G) {
                    return !G || M.fragContextChanged(G.frag) ? null : M.doFragPartsLoad(p, U, N, b);
                  }).catch(function(G) {
                    return M.handleFragLoadError(G);
                  }) : this.doFragPartsLoad(p, U, N, b).catch(function(G) {
                    return M.handleFragLoadError(G);
                  });
                } else if (!p.url || this.loadedEndOfParts(U, R))
                  return Promise.resolve(null);
              }
            }
            this.log("Loading fragment " + p.sn + " cc: " + p.cc + " " + (D ? "of [" + D.startSN + "-" + D.endSN + "] " : "") + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + p.level + ", target: " + parseFloat(R.toFixed(3))), (0, F.isFiniteNumber)(p.sn) && !this.bitrateTest && (this.nextLoadPosition = p.start + p.duration), this.state = n.FRAG_LOADING, this.hls.trigger(P.Events.FRAG_LOADING, {
              frag: p,
              targetBufferTime: R
            }), this.throwIfFragContextChanged("FRAG_LOADING");
            var W = this.config.progressive;
            return W && w ? w.then(function(G) {
              return !G || M.fragContextChanged(G == null ? void 0 : G.frag) ? null : M.fragmentLoader.load(p, b);
            }).catch(function(G) {
              return M.handleFragLoadError(G);
            }) : Promise.all([this.fragmentLoader.load(p, W ? b : void 0), w]).then(function(G) {
              var j = G[0];
              return !W && j && b && b(j), j;
            }).catch(function(G) {
              return M.handleFragLoadError(G);
            });
          }, d.throwIfFragContextChanged = function(p) {
            if (this.fragCurrent === null)
              throw new Error("frag load aborted, context changed in " + p);
          }, d.doFragPartsLoad = function(p, D, R, b) {
            var O = this;
            return new Promise(function(M, w) {
              var U = [], N = function K(W) {
                var G = D[W];
                O.fragmentLoader.loadPart(p, G, b).then(function(j) {
                  U[G.index] = j;
                  var H = j.part;
                  O.hls.trigger(P.Events.FRAG_LOADED, j);
                  var X = D[W + 1];
                  if (X && X.fragment === p)
                    K(W + 1);
                  else
                    return M({
                      frag: p,
                      part: H,
                      partsLoaded: U
                    });
                }).catch(w);
              };
              N(R);
            });
          }, d.handleFragLoadError = function(p) {
            if ("data" in p) {
              var D = p.data;
              p.data && D.details === L.ErrorDetails.INTERNAL_ABORTED ? this.handleFragLoadAborted(D.frag, D.part) : this.hls.trigger(P.Events.ERROR, D);
            } else
              this.hls.trigger(P.Events.ERROR, {
                type: L.ErrorTypes.OTHER_ERROR,
                details: L.ErrorDetails.INTERNAL_EXCEPTION,
                err: p,
                fatal: !0
              });
            return null;
          }, d._handleTransmuxerFlush = function(p) {
            var D = this.getCurrentContext(p);
            if (!D || this.state !== n.PARSING) {
              !this.fragCurrent && this.state !== n.STOPPED && this.state !== n.ERROR && (this.state = n.IDLE);
              return;
            }
            var R = D.frag, b = D.part, O = D.level, M = self.performance.now();
            R.stats.parsing.end = M, b && (b.stats.parsing.end = M), this.updateLevelTiming(R, b, O, p.partial);
          }, d.getCurrentContext = function(p) {
            var D = this.levels, R = p.level, b = p.sn, O = p.part;
            if (!D || !D[R])
              return this.warn("Levels object was unset while buffering fragment " + b + " of level " + R + ". The current chunk will not be buffered."), null;
            var M = D[R], w = O > -1 ? (0, y.getPartWith)(M, b, O) : null, U = w ? w.fragment : (0, y.getFragmentWithSN)(M, b, this.fragCurrent);
            return U ? {
              frag: U,
              part: w,
              level: M
            } : null;
          }, d.bufferFragmentData = function(p, D, R, b) {
            if (!(!p || this.state !== n.PARSING)) {
              var O = p.data1, M = p.data2, w = O;
              if (O && M && (w = (0, _.appendUint8Array)(O, M)), !(!w || !w.length)) {
                var U = {
                  type: p.type,
                  frag: D,
                  part: R,
                  chunkMeta: b,
                  parent: D.type,
                  data: w
                };
                this.hls.trigger(P.Events.BUFFER_APPENDING, U), p.dropped && p.independent && !R && this.flushBufferGap(D);
              }
            }
          }, d.flushBufferGap = function(p) {
            var D = this.media;
            if (!!D) {
              if (!I.BufferHelper.isBuffered(D, D.currentTime)) {
                this.flushMainBuffer(0, p.start);
                return;
              }
              var R = D.currentTime, b = I.BufferHelper.bufferInfo(D, R, 0), O = p.duration, M = Math.min(this.config.maxFragLookUpTolerance * 2, O * 0.25), w = Math.max(Math.min(p.start - M, b.end - M), R + M);
              p.start - w > M && this.flushMainBuffer(w, p.start);
            }
          }, d.getFwdBufferInfo = function(p, D) {
            var R = this.config, b = this.getLoadPosition();
            if (!(0, F.isFiniteNumber)(b))
              return null;
            var O = I.BufferHelper.bufferInfo(p, b, R.maxBufferHole);
            if (O.len === 0 && O.nextStart !== void 0) {
              var M = this.fragmentTracker.getBufferedFrag(b, D);
              if (M && O.nextStart < M.end)
                return I.BufferHelper.bufferInfo(p, b, Math.max(O.nextStart, R.maxBufferHole));
            }
            return O;
          }, d.getMaxBufferLength = function(p) {
            var D = this.config, R;
            return p ? R = Math.max(8 * D.maxBufferSize / p, D.maxBufferLength) : R = D.maxBufferLength, Math.min(R, D.maxMaxBufferLength);
          }, d.reduceMaxBufferLength = function(p) {
            var D = this.config, R = p || D.maxBufferLength;
            return D.maxMaxBufferLength >= R ? (D.maxMaxBufferLength /= 2, this.warn("Reduce max buffer length to " + D.maxMaxBufferLength + "s"), !0) : !1;
          }, d.getNextFragment = function(p, D) {
            var R = D.fragments, b = R.length;
            if (!b)
              return null;
            var O = this.config, M = R[0].start, w;
            if (D.live) {
              var U = O.initialLiveManifestSize;
              if (b < U)
                return this.warn("Not enough fragments to start playback (have: " + b + ", need: " + U + ")"), null;
              !D.PTSKnown && !this.startFragRequested && this.startPosition === -1 && (w = this.getInitialLiveFragment(D, R), this.startPosition = w ? this.hls.liveSyncPosition || w.start : p);
            } else
              p <= M && (w = R[0]);
            if (!w) {
              var N = O.lowLatencyMode ? D.partEnd : D.fragmentEnd;
              w = this.getFragmentAtPosition(p, N, D);
            }
            return this.mapToInitFragWhenRequired(w);
          }, d.mapToInitFragWhenRequired = function(p) {
            return p != null && p.initSegment && !(p != null && p.initSegment.data) && !this.bitrateTest ? p.initSegment : p;
          }, d.getNextPart = function(p, D, R) {
            for (var b = -1, O = !1, M = !0, w = 0, U = p.length; w < U; w++) {
              var N = p[w];
              if (M = M && !N.independent, b > -1 && R < N.start)
                break;
              var K = N.loaded;
              K ? b = -1 : (O || N.independent || M) && N.fragment === D && (b = w), O = K;
            }
            return b;
          }, d.loadedEndOfParts = function(p, D) {
            var R = p[p.length - 1];
            return R && D > R.start && R.loaded;
          }, d.getInitialLiveFragment = function(p, D) {
            var R = this.fragPrevious, b = null;
            if (R) {
              if (p.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + R.programDateTime), b = (0, h.findFragmentByPDT)(D, R.endProgramDateTime, this.config.maxFragLookUpTolerance)), !b) {
                var O = R.sn + 1;
                if (O >= p.startSN && O <= p.endSN) {
                  var M = D[O - p.startSN];
                  R.cc === M.cc && (b = M, this.log("Live playlist, switching playlist, load frag with next SN: " + b.sn));
                }
                b || (b = (0, h.findFragWithCC)(D, R.cc), b && this.log("Live playlist, switching playlist, load frag with same CC: " + b.sn));
              }
            } else {
              var w = this.hls.liveSyncPosition;
              w !== null && (b = this.getFragmentAtPosition(w, this.bitrateTest ? p.fragmentEnd : p.edge, p));
            }
            return b;
          }, d.getFragmentAtPosition = function(p, D, R) {
            var b = this.config, O = this.fragPrevious, M = R.fragments, w = R.endSN, U = R.fragmentHint, N = b.maxFragLookUpTolerance, K = !!(b.lowLatencyMode && R.partList && U);
            K && U && !this.bitrateTest && (M = M.concat(U), w = U.sn);
            var W;
            if (p < D) {
              var G = p > D - N ? 0 : N;
              W = (0, h.findFragmentByPTS)(O, M, p, G);
            } else
              W = M[M.length - 1];
            if (W) {
              var j = W.sn - R.startSN;
              if (this.fragmentTracker.getState(W) === C.FragmentState.OK && (O = W), O && W.sn === O.sn && !K) {
                var H = O && W.level === O.level;
                if (H) {
                  var X = M[j + 1];
                  W.sn < w && this.fragmentTracker.getState(X) !== C.FragmentState.OK ? (this.log("SN " + W.sn + " just loaded, load next one: " + X.sn), W = X) : W = null;
                }
              }
            }
            return W;
          }, d.synchronizeToLiveEdge = function(p) {
            var D = this.config, R = this.media;
            if (!!R) {
              var b = this.hls.liveSyncPosition, O = R.currentTime, M = p.fragments[0].start, w = p.edge, U = O >= M - D.maxFragLookUpTolerance && O <= w;
              if (b !== null && R.duration > b && (O < b || !U)) {
                var N = D.liveMaxLatencyDuration !== void 0 ? D.liveMaxLatencyDuration : D.liveMaxLatencyDurationCount * p.targetduration;
                (!U && R.readyState < 4 || O < w - N) && (this.loadedmetadata || (this.nextLoadPosition = b), R.readyState && (this.warn("Playback: " + O.toFixed(3) + " is located too far from the end of live sliding playlist: " + w + ", reset currentTime to : " + b.toFixed(3)), R.currentTime = b));
              }
            }
          }, d.alignPlaylists = function(p, D) {
            var R = this.levels, b = this.levelLastLoaded, O = this.fragPrevious, M = b !== null ? R[b] : null, w = p.fragments.length;
            if (!w)
              return this.warn("No fragments in live playlist"), 0;
            var U = p.fragments[0].start, N = !D, K = p.alignedSliding && (0, F.isFiniteNumber)(U);
            if (N || !K && !U) {
              (0, T.alignStream)(O, M, p);
              var W = p.fragments[0].start;
              return this.log("Live playlist sliding: " + W.toFixed(2) + " start-sn: " + (D ? D.startSN : "na") + "->" + p.startSN + " prev-sn: " + (O ? O.sn : "na") + " fragments: " + w), W;
            }
            return U;
          }, d.waitForCdnTuneIn = function(p) {
            var D = 3;
            return p.live && p.canBlockReload && p.partTarget && p.tuneInGoal > Math.max(p.partHoldBack, p.partTarget * D);
          }, d.setStartPosition = function(p, D) {
            var R = this.startPosition;
            if (R < D && (R = -1), R === -1 || this.lastCurrentTime === -1) {
              var b = p.startTimeOffset;
              (0, F.isFiniteNumber)(b) ? (R = D + b, b < 0 && (R += p.totalduration), R = Math.min(Math.max(D, R), D + p.totalduration), this.log("Start time offset " + b + " found in playlist, adjust startPosition to " + R), this.startPosition = R) : p.live ? R = this.hls.liveSyncPosition || D : this.startPosition = R = 0, this.lastCurrentTime = R;
            }
            this.nextLoadPosition = R;
          }, d.getLoadPosition = function() {
            var p = this.media, D = 0;
            return this.loadedmetadata && p ? D = p.currentTime : this.nextLoadPosition && (D = this.nextLoadPosition), D;
          }, d.handleFragLoadAborted = function(p, D) {
            this.transmuxer && p.sn !== "initSegment" && p.stats.aborted && (this.warn("Fragment " + p.sn + (D ? " part" + D.index : "") + " of level " + p.level + " was aborted"), this.resetFragmentLoading(p));
          }, d.resetFragmentLoading = function(p) {
            (!this.fragCurrent || !this.fragContextChanged(p) && this.state !== n.FRAG_LOADING_WAITING_RETRY) && (this.state = n.IDLE);
          }, d.onFragmentOrKeyLoadError = function(p, D) {
            if (D.fatal) {
              this.stopLoad(), this.state = n.ERROR;
              return;
            }
            var R = this.config;
            if (D.chunkMeta) {
              var b = this.getCurrentContext(D.chunkMeta);
              b && (D.frag = b.frag, D.levelRetry = !0, this.fragLoadError = R.fragLoadingMaxRetry);
            }
            var O = D.frag;
            if (!(!O || O.type !== p)) {
              var M = this.fragCurrent;
              if (console.assert(M && O.sn === M.sn && O.level === M.level && O.urlId === M.urlId, "Frag load error must match current frag to retry"), this.fragLoadError + 1 <= R.fragLoadingMaxRetry) {
                this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition);
                var w = Math.min(Math.pow(2, this.fragLoadError) * R.fragLoadingRetryDelay, R.fragLoadingMaxRetryTimeout);
                this.warn("Fragment " + O.sn + " of " + p + " " + O.level + " failed to load, retrying in " + w + "ms"), this.retryDate = self.performance.now() + w, this.fragLoadError++, this.state = n.FRAG_LOADING_WAITING_RETRY;
              } else
                D.levelRetry ? (p === a.PlaylistLevelType.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = n.IDLE) : (k.logger.error(D.details + " reaches max retry, redispatch as fatal ..."), D.fatal = !0, this.hls.stopLoad(), this.state = n.ERROR);
            }
          }, d.afterBufferFlushed = function(p, D, R) {
            if (!!p) {
              var b = I.BufferHelper.getBuffered(p);
              this.fragmentTracker.detectEvictedFragments(D, b, R), this.state === n.ENDED && this.resetLoadingState();
            }
          }, d.resetLoadingState = function() {
            this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state = n.IDLE;
          }, d.resetStartWhenNotLoaded = function(p) {
            if (!this.loadedmetadata) {
              this.startFragRequested = !1;
              var D = this.levels ? this.levels[p].details : null;
              D != null && D.live ? (this.startPosition = -1, this.setStartPosition(D, 0), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition;
            }
          }, d.updateLevelTiming = function(p, D, R, b) {
            var O = this, M = R.details;
            console.assert(!!M, "level.details must be defined");
            var w = Object.keys(p.elementaryStreams).reduce(function(U, N) {
              var K = p.elementaryStreams[N];
              if (K) {
                var W = K.endPTS - K.startPTS;
                if (W <= 0)
                  return O.warn("Could not parse fragment " + p.sn + " " + N + " duration reliably (" + W + ")"), U || !1;
                var G = b ? 0 : (0, y.updateFragPTSDTS)(M, p, K.startPTS, K.endPTS, K.startDTS, K.endDTS);
                return O.hls.trigger(P.Events.LEVEL_PTS_UPDATED, {
                  details: M,
                  level: R,
                  drift: G,
                  type: N,
                  frag: p,
                  start: K.startPTS,
                  end: K.endPTS
                }), !0;
              }
              return U;
            }, !1);
            w || (this.warn("Found no media in fragment " + p.sn + " of level " + R.id + " resetting transmuxer to fallback to playlist timing"), this.resetTransmuxer()), this.state = n.PARSED, this.hls.trigger(P.Events.FRAG_PARSED, {
              frag: p,
              part: D
            });
          }, d.resetTransmuxer = function() {
            this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null);
          }, g(e, [{
            key: "state",
            get: function() {
              return this._state;
            },
            set: function(p) {
              var D = this._state;
              D !== p && (this._state = p, this.log(D + "->" + p));
            }
          }]), e;
        }(A.default);
      },
      "./src/controller/buffer-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => h
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts"), I = S("./src/errors.ts"), k = S("./src/utils/buffer-helper.ts"), P = S("./src/utils/mediasource-helper.ts"), L = S("./src/loader/fragment.ts"), x = S("./src/controller/buffer-operation-queue.ts"), _ = (0, P.getMediaSource)(), T = /([ha]vc.)(?:\.[^.,]+)+/, h = /* @__PURE__ */ function() {
          function y(s) {
            var f = this;
            this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function() {
              var a = f.hls, i = f.media, g = f.mediaSource;
              C.logger.log("[buffer-controller]: Media source opened"), i && (f.updateMediaElementDuration(), a.trigger(A.Events.MEDIA_ATTACHED, {
                media: i
              })), g && g.removeEventListener("sourceopen", f._onMediaSourceOpen), f.checkPendingTracks();
            }, this._onMediaSourceClose = function() {
              C.logger.log("[buffer-controller]: Media source closed");
            }, this._onMediaSourceEnded = function() {
              C.logger.log("[buffer-controller]: Media source ended");
            }, this.hls = s, this._initSourceBuffer(), this.registerListeners();
          }
          var m = y.prototype;
          return m.hasSourceTypes = function() {
            return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
          }, m.destroy = function() {
            this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = null;
          }, m.registerListeners = function() {
            var f = this.hls;
            f.on(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), f.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), f.on(A.Events.MANIFEST_PARSED, this.onManifestParsed, this), f.on(A.Events.BUFFER_RESET, this.onBufferReset, this), f.on(A.Events.BUFFER_APPENDING, this.onBufferAppending, this), f.on(A.Events.BUFFER_CODECS, this.onBufferCodecs, this), f.on(A.Events.BUFFER_EOS, this.onBufferEos, this), f.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), f.on(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this), f.on(A.Events.FRAG_PARSED, this.onFragParsed, this), f.on(A.Events.FRAG_CHANGED, this.onFragChanged, this);
          }, m.unregisterListeners = function() {
            var f = this.hls;
            f.off(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), f.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), f.off(A.Events.MANIFEST_PARSED, this.onManifestParsed, this), f.off(A.Events.BUFFER_RESET, this.onBufferReset, this), f.off(A.Events.BUFFER_APPENDING, this.onBufferAppending, this), f.off(A.Events.BUFFER_CODECS, this.onBufferCodecs, this), f.off(A.Events.BUFFER_EOS, this.onBufferEos, this), f.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), f.off(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this), f.off(A.Events.FRAG_PARSED, this.onFragParsed, this), f.off(A.Events.FRAG_CHANGED, this.onFragChanged, this);
          }, m._initSourceBuffer = function() {
            this.sourceBuffer = {}, this.operationQueue = new x.default(this.sourceBuffer), this.listeners = {
              audio: [],
              video: [],
              audiovideo: []
            }, this.lastMpegAudioChunk = null;
          }, m.onManifestParsed = function(f, a) {
            var i = 2;
            (a.audio && !a.video || !a.altAudio) && (i = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = i, this.details = null, C.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
          }, m.onMediaAttaching = function(f, a) {
            var i = this.media = a.media;
            if (i && _) {
              var g = this.mediaSource = new _();
              g.addEventListener("sourceopen", this._onMediaSourceOpen), g.addEventListener("sourceended", this._onMediaSourceEnded), g.addEventListener("sourceclose", this._onMediaSourceClose), i.src = self.URL.createObjectURL(g), this._objectUrl = i.src;
            }
          }, m.onMediaDetaching = function() {
            var f = this.media, a = this.mediaSource, i = this._objectUrl;
            if (a) {
              if (C.logger.log("[buffer-controller]: media source detaching"), a.readyState === "open")
                try {
                  a.endOfStream();
                } catch (g) {
                  C.logger.warn("[buffer-controller]: onMediaDetaching: " + g.message + " while calling endOfStream");
                }
              this.onBufferReset(), a.removeEventListener("sourceopen", this._onMediaSourceOpen), a.removeEventListener("sourceended", this._onMediaSourceEnded), a.removeEventListener("sourceclose", this._onMediaSourceClose), f && (i && self.URL.revokeObjectURL(i), f.src === i ? (f.removeAttribute("src"), f.load()) : C.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
            }
            this.hls.trigger(A.Events.MEDIA_DETACHED, void 0);
          }, m.onBufferReset = function() {
            var f = this;
            this.getSourceBufferTypes().forEach(function(a) {
              var i = f.sourceBuffer[a];
              try {
                i && (f.removeBufferListeners(a), f.mediaSource && f.mediaSource.removeSourceBuffer(i), f.sourceBuffer[a] = void 0);
              } catch (g) {
                C.logger.warn("[buffer-controller]: Failed to reset the " + a + " buffer", g);
              }
            }), this._initSourceBuffer();
          }, m.onBufferCodecs = function(f, a) {
            var i = this, g = this.getSourceBufferTypes().length;
            Object.keys(a).forEach(function(o) {
              if (g) {
                var r = i.tracks[o];
                if (r && typeof r.buffer.changeType == "function") {
                  var l = a[o], v = l.id, u = l.codec, n = l.levelCodec, t = l.container, c = l.metadata, e = (r.levelCodec || r.codec).replace(T, "$1"), d = (n || u).replace(T, "$1");
                  if (e !== d) {
                    var E = t + ";codecs=" + (n || u);
                    i.appendChangeType(o, E), C.logger.log("[buffer-controller]: switching codec " + e + " to " + d), i.tracks[o] = {
                      buffer: r.buffer,
                      codec: u,
                      container: t,
                      levelCodec: n,
                      metadata: c,
                      id: v
                    };
                  }
                }
              } else
                i.pendingTracks[o] = a[o];
            }), !g && (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks());
          }, m.appendChangeType = function(f, a) {
            var i = this, g = this.operationQueue, o = {
              execute: function() {
                var l = i.sourceBuffer[f];
                l && (C.logger.log("[buffer-controller]: changing " + f + " sourceBuffer type to " + a), l.changeType(a)), g.shiftAndExecuteNext(f);
              },
              onStart: function() {
              },
              onComplete: function() {
              },
              onError: function(l) {
                C.logger.warn("[buffer-controller]: Failed to change " + f + " SourceBuffer type", l);
              }
            };
            g.append(o, f);
          }, m.onBufferAppending = function(f, a) {
            var i = this, g = this.hls, o = this.operationQueue, r = this.tracks, l = a.data, v = a.type, u = a.frag, n = a.part, t = a.chunkMeta, c = t.buffering[v], e = self.performance.now();
            c.start = e;
            var d = u.stats.buffering, E = n ? n.stats.buffering : null;
            d.start === 0 && (d.start = e), E && E.start === 0 && (E.start = e);
            var p = r.audio, D = !1;
            v === "audio" && (p == null ? void 0 : p.container) === "audio/mpeg" && (D = !this.lastMpegAudioChunk || t.id === 1 || this.lastMpegAudioChunk.sn !== t.sn, this.lastMpegAudioChunk = t);
            var R = u.start, b = {
              execute: function() {
                if (c.executeStart = self.performance.now(), D) {
                  var M = i.sourceBuffer[v];
                  if (M) {
                    var w = R - M.timestampOffset;
                    Math.abs(w) >= 0.1 && (C.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + R + " (delta: " + w + ") sn: " + u.sn + ")"), M.timestampOffset = R);
                  }
                }
                i.appendExecutor(l, v);
              },
              onStart: function() {
              },
              onComplete: function() {
                var M = self.performance.now();
                c.executeEnd = c.end = M, d.first === 0 && (d.first = M), E && E.first === 0 && (E.first = M);
                var w = i.sourceBuffer, U = {};
                for (var N in w)
                  U[N] = k.BufferHelper.getBuffered(w[N]);
                i.appendError = 0, i.hls.trigger(A.Events.BUFFER_APPENDED, {
                  type: v,
                  frag: u,
                  part: n,
                  chunkMeta: t,
                  parent: u.type,
                  timeRanges: U
                });
              },
              onError: function(M) {
                C.logger.error("[buffer-controller]: Error encountered while trying to append to the " + v + " SourceBuffer", M);
                var w = {
                  type: I.ErrorTypes.MEDIA_ERROR,
                  parent: u.type,
                  details: I.ErrorDetails.BUFFER_APPEND_ERROR,
                  err: M,
                  fatal: !1
                };
                M.code === DOMException.QUOTA_EXCEEDED_ERR ? w.details = I.ErrorDetails.BUFFER_FULL_ERROR : (i.appendError++, w.details = I.ErrorDetails.BUFFER_APPEND_ERROR, i.appendError > g.config.appendErrorMaxRetry && (C.logger.error("[buffer-controller]: Failed " + g.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), w.fatal = !0, g.stopLoad())), g.trigger(A.Events.ERROR, w);
              }
            };
            o.append(b, v);
          }, m.onBufferFlushing = function(f, a) {
            var i = this, g = this.operationQueue, o = function(l) {
              return {
                execute: i.removeExecutor.bind(i, l, a.startOffset, a.endOffset),
                onStart: function() {
                },
                onComplete: function() {
                  i.hls.trigger(A.Events.BUFFER_FLUSHED, {
                    type: l
                  });
                },
                onError: function(u) {
                  C.logger.warn("[buffer-controller]: Failed to remove from " + l + " SourceBuffer", u);
                }
              };
            };
            a.type ? g.append(o(a.type), a.type) : this.getSourceBufferTypes().forEach(function(r) {
              g.append(o(r), r);
            });
          }, m.onFragParsed = function(f, a) {
            var i = this, g = a.frag, o = a.part, r = [], l = o ? o.elementaryStreams : g.elementaryStreams;
            l[L.ElementaryStreamTypes.AUDIOVIDEO] ? r.push("audiovideo") : (l[L.ElementaryStreamTypes.AUDIO] && r.push("audio"), l[L.ElementaryStreamTypes.VIDEO] && r.push("video"));
            var v = function() {
              var n = self.performance.now();
              g.stats.buffering.end = n, o && (o.stats.buffering.end = n);
              var t = o ? o.stats : g.stats;
              i.hls.trigger(A.Events.FRAG_BUFFERED, {
                frag: g,
                part: o,
                stats: t,
                id: g.type
              });
            };
            r.length === 0 && C.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + g.type + " level: " + g.level + " sn: " + g.sn), this.blockBuffers(v, r);
          }, m.onFragChanged = function(f, a) {
            this.flushBackBuffer();
          }, m.onBufferEos = function(f, a) {
            var i = this, g = this.getSourceBufferTypes().reduce(function(o, r) {
              var l = i.sourceBuffer[r];
              return l && (!a.type || a.type === r) && (l.ending = !0, l.ended || (l.ended = !0, C.logger.log("[buffer-controller]: " + r + " sourceBuffer now EOS"))), o && !!(!l || l.ended);
            }, !0);
            g && (C.logger.log("[buffer-controller]: Queueing mediaSource.endOfStream()"), this.blockBuffers(function() {
              i.getSourceBufferTypes().forEach(function(r) {
                var l = i.sourceBuffer[r];
                l && (l.ending = !1);
              });
              var o = i.mediaSource;
              if (!o || o.readyState !== "open") {
                o && C.logger.info("[buffer-controller]: Could not call mediaSource.endOfStream(). mediaSource.readyState: " + o.readyState);
                return;
              }
              C.logger.log("[buffer-controller]: Calling mediaSource.endOfStream()"), o.endOfStream();
            }));
          }, m.onLevelUpdated = function(f, a) {
            var i = a.details;
            !i.fragments.length || (this.details = i, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration());
          }, m.flushBackBuffer = function() {
            var f = this.hls, a = this.details, i = this.media, g = this.sourceBuffer;
            if (!(!i || a === null)) {
              var o = this.getSourceBufferTypes();
              if (!!o.length) {
                var r = a.live && f.config.liveBackBufferLength !== null ? f.config.liveBackBufferLength : f.config.backBufferLength;
                if (!(!(0, F.isFiniteNumber)(r) || r < 0)) {
                  var l = i.currentTime, v = a.levelTargetDuration, u = Math.max(r, v), n = Math.floor(l / v) * v - u;
                  o.forEach(function(t) {
                    var c = g[t];
                    if (c) {
                      var e = k.BufferHelper.getBuffered(c);
                      if (e.length > 0 && n > e.start(0)) {
                        if (f.trigger(A.Events.BACK_BUFFER_REACHED, {
                          bufferEnd: n
                        }), a.live)
                          f.trigger(A.Events.LIVE_BACK_BUFFER_REACHED, {
                            bufferEnd: n
                          });
                        else if (c.ended && e.end(e.length - 1) - l < v * 2) {
                          C.logger.info("[buffer-controller]: Cannot flush " + t + " back buffer while SourceBuffer is in ended state");
                          return;
                        }
                        f.trigger(A.Events.BUFFER_FLUSHING, {
                          startOffset: 0,
                          endOffset: n,
                          type: t
                        });
                      }
                    }
                  });
                }
              }
            }
          }, m.updateMediaElementDuration = function() {
            if (!(!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== "open")) {
              var f = this.details, a = this.hls, i = this.media, g = this.mediaSource, o = f.fragments[0].start + f.totalduration, r = i.duration, l = (0, F.isFiniteNumber)(g.duration) ? g.duration : 0;
              f.live && a.config.liveDurationInfinity ? (C.logger.log("[buffer-controller]: Media Source duration is set to Infinity"), g.duration = 1 / 0, this.updateSeekableRange(f)) : (o > l && o > r || !(0, F.isFiniteNumber)(r)) && (C.logger.log("[buffer-controller]: Updating Media Source duration to " + o.toFixed(3)), g.duration = o);
            }
          }, m.updateSeekableRange = function(f) {
            var a = this.mediaSource, i = f.fragments, g = i.length;
            if (g && f.live && a !== null && a !== void 0 && a.setLiveSeekableRange) {
              var o = Math.max(0, i[0].start), r = Math.max(o, o + f.totalduration);
              a.setLiveSeekableRange(o, r);
            }
          }, m.checkPendingTracks = function() {
            var f = this.bufferCodecEventsExpected, a = this.operationQueue, i = this.pendingTracks, g = Object.keys(i).length;
            if (g && !f || g === 2) {
              this.createSourceBuffers(i), this.pendingTracks = {};
              var o = this.getSourceBufferTypes();
              if (o.length === 0) {
                this.hls.trigger(A.Events.ERROR, {
                  type: I.ErrorTypes.MEDIA_ERROR,
                  details: I.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                  fatal: !0,
                  reason: "could not create source buffer for media codec(s)"
                });
                return;
              }
              o.forEach(function(r) {
                a.executeNext(r);
              });
            }
          }, m.createSourceBuffers = function(f) {
            var a = this.sourceBuffer, i = this.mediaSource;
            if (!i)
              throw Error("createSourceBuffers called when mediaSource was null");
            var g = 0;
            for (var o in f)
              if (!a[o]) {
                var r = f[o];
                if (!r)
                  throw Error("source buffer exists for track " + o + ", however track does not");
                var l = r.levelCodec || r.codec, v = r.container + ";codecs=" + l;
                C.logger.log("[buffer-controller]: creating sourceBuffer(" + v + ")");
                try {
                  var u = a[o] = i.addSourceBuffer(v), n = o;
                  this.addBufferListener(n, "updatestart", this._onSBUpdateStart), this.addBufferListener(n, "updateend", this._onSBUpdateEnd), this.addBufferListener(n, "error", this._onSBUpdateError), this.tracks[o] = {
                    buffer: u,
                    codec: l,
                    container: r.container,
                    levelCodec: r.levelCodec,
                    metadata: r.metadata,
                    id: r.id
                  }, g++;
                } catch (t) {
                  C.logger.error("[buffer-controller]: error while trying to add sourceBuffer: " + t.message), this.hls.trigger(A.Events.ERROR, {
                    type: I.ErrorTypes.MEDIA_ERROR,
                    details: I.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                    fatal: !1,
                    error: t,
                    mimeType: v
                  });
                }
              }
            g && this.hls.trigger(A.Events.BUFFER_CREATED, {
              tracks: this.tracks
            });
          }, m._onSBUpdateStart = function(f) {
            var a = this.operationQueue, i = a.current(f);
            i.onStart();
          }, m._onSBUpdateEnd = function(f) {
            var a = this.operationQueue, i = a.current(f);
            i.onComplete(), a.shiftAndExecuteNext(f);
          }, m._onSBUpdateError = function(f, a) {
            C.logger.error("[buffer-controller]: " + f + " SourceBuffer error", a), this.hls.trigger(A.Events.ERROR, {
              type: I.ErrorTypes.MEDIA_ERROR,
              details: I.ErrorDetails.BUFFER_APPENDING_ERROR,
              fatal: !1
            });
            var i = this.operationQueue.current(f);
            i && i.onError(a);
          }, m.removeExecutor = function(f, a, i) {
            var g = this.media, o = this.mediaSource, r = this.operationQueue, l = this.sourceBuffer, v = l[f];
            if (!g || !o || !v) {
              C.logger.warn("[buffer-controller]: Attempting to remove from the " + f + " SourceBuffer, but it does not exist"), r.shiftAndExecuteNext(f);
              return;
            }
            var u = (0, F.isFiniteNumber)(g.duration) ? g.duration : 1 / 0, n = (0, F.isFiniteNumber)(o.duration) ? o.duration : 1 / 0, t = Math.max(0, a), c = Math.min(i, u, n);
            c > t && !v.ending ? (v.ended = !1, C.logger.log("[buffer-controller]: Removing [" + t + "," + c + "] from the " + f + " SourceBuffer"), console.assert(!v.updating, f + " sourceBuffer must not be updating"), v.remove(t, c)) : r.shiftAndExecuteNext(f);
          }, m.appendExecutor = function(f, a) {
            var i = this.operationQueue, g = this.sourceBuffer, o = g[a];
            if (!o) {
              C.logger.warn("[buffer-controller]: Attempting to append to the " + a + " SourceBuffer, but it does not exist"), i.shiftAndExecuteNext(a);
              return;
            }
            o.ended = !1, console.assert(!o.updating, a + " sourceBuffer must not be updating"), o.appendBuffer(f);
          }, m.blockBuffers = function(f, a) {
            var i = this;
            if (a === void 0 && (a = this.getSourceBufferTypes()), !a.length) {
              C.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), Promise.resolve().then(f);
              return;
            }
            var g = this.operationQueue, o = a.map(function(r) {
              return g.appendBlocker(r);
            });
            Promise.all(o).then(function() {
              f(), a.forEach(function(r) {
                var l = i.sourceBuffer[r];
                (!l || !l.updating) && g.shiftAndExecuteNext(r);
              });
            });
          }, m.getSourceBufferTypes = function() {
            return Object.keys(this.sourceBuffer);
          }, m.addBufferListener = function(f, a, i) {
            var g = this.sourceBuffer[f];
            if (!!g) {
              var o = i.bind(this, f);
              this.listeners[f].push({
                event: a,
                listener: o
              }), g.addEventListener(a, o);
            }
          }, m.removeBufferListeners = function(f) {
            var a = this.sourceBuffer[f];
            !a || this.listeners[f].forEach(function(i) {
              a.removeEventListener(i.event, i.listener);
            });
          }, y;
        }();
      },
      "./src/controller/buffer-operation-queue.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = S("./src/utils/logger.ts"), A = /* @__PURE__ */ function() {
          function C(k) {
            this.buffers = void 0, this.queues = {
              video: [],
              audio: [],
              audiovideo: []
            }, this.buffers = k;
          }
          var I = C.prototype;
          return I.append = function(P, L) {
            var x = this.queues[L];
            x.push(P), x.length === 1 && this.buffers[L] && this.executeNext(L);
          }, I.insertAbort = function(P, L) {
            var x = this.queues[L];
            x.unshift(P), this.executeNext(L);
          }, I.appendBlocker = function(P) {
            var L, x = new Promise(function(T) {
              L = T;
            }), _ = {
              execute: L,
              onStart: function() {
              },
              onComplete: function() {
              },
              onError: function() {
              }
            };
            return this.append(_, P), x;
          }, I.executeNext = function(P) {
            var L = this.buffers, x = this.queues, _ = L[P], T = x[P];
            if (T.length) {
              var h = T[0];
              try {
                h.execute();
              } catch (y) {
                F.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), h.onError(y), (!_ || !_.updating) && (T.shift(), this.executeNext(P));
              }
            }
          }, I.shiftAndExecuteNext = function(P) {
            this.queues[P].shift(), this.executeNext(P);
          }, I.current = function(P) {
            return this.queues[P][0];
          }, C;
        }();
      },
      "./src/controller/cap-level-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => L
        });
        var F = S("./src/events.ts");
        function A(x, _) {
          for (var T = 0; T < _.length; T++) {
            var h = _[T];
            h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(x, I(h.key), h);
          }
        }
        function C(x, _, T) {
          return _ && A(x.prototype, _), T && A(x, T), Object.defineProperty(x, "prototype", { writable: !1 }), x;
        }
        function I(x) {
          var _ = k(x, "string");
          return typeof _ == "symbol" ? _ : String(_);
        }
        function k(x, _) {
          if (typeof x != "object" || x === null)
            return x;
          var T = x[Symbol.toPrimitive];
          if (T !== void 0) {
            var h = T.call(x, _ || "default");
            if (typeof h != "object")
              return h;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (_ === "string" ? String : Number)(x);
        }
        var P = /* @__PURE__ */ function() {
          function x(T) {
            this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = T, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
          }
          var _ = x.prototype;
          return _.setStreamController = function(h) {
            this.streamController = h;
          }, _.destroy = function() {
            this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
          }, _.registerListeners = function() {
            var h = this.hls;
            h.on(F.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), h.on(F.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), h.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), h.on(F.Events.BUFFER_CODECS, this.onBufferCodecs, this), h.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
          }, _.unregisterListener = function() {
            var h = this.hls;
            h.off(F.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), h.off(F.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), h.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), h.off(F.Events.BUFFER_CODECS, this.onBufferCodecs, this), h.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
          }, _.onFpsDropLevelCapping = function(h, y) {
            x.isLevelAllowed(y.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(y.droppedLevel);
          }, _.onMediaAttaching = function(h, y) {
            this.media = y.media instanceof HTMLVideoElement ? y.media : null, this.clientRect = null;
          }, _.onManifestParsed = function(h, y) {
            var m = this.hls;
            this.restrictedLevels = [], this.firstLevel = y.firstLevel, m.config.capLevelToPlayerSize && y.video && this.startCapping();
          }, _.onBufferCodecs = function(h, y) {
            var m = this.hls;
            m.config.capLevelToPlayerSize && y.video && this.startCapping();
          }, _.onMediaDetaching = function() {
            this.stopCapping();
          }, _.detectPlayerSize = function() {
            if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
              var h = this.hls.levels;
              if (h.length) {
                var y = this.hls;
                y.autoLevelCapping = this.getMaxLevel(h.length - 1), y.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = y.autoLevelCapping;
              }
            }
          }, _.getMaxLevel = function(h) {
            var y = this, m = this.hls.levels;
            if (!m.length)
              return -1;
            var s = m.filter(function(f, a) {
              return x.isLevelAllowed(a, y.restrictedLevels) && a <= h;
            });
            return this.clientRect = null, x.getMaxLevelByMediaSize(s, this.mediaWidth, this.mediaHeight);
          }, _.startCapping = function() {
            this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
          }, _.stopCapping = function() {
            this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
          }, _.getDimensions = function() {
            if (this.clientRect)
              return this.clientRect;
            var h = this.media, y = {
              width: 0,
              height: 0
            };
            if (h) {
              var m = h.getBoundingClientRect();
              y.width = m.width, y.height = m.height, !y.width && !y.height && (y.width = m.right - m.left || h.width || 0, y.height = m.bottom - m.top || h.height || 0);
            }
            return this.clientRect = y, y;
          }, x.isLevelAllowed = function(h, y) {
            return y === void 0 && (y = []), y.indexOf(h) === -1;
          }, x.getMaxLevelByMediaSize = function(h, y, m) {
            if (!h || !h.length)
              return -1;
            for (var s = function(o, r) {
              return r ? o.width !== r.width || o.height !== r.height : !0;
            }, f = h.length - 1, a = 0; a < h.length; a += 1) {
              var i = h[a];
              if ((i.width >= y || i.height >= m) && s(i, h[a + 1])) {
                f = a;
                break;
              }
            }
            return f;
          }, C(x, [{
            key: "mediaWidth",
            get: function() {
              return this.getDimensions().width * this.contentScaleFactor;
            }
          }, {
            key: "mediaHeight",
            get: function() {
              return this.getDimensions().height * this.contentScaleFactor;
            }
          }, {
            key: "contentScaleFactor",
            get: function() {
              var h = 1;
              if (!this.hls.config.ignoreDevicePixelRatio)
                try {
                  h = self.devicePixelRatio;
                } catch (y) {
                }
              return h;
            }
          }]), x;
        }();
        const L = P;
      },
      "./src/controller/cmcd-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => m
        });
        var F = S("./src/events.ts"), A = S("./src/types/cmcd.ts"), C = S("./src/utils/buffer-helper.ts"), I = S("./src/utils/logger.ts");
        function k(s, f) {
          for (var a = 0; a < f.length; a++) {
            var i = f[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, L(i.key), i);
          }
        }
        function P(s, f, a) {
          return f && k(s.prototype, f), a && k(s, a), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        }
        function L(s) {
          var f = x(s, "string");
          return typeof f == "symbol" ? f : String(f);
        }
        function x(s, f) {
          if (typeof s != "object" || s === null)
            return s;
          var a = s[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(s, f || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (f === "string" ? String : Number)(s);
        }
        function _(s, f) {
          var a = typeof Symbol != "undefined" && s[Symbol.iterator] || s["@@iterator"];
          if (a)
            return (a = a.call(s)).next.bind(a);
          if (Array.isArray(s) || (a = T(s)) || f && s && typeof s.length == "number") {
            a && (s = a);
            var i = 0;
            return function() {
              return i >= s.length ? { done: !0 } : { done: !1, value: s[i++] };
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function T(s, f) {
          if (!!s) {
            if (typeof s == "string")
              return h(s, f);
            var a = Object.prototype.toString.call(s).slice(8, -1);
            if (a === "Object" && s.constructor && (a = s.constructor.name), a === "Map" || a === "Set")
              return Array.from(s);
            if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
              return h(s, f);
          }
        }
        function h(s, f) {
          (f == null || f > s.length) && (f = s.length);
          for (var a = 0, i = new Array(f); a < f; a++)
            i[a] = s[a];
          return i;
        }
        function y() {
          return y = Object.assign ? Object.assign.bind() : function(s) {
            for (var f = 1; f < arguments.length; f++) {
              var a = arguments[f];
              for (var i in a)
                Object.prototype.hasOwnProperty.call(a, i) && (s[i] = a[i]);
            }
            return s;
          }, y.apply(this, arguments);
        }
        var m = /* @__PURE__ */ function() {
          function s(a) {
            var i = this;
            this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = function() {
              i.initialized && (i.starved = !0), i.buffering = !0;
            }, this.onPlaying = function() {
              i.initialized || (i.initialized = !0), i.buffering = !1;
            }, this.applyPlaylistData = function(r) {
              try {
                i.apply(r, {
                  ot: A.CMCDObjectType.MANIFEST,
                  su: !i.initialized
                });
              } catch (l) {
                I.logger.warn("Could not generate manifest CMCD data.", l);
              }
            }, this.applyFragmentData = function(r) {
              try {
                var l = r.frag, v = i.hls.levels[l.level], u = i.getObjectType(l), n = {
                  d: l.duration * 1e3,
                  ot: u
                };
                (u === A.CMCDObjectType.VIDEO || u === A.CMCDObjectType.AUDIO || u == A.CMCDObjectType.MUXED) && (n.br = v.bitrate / 1e3, n.tb = i.getTopBandwidth(u) / 1e3, n.bl = i.getBufferLength(u)), i.apply(r, n);
              } catch (t) {
                I.logger.warn("Could not generate segment CMCD data.", t);
              }
            }, this.hls = a;
            var g = this.config = a.config, o = g.cmcd;
            o != null && (g.pLoader = this.createPlaylistLoader(), g.fLoader = this.createFragmentLoader(), this.sid = o.sessionId || s.uuid(), this.cid = o.contentId, this.useHeaders = o.useHeaders === !0, this.registerListeners());
          }
          var f = s.prototype;
          return f.registerListeners = function() {
            var i = this.hls;
            i.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.on(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), i.on(F.Events.BUFFER_CREATED, this.onBufferCreated, this);
          }, f.unregisterListeners = function() {
            var i = this.hls;
            i.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.off(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), i.off(F.Events.BUFFER_CREATED, this.onBufferCreated, this), this.onMediaDetached();
          }, f.destroy = function() {
            this.unregisterListeners(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null;
          }, f.onMediaAttached = function(i, g) {
            this.media = g.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying);
          }, f.onMediaDetached = function() {
            !this.media || (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null);
          }, f.onBufferCreated = function(i, g) {
            var o, r;
            this.audioBuffer = (o = g.tracks.audio) === null || o === void 0 ? void 0 : o.buffer, this.videoBuffer = (r = g.tracks.video) === null || r === void 0 ? void 0 : r.buffer;
          }, f.createData = function() {
            var i;
            return {
              v: A.CMCDVersion,
              sf: A.CMCDStreamingFormat.HLS,
              sid: this.sid,
              cid: this.cid,
              pr: (i = this.media) === null || i === void 0 ? void 0 : i.playbackRate,
              mtp: this.hls.bandwidthEstimate / 1e3
            };
          }, f.apply = function(i, g) {
            g === void 0 && (g = {}), y(g, this.createData());
            var o = g.ot === A.CMCDObjectType.INIT || g.ot === A.CMCDObjectType.VIDEO || g.ot === A.CMCDObjectType.MUXED;
            if (this.starved && o && (g.bs = !0, g.su = !0, this.starved = !1), g.su == null && (g.su = this.buffering), this.useHeaders) {
              var r = s.toHeaders(g);
              if (!Object.keys(r).length)
                return;
              i.headers || (i.headers = {}), y(i.headers, r);
            } else {
              var l = s.toQuery(g);
              if (!l)
                return;
              i.url = s.appendQueryToUri(i.url, l);
            }
          }, f.getObjectType = function(i) {
            var g = i.type;
            if (g === "subtitle")
              return A.CMCDObjectType.TIMED_TEXT;
            if (i.sn === "initSegment")
              return A.CMCDObjectType.INIT;
            if (g === "audio")
              return A.CMCDObjectType.AUDIO;
            if (g === "main")
              return this.hls.audioTracks.length ? A.CMCDObjectType.VIDEO : A.CMCDObjectType.MUXED;
          }, f.getTopBandwidth = function(i) {
            var g = 0, o, r = this.hls;
            if (i === A.CMCDObjectType.AUDIO)
              o = r.audioTracks;
            else {
              var l = r.maxAutoLevel, v = l > -1 ? l + 1 : r.levels.length;
              o = r.levels.slice(0, v);
            }
            for (var u = _(o), n; !(n = u()).done; ) {
              var t = n.value;
              t.bitrate > g && (g = t.bitrate);
            }
            return g > 0 ? g : NaN;
          }, f.getBufferLength = function(i) {
            var g = this.hls.media, o = i === A.CMCDObjectType.AUDIO ? this.audioBuffer : this.videoBuffer;
            if (!o || !g)
              return NaN;
            var r = C.BufferHelper.bufferInfo(o, g.currentTime, this.config.maxBufferHole);
            return r.len * 1e3;
          }, f.createPlaylistLoader = function() {
            var i = this.config.pLoader, g = this.applyPlaylistData, o = i || this.config.loader;
            return /* @__PURE__ */ function() {
              function r(v) {
                this.loader = void 0, this.loader = new o(v);
              }
              var l = r.prototype;
              return l.destroy = function() {
                this.loader.destroy();
              }, l.abort = function() {
                this.loader.abort();
              }, l.load = function(u, n, t) {
                g(u), this.loader.load(u, n, t);
              }, P(r, [{
                key: "stats",
                get: function() {
                  return this.loader.stats;
                }
              }, {
                key: "context",
                get: function() {
                  return this.loader.context;
                }
              }]), r;
            }();
          }, f.createFragmentLoader = function() {
            var i = this.config.fLoader, g = this.applyFragmentData, o = i || this.config.loader;
            return /* @__PURE__ */ function() {
              function r(v) {
                this.loader = void 0, this.loader = new o(v);
              }
              var l = r.prototype;
              return l.destroy = function() {
                this.loader.destroy();
              }, l.abort = function() {
                this.loader.abort();
              }, l.load = function(u, n, t) {
                g(u), this.loader.load(u, n, t);
              }, P(r, [{
                key: "stats",
                get: function() {
                  return this.loader.stats;
                }
              }, {
                key: "context",
                get: function() {
                  return this.loader.context;
                }
              }]), r;
            }();
          }, s.uuid = function() {
            var i = URL.createObjectURL(new Blob()), g = i.toString();
            return URL.revokeObjectURL(i), g.slice(g.lastIndexOf("/") + 1);
          }, s.serialize = function(i) {
            for (var g = [], o = function(b) {
              return !Number.isNaN(b) && b != null && b !== "" && b !== !1;
            }, r = function(b) {
              return Math.round(b);
            }, l = function(b) {
              return r(b / 100) * 100;
            }, v = function(b) {
              return encodeURIComponent(b);
            }, u = {
              br: r,
              d: r,
              bl: l,
              dl: l,
              mtp: l,
              nor: v,
              rtp: l,
              tb: r
            }, n = Object.keys(i || {}).sort(), t = _(n), c; !(c = t()).done; ) {
              var e = c.value, d = i[e];
              if (!!o(d) && !(e === "v" && d === 1) && !(e == "pr" && d === 1)) {
                var E = u[e];
                E && (d = E(d));
                var p = typeof d, D = void 0;
                e === "ot" || e === "sf" || e === "st" ? D = e + "=" + d : p === "boolean" ? D = e : p === "number" ? D = e + "=" + d : D = e + "=" + JSON.stringify(d), g.push(D);
              }
            }
            return g.join(",");
          }, s.toHeaders = function(i) {
            for (var g = Object.keys(i), o = {}, r = ["Object", "Request", "Session", "Status"], l = [{}, {}, {}, {}], v = {
              br: 0,
              d: 0,
              ot: 0,
              tb: 0,
              bl: 1,
              dl: 1,
              mtp: 1,
              nor: 1,
              nrr: 1,
              su: 1,
              cid: 2,
              pr: 2,
              sf: 2,
              sid: 2,
              st: 2,
              v: 2,
              bs: 3,
              rtp: 3
            }, u = 0, n = g; u < n.length; u++) {
              var t = n[u], c = v[t] != null ? v[t] : 1;
              l[c][t] = i[t];
            }
            for (var e = 0; e < l.length; e++) {
              var d = s.serialize(l[e]);
              d && (o["CMCD-" + r[e]] = d);
            }
            return o;
          }, s.toQuery = function(i) {
            return "CMCD=" + encodeURIComponent(s.serialize(i));
          }, s.appendQueryToUri = function(i, g) {
            if (!g)
              return i;
            var o = i.includes("?") ? "&" : "?";
            return "" + i + o + g;
          }, s;
        }();
      },
      "./src/controller/eme-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => u
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/utils/logger.ts"), I = S("./src/utils/mediakeys-helper.ts"), k = S("./src/utils/keysystem-util.ts"), P = S("./src/utils/numeric-encoding-utils.ts"), L = S("./src/loader/level-key.ts"), x = S("./src/utils/hex.ts"), _ = S("./src/utils/mp4-tools.ts"), T = S("./node_modules/eventemitter3/index.js"), h = /* @__PURE__ */ S.n(T);
        function y(n, t) {
          n.prototype = Object.create(t.prototype), n.prototype.constructor = n, i(n, t);
        }
        function m(n) {
          var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
          return m = function(e) {
            if (e === null || !a(e))
              return e;
            if (typeof e != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (typeof t != "undefined") {
              if (t.has(e))
                return t.get(e);
              t.set(e, d);
            }
            function d() {
              return s(e, arguments, g(this).constructor);
            }
            return d.prototype = Object.create(e.prototype, { constructor: { value: d, enumerable: !1, writable: !0, configurable: !0 } }), i(d, e);
          }, m(n);
        }
        function s(n, t, c) {
          return f() ? s = Reflect.construct.bind() : s = function(d, E, p) {
            var D = [null];
            D.push.apply(D, E);
            var R = Function.bind.apply(d, D), b = new R();
            return p && i(b, p.prototype), b;
          }, s.apply(null, arguments);
        }
        function f() {
          if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch (n) {
            return !1;
          }
        }
        function a(n) {
          return Function.toString.call(n).indexOf("[native code]") !== -1;
        }
        function i(n, t) {
          return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, d) {
            return e.__proto__ = d, e;
          }, i(n, t);
        }
        function g(n) {
          return g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(c) {
            return c.__proto__ || Object.getPrototypeOf(c);
          }, g(n);
        }
        var o = 3, r = "[eme]", l = /* @__PURE__ */ function() {
          function n(c) {
            this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = n.CDMCleanupPromise ? [n.CDMCleanupPromise] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = C.logger.debug.bind(C.logger, r), this.log = C.logger.log.bind(C.logger, r), this.warn = C.logger.warn.bind(C.logger, r), this.error = C.logger.error.bind(C.logger, r), this.hls = c, this.config = c.config, this.registerListeners();
          }
          var t = n.prototype;
          return t.destroy = function() {
            this.unregisterListeners(), this.onMediaDetached(), this.hls = this.onMediaEncrypted = this.onWaitingForKey = this.keyIdToKeySessionPromise = null;
          }, t.registerListeners = function() {
            this.hls.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(F.Events.MANIFEST_LOADED, this.onManifestLoaded, this);
          }, t.unregisterListeners = function() {
            this.hls.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(F.Events.MANIFEST_LOADED, this.onManifestLoaded, this);
          }, t.getLicenseServerUrl = function(e) {
            var d = this.config, E = d.drmSystems, p = d.widevineLicenseUrl, D = E[e];
            if (D)
              return D.licenseUrl;
            if (e === I.KeySystems.WIDEVINE && p)
              return p;
            throw new Error('no license server URL configured for key-system "' + e + '"');
          }, t.getServerCertificateUrl = function(e) {
            var d = this.config.drmSystems, E = d[e];
            if (E)
              return E.serverCertificateUrl;
            this.log('No Server Certificate in config.drmSystems["' + e + '"]');
          }, t.attemptKeySystemAccess = function(e) {
            var d = this, E = this.hls.levels, p = function(O, M, w) {
              return !!O && w.indexOf(O) === M;
            }, D = E.map(function(b) {
              return b.audioCodec;
            }).filter(p), R = E.map(function(b) {
              return b.videoCodec;
            }).filter(p);
            return D.length + R.length === 0 && R.push("avc1.42e01e"), new Promise(function(b, O) {
              var M = function w(U) {
                var N = U.shift();
                d.getMediaKeysPromise(N, D, R).then(function(K) {
                  return b({
                    keySystem: N,
                    mediaKeys: K
                  });
                }).catch(function(K) {
                  U.length ? w(U) : K instanceof v ? O(K) : O(new v({
                    type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                    details: A.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                    error: K,
                    fatal: !0
                  }, K.message));
                });
              };
              M(e);
            });
          }, t.requestMediaKeySystemAccess = function(e, d) {
            var E = this.config.requestMediaKeySystemAccessFunc;
            if (typeof E != "function") {
              var p = "Configured requestMediaKeySystemAccess is not a function " + E;
              return I.requestMediaKeySystemAccess === null && self.location.protocol === "http:" && (p = "navigator.requestMediaKeySystemAccess is not available over insecure protocol " + location.protocol), Promise.reject(new Error(p));
            }
            return E(e, d);
          }, t.getMediaKeysPromise = function(e, d, E) {
            var p = this, D = (0, I.getSupportedMediaKeySystemConfigurations)(e, d, E, this.config.drmSystemOptions), R = this.keySystemAccessPromises[e], b = R == null ? void 0 : R.keySystemAccess;
            if (!b) {
              this.log('Requesting encrypted media "' + e + '" key-system access with config: ' + JSON.stringify(D)), b = this.requestMediaKeySystemAccess(e, D);
              var O = this.keySystemAccessPromises[e] = {
                keySystemAccess: b
              };
              return b.catch(function(M) {
                p.log('Failed to obtain access to key-system "' + e + '": ' + M);
              }), b.then(function(M) {
                p.log('Access for key-system "' + M.keySystem + '" obtained');
                var w = p.fetchServerCertificate(e);
                return p.log('Create media-keys for "' + e + '"'), O.mediaKeys = M.createMediaKeys().then(function(U) {
                  return p.log('Media-keys created for "' + e + '"'), w.then(function(N) {
                    return N ? p.setMediaKeysServerCertificate(U, e, N) : U;
                  });
                }), O.mediaKeys.catch(function(U) {
                  p.error('Failed to create media-keys for "' + e + '"}: ' + U);
                }), O.mediaKeys;
              });
            }
            return b.then(function() {
              return R.mediaKeys;
            });
          }, t.createMediaKeySessionContext = function(e) {
            var d = e.decryptdata, E = e.keySystem, p = e.mediaKeys;
            console.assert(!!p, "mediaKeys is defined"), this.log('Creating key-system session "' + E + '" keyId: ' + x.default.hexDump(d.keyId || []));
            var D = p.createSession(), R = {
              decryptdata: d,
              keySystem: E,
              mediaKeys: p,
              mediaKeysSession: D,
              keyStatus: "status-pending"
            };
            return this.mediaKeySessions.push(R), R;
          }, t.renewKeySession = function(e) {
            var d = e.decryptdata;
            if (d.pssh) {
              var E = this.createMediaKeySessionContext(e), p = this.getKeyIdString(d), D = "cenc";
              this.keyIdToKeySessionPromise[p] = this.generateRequestWithPreferredKeySession(E, D, d.pssh, "expired");
            } else
              this.warn("Could not renew expired session. Missing pssh initData.");
            this.removeSession(e);
          }, t.getKeyIdString = function(e) {
            if (!e)
              throw new Error("Could not read keyId of undefined decryptdata");
            if (e.keyId === null)
              throw new Error("keyId is null");
            return x.default.hexDump(e.keyId);
          }, t.updateKeySession = function(e, d) {
            var E, p = e.mediaKeysSession;
            return this.log('Updating key-session "' + p.sessionId + '" for keyID ' + x.default.hexDump(((E = e.decryptdata) === null || E === void 0 ? void 0 : E.keyId) || []) + `
      } (data length: ` + (d && d.byteLength) + ")"), p.update(d);
          }, t.selectKeySystemFormat = function(e) {
            var d = Object.keys(e.levelkeys || {});
            return this.keyFormatPromise || (this.log("Selecting key-system from fragment (sn: " + e.sn + " " + e.type + ": " + e.level + ") key formats " + d.join(", ")), this.keyFormatPromise = this.getKeyFormatPromise(d)), this.keyFormatPromise;
          }, t.getKeyFormatPromise = function(e) {
            var d = this;
            return new Promise(function(E, p) {
              var D = (0, I.getKeySystemsForConfig)(d.config), R = e.map(I.keySystemFormatToKeySystemDomain).filter(function(b) {
                return !!b && D.indexOf(b) !== -1;
              });
              return d.getKeySystemSelectionPromise(R).then(function(b) {
                var O = b.keySystem, M = (0, I.keySystemDomainToKeySystemFormat)(O);
                M ? E(M) : p(new Error('Unable to find format for key-system "' + O + '"'));
              }).catch(p);
            });
          }, t.loadKey = function(e) {
            var d = this, E = e.keyInfo.decryptdata, p = this.getKeyIdString(E), D = "(keyId: " + p + ' format: "' + E.keyFormat + '" method: ' + E.method + " uri: " + E.uri + ")";
            this.log("Starting session for key " + D);
            var R = this.keyIdToKeySessionPromise[p];
            return R || (R = this.keyIdToKeySessionPromise[p] = this.getKeySystemForKeyPromise(E).then(function(b) {
              var O = b.keySystem, M = b.mediaKeys;
              return d.throwIfDestroyed(), d.log("Handle encrypted media sn: " + e.frag.sn + " " + e.frag.type + ": " + e.frag.level + " using key " + D), d.attemptSetMediaKeys(O, M).then(function() {
                d.throwIfDestroyed();
                var w = d.createMediaKeySessionContext({
                  keySystem: O,
                  mediaKeys: M,
                  decryptdata: E
                }), U = "cenc";
                return d.generateRequestWithPreferredKeySession(w, U, E.pssh, "playlist-key");
              });
            }), R.catch(function(b) {
              return d.handleError(b);
            })), R;
          }, t.throwIfDestroyed = function(e) {
            if (!this.hls)
              throw new Error("invalid state");
          }, t.handleError = function(e) {
            !this.hls || (this.error(e.message), e instanceof v ? this.hls.trigger(F.Events.ERROR, e.data) : this.hls.trigger(F.Events.ERROR, {
              type: A.ErrorTypes.KEY_SYSTEM_ERROR,
              details: A.ErrorDetails.KEY_SYSTEM_NO_KEYS,
              error: e,
              fatal: !0
            }));
          }, t.getKeySystemForKeyPromise = function(e) {
            var d = this.getKeyIdString(e), E = this.keyIdToKeySessionPromise[d];
            if (!E) {
              var p = (0, I.keySystemFormatToKeySystemDomain)(e.keyFormat), D = p ? [p] : (0, I.getKeySystemsForConfig)(this.config);
              return this.attemptKeySystemAccess(D);
            }
            return E;
          }, t.getKeySystemSelectionPromise = function(e) {
            if (e.length || (e = (0, I.getKeySystemsForConfig)(this.config)), e.length === 0)
              throw new v({
                type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                details: A.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE,
                fatal: !0
              }, "Missing key-system license configuration options " + JSON.stringify({
                drmSystems: this.config.drmSystems
              }));
            return this.attemptKeySystemAccess(e);
          }, t._onMediaEncrypted = function(e) {
            var d = this, E = e.initDataType, p = e.initData;
            if (this.debug('"' + e.type + '" event: init data type: "' + E + '"'), p !== null) {
              var D, R;
              if (E === "sinf" && this.config.drmSystems[I.KeySystems.FAIRPLAY]) {
                var b = (0, _.bin2str)(new Uint8Array(p));
                try {
                  var O = (0, P.base64Decode)(JSON.parse(b).sinf), M = (0, _.parseSinf)(new Uint8Array(O));
                  if (!M)
                    return;
                  D = M.subarray(8, 24), R = I.KeySystems.FAIRPLAY;
                } catch (X) {
                  this.warn('Failed to parse sinf "encrypted" event message initData');
                  return;
                }
              } else {
                var w = (0, _.parsePssh)(p);
                if (w === null)
                  return;
                w.version === 0 && w.systemId === I.KeySystemIds.WIDEVINE && w.data && (D = w.data.subarray(8, 24)), R = (0, I.keySystemIdToKeySystemDomain)(w.systemId);
              }
              if (!(!R || !D)) {
                for (var U = x.default.hexDump(D), N = this.keyIdToKeySessionPromise, K = this.mediaKeySessions, W = N[U], G = function(Z) {
                  var J = K[Z], $ = J.decryptdata;
                  if ($.pssh || !$.keyId)
                    return "continue";
                  var z = x.default.hexDump($.keyId);
                  if (U === z || $.uri.replace(/-/g, "").indexOf(U) !== -1)
                    return W = N[z], delete N[z], $.pssh = new Uint8Array(p), $.keyId = D, W = N[U] = W.then(function() {
                      return d.generateRequestWithPreferredKeySession(J, E, p, "encrypted-event-key-match");
                    }), "break";
                }, j = 0; j < K.length; j++) {
                  var H = G(j);
                  if (H !== "continue" && H === "break")
                    break;
                }
                W || (W = N[U] = this.getKeySystemSelectionPromise([R]).then(function(X) {
                  var Z, J = X.keySystem, $ = X.mediaKeys;
                  d.throwIfDestroyed();
                  var z = new L.LevelKey("ISO-23001-7", U, (Z = (0, I.keySystemDomainToKeySystemFormat)(J)) != null ? Z : "");
                  return z.pssh = new Uint8Array(p), z.keyId = D, d.attemptSetMediaKeys(J, $).then(function() {
                    d.throwIfDestroyed();
                    var q = d.createMediaKeySessionContext({
                      decryptdata: z,
                      keySystem: J,
                      mediaKeys: $
                    });
                    return d.generateRequestWithPreferredKeySession(q, E, p, "encrypted-event-no-match");
                  });
                })), W.catch(function(X) {
                  return d.handleError(X);
                });
              }
            }
          }, t._onWaitingForKey = function(e) {
            this.log('"' + e.type + '" event');
          }, t.attemptSetMediaKeys = function(e, d) {
            var E = this, p = this.setMediaKeysQueue.slice();
            this.log('Setting media-keys for "' + e + '"');
            var D = Promise.all(p).then(function() {
              if (!E.media)
                throw new Error("Attempted to set mediaKeys without media element attached");
              return E.media.setMediaKeys(d);
            });
            return this.setMediaKeysQueue.push(D), D.then(function() {
              E.log('Media-keys set for "' + e + '"'), p.push(D), E.setMediaKeysQueue = E.setMediaKeysQueue.filter(function(R) {
                return p.indexOf(R) === -1;
              });
            });
          }, t.generateRequestWithPreferredKeySession = function(e, d, E, p) {
            var D, R, b = this, O = (D = this.config.drmSystems) === null || D === void 0 || (R = D[e.keySystem]) === null || R === void 0 ? void 0 : R.generateRequest;
            if (O)
              try {
                var M = O.call(this.hls, d, E, e);
                if (!M)
                  throw new Error("Invalid response from configured generateRequest filter");
                d = M.initDataType, E = e.decryptdata.pssh = M.initData ? new Uint8Array(M.initData) : null;
              } catch (W) {
                var w;
                if (this.warn(W.message), (w = this.hls) !== null && w !== void 0 && w.config.debug)
                  throw W;
              }
            if (E === null)
              return this.log('Skipping key-session request for "' + p + '" (no initData)'), Promise.resolve(e);
            var U = this.getKeyIdString(e.decryptdata);
            this.log('Generating key-session request for "' + p + '": ' + U + " (init data type: " + d + " length: " + (E ? E.byteLength : null) + ")");
            var N = new (h())();
            e.mediaKeysSession.onmessage = function(W) {
              var G = e.mediaKeysSession;
              if (!G) {
                N.emit("error", new Error("invalid state"));
                return;
              }
              var j = W.messageType, H = W.message;
              b.log('"' + j + '" message event for session "' + G.sessionId + '" message size: ' + H.byteLength), j === "license-request" || j === "license-renewal" ? b.renewLicense(e, H).catch(function(X) {
                b.handleError(X), N.emit("error", X);
              }) : j === "license-release" ? e.keySystem === I.KeySystems.FAIRPLAY && (b.updateKeySession(e, (0, k.strToUtf8array)("acknowledged")), b.removeSession(e)) : b.warn('unhandled media key message type "' + j + '"');
            }, e.mediaKeysSession.onkeystatuseschange = function(W) {
              var G = e.mediaKeysSession;
              if (!G) {
                N.emit("error", new Error("invalid state"));
                return;
              }
              b.onKeyStatusChange(e);
              var j = e.keyStatus;
              N.emit("keyStatus", j), j === "expired" && (b.warn(e.keySystem + " expired for key " + U), b.renewKeySession(e));
            };
            var K = new Promise(function(W, G) {
              N.on("error", G), N.on("keyStatus", function(j) {
                j.startsWith("usable") ? W() : j === "output-restricted" ? G(new v({
                  type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                  details: A.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,
                  fatal: !1
                }, "HDCP level output restricted")) : j === "internal-error" ? G(new v({
                  type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                  details: A.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR,
                  fatal: !0
                }, 'key status changed to "' + j + '"')) : j === "expired" ? G(new Error("key expired while generating request")) : b.warn('unhandled key status change "' + j + '"');
              });
            });
            return e.mediaKeysSession.generateRequest(d, E).then(function() {
              var W;
              b.log('Request generated for key-session "' + ((W = e.mediaKeysSession) === null || W === void 0 ? void 0 : W.sessionId) + '" keyId: ' + U);
            }).catch(function(W) {
              throw new v({
                type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                details: A.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                error: W,
                fatal: !1
              }, "Error generating key-session request: " + W);
            }).then(function() {
              return K;
            }).catch(function(W) {
              throw N.removeAllListeners(), b.removeSession(e), W;
            }).then(function() {
              return N.removeAllListeners(), e;
            });
          }, t.onKeyStatusChange = function(e) {
            var d = this;
            e.mediaKeysSession.keyStatuses.forEach(function(E, p) {
              d.log('key status change "' + E + '" for keyStatuses keyId: ' + x.default.hexDump("buffer" in p ? new Uint8Array(p.buffer, p.byteOffset, p.byteLength) : new Uint8Array(p)) + " session keyId: " + x.default.hexDump(new Uint8Array(e.decryptdata.keyId || [])) + " uri: " + e.decryptdata.uri), e.keyStatus = E;
            });
          }, t.fetchServerCertificate = function(e) {
            var d = this;
            return new Promise(function(E, p) {
              var D = d.getServerCertificateUrl(e);
              if (!D)
                return E();
              d.log('Fetching serverCertificate for "' + e + '"');
              var R = new XMLHttpRequest();
              R.open("GET", D, !0), R.responseType = "arraybuffer", R.onreadystatechange = function() {
                R.readyState === XMLHttpRequest.DONE && (R.status === 200 ? E(R.response) : p(new v({
                  type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                  details: A.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
                  fatal: !0,
                  networkDetails: R
                }, '"' + e + '" certificate request XHR failed (' + D + "). Status: " + R.status + " (" + R.statusText + ")")));
              }, R.send();
            });
          }, t.setMediaKeysServerCertificate = function(e, d, E) {
            var p = this;
            return new Promise(function(D, R) {
              e.setServerCertificate(E).then(function(b) {
                p.log("setServerCertificate " + (b ? "success" : "not supported by CDM") + " (" + (E == null ? void 0 : E.byteLength) + ') on "' + d + '"'), D(e);
              }).catch(function(b) {
                R(new v({
                  type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                  details: A.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,
                  error: b,
                  fatal: !0
                }, b.message));
              });
            });
          }, t.renewLicense = function(e, d) {
            var E = this;
            return this.requestLicense(e, new Uint8Array(d)).then(function(p) {
              return E.updateKeySession(e, new Uint8Array(p)).catch(function(D) {
                throw new v({
                  type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                  details: A.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED,
                  error: D,
                  fatal: !0
                }, D.message);
              });
            });
          }, t.setupLicenseXHR = function(e, d, E, p) {
            var D = this, R = this.config.licenseXhrSetup;
            return R ? Promise.resolve().then(function() {
              if (!E.decryptdata)
                throw new Error("Key removed");
              return R.call(D.hls, e, d, E, p);
            }).catch(function(b) {
              if (!E.decryptdata)
                throw b;
              return e.open("POST", d, !0), R.call(D.hls, e, d, E, p);
            }).then(function(b) {
              e.readyState || e.open("POST", d, !0);
              var O = b || p;
              return {
                xhr: e,
                licenseChallenge: O
              };
            }) : (e.open("POST", d, !0), Promise.resolve({
              xhr: e,
              licenseChallenge: p
            }));
          }, t.requestLicense = function(e, d) {
            var E = this;
            return new Promise(function(p, D) {
              var R = E.getLicenseServerUrl(e.keySystem);
              E.log("Sending license request to URL: " + R);
              var b = new XMLHttpRequest();
              b.responseType = "arraybuffer", b.onreadystatechange = function() {
                if (!E.hls || !e.mediaKeysSession)
                  return D(new Error("invalid state"));
                if (b.readyState === 4)
                  if (b.status === 200) {
                    E._requestLicenseFailureCount = 0;
                    var O = b.response;
                    E.log("License received " + (O instanceof ArrayBuffer ? O.byteLength : O));
                    var M = E.config.licenseResponseCallback;
                    if (M)
                      try {
                        O = M.call(E.hls, b, R, e);
                      } catch (U) {
                        E.error(U);
                      }
                    p(O);
                  } else if (E._requestLicenseFailureCount++, E._requestLicenseFailureCount > o || b.status >= 400 && b.status < 500)
                    D(new v({
                      type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                      details: A.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                      fatal: !0,
                      networkDetails: b
                    }, "License Request XHR failed (" + R + "). Status: " + b.status + " (" + b.statusText + ")"));
                  else {
                    var w = o - E._requestLicenseFailureCount + 1;
                    E.warn("Retrying license request, " + w + " attempts left"), E.requestLicense(e, d).then(p, D);
                  }
              }, e.licenseXhr && e.licenseXhr.readyState !== XMLHttpRequest.DONE && e.licenseXhr.abort(), e.licenseXhr = b, E.setupLicenseXHR(b, R, e, d).then(function(O) {
                var M = O.xhr, w = O.licenseChallenge;
                M.send(w);
              });
            });
          }, t.onMediaAttached = function(e, d) {
            if (!!this.config.emeEnabled) {
              var E = d.media;
              this.media = E, E.addEventListener("encrypted", this.onMediaEncrypted), E.addEventListener("waitingforkey", this.onWaitingForKey);
            }
          }, t.onMediaDetached = function() {
            var e = this, d = this.media, E = this.mediaKeySessions;
            d && (d.removeEventListener("encrypted", this.onMediaEncrypted), d.removeEventListener("waitingforkey", this.onWaitingForKey), this.media = null), this._requestLicenseFailureCount = 0, this.setMediaKeysQueue = [], this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, L.LevelKey.clearKeyUriToKeyIdMap();
            var p = E.length;
            n.CDMCleanupPromise = Promise.all(E.map(function(D) {
              return e.removeSession(D);
            }).concat(d == null ? void 0 : d.setMediaKeys(null).catch(function(D) {
              e.log("Could not clear media keys: " + D + ". media.src: " + (d == null ? void 0 : d.src));
            }))).then(function() {
              p && (e.log("finished closing key sessions and clearing media keys"), E.length = 0);
            }).catch(function(D) {
              e.log("Could not close sessions and clear media keys: " + D + ". media.src: " + (d == null ? void 0 : d.src));
            });
          }, t.onManifestLoaded = function(e, d) {
            var E = d.sessionKeys;
            if (!(!E || !this.config.emeEnabled) && !this.keyFormatPromise) {
              var p = E.reduce(function(D, R) {
                return D.indexOf(R.keyFormat) === -1 && D.push(R.keyFormat), D;
              }, []);
              this.log("Selecting key-system from session-keys " + p.join(", ")), this.keyFormatPromise = this.getKeyFormatPromise(p);
            }
          }, t.removeSession = function(e) {
            var d = this, E = e.mediaKeysSession, p = e.licenseXhr;
            if (E) {
              this.log("Remove licenses and keys and close session " + E.sessionId), E.onmessage = null, E.onkeystatuseschange = null, p && p.readyState !== XMLHttpRequest.DONE && p.abort(), e.mediaKeysSession = e.decryptdata = e.licenseXhr = void 0;
              var D = this.mediaKeySessions.indexOf(e);
              return D > -1 && this.mediaKeySessions.splice(D, 1), E.remove().catch(function(R) {
                d.log("Could not remove session: " + R);
              }).then(function() {
                return E.close();
              }).catch(function(R) {
                d.log("Could not close session: " + R);
              });
            }
          }, n;
        }();
        l.CDMCleanupPromise = void 0;
        var v = /* @__PURE__ */ function(n) {
          y(t, n);
          function t(c, e) {
            var d;
            return d = n.call(this, e) || this, d.data = void 0, d.data = c, c.err = c.error, d;
          }
          return t;
        }(/* @__PURE__ */ m(Error));
        const u = l;
      },
      "./src/controller/fps-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => I
        });
        var F = S("./src/events.ts"), A = S("./src/utils/logger.ts"), C = /* @__PURE__ */ function() {
          function k(L) {
            this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = L, this.registerListeners();
          }
          var P = k.prototype;
          return P.setStreamController = function(x) {
            this.streamController = x;
          }, P.registerListeners = function() {
            this.hls.on(F.Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
          }, P.unregisterListeners = function() {
            this.hls.off(F.Events.MEDIA_ATTACHING, this.onMediaAttaching);
          }, P.destroy = function() {
            this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null;
          }, P.onMediaAttaching = function(x, _) {
            var T = this.hls.config;
            if (T.capLevelOnFPSDrop) {
              var h = _.media instanceof self.HTMLVideoElement ? _.media : null;
              this.media = h, h && typeof h.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), T.fpsDroppedMonitoringPeriod);
            }
          }, P.checkFPS = function(x, _, T) {
            var h = performance.now();
            if (_) {
              if (this.lastTime) {
                var y = h - this.lastTime, m = T - this.lastDroppedFrames, s = _ - this.lastDecodedFrames, f = 1e3 * m / y, a = this.hls;
                if (a.trigger(F.Events.FPS_DROP, {
                  currentDropped: m,
                  currentDecoded: s,
                  totalDroppedFrames: T
                }), f > 0 && m > a.config.fpsDroppedMonitoringThreshold * s) {
                  var i = a.currentLevel;
                  A.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + i), i > 0 && (a.autoLevelCapping === -1 || a.autoLevelCapping >= i) && (i = i - 1, a.trigger(F.Events.FPS_DROP_LEVEL_CAPPING, {
                    level: i,
                    droppedLevel: a.currentLevel
                  }), a.autoLevelCapping = i, this.streamController.nextLevelSwitch());
                }
              }
              this.lastTime = h, this.lastDroppedFrames = T, this.lastDecodedFrames = _;
            }
          }, P.checkFPSInterval = function() {
            var x = this.media;
            if (x)
              if (this.isVideoPlaybackQualityAvailable) {
                var _ = x.getVideoPlaybackQuality();
                this.checkFPS(x, _.totalVideoFrames, _.droppedVideoFrames);
              } else
                this.checkFPS(x, x.webkitDecodedFrameCount, x.webkitDroppedFrameCount);
          }, k;
        }();
        const I = C;
      },
      "./src/controller/fragment-finders.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          findFragWithCC: () => L,
          findFragmentByPDT: () => C,
          findFragmentByPTS: () => I,
          fragmentWithinToleranceTest: () => k,
          pdtWithinToleranceTest: () => P
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/binary-search.ts");
        function C(x, _, T) {
          if (_ === null || !Array.isArray(x) || !x.length || !(0, F.isFiniteNumber)(_))
            return null;
          var h = x[0].programDateTime;
          if (_ < (h || 0))
            return null;
          var y = x[x.length - 1].endProgramDateTime;
          if (_ >= (y || 0))
            return null;
          T = T || 0;
          for (var m = 0; m < x.length; ++m) {
            var s = x[m];
            if (P(_, T, s))
              return s;
          }
          return null;
        }
        function I(x, _, T, h) {
          T === void 0 && (T = 0), h === void 0 && (h = 0);
          var y = null;
          if (x ? y = _[x.sn - _[0].sn + 1] || null : T === 0 && _[0].start === 0 && (y = _[0]), y && k(T, h, y) === 0)
            return y;
          var m = A.default.search(_, k.bind(null, T, h));
          return m && (m !== x || !y) ? m : y;
        }
        function k(x, _, T) {
          if (x === void 0 && (x = 0), _ === void 0 && (_ = 0), T.start <= x && T.start + T.duration > x)
            return 0;
          var h = Math.min(_, T.duration + (T.deltaPTS ? T.deltaPTS : 0));
          return T.start + T.duration - h <= x ? 1 : T.start - h > x && T.start ? -1 : 0;
        }
        function P(x, _, T) {
          var h = Math.min(_, T.duration + (T.deltaPTS ? T.deltaPTS : 0)) * 1e3, y = T.endProgramDateTime || 0;
          return y - h > x;
        }
        function L(x, _) {
          return A.default.search(x, function(T) {
            return T.cc < _ ? 1 : T.cc > _ ? -1 : 0;
          });
        }
      },
      "./src/controller/fragment-tracker.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          FragmentState: () => C,
          FragmentTracker: () => I
        });
        var F = S("./src/events.ts"), A = S("./src/types/loader.ts"), C;
        (function(L) {
          L.NOT_LOADED = "NOT_LOADED", L.APPENDING = "APPENDING", L.PARTIAL = "PARTIAL", L.OK = "OK";
        })(C || (C = {}));
        var I = /* @__PURE__ */ function() {
          function L(_) {
            this.activeFragment = null, this.activeParts = null, this.endListFragments = /* @__PURE__ */ Object.create(null), this.fragments = /* @__PURE__ */ Object.create(null), this.timeRanges = /* @__PURE__ */ Object.create(null), this.bufferPadding = 0.2, this.hls = void 0, this.hls = _, this._registerListeners();
          }
          var x = L.prototype;
          return x._registerListeners = function() {
            var T = this.hls;
            T.on(F.Events.BUFFER_APPENDED, this.onBufferAppended, this), T.on(F.Events.FRAG_BUFFERED, this.onFragBuffered, this), T.on(F.Events.FRAG_LOADED, this.onFragLoaded, this);
          }, x._unregisterListeners = function() {
            var T = this.hls;
            T.off(F.Events.BUFFER_APPENDED, this.onBufferAppended, this), T.off(F.Events.FRAG_BUFFERED, this.onFragBuffered, this), T.off(F.Events.FRAG_LOADED, this.onFragLoaded, this);
          }, x.destroy = function() {
            this._unregisterListeners(), this.fragments = this.endListFragments = this.timeRanges = this.activeFragment = this.activeParts = null;
          }, x.getAppendedFrag = function(T, h) {
            if (h === A.PlaylistLevelType.MAIN) {
              var y = this.activeFragment, m = this.activeParts;
              if (!y)
                return null;
              if (m)
                for (var s = m.length; s--; ) {
                  var f = m[s], a = f ? f.end : y.appendedPTS;
                  if (f.start <= T && a !== void 0 && T <= a)
                    return s > 9 && (this.activeParts = m.slice(s - 9)), f;
                }
              else if (y.start <= T && y.appendedPTS !== void 0 && T <= y.appendedPTS)
                return y;
            }
            return this.getBufferedFrag(T, h);
          }, x.getBufferedFrag = function(T, h) {
            for (var y = this.fragments, m = Object.keys(y), s = m.length; s--; ) {
              var f = y[m[s]];
              if ((f == null ? void 0 : f.body.type) === h && f.buffered) {
                var a = f.body;
                if (a.start <= T && T <= a.end)
                  return a;
              }
            }
            return null;
          }, x.detectEvictedFragments = function(T, h, y) {
            var m = this;
            this.timeRanges && (this.timeRanges[T] = h), Object.keys(this.fragments).forEach(function(s) {
              var f = m.fragments[s];
              if (!!f) {
                if (!f.buffered && !f.loaded) {
                  f.body.type === y && m.removeFragment(f.body);
                  return;
                }
                var a = f.range[T];
                !a || a.time.some(function(i) {
                  var g = !m.isTimeBuffered(i.startPTS, i.endPTS, h);
                  return g && m.removeFragment(f.body), g;
                });
              }
            });
          }, x.detectPartialFragments = function(T) {
            var h = this, y = this.timeRanges, m = T.frag, s = T.part;
            if (!(!y || m.sn === "initSegment")) {
              var f = P(m), a = this.fragments[f];
              !a || (Object.keys(y).forEach(function(i) {
                var g = m.elementaryStreams[i];
                if (!!g) {
                  var o = y[i], r = s !== null || g.partial === !0;
                  a.range[i] = h.getBufferedTimes(m, s, r, o);
                }
              }), a.loaded = null, Object.keys(a.range).length ? (a.buffered = !0, a.body.endList && (this.endListFragments[a.body.type] = a)) : this.removeFragment(a.body));
            }
          }, x.fragBuffered = function(T) {
            var h = P(T), y = this.fragments[h];
            y && (y.loaded = null, y.buffered = !0);
          }, x.getBufferedTimes = function(T, h, y, m) {
            for (var s = {
              time: [],
              partial: y
            }, f = h ? h.start : T.start, a = h ? h.end : T.end, i = T.minEndPTS || a, g = T.maxStartPTS || f, o = 0; o < m.length; o++) {
              var r = m.start(o) - this.bufferPadding, l = m.end(o) + this.bufferPadding;
              if (g >= r && i <= l) {
                s.time.push({
                  startPTS: Math.max(f, m.start(o)),
                  endPTS: Math.min(a, m.end(o))
                });
                break;
              } else if (f < l && a > r)
                s.partial = !0, s.time.push({
                  startPTS: Math.max(f, m.start(o)),
                  endPTS: Math.min(a, m.end(o))
                });
              else if (a <= r)
                break;
            }
            return s;
          }, x.getPartialFragment = function(T) {
            var h = null, y, m, s, f = 0, a = this.bufferPadding, i = this.fragments;
            return Object.keys(i).forEach(function(g) {
              var o = i[g];
              !o || k(o) && (m = o.body.start - a, s = o.body.end + a, T >= m && T <= s && (y = Math.min(T - m, s - T), f <= y && (h = o.body, f = y)));
            }), h;
          }, x.isEndListAppended = function(T) {
            var h = this.endListFragments[T];
            return h !== void 0 && (h.buffered || k(h));
          }, x.getState = function(T) {
            var h = P(T), y = this.fragments[h];
            return y ? y.buffered ? k(y) ? C.PARTIAL : C.OK : C.APPENDING : C.NOT_LOADED;
          }, x.isTimeBuffered = function(T, h, y) {
            for (var m, s, f = 0; f < y.length; f++) {
              if (m = y.start(f) - this.bufferPadding, s = y.end(f) + this.bufferPadding, T >= m && h <= s)
                return !0;
              if (h <= m)
                return !1;
            }
            return !1;
          }, x.onFragLoaded = function(T, h) {
            var y = h.frag, m = h.part;
            if (!(y.sn === "initSegment" || y.bitrateTest || m)) {
              var s = P(y);
              this.fragments[s] = {
                body: y,
                loaded: h,
                buffered: !1,
                range: /* @__PURE__ */ Object.create(null)
              };
            }
          }, x.onBufferAppended = function(T, h) {
            var y = this, m = h.frag, s = h.part, f = h.timeRanges;
            if (m.type === A.PlaylistLevelType.MAIN)
              if (this.activeFragment !== m && (this.activeFragment = m, m.appendedPTS = void 0), s) {
                var a = this.activeParts;
                a || (this.activeParts = a = []), a.push(s);
              } else
                this.activeParts = null;
            this.timeRanges = f, Object.keys(f).forEach(function(i) {
              var g = f[i];
              if (y.detectEvictedFragments(i, g), !s && m.type === A.PlaylistLevelType.MAIN) {
                var o = m.elementaryStreams[i];
                if (!o)
                  return;
                for (var r = 0; r < g.length; r++) {
                  var l = g.end(r);
                  l <= o.endPTS && l > o.startPTS ? m.appendedPTS = Math.max(l, m.appendedPTS || 0) : m.appendedPTS = o.endPTS;
                }
              }
            });
          }, x.onFragBuffered = function(T, h) {
            this.detectPartialFragments(h);
          }, x.hasFragment = function(T) {
            var h = P(T);
            return !!this.fragments[h];
          }, x.removeFragmentsInRange = function(T, h, y) {
            var m = this;
            Object.keys(this.fragments).forEach(function(s) {
              var f = m.fragments[s];
              if (!!f && f.buffered) {
                var a = f.body;
                a.type === y && a.start < h && a.end > T && m.removeFragment(a);
              }
            });
          }, x.removeFragment = function(T) {
            var h = P(T);
            T.stats.loaded = 0, T.clearElementaryStreamInfo(), T.appendedPTS = void 0, delete this.fragments[h], T.endList && delete this.endListFragments[T.type];
          }, x.removeAllFragments = function() {
            this.fragments = /* @__PURE__ */ Object.create(null), this.endListFragments = /* @__PURE__ */ Object.create(null), this.activeFragment = null, this.activeParts = null;
          }, L;
        }();
        function k(L) {
          var x, _;
          return L.buffered && (((x = L.range.video) === null || x === void 0 ? void 0 : x.partial) || ((_ = L.range.audio) === null || _ === void 0 ? void 0 : _.partial));
        }
        function P(L) {
          return L.type + "_" + L.level + "_" + L.urlId + "_" + L.sn;
        }
      },
      "./src/controller/gap-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          MAX_START_GAP_JUMP: () => P,
          SKIP_BUFFER_HOLE_STEP_SECONDS: () => L,
          SKIP_BUFFER_RANGE_START: () => x,
          STALL_MINIMUM_DURATION_MS: () => k,
          default: () => _
        });
        var F = S("./src/utils/buffer-helper.ts"), A = S("./src/errors.ts"), C = S("./src/events.ts"), I = S("./src/utils/logger.ts"), k = 250, P = 2, L = 0.1, x = 0.05, _ = /* @__PURE__ */ function() {
          function T(y, m, s, f) {
            this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = y, this.media = m, this.fragmentTracker = s, this.hls = f;
          }
          var h = T.prototype;
          return h.destroy = function() {
            this.media = null, this.hls = this.fragmentTracker = null;
          }, h.poll = function(m, s) {
            var f = this.config, a = this.media, i = this.stalled;
            if (a !== null) {
              var g = a.currentTime, o = a.seeking, r = this.seeking && !o, l = !this.seeking && o;
              if (this.seeking = o, g !== m) {
                if (this.moved = !0, i !== null) {
                  if (this.stallReported) {
                    var v = self.performance.now() - i;
                    I.logger.warn("playback not stuck anymore @" + g + ", after " + Math.round(v) + "ms"), this.stallReported = !1;
                  }
                  this.stalled = null, this.nudgeRetry = 0;
                }
                return;
              }
              if ((l || r) && (this.stalled = null), !(a.paused && !o || a.ended || a.playbackRate === 0 || !F.BufferHelper.getBuffered(a).length)) {
                var u = F.BufferHelper.bufferInfo(a, g, 0), n = u.len > 0, t = u.nextStart || 0;
                if (!(!n && !t)) {
                  if (o) {
                    var c = u.len > P, e = !t || s && s.start <= g || t - g > P && !this.fragmentTracker.getPartialFragment(g);
                    if (c || e)
                      return;
                    this.moved = !1;
                  }
                  if (!this.moved && this.stalled !== null) {
                    var d, E = Math.max(t, u.start || 0) - g, p = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, D = p == null || (d = p.details) === null || d === void 0 ? void 0 : d.live, R = D ? p.details.targetduration * 2 : P;
                    if (E > 0 && E <= R) {
                      this._trySkipBufferHole(null);
                      return;
                    }
                  }
                  var b = self.performance.now();
                  if (i === null) {
                    this.stalled = b;
                    return;
                  }
                  var O = b - i;
                  if (!(!o && O >= k && (this._reportStall(u), !this.media))) {
                    var M = F.BufferHelper.bufferInfo(a, g, f.maxBufferHole);
                    this._tryFixBufferStall(M, O);
                  }
                }
              }
            }
          }, h._tryFixBufferStall = function(m, s) {
            var f = this.config, a = this.fragmentTracker, i = this.media;
            if (i !== null) {
              var g = i.currentTime, o = a.getPartialFragment(g);
              if (o) {
                var r = this._trySkipBufferHole(o);
                if (r || !this.media)
                  return;
              }
              m.len > f.maxBufferHole && s > f.highBufferWatchdogPeriod * 1e3 && (I.logger.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
            }
          }, h._reportStall = function(m) {
            var s = this.hls, f = this.media, a = this.stallReported;
            !a && f && (this.stallReported = !0, I.logger.warn("Playback stalling at @" + f.currentTime + " due to low buffer (" + JSON.stringify(m) + ")"), s.trigger(C.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.BUFFER_STALLED_ERROR,
              fatal: !1,
              buffer: m.len
            }));
          }, h._trySkipBufferHole = function(m) {
            var s = this.config, f = this.hls, a = this.media;
            if (a === null)
              return 0;
            for (var i = a.currentTime, g = 0, o = F.BufferHelper.getBuffered(a), r = 0; r < o.length; r++) {
              var l = o.start(r);
              if (i + s.maxBufferHole >= g && i < l) {
                var v = Math.max(l + x, a.currentTime + L);
                return I.logger.warn("skipping hole, adjusting currentTime from " + i + " to " + v), this.moved = !0, this.stalled = null, a.currentTime = v, m && f.trigger(C.Events.ERROR, {
                  type: A.ErrorTypes.MEDIA_ERROR,
                  details: A.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                  fatal: !1,
                  reason: "fragment loaded with buffer holes, seeking from " + i + " to " + v,
                  frag: m
                }), v;
              }
              g = o.end(r);
            }
            return 0;
          }, h._tryNudgeBuffer = function() {
            var m = this.config, s = this.hls, f = this.media, a = this.nudgeRetry;
            if (f !== null) {
              var i = f.currentTime;
              if (this.nudgeRetry++, a < m.nudgeMaxRetry) {
                var g = i + (a + 1) * m.nudgeOffset;
                I.logger.warn("Nudging 'currentTime' from " + i + " to " + g), f.currentTime = g, s.trigger(C.Events.ERROR, {
                  type: A.ErrorTypes.MEDIA_ERROR,
                  details: A.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                  fatal: !1
                });
              } else
                I.logger.error("Playhead still not moving while enough data buffered @" + i + " after " + m.nudgeMaxRetry + " nudges"), s.trigger(C.Events.ERROR, {
                  type: A.ErrorTypes.MEDIA_ERROR,
                  details: A.ErrorDetails.BUFFER_STALLED_ERROR,
                  fatal: !0
                });
            }
          }, T;
        }();
      },
      "./src/controller/id3-track-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => m
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/utils/texttrack-utils.ts"), I = S("./src/demux/id3.ts"), k = S("./src/loader/date-range.ts"), P = S("./src/types/demuxer.ts"), L = 0.25;
        function x() {
          return self.WebKitDataCue || self.VTTCue || self.TextTrackCue;
        }
        var _ = function() {
          var s = x();
          try {
            new s(0, Number.POSITIVE_INFINITY, "");
          } catch (f) {
            return Number.MAX_VALUE;
          }
          return Number.POSITIVE_INFINITY;
        }();
        function T(s, f) {
          return s.getTime() / 1e3 - f;
        }
        function h(s) {
          return Uint8Array.from(s.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
        }
        var y = /* @__PURE__ */ function() {
          function s(a) {
            this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = a, this._registerListeners();
          }
          var f = s.prototype;
          return f.destroy = function() {
            this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null;
          }, f._registerListeners = function() {
            var i = this.hls;
            i.on(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(A.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), i.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), i.on(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this);
          }, f._unregisterListeners = function() {
            var i = this.hls;
            i.off(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.off(A.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), i.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), i.off(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this);
          }, f.onMediaAttached = function(i, g) {
            this.media = g.media;
          }, f.onMediaDetaching = function() {
            !this.id3Track || ((0, C.clearCurrentCues)(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {});
          }, f.onManifestLoading = function() {
            this.dateRangeCuesAppended = {};
          }, f.createTrack = function(i) {
            var g = this.getID3Track(i.textTracks);
            return g.mode = "hidden", g;
          }, f.getID3Track = function(i) {
            if (!!this.media) {
              for (var g = 0; g < i.length; g++) {
                var o = i[g];
                if (o.kind === "metadata" && o.label === "id3")
                  return (0, C.sendAddTrackEvent)(o, this.media), o;
              }
              return this.media.addTextTrack("metadata", "id3");
            }
          }, f.onFragParsingMetadata = function(i, g) {
            if (!!this.media) {
              var o = this.hls.config, r = o.enableEmsgMetadataCues, l = o.enableID3MetadataCues;
              if (!(!r && !l)) {
                var v = g.samples;
                this.id3Track || (this.id3Track = this.createTrack(this.media));
                for (var u = x(), n = 0; n < v.length; n++) {
                  var t = v[n].type;
                  if (!(t === P.MetadataSchema.emsg && !r || !l)) {
                    var c = I.getID3Frames(v[n].data);
                    if (c) {
                      var e = v[n].pts, d = e + v[n].duration;
                      d > _ && (d = _);
                      var E = d - e;
                      E <= 0 && (d = e + L);
                      for (var p = 0; p < c.length; p++) {
                        var D = c[p];
                        if (!I.isTimeStampFrame(D)) {
                          this.updateId3CueEnds(e);
                          var R = new u(e, d, "");
                          R.value = D, t && (R.type = t), this.id3Track.addCue(R);
                        }
                      }
                    }
                  }
                }
              }
            }
          }, f.updateId3CueEnds = function(i) {
            var g, o = (g = this.id3Track) === null || g === void 0 ? void 0 : g.cues;
            if (o)
              for (var r = o.length; r--; ) {
                var l = o[r];
                l.startTime < i && l.endTime === _ && (l.endTime = i);
              }
          }, f.onBufferFlushing = function(i, g) {
            var o = g.startOffset, r = g.endOffset, l = g.type, v = this.id3Track, u = this.hls;
            if (!!u) {
              var n = u.config, t = n.enableEmsgMetadataCues, c = n.enableID3MetadataCues;
              if (v && (t || c)) {
                var e;
                l === "audio" ? e = function(E) {
                  return E.type === P.MetadataSchema.audioId3 && c;
                } : l === "video" ? e = function(E) {
                  return E.type === P.MetadataSchema.emsg && t;
                } : e = function(E) {
                  return E.type === P.MetadataSchema.audioId3 && c || E.type === P.MetadataSchema.emsg && t;
                }, (0, C.removeCuesInRange)(v, o, r, e);
              }
            }
          }, f.onLevelUpdated = function(i, g) {
            var o = this, r = g.details;
            if (!(!this.media || !r.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues)) {
              var l = this.dateRangeCuesAppended, v = this.id3Track, u = r.dateRanges, n = Object.keys(u);
              if (v)
                for (var t = Object.keys(l).filter(function(b) {
                  return !n.includes(b);
                }), c = function(O) {
                  var M = t[O];
                  Object.keys(l[M].cues).forEach(function(w) {
                    v.removeCue(l[M].cues[w]);
                  }), delete l[M];
                }, e = t.length; e--; )
                  c(e);
              var d = r.fragments[r.fragments.length - 1];
              if (!(n.length === 0 || !(0, F.isFiniteNumber)(d == null ? void 0 : d.programDateTime))) {
                this.id3Track || (this.id3Track = this.createTrack(this.media));
                for (var E = d.programDateTime / 1e3 - d.start, p = x(), D = function(O) {
                  var M = n[O], w = u[M], U = l[M], N = (U == null ? void 0 : U.cues) || {}, K = (U == null ? void 0 : U.durationKnown) || !1, W = T(w.startDate, E), G = _, j = w.endDate;
                  if (j)
                    G = T(j, E), K = !0;
                  else if (w.endOnNext && !K) {
                    var H = n.reduce(function(q, ie) {
                      var ne = u[ie];
                      return ne.class === w.class && ne.id !== ie && ne.startDate > w.startDate && q.push(ne), q;
                    }, []).sort(function(q, ie) {
                      return q.startDate.getTime() - ie.startDate.getTime();
                    })[0];
                    H && (G = T(H.startDate, E), K = !0);
                  }
                  for (var X = Object.keys(w.attr), Z = 0; Z < X.length; Z++) {
                    var J = X[Z];
                    if (!(J === k.DateRangeAttribute.ID || J === k.DateRangeAttribute.CLASS || J === k.DateRangeAttribute.START_DATE || J === k.DateRangeAttribute.DURATION || J === k.DateRangeAttribute.END_DATE || J === k.DateRangeAttribute.END_ON_NEXT)) {
                      var $ = N[J];
                      if ($)
                        K && !U.durationKnown && ($.endTime = G);
                      else {
                        var z = w.attr[J];
                        $ = new p(W, G, ""), (J === k.DateRangeAttribute.SCTE35_OUT || J === k.DateRangeAttribute.SCTE35_IN) && (z = h(z)), $.value = {
                          key: J,
                          data: z
                        }, $.type = P.MetadataSchema.dateRange, o.id3Track.addCue($), N[J] = $;
                      }
                    }
                  }
                  l[M] = {
                    cues: N,
                    dateRange: w,
                    durationKnown: K
                  };
                }, R = 0; R < n.length; R++)
                  D(R);
              }
            }
          }, s;
        }();
        const m = y;
      },
      "./src/controller/latency-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/errors.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts");
        function I(_, T) {
          for (var h = 0; h < T.length; h++) {
            var y = T[h];
            y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(_, P(y.key), y);
          }
        }
        function k(_, T, h) {
          return T && I(_.prototype, T), h && I(_, h), Object.defineProperty(_, "prototype", { writable: !1 }), _;
        }
        function P(_) {
          var T = L(_, "string");
          return typeof T == "symbol" ? T : String(T);
        }
        function L(_, T) {
          if (typeof _ != "object" || _ === null)
            return _;
          var h = _[Symbol.toPrimitive];
          if (h !== void 0) {
            var y = h.call(_, T || "default");
            if (typeof y != "object")
              return y;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (T === "string" ? String : Number)(_);
        }
        var x = /* @__PURE__ */ function() {
          function _(h) {
            var y = this;
            this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function() {
              return y.timeupdate();
            }, this.hls = h, this.config = h.config, this.registerListeners();
          }
          var T = _.prototype;
          return T.destroy = function() {
            this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null;
          }, T.registerListeners = function() {
            this.hls.on(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(A.Events.ERROR, this.onError, this);
          }, T.unregisterListeners = function() {
            this.hls.off(A.Events.MEDIA_ATTACHED, this.onMediaAttached), this.hls.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching), this.hls.off(A.Events.MANIFEST_LOADING, this.onManifestLoading), this.hls.off(A.Events.LEVEL_UPDATED, this.onLevelUpdated), this.hls.off(A.Events.ERROR, this.onError);
          }, T.onMediaAttached = function(y, m) {
            this.media = m.media, this.media.addEventListener("timeupdate", this.timeupdateHandler);
          }, T.onMediaDetaching = function() {
            this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null);
          }, T.onManifestLoading = function() {
            this.levelDetails = null, this._latency = null, this.stallCount = 0;
          }, T.onLevelUpdated = function(y, m) {
            var s = m.details;
            this.levelDetails = s, s.advanced && this.timeupdate(), !s.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler);
          }, T.onError = function(y, m) {
            m.details === F.ErrorDetails.BUFFER_STALLED_ERROR && (this.stallCount++, C.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
          }, T.timeupdate = function() {
            var y = this.media, m = this.levelDetails;
            if (!(!y || !m)) {
              this.currentTime = y.currentTime;
              var s = this.computeLatency();
              if (s !== null) {
                this._latency = s;
                var f = this.config, a = f.lowLatencyMode, i = f.maxLiveSyncPlaybackRate;
                if (!(!a || i === 1)) {
                  var g = this.targetLatency;
                  if (g !== null) {
                    var o = s - g, r = Math.min(this.maxLatency, g + m.targetduration), l = o < r;
                    if (m.live && l && o > 0.05 && this.forwardBufferLength > 1) {
                      var v = Math.min(2, Math.max(1, i)), u = Math.round(2 / (1 + Math.exp(-0.75 * o - this.edgeStalled)) * 20) / 20;
                      y.playbackRate = Math.min(v, Math.max(1, u));
                    } else
                      y.playbackRate !== 1 && y.playbackRate !== 0 && (y.playbackRate = 1);
                  }
                }
              }
            }
          }, T.estimateLiveEdge = function() {
            var y = this.levelDetails;
            return y === null ? null : y.edge + y.age;
          }, T.computeLatency = function() {
            var y = this.estimateLiveEdge();
            return y === null ? null : y - this.currentTime;
          }, k(_, [{
            key: "latency",
            get: function() {
              return this._latency || 0;
            }
          }, {
            key: "maxLatency",
            get: function() {
              var y = this.config, m = this.levelDetails;
              return y.liveMaxLatencyDuration !== void 0 ? y.liveMaxLatencyDuration : m ? y.liveMaxLatencyDurationCount * m.targetduration : 0;
            }
          }, {
            key: "targetLatency",
            get: function() {
              var y = this.levelDetails;
              if (y === null)
                return null;
              var m = y.holdBack, s = y.partHoldBack, f = y.targetduration, a = this.config, i = a.liveSyncDuration, g = a.liveSyncDurationCount, o = a.lowLatencyMode, r = this.hls.userConfig, l = o && s || m;
              (r.liveSyncDuration || r.liveSyncDurationCount || l === 0) && (l = i !== void 0 ? i : g * f);
              var v = f, u = 1;
              return l + Math.min(this.stallCount * u, v);
            }
          }, {
            key: "liveSyncPosition",
            get: function() {
              var y = this.estimateLiveEdge(), m = this.targetLatency, s = this.levelDetails;
              if (y === null || m === null || s === null)
                return null;
              var f = s.edge, a = y - m - this.edgeStalled, i = f - s.totalduration, g = f - (this.config.lowLatencyMode && s.partTarget || s.targetduration);
              return Math.min(Math.max(i, a), g);
            }
          }, {
            key: "drift",
            get: function() {
              var y = this.levelDetails;
              return y === null ? 1 : y.drift;
            }
          }, {
            key: "edgeStalled",
            get: function() {
              var y = this.levelDetails;
              if (y === null)
                return 0;
              var m = (this.config.lowLatencyMode && y.partTarget || y.targetduration) * 3;
              return Math.max(y.age - m, 0);
            }
          }, {
            key: "forwardBufferLength",
            get: function() {
              var y = this.media, m = this.levelDetails;
              if (!y || !m)
                return 0;
              var s = y.buffered.length;
              return (s ? y.buffered.end(s - 1) : m.edge) - this.currentTime;
            }
          }]), _;
        }();
      },
      "./src/controller/level-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => a
        });
        var F = S("./src/types/level.ts"), A = S("./src/events.ts"), C = S("./src/errors.ts"), I = S("./src/utils/codecs.ts"), k = S("./src/controller/level-helper.ts"), P = S("./src/controller/base-playlist-controller.ts"), L = S("./src/types/loader.ts");
        function x() {
          return x = Object.assign ? Object.assign.bind() : function(i) {
            for (var g = 1; g < arguments.length; g++) {
              var o = arguments[g];
              for (var r in o)
                Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o[r]);
            }
            return i;
          }, x.apply(this, arguments);
        }
        function _(i, g) {
          for (var o = 0; o < g.length; o++) {
            var r = g[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, h(r.key), r);
          }
        }
        function T(i, g, o) {
          return g && _(i.prototype, g), o && _(i, o), Object.defineProperty(i, "prototype", { writable: !1 }), i;
        }
        function h(i) {
          var g = y(i, "string");
          return typeof g == "symbol" ? g : String(g);
        }
        function y(i, g) {
          if (typeof i != "object" || i === null)
            return i;
          var o = i[Symbol.toPrimitive];
          if (o !== void 0) {
            var r = o.call(i, g || "default");
            if (typeof r != "object")
              return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (g === "string" ? String : Number)(i);
        }
        function m(i, g) {
          i.prototype = Object.create(g.prototype), i.prototype.constructor = i, s(i, g);
        }
        function s(i, g) {
          return s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, l) {
            return r.__proto__ = l, r;
          }, s(i, g);
        }
        var f = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), a = /* @__PURE__ */ function(i) {
          m(g, i);
          function g(r) {
            var l;
            return l = i.call(this, r, "[level-controller]") || this, l._levels = [], l._firstLevel = -1, l._startLevel = void 0, l.currentLevelIndex = -1, l.manualLevelIndex = -1, l.onParsedComplete = void 0, l._registerListeners(), l;
          }
          var o = g.prototype;
          return o._registerListeners = function() {
            var l = this.hls;
            l.on(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), l.on(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), l.on(A.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), l.on(A.Events.FRAG_LOADED, this.onFragLoaded, this), l.on(A.Events.ERROR, this.onError, this);
          }, o._unregisterListeners = function() {
            var l = this.hls;
            l.off(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), l.off(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), l.off(A.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), l.off(A.Events.FRAG_LOADED, this.onFragLoaded, this), l.off(A.Events.ERROR, this.onError, this);
          }, o.destroy = function() {
            this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, i.prototype.destroy.call(this);
          }, o.startLoad = function() {
            var l = this._levels;
            l.forEach(function(v) {
              v.loadError = 0;
            }), i.prototype.startLoad.call(this);
          }, o.onManifestLoaded = function(l, v) {
            var u = [], n = [], t = [], c, e = {}, d, E = !1, p = !1, D = !1;
            if (v.levels.forEach(function(M) {
              var w = M.attrs;
              E = E || !!(M.width && M.height), p = p || !!M.videoCodec, D = D || !!M.audioCodec, f && M.audioCodec && M.audioCodec.indexOf("mp4a.40.34") !== -1 && (M.audioCodec = void 0);
              var U = M.bitrate + "-" + M.attrs.RESOLUTION + "-" + M.attrs.CODECS;
              d = e[U], d ? d.url.push(M.url) : (d = new F.Level(M), e[U] = d, u.push(d)), w && (w.AUDIO && (0, k.addGroupId)(d, "audio", w.AUDIO), w.SUBTITLES && (0, k.addGroupId)(d, "text", w.SUBTITLES));
            }), (E || p) && D && (u = u.filter(function(M) {
              var w = M.videoCodec, U = M.width, N = M.height;
              return !!w || !!(U && N);
            })), u = u.filter(function(M) {
              var w = M.audioCodec, U = M.videoCodec;
              return (!w || (0, I.isCodecSupportedInMp4)(w, "audio")) && (!U || (0, I.isCodecSupportedInMp4)(U, "video"));
            }), v.audioTracks && (n = v.audioTracks.filter(function(M) {
              return !M.audioCodec || (0, I.isCodecSupportedInMp4)(M.audioCodec, "audio");
            }), (0, k.assignTrackIdsByGroup)(n)), v.subtitles && (t = v.subtitles, (0, k.assignTrackIdsByGroup)(t)), u.length > 0) {
              c = u[0].bitrate, u.sort(function(M, w) {
                return M.attrs["HDCP-LEVEL"] !== w.attrs["HDCP-LEVEL"] ? (M.attrs["HDCP-LEVEL"] || "") > (w.attrs["HDCP-LEVEL"] || "") ? 1 : -1 : M.bitrate !== w.bitrate ? M.bitrate - w.bitrate : M.attrs.SCORE !== w.attrs.SCORE ? M.attrs.decimalFloatingPoint("SCORE") - w.attrs.decimalFloatingPoint("SCORE") : E && M.height !== w.height ? M.height - w.height : 0;
              }), this._levels = u;
              for (var R = 0; R < u.length; R++)
                if (u[R].bitrate === c) {
                  this._firstLevel = R, this.log("manifest loaded, " + u.length + " level(s) found, first bitrate: " + c);
                  break;
                }
              var b = D && !p, O = {
                levels: u,
                audioTracks: n,
                subtitleTracks: t,
                sessionData: v.sessionData,
                sessionKeys: v.sessionKeys,
                firstLevel: this._firstLevel,
                stats: v.stats,
                audio: D,
                video: p,
                altAudio: !b && n.some(function(M) {
                  return !!M.url;
                })
              };
              this.hls.trigger(A.Events.MANIFEST_PARSED, O), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition);
            } else
              this.hls.trigger(A.Events.ERROR, {
                type: C.ErrorTypes.MEDIA_ERROR,
                details: C.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                fatal: !0,
                url: v.url,
                reason: "no level with compatible codecs found in manifest"
              });
          }, o.onError = function(l, v) {
            var u, n;
            if (i.prototype.onError.call(this, l, v), !v.fatal) {
              var t = v.context, c = this._levels[this.currentLevelIndex];
              if (t && (t.type === L.PlaylistContextType.AUDIO_TRACK && c.audioGroupIds && t.groupId === c.audioGroupIds[c.urlId] || t.type === L.PlaylistContextType.SUBTITLE_TRACK && c.textGroupIds && t.groupId === c.textGroupIds[c.urlId])) {
                this.redundantFailover(this.currentLevelIndex);
                return;
              }
              var e = !1, d = !0, E;
              switch (v.details) {
                case C.ErrorDetails.FRAG_LOAD_ERROR:
                case C.ErrorDetails.FRAG_LOAD_TIMEOUT:
                case C.ErrorDetails.KEY_LOAD_ERROR:
                case C.ErrorDetails.KEY_LOAD_TIMEOUT:
                  if (v.frag) {
                    var p = v.frag.type === L.PlaylistLevelType.MAIN ? v.frag.level : this.currentLevelIndex, D = this._levels[p];
                    D ? (D.fragmentError++, D.fragmentError > this.hls.config.fragLoadingMaxRetry && (E = p)) : E = p;
                  }
                  break;
                case C.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED: {
                  var R = c.attrs["HDCP-LEVEL"];
                  R && (this.hls.maxHdcpLevel = F.HdcpLevels[F.HdcpLevels.indexOf(R) - 1], this.warn('Restricting playback to HDCP-LEVEL of "' + this.hls.maxHdcpLevel + '" or lower'));
                }
                case C.ErrorDetails.FRAG_PARSING_ERROR:
                case C.ErrorDetails.KEY_SYSTEM_NO_SESSION:
                  E = ((u = v.frag) === null || u === void 0 ? void 0 : u.type) === L.PlaylistLevelType.MAIN ? v.frag.level : this.currentLevelIndex, v.levelRetry = !1;
                  break;
                case C.ErrorDetails.LEVEL_LOAD_ERROR:
                case C.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                  t && (t.deliveryDirectives && (d = !1), E = t.level), e = !0;
                  break;
                case C.ErrorDetails.REMUX_ALLOC_ERROR:
                  E = (n = v.level) != null ? n : this.currentLevelIndex, e = !0;
                  break;
              }
              E !== void 0 && this.recoverLevel(v, E, e, d);
            }
          }, o.recoverLevel = function(l, v, u, n) {
            var t = l.details, c = this._levels[v];
            if (c.loadError++, u) {
              var e = this.retryLoadingOrFail(l);
              if (e)
                l.levelRetry = !0;
              else {
                this.currentLevelIndex = -1;
                return;
              }
            }
            if (n) {
              var d = c.url.length;
              if (d > 1 && c.loadError < d)
                l.levelRetry = !0, this.redundantFailover(v);
              else if (this.manualLevelIndex === -1) {
                for (var E = -1, p = this._levels, D = p.length; D--; ) {
                  var R = (D + this.currentLevelIndex) % p.length;
                  if (R !== this.currentLevelIndex && p[R].loadError === 0) {
                    E = R;
                    break;
                  }
                }
                E > -1 && this.currentLevelIndex !== E ? (this.warn(t + ": switch to " + E), l.levelRetry = !0, this.hls.nextAutoLevel = E) : l.levelRetry === !1 && (l.fatal = !0);
              }
            }
          }, o.redundantFailover = function(l) {
            var v = this._levels[l], u = v.url.length;
            if (u > 1) {
              var n = (v.urlId + 1) % u;
              this.warn("Switching to redundant URL-id " + n), this._levels.forEach(function(t) {
                t.urlId = n;
              }), this.level = l;
            }
          }, o.onFragLoaded = function(l, v) {
            var u = v.frag;
            if (u !== void 0 && u.type === L.PlaylistLevelType.MAIN) {
              var n = this._levels[u.level];
              n !== void 0 && (n.fragmentError = 0, n.loadError = 0);
            }
          }, o.onLevelLoaded = function(l, v) {
            var u, n = v.level, t = v.details, c = this._levels[n];
            if (!c) {
              var e;
              this.warn("Invalid level index " + n), (e = v.deliveryDirectives) !== null && e !== void 0 && e.skip && (t.deltaUpdateFailed = !0);
              return;
            }
            n === this.currentLevelIndex ? (c.fragmentError === 0 && (c.loadError = 0, this.retryCount = 0), this.playlistLoaded(n, v, c.details)) : (u = v.deliveryDirectives) !== null && u !== void 0 && u.skip && (t.deltaUpdateFailed = !0);
          }, o.onAudioTrackSwitched = function(l, v) {
            var u = this.hls.levels[this.currentLevelIndex];
            if (!!u && u.audioGroupIds) {
              for (var n = -1, t = this.hls.audioTracks[v.id].groupId, c = 0; c < u.audioGroupIds.length; c++)
                if (u.audioGroupIds[c] === t) {
                  n = c;
                  break;
                }
              n !== u.urlId && (u.urlId = n, this.startLoad());
            }
          }, o.loadPlaylist = function(l) {
            i.prototype.loadPlaylist.call(this);
            var v = this.currentLevelIndex, u = this._levels[v];
            if (this.canLoad && u && u.url.length > 0) {
              var n = u.urlId, t = u.url[n];
              if (l)
                try {
                  t = l.addDirectives(t);
                } catch (c) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + c);
                }
              this.log("Attempt loading level index " + v + (l ? " at sn " + l.msn + " part " + l.part : "") + " with URL-id " + n + " " + t), this.clearTimer(), this.hls.trigger(A.Events.LEVEL_LOADING, {
                url: t,
                level: v,
                id: n,
                deliveryDirectives: l || null
              });
            }
          }, o.removeLevel = function(l, v) {
            var u = function(c, e) {
              return e !== v;
            }, n = this._levels.filter(function(t, c) {
              return c !== l ? !0 : t.url.length > 1 && v !== void 0 ? (t.url = t.url.filter(u), t.audioGroupIds && (t.audioGroupIds = t.audioGroupIds.filter(u)), t.textGroupIds && (t.textGroupIds = t.textGroupIds.filter(u)), t.urlId = 0, !0) : !1;
            }).map(function(t, c) {
              var e = t.details;
              return e != null && e.fragments && e.fragments.forEach(function(d) {
                d.level = c;
              }), t;
            });
            this._levels = n, this.hls.trigger(A.Events.LEVELS_UPDATED, {
              levels: n
            });
          }, T(g, [{
            key: "levels",
            get: function() {
              return this._levels.length === 0 ? null : this._levels;
            }
          }, {
            key: "level",
            get: function() {
              return this.currentLevelIndex;
            },
            set: function(l) {
              var v, u = this._levels;
              if (u.length !== 0 && !(this.currentLevelIndex === l && (v = u[l]) !== null && v !== void 0 && v.details)) {
                if (l < 0 || l >= u.length) {
                  var n = l < 0;
                  if (this.hls.trigger(A.Events.ERROR, {
                    type: C.ErrorTypes.OTHER_ERROR,
                    details: C.ErrorDetails.LEVEL_SWITCH_ERROR,
                    level: l,
                    fatal: n,
                    reason: "invalid level idx"
                  }), n)
                    return;
                  l = Math.min(l, u.length - 1);
                }
                this.clearTimer();
                var t = this.currentLevelIndex, c = u[t], e = u[l];
                this.log("switching to level " + l + " from " + t), this.currentLevelIndex = l;
                var d = x({}, e, {
                  level: l,
                  maxBitrate: e.maxBitrate,
                  uri: e.uri,
                  urlId: e.urlId
                });
                delete d._urlId, this.hls.trigger(A.Events.LEVEL_SWITCHING, d);
                var E = e.details;
                if (!E || E.live) {
                  var p = this.switchParams(e.uri, c == null ? void 0 : c.details);
                  this.loadPlaylist(p);
                }
              }
            }
          }, {
            key: "manualLevel",
            get: function() {
              return this.manualLevelIndex;
            },
            set: function(l) {
              this.manualLevelIndex = l, this._startLevel === void 0 && (this._startLevel = l), l !== -1 && (this.level = l);
            }
          }, {
            key: "firstLevel",
            get: function() {
              return this._firstLevel;
            },
            set: function(l) {
              this._firstLevel = l;
            }
          }, {
            key: "startLevel",
            get: function() {
              if (this._startLevel === void 0) {
                var l = this.hls.config.startLevel;
                return l !== void 0 ? l : this._firstLevel;
              } else
                return this._startLevel;
            },
            set: function(l) {
              this._startLevel = l;
            }
          }, {
            key: "nextLoadLevel",
            get: function() {
              return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
            },
            set: function(l) {
              this.level = l, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = l);
            }
          }]), g;
        }(P.default);
      },
      "./src/controller/level-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          addGroupId: () => k,
          addSliding: () => f,
          adjustSliding: () => s,
          assignTrackIdsByGroup: () => P,
          computeReloadInterval: () => a,
          getFragmentWithSN: () => i,
          getPartWith: () => g,
          mapFragmentIntersection: () => m,
          mapPartIntersection: () => y,
          mergeDetails: () => T,
          updateFragPTSDTS: () => _,
          updatePTS: () => L
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/logger.ts"), C = S("./src/loader/date-range.ts");
        function I() {
          return I = Object.assign ? Object.assign.bind() : function(o) {
            for (var r = 1; r < arguments.length; r++) {
              var l = arguments[r];
              for (var v in l)
                Object.prototype.hasOwnProperty.call(l, v) && (o[v] = l[v]);
            }
            return o;
          }, I.apply(this, arguments);
        }
        function k(o, r, l) {
          switch (r) {
            case "audio":
              o.audioGroupIds || (o.audioGroupIds = []), o.audioGroupIds.push(l);
              break;
            case "text":
              o.textGroupIds || (o.textGroupIds = []), o.textGroupIds.push(l);
              break;
          }
        }
        function P(o) {
          var r = {};
          o.forEach(function(l) {
            var v = l.groupId || "";
            l.id = r[v] = r[v] || 0, r[v]++;
          });
        }
        function L(o, r, l) {
          var v = o[r], u = o[l];
          x(v, u);
        }
        function x(o, r) {
          var l = r.startPTS;
          if ((0, F.isFiniteNumber)(l)) {
            var v = 0, u;
            r.sn > o.sn ? (v = l - o.start, u = o) : (v = o.start - l, u = r), u.duration !== v && (u.duration = v);
          } else if (r.sn > o.sn) {
            var n = o.cc === r.cc;
            n && o.minEndPTS ? r.start = o.start + (o.minEndPTS - o.start) : r.start = o.start + o.duration;
          } else
            r.start = Math.max(o.start - r.duration, 0);
        }
        function _(o, r, l, v, u, n) {
          var t = v - l;
          t <= 0 && (A.logger.warn("Fragment should have a positive duration", r), v = l + r.duration, n = u + r.duration);
          var c = l, e = v, d = r.startPTS, E = r.endPTS;
          if ((0, F.isFiniteNumber)(d)) {
            var p = Math.abs(d - l);
            (0, F.isFiniteNumber)(r.deltaPTS) ? r.deltaPTS = Math.max(p, r.deltaPTS) : r.deltaPTS = p, c = Math.max(l, d), l = Math.min(l, d), u = Math.min(u, r.startDTS), e = Math.min(v, E), v = Math.max(v, E), n = Math.max(n, r.endDTS);
          }
          r.duration = v - l;
          var D = l - r.start;
          r.start = r.startPTS = l, r.maxStartPTS = c, r.startDTS = u, r.endPTS = v, r.minEndPTS = e, r.endDTS = n;
          var R = r.sn;
          if (!o || R < o.startSN || R > o.endSN)
            return 0;
          var b, O = R - o.startSN, M = o.fragments;
          for (M[O] = r, b = O; b > 0; b--)
            x(M[b], M[b - 1]);
          for (b = O; b < M.length - 1; b++)
            x(M[b], M[b + 1]);
          return o.fragmentHint && x(M[M.length - 1], o.fragmentHint), o.PTSKnown = o.alignedSliding = !0, D;
        }
        function T(o, r) {
          for (var l = null, v = o.fragments, u = v.length - 1; u >= 0; u--) {
            var n = v[u].initSegment;
            if (n) {
              l = n;
              break;
            }
          }
          o.fragmentHint && delete o.fragmentHint.endPTS;
          var t = 0, c;
          if (m(o, r, function(b, O) {
            b.relurl && (t = b.cc - O.cc), (0, F.isFiniteNumber)(b.startPTS) && (0, F.isFiniteNumber)(b.endPTS) && (O.start = O.startPTS = b.startPTS, O.startDTS = b.startDTS, O.appendedPTS = b.appendedPTS, O.maxStartPTS = b.maxStartPTS, O.endPTS = b.endPTS, O.endDTS = b.endDTS, O.minEndPTS = b.minEndPTS, O.duration = b.endPTS - b.startPTS, O.duration && (c = O), r.PTSKnown = r.alignedSliding = !0), O.elementaryStreams = b.elementaryStreams, O.loader = b.loader, O.stats = b.stats, O.urlId = b.urlId, b.initSegment && (O.initSegment = b.initSegment, l = b.initSegment);
          }), l) {
            var e = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments;
            e.forEach(function(b) {
              var O;
              (!b.initSegment || b.initSegment.relurl === ((O = l) === null || O === void 0 ? void 0 : O.relurl)) && (b.initSegment = l);
            });
          }
          if (r.skippedSegments)
            if (r.deltaUpdateFailed = r.fragments.some(function(b) {
              return !b;
            }), r.deltaUpdateFailed) {
              A.logger.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
              for (var d = r.skippedSegments; d--; )
                r.fragments.shift();
              r.startSN = r.fragments[0].sn, r.startCC = r.fragments[0].cc;
            } else
              r.canSkipDateRanges && (r.dateRanges = h(o.dateRanges, r.dateRanges, r.recentlyRemovedDateranges));
          var E = r.fragments;
          if (t) {
            A.logger.warn("discontinuity sliding from playlist, take drift into account");
            for (var p = 0; p < E.length; p++)
              E[p].cc += t;
          }
          r.skippedSegments && (r.startCC = r.fragments[0].cc), y(o.partList, r.partList, function(b, O) {
            O.elementaryStreams = b.elementaryStreams, O.stats = b.stats;
          }), c ? _(r, c, c.startPTS, c.endPTS, c.startDTS, c.endDTS) : s(o, r), E.length && (r.totalduration = r.edge - E[0].start), r.driftStartTime = o.driftStartTime, r.driftStart = o.driftStart;
          var D = r.advancedDateTime;
          if (r.advanced && D) {
            var R = r.edge;
            r.driftStart || (r.driftStartTime = D, r.driftStart = R), r.driftEndTime = D, r.driftEnd = R;
          } else
            r.driftEndTime = o.driftEndTime, r.driftEnd = o.driftEnd, r.advancedDateTime = o.advancedDateTime;
        }
        function h(o, r, l) {
          var v = I({}, o);
          return l && l.forEach(function(u) {
            delete v[u];
          }), Object.keys(r).forEach(function(u) {
            var n = new C.DateRange(r[u].attr, v[u]);
            n.isValid ? v[u] = n : A.logger.warn('Ignoring invalid Playlist Delta Update DATERANGE tag: "' + JSON.stringify(r[u].attr) + '"');
          }), v;
        }
        function y(o, r, l) {
          if (o && r)
            for (var v = 0, u = 0, n = o.length; u <= n; u++) {
              var t = o[u], c = r[u + v];
              t && c && t.index === c.index && t.fragment.sn === c.fragment.sn ? l(t, c) : v--;
            }
        }
        function m(o, r, l) {
          for (var v = r.skippedSegments, u = Math.max(o.startSN, r.startSN) - r.startSN, n = (o.fragmentHint ? 1 : 0) + (v ? r.endSN : Math.min(o.endSN, r.endSN)) - r.startSN, t = r.startSN - o.startSN, c = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments, e = o.fragmentHint ? o.fragments.concat(o.fragmentHint) : o.fragments, d = u; d <= n; d++) {
            var E = e[t + d], p = c[d];
            v && !p && d < v && (p = r.fragments[d] = E), E && p && l(E, p);
          }
        }
        function s(o, r) {
          var l = r.startSN + r.skippedSegments - o.startSN, v = o.fragments;
          l < 0 || l >= v.length || f(r, v[l].start);
        }
        function f(o, r) {
          if (r) {
            for (var l = o.fragments, v = o.skippedSegments; v < l.length; v++)
              l[v].start += r;
            o.fragmentHint && (o.fragmentHint.start += r);
          }
        }
        function a(o, r) {
          r === void 0 && (r = 1 / 0);
          var l = 1e3 * o.targetduration;
          if (o.updated) {
            var v = o.fragments, u = 4;
            if (v.length && l * u > r) {
              var n = v[v.length - 1].duration * 1e3;
              n < l && (l = n);
            }
          } else
            l /= 2;
          return Math.round(l);
        }
        function i(o, r, l) {
          if (!o || !o.details)
            return null;
          var v = o.details, u = v.fragments[r - v.startSN];
          return u || (u = v.fragmentHint, u && u.sn === r) ? u : r < v.startSN && l && l.sn === r ? l : null;
        }
        function g(o, r, l) {
          if (!o || !o.details)
            return null;
          var v = o.details.partList;
          if (v)
            for (var u = v.length; u--; ) {
              var n = v[u];
              if (n.index === l && n.fragment.sn === r)
                return n;
            }
          return null;
        }
      },
      "./src/controller/stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => r
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/controller/base-stream-controller.ts"), C = S("./src/is-supported.ts"), I = S("./src/events.ts"), k = S("./src/utils/buffer-helper.ts"), P = S("./src/controller/fragment-tracker.ts"), L = S("./src/types/loader.ts"), x = S("./src/loader/fragment.ts"), _ = S("./src/demux/transmuxer-interface.ts"), T = S("./src/types/transmuxer.ts"), h = S("./src/controller/gap-controller.ts"), y = S("./src/errors.ts");
        function m(l, v) {
          for (var u = 0; u < v.length; u++) {
            var n = v[u];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(l, f(n.key), n);
          }
        }
        function s(l, v, u) {
          return v && m(l.prototype, v), u && m(l, u), Object.defineProperty(l, "prototype", { writable: !1 }), l;
        }
        function f(l) {
          var v = a(l, "string");
          return typeof v == "symbol" ? v : String(v);
        }
        function a(l, v) {
          if (typeof l != "object" || l === null)
            return l;
          var u = l[Symbol.toPrimitive];
          if (u !== void 0) {
            var n = u.call(l, v || "default");
            if (typeof n != "object")
              return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (v === "string" ? String : Number)(l);
        }
        function i(l, v) {
          l.prototype = Object.create(v.prototype), l.prototype.constructor = l, g(l, v);
        }
        function g(l, v) {
          return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, t) {
            return n.__proto__ = t, n;
          }, g(l, v);
        }
        var o = 100, r = /* @__PURE__ */ function(l) {
          i(v, l);
          function v(n, t, c) {
            var e;
            return e = l.call(this, n, t, c, "[stream-controller]") || this, e.audioCodecSwap = !1, e.gapController = null, e.level = -1, e._forceStartLoad = !1, e.altAudio = !1, e.audioOnly = !1, e.fragPlaying = null, e.onvplaying = null, e.onvseeked = null, e.fragLastKbps = 0, e.couldBacktrack = !1, e.backtrackFragment = null, e.audioCodecSwitch = !1, e.videoBuffer = null, e._registerListeners(), e;
          }
          var u = v.prototype;
          return u._registerListeners = function() {
            var t = this.hls;
            t.on(I.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(I.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(I.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(I.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(I.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(I.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(I.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(I.Events.ERROR, this.onError, this), t.on(I.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(I.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(I.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(I.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(I.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(I.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u._unregisterListeners = function() {
            var t = this.hls;
            t.off(I.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(I.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(I.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(I.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(I.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(I.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(I.Events.ERROR, this.onError, this), t.off(I.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(I.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(I.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(I.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(I.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(I.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u.onHandlerDestroying = function() {
            this._unregisterListeners(), this.onMediaDetaching();
          }, u.startLoad = function(t) {
            if (this.levels) {
              var c = this.lastCurrentTime, e = this.hls;
              if (this.stopLoad(), this.setInterval(o), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                var d = e.startLevel;
                d === -1 && (e.config.testBandwidth && this.levels.length > 1 ? (d = 0, this.bitrateTest = !0) : d = e.nextAutoLevel), this.level = e.nextLoadLevel = d, this.loadedmetadata = !1;
              }
              c > 0 && t === -1 && (this.log("Override startPosition with lastCurrentTime @" + c.toFixed(3)), t = c), this.state = A.State.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick();
            } else
              this._forceStartLoad = !0, this.state = A.State.STOPPED;
          }, u.stopLoad = function() {
            this._forceStartLoad = !1, l.prototype.stopLoad.call(this);
          }, u.doTick = function() {
            switch (this.state) {
              case A.State.IDLE:
                this.doTickIdle();
                break;
              case A.State.WAITING_LEVEL: {
                var t, c = this.levels, e = this.level, d = c == null || (t = c[e]) === null || t === void 0 ? void 0 : t.details;
                if (d && (!d.live || this.levelLastLoaded === this.level)) {
                  if (this.waitForCdnTuneIn(d))
                    break;
                  this.state = A.State.IDLE;
                  break;
                }
                break;
              }
              case A.State.FRAG_LOADING_WAITING_RETRY:
                {
                  var E, p = self.performance.now(), D = this.retryDate;
                  (!D || p >= D || (E = this.media) !== null && E !== void 0 && E.seeking) && (this.log("retryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(this.level), this.state = A.State.IDLE);
                }
                break;
            }
            this.onTickEnd();
          }, u.onTickEnd = function() {
            l.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged();
          }, u.doTickIdle = function() {
            var t = this.hls, c = this.levelLastLoaded, e = this.levels, d = this.media, E = t.config, p = t.nextLoadLevel;
            if (!(c === null || !d && (this.startFragRequested || !E.startFragPrefetch)) && !(this.altAudio && this.audioOnly) && !(!e || !e[p])) {
              var D = e[p], R = this.getMainFwdBufferInfo();
              if (R !== null) {
                var b = this.getLevelDetails();
                if (b && this._streamEnded(R, b)) {
                  var O = {};
                  this.altAudio && (O.type = "video"), this.hls.trigger(I.Events.BUFFER_EOS, O), this.state = A.State.ENDED;
                  return;
                }
                this.level = t.nextLoadLevel = p;
                var M = D.details;
                if (!M || this.state === A.State.WAITING_LEVEL || M.live && this.levelLastLoaded !== p) {
                  this.level = p, this.state = A.State.WAITING_LEVEL;
                  return;
                }
                var w = R.len, U = this.getMaxBufferLength(D.maxBitrate);
                if (!(w >= U)) {
                  this.backtrackFragment && this.backtrackFragment.start > R.end && (this.backtrackFragment = null);
                  var N = this.backtrackFragment ? this.backtrackFragment.start : R.end, K = this.getNextFragment(N, M);
                  if (this.couldBacktrack && !this.fragPrevious && K && K.sn !== "initSegment" && this.fragmentTracker.getState(K) !== P.FragmentState.OK) {
                    var W, G = ((W = this.backtrackFragment) != null ? W : K).sn, j = G - M.startSN, H = M.fragments[j - 1];
                    H && K.cc === H.cc && (K = H, this.fragmentTracker.removeFragment(H));
                  } else
                    this.backtrackFragment && R.len && (this.backtrackFragment = null);
                  if (K && this.fragmentTracker.getState(K) === P.FragmentState.OK && this.nextLoadPosition > N) {
                    var X = this.audioOnly && !this.altAudio ? x.ElementaryStreamTypes.AUDIO : x.ElementaryStreamTypes.VIDEO, Z = (X === x.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                    Z && this.afterBufferFlushed(Z, X, L.PlaylistLevelType.MAIN), K = this.getNextFragment(this.nextLoadPosition, M);
                  }
                  !K || (K.initSegment && !K.initSegment.data && !this.bitrateTest && (K = K.initSegment), this.loadFragment(K, M, N));
                }
              }
            }
          }, u.loadFragment = function(t, c, e) {
            var d, E = this.fragmentTracker.getState(t);
            this.fragCurrent = t, E === P.FragmentState.NOT_LOADED ? t.sn === "initSegment" ? this._loadInitSegment(t, c) : this.bitrateTest ? (this.log("Fragment " + t.sn + " of level " + t.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(t, c)) : (this.startFragRequested = !0, l.prototype.loadFragment.call(this, t, c, e)) : E === P.FragmentState.APPENDING ? this.reduceMaxBufferLength(t.duration) && this.fragmentTracker.removeFragment(t) : ((d = this.media) === null || d === void 0 ? void 0 : d.buffered.length) === 0 && this.fragmentTracker.removeAllFragments();
          }, u.getAppendedFrag = function(t) {
            var c = this.fragmentTracker.getAppendedFrag(t, L.PlaylistLevelType.MAIN);
            return c && "fragment" in c ? c.fragment : c;
          }, u.getBufferedFrag = function(t) {
            return this.fragmentTracker.getBufferedFrag(t, L.PlaylistLevelType.MAIN);
          }, u.followingBufferedFrag = function(t) {
            return t ? this.getBufferedFrag(t.end + 0.5) : null;
          }, u.immediateLevelSwitch = function() {
            this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
          }, u.nextLevelSwitch = function() {
            var t = this.levels, c = this.media;
            if (c != null && c.readyState) {
              var e, d = this.getAppendedFrag(c.currentTime);
              if (d && d.start > 1 && this.flushMainBuffer(0, d.start - 1), !c.paused && t) {
                var E = this.hls.nextLoadLevel, p = t[E], D = this.fragLastKbps;
                D && this.fragCurrent ? e = this.fragCurrent.duration * p.maxBitrate / (1e3 * D) + 1 : e = 0;
              } else
                e = 0;
              var R = this.getBufferedFrag(c.currentTime + e);
              if (R) {
                var b = this.followingBufferedFrag(R);
                if (b) {
                  this.abortCurrentFrag();
                  var O = b.maxStartPTS ? b.maxStartPTS : b.start, M = b.duration, w = Math.max(R.end, O + Math.min(Math.max(M - this.config.maxFragLookUpTolerance, M * 0.5), M * 0.75));
                  this.flushMainBuffer(w, Number.POSITIVE_INFINITY);
                }
              }
            }
          }, u.abortCurrentFrag = function() {
            var t = this.fragCurrent;
            switch (this.fragCurrent = null, this.backtrackFragment = null, t && t.abortRequests(), this.state) {
              case A.State.KEY_LOADING:
              case A.State.FRAG_LOADING:
              case A.State.FRAG_LOADING_WAITING_RETRY:
              case A.State.PARSING:
              case A.State.PARSED:
                this.state = A.State.IDLE;
                break;
            }
            this.nextLoadPosition = this.getLoadPosition();
          }, u.flushMainBuffer = function(t, c) {
            l.prototype.flushMainBuffer.call(this, t, c, this.altAudio ? "video" : null);
          }, u.onMediaAttached = function(t, c) {
            l.prototype.onMediaAttached.call(this, t, c);
            var e = c.media;
            this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), e.addEventListener("playing", this.onvplaying), e.addEventListener("seeked", this.onvseeked), this.gapController = new h.default(this.config, e, this.fragmentTracker, this.hls);
          }, u.onMediaDetaching = function() {
            var t = this.media;
            t && this.onvplaying && this.onvseeked && (t.removeEventListener("playing", this.onvplaying), t.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), l.prototype.onMediaDetaching.call(this);
          }, u.onMediaPlaying = function() {
            this.tick();
          }, u.onMediaSeeked = function() {
            var t = this.media, c = t ? t.currentTime : null;
            (0, F.isFiniteNumber)(c) && this.log("Media seeked to " + c.toFixed(3)), this.tick();
          }, u.onManifestLoading = function() {
            this.log("Trigger BUFFER_RESET"), this.hls.trigger(I.Events.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null, this.backtrackFragment = null;
          }, u.onManifestParsed = function(t, c) {
            var e = !1, d = !1, E;
            c.levels.forEach(function(p) {
              E = p.audioCodec, E && (E.indexOf("mp4a.40.2") !== -1 && (e = !0), E.indexOf("mp4a.40.5") !== -1 && (d = !0));
            }), this.audioCodecSwitch = e && d && !(0, C.changeTypeSupported)(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = c.levels, this.startFragRequested = !1;
          }, u.onLevelLoading = function(t, c) {
            var e = this.levels;
            if (!(!e || this.state !== A.State.IDLE)) {
              var d = e[c.level];
              (!d.details || d.details.live && this.levelLastLoaded !== c.level || this.waitForCdnTuneIn(d.details)) && (this.state = A.State.WAITING_LEVEL);
            }
          }, u.onLevelLoaded = function(t, c) {
            var e, d = this.levels, E = c.level, p = c.details, D = p.totalduration;
            if (!d) {
              this.warn("Levels were reset while loading level " + E);
              return;
            }
            this.log("Level " + E + " loaded [" + p.startSN + "," + p.endSN + "], cc [" + p.startCC + ", " + p.endCC + "] duration:" + D);
            var R = this.fragCurrent;
            R && (this.state === A.State.FRAG_LOADING || this.state === A.State.FRAG_LOADING_WAITING_RETRY) && R.level !== c.level && R.loader && (this.state = A.State.IDLE, this.backtrackFragment = null, R.abortRequests());
            var b = d[E], O = 0;
            if (p.live || (e = b.details) !== null && e !== void 0 && e.live) {
              if (p.fragments[0] || (p.deltaUpdateFailed = !0), p.deltaUpdateFailed)
                return;
              O = this.alignPlaylists(p, b.details);
            }
            if (b.details = p, this.levelLastLoaded = E, this.hls.trigger(I.Events.LEVEL_UPDATED, {
              details: p,
              level: E
            }), this.state === A.State.WAITING_LEVEL) {
              if (this.waitForCdnTuneIn(p))
                return;
              this.state = A.State.IDLE;
            }
            this.startFragRequested ? p.live && this.synchronizeToLiveEdge(p) : this.setStartPosition(p, O), this.tick();
          }, u._handleFragmentLoadProgress = function(t) {
            var c, e = t.frag, d = t.part, E = t.payload, p = this.levels;
            if (!p) {
              this.warn("Levels were reset while fragment load was in progress. Fragment " + e.sn + " of level " + e.level + " will not be buffered");
              return;
            }
            var D = p[e.level], R = D.details;
            if (!R) {
              this.warn("Dropping fragment " + e.sn + " of level " + e.level + " after level details were reset");
              return;
            }
            var b = D.videoCodec, O = R.PTSKnown || !R.live, M = (c = e.initSegment) === null || c === void 0 ? void 0 : c.data, w = this._getAudioCodec(D), U = this.transmuxer = this.transmuxer || new _.default(this.hls, L.PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), N = d ? d.index : -1, K = N !== -1, W = new T.ChunkMetadata(e.level, e.sn, e.stats.chunkCount, E.byteLength, N, K), G = this.initPTS[e.cc];
            U.push(E, M, w, b, e, d, R.totalduration, O, W, G);
          }, u.onAudioTrackSwitching = function(t, c) {
            var e = this.altAudio, d = !!c.url, E = c.id;
            if (!d) {
              if (this.mediaBuffer !== this.media) {
                this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                var p = this.fragCurrent;
                p && (this.log("Switching to main audio track, cancel main fragment load"), p.abortRequests()), this.resetTransmuxer(), this.resetLoadingState();
              } else
                this.audioOnly && this.resetTransmuxer();
              var D = this.hls;
              e && D.trigger(I.Events.BUFFER_FLUSHING, {
                startOffset: 0,
                endOffset: Number.POSITIVE_INFINITY,
                type: "audio"
              }), D.trigger(I.Events.AUDIO_TRACK_SWITCHED, {
                id: E
              });
            }
          }, u.onAudioTrackSwitched = function(t, c) {
            var e = c.id, d = !!this.hls.audioTracks[e].url;
            if (d) {
              var E = this.videoBuffer;
              E && this.mediaBuffer !== E && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = E);
            }
            this.altAudio = d, this.tick();
          }, u.onBufferCreated = function(t, c) {
            var e = c.tracks, d, E, p = !1;
            for (var D in e) {
              var R = e[D];
              if (R.id === "main") {
                if (E = D, d = R, D === "video") {
                  var b = e[D];
                  b && (this.videoBuffer = b.buffer);
                }
              } else
                p = !0;
            }
            p && d ? (this.log("Alternate track found, use " + E + ".buffered to schedule main fragment loading"), this.mediaBuffer = d.buffer) : this.mediaBuffer = this.media;
          }, u.onFragBuffered = function(t, c) {
            var e = c.frag, d = c.part;
            if (!(e && e.type !== L.PlaylistLevelType.MAIN)) {
              if (this.fragContextChanged(e)) {
                this.warn("Fragment " + e.sn + (d ? " p: " + d.index : "") + " of level " + e.level + " finished buffering, but was aborted. state: " + this.state), this.state === A.State.PARSED && (this.state = A.State.IDLE);
                return;
              }
              var E = d ? d.stats : e.stats;
              this.fragLastKbps = Math.round(8 * E.total / (E.buffering.end - E.loading.first)), e.sn !== "initSegment" && (this.fragPrevious = e), this.fragBufferedComplete(e, d);
            }
          }, u.onError = function(t, c) {
            if (c.type === y.ErrorTypes.KEY_SYSTEM_ERROR) {
              this.onFragmentOrKeyLoadError(L.PlaylistLevelType.MAIN, c);
              return;
            }
            switch (c.details) {
              case y.ErrorDetails.FRAG_LOAD_ERROR:
              case y.ErrorDetails.FRAG_LOAD_TIMEOUT:
              case y.ErrorDetails.FRAG_PARSING_ERROR:
              case y.ErrorDetails.KEY_LOAD_ERROR:
              case y.ErrorDetails.KEY_LOAD_TIMEOUT:
                this.onFragmentOrKeyLoadError(L.PlaylistLevelType.MAIN, c);
                break;
              case y.ErrorDetails.LEVEL_LOAD_ERROR:
              case y.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                this.state !== A.State.ERROR && (c.fatal ? (this.warn("" + c.details), this.state = A.State.ERROR) : !c.levelRetry && this.state === A.State.WAITING_LEVEL && (this.state = A.State.IDLE));
                break;
              case y.ErrorDetails.BUFFER_FULL_ERROR:
                if (c.parent === "main" && (this.state === A.State.PARSING || this.state === A.State.PARSED)) {
                  var e = !0, d = this.getFwdBufferInfo(this.media, L.PlaylistLevelType.MAIN);
                  d && d.len > 0.5 && (e = !this.reduceMaxBufferLength(d.len)), e && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState();
                }
                break;
            }
          }, u.checkBuffer = function() {
            var t = this.media, c = this.gapController;
            if (!(!t || !c || !t.readyState)) {
              if (this.loadedmetadata || !k.BufferHelper.getBuffered(t).length) {
                var e = this.state !== A.State.IDLE ? this.fragCurrent : null;
                c.poll(this.lastCurrentTime, e);
              }
              this.lastCurrentTime = t.currentTime;
            }
          }, u.onFragLoadEmergencyAborted = function() {
            this.state = A.State.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate();
          }, u.onBufferFlushed = function(t, c) {
            var e = c.type;
            if (e !== x.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
              var d = (e === x.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
              this.afterBufferFlushed(d, e, L.PlaylistLevelType.MAIN);
            }
          }, u.onLevelsUpdated = function(t, c) {
            this.levels = c.levels;
          }, u.swapAudioCodec = function() {
            this.audioCodecSwap = !this.audioCodecSwap;
          }, u.seekToStartPos = function() {
            var t = this.media;
            if (!!t) {
              var c = t.currentTime, e = this.startPosition;
              if (e >= 0 && c < e) {
                if (t.seeking) {
                  this.log("could not seek to " + e + ", already seeking at " + c);
                  return;
                }
                var d = k.BufferHelper.getBuffered(t), E = d.length ? d.start(0) : 0, p = E - e;
                p > 0 && (p < this.config.maxBufferHole || p < this.config.maxFragLookUpTolerance) && (this.log("adjusting start position by " + p + " to match buffer start"), e += p, this.startPosition = e), this.log("seek to target start position " + e + " from current time " + c), t.currentTime = e;
              }
            }
          }, u._getAudioCodec = function(t) {
            var c = this.config.defaultAudioCodec || t.audioCodec;
            return this.audioCodecSwap && c && (this.log("Swapping audio codec"), c.indexOf("mp4a.40.5") !== -1 ? c = "mp4a.40.2" : c = "mp4a.40.5"), c;
          }, u._loadBitrateTestFrag = function(t, c) {
            var e = this;
            t.bitrateTest = !0, this._doFragLoad(t, c).then(function(d) {
              var E = e.hls;
              if (!(!d || E.nextLoadLevel || e.fragContextChanged(t))) {
                e.fragLoadError = 0, e.state = A.State.IDLE, e.startFragRequested = !1, e.bitrateTest = !1;
                var p = t.stats;
                p.parsing.start = p.parsing.end = p.buffering.start = p.buffering.end = self.performance.now(), E.trigger(I.Events.FRAG_LOADED, d), t.bitrateTest = !1;
              }
            });
          }, u._handleTransmuxComplete = function(t) {
            var c, e = "main", d = this.hls, E = t.remuxResult, p = t.chunkMeta, D = this.getCurrentContext(p);
            if (!D) {
              this.warn("The loading context changed while buffering fragment " + p.sn + " of level " + p.level + ". This chunk will not be buffered."), this.resetStartWhenNotLoaded(p.level);
              return;
            }
            var R = D.frag, b = D.part, O = D.level, M = E.video, w = E.text, U = E.id3, N = E.initSegment, K = O.details, W = this.altAudio ? void 0 : E.audio;
            if (!this.fragContextChanged(R)) {
              if (this.state = A.State.PARSING, N) {
                N.tracks && (this._bufferInitSegment(O, N.tracks, R, p), d.trigger(I.Events.FRAG_PARSING_INIT_SEGMENT, {
                  frag: R,
                  id: e,
                  tracks: N.tracks
                }));
                var G = N.initPTS, j = N.timescale;
                (0, F.isFiniteNumber)(G) && (this.initPTS[R.cc] = G, d.trigger(I.Events.INIT_PTS_FOUND, {
                  frag: R,
                  id: e,
                  initPTS: G,
                  timescale: j
                }));
              }
              if (M && E.independent !== !1) {
                if (K) {
                  var H = M.startPTS, X = M.endPTS, Z = M.startDTS, J = M.endDTS;
                  if (b)
                    b.elementaryStreams[M.type] = {
                      startPTS: H,
                      endPTS: X,
                      startDTS: Z,
                      endDTS: J
                    };
                  else if (M.firstKeyFrame && M.independent && p.id === 1 && (this.couldBacktrack = !0), M.dropped && M.independent) {
                    var $ = this.getMainFwdBufferInfo(), z = ($ ? $.end : this.getLoadPosition()) + this.config.maxBufferHole, q = M.firstKeyFramePTS ? M.firstKeyFramePTS : H;
                    if (z < q - this.config.maxBufferHole) {
                      this.backtrack(R);
                      return;
                    }
                    R.setElementaryStreamInfo(M.type, R.start, X, R.start, J, !0);
                  }
                  R.setElementaryStreamInfo(M.type, H, X, Z, J), this.backtrackFragment && (this.backtrackFragment = R), this.bufferFragmentData(M, R, b, p);
                }
              } else if (E.independent === !1) {
                this.backtrack(R);
                return;
              }
              if (W) {
                var ie = W.startPTS, ne = W.endPTS, de = W.startDTS, se = W.endDTS;
                b && (b.elementaryStreams[x.ElementaryStreamTypes.AUDIO] = {
                  startPTS: ie,
                  endPTS: ne,
                  startDTS: de,
                  endDTS: se
                }), R.setElementaryStreamInfo(x.ElementaryStreamTypes.AUDIO, ie, ne, de, se), this.bufferFragmentData(W, R, b, p);
              }
              if (K && U !== null && U !== void 0 && (c = U.samples) !== null && c !== void 0 && c.length) {
                var ue = {
                  id: e,
                  frag: R,
                  details: K,
                  samples: U.samples
                };
                d.trigger(I.Events.FRAG_PARSING_METADATA, ue);
              }
              if (K && w) {
                var ae = {
                  id: e,
                  frag: R,
                  details: K,
                  samples: w.samples
                };
                d.trigger(I.Events.FRAG_PARSING_USERDATA, ae);
              }
            }
          }, u._bufferInitSegment = function(t, c, e, d) {
            var E = this;
            if (this.state === A.State.PARSING) {
              this.audioOnly = !!c.audio && !c.video, this.altAudio && !this.audioOnly && delete c.audio;
              var p = c.audio, D = c.video, R = c.audiovideo;
              if (p) {
                var b = t.audioCodec, O = navigator.userAgent.toLowerCase();
                this.audioCodecSwitch && (b && (b.indexOf("mp4a.40.5") !== -1 ? b = "mp4a.40.2" : b = "mp4a.40.5"), p.metadata.channelCount !== 1 && O.indexOf("firefox") === -1 && (b = "mp4a.40.5")), O.indexOf("android") !== -1 && p.container !== "audio/mpeg" && (b = "mp4a.40.2", this.log("Android: force audio codec to " + b)), t.audioCodec && t.audioCodec !== b && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + b + '"'), p.levelCodec = b, p.id = "main", this.log("Init audio buffer, container:" + p.container + ", codecs[selected/level/parsed]=[" + (b || "") + "/" + (t.audioCodec || "") + "/" + p.codec + "]");
              }
              D && (D.levelCodec = t.videoCodec, D.id = "main", this.log("Init video buffer, container:" + D.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + D.codec + "]")), R && this.log("Init audiovideo buffer, container:" + R.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + R.codec + "]"), this.hls.trigger(I.Events.BUFFER_CODECS, c), Object.keys(c).forEach(function(M) {
                var w = c[M], U = w.initSegment;
                U != null && U.byteLength && E.hls.trigger(I.Events.BUFFER_APPENDING, {
                  type: M,
                  data: U,
                  frag: e,
                  part: null,
                  chunkMeta: d,
                  parent: e.type
                });
              }), this.tick();
            }
          }, u.getMainFwdBufferInfo = function() {
            return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, L.PlaylistLevelType.MAIN);
          }, u.backtrack = function(t) {
            this.couldBacktrack = !0, this.backtrackFragment = t, this.resetTransmuxer(), this.flushBufferGap(t), this.fragmentTracker.removeFragment(t), this.fragPrevious = null, this.nextLoadPosition = t.start, this.state = A.State.IDLE;
          }, u.checkFragmentChanged = function() {
            var t = this.media, c = null;
            if (t && t.readyState > 1 && t.seeking === !1) {
              var e = t.currentTime;
              if (k.BufferHelper.isBuffered(t, e) ? c = this.getAppendedFrag(e) : k.BufferHelper.isBuffered(t, e + 0.1) && (c = this.getAppendedFrag(e + 0.1)), c) {
                this.backtrackFragment = null;
                var d = this.fragPlaying, E = c.level;
                (!d || c.sn !== d.sn || d.level !== E || c.urlId !== d.urlId) && (this.fragPlaying = c, this.hls.trigger(I.Events.FRAG_CHANGED, {
                  frag: c
                }), (!d || d.level !== E) && this.hls.trigger(I.Events.LEVEL_SWITCHED, {
                  level: E
                }));
              }
            }
          }, s(v, [{
            key: "nextLevel",
            get: function() {
              var t = this.nextBufferedFrag;
              return t ? t.level : -1;
            }
          }, {
            key: "currentFrag",
            get: function() {
              var t = this.media;
              return t ? this.fragPlaying || this.getAppendedFrag(t.currentTime) : null;
            }
          }, {
            key: "currentProgramDateTime",
            get: function() {
              var t = this.media;
              if (t) {
                var c = t.currentTime, e = this.currentFrag;
                if (e && (0, F.isFiniteNumber)(c) && (0, F.isFiniteNumber)(e.programDateTime)) {
                  var d = e.programDateTime + (c - e.start) * 1e3;
                  return new Date(d);
                }
              }
              return null;
            }
          }, {
            key: "currentLevel",
            get: function() {
              var t = this.currentFrag;
              return t ? t.level : -1;
            }
          }, {
            key: "nextBufferedFrag",
            get: function() {
              var t = this.currentFrag;
              return t ? this.followingBufferedFrag(t) : null;
            }
          }, {
            key: "forceStartLoad",
            get: function() {
              return this._forceStartLoad;
            }
          }]), v;
        }(A.default);
      },
      "./src/controller/subtitle-stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          SubtitleStreamController: () => i
        });
        var F = S("./src/events.ts"), A = S("./src/utils/buffer-helper.ts"), C = S("./src/controller/fragment-finders.ts"), I = S("./src/utils/discontinuities.ts"), k = S("./src/controller/level-helper.ts"), P = S("./src/controller/fragment-tracker.ts"), L = S("./src/controller/base-stream-controller.ts"), x = S("./src/types/loader.ts"), _ = S("./src/types/level.ts");
        function T(o, r) {
          for (var l = 0; l < r.length; l++) {
            var v = r[l];
            v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(o, y(v.key), v);
          }
        }
        function h(o, r, l) {
          return r && T(o.prototype, r), l && T(o, l), Object.defineProperty(o, "prototype", { writable: !1 }), o;
        }
        function y(o) {
          var r = m(o, "string");
          return typeof r == "symbol" ? r : String(r);
        }
        function m(o, r) {
          if (typeof o != "object" || o === null)
            return o;
          var l = o[Symbol.toPrimitive];
          if (l !== void 0) {
            var v = l.call(o, r || "default");
            if (typeof v != "object")
              return v;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (r === "string" ? String : Number)(o);
        }
        function s(o, r) {
          o.prototype = Object.create(r.prototype), o.prototype.constructor = o, f(o, r);
        }
        function f(o, r) {
          return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(v, u) {
            return v.__proto__ = u, v;
          }, f(o, r);
        }
        var a = 500, i = /* @__PURE__ */ function(o) {
          s(r, o);
          function r(v, u, n) {
            var t;
            return t = o.call(this, v, u, n, "[subtitle-stream-controller]") || this, t.levels = [], t.currentTrackId = -1, t.tracksBuffered = [], t.mainDetails = null, t._registerListeners(), t;
          }
          var l = r.prototype;
          return l.onHandlerDestroying = function() {
            this._unregisterListeners(), this.mainDetails = null;
          }, l._registerListeners = function() {
            var u = this.hls;
            u.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), u.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), u.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), u.on(F.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.on(F.Events.ERROR, this.onError, this), u.on(F.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), u.on(F.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), u.on(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), u.on(F.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), u.on(F.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), u.on(F.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, l._unregisterListeners = function() {
            var u = this.hls;
            u.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), u.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), u.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), u.off(F.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.off(F.Events.ERROR, this.onError, this), u.off(F.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), u.off(F.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), u.off(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), u.off(F.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), u.off(F.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), u.off(F.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, l.startLoad = function(u) {
            this.stopLoad(), this.state = L.State.IDLE, this.setInterval(a), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = u, this.tick();
          }, l.onManifestLoading = function() {
            this.mainDetails = null, this.fragmentTracker.removeAllFragments();
          }, l.onLevelLoaded = function(u, n) {
            this.mainDetails = n.details;
          }, l.onSubtitleFragProcessed = function(u, n) {
            var t = n.frag, c = n.success;
            if (this.fragPrevious = t, this.state = L.State.IDLE, !!c) {
              var e = this.tracksBuffered[this.currentTrackId];
              if (!!e) {
                for (var d, E = t.start, p = 0; p < e.length; p++)
                  if (E >= e[p].start && E <= e[p].end) {
                    d = e[p];
                    break;
                  }
                var D = t.start + t.duration;
                d ? d.end = D : (d = {
                  start: E,
                  end: D
                }, e.push(d)), this.fragmentTracker.fragBuffered(t);
              }
            }
          }, l.onBufferFlushing = function(u, n) {
            var t = n.startOffset, c = n.endOffset;
            if (t === 0 && c !== Number.POSITIVE_INFINITY) {
              var e = this.currentTrackId, d = this.levels;
              if (!d.length || !d[e] || !d[e].details)
                return;
              var E = d[e].details, p = E.targetduration, D = c - p;
              if (D <= 0)
                return;
              n.endOffsetSubtitles = Math.max(0, D), this.tracksBuffered.forEach(function(R) {
                for (var b = 0; b < R.length; ) {
                  if (R[b].end <= D) {
                    R.shift();
                    continue;
                  } else if (R[b].start < D)
                    R[b].start = D;
                  else
                    break;
                  b++;
                }
              }), this.fragmentTracker.removeFragmentsInRange(t, D, x.PlaylistLevelType.SUBTITLE);
            }
          }, l.onFragBuffered = function(u, n) {
            if (!this.loadedmetadata && n.frag.type === x.PlaylistLevelType.MAIN) {
              var t;
              (t = this.media) !== null && t !== void 0 && t.buffered.length && (this.loadedmetadata = !0);
            }
          }, l.onError = function(u, n) {
            var t = n.frag;
            !t || t.type !== x.PlaylistLevelType.SUBTITLE || (this.fragCurrent && this.fragCurrent.abortRequests(), this.state = L.State.IDLE);
          }, l.onSubtitleTracksUpdated = function(u, n) {
            var t = this, c = n.subtitleTracks;
            this.tracksBuffered = [], this.levels = c.map(function(e) {
              return new _.Level(e);
            }), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach(function(e) {
              t.tracksBuffered[e.id] = [];
            }), this.mediaBuffer = null;
          }, l.onSubtitleTrackSwitch = function(u, n) {
            if (this.currentTrackId = n.id, !this.levels.length || this.currentTrackId === -1) {
              this.clearInterval();
              return;
            }
            var t = this.levels[this.currentTrackId];
            t != null && t.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, t && this.setInterval(a);
          }, l.onSubtitleTrackLoaded = function(u, n) {
            var t, c = n.details, e = n.id, d = this.currentTrackId, E = this.levels;
            if (!!E.length) {
              var p = E[d];
              if (!(e >= E.length || e !== d || !p)) {
                this.mediaBuffer = this.mediaBufferTimeRanges;
                var D = 0;
                if (c.live || (t = p.details) !== null && t !== void 0 && t.live) {
                  var R = this.mainDetails;
                  if (c.deltaUpdateFailed || !R)
                    return;
                  var b = R.fragments[0];
                  p.details ? (D = this.alignPlaylists(c, p.details), D === 0 && b && (D = b.start, (0, k.addSliding)(c, D))) : c.hasProgramDateTime && R.hasProgramDateTime ? ((0, I.alignMediaPlaylistByPDT)(c, R), D = c.fragments[0].start) : b && (D = b.start, (0, k.addSliding)(c, D));
                }
                if (p.details = c, this.levelLastLoaded = e, !this.startFragRequested && (this.mainDetails || !c.live) && this.setStartPosition(p.details, D), this.tick(), c.live && !this.fragCurrent && this.media && this.state === L.State.IDLE) {
                  var O = (0, C.findFragmentByPTS)(null, c.fragments, this.media.currentTime, 0);
                  O || (this.warn("Subtitle playlist not aligned with playback"), p.details = void 0);
                }
              }
            }
          }, l._handleFragmentLoadComplete = function(u) {
            var n = this, t = u.frag, c = u.payload, e = t.decryptdata, d = this.hls;
            if (!this.fragContextChanged(t) && c && c.byteLength > 0 && e && e.key && e.iv && e.method === "AES-128") {
              var E = performance.now();
              this.decrypter.decrypt(new Uint8Array(c), e.key.buffer, e.iv.buffer).then(function(p) {
                var D = performance.now();
                d.trigger(F.Events.FRAG_DECRYPTED, {
                  frag: t,
                  payload: p,
                  stats: {
                    tstart: E,
                    tdecrypt: D
                  }
                });
              }).catch(function(p) {
                n.warn(p.name + ": " + p.message), n.state = L.State.IDLE;
              });
            }
          }, l.doTick = function() {
            if (!this.media) {
              this.state = L.State.IDLE;
              return;
            }
            if (this.state === L.State.IDLE) {
              var u = this.currentTrackId, n = this.levels;
              if (!n.length || !n[u] || !n[u].details)
                return;
              var t = n[u].details, c = t.targetduration, e = this.config, d = this.getLoadPosition(), E = A.BufferHelper.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], d - c, e.maxBufferHole), p = E.end, D = E.len, R = this.getFwdBufferInfo(this.media, x.PlaylistLevelType.MAIN), b = this.getMaxBufferLength(R == null ? void 0 : R.len) + c;
              if (D > b)
                return;
              console.assert(t, "Subtitle track details are defined on idle subtitle stream controller tick");
              var O = t.fragments, M = O.length, w = t.edge, U = null, N = this.fragPrevious;
              if (p < w) {
                var K = e.maxFragLookUpTolerance;
                U = (0, C.findFragmentByPTS)(N, O, Math.max(O[0].start, p), K), !U && N && N.start < O[0].start && (U = O[0]);
              } else
                U = O[M - 1];
              if (!U)
                return;
              U = this.mapToInitFragWhenRequired(U), this.fragmentTracker.getState(U) === P.FragmentState.NOT_LOADED && this.loadFragment(U, t, p);
            }
          }, l.getMaxBufferLength = function(u) {
            var n = o.prototype.getMaxBufferLength.call(this);
            return u ? Math.max(n, u) : n;
          }, l.loadFragment = function(u, n, t) {
            this.fragCurrent = u, u.sn === "initSegment" ? this._loadInitSegment(u, n) : (this.startFragRequested = !0, o.prototype.loadFragment.call(this, u, n, t));
          }, h(r, [{
            key: "mediaBufferTimeRanges",
            get: function() {
              return new g(this.tracksBuffered[this.currentTrackId] || []);
            }
          }]), r;
        }(L.default), g = function(r) {
          this.buffered = void 0;
          var l = function(u, n, t) {
            if (n = n >>> 0, n > t - 1)
              throw new DOMException("Failed to execute '" + u + "' on 'TimeRanges': The index provided (" + n + ") is greater than the maximum bound (" + t + ")");
            return r[n][u];
          };
          this.buffered = {
            get length() {
              return r.length;
            },
            end: function(u) {
              return l("end", u, r.length);
            },
            start: function(u) {
              return l("start", u, r.length);
            }
          };
        };
      },
      "./src/controller/subtitle-track-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => m
        });
        var F = S("./src/events.ts"), A = S("./src/utils/texttrack-utils.ts"), C = S("./src/controller/base-playlist-controller.ts"), I = S("./src/types/loader.ts");
        function k(s, f) {
          for (var a = 0; a < f.length; a++) {
            var i = f[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, L(i.key), i);
          }
        }
        function P(s, f, a) {
          return f && k(s.prototype, f), a && k(s, a), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        }
        function L(s) {
          var f = x(s, "string");
          return typeof f == "symbol" ? f : String(f);
        }
        function x(s, f) {
          if (typeof s != "object" || s === null)
            return s;
          var a = s[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(s, f || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (f === "string" ? String : Number)(s);
        }
        function _(s, f) {
          s.prototype = Object.create(f.prototype), s.prototype.constructor = s, T(s, f);
        }
        function T(s, f) {
          return T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, T(s, f);
        }
        var h = /* @__PURE__ */ function(s) {
          _(f, s);
          function f(i) {
            var g;
            return g = s.call(this, i, "[subtitle-track-controller]") || this, g.media = null, g.tracks = [], g.groupId = null, g.tracksInGroup = [], g.trackId = -1, g.selectDefaultTrack = !0, g.queuedDefaultTrack = -1, g.trackChangeListener = function() {
              return g.onTextTracksChanged();
            }, g.asyncPollTrackChange = function() {
              return g.pollTrackChange(0);
            }, g.useTextTrackPolling = !1, g.subtitlePollingInterval = -1, g._subtitleDisplay = !0, g.registerListeners(), g;
          }
          var a = f.prototype;
          return a.destroy = function() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, s.prototype.destroy.call(this);
          }, a.registerListeners = function() {
            var g = this.hls;
            g.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), g.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), g.on(F.Events.LEVEL_LOADING, this.onLevelLoading, this), g.on(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), g.on(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), g.on(F.Events.ERROR, this.onError, this);
          }, a.unregisterListeners = function() {
            var g = this.hls;
            g.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), g.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), g.off(F.Events.LEVEL_LOADING, this.onLevelLoading, this), g.off(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), g.off(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), g.off(F.Events.ERROR, this.onError, this);
          }, a.onMediaAttached = function(g, o) {
            this.media = o.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
          }, a.pollTrackChange = function(g) {
            self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, g);
          }, a.onMediaDetaching = function() {
            if (!!this.media) {
              self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId);
              var g = y(this.media.textTracks);
              g.forEach(function(o) {
                (0, A.clearCurrentCues)(o);
              }), this.subtitleTrack = -1, this.media = null;
            }
          }, a.onManifestLoading = function() {
            this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0;
          }, a.onManifestParsed = function(g, o) {
            this.tracks = o.subtitleTracks;
          }, a.onSubtitleTrackLoaded = function(g, o) {
            var r = o.id, l = o.details, v = this.trackId, u = this.tracksInGroup[v];
            if (!u) {
              this.warn("Invalid subtitle track id " + r);
              return;
            }
            var n = u.details;
            u.details = o.details, this.log("subtitle track " + r + " loaded [" + l.startSN + "-" + l.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, o, n));
          }, a.onLevelLoading = function(g, o) {
            this.switchLevel(o.level);
          }, a.onLevelSwitching = function(g, o) {
            this.switchLevel(o.level);
          }, a.switchLevel = function(g) {
            var o = this.hls.levels[g];
            if (!!(o != null && o.textGroupIds)) {
              var r = o.textGroupIds[o.urlId];
              if (this.groupId !== r) {
                var l = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0, v = this.tracks.filter(function(t) {
                  return !r || t.groupId === r;
                });
                this.tracksInGroup = v;
                var u = this.findTrackId(l == null ? void 0 : l.name) || this.findTrackId();
                this.groupId = r;
                var n = {
                  subtitleTracks: v
                };
                this.log("Updating subtitle tracks, " + v.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(F.Events.SUBTITLE_TRACKS_UPDATED, n), u !== -1 && this.setSubtitleTrack(u, l);
              }
            }
          }, a.findTrackId = function(g) {
            for (var o = this.tracksInGroup, r = 0; r < o.length; r++) {
              var l = o[r];
              if ((!this.selectDefaultTrack || l.default) && (!g || g === l.name))
                return l.id;
            }
            return -1;
          }, a.onError = function(g, o) {
            s.prototype.onError.call(this, g, o), !(o.fatal || !o.context) && o.context.type === I.PlaylistContextType.SUBTITLE_TRACK && o.context.id === this.trackId && o.context.groupId === this.groupId && this.retryLoadingOrFail(o);
          }, a.loadPlaylist = function(g) {
            s.prototype.loadPlaylist.call(this);
            var o = this.tracksInGroup[this.trackId];
            if (this.shouldLoadTrack(o)) {
              var r = o.id, l = o.groupId, v = o.url;
              if (g)
                try {
                  v = g.addDirectives(v);
                } catch (u) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + u);
                }
              this.log("Loading subtitle playlist for id " + r), this.hls.trigger(F.Events.SUBTITLE_TRACK_LOADING, {
                url: v,
                id: r,
                groupId: l,
                deliveryDirectives: g || null
              });
            }
          }, a.toggleTrackModes = function(g) {
            var o = this, r = this.media, l = this.trackId;
            if (!!r) {
              var v = y(r.textTracks), u = v.filter(function(c) {
                return c.groupId === o.groupId;
              });
              if (g === -1)
                [].slice.call(v).forEach(function(c) {
                  c.mode = "disabled";
                });
              else {
                var n = u[l];
                n && (n.mode = "disabled");
              }
              var t = u[g];
              t && (t.mode = this.subtitleDisplay ? "showing" : "hidden");
            }
          }, a.setSubtitleTrack = function(g, o) {
            var r, l = this.tracksInGroup;
            if (!this.media) {
              this.queuedDefaultTrack = g;
              return;
            }
            if (this.trackId !== g && this.toggleTrackModes(g), !(this.trackId === g && (g === -1 || (r = l[g]) !== null && r !== void 0 && r.details) || g < -1 || g >= l.length)) {
              this.clearTimer();
              var v = l[g];
              if (this.log("Switching to subtitle track " + g), this.trackId = g, v) {
                var u = v.id, n = v.groupId, t = n === void 0 ? "" : n, c = v.name, e = v.type, d = v.url;
                this.hls.trigger(F.Events.SUBTITLE_TRACK_SWITCH, {
                  id: u,
                  groupId: t,
                  name: c,
                  type: e,
                  url: d
                });
                var E = this.switchParams(v.url, o == null ? void 0 : o.details);
                this.loadPlaylist(E);
              } else
                this.hls.trigger(F.Events.SUBTITLE_TRACK_SWITCH, {
                  id: g
                });
            }
          }, a.onTextTracksChanged = function() {
            if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !(!this.media || !this.hls.config.renderTextTracksNatively)) {
              for (var g = -1, o = y(this.media.textTracks), r = 0; r < o.length; r++)
                if (o[r].mode === "hidden")
                  g = r;
                else if (o[r].mode === "showing") {
                  g = r;
                  break;
                }
              this.subtitleTrack !== g && (this.subtitleTrack = g);
            }
          }, P(f, [{
            key: "subtitleDisplay",
            get: function() {
              return this._subtitleDisplay;
            },
            set: function(g) {
              this._subtitleDisplay = g, this.trackId > -1 && this.toggleTrackModes(this.trackId);
            }
          }, {
            key: "subtitleTracks",
            get: function() {
              return this.tracksInGroup;
            }
          }, {
            key: "subtitleTrack",
            get: function() {
              return this.trackId;
            },
            set: function(g) {
              this.selectDefaultTrack = !1;
              var o = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
              this.setSubtitleTrack(g, o);
            }
          }]), f;
        }(C.default);
        function y(s) {
          for (var f = [], a = 0; a < s.length; a++) {
            var i = s[a];
            i.kind === "subtitles" && i.label && f.push(s[a]);
          }
          return f;
        }
        const m = h;
      },
      "./src/controller/timeline-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          TimelineController: () => h
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/utils/cea-608-parser.ts"), I = S("./src/utils/output-filter.ts"), k = S("./src/utils/webvtt-parser.ts"), P = S("./src/utils/texttrack-utils.ts"), L = S("./src/utils/imsc1-ttml-parser.ts"), x = S("./src/utils/mp4-tools.ts"), _ = S("./src/types/loader.ts"), T = S("./src/utils/logger.ts"), h = /* @__PURE__ */ function() {
          function f(i) {
            if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = s(), this.captionsProperties = void 0, this.hls = i, this.config = i.config, this.Cues = i.config.cueHandler, this.captionsProperties = {
              textTrack1: {
                label: this.config.captionsTextTrack1Label,
                languageCode: this.config.captionsTextTrack1LanguageCode
              },
              textTrack2: {
                label: this.config.captionsTextTrack2Label,
                languageCode: this.config.captionsTextTrack2LanguageCode
              },
              textTrack3: {
                label: this.config.captionsTextTrack3Label,
                languageCode: this.config.captionsTextTrack3LanguageCode
              },
              textTrack4: {
                label: this.config.captionsTextTrack4Label,
                languageCode: this.config.captionsTextTrack4LanguageCode
              }
            }, this.config.enableCEA708Captions) {
              var g = new I.default(this, "textTrack1"), o = new I.default(this, "textTrack2"), r = new I.default(this, "textTrack3"), l = new I.default(this, "textTrack4");
              this.cea608Parser1 = new C.default(1, g, o), this.cea608Parser2 = new C.default(3, r, l);
            }
            i.on(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), i.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), i.on(A.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), i.on(A.Events.FRAG_LOADING, this.onFragLoading, this), i.on(A.Events.FRAG_LOADED, this.onFragLoaded, this), i.on(A.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), i.on(A.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), i.on(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), i.on(A.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), i.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
          }
          var a = f.prototype;
          return a.destroy = function() {
            var g = this.hls;
            g.off(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), g.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.off(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), g.off(A.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), g.off(A.Events.FRAG_LOADING, this.onFragLoading, this), g.off(A.Events.FRAG_LOADED, this.onFragLoaded, this), g.off(A.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), g.off(A.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), g.off(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), g.off(A.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), g.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null;
          }, a.addCues = function(g, o, r, l, v) {
            for (var u = !1, n = v.length; n--; ) {
              var t = v[n], c = m(t[0], t[1], o, r);
              if (c >= 0 && (t[0] = Math.min(t[0], o), t[1] = Math.max(t[1], r), u = !0, c / (r - o) > 0.5))
                return;
            }
            if (u || v.push([o, r]), this.config.renderTextTracksNatively) {
              var e = this.captionsTracks[g];
              this.Cues.newCue(e, o, r, l);
            } else {
              var d = this.Cues.newCue(null, o, r, l);
              this.hls.trigger(A.Events.CUES_PARSED, {
                type: "captions",
                cues: d,
                track: g
              });
            }
          }, a.onInitPtsFound = function(g, o) {
            var r = this, l = o.frag, v = o.id, u = o.initPTS, n = o.timescale, t = this.unparsedVttFrags;
            v === "main" && (this.initPTS[l.cc] = u, this.timescale[l.cc] = n), t.length && (this.unparsedVttFrags = [], t.forEach(function(c) {
              r.onFragLoaded(A.Events.FRAG_LOADED, c);
            }));
          }, a.getExistingTrack = function(g) {
            var o = this.media;
            if (o)
              for (var r = 0; r < o.textTracks.length; r++) {
                var l = o.textTracks[r];
                if (l[g])
                  return l;
              }
            return null;
          }, a.createCaptionsTrack = function(g) {
            this.config.renderTextTracksNatively ? this.createNativeTrack(g) : this.createNonNativeTrack(g);
          }, a.createNativeTrack = function(g) {
            if (!this.captionsTracks[g]) {
              var o = this.captionsProperties, r = this.captionsTracks, l = this.media, v = o[g], u = v.label, n = v.languageCode, t = this.getExistingTrack(g);
              if (t)
                r[g] = t, (0, P.clearCurrentCues)(r[g]), (0, P.sendAddTrackEvent)(r[g], l);
              else {
                var c = this.createTextTrack("captions", u, n);
                c && (c[g] = !0, r[g] = c);
              }
            }
          }, a.createNonNativeTrack = function(g) {
            if (!this.nonNativeCaptionsTracks[g]) {
              var o = this.captionsProperties[g];
              if (!!o) {
                var r = o.label, l = {
                  _id: g,
                  label: r,
                  kind: "captions",
                  default: o.media ? !!o.media.default : !1,
                  closedCaptions: o.media
                };
                this.nonNativeCaptionsTracks[g] = l, this.hls.trigger(A.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                  tracks: [l]
                });
              }
            }
          }, a.createTextTrack = function(g, o, r) {
            var l = this.media;
            if (!!l)
              return l.addTextTrack(g, o, r);
          }, a.onMediaAttaching = function(g, o) {
            this.media = o.media, this._cleanTracks();
          }, a.onMediaDetaching = function() {
            var g = this.captionsTracks;
            Object.keys(g).forEach(function(o) {
              (0, P.clearCurrentCues)(g[o]), delete g[o];
            }), this.nonNativeCaptionsTracks = {};
          }, a.onManifestLoading = function() {
            this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = s(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
          }, a._cleanTracks = function() {
            var g = this.media;
            if (!!g) {
              var o = g.textTracks;
              if (o)
                for (var r = 0; r < o.length; r++)
                  (0, P.clearCurrentCues)(o[r]);
            }
          }, a.onSubtitleTracksUpdated = function(g, o) {
            var r = this;
            this.textTracks = [];
            var l = o.subtitleTracks || [], v = l.some(function(c) {
              return c.textCodec === L.IMSC1_CODEC;
            });
            if (this.config.enableWebVTT || v && this.config.enableIMSC1) {
              var u = this.tracks && l && this.tracks.length === l.length;
              if (this.tracks = l || [], this.config.renderTextTracksNatively) {
                var n = this.media ? this.media.textTracks : [];
                this.tracks.forEach(function(c, e) {
                  var d;
                  if (e < n.length) {
                    for (var E = null, p = 0; p < n.length; p++)
                      if (y(n[p], c)) {
                        E = n[p];
                        break;
                      }
                    E && (d = E);
                  }
                  if (d)
                    (0, P.clearCurrentCues)(d);
                  else {
                    var D = r._captionsOrSubtitlesFromCharacteristics(c);
                    d = r.createTextTrack(D, c.name, c.lang), d && (d.mode = "disabled");
                  }
                  d && (d.groupId = c.groupId, r.textTracks.push(d));
                });
              } else if (!u && this.tracks && this.tracks.length) {
                var t = this.tracks.map(function(c) {
                  return {
                    label: c.name,
                    kind: c.type.toLowerCase(),
                    default: c.default,
                    subtitleTrack: c
                  };
                });
                this.hls.trigger(A.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                  tracks: t
                });
              }
            }
          }, a._captionsOrSubtitlesFromCharacteristics = function(g) {
            var o;
            if ((o = g.attrs) !== null && o !== void 0 && o.CHARACTERISTICS) {
              var r = /transcribes-spoken-dialog/gi.test(g.attrs.CHARACTERISTICS), l = /describes-music-and-sound/gi.test(g.attrs.CHARACTERISTICS);
              if (r && l)
                return "captions";
            }
            return "subtitles";
          }, a.onManifestLoaded = function(g, o) {
            var r = this;
            this.config.enableCEA708Captions && o.captions && o.captions.forEach(function(l) {
              var v = /(?:CC|SERVICE)([1-4])/.exec(l.instreamId);
              if (!!v) {
                var u = "textTrack" + v[1], n = r.captionsProperties[u];
                !n || (n.label = l.name, l.lang && (n.languageCode = l.lang), n.media = l);
              }
            });
          }, a.closedCaptionsForLevel = function(g) {
            var o = this.hls.levels[g.level];
            return o == null ? void 0 : o.attrs["CLOSED-CAPTIONS"];
          }, a.onFragLoading = function(g, o) {
            var r = this.cea608Parser1, l = this.cea608Parser2, v = this.lastSn, u = this.lastPartIndex;
            if (!(!this.enabled || !(r && l)) && o.frag.type === _.PlaylistLevelType.MAIN) {
              var n, t, c = o.frag.sn, e = (n = o == null || (t = o.part) === null || t === void 0 ? void 0 : t.index) != null ? n : -1;
              c === v + 1 || c === v && e === u + 1 || (r.reset(), l.reset()), this.lastSn = c, this.lastPartIndex = e;
            }
          }, a.onFragLoaded = function(g, o) {
            var r = o.frag, l = o.payload, v = this.initPTS, u = this.unparsedVttFrags;
            if (r.type === _.PlaylistLevelType.SUBTITLE)
              if (l.byteLength) {
                if (!(0, F.isFiniteNumber)(v[r.cc])) {
                  u.push(o), v.length && this.hls.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: r,
                    error: new Error("Missing initial subtitle PTS")
                  });
                  return;
                }
                var n = r.decryptdata, t = "stats" in o;
                if (n == null || !n.encrypted || t) {
                  var c = this.tracks[r.level], e = this.vttCCs;
                  e[r.cc] || (e[r.cc] = {
                    start: r.start,
                    prevCC: this.prevCC,
                    new: !0
                  }, this.prevCC = r.cc), c && c.textCodec === L.IMSC1_CODEC ? this._parseIMSC1(r, l) : this._parseVTTs(r, l, e);
                }
              } else
                this.hls.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                  success: !1,
                  frag: r,
                  error: new Error("Empty subtitle payload")
                });
          }, a._parseIMSC1 = function(g, o) {
            var r = this, l = this.hls;
            (0, L.parseIMSC1)(o, this.initPTS[g.cc], this.timescale[g.cc], function(v) {
              r._appendCues(v, g.level), l.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !0,
                frag: g
              });
            }, function(v) {
              T.logger.log("Failed to parse IMSC1: " + v), l.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: g,
                error: v
              });
            });
          }, a._parseVTTs = function(g, o, r) {
            var l, v = this, u = this.hls, n = (l = g.initSegment) !== null && l !== void 0 && l.data ? (0, x.appendUint8Array)(g.initSegment.data, new Uint8Array(o)) : o;
            (0, k.parseWebVTT)(n, this.initPTS[g.cc], this.timescale[g.cc], r, g.cc, g.start, function(t) {
              v._appendCues(t, g.level), u.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !0,
                frag: g
              });
            }, function(t) {
              v._fallbackToIMSC1(g, o), T.logger.log("Failed to parse VTT cue: " + t), u.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: g,
                error: t
              });
            });
          }, a._fallbackToIMSC1 = function(g, o) {
            var r = this, l = this.tracks[g.level];
            l.textCodec || (0, L.parseIMSC1)(o, this.initPTS[g.cc], this.timescale[g.cc], function() {
              l.textCodec = L.IMSC1_CODEC, r._parseIMSC1(g, o);
            }, function() {
              l.textCodec = "wvtt";
            });
          }, a._appendCues = function(g, o) {
            var r = this.hls;
            if (this.config.renderTextTracksNatively) {
              var l = this.textTracks[o];
              if (!l || l.mode === "disabled")
                return;
              g.forEach(function(n) {
                return (0, P.addCueToTrack)(l, n);
              });
            } else {
              var v = this.tracks[o];
              if (!v)
                return;
              var u = v.default ? "default" : "subtitles" + o;
              r.trigger(A.Events.CUES_PARSED, {
                type: "subtitles",
                cues: g,
                track: u
              });
            }
          }, a.onFragDecrypted = function(g, o) {
            var r = o.frag;
            if (r.type === _.PlaylistLevelType.SUBTITLE) {
              if (!(0, F.isFiniteNumber)(this.initPTS[r.cc])) {
                this.unparsedVttFrags.push(o);
                return;
              }
              this.onFragLoaded(A.Events.FRAG_LOADED, o);
            }
          }, a.onSubtitleTracksCleared = function() {
            this.tracks = [], this.captionsTracks = {};
          }, a.onFragParsingUserdata = function(g, o) {
            var r = this.cea608Parser1, l = this.cea608Parser2;
            if (!(!this.enabled || !(r && l))) {
              var v = o.frag, u = o.samples;
              if (!(v.type === _.PlaylistLevelType.MAIN && this.closedCaptionsForLevel(v) === "NONE"))
                for (var n = 0; n < u.length; n++) {
                  var t = u[n].bytes;
                  if (t) {
                    var c = this.extractCea608Data(t);
                    r.addData(u[n].pts, c[0]), l.addData(u[n].pts, c[1]);
                  }
                }
            }
          }, a.onBufferFlushing = function(g, o) {
            var r = o.startOffset, l = o.endOffset, v = o.endOffsetSubtitles, u = o.type, n = this.media;
            if (!(!n || n.currentTime < l)) {
              if (!u || u === "video") {
                var t = this.captionsTracks;
                Object.keys(t).forEach(function(e) {
                  return (0, P.removeCuesInRange)(t[e], r, l);
                });
              }
              if (this.config.renderTextTracksNatively && r === 0 && v !== void 0) {
                var c = this.textTracks;
                Object.keys(c).forEach(function(e) {
                  return (0, P.removeCuesInRange)(c[e], r, v);
                });
              }
            }
          }, a.extractCea608Data = function(g) {
            for (var o = [[], []], r = g[0] & 31, l = 2, v = 0; v < r; v++) {
              var u = g[l++], n = 127 & g[l++], t = 127 & g[l++];
              if (!(n === 0 && t === 0)) {
                var c = (4 & u) !== 0;
                if (c) {
                  var e = 3 & u;
                  (e === 0 || e === 1) && (o[e].push(n), o[e].push(t));
                }
              }
            }
            return o;
          }, f;
        }();
        function y(f, a) {
          return f && f.label === a.name && !(f.textTrack1 || f.textTrack2);
        }
        function m(f, a, i, g) {
          return Math.min(a, g) - Math.max(f, i);
        }
        function s() {
          return {
            ccOffset: 0,
            presentationOffset: 0,
            0: {
              start: 0,
              prevCC: -1,
              new: !0
            }
          };
        }
      },
      "./src/crypt/aes-crypto.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        var F = /* @__PURE__ */ function() {
          function A(I, k) {
            this.subtle = void 0, this.aesIV = void 0, this.subtle = I, this.aesIV = k;
          }
          var C = A.prototype;
          return C.decrypt = function(k, P) {
            return this.subtle.decrypt({
              name: "AES-CBC",
              iv: this.aesIV
            }, P, k);
          }, A;
        }();
      },
      "./src/crypt/aes-decryptor.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => C,
          removePadding: () => A
        });
        var F = S("./src/utils/typed-array.ts");
        function A(I) {
          var k = I.byteLength, P = k && new DataView(I.buffer).getUint8(k - 1);
          return P ? (0, F.sliceUint8)(I, 0, k - P) : I;
        }
        var C = /* @__PURE__ */ function() {
          function I() {
            this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable();
          }
          var k = I.prototype;
          return k.uint8ArrayToUint32Array_ = function(L) {
            for (var x = new DataView(L), _ = new Uint32Array(4), T = 0; T < 4; T++)
              _[T] = x.getUint32(T * 4);
            return _;
          }, k.initTable = function() {
            var L = this.sBox, x = this.invSBox, _ = this.subMix, T = _[0], h = _[1], y = _[2], m = _[3], s = this.invSubMix, f = s[0], a = s[1], i = s[2], g = s[3], o = new Uint32Array(256), r = 0, l = 0, v = 0;
            for (v = 0; v < 256; v++)
              v < 128 ? o[v] = v << 1 : o[v] = v << 1 ^ 283;
            for (v = 0; v < 256; v++) {
              var u = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4;
              u = u >>> 8 ^ u & 255 ^ 99, L[r] = u, x[u] = r;
              var n = o[r], t = o[n], c = o[t], e = o[u] * 257 ^ u * 16843008;
              T[r] = e << 24 | e >>> 8, h[r] = e << 16 | e >>> 16, y[r] = e << 8 | e >>> 24, m[r] = e, e = c * 16843009 ^ t * 65537 ^ n * 257 ^ r * 16843008, f[u] = e << 24 | e >>> 8, a[u] = e << 16 | e >>> 16, i[u] = e << 8 | e >>> 24, g[u] = e, r ? (r = n ^ o[o[o[c ^ n]]], l ^= o[o[l]]) : r = l = 1;
            }
          }, k.expandKey = function(L) {
            for (var x = this.uint8ArrayToUint32Array_(L), _ = !0, T = 0; T < x.length && _; )
              _ = x[T] === this.key[T], T++;
            if (!_) {
              this.key = x;
              var h = this.keySize = x.length;
              if (h !== 4 && h !== 6 && h !== 8)
                throw new Error("Invalid aes key size=" + h);
              var y = this.ksRows = (h + 6 + 1) * 4, m, s, f = this.keySchedule = new Uint32Array(y), a = this.invKeySchedule = new Uint32Array(y), i = this.sBox, g = this.rcon, o = this.invSubMix, r = o[0], l = o[1], v = o[2], u = o[3], n, t;
              for (m = 0; m < y; m++) {
                if (m < h) {
                  n = f[m] = x[m];
                  continue;
                }
                t = n, m % h === 0 ? (t = t << 8 | t >>> 24, t = i[t >>> 24] << 24 | i[t >>> 16 & 255] << 16 | i[t >>> 8 & 255] << 8 | i[t & 255], t ^= g[m / h | 0] << 24) : h > 6 && m % h === 4 && (t = i[t >>> 24] << 24 | i[t >>> 16 & 255] << 16 | i[t >>> 8 & 255] << 8 | i[t & 255]), f[m] = n = (f[m - h] ^ t) >>> 0;
              }
              for (s = 0; s < y; s++)
                m = y - s, s & 3 ? t = f[m] : t = f[m - 4], s < 4 || m <= 4 ? a[s] = t : a[s] = r[i[t >>> 24]] ^ l[i[t >>> 16 & 255]] ^ v[i[t >>> 8 & 255]] ^ u[i[t & 255]], a[s] = a[s] >>> 0;
            }
          }, k.networkToHostOrderSwap = function(L) {
            return L << 24 | (L & 65280) << 8 | (L & 16711680) >> 8 | L >>> 24;
          }, k.decrypt = function(L, x, _) {
            for (var T = this.keySize + 6, h = this.invKeySchedule, y = this.invSBox, m = this.invSubMix, s = m[0], f = m[1], a = m[2], i = m[3], g = this.uint8ArrayToUint32Array_(_), o = g[0], r = g[1], l = g[2], v = g[3], u = new Int32Array(L), n = new Int32Array(u.length), t, c, e, d, E, p, D, R, b, O, M, w, U, N, K = this.networkToHostOrderSwap; x < u.length; ) {
              for (b = K(u[x]), O = K(u[x + 1]), M = K(u[x + 2]), w = K(u[x + 3]), E = b ^ h[0], p = w ^ h[1], D = M ^ h[2], R = O ^ h[3], U = 4, N = 1; N < T; N++)
                t = s[E >>> 24] ^ f[p >> 16 & 255] ^ a[D >> 8 & 255] ^ i[R & 255] ^ h[U], c = s[p >>> 24] ^ f[D >> 16 & 255] ^ a[R >> 8 & 255] ^ i[E & 255] ^ h[U + 1], e = s[D >>> 24] ^ f[R >> 16 & 255] ^ a[E >> 8 & 255] ^ i[p & 255] ^ h[U + 2], d = s[R >>> 24] ^ f[E >> 16 & 255] ^ a[p >> 8 & 255] ^ i[D & 255] ^ h[U + 3], E = t, p = c, D = e, R = d, U = U + 4;
              t = y[E >>> 24] << 24 ^ y[p >> 16 & 255] << 16 ^ y[D >> 8 & 255] << 8 ^ y[R & 255] ^ h[U], c = y[p >>> 24] << 24 ^ y[D >> 16 & 255] << 16 ^ y[R >> 8 & 255] << 8 ^ y[E & 255] ^ h[U + 1], e = y[D >>> 24] << 24 ^ y[R >> 16 & 255] << 16 ^ y[E >> 8 & 255] << 8 ^ y[p & 255] ^ h[U + 2], d = y[R >>> 24] << 24 ^ y[E >> 16 & 255] << 16 ^ y[p >> 8 & 255] << 8 ^ y[D & 255] ^ h[U + 3], n[x] = K(t ^ o), n[x + 1] = K(d ^ r), n[x + 2] = K(e ^ l), n[x + 3] = K(c ^ v), o = b, r = O, l = M, v = w, x = x + 4;
            }
            return n.buffer;
          }, I;
        }();
      },
      "./src/crypt/decrypter.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/crypt/aes-crypto.ts"), A = S("./src/crypt/fast-aes-key.ts"), C = S("./src/crypt/aes-decryptor.ts"), I = S("./src/utils/logger.ts"), k = S("./src/utils/mp4-tools.ts"), P = S("./src/utils/typed-array.ts"), L = 16, x = /* @__PURE__ */ function() {
          function _(h, y) {
            var m = y === void 0 ? {} : y, s = m.removePKCS7Padding, f = s === void 0 ? !0 : s;
            if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.useSoftware = h.enableSoftwareAES, this.removePKCS7Padding = f, f)
              try {
                var a = self.crypto;
                a && (this.subtle = a.subtle || a.webkitSubtle);
              } catch (i) {
              }
            this.subtle === null && (this.useSoftware = !0);
          }
          var T = _.prototype;
          return T.destroy = function() {
            this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null;
          }, T.isSync = function() {
            return this.useSoftware;
          }, T.flush = function() {
            var y = this.currentResult, m = this.remainderData;
            if (!y || m)
              return I.logger.error("[softwareDecrypt] " + (m ? "overflow bytes: " + m.byteLength : "no result")), this.reset(), null;
            var s = new Uint8Array(y);
            return this.reset(), this.removePKCS7Padding ? (0, C.removePadding)(s) : s;
          }, T.reset = function() {
            this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
          }, T.decrypt = function(y, m, s) {
            var f = this;
            return this.useSoftware ? new Promise(function(a, i) {
              f.softwareDecrypt(new Uint8Array(y), m, s);
              var g = f.flush();
              g ? a(g.buffer) : i(new Error("[softwareDecrypt] Failed to decrypt data"));
            }) : this.webCryptoDecrypt(new Uint8Array(y), m, s);
          }, T.softwareDecrypt = function(y, m, s) {
            var f = this.currentIV, a = this.currentResult, i = this.remainderData;
            this.logOnce("JS AES decrypt"), i && (y = (0, k.appendUint8Array)(i, y), this.remainderData = null);
            var g = this.getValidChunk(y);
            if (!g.length)
              return null;
            f && (s = f);
            var o = this.softwareDecrypter;
            o || (o = this.softwareDecrypter = new C.default()), o.expandKey(m);
            var r = a;
            return this.currentResult = o.decrypt(g.buffer, 0, s), this.currentIV = (0, P.sliceUint8)(g, -16).buffer, r || null;
          }, T.webCryptoDecrypt = function(y, m, s) {
            var f = this, a = this.subtle;
            return (this.key !== m || !this.fastAesKey) && (this.key = m, this.fastAesKey = new A.default(a, m)), this.fastAesKey.expandKey().then(function(i) {
              if (!a)
                return Promise.reject(new Error("web crypto not initialized"));
              f.logOnce("WebCrypto AES decrypt");
              var g = new F.default(a, new Uint8Array(s));
              return g.decrypt(y.buffer, i);
            }).catch(function(i) {
              return I.logger.warn("[decrypter]: WebCrypto Error, disable WebCrypto API, " + i.name + ": " + i.message), f.onWebCryptoError(y, m, s);
            });
          }, T.onWebCryptoError = function(y, m, s) {
            this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(y, m, s);
            var f = this.flush();
            if (f)
              return f.buffer;
            throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data");
          }, T.getValidChunk = function(y) {
            var m = y, s = y.length - y.length % L;
            return s !== y.length && (m = (0, P.sliceUint8)(y, 0, s), this.remainderData = (0, P.sliceUint8)(y, s)), m;
          }, T.logOnce = function(y) {
            !this.logEnabled || (I.logger.log("[decrypter]: " + y), this.logEnabled = !1);
          }, _;
        }();
      },
      "./src/crypt/fast-aes-key.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        var F = /* @__PURE__ */ function() {
          function A(I, k) {
            this.subtle = void 0, this.key = void 0, this.subtle = I, this.key = k;
          }
          var C = A.prototype;
          return C.expandKey = function() {
            return this.subtle.importKey("raw", this.key, {
              name: "AES-CBC"
            }, !1, ["encrypt", "decrypt"]);
          }, A;
        }();
      },
      "./src/demux/aacdemuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/demux/base-audio-demuxer.ts"), A = S("./src/demux/adts.ts"), C = S("./src/utils/logger.ts"), I = S("./src/demux/id3.ts");
        function k(_, T) {
          _.prototype = Object.create(T.prototype), _.prototype.constructor = _, P(_, T);
        }
        function P(_, T) {
          return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(y, m) {
            return y.__proto__ = m, y;
          }, P(_, T);
        }
        var L = /* @__PURE__ */ function(_) {
          k(T, _);
          function T(y, m) {
            var s;
            return s = _.call(this) || this, s.observer = void 0, s.config = void 0, s.observer = y, s.config = m, s;
          }
          var h = T.prototype;
          return h.resetInitSegment = function(m, s, f, a) {
            _.prototype.resetInitSegment.call(this, m, s, f, a), this._audioTrack = {
              container: "audio/adts",
              type: "audio",
              id: 2,
              pid: -1,
              sequenceNumber: 0,
              segmentCodec: "aac",
              samples: [],
              manifestCodec: s,
              duration: a,
              inputTimeScale: 9e4,
              dropped: 0
            };
          }, T.probe = function(m) {
            if (!m)
              return !1;
            for (var s = I.getID3Data(m, 0) || [], f = s.length, a = m.length; f < a; f++)
              if (A.probe(m, f))
                return C.logger.log("ADTS sync word found !"), !0;
            return !1;
          }, h.canParse = function(m, s) {
            return A.canParse(m, s);
          }, h.appendFrame = function(m, s, f) {
            A.initTrackConfig(m, this.observer, s, f, m.manifestCodec);
            var a = A.appendFrame(m, s, f, this.basePTS, this.frameIndex);
            if (a && a.missing === 0)
              return a;
          }, T;
        }(F.default);
        const x = L;
      },
      "./src/demux/adts.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          appendFrame: () => f,
          canGetFrameLength: () => x,
          canParse: () => T,
          getAudioConfig: () => I,
          getFrameDuration: () => m,
          getFullFrameLength: () => L,
          getHeaderLength: () => P,
          initTrackConfig: () => y,
          isHeader: () => _,
          isHeaderPattern: () => k,
          parseFrameHeader: () => s,
          probe: () => h
        });
        var F = S("./src/utils/logger.ts"), A = S("./src/errors.ts"), C = S("./src/events.ts");
        function I(a, i, g, o) {
          var r, l, v, u, n = navigator.userAgent.toLowerCase(), t = o, c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
          r = ((i[g + 2] & 192) >>> 6) + 1;
          var e = (i[g + 2] & 60) >>> 2;
          if (e > c.length - 1) {
            a.trigger(C.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.FRAG_PARSING_ERROR,
              fatal: !0,
              reason: "invalid ADTS sampling index:" + e
            });
            return;
          }
          return v = (i[g + 2] & 1) << 2, v |= (i[g + 3] & 192) >>> 6, F.logger.log("manifest codec:" + o + ", ADTS type:" + r + ", samplingIndex:" + e), /firefox/i.test(n) ? e >= 6 ? (r = 5, u = new Array(4), l = e - 3) : (r = 2, u = new Array(2), l = e) : n.indexOf("android") !== -1 ? (r = 2, u = new Array(2), l = e) : (r = 5, u = new Array(4), o && (o.indexOf("mp4a.40.29") !== -1 || o.indexOf("mp4a.40.5") !== -1) || !o && e >= 6 ? l = e - 3 : ((o && o.indexOf("mp4a.40.2") !== -1 && (e >= 6 && v === 1 || /vivaldi/i.test(n)) || !o && v === 1) && (r = 2, u = new Array(2)), l = e)), u[0] = r << 3, u[0] |= (e & 14) >> 1, u[1] |= (e & 1) << 7, u[1] |= v << 3, r === 5 && (u[1] |= (l & 14) >> 1, u[2] = (l & 1) << 7, u[2] |= 8, u[3] = 0), {
            config: u,
            samplerate: c[e],
            channelCount: v,
            codec: "mp4a.40." + r,
            manifestCodec: t
          };
        }
        function k(a, i) {
          return a[i] === 255 && (a[i + 1] & 246) === 240;
        }
        function P(a, i) {
          return a[i + 1] & 1 ? 7 : 9;
        }
        function L(a, i) {
          return (a[i + 3] & 3) << 11 | a[i + 4] << 3 | (a[i + 5] & 224) >>> 5;
        }
        function x(a, i) {
          return i + 5 < a.length;
        }
        function _(a, i) {
          return i + 1 < a.length && k(a, i);
        }
        function T(a, i) {
          return x(a, i) && k(a, i) && L(a, i) <= a.length - i;
        }
        function h(a, i) {
          if (_(a, i)) {
            var g = P(a, i);
            if (i + g >= a.length)
              return !1;
            var o = L(a, i);
            if (o <= g)
              return !1;
            var r = i + o;
            return r === a.length || _(a, r);
          }
          return !1;
        }
        function y(a, i, g, o, r) {
          if (!a.samplerate) {
            var l = I(i, g, o, r);
            if (!l)
              return;
            a.config = l.config, a.samplerate = l.samplerate, a.channelCount = l.channelCount, a.codec = l.codec, a.manifestCodec = l.manifestCodec, F.logger.log("parsed codec:" + a.codec + ", rate:" + l.samplerate + ", channels:" + l.channelCount);
          }
        }
        function m(a) {
          return 9216e4 / a;
        }
        function s(a, i) {
          var g = P(a, i);
          if (i + g <= a.length) {
            var o = L(a, i) - g;
            if (o > 0)
              return {
                headerLength: g,
                frameLength: o
              };
          }
        }
        function f(a, i, g, o, r) {
          var l = m(a.samplerate), v = o + r * l, u = s(i, g), n;
          if (u) {
            var t = u.frameLength, c = u.headerLength, e = c + t, d = Math.max(0, g + e - i.length);
            d ? (n = new Uint8Array(e - c), n.set(i.subarray(g + c, i.length), 0)) : n = i.subarray(g + c, g + e);
            var E = {
              unit: n,
              pts: v
            };
            return d || a.samples.push(E), {
              sample: E,
              length: e,
              missing: d
            };
          }
          var p = i.length - g;
          n = new Uint8Array(p), n.set(i.subarray(g, i.length), 0);
          var D = {
            unit: n,
            pts: v
          };
          return {
            sample: D,
            length: p,
            missing: -1
          };
        }
      },
      "./src/demux/base-audio-demuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => _,
          initPTSFn: () => x
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/demux/id3.ts"), C = S("./src/types/demuxer.ts"), I = S("./src/demux/dummy-demuxed-track.ts"), k = S("./src/utils/mp4-tools.ts"), P = S("./src/utils/typed-array.ts"), L = /* @__PURE__ */ function() {
          function T() {
            this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null, this.lastPTS = null;
          }
          var h = T.prototype;
          return h.resetInitSegment = function(m, s, f, a) {
            this._id3Track = {
              type: "id3",
              id: 3,
              pid: -1,
              inputTimeScale: 9e4,
              sequenceNumber: 0,
              samples: [],
              dropped: 0
            };
          }, h.resetTimeStamp = function(m) {
            this.initPTS = m, this.resetContiguity();
          }, h.resetContiguity = function() {
            this.basePTS = null, this.lastPTS = null, this.frameIndex = 0;
          }, h.canParse = function(m, s) {
            return !1;
          }, h.appendFrame = function(m, s, f) {
          }, h.demux = function(m, s) {
            this.cachedData && (m = (0, k.appendUint8Array)(this.cachedData, m), this.cachedData = null);
            var f = A.getID3Data(m, 0), a = f ? f.length : 0, i, g = this._audioTrack, o = this._id3Track, r = f ? A.getTimeStamp(f) : void 0, l = m.length;
            for ((this.basePTS === null || this.frameIndex === 0 && (0, F.isFiniteNumber)(r)) && (this.basePTS = x(r, s, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), f && f.length > 0 && o.samples.push({
              pts: this.lastPTS,
              dts: this.lastPTS,
              data: f,
              type: C.MetadataSchema.audioId3,
              duration: Number.POSITIVE_INFINITY
            }); a < l; ) {
              if (this.canParse(m, a)) {
                var v = this.appendFrame(g, m, a);
                v ? (this.frameIndex++, this.lastPTS = v.sample.pts, a += v.length, i = a) : a = l;
              } else
                A.canParse(m, a) ? (f = A.getID3Data(m, a), o.samples.push({
                  pts: this.lastPTS,
                  dts: this.lastPTS,
                  data: f,
                  type: C.MetadataSchema.audioId3,
                  duration: Number.POSITIVE_INFINITY
                }), a += f.length, i = a) : a++;
              if (a === l && i !== l) {
                var u = (0, P.sliceUint8)(m, i);
                this.cachedData ? this.cachedData = (0, k.appendUint8Array)(this.cachedData, u) : this.cachedData = u;
              }
            }
            return {
              audioTrack: g,
              videoTrack: (0, I.dummyTrack)(),
              id3Track: o,
              textTrack: (0, I.dummyTrack)()
            };
          }, h.demuxSampleAes = function(m, s, f) {
            return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"));
          }, h.flush = function(m) {
            var s = this.cachedData;
            return s && (this.cachedData = null, this.demux(s, 0)), {
              audioTrack: this._audioTrack,
              videoTrack: (0, I.dummyTrack)(),
              id3Track: this._id3Track,
              textTrack: (0, I.dummyTrack)()
            };
          }, h.destroy = function() {
          }, T;
        }(), x = function(h, y, m) {
          return (0, F.isFiniteNumber)(h) ? h * 90 : y * 9e4 + (m || 0);
        };
        const _ = L;
      },
      "./src/demux/chunk-cache.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        var F = /* @__PURE__ */ function() {
          function C() {
            this.chunks = [], this.dataLength = 0;
          }
          var I = C.prototype;
          return I.push = function(P) {
            this.chunks.push(P), this.dataLength += P.length;
          }, I.flush = function() {
            var P = this.chunks, L = this.dataLength, x;
            if (P.length)
              P.length === 1 ? x = P[0] : x = A(P, L);
            else
              return new Uint8Array(0);
            return this.reset(), x;
          }, I.reset = function() {
            this.chunks.length = 0, this.dataLength = 0;
          }, C;
        }();
        function A(C, I) {
          for (var k = new Uint8Array(I), P = 0, L = 0; L < C.length; L++) {
            var x = C[L];
            k.set(x, P), P += x.length;
          }
          return k;
        }
      },
      "./src/demux/dummy-demuxed-track.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          dummyTrack: () => F
        });
        function F(A, C) {
          return A === void 0 && (A = ""), C === void 0 && (C = 9e4), {
            type: A,
            id: -1,
            pid: -1,
            inputTimeScale: C,
            sequenceNumber: -1,
            samples: [],
            dropped: 0
          };
        }
      },
      "./src/demux/exp-golomb.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => C
        });
        var F = S("./src/utils/logger.ts"), A = /* @__PURE__ */ function() {
          function I(P) {
            this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = P, this.bytesAvailable = P.byteLength, this.word = 0, this.bitsAvailable = 0;
          }
          var k = I.prototype;
          return k.loadWord = function() {
            var L = this.data, x = this.bytesAvailable, _ = L.byteLength - x, T = new Uint8Array(4), h = Math.min(4, x);
            if (h === 0)
              throw new Error("no bytes available");
            T.set(L.subarray(_, _ + h)), this.word = new DataView(T.buffer).getUint32(0), this.bitsAvailable = h * 8, this.bytesAvailable -= h;
          }, k.skipBits = function(L) {
            var x;
            L = Math.min(L, this.bytesAvailable * 8 + this.bitsAvailable), this.bitsAvailable > L ? (this.word <<= L, this.bitsAvailable -= L) : (L -= this.bitsAvailable, x = L >> 3, L -= x << 3, this.bytesAvailable -= x, this.loadWord(), this.word <<= L, this.bitsAvailable -= L);
          }, k.readBits = function(L) {
            var x = Math.min(this.bitsAvailable, L), _ = this.word >>> 32 - x;
            if (L > 32 && F.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= x, this.bitsAvailable > 0)
              this.word <<= x;
            else if (this.bytesAvailable > 0)
              this.loadWord();
            else
              throw new Error("no bits available");
            return x = L - x, x > 0 && this.bitsAvailable ? _ << x | this.readBits(x) : _;
          }, k.skipLZ = function() {
            var L;
            for (L = 0; L < this.bitsAvailable; ++L)
              if ((this.word & 2147483648 >>> L) !== 0)
                return this.word <<= L, this.bitsAvailable -= L, L;
            return this.loadWord(), L + this.skipLZ();
          }, k.skipUEG = function() {
            this.skipBits(1 + this.skipLZ());
          }, k.skipEG = function() {
            this.skipBits(1 + this.skipLZ());
          }, k.readUEG = function() {
            var L = this.skipLZ();
            return this.readBits(L + 1) - 1;
          }, k.readEG = function() {
            var L = this.readUEG();
            return 1 & L ? 1 + L >>> 1 : -1 * (L >>> 1);
          }, k.readBoolean = function() {
            return this.readBits(1) === 1;
          }, k.readUByte = function() {
            return this.readBits(8);
          }, k.readUShort = function() {
            return this.readBits(16);
          }, k.readUInt = function() {
            return this.readBits(32);
          }, k.skipScalingList = function(L) {
            for (var x = 8, _ = 8, T, h = 0; h < L; h++)
              _ !== 0 && (T = this.readEG(), _ = (x + T + 256) % 256), x = _ === 0 ? x : _;
          }, k.readSPS = function() {
            var L = 0, x = 0, _ = 0, T = 0, h, y, m, s = this.readUByte.bind(this), f = this.readBits.bind(this), a = this.readUEG.bind(this), i = this.readBoolean.bind(this), g = this.skipBits.bind(this), o = this.skipEG.bind(this), r = this.skipUEG.bind(this), l = this.skipScalingList.bind(this);
            s();
            var v = s();
            if (f(5), g(3), s(), r(), v === 100 || v === 110 || v === 122 || v === 244 || v === 44 || v === 83 || v === 86 || v === 118 || v === 128) {
              var u = a();
              if (u === 3 && g(1), r(), r(), g(1), i())
                for (y = u !== 3 ? 8 : 12, m = 0; m < y; m++)
                  i() && (m < 6 ? l(16) : l(64));
            }
            r();
            var n = a();
            if (n === 0)
              a();
            else if (n === 1)
              for (g(1), o(), o(), h = a(), m = 0; m < h; m++)
                o();
            r(), g(1);
            var t = a(), c = a(), e = f(1);
            e === 0 && g(1), g(1), i() && (L = a(), x = a(), _ = a(), T = a());
            var d = [1, 1];
            if (i() && i()) {
              var E = s();
              switch (E) {
                case 1:
                  d = [1, 1];
                  break;
                case 2:
                  d = [12, 11];
                  break;
                case 3:
                  d = [10, 11];
                  break;
                case 4:
                  d = [16, 11];
                  break;
                case 5:
                  d = [40, 33];
                  break;
                case 6:
                  d = [24, 11];
                  break;
                case 7:
                  d = [20, 11];
                  break;
                case 8:
                  d = [32, 11];
                  break;
                case 9:
                  d = [80, 33];
                  break;
                case 10:
                  d = [18, 11];
                  break;
                case 11:
                  d = [15, 11];
                  break;
                case 12:
                  d = [64, 33];
                  break;
                case 13:
                  d = [160, 99];
                  break;
                case 14:
                  d = [4, 3];
                  break;
                case 15:
                  d = [3, 2];
                  break;
                case 16:
                  d = [2, 1];
                  break;
                case 255: {
                  d = [s() << 8 | s(), s() << 8 | s()];
                  break;
                }
              }
            }
            return {
              width: Math.ceil((t + 1) * 16 - L * 2 - x * 2),
              height: (2 - e) * (c + 1) * 16 - (e ? 2 : 4) * (_ + T),
              pixelRatio: d
            };
          }, k.readSliceType = function() {
            return this.readUByte(), this.readUEG(), this.readUEG();
          }, I;
        }();
        const C = A;
      },
      "./src/demux/id3.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          canParse: () => k,
          decodeFrame: () => T,
          getID3Data: () => C,
          getID3Frames: () => _,
          getTimeStamp: () => P,
          isFooter: () => A,
          isHeader: () => F,
          isTimeStampFrame: () => L,
          testables: () => a,
          utf8ArrayToStr: () => f
        });
        var F = function(r, l) {
          return l + 10 <= r.length && r[l] === 73 && r[l + 1] === 68 && r[l + 2] === 51 && r[l + 3] < 255 && r[l + 4] < 255 && r[l + 6] < 128 && r[l + 7] < 128 && r[l + 8] < 128 && r[l + 9] < 128;
        }, A = function(r, l) {
          return l + 10 <= r.length && r[l] === 51 && r[l + 1] === 68 && r[l + 2] === 73 && r[l + 3] < 255 && r[l + 4] < 255 && r[l + 6] < 128 && r[l + 7] < 128 && r[l + 8] < 128 && r[l + 9] < 128;
        }, C = function(r, l) {
          for (var v = l, u = 0; F(r, l); ) {
            u += 10;
            var n = I(r, l + 6);
            u += n, A(r, l + 10) && (u += 10), l += u;
          }
          if (u > 0)
            return r.subarray(v, v + u);
        }, I = function(r, l) {
          var v = 0;
          return v = (r[l] & 127) << 21, v |= (r[l + 1] & 127) << 14, v |= (r[l + 2] & 127) << 7, v |= r[l + 3] & 127, v;
        }, k = function(r, l) {
          return F(r, l) && I(r, l + 6) + 10 <= r.length - l;
        }, P = function(r) {
          for (var l = _(r), v = 0; v < l.length; v++) {
            var u = l[v];
            if (L(u))
              return s(u);
          }
        }, L = function(r) {
          return r && r.key === "PRIV" && r.info === "com.apple.streaming.transportStreamTimestamp";
        }, x = function(r) {
          var l = String.fromCharCode(r[0], r[1], r[2], r[3]), v = I(r, 4), u = 10;
          return {
            type: l,
            size: v,
            data: r.subarray(u, u + v)
          };
        }, _ = function(r) {
          for (var l = 0, v = []; F(r, l); ) {
            var u = I(r, l + 6);
            l += 10;
            for (var n = l + u; l + 8 < n; ) {
              var t = x(r.subarray(l)), c = T(t);
              c && v.push(c), l += t.size + 10;
            }
            A(r, l) && (l += 10);
          }
          return v;
        }, T = function(r) {
          return r.type === "PRIV" ? h(r) : r.type[0] === "W" ? m(r) : y(r);
        }, h = function(r) {
          if (!(r.size < 2)) {
            var l = f(r.data, !0), v = new Uint8Array(r.data.subarray(l.length + 1));
            return {
              key: r.type,
              info: l,
              data: v.buffer
            };
          }
        }, y = function(r) {
          if (!(r.size < 2)) {
            if (r.type === "TXXX") {
              var l = 1, v = f(r.data.subarray(l), !0);
              l += v.length + 1;
              var u = f(r.data.subarray(l));
              return {
                key: r.type,
                info: v,
                data: u
              };
            }
            var n = f(r.data.subarray(1));
            return {
              key: r.type,
              data: n
            };
          }
        }, m = function(r) {
          if (r.type === "WXXX") {
            if (r.size < 2)
              return;
            var l = 1, v = f(r.data.subarray(l), !0);
            l += v.length + 1;
            var u = f(r.data.subarray(l));
            return {
              key: r.type,
              info: v,
              data: u
            };
          }
          var n = f(r.data);
          return {
            key: r.type,
            data: n
          };
        }, s = function(r) {
          if (r.data.byteLength === 8) {
            var l = new Uint8Array(r.data), v = l[3] & 1, u = (l[4] << 23) + (l[5] << 15) + (l[6] << 7) + l[7];
            return u /= 45, v && (u += 4772185884e-2), Math.round(u);
          }
        }, f = function(r, l) {
          l === void 0 && (l = !1);
          var v = g();
          if (v) {
            var u = v.decode(r);
            if (l) {
              var n = u.indexOf("\0");
              return n !== -1 ? u.substring(0, n) : u;
            }
            return u.replace(/\0/g, "");
          }
          for (var t = r.length, c, e, d, E = "", p = 0; p < t; ) {
            if (c = r[p++], c === 0 && l)
              return E;
            if (c === 0 || c === 3)
              continue;
            switch (c >> 4) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                E += String.fromCharCode(c);
                break;
              case 12:
              case 13:
                e = r[p++], E += String.fromCharCode((c & 31) << 6 | e & 63);
                break;
              case 14:
                e = r[p++], d = r[p++], E += String.fromCharCode((c & 15) << 12 | (e & 63) << 6 | (d & 63) << 0);
                break;
            }
          }
          return E;
        }, a = {
          decodeTextFrame: y
        }, i;
        function g() {
          return !i && typeof self.TextDecoder != "undefined" && (i = new self.TextDecoder("utf-8")), i;
        }
      },
      "./src/demux/mp3demuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/demux/base-audio-demuxer.ts"), A = S("./src/demux/id3.ts"), C = S("./src/utils/logger.ts"), I = S("./src/demux/mpegaudio.ts");
        function k(_, T) {
          _.prototype = Object.create(T.prototype), _.prototype.constructor = _, P(_, T);
        }
        function P(_, T) {
          return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(y, m) {
            return y.__proto__ = m, y;
          }, P(_, T);
        }
        var L = /* @__PURE__ */ function(_) {
          k(T, _);
          function T() {
            return _.apply(this, arguments) || this;
          }
          var h = T.prototype;
          return h.resetInitSegment = function(m, s, f, a) {
            _.prototype.resetInitSegment.call(this, m, s, f, a), this._audioTrack = {
              container: "audio/mpeg",
              type: "audio",
              id: 2,
              pid: -1,
              sequenceNumber: 0,
              segmentCodec: "mp3",
              samples: [],
              manifestCodec: s,
              duration: a,
              inputTimeScale: 9e4,
              dropped: 0
            };
          }, T.probe = function(m) {
            if (!m)
              return !1;
            for (var s = A.getID3Data(m, 0) || [], f = s.length, a = m.length; f < a; f++)
              if (I.probe(m, f))
                return C.logger.log("MPEG Audio sync word found !"), !0;
            return !1;
          }, h.canParse = function(m, s) {
            return I.canParse(m, s);
          }, h.appendFrame = function(m, s, f) {
            if (this.basePTS !== null)
              return I.appendFrame(m, s, f, this.basePTS, this.frameIndex);
          }, T;
        }(F.default);
        const x = L;
      },
      "./src/demux/mp4demuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => L
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/types/demuxer.ts"), C = S("./src/utils/mp4-tools.ts"), I = S("./src/demux/dummy-demuxed-track.ts"), k = /\/emsg[-/]ID3/i, P = /* @__PURE__ */ function() {
          function x(T, h) {
            this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = h;
          }
          var _ = x.prototype;
          return _.resetTimeStamp = function() {
          }, _.resetInitSegment = function(h, y, m, s) {
            var f = this.videoTrack = (0, I.dummyTrack)("video", 1), a = this.audioTrack = (0, I.dummyTrack)("audio", 1), i = this.txtTrack = (0, I.dummyTrack)("text", 1);
            if (this.id3Track = (0, I.dummyTrack)("id3", 1), this.timeOffset = 0, !(!h || !h.byteLength)) {
              var g = (0, C.parseInitSegment)(h);
              if (g.video) {
                var o = g.video, r = o.id, l = o.timescale, v = o.codec;
                f.id = r, f.timescale = i.timescale = l, f.codec = v;
              }
              if (g.audio) {
                var u = g.audio, n = u.id, t = u.timescale, c = u.codec;
                a.id = n, a.timescale = t, a.codec = c;
              }
              i.id = C.RemuxerTrackIdConfig.text, f.sampleDuration = 0, f.duration = a.duration = s;
            }
          }, _.resetContiguity = function() {
          }, x.probe = function(h) {
            return h = h.length > 16384 ? h.subarray(0, 16384) : h, (0, C.findBox)(h, ["moof"]).length > 0;
          }, _.demux = function(h, y) {
            this.timeOffset = y;
            var m = h, s = this.videoTrack, f = this.txtTrack;
            if (this.config.progressive) {
              this.remainderData && (m = (0, C.appendUint8Array)(this.remainderData, h));
              var a = (0, C.segmentValidRange)(m);
              this.remainderData = a.remainder, s.samples = a.valid || new Uint8Array();
            } else
              s.samples = m;
            var i = this.extractID3Track(s, y);
            return f.samples = (0, C.parseSamples)(y, s), {
              videoTrack: s,
              audioTrack: this.audioTrack,
              id3Track: i,
              textTrack: this.txtTrack
            };
          }, _.flush = function() {
            var h = this.timeOffset, y = this.videoTrack, m = this.txtTrack;
            y.samples = this.remainderData || new Uint8Array(), this.remainderData = null;
            var s = this.extractID3Track(y, this.timeOffset);
            return m.samples = (0, C.parseSamples)(h, y), {
              videoTrack: y,
              audioTrack: (0, I.dummyTrack)(),
              id3Track: s,
              textTrack: (0, I.dummyTrack)()
            };
          }, _.extractID3Track = function(h, y) {
            var m = this.id3Track;
            if (h.samples.length) {
              var s = (0, C.findBox)(h.samples, ["emsg"]);
              s && s.forEach(function(f) {
                var a = (0, C.parseEmsg)(f);
                if (k.test(a.schemeIdUri)) {
                  var i = (0, F.isFiniteNumber)(a.presentationTime) ? a.presentationTime / a.timeScale : y + a.presentationTimeDelta / a.timeScale, g = a.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : a.eventDuration / a.timeScale;
                  g <= 1e-3 && (g = Number.POSITIVE_INFINITY);
                  var o = a.payload;
                  m.samples.push({
                    data: o,
                    len: o.byteLength,
                    dts: i,
                    pts: i,
                    type: A.MetadataSchema.emsg,
                    duration: g
                  });
                }
              });
            }
            return m;
          }, _.demuxSampleAes = function(h, y, m) {
            return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"));
          }, _.destroy = function() {
          }, x;
        }();
        const L = P;
      },
      "./src/demux/mpegaudio.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          appendFrame: () => P,
          canParse: () => T,
          isHeader: () => _,
          isHeaderPattern: () => x,
          parseHeader: () => L,
          probe: () => h
        });
        var F = null, A = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], C = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3], I = [
          [
            0,
            72,
            144,
            12
          ],
          [
            0,
            0,
            0,
            0
          ],
          [
            0,
            72,
            144,
            12
          ],
          [
            0,
            144,
            144,
            12
          ]
        ], k = [
          0,
          1,
          1,
          4
        ];
        function P(y, m, s, f, a) {
          if (!(s + 24 > m.length)) {
            var i = L(m, s);
            if (i && s + i.frameLength <= m.length) {
              var g = i.samplesPerFrame * 9e4 / i.sampleRate, o = f + a * g, r = {
                unit: m.subarray(s, s + i.frameLength),
                pts: o,
                dts: o
              };
              return y.config = [], y.channelCount = i.channelCount, y.samplerate = i.sampleRate, y.samples.push(r), {
                sample: r,
                length: i.frameLength,
                missing: 0
              };
            }
          }
        }
        function L(y, m) {
          var s = y[m + 1] >> 3 & 3, f = y[m + 1] >> 1 & 3, a = y[m + 2] >> 4 & 15, i = y[m + 2] >> 2 & 3;
          if (s !== 1 && a !== 0 && a !== 15 && i !== 3) {
            var g = y[m + 2] >> 1 & 1, o = y[m + 3] >> 6, r = s === 3 ? 3 - f : f === 3 ? 3 : 4, l = A[r * 14 + a - 1] * 1e3, v = s === 3 ? 0 : s === 2 ? 1 : 2, u = C[v * 3 + i], n = o === 3 ? 1 : 2, t = I[s][f], c = k[f], e = t * 8 * c, d = Math.floor(t * l / u + g) * c;
            if (F === null) {
              var E = navigator.userAgent || "", p = E.match(/Chrome\/(\d+)/i);
              F = p ? parseInt(p[1]) : 0;
            }
            var D = !!F && F <= 87;
            return D && f === 2 && l >= 224e3 && o === 0 && (y[m + 3] = y[m + 3] | 128), {
              sampleRate: u,
              channelCount: n,
              frameLength: d,
              samplesPerFrame: e
            };
          }
        }
        function x(y, m) {
          return y[m] === 255 && (y[m + 1] & 224) === 224 && (y[m + 1] & 6) !== 0;
        }
        function _(y, m) {
          return m + 1 < y.length && x(y, m);
        }
        function T(y, m) {
          var s = 4;
          return x(y, m) && s <= y.length - m;
        }
        function h(y, m) {
          if (m + 1 < y.length && x(y, m)) {
            var s = 4, f = L(y, m), a = s;
            f != null && f.frameLength && (a = f.frameLength);
            var i = m + a;
            return i === y.length || _(y, i);
          }
          return !1;
        }
      },
      "./src/demux/sample-aes.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => I
        });
        var F = S("./src/crypt/decrypter.ts"), A = S("./src/utils/mp4-tools.ts"), C = /* @__PURE__ */ function() {
          function k(L, x, _) {
            this.keyData = void 0, this.decrypter = void 0, this.keyData = _, this.decrypter = new F.default(x, {
              removePKCS7Padding: !1
            });
          }
          var P = k.prototype;
          return P.decryptBuffer = function(x) {
            return this.decrypter.decrypt(x, this.keyData.key.buffer, this.keyData.iv.buffer);
          }, P.decryptAacSample = function(x, _, T) {
            var h = this, y = x[_].unit;
            if (!(y.length <= 16)) {
              var m = y.subarray(16, y.length - y.length % 16), s = m.buffer.slice(m.byteOffset, m.byteOffset + m.length);
              this.decryptBuffer(s).then(function(f) {
                var a = new Uint8Array(f);
                y.set(a, 16), h.decrypter.isSync() || h.decryptAacSamples(x, _ + 1, T);
              });
            }
          }, P.decryptAacSamples = function(x, _, T) {
            for (; ; _++) {
              if (_ >= x.length) {
                T();
                return;
              }
              if (!(x[_].unit.length < 32) && (this.decryptAacSample(x, _, T), !this.decrypter.isSync()))
                return;
            }
          }, P.getAvcEncryptedData = function(x) {
            for (var _ = Math.floor((x.length - 48) / 160) * 16 + 16, T = new Int8Array(_), h = 0, y = 32; y < x.length - 16; y += 160, h += 16)
              T.set(x.subarray(y, y + 16), h);
            return T;
          }, P.getAvcDecryptedUnit = function(x, _) {
            for (var T = new Uint8Array(_), h = 0, y = 32; y < x.length - 16; y += 160, h += 16)
              x.set(T.subarray(h, h + 16), y);
            return x;
          }, P.decryptAvcSample = function(x, _, T, h, y) {
            var m = this, s = (0, A.discardEPB)(y.data), f = this.getAvcEncryptedData(s);
            this.decryptBuffer(f.buffer).then(function(a) {
              y.data = m.getAvcDecryptedUnit(s, a), m.decrypter.isSync() || m.decryptAvcSamples(x, _, T + 1, h);
            });
          }, P.decryptAvcSamples = function(x, _, T, h) {
            if (x instanceof Uint8Array)
              throw new Error("Cannot decrypt samples of type Uint8Array");
            for (; ; _++, T = 0) {
              if (_ >= x.length) {
                h();
                return;
              }
              for (var y = x[_].units; !(T >= y.length); T++) {
                var m = y[T];
                if (!(m.data.length <= 48 || m.type !== 1 && m.type !== 5) && (this.decryptAvcSample(x, _, T, h, m), !this.decrypter.isSync()))
                  return;
              }
            }
          }, k;
        }();
        const I = C;
      },
      "./src/demux/transmuxer-interface.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => _
        });
        var F = S("./src/demux/webworkify-webpack.js"), A = S("./src/events.ts"), C = S("./src/demux/transmuxer.ts"), I = S("./src/utils/logger.ts"), k = S("./src/errors.ts"), P = S("./src/utils/mediasource-helper.ts"), L = S("./node_modules/eventemitter3/index.js"), x = (0, P.getMediaSource)() || {
          isTypeSupported: function() {
            return !1;
          }
        }, _ = /* @__PURE__ */ function() {
          function T(y, m, s, f) {
            var a = this;
            this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
            var i = y.config;
            this.hls = y, this.id = m, this.useWorker = !!i.enableWorker, this.onTransmuxComplete = s, this.onFlush = f;
            var g = function(u, n) {
              n = n || {}, n.frag = a.frag, n.id = a.id, a.hls.trigger(u, n);
            };
            this.observer = new L.EventEmitter(), this.observer.on(A.Events.FRAG_DECRYPTED, g), this.observer.on(A.Events.ERROR, g);
            var o = {
              mp4: x.isTypeSupported("video/mp4"),
              mpeg: x.isTypeSupported("audio/mpeg"),
              mp3: x.isTypeSupported('audio/mp4; codecs="mp3"')
            }, r = navigator.vendor;
            if (this.useWorker && typeof Worker != "undefined") {
              I.logger.log("demuxing in webworker");
              var l;
              try {
                l = this.worker = (0, F.default)("./src/demux/transmuxer-worker.ts"), this.onwmsg = this.onWorkerMessage.bind(this), l.addEventListener("message", this.onwmsg), l.onerror = function(v) {
                  a.useWorker = !1, I.logger.warn("Exception in webworker, fallback to inline"), a.hls.trigger(A.Events.ERROR, {
                    type: k.ErrorTypes.OTHER_ERROR,
                    details: k.ErrorDetails.INTERNAL_EXCEPTION,
                    fatal: !1,
                    event: "demuxerWorker",
                    error: new Error(v.message + "  (" + v.filename + ":" + v.lineno + ")")
                  });
                }, l.postMessage({
                  cmd: "init",
                  typeSupported: o,
                  vendor: r,
                  id: m,
                  config: JSON.stringify(i)
                });
              } catch (v) {
                I.logger.warn("Error in worker:", v), I.logger.error("Error while initializing DemuxerWorker, fallback to inline"), l && self.URL.revokeObjectURL(l.objectURL), this.transmuxer = new C.default(this.observer, o, i, r, m), this.worker = null;
              }
            } else
              this.transmuxer = new C.default(this.observer, o, i, r, m);
          }
          var h = T.prototype;
          return h.destroy = function() {
            var m = this.worker;
            if (m)
              m.removeEventListener("message", this.onwmsg), m.terminate(), this.worker = null, this.onwmsg = void 0;
            else {
              var s = this.transmuxer;
              s && (s.destroy(), this.transmuxer = null);
            }
            var f = this.observer;
            f && f.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null;
          }, h.push = function(m, s, f, a, i, g, o, r, l, v) {
            var u, n, t = this;
            l.transmuxing.start = self.performance.now();
            var c = this.transmuxer, e = this.worker, d = g ? g.start : i.start, E = i.decryptdata, p = this.frag, D = !(p && i.cc === p.cc), R = !(p && l.level === p.level), b = p ? l.sn - p.sn : -1, O = this.part ? l.part - this.part.index : -1, M = b === 0 && l.id > 1 && l.id === (p == null ? void 0 : p.stats.chunkCount), w = !R && (b === 1 || b === 0 && (O === 1 || M && O <= 0)), U = self.performance.now();
            (R || b || i.stats.parsing.start === 0) && (i.stats.parsing.start = U), g && (O || !w) && (g.stats.parsing.start = U);
            var N = !(p && ((u = i.initSegment) === null || u === void 0 ? void 0 : u.url) === ((n = p.initSegment) === null || n === void 0 ? void 0 : n.url)), K = new C.TransmuxState(D, w, r, R, d, N);
            if (!w || D || N) {
              I.logger.log("[transmuxer-interface, " + i.type + "]: Starting new transmux session for sn: " + l.sn + " p: " + l.part + " level: " + l.level + " id: " + l.id + `
        discontinuity: ` + D + `
        trackSwitch: ` + R + `
        contiguous: ` + w + `
        accurateTimeOffset: ` + r + `
        timeOffset: ` + d + `
        initSegmentChange: ` + N);
              var W = new C.TransmuxConfig(f, a, s, o, v);
              this.configureTransmuxer(W);
            }
            if (this.frag = i, this.part = g, e)
              e.postMessage({
                cmd: "demux",
                data: m,
                decryptdata: E,
                chunkMeta: l,
                state: K
              }, m instanceof ArrayBuffer ? [m] : []);
            else if (c) {
              var G = c.push(m, E, l, K);
              (0, C.isPromise)(G) ? (c.async = !0, G.then(function(j) {
                t.handleTransmuxComplete(j);
              }).catch(function(j) {
                t.transmuxerError(j, l, "transmuxer-interface push error");
              })) : (c.async = !1, this.handleTransmuxComplete(G));
            }
          }, h.flush = function(m) {
            var s = this;
            m.transmuxing.start = self.performance.now();
            var f = this.transmuxer, a = this.worker;
            if (a)
              a.postMessage({
                cmd: "flush",
                chunkMeta: m
              });
            else if (f) {
              var i = f.flush(m), g = (0, C.isPromise)(i);
              g || f.async ? ((0, C.isPromise)(i) || (i = Promise.resolve(i)), i.then(function(o) {
                s.handleFlushResult(o, m);
              }).catch(function(o) {
                s.transmuxerError(o, m, "transmuxer-interface flush error");
              })) : this.handleFlushResult(i, m);
            }
          }, h.transmuxerError = function(m, s, f) {
            !this.hls || this.hls.trigger(A.Events.ERROR, {
              type: k.ErrorTypes.MEDIA_ERROR,
              details: k.ErrorDetails.FRAG_PARSING_ERROR,
              chunkMeta: s,
              fatal: !1,
              error: m,
              err: m,
              reason: f
            });
          }, h.handleFlushResult = function(m, s) {
            var f = this;
            m.forEach(function(a) {
              f.handleTransmuxComplete(a);
            }), this.onFlush(s);
          }, h.onWorkerMessage = function(m) {
            var s = m.data, f = this.hls;
            switch (s.event) {
              case "init": {
                self.URL.revokeObjectURL(this.worker.objectURL);
                break;
              }
              case "transmuxComplete": {
                this.handleTransmuxComplete(s.data);
                break;
              }
              case "flush": {
                this.onFlush(s.data);
                break;
              }
              case "workerLog":
                I.logger[s.data.logType] && I.logger[s.data.logType](s.data.message);
                break;
              default: {
                s.data = s.data || {}, s.data.frag = this.frag, s.data.id = this.id, f.trigger(s.event, s.data);
                break;
              }
            }
          }, h.configureTransmuxer = function(m) {
            var s = this.worker, f = this.transmuxer;
            s ? s.postMessage({
              cmd: "configure",
              config: m
            }) : f && f.configure(m);
          }, h.handleTransmuxComplete = function(m) {
            m.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(m);
          }, T;
        }();
      },
      "./src/demux/transmuxer-worker.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => P
        });
        var F = S("./src/demux/transmuxer.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts"), I = S("./node_modules/eventemitter3/index.js"), k = S("./src/errors.ts");
        function P(h) {
          var y = new I.EventEmitter(), m = function(a, i) {
            h.postMessage({
              event: a,
              data: i
            });
          };
          y.on(A.Events.FRAG_DECRYPTED, m), y.on(A.Events.ERROR, m);
          var s = function() {
            var a = function(o) {
              var r = function(v) {
                m("workerLog", {
                  logType: o,
                  message: v
                });
              };
              C.logger[o] = r;
            };
            for (var i in C.logger)
              a(i);
          };
          h.addEventListener("message", function(f) {
            var a = f.data;
            switch (a.cmd) {
              case "init": {
                var i = JSON.parse(a.config);
                h.transmuxer = new F.default(y, a.typeSupported, i, a.vendor, a.id), (0, C.enableLogs)(i.debug, a.id), s(), m("init", null);
                break;
              }
              case "configure": {
                h.transmuxer.configure(a.config);
                break;
              }
              case "demux": {
                var g = h.transmuxer.push(a.data, a.decryptdata, a.chunkMeta, a.state);
                (0, F.isPromise)(g) ? (h.transmuxer.async = !0, g.then(function(v) {
                  L(h, v);
                }).catch(function(v) {
                  m(A.Events.ERROR, {
                    type: k.ErrorTypes.MEDIA_ERROR,
                    details: k.ErrorDetails.FRAG_PARSING_ERROR,
                    chunkMeta: a.chunkMeta,
                    fatal: !1,
                    error: v,
                    err: v,
                    reason: "transmuxer-worker push error"
                  });
                })) : (h.transmuxer.async = !1, L(h, g));
                break;
              }
              case "flush": {
                var o = a.chunkMeta, r = h.transmuxer.flush(o), l = (0, F.isPromise)(r);
                l || h.transmuxer.async ? ((0, F.isPromise)(r) || (r = Promise.resolve(r)), r.then(function(v) {
                  _(h, v, o);
                }).catch(function(v) {
                  m(A.Events.ERROR, {
                    type: k.ErrorTypes.MEDIA_ERROR,
                    details: k.ErrorDetails.FRAG_PARSING_ERROR,
                    chunkMeta: a.chunkMeta,
                    fatal: !1,
                    error: v,
                    err: v,
                    reason: "transmuxer-worker flush error"
                  });
                })) : _(h, r, o);
                break;
              }
            }
          });
        }
        function L(h, y) {
          if (T(y.remuxResult))
            return !1;
          var m = [], s = y.remuxResult, f = s.audio, a = s.video;
          return f && x(m, f), a && x(m, a), h.postMessage({
            event: "transmuxComplete",
            data: y
          }, m), !0;
        }
        function x(h, y) {
          y.data1 && h.push(y.data1.buffer), y.data2 && h.push(y.data2.buffer);
        }
        function _(h, y, m) {
          var s = y.reduce(function(f, a) {
            return L(h, a) || f;
          }, !1);
          s || h.postMessage({
            event: "transmuxComplete",
            data: y[0]
          }), h.postMessage({
            event: "flush",
            data: m
          });
        }
        function T(h) {
          return !h.audio && !h.video && !h.text && !h.id3 && !h.initSegment;
        }
      },
      "./src/demux/transmuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          TransmuxConfig: () => i,
          TransmuxState: () => g,
          default: () => m,
          isPromise: () => a
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/crypt/decrypter.ts"), I = S("./src/demux/aacdemuxer.ts"), k = S("./src/demux/mp4demuxer.ts"), P = S("./src/demux/tsdemuxer.ts"), L = S("./src/demux/mp3demuxer.ts"), x = S("./src/remux/mp4-remuxer.ts"), _ = S("./src/remux/passthrough-remuxer.ts"), T = S("./src/utils/logger.ts"), h;
        try {
          h = self.performance.now.bind(self.performance);
        } catch (o) {
          T.logger.debug("Unable to use Performance API on this environment"), h = self.Date.now;
        }
        var y = [{
          demux: P.default,
          remux: x.default
        }, {
          demux: k.default,
          remux: _.default
        }, {
          demux: I.default,
          remux: x.default
        }, {
          demux: L.default,
          remux: x.default
        }], m = /* @__PURE__ */ function() {
          function o(l, v, u, n, t) {
            this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = l, this.typeSupported = v, this.config = u, this.vendor = n, this.id = t;
          }
          var r = o.prototype;
          return r.configure = function(v) {
            this.transmuxConfig = v, this.decrypter && this.decrypter.reset();
          }, r.push = function(v, u, n, t) {
            var c = this, e = n.transmuxing;
            e.executeStart = h();
            var d = new Uint8Array(v), E = this.currentTransmuxState, p = this.transmuxConfig;
            t && (this.currentTransmuxState = t);
            var D = t || E, R = D.contiguous, b = D.discontinuity, O = D.trackSwitch, M = D.accurateTimeOffset, w = D.timeOffset, U = D.initSegmentChange, N = p.audioCodec, K = p.videoCodec, W = p.defaultInitPts, G = p.duration, j = p.initSegmentData, H = s(d, u);
            if (H && H.method === "AES-128") {
              var X = this.getDecrypter();
              if (X.isSync()) {
                var Z = X.softwareDecrypt(d, H.key.buffer, H.iv.buffer);
                if (!Z)
                  return e.executeEnd = h(), f(n);
                d = new Uint8Array(Z);
              } else
                return this.decryptionPromise = X.webCryptoDecrypt(d, H.key.buffer, H.iv.buffer).then(function(q) {
                  var ie = c.push(q, null, n);
                  return c.decryptionPromise = null, ie;
                }), this.decryptionPromise;
            }
            var J = this.needsProbing(b, O);
            J && this.configureTransmuxer(d), (b || O || U || J) && this.resetInitSegment(j, N, K, G, u), (b || U || J) && this.resetInitialTimestamp(W), R || this.resetContiguity();
            var $ = this.transmux(d, H, w, M, n), z = this.currentTransmuxState;
            return z.contiguous = !0, z.discontinuity = !1, z.trackSwitch = !1, e.executeEnd = h(), $;
          }, r.flush = function(v) {
            var u = this, n = v.transmuxing;
            n.executeStart = h();
            var t = this.decrypter, c = this.currentTransmuxState, e = this.decryptionPromise;
            if (e)
              return e.then(function() {
                return u.flush(v);
              });
            var d = [], E = c.timeOffset;
            if (t) {
              var p = t.flush();
              p && d.push(this.push(p, null, v));
            }
            var D = this.demuxer, R = this.remuxer;
            if (!D || !R)
              return this.observer.emit(F.Events.ERROR, F.Events.ERROR, {
                type: A.ErrorTypes.MEDIA_ERROR,
                details: A.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "no demux matching with content found"
              }), n.executeEnd = h(), [f(v)];
            var b = D.flush(E);
            return a(b) ? b.then(function(O) {
              return u.flushRemux(d, O, v), d;
            }) : (this.flushRemux(d, b, v), d);
          }, r.flushRemux = function(v, u, n) {
            var t = u.audioTrack, c = u.videoTrack, e = u.id3Track, d = u.textTrack, E = this.currentTransmuxState, p = E.accurateTimeOffset, D = E.timeOffset;
            T.logger.log("[transmuxer.ts]: Flushed fragment " + n.sn + (n.part > -1 ? " p: " + n.part : "") + " of level " + n.level);
            var R = this.remuxer.remux(t, c, e, d, D, p, !0, this.id);
            v.push({
              remuxResult: R,
              chunkMeta: n
            }), n.transmuxing.executeEnd = h();
          }, r.resetInitialTimestamp = function(v) {
            var u = this.demuxer, n = this.remuxer;
            !u || !n || (u.resetTimeStamp(v), n.resetTimeStamp(v));
          }, r.resetContiguity = function() {
            var v = this.demuxer, u = this.remuxer;
            !v || !u || (v.resetContiguity(), u.resetNextTimestamp());
          }, r.resetInitSegment = function(v, u, n, t, c) {
            var e = this.demuxer, d = this.remuxer;
            !e || !d || (e.resetInitSegment(v, u, n, t), d.resetInitSegment(v, u, n, c));
          }, r.destroy = function() {
            this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
          }, r.transmux = function(v, u, n, t, c) {
            var e;
            return u && u.method === "SAMPLE-AES" ? e = this.transmuxSampleAes(v, u, n, t, c) : e = this.transmuxUnencrypted(v, n, t, c), e;
          }, r.transmuxUnencrypted = function(v, u, n, t) {
            var c = this.demuxer.demux(v, u, !1, !this.config.progressive), e = c.audioTrack, d = c.videoTrack, E = c.id3Track, p = c.textTrack, D = this.remuxer.remux(e, d, E, p, u, n, !1, this.id);
            return {
              remuxResult: D,
              chunkMeta: t
            };
          }, r.transmuxSampleAes = function(v, u, n, t, c) {
            var e = this;
            return this.demuxer.demuxSampleAes(v, u, n).then(function(d) {
              var E = e.remuxer.remux(d.audioTrack, d.videoTrack, d.id3Track, d.textTrack, n, t, !1, e.id);
              return {
                remuxResult: E,
                chunkMeta: c
              };
            });
          }, r.configureTransmuxer = function(v) {
            for (var u = this.config, n = this.observer, t = this.typeSupported, c = this.vendor, e, d = 0, E = y.length; d < E; d++)
              if (y[d].demux.probe(v)) {
                e = y[d];
                break;
              }
            e || (T.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), e = {
              demux: k.default,
              remux: _.default
            });
            var p = this.demuxer, D = this.remuxer, R = e.remux, b = e.demux;
            (!D || !(D instanceof R)) && (this.remuxer = new R(n, u, t, c)), (!p || !(p instanceof b)) && (this.demuxer = new b(n, u, t), this.probe = b.probe);
          }, r.needsProbing = function(v, u) {
            return !this.demuxer || !this.remuxer || v || u;
          }, r.getDecrypter = function() {
            var v = this.decrypter;
            return v || (v = this.decrypter = new C.default(this.config)), v;
          }, o;
        }();
        function s(o, r) {
          var l = null;
          return o.byteLength > 0 && r != null && r.key != null && r.iv !== null && r.method != null && (l = r), l;
        }
        var f = function(r) {
          return {
            remuxResult: {},
            chunkMeta: r
          };
        };
        function a(o) {
          return "then" in o && o.then instanceof Function;
        }
        var i = function(r, l, v, u, n) {
          this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = r, this.videoCodec = l, this.initSegmentData = v, this.duration = u, this.defaultInitPts = n;
        }, g = function(r, l, v, u, n, t) {
          this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = r, this.contiguous = l, this.accurateTimeOffset = v, this.trackSwitch = u, this.timeOffset = n, this.initSegmentChange = t;
        };
      },
      "./src/demux/tsdemuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => g
        });
        var F = S("./src/demux/adts.ts"), A = S("./src/demux/mpegaudio.ts"), C = S("./src/demux/exp-golomb.ts"), I = S("./src/demux/sample-aes.ts"), k = S("./src/events.ts"), P = S("./src/utils/mp4-tools.ts"), L = S("./src/utils/logger.ts"), x = S("./src/errors.ts"), _ = S("./src/types/demuxer.ts");
        function T() {
          return T = Object.assign ? Object.assign.bind() : function(o) {
            for (var r = 1; r < arguments.length; r++) {
              var l = arguments[r];
              for (var v in l)
                Object.prototype.hasOwnProperty.call(l, v) && (o[v] = l[v]);
            }
            return o;
          }, T.apply(this, arguments);
        }
        var h = 188, y = /* @__PURE__ */ function() {
          function o(l, v, u) {
            this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = l, this.config = v, this.typeSupported = u;
          }
          o.probe = function(v) {
            var u = o.syncOffset(v);
            return u > 0 && L.logger.warn("MPEG2-TS detected but first sync word found @ offset " + u), u !== -1;
          }, o.syncOffset = function(v) {
            for (var u = Math.min(h * 5, v.length - h * 2) + 1, n = 0; n < u; ) {
              if (v[n] === 71 && v[n + h] === 71)
                return n;
              n++;
            }
            return -1;
          }, o.createTrack = function(v, u) {
            return {
              container: v === "video" || v === "audio" ? "video/mp2t" : void 0,
              type: v,
              id: P.RemuxerTrackIdConfig[v],
              pid: -1,
              inputTimeScale: 9e4,
              sequenceNumber: 0,
              samples: [],
              dropped: 0,
              duration: v === "audio" ? u : void 0
            };
          };
          var r = o.prototype;
          return r.resetInitSegment = function(v, u, n, t) {
            this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = o.createTrack("video"), this._audioTrack = o.createTrack("audio", t), this._id3Track = o.createTrack("id3"), this._txtTrack = o.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.audioCodec = u, this.videoCodec = n, this._duration = t;
          }, r.resetTimeStamp = function() {
          }, r.resetContiguity = function() {
            var v = this._audioTrack, u = this._avcTrack, n = this._id3Track;
            v && (v.pesData = null), u && (u.pesData = null), n && (n.pesData = null), this.aacOverFlow = null, this.avcSample = null, this.remainderData = null;
          }, r.demux = function(v, u, n, t) {
            n === void 0 && (n = !1), t === void 0 && (t = !1), n || (this.sampleAes = null);
            var c, e = this._avcTrack, d = this._audioTrack, E = this._id3Track, p = this._txtTrack, D = e.pid, R = e.pesData, b = d.pid, O = E.pid, M = d.pesData, w = E.pesData, U = null, N = this.pmtParsed, K = this._pmtId, W = v.length;
            if (this.remainderData && (v = (0, P.appendUint8Array)(this.remainderData, v), W = v.length, this.remainderData = null), W < h && !t)
              return this.remainderData = v, {
                audioTrack: d,
                videoTrack: e,
                id3Track: E,
                textTrack: p
              };
            var G = Math.max(0, o.syncOffset(v));
            W -= (W - G) % h, W < v.byteLength && !t && (this.remainderData = new Uint8Array(v.buffer, W, v.buffer.byteLength - W));
            for (var j = 0, H = G; H < W; H += h)
              if (v[H] === 71) {
                var X = !!(v[H + 1] & 64), Z = ((v[H + 1] & 31) << 8) + v[H + 2], J = (v[H + 3] & 48) >> 4, $ = void 0;
                if (J > 1) {
                  if ($ = H + 5 + v[H + 4], $ === H + h)
                    continue;
                } else
                  $ = H + 4;
                switch (Z) {
                  case D:
                    X && (R && (c = a(R)) && this.parseAVCPES(e, p, c, !1), R = {
                      data: [],
                      size: 0
                    }), R && (R.data.push(v.subarray($, H + h)), R.size += H + h - $);
                    break;
                  case b:
                    if (X) {
                      if (M && (c = a(M)))
                        switch (d.segmentCodec) {
                          case "aac":
                            this.parseAACPES(d, c);
                            break;
                          case "mp3":
                            this.parseMPEGPES(d, c);
                            break;
                        }
                      M = {
                        data: [],
                        size: 0
                      };
                    }
                    M && (M.data.push(v.subarray($, H + h)), M.size += H + h - $);
                    break;
                  case O:
                    X && (w && (c = a(w)) && this.parseID3PES(E, c), w = {
                      data: [],
                      size: 0
                    }), w && (w.data.push(v.subarray($, H + h)), w.size += H + h - $);
                    break;
                  case 0:
                    X && ($ += v[$] + 1), K = this._pmtId = s(v, $);
                    break;
                  case K: {
                    X && ($ += v[$] + 1);
                    var z = f(v, $, this.typeSupported, n);
                    D = z.avc, D > 0 && (e.pid = D), b = z.audio, b > 0 && (d.pid = b, d.segmentCodec = z.segmentCodec), O = z.id3, O > 0 && (E.pid = O), U !== null && !N && (L.logger.log("unknown PID '" + U + "' in TS found"), U = null, H = G - 188), N = this.pmtParsed = !0;
                    break;
                  }
                  case 17:
                  case 8191:
                    break;
                  default:
                    U = Z;
                    break;
                }
              } else
                j++;
            j > 0 && this.observer.emit(k.Events.ERROR, k.Events.ERROR, {
              type: x.ErrorTypes.MEDIA_ERROR,
              details: x.ErrorDetails.FRAG_PARSING_ERROR,
              fatal: !1,
              reason: "Found " + j + " TS packet/s that do not start with 0x47"
            }), e.pesData = R, d.pesData = M, E.pesData = w;
            var q = {
              audioTrack: d,
              videoTrack: e,
              id3Track: E,
              textTrack: p
            };
            return t && this.extractRemainingSamples(q), q;
          }, r.flush = function() {
            var v = this.remainderData;
            this.remainderData = null;
            var u;
            return v ? u = this.demux(v, -1, !1, !0) : u = {
              videoTrack: this._avcTrack,
              audioTrack: this._audioTrack,
              id3Track: this._id3Track,
              textTrack: this._txtTrack
            }, this.extractRemainingSamples(u), this.sampleAes ? this.decrypt(u, this.sampleAes) : u;
          }, r.extractRemainingSamples = function(v) {
            var u = v.audioTrack, n = v.videoTrack, t = v.id3Track, c = v.textTrack, e = n.pesData, d = u.pesData, E = t.pesData, p;
            if (e && (p = a(e)) ? (this.parseAVCPES(n, c, p, !0), n.pesData = null) : n.pesData = e, d && (p = a(d))) {
              switch (u.segmentCodec) {
                case "aac":
                  this.parseAACPES(u, p);
                  break;
                case "mp3":
                  this.parseMPEGPES(u, p);
                  break;
              }
              u.pesData = null;
            } else
              d != null && d.size && L.logger.log("last AAC PES packet truncated,might overlap between fragments"), u.pesData = d;
            E && (p = a(E)) ? (this.parseID3PES(t, p), t.pesData = null) : t.pesData = E;
          }, r.demuxSampleAes = function(v, u, n) {
            var t = this.demux(v, n, !0, !this.config.progressive), c = this.sampleAes = new I.default(this.observer, this.config, u);
            return this.decrypt(t, c);
          }, r.decrypt = function(v, u) {
            return new Promise(function(n) {
              var t = v.audioTrack, c = v.videoTrack;
              t.samples && t.segmentCodec === "aac" ? u.decryptAacSamples(t.samples, 0, function() {
                c.samples ? u.decryptAvcSamples(c.samples, 0, 0, function() {
                  n(v);
                }) : n(v);
              }) : c.samples && u.decryptAvcSamples(c.samples, 0, 0, function() {
                n(v);
              });
            });
          }, r.destroy = function() {
            this._duration = 0;
          }, r.parseAVCPES = function(v, u, n, t) {
            var c = this, e = this.parseAVCNALu(v, n.data), d = this.avcSample, E, p = !1;
            n.data = null, d && e.length && !v.audFound && (i(d, v), d = this.avcSample = m(!1, n.pts, n.dts, "")), e.forEach(function(D) {
              switch (D.type) {
                case 1: {
                  E = !0, d || (d = c.avcSample = m(!0, n.pts, n.dts, "")), d.frame = !0;
                  var R = D.data;
                  if (p && R.length > 4) {
                    var b = new C.default(R).readSliceType();
                    (b === 2 || b === 4 || b === 7 || b === 9) && (d.key = !0);
                  }
                  break;
                }
                case 5:
                  E = !0, d || (d = c.avcSample = m(!0, n.pts, n.dts, "")), d.key = !0, d.frame = !0;
                  break;
                case 6: {
                  E = !0, (0, P.parseSEIMessageFromNALu)(D.data, 1, n.pts, u.samples);
                  break;
                }
                case 7:
                  if (E = !0, p = !0, !v.sps) {
                    var O = new C.default(D.data), M = O.readSPS();
                    v.width = M.width, v.height = M.height, v.pixelRatio = M.pixelRatio, v.sps = [D.data], v.duration = c._duration;
                    for (var w = D.data.subarray(1, 4), U = "avc1.", N = 0; N < 3; N++) {
                      var K = w[N].toString(16);
                      K.length < 2 && (K = "0" + K), U += K;
                    }
                    v.codec = U;
                  }
                  break;
                case 8:
                  E = !0, v.pps || (v.pps = [D.data]);
                  break;
                case 9:
                  E = !1, v.audFound = !0, d && i(d, v), d = c.avcSample = m(!1, n.pts, n.dts, "");
                  break;
                case 12:
                  E = !0;
                  break;
                default:
                  E = !1, d && (d.debug += "unknown NAL " + D.type + " ");
                  break;
              }
              if (d && E) {
                var W = d.units;
                W.push(D);
              }
            }), t && d && (i(d, v), this.avcSample = null);
          }, r.getLastNalUnit = function(v) {
            var u, n = this.avcSample, t;
            if ((!n || n.units.length === 0) && (n = v[v.length - 1]), (u = n) !== null && u !== void 0 && u.units) {
              var c = n.units;
              t = c[c.length - 1];
            }
            return t;
          }, r.parseAVCNALu = function(v, u) {
            var n = u.byteLength, t = v.naluState || 0, c = t, e = [], d = 0, E, p, D, R = -1, b = 0;
            for (t === -1 && (R = 0, b = u[0] & 31, t = 0, d = 1); d < n; ) {
              if (E = u[d++], !t) {
                t = E ? 0 : 1;
                continue;
              }
              if (t === 1) {
                t = E ? 0 : 2;
                continue;
              }
              if (!E)
                t = 3;
              else if (E === 1) {
                if (R >= 0) {
                  var O = {
                    data: u.subarray(R, d - t - 1),
                    type: b
                  };
                  e.push(O);
                } else {
                  var M = this.getLastNalUnit(v.samples);
                  if (M && (c && d <= 4 - c && M.state && (M.data = M.data.subarray(0, M.data.byteLength - c)), p = d - t - 1, p > 0)) {
                    var w = new Uint8Array(M.data.byteLength + p);
                    w.set(M.data, 0), w.set(u.subarray(0, p), M.data.byteLength), M.data = w, M.state = 0;
                  }
                }
                d < n ? (D = u[d] & 31, R = d, b = D, t = 0) : t = -1;
              } else
                t = 0;
            }
            if (R >= 0 && t >= 0) {
              var U = {
                data: u.subarray(R, n),
                type: b,
                state: t
              };
              e.push(U);
            }
            if (e.length === 0) {
              var N = this.getLastNalUnit(v.samples);
              if (N) {
                var K = new Uint8Array(N.data.byteLength + u.byteLength);
                K.set(N.data, 0), K.set(u, N.data.byteLength), N.data = K;
              }
            }
            return v.naluState = t, e;
          }, r.parseAACPES = function(v, u) {
            var n = 0, t = this.aacOverFlow, c = u.data;
            if (t) {
              this.aacOverFlow = null;
              var e = t.missing, d = t.sample.unit.byteLength;
              if (e === -1) {
                var E = new Uint8Array(d + c.byteLength);
                E.set(t.sample.unit, 0), E.set(c, d), c = E;
              } else {
                var p = d - e;
                t.sample.unit.set(c.subarray(0, e), p), v.samples.push(t.sample), n = t.missing;
              }
            }
            var D, R;
            for (D = n, R = c.length; D < R - 1 && !F.isHeader(c, D); D++)
              ;
            if (D !== n) {
              var b, O;
              if (D < R - 1 ? (b = "AAC PES did not start with ADTS header,offset:" + D, O = !1) : (b = "no ADTS header found in AAC PES", O = !0), L.logger.warn("parsing error:" + b), this.observer.emit(k.Events.ERROR, k.Events.ERROR, {
                type: x.ErrorTypes.MEDIA_ERROR,
                details: x.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: O,
                reason: b
              }), O)
                return;
            }
            F.initTrackConfig(v, this.observer, c, D, this.audioCodec);
            var M;
            if (u.pts !== void 0)
              M = u.pts;
            else if (t) {
              var w = F.getFrameDuration(v.samplerate);
              M = t.sample.pts + w;
            } else {
              L.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
              return;
            }
            for (var U = 0, N; D < R; )
              if (N = F.appendFrame(v, c, D, M, U), D += N.length, N.missing) {
                this.aacOverFlow = N;
                break;
              } else
                for (U++; D < R - 1 && !F.isHeader(c, D); D++)
                  ;
          }, r.parseMPEGPES = function(v, u) {
            var n = u.data, t = n.length, c = 0, e = 0, d = u.pts;
            if (d === void 0) {
              L.logger.warn("[tsdemuxer]: MPEG PES unknown PTS");
              return;
            }
            for (; e < t; )
              if (A.isHeader(n, e)) {
                var E = A.appendFrame(v, n, e, d, c);
                if (E)
                  e += E.length, c++;
                else
                  break;
              } else
                e++;
          }, r.parseID3PES = function(v, u) {
            if (u.pts === void 0) {
              L.logger.warn("[tsdemuxer]: ID3 PES unknown PTS");
              return;
            }
            var n = T({}, u, {
              type: this._avcTrack ? _.MetadataSchema.emsg : _.MetadataSchema.audioId3,
              duration: Number.POSITIVE_INFINITY
            });
            v.samples.push(n);
          }, o;
        }();
        function m(o, r, l, v) {
          return {
            key: o,
            frame: !1,
            pts: r,
            dts: l,
            units: [],
            debug: v,
            length: 0
          };
        }
        function s(o, r) {
          return (o[r + 10] & 31) << 8 | o[r + 11];
        }
        function f(o, r, l, v) {
          var u = {
            audio: -1,
            avc: -1,
            id3: -1,
            segmentCodec: "aac"
          }, n = (o[r + 1] & 15) << 8 | o[r + 2], t = r + 3 + n - 4, c = (o[r + 10] & 15) << 8 | o[r + 11];
          for (r += 12 + c; r < t; ) {
            var e = (o[r + 1] & 31) << 8 | o[r + 2];
            switch (o[r]) {
              case 207:
                if (!v) {
                  L.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
                  break;
                }
              case 15:
                u.audio === -1 && (u.audio = e);
                break;
              case 21:
                u.id3 === -1 && (u.id3 = e);
                break;
              case 219:
                if (!v) {
                  L.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
                  break;
                }
              case 27:
                u.avc === -1 && (u.avc = e);
                break;
              case 3:
              case 4:
                l.mpeg !== !0 && l.mp3 !== !0 ? L.logger.log("MPEG audio found, not supported in this browser") : u.audio === -1 && (u.audio = e, u.segmentCodec = "mp3");
                break;
              case 36:
                L.logger.warn("Unsupported HEVC stream type found");
                break;
            }
            r += ((o[r + 3] & 15) << 8 | o[r + 4]) + 5;
          }
          return u;
        }
        function a(o) {
          var r = 0, l, v, u, n, t, c = o.data;
          if (!o || o.size === 0)
            return null;
          for (; c[0].length < 19 && c.length > 1; ) {
            var e = new Uint8Array(c[0].length + c[1].length);
            e.set(c[0]), e.set(c[1], c[0].length), c[0] = e, c.splice(1, 1);
          }
          l = c[0];
          var d = (l[0] << 16) + (l[1] << 8) + l[2];
          if (d === 1) {
            if (v = (l[4] << 8) + l[5], v && v > o.size - 6)
              return null;
            var E = l[7];
            E & 192 && (n = (l[9] & 14) * 536870912 + (l[10] & 255) * 4194304 + (l[11] & 254) * 16384 + (l[12] & 255) * 128 + (l[13] & 254) / 2, E & 64 ? (t = (l[14] & 14) * 536870912 + (l[15] & 255) * 4194304 + (l[16] & 254) * 16384 + (l[17] & 255) * 128 + (l[18] & 254) / 2, n - t > 54e5 && (L.logger.warn(Math.round((n - t) / 9e4) + "s delta between PTS and DTS, align them"), n = t)) : t = n), u = l[8];
            var p = u + 9;
            if (o.size <= p)
              return null;
            o.size -= p;
            for (var D = new Uint8Array(o.size), R = 0, b = c.length; R < b; R++) {
              l = c[R];
              var O = l.byteLength;
              if (p)
                if (p > O) {
                  p -= O;
                  continue;
                } else
                  l = l.subarray(p), O -= p, p = 0;
              D.set(l, r), r += O;
            }
            return v && (v -= u + 3), {
              data: D,
              pts: n,
              dts: t,
              len: v
            };
          }
          return null;
        }
        function i(o, r) {
          if (o.units.length && o.frame) {
            if (o.pts === void 0) {
              var l = r.samples, v = l.length;
              if (v) {
                var u = l[v - 1];
                o.pts = u.pts, o.dts = u.dts;
              } else {
                r.dropped++;
                return;
              }
            }
            r.samples.push(o);
          }
          o.debug.length && L.logger.log(o.pts + "/" + o.dts + ":" + o.debug);
        }
        const g = y;
      },
      "./src/demux/webworkify-webpack.js": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => h
        });
        var F = function() {
          var m = ENTRY_MODULE, s = {}, f = function i(g) {
            var o = s[g];
            if (o !== void 0)
              return o.exports;
            var r = s[g] = {
              exports: {}
            };
            return m[g].call(r.exports, r, r.exports, i), r.exports;
          };
          f.m = m, function() {
            f.n = function(i) {
              var g = i && i.__esModule ? function() {
                return i.default;
              } : function() {
                return i;
              };
              return f.d(g, {
                a: g
              }), g;
            };
          }(), function() {
            f.d = function(i, g) {
              for (var o in g)
                f.o(g, o) && !f.o(i, o) && Object.defineProperty(i, o, {
                  enumerable: !0,
                  get: g[o]
                });
            };
          }(), function() {
            f.o = function(i, g) {
              return Object.prototype.hasOwnProperty.call(i, g);
            };
          }(), function() {
            f.r = function(i) {
              typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, {
                value: "Module"
              }), Object.defineProperty(i, "__esModule", {
                value: !0
              });
            };
          }();
          var a = f(ENTRY_MODULE);
          return a.default || a;
        }, A = F.toString().split("ENTRY_MODULE"), C = "[\\.|\\-|\\+|\\w|/|@]+", I = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + C + ").*?\\)";
        function k(y) {
          return (y + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        }
        function P(y) {
          return !isNaN(1 * y);
        }
        function L(y, m, s) {
          var f = {};
          f[s] = [];
          var a = m.toString().replace(/^"[^"]+"/, "function"), i = a.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/) || a.match(/^\(\w+,\s*\w+,\s*(\w+)\)\s?\=\s?\>/);
          if (!i)
            return f;
          for (var g = i[1], o = new RegExp("(\\\\n|\\W)" + k(g) + I, "g"), r; r = o.exec(a); )
            r[3] !== "dll-reference" && f[s].push(r[3]);
          for (o = new RegExp("\\(" + k(g) + '\\("(dll-reference\\s(' + C + '))"\\)\\)' + I, "g"); r = o.exec(a); )
            y[r[2]] || (f[s].push(r[1]), y[r[2]] = S(r[1]).m), f[r[2]] = f[r[2]] || [], f[r[2]].push(r[4]);
          for (var l = Object.keys(f), v = 0; v < l.length; v++)
            for (var u = 0; u < f[l[v]].length; u++)
              P(f[l[v]][u]) && (f[l[v]][u] = 1 * f[l[v]][u]);
          return f;
        }
        function x(y) {
          var m = Object.keys(y);
          return m.reduce(function(s, f) {
            return s || y[f].length > 0;
          }, !1);
        }
        function _(y, m) {
          for (var s = {
            main: [m]
          }, f = {
            main: []
          }, a = {
            main: {}
          }; x(s); )
            for (var i = Object.keys(s), g = 0; g < i.length; g++) {
              var o = i[g], r = s[o], l = r.pop();
              if (a[o] = a[o] || {}, !(a[o][l] || !y[o][l])) {
                a[o][l] = !0, f[o] = f[o] || [], f[o].push(l);
                for (var v = L(y, y[o][l], o), u = Object.keys(v), n = 0; n < u.length; n++)
                  s[u[n]] = s[u[n]] || [], s[u[n]] = s[u[n]].concat(v[u[n]]);
              }
            }
          return f;
        }
        function T(y, m, s, f) {
          var a = y[f].map(function(i) {
            return '"' + i + '": ' + m[f][i].toString().replace(/^"[^"]+"/, "function");
          }).join(",");
          return A[0] + "{" + a + "}" + A[1] + '"' + s + '"' + A[2];
        }
        function h(y, m) {
          m = m || {};
          var s = {
            main: S.m
          }, f = m.all ? {
            main: Object.keys(s.main)
          } : _(s, y), a = "";
          Object.keys(f).filter(function(l) {
            return l !== "main";
          }).forEach(function(l) {
            for (var v = 0; f[l][v]; )
              v++;
            f[l].push(v), s[l][v] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", a = a + ("var " + l + " = (" + T(f, s, v, modules) + `)();
`);
          }), a = a + ("new ((" + T(f, s, y, "main") + ")())(self);");
          var i = new window.Blob([a], {
            type: "text/javascript"
          }), g = window.URL || window.webkitURL || window.mozURL || window.msURL, o = g.createObjectURL(i), r = new window.Worker(o);
          return r.objectURL = o, r;
        }
      },
      "./src/errors.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          ErrorDetails: () => A,
          ErrorTypes: () => F
        });
        var F;
        (function(C) {
          C.NETWORK_ERROR = "networkError", C.MEDIA_ERROR = "mediaError", C.KEY_SYSTEM_ERROR = "keySystemError", C.MUX_ERROR = "muxError", C.OTHER_ERROR = "otherError";
        })(F || (F = {}));
        var A;
        (function(C) {
          C.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", C.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", C.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", C.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", C.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", C.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", C.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", C.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", C.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", C.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", C.MANIFEST_LOAD_ERROR = "manifestLoadError", C.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", C.MANIFEST_PARSING_ERROR = "manifestParsingError", C.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", C.LEVEL_EMPTY_ERROR = "levelEmptyError", C.LEVEL_LOAD_ERROR = "levelLoadError", C.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", C.LEVEL_SWITCH_ERROR = "levelSwitchError", C.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", C.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", C.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", C.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", C.FRAG_LOAD_ERROR = "fragLoadError", C.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", C.FRAG_DECRYPT_ERROR = "fragDecryptError", C.FRAG_PARSING_ERROR = "fragParsingError", C.REMUX_ALLOC_ERROR = "remuxAllocError", C.KEY_LOAD_ERROR = "keyLoadError", C.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", C.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", C.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", C.BUFFER_APPEND_ERROR = "bufferAppendError", C.BUFFER_APPENDING_ERROR = "bufferAppendingError", C.BUFFER_STALLED_ERROR = "bufferStalledError", C.BUFFER_FULL_ERROR = "bufferFullError", C.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", C.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", C.INTERNAL_EXCEPTION = "internalException", C.INTERNAL_ABORTED = "aborted", C.UNKNOWN = "unknown";
        })(A || (A = {}));
      },
      "./src/events.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          Events: () => F
        });
        var F;
        (function(A) {
          A.MEDIA_ATTACHING = "hlsMediaAttaching", A.MEDIA_ATTACHED = "hlsMediaAttached", A.MEDIA_DETACHING = "hlsMediaDetaching", A.MEDIA_DETACHED = "hlsMediaDetached", A.BUFFER_RESET = "hlsBufferReset", A.BUFFER_CODECS = "hlsBufferCodecs", A.BUFFER_CREATED = "hlsBufferCreated", A.BUFFER_APPENDING = "hlsBufferAppending", A.BUFFER_APPENDED = "hlsBufferAppended", A.BUFFER_EOS = "hlsBufferEos", A.BUFFER_FLUSHING = "hlsBufferFlushing", A.BUFFER_FLUSHED = "hlsBufferFlushed", A.MANIFEST_LOADING = "hlsManifestLoading", A.MANIFEST_LOADED = "hlsManifestLoaded", A.MANIFEST_PARSED = "hlsManifestParsed", A.LEVEL_SWITCHING = "hlsLevelSwitching", A.LEVEL_SWITCHED = "hlsLevelSwitched", A.LEVEL_LOADING = "hlsLevelLoading", A.LEVEL_LOADED = "hlsLevelLoaded", A.LEVEL_UPDATED = "hlsLevelUpdated", A.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", A.LEVELS_UPDATED = "hlsLevelsUpdated", A.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", A.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", A.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", A.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", A.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", A.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", A.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", A.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", A.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", A.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", A.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", A.CUES_PARSED = "hlsCuesParsed", A.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", A.INIT_PTS_FOUND = "hlsInitPtsFound", A.FRAG_LOADING = "hlsFragLoading", A.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", A.FRAG_LOADED = "hlsFragLoaded", A.FRAG_DECRYPTED = "hlsFragDecrypted", A.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", A.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", A.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", A.FRAG_PARSED = "hlsFragParsed", A.FRAG_BUFFERED = "hlsFragBuffered", A.FRAG_CHANGED = "hlsFragChanged", A.FPS_DROP = "hlsFpsDrop", A.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", A.ERROR = "hlsError", A.DESTROYING = "hlsDestroying", A.KEY_LOADING = "hlsKeyLoading", A.KEY_LOADED = "hlsKeyLoaded", A.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", A.BACK_BUFFER_REACHED = "hlsBackBufferReached";
        })(F || (F = {}));
      },
      "./src/hls.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => r
        });
        var F = S("./node_modules/url-toolkit/src/url-toolkit.js"), A = S("./src/loader/playlist-loader.ts"), C = S("./src/controller/id3-track-controller.ts"), I = S("./src/controller/latency-controller.ts"), k = S("./src/controller/level-controller.ts"), P = S("./src/controller/fragment-tracker.ts"), L = S("./src/loader/key-loader.ts"), x = S("./src/controller/stream-controller.ts"), _ = S("./src/is-supported.ts"), T = S("./src/utils/logger.ts"), h = S("./src/config.ts"), y = S("./node_modules/eventemitter3/index.js"), m = S("./src/events.ts"), s = S("./src/errors.ts"), f = S("./src/types/level.ts");
        function a(l, v) {
          for (var u = 0; u < v.length; u++) {
            var n = v[u];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(l, g(n.key), n);
          }
        }
        function i(l, v, u) {
          return v && a(l.prototype, v), u && a(l, u), Object.defineProperty(l, "prototype", { writable: !1 }), l;
        }
        function g(l) {
          var v = o(l, "string");
          return typeof v == "symbol" ? v : String(v);
        }
        function o(l, v) {
          if (typeof l != "object" || l === null)
            return l;
          var u = l[Symbol.toPrimitive];
          if (u !== void 0) {
            var n = u.call(l, v || "default");
            if (typeof n != "object")
              return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (v === "string" ? String : Number)(l);
        }
        var r = /* @__PURE__ */ function() {
          l.isSupported = function() {
            return (0, _.isSupported)();
          };
          function l(u) {
            u === void 0 && (u = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new y.EventEmitter(), this._autoLevelCapping = void 0, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null;
            var n = this.config = (0, h.mergeConfig)(l.DefaultConfig, u);
            this.userConfig = u, (0, T.enableLogs)(n.debug, "Hls instance"), this._autoLevelCapping = -1, n.progressive && (0, h.enableStreamingMode)(n);
            var t = n.abrController, c = n.bufferController, e = n.capLevelController, d = n.fpsController, E = this.abrController = new t(this), p = this.bufferController = new c(this), D = this.capLevelController = new e(this), R = new d(this), b = new A.default(this), O = new C.default(this), M = this.levelController = new k.default(this), w = new P.FragmentTracker(this), U = new L.default(this.config), N = this.streamController = new x.default(this, w, U);
            D.setStreamController(N), R.setStreamController(N);
            var K = [b, M, N];
            this.networkControllers = K;
            var W = [E, p, D, R, O, w];
            this.audioTrackController = this.createController(n.audioTrackController, K);
            var G = n.audioStreamController;
            G && K.push(new G(this, w, U)), this.subtitleTrackController = this.createController(n.subtitleTrackController, K);
            var j = n.subtitleStreamController;
            j && K.push(new j(this, w, U)), this.createController(n.timelineController, W), U.emeController = this.emeController = this.createController(n.emeController, W), this.cmcdController = this.createController(n.cmcdController, W), this.latencyController = this.createController(I.default, W), this.coreComponents = W;
          }
          var v = l.prototype;
          return v.createController = function(n, t) {
            if (n) {
              var c = new n(this);
              return t && t.push(c), c;
            }
            return null;
          }, v.on = function(n, t, c) {
            c === void 0 && (c = this), this._emitter.on(n, t, c);
          }, v.once = function(n, t, c) {
            c === void 0 && (c = this), this._emitter.once(n, t, c);
          }, v.removeAllListeners = function(n) {
            this._emitter.removeAllListeners(n);
          }, v.off = function(n, t, c, e) {
            c === void 0 && (c = this), this._emitter.off(n, t, c, e);
          }, v.listeners = function(n) {
            return this._emitter.listeners(n);
          }, v.emit = function(n, t, c) {
            return this._emitter.emit(n, t, c);
          }, v.trigger = function(n, t) {
            if (this.config.debug)
              return this.emit(n, n, t);
            try {
              return this.emit(n, n, t);
            } catch (c) {
              T.logger.error("An internal error happened while handling event " + n + '. Error message: "' + c.message + '". Here is a stacktrace:', c), this.trigger(m.Events.ERROR, {
                type: s.ErrorTypes.OTHER_ERROR,
                details: s.ErrorDetails.INTERNAL_EXCEPTION,
                fatal: !1,
                event: n,
                error: c
              });
            }
            return !1;
          }, v.listenerCount = function(n) {
            return this._emitter.listenerCount(n);
          }, v.destroy = function() {
            T.logger.log("destroy"), this.trigger(m.Events.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach(function(n) {
              return n.destroy();
            }), this.networkControllers.length = 0, this.coreComponents.forEach(function(n) {
              return n.destroy();
            }), this.coreComponents.length = 0;
          }, v.attachMedia = function(n) {
            T.logger.log("attachMedia"), this._media = n, this.trigger(m.Events.MEDIA_ATTACHING, {
              media: n
            });
          }, v.detachMedia = function() {
            T.logger.log("detachMedia"), this.trigger(m.Events.MEDIA_DETACHING, void 0), this._media = null;
          }, v.loadSource = function(n) {
            this.stopLoad();
            var t = this.media, c = this.url, e = this.url = F.buildAbsoluteURL(self.location.href, n, {
              alwaysNormalize: !0
            });
            T.logger.log("loadSource:" + e), t && c && c !== e && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(t)), this.trigger(m.Events.MANIFEST_LOADING, {
              url: n
            });
          }, v.startLoad = function(n) {
            n === void 0 && (n = -1), T.logger.log("startLoad(" + n + ")"), this.networkControllers.forEach(function(t) {
              t.startLoad(n);
            });
          }, v.stopLoad = function() {
            T.logger.log("stopLoad"), this.networkControllers.forEach(function(n) {
              n.stopLoad();
            });
          }, v.swapAudioCodec = function() {
            T.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec();
          }, v.recoverMediaError = function() {
            T.logger.log("recoverMediaError");
            var n = this._media;
            this.detachMedia(), n && this.attachMedia(n);
          }, v.removeLevel = function(n, t) {
            t === void 0 && (t = 0), this.levelController.removeLevel(n, t);
          }, i(l, [{
            key: "levels",
            get: function() {
              var n = this.levelController.levels;
              return n || [];
            }
          }, {
            key: "currentLevel",
            get: function() {
              return this.streamController.currentLevel;
            },
            set: function(n) {
              T.logger.log("set currentLevel:" + n), this.loadLevel = n, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch();
            }
          }, {
            key: "nextLevel",
            get: function() {
              return this.streamController.nextLevel;
            },
            set: function(n) {
              T.logger.log("set nextLevel:" + n), this.levelController.manualLevel = n, this.streamController.nextLevelSwitch();
            }
          }, {
            key: "loadLevel",
            get: function() {
              return this.levelController.level;
            },
            set: function(n) {
              T.logger.log("set loadLevel:" + n), this.levelController.manualLevel = n;
            }
          }, {
            key: "nextLoadLevel",
            get: function() {
              return this.levelController.nextLoadLevel;
            },
            set: function(n) {
              this.levelController.nextLoadLevel = n;
            }
          }, {
            key: "firstLevel",
            get: function() {
              return Math.max(this.levelController.firstLevel, this.minAutoLevel);
            },
            set: function(n) {
              T.logger.log("set firstLevel:" + n), this.levelController.firstLevel = n;
            }
          }, {
            key: "startLevel",
            get: function() {
              return this.levelController.startLevel;
            },
            set: function(n) {
              T.logger.log("set startLevel:" + n), n !== -1 && (n = Math.max(n, this.minAutoLevel)), this.levelController.startLevel = n;
            }
          }, {
            key: "capLevelToPlayerSize",
            get: function() {
              return this.config.capLevelToPlayerSize;
            },
            set: function(n) {
              var t = !!n;
              t !== this.config.capLevelToPlayerSize && (t ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = t);
            }
          }, {
            key: "autoLevelCapping",
            get: function() {
              return this._autoLevelCapping;
            },
            set: function(n) {
              this._autoLevelCapping !== n && (T.logger.log("set autoLevelCapping:" + n), this._autoLevelCapping = n);
            }
          }, {
            key: "bandwidthEstimate",
            get: function() {
              var n = this.abrController.bwEstimator;
              return n ? n.getEstimate() : NaN;
            }
          }, {
            key: "maxHdcpLevel",
            get: function() {
              return this._maxHdcpLevel;
            },
            set: function(n) {
              f.HdcpLevels.indexOf(n) > -1 && (this._maxHdcpLevel = n);
            }
          }, {
            key: "autoLevelEnabled",
            get: function() {
              return this.levelController.manualLevel === -1;
            }
          }, {
            key: "manualLevel",
            get: function() {
              return this.levelController.manualLevel;
            }
          }, {
            key: "minAutoLevel",
            get: function() {
              var n = this.levels, t = this.config.minAutoBitrate;
              if (!n)
                return 0;
              for (var c = n.length, e = 0; e < c; e++)
                if (n[e].maxBitrate >= t)
                  return e;
              return 0;
            }
          }, {
            key: "maxAutoLevel",
            get: function() {
              var n = this.levels, t = this.autoLevelCapping, c = this.maxHdcpLevel, e;
              if (t === -1 && n && n.length ? e = n.length - 1 : e = t, c)
                for (var d = e; d--; ) {
                  var E = n[d].attrs["HDCP-LEVEL"];
                  if (E && E <= c)
                    return d;
                }
              return e;
            }
          }, {
            key: "nextAutoLevel",
            get: function() {
              return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
            },
            set: function(n) {
              this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, n);
            }
          }, {
            key: "playingDate",
            get: function() {
              return this.streamController.currentProgramDateTime;
            }
          }, {
            key: "mainForwardBufferInfo",
            get: function() {
              return this.streamController.getMainFwdBufferInfo();
            }
          }, {
            key: "audioTracks",
            get: function() {
              var n = this.audioTrackController;
              return n ? n.audioTracks : [];
            }
          }, {
            key: "audioTrack",
            get: function() {
              var n = this.audioTrackController;
              return n ? n.audioTrack : -1;
            },
            set: function(n) {
              var t = this.audioTrackController;
              t && (t.audioTrack = n);
            }
          }, {
            key: "subtitleTracks",
            get: function() {
              var n = this.subtitleTrackController;
              return n ? n.subtitleTracks : [];
            }
          }, {
            key: "subtitleTrack",
            get: function() {
              var n = this.subtitleTrackController;
              return n ? n.subtitleTrack : -1;
            },
            set: function(n) {
              var t = this.subtitleTrackController;
              t && (t.subtitleTrack = n);
            }
          }, {
            key: "media",
            get: function() {
              return this._media;
            }
          }, {
            key: "subtitleDisplay",
            get: function() {
              var n = this.subtitleTrackController;
              return n ? n.subtitleDisplay : !1;
            },
            set: function(n) {
              var t = this.subtitleTrackController;
              t && (t.subtitleDisplay = n);
            }
          }, {
            key: "lowLatencyMode",
            get: function() {
              return this.config.lowLatencyMode;
            },
            set: function(n) {
              this.config.lowLatencyMode = n;
            }
          }, {
            key: "liveSyncPosition",
            get: function() {
              return this.latencyController.liveSyncPosition;
            }
          }, {
            key: "latency",
            get: function() {
              return this.latencyController.latency;
            }
          }, {
            key: "maxLatency",
            get: function() {
              return this.latencyController.maxLatency;
            }
          }, {
            key: "targetLatency",
            get: function() {
              return this.latencyController.targetLatency;
            }
          }, {
            key: "drift",
            get: function() {
              return this.latencyController.drift;
            }
          }, {
            key: "forceStartLoad",
            get: function() {
              return this.streamController.forceStartLoad;
            }
          }], [{
            key: "version",
            get: function() {
              return "1.3.0";
            }
          }, {
            key: "Events",
            get: function() {
              return m.Events;
            }
          }, {
            key: "ErrorTypes",
            get: function() {
              return s.ErrorTypes;
            }
          }, {
            key: "ErrorDetails",
            get: function() {
              return s.ErrorDetails;
            }
          }, {
            key: "DefaultConfig",
            get: function() {
              return l.defaultConfig ? l.defaultConfig : h.hlsDefaultConfig;
            },
            set: function(n) {
              l.defaultConfig = n;
            }
          }]), l;
        }();
        r.defaultConfig = void 0;
      },
      "./src/is-supported.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          changeTypeSupported: () => I,
          isSupported: () => C
        });
        var F = S("./src/utils/mediasource-helper.ts");
        function A() {
          return self.SourceBuffer || self.WebKitSourceBuffer;
        }
        function C() {
          var k = (0, F.getMediaSource)();
          if (!k)
            return !1;
          var P = A(), L = k && typeof k.isTypeSupported == "function" && k.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'), x = !P || P.prototype && typeof P.prototype.appendBuffer == "function" && typeof P.prototype.remove == "function";
          return !!L && !!x;
        }
        function I() {
          var k, P = A();
          return typeof (P == null || (k = P.prototype) === null || k === void 0 ? void 0 : k.changeType) == "function";
        }
      },
      "./src/loader/date-range.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          DateRange: () => T,
          DateRangeAttribute: () => _
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/attr-list.ts"), C = S("./src/utils/logger.ts");
        function I() {
          return I = Object.assign ? Object.assign.bind() : function(h) {
            for (var y = 1; y < arguments.length; y++) {
              var m = arguments[y];
              for (var s in m)
                Object.prototype.hasOwnProperty.call(m, s) && (h[s] = m[s]);
            }
            return h;
          }, I.apply(this, arguments);
        }
        function k(h, y) {
          for (var m = 0; m < y.length; m++) {
            var s = y[m];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(h, L(s.key), s);
          }
        }
        function P(h, y, m) {
          return y && k(h.prototype, y), m && k(h, m), Object.defineProperty(h, "prototype", { writable: !1 }), h;
        }
        function L(h) {
          var y = x(h, "string");
          return typeof y == "symbol" ? y : String(y);
        }
        function x(h, y) {
          if (typeof h != "object" || h === null)
            return h;
          var m = h[Symbol.toPrimitive];
          if (m !== void 0) {
            var s = m.call(h, y || "default");
            if (typeof s != "object")
              return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (y === "string" ? String : Number)(h);
        }
        var _;
        (function(h) {
          h.ID = "ID", h.CLASS = "CLASS", h.START_DATE = "START-DATE", h.DURATION = "DURATION", h.END_DATE = "END-DATE", h.END_ON_NEXT = "END-ON-NEXT", h.PLANNED_DURATION = "PLANNED-DURATION", h.SCTE35_OUT = "SCTE35-OUT", h.SCTE35_IN = "SCTE35-IN";
        })(_ || (_ = {}));
        var T = /* @__PURE__ */ function() {
          function h(y, m) {
            if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, m) {
              var s = m.attr;
              for (var f in s)
                if (Object.prototype.hasOwnProperty.call(y, f) && y[f] !== s[f]) {
                  C.logger.warn('DATERANGE tag attribute: "' + f + '" does not match for tags with ID: "' + y.ID + '"'), this._badValueForSameId = f;
                  break;
                }
              y = I(new A.AttrList({}), s, y);
            }
            if (this.attr = y, this._startDate = new Date(y[_.START_DATE]), _.END_DATE in this.attr) {
              var a = new Date(this.attr[_.END_DATE]);
              (0, F.isFiniteNumber)(a.getTime()) && (this._endDate = a);
            }
          }
          return P(h, [{
            key: "id",
            get: function() {
              return this.attr.ID;
            }
          }, {
            key: "class",
            get: function() {
              return this.attr.CLASS;
            }
          }, {
            key: "startDate",
            get: function() {
              return this._startDate;
            }
          }, {
            key: "endDate",
            get: function() {
              if (this._endDate)
                return this._endDate;
              var m = this.duration;
              return m !== null ? new Date(this._startDate.getTime() + m * 1e3) : null;
            }
          }, {
            key: "duration",
            get: function() {
              if (_.DURATION in this.attr) {
                var m = this.attr.decimalFloatingPoint(_.DURATION);
                if ((0, F.isFiniteNumber)(m))
                  return m;
              } else if (this._endDate)
                return (this._endDate.getTime() - this._startDate.getTime()) / 1e3;
              return null;
            }
          }, {
            key: "plannedDuration",
            get: function() {
              return _.PLANNED_DURATION in this.attr ? this.attr.decimalFloatingPoint(_.PLANNED_DURATION) : null;
            }
          }, {
            key: "endOnNext",
            get: function() {
              return this.attr.bool(_.END_ON_NEXT);
            }
          }, {
            key: "isValid",
            get: function() {
              return !!this.id && !this._badValueForSameId && (0, F.isFiniteNumber)(this.startDate.getTime()) && (this.duration === null || this.duration >= 0) && (!this.endOnNext || !!this.class);
            }
          }]), h;
        }();
      },
      "./src/loader/fragment-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          LoadError: () => m,
          default: () => h
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/errors.ts");
        function C(s, f) {
          s.prototype = Object.create(f.prototype), s.prototype.constructor = s, x(s, f);
        }
        function I(s) {
          var f = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
          return I = function(i) {
            if (i === null || !L(i))
              return i;
            if (typeof i != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (typeof f != "undefined") {
              if (f.has(i))
                return f.get(i);
              f.set(i, g);
            }
            function g() {
              return k(i, arguments, _(this).constructor);
            }
            return g.prototype = Object.create(i.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), x(g, i);
          }, I(s);
        }
        function k(s, f, a) {
          return P() ? k = Reflect.construct.bind() : k = function(g, o, r) {
            var l = [null];
            l.push.apply(l, o);
            var v = Function.bind.apply(g, l), u = new v();
            return r && x(u, r.prototype), u;
          }, k.apply(null, arguments);
        }
        function P() {
          if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch (s) {
            return !1;
          }
        }
        function L(s) {
          return Function.toString.call(s).indexOf("[native code]") !== -1;
        }
        function x(s, f) {
          return x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, x(s, f);
        }
        function _(s) {
          return _ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(a) {
            return a.__proto__ || Object.getPrototypeOf(a);
          }, _(s);
        }
        var T = Math.pow(2, 17), h = /* @__PURE__ */ function() {
          function s(a) {
            this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = a;
          }
          var f = s.prototype;
          return f.destroy = function() {
            this.loader && (this.loader.destroy(), this.loader = null);
          }, f.abort = function() {
            this.loader && this.loader.abort();
          }, f.load = function(i, g) {
            var o = this, r = i.url;
            if (!r)
              return Promise.reject(new m({
                type: A.ErrorTypes.NETWORK_ERROR,
                details: A.ErrorDetails.FRAG_LOAD_ERROR,
                fatal: !1,
                frag: i,
                networkDetails: null
              }, "Fragment does not have a " + (r ? "part list" : "url")));
            this.abort();
            var l = this.config, v = l.fLoader, u = l.loader;
            return new Promise(function(n, t) {
              o.loader && o.loader.destroy();
              var c = o.loader = i.loader = v ? new v(l) : new u(l), e = y(i), d = {
                timeout: l.fragLoadingTimeOut,
                maxRetry: 0,
                retryDelay: 0,
                maxRetryDelay: l.fragLoadingMaxRetryTimeout,
                highWaterMark: i.sn === "initSegment" ? 1 / 0 : T
              };
              i.stats = c.stats, c.load(e, d, {
                onSuccess: function(p, D, R, b) {
                  o.resetLoader(i, c);
                  var O = p.data;
                  R.resetIV && i.decryptdata && (i.decryptdata.iv = new Uint8Array(O.slice(0, 16)), O = O.slice(16)), n({
                    frag: i,
                    part: null,
                    payload: O,
                    networkDetails: b
                  });
                },
                onError: function(p, D, R) {
                  o.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.FRAG_LOAD_ERROR,
                    fatal: !1,
                    frag: i,
                    response: p,
                    networkDetails: R
                  }));
                },
                onAbort: function(p, D, R) {
                  o.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.INTERNAL_ABORTED,
                    fatal: !1,
                    frag: i,
                    networkDetails: R
                  }));
                },
                onTimeout: function(p, D, R) {
                  o.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.FRAG_LOAD_TIMEOUT,
                    fatal: !1,
                    frag: i,
                    networkDetails: R
                  }));
                },
                onProgress: function(p, D, R, b) {
                  g && g({
                    frag: i,
                    part: null,
                    payload: R,
                    networkDetails: b
                  });
                }
              });
            });
          }, f.loadPart = function(i, g, o) {
            var r = this;
            this.abort();
            var l = this.config, v = l.fLoader, u = l.loader;
            return new Promise(function(n, t) {
              r.loader && r.loader.destroy();
              var c = r.loader = i.loader = v ? new v(l) : new u(l), e = y(i, g), d = {
                timeout: l.fragLoadingTimeOut,
                maxRetry: 0,
                retryDelay: 0,
                maxRetryDelay: l.fragLoadingMaxRetryTimeout,
                highWaterMark: T
              };
              g.stats = c.stats, c.load(e, d, {
                onSuccess: function(p, D, R, b) {
                  r.resetLoader(i, c), r.updateStatsFromPart(i, g);
                  var O = {
                    frag: i,
                    part: g,
                    payload: p.data,
                    networkDetails: b
                  };
                  o(O), n(O);
                },
                onError: function(p, D, R) {
                  r.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.FRAG_LOAD_ERROR,
                    fatal: !1,
                    frag: i,
                    part: g,
                    response: p,
                    networkDetails: R
                  }));
                },
                onAbort: function(p, D, R) {
                  i.stats.aborted = g.stats.aborted, r.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.INTERNAL_ABORTED,
                    fatal: !1,
                    frag: i,
                    part: g,
                    networkDetails: R
                  }));
                },
                onTimeout: function(p, D, R) {
                  r.resetLoader(i, c), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.FRAG_LOAD_TIMEOUT,
                    fatal: !1,
                    frag: i,
                    part: g,
                    networkDetails: R
                  }));
                }
              });
            });
          }, f.updateStatsFromPart = function(i, g) {
            var o = i.stats, r = g.stats, l = r.total;
            if (o.loaded += r.loaded, l) {
              var v = Math.round(i.duration / g.duration), u = Math.min(Math.round(o.loaded / l), v), n = v - u, t = n * Math.round(o.loaded / u);
              o.total = o.loaded + t;
            } else
              o.total = Math.max(o.loaded, o.total);
            var c = o.loading, e = r.loading;
            c.start ? c.first += e.first - e.start : (c.start = e.start, c.first = e.first), c.end = e.end;
          }, f.resetLoader = function(i, g) {
            i.loader = null, this.loader === g && (self.clearTimeout(this.partLoadTimeout), this.loader = null), g.destroy();
          }, s;
        }();
        function y(s, f) {
          f === void 0 && (f = null);
          var a = f || s, i = {
            frag: s,
            part: f,
            responseType: "arraybuffer",
            url: a.url,
            headers: {},
            rangeStart: 0,
            rangeEnd: 0
          }, g = a.byteRangeStartOffset, o = a.byteRangeEndOffset;
          if ((0, F.isFiniteNumber)(g) && (0, F.isFiniteNumber)(o)) {
            var r, l = g, v = o;
            if (s.sn === "initSegment" && ((r = s.decryptdata) === null || r === void 0 ? void 0 : r.method) === "AES-128") {
              var u = o - g;
              u % 16 && (v = o + (16 - u % 16)), g !== 0 && (i.resetIV = !0, l = g - 16);
            }
            i.rangeStart = l, i.rangeEnd = v;
          }
          return i;
        }
        var m = /* @__PURE__ */ function(s) {
          C(f, s);
          function f(a) {
            for (var i, g = arguments.length, o = new Array(g > 1 ? g - 1 : 0), r = 1; r < g; r++)
              o[r - 1] = arguments[r];
            return i = s.call.apply(s, [this].concat(o)) || this, i.data = void 0, i.data = a, i;
          }
          return f;
        }(/* @__PURE__ */ I(Error));
      },
      "./src/loader/fragment.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          BaseSegment: () => h,
          ElementaryStreamTypes: () => T,
          Fragment: () => y,
          Part: () => m
        });
        var F = S("./src/polyfills/number.ts"), A = S("./node_modules/url-toolkit/src/url-toolkit.js"), C = S("./src/loader/load-stats.ts");
        function I(s, f) {
          s.prototype = Object.create(f.prototype), s.prototype.constructor = s, k(s, f);
        }
        function k(s, f) {
          return k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, k(s, f);
        }
        function P(s, f) {
          for (var a = 0; a < f.length; a++) {
            var i = f[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(s, x(i.key), i);
          }
        }
        function L(s, f, a) {
          return f && P(s.prototype, f), a && P(s, a), Object.defineProperty(s, "prototype", { writable: !1 }), s;
        }
        function x(s) {
          var f = _(s, "string");
          return typeof f == "symbol" ? f : String(f);
        }
        function _(s, f) {
          if (typeof s != "object" || s === null)
            return s;
          var a = s[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(s, f || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (f === "string" ? String : Number)(s);
        }
        var T;
        (function(s) {
          s.AUDIO = "audio", s.VIDEO = "video", s.AUDIOVIDEO = "audiovideo";
        })(T || (T = {}));
        var h = /* @__PURE__ */ function() {
          function s(a) {
            var i;
            this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = (i = {}, i[T.AUDIO] = null, i[T.VIDEO] = null, i[T.AUDIOVIDEO] = null, i), this.baseurl = a;
          }
          var f = s.prototype;
          return f.setByteRange = function(i, g) {
            var o = i.split("@", 2), r = [];
            o.length === 1 ? r[0] = g ? g.byteRangeEndOffset : 0 : r[0] = parseInt(o[1]), r[1] = parseInt(o[0]) + r[0], this._byteRange = r;
          }, L(s, [{
            key: "byteRange",
            get: function() {
              return this._byteRange ? this._byteRange : [];
            }
          }, {
            key: "byteRangeStartOffset",
            get: function() {
              return this.byteRange[0];
            }
          }, {
            key: "byteRangeEndOffset",
            get: function() {
              return this.byteRange[1];
            }
          }, {
            key: "url",
            get: function() {
              return !this._url && this.baseurl && this.relurl && (this._url = (0, A.buildAbsoluteURL)(this.baseurl, this.relurl, {
                alwaysNormalize: !0
              })), this._url || "";
            },
            set: function(i) {
              this._url = i;
            }
          }]), s;
        }(), y = /* @__PURE__ */ function(s) {
          I(f, s);
          function f(i, g) {
            var o;
            return o = s.call(this, g) || this, o._decryptdata = null, o.rawProgramDateTime = null, o.programDateTime = null, o.tagList = [], o.duration = 0, o.sn = 0, o.levelkeys = void 0, o.type = void 0, o.loader = null, o.keyLoader = null, o.level = -1, o.cc = 0, o.startPTS = void 0, o.endPTS = void 0, o.appendedPTS = void 0, o.startDTS = void 0, o.endDTS = void 0, o.start = 0, o.deltaPTS = void 0, o.maxStartPTS = void 0, o.minEndPTS = void 0, o.stats = new C.LoadStats(), o.urlId = 0, o.data = void 0, o.bitrateTest = !1, o.title = null, o.initSegment = null, o.endList = void 0, o.type = i, o;
          }
          var a = f.prototype;
          return a.setKeyFormat = function(g) {
            if (this.levelkeys) {
              var o = this.levelkeys[g];
              o && !this._decryptdata && (this._decryptdata = o.getDecryptData(this.sn));
            }
          }, a.abortRequests = function() {
            var g, o;
            (g = this.loader) === null || g === void 0 || g.abort(), (o = this.keyLoader) === null || o === void 0 || o.abort();
          }, a.setElementaryStreamInfo = function(g, o, r, l, v, u) {
            u === void 0 && (u = !1);
            var n = this.elementaryStreams, t = n[g];
            if (!t) {
              n[g] = {
                startPTS: o,
                endPTS: r,
                startDTS: l,
                endDTS: v,
                partial: u
              };
              return;
            }
            t.startPTS = Math.min(t.startPTS, o), t.endPTS = Math.max(t.endPTS, r), t.startDTS = Math.min(t.startDTS, l), t.endDTS = Math.max(t.endDTS, v);
          }, a.clearElementaryStreamInfo = function() {
            var g = this.elementaryStreams;
            g[T.AUDIO] = null, g[T.VIDEO] = null, g[T.AUDIOVIDEO] = null;
          }, L(f, [{
            key: "decryptdata",
            get: function() {
              var g = this.levelkeys;
              if (!g && !this._decryptdata)
                return null;
              if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
                var o = this.levelkeys.identity;
                if (o)
                  this._decryptdata = o.getDecryptData(this.sn);
                else {
                  var r = Object.keys(this.levelkeys);
                  if (r.length === 1)
                    return this._decryptdata = this.levelkeys[r[0]].getDecryptData(this.sn);
                }
              }
              return this._decryptdata;
            }
          }, {
            key: "end",
            get: function() {
              return this.start + this.duration;
            }
          }, {
            key: "endProgramDateTime",
            get: function() {
              if (this.programDateTime === null || !(0, F.isFiniteNumber)(this.programDateTime))
                return null;
              var g = (0, F.isFiniteNumber)(this.duration) ? this.duration : 0;
              return this.programDateTime + g * 1e3;
            }
          }, {
            key: "encrypted",
            get: function() {
              var g;
              if ((g = this._decryptdata) !== null && g !== void 0 && g.encrypted)
                return !0;
              if (this.levelkeys) {
                var o = Object.keys(this.levelkeys), r = o.length;
                if (r > 1 || r === 1 && this.levelkeys[o[0]].encrypted)
                  return !0;
              }
              return !1;
            }
          }]), f;
        }(h), m = /* @__PURE__ */ function(s) {
          I(f, s);
          function f(a, i, g, o, r) {
            var l;
            l = s.call(this, g) || this, l.fragOffset = 0, l.duration = 0, l.gap = !1, l.independent = !1, l.relurl = void 0, l.fragment = void 0, l.index = void 0, l.stats = new C.LoadStats(), l.duration = a.decimalFloatingPoint("DURATION"), l.gap = a.bool("GAP"), l.independent = a.bool("INDEPENDENT"), l.relurl = a.enumeratedString("URI"), l.fragment = i, l.index = o;
            var v = a.enumeratedString("BYTERANGE");
            return v && l.setByteRange(v, r), r && (l.fragOffset = r.fragOffset + r.duration), l;
          }
          return L(f, [{
            key: "start",
            get: function() {
              return this.fragment.start + this.fragOffset;
            }
          }, {
            key: "end",
            get: function() {
              return this.start + this.duration;
            }
          }, {
            key: "loaded",
            get: function() {
              var i = this.elementaryStreams;
              return !!(i.audio || i.video || i.audiovideo);
            }
          }]), f;
        }(h);
      },
      "./src/loader/key-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => C
        });
        var F = S("./src/errors.ts"), A = S("./src/loader/fragment-loader.ts"), C = /* @__PURE__ */ function() {
          function I(P) {
            this.config = void 0, this.keyUriToKeyInfo = {}, this.emeController = null, this.config = P;
          }
          var k = I.prototype;
          return k.abort = function() {
            for (var L in this.keyUriToKeyInfo) {
              var x = this.keyUriToKeyInfo[L].loader;
              x && x.abort();
            }
          }, k.detach = function() {
            for (var L in this.keyUriToKeyInfo) {
              var x = this.keyUriToKeyInfo[L];
              (x.mediaKeySessionContext || x.decryptdata.isCommonEncryption) && delete this.keyUriToKeyInfo[L];
            }
          }, k.destroy = function() {
            this.detach();
            for (var L in this.keyUriToKeyInfo) {
              var x = this.keyUriToKeyInfo[L].loader;
              x && x.destroy();
            }
            this.keyUriToKeyInfo = {};
          }, k.createKeyLoadError = function(L, x, _, T) {
            return x === void 0 && (x = F.ErrorDetails.KEY_LOAD_ERROR), new A.LoadError({
              type: F.ErrorTypes.NETWORK_ERROR,
              details: x,
              fatal: !1,
              frag: L,
              networkDetails: _
            });
          }, k.loadClear = function(L, x) {
            var _ = this;
            if (this.emeController && this.config.emeEnabled)
              for (var T = L.sn, h = L.cc, y = function(a) {
                var i = x[a];
                if (h <= i.cc && (T === "initSegment" || T < i.sn))
                  return _.emeController.selectKeySystemFormat(i).then(function(g) {
                    i.setKeyFormat(g);
                  }), "break";
              }, m = 0; m < x.length; m++) {
                var s = y(m);
                if (s === "break")
                  break;
              }
          }, k.load = function(L) {
            var x = this;
            return !L.decryptdata && L.encrypted && this.emeController ? this.emeController.selectKeySystemFormat(L).then(function(_) {
              return x.loadInternal(L, _);
            }) : this.loadInternal(L);
          }, k.loadInternal = function(L, x) {
            var _, T;
            x && L.setKeyFormat(x);
            var h = L.decryptdata;
            if (!h) {
              var y = x ? "Expected frag.decryptdata to be defined after setting format " + x : "Missing decryption data on fragment in onKeyLoading";
              return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, y));
            }
            var m = h.uri;
            if (!m)
              return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, 'Invalid key URI: "' + m + '"'));
            var s = this.keyUriToKeyInfo[m];
            if ((_ = s) !== null && _ !== void 0 && _.decryptdata.key)
              return h.key = s.decryptdata.key, Promise.resolve({
                frag: L,
                keyInfo: s
              });
            if ((T = s) !== null && T !== void 0 && T.keyLoadPromise) {
              var f;
              switch ((f = s.mediaKeySessionContext) === null || f === void 0 ? void 0 : f.keyStatus) {
                case void 0:
                case "status-pending":
                case "usable":
                case "usable-in-future":
                  return s.keyLoadPromise;
              }
            }
            switch (s = this.keyUriToKeyInfo[m] = {
              decryptdata: h,
              keyLoadPromise: null,
              loader: null,
              mediaKeySessionContext: null
            }, h.method) {
              case "ISO-23001-7":
              case "SAMPLE-AES":
              case "SAMPLE-AES-CENC":
              case "SAMPLE-AES-CTR":
                return h.keyFormat === "identity" ? this.loadKeyHTTP(s, L) : this.loadKeyEME(s, L);
              case "AES-128":
                return this.loadKeyHTTP(s, L);
              default:
                return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, 'Key supplied with unsupported METHOD: "' + h.method + '"'));
            }
          }, k.loadKeyEME = function(L, x) {
            var _ = {
              frag: x,
              keyInfo: L
            };
            if (this.emeController && this.config.emeEnabled) {
              var T = this.emeController.loadKey(_);
              if (T)
                return (L.keyLoadPromise = T.then(function(h) {
                  return L.mediaKeySessionContext = h, _;
                })).catch(function(h) {
                  throw L.keyLoadPromise = null, h;
                });
            }
            return Promise.resolve(_);
          }, k.loadKeyHTTP = function(L, x) {
            var _ = this, T = this.config, h = T.loader, y = new h(T);
            return x.keyLoader = L.loader = y, L.keyLoadPromise = new Promise(function(m, s) {
              var f = {
                keyInfo: L,
                frag: x,
                responseType: "arraybuffer",
                url: L.decryptdata.uri
              }, a = {
                timeout: T.fragLoadingTimeOut,
                maxRetry: 0,
                retryDelay: T.fragLoadingRetryDelay,
                maxRetryDelay: T.fragLoadingMaxRetryTimeout,
                highWaterMark: 0
              }, i = {
                onSuccess: function(o, r, l, v) {
                  var u = l.frag, n = l.keyInfo, t = l.url;
                  if (!u.decryptdata || n !== _.keyUriToKeyInfo[t])
                    return s(_.createKeyLoadError(u, F.ErrorDetails.KEY_LOAD_ERROR, v, "after key load, decryptdata unset or changed"));
                  n.decryptdata.key = u.decryptdata.key = new Uint8Array(o.data), u.keyLoader = null, n.loader = null, m({
                    frag: u,
                    keyInfo: n
                  });
                },
                onError: function(o, r, l) {
                  _.resetLoader(r), s(_.createKeyLoadError(x, F.ErrorDetails.KEY_LOAD_ERROR, l));
                },
                onTimeout: function(o, r, l) {
                  _.resetLoader(r), s(_.createKeyLoadError(x, F.ErrorDetails.KEY_LOAD_TIMEOUT, l));
                },
                onAbort: function(o, r, l) {
                  _.resetLoader(r), s(_.createKeyLoadError(x, F.ErrorDetails.INTERNAL_ABORTED, l));
                }
              };
              y.load(f, a, i);
            });
          }, k.resetLoader = function(L) {
            var x = L.frag, _ = L.keyInfo, T = L.url, h = _.loader;
            x.keyLoader === h && (x.keyLoader = null, _.loader = null), delete this.keyUriToKeyInfo[T], h && h.destroy();
          }, I;
        }();
      },
      "./src/loader/level-details.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          LevelDetails: () => L
        });
        var F = S("./src/polyfills/number.ts");
        function A(x, _) {
          for (var T = 0; T < _.length; T++) {
            var h = _[T];
            h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(x, I(h.key), h);
          }
        }
        function C(x, _, T) {
          return _ && A(x.prototype, _), T && A(x, T), Object.defineProperty(x, "prototype", { writable: !1 }), x;
        }
        function I(x) {
          var _ = k(x, "string");
          return typeof _ == "symbol" ? _ : String(_);
        }
        function k(x, _) {
          if (typeof x != "object" || x === null)
            return x;
          var T = x[Symbol.toPrimitive];
          if (T !== void 0) {
            var h = T.call(x, _ || "default");
            if (typeof h != "object")
              return h;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (_ === "string" ? String : Number)(x);
        }
        var P = 10, L = /* @__PURE__ */ function() {
          function x(T) {
            this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = T;
          }
          var _ = x.prototype;
          return _.reloaded = function(h) {
            if (!h) {
              this.advanced = !0, this.updated = !0;
              return;
            }
            var y = this.lastPartSn - h.lastPartSn, m = this.lastPartIndex - h.lastPartIndex;
            this.updated = this.endSN !== h.endSN || !!m || !!y, this.advanced = this.endSN > h.endSN || y > 0 || y === 0 && m > 0, this.updated || this.advanced ? this.misses = Math.floor(h.misses * 0.6) : this.misses = h.misses + 1, this.availabilityDelay = h.availabilityDelay;
          }, C(x, [{
            key: "hasProgramDateTime",
            get: function() {
              return this.fragments.length ? (0, F.isFiniteNumber)(this.fragments[this.fragments.length - 1].programDateTime) : !1;
            }
          }, {
            key: "levelTargetDuration",
            get: function() {
              return this.averagetargetduration || this.targetduration || P;
            }
          }, {
            key: "drift",
            get: function() {
              var h = this.driftEndTime - this.driftStartTime;
              if (h > 0) {
                var y = this.driftEnd - this.driftStart;
                return y * 1e3 / h;
              }
              return 1;
            }
          }, {
            key: "edge",
            get: function() {
              return this.partEnd || this.fragmentEnd;
            }
          }, {
            key: "partEnd",
            get: function() {
              var h;
              return (h = this.partList) !== null && h !== void 0 && h.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
            }
          }, {
            key: "fragmentEnd",
            get: function() {
              var h;
              return (h = this.fragments) !== null && h !== void 0 && h.length ? this.fragments[this.fragments.length - 1].end : 0;
            }
          }, {
            key: "age",
            get: function() {
              return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
            }
          }, {
            key: "lastPartIndex",
            get: function() {
              var h;
              return (h = this.partList) !== null && h !== void 0 && h.length ? this.partList[this.partList.length - 1].index : -1;
            }
          }, {
            key: "lastPartSn",
            get: function() {
              var h;
              return (h = this.partList) !== null && h !== void 0 && h.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
            }
          }]), x;
        }();
      },
      "./src/loader/level-key.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          LevelKey: () => L
        });
        var F = S("./src/utils/keysystem-util.ts"), A = S("./src/utils/mediakeys-helper.ts"), C = S("./src/utils/mp4-tools.ts"), I = S("./src/utils/logger.ts"), k = S("./src/utils/numeric-encoding-utils.ts"), P = {}, L = /* @__PURE__ */ function() {
          _.clearKeyUriToKeyIdMap = function() {
            P = {};
          };
          function _(h, y, m, s, f) {
            s === void 0 && (s = [1]), f === void 0 && (f = null), this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = h, this.uri = y, this.keyFormat = m, this.keyFormatVersions = s, this.iv = f, this.encrypted = h ? h !== "NONE" : !1, this.isCommonEncryption = this.encrypted && h !== "AES-128";
          }
          var T = _.prototype;
          return T.isSupported = function() {
            if (this.method) {
              if (this.method === "AES-128" || this.method === "NONE")
                return !0;
              switch (this.keyFormat) {
                case "identity":
                  return this.method === "SAMPLE-AES";
                case A.KeySystemFormats.FAIRPLAY:
                case A.KeySystemFormats.WIDEVINE:
                case A.KeySystemFormats.PLAYREADY:
                case A.KeySystemFormats.CLEARKEY:
                  return ["ISO-23001-7", "SAMPLE-AES", "SAMPLE-AES-CENC", "SAMPLE-AES-CTR"].indexOf(this.method) !== -1;
              }
            }
            return !1;
          }, T.getDecryptData = function(y) {
            if (!this.encrypted || !this.uri)
              return null;
            if (this.method === "AES-128" && this.uri && !this.iv) {
              typeof y != "number" && (this.method === "AES-128" && !this.iv && I.logger.warn('missing IV for initialization segment with method="' + this.method + '" - compliance issue'), y = 0);
              var m = x(y), s = new _(this.method, this.uri, "identity", this.keyFormatVersions, m);
              return s;
            }
            var f = (0, F.convertDataUriToArrayBytes)(this.uri);
            if (f)
              switch (this.keyFormat) {
                case A.KeySystemFormats.WIDEVINE:
                  this.pssh = f, f.length >= 22 && (this.keyId = f.subarray(f.length - 22, f.length - 6));
                  break;
                case A.KeySystemFormats.PLAYREADY: {
                  var a = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]);
                  this.pssh = (0, C.mp4pssh)(a, null, f);
                  var i = new Uint16Array(f.buffer, f.byteOffset, f.byteLength / 2), g = String.fromCharCode.apply(null, Array.from(i)), o = g.substring(g.indexOf("<"), g.length), r = new DOMParser(), l = r.parseFromString(o, "text/xml"), v = l.getElementsByTagName("KID")[0];
                  if (v) {
                    var u = v.childNodes[0] ? v.childNodes[0].nodeValue : v.getAttribute("VALUE");
                    if (u) {
                      var n = (0, k.base64Decode)(u).subarray(0, 16);
                      (0, F.changeEndianness)(n), this.keyId = n;
                    }
                  }
                  break;
                }
                default: {
                  var t = f.subarray(0, 16);
                  if (t.length !== 16) {
                    var c = new Uint8Array(16);
                    c.set(t, 16 - t.length), t = c;
                  }
                  this.keyId = t;
                  break;
                }
              }
            if (!this.keyId || this.keyId.byteLength !== 16) {
              var e = P[this.uri];
              if (!e) {
                var d = Object.keys(P).length % Number.MAX_SAFE_INTEGER;
                e = new Uint8Array(16);
                var E = new DataView(e.buffer, 12, 4);
                E.setUint32(0, d), P[this.uri] = e;
              }
              this.keyId = e;
            }
            return this;
          }, _;
        }();
        function x(_) {
          for (var T = new Uint8Array(16), h = 12; h < 16; h++)
            T[h] = _ >> 8 * (15 - h) & 255;
          return T;
        }
      },
      "./src/loader/load-stats.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          LoadStats: () => F
        });
        var F = function() {
          this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
            start: 0,
            first: 0,
            end: 0
          }, this.parsing = {
            start: 0,
            end: 0
          }, this.buffering = {
            start: 0,
            first: 0,
            end: 0
          };
        };
      },
      "./src/loader/m3u8-parser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => f
        });
        var F = S("./src/polyfills/number.ts"), A = S("./node_modules/url-toolkit/src/url-toolkit.js"), C = S("./src/loader/date-range.ts"), I = S("./src/loader/fragment.ts"), k = S("./src/loader/level-details.ts"), P = S("./src/loader/level-key.ts"), L = S("./src/utils/attr-list.ts"), x = S("./src/utils/logger.ts"), _ = S("./src/utils/codecs.ts");
        function T() {
          return T = Object.assign ? Object.assign.bind() : function(v) {
            for (var u = 1; u < arguments.length; u++) {
              var n = arguments[u];
              for (var t in n)
                Object.prototype.hasOwnProperty.call(n, t) && (v[t] = n[t]);
            }
            return v;
          }, T.apply(this, arguments);
        }
        var h = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+|#EXT-X-SESSION-KEY:([^\n\r]*)[\r\n]+/g, y = /#EXT-X-MEDIA:(.*)/g, m = new RegExp([
          /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
          /(?!#) *(\S[\S ]*)/.source,
          /#EXT-X-BYTERANGE:*(.+)/.source,
          /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
          /#.*/.source
        ].join("|"), "g"), s = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")), f = /* @__PURE__ */ function() {
          function v() {
          }
          return v.findGroup = function(n, t) {
            for (var c = 0; c < n.length; c++) {
              var e = n[c];
              if (e.id === t)
                return e;
            }
          }, v.convertAVC1ToAVCOTI = function(n) {
            var t = n.split(".");
            if (t.length > 2) {
              var c = t.shift() + ".";
              return c += parseInt(t.shift()).toString(16), c += ("000" + parseInt(t.shift()).toString(16)).slice(-4), c;
            }
            return n;
          }, v.resolve = function(n, t) {
            return (0, A.buildAbsoluteURL)(t, n, {
              alwaysNormalize: !0
            });
          }, v.parseMasterPlaylist = function(n, t) {
            var c = [], e = [], d = {}, E = [], p = !1;
            h.lastIndex = 0;
            for (var D; (D = h.exec(n)) != null; )
              if (D[1]) {
                var R, b = new L.AttrList(D[1]), O = {
                  attrs: b,
                  bitrate: b.decimalInteger("AVERAGE-BANDWIDTH") || b.decimalInteger("BANDWIDTH"),
                  name: b.NAME,
                  url: v.resolve(D[2], t)
                }, M = b.decimalResolution("RESOLUTION");
                M && (O.width = M.width, O.height = M.height), i((b.CODECS || "").split(/[ ,]+/).filter(function(W) {
                  return W;
                }), O), O.videoCodec && O.videoCodec.indexOf("avc1") !== -1 && (O.videoCodec = v.convertAVC1ToAVCOTI(O.videoCodec)), (R = O.unknownCodecs) !== null && R !== void 0 && R.length || e.push(O), c.push(O);
              } else if (D[3]) {
                var w = new L.AttrList(D[3]);
                w["DATA-ID"] && (p = !0, d[w["DATA-ID"]] = w);
              } else if (D[4]) {
                var U = D[4], N = a(U, t);
                N.encrypted && N.isSupported() ? E.push(N) : x.logger.warn('[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "' + U + '"');
              }
            var K = e.length > 0 && e.length < c.length;
            return {
              levels: K ? e : c,
              sessionData: p ? d : null,
              sessionKeys: E.length ? E : null
            };
          }, v.parseMasterPlaylistMedia = function(n, t, c, e) {
            e === void 0 && (e = []);
            var d, E = [], p = 0;
            for (y.lastIndex = 0; (d = y.exec(n)) !== null; ) {
              var D = new L.AttrList(d[1]);
              if (D.TYPE === c) {
                var R = {
                  attrs: D,
                  bitrate: 0,
                  id: p++,
                  groupId: D["GROUP-ID"],
                  instreamId: D["INSTREAM-ID"],
                  name: D.NAME || D.LANGUAGE || "",
                  type: c,
                  default: D.bool("DEFAULT"),
                  autoselect: D.bool("AUTOSELECT"),
                  forced: D.bool("FORCED"),
                  lang: D.LANGUAGE,
                  url: D.URI ? v.resolve(D.URI, t) : ""
                };
                if (e.length) {
                  var b = v.findGroup(e, R.groupId) || e[0];
                  g(R, b, "audioCodec"), g(R, b, "textCodec");
                }
                E.push(R);
              }
            }
            return E;
          }, v.parseLevelPlaylist = function(n, t, c, e, d) {
            var E = new k.LevelDetails(t), p = E.fragments, D = null, R = 0, b = 0, O = 0, M = 0, w = null, U = new I.Fragment(e, t), N, K, W, G = -1, j = !1;
            for (m.lastIndex = 0, E.m3u8 = n; (N = m.exec(n)) !== null; ) {
              j && (j = !1, U = new I.Fragment(e, t), U.start = O, U.sn = R, U.cc = M, U.level = c, D && (U.initSegment = D, U.rawProgramDateTime = D.rawProgramDateTime, D.rawProgramDateTime = null));
              var H = N[1];
              if (H) {
                U.duration = parseFloat(H);
                var X = (" " + N[2]).slice(1);
                U.title = X || null, U.tagList.push(X ? ["INF", H, X] : ["INF", H]);
              } else if (N[3]) {
                if ((0, F.isFiniteNumber)(U.duration)) {
                  if (U.start = O, W) {
                    U.levelkeys = W;
                    var Z = E.encryptedFragments;
                    U.levelkeys && Object.keys(U.levelkeys).some(function(Le) {
                      return U.levelkeys[Le].isCommonEncryption;
                    }) && (!Z.length || Z[Z.length - 1].levelkeys !== W) && Z.push(U);
                  }
                  U.sn = R, U.level = c, U.cc = M, U.urlId = d, p.push(U), U.relurl = (" " + N[3]).slice(1), r(U, w), w = U, O += U.duration, R++, b = 0, j = !0;
                }
              } else if (N[4]) {
                var J = (" " + N[4]).slice(1);
                w ? U.setByteRange(J, w) : U.setByteRange(J);
              } else if (N[5])
                U.rawProgramDateTime = (" " + N[5]).slice(1), U.tagList.push(["PROGRAM-DATE-TIME", U.rawProgramDateTime]), G === -1 && (G = p.length);
              else {
                if (N = N[0].match(s), !N) {
                  x.logger.warn("No matches on slow regex match for level playlist!");
                  continue;
                }
                for (K = 1; K < N.length && typeof N[K] == "undefined"; K++)
                  ;
                var $ = (" " + N[K]).slice(1), z = (" " + N[K + 1]).slice(1), q = N[K + 2] ? (" " + N[K + 2]).slice(1) : "";
                switch ($) {
                  case "PLAYLIST-TYPE":
                    E.type = z.toUpperCase();
                    break;
                  case "MEDIA-SEQUENCE":
                    R = E.startSN = parseInt(z);
                    break;
                  case "SKIP": {
                    var ie = new L.AttrList(z), ne = ie.decimalInteger("SKIPPED-SEGMENTS");
                    if ((0, F.isFiniteNumber)(ne)) {
                      E.skippedSegments = ne;
                      for (var de = ne; de--; )
                        p.unshift(null);
                      R += ne;
                    }
                    var se = ie.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                    se && (E.recentlyRemovedDateranges = se.split("	"));
                    break;
                  }
                  case "TARGETDURATION":
                    E.targetduration = parseFloat(z);
                    break;
                  case "VERSION":
                    E.version = parseInt(z);
                    break;
                  case "EXTM3U":
                    break;
                  case "ENDLIST":
                    E.live = !1;
                    break;
                  case "#":
                    (z || q) && U.tagList.push(q ? [z, q] : [z]);
                    break;
                  case "DISCONTINUITY":
                    M++, U.tagList.push(["DIS"]);
                    break;
                  case "GAP":
                    U.tagList.push([$]);
                    break;
                  case "BITRATE":
                    U.tagList.push([$, z]);
                    break;
                  case "DATERANGE": {
                    var ue = new L.AttrList(z), ae = new C.DateRange(ue, E.dateRanges[ue.ID]);
                    ae.isValid || E.skippedSegments ? E.dateRanges[ae.id] = ae : x.logger.warn('Ignoring invalid DATERANGE tag: "' + z + '"'), U.tagList.push(["EXT-X-DATERANGE", z]);
                    break;
                  }
                  case "DISCONTINUITY-SEQUENCE":
                    M = parseInt(z);
                    break;
                  case "KEY": {
                    var oe = a(z, t);
                    if (oe.isSupported()) {
                      if (oe.method === "NONE") {
                        W = void 0;
                        break;
                      }
                      W || (W = {}), W[oe.keyFormat] && (W = T({}, W)), W[oe.keyFormat] = oe;
                    } else
                      x.logger.warn('[Keys] Ignoring invalid EXT-X-KEY tag: "' + z + '"');
                    break;
                  }
                  case "START": {
                    var le = new L.AttrList(z), he = le.decimalFloatingPoint("TIME-OFFSET");
                    (0, F.isFiniteNumber)(he) && (E.startTimeOffset = he);
                    break;
                  }
                  case "MAP": {
                    var me = new L.AttrList(z);
                    if (U.duration) {
                      var ce = new I.Fragment(e, t);
                      l(ce, me, c, W), D = ce, U.initSegment = D, D.rawProgramDateTime && !U.rawProgramDateTime && (U.rawProgramDateTime = D.rawProgramDateTime);
                    } else
                      l(U, me, c, W), D = U, j = !0;
                    break;
                  }
                  case "SERVER-CONTROL": {
                    var pe = new L.AttrList(z);
                    E.canBlockReload = pe.bool("CAN-BLOCK-RELOAD"), E.canSkipUntil = pe.optionalFloat("CAN-SKIP-UNTIL", 0), E.canSkipDateRanges = E.canSkipUntil > 0 && pe.bool("CAN-SKIP-DATERANGES"), E.partHoldBack = pe.optionalFloat("PART-HOLD-BACK", 0), E.holdBack = pe.optionalFloat("HOLD-BACK", 0);
                    break;
                  }
                  case "PART-INF": {
                    var Re = new L.AttrList(z);
                    E.partTarget = Re.decimalFloatingPoint("PART-TARGET");
                    break;
                  }
                  case "PART": {
                    var Te = E.partList;
                    Te || (Te = E.partList = []);
                    var be = b > 0 ? Te[Te.length - 1] : void 0, De = b++, _e = new I.Part(new L.AttrList(z), U, t, De, be);
                    Te.push(_e), U.duration += _e.duration;
                    break;
                  }
                  case "PRELOAD-HINT": {
                    var Se = new L.AttrList(z);
                    E.preloadHint = Se;
                    break;
                  }
                  case "RENDITION-REPORT": {
                    var ye = new L.AttrList(z);
                    E.renditionReports = E.renditionReports || [], E.renditionReports.push(ye);
                    break;
                  }
                  default:
                    x.logger.warn("line parsed but not handled: " + N);
                    break;
                }
              }
            }
            w && !w.relurl ? (p.pop(), O -= w.duration, E.partList && (E.fragmentHint = w)) : E.partList && (r(U, w), U.cc = M, E.fragmentHint = U);
            var Ee = p.length, xe = p[0], Ae = p[Ee - 1];
            if (O += E.skippedSegments * E.targetduration, O > 0 && Ee && Ae) {
              E.averagetargetduration = O / Ee;
              var ve = Ae.sn;
              E.endSN = ve !== "initSegment" ? ve : 0, E.live || (Ae.endList = !0), xe && (E.startCC = xe.cc);
            } else
              E.endSN = 0, E.startCC = 0;
            return E.fragmentHint && (O += E.fragmentHint.duration), E.totalduration = O, E.endCC = M, G > 0 && o(p, G), E;
          }, v;
        }();
        function a(v, u) {
          var n, t, c = new L.AttrList(v), e = (n = c.enumeratedString("METHOD")) != null ? n : "", d = c.URI, E = c.hexadecimalInteger("IV"), p = c.enumeratedString("KEYFORMATVERSIONS"), D = (t = c.enumeratedString("KEYFORMAT")) != null ? t : "identity";
          d && c.IV && !E && x.logger.error("Invalid IV: " + c.IV);
          var R = d ? f.resolve(d, u) : "", b = (p || "1").split("/").map(Number).filter(Number.isFinite);
          return new P.LevelKey(e, R, D, b, E);
        }
        function i(v, u) {
          ["video", "audio", "text"].forEach(function(n) {
            var t = v.filter(function(e) {
              return (0, _.isCodecType)(e, n);
            });
            if (t.length) {
              var c = t.filter(function(e) {
                return e.lastIndexOf("avc1", 0) === 0 || e.lastIndexOf("mp4a", 0) === 0;
              });
              u[n + "Codec"] = c.length > 0 ? c[0] : t[0], v = v.filter(function(e) {
                return t.indexOf(e) === -1;
              });
            }
          }), u.unknownCodecs = v;
        }
        function g(v, u, n) {
          var t = u[n];
          t && (v[n] = t);
        }
        function o(v, u) {
          for (var n = v[u], t = u; t--; ) {
            var c = v[t];
            if (!c)
              return;
            c.programDateTime = n.programDateTime - c.duration * 1e3, n = c;
          }
        }
        function r(v, u) {
          v.rawProgramDateTime ? v.programDateTime = Date.parse(v.rawProgramDateTime) : u != null && u.programDateTime && (v.programDateTime = u.endProgramDateTime), (0, F.isFiniteNumber)(v.programDateTime) || (v.programDateTime = null, v.rawProgramDateTime = null);
        }
        function l(v, u, n, t) {
          v.relurl = u.URI, u.BYTERANGE && v.setByteRange(u.BYTERANGE), v.level = n, v.sn = "initSegment", t && (v.levelkeys = t), v.initSegment = null;
        }
      },
      "./src/loader/playlist-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => h
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/errors.ts"), I = S("./src/utils/logger.ts"), k = S("./src/loader/m3u8-parser.ts"), P = S("./src/types/loader.ts"), L = S("./src/utils/attr-list.ts");
        function x(y) {
          var m = y.type;
          switch (m) {
            case P.PlaylistContextType.AUDIO_TRACK:
              return P.PlaylistLevelType.AUDIO;
            case P.PlaylistContextType.SUBTITLE_TRACK:
              return P.PlaylistLevelType.SUBTITLE;
            default:
              return P.PlaylistLevelType.MAIN;
          }
        }
        function _(y, m) {
          var s = y.url;
          return (s === void 0 || s.indexOf("data:") === 0) && (s = m.url), s;
        }
        var T = /* @__PURE__ */ function() {
          function y(s) {
            this.hls = void 0, this.loaders = /* @__PURE__ */ Object.create(null), this.hls = s, this.registerListeners();
          }
          var m = y.prototype;
          return m.startLoad = function(f) {
          }, m.stopLoad = function() {
            this.destroyInternalLoaders();
          }, m.registerListeners = function() {
            var f = this.hls;
            f.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), f.on(A.Events.LEVEL_LOADING, this.onLevelLoading, this), f.on(A.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), f.on(A.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
          }, m.unregisterListeners = function() {
            var f = this.hls;
            f.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), f.off(A.Events.LEVEL_LOADING, this.onLevelLoading, this), f.off(A.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), f.off(A.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
          }, m.createInternalLoader = function(f) {
            var a = this.hls.config, i = a.pLoader, g = a.loader, o = i || g, r = new o(a);
            return f.loader = r, this.loaders[f.type] = r, r;
          }, m.getInternalLoader = function(f) {
            return this.loaders[f.type];
          }, m.resetInternalLoader = function(f) {
            this.loaders[f] && delete this.loaders[f];
          }, m.destroyInternalLoaders = function() {
            for (var f in this.loaders) {
              var a = this.loaders[f];
              a && a.destroy(), this.resetInternalLoader(f);
            }
          }, m.destroy = function() {
            this.unregisterListeners(), this.destroyInternalLoaders();
          }, m.onManifestLoading = function(f, a) {
            var i = a.url;
            this.load({
              id: null,
              groupId: null,
              level: 0,
              responseType: "text",
              type: P.PlaylistContextType.MANIFEST,
              url: i,
              deliveryDirectives: null
            });
          }, m.onLevelLoading = function(f, a) {
            var i = a.id, g = a.level, o = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: null,
              level: g,
              responseType: "text",
              type: P.PlaylistContextType.LEVEL,
              url: o,
              deliveryDirectives: r
            });
          }, m.onAudioTrackLoading = function(f, a) {
            var i = a.id, g = a.groupId, o = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: g,
              level: null,
              responseType: "text",
              type: P.PlaylistContextType.AUDIO_TRACK,
              url: o,
              deliveryDirectives: r
            });
          }, m.onSubtitleTrackLoading = function(f, a) {
            var i = a.id, g = a.groupId, o = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: g,
              level: null,
              responseType: "text",
              type: P.PlaylistContextType.SUBTITLE_TRACK,
              url: o,
              deliveryDirectives: r
            });
          }, m.load = function(f) {
            var a, i = this.hls.config, g = this.getInternalLoader(f);
            if (g) {
              var o = g.context;
              if (o && o.url === f.url) {
                I.logger.trace("[playlist-loader]: playlist request ongoing");
                return;
              }
              I.logger.log("[playlist-loader]: aborting previous loader for type: " + f.type), g.abort();
            }
            var r, l, v, u;
            switch (f.type) {
              case P.PlaylistContextType.MANIFEST:
                r = i.manifestLoadingMaxRetry, l = i.manifestLoadingTimeOut, v = i.manifestLoadingRetryDelay, u = i.manifestLoadingMaxRetryTimeout;
                break;
              case P.PlaylistContextType.LEVEL:
              case P.PlaylistContextType.AUDIO_TRACK:
              case P.PlaylistContextType.SUBTITLE_TRACK:
                r = 0, l = i.levelLoadingTimeOut;
                break;
              default:
                r = i.levelLoadingMaxRetry, l = i.levelLoadingTimeOut, v = i.levelLoadingRetryDelay, u = i.levelLoadingMaxRetryTimeout;
                break;
            }
            if (g = this.createInternalLoader(f), (a = f.deliveryDirectives) !== null && a !== void 0 && a.part) {
              var n;
              if (f.type === P.PlaylistContextType.LEVEL && f.level !== null ? n = this.hls.levels[f.level].details : f.type === P.PlaylistContextType.AUDIO_TRACK && f.id !== null ? n = this.hls.audioTracks[f.id].details : f.type === P.PlaylistContextType.SUBTITLE_TRACK && f.id !== null && (n = this.hls.subtitleTracks[f.id].details), n) {
                var t = n.partTarget, c = n.targetduration;
                t && c && (l = Math.min(Math.max(t * 3, c * 0.8) * 1e3, l));
              }
            }
            var e = {
              timeout: l,
              maxRetry: r,
              retryDelay: v,
              maxRetryDelay: u,
              highWaterMark: 0
            }, d = {
              onSuccess: this.loadsuccess.bind(this),
              onError: this.loaderror.bind(this),
              onTimeout: this.loadtimeout.bind(this)
            };
            g.load(f, e, d);
          }, m.loadsuccess = function(f, a, i, g) {
            g === void 0 && (g = null), this.resetInternalLoader(i.type);
            var o = f.data;
            if (o.indexOf("#EXTM3U") !== 0) {
              this.handleManifestParsingError(f, i, "no EXTM3U delimiter", g);
              return;
            }
            a.parsing.start = performance.now(), o.indexOf("#EXTINF:") > 0 || o.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(f, a, i, g) : this.handleMasterPlaylist(f, a, i, g);
          }, m.loaderror = function(f, a, i) {
            i === void 0 && (i = null), this.handleNetworkError(a, i, !1, f);
          }, m.loadtimeout = function(f, a, i) {
            i === void 0 && (i = null), this.handleNetworkError(a, i, !0);
          }, m.handleMasterPlaylist = function(f, a, i, g) {
            var o = this.hls, r = f.data, l = _(f, i), v = k.default.parseMasterPlaylist(r, l), u = v.levels, n = v.sessionData, t = v.sessionKeys;
            if (!u.length) {
              this.handleManifestParsingError(f, i, "no level found in manifest", g);
              return;
            }
            var c = u.map(function(R) {
              return {
                id: R.attrs.AUDIO,
                audioCodec: R.audioCodec
              };
            }), e = u.map(function(R) {
              return {
                id: R.attrs.SUBTITLES,
                textCodec: R.textCodec
              };
            }), d = k.default.parseMasterPlaylistMedia(r, l, "AUDIO", c), E = k.default.parseMasterPlaylistMedia(r, l, "SUBTITLES", e), p = k.default.parseMasterPlaylistMedia(r, l, "CLOSED-CAPTIONS");
            if (d.length) {
              var D = d.some(function(R) {
                return !R.url;
              });
              !D && u[0].audioCodec && !u[0].attrs.AUDIO && (I.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), d.unshift({
                type: "main",
                name: "main",
                default: !1,
                autoselect: !1,
                forced: !1,
                id: -1,
                attrs: new L.AttrList({}),
                bitrate: 0,
                url: ""
              }));
            }
            o.trigger(A.Events.MANIFEST_LOADED, {
              levels: u,
              audioTracks: d,
              subtitles: E,
              captions: p,
              url: l,
              stats: a,
              networkDetails: g,
              sessionData: n,
              sessionKeys: t
            });
          }, m.handleTrackOrLevelPlaylist = function(f, a, i, g) {
            var o = this.hls, r = i.id, l = i.level, v = i.type, u = _(f, i), n = (0, F.isFiniteNumber)(r) ? r : 0, t = (0, F.isFiniteNumber)(l) ? l : n, c = x(i), e = k.default.parseLevelPlaylist(f.data, u, t, c, n);
            if (!e.fragments.length) {
              o.trigger(A.Events.ERROR, {
                type: C.ErrorTypes.NETWORK_ERROR,
                details: C.ErrorDetails.LEVEL_EMPTY_ERROR,
                fatal: !1,
                url: u,
                reason: "no fragments found in level",
                level: typeof i.level == "number" ? i.level : void 0
              });
              return;
            }
            if (v === P.PlaylistContextType.MANIFEST) {
              var d = {
                attrs: new L.AttrList({}),
                bitrate: 0,
                details: e,
                name: "",
                url: u
              };
              o.trigger(A.Events.MANIFEST_LOADED, {
                levels: [d],
                audioTracks: [],
                url: u,
                stats: a,
                networkDetails: g,
                sessionData: null,
                sessionKeys: null
              });
            }
            a.parsing.end = performance.now(), i.levelDetails = e, this.handlePlaylistLoaded(f, a, i, g);
          }, m.handleManifestParsingError = function(f, a, i, g) {
            this.hls.trigger(A.Events.ERROR, {
              type: C.ErrorTypes.NETWORK_ERROR,
              details: C.ErrorDetails.MANIFEST_PARSING_ERROR,
              fatal: a.type === P.PlaylistContextType.MANIFEST,
              url: f.url,
              reason: i,
              response: f,
              context: a,
              networkDetails: g
            });
          }, m.handleNetworkError = function(f, a, i, g) {
            i === void 0 && (i = !1), I.logger.warn("[playlist-loader]: A network " + (i ? "timeout" : "error") + " occurred while loading " + f.type + " level: " + f.level + " id: " + f.id + ' group-id: "' + f.groupId + '"');
            var o = C.ErrorDetails.UNKNOWN, r = !1, l = this.getInternalLoader(f);
            switch (f.type) {
              case P.PlaylistContextType.MANIFEST:
                o = i ? C.ErrorDetails.MANIFEST_LOAD_TIMEOUT : C.ErrorDetails.MANIFEST_LOAD_ERROR, r = !0;
                break;
              case P.PlaylistContextType.LEVEL:
                o = i ? C.ErrorDetails.LEVEL_LOAD_TIMEOUT : C.ErrorDetails.LEVEL_LOAD_ERROR, r = !1;
                break;
              case P.PlaylistContextType.AUDIO_TRACK:
                o = i ? C.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : C.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, r = !1;
                break;
              case P.PlaylistContextType.SUBTITLE_TRACK:
                o = i ? C.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : C.ErrorDetails.SUBTITLE_LOAD_ERROR, r = !1;
                break;
            }
            l && this.resetInternalLoader(f.type);
            var v = {
              type: C.ErrorTypes.NETWORK_ERROR,
              details: o,
              fatal: r,
              url: f.url,
              loader: l,
              context: f,
              networkDetails: a
            };
            g && (v.response = g), this.hls.trigger(A.Events.ERROR, v);
          }, m.handlePlaylistLoaded = function(f, a, i, g) {
            var o = i.type, r = i.level, l = i.id, v = i.groupId, u = i.loader, n = i.levelDetails, t = i.deliveryDirectives;
            if (!(n != null && n.targetduration)) {
              this.handleManifestParsingError(f, i, "invalid target duration", g);
              return;
            }
            if (!!u)
              switch (n.live && (u.getCacheAge && (n.ageHeader = u.getCacheAge() || 0), (!u.getCacheAge || isNaN(n.ageHeader)) && (n.ageHeader = 0)), o) {
                case P.PlaylistContextType.MANIFEST:
                case P.PlaylistContextType.LEVEL:
                  this.hls.trigger(A.Events.LEVEL_LOADED, {
                    details: n,
                    level: r || 0,
                    id: l || 0,
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
                case P.PlaylistContextType.AUDIO_TRACK:
                  this.hls.trigger(A.Events.AUDIO_TRACK_LOADED, {
                    details: n,
                    id: l || 0,
                    groupId: v || "",
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
                case P.PlaylistContextType.SUBTITLE_TRACK:
                  this.hls.trigger(A.Events.SUBTITLE_TRACK_LOADED, {
                    details: n,
                    id: l || 0,
                    groupId: v || "",
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
              }
          }, y;
        }();
        const h = T;
      },
      "./src/polyfills/number.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          MAX_SAFE_INTEGER: () => A,
          isFiniteNumber: () => F
        });
        var F = Number.isFinite || function(C) {
          return typeof C == "number" && isFinite(C);
        }, A = Number.MAX_SAFE_INTEGER || 9007199254740991;
      },
      "./src/remux/aac-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = /* @__PURE__ */ function() {
          function C() {
          }
          return C.getSilentFrame = function(k, P) {
            switch (k) {
              case "mp4a.40.2":
                if (P === 1)
                  return new Uint8Array([0, 200, 0, 128, 35, 128]);
                if (P === 2)
                  return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                if (P === 3)
                  return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                if (P === 4)
                  return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                if (P === 5)
                  return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                if (P === 6)
                  return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                break;
              default:
                if (P === 1)
                  return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                if (P === 2)
                  return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                if (P === 3)
                  return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                break;
            }
          }, C;
        }();
        const A = F;
      },
      "./src/remux/mp4-generator.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => C
        });
        var F = Math.pow(2, 32) - 1, A = /* @__PURE__ */ function() {
          function I() {
          }
          return I.init = function() {
            I.types = {
              avc1: [],
              avcC: [],
              btrt: [],
              dinf: [],
              dref: [],
              esds: [],
              ftyp: [],
              hdlr: [],
              mdat: [],
              mdhd: [],
              mdia: [],
              mfhd: [],
              minf: [],
              moof: [],
              moov: [],
              mp4a: [],
              ".mp3": [],
              mvex: [],
              mvhd: [],
              pasp: [],
              sdtp: [],
              stbl: [],
              stco: [],
              stsc: [],
              stsd: [],
              stsz: [],
              stts: [],
              tfdt: [],
              tfhd: [],
              traf: [],
              trak: [],
              trun: [],
              trex: [],
              tkhd: [],
              vmhd: [],
              smhd: []
            };
            var P;
            for (P in I.types)
              I.types.hasOwnProperty(P) && (I.types[P] = [P.charCodeAt(0), P.charCodeAt(1), P.charCodeAt(2), P.charCodeAt(3)]);
            var L = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              118,
              105,
              100,
              101,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              86,
              105,
              100,
              101,
              111,
              72,
              97,
              110,
              100,
              108,
              101,
              114,
              0
            ]), x = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              115,
              111,
              117,
              110,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              83,
              111,
              117,
              110,
              100,
              72,
              97,
              110,
              100,
              108,
              101,
              114,
              0
            ]);
            I.HDLR_TYPES = {
              video: L,
              audio: x
            };
            var _ = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              12,
              117,
              114,
              108,
              32,
              0,
              0,
              0,
              1
            ]), T = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]);
            I.STTS = I.STSC = I.STCO = T, I.STSZ = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]), I.VMHD = new Uint8Array([
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]), I.SMHD = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]), I.STSD = new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1
            ]);
            var h = new Uint8Array([105, 115, 111, 109]), y = new Uint8Array([97, 118, 99, 49]), m = new Uint8Array([0, 0, 0, 1]);
            I.FTYP = I.box(I.types.ftyp, h, m, h, y), I.DINF = I.box(I.types.dinf, I.box(I.types.dref, _));
          }, I.box = function(P) {
            for (var L = 8, x = arguments.length, _ = new Array(x > 1 ? x - 1 : 0), T = 1; T < x; T++)
              _[T - 1] = arguments[T];
            for (var h = _.length, y = h; h--; )
              L += _[h].byteLength;
            var m = new Uint8Array(L);
            for (m[0] = L >> 24 & 255, m[1] = L >> 16 & 255, m[2] = L >> 8 & 255, m[3] = L & 255, m.set(P, 4), h = 0, L = 8; h < y; h++)
              m.set(_[h], L), L += _[h].byteLength;
            return m;
          }, I.hdlr = function(P) {
            return I.box(I.types.hdlr, I.HDLR_TYPES[P]);
          }, I.mdat = function(P) {
            return I.box(I.types.mdat, P);
          }, I.mdhd = function(P, L) {
            L *= P;
            var x = Math.floor(L / (F + 1)), _ = Math.floor(L % (F + 1));
            return I.box(I.types.mdhd, new Uint8Array([
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              2,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              3,
              P >> 24 & 255,
              P >> 16 & 255,
              P >> 8 & 255,
              P & 255,
              x >> 24,
              x >> 16 & 255,
              x >> 8 & 255,
              x & 255,
              _ >> 24,
              _ >> 16 & 255,
              _ >> 8 & 255,
              _ & 255,
              85,
              196,
              0,
              0
            ]));
          }, I.mdia = function(P) {
            return I.box(I.types.mdia, I.mdhd(P.timescale, P.duration), I.hdlr(P.type), I.minf(P));
          }, I.mfhd = function(P) {
            return I.box(I.types.mfhd, new Uint8Array([
              0,
              0,
              0,
              0,
              P >> 24,
              P >> 16 & 255,
              P >> 8 & 255,
              P & 255
            ]));
          }, I.minf = function(P) {
            return P.type === "audio" ? I.box(I.types.minf, I.box(I.types.smhd, I.SMHD), I.DINF, I.stbl(P)) : I.box(I.types.minf, I.box(I.types.vmhd, I.VMHD), I.DINF, I.stbl(P));
          }, I.moof = function(P, L, x) {
            return I.box(I.types.moof, I.mfhd(P), I.traf(x, L));
          }, I.moov = function(P) {
            for (var L = P.length, x = []; L--; )
              x[L] = I.trak(P[L]);
            return I.box.apply(null, [I.types.moov, I.mvhd(P[0].timescale, P[0].duration)].concat(x).concat(I.mvex(P)));
          }, I.mvex = function(P) {
            for (var L = P.length, x = []; L--; )
              x[L] = I.trex(P[L]);
            return I.box.apply(null, [I.types.mvex].concat(x));
          }, I.mvhd = function(P, L) {
            L *= P;
            var x = Math.floor(L / (F + 1)), _ = Math.floor(L % (F + 1)), T = new Uint8Array([
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              2,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              3,
              P >> 24 & 255,
              P >> 16 & 255,
              P >> 8 & 255,
              P & 255,
              x >> 24,
              x >> 16 & 255,
              x >> 8 & 255,
              x & 255,
              _ >> 24,
              _ >> 16 & 255,
              _ >> 8 & 255,
              _ & 255,
              0,
              1,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              64,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              255,
              255,
              255,
              255
            ]);
            return I.box(I.types.mvhd, T);
          }, I.sdtp = function(P) {
            var L = P.samples || [], x = new Uint8Array(4 + L.length), _, T;
            for (_ = 0; _ < L.length; _++)
              T = L[_].flags, x[_ + 4] = T.dependsOn << 4 | T.isDependedOn << 2 | T.hasRedundancy;
            return I.box(I.types.sdtp, x);
          }, I.stbl = function(P) {
            return I.box(I.types.stbl, I.stsd(P), I.box(I.types.stts, I.STTS), I.box(I.types.stsc, I.STSC), I.box(I.types.stsz, I.STSZ), I.box(I.types.stco, I.STCO));
          }, I.avc1 = function(P) {
            var L = [], x = [], _, T, h;
            for (_ = 0; _ < P.sps.length; _++)
              T = P.sps[_], h = T.byteLength, L.push(h >>> 8 & 255), L.push(h & 255), L = L.concat(Array.prototype.slice.call(T));
            for (_ = 0; _ < P.pps.length; _++)
              T = P.pps[_], h = T.byteLength, x.push(h >>> 8 & 255), x.push(h & 255), x = x.concat(Array.prototype.slice.call(T));
            var y = I.box(I.types.avcC, new Uint8Array([
              1,
              L[3],
              L[4],
              L[5],
              255,
              224 | P.sps.length
            ].concat(L).concat([
              P.pps.length
            ]).concat(x))), m = P.width, s = P.height, f = P.pixelRatio[0], a = P.pixelRatio[1];
            return I.box(
              I.types.avc1,
              new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                m >> 8 & 255,
                m & 255,
                s >> 8 & 255,
                s & 255,
                0,
                72,
                0,
                0,
                0,
                72,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                18,
                100,
                97,
                105,
                108,
                121,
                109,
                111,
                116,
                105,
                111,
                110,
                47,
                104,
                108,
                115,
                46,
                106,
                115,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                24,
                17,
                17
              ]),
              y,
              I.box(I.types.btrt, new Uint8Array([
                0,
                28,
                156,
                128,
                0,
                45,
                198,
                192,
                0,
                45,
                198,
                192
              ])),
              I.box(I.types.pasp, new Uint8Array([
                f >> 24,
                f >> 16 & 255,
                f >> 8 & 255,
                f & 255,
                a >> 24,
                a >> 16 & 255,
                a >> 8 & 255,
                a & 255
              ]))
            );
          }, I.esds = function(P) {
            var L = P.config.length;
            return new Uint8Array([
              0,
              0,
              0,
              0,
              3,
              23 + L,
              0,
              1,
              0,
              4,
              15 + L,
              64,
              21,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              5
            ].concat([L]).concat(P.config).concat([6, 1, 2]));
          }, I.mp4a = function(P) {
            var L = P.samplerate;
            return I.box(I.types.mp4a, new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              P.channelCount,
              0,
              16,
              0,
              0,
              0,
              0,
              L >> 8 & 255,
              L & 255,
              0,
              0
            ]), I.box(I.types.esds, I.esds(P)));
          }, I.mp3 = function(P) {
            var L = P.samplerate;
            return I.box(I.types[".mp3"], new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              P.channelCount,
              0,
              16,
              0,
              0,
              0,
              0,
              L >> 8 & 255,
              L & 255,
              0,
              0
            ]));
          }, I.stsd = function(P) {
            return P.type === "audio" ? P.segmentCodec === "mp3" && P.codec === "mp3" ? I.box(I.types.stsd, I.STSD, I.mp3(P)) : I.box(I.types.stsd, I.STSD, I.mp4a(P)) : I.box(I.types.stsd, I.STSD, I.avc1(P));
          }, I.tkhd = function(P) {
            var L = P.id, x = P.duration * P.timescale, _ = P.width, T = P.height, h = Math.floor(x / (F + 1)), y = Math.floor(x % (F + 1));
            return I.box(I.types.tkhd, new Uint8Array([
              1,
              0,
              0,
              7,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              2,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              3,
              L >> 24 & 255,
              L >> 16 & 255,
              L >> 8 & 255,
              L & 255,
              0,
              0,
              0,
              0,
              h >> 24,
              h >> 16 & 255,
              h >> 8 & 255,
              h & 255,
              y >> 24,
              y >> 16 & 255,
              y >> 8 & 255,
              y & 255,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              64,
              0,
              0,
              0,
              _ >> 8 & 255,
              _ & 255,
              0,
              0,
              T >> 8 & 255,
              T & 255,
              0,
              0
            ]));
          }, I.traf = function(P, L) {
            var x = I.sdtp(P), _ = P.id, T = Math.floor(L / (F + 1)), h = Math.floor(L % (F + 1));
            return I.box(
              I.types.traf,
              I.box(I.types.tfhd, new Uint8Array([
                0,
                0,
                0,
                0,
                _ >> 24,
                _ >> 16 & 255,
                _ >> 8 & 255,
                _ & 255
              ])),
              I.box(I.types.tfdt, new Uint8Array([
                1,
                0,
                0,
                0,
                T >> 24,
                T >> 16 & 255,
                T >> 8 & 255,
                T & 255,
                h >> 24,
                h >> 16 & 255,
                h >> 8 & 255,
                h & 255
              ])),
              I.trun(P, x.length + 16 + 20 + 8 + 16 + 8 + 8),
              x
            );
          }, I.trak = function(P) {
            return P.duration = P.duration || 4294967295, I.box(I.types.trak, I.tkhd(P), I.mdia(P));
          }, I.trex = function(P) {
            var L = P.id;
            return I.box(I.types.trex, new Uint8Array([
              0,
              0,
              0,
              0,
              L >> 24,
              L >> 16 & 255,
              L >> 8 & 255,
              L & 255,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              1
            ]));
          }, I.trun = function(P, L) {
            var x = P.samples || [], _ = x.length, T = 12 + 16 * _, h = new Uint8Array(T), y, m, s, f, a, i;
            for (L += 8 + T, h.set([
              P.type === "video" ? 1 : 0,
              0,
              15,
              1,
              _ >>> 24 & 255,
              _ >>> 16 & 255,
              _ >>> 8 & 255,
              _ & 255,
              L >>> 24 & 255,
              L >>> 16 & 255,
              L >>> 8 & 255,
              L & 255
            ], 0), y = 0; y < _; y++)
              m = x[y], s = m.duration, f = m.size, a = m.flags, i = m.cts, h.set([
                s >>> 24 & 255,
                s >>> 16 & 255,
                s >>> 8 & 255,
                s & 255,
                f >>> 24 & 255,
                f >>> 16 & 255,
                f >>> 8 & 255,
                f & 255,
                a.isLeading << 2 | a.dependsOn,
                a.isDependedOn << 6 | a.hasRedundancy << 4 | a.paddingValue << 1 | a.isNonSync,
                a.degradPrio & 240 << 8,
                a.degradPrio & 15,
                i >>> 24 & 255,
                i >>> 16 & 255,
                i >>> 8 & 255,
                i & 255
              ], 12 + 16 * y);
            return I.box(I.types.trun, h);
          }, I.initSegment = function(P) {
            I.types || I.init();
            var L = I.moov(P), x = new Uint8Array(I.FTYP.byteLength + L.byteLength);
            return x.set(I.FTYP), x.set(L, I.FTYP.byteLength), x;
          }, I;
        }();
        A.types = void 0, A.HDLR_TYPES = void 0, A.STTS = void 0, A.STSC = void 0, A.STCO = void 0, A.STSZ = void 0, A.VMHD = void 0, A.SMHD = void 0, A.STSD = void 0, A.FTYP = void 0, A.DINF = void 0;
        const C = A;
      },
      "./src/remux/mp4-remuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => f,
          flushTextTrackMetadataCueSamples: () => g,
          flushTextTrackUserdataCueSamples: () => o,
          normalizePts: () => a
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/remux/aac-helper.ts"), C = S("./src/remux/mp4-generator.ts"), I = S("./src/events.ts"), k = S("./src/errors.ts"), P = S("./src/utils/logger.ts"), L = S("./src/types/loader.ts"), x = S("./src/utils/timescale-conversion.ts");
        function _() {
          return _ = Object.assign ? Object.assign.bind() : function(v) {
            for (var u = 1; u < arguments.length; u++) {
              var n = arguments[u];
              for (var t in n)
                Object.prototype.hasOwnProperty.call(n, t) && (v[t] = n[t]);
            }
            return v;
          }, _.apply(this, arguments);
        }
        var T = 10 * 1e3, h = 1024, y = 1152, m = null, s = null, f = /* @__PURE__ */ function() {
          function v(n, t, c, e) {
            if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = n, this.config = t, this.typeSupported = c, this.ISGenerated = !1, m === null) {
              var d = navigator.userAgent || "", E = d.match(/Chrome\/(\d+)/i);
              m = E ? parseInt(E[1]) : 0;
            }
            if (s === null) {
              var p = navigator.userAgent.match(/Safari\/(\d+)/i);
              s = p ? parseInt(p[1]) : 0;
            }
          }
          var u = v.prototype;
          return u.destroy = function() {
          }, u.resetTimeStamp = function(t) {
            P.logger.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = t;
          }, u.resetNextTimestamp = function() {
            P.logger.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
          }, u.resetInitSegment = function() {
            P.logger.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1;
          }, u.getVideoStartPts = function(t) {
            var c = !1, e = t.reduce(function(d, E) {
              var p = E.pts - d;
              return p < -4294967296 ? (c = !0, a(d, E.pts)) : p > 0 ? d : E.pts;
            }, t[0].pts);
            return c && P.logger.debug("PTS rollover detected"), e;
          }, u.remux = function(t, c, e, d, E, p, D, R) {
            var b, O, M, w, U, N, K = E, W = E, G = t.pid > -1, j = c.pid > -1, H = c.samples.length, X = t.samples.length > 0, Z = D && H > 0 || H > 1, J = (!G || X) && (!j || Z) || this.ISGenerated || D;
            if (J) {
              this.ISGenerated || (M = this.generateIS(t, c, E));
              var $ = this.isVideoContiguous, z = -1, q;
              if (Z && (z = i(c.samples), !$ && this.config.forceKeyFrameOnDiscontinuity))
                if (N = !0, z > 0) {
                  P.logger.warn("[mp4-remuxer]: Dropped " + z + " out of " + H + " video samples due to a missing keyframe");
                  var ie = this.getVideoStartPts(c.samples);
                  c.samples = c.samples.slice(z), c.dropped += z, W += (c.samples[0].pts - ie) / c.inputTimeScale, q = W;
                } else
                  z === -1 && (P.logger.warn("[mp4-remuxer]: No keyframe found out of " + H + " video samples"), N = !1);
              if (this.ISGenerated) {
                if (X && Z) {
                  var ne = this.getVideoStartPts(c.samples), de = a(t.samples[0].pts, ne) - ne, se = de / c.inputTimeScale;
                  K += Math.max(0, se), W += Math.max(0, -se);
                }
                if (X) {
                  if (t.samplerate || (P.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), M = this.generateIS(t, c, E)), O = this.remuxAudio(t, K, this.isAudioContiguous, p, j || Z || R === L.PlaylistLevelType.AUDIO ? W : void 0), Z) {
                    var ue = O ? O.endPTS - O.startPTS : 0;
                    c.inputTimeScale || (P.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), M = this.generateIS(t, c, E)), b = this.remuxVideo(c, W, $, ue);
                  }
                } else
                  Z && (b = this.remuxVideo(c, W, $, 0));
                b && (b.firstKeyFrame = z, b.independent = z !== -1, b.firstKeyFramePTS = q);
              }
            }
            return this.ISGenerated && (e.samples.length && (U = g(e, E, this._initPTS, this._initDTS)), d.samples.length && (w = o(d, E, this._initPTS))), {
              audio: O,
              video: b,
              initSegment: M,
              independent: N,
              text: w,
              id3: U
            };
          }, u.generateIS = function(t, c, e) {
            var d = t.samples, E = c.samples, p = this.typeSupported, D = {}, R = !(0, F.isFiniteNumber)(this._initPTS), b = "audio/mp4", O, M, w;
            if (R && (O = M = 1 / 0), t.config && d.length) {
              switch (t.timescale = t.samplerate, t.segmentCodec) {
                case "mp3":
                  p.mpeg ? (b = "audio/mpeg", t.codec = "") : p.mp3 && (t.codec = "mp3");
                  break;
              }
              D.audio = {
                id: "audio",
                container: b,
                codec: t.codec,
                initSegment: t.segmentCodec === "mp3" && p.mpeg ? new Uint8Array(0) : C.default.initSegment([t]),
                metadata: {
                  channelCount: t.channelCount
                }
              }, R && (w = t.inputTimeScale, O = M = d[0].pts - Math.round(w * e));
            }
            if (c.sps && c.pps && E.length && (c.timescale = c.inputTimeScale, D.video = {
              id: "main",
              container: "video/mp4",
              codec: c.codec,
              initSegment: C.default.initSegment([c]),
              metadata: {
                width: c.width,
                height: c.height
              }
            }, R)) {
              w = c.inputTimeScale;
              var U = this.getVideoStartPts(E), N = Math.round(w * e);
              M = Math.min(M, a(E[0].dts, U) - N), O = Math.min(O, U - N);
            }
            if (Object.keys(D).length)
              return this.ISGenerated = !0, R && (this._initPTS = O, this._initDTS = M), {
                tracks: D,
                initPTS: O,
                timescale: w
              };
          }, u.remuxVideo = function(t, c, e, d) {
            var E = t.inputTimeScale, p = t.samples, D = [], R = p.length, b = this._initPTS, O = this.nextAvcDts, M = 8, w = this.videoSampleDuration, U, N, K = Number.POSITIVE_INFINITY, W = Number.NEGATIVE_INFINITY, G = !1;
            if (!e || O === null) {
              var j = c * E, H = p[0].pts - a(p[0].dts, p[0].pts);
              O = j - H;
            }
            for (var X = 0; X < R; X++) {
              var Z = p[X];
              Z.pts = a(Z.pts - b, O), Z.dts = a(Z.dts - b, O), Z.dts < p[X > 0 ? X - 1 : X].dts && (G = !0);
            }
            G && p.sort(function(Ne, Ve) {
              var et = Ne.dts - Ve.dts, tt = Ne.pts - Ve.pts;
              return et || tt;
            }), U = p[0].dts, N = p[p.length - 1].dts;
            var J = N - U, $ = J ? Math.round(J / (R - 1)) : w || t.inputTimeScale / 30;
            if (e) {
              var z = U - O, q = z > $, ie = z < -1;
              if ((q || ie) && (q ? P.logger.warn("AVC: " + (0, x.toMsFromMpegTsClock)(z, !0) + " ms (" + z + "dts) hole between fragments detected, filling it") : P.logger.warn("AVC: " + (0, x.toMsFromMpegTsClock)(-z, !0) + " ms (" + z + "dts) overlapping between fragments detected"), !ie || O > p[0].pts)) {
                U = O;
                var ne = p[0].pts - z;
                p[0].dts = U, p[0].pts = ne, P.logger.log("Video: First PTS/DTS adjusted: " + (0, x.toMsFromMpegTsClock)(ne, !0) + "/" + (0, x.toMsFromMpegTsClock)(U, !0) + ", delta: " + (0, x.toMsFromMpegTsClock)(z, !0) + " ms");
              }
            }
            U = Math.max(0, U);
            for (var de = 0, se = 0, ue = 0; ue < R; ue++) {
              for (var ae = p[ue], oe = ae.units, le = oe.length, he = 0, me = 0; me < le; me++)
                he += oe[me].data.length;
              se += he, de += le, ae.length = he, ae.dts = Math.max(ae.dts, U), K = Math.min(ae.pts, K), W = Math.max(ae.pts, W);
            }
            N = p[R - 1].dts;
            var ce = se + 4 * de + 8, pe;
            try {
              pe = new Uint8Array(ce);
            } catch (Ne) {
              this.observer.emit(I.Events.ERROR, I.Events.ERROR, {
                type: k.ErrorTypes.MUX_ERROR,
                details: k.ErrorDetails.REMUX_ALLOC_ERROR,
                fatal: !1,
                bytes: ce,
                reason: "fail allocating video mdat " + ce
              });
              return;
            }
            var Re = new DataView(pe.buffer);
            Re.setUint32(0, ce), pe.set(C.default.types.mdat, 4);
            for (var Te = !1, be = Number.POSITIVE_INFINITY, De = Number.POSITIVE_INFINITY, _e = Number.NEGATIVE_INFINITY, Se = Number.NEGATIVE_INFINITY, ye = 0; ye < R; ye++) {
              for (var Ee = p[ye], xe = Ee.units, Ae = 0, ve = 0, Le = xe.length; ve < Le; ve++) {
                var Pe = xe[ve], ke = Pe.data, Ce = Pe.data.byteLength;
                Re.setUint32(M, Ce), M += 4, pe.set(ke, M), M += Ce, Ae += 4 + Ce;
              }
              var Me = void 0;
              if (ye < R - 1)
                w = p[ye + 1].dts - Ee.dts, Me = p[ye + 1].pts - Ee.pts;
              else {
                var Ke = this.config, we = ye > 0 ? Ee.dts - p[ye - 1].dts : $;
                if (Me = ye > 0 ? Ee.pts - p[ye - 1].pts : $, Ke.stretchShortVideoTrack && this.nextAudioPts !== null) {
                  var Xe = Math.floor(Ke.maxBufferHole * E), Ue = (d ? K + d * E : this.nextAudioPts) - Ee.pts;
                  Ue > Xe ? (w = Ue - we, w < 0 ? w = we : Te = !0, P.logger.log("[mp4-remuxer]: It is approximately " + Ue / 90 + " ms to the next segment; using duration " + w / 90 + " ms for the last video frame.")) : w = we;
                } else
                  w = we;
              }
              var ze = Math.round(Ee.pts - Ee.dts);
              be = Math.min(be, w), _e = Math.max(_e, w), De = Math.min(De, Me), Se = Math.max(Se, Me), D.push(new r(Ee.key, w, Ae, ze));
            }
            if (D.length) {
              if (m) {
                if (m < 70) {
                  var We = D[0].flags;
                  We.dependsOn = 2, We.isNonSync = 0;
                }
              } else if (s && Se - De < _e - be && $ / _e < 0.025 && D[0].cts === 0) {
                P.logger.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
                for (var Be = U, Ie = 0, Ge = D.length; Ie < Ge; Ie++) {
                  var He = Be + D[Ie].duration, $e = Be + D[Ie].cts;
                  if (Ie < Ge - 1) {
                    var Qe = He + D[Ie + 1].cts;
                    D[Ie].duration = Qe - $e;
                  } else
                    D[Ie].duration = Ie ? D[Ie - 1].duration : $;
                  D[Ie].cts = 0, Be = He;
                }
              }
            }
            console.assert(w !== null, "mp4SampleDuration must be computed"), w = Te || !w ? $ : w, this.nextAvcDts = O = N + w, this.videoSampleDuration = w, this.isVideoContiguous = !0;
            var Ze = C.default.moof(t.sequenceNumber++, U, _({}, t, {
              samples: D
            })), Je = "video", qe = {
              data1: Ze,
              data2: pe,
              startPTS: K / E,
              endPTS: (W + w) / E,
              startDTS: U / E,
              endDTS: O / E,
              type: Je,
              hasAudio: !1,
              hasVideo: !0,
              nb: D.length,
              dropped: t.dropped
            };
            return t.samples = [], t.dropped = 0, console.assert(pe.length, "MDAT length must not be zero"), qe;
          }, u.remuxAudio = function(t, c, e, d, E) {
            var p = t.inputTimeScale, D = t.samplerate ? t.samplerate : p, R = p / D, b = t.segmentCodec === "aac" ? h : y, O = b * R, M = this._initPTS, w = t.segmentCodec === "mp3" && this.typeSupported.mpeg, U = [], N = E !== void 0, K = t.samples, W = w ? 0 : 8, G = this.nextAudioPts || -1, j = c * p;
            if (this.isAudioContiguous = e = e || K.length && G > 0 && (d && Math.abs(j - G) < 9e3 || Math.abs(a(K[0].pts - M, j) - G) < 20 * O), K.forEach(function(Pe) {
              Pe.pts = a(Pe.pts - M, j);
            }), !e || G < 0) {
              if (K = K.filter(function(Pe) {
                return Pe.pts >= 0;
              }), !K.length)
                return;
              E === 0 ? G = 0 : d && !N ? G = Math.max(0, j) : G = K[0].pts;
            }
            if (t.segmentCodec === "aac")
              for (var H = this.config.maxAudioFramesDrift, X = 0, Z = G; X < K.length; X++) {
                var J = K[X], $ = J.pts, z = $ - Z, q = Math.abs(1e3 * z / p);
                if (z <= -H * O && N)
                  X === 0 && (P.logger.warn("Audio frame @ " + ($ / p).toFixed(3) + "s overlaps nextAudioPts by " + Math.round(1e3 * z / p) + " ms."), this.nextAudioPts = G = Z = $);
                else if (z >= H * O && q < T && N) {
                  var ie = Math.round(z / O);
                  Z = $ - ie * O, Z < 0 && (ie--, Z += O), X === 0 && (this.nextAudioPts = G = Z), P.logger.warn("[mp4-remuxer]: Injecting " + ie + " audio frame @ " + (Z / p).toFixed(3) + "s due to " + Math.round(1e3 * z / p) + " ms gap.");
                  for (var ne = 0; ne < ie; ne++) {
                    var de = Math.max(Z, 0), se = A.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                    se || (P.logger.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), se = J.unit.subarray()), K.splice(X, 0, {
                      unit: se,
                      pts: de
                    }), Z += O, X++;
                  }
                }
                J.pts = Z, Z += O;
              }
            for (var ue = null, ae = null, oe, le = 0, he = K.length; he--; )
              le += K[he].unit.byteLength;
            for (var me = 0, ce = K.length; me < ce; me++) {
              var pe = K[me], Re = pe.unit, Te = pe.pts;
              if (ae !== null) {
                var be = U[me - 1];
                be.duration = Math.round((Te - ae) / R);
              } else if (e && t.segmentCodec === "aac" && (Te = G), ue = Te, le > 0) {
                le += W;
                try {
                  oe = new Uint8Array(le);
                } catch (Pe) {
                  this.observer.emit(I.Events.ERROR, I.Events.ERROR, {
                    type: k.ErrorTypes.MUX_ERROR,
                    details: k.ErrorDetails.REMUX_ALLOC_ERROR,
                    fatal: !1,
                    bytes: le,
                    reason: "fail allocating audio mdat " + le
                  });
                  return;
                }
                if (!w) {
                  var De = new DataView(oe.buffer);
                  De.setUint32(0, le), oe.set(C.default.types.mdat, 4);
                }
              } else
                return;
              oe.set(Re, W);
              var _e = Re.byteLength;
              W += _e, U.push(new r(!0, b, _e, 0)), ae = Te;
            }
            var Se = U.length;
            if (!!Se) {
              var ye = U[U.length - 1];
              this.nextAudioPts = G = ae + R * ye.duration;
              var Ee = w ? new Uint8Array(0) : C.default.moof(t.sequenceNumber++, ue / R, _({}, t, {
                samples: U
              }));
              t.samples = [];
              var xe = ue / p, Ae = G / p, ve = "audio", Le = {
                data1: Ee,
                data2: oe,
                startPTS: xe,
                endPTS: Ae,
                startDTS: xe,
                endDTS: Ae,
                type: ve,
                hasAudio: !0,
                hasVideo: !1,
                nb: Se
              };
              return this.isAudioContiguous = !0, console.assert(oe.length, "MDAT length must not be zero"), Le;
            }
          }, u.remuxEmptyAudio = function(t, c, e, d) {
            var E = t.inputTimeScale, p = t.samplerate ? t.samplerate : E, D = E / p, R = this.nextAudioPts, b = (R !== null ? R : d.startDTS * E) + this._initDTS, O = d.endDTS * E + this._initDTS, M = D * h, w = Math.ceil((O - b) / M), U = A.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
            if (P.logger.warn("[mp4-remuxer]: remux empty Audio"), !U) {
              P.logger.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec");
              return;
            }
            for (var N = [], K = 0; K < w; K++) {
              var W = b + K * M;
              N.push({
                unit: U,
                pts: W,
                dts: W
              });
            }
            return t.samples = N, this.remuxAudio(t, c, e, !1);
          }, v;
        }();
        function a(v, u) {
          var n;
          if (u === null)
            return v;
          for (u < v ? n = -8589934592 : n = 8589934592; Math.abs(v - u) > 4294967296; )
            v += n;
          return v;
        }
        function i(v) {
          for (var u = 0; u < v.length; u++)
            if (v[u].key)
              return u;
          return -1;
        }
        function g(v, u, n, t) {
          var c = v.samples.length;
          if (!!c) {
            for (var e = v.inputTimeScale, d = 0; d < c; d++) {
              var E = v.samples[d];
              E.pts = a(E.pts - n, u * e) / e, E.dts = a(E.dts - t, u * e) / e;
            }
            var p = v.samples;
            return v.samples = [], {
              samples: p
            };
          }
        }
        function o(v, u, n) {
          var t = v.samples.length;
          if (!!t) {
            for (var c = v.inputTimeScale, e = 0; e < t; e++) {
              var d = v.samples[e];
              d.pts = a(d.pts - n, u * c) / c;
            }
            v.samples.sort(function(p, D) {
              return p.pts - D.pts;
            });
            var E = v.samples;
            return v.samples = [], {
              samples: E
            };
          }
        }
        var r = function(u, n, t, c) {
          this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = n, this.size = t, this.cts = c, this.flags = new l(u);
        }, l = function(u) {
          this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = u ? 2 : 1, this.isNonSync = u ? 0 : 1;
        };
      },
      "./src/remux/passthrough-remuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/remux/mp4-remuxer.ts"), C = S("./src/utils/mp4-tools.ts"), I = S("./src/loader/fragment.ts"), k = S("./src/utils/logger.ts"), P = /* @__PURE__ */ function() {
          function _() {
            this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = void 0, this.initTracks = void 0, this.lastEndTime = null;
          }
          var T = _.prototype;
          return T.destroy = function() {
          }, T.resetTimeStamp = function(y) {
            this.initPTS = y, this.lastEndTime = null;
          }, T.resetNextTimestamp = function() {
            this.lastEndTime = null;
          }, T.resetInitSegment = function(y, m, s, f) {
            this.audioCodec = m, this.videoCodec = s, this.generateInitSegment((0, C.patchEncyptionData)(y, f)), this.emitInitSegment = !0;
          }, T.generateInitSegment = function(y) {
            var m = this.audioCodec, s = this.videoCodec;
            if (!y || !y.byteLength) {
              this.initTracks = void 0, this.initData = void 0;
              return;
            }
            var f = this.initData = (0, C.parseInitSegment)(y);
            m || (m = L(f.audio, I.ElementaryStreamTypes.AUDIO)), s || (s = L(f.video, I.ElementaryStreamTypes.VIDEO));
            var a = {};
            f.audio && f.video ? a.audiovideo = {
              container: "video/mp4",
              codec: m + "," + s,
              initSegment: y,
              id: "main"
            } : f.audio ? a.audio = {
              container: "audio/mp4",
              codec: m,
              initSegment: y,
              id: "audio"
            } : f.video ? a.video = {
              container: "video/mp4",
              codec: s,
              initSegment: y,
              id: "main"
            } : k.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = a;
          }, T.remux = function(y, m, s, f, a) {
            var i, g = this.initPTS, o = this.lastEndTime, r = {
              audio: void 0,
              video: void 0,
              text: f,
              id3: s,
              initSegment: void 0
            };
            (0, F.isFiniteNumber)(o) || (o = this.lastEndTime = a || 0);
            var l = m.samples;
            if (!l || !l.length)
              return r;
            var v = {
              initPTS: void 0,
              timescale: 1
            }, u = this.initData;
            if ((!u || !u.length) && (this.generateInitSegment(l), u = this.initData), !u || !u.length)
              return k.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), r;
            this.emitInitSegment && (v.tracks = this.initTracks, this.emitInitSegment = !1);
            var n = (0, C.getStartDTS)(u, l);
            (0, F.isFiniteNumber)(g) || (this.initPTS = v.initPTS = g = n - a);
            var t = (0, C.getDuration)(l, u), c = y ? n - g : o, e = c + t;
            (0, C.offsetStartDTS)(u, l, g), t > 0 ? this.lastEndTime = e : (k.logger.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
            var d = !!u.audio, E = !!u.video, p = "";
            d && (p += "audio"), E && (p += "video");
            var D = {
              data1: l,
              startPTS: c,
              startDTS: c,
              endPTS: e,
              endDTS: e,
              type: p,
              hasAudio: d,
              hasVideo: E,
              nb: 1,
              dropped: 0
            };
            r.audio = D.type === "audio" ? D : void 0, r.video = D.type !== "audio" ? D : void 0, r.initSegment = v;
            var R = (i = this.initPTS) != null ? i : 0;
            return r.id3 = (0, A.flushTextTrackMetadataCueSamples)(s, a, R, R), f.samples.length && (r.text = (0, A.flushTextTrackUserdataCueSamples)(f, a, R)), r;
          }, _;
        }();
        function L(_, T) {
          var h = _ == null ? void 0 : _.codec;
          return h && h.length > 4 ? h : h === "hvc1" || h === "hev1" ? "hvc1.1.c.L120.90" : h === "av01" ? "av01.0.04M.08" : h === "avc1" || T === I.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5";
        }
        const x = P;
      },
      "./src/task-loop.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        var F = /* @__PURE__ */ function() {
          function A() {
            this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this);
          }
          var C = A.prototype;
          return C.destroy = function() {
            this.onHandlerDestroying(), this.onHandlerDestroyed();
          }, C.onHandlerDestroying = function() {
            this.clearNextTick(), this.clearInterval();
          }, C.onHandlerDestroyed = function() {
          }, C.hasInterval = function() {
            return !!this._tickInterval;
          }, C.hasNextTick = function() {
            return !!this._tickTimer;
          }, C.setInterval = function(k) {
            return this._tickInterval ? !1 : (this._tickInterval = self.setInterval(this._boundTick, k), !0);
          }, C.clearInterval = function() {
            return this._tickInterval ? (self.clearInterval(this._tickInterval), this._tickInterval = null, !0) : !1;
          }, C.clearNextTick = function() {
            return this._tickTimer ? (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0) : !1;
          }, C.tick = function() {
            this._tickCallCount++, this._tickCallCount === 1 && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0);
          }, C.tickImmediate = function() {
            this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0);
          }, C.doTick = function() {
          }, A;
        }();
      },
      "./src/types/cmcd.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          CMCDObjectType: () => A,
          CMCDStreamType: () => I,
          CMCDStreamingFormat: () => C,
          CMCDVersion: () => F
        });
        var F = 1, A;
        (function(k) {
          k.MANIFEST = "m", k.AUDIO = "a", k.VIDEO = "v", k.MUXED = "av", k.INIT = "i", k.CAPTION = "c", k.TIMED_TEXT = "tt", k.KEY = "k", k.OTHER = "o";
        })(A || (A = {}));
        var C;
        (function(k) {
          k.DASH = "d", k.HLS = "h", k.SMOOTH = "s", k.OTHER = "o";
        })(C || (C = {}));
        var I;
        (function(k) {
          k.VOD = "v", k.LIVE = "l";
        })(I || (I = {}));
      },
      "./src/types/demuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          MetadataSchema: () => F
        });
        var F;
        (function(A) {
          A.audioId3 = "org.id3", A.dateRange = "com.apple.quicktime.HLS", A.emsg = "https://aomedia.org/emsg/ID3";
        })(F || (F = {}));
      },
      "./src/types/level.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          HdcpLevels: () => k,
          HlsSkip: () => P,
          HlsUrlParameters: () => x,
          Level: () => _,
          getSkipValue: () => L
        });
        function F(T, h) {
          for (var y = 0; y < h.length; y++) {
            var m = h[y];
            m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(T, C(m.key), m);
          }
        }
        function A(T, h, y) {
          return h && F(T.prototype, h), y && F(T, y), Object.defineProperty(T, "prototype", { writable: !1 }), T;
        }
        function C(T) {
          var h = I(T, "string");
          return typeof h == "symbol" ? h : String(h);
        }
        function I(T, h) {
          if (typeof T != "object" || T === null)
            return T;
          var y = T[Symbol.toPrimitive];
          if (y !== void 0) {
            var m = y.call(T, h || "default");
            if (typeof m != "object")
              return m;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (h === "string" ? String : Number)(T);
        }
        var k = ["NONE", "TYPE-0", "TYPE-1", "TYPE-2", null], P;
        (function(T) {
          T.No = "", T.Yes = "YES", T.v2 = "v2";
        })(P || (P = {}));
        function L(T, h) {
          var y = T.canSkipUntil, m = T.canSkipDateRanges, s = T.endSN, f = h !== void 0 ? h - s : 0;
          return y && f < y ? m ? P.v2 : P.Yes : P.No;
        }
        var x = /* @__PURE__ */ function() {
          function T(y, m, s) {
            this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = y, this.part = m, this.skip = s;
          }
          var h = T.prototype;
          return h.addDirectives = function(m) {
            var s = new self.URL(m);
            return this.msn !== void 0 && s.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && s.searchParams.set("_HLS_part", this.part.toString()), this.skip && s.searchParams.set("_HLS_skip", this.skip), s.href;
          }, T;
        }(), _ = /* @__PURE__ */ function() {
          function T(h) {
            this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [h.url], this.attrs = h.attrs, this.bitrate = h.bitrate, h.details && (this.details = h.details), this.id = h.id || 0, this.name = h.name, this.width = h.width || 0, this.height = h.height || 0, this.audioCodec = h.audioCodec, this.videoCodec = h.videoCodec, this.unknownCodecs = h.unknownCodecs, this.codecSet = [h.videoCodec, h.audioCodec].filter(function(y) {
              return y;
            }).join(",").replace(/\.[^.,]+/g, "");
          }
          return A(T, [{
            key: "maxBitrate",
            get: function() {
              return Math.max(this.realBitrate, this.bitrate);
            }
          }, {
            key: "uri",
            get: function() {
              return this.url[this._urlId] || "";
            }
          }, {
            key: "urlId",
            get: function() {
              return this._urlId;
            },
            set: function(y) {
              var m = y % this.url.length;
              this._urlId !== m && (this.details = void 0, this._urlId = m);
            }
          }]), T;
        }();
      },
      "./src/types/loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          PlaylistContextType: () => F,
          PlaylistLevelType: () => A
        });
        var F;
        (function(C) {
          C.MANIFEST = "manifest", C.LEVEL = "level", C.AUDIO_TRACK = "audioTrack", C.SUBTITLE_TRACK = "subtitleTrack";
        })(F || (F = {}));
        var A;
        (function(C) {
          C.MAIN = "main", C.AUDIO = "audio", C.SUBTITLE = "subtitle";
        })(A || (A = {}));
      },
      "./src/types/transmuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          ChunkMetadata: () => F
        });
        var F = function(I, k, P, L, x, _) {
          L === void 0 && (L = 0), x === void 0 && (x = -1), _ === void 0 && (_ = !1), this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = A(), this.buffering = {
            audio: A(),
            video: A(),
            audiovideo: A()
          }, this.level = I, this.sn = k, this.id = P, this.size = L, this.part = x, this.partial = _;
        };
        function A() {
          return {
            start: 0,
            executeStart: 0,
            executeEnd: 0,
            end: 0
          };
        }
      },
      "./src/utils/attr-list.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          AttrList: () => C
        });
        var F = /^(\d+)x(\d+)$/, A = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g, C = /* @__PURE__ */ function() {
          function I(P) {
            typeof P == "string" && (P = I.parseAttrList(P));
            for (var L in P)
              P.hasOwnProperty(L) && (this[L] = P[L]);
          }
          var k = I.prototype;
          return k.decimalInteger = function(L) {
            var x = parseInt(this[L], 10);
            return x > Number.MAX_SAFE_INTEGER ? 1 / 0 : x;
          }, k.hexadecimalInteger = function(L) {
            if (this[L]) {
              var x = (this[L] || "0x").slice(2);
              x = (x.length & 1 ? "0" : "") + x;
              for (var _ = new Uint8Array(x.length / 2), T = 0; T < x.length / 2; T++)
                _[T] = parseInt(x.slice(T * 2, T * 2 + 2), 16);
              return _;
            } else
              return null;
          }, k.hexadecimalIntegerAsNumber = function(L) {
            var x = parseInt(this[L], 16);
            return x > Number.MAX_SAFE_INTEGER ? 1 / 0 : x;
          }, k.decimalFloatingPoint = function(L) {
            return parseFloat(this[L]);
          }, k.optionalFloat = function(L, x) {
            var _ = this[L];
            return _ ? parseFloat(_) : x;
          }, k.enumeratedString = function(L) {
            return this[L];
          }, k.bool = function(L) {
            return this[L] === "YES";
          }, k.decimalResolution = function(L) {
            var x = F.exec(this[L]);
            if (x !== null)
              return {
                width: parseInt(x[1], 10),
                height: parseInt(x[2], 10)
              };
          }, I.parseAttrList = function(L) {
            var x, _ = {}, T = '"';
            for (A.lastIndex = 0; (x = A.exec(L)) !== null; ) {
              var h = x[2];
              h.indexOf(T) === 0 && h.lastIndexOf(T) === h.length - 1 && (h = h.slice(1, -1)), _[x[1]] = h;
            }
            return _;
          }, I;
        }();
      },
      "./src/utils/binary-search.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = {
          search: function(I, k) {
            for (var P = 0, L = I.length - 1, x = null, _ = null; P <= L; ) {
              x = (P + L) / 2 | 0, _ = I[x];
              var T = k(_);
              if (T > 0)
                P = x + 1;
              else if (T < 0)
                L = x - 1;
              else
                return _;
            }
            return null;
          }
        };
        const A = F;
      },
      "./src/utils/buffer-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          BufferHelper: () => C
        });
        var F = S("./src/utils/logger.ts"), A = {
          length: 0,
          start: function() {
            return 0;
          },
          end: function() {
            return 0;
          }
        }, C = /* @__PURE__ */ function() {
          function I() {
          }
          return I.isBuffered = function(P, L) {
            try {
              if (P) {
                for (var x = I.getBuffered(P), _ = 0; _ < x.length; _++)
                  if (L >= x.start(_) && L <= x.end(_))
                    return !0;
              }
            } catch (T) {
            }
            return !1;
          }, I.bufferInfo = function(P, L, x) {
            try {
              if (P) {
                var _ = I.getBuffered(P), T = [], h;
                for (h = 0; h < _.length; h++)
                  T.push({
                    start: _.start(h),
                    end: _.end(h)
                  });
                return this.bufferedInfo(T, L, x);
              }
            } catch (y) {
            }
            return {
              len: 0,
              start: L,
              end: L,
              nextStart: void 0
            };
          }, I.bufferedInfo = function(P, L, x) {
            L = Math.max(0, L), P.sort(function(r, l) {
              var v = r.start - l.start;
              return v || l.end - r.end;
            });
            var _ = [];
            if (x)
              for (var T = 0; T < P.length; T++) {
                var h = _.length;
                if (h) {
                  var y = _[h - 1].end;
                  P[T].start - y < x ? P[T].end > y && (_[h - 1].end = P[T].end) : _.push(P[T]);
                } else
                  _.push(P[T]);
              }
            else
              _ = P;
            for (var m = 0, s, f = L, a = L, i = 0; i < _.length; i++) {
              var g = _[i].start, o = _[i].end;
              if (L + x >= g && L < o)
                f = g, a = o, m = a - L;
              else if (L + x < g) {
                s = g;
                break;
              }
            }
            return {
              len: m,
              start: f || 0,
              end: a || 0,
              nextStart: s
            };
          }, I.getBuffered = function(P) {
            try {
              return P.buffered;
            } catch (L) {
              return F.logger.log("failed to get media.buffered", L), A;
            }
          }, I;
        }();
      },
      "./src/utils/cea-608-parser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          CaptionScreen: () => i,
          Row: () => a,
          default: () => u
        });
        var F = S("./src/utils/logger.ts"), A = {
          42: 225,
          92: 233,
          94: 237,
          95: 243,
          96: 250,
          123: 231,
          124: 247,
          125: 209,
          126: 241,
          127: 9608,
          128: 174,
          129: 176,
          130: 189,
          131: 191,
          132: 8482,
          133: 162,
          134: 163,
          135: 9834,
          136: 224,
          137: 32,
          138: 232,
          139: 226,
          140: 234,
          141: 238,
          142: 244,
          143: 251,
          144: 193,
          145: 201,
          146: 211,
          147: 218,
          148: 220,
          149: 252,
          150: 8216,
          151: 161,
          152: 42,
          153: 8217,
          154: 9473,
          155: 169,
          156: 8480,
          157: 8226,
          158: 8220,
          159: 8221,
          160: 192,
          161: 194,
          162: 199,
          163: 200,
          164: 202,
          165: 203,
          166: 235,
          167: 206,
          168: 207,
          169: 239,
          170: 212,
          171: 217,
          172: 249,
          173: 219,
          174: 171,
          175: 187,
          176: 195,
          177: 227,
          178: 205,
          179: 204,
          180: 236,
          181: 210,
          182: 242,
          183: 213,
          184: 245,
          185: 123,
          186: 125,
          187: 92,
          188: 94,
          189: 95,
          190: 124,
          191: 8764,
          192: 196,
          193: 228,
          194: 214,
          195: 246,
          196: 223,
          197: 165,
          198: 164,
          199: 9475,
          200: 197,
          201: 229,
          202: 216,
          203: 248,
          204: 9487,
          205: 9491,
          206: 9495,
          207: 9499
        }, C = function(t) {
          var c = t;
          return A.hasOwnProperty(t) && (c = A[t]), String.fromCharCode(c);
        }, I = 15, k = 100, P = {
          17: 1,
          18: 3,
          21: 5,
          22: 7,
          23: 9,
          16: 11,
          19: 12,
          20: 14
        }, L = {
          17: 2,
          18: 4,
          21: 6,
          22: 8,
          23: 10,
          19: 13,
          20: 15
        }, x = {
          25: 1,
          26: 3,
          29: 5,
          30: 7,
          31: 9,
          24: 11,
          27: 12,
          28: 14
        }, _ = {
          25: 2,
          26: 4,
          29: 6,
          30: 8,
          31: 10,
          27: 13,
          28: 15
        }, T = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"], h;
        (function(n) {
          n[n.ERROR = 0] = "ERROR", n[n.TEXT = 1] = "TEXT", n[n.WARNING = 2] = "WARNING", n[n.INFO = 2] = "INFO", n[n.DEBUG = 3] = "DEBUG", n[n.DATA = 3] = "DATA";
        })(h || (h = {}));
        var y = /* @__PURE__ */ function() {
          function n() {
            this.time = null, this.verboseLevel = h.ERROR;
          }
          var t = n.prototype;
          return t.log = function(e, d) {
            if (this.verboseLevel >= e) {
              var E = typeof d == "function" ? d() : d;
              F.logger.log(this.time + " [" + e + "] " + E);
            }
          }, n;
        }(), m = function(t) {
          for (var c = [], e = 0; e < t.length; e++)
            c.push(t[e].toString(16));
          return c;
        }, s = /* @__PURE__ */ function() {
          function n(c, e, d, E, p) {
            this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = c || "white", this.underline = e || !1, this.italics = d || !1, this.background = E || "black", this.flash = p || !1;
          }
          var t = n.prototype;
          return t.reset = function() {
            this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
          }, t.setStyles = function(e) {
            for (var d = ["foreground", "underline", "italics", "background", "flash"], E = 0; E < d.length; E++) {
              var p = d[E];
              e.hasOwnProperty(p) && (this[p] = e[p]);
            }
          }, t.isDefault = function() {
            return this.foreground === "white" && !this.underline && !this.italics && this.background === "black" && !this.flash;
          }, t.equals = function(e) {
            return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash;
          }, t.copy = function(e) {
            this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash;
          }, t.toString = function() {
            return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash;
          }, n;
        }(), f = /* @__PURE__ */ function() {
          function n(c, e, d, E, p, D) {
            this.uchar = void 0, this.penState = void 0, this.uchar = c || " ", this.penState = new s(e, d, E, p, D);
          }
          var t = n.prototype;
          return t.reset = function() {
            this.uchar = " ", this.penState.reset();
          }, t.setChar = function(e, d) {
            this.uchar = e, this.penState.copy(d);
          }, t.setPenState = function(e) {
            this.penState.copy(e);
          }, t.equals = function(e) {
            return this.uchar === e.uchar && this.penState.equals(e.penState);
          }, t.copy = function(e) {
            this.uchar = e.uchar, this.penState.copy(e.penState);
          }, t.isEmpty = function() {
            return this.uchar === " " && this.penState.isDefault();
          }, n;
        }(), a = /* @__PURE__ */ function() {
          function n(c) {
            this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
            for (var e = 0; e < k; e++)
              this.chars.push(new f());
            this.logger = c, this.pos = 0, this.currPenState = new s();
          }
          var t = n.prototype;
          return t.equals = function(e) {
            for (var d = !0, E = 0; E < k; E++)
              if (!this.chars[E].equals(e.chars[E])) {
                d = !1;
                break;
              }
            return d;
          }, t.copy = function(e) {
            for (var d = 0; d < k; d++)
              this.chars[d].copy(e.chars[d]);
          }, t.isEmpty = function() {
            for (var e = !0, d = 0; d < k; d++)
              if (!this.chars[d].isEmpty()) {
                e = !1;
                break;
              }
            return e;
          }, t.setCursor = function(e) {
            this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(h.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > k && (this.logger.log(h.DEBUG, "Too large cursor position " + this.pos), this.pos = k);
          }, t.moveCursor = function(e) {
            var d = this.pos + e;
            if (e > 1)
              for (var E = this.pos + 1; E < d + 1; E++)
                this.chars[E].setPenState(this.currPenState);
            this.setCursor(d);
          }, t.backSpace = function() {
            this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState);
          }, t.insertChar = function(e) {
            var d = this;
            e >= 144 && this.backSpace();
            var E = C(e);
            if (this.pos >= k) {
              this.logger.log(h.ERROR, function() {
                return "Cannot insert " + e.toString(16) + " (" + E + ") at position " + d.pos + ". Skipping it!";
              });
              return;
            }
            this.chars[this.pos].setChar(E, this.currPenState), this.moveCursor(1);
          }, t.clearFromPos = function(e) {
            var d;
            for (d = e; d < k; d++)
              this.chars[d].reset();
          }, t.clear = function() {
            this.clearFromPos(0), this.pos = 0, this.currPenState.reset();
          }, t.clearToEndOfRow = function() {
            this.clearFromPos(this.pos);
          }, t.getTextString = function() {
            for (var e = [], d = !0, E = 0; E < k; E++) {
              var p = this.chars[E].uchar;
              p !== " " && (d = !1), e.push(p);
            }
            return d ? "" : e.join("");
          }, t.setPenStyles = function(e) {
            this.currPenState.setStyles(e);
            var d = this.chars[this.pos];
            d.setPenState(this.currPenState);
          }, n;
        }(), i = /* @__PURE__ */ function() {
          function n(c) {
            this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
            for (var e = 0; e < I; e++)
              this.rows.push(new a(c));
            this.logger = c, this.currRow = I - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset();
          }
          var t = n.prototype;
          return t.reset = function() {
            for (var e = 0; e < I; e++)
              this.rows[e].clear();
            this.currRow = I - 1;
          }, t.equals = function(e) {
            for (var d = !0, E = 0; E < I; E++)
              if (!this.rows[E].equals(e.rows[E])) {
                d = !1;
                break;
              }
            return d;
          }, t.copy = function(e) {
            for (var d = 0; d < I; d++)
              this.rows[d].copy(e.rows[d]);
          }, t.isEmpty = function() {
            for (var e = !0, d = 0; d < I; d++)
              if (!this.rows[d].isEmpty()) {
                e = !1;
                break;
              }
            return e;
          }, t.backSpace = function() {
            var e = this.rows[this.currRow];
            e.backSpace();
          }, t.clearToEndOfRow = function() {
            var e = this.rows[this.currRow];
            e.clearToEndOfRow();
          }, t.insertChar = function(e) {
            var d = this.rows[this.currRow];
            d.insertChar(e);
          }, t.setPen = function(e) {
            var d = this.rows[this.currRow];
            d.setPenStyles(e);
          }, t.moveCursor = function(e) {
            var d = this.rows[this.currRow];
            d.moveCursor(e);
          }, t.setCursor = function(e) {
            this.logger.log(h.INFO, "setCursor: " + e);
            var d = this.rows[this.currRow];
            d.setCursor(e);
          }, t.setPAC = function(e) {
            this.logger.log(h.INFO, function() {
              return "pacData = " + JSON.stringify(e);
            });
            var d = e.row - 1;
            if (this.nrRollUpRows && d < this.nrRollUpRows - 1 && (d = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== d) {
              for (var E = 0; E < I; E++)
                this.rows[E].clear();
              var p = this.currRow + 1 - this.nrRollUpRows, D = this.lastOutputScreen;
              if (D) {
                var R = D.rows[p].cueStartTime, b = this.logger.time;
                if (R && b !== null && R < b)
                  for (var O = 0; O < this.nrRollUpRows; O++)
                    this.rows[d - this.nrRollUpRows + O + 1].copy(D.rows[p + O]);
              }
            }
            this.currRow = d;
            var M = this.rows[this.currRow];
            if (e.indent !== null) {
              var w = e.indent, U = Math.max(w - 1, 0);
              M.setCursor(e.indent), e.color = M.chars[U].penState.foreground;
            }
            var N = {
              foreground: e.color,
              underline: e.underline,
              italics: e.italics,
              background: "black",
              flash: !1
            };
            this.setPen(N);
          }, t.setBkgData = function(e) {
            this.logger.log(h.INFO, function() {
              return "bkgData = " + JSON.stringify(e);
            }), this.backSpace(), this.setPen(e), this.insertChar(32);
          }, t.setRollUpRows = function(e) {
            this.nrRollUpRows = e;
          }, t.rollUp = function() {
            var e = this;
            if (this.nrRollUpRows === null) {
              this.logger.log(h.DEBUG, "roll_up but nrRollUpRows not set yet");
              return;
            }
            this.logger.log(h.TEXT, function() {
              return e.getDisplayText();
            });
            var d = this.currRow + 1 - this.nrRollUpRows, E = this.rows.splice(d, 1)[0];
            E.clear(), this.rows.splice(this.currRow, 0, E), this.logger.log(h.INFO, "Rolling up");
          }, t.getDisplayText = function(e) {
            e = e || !1;
            for (var d = [], E = "", p = -1, D = 0; D < I; D++) {
              var R = this.rows[D].getTextString();
              R && (p = D + 1, e ? d.push("Row " + p + ": '" + R + "'") : d.push(R.trim()));
            }
            return d.length > 0 && (e ? E = "[" + d.join(" | ") + "]" : E = d.join(`
`)), E;
          }, t.getTextAndFormat = function() {
            return this.rows;
          }, n;
        }(), g = /* @__PURE__ */ function() {
          function n(c, e, d) {
            this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = c, this.outputFilter = e, this.mode = null, this.verbose = 0, this.displayedMemory = new i(d), this.nonDisplayedMemory = new i(d), this.lastOutputScreen = new i(d), this.currRollUpRow = this.displayedMemory.rows[I - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = d;
          }
          var t = n.prototype;
          return t.reset = function() {
            this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[I - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
          }, t.getHandler = function() {
            return this.outputFilter;
          }, t.setHandler = function(e) {
            this.outputFilter = e;
          }, t.setPAC = function(e) {
            this.writeScreen.setPAC(e);
          }, t.setBkgData = function(e) {
            this.writeScreen.setBkgData(e);
          }, t.setMode = function(e) {
            e !== this.mode && (this.mode = e, this.logger.log(h.INFO, function() {
              return "MODE=" + e;
            }), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e);
          }, t.insertChars = function(e) {
            for (var d = this, E = 0; E < e.length; E++)
              this.writeScreen.insertChar(e[E]);
            var p = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
            this.logger.log(h.INFO, function() {
              return p + ": " + d.writeScreen.getDisplayText(!0);
            }), (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") && (this.logger.log(h.TEXT, function() {
              return "DISPLAYED: " + d.displayedMemory.getDisplayText(!0);
            }), this.outputDataUpdate());
          }, t.ccRCL = function() {
            this.logger.log(h.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
          }, t.ccBS = function() {
            this.logger.log(h.INFO, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
          }, t.ccAOF = function() {
          }, t.ccAON = function() {
          }, t.ccDER = function() {
            this.logger.log(h.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
          }, t.ccRU = function(e) {
            this.logger.log(h.INFO, "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e);
          }, t.ccFON = function() {
            this.logger.log(h.INFO, "FON - Flash On"), this.writeScreen.setPen({
              flash: !0
            });
          }, t.ccRDC = function() {
            this.logger.log(h.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
          }, t.ccTR = function() {
            this.logger.log(h.INFO, "TR"), this.setMode("MODE_TEXT");
          }, t.ccRTD = function() {
            this.logger.log(h.INFO, "RTD"), this.setMode("MODE_TEXT");
          }, t.ccEDM = function() {
            this.logger.log(h.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
          }, t.ccCR = function() {
            this.logger.log(h.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
          }, t.ccENM = function() {
            this.logger.log(h.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
          }, t.ccEOC = function() {
            var e = this;
            if (this.logger.log(h.INFO, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
              var d = this.displayedMemory;
              this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = d, this.writeScreen = this.nonDisplayedMemory, this.logger.log(h.TEXT, function() {
                return "DISP: " + e.displayedMemory.getDisplayText();
              });
            }
            this.outputDataUpdate(!0);
          }, t.ccTO = function(e) {
            this.logger.log(h.INFO, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e);
          }, t.ccMIDROW = function(e) {
            var d = {
              flash: !1
            };
            if (d.underline = e % 2 === 1, d.italics = e >= 46, d.italics)
              d.foreground = "white";
            else {
              var E = Math.floor(e / 2) - 16, p = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
              d.foreground = p[E];
            }
            this.logger.log(h.INFO, "MIDROW: " + JSON.stringify(d)), this.writeScreen.setPen(d);
          }, t.outputDataUpdate = function(e) {
            e === void 0 && (e = !1);
            var d = this.logger.time;
            d !== null && this.outputFilter && (this.cueStartTime === null && !this.displayedMemory.isEmpty() ? this.cueStartTime = d : this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, d, this.lastOutputScreen), e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : d), this.lastOutputScreen.copy(this.displayedMemory));
          }, t.cueSplitAtTime = function(e) {
            this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e));
          }, n;
        }(), o = /* @__PURE__ */ function() {
          function n(c, e, d) {
            this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
            var E = new y();
            this.channels = [null, new g(c, e, E), new g(c + 1, d, E)], this.cmdHistory = v(), this.logger = E;
          }
          var t = n.prototype;
          return t.getHandler = function(e) {
            return this.channels[e].getHandler();
          }, t.setHandler = function(e, d) {
            this.channels[e].setHandler(d);
          }, t.addData = function(e, d) {
            var E, p, D, R = !1;
            this.logger.time = e;
            for (var b = 0; b < d.length; b += 2)
              if (p = d[b] & 127, D = d[b + 1] & 127, !(p === 0 && D === 0)) {
                if (this.logger.log(h.DATA, "[" + m([d[b], d[b + 1]]) + "] -> (" + m([p, D]) + ")"), E = this.parseCmd(p, D), E || (E = this.parseMidrow(p, D)), E || (E = this.parsePAC(p, D)), E || (E = this.parseBackgroundAttributes(p, D)), !E && (R = this.parseChars(p, D), R)) {
                  var O = this.currentChannel;
                  if (O && O > 0) {
                    var M = this.channels[O];
                    M.insertChars(R);
                  } else
                    this.logger.log(h.WARNING, "No channel found yet. TEXT-MODE?");
                }
                !E && !R && this.logger.log(h.WARNING, "Couldn't parse cleaned data " + m([p, D]) + " orig: " + m([d[b], d[b + 1]]));
              }
          }, t.parseCmd = function(e, d) {
            var E = this.cmdHistory, p = (e === 20 || e === 28 || e === 21 || e === 29) && d >= 32 && d <= 47, D = (e === 23 || e === 31) && d >= 33 && d <= 35;
            if (!(p || D))
              return !1;
            if (l(e, d, E))
              return r(null, null, E), this.logger.log(h.DEBUG, "Repeated command (" + m([e, d]) + ") is dropped"), !0;
            var R = e === 20 || e === 21 || e === 23 ? 1 : 2, b = this.channels[R];
            return e === 20 || e === 21 || e === 28 || e === 29 ? d === 32 ? b.ccRCL() : d === 33 ? b.ccBS() : d === 34 ? b.ccAOF() : d === 35 ? b.ccAON() : d === 36 ? b.ccDER() : d === 37 ? b.ccRU(2) : d === 38 ? b.ccRU(3) : d === 39 ? b.ccRU(4) : d === 40 ? b.ccFON() : d === 41 ? b.ccRDC() : d === 42 ? b.ccTR() : d === 43 ? b.ccRTD() : d === 44 ? b.ccEDM() : d === 45 ? b.ccCR() : d === 46 ? b.ccENM() : d === 47 && b.ccEOC() : b.ccTO(d - 32), r(e, d, E), this.currentChannel = R, !0;
          }, t.parseMidrow = function(e, d) {
            var E = 0;
            if ((e === 17 || e === 25) && d >= 32 && d <= 47) {
              if (e === 17 ? E = 1 : E = 2, E !== this.currentChannel)
                return this.logger.log(h.ERROR, "Mismatch channel in midrow parsing"), !1;
              var p = this.channels[E];
              return p ? (p.ccMIDROW(d), this.logger.log(h.DEBUG, "MIDROW (" + m([e, d]) + ")"), !0) : !1;
            }
            return !1;
          }, t.parsePAC = function(e, d) {
            var E, p = this.cmdHistory, D = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && d >= 64 && d <= 127, R = (e === 16 || e === 24) && d >= 64 && d <= 95;
            if (!(D || R))
              return !1;
            if (l(e, d, p))
              return r(null, null, p), !0;
            var b = e <= 23 ? 1 : 2;
            d >= 64 && d <= 95 ? E = b === 1 ? P[e] : x[e] : E = b === 1 ? L[e] : _[e];
            var O = this.channels[b];
            return O ? (O.setPAC(this.interpretPAC(E, d)), r(e, d, p), this.currentChannel = b, !0) : !1;
          }, t.interpretPAC = function(e, d) {
            var E, p = {
              color: null,
              italics: !1,
              indent: null,
              underline: !1,
              row: e
            };
            return d > 95 ? E = d - 96 : E = d - 64, p.underline = (E & 1) === 1, E <= 13 ? p.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(E / 2)] : E <= 15 ? (p.italics = !0, p.color = "white") : p.indent = Math.floor((E - 16) / 2) * 4, p;
          }, t.parseChars = function(e, d) {
            var E, p = null, D = null;
            if (e >= 25 ? (E = 2, D = e - 8) : (E = 1, D = e), D >= 17 && D <= 19) {
              var R;
              D === 17 ? R = d + 80 : D === 18 ? R = d + 112 : R = d + 144, this.logger.log(h.INFO, "Special char '" + C(R) + "' in channel " + E), p = [R];
            } else
              e >= 32 && e <= 127 && (p = d === 0 ? [e] : [e, d]);
            if (p) {
              var b = m(p);
              this.logger.log(h.DEBUG, "Char codes =  " + b.join(",")), r(e, d, this.cmdHistory);
            }
            return p;
          }, t.parseBackgroundAttributes = function(e, d) {
            var E = (e === 16 || e === 24) && d >= 32 && d <= 47, p = (e === 23 || e === 31) && d >= 45 && d <= 47;
            if (!(E || p))
              return !1;
            var D, R = {};
            e === 16 || e === 24 ? (D = Math.floor((d - 32) / 2), R.background = T[D], d % 2 === 1 && (R.background = R.background + "_semi")) : d === 45 ? R.background = "transparent" : (R.foreground = "black", d === 47 && (R.underline = !0));
            var b = e <= 23 ? 1 : 2, O = this.channels[b];
            return O.setBkgData(R), r(e, d, this.cmdHistory), !0;
          }, t.reset = function() {
            for (var e = 0; e < Object.keys(this.channels).length; e++) {
              var d = this.channels[e];
              d && d.reset();
            }
            this.cmdHistory = v();
          }, t.cueSplitAtTime = function(e) {
            for (var d = 0; d < this.channels.length; d++) {
              var E = this.channels[d];
              E && E.cueSplitAtTime(e);
            }
          }, n;
        }();
        function r(n, t, c) {
          c.a = n, c.b = t;
        }
        function l(n, t, c) {
          return c.a === n && c.b === t;
        }
        function v() {
          return {
            a: null,
            b: null
          };
        }
        const u = o;
      },
      "./src/utils/codecs.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          isCodecSupportedInMp4: () => C,
          isCodecType: () => A
        });
        var F = {
          audio: {
            a3ds: !0,
            "ac-3": !0,
            "ac-4": !0,
            alac: !0,
            alaw: !0,
            dra1: !0,
            "dts+": !0,
            "dts-": !0,
            dtsc: !0,
            dtse: !0,
            dtsh: !0,
            "ec-3": !0,
            enca: !0,
            g719: !0,
            g726: !0,
            m4ae: !0,
            mha1: !0,
            mha2: !0,
            mhm1: !0,
            mhm2: !0,
            mlpa: !0,
            mp4a: !0,
            "raw ": !0,
            Opus: !0,
            opus: !0,
            samr: !0,
            sawb: !0,
            sawp: !0,
            sevc: !0,
            sqcp: !0,
            ssmv: !0,
            twos: !0,
            ulaw: !0
          },
          video: {
            avc1: !0,
            avc2: !0,
            avc3: !0,
            avc4: !0,
            avcp: !0,
            av01: !0,
            drac: !0,
            dva1: !0,
            dvav: !0,
            dvh1: !0,
            dvhe: !0,
            encv: !0,
            hev1: !0,
            hvc1: !0,
            mjp2: !0,
            mp4v: !0,
            mvc1: !0,
            mvc2: !0,
            mvc3: !0,
            mvc4: !0,
            resv: !0,
            rv60: !0,
            s263: !0,
            svc1: !0,
            svc2: !0,
            "vc-1": !0,
            vp08: !0,
            vp09: !0
          },
          text: {
            stpp: !0,
            wvtt: !0
          }
        };
        function A(I, k) {
          var P = F[k];
          return !!P && P[I.slice(0, 4)] === !0;
        }
        function C(I, k) {
          return MediaSource.isTypeSupported((k || "video") + '/mp4;codecs="' + I + '"');
        }
      },
      "./src/utils/cues.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => P
        });
        var F = S("./src/utils/vttparser.ts"), A = S("./src/utils/webvtt-parser.ts"), C = S("./src/utils/texttrack-utils.ts"), I = /\s/, k = {
          newCue: function(x, _, T, h) {
            for (var y = [], m, s, f, a, i, g = self.VTTCue || self.TextTrackCue, o = 0; o < h.rows.length; o++)
              if (m = h.rows[o], f = !0, a = 0, i = "", !m.isEmpty()) {
                for (var r = 0; r < m.chars.length; r++)
                  I.test(m.chars[r].uchar) && f ? a++ : (i += m.chars[r].uchar, f = !1);
                m.cueStartTime = _, _ === T && (T += 1e-4), a >= 16 ? a-- : a++;
                var l = (0, F.fixLineBreaks)(i.trim()), v = (0, A.generateCueId)(_, T, l);
                (!x || !x.cues || !x.cues.getCueById(v)) && (s = new g(_, T, l), s.id = v, s.line = o + 1, s.align = "left", s.position = 10 + Math.min(80, Math.floor(a * 8 / 32) * 10), y.push(s));
              }
            return x && y.length && (y.sort(function(u, n) {
              return u.line === "auto" || n.line === "auto" ? 0 : u.line > 8 && n.line > 8 ? n.line - u.line : u.line - n.line;
            }), y.forEach(function(u) {
              return (0, C.addCueToTrack)(x, u);
            })), y;
          }
        };
        const P = k;
      },
      "./src/utils/discontinuities.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          adjustSlidingStart: () => x,
          alignMediaPlaylistByPDT: () => y,
          alignPDT: () => h,
          alignStream: () => _,
          findDiscontinuousReferenceFrag: () => P,
          findFirstFragWithCC: () => I,
          shouldAlignOnDiscontinuities: () => k
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/logger.ts"), C = S("./src/controller/level-helper.ts");
        function I(m, s) {
          for (var f = null, a = 0, i = m.length; a < i; a++) {
            var g = m[a];
            if (g && g.cc === s) {
              f = g;
              break;
            }
          }
          return f;
        }
        function k(m, s, f) {
          return !!(s.details && (f.endCC > f.startCC || m && m.cc < f.startCC));
        }
        function P(m, s, f) {
          var a = m.fragments, i = s.fragments;
          if (!i.length || !a.length) {
            A.logger.log("No fragments to align");
            return;
          }
          var g = I(a, i[0].cc);
          if (!g || g && !g.startPTS) {
            A.logger.log("No frag in previous level to align on");
            return;
          }
          return g;
        }
        function L(m, s) {
          if (m) {
            var f = m.start + s;
            m.start = m.startPTS = f, m.endPTS = f + m.duration;
          }
        }
        function x(m, s) {
          for (var f = s.fragments, a = 0, i = f.length; a < i; a++)
            L(f[a], m);
          s.fragmentHint && L(s.fragmentHint, m), s.alignedSliding = !0;
        }
        function _(m, s, f) {
          !s || (T(m, f, s), !f.alignedSliding && s.details && h(f, s.details), !f.alignedSliding && s.details && !f.skippedSegments && (0, C.adjustSliding)(s.details, f));
        }
        function T(m, s, f) {
          if (k(m, f, s)) {
            var a = P(f.details, s);
            a && (0, F.isFiniteNumber)(a.start) && (A.logger.log("Adjusting PTS using last level due to CC increase within current level " + s.url), x(a.start, s));
          }
        }
        function h(m, s) {
          if (!(!s.fragments.length || !m.hasProgramDateTime || !s.hasProgramDateTime)) {
            var f = s.fragments[0].programDateTime, a = m.fragments[0].programDateTime, i = (a - f) / 1e3 + s.fragments[0].start;
            i && (0, F.isFiniteNumber)(i) && (A.logger.log("Adjusting PTS using programDateTime delta " + (a - f) + "ms, sliding:" + i.toFixed(3) + " " + m.url + " "), x(i, m));
          }
        }
        function y(m, s) {
          if (!(!m.hasProgramDateTime || !s.hasProgramDateTime)) {
            var f = m.fragments, a = s.fragments;
            if (!(!f.length || !a.length)) {
              var i = Math.round(a.length / 2) - 1, g = a[i], o = I(f, g.cc) || f[Math.round(f.length / 2) - 1], r = g.programDateTime, l = o.programDateTime;
              if (!(r === null || l === null)) {
                var v = (l - r) / 1e3 - (o.start - g.start);
                x(v, m);
              }
            }
          }
        }
      },
      "./src/utils/ewma-bandwidth-estimator.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => C
        });
        var F = S("./src/utils/ewma.ts"), A = /* @__PURE__ */ function() {
          function I(P, L, x) {
            this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultEstimate_ = x, this.minWeight_ = 1e-3, this.minDelayMs_ = 50, this.slow_ = new F.default(P), this.fast_ = new F.default(L);
          }
          var k = I.prototype;
          return k.update = function(L, x) {
            var _ = this.slow_, T = this.fast_;
            this.slow_.halfLife !== L && (this.slow_ = new F.default(L, _.getEstimate(), _.getTotalWeight())), this.fast_.halfLife !== x && (this.fast_ = new F.default(x, T.getEstimate(), T.getTotalWeight()));
          }, k.sample = function(L, x) {
            L = Math.max(L, this.minDelayMs_);
            var _ = 8 * x, T = L / 1e3, h = _ / T;
            this.fast_.sample(T, h), this.slow_.sample(T, h);
          }, k.canEstimate = function() {
            var L = this.fast_;
            return L && L.getTotalWeight() >= this.minWeight_;
          }, k.getEstimate = function() {
            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_;
          }, k.destroy = function() {
          }, I;
        }();
        const C = A;
      },
      "./src/utils/ewma.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = /* @__PURE__ */ function() {
          function C(k, P, L) {
            P === void 0 && (P = 0), L === void 0 && (L = 0), this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = k, this.alpha_ = k ? Math.exp(Math.log(0.5) / k) : 0, this.estimate_ = P, this.totalWeight_ = L;
          }
          var I = C.prototype;
          return I.sample = function(P, L) {
            var x = Math.pow(this.alpha_, P);
            this.estimate_ = L * (1 - x) + x * this.estimate_, this.totalWeight_ += P;
          }, I.getTotalWeight = function() {
            return this.totalWeight_;
          }, I.getEstimate = function() {
            if (this.alpha_) {
              var P = 1 - Math.pow(this.alpha_, this.totalWeight_);
              if (P)
                return this.estimate_ / P;
            }
            return this.estimate_;
          }, C;
        }();
        const A = F;
      },
      "./src/utils/fetch-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => i,
          fetchSupported: () => y
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/loader/load-stats.ts"), C = S("./src/demux/chunk-cache.ts");
        function I(g, o) {
          g.prototype = Object.create(o.prototype), g.prototype.constructor = g, _(g, o);
        }
        function k(g) {
          var o = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
          return k = function(l) {
            if (l === null || !x(l))
              return l;
            if (typeof l != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (typeof o != "undefined") {
              if (o.has(l))
                return o.get(l);
              o.set(l, v);
            }
            function v() {
              return P(l, arguments, T(this).constructor);
            }
            return v.prototype = Object.create(l.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), _(v, l);
          }, k(g);
        }
        function P(g, o, r) {
          return L() ? P = Reflect.construct.bind() : P = function(v, u, n) {
            var t = [null];
            t.push.apply(t, u);
            var c = Function.bind.apply(v, t), e = new c();
            return n && _(e, n.prototype), e;
          }, P.apply(null, arguments);
        }
        function L() {
          if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if (typeof Proxy == "function")
            return !0;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), !0;
          } catch (g) {
            return !1;
          }
        }
        function x(g) {
          return Function.toString.call(g).indexOf("[native code]") !== -1;
        }
        function _(g, o) {
          return _ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(l, v) {
            return l.__proto__ = v, l;
          }, _(g, o);
        }
        function T(g) {
          return T = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
            return r.__proto__ || Object.getPrototypeOf(r);
          }, T(g);
        }
        function h() {
          return h = Object.assign ? Object.assign.bind() : function(g) {
            for (var o = 1; o < arguments.length; o++) {
              var r = arguments[o];
              for (var l in r)
                Object.prototype.hasOwnProperty.call(r, l) && (g[l] = r[l]);
            }
            return g;
          }, h.apply(this, arguments);
        }
        function y() {
          if (self.fetch && self.AbortController && self.ReadableStream && self.Request)
            try {
              return new self.ReadableStream({}), !0;
            } catch (g) {
            }
          return !1;
        }
        var m = /* @__PURE__ */ function() {
          function g(r) {
            this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = r.fetchSetup || f, this.controller = new self.AbortController(), this.stats = new A.LoadStats();
          }
          var o = g.prototype;
          return o.destroy = function() {
            this.loader = this.callbacks = null, this.abortInternal();
          }, o.abortInternal = function() {
            var l = this.response;
            (!l || !l.ok) && (this.stats.aborted = !0, this.controller.abort());
          }, o.abort = function() {
            var l;
            this.abortInternal(), (l = this.callbacks) !== null && l !== void 0 && l.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
          }, o.load = function(l, v, u) {
            var n = this, t = this.stats;
            if (t.loading.start)
              throw new Error("Loader can only be used once.");
            t.loading.start = self.performance.now();
            var c = s(l, this.controller.signal), e = u.onProgress, d = l.responseType === "arraybuffer", E = d ? "byteLength" : "length";
            this.context = l, this.config = v, this.callbacks = u, this.request = this.fetchSetup(l, c), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(function() {
              n.abortInternal(), u.onTimeout(t, l, n.response);
            }, v.timeout), self.fetch(this.request).then(function(p) {
              if (n.response = n.loader = p, !p.ok) {
                var D = p.status, R = p.statusText;
                throw new a(R || "fetch, bad network response", D, p);
              }
              return t.loading.first = Math.max(self.performance.now(), t.loading.start), t.total = parseInt(p.headers.get("Content-Length") || "0"), e && (0, F.isFiniteNumber)(v.highWaterMark) ? n.loadProgressively(p, t, l, v.highWaterMark, e) : d ? p.arrayBuffer() : p.text();
            }).then(function(p) {
              var D = n.response;
              self.clearTimeout(n.requestTimeout), t.loading.end = Math.max(self.performance.now(), t.loading.first);
              var R = p[E];
              R && (t.loaded = t.total = R);
              var b = {
                url: D.url,
                data: p
              };
              e && !(0, F.isFiniteNumber)(v.highWaterMark) && e(t, l, p, D), u.onSuccess(b, t, l, D);
            }).catch(function(p) {
              if (self.clearTimeout(n.requestTimeout), !t.aborted) {
                var D = p && p.code || 0, R = p ? p.message : null;
                u.onError({
                  code: D,
                  text: R
                }, l, p ? p.details : null);
              }
            });
          }, o.getCacheAge = function() {
            var l = null;
            if (this.response) {
              var v = this.response.headers.get("age");
              l = v ? parseFloat(v) : null;
            }
            return l;
          }, o.loadProgressively = function(l, v, u, n, t) {
            n === void 0 && (n = 0);
            var c = new C.default(), e = l.body.getReader(), d = function E() {
              return e.read().then(function(p) {
                if (p.done)
                  return c.dataLength && t(v, u, c.flush(), l), Promise.resolve(new ArrayBuffer(0));
                var D = p.value, R = D.length;
                return v.loaded += R, R < n || c.dataLength ? (c.push(D), c.dataLength >= n && t(v, u, c.flush(), l)) : t(v, u, D, l), E();
              }).catch(function() {
                return Promise.reject();
              });
            };
            return d();
          }, g;
        }();
        function s(g, o) {
          var r = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            signal: o,
            headers: new self.Headers(h({}, g.headers))
          };
          return g.rangeEnd && r.headers.set("Range", "bytes=" + g.rangeStart + "-" + String(g.rangeEnd - 1)), r;
        }
        function f(g, o) {
          return new self.Request(g.url, o);
        }
        var a = /* @__PURE__ */ function(g) {
          I(o, g);
          function o(r, l, v) {
            var u;
            return u = g.call(this, r) || this, u.code = void 0, u.details = void 0, u.code = l, u.details = v, u;
          }
          return o;
        }(/* @__PURE__ */ k(Error));
        const i = m;
      },
      "./src/utils/hex.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = {
          hexDump: function(I) {
            for (var k = "", P = 0; P < I.length; P++) {
              var L = I[P].toString(16);
              L.length < 2 && (L = "0" + L), k += L;
            }
            return k;
          }
        };
        const A = F;
      },
      "./src/utils/imsc1-ttml-parser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          IMSC1_CODEC: () => x,
          parseIMSC1: () => y
        });
        var F = S("./src/utils/mp4-tools.ts"), A = S("./src/utils/vttparser.ts"), C = S("./src/utils/vttcue.ts"), I = S("./src/demux/id3.ts"), k = S("./src/utils/timescale-conversion.ts"), P = S("./src/utils/webvtt-parser.ts");
        function L() {
          return L = Object.assign ? Object.assign.bind() : function(u) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var c in t)
                Object.prototype.hasOwnProperty.call(t, c) && (u[c] = t[c]);
            }
            return u;
          }, L.apply(this, arguments);
        }
        var x = "stpp.ttml.im1t", _ = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, T = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, h = {
          left: "start",
          center: "center",
          right: "end",
          start: "start",
          end: "end"
        };
        function y(u, n, t, c, e) {
          var d = (0, F.findBox)(new Uint8Array(u), ["mdat"]);
          if (d.length === 0) {
            e(new Error("Could not parse IMSC1 mdat"));
            return;
          }
          var E = d.map(function(D) {
            return (0, I.utf8ArrayToStr)(D);
          }), p = (0, k.toTimescaleFromScale)(n, 1, t);
          try {
            E.forEach(function(D) {
              return c(m(D, p));
            });
          } catch (D) {
            e(D);
          }
        }
        function m(u, n) {
          var t = new DOMParser(), c = t.parseFromString(u, "text/xml"), e = c.getElementsByTagName("tt")[0];
          if (!e)
            throw new Error("Invalid ttml");
          var d = {
            frameRate: 30,
            subFrameRate: 1,
            frameRateMultiplier: 0,
            tickRate: 0
          }, E = Object.keys(d).reduce(function(O, M) {
            return O[M] = e.getAttribute("ttp:" + M) || d[M], O;
          }, {}), p = e.getAttribute("xml:space") !== "preserve", D = f(s(e, "styling", "style")), R = f(s(e, "layout", "region")), b = s(e, "body", "[begin]");
          return [].map.call(b, function(O) {
            var M = a(O, p);
            if (!M || !O.hasAttribute("begin"))
              return null;
            var w = r(O.getAttribute("begin"), E), U = r(O.getAttribute("dur"), E), N = r(O.getAttribute("end"), E);
            if (w === null)
              throw o(O);
            if (N === null) {
              if (U === null)
                throw o(O);
              N = w + U;
            }
            var K = new C.default(w - n, N - n, M);
            K.id = (0, P.generateCueId)(K.startTime, K.endTime, K.text);
            var W = R[O.getAttribute("region")], G = D[O.getAttribute("style")], j = i(W, G, D), H = j.textAlign;
            if (H) {
              var X = h[H];
              X && (K.lineAlign = X), K.align = H;
            }
            return L(K, j), K;
          }).filter(function(O) {
            return O !== null;
          });
        }
        function s(u, n, t) {
          var c = u.getElementsByTagName(n)[0];
          return c ? [].slice.call(c.querySelectorAll(t)) : [];
        }
        function f(u) {
          return u.reduce(function(n, t) {
            var c = t.getAttribute("xml:id");
            return c && (n[c] = t), n;
          }, {});
        }
        function a(u, n) {
          return [].slice.call(u.childNodes).reduce(function(t, c, e) {
            var d;
            return c.nodeName === "br" && e ? t + `
` : (d = c.childNodes) !== null && d !== void 0 && d.length ? a(c, n) : n ? t + c.textContent.trim().replace(/\s+/g, " ") : t + c.textContent;
          }, "");
        }
        function i(u, n, t) {
          var c = "http://www.w3.org/ns/ttml#styling", e = null, d = [
            "displayAlign",
            "textAlign",
            "color",
            "backgroundColor",
            "fontSize",
            "fontFamily"
          ], E = u != null && u.hasAttribute("style") ? u.getAttribute("style") : null;
          return E && t.hasOwnProperty(E) && (e = t[E]), d.reduce(function(p, D) {
            var R = g(n, c, D) || g(u, c, D) || g(e, c, D);
            return R && (p[D] = R), p;
          }, {});
        }
        function g(u, n, t) {
          return u && u.hasAttributeNS(n, t) ? u.getAttributeNS(n, t) : null;
        }
        function o(u) {
          return new Error("Could not parse ttml timestamp " + u);
        }
        function r(u, n) {
          if (!u)
            return null;
          var t = (0, A.parseTimeStamp)(u);
          return t === null && (_.test(u) ? t = l(u, n) : T.test(u) && (t = v(u, n))), t;
        }
        function l(u, n) {
          var t = _.exec(u), c = (t[4] | 0) + (t[5] | 0) / n.subFrameRate;
          return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + c / n.frameRate;
        }
        function v(u, n) {
          var t = T.exec(u), c = Number(t[1]), e = t[2];
          switch (e) {
            case "h":
              return c * 3600;
            case "m":
              return c * 60;
            case "ms":
              return c * 1e3;
            case "f":
              return c / n.frameRate;
            case "t":
              return c / n.tickRate;
          }
          return c;
        }
      },
      "./src/utils/keysystem-util.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          changeEndianness: () => C,
          convertDataUriToArrayBytes: () => I,
          strToUtf8array: () => k
        });
        var F = S("./src/utils/numeric-encoding-utils.ts");
        function A(P) {
          var L = k(P).subarray(0, 16), x = new Uint8Array(16);
          return x.set(L, 16 - L.length), x;
        }
        function C(P) {
          var L = function(_, T, h) {
            var y = _[T];
            _[T] = _[h], _[h] = y;
          };
          L(P, 0, 3), L(P, 1, 2), L(P, 4, 5), L(P, 6, 7);
        }
        function I(P) {
          var L = P.split(":"), x = null;
          if (L[0] === "data" && L.length === 2) {
            var _ = L[1].split(";"), T = _[_.length - 1].split(",");
            if (T.length === 2) {
              var h = T[0] === "base64", y = T[1];
              h ? (_.splice(-1, 1), x = (0, F.base64Decode)(y)) : x = A(y);
            }
          }
          return x;
        }
        function k(P) {
          return Uint8Array.from(unescape(encodeURIComponent(P)), function(L) {
            return L.charCodeAt(0);
          });
        }
      },
      "./src/utils/logger.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          enableLogs: () => P,
          logger: () => L
        });
        var F = function() {
        }, A = {
          trace: F,
          debug: F,
          log: F,
          warn: F,
          info: F,
          error: F
        }, C = A;
        function I(x) {
          var _ = self.console[x];
          return _ ? _.bind(self.console, "[" + x + "] >") : F;
        }
        function k(x) {
          for (var _ = arguments.length, T = new Array(_ > 1 ? _ - 1 : 0), h = 1; h < _; h++)
            T[h - 1] = arguments[h];
          T.forEach(function(y) {
            C[y] = x[y] ? x[y].bind(x) : I(y);
          });
        }
        function P(x, _) {
          if (self.console && x === !0 || typeof x == "object") {
            k(
              x,
              "debug",
              "log",
              "info",
              "warn",
              "error"
            );
            try {
              C.log('Debug logs enabled for "' + _ + '"');
            } catch (T) {
              C = A;
            }
          } else
            C = A;
        }
        var L = C;
      },
      "./src/utils/mediakeys-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          KeySystemFormats: () => A,
          KeySystemIds: () => I,
          KeySystems: () => F,
          getKeySystemsForConfig: () => L,
          getSupportedMediaKeySystemConfigurations: () => _,
          keySystemDomainToKeySystemFormat: () => P,
          keySystemFormatToKeySystemDomain: () => C,
          keySystemIdToKeySystemDomain: () => k,
          requestMediaKeySystemAccess: () => x
        });
        var F;
        (function(h) {
          h.CLEARKEY = "org.w3.clearkey", h.FAIRPLAY = "com.apple.fps", h.PLAYREADY = "com.microsoft.playready", h.WIDEVINE = "com.widevine.alpha";
        })(F || (F = {}));
        var A;
        (function(h) {
          h.CLEARKEY = "org.w3.clearkey", h.FAIRPLAY = "com.apple.streamingkeydelivery", h.PLAYREADY = "com.microsoft.playready", h.WIDEVINE = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
        })(A || (A = {}));
        function C(h) {
          switch (h) {
            case A.FAIRPLAY:
              return F.FAIRPLAY;
            case A.PLAYREADY:
              return F.PLAYREADY;
            case A.WIDEVINE:
              return F.WIDEVINE;
            case A.CLEARKEY:
              return F.CLEARKEY;
          }
        }
        var I;
        (function(h) {
          h.WIDEVINE = "edef8ba979d64acea3c827dcd51d21ed";
        })(I || (I = {}));
        function k(h) {
          if (h === I.WIDEVINE)
            return F.WIDEVINE;
        }
        function P(h) {
          switch (h) {
            case F.FAIRPLAY:
              return A.FAIRPLAY;
            case F.PLAYREADY:
              return A.PLAYREADY;
            case F.WIDEVINE:
              return A.WIDEVINE;
            case F.CLEARKEY:
              return A.CLEARKEY;
          }
        }
        function L(h) {
          var y = h.drmSystems, m = h.widevineLicenseUrl, s = y ? [F.FAIRPLAY, F.WIDEVINE, F.PLAYREADY, F.CLEARKEY].filter(function(f) {
            return !!y[f];
          }) : [];
          return !s[F.WIDEVINE] && m && s.push(F.WIDEVINE), s;
        }
        var x = function() {
          return typeof self != "undefined" && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
        }();
        function _(h, y, m, s) {
          var f;
          switch (h) {
            case F.FAIRPLAY:
              f = ["cenc", "sinf"];
              break;
            case F.WIDEVINE:
            case F.PLAYREADY:
              f = ["cenc"];
              break;
            case F.CLEARKEY:
              f = ["cenc", "keyids"];
              break;
            default:
              throw new Error("Unknown key-system: " + h);
          }
          return T(f, y, m, s);
        }
        function T(h, y, m, s) {
          var f = {
            initDataTypes: h,
            persistentState: s.persistentState || "not-allowed",
            distinctiveIdentifier: s.distinctiveIdentifier || "not-allowed",
            sessionTypes: s.sessionTypes || [s.sessionType || "temporary"],
            audioCapabilities: y.map(function(a) {
              return {
                contentType: 'audio/mp4; codecs="' + a + '"',
                robustness: s.audioRobustness || "",
                encryptionScheme: s.audioEncryptionScheme || null
              };
            }),
            videoCapabilities: m.map(function(a) {
              return {
                contentType: 'video/mp4; codecs="' + a + '"',
                robustness: s.videoRobustness || "",
                encryptionScheme: s.videoEncryptionScheme || null
              };
            })
          };
          return [f];
        }
      },
      "./src/utils/mediasource-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          getMediaSource: () => F
        });
        function F() {
          return self.MediaSource || self.WebKitMediaSource;
        }
      },
      "./src/utils/mp4-tools.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          RemuxerTrackIdConfig: () => x,
          appendUint8Array: () => n,
          bin2str: () => _,
          computeRawDurationFromSamples: () => l,
          discardEPB: () => E,
          findBox: () => s,
          getDuration: () => r,
          getStartDTS: () => o,
          mp4Box: () => D,
          mp4pssh: () => R,
          offsetStartDTS: () => v,
          parseEmsg: () => p,
          parseInitSegment: () => a,
          parsePssh: () => b,
          parseSEIMessageFromNALu: () => d,
          parseSamples: () => t,
          parseSegmentIndex: () => f,
          parseSinf: () => g,
          patchEncyptionData: () => i,
          readSint32: () => y,
          readUint16: () => T,
          readUint32: () => h,
          segmentValidRange: () => u,
          writeUint32: () => m
        });
        var F = S("./src/loader/fragment.ts"), A = S("./src/utils/typed-array.ts"), C = S("./src/demux/id3.ts"), I = S("./src/utils/logger.ts"), k = S("./src/utils/hex.ts"), P = Math.pow(2, 32) - 1, L = [].push, x = {
          video: 1,
          audio: 2,
          id3: 3,
          text: 4
        };
        function _(O) {
          return String.fromCharCode.apply(null, O);
        }
        function T(O, M) {
          var w = O[M] << 8 | O[M + 1];
          return w < 0 ? 65536 + w : w;
        }
        function h(O, M) {
          var w = y(O, M);
          return w < 0 ? 4294967296 + w : w;
        }
        function y(O, M) {
          return O[M] << 24 | O[M + 1] << 16 | O[M + 2] << 8 | O[M + 3];
        }
        function m(O, M, w) {
          O[M] = w >> 24, O[M + 1] = w >> 16 & 255, O[M + 2] = w >> 8 & 255, O[M + 3] = w & 255;
        }
        function s(O, M) {
          var w = [];
          if (!M.length)
            return w;
          for (var U = O.byteLength, N = 0; N < U; ) {
            var K = h(O, N), W = _(O.subarray(N + 4, N + 8)), G = K > 1 ? N + K : U;
            if (W === M[0])
              if (M.length === 1)
                w.push(O.subarray(N + 8, G));
              else {
                var j = s(O.subarray(N + 8, G), M.slice(1));
                j.length && L.apply(w, j);
              }
            N = G;
          }
          return w;
        }
        function f(O) {
          var M = [], w = O[0], U = 8, N = h(O, U);
          U += 4;
          var K = 0, W = 0;
          w === 0 ? U += 8 : U += 16, U += 2;
          var G = O.length + W, j = T(O, U);
          U += 2;
          for (var H = 0; H < j; H++) {
            var X = U, Z = h(O, X);
            X += 4;
            var J = Z & 2147483647, $ = (Z & 2147483648) >>> 31;
            if ($ === 1)
              return console.warn("SIDX has hierarchical references (not supported)"), null;
            var z = h(O, X);
            X += 4, M.push({
              referenceSize: J,
              subsegmentDuration: z,
              info: {
                duration: z / N,
                start: G,
                end: G + J - 1
              }
            }), G += J, X += 4, U = X;
          }
          return {
            earliestPresentationTime: K,
            timescale: N,
            version: w,
            referencesCount: j,
            references: M
          };
        }
        function a(O) {
          for (var M = [], w = s(O, ["moov", "trak"]), U = 0; U < w.length; U++) {
            var N = w[U], K = s(N, ["tkhd"])[0];
            if (K) {
              var W = K[0], G = W === 0 ? 12 : 20, j = h(K, G), H = s(N, ["mdia", "mdhd"])[0];
              if (H) {
                W = H[0], G = W === 0 ? 12 : 20;
                var X = h(H, G), Z = s(N, ["mdia", "hdlr"])[0];
                if (Z) {
                  var J = _(Z.subarray(8, 12)), $ = {
                    soun: F.ElementaryStreamTypes.AUDIO,
                    vide: F.ElementaryStreamTypes.VIDEO
                  }[J];
                  if ($) {
                    var z = s(N, ["mdia", "minf", "stbl", "stsd"])[0], q = void 0;
                    z && (q = _(z.subarray(12, 16))), M[j] = {
                      timescale: X,
                      type: $
                    }, M[$] = {
                      timescale: X,
                      id: j,
                      codec: q
                    };
                  }
                }
              }
            }
          }
          var ie = s(O, ["moov", "mvex", "trex"]);
          return ie.forEach(function(ne) {
            var de = h(ne, 4), se = M[de];
            se && (se.default = {
              duration: h(ne, 12),
              flags: h(ne, 20)
            });
          }), M;
        }
        function i(O, M) {
          if (!O || !M)
            return O;
          var w = M.keyId;
          if (w && M.isCommonEncryption) {
            var U = s(O, ["moov", "trak"]);
            U.forEach(function(N) {
              var K = s(N, ["mdia", "minf", "stbl", "stsd"])[0], W = K.subarray(8), G = s(W, ["enca"]), j = G.length > 0;
              j || (G = s(W, ["encv"])), G.forEach(function(H) {
                var X = j ? H.subarray(28) : H.subarray(78), Z = s(X, ["sinf"]);
                Z.forEach(function(J) {
                  var $ = g(J);
                  if ($) {
                    var z = $.subarray(8, 24);
                    z.some(function(q) {
                      return q !== 0;
                    }) || (I.logger.log("[eme] Patching keyId in 'enc" + (j ? "a" : "v") + ">sinf>>tenc' box: " + k.default.hexDump(z) + " -> " + k.default.hexDump(w)), $.set(w, 8));
                  }
                });
              });
            });
          }
          return O;
        }
        function g(O) {
          var M = s(O, ["schm"])[0];
          if (M) {
            var w = _(M.subarray(4, 8));
            if (w === "cbcs" || w === "cenc")
              return s(O, ["schi", "tenc"])[0];
          }
          return I.logger.error("[eme] missing 'schm' box"), null;
        }
        function o(O, M) {
          return s(M, ["moof", "traf"]).reduce(function(w, U) {
            var N = s(U, ["tfdt"])[0], K = N[0], W = s(U, ["tfhd"]).reduce(function(G, j) {
              var H = h(j, 4), X = O[H];
              if (X) {
                var Z = h(N, 4);
                K === 1 && (Z *= Math.pow(2, 32), Z += h(N, 8));
                var J = X.timescale || 9e4, $ = Z / J;
                if (isFinite($) && (G === null || $ < G))
                  return $;
              }
              return G;
            }, null);
            return W !== null && isFinite(W) && (w === null || W < w) ? W : w;
          }, null) || 0;
        }
        function r(O, M) {
          for (var w = 0, U = 0, N = 0, K = s(O, ["moof", "traf"]), W = 0; W < K.length; W++) {
            var G = K[W], j = s(G, ["tfhd"])[0], H = h(j, 4), X = M[H];
            if (!!X) {
              var Z = X.default, J = h(j, 0) | (Z == null ? void 0 : Z.flags), $ = Z == null ? void 0 : Z.duration;
              J & 8 && (J & 2 ? $ = h(j, 12) : $ = h(j, 8));
              for (var z = X.timescale || 9e4, q = s(G, ["trun"]), ie = 0; ie < q.length; ie++) {
                if (w = l(q[ie]), !w && $) {
                  var ne = h(q[ie], 4);
                  w = $ * ne;
                }
                X.type === F.ElementaryStreamTypes.VIDEO ? U += w / z : X.type === F.ElementaryStreamTypes.AUDIO && (N += w / z);
              }
            }
          }
          if (U === 0 && N === 0) {
            for (var de = 0, se = s(O, ["sidx"]), ue = 0; ue < se.length; ue++) {
              var ae = f(se[ue]);
              ae != null && ae.references && (de += ae.references.reduce(function(oe, le) {
                return oe + le.info.duration || 0;
              }, 0));
            }
            return de;
          }
          return U || N;
        }
        function l(O) {
          var M = h(O, 0), w = 8;
          M & 1 && (w += 4), M & 4 && (w += 4);
          for (var U = 0, N = h(O, 4), K = 0; K < N; K++) {
            if (M & 256) {
              var W = h(O, w);
              U += W, w += 4;
            }
            M & 512 && (w += 4), M & 1024 && (w += 4), M & 2048 && (w += 4);
          }
          return U;
        }
        function v(O, M, w) {
          s(M, ["moof", "traf"]).forEach(function(U) {
            s(U, ["tfhd"]).forEach(function(N) {
              var K = h(N, 4), W = O[K];
              if (!!W) {
                var G = W.timescale || 9e4;
                s(U, ["tfdt"]).forEach(function(j) {
                  var H = j[0], X = h(j, 4);
                  if (H === 0)
                    X -= w * G, X = Math.max(X, 0), m(j, 4, X);
                  else {
                    X *= Math.pow(2, 32), X += h(j, 8), X -= w * G, X = Math.max(X, 0);
                    var Z = Math.floor(X / (P + 1)), J = Math.floor(X % (P + 1));
                    m(j, 4, Z), m(j, 8, J);
                  }
                });
              }
            });
          });
        }
        function u(O) {
          var M = {
            valid: null,
            remainder: null
          }, w = s(O, ["moof"]);
          if (w) {
            if (w.length < 2)
              return M.remainder = O, M;
          } else
            return M;
          var U = w[w.length - 1];
          return M.valid = (0, A.sliceUint8)(O, 0, U.byteOffset - 8), M.remainder = (0, A.sliceUint8)(O, U.byteOffset - 8), M;
        }
        function n(O, M) {
          var w = new Uint8Array(O.length + M.length);
          return w.set(O), w.set(M, O.length), w;
        }
        function t(O, M) {
          var w = [], U = M.samples, N = M.timescale, K = M.id, W = !1, G = s(U, ["moof"]);
          return G.map(function(j) {
            var H = j.byteOffset - 8, X = s(j, ["traf"]);
            X.map(function(Z) {
              var J = s(Z, ["tfdt"]).map(function($) {
                var z = $[0], q = h($, 4);
                return z === 1 && (q *= Math.pow(2, 32), q += h($, 8)), q / N;
              })[0];
              return J !== void 0 && (O = J), s(Z, ["tfhd"]).map(function($) {
                var z = h($, 4), q = h($, 0) & 16777215, ie = (q & 1) !== 0, ne = (q & 2) !== 0, de = (q & 8) !== 0, se = 0, ue = (q & 16) !== 0, ae = 0, oe = (q & 32) !== 0, le = 8;
                z === K && (ie && (le += 8), ne && (le += 4), de && (se = h($, le), le += 4), ue && (ae = h($, le), le += 4), oe && (le += 4), M.type === "video" && (W = c(M.codec)), s(Z, ["trun"]).map(function(he) {
                  var me = he[0], ce = h(he, 0) & 16777215, pe = (ce & 1) !== 0, Re = 0, Te = (ce & 4) !== 0, be = (ce & 256) !== 0, De = 0, _e = (ce & 512) !== 0, Se = 0, ye = (ce & 1024) !== 0, Ee = (ce & 2048) !== 0, xe = 0, Ae = h(he, 4), ve = 8;
                  pe && (Re = h(he, ve), ve += 4), Te && (ve += 4);
                  for (var Le = Re + H, Pe = 0; Pe < Ae; Pe++) {
                    if (be ? (De = h(he, ve), ve += 4) : De = se, _e ? (Se = h(he, ve), ve += 4) : Se = ae, ye && (ve += 4), Ee && (me === 0 ? xe = h(he, ve) : xe = y(he, ve), ve += 4), M.type === F.ElementaryStreamTypes.VIDEO)
                      for (var ke = 0; ke < Se; ) {
                        var Ce = h(U, Le);
                        if (Le += 4, e(W, U[Le])) {
                          var Me = U.subarray(Le, Le + Ce);
                          d(Me, W ? 2 : 1, O + xe / N, w);
                        }
                        Le += Ce, ke += Ce + 4;
                      }
                    O += De / N;
                  }
                }));
              });
            });
          }), w;
        }
        function c(O) {
          if (!O)
            return !1;
          var M = O.indexOf("."), w = M < 0 ? O : O.substring(0, M);
          return w === "hvc1" || w === "hev1" || w === "dvh1" || w === "dvhe";
        }
        function e(O, M) {
          if (O) {
            var w = M >> 1 & 63;
            return w === 39 || w === 40;
          } else {
            var U = M & 31;
            return U === 6;
          }
        }
        function d(O, M, w, U) {
          var N = E(O), K = 0;
          K += M;
          for (var W = 0, G = 0, j = !1, H = 0; K < N.length; ) {
            W = 0;
            do {
              if (K >= N.length)
                break;
              H = N[K++], W += H;
            } while (H === 255);
            G = 0;
            do {
              if (K >= N.length)
                break;
              H = N[K++], G += H;
            } while (H === 255);
            var X = N.length - K;
            if (!j && W === 4 && K < N.length) {
              j = !0;
              var Z = N[K++];
              if (Z === 181) {
                var J = T(N, K);
                if (K += 2, J === 49) {
                  var $ = h(N, K);
                  if (K += 4, $ === 1195456820) {
                    var z = N[K++];
                    if (z === 3) {
                      var q = N[K++], ie = 31 & q, ne = 64 & q, de = ne ? 2 + ie * 3 : 0, se = new Uint8Array(de);
                      if (ne) {
                        se[0] = q;
                        for (var ue = 1; ue < de; ue++)
                          se[ue] = N[K++];
                      }
                      U.push({
                        type: z,
                        payloadType: W,
                        pts: w,
                        bytes: se
                      });
                    }
                  }
                }
              }
            } else if (W === 5 && G < X) {
              if (j = !0, G > 16) {
                for (var ae = [], oe = 0; oe < 16; oe++) {
                  var le = N[K++].toString(16);
                  ae.push(le.length == 1 ? "0" + le : le), (oe === 3 || oe === 5 || oe === 7 || oe === 9) && ae.push("-");
                }
                for (var he = G - 16, me = new Uint8Array(he), ce = 0; ce < he; ce++)
                  me[ce] = N[K++];
                U.push({
                  payloadType: W,
                  pts: w,
                  uuid: ae.join(""),
                  userData: (0, C.utf8ArrayToStr)(me),
                  userDataBytes: me
                });
              }
            } else if (G < X)
              K += G;
            else if (G > X)
              break;
          }
        }
        function E(O) {
          for (var M = O.byteLength, w = [], U = 1; U < M - 2; )
            O[U] === 0 && O[U + 1] === 0 && O[U + 2] === 3 ? (w.push(U + 2), U += 2) : U++;
          if (w.length === 0)
            return O;
          var N = M - w.length, K = new Uint8Array(N), W = 0;
          for (U = 0; U < N; W++, U++)
            W === w[0] && (W++, w.shift()), K[U] = O[W];
          return K;
        }
        function p(O) {
          var M = O[0], w = "", U = "", N = 0, K = 0, W = 0, G = 0, j = 0, H = 0;
          if (M === 0) {
            for (; _(O.subarray(H, H + 1)) !== "\0"; )
              w += _(O.subarray(H, H + 1)), H += 1;
            for (w += _(O.subarray(H, H + 1)), H += 1; _(O.subarray(H, H + 1)) !== "\0"; )
              U += _(O.subarray(H, H + 1)), H += 1;
            U += _(O.subarray(H, H + 1)), H += 1, N = h(O, 12), K = h(O, 16), G = h(O, 20), j = h(O, 24), H = 28;
          } else if (M === 1) {
            H += 4, N = h(O, H), H += 4;
            var X = h(O, H);
            H += 4;
            var Z = h(O, H);
            for (H += 4, W = Math.pow(2, 32) * X + Z, Number.isSafeInteger(W) || (W = Number.MAX_SAFE_INTEGER, console.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), G = h(O, H), H += 4, j = h(O, H), H += 4; _(O.subarray(H, H + 1)) !== "\0"; )
              w += _(O.subarray(H, H + 1)), H += 1;
            for (w += _(O.subarray(H, H + 1)), H += 1; _(O.subarray(H, H + 1)) !== "\0"; )
              U += _(O.subarray(H, H + 1)), H += 1;
            U += _(O.subarray(H, H + 1)), H += 1;
          }
          var J = O.subarray(H, O.byteLength);
          return {
            schemeIdUri: w,
            value: U,
            timeScale: N,
            presentationTime: W,
            presentationTimeDelta: K,
            eventDuration: G,
            id: j,
            payload: J
          };
        }
        function D(O) {
          for (var M = arguments.length, w = new Array(M > 1 ? M - 1 : 0), U = 1; U < M; U++)
            w[U - 1] = arguments[U];
          for (var N = w.length, K = 8, W = N; W--; )
            K += w[W].byteLength;
          var G = new Uint8Array(K);
          for (G[0] = K >> 24 & 255, G[1] = K >> 16 & 255, G[2] = K >> 8 & 255, G[3] = K & 255, G.set(O, 4), W = 0, K = 8; W < N; W++)
            G.set(w[W], K), K += w[W].byteLength;
          return G;
        }
        function R(O, M, w) {
          if (O.byteLength !== 16)
            throw new RangeError("Invalid system id");
          var U, N;
          if (M) {
            U = 1, N = new Uint8Array(M.length * 16);
            for (var K = 0; K < M.length; K++) {
              var W = M[K];
              if (W.byteLength !== 16)
                throw new RangeError("Invalid key");
              N.set(W, K * 16);
            }
          } else
            U = 0, N = new Uint8Array();
          var G;
          U > 0 ? (G = new Uint8Array(4), M.length > 0 && new DataView(G.buffer).setUint32(0, M.length, !1)) : G = new Uint8Array();
          var j = new Uint8Array(4);
          return w && w.byteLength > 0 && new DataView(j.buffer).setUint32(0, w.byteLength, !1), D(
            [112, 115, 115, 104],
            new Uint8Array([
              U,
              0,
              0,
              0
            ]),
            O,
            G,
            N,
            j,
            w || new Uint8Array()
          );
        }
        function b(O) {
          if (!(O instanceof ArrayBuffer) || O.byteLength < 32)
            return null;
          var M = {
            version: 0,
            systemId: "",
            kids: null,
            data: null
          }, w = new DataView(O), U = w.getUint32(0);
          if (O.byteLength !== U && U > 44)
            return null;
          var N = w.getUint32(4);
          if (N !== 1886614376 || (M.version = w.getUint32(8) >>> 24, M.version > 1))
            return null;
          M.systemId = k.default.hexDump(new Uint8Array(O, 12, 16));
          var K = w.getUint32(28);
          if (M.version === 0) {
            if (U - 32 < K)
              return null;
            M.data = new Uint8Array(O, 32, K);
          } else if (M.version === 1) {
            M.kids = [];
            for (var W = 0; W < K; W++)
              M.kids.push(new Uint8Array(O, 32 + W * 16, 16));
          }
          return M;
        }
      },
      "./src/utils/numeric-encoding-utils.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          base64Decode: () => P,
          base64DecodeToStr: () => C,
          base64Encode: () => I,
          base64ToBase64Url: () => F,
          base64UrlEncode: () => k,
          strToBase64Encode: () => A
        });
        function F(L) {
          return L.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        }
        function A(L) {
          return btoa(L);
        }
        function C(L) {
          return atob(L);
        }
        function I(L) {
          return btoa(String.fromCharCode.apply(String, L));
        }
        function k(L) {
          return F(I(L));
        }
        function P(L) {
          return Uint8Array.from(atob(L), function(x) {
            return x.charCodeAt(0);
          });
        }
      },
      "./src/utils/output-filter.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        var F = /* @__PURE__ */ function() {
          function A(I, k) {
            this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = I, this.trackName = k;
          }
          var C = A.prototype;
          return C.dispatchCue = function() {
            this.startTime !== null && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null);
          }, C.newCue = function(k, P, L) {
            (this.startTime === null || this.startTime > k) && (this.startTime = k), this.endTime = P, this.screen = L, this.timelineController.createCaptionsTrack(this.trackName);
          }, C.reset = function() {
            this.cueRanges = [], this.startTime = null;
          }, A;
        }();
      },
      "./src/utils/texttrack-utils.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          addCueToTrack: () => C,
          clearCurrentCues: () => I,
          getCuesInRange: () => L,
          removeCuesInRange: () => k,
          sendAddTrackEvent: () => A
        });
        var F = S("./src/utils/logger.ts");
        function A(x, _) {
          var T;
          try {
            T = new Event("addtrack");
          } catch (h) {
            T = document.createEvent("Event"), T.initEvent("addtrack", !1, !1);
          }
          T.track = x, _.dispatchEvent(T);
        }
        function C(x, _) {
          var T = x.mode;
          if (T === "disabled" && (x.mode = "hidden"), x.cues && !x.cues.getCueById(_.id))
            try {
              if (x.addCue(_), !x.cues.getCueById(_.id))
                throw new Error("addCue is failed for: " + _);
            } catch (y) {
              F.logger.debug("[texttrack-utils]: " + y);
              var h = new self.TextTrackCue(_.startTime, _.endTime, _.text);
              h.id = _.id, x.addCue(h);
            }
          T === "disabled" && (x.mode = T);
        }
        function I(x) {
          var _ = x.mode;
          if (_ === "disabled" && (x.mode = "hidden"), x.cues)
            for (var T = x.cues.length; T--; )
              x.removeCue(x.cues[T]);
          _ === "disabled" && (x.mode = _);
        }
        function k(x, _, T, h) {
          var y = x.mode;
          if (y === "disabled" && (x.mode = "hidden"), x.cues && x.cues.length > 0)
            for (var m = L(x.cues, _, T), s = 0; s < m.length; s++)
              (!h || h(m[s])) && x.removeCue(m[s]);
          y === "disabled" && (x.mode = y);
        }
        function P(x, _) {
          if (_ < x[0].startTime)
            return 0;
          var T = x.length - 1;
          if (_ > x[T].endTime)
            return -1;
          for (var h = 0, y = T; h <= y; ) {
            var m = Math.floor((y + h) / 2);
            if (_ < x[m].startTime)
              y = m - 1;
            else if (_ > x[m].startTime && h < T)
              h = m + 1;
            else
              return m;
          }
          return x[h].startTime - _ < _ - x[y].startTime ? h : y;
        }
        function L(x, _, T) {
          var h = [], y = P(x, _);
          if (y > -1)
            for (var m = y, s = x.length; m < s; m++) {
              var f = x[m];
              if (f.startTime >= _ && f.endTime <= T)
                h.push(f);
              else if (f.startTime > T)
                return h;
            }
          return h;
        }
      },
      "./src/utils/time-ranges.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => A
        });
        var F = {
          toString: function(I) {
            for (var k = "", P = I.length, L = 0; L < P; L++)
              k += "[" + I.start(L).toFixed(3) + "," + I.end(L).toFixed(3) + "]";
            return k;
          }
        };
        const A = F;
      },
      "./src/utils/timescale-conversion.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          toMpegTsClockFromTimescale: () => k,
          toMsFromMpegTsClock: () => I,
          toTimescaleFromBase: () => A,
          toTimescaleFromScale: () => C
        });
        var F = 9e4;
        function A(P, L, x, _) {
          x === void 0 && (x = 1), _ === void 0 && (_ = !1);
          var T = P * L * x;
          return _ ? Math.round(T) : T;
        }
        function C(P, L, x, _) {
          return x === void 0 && (x = 1), _ === void 0 && (_ = !1), A(P, L, 1 / x, _);
        }
        function I(P, L) {
          return L === void 0 && (L = !1), A(P, 1e3, 1 / F, L);
        }
        function k(P, L) {
          return L === void 0 && (L = 1), A(P, F, 1 / L);
        }
      },
      "./src/utils/typed-array.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          sliceUint8: () => F
        });
        function F(A, C, I) {
          return Uint8Array.prototype.slice ? A.slice(C, I) : new Uint8Array(Array.prototype.slice.call(A, C, I));
        }
      },
      "./src/utils/vttcue.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => F
        });
        const F = function() {
          if (typeof self != "undefined" && self.VTTCue)
            return self.VTTCue;
          var A = ["", "lr", "rl"], C = ["start", "middle", "end", "left", "right"];
          function I(_, T) {
            if (typeof T != "string" || !Array.isArray(_))
              return !1;
            var h = T.toLowerCase();
            return ~_.indexOf(h) ? h : !1;
          }
          function k(_) {
            return I(A, _);
          }
          function P(_) {
            return I(C, _);
          }
          function L(_) {
            for (var T = arguments.length, h = new Array(T > 1 ? T - 1 : 0), y = 1; y < T; y++)
              h[y - 1] = arguments[y];
            for (var m = 1; m < arguments.length; m++) {
              var s = arguments[m];
              for (var f in s)
                _[f] = s[f];
            }
            return _;
          }
          function x(_, T, h) {
            var y = this, m = {
              enumerable: !0
            };
            y.hasBeenReset = !1;
            var s = "", f = !1, a = _, i = T, g = h, o = null, r = "", l = !0, v = "auto", u = "start", n = 50, t = "middle", c = 50, e = "middle";
            Object.defineProperty(y, "id", L({}, m, {
              get: function() {
                return s;
              },
              set: function(E) {
                s = "" + E;
              }
            })), Object.defineProperty(y, "pauseOnExit", L({}, m, {
              get: function() {
                return f;
              },
              set: function(E) {
                f = !!E;
              }
            })), Object.defineProperty(y, "startTime", L({}, m, {
              get: function() {
                return a;
              },
              set: function(E) {
                if (typeof E != "number")
                  throw new TypeError("Start time must be set to a number.");
                a = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "endTime", L({}, m, {
              get: function() {
                return i;
              },
              set: function(E) {
                if (typeof E != "number")
                  throw new TypeError("End time must be set to a number.");
                i = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "text", L({}, m, {
              get: function() {
                return g;
              },
              set: function(E) {
                g = "" + E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "region", L({}, m, {
              get: function() {
                return o;
              },
              set: function(E) {
                o = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "vertical", L({}, m, {
              get: function() {
                return r;
              },
              set: function(E) {
                var p = k(E);
                if (p === !1)
                  throw new SyntaxError("An invalid or illegal string was specified.");
                r = p, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "snapToLines", L({}, m, {
              get: function() {
                return l;
              },
              set: function(E) {
                l = !!E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "line", L({}, m, {
              get: function() {
                return v;
              },
              set: function(E) {
                if (typeof E != "number" && E !== "auto")
                  throw new SyntaxError("An invalid number or illegal string was specified.");
                v = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "lineAlign", L({}, m, {
              get: function() {
                return u;
              },
              set: function(E) {
                var p = P(E);
                if (!p)
                  throw new SyntaxError("An invalid or illegal string was specified.");
                u = p, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "position", L({}, m, {
              get: function() {
                return n;
              },
              set: function(E) {
                if (E < 0 || E > 100)
                  throw new Error("Position must be between 0 and 100.");
                n = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "positionAlign", L({}, m, {
              get: function() {
                return t;
              },
              set: function(E) {
                var p = P(E);
                if (!p)
                  throw new SyntaxError("An invalid or illegal string was specified.");
                t = p, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "size", L({}, m, {
              get: function() {
                return c;
              },
              set: function(E) {
                if (E < 0 || E > 100)
                  throw new Error("Size must be between 0 and 100.");
                c = E, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "align", L({}, m, {
              get: function() {
                return e;
              },
              set: function(E) {
                var p = P(E);
                if (!p)
                  throw new SyntaxError("An invalid or illegal string was specified.");
                e = p, this.hasBeenReset = !0;
              }
            })), y.displayState = void 0;
          }
          return x.prototype.getCueAsHTML = function() {
            var _ = self.WebVTT;
            return _.convertCueToDOMTree(self, this.text);
          }, x;
        }();
      },
      "./src/utils/vttparser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          VTTParser: () => T,
          fixLineBreaks: () => _,
          parseTimeStamp: () => C
        });
        var F = S("./src/utils/vttcue.ts"), A = /* @__PURE__ */ function() {
          function h() {
          }
          var y = h.prototype;
          return y.decode = function(s, f) {
            if (!s)
              return "";
            if (typeof s != "string")
              throw new Error("Error - expected string data.");
            return decodeURIComponent(encodeURIComponent(s));
          }, h;
        }();
        function C(h) {
          function y(s, f, a, i) {
            return (s | 0) * 3600 + (f | 0) * 60 + (a | 0) + parseFloat(i || 0);
          }
          var m = h.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
          return m ? parseFloat(m[2]) > 59 ? y(m[2], m[3], 0, m[4]) : y(m[1], m[2], m[3], m[4]) : null;
        }
        var I = /* @__PURE__ */ function() {
          function h() {
            this.values = /* @__PURE__ */ Object.create(null);
          }
          var y = h.prototype;
          return y.set = function(s, f) {
            !this.get(s) && f !== "" && (this.values[s] = f);
          }, y.get = function(s, f, a) {
            return a ? this.has(s) ? this.values[s] : f[a] : this.has(s) ? this.values[s] : f;
          }, y.has = function(s) {
            return s in this.values;
          }, y.alt = function(s, f, a) {
            for (var i = 0; i < a.length; ++i)
              if (f === a[i]) {
                this.set(s, f);
                break;
              }
          }, y.integer = function(s, f) {
            /^-?\d+$/.test(f) && this.set(s, parseInt(f, 10));
          }, y.percent = function(s, f) {
            if (/^([\d]{1,3})(\.[\d]*)?%$/.test(f)) {
              var a = parseFloat(f);
              if (a >= 0 && a <= 100)
                return this.set(s, a), !0;
            }
            return !1;
          }, h;
        }();
        function k(h, y, m, s) {
          var f = s ? h.split(s) : [h];
          for (var a in f)
            if (typeof f[a] == "string") {
              var i = f[a].split(m);
              if (i.length === 2) {
                var g = i[0], o = i[1];
                y(g, o);
              }
            }
        }
        var P = new F.default(0, 0, ""), L = P.align === "middle" ? "middle" : "center";
        function x(h, y, m) {
          var s = h;
          function f() {
            var g = C(h);
            if (g === null)
              throw new Error("Malformed timestamp: " + s);
            return h = h.replace(/^[^\sa-zA-Z-]+/, ""), g;
          }
          function a(g, o) {
            var r = new I();
            k(g, function(u, n) {
              var t;
              switch (u) {
                case "region":
                  for (var c = m.length - 1; c >= 0; c--)
                    if (m[c].id === n) {
                      r.set(u, m[c].region);
                      break;
                    }
                  break;
                case "vertical":
                  r.alt(u, n, ["rl", "lr"]);
                  break;
                case "line":
                  t = n.split(","), r.integer(u, t[0]), r.percent(u, t[0]) && r.set("snapToLines", !1), r.alt(u, t[0], ["auto"]), t.length === 2 && r.alt("lineAlign", t[1], ["start", L, "end"]);
                  break;
                case "position":
                  t = n.split(","), r.percent(u, t[0]), t.length === 2 && r.alt("positionAlign", t[1], ["start", L, "end", "line-left", "line-right", "auto"]);
                  break;
                case "size":
                  r.percent(u, n);
                  break;
                case "align":
                  r.alt(u, n, ["start", L, "end", "left", "right"]);
                  break;
              }
            }, /:/, /\s/), o.region = r.get("region", null), o.vertical = r.get("vertical", "");
            var l = r.get("line", "auto");
            l === "auto" && P.line === -1 && (l = -1), o.line = l, o.lineAlign = r.get("lineAlign", "start"), o.snapToLines = r.get("snapToLines", !0), o.size = r.get("size", 100), o.align = r.get("align", L);
            var v = r.get("position", "auto");
            v === "auto" && P.position === 50 && (v = o.align === "start" || o.align === "left" ? 0 : o.align === "end" || o.align === "right" ? 100 : 50), o.position = v;
          }
          function i() {
            h = h.replace(/^\s+/, "");
          }
          if (i(), y.startTime = f(), i(), h.slice(0, 3) !== "-->")
            throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + s);
          h = h.slice(3), i(), y.endTime = f(), i(), a(h, y);
        }
        function _(h) {
          return h.replace(/<br(?: \/)?>/gi, `
`);
        }
        var T = /* @__PURE__ */ function() {
          function h() {
            this.state = "INITIAL", this.buffer = "", this.decoder = new A(), this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
          }
          var y = h.prototype;
          return y.parse = function(s) {
            var f = this;
            s && (f.buffer += f.decoder.decode(s, {
              stream: !0
            }));
            function a() {
              var v = f.buffer, u = 0;
              for (v = _(v); u < v.length && v[u] !== "\r" && v[u] !== `
`; )
                ++u;
              var n = v.slice(0, u);
              return v[u] === "\r" && ++u, v[u] === `
` && ++u, f.buffer = v.slice(u), n;
            }
            function i(v) {
              k(v, function(u, n) {
              }, /:/);
            }
            try {
              var g = "";
              if (f.state === "INITIAL") {
                if (!/\r\n|\n/.test(f.buffer))
                  return this;
                g = a();
                var o = g.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                if (!o || !o[0])
                  throw new Error("Malformed WebVTT signature.");
                f.state = "HEADER";
              }
              for (var r = !1; f.buffer; ) {
                if (!/\r\n|\n/.test(f.buffer))
                  return this;
                switch (r ? r = !1 : g = a(), f.state) {
                  case "HEADER":
                    /:/.test(g) ? i(g) : g || (f.state = "ID");
                    continue;
                  case "NOTE":
                    g || (f.state = "ID");
                    continue;
                  case "ID":
                    if (/^NOTE($|[ \t])/.test(g)) {
                      f.state = "NOTE";
                      break;
                    }
                    if (!g)
                      continue;
                    if (f.cue = new F.default(0, 0, ""), f.state = "CUE", g.indexOf("-->") === -1) {
                      f.cue.id = g;
                      continue;
                    }
                  case "CUE":
                    if (!f.cue) {
                      f.state = "BADCUE";
                      continue;
                    }
                    try {
                      x(g, f.cue, f.regionList);
                    } catch (v) {
                      f.cue = null, f.state = "BADCUE";
                      continue;
                    }
                    f.state = "CUETEXT";
                    continue;
                  case "CUETEXT":
                    {
                      var l = g.indexOf("-->") !== -1;
                      if (!g || l && (r = !0)) {
                        f.oncue && f.cue && f.oncue(f.cue), f.cue = null, f.state = "ID";
                        continue;
                      }
                      if (f.cue === null)
                        continue;
                      f.cue.text && (f.cue.text += `
`), f.cue.text += g;
                    }
                    continue;
                  case "BADCUE":
                    g || (f.state = "ID");
                }
              }
            } catch (v) {
              f.state === "CUETEXT" && f.cue && f.oncue && f.oncue(f.cue), f.cue = null, f.state = f.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
            }
            return this;
          }, y.flush = function() {
            var s = this;
            try {
              if ((s.cue || s.state === "HEADER") && (s.buffer += `

`, s.parse()), s.state === "INITIAL" || s.state === "BADWEBVTT")
                throw new Error("Malformed WebVTT signature.");
            } catch (f) {
              s.onparsingerror && s.onparsingerror(f);
            }
            return s.onflush && s.onflush(), this;
          }, h;
        }();
      },
      "./src/utils/webvtt-parser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          generateCueId: () => T,
          parseWebVTT: () => y
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/vttparser.ts"), C = S("./src/demux/id3.ts"), I = S("./src/utils/timescale-conversion.ts"), k = S("./src/remux/mp4-remuxer.ts"), P = /\r\n|\n\r|\n|\r/g, L = function(s, f, a) {
          return a === void 0 && (a = 0), s.slice(a, a + f.length) === f;
        }, x = function(s) {
          var f = parseInt(s.slice(-3)), a = parseInt(s.slice(-6, -4)), i = parseInt(s.slice(-9, -7)), g = s.length > 9 ? parseInt(s.substring(0, s.indexOf(":"))) : 0;
          if (!(0, F.isFiniteNumber)(f) || !(0, F.isFiniteNumber)(a) || !(0, F.isFiniteNumber)(i) || !(0, F.isFiniteNumber)(g))
            throw Error("Malformed X-TIMESTAMP-MAP: Local:" + s);
          return f += 1e3 * a, f += 60 * 1e3 * i, f += 60 * 60 * 1e3 * g, f;
        }, _ = function(s) {
          for (var f = 5381, a = s.length; a; )
            f = f * 33 ^ s.charCodeAt(--a);
          return (f >>> 0).toString();
        };
        function T(m, s, f) {
          return _(m.toString()) + _(s.toString()) + _(f);
        }
        var h = function(s, f, a) {
          var i = s[f], g = s[i.prevCC];
          if (!g || !g.new && i.new) {
            s.ccOffset = s.presentationOffset = i.start, i.new = !1;
            return;
          }
          for (; (o = g) !== null && o !== void 0 && o.new; ) {
            var o;
            s.ccOffset += i.start - g.start, i.new = !1, i = g, g = s[i.prevCC];
          }
          s.presentationOffset = a;
        };
        function y(m, s, f, a, i, g, o, r) {
          var l = new A.VTTParser(), v = (0, C.utf8ArrayToStr)(new Uint8Array(m)).trim().replace(P, `
`).split(`
`), u = [], n = (0, I.toMpegTsClockFromTimescale)(s, f), t = "00:00.000", c = 0, e = 0, d, E = !0;
          l.oncue = function(p) {
            var D = a[i], R = a.ccOffset, b = (c - n) / 9e4;
            D != null && D.new && (e !== void 0 ? R = a.ccOffset = D.start : h(a, i, b)), b && (R = b - a.presentationOffset);
            var O = p.endTime - p.startTime, M = (0, k.normalizePts)((p.startTime + R - e) * 9e4, g * 9e4) / 9e4;
            p.startTime = Math.max(M, 0), p.endTime = Math.max(M + O, 0);
            var w = p.text.trim();
            p.text = decodeURIComponent(encodeURIComponent(w)), p.id || (p.id = T(p.startTime, p.endTime, w)), p.endTime > 0 && u.push(p);
          }, l.onparsingerror = function(p) {
            d = p;
          }, l.onflush = function() {
            if (d) {
              r(d);
              return;
            }
            o(u);
          }, v.forEach(function(p) {
            if (E)
              if (L(p, "X-TIMESTAMP-MAP=")) {
                E = !1, p.slice(16).split(",").forEach(function(D) {
                  L(D, "LOCAL:") ? t = D.slice(6) : L(D, "MPEGTS:") && (c = parseInt(D.slice(7)));
                });
                try {
                  e = x(t) / 1e3;
                } catch (D) {
                  d = D;
                }
                return;
              } else
                p === "" && (E = !1);
            l.parse(p + `
`);
          }), l.flush();
        }
      },
      "./src/utils/xhr-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => k
        });
        var F = S("./src/utils/logger.ts"), A = S("./src/loader/load-stats.ts"), C = /^age:\s*[\d.]+\s*$/m, I = /* @__PURE__ */ function() {
          function P(x) {
            this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = void 0, this.loader = null, this.stats = void 0, this.xhrSetup = x ? x.xhrSetup : null, this.stats = new A.LoadStats(), this.retryDelay = 0;
          }
          var L = P.prototype;
          return L.destroy = function() {
            this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null;
          }, L.abortInternal = function() {
            var _ = this.loader;
            self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), _ && (_.onreadystatechange = null, _.onprogress = null, _.readyState !== 4 && (this.stats.aborted = !0, _.abort()));
          }, L.abort = function() {
            var _;
            this.abortInternal(), (_ = this.callbacks) !== null && _ !== void 0 && _.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader);
          }, L.load = function(_, T, h) {
            if (this.stats.loading.start)
              throw new Error("Loader can only be used once.");
            this.stats.loading.start = self.performance.now(), this.context = _, this.config = T, this.callbacks = h, this.retryDelay = T.retryDelay, this.loadInternal();
          }, L.loadInternal = function() {
            var _ = this.config, T = this.context;
            if (!!_) {
              var h = this.loader = new self.XMLHttpRequest(), y = this.stats;
              y.loading.first = 0, y.loaded = 0;
              var m = this.xhrSetup;
              try {
                if (m)
                  try {
                    m(h, T.url);
                  } catch (a) {
                    h.open("GET", T.url, !0), m(h, T.url);
                  }
                h.readyState || h.open("GET", T.url, !0);
                var s = this.context.headers;
                if (s)
                  for (var f in s)
                    h.setRequestHeader(f, s[f]);
              } catch (a) {
                this.callbacks.onError({
                  code: h.status,
                  text: a.message
                }, T, h);
                return;
              }
              T.rangeEnd && h.setRequestHeader("Range", "bytes=" + T.rangeStart + "-" + (T.rangeEnd - 1)), h.onreadystatechange = this.readystatechange.bind(this), h.onprogress = this.loadprogress.bind(this), h.responseType = T.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), _.timeout), h.send();
            }
          }, L.readystatechange = function() {
            var _ = this.context, T = this.loader, h = this.stats;
            if (!(!_ || !T)) {
              var y = T.readyState, m = this.config;
              if (!h.aborted && y >= 2)
                if (self.clearTimeout(this.requestTimeout), h.loading.first === 0 && (h.loading.first = Math.max(self.performance.now(), h.loading.start)), y === 4) {
                  T.onreadystatechange = null, T.onprogress = null;
                  var s = T.status, f = T.responseType === "arraybuffer";
                  if (s >= 200 && s < 300 && (f && T.response || T.responseText !== null)) {
                    h.loading.end = Math.max(self.performance.now(), h.loading.first);
                    var a, i;
                    if (f ? (a = T.response, i = a.byteLength) : (a = T.responseText, i = a.length), h.loaded = h.total = i, !this.callbacks)
                      return;
                    var g = this.callbacks.onProgress;
                    if (g && g(h, _, a, T), !this.callbacks)
                      return;
                    var o = {
                      url: T.responseURL,
                      data: a
                    };
                    this.callbacks.onSuccess(o, h, _, T);
                  } else
                    h.retry >= m.maxRetry || s >= 400 && s < 499 ? (F.logger.error(s + " while loading " + _.url), this.callbacks.onError({
                      code: s,
                      text: T.statusText
                    }, _, T)) : (F.logger.warn(s + " while loading " + _.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, m.maxRetryDelay), h.retry++);
                } else
                  self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), m.timeout);
            }
          }, L.loadtimeout = function() {
            F.logger.warn("timeout while loading " + this.context.url);
            var _ = this.callbacks;
            _ && (this.abortInternal(), _.onTimeout(this.stats, this.context, this.loader));
          }, L.loadprogress = function(_) {
            var T = this.stats;
            T.loaded = _.loaded, _.lengthComputable && (T.total = _.total);
          }, L.getCacheAge = function() {
            var _ = null;
            if (this.loader && C.test(this.loader.getAllResponseHeaders())) {
              var T = this.loader.getResponseHeader("age");
              _ = T ? parseFloat(T) : null;
            }
            return _;
          }, P;
        }();
        const k = I;
      },
      "./node_modules/eventemitter3/index.js": (V) => {
        var B = Object.prototype.hasOwnProperty, S = "~";
        function F() {
        }
        Object.create && (F.prototype = /* @__PURE__ */ Object.create(null), new F().__proto__ || (S = !1));
        function A(P, L, x) {
          this.fn = P, this.context = L, this.once = x || !1;
        }
        function C(P, L, x, _, T) {
          if (typeof x != "function")
            throw new TypeError("The listener must be a function");
          var h = new A(x, _ || P, T), y = S ? S + L : L;
          return P._events[y] ? P._events[y].fn ? P._events[y] = [P._events[y], h] : P._events[y].push(h) : (P._events[y] = h, P._eventsCount++), P;
        }
        function I(P, L) {
          --P._eventsCount === 0 ? P._events = new F() : delete P._events[L];
        }
        function k() {
          this._events = new F(), this._eventsCount = 0;
        }
        k.prototype.eventNames = function() {
          var L = [], x, _;
          if (this._eventsCount === 0)
            return L;
          for (_ in x = this._events)
            B.call(x, _) && L.push(S ? _.slice(1) : _);
          return Object.getOwnPropertySymbols ? L.concat(Object.getOwnPropertySymbols(x)) : L;
        }, k.prototype.listeners = function(L) {
          var x = S ? S + L : L, _ = this._events[x];
          if (!_)
            return [];
          if (_.fn)
            return [_.fn];
          for (var T = 0, h = _.length, y = new Array(h); T < h; T++)
            y[T] = _[T].fn;
          return y;
        }, k.prototype.listenerCount = function(L) {
          var x = S ? S + L : L, _ = this._events[x];
          return _ ? _.fn ? 1 : _.length : 0;
        }, k.prototype.emit = function(L, x, _, T, h, y) {
          var m = S ? S + L : L;
          if (!this._events[m])
            return !1;
          var s = this._events[m], f = arguments.length, a, i;
          if (s.fn) {
            switch (s.once && this.removeListener(L, s.fn, void 0, !0), f) {
              case 1:
                return s.fn.call(s.context), !0;
              case 2:
                return s.fn.call(s.context, x), !0;
              case 3:
                return s.fn.call(s.context, x, _), !0;
              case 4:
                return s.fn.call(s.context, x, _, T), !0;
              case 5:
                return s.fn.call(s.context, x, _, T, h), !0;
              case 6:
                return s.fn.call(s.context, x, _, T, h, y), !0;
            }
            for (i = 1, a = new Array(f - 1); i < f; i++)
              a[i - 1] = arguments[i];
            s.fn.apply(s.context, a);
          } else {
            var g = s.length, o;
            for (i = 0; i < g; i++)
              switch (s[i].once && this.removeListener(L, s[i].fn, void 0, !0), f) {
                case 1:
                  s[i].fn.call(s[i].context);
                  break;
                case 2:
                  s[i].fn.call(s[i].context, x);
                  break;
                case 3:
                  s[i].fn.call(s[i].context, x, _);
                  break;
                case 4:
                  s[i].fn.call(s[i].context, x, _, T);
                  break;
                default:
                  if (!a)
                    for (o = 1, a = new Array(f - 1); o < f; o++)
                      a[o - 1] = arguments[o];
                  s[i].fn.apply(s[i].context, a);
              }
          }
          return !0;
        }, k.prototype.on = function(L, x, _) {
          return C(this, L, x, _, !1);
        }, k.prototype.once = function(L, x, _) {
          return C(this, L, x, _, !0);
        }, k.prototype.removeListener = function(L, x, _, T) {
          var h = S ? S + L : L;
          if (!this._events[h])
            return this;
          if (!x)
            return I(this, h), this;
          var y = this._events[h];
          if (y.fn)
            y.fn === x && (!T || y.once) && (!_ || y.context === _) && I(this, h);
          else {
            for (var m = 0, s = [], f = y.length; m < f; m++)
              (y[m].fn !== x || T && !y[m].once || _ && y[m].context !== _) && s.push(y[m]);
            s.length ? this._events[h] = s.length === 1 ? s[0] : s : I(this, h);
          }
          return this;
        }, k.prototype.removeAllListeners = function(L) {
          var x;
          return L ? (x = S ? S + L : L, this._events[x] && I(this, x)) : (this._events = new F(), this._eventsCount = 0), this;
        }, k.prototype.off = k.prototype.removeListener, k.prototype.addListener = k.prototype.on, k.prefixed = S, k.EventEmitter = k, V.exports = k;
      },
      "./node_modules/url-toolkit/src/url-toolkit.js": function(V) {
        (function(B) {
          var S = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, F = /^(?=([^\/?#]*))\1([^]*)$/, A = /(?:\/|^)\.(?=\/)/g, C = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, I = {
            buildAbsoluteURL: function(k, P, L) {
              if (L = L || {}, k = k.trim(), P = P.trim(), !P) {
                if (!L.alwaysNormalize)
                  return k;
                var x = I.parseURL(k);
                if (!x)
                  throw new Error("Error trying to parse base URL.");
                return x.path = I.normalizePath(
                  x.path
                ), I.buildURLFromParts(x);
              }
              var _ = I.parseURL(P);
              if (!_)
                throw new Error("Error trying to parse relative URL.");
              if (_.scheme)
                return L.alwaysNormalize ? (_.path = I.normalizePath(_.path), I.buildURLFromParts(_)) : P;
              var T = I.parseURL(k);
              if (!T)
                throw new Error("Error trying to parse base URL.");
              if (!T.netLoc && T.path && T.path[0] !== "/") {
                var h = F.exec(T.path);
                T.netLoc = h[1], T.path = h[2];
              }
              T.netLoc && !T.path && (T.path = "/");
              var y = {
                scheme: T.scheme,
                netLoc: _.netLoc,
                path: null,
                params: _.params,
                query: _.query,
                fragment: _.fragment
              };
              if (!_.netLoc && (y.netLoc = T.netLoc, _.path[0] !== "/"))
                if (!_.path)
                  y.path = T.path, _.params || (y.params = T.params, _.query || (y.query = T.query));
                else {
                  var m = T.path, s = m.substring(0, m.lastIndexOf("/") + 1) + _.path;
                  y.path = I.normalizePath(s);
                }
              return y.path === null && (y.path = L.alwaysNormalize ? I.normalizePath(_.path) : _.path), I.buildURLFromParts(y);
            },
            parseURL: function(k) {
              var P = S.exec(k);
              return P ? {
                scheme: P[1] || "",
                netLoc: P[2] || "",
                path: P[3] || "",
                params: P[4] || "",
                query: P[5] || "",
                fragment: P[6] || ""
              } : null;
            },
            normalizePath: function(k) {
              for (k = k.split("").reverse().join("").replace(A, ""); k.length !== (k = k.replace(C, "")).length; )
                ;
              return k.split("").reverse().join("");
            },
            buildURLFromParts: function(k) {
              return k.scheme + k.netLoc + k.path + k.params + k.query + k.fragment;
            }
          };
          V.exports = I;
        })();
      }
    }, ee = {};
    function te(V) {
      var B = ee[V];
      if (B !== void 0)
        return B.exports;
      var S = ee[V] = {
        exports: {}
      };
      return Q[V].call(S.exports, S, S.exports, te), S.exports;
    }
    te.m = Q, te.n = (V) => {
      var B = V && V.__esModule ? () => V.default : () => V;
      return te.d(B, { a: B }), B;
    }, te.d = (V, B) => {
      for (var S in B)
        te.o(B, S) && !te.o(V, S) && Object.defineProperty(V, S, { enumerable: !0, get: B[S] });
    }, te.o = (V, B) => Object.prototype.hasOwnProperty.call(V, B), te.r = (V) => {
      typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(V, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(V, "__esModule", { value: !0 });
    };
    var ge = te("./src/hls.ts");
    return ge = ge.default, ge;
  })());
})(Ye);
const Oe = /* @__PURE__ */ nt(Ye.exports);
var at = Object.defineProperty, st = (fe, Y, Q) => Y in fe ? at(fe, Y, { enumerable: !0, configurable: !0, writable: !0, value: Q }) : fe[Y] = Q, re = (fe, Y, Q) => (st(fe, typeof Y != "symbol" ? Y + "" : Y, Q), Q), je = (fe, Y, Q) => new Promise((ee, te) => {
  var ge = (S) => {
    try {
      B(Q.next(S));
    } catch (F) {
      te(F);
    }
  }, V = (S) => {
    try {
      B(Q.throw(S));
    } catch (F) {
      te(F);
    }
  }, B = (S) => S.done ? ee(S.value) : Promise.resolve(S.value).then(ge, V);
  B((Q = Q.apply(fe, Y)).next());
});
class ot {
  constructor(Y) {
    re(this, "containerArea"), re(this, "subtitles"), re(this, "video"), re(this, "accentColor", "hsl(353, 86%, 54%)"), re(this, "options"), re(this, "_isPlayed", !1), re(this, "_currentVolume", 1), re(this, "_playbackSpeed", 1), re(this, "_container"), re(this, "_idleTimer", null), re(this, "_idleState", !1), re(this, "_idleDuration", 3500), re(this, "_playbackSpeeds", [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2]), re(this, "_settingsMenuPanels"), re(this, "_tooltips"), re(this, "_settingsButtons"), re(this, "_durationSlider"), re(this, "_volumeSlider"), re(this, "_durationIndicator"), re(this, "_durationIndicatorMobile"), re(this, "_videoEl"), re(this, "_bottomPanel"), re(this, "_toast"), re(this, "_posterEl"), re(this, "_settingsMenu"), re(this, "_captionsWrapper"), re(this, "_captionsArray"), re(this, "_selectedCaption"), re(this, "_buttons"), re(this, "_playIcon"), re(this, "_videoCaptions"), re(this, "_videoCaption"), re(this, "_ambientCanvas"), re(this, "_ctx"), re(this, "_loader"), re(this, "_actionsWrapperMobile"), re(this, "_settingsPanelMobile"), re(this, "_settingsMenuPanelsMobile"), re(this, "_overlay");
    var Q;
    this.options = Object.assign(this, Y), this.subtitles = Y.subtitles, this.video = Y.video, this._videoCaption = this.subtitles ? this.subtitles[0].short : null, this.containerArea = Y.containerArea, rt(this.containerArea, this.video, this.subtitles, this._playbackSpeed, this._playbackSpeeds, this._videoCaption), this._container = this.containerArea.querySelector(".videoary"), this._settingsMenuPanels = this._container.querySelectorAll(".settings-menu-panel"), this._tooltips = this._container.querySelectorAll('div[role="tooltip"]'), this._settingsButtons = this._container.querySelectorAll(".settings-menu > li button"), this._durationSlider = this._container.querySelector("input:is(#duration)"), this._volumeSlider = this._container.querySelector("input:is(#volume)"), this._durationIndicator = this._container.querySelector("#duration-indicator"), this._durationIndicatorMobile = this._container.querySelector("#duration-indicator-mobile"), this._videoEl = this._container.querySelector("video"), this._bottomPanel = this._container.querySelector(".videoary__bottom-panel"), this._toast = this._container.querySelector(".toast"), this._posterEl = this._container.querySelector(".poster"), this._settingsMenu = this._container.querySelector(".settings-menu"), this._captionsWrapper = this._container.querySelector(".captions-wrapper"), this._captionsArray = Array.from(this._videoEl.textTracks), this._selectedCaption = this._captionsArray.find((ee) => ee.language == this._videoCaption), this._buttons = {
      play: this._container.querySelector("#play-button"),
      volume: this._container.querySelector("#volume-button"),
      fullscreen: this._container.querySelector("#fullscreen-button"),
      captions: this._container.querySelector("#closed-captions-button"),
      picInPic: this._container.querySelector("#pic-in-pic-button"),
      theater: this._container.querySelector("#theater-button"),
      settings: this._container.querySelector("#settings-button"),
      mobile: {
        play: this._container.querySelector(".play-btn-mobile"),
        fullscreen: this._container.querySelector(".fullscreen-btn-mobile"),
        volume: this._container.querySelector(".volume-btn-mobile"),
        settings: this._container.querySelector(".settings-btn-mobile"),
        captions: this._container.querySelector(".captions-btn-mobile")
      }
    }, this._playIcon = (Q = this._buttons.play) == null ? void 0 : Q.querySelector("i"), this._videoCaptions = this._container.querySelectorAll("track"), this._ambientCanvas = this._container.querySelector("canvas"), this._ctx = this._ambientCanvas.getContext("2d"), this._loader = this._container.querySelector(".loader"), this._actionsWrapperMobile = this._container.querySelector(".actions-wrapper-mobile"), this._settingsPanelMobile = this._container.querySelector(".settings-panel-mobile"), this._settingsMenuPanelsMobile = this._settingsPanelMobile.querySelectorAll(".list li"), this._overlay = this._container.querySelector(".overlay");
  }
  init() {
    return je(this, null, function* () {
      var Y, Q, ee, te, ge, V, B, S, F, A, C, I, k, P, L, x;
      document.documentElement.style.setProperty("--primaryColor", this.accentColor), this.subtitles || (this._settingsButtons[1].classList.add("hidden"), this._settingsMenuPanels[1].classList.add("hidden"), (Y = this._buttons.captions) == null || Y.classList.add("hidden"), (Q = this._buttons.mobile.captions) == null || Q.classList.add("hidden")), yield this.loadVideo((ee = this.video) == null ? void 0 : ee.source), this.showLoader(!1), this._videoCaptions.forEach((y) => y.track.mode = "hidden"), this.showBottomPanel(), this._videoEl.addEventListener("loadeddata", this.loadedVideo.bind(this)), this._videoEl.addEventListener("ended", () => {
        var y;
        this._playIcon.classList.replace("fa-pause", "fa-play");
        const m = (y = this._buttons.mobile.play) == null ? void 0 : y.querySelector("i");
        m == null || m.classList.replace("fa-pause", "fa-play");
      }), this._videoEl.addEventListener("timeupdate", this.runDuration.bind(this)), this._videoEl.addEventListener("play", this.runAmbient.bind(this)), this._container.addEventListener("contextmenu", (y) => y.preventDefault()), this._container.addEventListener("fullscreenchange", this.fullscreenChange.bind(this)), this._videoEl.addEventListener("touchstart", () => {
        this._videoEl.paused || this._actionsWrapperMobile.classList.toggle("hide"), this._actionsWrapperMobile.classList.contains("hide") ? (this._bottomPanel.classList.remove("showed-up"), this._captionsWrapper.classList.add("get-down"), this._overlay.classList.add("invisible")) : (this._bottomPanel.classList.add("showed-up"), this._captionsWrapper.classList.remove("get-down"), this._overlay.classList.remove("invisible"));
      }), document.addEventListener("touchstart", (y) => {
        y.target.closest(".videoary") || this._videoEl.paused || (this._actionsWrapperMobile.classList.add("hide"), this._bottomPanel.classList.remove("showed-up"), this._captionsWrapper.classList.add("get-down"), this._overlay.classList.add("invisible"));
      }), this._settingsPanelMobile.addEventListener("touchstart", (y) => {
        y.target.closest(".settings-panel-mobile .wrapper") || this._settingsPanelMobile.classList.remove("showed");
      }), window.matchMedia("screen and (min-width: 768px)").matches && (this._videoEl.addEventListener("click", this.playVideo.bind(this)), this._container.addEventListener("mousemove", this.idlingWatch.bind(this)), this._container.addEventListener("mouseout", this.hideBottomPanel.bind(this)), this._overlay.addEventListener("mouseover", this.showBottomPanel.bind(this)), this._videoEl.addEventListener("mouseover", this.showBottomPanel.bind(this)), this._bottomPanel.addEventListener("mouseover", this.showBottomPanel.bind(this)), document.addEventListener("click", this.hideSettingsPanelOutside.bind(this))), document.addEventListener("keydown", this.keyEvents.bind(this)), this._durationSlider.addEventListener("input", this.seekingVideo.bind(this)), this._durationSlider.addEventListener("change", this.seekingVideoPaused.bind(this)), this._volumeSlider.addEventListener("click", (y) => y.stopPropagation()), this._volumeSlider.addEventListener("input", this.seekingVolume.bind(this)), window.addEventListener("click", () => this._volumeSlider.classList.remove("active")), window.addEventListener("resize", () => {
        this.setCanvasDimension(), this._videoEl.paused && this.paintStaticVideo();
      }), this._videoEl.addEventListener("seeked", this.paintStaticVideo.bind(this)), this.subtitles && this.runCaptions(this._selectedCaption), this._videoEl.addEventListener("leavepictureinpicture", this.leavePIP.bind(this)), this._settingsButtons.forEach((y, m) => {
        y.addEventListener("click", () => {
          this._settingsMenu.classList.add("hide");
          const s = this._settingsMenuPanels[m];
          s.classList.add("show"), s.querySelector("button:is(.action)").addEventListener("click", this.hideSettingsMenuPanel.bind(this));
        });
      });
      const _ = this.settingsPanelButtons(2);
      this.settingsAction(_, this._playbackSpeed, "data-speed", (y) => {
        this._videoEl.playbackRate = y;
        const m = this._settingsButtons[2].querySelector("span:nth-child(2)");
        m.innerHTML = `${`${y == 1 ? "Normal" : y} <i class="far fa-fw fa-chevron-right"></i>`}`;
      });
      const T = this.settingsPanelButtons(1);
      this.settingsAction(T, this._videoCaption, "data-lang", (y) => {
        var m;
        this._videoCaption = y, this._selectedCaption = this._captionsArray.find((f) => f.language == this._videoCaption), this.runCaptions(this._selectedCaption);
        const s = this._settingsButtons[1].querySelector("span:nth-child(2)");
        s.innerHTML = `${`${(m = this._selectedCaption) == null ? void 0 : m.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
      }), (te = this._buttons.play) == null || te.addEventListener("click", this.playVideo.bind(this)), (ge = this._buttons.fullscreen) == null || ge.addEventListener("click", this.openFullScreen.bind(this)), (V = this._buttons.picInPic) == null || V.addEventListener("click", this.openPIP.bind(this)), (B = this._buttons.captions) == null || B.addEventListener("click", this.showCaptions.bind(this)), (S = this._buttons.volume) == null || S.addEventListener("click", this.muteVolume.bind(this)), (F = this._buttons.theater) == null || F.addEventListener("click", this.theaterMode.bind(this)), (A = this._buttons.settings) == null || A.addEventListener("click", this.openSettings.bind(this)), (C = this._buttons.mobile.play) == null || C.addEventListener("click", this.playVideo.bind(this)), (I = this._buttons.mobile.fullscreen) == null || I.addEventListener("click", this.openFullScreen.bind(this)), (k = this._buttons.mobile.volume) == null || k.addEventListener("click", () => {
        var y;
        this.muteVolume();
        const m = (y = this._buttons.mobile.volume) == null ? void 0 : y.querySelector("i");
        this._videoEl.muted ? m == null || m.classList.replace("fa-volume", "fa-volume-mute") : m == null || m.classList.replace("fa-volume-mute", "fa-volume");
      }), (P = this._buttons.mobile.captions) == null || P.addEventListener("click", this.showCaptions.bind(this)), (L = this._buttons.mobile.settings) == null || L.addEventListener("click", () => this._settingsPanelMobile.classList.add("showed"));
      const h = (x = this._settingsPanelMobile) == null ? void 0 : x.querySelector(".close-btn");
      h == null || h.addEventListener("click", () => this._settingsPanelMobile.classList.remove("showed"));
    });
  }
  showLoader(Y) {
    Y ? this._loader.classList.remove("hide") : this._loader.classList.add("hide");
  }
  loadVideo(Y) {
    return je(this, null, function* () {
      if (Oe.isSupported()) {
        const Q = new Oe({ startLevel: -1 });
        Q.attachMedia(this._videoEl), Q.on(Oe.Events.MEDIA_ATTACHED, () => Q.loadSource(Y)), Q.on(Oe.Events.ERROR, (ee, { details: te }) => {
          te === Oe.ErrorDetails.BUFFER_STALLED_ERROR && this.showLoader(!0);
        }), Q.on(Oe.Events.FRAG_LOADING, () => this.showLoader(!0)), Q.on(Oe.Events.BUFFER_APPENDED, () => this.showLoader(!1)), Q.on(Oe.Events.FRAG_BUFFERED, () => this.showLoader(!1)), Q.on(Oe.Events.MANIFEST_PARSED, () => {
          var ee, te;
          const ge = Q.levels.map((C, I) => ({ resolution: C.height, index: I }));
          ge.unshift({ resolution: 0, index: -1 });
          const V = this._settingsMenuPanelsMobile[0].querySelector("select"), B = this._settingsMenuPanelsMobile[1].querySelector("select"), S = this._settingsMenuPanelsMobile[2].querySelector("select");
          this.subtitles || (ee = V.parentElement) == null || ee.classList.add("hidden"), V.addEventListener("change", (C) => {
            const I = C.target;
            this._videoCaption = I.value, this._selectedCaption = this._captionsArray.find((k) => k.language == this._videoCaption), this.runCaptions(this._selectedCaption);
          }), B.addEventListener("change", (C) => {
            const I = C.target;
            Q.nextLevel = Number(I.value);
          }), S.addEventListener("change", (C) => {
            const I = C.target;
            this._videoEl.playbackRate = Number(I.value);
          }), (te = this.subtitles) == null || te.forEach((C) => V.innerHTML += `<option value="${C.short}">${C.long}</option>`), this._playbackSpeeds.forEach((C) => {
            S.innerHTML += `<option ${C == 1 ? "selected" : ""} value="${C}">${`${C == 1 ? "Normal" : C}`}</option>`;
          }), ge.forEach((C) => {
            this._settingsMenuPanels[0].innerHTML += `<li><button data-quality="${C.index}" type="button" class="w-full text-left quality-button">${C.resolution == 0 ? "Auto" : `${C.resolution}p`} <i class="fas fa-fw fa-check ${C.index != -1 ? "hidden" : ""}"></i></button></li>`, B.innerHTML += `<option value="${C.index}">${C.resolution == 0 ? "Auto" : `${C.resolution}p`}</option>`;
          });
          const F = this._container.querySelectorAll(".quality-button"), A = this._settingsButtons[0].querySelector("span:last-child");
          F.forEach((C) => {
            C.addEventListener("click", () => {
              F.forEach((P) => {
                const L = P.querySelector("i");
                L == null || L.classList.add("hidden");
              });
              const I = C.getAttribute("data-quality");
              Q.nextLevel = Number(I), A.innerHTML = `${C.textContent} <i class="far fa-fw fa-chevron-right"></i>`;
              const k = C.querySelector("i");
              k == null || k.classList.remove("hidden"), this.hideSettingsMenuPanel();
            });
          });
        });
      }
      this._videoEl.load();
    });
  }
  setCanvasDimension() {
    this._ambientCanvas.height = this._videoEl.offsetHeight, this._ambientCanvas.width = this._videoEl.offsetWidth;
  }
  paintStaticVideo() {
    this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight);
  }
  hideSettingsPanelOutside(Y) {
    const Q = Y.target;
    Q.closest("#settings-button") || Q.closest(".settings-menu") || (this._settingsMenu.classList.remove("active"), setTimeout(() => this.hideSettingsMenuPanel(), 300), Q.closest("#videoary video") || this.hideBottomPanel());
  }
  fullscreenChange() {
    var Y, Q;
    const ee = (Y = this._buttons.fullscreen) == null ? void 0 : Y.querySelector("i"), te = (Q = this._buttons.mobile.fullscreen) == null ? void 0 : Q.querySelector("i");
    document.fullscreenElement ? (te.classList.replace("fa-expand", "fa-compress"), ee.classList.replace("fa-expand", "fa-compress")) : (te.classList.replace("fa-compress", "fa-expand"), ee.classList.replace("fa-compress", "fa-expand"));
  }
  seekingVideo(Y) {
    const Q = Y.target;
    this._videoEl.pause(), this._videoEl.currentTime = Number(Q.value), this._container.classList.add("seeking"), this._videoEl.volume = 0;
  }
  seekingVideoPaused() {
    this._isPlayed ? this._videoEl.play() : this._videoEl.pause(), this._container.classList.remove("seeking"), this._videoEl.volume = 1;
  }
  seekingVolume(Y) {
    this._volumeSlider.classList.add("active");
    const Q = Y.target;
    this._videoEl.volume = Number(Q.value), this._videoEl.volume > 0 ? this._videoEl.muted = !1 : this._videoEl.muted = !0, this.changeMuteIcon();
  }
  keyEvents(Y) {
    Y.key == "ArrowRight" ? this._videoEl.currentTime += 5 : Y.key == "ArrowLeft" ? this._videoEl.currentTime -= 5 : Y.key == " " || Y.key == "p" ? this.playVideo() : Y.key == "m" ? (this.muteVolume(), this.changeMuteIcon()) : Y.key == "i" ? this.openPIP() : Y.key == "f" ? this.openFullScreen() : Y.key == "t" ? this.theaterMode() : Y.key == "c" && !Y.ctrlKey && this.showCaptions();
  }
  loadedVideo() {
    this._durationIndicator.textContent = `0:00 / ${Fe(this._videoEl.duration)}`, this._durationIndicatorMobile.textContent = `0:00 / ${Fe(this._videoEl.duration)}`, this._durationSlider.max = String(this._videoEl.duration), this._volumeSlider.value = String(this._videoEl.volume);
  }
  runDuration() {
    const Y = this._videoEl.currentTime, Q = this._videoEl.duration, ee = this._container.querySelector(".buffered-progress");
    if (this._videoEl.buffered.length > 0) {
      let te = 100 * this._videoEl.buffered.end(0) / Q;
      ee.style.width = `${String(te)}%`;
    }
    this._durationIndicator.textContent = `${Fe(Y)} / ${Fe(Q)}`, this._durationIndicatorMobile.textContent = `${Fe(Y)} / ${Fe(Q)}`, this._durationSlider.value = Y.toString();
  }
  settingsPanelButtons(Y) {
    return this._settingsMenuPanels[Y].querySelectorAll("button:not(.action)");
  }
  settingsAction(Y, Q, ee, te) {
    Y.forEach((ge) => {
      ge.addEventListener("click", () => {
        Y.forEach((B) => {
          B.classList.remove("active"), B.querySelector("i").classList.add("hidden");
        }), ge.classList.add("active"), ge.querySelector("i").classList.remove("hidden"), this.hideSettingsMenuPanel(), Q = ge.getAttribute(ee), te(Q);
      });
    });
  }
  runCaptions(Y) {
    this._videoCaptions.forEach((Q) => Q.track.mode = "disabled"), Y.mode = "hidden", Y.addEventListener("cuechange", (Q) => {
      const ee = Q.target.activeCues;
      if (ee && ee.length > 0) {
        const te = ee[0];
        this._captionsWrapper.textContent = te.text;
      } else
        this._captionsWrapper.textContent = "";
      this._videoEl.addEventListener("ended", () => this._captionsWrapper.textContent = "");
    });
  }
  openFullScreen() {
    document.fullscreenElement ? document.exitFullscreen().then(() => console.log("Document exited from fullscreen mode")).catch((Y) => console.error(Y)) : this._container.requestFullscreen();
  }
  openSettings(Y) {
    const Q = Y.target;
    Q.style.transition = ".3s all ease", this._settingsMenu.classList.toggle("active"), this._settingsMenu.classList.contains("active") ? (this._tooltips.forEach((ee) => ee.setAttribute("aria-disabled", "true")), Q.style.rotate = "30deg") : (this._tooltips.forEach((ee) => ee.setAttribute("aria-disabled", "false")), Q.style.rotate = "0deg");
  }
  hideSettingsMenuPanel() {
    this._settingsMenuPanels.forEach((Y) => Y.classList.remove("show")), this._settingsMenu.classList.remove("hide");
  }
  showToast(Y) {
    this._toast.classList.add("active"), setTimeout(() => this._toast.classList.remove("active"), 2e3), this._toast.textContent = Y;
  }
  showCaptions() {
    var Y, Q;
    this._captionsWrapper.classList.toggle("active");
    const ee = (Y = this._buttons.captions) == null ? void 0 : Y.querySelector("i"), te = (Q = this._buttons.mobile.captions) == null ? void 0 : Q.querySelector("i");
    this._captionsWrapper.classList.contains("active") ? (this.showToast("Closed Captions is On"), ee == null || ee.classList.replace("far", "fas"), te == null || te.classList.replace("far", "fas")) : (this.showToast("Closed Captions is Off"), ee == null || ee.classList.replace("fas", "far"), te == null || te.classList.replace("fas", "far"));
  }
  runAmbient() {
    const Y = () => {
      !this._videoEl.paused && !this._videoEl.ended && (this._ctx.drawImage(this._videoEl, 0, 0, this._videoEl.offsetWidth, this._videoEl.offsetHeight), setTimeout(Y, 33.333333333333336));
    };
    Y();
  }
  playVideo() {
    var Y;
    this._posterEl.classList.add("hide");
    const Q = (Y = this._buttons.mobile.play) == null ? void 0 : Y.querySelector("i");
    this._videoEl.paused ? (Q.classList.replace("fa-play", "fa-pause"), this._playIcon.classList.replace("fa-play", "fa-pause"), this._videoEl.play(), this._isPlayed = !0) : (Q.classList.replace("fa-pause", "fa-play"), this._playIcon.classList.replace("fa-pause", "fa-play"), this._videoEl.pause(), this.showBottomPanel(), this._isPlayed = !1);
  }
  idlingWatch(Y) {
    const Q = Y.target;
    clearTimeout(this._idleTimer || 0), this._idleState && (this._actionsWrapperMobile.classList.remove("hide"), this.showBottomPanel()), this._idleState = !1, this._idleTimer = setTimeout(() => {
      (!Q.closest(".videoary__bottom-panel") || !Q.closest(".play-btn-mobile")) && (this._videoEl.paused || this.hideBottomPanel(), this._idleState = !0, this._container.style.cursor = "none");
    }, this._idleDuration);
  }
  hideBottomPanel() {
    this._videoEl.paused || this._settingsMenu.classList.contains("active") ? (this.showBottomPanel(), this._overlay.classList.remove("invisible")) : (this._captionsWrapper.classList.add("get-down"), this._bottomPanel.classList.remove("showed-up"), this._overlay.classList.add("invisible"));
  }
  showBottomPanel() {
    this._actionsWrapperMobile.classList.remove("hide"), this._container.style.cursor = "default", this._bottomPanel.classList.add("showed-up"), this._captionsWrapper.classList.remove("get-down"), this._overlay.classList.remove("invisible");
  }
  openPIP() {
    document.pictureInPictureElement ? document.exitPictureInPicture() : document.pictureInPictureEnabled && this._videoEl.requestPictureInPicture();
  }
  changeMuteIcon() {
    const Y = this._buttons.volume, { volume: Q } = this._videoEl;
    Q == 0 ? Y.classList.contains("fa-volume-down") ? Y.classList.replace("fa-volume-down", "fa-volume-mute") : Y.classList.contains("fa-volume") && Y.classList.replace("fa-volume", "fa-volume-mute") : Q <= 0.5 ? Y.classList.contains("fa-volume-mute") ? Y.classList.replace("fa-volume-mute", "fa-volume-down") : Y.classList.contains("fa-volume") && Y.classList.replace("fa-volume", "fa-volume-down") : Y.classList.contains("fa-volume-mute") ? Y.classList.replace("fa-volume-mute", "fa-volume") : Y.classList.contains("fa-volume-down") && Y.classList.replace("fa-volume-down", "fa-volume");
  }
  muteVolume() {
    const { muted: Y } = this._videoEl;
    Y ? (this._videoEl.muted = !1, this._videoEl.volume = this._currentVolume, this._volumeSlider.value = this._currentVolume.toString()) : Y || (this._currentVolume = Number(this._volumeSlider.value), this._videoEl.muted = !0, this._videoEl.volume = 0, this._volumeSlider.value = "0");
  }
  theaterMode() {
    var Y, Q;
    this._container.classList.toggle("theater-mode");
    const ee = (Y = this._buttons.theater) == null ? void 0 : Y.querySelector("i"), te = (Q = this._buttons.theater) == null ? void 0 : Q.nextElementSibling;
    this._container.classList.contains("theater-mode") ? (this.showToast("Theater Mode is On"), this._container.style.height = `${this._videoEl.videoHeight}px`, ee.style.fontSize = ".9rem", te.textContent = "Default View (t)") : (this.showToast("Theater Mode is Off"), this._container.style.height = "100%", ee.style.fontSize = "1.3rem", te.textContent = "Theater Mode (t)");
  }
  leavePIP() {
    const Y = !this._videoEl.paused;
    setTimeout(() => {
      this._videoEl.paused ? Y && this._playIcon.classList.replace("fa-pause", "fa-play") : this._playIcon.classList.replace("fa-play", "fa-play");
    }, 0);
  }
}
export {
  ot as Videoary
};