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
          enableStreamingMode: () => h,
          hlsDefaultConfig: () => f,
          mergeConfig: () => t
        });
        var F = S("./src/controller/abr-controller.ts"), A = S("./src/controller/audio-stream-controller.ts"), C = S("./src/controller/audio-track-controller.ts"), I = S("./src/controller/subtitle-stream-controller.ts"), k = S("./src/controller/subtitle-track-controller.ts"), P = S("./src/controller/buffer-controller.ts"), L = S("./src/controller/timeline-controller.ts"), x = S("./src/controller/cap-level-controller.ts"), _ = S("./src/controller/fps-controller.ts"), T = S("./src/controller/eme-controller.ts"), c = S("./src/controller/cmcd-controller.ts"), y = S("./src/utils/xhr-loader.ts"), m = S("./src/utils/fetch-loader.ts"), n = S("./src/utils/cues.ts"), o = S("./src/utils/mediakeys-helper.ts"), a = S("./src/utils/logger.ts");
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
        function l(e) {
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
          return d = u(d), d in e ? Object.defineProperty(e, d, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : e[d] = E, e;
        }
        function u(e) {
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
        var f = l(l({
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
          requestMediaKeySystemAccessFunc: o.requestMediaKeySystemAccess,
          testBandwidth: !0,
          progressive: !1,
          lowLatencyMode: !0,
          cmcd: void 0,
          enableDateRangeMetadataCues: !0,
          enableEmsgMetadataCues: !0,
          enableID3MetadataCues: !0
        }, s()), {}, {
          subtitleStreamController: I.SubtitleStreamController,
          subtitleTrackController: k.default,
          timelineController: L.TimelineController,
          audioStreamController: A.default,
          audioTrackController: C.default,
          emeController: T.default,
          cmcdController: c.default
        });
        function s() {
          return {
            cueHandler: n.default,
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
        function h(e) {
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
        function L(m, n) {
          for (var o = 0; o < n.length; o++) {
            var a = n[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(m, _(a.key), a);
          }
        }
        function x(m, n, o) {
          return n && L(m.prototype, n), o && L(m, o), Object.defineProperty(m, "prototype", { writable: !1 }), m;
        }
        function _(m) {
          var n = T(m, "string");
          return typeof n == "symbol" ? n : String(n);
        }
        function T(m, n) {
          if (typeof m != "object" || m === null)
            return m;
          var o = m[Symbol.toPrimitive];
          if (o !== void 0) {
            var a = o.call(m, n || "default");
            if (typeof a != "object")
              return a;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (n === "string" ? String : Number)(m);
        }
        var c = /* @__PURE__ */ function() {
          function m(o) {
            this.hls = void 0, this.lastLoadedFragLevel = 0, this._nextAutoLevel = -1, this.timer = void 0, this.onCheck = this._abandonRulesCheck.bind(this), this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this.hls = o;
            var a = o.config;
            this.bwEstimator = new A.default(a.abrEwmaSlowVoD, a.abrEwmaFastVoD, a.abrEwmaDefaultEstimate), this.registerListeners();
          }
          var n = m.prototype;
          return n.registerListeners = function() {
            var a = this.hls;
            a.on(C.Events.FRAG_LOADING, this.onFragLoading, this), a.on(C.Events.FRAG_LOADED, this.onFragLoaded, this), a.on(C.Events.FRAG_BUFFERED, this.onFragBuffered, this), a.on(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), a.on(C.Events.ERROR, this.onError, this);
          }, n.unregisterListeners = function() {
            var a = this.hls;
            a.off(C.Events.FRAG_LOADING, this.onFragLoading, this), a.off(C.Events.FRAG_LOADED, this.onFragLoaded, this), a.off(C.Events.FRAG_BUFFERED, this.onFragBuffered, this), a.off(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), a.off(C.Events.ERROR, this.onError, this);
          }, n.destroy = function() {
            this.unregisterListeners(), this.clearTimer(), this.hls = this.onCheck = null, this.fragCurrent = this.partCurrent = null;
          }, n.onFragLoading = function(a, i) {
            var g = i.frag;
            if (g.type === k.PlaylistLevelType.MAIN && !this.timer) {
              var l;
              this.fragCurrent = g, this.partCurrent = (l = i.part) != null ? l : null, this.timer = self.setInterval(this.onCheck, 100);
            }
          }, n.onLevelLoaded = function(a, i) {
            var g = this.hls.config;
            i.details.live ? this.bwEstimator.update(g.abrEwmaSlowLive, g.abrEwmaFastLive) : this.bwEstimator.update(g.abrEwmaSlowVoD, g.abrEwmaFastVoD);
          }, n._abandonRulesCheck = function() {
            var a = this.fragCurrent, i = this.partCurrent, g = this.hls, l = g.autoLevelEnabled, r = g.media;
            if (!(!a || !r)) {
              var u = i ? i.stats : a.stats, v = i ? i.duration : a.duration;
              if (u.aborted || u.loaded && u.loaded === u.total || a.level === 0) {
                this.clearTimer(), this._nextAutoLevel = -1;
                return;
              }
              if (!(!l || r.paused || !r.playbackRate || !r.readyState)) {
                var f = g.mainForwardBufferInfo;
                if (f !== null) {
                  var s = performance.now() - u.loading.start, t = Math.abs(r.playbackRate);
                  if (!(s <= 500 * v / t)) {
                    var h = u.loaded && u.loading.first, e = this.bwEstimator.getEstimate(), d = g.levels, E = g.minAutoLevel, p = d[a.level], D = u.total || Math.max(u.loaded, Math.round(v * p.maxBitrate / 8)), R = h ? u.loaded * 1e3 / s : 0, b = R ? (D - u.loaded) / R : D * 8 / e, O = f.len / t;
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
      Time to underbuffer: ` + O.toFixed(3) + " s"), g.nextLoadLevel = w, h && this.bwEstimator.sample(s, u.loaded), this.clearTimer(), (a.loader || a.keyLoader) && (this.fragCurrent = this.partCurrent = null, a.abortRequests()), g.trigger(C.Events.FRAG_LOAD_EMERGENCY_ABORTED, {
                        frag: a,
                        part: i,
                        stats: u
                      }));
                    }
                  }
                }
              }
            }
          }, n.onFragLoaded = function(a, i) {
            var g = i.frag, l = i.part;
            if (g.type === k.PlaylistLevelType.MAIN && (0, F.isFiniteNumber)(g.sn)) {
              var r = l ? l.stats : g.stats, u = l ? l.duration : g.duration;
              if (this.clearTimer(), this.lastLoadedFragLevel = g.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                var v = this.hls.levels[g.level], f = (v.loaded ? v.loaded.bytes : 0) + r.loaded, s = (v.loaded ? v.loaded.duration : 0) + u;
                v.loaded = {
                  bytes: f,
                  duration: s
                }, v.realBitrate = Math.round(8 * f / s);
              }
              if (g.bitrateTest) {
                var t = {
                  stats: r,
                  frag: g,
                  part: l,
                  id: g.type
                };
                this.onFragBuffered(C.Events.FRAG_BUFFERED, t);
              }
            }
          }, n.onFragBuffered = function(a, i) {
            var g = i.frag, l = i.part, r = l ? l.stats : g.stats;
            if (!r.aborted && !(g.type !== k.PlaylistLevelType.MAIN || g.sn === "initSegment")) {
              var u = r.parsing.end - r.loading.start;
              this.bwEstimator.sample(u, r.loaded), r.bwEstimate = this.bwEstimator.getEstimate(), g.bitrateTest ? this.bitrateTestDelay = u / 1e3 : this.bitrateTestDelay = 0;
            }
          }, n.onError = function(a, i) {
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
          }, n.clearTimer = function() {
            self.clearInterval(this.timer), this.timer = void 0;
          }, n.getNextABRAutoLevel = function() {
            var a = this.fragCurrent, i = this.partCurrent, g = this.hls, l = g.maxAutoLevel, r = g.config, u = g.minAutoLevel, v = g.media, f = i ? i.duration : a ? a.duration : 0, s = v && v.playbackRate !== 0 ? Math.abs(v.playbackRate) : 1, t = this.bwEstimator ? this.bwEstimator.getEstimate() : r.abrEwmaDefaultEstimate, h = g.mainForwardBufferInfo, e = (h ? h.len : 0) / s, d = this.findBestLevel(t, u, l, e, r.abrBandWidthFactor, r.abrBandWidthUpFactor);
            if (d >= 0)
              return d;
            P.logger.trace((e ? "rebuffering expected" : "buffer is empty") + ", finding optimal quality level");
            var E = f ? Math.min(f, r.maxStarvationDelay) : r.maxStarvationDelay, p = r.abrBandWidthFactor, D = r.abrBandWidthUpFactor;
            if (!e) {
              var R = this.bitrateTestDelay;
              if (R) {
                var b = f ? Math.min(f, r.maxLoadingDelay) : r.maxLoadingDelay;
                E = b - R, P.logger.trace("bitrate test took " + Math.round(1e3 * R) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * E) + " ms"), p = D = 1;
              }
            }
            return d = this.findBestLevel(t, u, l, e + E, p, D), Math.max(d, 0);
          }, n.findBestLevel = function(a, i, g, l, r, u) {
            for (var v, f = this.fragCurrent, s = this.partCurrent, t = this.lastLoadedFragLevel, h = this.hls.levels, e = h[t], d = !!(e != null && (v = e.details) !== null && v !== void 0 && v.live), E = e == null ? void 0 : e.codecSet, p = s ? s.duration : f ? f.duration : 0, D = g; D >= i; D--) {
              var R = h[D];
              if (!(!R || E && R.codecSet !== E)) {
                var b = R.details, O = (s ? b == null ? void 0 : b.partTarget : b == null ? void 0 : b.averagetargetduration) || p, M = void 0;
                D <= t ? M = r * a : M = u * a;
                var w = h[D].maxBitrate, U = w * O / M;
                if (P.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + D + "/" + Math.round(M) + "/" + w + "/" + O + "/" + l + "/" + U), M > w && (U === 0 || !(0, F.isFiniteNumber)(U) || d && !this.bitrateTestDelay || U < l))
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
        const y = c;
      },
      "./src/controller/audio-stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => r
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/controller/base-stream-controller.ts"), C = S("./src/events.ts"), I = S("./src/utils/buffer-helper.ts"), k = S("./src/controller/fragment-tracker.ts"), P = S("./src/types/level.ts"), L = S("./src/types/loader.ts"), x = S("./src/loader/fragment.ts"), _ = S("./src/demux/chunk-cache.ts"), T = S("./src/demux/transmuxer-interface.ts"), c = S("./src/types/transmuxer.ts"), y = S("./src/controller/fragment-finders.ts"), m = S("./src/utils/discontinuities.ts"), n = S("./src/errors.ts");
        function o() {
          return o = Object.assign ? Object.assign.bind() : function(u) {
            for (var v = 1; v < arguments.length; v++) {
              var f = arguments[v];
              for (var s in f)
                Object.prototype.hasOwnProperty.call(f, s) && (u[s] = f[s]);
            }
            return u;
          }, o.apply(this, arguments);
        }
        function a(u, v) {
          u.prototype = Object.create(v.prototype), u.prototype.constructor = u, i(u, v);
        }
        function i(u, v) {
          return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(s, t) {
            return s.__proto__ = t, s;
          }, i(u, v);
        }
        var g = 100, l = /* @__PURE__ */ function(u) {
          a(v, u);
          function v(s, t, h) {
            var e;
            return e = u.call(this, s, t, h, "[audio-stream-controller]") || this, e.videoBuffer = null, e.videoTrackCC = -1, e.waitingVideoCC = -1, e.audioSwitch = !1, e.trackId = -1, e.waitingData = null, e.mainDetails = null, e.bufferFlushed = !1, e.cachedTrackLoadedData = null, e._registerListeners(), e;
          }
          var f = v.prototype;
          return f.onHandlerDestroying = function() {
            this._unregisterListeners(), this.mainDetails = null;
          }, f._registerListeners = function() {
            var t = this.hls;
            t.on(C.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(C.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(C.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(C.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.on(C.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(C.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.on(C.Events.ERROR, this.onError, this), t.on(C.Events.BUFFER_RESET, this.onBufferReset, this), t.on(C.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(C.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(C.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.on(C.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, f._unregisterListeners = function() {
            var t = this.hls;
            t.off(C.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(C.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(C.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(C.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(C.Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), t.off(C.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(C.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), t.off(C.Events.ERROR, this.onError, this), t.off(C.Events.BUFFER_RESET, this.onBufferReset, this), t.off(C.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(C.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(C.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), t.off(C.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, f.onInitPtsFound = function(t, h) {
            var e = h.frag, d = h.id, E = h.initPTS;
            if (d === "main") {
              var p = e.cc;
              this.initPTS[e.cc] = E, this.log("InitPTS for cc: " + p + " found from main: " + E), this.videoTrackCC = p, this.state === A.State.WAITING_INIT_PTS && this.tick();
            }
          }, f.startLoad = function(t) {
            if (!this.levels) {
              this.startPosition = t, this.state = A.State.STOPPED;
              return;
            }
            var h = this.lastCurrentTime;
            this.stopLoad(), this.setInterval(g), this.fragLoadError = 0, h > 0 && t === -1 ? (this.log("Override startPosition with lastCurrentTime @" + h.toFixed(3)), t = h, this.state = A.State.IDLE) : (this.loadedmetadata = !1, this.state = A.State.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick();
          }, f.doTick = function() {
            switch (this.state) {
              case A.State.IDLE:
                this.doTickIdle();
                break;
              case A.State.WAITING_TRACK: {
                var t, h = this.levels, e = this.trackId, d = h == null || (t = h[e]) === null || t === void 0 ? void 0 : t.details;
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
                    this._handleFragmentLoadProgress(N), w && u.prototype._handleFragmentLoadComplete.call(this, N);
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
          }, f.clearWaitingFragment = function() {
            var t = this.waitingData;
            t && (this.fragmentTracker.removeFragment(t.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = A.State.IDLE);
          }, f.resetLoadingState = function() {
            this.clearWaitingFragment(), u.prototype.resetLoadingState.call(this);
          }, f.onTickEnd = function() {
            var t = this.media;
            !t || !t.readyState || (this.lastCurrentTime = t.currentTime);
          }, f.doTickIdle = function() {
            var t = this.hls, h = this.levels, e = this.media, d = this.trackId, E = t.config;
            if (!(!h || !h[d]) && !(!e && (this.startFragRequested || !E.startFragPrefetch))) {
              var p = h[d], D = p.details;
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
          }, f.getMaxBufferLength = function(t) {
            var h = u.prototype.getMaxBufferLength.call(this);
            return t ? Math.max(h, t) : h;
          }, f.onMediaDetaching = function() {
            this.videoBuffer = null, u.prototype.onMediaDetaching.call(this);
          }, f.onAudioTracksUpdated = function(t, h) {
            var e = h.audioTracks;
            this.resetTransmuxer(), this.levels = e.map(function(d) {
              return new P.Level(d);
            });
          }, f.onAudioTrackSwitching = function(t, h) {
            var e = !!h.url;
            this.trackId = h.id;
            var d = this.fragCurrent;
            d && d.abortRequests(), this.fragCurrent = null, this.clearWaitingFragment(), e ? this.setInterval(g) : this.resetTransmuxer(), e ? (this.audioSwitch = !0, this.state = A.State.IDLE) : this.state = A.State.STOPPED, this.tick();
          }, f.onManifestLoading = function() {
            this.mainDetails = null, this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = !1;
          }, f.onLevelLoaded = function(t, h) {
            this.mainDetails = h.details, this.cachedTrackLoadedData !== null && (this.hls.trigger(C.Events.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null);
          }, f.onAudioTrackLoaded = function(t, h) {
            var e;
            if (this.mainDetails == null) {
              this.cachedTrackLoadedData = h;
              return;
            }
            var d = this.levels, E = h.details, p = h.id;
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
          }, f._handleFragmentLoadProgress = function(t) {
            var h, e = t.frag, d = t.part, E = t.payload, p = this.config, D = this.trackId, R = this.levels;
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
            var U = this.initPTS[e.cc], N = (h = e.initSegment) === null || h === void 0 ? void 0 : h.data;
            if (U !== void 0) {
              var K = !1, W = d ? d.index : -1, G = W !== -1, j = new c.ChunkMetadata(e.level, e.sn, e.stats.chunkCount, E.byteLength, W, G);
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
          }, f._handleFragmentLoadComplete = function(t) {
            if (this.waitingData) {
              this.waitingData.complete = !0;
              return;
            }
            u.prototype._handleFragmentLoadComplete.call(this, t);
          }, f.onBufferReset = function() {
            this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1;
          }, f.onBufferCreated = function(t, h) {
            var e = h.tracks.audio;
            e && (this.mediaBuffer = e.buffer || null), h.tracks.video && (this.videoBuffer = h.tracks.video.buffer || null);
          }, f.onFragBuffered = function(t, h) {
            var e = h.frag, d = h.part;
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
          }, f.onError = function(t, h) {
            if (h.type === n.ErrorTypes.KEY_SYSTEM_ERROR) {
              this.onFragmentOrKeyLoadError(L.PlaylistLevelType.AUDIO, h);
              return;
            }
            switch (h.details) {
              case n.ErrorDetails.FRAG_LOAD_ERROR:
              case n.ErrorDetails.FRAG_LOAD_TIMEOUT:
              case n.ErrorDetails.FRAG_PARSING_ERROR:
              case n.ErrorDetails.KEY_LOAD_ERROR:
              case n.ErrorDetails.KEY_LOAD_TIMEOUT:
                this.onFragmentOrKeyLoadError(L.PlaylistLevelType.AUDIO, h);
                break;
              case n.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
              case n.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                this.state !== A.State.ERROR && this.state !== A.State.STOPPED && (this.state = h.fatal ? A.State.ERROR : A.State.IDLE, this.warn(h.details + " while loading frag, switching to " + this.state + " state"));
                break;
              case n.ErrorDetails.BUFFER_FULL_ERROR:
                if (h.parent === "audio" && (this.state === A.State.PARSING || this.state === A.State.PARSED)) {
                  var e = !0, d = this.getFwdBufferInfo(this.mediaBuffer, L.PlaylistLevelType.AUDIO);
                  d && d.len > 0.5 && (e = !this.reduceMaxBufferLength(d.len)), e && (this.warn("Buffer full error also media.currentTime is not buffered, flush audio buffer"), this.fragCurrent = null, u.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.resetLoadingState();
                }
                break;
            }
          }, f.onBufferFlushed = function(t, h) {
            var e = h.type;
            e === x.ElementaryStreamTypes.AUDIO && (this.bufferFlushed = !0, this.state === A.State.ENDED && (this.state = A.State.IDLE));
          }, f._handleTransmuxComplete = function(t) {
            var h, e = "audio", d = this.hls, E = t.remuxResult, p = t.chunkMeta, D = this.getCurrentContext(p);
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
              if (U != null && (h = U.samples) !== null && h !== void 0 && h.length) {
                var H = o({
                  id: e,
                  frag: R,
                  details: O
                }, U);
                d.trigger(C.Events.FRAG_PARSING_METADATA, H);
              }
              if (w) {
                var X = o({
                  id: e,
                  frag: R,
                  details: O
                }, w);
                d.trigger(C.Events.FRAG_PARSING_USERDATA, X);
              }
            }
          }, f._bufferInitSegment = function(t, h, e) {
            if (this.state === A.State.PARSING) {
              t.video && delete t.video;
              var d = t.audio;
              if (!!d) {
                d.levelCodec = d.codec, d.id = "audio", this.log("Init audio buffer, container:" + d.container + ", codecs[parsed]=[" + d.codec + "]"), this.hls.trigger(C.Events.BUFFER_CODECS, t);
                var E = d.initSegment;
                if (E != null && E.byteLength) {
                  var p = {
                    type: "audio",
                    frag: h,
                    part: null,
                    chunkMeta: e,
                    parent: h.type,
                    data: E
                  };
                  this.hls.trigger(C.Events.BUFFER_APPENDING, p);
                }
                this.tick();
              }
            }
          }, f.loadFragment = function(t, h, e) {
            var d = this.fragmentTracker.getState(t);
            this.fragCurrent = t, (this.audioSwitch || d === k.FragmentState.NOT_LOADED || d === k.FragmentState.PARTIAL) && (t.sn === "initSegment" ? this._loadInitSegment(t, h) : h.live && !(0, F.isFiniteNumber)(this.initPTS[t.cc]) ? (this.log("Waiting for video PTS in continuity counter " + t.cc + " of live stream before loading audio fragment " + t.sn + " of level " + this.trackId), this.state = A.State.WAITING_INIT_PTS) : (this.startFragRequested = !0, u.prototype.loadFragment.call(this, t, h, e)));
          }, f.completeAudioSwitch = function() {
            var t = this.hls, h = this.media, e = this.trackId;
            h && (this.log("Switching audio track : flushing all audio"), u.prototype.flushMainBuffer.call(this, 0, Number.POSITIVE_INFINITY, "audio")), this.audioSwitch = !1, t.trigger(C.Events.AUDIO_TRACK_SWITCHED, {
              id: e
            });
          }, v;
        }(A.default);
        const r = l;
      },
      "./src/controller/audio-track-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => y
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/controller/base-playlist-controller.ts"), I = S("./src/types/loader.ts");
        function k(m, n) {
          for (var o = 0; o < n.length; o++) {
            var a = n[o];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(m, L(a.key), a);
          }
        }
        function P(m, n, o) {
          return n && k(m.prototype, n), o && k(m, o), Object.defineProperty(m, "prototype", { writable: !1 }), m;
        }
        function L(m) {
          var n = x(m, "string");
          return typeof n == "symbol" ? n : String(n);
        }
        function x(m, n) {
          if (typeof m != "object" || m === null)
            return m;
          var o = m[Symbol.toPrimitive];
          if (o !== void 0) {
            var a = o.call(m, n || "default");
            if (typeof a != "object")
              return a;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (n === "string" ? String : Number)(m);
        }
        function _(m, n) {
          m.prototype = Object.create(n.prototype), m.prototype.constructor = m, T(m, n);
        }
        function T(m, n) {
          return T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, i) {
            return a.__proto__ = i, a;
          }, T(m, n);
        }
        var c = /* @__PURE__ */ function(m) {
          _(n, m);
          function n(a) {
            var i;
            return i = m.call(this, a, "[audio-track-controller]") || this, i.tracks = [], i.groupId = null, i.tracksInGroup = [], i.trackId = -1, i.trackName = "", i.selectDefaultTrack = !0, i.registerListeners(), i;
          }
          var o = n.prototype;
          return o.registerListeners = function() {
            var i = this.hls;
            i.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), i.on(F.Events.LEVEL_LOADING, this.onLevelLoading, this), i.on(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), i.on(F.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), i.on(F.Events.ERROR, this.onError, this);
          }, o.unregisterListeners = function() {
            var i = this.hls;
            i.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), i.off(F.Events.LEVEL_LOADING, this.onLevelLoading, this), i.off(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), i.off(F.Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), i.off(F.Events.ERROR, this.onError, this);
          }, o.destroy = function() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, m.prototype.destroy.call(this);
          }, o.onManifestLoading = function() {
            this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.trackName = "", this.selectDefaultTrack = !0;
          }, o.onManifestParsed = function(i, g) {
            this.tracks = g.audioTracks || [];
          }, o.onAudioTrackLoaded = function(i, g) {
            var l = g.id, r = g.details, u = this.tracksInGroup[l];
            if (!u) {
              this.warn("Invalid audio track id " + l);
              return;
            }
            var v = u.details;
            u.details = g.details, this.log("audioTrack " + l + " loaded [" + r.startSN + "-" + r.endSN + "]"), l === this.trackId && (this.retryCount = 0, this.playlistLoaded(l, g, v));
          }, o.onLevelLoading = function(i, g) {
            this.switchLevel(g.level);
          }, o.onLevelSwitching = function(i, g) {
            this.switchLevel(g.level);
          }, o.switchLevel = function(i) {
            var g = this.hls.levels[i];
            if (!!(g != null && g.audioGroupIds)) {
              var l = g.audioGroupIds[g.urlId];
              if (this.groupId !== l) {
                this.groupId = l;
                var r = this.tracks.filter(function(v) {
                  return !l || v.groupId === l;
                });
                this.selectDefaultTrack && !r.some(function(v) {
                  return v.default;
                }) && (this.selectDefaultTrack = !1), this.tracksInGroup = r;
                var u = {
                  audioTracks: r
                };
                this.log("Updating audio tracks, " + r.length + ' track(s) found in "' + l + '" group-id'), this.hls.trigger(F.Events.AUDIO_TRACKS_UPDATED, u), this.selectInitialTrack();
              }
            }
          }, o.onError = function(i, g) {
            m.prototype.onError.call(this, i, g), !(g.fatal || !g.context) && g.context.type === I.PlaylistContextType.AUDIO_TRACK && g.context.id === this.trackId && g.context.groupId === this.groupId && this.retryLoadingOrFail(g);
          }, o.setAudioTrack = function(i) {
            var g = this.tracksInGroup;
            if (i < 0 || i >= g.length) {
              this.warn("Invalid id passed to audio-track controller");
              return;
            }
            this.clearTimer();
            var l = g[this.trackId];
            this.log("Now switching to audio-track index " + i);
            var r = g[i], u = r.id, v = r.groupId, f = v === void 0 ? "" : v, s = r.name, t = r.type, h = r.url;
            if (this.trackId = i, this.trackName = s, this.selectDefaultTrack = !1, this.hls.trigger(F.Events.AUDIO_TRACK_SWITCHING, {
              id: u,
              groupId: f,
              name: s,
              type: t,
              url: h
            }), !(r.details && !r.details.live)) {
              var e = this.switchParams(r.url, l == null ? void 0 : l.details);
              this.loadPlaylist(e);
            }
          }, o.selectInitialTrack = function() {
            var i = this.tracksInGroup;
            console.assert(i.length, "Initial audio track should be selected when tracks are known");
            var g = this.trackName, l = this.findTrackId(g) || this.findTrackId();
            l !== -1 ? this.setAudioTrack(l) : (this.warn("No track found for running audio group-ID: " + this.groupId), this.hls.trigger(F.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
              fatal: !0
            }));
          }, o.findTrackId = function(i) {
            for (var g = this.tracksInGroup, l = 0; l < g.length; l++) {
              var r = g[l];
              if ((!this.selectDefaultTrack || r.default) && (!i || i === r.name))
                return r.id;
            }
            return -1;
          }, o.loadPlaylist = function(i) {
            m.prototype.loadPlaylist.call(this);
            var g = this.tracksInGroup[this.trackId];
            if (this.shouldLoadTrack(g)) {
              var l = g.id, r = g.groupId, u = g.url;
              if (i)
                try {
                  u = i.addDirectives(u);
                } catch (v) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + v);
                }
              this.log("loading audio-track playlist for id: " + l), this.clearTimer(), this.hls.trigger(F.Events.AUDIO_TRACK_LOADING, {
                url: u,
                id: l,
                groupId: r,
                deliveryDirectives: i || null
              });
            }
          }, P(n, [{
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
          }]), n;
        }(C.default);
        const y = c;
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
            var c = T == null ? void 0 : T.renditionReports;
            if (c)
              for (var y = 0; y < c.length; y++) {
                var m = c[y], n = void 0;
                try {
                  n = new self.URL(m.URI, T.url).href;
                } catch (g) {
                  C.logger.warn("Could not construct new URL for Rendition Report: " + g), n = m.URI || "";
                }
                if (n === _.slice(-n.length)) {
                  var o = parseInt(m["LAST-MSN"]) || (T == null ? void 0 : T.lastPartSn), a = parseInt(m["LAST-PART"]) || (T == null ? void 0 : T.lastPartIndex);
                  if (this.hls.config.lowLatencyMode) {
                    var i = Math.min(T.age - T.partTarget, T.targetduration);
                    a >= 0 && i > T.partTarget && (a += 1);
                  }
                  return new F.HlsUrlParameters(o, a >= 0 ? a : void 0, F.HlsSkip.No);
                }
              }
          }, L.loadPlaylist = function(_) {
            this.requestScheduled === -1 && (this.requestScheduled = self.performance.now());
          }, L.shouldLoadTrack = function(_) {
            return this.canLoad && _ && !!_.url && (!_.details || _.details.live);
          }, L.playlistLoaded = function(_, T, c) {
            var y = this, m = T.details, n = T.stats, o = self.performance.now(), a = n.loading.first ? Math.max(0, o - n.loading.first) : 0;
            if (m.advancedDateTime = Date.now() - a, m.live || c != null && c.live) {
              if (m.reloaded(c), c && this.log("live playlist " + _ + " " + (m.advanced ? "REFRESHED " + m.lastPartSn + "-" + m.lastPartIndex : "MISSED")), c && m.fragments.length > 0 && (0, A.mergeDetails)(c, m), !this.canLoad || !m.live)
                return;
              var i, g = void 0, l = void 0;
              if (m.canBlockReload && m.endSN && m.advanced) {
                var r = this.hls.config.lowLatencyMode, u = m.lastPartSn, v = m.endSN, f = m.lastPartIndex, s = f !== -1, t = u === v, h = r ? 0 : f;
                s ? (g = t ? v + 1 : u, l = t ? h : f + 1) : g = v + 1;
                var e = m.age, d = e + m.ageHeader, E = Math.min(d - m.partTarget, m.targetduration * 1.5);
                if (E > 0) {
                  if (c && E > c.tuneInGoal)
                    this.warn("CDN Tune-in goal increased from: " + c.tuneInGoal + " to: " + E + " with playlist age: " + m.age), E = 0;
                  else {
                    var p = Math.floor(E / m.targetduration);
                    if (g += p, l !== void 0) {
                      var D = Math.round(E % m.targetduration / m.partTarget);
                      l += D;
                    }
                    this.log("CDN Tune-in age: " + m.ageHeader + "s last advanced " + e.toFixed(2) + "s goal: " + E + " skip sn " + p + " to part " + l);
                  }
                  m.tuneInGoal = E;
                }
                if (i = this.getDeliveryDirectives(m, T.deliveryDirectives, g, l), r || !t) {
                  this.loadPlaylist(i);
                  return;
                }
              } else
                i = this.getDeliveryDirectives(m, T.deliveryDirectives, g, l);
              var R = this.hls.mainForwardBufferInfo, b = R ? R.end - R.len : 0, O = (m.edge - b) * 1e3, M = (0, A.computeReloadInterval)(m, O);
              m.updated ? o > this.requestScheduled + M && (this.requestScheduled = n.loading.start) : this.requestScheduled = -1, g !== void 0 && m.canBlockReload ? this.requestScheduled = n.loading.first + M - (m.partTarget * 1e3 || 1e3) : this.requestScheduled = (this.requestScheduled === -1 ? o : this.requestScheduled) + M;
              var w = this.requestScheduled - o;
              w = Math.max(0, w), this.log("reload live playlist " + _ + " in " + Math.round(w) + " ms"), this.timer = self.setTimeout(function() {
                return y.loadPlaylist(i);
              }, w);
            } else
              this.clearTimer();
          }, L.getDeliveryDirectives = function(_, T, c, y) {
            var m = (0, F.getSkipValue)(_, c);
            return T != null && T.skip && _.deltaUpdateFailed && (c = T.msn, y = T.part, m = F.HlsSkip.No), new F.HlsUrlParameters(c, y, m);
          }, L.retryLoadingOrFail = function(_) {
            var T = this, c = this.hls.config, y = this.retryCount < c.levelLoadingMaxRetry;
            if (y) {
              var m;
              if (this.requestScheduled = -1, this.retryCount++, _.details.indexOf("LoadTimeOut") > -1 && (m = _.context) !== null && m !== void 0 && m.deliveryDirectives)
                this.warn("retry playlist loading #" + this.retryCount + ' after "' + _.details + '"'), this.loadPlaylist();
              else {
                var n = Math.min(Math.pow(2, this.retryCount) * c.levelLoadingRetryDelay, c.levelLoadingMaxRetryTimeout);
                this.timer = self.setTimeout(function() {
                  return T.loadPlaylist();
                }, n), this.warn("retry playlist loading #" + this.retryCount + " in " + n + ' ms after "' + _.details + '"');
              }
            } else
              this.warn('cannot recover from error "' + _.details + '"'), this.clearTimer(), _.fatal = !0;
            return y;
          }, P;
        }();
      },
      "./src/controller/base-stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          State: () => s,
          default: () => t
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/task-loop.ts"), C = S("./src/controller/fragment-tracker.ts"), I = S("./src/utils/buffer-helper.ts"), k = S("./src/utils/logger.ts"), P = S("./src/events.ts"), L = S("./src/errors.ts"), x = S("./src/types/transmuxer.ts"), _ = S("./src/utils/mp4-tools.ts"), T = S("./src/utils/discontinuities.ts"), c = S("./src/controller/fragment-finders.ts"), y = S("./src/controller/level-helper.ts"), m = S("./src/loader/fragment-loader.ts"), n = S("./src/crypt/decrypter.ts"), o = S("./src/utils/time-ranges.ts"), a = S("./src/types/loader.ts");
        function i(h, e) {
          for (var d = 0; d < e.length; d++) {
            var E = e[d];
            E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(h, l(E.key), E);
          }
        }
        function g(h, e, d) {
          return e && i(h.prototype, e), d && i(h, d), Object.defineProperty(h, "prototype", { writable: !1 }), h;
        }
        function l(h) {
          var e = r(h, "string");
          return typeof e == "symbol" ? e : String(e);
        }
        function r(h, e) {
          if (typeof h != "object" || h === null)
            return h;
          var d = h[Symbol.toPrimitive];
          if (d !== void 0) {
            var E = d.call(h, e || "default");
            if (typeof E != "object")
              return E;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(h);
        }
        function u(h) {
          if (h === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return h;
        }
        function v(h, e) {
          h.prototype = Object.create(e.prototype), h.prototype.constructor = h, f(h, e);
        }
        function f(h, e) {
          return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(E, p) {
            return E.__proto__ = p, E;
          }, f(h, e);
        }
        var s = {
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
        }, t = /* @__PURE__ */ function(h) {
          v(e, h);
          function e(E, p, D, R) {
            var b;
            return b = h.call(this) || this, b.hls = void 0, b.fragPrevious = null, b.fragCurrent = null, b.fragmentTracker = void 0, b.transmuxer = null, b._state = s.STOPPED, b.media = null, b.mediaBuffer = null, b.config = void 0, b.bitrateTest = !1, b.lastCurrentTime = 0, b.nextLoadPosition = 0, b.startPosition = 0, b.loadedmetadata = !1, b.fragLoadError = 0, b.retryDate = 0, b.levels = null, b.fragmentLoader = void 0, b.keyLoader = void 0, b.levelLastLoaded = null, b.startFragRequested = !1, b.decrypter = void 0, b.initPTS = [], b.onvseeking = null, b.onvended = null, b.logPrefix = "", b.log = void 0, b.warn = void 0, b.logPrefix = R, b.log = k.logger.log.bind(k.logger, R + ":"), b.warn = k.logger.warn.bind(k.logger, R + ":"), b.hls = E, b.fragmentLoader = new m.default(E.config), b.keyLoader = D, b.fragmentTracker = p, b.config = E.config, b.decrypter = new n.default(E.config), E.on(P.Events.LEVEL_SWITCHING, b.onLevelSwitching, u(b)), b;
          }
          var d = e.prototype;
          return d.doTick = function() {
            this.onTickEnd();
          }, d.onTickEnd = function() {
          }, d.startLoad = function(p) {
          }, d.stopLoad = function() {
            this.fragmentLoader.abort(), this.keyLoader.abort();
            var p = this.fragCurrent;
            p && (p.abortRequests(), this.fragmentTracker.removeFragment(p)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = s.STOPPED;
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
            this.levels && b.autoStartLoad && this.state === s.STOPPED && this.startLoad(b.startPosition);
          }, d.onMediaDetaching = function() {
            var p = this.media;
            p != null && p.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), p && this.onvseeking && this.onvended && (p.removeEventListener("seeking", this.onvseeking), p.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.keyLoader && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
          }, d.onMediaSeeking = function() {
            var p = this.config, D = this.fragCurrent, R = this.media, b = this.mediaBuffer, O = this.state, M = R ? R.currentTime : 0, w = I.BufferHelper.bufferInfo(b || R, M, p.maxBufferHole);
            if (this.log("media seeking to " + ((0, F.isFiniteNumber)(M) ? M.toFixed(3) : M) + ", state: " + O), this.state === s.ENDED)
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
            this.stopLoad(), h.prototype.onHandlerDestroying.call(this);
          }, d.onHandlerDestroyed = function() {
            this.state = s.STOPPED, this.hls.off(P.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, h.prototype.onHandlerDestroyed.call(this);
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
                  (w === s.FRAG_LOADING || !b.fragCurrent && w === s.PARSING) && (b.fragmentTracker.removeFragment(p), b.state = s.IDLE);
                  return;
                }
                "payload" in M && (b.log("Loaded fragment " + p.sn + " of level " + p.level), b.hls.trigger(P.Events.FRAG_LOADED, M)), b._handleFragmentLoadComplete(M);
              }
            }).catch(function(M) {
              b.state === s.STOPPED || b.state === s.ERROR || (b.warn(M), b.resetFragmentLoading(p));
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
              R.state = s.IDLE, R.fragLoadError = 0, p.data = new Uint8Array(b.payload), N.parsing.start = N.buffering.start = self.performance.now(), N.parsing.end = N.buffering.end = self.performance.now(), b.frag === O && M.trigger(P.Events.FRAG_BUFFERED, {
                stats: N,
                frag: O,
                part: null,
                id: p.type
              }), R.tick();
            }).catch(function(b) {
              R.state === s.STOPPED || R.state === s.ERROR || (R.warn(b), R.resetFragmentLoading(p));
            });
          }, d.fragContextChanged = function(p) {
            var D = this.fragCurrent;
            return !p || !D || p.level !== D.level || p.sn !== D.sn || p.urlId !== D.urlId;
          }, d.fragBufferedComplete = function(p, D) {
            var R, b, O = this.mediaBuffer ? this.mediaBuffer : this.media;
            this.log("Buffered " + p.type + " sn: " + p.sn + (D ? " part: " + D.index : "") + " of " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + p.level + " " + (O ? o.default.toString(I.BufferHelper.getBuffered(O)) : "(detached)")), this.state = s.IDLE, O && (!this.loadedmetadata && p.type == a.PlaylistLevelType.MAIN && O.buffered.length && ((R = this.fragCurrent) === null || R === void 0 ? void 0 : R.sn) === ((b = this.fragPrevious) === null || b === void 0 ? void 0 : b.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick());
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
            if (p.encrypted && !((O = p.decryptdata) !== null && O !== void 0 && O.key) ? (this.log("Loading key for " + p.sn + " of [" + D.startSN + "-" + D.endSN + "], " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + " " + p.level), this.state = s.KEY_LOADING, this.fragCurrent = p, w = this.keyLoader.load(p).then(function(G) {
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
                  return this.log("Loading part sn: " + p.sn + " p: " + K.index + " cc: " + p.cc + " of playlist [" + D.startSN + "-" + D.endSN + "] parts [0-" + N + "-" + (U.length - 1) + "] " + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + p.level + ", target: " + parseFloat(R.toFixed(3))), this.nextLoadPosition = K.start + K.duration, this.state = s.FRAG_LOADING, this.hls.trigger(P.Events.FRAG_LOADING, {
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
            this.log("Loading fragment " + p.sn + " cc: " + p.cc + " " + (D ? "of [" + D.startSN + "-" + D.endSN + "] " : "") + (this.logPrefix === "[stream-controller]" ? "level" : "track") + ": " + p.level + ", target: " + parseFloat(R.toFixed(3))), (0, F.isFiniteNumber)(p.sn) && !this.bitrateTest && (this.nextLoadPosition = p.start + p.duration), this.state = s.FRAG_LOADING, this.hls.trigger(P.Events.FRAG_LOADING, {
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
            if (!D || this.state !== s.PARSING) {
              !this.fragCurrent && this.state !== s.STOPPED && this.state !== s.ERROR && (this.state = s.IDLE);
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
            if (!(!p || this.state !== s.PARSING)) {
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
              if (p.hasProgramDateTime && (this.log("Live playlist, switching playlist, load frag with same PDT: " + R.programDateTime), b = (0, c.findFragmentByPDT)(D, R.endProgramDateTime, this.config.maxFragLookUpTolerance)), !b) {
                var O = R.sn + 1;
                if (O >= p.startSN && O <= p.endSN) {
                  var M = D[O - p.startSN];
                  R.cc === M.cc && (b = M, this.log("Live playlist, switching playlist, load frag with next SN: " + b.sn));
                }
                b || (b = (0, c.findFragWithCC)(D, R.cc), b && this.log("Live playlist, switching playlist, load frag with same CC: " + b.sn));
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
              W = (0, c.findFragmentByPTS)(O, M, p, G);
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
            (!this.fragCurrent || !this.fragContextChanged(p) && this.state !== s.FRAG_LOADING_WAITING_RETRY) && (this.state = s.IDLE);
          }, d.onFragmentOrKeyLoadError = function(p, D) {
            if (D.fatal) {
              this.stopLoad(), this.state = s.ERROR;
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
                this.warn("Fragment " + O.sn + " of " + p + " " + O.level + " failed to load, retrying in " + w + "ms"), this.retryDate = self.performance.now() + w, this.fragLoadError++, this.state = s.FRAG_LOADING_WAITING_RETRY;
              } else
                D.levelRetry ? (p === a.PlaylistLevelType.AUDIO && (this.fragCurrent = null), this.fragLoadError = 0, this.state = s.IDLE) : (k.logger.error(D.details + " reaches max retry, redispatch as fatal ..."), D.fatal = !0, this.hls.stopLoad(), this.state = s.ERROR);
            }
          }, d.afterBufferFlushed = function(p, D, R) {
            if (!!p) {
              var b = I.BufferHelper.getBuffered(p);
              this.fragmentTracker.detectEvictedFragments(D, b, R), this.state === s.ENDED && this.resetLoadingState();
            }
          }, d.resetLoadingState = function() {
            this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state = s.IDLE;
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
            w || (this.warn("Found no media in fragment " + p.sn + " of level " + R.id + " resetting transmuxer to fallback to playlist timing"), this.resetTransmuxer()), this.state = s.PARSED, this.hls.trigger(P.Events.FRAG_PARSED, {
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
          default: () => c
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts"), I = S("./src/errors.ts"), k = S("./src/utils/buffer-helper.ts"), P = S("./src/utils/mediasource-helper.ts"), L = S("./src/loader/fragment.ts"), x = S("./src/controller/buffer-operation-queue.ts"), _ = (0, P.getMediaSource)(), T = /([ha]vc.)(?:\.[^.,]+)+/, c = /* @__PURE__ */ function() {
          function y(n) {
            var o = this;
            this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.appendError = 0, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this._onMediaSourceOpen = function() {
              var a = o.hls, i = o.media, g = o.mediaSource;
              C.logger.log("[buffer-controller]: Media source opened"), i && (o.updateMediaElementDuration(), a.trigger(A.Events.MEDIA_ATTACHED, {
                media: i
              })), g && g.removeEventListener("sourceopen", o._onMediaSourceOpen), o.checkPendingTracks();
            }, this._onMediaSourceClose = function() {
              C.logger.log("[buffer-controller]: Media source closed");
            }, this._onMediaSourceEnded = function() {
              C.logger.log("[buffer-controller]: Media source ended");
            }, this.hls = n, this._initSourceBuffer(), this.registerListeners();
          }
          var m = y.prototype;
          return m.hasSourceTypes = function() {
            return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
          }, m.destroy = function() {
            this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = null;
          }, m.registerListeners = function() {
            var o = this.hls;
            o.on(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), o.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), o.on(A.Events.MANIFEST_PARSED, this.onManifestParsed, this), o.on(A.Events.BUFFER_RESET, this.onBufferReset, this), o.on(A.Events.BUFFER_APPENDING, this.onBufferAppending, this), o.on(A.Events.BUFFER_CODECS, this.onBufferCodecs, this), o.on(A.Events.BUFFER_EOS, this.onBufferEos, this), o.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), o.on(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this), o.on(A.Events.FRAG_PARSED, this.onFragParsed, this), o.on(A.Events.FRAG_CHANGED, this.onFragChanged, this);
          }, m.unregisterListeners = function() {
            var o = this.hls;
            o.off(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), o.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), o.off(A.Events.MANIFEST_PARSED, this.onManifestParsed, this), o.off(A.Events.BUFFER_RESET, this.onBufferReset, this), o.off(A.Events.BUFFER_APPENDING, this.onBufferAppending, this), o.off(A.Events.BUFFER_CODECS, this.onBufferCodecs, this), o.off(A.Events.BUFFER_EOS, this.onBufferEos, this), o.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), o.off(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this), o.off(A.Events.FRAG_PARSED, this.onFragParsed, this), o.off(A.Events.FRAG_CHANGED, this.onFragChanged, this);
          }, m._initSourceBuffer = function() {
            this.sourceBuffer = {}, this.operationQueue = new x.default(this.sourceBuffer), this.listeners = {
              audio: [],
              video: [],
              audiovideo: []
            }, this.lastMpegAudioChunk = null;
          }, m.onManifestParsed = function(o, a) {
            var i = 2;
            (a.audio && !a.video || !a.altAudio) && (i = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = i, this.details = null, C.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected");
          }, m.onMediaAttaching = function(o, a) {
            var i = this.media = a.media;
            if (i && _) {
              var g = this.mediaSource = new _();
              g.addEventListener("sourceopen", this._onMediaSourceOpen), g.addEventListener("sourceended", this._onMediaSourceEnded), g.addEventListener("sourceclose", this._onMediaSourceClose), i.src = self.URL.createObjectURL(g), this._objectUrl = i.src;
            }
          }, m.onMediaDetaching = function() {
            var o = this.media, a = this.mediaSource, i = this._objectUrl;
            if (a) {
              if (C.logger.log("[buffer-controller]: media source detaching"), a.readyState === "open")
                try {
                  a.endOfStream();
                } catch (g) {
                  C.logger.warn("[buffer-controller]: onMediaDetaching: " + g.message + " while calling endOfStream");
                }
              this.onBufferReset(), a.removeEventListener("sourceopen", this._onMediaSourceOpen), a.removeEventListener("sourceended", this._onMediaSourceEnded), a.removeEventListener("sourceclose", this._onMediaSourceClose), o && (i && self.URL.revokeObjectURL(i), o.src === i ? (o.removeAttribute("src"), o.load()) : C.logger.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
            }
            this.hls.trigger(A.Events.MEDIA_DETACHED, void 0);
          }, m.onBufferReset = function() {
            var o = this;
            this.getSourceBufferTypes().forEach(function(a) {
              var i = o.sourceBuffer[a];
              try {
                i && (o.removeBufferListeners(a), o.mediaSource && o.mediaSource.removeSourceBuffer(i), o.sourceBuffer[a] = void 0);
              } catch (g) {
                C.logger.warn("[buffer-controller]: Failed to reset the " + a + " buffer", g);
              }
            }), this._initSourceBuffer();
          }, m.onBufferCodecs = function(o, a) {
            var i = this, g = this.getSourceBufferTypes().length;
            Object.keys(a).forEach(function(l) {
              if (g) {
                var r = i.tracks[l];
                if (r && typeof r.buffer.changeType == "function") {
                  var u = a[l], v = u.id, f = u.codec, s = u.levelCodec, t = u.container, h = u.metadata, e = (r.levelCodec || r.codec).replace(T, "$1"), d = (s || f).replace(T, "$1");
                  if (e !== d) {
                    var E = t + ";codecs=" + (s || f);
                    i.appendChangeType(l, E), C.logger.log("[buffer-controller]: switching codec " + e + " to " + d), i.tracks[l] = {
                      buffer: r.buffer,
                      codec: f,
                      container: t,
                      levelCodec: s,
                      metadata: h,
                      id: v
                    };
                  }
                }
              } else
                i.pendingTracks[l] = a[l];
            }), !g && (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks());
          }, m.appendChangeType = function(o, a) {
            var i = this, g = this.operationQueue, l = {
              execute: function() {
                var u = i.sourceBuffer[o];
                u && (C.logger.log("[buffer-controller]: changing " + o + " sourceBuffer type to " + a), u.changeType(a)), g.shiftAndExecuteNext(o);
              },
              onStart: function() {
              },
              onComplete: function() {
              },
              onError: function(u) {
                C.logger.warn("[buffer-controller]: Failed to change " + o + " SourceBuffer type", u);
              }
            };
            g.append(l, o);
          }, m.onBufferAppending = function(o, a) {
            var i = this, g = this.hls, l = this.operationQueue, r = this.tracks, u = a.data, v = a.type, f = a.frag, s = a.part, t = a.chunkMeta, h = t.buffering[v], e = self.performance.now();
            h.start = e;
            var d = f.stats.buffering, E = s ? s.stats.buffering : null;
            d.start === 0 && (d.start = e), E && E.start === 0 && (E.start = e);
            var p = r.audio, D = !1;
            v === "audio" && (p == null ? void 0 : p.container) === "audio/mpeg" && (D = !this.lastMpegAudioChunk || t.id === 1 || this.lastMpegAudioChunk.sn !== t.sn, this.lastMpegAudioChunk = t);
            var R = f.start, b = {
              execute: function() {
                if (h.executeStart = self.performance.now(), D) {
                  var M = i.sourceBuffer[v];
                  if (M) {
                    var w = R - M.timestampOffset;
                    Math.abs(w) >= 0.1 && (C.logger.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to " + R + " (delta: " + w + ") sn: " + f.sn + ")"), M.timestampOffset = R);
                  }
                }
                i.appendExecutor(u, v);
              },
              onStart: function() {
              },
              onComplete: function() {
                var M = self.performance.now();
                h.executeEnd = h.end = M, d.first === 0 && (d.first = M), E && E.first === 0 && (E.first = M);
                var w = i.sourceBuffer, U = {};
                for (var N in w)
                  U[N] = k.BufferHelper.getBuffered(w[N]);
                i.appendError = 0, i.hls.trigger(A.Events.BUFFER_APPENDED, {
                  type: v,
                  frag: f,
                  part: s,
                  chunkMeta: t,
                  parent: f.type,
                  timeRanges: U
                });
              },
              onError: function(M) {
                C.logger.error("[buffer-controller]: Error encountered while trying to append to the " + v + " SourceBuffer", M);
                var w = {
                  type: I.ErrorTypes.MEDIA_ERROR,
                  parent: f.type,
                  details: I.ErrorDetails.BUFFER_APPEND_ERROR,
                  err: M,
                  fatal: !1
                };
                M.code === DOMException.QUOTA_EXCEEDED_ERR ? w.details = I.ErrorDetails.BUFFER_FULL_ERROR : (i.appendError++, w.details = I.ErrorDetails.BUFFER_APPEND_ERROR, i.appendError > g.config.appendErrorMaxRetry && (C.logger.error("[buffer-controller]: Failed " + g.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), w.fatal = !0, g.stopLoad())), g.trigger(A.Events.ERROR, w);
              }
            };
            l.append(b, v);
          }, m.onBufferFlushing = function(o, a) {
            var i = this, g = this.operationQueue, l = function(u) {
              return {
                execute: i.removeExecutor.bind(i, u, a.startOffset, a.endOffset),
                onStart: function() {
                },
                onComplete: function() {
                  i.hls.trigger(A.Events.BUFFER_FLUSHED, {
                    type: u
                  });
                },
                onError: function(f) {
                  C.logger.warn("[buffer-controller]: Failed to remove from " + u + " SourceBuffer", f);
                }
              };
            };
            a.type ? g.append(l(a.type), a.type) : this.getSourceBufferTypes().forEach(function(r) {
              g.append(l(r), r);
            });
          }, m.onFragParsed = function(o, a) {
            var i = this, g = a.frag, l = a.part, r = [], u = l ? l.elementaryStreams : g.elementaryStreams;
            u[L.ElementaryStreamTypes.AUDIOVIDEO] ? r.push("audiovideo") : (u[L.ElementaryStreamTypes.AUDIO] && r.push("audio"), u[L.ElementaryStreamTypes.VIDEO] && r.push("video"));
            var v = function() {
              var s = self.performance.now();
              g.stats.buffering.end = s, l && (l.stats.buffering.end = s);
              var t = l ? l.stats : g.stats;
              i.hls.trigger(A.Events.FRAG_BUFFERED, {
                frag: g,
                part: l,
                stats: t,
                id: g.type
              });
            };
            r.length === 0 && C.logger.warn("Fragments must have at least one ElementaryStreamType set. type: " + g.type + " level: " + g.level + " sn: " + g.sn), this.blockBuffers(v, r);
          }, m.onFragChanged = function(o, a) {
            this.flushBackBuffer();
          }, m.onBufferEos = function(o, a) {
            var i = this, g = this.getSourceBufferTypes().reduce(function(l, r) {
              var u = i.sourceBuffer[r];
              return u && (!a.type || a.type === r) && (u.ending = !0, u.ended || (u.ended = !0, C.logger.log("[buffer-controller]: " + r + " sourceBuffer now EOS"))), l && !!(!u || u.ended);
            }, !0);
            g && (C.logger.log("[buffer-controller]: Queueing mediaSource.endOfStream()"), this.blockBuffers(function() {
              i.getSourceBufferTypes().forEach(function(r) {
                var u = i.sourceBuffer[r];
                u && (u.ending = !1);
              });
              var l = i.mediaSource;
              if (!l || l.readyState !== "open") {
                l && C.logger.info("[buffer-controller]: Could not call mediaSource.endOfStream(). mediaSource.readyState: " + l.readyState);
                return;
              }
              C.logger.log("[buffer-controller]: Calling mediaSource.endOfStream()"), l.endOfStream();
            }));
          }, m.onLevelUpdated = function(o, a) {
            var i = a.details;
            !i.fragments.length || (this.details = i, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration());
          }, m.flushBackBuffer = function() {
            var o = this.hls, a = this.details, i = this.media, g = this.sourceBuffer;
            if (!(!i || a === null)) {
              var l = this.getSourceBufferTypes();
              if (!!l.length) {
                var r = a.live && o.config.liveBackBufferLength !== null ? o.config.liveBackBufferLength : o.config.backBufferLength;
                if (!(!(0, F.isFiniteNumber)(r) || r < 0)) {
                  var u = i.currentTime, v = a.levelTargetDuration, f = Math.max(r, v), s = Math.floor(u / v) * v - f;
                  l.forEach(function(t) {
                    var h = g[t];
                    if (h) {
                      var e = k.BufferHelper.getBuffered(h);
                      if (e.length > 0 && s > e.start(0)) {
                        if (o.trigger(A.Events.BACK_BUFFER_REACHED, {
                          bufferEnd: s
                        }), a.live)
                          o.trigger(A.Events.LIVE_BACK_BUFFER_REACHED, {
                            bufferEnd: s
                          });
                        else if (h.ended && e.end(e.length - 1) - u < v * 2) {
                          C.logger.info("[buffer-controller]: Cannot flush " + t + " back buffer while SourceBuffer is in ended state");
                          return;
                        }
                        o.trigger(A.Events.BUFFER_FLUSHING, {
                          startOffset: 0,
                          endOffset: s,
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
              var o = this.details, a = this.hls, i = this.media, g = this.mediaSource, l = o.fragments[0].start + o.totalduration, r = i.duration, u = (0, F.isFiniteNumber)(g.duration) ? g.duration : 0;
              o.live && a.config.liveDurationInfinity ? (C.logger.log("[buffer-controller]: Media Source duration is set to Infinity"), g.duration = 1 / 0, this.updateSeekableRange(o)) : (l > u && l > r || !(0, F.isFiniteNumber)(r)) && (C.logger.log("[buffer-controller]: Updating Media Source duration to " + l.toFixed(3)), g.duration = l);
            }
          }, m.updateSeekableRange = function(o) {
            var a = this.mediaSource, i = o.fragments, g = i.length;
            if (g && o.live && a !== null && a !== void 0 && a.setLiveSeekableRange) {
              var l = Math.max(0, i[0].start), r = Math.max(l, l + o.totalduration);
              a.setLiveSeekableRange(l, r);
            }
          }, m.checkPendingTracks = function() {
            var o = this.bufferCodecEventsExpected, a = this.operationQueue, i = this.pendingTracks, g = Object.keys(i).length;
            if (g && !o || g === 2) {
              this.createSourceBuffers(i), this.pendingTracks = {};
              var l = this.getSourceBufferTypes();
              if (l.length === 0) {
                this.hls.trigger(A.Events.ERROR, {
                  type: I.ErrorTypes.MEDIA_ERROR,
                  details: I.ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                  fatal: !0,
                  reason: "could not create source buffer for media codec(s)"
                });
                return;
              }
              l.forEach(function(r) {
                a.executeNext(r);
              });
            }
          }, m.createSourceBuffers = function(o) {
            var a = this.sourceBuffer, i = this.mediaSource;
            if (!i)
              throw Error("createSourceBuffers called when mediaSource was null");
            var g = 0;
            for (var l in o)
              if (!a[l]) {
                var r = o[l];
                if (!r)
                  throw Error("source buffer exists for track " + l + ", however track does not");
                var u = r.levelCodec || r.codec, v = r.container + ";codecs=" + u;
                C.logger.log("[buffer-controller]: creating sourceBuffer(" + v + ")");
                try {
                  var f = a[l] = i.addSourceBuffer(v), s = l;
                  this.addBufferListener(s, "updatestart", this._onSBUpdateStart), this.addBufferListener(s, "updateend", this._onSBUpdateEnd), this.addBufferListener(s, "error", this._onSBUpdateError), this.tracks[l] = {
                    buffer: f,
                    codec: u,
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
          }, m._onSBUpdateStart = function(o) {
            var a = this.operationQueue, i = a.current(o);
            i.onStart();
          }, m._onSBUpdateEnd = function(o) {
            var a = this.operationQueue, i = a.current(o);
            i.onComplete(), a.shiftAndExecuteNext(o);
          }, m._onSBUpdateError = function(o, a) {
            C.logger.error("[buffer-controller]: " + o + " SourceBuffer error", a), this.hls.trigger(A.Events.ERROR, {
              type: I.ErrorTypes.MEDIA_ERROR,
              details: I.ErrorDetails.BUFFER_APPENDING_ERROR,
              fatal: !1
            });
            var i = this.operationQueue.current(o);
            i && i.onError(a);
          }, m.removeExecutor = function(o, a, i) {
            var g = this.media, l = this.mediaSource, r = this.operationQueue, u = this.sourceBuffer, v = u[o];
            if (!g || !l || !v) {
              C.logger.warn("[buffer-controller]: Attempting to remove from the " + o + " SourceBuffer, but it does not exist"), r.shiftAndExecuteNext(o);
              return;
            }
            var f = (0, F.isFiniteNumber)(g.duration) ? g.duration : 1 / 0, s = (0, F.isFiniteNumber)(l.duration) ? l.duration : 1 / 0, t = Math.max(0, a), h = Math.min(i, f, s);
            h > t && !v.ending ? (v.ended = !1, C.logger.log("[buffer-controller]: Removing [" + t + "," + h + "] from the " + o + " SourceBuffer"), console.assert(!v.updating, o + " sourceBuffer must not be updating"), v.remove(t, h)) : r.shiftAndExecuteNext(o);
          }, m.appendExecutor = function(o, a) {
            var i = this.operationQueue, g = this.sourceBuffer, l = g[a];
            if (!l) {
              C.logger.warn("[buffer-controller]: Attempting to append to the " + a + " SourceBuffer, but it does not exist"), i.shiftAndExecuteNext(a);
              return;
            }
            l.ended = !1, console.assert(!l.updating, a + " sourceBuffer must not be updating"), l.appendBuffer(o);
          }, m.blockBuffers = function(o, a) {
            var i = this;
            if (a === void 0 && (a = this.getSourceBufferTypes()), !a.length) {
              C.logger.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"), Promise.resolve().then(o);
              return;
            }
            var g = this.operationQueue, l = a.map(function(r) {
              return g.appendBlocker(r);
            });
            Promise.all(l).then(function() {
              o(), a.forEach(function(r) {
                var u = i.sourceBuffer[r];
                (!u || !u.updating) && g.shiftAndExecuteNext(r);
              });
            });
          }, m.getSourceBufferTypes = function() {
            return Object.keys(this.sourceBuffer);
          }, m.addBufferListener = function(o, a, i) {
            var g = this.sourceBuffer[o];
            if (!!g) {
              var l = i.bind(this, o);
              this.listeners[o].push({
                event: a,
                listener: l
              }), g.addEventListener(a, l);
            }
          }, m.removeBufferListeners = function(o) {
            var a = this.sourceBuffer[o];
            !a || this.listeners[o].forEach(function(i) {
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
              var c = T[0];
              try {
                c.execute();
              } catch (y) {
                F.logger.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"), c.onError(y), (!_ || !_.updating) && (T.shift(), this.executeNext(P));
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
            var c = _[T];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(x, I(c.key), c);
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
            var c = T.call(x, _ || "default");
            if (typeof c != "object")
              return c;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (_ === "string" ? String : Number)(x);
        }
        var P = /* @__PURE__ */ function() {
          function x(T) {
            this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.hls = void 0, this.streamController = void 0, this.clientRect = void 0, this.hls = T, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
          }
          var _ = x.prototype;
          return _.setStreamController = function(c) {
            this.streamController = c;
          }, _.destroy = function() {
            this.unregisterListener(), this.hls.config.capLevelToPlayerSize && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
          }, _.registerListeners = function() {
            var c = this.hls;
            c.on(F.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), c.on(F.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), c.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), c.on(F.Events.BUFFER_CODECS, this.onBufferCodecs, this), c.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
          }, _.unregisterListener = function() {
            var c = this.hls;
            c.off(F.Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), c.off(F.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), c.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), c.off(F.Events.BUFFER_CODECS, this.onBufferCodecs, this), c.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this);
          }, _.onFpsDropLevelCapping = function(c, y) {
            x.isLevelAllowed(y.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(y.droppedLevel);
          }, _.onMediaAttaching = function(c, y) {
            this.media = y.media instanceof HTMLVideoElement ? y.media : null, this.clientRect = null;
          }, _.onManifestParsed = function(c, y) {
            var m = this.hls;
            this.restrictedLevels = [], this.firstLevel = y.firstLevel, m.config.capLevelToPlayerSize && y.video && this.startCapping();
          }, _.onBufferCodecs = function(c, y) {
            var m = this.hls;
            m.config.capLevelToPlayerSize && y.video && this.startCapping();
          }, _.onMediaDetaching = function() {
            this.stopCapping();
          }, _.detectPlayerSize = function() {
            if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
              var c = this.hls.levels;
              if (c.length) {
                var y = this.hls;
                y.autoLevelCapping = this.getMaxLevel(c.length - 1), y.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = y.autoLevelCapping;
              }
            }
          }, _.getMaxLevel = function(c) {
            var y = this, m = this.hls.levels;
            if (!m.length)
              return -1;
            var n = m.filter(function(o, a) {
              return x.isLevelAllowed(a, y.restrictedLevels) && a <= c;
            });
            return this.clientRect = null, x.getMaxLevelByMediaSize(n, this.mediaWidth, this.mediaHeight);
          }, _.startCapping = function() {
            this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
          }, _.stopCapping = function() {
            this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
          }, _.getDimensions = function() {
            if (this.clientRect)
              return this.clientRect;
            var c = this.media, y = {
              width: 0,
              height: 0
            };
            if (c) {
              var m = c.getBoundingClientRect();
              y.width = m.width, y.height = m.height, !y.width && !y.height && (y.width = m.right - m.left || c.width || 0, y.height = m.bottom - m.top || c.height || 0);
            }
            return this.clientRect = y, y;
          }, x.isLevelAllowed = function(c, y) {
            return y === void 0 && (y = []), y.indexOf(c) === -1;
          }, x.getMaxLevelByMediaSize = function(c, y, m) {
            if (!c || !c.length)
              return -1;
            for (var n = function(l, r) {
              return r ? l.width !== r.width || l.height !== r.height : !0;
            }, o = c.length - 1, a = 0; a < c.length; a += 1) {
              var i = c[a];
              if ((i.width >= y || i.height >= m) && n(i, c[a + 1])) {
                o = a;
                break;
              }
            }
            return o;
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
              var c = 1;
              if (!this.hls.config.ignoreDevicePixelRatio)
                try {
                  c = self.devicePixelRatio;
                } catch (y) {
                }
              return c;
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
        function k(n, o) {
          for (var a = 0; a < o.length; a++) {
            var i = o[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, L(i.key), i);
          }
        }
        function P(n, o, a) {
          return o && k(n.prototype, o), a && k(n, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        }
        function L(n) {
          var o = x(n, "string");
          return typeof o == "symbol" ? o : String(o);
        }
        function x(n, o) {
          if (typeof n != "object" || n === null)
            return n;
          var a = n[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(n, o || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (o === "string" ? String : Number)(n);
        }
        function _(n, o) {
          var a = typeof Symbol != "undefined" && n[Symbol.iterator] || n["@@iterator"];
          if (a)
            return (a = a.call(n)).next.bind(a);
          if (Array.isArray(n) || (a = T(n)) || o && n && typeof n.length == "number") {
            a && (n = a);
            var i = 0;
            return function() {
              return i >= n.length ? { done: !0 } : { done: !1, value: n[i++] };
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        function T(n, o) {
          if (!!n) {
            if (typeof n == "string")
              return c(n, o);
            var a = Object.prototype.toString.call(n).slice(8, -1);
            if (a === "Object" && n.constructor && (a = n.constructor.name), a === "Map" || a === "Set")
              return Array.from(n);
            if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
              return c(n, o);
          }
        }
        function c(n, o) {
          (o == null || o > n.length) && (o = n.length);
          for (var a = 0, i = new Array(o); a < o; a++)
            i[a] = n[a];
          return i;
        }
        function y() {
          return y = Object.assign ? Object.assign.bind() : function(n) {
            for (var o = 1; o < arguments.length; o++) {
              var a = arguments[o];
              for (var i in a)
                Object.prototype.hasOwnProperty.call(a, i) && (n[i] = a[i]);
            }
            return n;
          }, y.apply(this, arguments);
        }
        var m = /* @__PURE__ */ function() {
          function n(a) {
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
              } catch (u) {
                I.logger.warn("Could not generate manifest CMCD data.", u);
              }
            }, this.applyFragmentData = function(r) {
              try {
                var u = r.frag, v = i.hls.levels[u.level], f = i.getObjectType(u), s = {
                  d: u.duration * 1e3,
                  ot: f
                };
                (f === A.CMCDObjectType.VIDEO || f === A.CMCDObjectType.AUDIO || f == A.CMCDObjectType.MUXED) && (s.br = v.bitrate / 1e3, s.tb = i.getTopBandwidth(f) / 1e3, s.bl = i.getBufferLength(f)), i.apply(r, s);
              } catch (t) {
                I.logger.warn("Could not generate segment CMCD data.", t);
              }
            }, this.hls = a;
            var g = this.config = a.config, l = g.cmcd;
            l != null && (g.pLoader = this.createPlaylistLoader(), g.fLoader = this.createFragmentLoader(), this.sid = l.sessionId || n.uuid(), this.cid = l.contentId, this.useHeaders = l.useHeaders === !0, this.registerListeners());
          }
          var o = n.prototype;
          return o.registerListeners = function() {
            var i = this.hls;
            i.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.on(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), i.on(F.Events.BUFFER_CREATED, this.onBufferCreated, this);
          }, o.unregisterListeners = function() {
            var i = this.hls;
            i.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.off(F.Events.MEDIA_DETACHED, this.onMediaDetached, this), i.off(F.Events.BUFFER_CREATED, this.onBufferCreated, this), this.onMediaDetached();
          }, o.destroy = function() {
            this.unregisterListeners(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null;
          }, o.onMediaAttached = function(i, g) {
            this.media = g.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying);
          }, o.onMediaDetached = function() {
            !this.media || (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null);
          }, o.onBufferCreated = function(i, g) {
            var l, r;
            this.audioBuffer = (l = g.tracks.audio) === null || l === void 0 ? void 0 : l.buffer, this.videoBuffer = (r = g.tracks.video) === null || r === void 0 ? void 0 : r.buffer;
          }, o.createData = function() {
            var i;
            return {
              v: A.CMCDVersion,
              sf: A.CMCDStreamingFormat.HLS,
              sid: this.sid,
              cid: this.cid,
              pr: (i = this.media) === null || i === void 0 ? void 0 : i.playbackRate,
              mtp: this.hls.bandwidthEstimate / 1e3
            };
          }, o.apply = function(i, g) {
            g === void 0 && (g = {}), y(g, this.createData());
            var l = g.ot === A.CMCDObjectType.INIT || g.ot === A.CMCDObjectType.VIDEO || g.ot === A.CMCDObjectType.MUXED;
            if (this.starved && l && (g.bs = !0, g.su = !0, this.starved = !1), g.su == null && (g.su = this.buffering), this.useHeaders) {
              var r = n.toHeaders(g);
              if (!Object.keys(r).length)
                return;
              i.headers || (i.headers = {}), y(i.headers, r);
            } else {
              var u = n.toQuery(g);
              if (!u)
                return;
              i.url = n.appendQueryToUri(i.url, u);
            }
          }, o.getObjectType = function(i) {
            var g = i.type;
            if (g === "subtitle")
              return A.CMCDObjectType.TIMED_TEXT;
            if (i.sn === "initSegment")
              return A.CMCDObjectType.INIT;
            if (g === "audio")
              return A.CMCDObjectType.AUDIO;
            if (g === "main")
              return this.hls.audioTracks.length ? A.CMCDObjectType.VIDEO : A.CMCDObjectType.MUXED;
          }, o.getTopBandwidth = function(i) {
            var g = 0, l, r = this.hls;
            if (i === A.CMCDObjectType.AUDIO)
              l = r.audioTracks;
            else {
              var u = r.maxAutoLevel, v = u > -1 ? u + 1 : r.levels.length;
              l = r.levels.slice(0, v);
            }
            for (var f = _(l), s; !(s = f()).done; ) {
              var t = s.value;
              t.bitrate > g && (g = t.bitrate);
            }
            return g > 0 ? g : NaN;
          }, o.getBufferLength = function(i) {
            var g = this.hls.media, l = i === A.CMCDObjectType.AUDIO ? this.audioBuffer : this.videoBuffer;
            if (!l || !g)
              return NaN;
            var r = C.BufferHelper.bufferInfo(l, g.currentTime, this.config.maxBufferHole);
            return r.len * 1e3;
          }, o.createPlaylistLoader = function() {
            var i = this.config.pLoader, g = this.applyPlaylistData, l = i || this.config.loader;
            return /* @__PURE__ */ function() {
              function r(v) {
                this.loader = void 0, this.loader = new l(v);
              }
              var u = r.prototype;
              return u.destroy = function() {
                this.loader.destroy();
              }, u.abort = function() {
                this.loader.abort();
              }, u.load = function(f, s, t) {
                g(f), this.loader.load(f, s, t);
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
          }, o.createFragmentLoader = function() {
            var i = this.config.fLoader, g = this.applyFragmentData, l = i || this.config.loader;
            return /* @__PURE__ */ function() {
              function r(v) {
                this.loader = void 0, this.loader = new l(v);
              }
              var u = r.prototype;
              return u.destroy = function() {
                this.loader.destroy();
              }, u.abort = function() {
                this.loader.abort();
              }, u.load = function(f, s, t) {
                g(f), this.loader.load(f, s, t);
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
          }, n.uuid = function() {
            var i = URL.createObjectURL(new Blob()), g = i.toString();
            return URL.revokeObjectURL(i), g.slice(g.lastIndexOf("/") + 1);
          }, n.serialize = function(i) {
            for (var g = [], l = function(b) {
              return !Number.isNaN(b) && b != null && b !== "" && b !== !1;
            }, r = function(b) {
              return Math.round(b);
            }, u = function(b) {
              return r(b / 100) * 100;
            }, v = function(b) {
              return encodeURIComponent(b);
            }, f = {
              br: r,
              d: r,
              bl: u,
              dl: u,
              mtp: u,
              nor: v,
              rtp: u,
              tb: r
            }, s = Object.keys(i || {}).sort(), t = _(s), h; !(h = t()).done; ) {
              var e = h.value, d = i[e];
              if (!!l(d) && !(e === "v" && d === 1) && !(e == "pr" && d === 1)) {
                var E = f[e];
                E && (d = E(d));
                var p = typeof d, D = void 0;
                e === "ot" || e === "sf" || e === "st" ? D = e + "=" + d : p === "boolean" ? D = e : p === "number" ? D = e + "=" + d : D = e + "=" + JSON.stringify(d), g.push(D);
              }
            }
            return g.join(",");
          }, n.toHeaders = function(i) {
            for (var g = Object.keys(i), l = {}, r = ["Object", "Request", "Session", "Status"], u = [{}, {}, {}, {}], v = {
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
            }, f = 0, s = g; f < s.length; f++) {
              var t = s[f], h = v[t] != null ? v[t] : 1;
              u[h][t] = i[t];
            }
            for (var e = 0; e < u.length; e++) {
              var d = n.serialize(u[e]);
              d && (l["CMCD-" + r[e]] = d);
            }
            return l;
          }, n.toQuery = function(i) {
            return "CMCD=" + encodeURIComponent(n.serialize(i));
          }, n.appendQueryToUri = function(i, g) {
            if (!g)
              return i;
            var l = i.includes("?") ? "&" : "?";
            return "" + i + l + g;
          }, n;
        }();
      },
      "./src/controller/eme-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => f
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/utils/logger.ts"), I = S("./src/utils/mediakeys-helper.ts"), k = S("./src/utils/keysystem-util.ts"), P = S("./src/utils/numeric-encoding-utils.ts"), L = S("./src/loader/level-key.ts"), x = S("./src/utils/hex.ts"), _ = S("./src/utils/mp4-tools.ts"), T = S("./node_modules/eventemitter3/index.js"), c = /* @__PURE__ */ S.n(T);
        function y(s, t) {
          s.prototype = Object.create(t.prototype), s.prototype.constructor = s, i(s, t);
        }
        function m(s) {
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
              return n(e, arguments, g(this).constructor);
            }
            return d.prototype = Object.create(e.prototype, { constructor: { value: d, enumerable: !1, writable: !0, configurable: !0 } }), i(d, e);
          }, m(s);
        }
        function n(s, t, h) {
          return o() ? n = Reflect.construct.bind() : n = function(d, E, p) {
            var D = [null];
            D.push.apply(D, E);
            var R = Function.bind.apply(d, D), b = new R();
            return p && i(b, p.prototype), b;
          }, n.apply(null, arguments);
        }
        function o() {
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
        function a(s) {
          return Function.toString.call(s).indexOf("[native code]") !== -1;
        }
        function i(s, t) {
          return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, d) {
            return e.__proto__ = d, e;
          }, i(s, t);
        }
        function g(s) {
          return g = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(h) {
            return h.__proto__ || Object.getPrototypeOf(h);
          }, g(s);
        }
        var l = 3, r = "[eme]", u = /* @__PURE__ */ function() {
          function s(h) {
            this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = s.CDMCleanupPromise ? [s.CDMCleanupPromise] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = C.logger.debug.bind(C.logger, r), this.log = C.logger.log.bind(C.logger, r), this.warn = C.logger.warn.bind(C.logger, r), this.error = C.logger.error.bind(C.logger, r), this.hls = h, this.config = h.config, this.registerListeners();
          }
          var t = s.prototype;
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
            var N = new (c())();
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
                  } else if (E._requestLicenseFailureCount++, E._requestLicenseFailureCount > l || b.status >= 400 && b.status < 500)
                    D(new v({
                      type: A.ErrorTypes.KEY_SYSTEM_ERROR,
                      details: A.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                      fatal: !0,
                      networkDetails: b
                    }, "License Request XHR failed (" + R + "). Status: " + b.status + " (" + b.statusText + ")"));
                  else {
                    var w = l - E._requestLicenseFailureCount + 1;
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
            s.CDMCleanupPromise = Promise.all(E.map(function(D) {
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
          }, s;
        }();
        u.CDMCleanupPromise = void 0;
        var v = /* @__PURE__ */ function(s) {
          y(t, s);
          function t(h, e) {
            var d;
            return d = s.call(this, e) || this, d.data = void 0, d.data = h, h.err = h.error, d;
          }
          return t;
        }(/* @__PURE__ */ m(Error));
        const f = u;
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
              var c = _.media instanceof self.HTMLVideoElement ? _.media : null;
              this.media = c, c && typeof c.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), T.fpsDroppedMonitoringPeriod);
            }
          }, P.checkFPS = function(x, _, T) {
            var c = performance.now();
            if (_) {
              if (this.lastTime) {
                var y = c - this.lastTime, m = T - this.lastDroppedFrames, n = _ - this.lastDecodedFrames, o = 1e3 * m / y, a = this.hls;
                if (a.trigger(F.Events.FPS_DROP, {
                  currentDropped: m,
                  currentDecoded: n,
                  totalDroppedFrames: T
                }), o > 0 && m > a.config.fpsDroppedMonitoringThreshold * n) {
                  var i = a.currentLevel;
                  A.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + i), i > 0 && (a.autoLevelCapping === -1 || a.autoLevelCapping >= i) && (i = i - 1, a.trigger(F.Events.FPS_DROP_LEVEL_CAPPING, {
                    level: i,
                    droppedLevel: a.currentLevel
                  }), a.autoLevelCapping = i, this.streamController.nextLevelSwitch());
                }
              }
              this.lastTime = c, this.lastDroppedFrames = T, this.lastDecodedFrames = _;
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
          var c = x[0].programDateTime;
          if (_ < (c || 0))
            return null;
          var y = x[x.length - 1].endProgramDateTime;
          if (_ >= (y || 0))
            return null;
          T = T || 0;
          for (var m = 0; m < x.length; ++m) {
            var n = x[m];
            if (P(_, T, n))
              return n;
          }
          return null;
        }
        function I(x, _, T, c) {
          T === void 0 && (T = 0), c === void 0 && (c = 0);
          var y = null;
          if (x ? y = _[x.sn - _[0].sn + 1] || null : T === 0 && _[0].start === 0 && (y = _[0]), y && k(T, c, y) === 0)
            return y;
          var m = A.default.search(_, k.bind(null, T, c));
          return m && (m !== x || !y) ? m : y;
        }
        function k(x, _, T) {
          if (x === void 0 && (x = 0), _ === void 0 && (_ = 0), T.start <= x && T.start + T.duration > x)
            return 0;
          var c = Math.min(_, T.duration + (T.deltaPTS ? T.deltaPTS : 0));
          return T.start + T.duration - c <= x ? 1 : T.start - c > x && T.start ? -1 : 0;
        }
        function P(x, _, T) {
          var c = Math.min(_, T.duration + (T.deltaPTS ? T.deltaPTS : 0)) * 1e3, y = T.endProgramDateTime || 0;
          return y - c > x;
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
          }, x.getAppendedFrag = function(T, c) {
            if (c === A.PlaylistLevelType.MAIN) {
              var y = this.activeFragment, m = this.activeParts;
              if (!y)
                return null;
              if (m)
                for (var n = m.length; n--; ) {
                  var o = m[n], a = o ? o.end : y.appendedPTS;
                  if (o.start <= T && a !== void 0 && T <= a)
                    return n > 9 && (this.activeParts = m.slice(n - 9)), o;
                }
              else if (y.start <= T && y.appendedPTS !== void 0 && T <= y.appendedPTS)
                return y;
            }
            return this.getBufferedFrag(T, c);
          }, x.getBufferedFrag = function(T, c) {
            for (var y = this.fragments, m = Object.keys(y), n = m.length; n--; ) {
              var o = y[m[n]];
              if ((o == null ? void 0 : o.body.type) === c && o.buffered) {
                var a = o.body;
                if (a.start <= T && T <= a.end)
                  return a;
              }
            }
            return null;
          }, x.detectEvictedFragments = function(T, c, y) {
            var m = this;
            this.timeRanges && (this.timeRanges[T] = c), Object.keys(this.fragments).forEach(function(n) {
              var o = m.fragments[n];
              if (!!o) {
                if (!o.buffered && !o.loaded) {
                  o.body.type === y && m.removeFragment(o.body);
                  return;
                }
                var a = o.range[T];
                !a || a.time.some(function(i) {
                  var g = !m.isTimeBuffered(i.startPTS, i.endPTS, c);
                  return g && m.removeFragment(o.body), g;
                });
              }
            });
          }, x.detectPartialFragments = function(T) {
            var c = this, y = this.timeRanges, m = T.frag, n = T.part;
            if (!(!y || m.sn === "initSegment")) {
              var o = P(m), a = this.fragments[o];
              !a || (Object.keys(y).forEach(function(i) {
                var g = m.elementaryStreams[i];
                if (!!g) {
                  var l = y[i], r = n !== null || g.partial === !0;
                  a.range[i] = c.getBufferedTimes(m, n, r, l);
                }
              }), a.loaded = null, Object.keys(a.range).length ? (a.buffered = !0, a.body.endList && (this.endListFragments[a.body.type] = a)) : this.removeFragment(a.body));
            }
          }, x.fragBuffered = function(T) {
            var c = P(T), y = this.fragments[c];
            y && (y.loaded = null, y.buffered = !0);
          }, x.getBufferedTimes = function(T, c, y, m) {
            for (var n = {
              time: [],
              partial: y
            }, o = c ? c.start : T.start, a = c ? c.end : T.end, i = T.minEndPTS || a, g = T.maxStartPTS || o, l = 0; l < m.length; l++) {
              var r = m.start(l) - this.bufferPadding, u = m.end(l) + this.bufferPadding;
              if (g >= r && i <= u) {
                n.time.push({
                  startPTS: Math.max(o, m.start(l)),
                  endPTS: Math.min(a, m.end(l))
                });
                break;
              } else if (o < u && a > r)
                n.partial = !0, n.time.push({
                  startPTS: Math.max(o, m.start(l)),
                  endPTS: Math.min(a, m.end(l))
                });
              else if (a <= r)
                break;
            }
            return n;
          }, x.getPartialFragment = function(T) {
            var c = null, y, m, n, o = 0, a = this.bufferPadding, i = this.fragments;
            return Object.keys(i).forEach(function(g) {
              var l = i[g];
              !l || k(l) && (m = l.body.start - a, n = l.body.end + a, T >= m && T <= n && (y = Math.min(T - m, n - T), o <= y && (c = l.body, o = y)));
            }), c;
          }, x.isEndListAppended = function(T) {
            var c = this.endListFragments[T];
            return c !== void 0 && (c.buffered || k(c));
          }, x.getState = function(T) {
            var c = P(T), y = this.fragments[c];
            return y ? y.buffered ? k(y) ? C.PARTIAL : C.OK : C.APPENDING : C.NOT_LOADED;
          }, x.isTimeBuffered = function(T, c, y) {
            for (var m, n, o = 0; o < y.length; o++) {
              if (m = y.start(o) - this.bufferPadding, n = y.end(o) + this.bufferPadding, T >= m && c <= n)
                return !0;
              if (c <= m)
                return !1;
            }
            return !1;
          }, x.onFragLoaded = function(T, c) {
            var y = c.frag, m = c.part;
            if (!(y.sn === "initSegment" || y.bitrateTest || m)) {
              var n = P(y);
              this.fragments[n] = {
                body: y,
                loaded: c,
                buffered: !1,
                range: /* @__PURE__ */ Object.create(null)
              };
            }
          }, x.onBufferAppended = function(T, c) {
            var y = this, m = c.frag, n = c.part, o = c.timeRanges;
            if (m.type === A.PlaylistLevelType.MAIN)
              if (this.activeFragment !== m && (this.activeFragment = m, m.appendedPTS = void 0), n) {
                var a = this.activeParts;
                a || (this.activeParts = a = []), a.push(n);
              } else
                this.activeParts = null;
            this.timeRanges = o, Object.keys(o).forEach(function(i) {
              var g = o[i];
              if (y.detectEvictedFragments(i, g), !n && m.type === A.PlaylistLevelType.MAIN) {
                var l = m.elementaryStreams[i];
                if (!l)
                  return;
                for (var r = 0; r < g.length; r++) {
                  var u = g.end(r);
                  u <= l.endPTS && u > l.startPTS ? m.appendedPTS = Math.max(u, m.appendedPTS || 0) : m.appendedPTS = l.endPTS;
                }
              }
            });
          }, x.onFragBuffered = function(T, c) {
            this.detectPartialFragments(c);
          }, x.hasFragment = function(T) {
            var c = P(T);
            return !!this.fragments[c];
          }, x.removeFragmentsInRange = function(T, c, y) {
            var m = this;
            Object.keys(this.fragments).forEach(function(n) {
              var o = m.fragments[n];
              if (!!o && o.buffered) {
                var a = o.body;
                a.type === y && a.start < c && a.end > T && m.removeFragment(a);
              }
            });
          }, x.removeFragment = function(T) {
            var c = P(T);
            T.stats.loaded = 0, T.clearElementaryStreamInfo(), T.appendedPTS = void 0, delete this.fragments[c], T.endList && delete this.endListFragments[T.type];
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
          function T(y, m, n, o) {
            this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = y, this.media = m, this.fragmentTracker = n, this.hls = o;
          }
          var c = T.prototype;
          return c.destroy = function() {
            this.media = null, this.hls = this.fragmentTracker = null;
          }, c.poll = function(m, n) {
            var o = this.config, a = this.media, i = this.stalled;
            if (a !== null) {
              var g = a.currentTime, l = a.seeking, r = this.seeking && !l, u = !this.seeking && l;
              if (this.seeking = l, g !== m) {
                if (this.moved = !0, i !== null) {
                  if (this.stallReported) {
                    var v = self.performance.now() - i;
                    I.logger.warn("playback not stuck anymore @" + g + ", after " + Math.round(v) + "ms"), this.stallReported = !1;
                  }
                  this.stalled = null, this.nudgeRetry = 0;
                }
                return;
              }
              if ((u || r) && (this.stalled = null), !(a.paused && !l || a.ended || a.playbackRate === 0 || !F.BufferHelper.getBuffered(a).length)) {
                var f = F.BufferHelper.bufferInfo(a, g, 0), s = f.len > 0, t = f.nextStart || 0;
                if (!(!s && !t)) {
                  if (l) {
                    var h = f.len > P, e = !t || n && n.start <= g || t - g > P && !this.fragmentTracker.getPartialFragment(g);
                    if (h || e)
                      return;
                    this.moved = !1;
                  }
                  if (!this.moved && this.stalled !== null) {
                    var d, E = Math.max(t, f.start || 0) - g, p = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, D = p == null || (d = p.details) === null || d === void 0 ? void 0 : d.live, R = D ? p.details.targetduration * 2 : P;
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
                  if (!(!l && O >= k && (this._reportStall(f), !this.media))) {
                    var M = F.BufferHelper.bufferInfo(a, g, o.maxBufferHole);
                    this._tryFixBufferStall(M, O);
                  }
                }
              }
            }
          }, c._tryFixBufferStall = function(m, n) {
            var o = this.config, a = this.fragmentTracker, i = this.media;
            if (i !== null) {
              var g = i.currentTime, l = a.getPartialFragment(g);
              if (l) {
                var r = this._trySkipBufferHole(l);
                if (r || !this.media)
                  return;
              }
              m.len > o.maxBufferHole && n > o.highBufferWatchdogPeriod * 1e3 && (I.logger.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
            }
          }, c._reportStall = function(m) {
            var n = this.hls, o = this.media, a = this.stallReported;
            !a && o && (this.stallReported = !0, I.logger.warn("Playback stalling at @" + o.currentTime + " due to low buffer (" + JSON.stringify(m) + ")"), n.trigger(C.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.BUFFER_STALLED_ERROR,
              fatal: !1,
              buffer: m.len
            }));
          }, c._trySkipBufferHole = function(m) {
            var n = this.config, o = this.hls, a = this.media;
            if (a === null)
              return 0;
            for (var i = a.currentTime, g = 0, l = F.BufferHelper.getBuffered(a), r = 0; r < l.length; r++) {
              var u = l.start(r);
              if (i + n.maxBufferHole >= g && i < u) {
                var v = Math.max(u + x, a.currentTime + L);
                return I.logger.warn("skipping hole, adjusting currentTime from " + i + " to " + v), this.moved = !0, this.stalled = null, a.currentTime = v, m && o.trigger(C.Events.ERROR, {
                  type: A.ErrorTypes.MEDIA_ERROR,
                  details: A.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                  fatal: !1,
                  reason: "fragment loaded with buffer holes, seeking from " + i + " to " + v,
                  frag: m
                }), v;
              }
              g = l.end(r);
            }
            return 0;
          }, c._tryNudgeBuffer = function() {
            var m = this.config, n = this.hls, o = this.media, a = this.nudgeRetry;
            if (o !== null) {
              var i = o.currentTime;
              if (this.nudgeRetry++, a < m.nudgeMaxRetry) {
                var g = i + (a + 1) * m.nudgeOffset;
                I.logger.warn("Nudging 'currentTime' from " + i + " to " + g), o.currentTime = g, n.trigger(C.Events.ERROR, {
                  type: A.ErrorTypes.MEDIA_ERROR,
                  details: A.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                  fatal: !1
                });
              } else
                I.logger.error("Playhead still not moving while enough data buffered @" + i + " after " + m.nudgeMaxRetry + " nudges"), n.trigger(C.Events.ERROR, {
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
          var n = x();
          try {
            new n(0, Number.POSITIVE_INFINITY, "");
          } catch (o) {
            return Number.MAX_VALUE;
          }
          return Number.POSITIVE_INFINITY;
        }();
        function T(n, o) {
          return n.getTime() / 1e3 - o;
        }
        function c(n) {
          return Uint8Array.from(n.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
        }
        var y = /* @__PURE__ */ function() {
          function n(a) {
            this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = a, this._registerListeners();
          }
          var o = n.prototype;
          return o.destroy = function() {
            this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null;
          }, o._registerListeners = function() {
            var i = this.hls;
            i.on(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(A.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), i.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), i.on(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this);
          }, o._unregisterListeners = function() {
            var i = this.hls;
            i.off(A.Events.MEDIA_ATTACHED, this.onMediaAttached, this), i.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.off(A.Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), i.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), i.off(A.Events.LEVEL_UPDATED, this.onLevelUpdated, this);
          }, o.onMediaAttached = function(i, g) {
            this.media = g.media;
          }, o.onMediaDetaching = function() {
            !this.id3Track || ((0, C.clearCurrentCues)(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {});
          }, o.onManifestLoading = function() {
            this.dateRangeCuesAppended = {};
          }, o.createTrack = function(i) {
            var g = this.getID3Track(i.textTracks);
            return g.mode = "hidden", g;
          }, o.getID3Track = function(i) {
            if (!!this.media) {
              for (var g = 0; g < i.length; g++) {
                var l = i[g];
                if (l.kind === "metadata" && l.label === "id3")
                  return (0, C.sendAddTrackEvent)(l, this.media), l;
              }
              return this.media.addTextTrack("metadata", "id3");
            }
          }, o.onFragParsingMetadata = function(i, g) {
            if (!!this.media) {
              var l = this.hls.config, r = l.enableEmsgMetadataCues, u = l.enableID3MetadataCues;
              if (!(!r && !u)) {
                var v = g.samples;
                this.id3Track || (this.id3Track = this.createTrack(this.media));
                for (var f = x(), s = 0; s < v.length; s++) {
                  var t = v[s].type;
                  if (!(t === P.MetadataSchema.emsg && !r || !u)) {
                    var h = I.getID3Frames(v[s].data);
                    if (h) {
                      var e = v[s].pts, d = e + v[s].duration;
                      d > _ && (d = _);
                      var E = d - e;
                      E <= 0 && (d = e + L);
                      for (var p = 0; p < h.length; p++) {
                        var D = h[p];
                        if (!I.isTimeStampFrame(D)) {
                          this.updateId3CueEnds(e);
                          var R = new f(e, d, "");
                          R.value = D, t && (R.type = t), this.id3Track.addCue(R);
                        }
                      }
                    }
                  }
                }
              }
            }
          }, o.updateId3CueEnds = function(i) {
            var g, l = (g = this.id3Track) === null || g === void 0 ? void 0 : g.cues;
            if (l)
              for (var r = l.length; r--; ) {
                var u = l[r];
                u.startTime < i && u.endTime === _ && (u.endTime = i);
              }
          }, o.onBufferFlushing = function(i, g) {
            var l = g.startOffset, r = g.endOffset, u = g.type, v = this.id3Track, f = this.hls;
            if (!!f) {
              var s = f.config, t = s.enableEmsgMetadataCues, h = s.enableID3MetadataCues;
              if (v && (t || h)) {
                var e;
                u === "audio" ? e = function(E) {
                  return E.type === P.MetadataSchema.audioId3 && h;
                } : u === "video" ? e = function(E) {
                  return E.type === P.MetadataSchema.emsg && t;
                } : e = function(E) {
                  return E.type === P.MetadataSchema.audioId3 && h || E.type === P.MetadataSchema.emsg && t;
                }, (0, C.removeCuesInRange)(v, l, r, e);
              }
            }
          }, o.onLevelUpdated = function(i, g) {
            var l = this, r = g.details;
            if (!(!this.media || !r.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues)) {
              var u = this.dateRangeCuesAppended, v = this.id3Track, f = r.dateRanges, s = Object.keys(f);
              if (v)
                for (var t = Object.keys(u).filter(function(b) {
                  return !s.includes(b);
                }), h = function(O) {
                  var M = t[O];
                  Object.keys(u[M].cues).forEach(function(w) {
                    v.removeCue(u[M].cues[w]);
                  }), delete u[M];
                }, e = t.length; e--; )
                  h(e);
              var d = r.fragments[r.fragments.length - 1];
              if (!(s.length === 0 || !(0, F.isFiniteNumber)(d == null ? void 0 : d.programDateTime))) {
                this.id3Track || (this.id3Track = this.createTrack(this.media));
                for (var E = d.programDateTime / 1e3 - d.start, p = x(), D = function(O) {
                  var M = s[O], w = f[M], U = u[M], N = (U == null ? void 0 : U.cues) || {}, K = (U == null ? void 0 : U.durationKnown) || !1, W = T(w.startDate, E), G = _, j = w.endDate;
                  if (j)
                    G = T(j, E), K = !0;
                  else if (w.endOnNext && !K) {
                    var H = s.reduce(function(q, ie) {
                      var ne = f[ie];
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
                        $ = new p(W, G, ""), (J === k.DateRangeAttribute.SCTE35_OUT || J === k.DateRangeAttribute.SCTE35_IN) && (z = c(z)), $.value = {
                          key: J,
                          data: z
                        }, $.type = P.MetadataSchema.dateRange, l.id3Track.addCue($), N[J] = $;
                      }
                    }
                  }
                  u[M] = {
                    cues: N,
                    dateRange: w,
                    durationKnown: K
                  };
                }, R = 0; R < s.length; R++)
                  D(R);
              }
            }
          }, n;
        }();
        const m = y;
      },
      "./src/controller/latency-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/errors.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts");
        function I(_, T) {
          for (var c = 0; c < T.length; c++) {
            var y = T[c];
            y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(_, P(y.key), y);
          }
        }
        function k(_, T, c) {
          return T && I(_.prototype, T), c && I(_, c), Object.defineProperty(_, "prototype", { writable: !1 }), _;
        }
        function P(_) {
          var T = L(_, "string");
          return typeof T == "symbol" ? T : String(T);
        }
        function L(_, T) {
          if (typeof _ != "object" || _ === null)
            return _;
          var c = _[Symbol.toPrimitive];
          if (c !== void 0) {
            var y = c.call(_, T || "default");
            if (typeof y != "object")
              return y;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (T === "string" ? String : Number)(_);
        }
        var x = /* @__PURE__ */ function() {
          function _(c) {
            var y = this;
            this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = function() {
              return y.timeupdate();
            }, this.hls = c, this.config = c.config, this.registerListeners();
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
            var n = m.details;
            this.levelDetails = n, n.advanced && this.timeupdate(), !n.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler);
          }, T.onError = function(y, m) {
            m.details === F.ErrorDetails.BUFFER_STALLED_ERROR && (this.stallCount++, C.logger.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
          }, T.timeupdate = function() {
            var y = this.media, m = this.levelDetails;
            if (!(!y || !m)) {
              this.currentTime = y.currentTime;
              var n = this.computeLatency();
              if (n !== null) {
                this._latency = n;
                var o = this.config, a = o.lowLatencyMode, i = o.maxLiveSyncPlaybackRate;
                if (!(!a || i === 1)) {
                  var g = this.targetLatency;
                  if (g !== null) {
                    var l = n - g, r = Math.min(this.maxLatency, g + m.targetduration), u = l < r;
                    if (m.live && u && l > 0.05 && this.forwardBufferLength > 1) {
                      var v = Math.min(2, Math.max(1, i)), f = Math.round(2 / (1 + Math.exp(-0.75 * l - this.edgeStalled)) * 20) / 20;
                      y.playbackRate = Math.min(v, Math.max(1, f));
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
              var m = y.holdBack, n = y.partHoldBack, o = y.targetduration, a = this.config, i = a.liveSyncDuration, g = a.liveSyncDurationCount, l = a.lowLatencyMode, r = this.hls.userConfig, u = l && n || m;
              (r.liveSyncDuration || r.liveSyncDurationCount || u === 0) && (u = i !== void 0 ? i : g * o);
              var v = o, f = 1;
              return u + Math.min(this.stallCount * f, v);
            }
          }, {
            key: "liveSyncPosition",
            get: function() {
              var y = this.estimateLiveEdge(), m = this.targetLatency, n = this.levelDetails;
              if (y === null || m === null || n === null)
                return null;
              var o = n.edge, a = y - m - this.edgeStalled, i = o - n.totalduration, g = o - (this.config.lowLatencyMode && n.partTarget || n.targetduration);
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
              var n = y.buffered.length;
              return (n ? y.buffered.end(n - 1) : m.edge) - this.currentTime;
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
              var l = arguments[g];
              for (var r in l)
                Object.prototype.hasOwnProperty.call(l, r) && (i[r] = l[r]);
            }
            return i;
          }, x.apply(this, arguments);
        }
        function _(i, g) {
          for (var l = 0; l < g.length; l++) {
            var r = g[l];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, c(r.key), r);
          }
        }
        function T(i, g, l) {
          return g && _(i.prototype, g), l && _(i, l), Object.defineProperty(i, "prototype", { writable: !1 }), i;
        }
        function c(i) {
          var g = y(i, "string");
          return typeof g == "symbol" ? g : String(g);
        }
        function y(i, g) {
          if (typeof i != "object" || i === null)
            return i;
          var l = i[Symbol.toPrimitive];
          if (l !== void 0) {
            var r = l.call(i, g || "default");
            if (typeof r != "object")
              return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (g === "string" ? String : Number)(i);
        }
        function m(i, g) {
          i.prototype = Object.create(g.prototype), i.prototype.constructor = i, n(i, g);
        }
        function n(i, g) {
          return n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, u) {
            return r.__proto__ = u, r;
          }, n(i, g);
        }
        var o = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), a = /* @__PURE__ */ function(i) {
          m(g, i);
          function g(r) {
            var u;
            return u = i.call(this, r, "[level-controller]") || this, u._levels = [], u._firstLevel = -1, u._startLevel = void 0, u.currentLevelIndex = -1, u.manualLevelIndex = -1, u.onParsedComplete = void 0, u._registerListeners(), u;
          }
          var l = g.prototype;
          return l._registerListeners = function() {
            var u = this.hls;
            u.on(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), u.on(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.on(A.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), u.on(A.Events.FRAG_LOADED, this.onFragLoaded, this), u.on(A.Events.ERROR, this.onError, this);
          }, l._unregisterListeners = function() {
            var u = this.hls;
            u.off(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), u.off(A.Events.LEVEL_LOADED, this.onLevelLoaded, this), u.off(A.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), u.off(A.Events.FRAG_LOADED, this.onFragLoaded, this), u.off(A.Events.ERROR, this.onError, this);
          }, l.destroy = function() {
            this._unregisterListeners(), this.manualLevelIndex = -1, this._levels.length = 0, i.prototype.destroy.call(this);
          }, l.startLoad = function() {
            var u = this._levels;
            u.forEach(function(v) {
              v.loadError = 0;
            }), i.prototype.startLoad.call(this);
          }, l.onManifestLoaded = function(u, v) {
            var f = [], s = [], t = [], h, e = {}, d, E = !1, p = !1, D = !1;
            if (v.levels.forEach(function(M) {
              var w = M.attrs;
              E = E || !!(M.width && M.height), p = p || !!M.videoCodec, D = D || !!M.audioCodec, o && M.audioCodec && M.audioCodec.indexOf("mp4a.40.34") !== -1 && (M.audioCodec = void 0);
              var U = M.bitrate + "-" + M.attrs.RESOLUTION + "-" + M.attrs.CODECS;
              d = e[U], d ? d.url.push(M.url) : (d = new F.Level(M), e[U] = d, f.push(d)), w && (w.AUDIO && (0, k.addGroupId)(d, "audio", w.AUDIO), w.SUBTITLES && (0, k.addGroupId)(d, "text", w.SUBTITLES));
            }), (E || p) && D && (f = f.filter(function(M) {
              var w = M.videoCodec, U = M.width, N = M.height;
              return !!w || !!(U && N);
            })), f = f.filter(function(M) {
              var w = M.audioCodec, U = M.videoCodec;
              return (!w || (0, I.isCodecSupportedInMp4)(w, "audio")) && (!U || (0, I.isCodecSupportedInMp4)(U, "video"));
            }), v.audioTracks && (s = v.audioTracks.filter(function(M) {
              return !M.audioCodec || (0, I.isCodecSupportedInMp4)(M.audioCodec, "audio");
            }), (0, k.assignTrackIdsByGroup)(s)), v.subtitles && (t = v.subtitles, (0, k.assignTrackIdsByGroup)(t)), f.length > 0) {
              h = f[0].bitrate, f.sort(function(M, w) {
                return M.attrs["HDCP-LEVEL"] !== w.attrs["HDCP-LEVEL"] ? (M.attrs["HDCP-LEVEL"] || "") > (w.attrs["HDCP-LEVEL"] || "") ? 1 : -1 : M.bitrate !== w.bitrate ? M.bitrate - w.bitrate : M.attrs.SCORE !== w.attrs.SCORE ? M.attrs.decimalFloatingPoint("SCORE") - w.attrs.decimalFloatingPoint("SCORE") : E && M.height !== w.height ? M.height - w.height : 0;
              }), this._levels = f;
              for (var R = 0; R < f.length; R++)
                if (f[R].bitrate === h) {
                  this._firstLevel = R, this.log("manifest loaded, " + f.length + " level(s) found, first bitrate: " + h);
                  break;
                }
              var b = D && !p, O = {
                levels: f,
                audioTracks: s,
                subtitleTracks: t,
                sessionData: v.sessionData,
                sessionKeys: v.sessionKeys,
                firstLevel: this._firstLevel,
                stats: v.stats,
                audio: D,
                video: p,
                altAudio: !b && s.some(function(M) {
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
          }, l.onError = function(u, v) {
            var f, s;
            if (i.prototype.onError.call(this, u, v), !v.fatal) {
              var t = v.context, h = this._levels[this.currentLevelIndex];
              if (t && (t.type === L.PlaylistContextType.AUDIO_TRACK && h.audioGroupIds && t.groupId === h.audioGroupIds[h.urlId] || t.type === L.PlaylistContextType.SUBTITLE_TRACK && h.textGroupIds && t.groupId === h.textGroupIds[h.urlId])) {
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
                  var R = h.attrs["HDCP-LEVEL"];
                  R && (this.hls.maxHdcpLevel = F.HdcpLevels[F.HdcpLevels.indexOf(R) - 1], this.warn('Restricting playback to HDCP-LEVEL of "' + this.hls.maxHdcpLevel + '" or lower'));
                }
                case C.ErrorDetails.FRAG_PARSING_ERROR:
                case C.ErrorDetails.KEY_SYSTEM_NO_SESSION:
                  E = ((f = v.frag) === null || f === void 0 ? void 0 : f.type) === L.PlaylistLevelType.MAIN ? v.frag.level : this.currentLevelIndex, v.levelRetry = !1;
                  break;
                case C.ErrorDetails.LEVEL_LOAD_ERROR:
                case C.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                  t && (t.deliveryDirectives && (d = !1), E = t.level), e = !0;
                  break;
                case C.ErrorDetails.REMUX_ALLOC_ERROR:
                  E = (s = v.level) != null ? s : this.currentLevelIndex, e = !0;
                  break;
              }
              E !== void 0 && this.recoverLevel(v, E, e, d);
            }
          }, l.recoverLevel = function(u, v, f, s) {
            var t = u.details, h = this._levels[v];
            if (h.loadError++, f) {
              var e = this.retryLoadingOrFail(u);
              if (e)
                u.levelRetry = !0;
              else {
                this.currentLevelIndex = -1;
                return;
              }
            }
            if (s) {
              var d = h.url.length;
              if (d > 1 && h.loadError < d)
                u.levelRetry = !0, this.redundantFailover(v);
              else if (this.manualLevelIndex === -1) {
                for (var E = -1, p = this._levels, D = p.length; D--; ) {
                  var R = (D + this.currentLevelIndex) % p.length;
                  if (R !== this.currentLevelIndex && p[R].loadError === 0) {
                    E = R;
                    break;
                  }
                }
                E > -1 && this.currentLevelIndex !== E ? (this.warn(t + ": switch to " + E), u.levelRetry = !0, this.hls.nextAutoLevel = E) : u.levelRetry === !1 && (u.fatal = !0);
              }
            }
          }, l.redundantFailover = function(u) {
            var v = this._levels[u], f = v.url.length;
            if (f > 1) {
              var s = (v.urlId + 1) % f;
              this.warn("Switching to redundant URL-id " + s), this._levels.forEach(function(t) {
                t.urlId = s;
              }), this.level = u;
            }
          }, l.onFragLoaded = function(u, v) {
            var f = v.frag;
            if (f !== void 0 && f.type === L.PlaylistLevelType.MAIN) {
              var s = this._levels[f.level];
              s !== void 0 && (s.fragmentError = 0, s.loadError = 0);
            }
          }, l.onLevelLoaded = function(u, v) {
            var f, s = v.level, t = v.details, h = this._levels[s];
            if (!h) {
              var e;
              this.warn("Invalid level index " + s), (e = v.deliveryDirectives) !== null && e !== void 0 && e.skip && (t.deltaUpdateFailed = !0);
              return;
            }
            s === this.currentLevelIndex ? (h.fragmentError === 0 && (h.loadError = 0, this.retryCount = 0), this.playlistLoaded(s, v, h.details)) : (f = v.deliveryDirectives) !== null && f !== void 0 && f.skip && (t.deltaUpdateFailed = !0);
          }, l.onAudioTrackSwitched = function(u, v) {
            var f = this.hls.levels[this.currentLevelIndex];
            if (!!f && f.audioGroupIds) {
              for (var s = -1, t = this.hls.audioTracks[v.id].groupId, h = 0; h < f.audioGroupIds.length; h++)
                if (f.audioGroupIds[h] === t) {
                  s = h;
                  break;
                }
              s !== f.urlId && (f.urlId = s, this.startLoad());
            }
          }, l.loadPlaylist = function(u) {
            i.prototype.loadPlaylist.call(this);
            var v = this.currentLevelIndex, f = this._levels[v];
            if (this.canLoad && f && f.url.length > 0) {
              var s = f.urlId, t = f.url[s];
              if (u)
                try {
                  t = u.addDirectives(t);
                } catch (h) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + h);
                }
              this.log("Attempt loading level index " + v + (u ? " at sn " + u.msn + " part " + u.part : "") + " with URL-id " + s + " " + t), this.clearTimer(), this.hls.trigger(A.Events.LEVEL_LOADING, {
                url: t,
                level: v,
                id: s,
                deliveryDirectives: u || null
              });
            }
          }, l.removeLevel = function(u, v) {
            var f = function(h, e) {
              return e !== v;
            }, s = this._levels.filter(function(t, h) {
              return h !== u ? !0 : t.url.length > 1 && v !== void 0 ? (t.url = t.url.filter(f), t.audioGroupIds && (t.audioGroupIds = t.audioGroupIds.filter(f)), t.textGroupIds && (t.textGroupIds = t.textGroupIds.filter(f)), t.urlId = 0, !0) : !1;
            }).map(function(t, h) {
              var e = t.details;
              return e != null && e.fragments && e.fragments.forEach(function(d) {
                d.level = h;
              }), t;
            });
            this._levels = s, this.hls.trigger(A.Events.LEVELS_UPDATED, {
              levels: s
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
            set: function(u) {
              var v, f = this._levels;
              if (f.length !== 0 && !(this.currentLevelIndex === u && (v = f[u]) !== null && v !== void 0 && v.details)) {
                if (u < 0 || u >= f.length) {
                  var s = u < 0;
                  if (this.hls.trigger(A.Events.ERROR, {
                    type: C.ErrorTypes.OTHER_ERROR,
                    details: C.ErrorDetails.LEVEL_SWITCH_ERROR,
                    level: u,
                    fatal: s,
                    reason: "invalid level idx"
                  }), s)
                    return;
                  u = Math.min(u, f.length - 1);
                }
                this.clearTimer();
                var t = this.currentLevelIndex, h = f[t], e = f[u];
                this.log("switching to level " + u + " from " + t), this.currentLevelIndex = u;
                var d = x({}, e, {
                  level: u,
                  maxBitrate: e.maxBitrate,
                  uri: e.uri,
                  urlId: e.urlId
                });
                delete d._urlId, this.hls.trigger(A.Events.LEVEL_SWITCHING, d);
                var E = e.details;
                if (!E || E.live) {
                  var p = this.switchParams(e.uri, h == null ? void 0 : h.details);
                  this.loadPlaylist(p);
                }
              }
            }
          }, {
            key: "manualLevel",
            get: function() {
              return this.manualLevelIndex;
            },
            set: function(u) {
              this.manualLevelIndex = u, this._startLevel === void 0 && (this._startLevel = u), u !== -1 && (this.level = u);
            }
          }, {
            key: "firstLevel",
            get: function() {
              return this._firstLevel;
            },
            set: function(u) {
              this._firstLevel = u;
            }
          }, {
            key: "startLevel",
            get: function() {
              if (this._startLevel === void 0) {
                var u = this.hls.config.startLevel;
                return u !== void 0 ? u : this._firstLevel;
              } else
                return this._startLevel;
            },
            set: function(u) {
              this._startLevel = u;
            }
          }, {
            key: "nextLoadLevel",
            get: function() {
              return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
            },
            set: function(u) {
              this.level = u, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = u);
            }
          }]), g;
        }(P.default);
      },
      "./src/controller/level-helper.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          addGroupId: () => k,
          addSliding: () => o,
          adjustSliding: () => n,
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
          return I = Object.assign ? Object.assign.bind() : function(l) {
            for (var r = 1; r < arguments.length; r++) {
              var u = arguments[r];
              for (var v in u)
                Object.prototype.hasOwnProperty.call(u, v) && (l[v] = u[v]);
            }
            return l;
          }, I.apply(this, arguments);
        }
        function k(l, r, u) {
          switch (r) {
            case "audio":
              l.audioGroupIds || (l.audioGroupIds = []), l.audioGroupIds.push(u);
              break;
            case "text":
              l.textGroupIds || (l.textGroupIds = []), l.textGroupIds.push(u);
              break;
          }
        }
        function P(l) {
          var r = {};
          l.forEach(function(u) {
            var v = u.groupId || "";
            u.id = r[v] = r[v] || 0, r[v]++;
          });
        }
        function L(l, r, u) {
          var v = l[r], f = l[u];
          x(v, f);
        }
        function x(l, r) {
          var u = r.startPTS;
          if ((0, F.isFiniteNumber)(u)) {
            var v = 0, f;
            r.sn > l.sn ? (v = u - l.start, f = l) : (v = l.start - u, f = r), f.duration !== v && (f.duration = v);
          } else if (r.sn > l.sn) {
            var s = l.cc === r.cc;
            s && l.minEndPTS ? r.start = l.start + (l.minEndPTS - l.start) : r.start = l.start + l.duration;
          } else
            r.start = Math.max(l.start - r.duration, 0);
        }
        function _(l, r, u, v, f, s) {
          var t = v - u;
          t <= 0 && (A.logger.warn("Fragment should have a positive duration", r), v = u + r.duration, s = f + r.duration);
          var h = u, e = v, d = r.startPTS, E = r.endPTS;
          if ((0, F.isFiniteNumber)(d)) {
            var p = Math.abs(d - u);
            (0, F.isFiniteNumber)(r.deltaPTS) ? r.deltaPTS = Math.max(p, r.deltaPTS) : r.deltaPTS = p, h = Math.max(u, d), u = Math.min(u, d), f = Math.min(f, r.startDTS), e = Math.min(v, E), v = Math.max(v, E), s = Math.max(s, r.endDTS);
          }
          r.duration = v - u;
          var D = u - r.start;
          r.start = r.startPTS = u, r.maxStartPTS = h, r.startDTS = f, r.endPTS = v, r.minEndPTS = e, r.endDTS = s;
          var R = r.sn;
          if (!l || R < l.startSN || R > l.endSN)
            return 0;
          var b, O = R - l.startSN, M = l.fragments;
          for (M[O] = r, b = O; b > 0; b--)
            x(M[b], M[b - 1]);
          for (b = O; b < M.length - 1; b++)
            x(M[b], M[b + 1]);
          return l.fragmentHint && x(M[M.length - 1], l.fragmentHint), l.PTSKnown = l.alignedSliding = !0, D;
        }
        function T(l, r) {
          for (var u = null, v = l.fragments, f = v.length - 1; f >= 0; f--) {
            var s = v[f].initSegment;
            if (s) {
              u = s;
              break;
            }
          }
          l.fragmentHint && delete l.fragmentHint.endPTS;
          var t = 0, h;
          if (m(l, r, function(b, O) {
            b.relurl && (t = b.cc - O.cc), (0, F.isFiniteNumber)(b.startPTS) && (0, F.isFiniteNumber)(b.endPTS) && (O.start = O.startPTS = b.startPTS, O.startDTS = b.startDTS, O.appendedPTS = b.appendedPTS, O.maxStartPTS = b.maxStartPTS, O.endPTS = b.endPTS, O.endDTS = b.endDTS, O.minEndPTS = b.minEndPTS, O.duration = b.endPTS - b.startPTS, O.duration && (h = O), r.PTSKnown = r.alignedSliding = !0), O.elementaryStreams = b.elementaryStreams, O.loader = b.loader, O.stats = b.stats, O.urlId = b.urlId, b.initSegment && (O.initSegment = b.initSegment, u = b.initSegment);
          }), u) {
            var e = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments;
            e.forEach(function(b) {
              var O;
              (!b.initSegment || b.initSegment.relurl === ((O = u) === null || O === void 0 ? void 0 : O.relurl)) && (b.initSegment = u);
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
              r.canSkipDateRanges && (r.dateRanges = c(l.dateRanges, r.dateRanges, r.recentlyRemovedDateranges));
          var E = r.fragments;
          if (t) {
            A.logger.warn("discontinuity sliding from playlist, take drift into account");
            for (var p = 0; p < E.length; p++)
              E[p].cc += t;
          }
          r.skippedSegments && (r.startCC = r.fragments[0].cc), y(l.partList, r.partList, function(b, O) {
            O.elementaryStreams = b.elementaryStreams, O.stats = b.stats;
          }), h ? _(r, h, h.startPTS, h.endPTS, h.startDTS, h.endDTS) : n(l, r), E.length && (r.totalduration = r.edge - E[0].start), r.driftStartTime = l.driftStartTime, r.driftStart = l.driftStart;
          var D = r.advancedDateTime;
          if (r.advanced && D) {
            var R = r.edge;
            r.driftStart || (r.driftStartTime = D, r.driftStart = R), r.driftEndTime = D, r.driftEnd = R;
          } else
            r.driftEndTime = l.driftEndTime, r.driftEnd = l.driftEnd, r.advancedDateTime = l.advancedDateTime;
        }
        function c(l, r, u) {
          var v = I({}, l);
          return u && u.forEach(function(f) {
            delete v[f];
          }), Object.keys(r).forEach(function(f) {
            var s = new C.DateRange(r[f].attr, v[f]);
            s.isValid ? v[f] = s : A.logger.warn('Ignoring invalid Playlist Delta Update DATERANGE tag: "' + JSON.stringify(r[f].attr) + '"');
          }), v;
        }
        function y(l, r, u) {
          if (l && r)
            for (var v = 0, f = 0, s = l.length; f <= s; f++) {
              var t = l[f], h = r[f + v];
              t && h && t.index === h.index && t.fragment.sn === h.fragment.sn ? u(t, h) : v--;
            }
        }
        function m(l, r, u) {
          for (var v = r.skippedSegments, f = Math.max(l.startSN, r.startSN) - r.startSN, s = (l.fragmentHint ? 1 : 0) + (v ? r.endSN : Math.min(l.endSN, r.endSN)) - r.startSN, t = r.startSN - l.startSN, h = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments, e = l.fragmentHint ? l.fragments.concat(l.fragmentHint) : l.fragments, d = f; d <= s; d++) {
            var E = e[t + d], p = h[d];
            v && !p && d < v && (p = r.fragments[d] = E), E && p && u(E, p);
          }
        }
        function n(l, r) {
          var u = r.startSN + r.skippedSegments - l.startSN, v = l.fragments;
          u < 0 || u >= v.length || o(r, v[u].start);
        }
        function o(l, r) {
          if (r) {
            for (var u = l.fragments, v = l.skippedSegments; v < u.length; v++)
              u[v].start += r;
            l.fragmentHint && (l.fragmentHint.start += r);
          }
        }
        function a(l, r) {
          r === void 0 && (r = 1 / 0);
          var u = 1e3 * l.targetduration;
          if (l.updated) {
            var v = l.fragments, f = 4;
            if (v.length && u * f > r) {
              var s = v[v.length - 1].duration * 1e3;
              s < u && (u = s);
            }
          } else
            u /= 2;
          return Math.round(u);
        }
        function i(l, r, u) {
          if (!l || !l.details)
            return null;
          var v = l.details, f = v.fragments[r - v.startSN];
          return f || (f = v.fragmentHint, f && f.sn === r) ? f : r < v.startSN && u && u.sn === r ? u : null;
        }
        function g(l, r, u) {
          if (!l || !l.details)
            return null;
          var v = l.details.partList;
          if (v)
            for (var f = v.length; f--; ) {
              var s = v[f];
              if (s.index === u && s.fragment.sn === r)
                return s;
            }
          return null;
        }
      },
      "./src/controller/stream-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => r
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/controller/base-stream-controller.ts"), C = S("./src/is-supported.ts"), I = S("./src/events.ts"), k = S("./src/utils/buffer-helper.ts"), P = S("./src/controller/fragment-tracker.ts"), L = S("./src/types/loader.ts"), x = S("./src/loader/fragment.ts"), _ = S("./src/demux/transmuxer-interface.ts"), T = S("./src/types/transmuxer.ts"), c = S("./src/controller/gap-controller.ts"), y = S("./src/errors.ts");
        function m(u, v) {
          for (var f = 0; f < v.length; f++) {
            var s = v[f];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, o(s.key), s);
          }
        }
        function n(u, v, f) {
          return v && m(u.prototype, v), f && m(u, f), Object.defineProperty(u, "prototype", { writable: !1 }), u;
        }
        function o(u) {
          var v = a(u, "string");
          return typeof v == "symbol" ? v : String(v);
        }
        function a(u, v) {
          if (typeof u != "object" || u === null)
            return u;
          var f = u[Symbol.toPrimitive];
          if (f !== void 0) {
            var s = f.call(u, v || "default");
            if (typeof s != "object")
              return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (v === "string" ? String : Number)(u);
        }
        function i(u, v) {
          u.prototype = Object.create(v.prototype), u.prototype.constructor = u, g(u, v);
        }
        function g(u, v) {
          return g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(s, t) {
            return s.__proto__ = t, s;
          }, g(u, v);
        }
        var l = 100, r = /* @__PURE__ */ function(u) {
          i(v, u);
          function v(s, t, h) {
            var e;
            return e = u.call(this, s, t, h, "[stream-controller]") || this, e.audioCodecSwap = !1, e.gapController = null, e.level = -1, e._forceStartLoad = !1, e.altAudio = !1, e.audioOnly = !1, e.fragPlaying = null, e.onvplaying = null, e.onvseeked = null, e.fragLastKbps = 0, e.couldBacktrack = !1, e.backtrackFragment = null, e.audioCodecSwitch = !1, e.videoBuffer = null, e._registerListeners(), e;
          }
          var f = v.prototype;
          return f._registerListeners = function() {
            var t = this.hls;
            t.on(I.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.on(I.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.on(I.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.on(I.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.on(I.Events.LEVEL_LOADING, this.onLevelLoading, this), t.on(I.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.on(I.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.on(I.Events.ERROR, this.onError, this), t.on(I.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.on(I.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.on(I.Events.BUFFER_CREATED, this.onBufferCreated, this), t.on(I.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.on(I.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.on(I.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, f._unregisterListeners = function() {
            var t = this.hls;
            t.off(I.Events.MEDIA_ATTACHED, this.onMediaAttached, this), t.off(I.Events.MEDIA_DETACHING, this.onMediaDetaching, this), t.off(I.Events.MANIFEST_LOADING, this.onManifestLoading, this), t.off(I.Events.MANIFEST_PARSED, this.onManifestParsed, this), t.off(I.Events.LEVEL_LOADED, this.onLevelLoaded, this), t.off(I.Events.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), t.off(I.Events.ERROR, this.onError, this), t.off(I.Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), t.off(I.Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), t.off(I.Events.BUFFER_CREATED, this.onBufferCreated, this), t.off(I.Events.BUFFER_FLUSHED, this.onBufferFlushed, this), t.off(I.Events.LEVELS_UPDATED, this.onLevelsUpdated, this), t.off(I.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, f.onHandlerDestroying = function() {
            this._unregisterListeners(), this.onMediaDetaching();
          }, f.startLoad = function(t) {
            if (this.levels) {
              var h = this.lastCurrentTime, e = this.hls;
              if (this.stopLoad(), this.setInterval(l), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                var d = e.startLevel;
                d === -1 && (e.config.testBandwidth && this.levels.length > 1 ? (d = 0, this.bitrateTest = !0) : d = e.nextAutoLevel), this.level = e.nextLoadLevel = d, this.loadedmetadata = !1;
              }
              h > 0 && t === -1 && (this.log("Override startPosition with lastCurrentTime @" + h.toFixed(3)), t = h), this.state = A.State.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t, this.tick();
            } else
              this._forceStartLoad = !0, this.state = A.State.STOPPED;
          }, f.stopLoad = function() {
            this._forceStartLoad = !1, u.prototype.stopLoad.call(this);
          }, f.doTick = function() {
            switch (this.state) {
              case A.State.IDLE:
                this.doTickIdle();
                break;
              case A.State.WAITING_LEVEL: {
                var t, h = this.levels, e = this.level, d = h == null || (t = h[e]) === null || t === void 0 ? void 0 : t.details;
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
          }, f.onTickEnd = function() {
            u.prototype.onTickEnd.call(this), this.checkBuffer(), this.checkFragmentChanged();
          }, f.doTickIdle = function() {
            var t = this.hls, h = this.levelLastLoaded, e = this.levels, d = this.media, E = t.config, p = t.nextLoadLevel;
            if (!(h === null || !d && (this.startFragRequested || !E.startFragPrefetch)) && !(this.altAudio && this.audioOnly) && !(!e || !e[p])) {
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
          }, f.loadFragment = function(t, h, e) {
            var d, E = this.fragmentTracker.getState(t);
            this.fragCurrent = t, E === P.FragmentState.NOT_LOADED ? t.sn === "initSegment" ? this._loadInitSegment(t, h) : this.bitrateTest ? (this.log("Fragment " + t.sn + " of level " + t.level + " is being downloaded to test bitrate and will not be buffered"), this._loadBitrateTestFrag(t, h)) : (this.startFragRequested = !0, u.prototype.loadFragment.call(this, t, h, e)) : E === P.FragmentState.APPENDING ? this.reduceMaxBufferLength(t.duration) && this.fragmentTracker.removeFragment(t) : ((d = this.media) === null || d === void 0 ? void 0 : d.buffered.length) === 0 && this.fragmentTracker.removeAllFragments();
          }, f.getAppendedFrag = function(t) {
            var h = this.fragmentTracker.getAppendedFrag(t, L.PlaylistLevelType.MAIN);
            return h && "fragment" in h ? h.fragment : h;
          }, f.getBufferedFrag = function(t) {
            return this.fragmentTracker.getBufferedFrag(t, L.PlaylistLevelType.MAIN);
          }, f.followingBufferedFrag = function(t) {
            return t ? this.getBufferedFrag(t.end + 0.5) : null;
          }, f.immediateLevelSwitch = function() {
            this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
          }, f.nextLevelSwitch = function() {
            var t = this.levels, h = this.media;
            if (h != null && h.readyState) {
              var e, d = this.getAppendedFrag(h.currentTime);
              if (d && d.start > 1 && this.flushMainBuffer(0, d.start - 1), !h.paused && t) {
                var E = this.hls.nextLoadLevel, p = t[E], D = this.fragLastKbps;
                D && this.fragCurrent ? e = this.fragCurrent.duration * p.maxBitrate / (1e3 * D) + 1 : e = 0;
              } else
                e = 0;
              var R = this.getBufferedFrag(h.currentTime + e);
              if (R) {
                var b = this.followingBufferedFrag(R);
                if (b) {
                  this.abortCurrentFrag();
                  var O = b.maxStartPTS ? b.maxStartPTS : b.start, M = b.duration, w = Math.max(R.end, O + Math.min(Math.max(M - this.config.maxFragLookUpTolerance, M * 0.5), M * 0.75));
                  this.flushMainBuffer(w, Number.POSITIVE_INFINITY);
                }
              }
            }
          }, f.abortCurrentFrag = function() {
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
          }, f.flushMainBuffer = function(t, h) {
            u.prototype.flushMainBuffer.call(this, t, h, this.altAudio ? "video" : null);
          }, f.onMediaAttached = function(t, h) {
            u.prototype.onMediaAttached.call(this, t, h);
            var e = h.media;
            this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), e.addEventListener("playing", this.onvplaying), e.addEventListener("seeked", this.onvseeked), this.gapController = new c.default(this.config, e, this.fragmentTracker, this.hls);
          }, f.onMediaDetaching = function() {
            var t = this.media;
            t && this.onvplaying && this.onvseeked && (t.removeEventListener("playing", this.onvplaying), t.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), u.prototype.onMediaDetaching.call(this);
          }, f.onMediaPlaying = function() {
            this.tick();
          }, f.onMediaSeeked = function() {
            var t = this.media, h = t ? t.currentTime : null;
            (0, F.isFiniteNumber)(h) && this.log("Media seeked to " + h.toFixed(3)), this.tick();
          }, f.onManifestLoading = function() {
            this.log("Trigger BUFFER_RESET"), this.hls.trigger(I.Events.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = 0, this.fragPlaying = null, this.backtrackFragment = null;
          }, f.onManifestParsed = function(t, h) {
            var e = !1, d = !1, E;
            h.levels.forEach(function(p) {
              E = p.audioCodec, E && (E.indexOf("mp4a.40.2") !== -1 && (e = !0), E.indexOf("mp4a.40.5") !== -1 && (d = !0));
            }), this.audioCodecSwitch = e && d && !(0, C.changeTypeSupported)(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = h.levels, this.startFragRequested = !1;
          }, f.onLevelLoading = function(t, h) {
            var e = this.levels;
            if (!(!e || this.state !== A.State.IDLE)) {
              var d = e[h.level];
              (!d.details || d.details.live && this.levelLastLoaded !== h.level || this.waitForCdnTuneIn(d.details)) && (this.state = A.State.WAITING_LEVEL);
            }
          }, f.onLevelLoaded = function(t, h) {
            var e, d = this.levels, E = h.level, p = h.details, D = p.totalduration;
            if (!d) {
              this.warn("Levels were reset while loading level " + E);
              return;
            }
            this.log("Level " + E + " loaded [" + p.startSN + "," + p.endSN + "], cc [" + p.startCC + ", " + p.endCC + "] duration:" + D);
            var R = this.fragCurrent;
            R && (this.state === A.State.FRAG_LOADING || this.state === A.State.FRAG_LOADING_WAITING_RETRY) && R.level !== h.level && R.loader && (this.state = A.State.IDLE, this.backtrackFragment = null, R.abortRequests());
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
          }, f._handleFragmentLoadProgress = function(t) {
            var h, e = t.frag, d = t.part, E = t.payload, p = this.levels;
            if (!p) {
              this.warn("Levels were reset while fragment load was in progress. Fragment " + e.sn + " of level " + e.level + " will not be buffered");
              return;
            }
            var D = p[e.level], R = D.details;
            if (!R) {
              this.warn("Dropping fragment " + e.sn + " of level " + e.level + " after level details were reset");
              return;
            }
            var b = D.videoCodec, O = R.PTSKnown || !R.live, M = (h = e.initSegment) === null || h === void 0 ? void 0 : h.data, w = this._getAudioCodec(D), U = this.transmuxer = this.transmuxer || new _.default(this.hls, L.PlaylistLevelType.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), N = d ? d.index : -1, K = N !== -1, W = new T.ChunkMetadata(e.level, e.sn, e.stats.chunkCount, E.byteLength, N, K), G = this.initPTS[e.cc];
            U.push(E, M, w, b, e, d, R.totalduration, O, W, G);
          }, f.onAudioTrackSwitching = function(t, h) {
            var e = this.altAudio, d = !!h.url, E = h.id;
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
          }, f.onAudioTrackSwitched = function(t, h) {
            var e = h.id, d = !!this.hls.audioTracks[e].url;
            if (d) {
              var E = this.videoBuffer;
              E && this.mediaBuffer !== E && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = E);
            }
            this.altAudio = d, this.tick();
          }, f.onBufferCreated = function(t, h) {
            var e = h.tracks, d, E, p = !1;
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
          }, f.onFragBuffered = function(t, h) {
            var e = h.frag, d = h.part;
            if (!(e && e.type !== L.PlaylistLevelType.MAIN)) {
              if (this.fragContextChanged(e)) {
                this.warn("Fragment " + e.sn + (d ? " p: " + d.index : "") + " of level " + e.level + " finished buffering, but was aborted. state: " + this.state), this.state === A.State.PARSED && (this.state = A.State.IDLE);
                return;
              }
              var E = d ? d.stats : e.stats;
              this.fragLastKbps = Math.round(8 * E.total / (E.buffering.end - E.loading.first)), e.sn !== "initSegment" && (this.fragPrevious = e), this.fragBufferedComplete(e, d);
            }
          }, f.onError = function(t, h) {
            if (h.type === y.ErrorTypes.KEY_SYSTEM_ERROR) {
              this.onFragmentOrKeyLoadError(L.PlaylistLevelType.MAIN, h);
              return;
            }
            switch (h.details) {
              case y.ErrorDetails.FRAG_LOAD_ERROR:
              case y.ErrorDetails.FRAG_LOAD_TIMEOUT:
              case y.ErrorDetails.FRAG_PARSING_ERROR:
              case y.ErrorDetails.KEY_LOAD_ERROR:
              case y.ErrorDetails.KEY_LOAD_TIMEOUT:
                this.onFragmentOrKeyLoadError(L.PlaylistLevelType.MAIN, h);
                break;
              case y.ErrorDetails.LEVEL_LOAD_ERROR:
              case y.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                this.state !== A.State.ERROR && (h.fatal ? (this.warn("" + h.details), this.state = A.State.ERROR) : !h.levelRetry && this.state === A.State.WAITING_LEVEL && (this.state = A.State.IDLE));
                break;
              case y.ErrorDetails.BUFFER_FULL_ERROR:
                if (h.parent === "main" && (this.state === A.State.PARSING || this.state === A.State.PARSED)) {
                  var e = !0, d = this.getFwdBufferInfo(this.media, L.PlaylistLevelType.MAIN);
                  d && d.len > 0.5 && (e = !this.reduceMaxBufferLength(d.len)), e && (this.warn("buffer full error also media.currentTime is not buffered, flush main"), this.immediateLevelSwitch()), this.resetLoadingState();
                }
                break;
            }
          }, f.checkBuffer = function() {
            var t = this.media, h = this.gapController;
            if (!(!t || !h || !t.readyState)) {
              if (this.loadedmetadata || !k.BufferHelper.getBuffered(t).length) {
                var e = this.state !== A.State.IDLE ? this.fragCurrent : null;
                h.poll(this.lastCurrentTime, e);
              }
              this.lastCurrentTime = t.currentTime;
            }
          }, f.onFragLoadEmergencyAborted = function() {
            this.state = A.State.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate();
          }, f.onBufferFlushed = function(t, h) {
            var e = h.type;
            if (e !== x.ElementaryStreamTypes.AUDIO || this.audioOnly && !this.altAudio) {
              var d = (e === x.ElementaryStreamTypes.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
              this.afterBufferFlushed(d, e, L.PlaylistLevelType.MAIN);
            }
          }, f.onLevelsUpdated = function(t, h) {
            this.levels = h.levels;
          }, f.swapAudioCodec = function() {
            this.audioCodecSwap = !this.audioCodecSwap;
          }, f.seekToStartPos = function() {
            var t = this.media;
            if (!!t) {
              var h = t.currentTime, e = this.startPosition;
              if (e >= 0 && h < e) {
                if (t.seeking) {
                  this.log("could not seek to " + e + ", already seeking at " + h);
                  return;
                }
                var d = k.BufferHelper.getBuffered(t), E = d.length ? d.start(0) : 0, p = E - e;
                p > 0 && (p < this.config.maxBufferHole || p < this.config.maxFragLookUpTolerance) && (this.log("adjusting start position by " + p + " to match buffer start"), e += p, this.startPosition = e), this.log("seek to target start position " + e + " from current time " + h), t.currentTime = e;
              }
            }
          }, f._getAudioCodec = function(t) {
            var h = this.config.defaultAudioCodec || t.audioCodec;
            return this.audioCodecSwap && h && (this.log("Swapping audio codec"), h.indexOf("mp4a.40.5") !== -1 ? h = "mp4a.40.2" : h = "mp4a.40.5"), h;
          }, f._loadBitrateTestFrag = function(t, h) {
            var e = this;
            t.bitrateTest = !0, this._doFragLoad(t, h).then(function(d) {
              var E = e.hls;
              if (!(!d || E.nextLoadLevel || e.fragContextChanged(t))) {
                e.fragLoadError = 0, e.state = A.State.IDLE, e.startFragRequested = !1, e.bitrateTest = !1;
                var p = t.stats;
                p.parsing.start = p.parsing.end = p.buffering.start = p.buffering.end = self.performance.now(), E.trigger(I.Events.FRAG_LOADED, d), t.bitrateTest = !1;
              }
            });
          }, f._handleTransmuxComplete = function(t) {
            var h, e = "main", d = this.hls, E = t.remuxResult, p = t.chunkMeta, D = this.getCurrentContext(p);
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
              if (K && U !== null && U !== void 0 && (h = U.samples) !== null && h !== void 0 && h.length) {
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
          }, f._bufferInitSegment = function(t, h, e, d) {
            var E = this;
            if (this.state === A.State.PARSING) {
              this.audioOnly = !!h.audio && !h.video, this.altAudio && !this.audioOnly && delete h.audio;
              var p = h.audio, D = h.video, R = h.audiovideo;
              if (p) {
                var b = t.audioCodec, O = navigator.userAgent.toLowerCase();
                this.audioCodecSwitch && (b && (b.indexOf("mp4a.40.5") !== -1 ? b = "mp4a.40.2" : b = "mp4a.40.5"), p.metadata.channelCount !== 1 && O.indexOf("firefox") === -1 && (b = "mp4a.40.5")), O.indexOf("android") !== -1 && p.container !== "audio/mpeg" && (b = "mp4a.40.2", this.log("Android: force audio codec to " + b)), t.audioCodec && t.audioCodec !== b && this.log('Swapping manifest audio codec "' + t.audioCodec + '" for "' + b + '"'), p.levelCodec = b, p.id = "main", this.log("Init audio buffer, container:" + p.container + ", codecs[selected/level/parsed]=[" + (b || "") + "/" + (t.audioCodec || "") + "/" + p.codec + "]");
              }
              D && (D.levelCodec = t.videoCodec, D.id = "main", this.log("Init video buffer, container:" + D.container + ", codecs[level/parsed]=[" + (t.videoCodec || "") + "/" + D.codec + "]")), R && this.log("Init audiovideo buffer, container:" + R.container + ", codecs[level/parsed]=[" + (t.attrs.CODECS || "") + "/" + R.codec + "]"), this.hls.trigger(I.Events.BUFFER_CODECS, h), Object.keys(h).forEach(function(M) {
                var w = h[M], U = w.initSegment;
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
          }, f.getMainFwdBufferInfo = function() {
            return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, L.PlaylistLevelType.MAIN);
          }, f.backtrack = function(t) {
            this.couldBacktrack = !0, this.backtrackFragment = t, this.resetTransmuxer(), this.flushBufferGap(t), this.fragmentTracker.removeFragment(t), this.fragPrevious = null, this.nextLoadPosition = t.start, this.state = A.State.IDLE;
          }, f.checkFragmentChanged = function() {
            var t = this.media, h = null;
            if (t && t.readyState > 1 && t.seeking === !1) {
              var e = t.currentTime;
              if (k.BufferHelper.isBuffered(t, e) ? h = this.getAppendedFrag(e) : k.BufferHelper.isBuffered(t, e + 0.1) && (h = this.getAppendedFrag(e + 0.1)), h) {
                this.backtrackFragment = null;
                var d = this.fragPlaying, E = h.level;
                (!d || h.sn !== d.sn || d.level !== E || h.urlId !== d.urlId) && (this.fragPlaying = h, this.hls.trigger(I.Events.FRAG_CHANGED, {
                  frag: h
                }), (!d || d.level !== E) && this.hls.trigger(I.Events.LEVEL_SWITCHED, {
                  level: E
                }));
              }
            }
          }, n(v, [{
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
                var h = t.currentTime, e = this.currentFrag;
                if (e && (0, F.isFiniteNumber)(h) && (0, F.isFiniteNumber)(e.programDateTime)) {
                  var d = e.programDateTime + (h - e.start) * 1e3;
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
        function T(l, r) {
          for (var u = 0; u < r.length; u++) {
            var v = r[u];
            v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(l, y(v.key), v);
          }
        }
        function c(l, r, u) {
          return r && T(l.prototype, r), u && T(l, u), Object.defineProperty(l, "prototype", { writable: !1 }), l;
        }
        function y(l) {
          var r = m(l, "string");
          return typeof r == "symbol" ? r : String(r);
        }
        function m(l, r) {
          if (typeof l != "object" || l === null)
            return l;
          var u = l[Symbol.toPrimitive];
          if (u !== void 0) {
            var v = u.call(l, r || "default");
            if (typeof v != "object")
              return v;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (r === "string" ? String : Number)(l);
        }
        function n(l, r) {
          l.prototype = Object.create(r.prototype), l.prototype.constructor = l, o(l, r);
        }
        function o(l, r) {
          return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(v, f) {
            return v.__proto__ = f, v;
          }, o(l, r);
        }
        var a = 500, i = /* @__PURE__ */ function(l) {
          n(r, l);
          function r(v, f, s) {
            var t;
            return t = l.call(this, v, f, s, "[subtitle-stream-controller]") || this, t.levels = [], t.currentTrackId = -1, t.tracksBuffered = [], t.mainDetails = null, t._registerListeners(), t;
          }
          var u = r.prototype;
          return u.onHandlerDestroying = function() {
            this._unregisterListeners(), this.mainDetails = null;
          }, u._registerListeners = function() {
            var f = this.hls;
            f.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), f.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), f.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), f.on(F.Events.LEVEL_LOADED, this.onLevelLoaded, this), f.on(F.Events.ERROR, this.onError, this), f.on(F.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), f.on(F.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), f.on(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), f.on(F.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), f.on(F.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), f.on(F.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u._unregisterListeners = function() {
            var f = this.hls;
            f.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), f.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), f.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), f.off(F.Events.LEVEL_LOADED, this.onLevelLoaded, this), f.off(F.Events.ERROR, this.onError, this), f.off(F.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), f.off(F.Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), f.off(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), f.off(F.Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), f.off(F.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), f.off(F.Events.FRAG_BUFFERED, this.onFragBuffered, this);
          }, u.startLoad = function(f) {
            this.stopLoad(), this.state = L.State.IDLE, this.setInterval(a), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = f, this.tick();
          }, u.onManifestLoading = function() {
            this.mainDetails = null, this.fragmentTracker.removeAllFragments();
          }, u.onLevelLoaded = function(f, s) {
            this.mainDetails = s.details;
          }, u.onSubtitleFragProcessed = function(f, s) {
            var t = s.frag, h = s.success;
            if (this.fragPrevious = t, this.state = L.State.IDLE, !!h) {
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
          }, u.onBufferFlushing = function(f, s) {
            var t = s.startOffset, h = s.endOffset;
            if (t === 0 && h !== Number.POSITIVE_INFINITY) {
              var e = this.currentTrackId, d = this.levels;
              if (!d.length || !d[e] || !d[e].details)
                return;
              var E = d[e].details, p = E.targetduration, D = h - p;
              if (D <= 0)
                return;
              s.endOffsetSubtitles = Math.max(0, D), this.tracksBuffered.forEach(function(R) {
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
          }, u.onFragBuffered = function(f, s) {
            if (!this.loadedmetadata && s.frag.type === x.PlaylistLevelType.MAIN) {
              var t;
              (t = this.media) !== null && t !== void 0 && t.buffered.length && (this.loadedmetadata = !0);
            }
          }, u.onError = function(f, s) {
            var t = s.frag;
            !t || t.type !== x.PlaylistLevelType.SUBTITLE || (this.fragCurrent && this.fragCurrent.abortRequests(), this.state = L.State.IDLE);
          }, u.onSubtitleTracksUpdated = function(f, s) {
            var t = this, h = s.subtitleTracks;
            this.tracksBuffered = [], this.levels = h.map(function(e) {
              return new _.Level(e);
            }), this.fragmentTracker.removeAllFragments(), this.fragPrevious = null, this.levels.forEach(function(e) {
              t.tracksBuffered[e.id] = [];
            }), this.mediaBuffer = null;
          }, u.onSubtitleTrackSwitch = function(f, s) {
            if (this.currentTrackId = s.id, !this.levels.length || this.currentTrackId === -1) {
              this.clearInterval();
              return;
            }
            var t = this.levels[this.currentTrackId];
            t != null && t.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, t && this.setInterval(a);
          }, u.onSubtitleTrackLoaded = function(f, s) {
            var t, h = s.details, e = s.id, d = this.currentTrackId, E = this.levels;
            if (!!E.length) {
              var p = E[d];
              if (!(e >= E.length || e !== d || !p)) {
                this.mediaBuffer = this.mediaBufferTimeRanges;
                var D = 0;
                if (h.live || (t = p.details) !== null && t !== void 0 && t.live) {
                  var R = this.mainDetails;
                  if (h.deltaUpdateFailed || !R)
                    return;
                  var b = R.fragments[0];
                  p.details ? (D = this.alignPlaylists(h, p.details), D === 0 && b && (D = b.start, (0, k.addSliding)(h, D))) : h.hasProgramDateTime && R.hasProgramDateTime ? ((0, I.alignMediaPlaylistByPDT)(h, R), D = h.fragments[0].start) : b && (D = b.start, (0, k.addSliding)(h, D));
                }
                if (p.details = h, this.levelLastLoaded = e, !this.startFragRequested && (this.mainDetails || !h.live) && this.setStartPosition(p.details, D), this.tick(), h.live && !this.fragCurrent && this.media && this.state === L.State.IDLE) {
                  var O = (0, C.findFragmentByPTS)(null, h.fragments, this.media.currentTime, 0);
                  O || (this.warn("Subtitle playlist not aligned with playback"), p.details = void 0);
                }
              }
            }
          }, u._handleFragmentLoadComplete = function(f) {
            var s = this, t = f.frag, h = f.payload, e = t.decryptdata, d = this.hls;
            if (!this.fragContextChanged(t) && h && h.byteLength > 0 && e && e.key && e.iv && e.method === "AES-128") {
              var E = performance.now();
              this.decrypter.decrypt(new Uint8Array(h), e.key.buffer, e.iv.buffer).then(function(p) {
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
                s.warn(p.name + ": " + p.message), s.state = L.State.IDLE;
              });
            }
          }, u.doTick = function() {
            if (!this.media) {
              this.state = L.State.IDLE;
              return;
            }
            if (this.state === L.State.IDLE) {
              var f = this.currentTrackId, s = this.levels;
              if (!s.length || !s[f] || !s[f].details)
                return;
              var t = s[f].details, h = t.targetduration, e = this.config, d = this.getLoadPosition(), E = A.BufferHelper.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], d - h, e.maxBufferHole), p = E.end, D = E.len, R = this.getFwdBufferInfo(this.media, x.PlaylistLevelType.MAIN), b = this.getMaxBufferLength(R == null ? void 0 : R.len) + h;
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
          }, u.getMaxBufferLength = function(f) {
            var s = l.prototype.getMaxBufferLength.call(this);
            return f ? Math.max(s, f) : s;
          }, u.loadFragment = function(f, s, t) {
            this.fragCurrent = f, f.sn === "initSegment" ? this._loadInitSegment(f, s) : (this.startFragRequested = !0, l.prototype.loadFragment.call(this, f, s, t));
          }, c(r, [{
            key: "mediaBufferTimeRanges",
            get: function() {
              return new g(this.tracksBuffered[this.currentTrackId] || []);
            }
          }]), r;
        }(L.default), g = function(r) {
          this.buffered = void 0;
          var u = function(f, s, t) {
            if (s = s >>> 0, s > t - 1)
              throw new DOMException("Failed to execute '" + f + "' on 'TimeRanges': The index provided (" + s + ") is greater than the maximum bound (" + t + ")");
            return r[s][f];
          };
          this.buffered = {
            get length() {
              return r.length;
            },
            end: function(f) {
              return u("end", f, r.length);
            },
            start: function(f) {
              return u("start", f, r.length);
            }
          };
        };
      },
      "./src/controller/subtitle-track-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => m
        });
        var F = S("./src/events.ts"), A = S("./src/utils/texttrack-utils.ts"), C = S("./src/controller/base-playlist-controller.ts"), I = S("./src/types/loader.ts");
        function k(n, o) {
          for (var a = 0; a < o.length; a++) {
            var i = o[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, L(i.key), i);
          }
        }
        function P(n, o, a) {
          return o && k(n.prototype, o), a && k(n, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        }
        function L(n) {
          var o = x(n, "string");
          return typeof o == "symbol" ? o : String(o);
        }
        function x(n, o) {
          if (typeof n != "object" || n === null)
            return n;
          var a = n[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(n, o || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (o === "string" ? String : Number)(n);
        }
        function _(n, o) {
          n.prototype = Object.create(o.prototype), n.prototype.constructor = n, T(n, o);
        }
        function T(n, o) {
          return T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, T(n, o);
        }
        var c = /* @__PURE__ */ function(n) {
          _(o, n);
          function o(i) {
            var g;
            return g = n.call(this, i, "[subtitle-track-controller]") || this, g.media = null, g.tracks = [], g.groupId = null, g.tracksInGroup = [], g.trackId = -1, g.selectDefaultTrack = !0, g.queuedDefaultTrack = -1, g.trackChangeListener = function() {
              return g.onTextTracksChanged();
            }, g.asyncPollTrackChange = function() {
              return g.pollTrackChange(0);
            }, g.useTextTrackPolling = !1, g.subtitlePollingInterval = -1, g._subtitleDisplay = !0, g.registerListeners(), g;
          }
          var a = o.prototype;
          return a.destroy = function() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.trackChangeListener = this.asyncPollTrackChange = null, n.prototype.destroy.call(this);
          }, a.registerListeners = function() {
            var g = this.hls;
            g.on(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), g.on(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.on(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.on(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), g.on(F.Events.LEVEL_LOADING, this.onLevelLoading, this), g.on(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), g.on(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), g.on(F.Events.ERROR, this.onError, this);
          }, a.unregisterListeners = function() {
            var g = this.hls;
            g.off(F.Events.MEDIA_ATTACHED, this.onMediaAttached, this), g.off(F.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.off(F.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.off(F.Events.MANIFEST_PARSED, this.onManifestParsed, this), g.off(F.Events.LEVEL_LOADING, this.onLevelLoading, this), g.off(F.Events.LEVEL_SWITCHING, this.onLevelSwitching, this), g.off(F.Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), g.off(F.Events.ERROR, this.onError, this);
          }, a.onMediaAttached = function(g, l) {
            this.media = l.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
          }, a.pollTrackChange = function(g) {
            self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.trackChangeListener, g);
          }, a.onMediaDetaching = function() {
            if (!!this.media) {
              self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId);
              var g = y(this.media.textTracks);
              g.forEach(function(l) {
                (0, A.clearCurrentCues)(l);
              }), this.subtitleTrack = -1, this.media = null;
            }
          }, a.onManifestLoading = function() {
            this.tracks = [], this.groupId = null, this.tracksInGroup = [], this.trackId = -1, this.selectDefaultTrack = !0;
          }, a.onManifestParsed = function(g, l) {
            this.tracks = l.subtitleTracks;
          }, a.onSubtitleTrackLoaded = function(g, l) {
            var r = l.id, u = l.details, v = this.trackId, f = this.tracksInGroup[v];
            if (!f) {
              this.warn("Invalid subtitle track id " + r);
              return;
            }
            var s = f.details;
            f.details = l.details, this.log("subtitle track " + r + " loaded [" + u.startSN + "-" + u.endSN + "]"), r === this.trackId && (this.retryCount = 0, this.playlistLoaded(r, l, s));
          }, a.onLevelLoading = function(g, l) {
            this.switchLevel(l.level);
          }, a.onLevelSwitching = function(g, l) {
            this.switchLevel(l.level);
          }, a.switchLevel = function(g) {
            var l = this.hls.levels[g];
            if (!!(l != null && l.textGroupIds)) {
              var r = l.textGroupIds[l.urlId];
              if (this.groupId !== r) {
                var u = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0, v = this.tracks.filter(function(t) {
                  return !r || t.groupId === r;
                });
                this.tracksInGroup = v;
                var f = this.findTrackId(u == null ? void 0 : u.name) || this.findTrackId();
                this.groupId = r;
                var s = {
                  subtitleTracks: v
                };
                this.log("Updating subtitle tracks, " + v.length + ' track(s) found in "' + r + '" group-id'), this.hls.trigger(F.Events.SUBTITLE_TRACKS_UPDATED, s), f !== -1 && this.setSubtitleTrack(f, u);
              }
            }
          }, a.findTrackId = function(g) {
            for (var l = this.tracksInGroup, r = 0; r < l.length; r++) {
              var u = l[r];
              if ((!this.selectDefaultTrack || u.default) && (!g || g === u.name))
                return u.id;
            }
            return -1;
          }, a.onError = function(g, l) {
            n.prototype.onError.call(this, g, l), !(l.fatal || !l.context) && l.context.type === I.PlaylistContextType.SUBTITLE_TRACK && l.context.id === this.trackId && l.context.groupId === this.groupId && this.retryLoadingOrFail(l);
          }, a.loadPlaylist = function(g) {
            n.prototype.loadPlaylist.call(this);
            var l = this.tracksInGroup[this.trackId];
            if (this.shouldLoadTrack(l)) {
              var r = l.id, u = l.groupId, v = l.url;
              if (g)
                try {
                  v = g.addDirectives(v);
                } catch (f) {
                  this.warn("Could not construct new URL with HLS Delivery Directives: " + f);
                }
              this.log("Loading subtitle playlist for id " + r), this.hls.trigger(F.Events.SUBTITLE_TRACK_LOADING, {
                url: v,
                id: r,
                groupId: u,
                deliveryDirectives: g || null
              });
            }
          }, a.toggleTrackModes = function(g) {
            var l = this, r = this.media, u = this.trackId;
            if (!!r) {
              var v = y(r.textTracks), f = v.filter(function(h) {
                return h.groupId === l.groupId;
              });
              if (g === -1)
                [].slice.call(v).forEach(function(h) {
                  h.mode = "disabled";
                });
              else {
                var s = f[u];
                s && (s.mode = "disabled");
              }
              var t = f[g];
              t && (t.mode = this.subtitleDisplay ? "showing" : "hidden");
            }
          }, a.setSubtitleTrack = function(g, l) {
            var r, u = this.tracksInGroup;
            if (!this.media) {
              this.queuedDefaultTrack = g;
              return;
            }
            if (this.trackId !== g && this.toggleTrackModes(g), !(this.trackId === g && (g === -1 || (r = u[g]) !== null && r !== void 0 && r.details) || g < -1 || g >= u.length)) {
              this.clearTimer();
              var v = u[g];
              if (this.log("Switching to subtitle track " + g), this.trackId = g, v) {
                var f = v.id, s = v.groupId, t = s === void 0 ? "" : s, h = v.name, e = v.type, d = v.url;
                this.hls.trigger(F.Events.SUBTITLE_TRACK_SWITCH, {
                  id: f,
                  groupId: t,
                  name: h,
                  type: e,
                  url: d
                });
                var E = this.switchParams(v.url, l == null ? void 0 : l.details);
                this.loadPlaylist(E);
              } else
                this.hls.trigger(F.Events.SUBTITLE_TRACK_SWITCH, {
                  id: g
                });
            }
          }, a.onTextTracksChanged = function() {
            if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !(!this.media || !this.hls.config.renderTextTracksNatively)) {
              for (var g = -1, l = y(this.media.textTracks), r = 0; r < l.length; r++)
                if (l[r].mode === "hidden")
                  g = r;
                else if (l[r].mode === "showing") {
                  g = r;
                  break;
                }
              this.subtitleTrack !== g && (this.subtitleTrack = g);
            }
          }, P(o, [{
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
              var l = this.tracksInGroup ? this.tracksInGroup[this.trackId] : void 0;
              this.setSubtitleTrack(g, l);
            }
          }]), o;
        }(C.default);
        function y(n) {
          for (var o = [], a = 0; a < n.length; a++) {
            var i = n[a];
            i.kind === "subtitles" && i.label && o.push(n[a]);
          }
          return o;
        }
        const m = c;
      },
      "./src/controller/timeline-controller.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          TimelineController: () => c
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/events.ts"), C = S("./src/utils/cea-608-parser.ts"), I = S("./src/utils/output-filter.ts"), k = S("./src/utils/webvtt-parser.ts"), P = S("./src/utils/texttrack-utils.ts"), L = S("./src/utils/imsc1-ttml-parser.ts"), x = S("./src/utils/mp4-tools.ts"), _ = S("./src/types/loader.ts"), T = S("./src/utils/logger.ts"), c = /* @__PURE__ */ function() {
          function o(i) {
            if (this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.timescale = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = n(), this.captionsProperties = void 0, this.hls = i, this.config = i.config, this.Cues = i.config.cueHandler, this.captionsProperties = {
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
              var g = new I.default(this, "textTrack1"), l = new I.default(this, "textTrack2"), r = new I.default(this, "textTrack3"), u = new I.default(this, "textTrack4");
              this.cea608Parser1 = new C.default(1, g, l), this.cea608Parser2 = new C.default(3, r, u);
            }
            i.on(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), i.on(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), i.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), i.on(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), i.on(A.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), i.on(A.Events.FRAG_LOADING, this.onFragLoading, this), i.on(A.Events.FRAG_LOADED, this.onFragLoaded, this), i.on(A.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), i.on(A.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), i.on(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), i.on(A.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), i.on(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this);
          }
          var a = o.prototype;
          return a.destroy = function() {
            var g = this.hls;
            g.off(A.Events.MEDIA_ATTACHING, this.onMediaAttaching, this), g.off(A.Events.MEDIA_DETACHING, this.onMediaDetaching, this), g.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), g.off(A.Events.MANIFEST_LOADED, this.onManifestLoaded, this), g.off(A.Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), g.off(A.Events.FRAG_LOADING, this.onFragLoading, this), g.off(A.Events.FRAG_LOADED, this.onFragLoaded, this), g.off(A.Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), g.off(A.Events.FRAG_DECRYPTED, this.onFragDecrypted, this), g.off(A.Events.INIT_PTS_FOUND, this.onInitPtsFound, this), g.off(A.Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), g.off(A.Events.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null;
          }, a.addCues = function(g, l, r, u, v) {
            for (var f = !1, s = v.length; s--; ) {
              var t = v[s], h = m(t[0], t[1], l, r);
              if (h >= 0 && (t[0] = Math.min(t[0], l), t[1] = Math.max(t[1], r), f = !0, h / (r - l) > 0.5))
                return;
            }
            if (f || v.push([l, r]), this.config.renderTextTracksNatively) {
              var e = this.captionsTracks[g];
              this.Cues.newCue(e, l, r, u);
            } else {
              var d = this.Cues.newCue(null, l, r, u);
              this.hls.trigger(A.Events.CUES_PARSED, {
                type: "captions",
                cues: d,
                track: g
              });
            }
          }, a.onInitPtsFound = function(g, l) {
            var r = this, u = l.frag, v = l.id, f = l.initPTS, s = l.timescale, t = this.unparsedVttFrags;
            v === "main" && (this.initPTS[u.cc] = f, this.timescale[u.cc] = s), t.length && (this.unparsedVttFrags = [], t.forEach(function(h) {
              r.onFragLoaded(A.Events.FRAG_LOADED, h);
            }));
          }, a.getExistingTrack = function(g) {
            var l = this.media;
            if (l)
              for (var r = 0; r < l.textTracks.length; r++) {
                var u = l.textTracks[r];
                if (u[g])
                  return u;
              }
            return null;
          }, a.createCaptionsTrack = function(g) {
            this.config.renderTextTracksNatively ? this.createNativeTrack(g) : this.createNonNativeTrack(g);
          }, a.createNativeTrack = function(g) {
            if (!this.captionsTracks[g]) {
              var l = this.captionsProperties, r = this.captionsTracks, u = this.media, v = l[g], f = v.label, s = v.languageCode, t = this.getExistingTrack(g);
              if (t)
                r[g] = t, (0, P.clearCurrentCues)(r[g]), (0, P.sendAddTrackEvent)(r[g], u);
              else {
                var h = this.createTextTrack("captions", f, s);
                h && (h[g] = !0, r[g] = h);
              }
            }
          }, a.createNonNativeTrack = function(g) {
            if (!this.nonNativeCaptionsTracks[g]) {
              var l = this.captionsProperties[g];
              if (!!l) {
                var r = l.label, u = {
                  _id: g,
                  label: r,
                  kind: "captions",
                  default: l.media ? !!l.media.default : !1,
                  closedCaptions: l.media
                };
                this.nonNativeCaptionsTracks[g] = u, this.hls.trigger(A.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                  tracks: [u]
                });
              }
            }
          }, a.createTextTrack = function(g, l, r) {
            var u = this.media;
            if (!!u)
              return u.addTextTrack(g, l, r);
          }, a.onMediaAttaching = function(g, l) {
            this.media = l.media, this._cleanTracks();
          }, a.onMediaDetaching = function() {
            var g = this.captionsTracks;
            Object.keys(g).forEach(function(l) {
              (0, P.clearCurrentCues)(g[l]), delete g[l];
            }), this.nonNativeCaptionsTracks = {};
          }, a.onManifestLoading = function() {
            this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = n(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = this.unparsedVttFrags || [], this.initPTS = [], this.timescale = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
          }, a._cleanTracks = function() {
            var g = this.media;
            if (!!g) {
              var l = g.textTracks;
              if (l)
                for (var r = 0; r < l.length; r++)
                  (0, P.clearCurrentCues)(l[r]);
            }
          }, a.onSubtitleTracksUpdated = function(g, l) {
            var r = this;
            this.textTracks = [];
            var u = l.subtitleTracks || [], v = u.some(function(h) {
              return h.textCodec === L.IMSC1_CODEC;
            });
            if (this.config.enableWebVTT || v && this.config.enableIMSC1) {
              var f = this.tracks && u && this.tracks.length === u.length;
              if (this.tracks = u || [], this.config.renderTextTracksNatively) {
                var s = this.media ? this.media.textTracks : [];
                this.tracks.forEach(function(h, e) {
                  var d;
                  if (e < s.length) {
                    for (var E = null, p = 0; p < s.length; p++)
                      if (y(s[p], h)) {
                        E = s[p];
                        break;
                      }
                    E && (d = E);
                  }
                  if (d)
                    (0, P.clearCurrentCues)(d);
                  else {
                    var D = r._captionsOrSubtitlesFromCharacteristics(h);
                    d = r.createTextTrack(D, h.name, h.lang), d && (d.mode = "disabled");
                  }
                  d && (d.groupId = h.groupId, r.textTracks.push(d));
                });
              } else if (!f && this.tracks && this.tracks.length) {
                var t = this.tracks.map(function(h) {
                  return {
                    label: h.name,
                    kind: h.type.toLowerCase(),
                    default: h.default,
                    subtitleTrack: h
                  };
                });
                this.hls.trigger(A.Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
                  tracks: t
                });
              }
            }
          }, a._captionsOrSubtitlesFromCharacteristics = function(g) {
            var l;
            if ((l = g.attrs) !== null && l !== void 0 && l.CHARACTERISTICS) {
              var r = /transcribes-spoken-dialog/gi.test(g.attrs.CHARACTERISTICS), u = /describes-music-and-sound/gi.test(g.attrs.CHARACTERISTICS);
              if (r && u)
                return "captions";
            }
            return "subtitles";
          }, a.onManifestLoaded = function(g, l) {
            var r = this;
            this.config.enableCEA708Captions && l.captions && l.captions.forEach(function(u) {
              var v = /(?:CC|SERVICE)([1-4])/.exec(u.instreamId);
              if (!!v) {
                var f = "textTrack" + v[1], s = r.captionsProperties[f];
                !s || (s.label = u.name, u.lang && (s.languageCode = u.lang), s.media = u);
              }
            });
          }, a.closedCaptionsForLevel = function(g) {
            var l = this.hls.levels[g.level];
            return l == null ? void 0 : l.attrs["CLOSED-CAPTIONS"];
          }, a.onFragLoading = function(g, l) {
            var r = this.cea608Parser1, u = this.cea608Parser2, v = this.lastSn, f = this.lastPartIndex;
            if (!(!this.enabled || !(r && u)) && l.frag.type === _.PlaylistLevelType.MAIN) {
              var s, t, h = l.frag.sn, e = (s = l == null || (t = l.part) === null || t === void 0 ? void 0 : t.index) != null ? s : -1;
              h === v + 1 || h === v && e === f + 1 || (r.reset(), u.reset()), this.lastSn = h, this.lastPartIndex = e;
            }
          }, a.onFragLoaded = function(g, l) {
            var r = l.frag, u = l.payload, v = this.initPTS, f = this.unparsedVttFrags;
            if (r.type === _.PlaylistLevelType.SUBTITLE)
              if (u.byteLength) {
                if (!(0, F.isFiniteNumber)(v[r.cc])) {
                  f.push(l), v.length && this.hls.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: r,
                    error: new Error("Missing initial subtitle PTS")
                  });
                  return;
                }
                var s = r.decryptdata, t = "stats" in l;
                if (s == null || !s.encrypted || t) {
                  var h = this.tracks[r.level], e = this.vttCCs;
                  e[r.cc] || (e[r.cc] = {
                    start: r.start,
                    prevCC: this.prevCC,
                    new: !0
                  }, this.prevCC = r.cc), h && h.textCodec === L.IMSC1_CODEC ? this._parseIMSC1(r, u) : this._parseVTTs(r, u, e);
                }
              } else
                this.hls.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                  success: !1,
                  frag: r,
                  error: new Error("Empty subtitle payload")
                });
          }, a._parseIMSC1 = function(g, l) {
            var r = this, u = this.hls;
            (0, L.parseIMSC1)(l, this.initPTS[g.cc], this.timescale[g.cc], function(v) {
              r._appendCues(v, g.level), u.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !0,
                frag: g
              });
            }, function(v) {
              T.logger.log("Failed to parse IMSC1: " + v), u.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: g,
                error: v
              });
            });
          }, a._parseVTTs = function(g, l, r) {
            var u, v = this, f = this.hls, s = (u = g.initSegment) !== null && u !== void 0 && u.data ? (0, x.appendUint8Array)(g.initSegment.data, new Uint8Array(l)) : l;
            (0, k.parseWebVTT)(s, this.initPTS[g.cc], this.timescale[g.cc], r, g.cc, g.start, function(t) {
              v._appendCues(t, g.level), f.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !0,
                frag: g
              });
            }, function(t) {
              v._fallbackToIMSC1(g, l), T.logger.log("Failed to parse VTT cue: " + t), f.trigger(A.Events.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: g,
                error: t
              });
            });
          }, a._fallbackToIMSC1 = function(g, l) {
            var r = this, u = this.tracks[g.level];
            u.textCodec || (0, L.parseIMSC1)(l, this.initPTS[g.cc], this.timescale[g.cc], function() {
              u.textCodec = L.IMSC1_CODEC, r._parseIMSC1(g, l);
            }, function() {
              u.textCodec = "wvtt";
            });
          }, a._appendCues = function(g, l) {
            var r = this.hls;
            if (this.config.renderTextTracksNatively) {
              var u = this.textTracks[l];
              if (!u || u.mode === "disabled")
                return;
              g.forEach(function(s) {
                return (0, P.addCueToTrack)(u, s);
              });
            } else {
              var v = this.tracks[l];
              if (!v)
                return;
              var f = v.default ? "default" : "subtitles" + l;
              r.trigger(A.Events.CUES_PARSED, {
                type: "subtitles",
                cues: g,
                track: f
              });
            }
          }, a.onFragDecrypted = function(g, l) {
            var r = l.frag;
            if (r.type === _.PlaylistLevelType.SUBTITLE) {
              if (!(0, F.isFiniteNumber)(this.initPTS[r.cc])) {
                this.unparsedVttFrags.push(l);
                return;
              }
              this.onFragLoaded(A.Events.FRAG_LOADED, l);
            }
          }, a.onSubtitleTracksCleared = function() {
            this.tracks = [], this.captionsTracks = {};
          }, a.onFragParsingUserdata = function(g, l) {
            var r = this.cea608Parser1, u = this.cea608Parser2;
            if (!(!this.enabled || !(r && u))) {
              var v = l.frag, f = l.samples;
              if (!(v.type === _.PlaylistLevelType.MAIN && this.closedCaptionsForLevel(v) === "NONE"))
                for (var s = 0; s < f.length; s++) {
                  var t = f[s].bytes;
                  if (t) {
                    var h = this.extractCea608Data(t);
                    r.addData(f[s].pts, h[0]), u.addData(f[s].pts, h[1]);
                  }
                }
            }
          }, a.onBufferFlushing = function(g, l) {
            var r = l.startOffset, u = l.endOffset, v = l.endOffsetSubtitles, f = l.type, s = this.media;
            if (!(!s || s.currentTime < u)) {
              if (!f || f === "video") {
                var t = this.captionsTracks;
                Object.keys(t).forEach(function(e) {
                  return (0, P.removeCuesInRange)(t[e], r, u);
                });
              }
              if (this.config.renderTextTracksNatively && r === 0 && v !== void 0) {
                var h = this.textTracks;
                Object.keys(h).forEach(function(e) {
                  return (0, P.removeCuesInRange)(h[e], r, v);
                });
              }
            }
          }, a.extractCea608Data = function(g) {
            for (var l = [[], []], r = g[0] & 31, u = 2, v = 0; v < r; v++) {
              var f = g[u++], s = 127 & g[u++], t = 127 & g[u++];
              if (!(s === 0 && t === 0)) {
                var h = (4 & f) !== 0;
                if (h) {
                  var e = 3 & f;
                  (e === 0 || e === 1) && (l[e].push(s), l[e].push(t));
                }
              }
            }
            return l;
          }, o;
        }();
        function y(o, a) {
          return o && o.label === a.name && !(o.textTrack1 || o.textTrack2);
        }
        function m(o, a, i, g) {
          return Math.min(a, g) - Math.max(o, i);
        }
        function n() {
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
            var L = this.sBox, x = this.invSBox, _ = this.subMix, T = _[0], c = _[1], y = _[2], m = _[3], n = this.invSubMix, o = n[0], a = n[1], i = n[2], g = n[3], l = new Uint32Array(256), r = 0, u = 0, v = 0;
            for (v = 0; v < 256; v++)
              v < 128 ? l[v] = v << 1 : l[v] = v << 1 ^ 283;
            for (v = 0; v < 256; v++) {
              var f = u ^ u << 1 ^ u << 2 ^ u << 3 ^ u << 4;
              f = f >>> 8 ^ f & 255 ^ 99, L[r] = f, x[f] = r;
              var s = l[r], t = l[s], h = l[t], e = l[f] * 257 ^ f * 16843008;
              T[r] = e << 24 | e >>> 8, c[r] = e << 16 | e >>> 16, y[r] = e << 8 | e >>> 24, m[r] = e, e = h * 16843009 ^ t * 65537 ^ s * 257 ^ r * 16843008, o[f] = e << 24 | e >>> 8, a[f] = e << 16 | e >>> 16, i[f] = e << 8 | e >>> 24, g[f] = e, r ? (r = s ^ l[l[l[h ^ s]]], u ^= l[l[u]]) : r = u = 1;
            }
          }, k.expandKey = function(L) {
            for (var x = this.uint8ArrayToUint32Array_(L), _ = !0, T = 0; T < x.length && _; )
              _ = x[T] === this.key[T], T++;
            if (!_) {
              this.key = x;
              var c = this.keySize = x.length;
              if (c !== 4 && c !== 6 && c !== 8)
                throw new Error("Invalid aes key size=" + c);
              var y = this.ksRows = (c + 6 + 1) * 4, m, n, o = this.keySchedule = new Uint32Array(y), a = this.invKeySchedule = new Uint32Array(y), i = this.sBox, g = this.rcon, l = this.invSubMix, r = l[0], u = l[1], v = l[2], f = l[3], s, t;
              for (m = 0; m < y; m++) {
                if (m < c) {
                  s = o[m] = x[m];
                  continue;
                }
                t = s, m % c === 0 ? (t = t << 8 | t >>> 24, t = i[t >>> 24] << 24 | i[t >>> 16 & 255] << 16 | i[t >>> 8 & 255] << 8 | i[t & 255], t ^= g[m / c | 0] << 24) : c > 6 && m % c === 4 && (t = i[t >>> 24] << 24 | i[t >>> 16 & 255] << 16 | i[t >>> 8 & 255] << 8 | i[t & 255]), o[m] = s = (o[m - c] ^ t) >>> 0;
              }
              for (n = 0; n < y; n++)
                m = y - n, n & 3 ? t = o[m] : t = o[m - 4], n < 4 || m <= 4 ? a[n] = t : a[n] = r[i[t >>> 24]] ^ u[i[t >>> 16 & 255]] ^ v[i[t >>> 8 & 255]] ^ f[i[t & 255]], a[n] = a[n] >>> 0;
            }
          }, k.networkToHostOrderSwap = function(L) {
            return L << 24 | (L & 65280) << 8 | (L & 16711680) >> 8 | L >>> 24;
          }, k.decrypt = function(L, x, _) {
            for (var T = this.keySize + 6, c = this.invKeySchedule, y = this.invSBox, m = this.invSubMix, n = m[0], o = m[1], a = m[2], i = m[3], g = this.uint8ArrayToUint32Array_(_), l = g[0], r = g[1], u = g[2], v = g[3], f = new Int32Array(L), s = new Int32Array(f.length), t, h, e, d, E, p, D, R, b, O, M, w, U, N, K = this.networkToHostOrderSwap; x < f.length; ) {
              for (b = K(f[x]), O = K(f[x + 1]), M = K(f[x + 2]), w = K(f[x + 3]), E = b ^ c[0], p = w ^ c[1], D = M ^ c[2], R = O ^ c[3], U = 4, N = 1; N < T; N++)
                t = n[E >>> 24] ^ o[p >> 16 & 255] ^ a[D >> 8 & 255] ^ i[R & 255] ^ c[U], h = n[p >>> 24] ^ o[D >> 16 & 255] ^ a[R >> 8 & 255] ^ i[E & 255] ^ c[U + 1], e = n[D >>> 24] ^ o[R >> 16 & 255] ^ a[E >> 8 & 255] ^ i[p & 255] ^ c[U + 2], d = n[R >>> 24] ^ o[E >> 16 & 255] ^ a[p >> 8 & 255] ^ i[D & 255] ^ c[U + 3], E = t, p = h, D = e, R = d, U = U + 4;
              t = y[E >>> 24] << 24 ^ y[p >> 16 & 255] << 16 ^ y[D >> 8 & 255] << 8 ^ y[R & 255] ^ c[U], h = y[p >>> 24] << 24 ^ y[D >> 16 & 255] << 16 ^ y[R >> 8 & 255] << 8 ^ y[E & 255] ^ c[U + 1], e = y[D >>> 24] << 24 ^ y[R >> 16 & 255] << 16 ^ y[E >> 8 & 255] << 8 ^ y[p & 255] ^ c[U + 2], d = y[R >>> 24] << 24 ^ y[E >> 16 & 255] << 16 ^ y[p >> 8 & 255] << 8 ^ y[D & 255] ^ c[U + 3], s[x] = K(t ^ l), s[x + 1] = K(d ^ r), s[x + 2] = K(e ^ u), s[x + 3] = K(h ^ v), l = b, r = O, u = M, v = w, x = x + 4;
            }
            return s.buffer;
          }, I;
        }();
      },
      "./src/crypt/decrypter.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => x
        });
        var F = S("./src/crypt/aes-crypto.ts"), A = S("./src/crypt/fast-aes-key.ts"), C = S("./src/crypt/aes-decryptor.ts"), I = S("./src/utils/logger.ts"), k = S("./src/utils/mp4-tools.ts"), P = S("./src/utils/typed-array.ts"), L = 16, x = /* @__PURE__ */ function() {
          function _(c, y) {
            var m = y === void 0 ? {} : y, n = m.removePKCS7Padding, o = n === void 0 ? !0 : n;
            if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.useSoftware = c.enableSoftwareAES, this.removePKCS7Padding = o, o)
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
            var n = new Uint8Array(y);
            return this.reset(), this.removePKCS7Padding ? (0, C.removePadding)(n) : n;
          }, T.reset = function() {
            this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
          }, T.decrypt = function(y, m, n) {
            var o = this;
            return this.useSoftware ? new Promise(function(a, i) {
              o.softwareDecrypt(new Uint8Array(y), m, n);
              var g = o.flush();
              g ? a(g.buffer) : i(new Error("[softwareDecrypt] Failed to decrypt data"));
            }) : this.webCryptoDecrypt(new Uint8Array(y), m, n);
          }, T.softwareDecrypt = function(y, m, n) {
            var o = this.currentIV, a = this.currentResult, i = this.remainderData;
            this.logOnce("JS AES decrypt"), i && (y = (0, k.appendUint8Array)(i, y), this.remainderData = null);
            var g = this.getValidChunk(y);
            if (!g.length)
              return null;
            o && (n = o);
            var l = this.softwareDecrypter;
            l || (l = this.softwareDecrypter = new C.default()), l.expandKey(m);
            var r = a;
            return this.currentResult = l.decrypt(g.buffer, 0, n), this.currentIV = (0, P.sliceUint8)(g, -16).buffer, r || null;
          }, T.webCryptoDecrypt = function(y, m, n) {
            var o = this, a = this.subtle;
            return (this.key !== m || !this.fastAesKey) && (this.key = m, this.fastAesKey = new A.default(a, m)), this.fastAesKey.expandKey().then(function(i) {
              if (!a)
                return Promise.reject(new Error("web crypto not initialized"));
              o.logOnce("WebCrypto AES decrypt");
              var g = new F.default(a, new Uint8Array(n));
              return g.decrypt(y.buffer, i);
            }).catch(function(i) {
              return I.logger.warn("[decrypter]: WebCrypto Error, disable WebCrypto API, " + i.name + ": " + i.message), o.onWebCryptoError(y, m, n);
            });
          }, T.onWebCryptoError = function(y, m, n) {
            this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(y, m, n);
            var o = this.flush();
            if (o)
              return o.buffer;
            throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data");
          }, T.getValidChunk = function(y) {
            var m = y, n = y.length - y.length % L;
            return n !== y.length && (m = (0, P.sliceUint8)(y, 0, n), this.remainderData = (0, P.sliceUint8)(y, n)), m;
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
            var n;
            return n = _.call(this) || this, n.observer = void 0, n.config = void 0, n.observer = y, n.config = m, n;
          }
          var c = T.prototype;
          return c.resetInitSegment = function(m, n, o, a) {
            _.prototype.resetInitSegment.call(this, m, n, o, a), this._audioTrack = {
              container: "audio/adts",
              type: "audio",
              id: 2,
              pid: -1,
              sequenceNumber: 0,
              segmentCodec: "aac",
              samples: [],
              manifestCodec: n,
              duration: a,
              inputTimeScale: 9e4,
              dropped: 0
            };
          }, T.probe = function(m) {
            if (!m)
              return !1;
            for (var n = I.getID3Data(m, 0) || [], o = n.length, a = m.length; o < a; o++)
              if (A.probe(m, o))
                return C.logger.log("ADTS sync word found !"), !0;
            return !1;
          }, c.canParse = function(m, n) {
            return A.canParse(m, n);
          }, c.appendFrame = function(m, n, o) {
            A.initTrackConfig(m, this.observer, n, o, m.manifestCodec);
            var a = A.appendFrame(m, n, o, this.basePTS, this.frameIndex);
            if (a && a.missing === 0)
              return a;
          }, T;
        }(F.default);
        const x = L;
      },
      "./src/demux/adts.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          appendFrame: () => o,
          canGetFrameLength: () => x,
          canParse: () => T,
          getAudioConfig: () => I,
          getFrameDuration: () => m,
          getFullFrameLength: () => L,
          getHeaderLength: () => P,
          initTrackConfig: () => y,
          isHeader: () => _,
          isHeaderPattern: () => k,
          parseFrameHeader: () => n,
          probe: () => c
        });
        var F = S("./src/utils/logger.ts"), A = S("./src/errors.ts"), C = S("./src/events.ts");
        function I(a, i, g, l) {
          var r, u, v, f, s = navigator.userAgent.toLowerCase(), t = l, h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
          r = ((i[g + 2] & 192) >>> 6) + 1;
          var e = (i[g + 2] & 60) >>> 2;
          if (e > h.length - 1) {
            a.trigger(C.Events.ERROR, {
              type: A.ErrorTypes.MEDIA_ERROR,
              details: A.ErrorDetails.FRAG_PARSING_ERROR,
              fatal: !0,
              reason: "invalid ADTS sampling index:" + e
            });
            return;
          }
          return v = (i[g + 2] & 1) << 2, v |= (i[g + 3] & 192) >>> 6, F.logger.log("manifest codec:" + l + ", ADTS type:" + r + ", samplingIndex:" + e), /firefox/i.test(s) ? e >= 6 ? (r = 5, f = new Array(4), u = e - 3) : (r = 2, f = new Array(2), u = e) : s.indexOf("android") !== -1 ? (r = 2, f = new Array(2), u = e) : (r = 5, f = new Array(4), l && (l.indexOf("mp4a.40.29") !== -1 || l.indexOf("mp4a.40.5") !== -1) || !l && e >= 6 ? u = e - 3 : ((l && l.indexOf("mp4a.40.2") !== -1 && (e >= 6 && v === 1 || /vivaldi/i.test(s)) || !l && v === 1) && (r = 2, f = new Array(2)), u = e)), f[0] = r << 3, f[0] |= (e & 14) >> 1, f[1] |= (e & 1) << 7, f[1] |= v << 3, r === 5 && (f[1] |= (u & 14) >> 1, f[2] = (u & 1) << 7, f[2] |= 8, f[3] = 0), {
            config: f,
            samplerate: h[e],
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
        function c(a, i) {
          if (_(a, i)) {
            var g = P(a, i);
            if (i + g >= a.length)
              return !1;
            var l = L(a, i);
            if (l <= g)
              return !1;
            var r = i + l;
            return r === a.length || _(a, r);
          }
          return !1;
        }
        function y(a, i, g, l, r) {
          if (!a.samplerate) {
            var u = I(i, g, l, r);
            if (!u)
              return;
            a.config = u.config, a.samplerate = u.samplerate, a.channelCount = u.channelCount, a.codec = u.codec, a.manifestCodec = u.manifestCodec, F.logger.log("parsed codec:" + a.codec + ", rate:" + u.samplerate + ", channels:" + u.channelCount);
          }
        }
        function m(a) {
          return 9216e4 / a;
        }
        function n(a, i) {
          var g = P(a, i);
          if (i + g <= a.length) {
            var l = L(a, i) - g;
            if (l > 0)
              return {
                headerLength: g,
                frameLength: l
              };
          }
        }
        function o(a, i, g, l, r) {
          var u = m(a.samplerate), v = l + r * u, f = n(i, g), s;
          if (f) {
            var t = f.frameLength, h = f.headerLength, e = h + t, d = Math.max(0, g + e - i.length);
            d ? (s = new Uint8Array(e - h), s.set(i.subarray(g + h, i.length), 0)) : s = i.subarray(g + h, g + e);
            var E = {
              unit: s,
              pts: v
            };
            return d || a.samples.push(E), {
              sample: E,
              length: e,
              missing: d
            };
          }
          var p = i.length - g;
          s = new Uint8Array(p), s.set(i.subarray(g, i.length), 0);
          var D = {
            unit: s,
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
          var c = T.prototype;
          return c.resetInitSegment = function(m, n, o, a) {
            this._id3Track = {
              type: "id3",
              id: 3,
              pid: -1,
              inputTimeScale: 9e4,
              sequenceNumber: 0,
              samples: [],
              dropped: 0
            };
          }, c.resetTimeStamp = function(m) {
            this.initPTS = m, this.resetContiguity();
          }, c.resetContiguity = function() {
            this.basePTS = null, this.lastPTS = null, this.frameIndex = 0;
          }, c.canParse = function(m, n) {
            return !1;
          }, c.appendFrame = function(m, n, o) {
          }, c.demux = function(m, n) {
            this.cachedData && (m = (0, k.appendUint8Array)(this.cachedData, m), this.cachedData = null);
            var o = A.getID3Data(m, 0), a = o ? o.length : 0, i, g = this._audioTrack, l = this._id3Track, r = o ? A.getTimeStamp(o) : void 0, u = m.length;
            for ((this.basePTS === null || this.frameIndex === 0 && (0, F.isFiniteNumber)(r)) && (this.basePTS = x(r, n, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), o && o.length > 0 && l.samples.push({
              pts: this.lastPTS,
              dts: this.lastPTS,
              data: o,
              type: C.MetadataSchema.audioId3,
              duration: Number.POSITIVE_INFINITY
            }); a < u; ) {
              if (this.canParse(m, a)) {
                var v = this.appendFrame(g, m, a);
                v ? (this.frameIndex++, this.lastPTS = v.sample.pts, a += v.length, i = a) : a = u;
              } else
                A.canParse(m, a) ? (o = A.getID3Data(m, a), l.samples.push({
                  pts: this.lastPTS,
                  dts: this.lastPTS,
                  data: o,
                  type: C.MetadataSchema.audioId3,
                  duration: Number.POSITIVE_INFINITY
                }), a += o.length, i = a) : a++;
              if (a === u && i !== u) {
                var f = (0, P.sliceUint8)(m, i);
                this.cachedData ? this.cachedData = (0, k.appendUint8Array)(this.cachedData, f) : this.cachedData = f;
              }
            }
            return {
              audioTrack: g,
              videoTrack: (0, I.dummyTrack)(),
              id3Track: l,
              textTrack: (0, I.dummyTrack)()
            };
          }, c.demuxSampleAes = function(m, n, o) {
            return Promise.reject(new Error("[" + this + "] This demuxer does not support Sample-AES decryption"));
          }, c.flush = function(m) {
            var n = this.cachedData;
            return n && (this.cachedData = null, this.demux(n, 0)), {
              audioTrack: this._audioTrack,
              videoTrack: (0, I.dummyTrack)(),
              id3Track: this._id3Track,
              textTrack: (0, I.dummyTrack)()
            };
          }, c.destroy = function() {
          }, T;
        }(), x = function(c, y, m) {
          return (0, F.isFiniteNumber)(c) ? c * 90 : y * 9e4 + (m || 0);
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
            var L = this.data, x = this.bytesAvailable, _ = L.byteLength - x, T = new Uint8Array(4), c = Math.min(4, x);
            if (c === 0)
              throw new Error("no bytes available");
            T.set(L.subarray(_, _ + c)), this.word = new DataView(T.buffer).getUint32(0), this.bitsAvailable = c * 8, this.bytesAvailable -= c;
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
            for (var x = 8, _ = 8, T, c = 0; c < L; c++)
              _ !== 0 && (T = this.readEG(), _ = (x + T + 256) % 256), x = _ === 0 ? x : _;
          }, k.readSPS = function() {
            var L = 0, x = 0, _ = 0, T = 0, c, y, m, n = this.readUByte.bind(this), o = this.readBits.bind(this), a = this.readUEG.bind(this), i = this.readBoolean.bind(this), g = this.skipBits.bind(this), l = this.skipEG.bind(this), r = this.skipUEG.bind(this), u = this.skipScalingList.bind(this);
            n();
            var v = n();
            if (o(5), g(3), n(), r(), v === 100 || v === 110 || v === 122 || v === 244 || v === 44 || v === 83 || v === 86 || v === 118 || v === 128) {
              var f = a();
              if (f === 3 && g(1), r(), r(), g(1), i())
                for (y = f !== 3 ? 8 : 12, m = 0; m < y; m++)
                  i() && (m < 6 ? u(16) : u(64));
            }
            r();
            var s = a();
            if (s === 0)
              a();
            else if (s === 1)
              for (g(1), l(), l(), c = a(), m = 0; m < c; m++)
                l();
            r(), g(1);
            var t = a(), h = a(), e = o(1);
            e === 0 && g(1), g(1), i() && (L = a(), x = a(), _ = a(), T = a());
            var d = [1, 1];
            if (i() && i()) {
              var E = n();
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
                  d = [n() << 8 | n(), n() << 8 | n()];
                  break;
                }
              }
            }
            return {
              width: Math.ceil((t + 1) * 16 - L * 2 - x * 2),
              height: (2 - e) * (h + 1) * 16 - (e ? 2 : 4) * (_ + T),
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
          utf8ArrayToStr: () => o
        });
        var F = function(r, u) {
          return u + 10 <= r.length && r[u] === 73 && r[u + 1] === 68 && r[u + 2] === 51 && r[u + 3] < 255 && r[u + 4] < 255 && r[u + 6] < 128 && r[u + 7] < 128 && r[u + 8] < 128 && r[u + 9] < 128;
        }, A = function(r, u) {
          return u + 10 <= r.length && r[u] === 51 && r[u + 1] === 68 && r[u + 2] === 73 && r[u + 3] < 255 && r[u + 4] < 255 && r[u + 6] < 128 && r[u + 7] < 128 && r[u + 8] < 128 && r[u + 9] < 128;
        }, C = function(r, u) {
          for (var v = u, f = 0; F(r, u); ) {
            f += 10;
            var s = I(r, u + 6);
            f += s, A(r, u + 10) && (f += 10), u += f;
          }
          if (f > 0)
            return r.subarray(v, v + f);
        }, I = function(r, u) {
          var v = 0;
          return v = (r[u] & 127) << 21, v |= (r[u + 1] & 127) << 14, v |= (r[u + 2] & 127) << 7, v |= r[u + 3] & 127, v;
        }, k = function(r, u) {
          return F(r, u) && I(r, u + 6) + 10 <= r.length - u;
        }, P = function(r) {
          for (var u = _(r), v = 0; v < u.length; v++) {
            var f = u[v];
            if (L(f))
              return n(f);
          }
        }, L = function(r) {
          return r && r.key === "PRIV" && r.info === "com.apple.streaming.transportStreamTimestamp";
        }, x = function(r) {
          var u = String.fromCharCode(r[0], r[1], r[2], r[3]), v = I(r, 4), f = 10;
          return {
            type: u,
            size: v,
            data: r.subarray(f, f + v)
          };
        }, _ = function(r) {
          for (var u = 0, v = []; F(r, u); ) {
            var f = I(r, u + 6);
            u += 10;
            for (var s = u + f; u + 8 < s; ) {
              var t = x(r.subarray(u)), h = T(t);
              h && v.push(h), u += t.size + 10;
            }
            A(r, u) && (u += 10);
          }
          return v;
        }, T = function(r) {
          return r.type === "PRIV" ? c(r) : r.type[0] === "W" ? m(r) : y(r);
        }, c = function(r) {
          if (!(r.size < 2)) {
            var u = o(r.data, !0), v = new Uint8Array(r.data.subarray(u.length + 1));
            return {
              key: r.type,
              info: u,
              data: v.buffer
            };
          }
        }, y = function(r) {
          if (!(r.size < 2)) {
            if (r.type === "TXXX") {
              var u = 1, v = o(r.data.subarray(u), !0);
              u += v.length + 1;
              var f = o(r.data.subarray(u));
              return {
                key: r.type,
                info: v,
                data: f
              };
            }
            var s = o(r.data.subarray(1));
            return {
              key: r.type,
              data: s
            };
          }
        }, m = function(r) {
          if (r.type === "WXXX") {
            if (r.size < 2)
              return;
            var u = 1, v = o(r.data.subarray(u), !0);
            u += v.length + 1;
            var f = o(r.data.subarray(u));
            return {
              key: r.type,
              info: v,
              data: f
            };
          }
          var s = o(r.data);
          return {
            key: r.type,
            data: s
          };
        }, n = function(r) {
          if (r.data.byteLength === 8) {
            var u = new Uint8Array(r.data), v = u[3] & 1, f = (u[4] << 23) + (u[5] << 15) + (u[6] << 7) + u[7];
            return f /= 45, v && (f += 4772185884e-2), Math.round(f);
          }
        }, o = function(r, u) {
          u === void 0 && (u = !1);
          var v = g();
          if (v) {
            var f = v.decode(r);
            if (u) {
              var s = f.indexOf("\0");
              return s !== -1 ? f.substring(0, s) : f;
            }
            return f.replace(/\0/g, "");
          }
          for (var t = r.length, h, e, d, E = "", p = 0; p < t; ) {
            if (h = r[p++], h === 0 && u)
              return E;
            if (h === 0 || h === 3)
              continue;
            switch (h >> 4) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                E += String.fromCharCode(h);
                break;
              case 12:
              case 13:
                e = r[p++], E += String.fromCharCode((h & 31) << 6 | e & 63);
                break;
              case 14:
                e = r[p++], d = r[p++], E += String.fromCharCode((h & 15) << 12 | (e & 63) << 6 | (d & 63) << 0);
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
          var c = T.prototype;
          return c.resetInitSegment = function(m, n, o, a) {
            _.prototype.resetInitSegment.call(this, m, n, o, a), this._audioTrack = {
              container: "audio/mpeg",
              type: "audio",
              id: 2,
              pid: -1,
              sequenceNumber: 0,
              segmentCodec: "mp3",
              samples: [],
              manifestCodec: n,
              duration: a,
              inputTimeScale: 9e4,
              dropped: 0
            };
          }, T.probe = function(m) {
            if (!m)
              return !1;
            for (var n = A.getID3Data(m, 0) || [], o = n.length, a = m.length; o < a; o++)
              if (I.probe(m, o))
                return C.logger.log("MPEG Audio sync word found !"), !0;
            return !1;
          }, c.canParse = function(m, n) {
            return I.canParse(m, n);
          }, c.appendFrame = function(m, n, o) {
            if (this.basePTS !== null)
              return I.appendFrame(m, n, o, this.basePTS, this.frameIndex);
          }, T;
        }(F.default);
        const x = L;
      },
      "./src/demux/mp4demuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => L
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/types/demuxer.ts"), C = S("./src/utils/mp4-tools.ts"), I = S("./src/demux/dummy-demuxed-track.ts"), k = /\/emsg[-/]ID3/i, P = /* @__PURE__ */ function() {
          function x(T, c) {
            this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = c;
          }
          var _ = x.prototype;
          return _.resetTimeStamp = function() {
          }, _.resetInitSegment = function(c, y, m, n) {
            var o = this.videoTrack = (0, I.dummyTrack)("video", 1), a = this.audioTrack = (0, I.dummyTrack)("audio", 1), i = this.txtTrack = (0, I.dummyTrack)("text", 1);
            if (this.id3Track = (0, I.dummyTrack)("id3", 1), this.timeOffset = 0, !(!c || !c.byteLength)) {
              var g = (0, C.parseInitSegment)(c);
              if (g.video) {
                var l = g.video, r = l.id, u = l.timescale, v = l.codec;
                o.id = r, o.timescale = i.timescale = u, o.codec = v;
              }
              if (g.audio) {
                var f = g.audio, s = f.id, t = f.timescale, h = f.codec;
                a.id = s, a.timescale = t, a.codec = h;
              }
              i.id = C.RemuxerTrackIdConfig.text, o.sampleDuration = 0, o.duration = a.duration = n;
            }
          }, _.resetContiguity = function() {
          }, x.probe = function(c) {
            return c = c.length > 16384 ? c.subarray(0, 16384) : c, (0, C.findBox)(c, ["moof"]).length > 0;
          }, _.demux = function(c, y) {
            this.timeOffset = y;
            var m = c, n = this.videoTrack, o = this.txtTrack;
            if (this.config.progressive) {
              this.remainderData && (m = (0, C.appendUint8Array)(this.remainderData, c));
              var a = (0, C.segmentValidRange)(m);
              this.remainderData = a.remainder, n.samples = a.valid || new Uint8Array();
            } else
              n.samples = m;
            var i = this.extractID3Track(n, y);
            return o.samples = (0, C.parseSamples)(y, n), {
              videoTrack: n,
              audioTrack: this.audioTrack,
              id3Track: i,
              textTrack: this.txtTrack
            };
          }, _.flush = function() {
            var c = this.timeOffset, y = this.videoTrack, m = this.txtTrack;
            y.samples = this.remainderData || new Uint8Array(), this.remainderData = null;
            var n = this.extractID3Track(y, this.timeOffset);
            return m.samples = (0, C.parseSamples)(c, y), {
              videoTrack: y,
              audioTrack: (0, I.dummyTrack)(),
              id3Track: n,
              textTrack: (0, I.dummyTrack)()
            };
          }, _.extractID3Track = function(c, y) {
            var m = this.id3Track;
            if (c.samples.length) {
              var n = (0, C.findBox)(c.samples, ["emsg"]);
              n && n.forEach(function(o) {
                var a = (0, C.parseEmsg)(o);
                if (k.test(a.schemeIdUri)) {
                  var i = (0, F.isFiniteNumber)(a.presentationTime) ? a.presentationTime / a.timeScale : y + a.presentationTimeDelta / a.timeScale, g = a.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : a.eventDuration / a.timeScale;
                  g <= 1e-3 && (g = Number.POSITIVE_INFINITY);
                  var l = a.payload;
                  m.samples.push({
                    data: l,
                    len: l.byteLength,
                    dts: i,
                    pts: i,
                    type: A.MetadataSchema.emsg,
                    duration: g
                  });
                }
              });
            }
            return m;
          }, _.demuxSampleAes = function(c, y, m) {
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
          probe: () => c
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
        function P(y, m, n, o, a) {
          if (!(n + 24 > m.length)) {
            var i = L(m, n);
            if (i && n + i.frameLength <= m.length) {
              var g = i.samplesPerFrame * 9e4 / i.sampleRate, l = o + a * g, r = {
                unit: m.subarray(n, n + i.frameLength),
                pts: l,
                dts: l
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
          var n = y[m + 1] >> 3 & 3, o = y[m + 1] >> 1 & 3, a = y[m + 2] >> 4 & 15, i = y[m + 2] >> 2 & 3;
          if (n !== 1 && a !== 0 && a !== 15 && i !== 3) {
            var g = y[m + 2] >> 1 & 1, l = y[m + 3] >> 6, r = n === 3 ? 3 - o : o === 3 ? 3 : 4, u = A[r * 14 + a - 1] * 1e3, v = n === 3 ? 0 : n === 2 ? 1 : 2, f = C[v * 3 + i], s = l === 3 ? 1 : 2, t = I[n][o], h = k[o], e = t * 8 * h, d = Math.floor(t * u / f + g) * h;
            if (F === null) {
              var E = navigator.userAgent || "", p = E.match(/Chrome\/(\d+)/i);
              F = p ? parseInt(p[1]) : 0;
            }
            var D = !!F && F <= 87;
            return D && o === 2 && u >= 224e3 && l === 0 && (y[m + 3] = y[m + 3] | 128), {
              sampleRate: f,
              channelCount: s,
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
          var n = 4;
          return x(y, m) && n <= y.length - m;
        }
        function c(y, m) {
          if (m + 1 < y.length && x(y, m)) {
            var n = 4, o = L(y, m), a = n;
            o != null && o.frameLength && (a = o.frameLength);
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
            var c = this, y = x[_].unit;
            if (!(y.length <= 16)) {
              var m = y.subarray(16, y.length - y.length % 16), n = m.buffer.slice(m.byteOffset, m.byteOffset + m.length);
              this.decryptBuffer(n).then(function(o) {
                var a = new Uint8Array(o);
                y.set(a, 16), c.decrypter.isSync() || c.decryptAacSamples(x, _ + 1, T);
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
            for (var _ = Math.floor((x.length - 48) / 160) * 16 + 16, T = new Int8Array(_), c = 0, y = 32; y < x.length - 16; y += 160, c += 16)
              T.set(x.subarray(y, y + 16), c);
            return T;
          }, P.getAvcDecryptedUnit = function(x, _) {
            for (var T = new Uint8Array(_), c = 0, y = 32; y < x.length - 16; y += 160, c += 16)
              x.set(T.subarray(c, c + 16), y);
            return x;
          }, P.decryptAvcSample = function(x, _, T, c, y) {
            var m = this, n = (0, A.discardEPB)(y.data), o = this.getAvcEncryptedData(n);
            this.decryptBuffer(o.buffer).then(function(a) {
              y.data = m.getAvcDecryptedUnit(n, a), m.decrypter.isSync() || m.decryptAvcSamples(x, _, T + 1, c);
            });
          }, P.decryptAvcSamples = function(x, _, T, c) {
            if (x instanceof Uint8Array)
              throw new Error("Cannot decrypt samples of type Uint8Array");
            for (; ; _++, T = 0) {
              if (_ >= x.length) {
                c();
                return;
              }
              for (var y = x[_].units; !(T >= y.length); T++) {
                var m = y[T];
                if (!(m.data.length <= 48 || m.type !== 1 && m.type !== 5) && (this.decryptAvcSample(x, _, T, c, m), !this.decrypter.isSync()))
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
          function T(y, m, n, o) {
            var a = this;
            this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.worker = void 0, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
            var i = y.config;
            this.hls = y, this.id = m, this.useWorker = !!i.enableWorker, this.onTransmuxComplete = n, this.onFlush = o;
            var g = function(f, s) {
              s = s || {}, s.frag = a.frag, s.id = a.id, a.hls.trigger(f, s);
            };
            this.observer = new L.EventEmitter(), this.observer.on(A.Events.FRAG_DECRYPTED, g), this.observer.on(A.Events.ERROR, g);
            var l = {
              mp4: x.isTypeSupported("video/mp4"),
              mpeg: x.isTypeSupported("audio/mpeg"),
              mp3: x.isTypeSupported('audio/mp4; codecs="mp3"')
            }, r = navigator.vendor;
            if (this.useWorker && typeof Worker != "undefined") {
              I.logger.log("demuxing in webworker");
              var u;
              try {
                u = this.worker = (0, F.default)("./src/demux/transmuxer-worker.ts"), this.onwmsg = this.onWorkerMessage.bind(this), u.addEventListener("message", this.onwmsg), u.onerror = function(v) {
                  a.useWorker = !1, I.logger.warn("Exception in webworker, fallback to inline"), a.hls.trigger(A.Events.ERROR, {
                    type: k.ErrorTypes.OTHER_ERROR,
                    details: k.ErrorDetails.INTERNAL_EXCEPTION,
                    fatal: !1,
                    event: "demuxerWorker",
                    error: new Error(v.message + "  (" + v.filename + ":" + v.lineno + ")")
                  });
                }, u.postMessage({
                  cmd: "init",
                  typeSupported: l,
                  vendor: r,
                  id: m,
                  config: JSON.stringify(i)
                });
              } catch (v) {
                I.logger.warn("Error in worker:", v), I.logger.error("Error while initializing DemuxerWorker, fallback to inline"), u && self.URL.revokeObjectURL(u.objectURL), this.transmuxer = new C.default(this.observer, l, i, r, m), this.worker = null;
              }
            } else
              this.transmuxer = new C.default(this.observer, l, i, r, m);
          }
          var c = T.prototype;
          return c.destroy = function() {
            var m = this.worker;
            if (m)
              m.removeEventListener("message", this.onwmsg), m.terminate(), this.worker = null, this.onwmsg = void 0;
            else {
              var n = this.transmuxer;
              n && (n.destroy(), this.transmuxer = null);
            }
            var o = this.observer;
            o && o.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null;
          }, c.push = function(m, n, o, a, i, g, l, r, u, v) {
            var f, s, t = this;
            u.transmuxing.start = self.performance.now();
            var h = this.transmuxer, e = this.worker, d = g ? g.start : i.start, E = i.decryptdata, p = this.frag, D = !(p && i.cc === p.cc), R = !(p && u.level === p.level), b = p ? u.sn - p.sn : -1, O = this.part ? u.part - this.part.index : -1, M = b === 0 && u.id > 1 && u.id === (p == null ? void 0 : p.stats.chunkCount), w = !R && (b === 1 || b === 0 && (O === 1 || M && O <= 0)), U = self.performance.now();
            (R || b || i.stats.parsing.start === 0) && (i.stats.parsing.start = U), g && (O || !w) && (g.stats.parsing.start = U);
            var N = !(p && ((f = i.initSegment) === null || f === void 0 ? void 0 : f.url) === ((s = p.initSegment) === null || s === void 0 ? void 0 : s.url)), K = new C.TransmuxState(D, w, r, R, d, N);
            if (!w || D || N) {
              I.logger.log("[transmuxer-interface, " + i.type + "]: Starting new transmux session for sn: " + u.sn + " p: " + u.part + " level: " + u.level + " id: " + u.id + `
        discontinuity: ` + D + `
        trackSwitch: ` + R + `
        contiguous: ` + w + `
        accurateTimeOffset: ` + r + `
        timeOffset: ` + d + `
        initSegmentChange: ` + N);
              var W = new C.TransmuxConfig(o, a, n, l, v);
              this.configureTransmuxer(W);
            }
            if (this.frag = i, this.part = g, e)
              e.postMessage({
                cmd: "demux",
                data: m,
                decryptdata: E,
                chunkMeta: u,
                state: K
              }, m instanceof ArrayBuffer ? [m] : []);
            else if (h) {
              var G = h.push(m, E, u, K);
              (0, C.isPromise)(G) ? (h.async = !0, G.then(function(j) {
                t.handleTransmuxComplete(j);
              }).catch(function(j) {
                t.transmuxerError(j, u, "transmuxer-interface push error");
              })) : (h.async = !1, this.handleTransmuxComplete(G));
            }
          }, c.flush = function(m) {
            var n = this;
            m.transmuxing.start = self.performance.now();
            var o = this.transmuxer, a = this.worker;
            if (a)
              a.postMessage({
                cmd: "flush",
                chunkMeta: m
              });
            else if (o) {
              var i = o.flush(m), g = (0, C.isPromise)(i);
              g || o.async ? ((0, C.isPromise)(i) || (i = Promise.resolve(i)), i.then(function(l) {
                n.handleFlushResult(l, m);
              }).catch(function(l) {
                n.transmuxerError(l, m, "transmuxer-interface flush error");
              })) : this.handleFlushResult(i, m);
            }
          }, c.transmuxerError = function(m, n, o) {
            !this.hls || this.hls.trigger(A.Events.ERROR, {
              type: k.ErrorTypes.MEDIA_ERROR,
              details: k.ErrorDetails.FRAG_PARSING_ERROR,
              chunkMeta: n,
              fatal: !1,
              error: m,
              err: m,
              reason: o
            });
          }, c.handleFlushResult = function(m, n) {
            var o = this;
            m.forEach(function(a) {
              o.handleTransmuxComplete(a);
            }), this.onFlush(n);
          }, c.onWorkerMessage = function(m) {
            var n = m.data, o = this.hls;
            switch (n.event) {
              case "init": {
                self.URL.revokeObjectURL(this.worker.objectURL);
                break;
              }
              case "transmuxComplete": {
                this.handleTransmuxComplete(n.data);
                break;
              }
              case "flush": {
                this.onFlush(n.data);
                break;
              }
              case "workerLog":
                I.logger[n.data.logType] && I.logger[n.data.logType](n.data.message);
                break;
              default: {
                n.data = n.data || {}, n.data.frag = this.frag, n.data.id = this.id, o.trigger(n.event, n.data);
                break;
              }
            }
          }, c.configureTransmuxer = function(m) {
            var n = this.worker, o = this.transmuxer;
            n ? n.postMessage({
              cmd: "configure",
              config: m
            }) : o && o.configure(m);
          }, c.handleTransmuxComplete = function(m) {
            m.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(m);
          }, T;
        }();
      },
      "./src/demux/transmuxer-worker.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => P
        });
        var F = S("./src/demux/transmuxer.ts"), A = S("./src/events.ts"), C = S("./src/utils/logger.ts"), I = S("./node_modules/eventemitter3/index.js"), k = S("./src/errors.ts");
        function P(c) {
          var y = new I.EventEmitter(), m = function(a, i) {
            c.postMessage({
              event: a,
              data: i
            });
          };
          y.on(A.Events.FRAG_DECRYPTED, m), y.on(A.Events.ERROR, m);
          var n = function() {
            var a = function(l) {
              var r = function(v) {
                m("workerLog", {
                  logType: l,
                  message: v
                });
              };
              C.logger[l] = r;
            };
            for (var i in C.logger)
              a(i);
          };
          c.addEventListener("message", function(o) {
            var a = o.data;
            switch (a.cmd) {
              case "init": {
                var i = JSON.parse(a.config);
                c.transmuxer = new F.default(y, a.typeSupported, i, a.vendor, a.id), (0, C.enableLogs)(i.debug, a.id), n(), m("init", null);
                break;
              }
              case "configure": {
                c.transmuxer.configure(a.config);
                break;
              }
              case "demux": {
                var g = c.transmuxer.push(a.data, a.decryptdata, a.chunkMeta, a.state);
                (0, F.isPromise)(g) ? (c.transmuxer.async = !0, g.then(function(v) {
                  L(c, v);
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
                })) : (c.transmuxer.async = !1, L(c, g));
                break;
              }
              case "flush": {
                var l = a.chunkMeta, r = c.transmuxer.flush(l), u = (0, F.isPromise)(r);
                u || c.transmuxer.async ? ((0, F.isPromise)(r) || (r = Promise.resolve(r)), r.then(function(v) {
                  _(c, v, l);
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
                })) : _(c, r, l);
                break;
              }
            }
          });
        }
        function L(c, y) {
          if (T(y.remuxResult))
            return !1;
          var m = [], n = y.remuxResult, o = n.audio, a = n.video;
          return o && x(m, o), a && x(m, a), c.postMessage({
            event: "transmuxComplete",
            data: y
          }, m), !0;
        }
        function x(c, y) {
          y.data1 && c.push(y.data1.buffer), y.data2 && c.push(y.data2.buffer);
        }
        function _(c, y, m) {
          var n = y.reduce(function(o, a) {
            return L(c, a) || o;
          }, !1);
          n || c.postMessage({
            event: "transmuxComplete",
            data: y[0]
          }), c.postMessage({
            event: "flush",
            data: m
          });
        }
        function T(c) {
          return !c.audio && !c.video && !c.text && !c.id3 && !c.initSegment;
        }
      },
      "./src/demux/transmuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          TransmuxConfig: () => i,
          TransmuxState: () => g,
          default: () => m,
          isPromise: () => a
        });
        var F = S("./src/events.ts"), A = S("./src/errors.ts"), C = S("./src/crypt/decrypter.ts"), I = S("./src/demux/aacdemuxer.ts"), k = S("./src/demux/mp4demuxer.ts"), P = S("./src/demux/tsdemuxer.ts"), L = S("./src/demux/mp3demuxer.ts"), x = S("./src/remux/mp4-remuxer.ts"), _ = S("./src/remux/passthrough-remuxer.ts"), T = S("./src/utils/logger.ts"), c;
        try {
          c = self.performance.now.bind(self.performance);
        } catch (l) {
          T.logger.debug("Unable to use Performance API on this environment"), c = self.Date.now;
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
          function l(u, v, f, s, t) {
            this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = u, this.typeSupported = v, this.config = f, this.vendor = s, this.id = t;
          }
          var r = l.prototype;
          return r.configure = function(v) {
            this.transmuxConfig = v, this.decrypter && this.decrypter.reset();
          }, r.push = function(v, f, s, t) {
            var h = this, e = s.transmuxing;
            e.executeStart = c();
            var d = new Uint8Array(v), E = this.currentTransmuxState, p = this.transmuxConfig;
            t && (this.currentTransmuxState = t);
            var D = t || E, R = D.contiguous, b = D.discontinuity, O = D.trackSwitch, M = D.accurateTimeOffset, w = D.timeOffset, U = D.initSegmentChange, N = p.audioCodec, K = p.videoCodec, W = p.defaultInitPts, G = p.duration, j = p.initSegmentData, H = n(d, f);
            if (H && H.method === "AES-128") {
              var X = this.getDecrypter();
              if (X.isSync()) {
                var Z = X.softwareDecrypt(d, H.key.buffer, H.iv.buffer);
                if (!Z)
                  return e.executeEnd = c(), o(s);
                d = new Uint8Array(Z);
              } else
                return this.decryptionPromise = X.webCryptoDecrypt(d, H.key.buffer, H.iv.buffer).then(function(q) {
                  var ie = h.push(q, null, s);
                  return h.decryptionPromise = null, ie;
                }), this.decryptionPromise;
            }
            var J = this.needsProbing(b, O);
            J && this.configureTransmuxer(d), (b || O || U || J) && this.resetInitSegment(j, N, K, G, f), (b || U || J) && this.resetInitialTimestamp(W), R || this.resetContiguity();
            var $ = this.transmux(d, H, w, M, s), z = this.currentTransmuxState;
            return z.contiguous = !0, z.discontinuity = !1, z.trackSwitch = !1, e.executeEnd = c(), $;
          }, r.flush = function(v) {
            var f = this, s = v.transmuxing;
            s.executeStart = c();
            var t = this.decrypter, h = this.currentTransmuxState, e = this.decryptionPromise;
            if (e)
              return e.then(function() {
                return f.flush(v);
              });
            var d = [], E = h.timeOffset;
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
              }), s.executeEnd = c(), [o(v)];
            var b = D.flush(E);
            return a(b) ? b.then(function(O) {
              return f.flushRemux(d, O, v), d;
            }) : (this.flushRemux(d, b, v), d);
          }, r.flushRemux = function(v, f, s) {
            var t = f.audioTrack, h = f.videoTrack, e = f.id3Track, d = f.textTrack, E = this.currentTransmuxState, p = E.accurateTimeOffset, D = E.timeOffset;
            T.logger.log("[transmuxer.ts]: Flushed fragment " + s.sn + (s.part > -1 ? " p: " + s.part : "") + " of level " + s.level);
            var R = this.remuxer.remux(t, h, e, d, D, p, !0, this.id);
            v.push({
              remuxResult: R,
              chunkMeta: s
            }), s.transmuxing.executeEnd = c();
          }, r.resetInitialTimestamp = function(v) {
            var f = this.demuxer, s = this.remuxer;
            !f || !s || (f.resetTimeStamp(v), s.resetTimeStamp(v));
          }, r.resetContiguity = function() {
            var v = this.demuxer, f = this.remuxer;
            !v || !f || (v.resetContiguity(), f.resetNextTimestamp());
          }, r.resetInitSegment = function(v, f, s, t, h) {
            var e = this.demuxer, d = this.remuxer;
            !e || !d || (e.resetInitSegment(v, f, s, t), d.resetInitSegment(v, f, s, h));
          }, r.destroy = function() {
            this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
          }, r.transmux = function(v, f, s, t, h) {
            var e;
            return f && f.method === "SAMPLE-AES" ? e = this.transmuxSampleAes(v, f, s, t, h) : e = this.transmuxUnencrypted(v, s, t, h), e;
          }, r.transmuxUnencrypted = function(v, f, s, t) {
            var h = this.demuxer.demux(v, f, !1, !this.config.progressive), e = h.audioTrack, d = h.videoTrack, E = h.id3Track, p = h.textTrack, D = this.remuxer.remux(e, d, E, p, f, s, !1, this.id);
            return {
              remuxResult: D,
              chunkMeta: t
            };
          }, r.transmuxSampleAes = function(v, f, s, t, h) {
            var e = this;
            return this.demuxer.demuxSampleAes(v, f, s).then(function(d) {
              var E = e.remuxer.remux(d.audioTrack, d.videoTrack, d.id3Track, d.textTrack, s, t, !1, e.id);
              return {
                remuxResult: E,
                chunkMeta: h
              };
            });
          }, r.configureTransmuxer = function(v) {
            for (var f = this.config, s = this.observer, t = this.typeSupported, h = this.vendor, e, d = 0, E = y.length; d < E; d++)
              if (y[d].demux.probe(v)) {
                e = y[d];
                break;
              }
            e || (T.logger.warn("Failed to find demuxer by probing frag, treating as mp4 passthrough"), e = {
              demux: k.default,
              remux: _.default
            });
            var p = this.demuxer, D = this.remuxer, R = e.remux, b = e.demux;
            (!D || !(D instanceof R)) && (this.remuxer = new R(s, f, t, h)), (!p || !(p instanceof b)) && (this.demuxer = new b(s, f, t), this.probe = b.probe);
          }, r.needsProbing = function(v, f) {
            return !this.demuxer || !this.remuxer || v || f;
          }, r.getDecrypter = function() {
            var v = this.decrypter;
            return v || (v = this.decrypter = new C.default(this.config)), v;
          }, l;
        }();
        function n(l, r) {
          var u = null;
          return l.byteLength > 0 && r != null && r.key != null && r.iv !== null && r.method != null && (u = r), u;
        }
        var o = function(r) {
          return {
            remuxResult: {},
            chunkMeta: r
          };
        };
        function a(l) {
          return "then" in l && l.then instanceof Function;
        }
        var i = function(r, u, v, f, s) {
          this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = r, this.videoCodec = u, this.initSegmentData = v, this.duration = f, this.defaultInitPts = s;
        }, g = function(r, u, v, f, s, t) {
          this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = r, this.contiguous = u, this.accurateTimeOffset = v, this.trackSwitch = f, this.timeOffset = s, this.initSegmentChange = t;
        };
      },
      "./src/demux/tsdemuxer.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => g
        });
        var F = S("./src/demux/adts.ts"), A = S("./src/demux/mpegaudio.ts"), C = S("./src/demux/exp-golomb.ts"), I = S("./src/demux/sample-aes.ts"), k = S("./src/events.ts"), P = S("./src/utils/mp4-tools.ts"), L = S("./src/utils/logger.ts"), x = S("./src/errors.ts"), _ = S("./src/types/demuxer.ts");
        function T() {
          return T = Object.assign ? Object.assign.bind() : function(l) {
            for (var r = 1; r < arguments.length; r++) {
              var u = arguments[r];
              for (var v in u)
                Object.prototype.hasOwnProperty.call(u, v) && (l[v] = u[v]);
            }
            return l;
          }, T.apply(this, arguments);
        }
        var c = 188, y = /* @__PURE__ */ function() {
          function l(u, v, f) {
            this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._avcTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.observer = u, this.config = v, this.typeSupported = f;
          }
          l.probe = function(v) {
            var f = l.syncOffset(v);
            return f > 0 && L.logger.warn("MPEG2-TS detected but first sync word found @ offset " + f), f !== -1;
          }, l.syncOffset = function(v) {
            for (var f = Math.min(c * 5, v.length - c * 2) + 1, s = 0; s < f; ) {
              if (v[s] === 71 && v[s + c] === 71)
                return s;
              s++;
            }
            return -1;
          }, l.createTrack = function(v, f) {
            return {
              container: v === "video" || v === "audio" ? "video/mp2t" : void 0,
              type: v,
              id: P.RemuxerTrackIdConfig[v],
              pid: -1,
              inputTimeScale: 9e4,
              sequenceNumber: 0,
              samples: [],
              dropped: 0,
              duration: v === "audio" ? f : void 0
            };
          };
          var r = l.prototype;
          return r.resetInitSegment = function(v, f, s, t) {
            this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = l.createTrack("video"), this._audioTrack = l.createTrack("audio", t), this._id3Track = l.createTrack("id3"), this._txtTrack = l.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.avcSample = null, this.remainderData = null, this.audioCodec = f, this.videoCodec = s, this._duration = t;
          }, r.resetTimeStamp = function() {
          }, r.resetContiguity = function() {
            var v = this._audioTrack, f = this._avcTrack, s = this._id3Track;
            v && (v.pesData = null), f && (f.pesData = null), s && (s.pesData = null), this.aacOverFlow = null, this.avcSample = null, this.remainderData = null;
          }, r.demux = function(v, f, s, t) {
            s === void 0 && (s = !1), t === void 0 && (t = !1), s || (this.sampleAes = null);
            var h, e = this._avcTrack, d = this._audioTrack, E = this._id3Track, p = this._txtTrack, D = e.pid, R = e.pesData, b = d.pid, O = E.pid, M = d.pesData, w = E.pesData, U = null, N = this.pmtParsed, K = this._pmtId, W = v.length;
            if (this.remainderData && (v = (0, P.appendUint8Array)(this.remainderData, v), W = v.length, this.remainderData = null), W < c && !t)
              return this.remainderData = v, {
                audioTrack: d,
                videoTrack: e,
                id3Track: E,
                textTrack: p
              };
            var G = Math.max(0, l.syncOffset(v));
            W -= (W - G) % c, W < v.byteLength && !t && (this.remainderData = new Uint8Array(v.buffer, W, v.buffer.byteLength - W));
            for (var j = 0, H = G; H < W; H += c)
              if (v[H] === 71) {
                var X = !!(v[H + 1] & 64), Z = ((v[H + 1] & 31) << 8) + v[H + 2], J = (v[H + 3] & 48) >> 4, $ = void 0;
                if (J > 1) {
                  if ($ = H + 5 + v[H + 4], $ === H + c)
                    continue;
                } else
                  $ = H + 4;
                switch (Z) {
                  case D:
                    X && (R && (h = a(R)) && this.parseAVCPES(e, p, h, !1), R = {
                      data: [],
                      size: 0
                    }), R && (R.data.push(v.subarray($, H + c)), R.size += H + c - $);
                    break;
                  case b:
                    if (X) {
                      if (M && (h = a(M)))
                        switch (d.segmentCodec) {
                          case "aac":
                            this.parseAACPES(d, h);
                            break;
                          case "mp3":
                            this.parseMPEGPES(d, h);
                            break;
                        }
                      M = {
                        data: [],
                        size: 0
                      };
                    }
                    M && (M.data.push(v.subarray($, H + c)), M.size += H + c - $);
                    break;
                  case O:
                    X && (w && (h = a(w)) && this.parseID3PES(E, h), w = {
                      data: [],
                      size: 0
                    }), w && (w.data.push(v.subarray($, H + c)), w.size += H + c - $);
                    break;
                  case 0:
                    X && ($ += v[$] + 1), K = this._pmtId = n(v, $);
                    break;
                  case K: {
                    X && ($ += v[$] + 1);
                    var z = o(v, $, this.typeSupported, s);
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
            var f;
            return v ? f = this.demux(v, -1, !1, !0) : f = {
              videoTrack: this._avcTrack,
              audioTrack: this._audioTrack,
              id3Track: this._id3Track,
              textTrack: this._txtTrack
            }, this.extractRemainingSamples(f), this.sampleAes ? this.decrypt(f, this.sampleAes) : f;
          }, r.extractRemainingSamples = function(v) {
            var f = v.audioTrack, s = v.videoTrack, t = v.id3Track, h = v.textTrack, e = s.pesData, d = f.pesData, E = t.pesData, p;
            if (e && (p = a(e)) ? (this.parseAVCPES(s, h, p, !0), s.pesData = null) : s.pesData = e, d && (p = a(d))) {
              switch (f.segmentCodec) {
                case "aac":
                  this.parseAACPES(f, p);
                  break;
                case "mp3":
                  this.parseMPEGPES(f, p);
                  break;
              }
              f.pesData = null;
            } else
              d != null && d.size && L.logger.log("last AAC PES packet truncated,might overlap between fragments"), f.pesData = d;
            E && (p = a(E)) ? (this.parseID3PES(t, p), t.pesData = null) : t.pesData = E;
          }, r.demuxSampleAes = function(v, f, s) {
            var t = this.demux(v, s, !0, !this.config.progressive), h = this.sampleAes = new I.default(this.observer, this.config, f);
            return this.decrypt(t, h);
          }, r.decrypt = function(v, f) {
            return new Promise(function(s) {
              var t = v.audioTrack, h = v.videoTrack;
              t.samples && t.segmentCodec === "aac" ? f.decryptAacSamples(t.samples, 0, function() {
                h.samples ? f.decryptAvcSamples(h.samples, 0, 0, function() {
                  s(v);
                }) : s(v);
              }) : h.samples && f.decryptAvcSamples(h.samples, 0, 0, function() {
                s(v);
              });
            });
          }, r.destroy = function() {
            this._duration = 0;
          }, r.parseAVCPES = function(v, f, s, t) {
            var h = this, e = this.parseAVCNALu(v, s.data), d = this.avcSample, E, p = !1;
            s.data = null, d && e.length && !v.audFound && (i(d, v), d = this.avcSample = m(!1, s.pts, s.dts, "")), e.forEach(function(D) {
              switch (D.type) {
                case 1: {
                  E = !0, d || (d = h.avcSample = m(!0, s.pts, s.dts, "")), d.frame = !0;
                  var R = D.data;
                  if (p && R.length > 4) {
                    var b = new C.default(R).readSliceType();
                    (b === 2 || b === 4 || b === 7 || b === 9) && (d.key = !0);
                  }
                  break;
                }
                case 5:
                  E = !0, d || (d = h.avcSample = m(!0, s.pts, s.dts, "")), d.key = !0, d.frame = !0;
                  break;
                case 6: {
                  E = !0, (0, P.parseSEIMessageFromNALu)(D.data, 1, s.pts, f.samples);
                  break;
                }
                case 7:
                  if (E = !0, p = !0, !v.sps) {
                    var O = new C.default(D.data), M = O.readSPS();
                    v.width = M.width, v.height = M.height, v.pixelRatio = M.pixelRatio, v.sps = [D.data], v.duration = h._duration;
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
                  E = !1, v.audFound = !0, d && i(d, v), d = h.avcSample = m(!1, s.pts, s.dts, "");
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
            var f, s = this.avcSample, t;
            if ((!s || s.units.length === 0) && (s = v[v.length - 1]), (f = s) !== null && f !== void 0 && f.units) {
              var h = s.units;
              t = h[h.length - 1];
            }
            return t;
          }, r.parseAVCNALu = function(v, f) {
            var s = f.byteLength, t = v.naluState || 0, h = t, e = [], d = 0, E, p, D, R = -1, b = 0;
            for (t === -1 && (R = 0, b = f[0] & 31, t = 0, d = 1); d < s; ) {
              if (E = f[d++], !t) {
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
                    data: f.subarray(R, d - t - 1),
                    type: b
                  };
                  e.push(O);
                } else {
                  var M = this.getLastNalUnit(v.samples);
                  if (M && (h && d <= 4 - h && M.state && (M.data = M.data.subarray(0, M.data.byteLength - h)), p = d - t - 1, p > 0)) {
                    var w = new Uint8Array(M.data.byteLength + p);
                    w.set(M.data, 0), w.set(f.subarray(0, p), M.data.byteLength), M.data = w, M.state = 0;
                  }
                }
                d < s ? (D = f[d] & 31, R = d, b = D, t = 0) : t = -1;
              } else
                t = 0;
            }
            if (R >= 0 && t >= 0) {
              var U = {
                data: f.subarray(R, s),
                type: b,
                state: t
              };
              e.push(U);
            }
            if (e.length === 0) {
              var N = this.getLastNalUnit(v.samples);
              if (N) {
                var K = new Uint8Array(N.data.byteLength + f.byteLength);
                K.set(N.data, 0), K.set(f, N.data.byteLength), N.data = K;
              }
            }
            return v.naluState = t, e;
          }, r.parseAACPES = function(v, f) {
            var s = 0, t = this.aacOverFlow, h = f.data;
            if (t) {
              this.aacOverFlow = null;
              var e = t.missing, d = t.sample.unit.byteLength;
              if (e === -1) {
                var E = new Uint8Array(d + h.byteLength);
                E.set(t.sample.unit, 0), E.set(h, d), h = E;
              } else {
                var p = d - e;
                t.sample.unit.set(h.subarray(0, e), p), v.samples.push(t.sample), s = t.missing;
              }
            }
            var D, R;
            for (D = s, R = h.length; D < R - 1 && !F.isHeader(h, D); D++)
              ;
            if (D !== s) {
              var b, O;
              if (D < R - 1 ? (b = "AAC PES did not start with ADTS header,offset:" + D, O = !1) : (b = "no ADTS header found in AAC PES", O = !0), L.logger.warn("parsing error:" + b), this.observer.emit(k.Events.ERROR, k.Events.ERROR, {
                type: x.ErrorTypes.MEDIA_ERROR,
                details: x.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: O,
                reason: b
              }), O)
                return;
            }
            F.initTrackConfig(v, this.observer, h, D, this.audioCodec);
            var M;
            if (f.pts !== void 0)
              M = f.pts;
            else if (t) {
              var w = F.getFrameDuration(v.samplerate);
              M = t.sample.pts + w;
            } else {
              L.logger.warn("[tsdemuxer]: AAC PES unknown PTS");
              return;
            }
            for (var U = 0, N; D < R; )
              if (N = F.appendFrame(v, h, D, M, U), D += N.length, N.missing) {
                this.aacOverFlow = N;
                break;
              } else
                for (U++; D < R - 1 && !F.isHeader(h, D); D++)
                  ;
          }, r.parseMPEGPES = function(v, f) {
            var s = f.data, t = s.length, h = 0, e = 0, d = f.pts;
            if (d === void 0) {
              L.logger.warn("[tsdemuxer]: MPEG PES unknown PTS");
              return;
            }
            for (; e < t; )
              if (A.isHeader(s, e)) {
                var E = A.appendFrame(v, s, e, d, h);
                if (E)
                  e += E.length, h++;
                else
                  break;
              } else
                e++;
          }, r.parseID3PES = function(v, f) {
            if (f.pts === void 0) {
              L.logger.warn("[tsdemuxer]: ID3 PES unknown PTS");
              return;
            }
            var s = T({}, f, {
              type: this._avcTrack ? _.MetadataSchema.emsg : _.MetadataSchema.audioId3,
              duration: Number.POSITIVE_INFINITY
            });
            v.samples.push(s);
          }, l;
        }();
        function m(l, r, u, v) {
          return {
            key: l,
            frame: !1,
            pts: r,
            dts: u,
            units: [],
            debug: v,
            length: 0
          };
        }
        function n(l, r) {
          return (l[r + 10] & 31) << 8 | l[r + 11];
        }
        function o(l, r, u, v) {
          var f = {
            audio: -1,
            avc: -1,
            id3: -1,
            segmentCodec: "aac"
          }, s = (l[r + 1] & 15) << 8 | l[r + 2], t = r + 3 + s - 4, h = (l[r + 10] & 15) << 8 | l[r + 11];
          for (r += 12 + h; r < t; ) {
            var e = (l[r + 1] & 31) << 8 | l[r + 2];
            switch (l[r]) {
              case 207:
                if (!v) {
                  L.logger.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream");
                  break;
                }
              case 15:
                f.audio === -1 && (f.audio = e);
                break;
              case 21:
                f.id3 === -1 && (f.id3 = e);
                break;
              case 219:
                if (!v) {
                  L.logger.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream");
                  break;
                }
              case 27:
                f.avc === -1 && (f.avc = e);
                break;
              case 3:
              case 4:
                u.mpeg !== !0 && u.mp3 !== !0 ? L.logger.log("MPEG audio found, not supported in this browser") : f.audio === -1 && (f.audio = e, f.segmentCodec = "mp3");
                break;
              case 36:
                L.logger.warn("Unsupported HEVC stream type found");
                break;
            }
            r += ((l[r + 3] & 15) << 8 | l[r + 4]) + 5;
          }
          return f;
        }
        function a(l) {
          var r = 0, u, v, f, s, t, h = l.data;
          if (!l || l.size === 0)
            return null;
          for (; h[0].length < 19 && h.length > 1; ) {
            var e = new Uint8Array(h[0].length + h[1].length);
            e.set(h[0]), e.set(h[1], h[0].length), h[0] = e, h.splice(1, 1);
          }
          u = h[0];
          var d = (u[0] << 16) + (u[1] << 8) + u[2];
          if (d === 1) {
            if (v = (u[4] << 8) + u[5], v && v > l.size - 6)
              return null;
            var E = u[7];
            E & 192 && (s = (u[9] & 14) * 536870912 + (u[10] & 255) * 4194304 + (u[11] & 254) * 16384 + (u[12] & 255) * 128 + (u[13] & 254) / 2, E & 64 ? (t = (u[14] & 14) * 536870912 + (u[15] & 255) * 4194304 + (u[16] & 254) * 16384 + (u[17] & 255) * 128 + (u[18] & 254) / 2, s - t > 54e5 && (L.logger.warn(Math.round((s - t) / 9e4) + "s delta between PTS and DTS, align them"), s = t)) : t = s), f = u[8];
            var p = f + 9;
            if (l.size <= p)
              return null;
            l.size -= p;
            for (var D = new Uint8Array(l.size), R = 0, b = h.length; R < b; R++) {
              u = h[R];
              var O = u.byteLength;
              if (p)
                if (p > O) {
                  p -= O;
                  continue;
                } else
                  u = u.subarray(p), O -= p, p = 0;
              D.set(u, r), r += O;
            }
            return v && (v -= f + 3), {
              data: D,
              pts: s,
              dts: t,
              len: v
            };
          }
          return null;
        }
        function i(l, r) {
          if (l.units.length && l.frame) {
            if (l.pts === void 0) {
              var u = r.samples, v = u.length;
              if (v) {
                var f = u[v - 1];
                l.pts = f.pts, l.dts = f.dts;
              } else {
                r.dropped++;
                return;
              }
            }
            r.samples.push(l);
          }
          l.debug.length && L.logger.log(l.pts + "/" + l.dts + ":" + l.debug);
        }
        const g = y;
      },
      "./src/demux/webworkify-webpack.js": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => c
        });
        var F = function() {
          var m = ENTRY_MODULE, n = {}, o = function i(g) {
            var l = n[g];
            if (l !== void 0)
              return l.exports;
            var r = n[g] = {
              exports: {}
            };
            return m[g].call(r.exports, r, r.exports, i), r.exports;
          };
          o.m = m, function() {
            o.n = function(i) {
              var g = i && i.__esModule ? function() {
                return i.default;
              } : function() {
                return i;
              };
              return o.d(g, {
                a: g
              }), g;
            };
          }(), function() {
            o.d = function(i, g) {
              for (var l in g)
                o.o(g, l) && !o.o(i, l) && Object.defineProperty(i, l, {
                  enumerable: !0,
                  get: g[l]
                });
            };
          }(), function() {
            o.o = function(i, g) {
              return Object.prototype.hasOwnProperty.call(i, g);
            };
          }(), function() {
            o.r = function(i) {
              typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, {
                value: "Module"
              }), Object.defineProperty(i, "__esModule", {
                value: !0
              });
            };
          }();
          var a = o(ENTRY_MODULE);
          return a.default || a;
        }, A = F.toString().split("ENTRY_MODULE"), C = "[\\.|\\-|\\+|\\w|/|@]+", I = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + C + ").*?\\)";
        function k(y) {
          return (y + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        }
        function P(y) {
          return !isNaN(1 * y);
        }
        function L(y, m, n) {
          var o = {};
          o[n] = [];
          var a = m.toString().replace(/^"[^"]+"/, "function"), i = a.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/) || a.match(/^\(\w+,\s*\w+,\s*(\w+)\)\s?\=\s?\>/);
          if (!i)
            return o;
          for (var g = i[1], l = new RegExp("(\\\\n|\\W)" + k(g) + I, "g"), r; r = l.exec(a); )
            r[3] !== "dll-reference" && o[n].push(r[3]);
          for (l = new RegExp("\\(" + k(g) + '\\("(dll-reference\\s(' + C + '))"\\)\\)' + I, "g"); r = l.exec(a); )
            y[r[2]] || (o[n].push(r[1]), y[r[2]] = S(r[1]).m), o[r[2]] = o[r[2]] || [], o[r[2]].push(r[4]);
          for (var u = Object.keys(o), v = 0; v < u.length; v++)
            for (var f = 0; f < o[u[v]].length; f++)
              P(o[u[v]][f]) && (o[u[v]][f] = 1 * o[u[v]][f]);
          return o;
        }
        function x(y) {
          var m = Object.keys(y);
          return m.reduce(function(n, o) {
            return n || y[o].length > 0;
          }, !1);
        }
        function _(y, m) {
          for (var n = {
            main: [m]
          }, o = {
            main: []
          }, a = {
            main: {}
          }; x(n); )
            for (var i = Object.keys(n), g = 0; g < i.length; g++) {
              var l = i[g], r = n[l], u = r.pop();
              if (a[l] = a[l] || {}, !(a[l][u] || !y[l][u])) {
                a[l][u] = !0, o[l] = o[l] || [], o[l].push(u);
                for (var v = L(y, y[l][u], l), f = Object.keys(v), s = 0; s < f.length; s++)
                  n[f[s]] = n[f[s]] || [], n[f[s]] = n[f[s]].concat(v[f[s]]);
              }
            }
          return o;
        }
        function T(y, m, n, o) {
          var a = y[o].map(function(i) {
            return '"' + i + '": ' + m[o][i].toString().replace(/^"[^"]+"/, "function");
          }).join(",");
          return A[0] + "{" + a + "}" + A[1] + '"' + n + '"' + A[2];
        }
        function c(y, m) {
          m = m || {};
          var n = {
            main: S.m
          }, o = m.all ? {
            main: Object.keys(n.main)
          } : _(n, y), a = "";
          Object.keys(o).filter(function(u) {
            return u !== "main";
          }).forEach(function(u) {
            for (var v = 0; o[u][v]; )
              v++;
            o[u].push(v), n[u][v] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", a = a + ("var " + u + " = (" + T(o, n, v, modules) + `)();
`);
          }), a = a + ("new ((" + T(o, n, y, "main") + ")())(self);");
          var i = new window.Blob([a], {
            type: "text/javascript"
          }), g = window.URL || window.webkitURL || window.mozURL || window.msURL, l = g.createObjectURL(i), r = new window.Worker(l);
          return r.objectURL = l, r;
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
        var F = S("./node_modules/url-toolkit/src/url-toolkit.js"), A = S("./src/loader/playlist-loader.ts"), C = S("./src/controller/id3-track-controller.ts"), I = S("./src/controller/latency-controller.ts"), k = S("./src/controller/level-controller.ts"), P = S("./src/controller/fragment-tracker.ts"), L = S("./src/loader/key-loader.ts"), x = S("./src/controller/stream-controller.ts"), _ = S("./src/is-supported.ts"), T = S("./src/utils/logger.ts"), c = S("./src/config.ts"), y = S("./node_modules/eventemitter3/index.js"), m = S("./src/events.ts"), n = S("./src/errors.ts"), o = S("./src/types/level.ts");
        function a(u, v) {
          for (var f = 0; f < v.length; f++) {
            var s = v[f];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, g(s.key), s);
          }
        }
        function i(u, v, f) {
          return v && a(u.prototype, v), f && a(u, f), Object.defineProperty(u, "prototype", { writable: !1 }), u;
        }
        function g(u) {
          var v = l(u, "string");
          return typeof v == "symbol" ? v : String(v);
        }
        function l(u, v) {
          if (typeof u != "object" || u === null)
            return u;
          var f = u[Symbol.toPrimitive];
          if (f !== void 0) {
            var s = f.call(u, v || "default");
            if (typeof s != "object")
              return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (v === "string" ? String : Number)(u);
        }
        var r = /* @__PURE__ */ function() {
          u.isSupported = function() {
            return (0, _.isSupported)();
          };
          function u(f) {
            f === void 0 && (f = {}), this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this._emitter = new y.EventEmitter(), this._autoLevelCapping = void 0, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null;
            var s = this.config = (0, c.mergeConfig)(u.DefaultConfig, f);
            this.userConfig = f, (0, T.enableLogs)(s.debug, "Hls instance"), this._autoLevelCapping = -1, s.progressive && (0, c.enableStreamingMode)(s);
            var t = s.abrController, h = s.bufferController, e = s.capLevelController, d = s.fpsController, E = this.abrController = new t(this), p = this.bufferController = new h(this), D = this.capLevelController = new e(this), R = new d(this), b = new A.default(this), O = new C.default(this), M = this.levelController = new k.default(this), w = new P.FragmentTracker(this), U = new L.default(this.config), N = this.streamController = new x.default(this, w, U);
            D.setStreamController(N), R.setStreamController(N);
            var K = [b, M, N];
            this.networkControllers = K;
            var W = [E, p, D, R, O, w];
            this.audioTrackController = this.createController(s.audioTrackController, K);
            var G = s.audioStreamController;
            G && K.push(new G(this, w, U)), this.subtitleTrackController = this.createController(s.subtitleTrackController, K);
            var j = s.subtitleStreamController;
            j && K.push(new j(this, w, U)), this.createController(s.timelineController, W), U.emeController = this.emeController = this.createController(s.emeController, W), this.cmcdController = this.createController(s.cmcdController, W), this.latencyController = this.createController(I.default, W), this.coreComponents = W;
          }
          var v = u.prototype;
          return v.createController = function(s, t) {
            if (s) {
              var h = new s(this);
              return t && t.push(h), h;
            }
            return null;
          }, v.on = function(s, t, h) {
            h === void 0 && (h = this), this._emitter.on(s, t, h);
          }, v.once = function(s, t, h) {
            h === void 0 && (h = this), this._emitter.once(s, t, h);
          }, v.removeAllListeners = function(s) {
            this._emitter.removeAllListeners(s);
          }, v.off = function(s, t, h, e) {
            h === void 0 && (h = this), this._emitter.off(s, t, h, e);
          }, v.listeners = function(s) {
            return this._emitter.listeners(s);
          }, v.emit = function(s, t, h) {
            return this._emitter.emit(s, t, h);
          }, v.trigger = function(s, t) {
            if (this.config.debug)
              return this.emit(s, s, t);
            try {
              return this.emit(s, s, t);
            } catch (h) {
              T.logger.error("An internal error happened while handling event " + s + '. Error message: "' + h.message + '". Here is a stacktrace:', h), this.trigger(m.Events.ERROR, {
                type: n.ErrorTypes.OTHER_ERROR,
                details: n.ErrorDetails.INTERNAL_EXCEPTION,
                fatal: !1,
                event: s,
                error: h
              });
            }
            return !1;
          }, v.listenerCount = function(s) {
            return this._emitter.listenerCount(s);
          }, v.destroy = function() {
            T.logger.log("destroy"), this.trigger(m.Events.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach(function(s) {
              return s.destroy();
            }), this.networkControllers.length = 0, this.coreComponents.forEach(function(s) {
              return s.destroy();
            }), this.coreComponents.length = 0;
          }, v.attachMedia = function(s) {
            T.logger.log("attachMedia"), this._media = s, this.trigger(m.Events.MEDIA_ATTACHING, {
              media: s
            });
          }, v.detachMedia = function() {
            T.logger.log("detachMedia"), this.trigger(m.Events.MEDIA_DETACHING, void 0), this._media = null;
          }, v.loadSource = function(s) {
            this.stopLoad();
            var t = this.media, h = this.url, e = this.url = F.buildAbsoluteURL(self.location.href, s, {
              alwaysNormalize: !0
            });
            T.logger.log("loadSource:" + e), t && h && h !== e && this.bufferController.hasSourceTypes() && (this.detachMedia(), this.attachMedia(t)), this.trigger(m.Events.MANIFEST_LOADING, {
              url: s
            });
          }, v.startLoad = function(s) {
            s === void 0 && (s = -1), T.logger.log("startLoad(" + s + ")"), this.networkControllers.forEach(function(t) {
              t.startLoad(s);
            });
          }, v.stopLoad = function() {
            T.logger.log("stopLoad"), this.networkControllers.forEach(function(s) {
              s.stopLoad();
            });
          }, v.swapAudioCodec = function() {
            T.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec();
          }, v.recoverMediaError = function() {
            T.logger.log("recoverMediaError");
            var s = this._media;
            this.detachMedia(), s && this.attachMedia(s);
          }, v.removeLevel = function(s, t) {
            t === void 0 && (t = 0), this.levelController.removeLevel(s, t);
          }, i(u, [{
            key: "levels",
            get: function() {
              var s = this.levelController.levels;
              return s || [];
            }
          }, {
            key: "currentLevel",
            get: function() {
              return this.streamController.currentLevel;
            },
            set: function(s) {
              T.logger.log("set currentLevel:" + s), this.loadLevel = s, this.abrController.clearTimer(), this.streamController.immediateLevelSwitch();
            }
          }, {
            key: "nextLevel",
            get: function() {
              return this.streamController.nextLevel;
            },
            set: function(s) {
              T.logger.log("set nextLevel:" + s), this.levelController.manualLevel = s, this.streamController.nextLevelSwitch();
            }
          }, {
            key: "loadLevel",
            get: function() {
              return this.levelController.level;
            },
            set: function(s) {
              T.logger.log("set loadLevel:" + s), this.levelController.manualLevel = s;
            }
          }, {
            key: "nextLoadLevel",
            get: function() {
              return this.levelController.nextLoadLevel;
            },
            set: function(s) {
              this.levelController.nextLoadLevel = s;
            }
          }, {
            key: "firstLevel",
            get: function() {
              return Math.max(this.levelController.firstLevel, this.minAutoLevel);
            },
            set: function(s) {
              T.logger.log("set firstLevel:" + s), this.levelController.firstLevel = s;
            }
          }, {
            key: "startLevel",
            get: function() {
              return this.levelController.startLevel;
            },
            set: function(s) {
              T.logger.log("set startLevel:" + s), s !== -1 && (s = Math.max(s, this.minAutoLevel)), this.levelController.startLevel = s;
            }
          }, {
            key: "capLevelToPlayerSize",
            get: function() {
              return this.config.capLevelToPlayerSize;
            },
            set: function(s) {
              var t = !!s;
              t !== this.config.capLevelToPlayerSize && (t ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = t);
            }
          }, {
            key: "autoLevelCapping",
            get: function() {
              return this._autoLevelCapping;
            },
            set: function(s) {
              this._autoLevelCapping !== s && (T.logger.log("set autoLevelCapping:" + s), this._autoLevelCapping = s);
            }
          }, {
            key: "bandwidthEstimate",
            get: function() {
              var s = this.abrController.bwEstimator;
              return s ? s.getEstimate() : NaN;
            }
          }, {
            key: "maxHdcpLevel",
            get: function() {
              return this._maxHdcpLevel;
            },
            set: function(s) {
              o.HdcpLevels.indexOf(s) > -1 && (this._maxHdcpLevel = s);
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
              var s = this.levels, t = this.config.minAutoBitrate;
              if (!s)
                return 0;
              for (var h = s.length, e = 0; e < h; e++)
                if (s[e].maxBitrate >= t)
                  return e;
              return 0;
            }
          }, {
            key: "maxAutoLevel",
            get: function() {
              var s = this.levels, t = this.autoLevelCapping, h = this.maxHdcpLevel, e;
              if (t === -1 && s && s.length ? e = s.length - 1 : e = t, h)
                for (var d = e; d--; ) {
                  var E = s[d].attrs["HDCP-LEVEL"];
                  if (E && E <= h)
                    return d;
                }
              return e;
            }
          }, {
            key: "nextAutoLevel",
            get: function() {
              return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel);
            },
            set: function(s) {
              this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, s);
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
              var s = this.audioTrackController;
              return s ? s.audioTracks : [];
            }
          }, {
            key: "audioTrack",
            get: function() {
              var s = this.audioTrackController;
              return s ? s.audioTrack : -1;
            },
            set: function(s) {
              var t = this.audioTrackController;
              t && (t.audioTrack = s);
            }
          }, {
            key: "subtitleTracks",
            get: function() {
              var s = this.subtitleTrackController;
              return s ? s.subtitleTracks : [];
            }
          }, {
            key: "subtitleTrack",
            get: function() {
              var s = this.subtitleTrackController;
              return s ? s.subtitleTrack : -1;
            },
            set: function(s) {
              var t = this.subtitleTrackController;
              t && (t.subtitleTrack = s);
            }
          }, {
            key: "media",
            get: function() {
              return this._media;
            }
          }, {
            key: "subtitleDisplay",
            get: function() {
              var s = this.subtitleTrackController;
              return s ? s.subtitleDisplay : !1;
            },
            set: function(s) {
              var t = this.subtitleTrackController;
              t && (t.subtitleDisplay = s);
            }
          }, {
            key: "lowLatencyMode",
            get: function() {
              return this.config.lowLatencyMode;
            },
            set: function(s) {
              this.config.lowLatencyMode = s;
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
              return n.ErrorTypes;
            }
          }, {
            key: "ErrorDetails",
            get: function() {
              return n.ErrorDetails;
            }
          }, {
            key: "DefaultConfig",
            get: function() {
              return u.defaultConfig ? u.defaultConfig : c.hlsDefaultConfig;
            },
            set: function(s) {
              u.defaultConfig = s;
            }
          }]), u;
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
          return I = Object.assign ? Object.assign.bind() : function(c) {
            for (var y = 1; y < arguments.length; y++) {
              var m = arguments[y];
              for (var n in m)
                Object.prototype.hasOwnProperty.call(m, n) && (c[n] = m[n]);
            }
            return c;
          }, I.apply(this, arguments);
        }
        function k(c, y) {
          for (var m = 0; m < y.length; m++) {
            var n = y[m];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(c, L(n.key), n);
          }
        }
        function P(c, y, m) {
          return y && k(c.prototype, y), m && k(c, m), Object.defineProperty(c, "prototype", { writable: !1 }), c;
        }
        function L(c) {
          var y = x(c, "string");
          return typeof y == "symbol" ? y : String(y);
        }
        function x(c, y) {
          if (typeof c != "object" || c === null)
            return c;
          var m = c[Symbol.toPrimitive];
          if (m !== void 0) {
            var n = m.call(c, y || "default");
            if (typeof n != "object")
              return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (y === "string" ? String : Number)(c);
        }
        var _;
        (function(c) {
          c.ID = "ID", c.CLASS = "CLASS", c.START_DATE = "START-DATE", c.DURATION = "DURATION", c.END_DATE = "END-DATE", c.END_ON_NEXT = "END-ON-NEXT", c.PLANNED_DURATION = "PLANNED-DURATION", c.SCTE35_OUT = "SCTE35-OUT", c.SCTE35_IN = "SCTE35-IN";
        })(_ || (_ = {}));
        var T = /* @__PURE__ */ function() {
          function c(y, m) {
            if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, m) {
              var n = m.attr;
              for (var o in n)
                if (Object.prototype.hasOwnProperty.call(y, o) && y[o] !== n[o]) {
                  C.logger.warn('DATERANGE tag attribute: "' + o + '" does not match for tags with ID: "' + y.ID + '"'), this._badValueForSameId = o;
                  break;
                }
              y = I(new A.AttrList({}), n, y);
            }
            if (this.attr = y, this._startDate = new Date(y[_.START_DATE]), _.END_DATE in this.attr) {
              var a = new Date(this.attr[_.END_DATE]);
              (0, F.isFiniteNumber)(a.getTime()) && (this._endDate = a);
            }
          }
          return P(c, [{
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
          }]), c;
        }();
      },
      "./src/loader/fragment-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          LoadError: () => m,
          default: () => c
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/errors.ts");
        function C(n, o) {
          n.prototype = Object.create(o.prototype), n.prototype.constructor = n, x(n, o);
        }
        function I(n) {
          var o = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
          return I = function(i) {
            if (i === null || !L(i))
              return i;
            if (typeof i != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (typeof o != "undefined") {
              if (o.has(i))
                return o.get(i);
              o.set(i, g);
            }
            function g() {
              return k(i, arguments, _(this).constructor);
            }
            return g.prototype = Object.create(i.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), x(g, i);
          }, I(n);
        }
        function k(n, o, a) {
          return P() ? k = Reflect.construct.bind() : k = function(g, l, r) {
            var u = [null];
            u.push.apply(u, l);
            var v = Function.bind.apply(g, u), f = new v();
            return r && x(f, r.prototype), f;
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
          } catch (n) {
            return !1;
          }
        }
        function L(n) {
          return Function.toString.call(n).indexOf("[native code]") !== -1;
        }
        function x(n, o) {
          return x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, x(n, o);
        }
        function _(n) {
          return _ = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(a) {
            return a.__proto__ || Object.getPrototypeOf(a);
          }, _(n);
        }
        var T = Math.pow(2, 17), c = /* @__PURE__ */ function() {
          function n(a) {
            this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = a;
          }
          var o = n.prototype;
          return o.destroy = function() {
            this.loader && (this.loader.destroy(), this.loader = null);
          }, o.abort = function() {
            this.loader && this.loader.abort();
          }, o.load = function(i, g) {
            var l = this, r = i.url;
            if (!r)
              return Promise.reject(new m({
                type: A.ErrorTypes.NETWORK_ERROR,
                details: A.ErrorDetails.FRAG_LOAD_ERROR,
                fatal: !1,
                frag: i,
                networkDetails: null
              }, "Fragment does not have a " + (r ? "part list" : "url")));
            this.abort();
            var u = this.config, v = u.fLoader, f = u.loader;
            return new Promise(function(s, t) {
              l.loader && l.loader.destroy();
              var h = l.loader = i.loader = v ? new v(u) : new f(u), e = y(i), d = {
                timeout: u.fragLoadingTimeOut,
                maxRetry: 0,
                retryDelay: 0,
                maxRetryDelay: u.fragLoadingMaxRetryTimeout,
                highWaterMark: i.sn === "initSegment" ? 1 / 0 : T
              };
              i.stats = h.stats, h.load(e, d, {
                onSuccess: function(p, D, R, b) {
                  l.resetLoader(i, h);
                  var O = p.data;
                  R.resetIV && i.decryptdata && (i.decryptdata.iv = new Uint8Array(O.slice(0, 16)), O = O.slice(16)), s({
                    frag: i,
                    part: null,
                    payload: O,
                    networkDetails: b
                  });
                },
                onError: function(p, D, R) {
                  l.resetLoader(i, h), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.FRAG_LOAD_ERROR,
                    fatal: !1,
                    frag: i,
                    response: p,
                    networkDetails: R
                  }));
                },
                onAbort: function(p, D, R) {
                  l.resetLoader(i, h), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.INTERNAL_ABORTED,
                    fatal: !1,
                    frag: i,
                    networkDetails: R
                  }));
                },
                onTimeout: function(p, D, R) {
                  l.resetLoader(i, h), t(new m({
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
          }, o.loadPart = function(i, g, l) {
            var r = this;
            this.abort();
            var u = this.config, v = u.fLoader, f = u.loader;
            return new Promise(function(s, t) {
              r.loader && r.loader.destroy();
              var h = r.loader = i.loader = v ? new v(u) : new f(u), e = y(i, g), d = {
                timeout: u.fragLoadingTimeOut,
                maxRetry: 0,
                retryDelay: 0,
                maxRetryDelay: u.fragLoadingMaxRetryTimeout,
                highWaterMark: T
              };
              g.stats = h.stats, h.load(e, d, {
                onSuccess: function(p, D, R, b) {
                  r.resetLoader(i, h), r.updateStatsFromPart(i, g);
                  var O = {
                    frag: i,
                    part: g,
                    payload: p.data,
                    networkDetails: b
                  };
                  l(O), s(O);
                },
                onError: function(p, D, R) {
                  r.resetLoader(i, h), t(new m({
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
                  i.stats.aborted = g.stats.aborted, r.resetLoader(i, h), t(new m({
                    type: A.ErrorTypes.NETWORK_ERROR,
                    details: A.ErrorDetails.INTERNAL_ABORTED,
                    fatal: !1,
                    frag: i,
                    part: g,
                    networkDetails: R
                  }));
                },
                onTimeout: function(p, D, R) {
                  r.resetLoader(i, h), t(new m({
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
          }, o.updateStatsFromPart = function(i, g) {
            var l = i.stats, r = g.stats, u = r.total;
            if (l.loaded += r.loaded, u) {
              var v = Math.round(i.duration / g.duration), f = Math.min(Math.round(l.loaded / u), v), s = v - f, t = s * Math.round(l.loaded / f);
              l.total = l.loaded + t;
            } else
              l.total = Math.max(l.loaded, l.total);
            var h = l.loading, e = r.loading;
            h.start ? h.first += e.first - e.start : (h.start = e.start, h.first = e.first), h.end = e.end;
          }, o.resetLoader = function(i, g) {
            i.loader = null, this.loader === g && (self.clearTimeout(this.partLoadTimeout), this.loader = null), g.destroy();
          }, n;
        }();
        function y(n, o) {
          o === void 0 && (o = null);
          var a = o || n, i = {
            frag: n,
            part: o,
            responseType: "arraybuffer",
            url: a.url,
            headers: {},
            rangeStart: 0,
            rangeEnd: 0
          }, g = a.byteRangeStartOffset, l = a.byteRangeEndOffset;
          if ((0, F.isFiniteNumber)(g) && (0, F.isFiniteNumber)(l)) {
            var r, u = g, v = l;
            if (n.sn === "initSegment" && ((r = n.decryptdata) === null || r === void 0 ? void 0 : r.method) === "AES-128") {
              var f = l - g;
              f % 16 && (v = l + (16 - f % 16)), g !== 0 && (i.resetIV = !0, u = g - 16);
            }
            i.rangeStart = u, i.rangeEnd = v;
          }
          return i;
        }
        var m = /* @__PURE__ */ function(n) {
          C(o, n);
          function o(a) {
            for (var i, g = arguments.length, l = new Array(g > 1 ? g - 1 : 0), r = 1; r < g; r++)
              l[r - 1] = arguments[r];
            return i = n.call.apply(n, [this].concat(l)) || this, i.data = void 0, i.data = a, i;
          }
          return o;
        }(/* @__PURE__ */ I(Error));
      },
      "./src/loader/fragment.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          BaseSegment: () => c,
          ElementaryStreamTypes: () => T,
          Fragment: () => y,
          Part: () => m
        });
        var F = S("./src/polyfills/number.ts"), A = S("./node_modules/url-toolkit/src/url-toolkit.js"), C = S("./src/loader/load-stats.ts");
        function I(n, o) {
          n.prototype = Object.create(o.prototype), n.prototype.constructor = n, k(n, o);
        }
        function k(n, o) {
          return k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, g) {
            return i.__proto__ = g, i;
          }, k(n, o);
        }
        function P(n, o) {
          for (var a = 0; a < o.length; a++) {
            var i = o[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, x(i.key), i);
          }
        }
        function L(n, o, a) {
          return o && P(n.prototype, o), a && P(n, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
        }
        function x(n) {
          var o = _(n, "string");
          return typeof o == "symbol" ? o : String(o);
        }
        function _(n, o) {
          if (typeof n != "object" || n === null)
            return n;
          var a = n[Symbol.toPrimitive];
          if (a !== void 0) {
            var i = a.call(n, o || "default");
            if (typeof i != "object")
              return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (o === "string" ? String : Number)(n);
        }
        var T;
        (function(n) {
          n.AUDIO = "audio", n.VIDEO = "video", n.AUDIOVIDEO = "audiovideo";
        })(T || (T = {}));
        var c = /* @__PURE__ */ function() {
          function n(a) {
            var i;
            this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = (i = {}, i[T.AUDIO] = null, i[T.VIDEO] = null, i[T.AUDIOVIDEO] = null, i), this.baseurl = a;
          }
          var o = n.prototype;
          return o.setByteRange = function(i, g) {
            var l = i.split("@", 2), r = [];
            l.length === 1 ? r[0] = g ? g.byteRangeEndOffset : 0 : r[0] = parseInt(l[1]), r[1] = parseInt(l[0]) + r[0], this._byteRange = r;
          }, L(n, [{
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
          }]), n;
        }(), y = /* @__PURE__ */ function(n) {
          I(o, n);
          function o(i, g) {
            var l;
            return l = n.call(this, g) || this, l._decryptdata = null, l.rawProgramDateTime = null, l.programDateTime = null, l.tagList = [], l.duration = 0, l.sn = 0, l.levelkeys = void 0, l.type = void 0, l.loader = null, l.keyLoader = null, l.level = -1, l.cc = 0, l.startPTS = void 0, l.endPTS = void 0, l.appendedPTS = void 0, l.startDTS = void 0, l.endDTS = void 0, l.start = 0, l.deltaPTS = void 0, l.maxStartPTS = void 0, l.minEndPTS = void 0, l.stats = new C.LoadStats(), l.urlId = 0, l.data = void 0, l.bitrateTest = !1, l.title = null, l.initSegment = null, l.endList = void 0, l.type = i, l;
          }
          var a = o.prototype;
          return a.setKeyFormat = function(g) {
            if (this.levelkeys) {
              var l = this.levelkeys[g];
              l && !this._decryptdata && (this._decryptdata = l.getDecryptData(this.sn));
            }
          }, a.abortRequests = function() {
            var g, l;
            (g = this.loader) === null || g === void 0 || g.abort(), (l = this.keyLoader) === null || l === void 0 || l.abort();
          }, a.setElementaryStreamInfo = function(g, l, r, u, v, f) {
            f === void 0 && (f = !1);
            var s = this.elementaryStreams, t = s[g];
            if (!t) {
              s[g] = {
                startPTS: l,
                endPTS: r,
                startDTS: u,
                endDTS: v,
                partial: f
              };
              return;
            }
            t.startPTS = Math.min(t.startPTS, l), t.endPTS = Math.max(t.endPTS, r), t.startDTS = Math.min(t.startDTS, u), t.endDTS = Math.max(t.endDTS, v);
          }, a.clearElementaryStreamInfo = function() {
            var g = this.elementaryStreams;
            g[T.AUDIO] = null, g[T.VIDEO] = null, g[T.AUDIOVIDEO] = null;
          }, L(o, [{
            key: "decryptdata",
            get: function() {
              var g = this.levelkeys;
              if (!g && !this._decryptdata)
                return null;
              if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
                var l = this.levelkeys.identity;
                if (l)
                  this._decryptdata = l.getDecryptData(this.sn);
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
                var l = Object.keys(this.levelkeys), r = l.length;
                if (r > 1 || r === 1 && this.levelkeys[l[0]].encrypted)
                  return !0;
              }
              return !1;
            }
          }]), o;
        }(c), m = /* @__PURE__ */ function(n) {
          I(o, n);
          function o(a, i, g, l, r) {
            var u;
            u = n.call(this, g) || this, u.fragOffset = 0, u.duration = 0, u.gap = !1, u.independent = !1, u.relurl = void 0, u.fragment = void 0, u.index = void 0, u.stats = new C.LoadStats(), u.duration = a.decimalFloatingPoint("DURATION"), u.gap = a.bool("GAP"), u.independent = a.bool("INDEPENDENT"), u.relurl = a.enumeratedString("URI"), u.fragment = i, u.index = l;
            var v = a.enumeratedString("BYTERANGE");
            return v && u.setByteRange(v, r), r && (u.fragOffset = r.fragOffset + r.duration), u;
          }
          return L(o, [{
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
          }]), o;
        }(c);
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
              for (var T = L.sn, c = L.cc, y = function(a) {
                var i = x[a];
                if (c <= i.cc && (T === "initSegment" || T < i.sn))
                  return _.emeController.selectKeySystemFormat(i).then(function(g) {
                    i.setKeyFormat(g);
                  }), "break";
              }, m = 0; m < x.length; m++) {
                var n = y(m);
                if (n === "break")
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
            var c = L.decryptdata;
            if (!c) {
              var y = x ? "Expected frag.decryptdata to be defined after setting format " + x : "Missing decryption data on fragment in onKeyLoading";
              return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, y));
            }
            var m = c.uri;
            if (!m)
              return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, 'Invalid key URI: "' + m + '"'));
            var n = this.keyUriToKeyInfo[m];
            if ((_ = n) !== null && _ !== void 0 && _.decryptdata.key)
              return c.key = n.decryptdata.key, Promise.resolve({
                frag: L,
                keyInfo: n
              });
            if ((T = n) !== null && T !== void 0 && T.keyLoadPromise) {
              var o;
              switch ((o = n.mediaKeySessionContext) === null || o === void 0 ? void 0 : o.keyStatus) {
                case void 0:
                case "status-pending":
                case "usable":
                case "usable-in-future":
                  return n.keyLoadPromise;
              }
            }
            switch (n = this.keyUriToKeyInfo[m] = {
              decryptdata: c,
              keyLoadPromise: null,
              loader: null,
              mediaKeySessionContext: null
            }, c.method) {
              case "ISO-23001-7":
              case "SAMPLE-AES":
              case "SAMPLE-AES-CENC":
              case "SAMPLE-AES-CTR":
                return c.keyFormat === "identity" ? this.loadKeyHTTP(n, L) : this.loadKeyEME(n, L);
              case "AES-128":
                return this.loadKeyHTTP(n, L);
              default:
                return Promise.reject(this.createKeyLoadError(L, F.ErrorDetails.KEY_LOAD_ERROR, null, 'Key supplied with unsupported METHOD: "' + c.method + '"'));
            }
          }, k.loadKeyEME = function(L, x) {
            var _ = {
              frag: x,
              keyInfo: L
            };
            if (this.emeController && this.config.emeEnabled) {
              var T = this.emeController.loadKey(_);
              if (T)
                return (L.keyLoadPromise = T.then(function(c) {
                  return L.mediaKeySessionContext = c, _;
                })).catch(function(c) {
                  throw L.keyLoadPromise = null, c;
                });
            }
            return Promise.resolve(_);
          }, k.loadKeyHTTP = function(L, x) {
            var _ = this, T = this.config, c = T.loader, y = new c(T);
            return x.keyLoader = L.loader = y, L.keyLoadPromise = new Promise(function(m, n) {
              var o = {
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
                onSuccess: function(l, r, u, v) {
                  var f = u.frag, s = u.keyInfo, t = u.url;
                  if (!f.decryptdata || s !== _.keyUriToKeyInfo[t])
                    return n(_.createKeyLoadError(f, F.ErrorDetails.KEY_LOAD_ERROR, v, "after key load, decryptdata unset or changed"));
                  s.decryptdata.key = f.decryptdata.key = new Uint8Array(l.data), f.keyLoader = null, s.loader = null, m({
                    frag: f,
                    keyInfo: s
                  });
                },
                onError: function(l, r, u) {
                  _.resetLoader(r), n(_.createKeyLoadError(x, F.ErrorDetails.KEY_LOAD_ERROR, u));
                },
                onTimeout: function(l, r, u) {
                  _.resetLoader(r), n(_.createKeyLoadError(x, F.ErrorDetails.KEY_LOAD_TIMEOUT, u));
                },
                onAbort: function(l, r, u) {
                  _.resetLoader(r), n(_.createKeyLoadError(x, F.ErrorDetails.INTERNAL_ABORTED, u));
                }
              };
              y.load(o, a, i);
            });
          }, k.resetLoader = function(L) {
            var x = L.frag, _ = L.keyInfo, T = L.url, c = _.loader;
            x.keyLoader === c && (x.keyLoader = null, _.loader = null), delete this.keyUriToKeyInfo[T], c && c.destroy();
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
            var c = _[T];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(x, I(c.key), c);
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
            var c = T.call(x, _ || "default");
            if (typeof c != "object")
              return c;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (_ === "string" ? String : Number)(x);
        }
        var P = 10, L = /* @__PURE__ */ function() {
          function x(T) {
            this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = T;
          }
          var _ = x.prototype;
          return _.reloaded = function(c) {
            if (!c) {
              this.advanced = !0, this.updated = !0;
              return;
            }
            var y = this.lastPartSn - c.lastPartSn, m = this.lastPartIndex - c.lastPartIndex;
            this.updated = this.endSN !== c.endSN || !!m || !!y, this.advanced = this.endSN > c.endSN || y > 0 || y === 0 && m > 0, this.updated || this.advanced ? this.misses = Math.floor(c.misses * 0.6) : this.misses = c.misses + 1, this.availabilityDelay = c.availabilityDelay;
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
              var c = this.driftEndTime - this.driftStartTime;
              if (c > 0) {
                var y = this.driftEnd - this.driftStart;
                return y * 1e3 / c;
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
              var c;
              return (c = this.partList) !== null && c !== void 0 && c.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
            }
          }, {
            key: "fragmentEnd",
            get: function() {
              var c;
              return (c = this.fragments) !== null && c !== void 0 && c.length ? this.fragments[this.fragments.length - 1].end : 0;
            }
          }, {
            key: "age",
            get: function() {
              return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
            }
          }, {
            key: "lastPartIndex",
            get: function() {
              var c;
              return (c = this.partList) !== null && c !== void 0 && c.length ? this.partList[this.partList.length - 1].index : -1;
            }
          }, {
            key: "lastPartSn",
            get: function() {
              var c;
              return (c = this.partList) !== null && c !== void 0 && c.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
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
          function _(c, y, m, n, o) {
            n === void 0 && (n = [1]), o === void 0 && (o = null), this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = c, this.uri = y, this.keyFormat = m, this.keyFormatVersions = n, this.iv = o, this.encrypted = c ? c !== "NONE" : !1, this.isCommonEncryption = this.encrypted && c !== "AES-128";
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
              var m = x(y), n = new _(this.method, this.uri, "identity", this.keyFormatVersions, m);
              return n;
            }
            var o = (0, F.convertDataUriToArrayBytes)(this.uri);
            if (o)
              switch (this.keyFormat) {
                case A.KeySystemFormats.WIDEVINE:
                  this.pssh = o, o.length >= 22 && (this.keyId = o.subarray(o.length - 22, o.length - 6));
                  break;
                case A.KeySystemFormats.PLAYREADY: {
                  var a = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]);
                  this.pssh = (0, C.mp4pssh)(a, null, o);
                  var i = new Uint16Array(o.buffer, o.byteOffset, o.byteLength / 2), g = String.fromCharCode.apply(null, Array.from(i)), l = g.substring(g.indexOf("<"), g.length), r = new DOMParser(), u = r.parseFromString(l, "text/xml"), v = u.getElementsByTagName("KID")[0];
                  if (v) {
                    var f = v.childNodes[0] ? v.childNodes[0].nodeValue : v.getAttribute("VALUE");
                    if (f) {
                      var s = (0, k.base64Decode)(f).subarray(0, 16);
                      (0, F.changeEndianness)(s), this.keyId = s;
                    }
                  }
                  break;
                }
                default: {
                  var t = o.subarray(0, 16);
                  if (t.length !== 16) {
                    var h = new Uint8Array(16);
                    h.set(t, 16 - t.length), t = h;
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
          for (var T = new Uint8Array(16), c = 12; c < 16; c++)
            T[c] = _ >> 8 * (15 - c) & 255;
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
          default: () => o
        });
        var F = S("./src/polyfills/number.ts"), A = S("./node_modules/url-toolkit/src/url-toolkit.js"), C = S("./src/loader/date-range.ts"), I = S("./src/loader/fragment.ts"), k = S("./src/loader/level-details.ts"), P = S("./src/loader/level-key.ts"), L = S("./src/utils/attr-list.ts"), x = S("./src/utils/logger.ts"), _ = S("./src/utils/codecs.ts");
        function T() {
          return T = Object.assign ? Object.assign.bind() : function(v) {
            for (var f = 1; f < arguments.length; f++) {
              var s = arguments[f];
              for (var t in s)
                Object.prototype.hasOwnProperty.call(s, t) && (v[t] = s[t]);
            }
            return v;
          }, T.apply(this, arguments);
        }
        var c = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+|#EXT-X-SESSION-KEY:([^\n\r]*)[\r\n]+/g, y = /#EXT-X-MEDIA:(.*)/g, m = new RegExp([
          /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
          /(?!#) *(\S[\S ]*)/.source,
          /#EXT-X-BYTERANGE:*(.+)/.source,
          /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
          /#.*/.source
        ].join("|"), "g"), n = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|")), o = /* @__PURE__ */ function() {
          function v() {
          }
          return v.findGroup = function(s, t) {
            for (var h = 0; h < s.length; h++) {
              var e = s[h];
              if (e.id === t)
                return e;
            }
          }, v.convertAVC1ToAVCOTI = function(s) {
            var t = s.split(".");
            if (t.length > 2) {
              var h = t.shift() + ".";
              return h += parseInt(t.shift()).toString(16), h += ("000" + parseInt(t.shift()).toString(16)).slice(-4), h;
            }
            return s;
          }, v.resolve = function(s, t) {
            return (0, A.buildAbsoluteURL)(t, s, {
              alwaysNormalize: !0
            });
          }, v.parseMasterPlaylist = function(s, t) {
            var h = [], e = [], d = {}, E = [], p = !1;
            c.lastIndex = 0;
            for (var D; (D = c.exec(s)) != null; )
              if (D[1]) {
                var R, b = new L.AttrList(D[1]), O = {
                  attrs: b,
                  bitrate: b.decimalInteger("AVERAGE-BANDWIDTH") || b.decimalInteger("BANDWIDTH"),
                  name: b.NAME,
                  url: v.resolve(D[2], t)
                }, M = b.decimalResolution("RESOLUTION");
                M && (O.width = M.width, O.height = M.height), i((b.CODECS || "").split(/[ ,]+/).filter(function(W) {
                  return W;
                }), O), O.videoCodec && O.videoCodec.indexOf("avc1") !== -1 && (O.videoCodec = v.convertAVC1ToAVCOTI(O.videoCodec)), (R = O.unknownCodecs) !== null && R !== void 0 && R.length || e.push(O), h.push(O);
              } else if (D[3]) {
                var w = new L.AttrList(D[3]);
                w["DATA-ID"] && (p = !0, d[w["DATA-ID"]] = w);
              } else if (D[4]) {
                var U = D[4], N = a(U, t);
                N.encrypted && N.isSupported() ? E.push(N) : x.logger.warn('[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "' + U + '"');
              }
            var K = e.length > 0 && e.length < h.length;
            return {
              levels: K ? e : h,
              sessionData: p ? d : null,
              sessionKeys: E.length ? E : null
            };
          }, v.parseMasterPlaylistMedia = function(s, t, h, e) {
            e === void 0 && (e = []);
            var d, E = [], p = 0;
            for (y.lastIndex = 0; (d = y.exec(s)) !== null; ) {
              var D = new L.AttrList(d[1]);
              if (D.TYPE === h) {
                var R = {
                  attrs: D,
                  bitrate: 0,
                  id: p++,
                  groupId: D["GROUP-ID"],
                  instreamId: D["INSTREAM-ID"],
                  name: D.NAME || D.LANGUAGE || "",
                  type: h,
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
          }, v.parseLevelPlaylist = function(s, t, h, e, d) {
            var E = new k.LevelDetails(t), p = E.fragments, D = null, R = 0, b = 0, O = 0, M = 0, w = null, U = new I.Fragment(e, t), N, K, W, G = -1, j = !1;
            for (m.lastIndex = 0, E.m3u8 = s; (N = m.exec(s)) !== null; ) {
              j && (j = !1, U = new I.Fragment(e, t), U.start = O, U.sn = R, U.cc = M, U.level = h, D && (U.initSegment = D, U.rawProgramDateTime = D.rawProgramDateTime, D.rawProgramDateTime = null));
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
                  U.sn = R, U.level = h, U.cc = M, U.urlId = d, p.push(U), U.relurl = (" " + N[3]).slice(1), r(U, w), w = U, O += U.duration, R++, b = 0, j = !0;
                }
              } else if (N[4]) {
                var J = (" " + N[4]).slice(1);
                w ? U.setByteRange(J, w) : U.setByteRange(J);
              } else if (N[5])
                U.rawProgramDateTime = (" " + N[5]).slice(1), U.tagList.push(["PROGRAM-DATE-TIME", U.rawProgramDateTime]), G === -1 && (G = p.length);
              else {
                if (N = N[0].match(n), !N) {
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
                      u(ce, me, h, W), D = ce, U.initSegment = D, D.rawProgramDateTime && !U.rawProgramDateTime && (U.rawProgramDateTime = D.rawProgramDateTime);
                    } else
                      u(U, me, h, W), D = U, j = !0;
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
            return E.fragmentHint && (O += E.fragmentHint.duration), E.totalduration = O, E.endCC = M, G > 0 && l(p, G), E;
          }, v;
        }();
        function a(v, f) {
          var s, t, h = new L.AttrList(v), e = (s = h.enumeratedString("METHOD")) != null ? s : "", d = h.URI, E = h.hexadecimalInteger("IV"), p = h.enumeratedString("KEYFORMATVERSIONS"), D = (t = h.enumeratedString("KEYFORMAT")) != null ? t : "identity";
          d && h.IV && !E && x.logger.error("Invalid IV: " + h.IV);
          var R = d ? o.resolve(d, f) : "", b = (p || "1").split("/").map(Number).filter(Number.isFinite);
          return new P.LevelKey(e, R, D, b, E);
        }
        function i(v, f) {
          ["video", "audio", "text"].forEach(function(s) {
            var t = v.filter(function(e) {
              return (0, _.isCodecType)(e, s);
            });
            if (t.length) {
              var h = t.filter(function(e) {
                return e.lastIndexOf("avc1", 0) === 0 || e.lastIndexOf("mp4a", 0) === 0;
              });
              f[s + "Codec"] = h.length > 0 ? h[0] : t[0], v = v.filter(function(e) {
                return t.indexOf(e) === -1;
              });
            }
          }), f.unknownCodecs = v;
        }
        function g(v, f, s) {
          var t = f[s];
          t && (v[s] = t);
        }
        function l(v, f) {
          for (var s = v[f], t = f; t--; ) {
            var h = v[t];
            if (!h)
              return;
            h.programDateTime = s.programDateTime - h.duration * 1e3, s = h;
          }
        }
        function r(v, f) {
          v.rawProgramDateTime ? v.programDateTime = Date.parse(v.rawProgramDateTime) : f != null && f.programDateTime && (v.programDateTime = f.endProgramDateTime), (0, F.isFiniteNumber)(v.programDateTime) || (v.programDateTime = null, v.rawProgramDateTime = null);
        }
        function u(v, f, s, t) {
          v.relurl = f.URI, f.BYTERANGE && v.setByteRange(f.BYTERANGE), v.level = s, v.sn = "initSegment", t && (v.levelkeys = t), v.initSegment = null;
        }
      },
      "./src/loader/playlist-loader.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          default: () => c
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
          var n = y.url;
          return (n === void 0 || n.indexOf("data:") === 0) && (n = m.url), n;
        }
        var T = /* @__PURE__ */ function() {
          function y(n) {
            this.hls = void 0, this.loaders = /* @__PURE__ */ Object.create(null), this.hls = n, this.registerListeners();
          }
          var m = y.prototype;
          return m.startLoad = function(o) {
          }, m.stopLoad = function() {
            this.destroyInternalLoaders();
          }, m.registerListeners = function() {
            var o = this.hls;
            o.on(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), o.on(A.Events.LEVEL_LOADING, this.onLevelLoading, this), o.on(A.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), o.on(A.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
          }, m.unregisterListeners = function() {
            var o = this.hls;
            o.off(A.Events.MANIFEST_LOADING, this.onManifestLoading, this), o.off(A.Events.LEVEL_LOADING, this.onLevelLoading, this), o.off(A.Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), o.off(A.Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
          }, m.createInternalLoader = function(o) {
            var a = this.hls.config, i = a.pLoader, g = a.loader, l = i || g, r = new l(a);
            return o.loader = r, this.loaders[o.type] = r, r;
          }, m.getInternalLoader = function(o) {
            return this.loaders[o.type];
          }, m.resetInternalLoader = function(o) {
            this.loaders[o] && delete this.loaders[o];
          }, m.destroyInternalLoaders = function() {
            for (var o in this.loaders) {
              var a = this.loaders[o];
              a && a.destroy(), this.resetInternalLoader(o);
            }
          }, m.destroy = function() {
            this.unregisterListeners(), this.destroyInternalLoaders();
          }, m.onManifestLoading = function(o, a) {
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
          }, m.onLevelLoading = function(o, a) {
            var i = a.id, g = a.level, l = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: null,
              level: g,
              responseType: "text",
              type: P.PlaylistContextType.LEVEL,
              url: l,
              deliveryDirectives: r
            });
          }, m.onAudioTrackLoading = function(o, a) {
            var i = a.id, g = a.groupId, l = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: g,
              level: null,
              responseType: "text",
              type: P.PlaylistContextType.AUDIO_TRACK,
              url: l,
              deliveryDirectives: r
            });
          }, m.onSubtitleTrackLoading = function(o, a) {
            var i = a.id, g = a.groupId, l = a.url, r = a.deliveryDirectives;
            this.load({
              id: i,
              groupId: g,
              level: null,
              responseType: "text",
              type: P.PlaylistContextType.SUBTITLE_TRACK,
              url: l,
              deliveryDirectives: r
            });
          }, m.load = function(o) {
            var a, i = this.hls.config, g = this.getInternalLoader(o);
            if (g) {
              var l = g.context;
              if (l && l.url === o.url) {
                I.logger.trace("[playlist-loader]: playlist request ongoing");
                return;
              }
              I.logger.log("[playlist-loader]: aborting previous loader for type: " + o.type), g.abort();
            }
            var r, u, v, f;
            switch (o.type) {
              case P.PlaylistContextType.MANIFEST:
                r = i.manifestLoadingMaxRetry, u = i.manifestLoadingTimeOut, v = i.manifestLoadingRetryDelay, f = i.manifestLoadingMaxRetryTimeout;
                break;
              case P.PlaylistContextType.LEVEL:
              case P.PlaylistContextType.AUDIO_TRACK:
              case P.PlaylistContextType.SUBTITLE_TRACK:
                r = 0, u = i.levelLoadingTimeOut;
                break;
              default:
                r = i.levelLoadingMaxRetry, u = i.levelLoadingTimeOut, v = i.levelLoadingRetryDelay, f = i.levelLoadingMaxRetryTimeout;
                break;
            }
            if (g = this.createInternalLoader(o), (a = o.deliveryDirectives) !== null && a !== void 0 && a.part) {
              var s;
              if (o.type === P.PlaylistContextType.LEVEL && o.level !== null ? s = this.hls.levels[o.level].details : o.type === P.PlaylistContextType.AUDIO_TRACK && o.id !== null ? s = this.hls.audioTracks[o.id].details : o.type === P.PlaylistContextType.SUBTITLE_TRACK && o.id !== null && (s = this.hls.subtitleTracks[o.id].details), s) {
                var t = s.partTarget, h = s.targetduration;
                t && h && (u = Math.min(Math.max(t * 3, h * 0.8) * 1e3, u));
              }
            }
            var e = {
              timeout: u,
              maxRetry: r,
              retryDelay: v,
              maxRetryDelay: f,
              highWaterMark: 0
            }, d = {
              onSuccess: this.loadsuccess.bind(this),
              onError: this.loaderror.bind(this),
              onTimeout: this.loadtimeout.bind(this)
            };
            g.load(o, e, d);
          }, m.loadsuccess = function(o, a, i, g) {
            g === void 0 && (g = null), this.resetInternalLoader(i.type);
            var l = o.data;
            if (l.indexOf("#EXTM3U") !== 0) {
              this.handleManifestParsingError(o, i, "no EXTM3U delimiter", g);
              return;
            }
            a.parsing.start = performance.now(), l.indexOf("#EXTINF:") > 0 || l.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this.handleTrackOrLevelPlaylist(o, a, i, g) : this.handleMasterPlaylist(o, a, i, g);
          }, m.loaderror = function(o, a, i) {
            i === void 0 && (i = null), this.handleNetworkError(a, i, !1, o);
          }, m.loadtimeout = function(o, a, i) {
            i === void 0 && (i = null), this.handleNetworkError(a, i, !0);
          }, m.handleMasterPlaylist = function(o, a, i, g) {
            var l = this.hls, r = o.data, u = _(o, i), v = k.default.parseMasterPlaylist(r, u), f = v.levels, s = v.sessionData, t = v.sessionKeys;
            if (!f.length) {
              this.handleManifestParsingError(o, i, "no level found in manifest", g);
              return;
            }
            var h = f.map(function(R) {
              return {
                id: R.attrs.AUDIO,
                audioCodec: R.audioCodec
              };
            }), e = f.map(function(R) {
              return {
                id: R.attrs.SUBTITLES,
                textCodec: R.textCodec
              };
            }), d = k.default.parseMasterPlaylistMedia(r, u, "AUDIO", h), E = k.default.parseMasterPlaylistMedia(r, u, "SUBTITLES", e), p = k.default.parseMasterPlaylistMedia(r, u, "CLOSED-CAPTIONS");
            if (d.length) {
              var D = d.some(function(R) {
                return !R.url;
              });
              !D && f[0].audioCodec && !f[0].attrs.AUDIO && (I.logger.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), d.unshift({
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
            l.trigger(A.Events.MANIFEST_LOADED, {
              levels: f,
              audioTracks: d,
              subtitles: E,
              captions: p,
              url: u,
              stats: a,
              networkDetails: g,
              sessionData: s,
              sessionKeys: t
            });
          }, m.handleTrackOrLevelPlaylist = function(o, a, i, g) {
            var l = this.hls, r = i.id, u = i.level, v = i.type, f = _(o, i), s = (0, F.isFiniteNumber)(r) ? r : 0, t = (0, F.isFiniteNumber)(u) ? u : s, h = x(i), e = k.default.parseLevelPlaylist(o.data, f, t, h, s);
            if (!e.fragments.length) {
              l.trigger(A.Events.ERROR, {
                type: C.ErrorTypes.NETWORK_ERROR,
                details: C.ErrorDetails.LEVEL_EMPTY_ERROR,
                fatal: !1,
                url: f,
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
                url: f
              };
              l.trigger(A.Events.MANIFEST_LOADED, {
                levels: [d],
                audioTracks: [],
                url: f,
                stats: a,
                networkDetails: g,
                sessionData: null,
                sessionKeys: null
              });
            }
            a.parsing.end = performance.now(), i.levelDetails = e, this.handlePlaylistLoaded(o, a, i, g);
          }, m.handleManifestParsingError = function(o, a, i, g) {
            this.hls.trigger(A.Events.ERROR, {
              type: C.ErrorTypes.NETWORK_ERROR,
              details: C.ErrorDetails.MANIFEST_PARSING_ERROR,
              fatal: a.type === P.PlaylistContextType.MANIFEST,
              url: o.url,
              reason: i,
              response: o,
              context: a,
              networkDetails: g
            });
          }, m.handleNetworkError = function(o, a, i, g) {
            i === void 0 && (i = !1), I.logger.warn("[playlist-loader]: A network " + (i ? "timeout" : "error") + " occurred while loading " + o.type + " level: " + o.level + " id: " + o.id + ' group-id: "' + o.groupId + '"');
            var l = C.ErrorDetails.UNKNOWN, r = !1, u = this.getInternalLoader(o);
            switch (o.type) {
              case P.PlaylistContextType.MANIFEST:
                l = i ? C.ErrorDetails.MANIFEST_LOAD_TIMEOUT : C.ErrorDetails.MANIFEST_LOAD_ERROR, r = !0;
                break;
              case P.PlaylistContextType.LEVEL:
                l = i ? C.ErrorDetails.LEVEL_LOAD_TIMEOUT : C.ErrorDetails.LEVEL_LOAD_ERROR, r = !1;
                break;
              case P.PlaylistContextType.AUDIO_TRACK:
                l = i ? C.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : C.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, r = !1;
                break;
              case P.PlaylistContextType.SUBTITLE_TRACK:
                l = i ? C.ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT : C.ErrorDetails.SUBTITLE_LOAD_ERROR, r = !1;
                break;
            }
            u && this.resetInternalLoader(o.type);
            var v = {
              type: C.ErrorTypes.NETWORK_ERROR,
              details: l,
              fatal: r,
              url: o.url,
              loader: u,
              context: o,
              networkDetails: a
            };
            g && (v.response = g), this.hls.trigger(A.Events.ERROR, v);
          }, m.handlePlaylistLoaded = function(o, a, i, g) {
            var l = i.type, r = i.level, u = i.id, v = i.groupId, f = i.loader, s = i.levelDetails, t = i.deliveryDirectives;
            if (!(s != null && s.targetduration)) {
              this.handleManifestParsingError(o, i, "invalid target duration", g);
              return;
            }
            if (!!f)
              switch (s.live && (f.getCacheAge && (s.ageHeader = f.getCacheAge() || 0), (!f.getCacheAge || isNaN(s.ageHeader)) && (s.ageHeader = 0)), l) {
                case P.PlaylistContextType.MANIFEST:
                case P.PlaylistContextType.LEVEL:
                  this.hls.trigger(A.Events.LEVEL_LOADED, {
                    details: s,
                    level: r || 0,
                    id: u || 0,
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
                case P.PlaylistContextType.AUDIO_TRACK:
                  this.hls.trigger(A.Events.AUDIO_TRACK_LOADED, {
                    details: s,
                    id: u || 0,
                    groupId: v || "",
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
                case P.PlaylistContextType.SUBTITLE_TRACK:
                  this.hls.trigger(A.Events.SUBTITLE_TRACK_LOADED, {
                    details: s,
                    id: u || 0,
                    groupId: v || "",
                    stats: a,
                    networkDetails: g,
                    deliveryDirectives: t
                  });
                  break;
              }
          }, y;
        }();
        const c = T;
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
            var c = new Uint8Array([105, 115, 111, 109]), y = new Uint8Array([97, 118, 99, 49]), m = new Uint8Array([0, 0, 0, 1]);
            I.FTYP = I.box(I.types.ftyp, c, m, c, y), I.DINF = I.box(I.types.dinf, I.box(I.types.dref, _));
          }, I.box = function(P) {
            for (var L = 8, x = arguments.length, _ = new Array(x > 1 ? x - 1 : 0), T = 1; T < x; T++)
              _[T - 1] = arguments[T];
            for (var c = _.length, y = c; c--; )
              L += _[c].byteLength;
            var m = new Uint8Array(L);
            for (m[0] = L >> 24 & 255, m[1] = L >> 16 & 255, m[2] = L >> 8 & 255, m[3] = L & 255, m.set(P, 4), c = 0, L = 8; c < y; c++)
              m.set(_[c], L), L += _[c].byteLength;
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
            var L = [], x = [], _, T, c;
            for (_ = 0; _ < P.sps.length; _++)
              T = P.sps[_], c = T.byteLength, L.push(c >>> 8 & 255), L.push(c & 255), L = L.concat(Array.prototype.slice.call(T));
            for (_ = 0; _ < P.pps.length; _++)
              T = P.pps[_], c = T.byteLength, x.push(c >>> 8 & 255), x.push(c & 255), x = x.concat(Array.prototype.slice.call(T));
            var y = I.box(I.types.avcC, new Uint8Array([
              1,
              L[3],
              L[4],
              L[5],
              255,
              224 | P.sps.length
            ].concat(L).concat([
              P.pps.length
            ]).concat(x))), m = P.width, n = P.height, o = P.pixelRatio[0], a = P.pixelRatio[1];
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
                n >> 8 & 255,
                n & 255,
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
                o >> 24,
                o >> 16 & 255,
                o >> 8 & 255,
                o & 255,
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
            var L = P.id, x = P.duration * P.timescale, _ = P.width, T = P.height, c = Math.floor(x / (F + 1)), y = Math.floor(x % (F + 1));
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
              c >> 24,
              c >> 16 & 255,
              c >> 8 & 255,
              c & 255,
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
            var x = I.sdtp(P), _ = P.id, T = Math.floor(L / (F + 1)), c = Math.floor(L % (F + 1));
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
                c >> 24,
                c >> 16 & 255,
                c >> 8 & 255,
                c & 255
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
            var x = P.samples || [], _ = x.length, T = 12 + 16 * _, c = new Uint8Array(T), y, m, n, o, a, i;
            for (L += 8 + T, c.set([
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
              m = x[y], n = m.duration, o = m.size, a = m.flags, i = m.cts, c.set([
                n >>> 24 & 255,
                n >>> 16 & 255,
                n >>> 8 & 255,
                n & 255,
                o >>> 24 & 255,
                o >>> 16 & 255,
                o >>> 8 & 255,
                o & 255,
                a.isLeading << 2 | a.dependsOn,
                a.isDependedOn << 6 | a.hasRedundancy << 4 | a.paddingValue << 1 | a.isNonSync,
                a.degradPrio & 240 << 8,
                a.degradPrio & 15,
                i >>> 24 & 255,
                i >>> 16 & 255,
                i >>> 8 & 255,
                i & 255
              ], 12 + 16 * y);
            return I.box(I.types.trun, c);
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
          default: () => o,
          flushTextTrackMetadataCueSamples: () => g,
          flushTextTrackUserdataCueSamples: () => l,
          normalizePts: () => a
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/remux/aac-helper.ts"), C = S("./src/remux/mp4-generator.ts"), I = S("./src/events.ts"), k = S("./src/errors.ts"), P = S("./src/utils/logger.ts"), L = S("./src/types/loader.ts"), x = S("./src/utils/timescale-conversion.ts");
        function _() {
          return _ = Object.assign ? Object.assign.bind() : function(v) {
            for (var f = 1; f < arguments.length; f++) {
              var s = arguments[f];
              for (var t in s)
                Object.prototype.hasOwnProperty.call(s, t) && (v[t] = s[t]);
            }
            return v;
          }, _.apply(this, arguments);
        }
        var T = 10 * 1e3, c = 1024, y = 1152, m = null, n = null, o = /* @__PURE__ */ function() {
          function v(s, t, h, e) {
            if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = void 0, this._initDTS = void 0, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.observer = s, this.config = t, this.typeSupported = h, this.ISGenerated = !1, m === null) {
              var d = navigator.userAgent || "", E = d.match(/Chrome\/(\d+)/i);
              m = E ? parseInt(E[1]) : 0;
            }
            if (n === null) {
              var p = navigator.userAgent.match(/Safari\/(\d+)/i);
              n = p ? parseInt(p[1]) : 0;
            }
          }
          var f = v.prototype;
          return f.destroy = function() {
          }, f.resetTimeStamp = function(t) {
            P.logger.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = t;
          }, f.resetNextTimestamp = function() {
            P.logger.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
          }, f.resetInitSegment = function() {
            P.logger.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1;
          }, f.getVideoStartPts = function(t) {
            var h = !1, e = t.reduce(function(d, E) {
              var p = E.pts - d;
              return p < -4294967296 ? (h = !0, a(d, E.pts)) : p > 0 ? d : E.pts;
            }, t[0].pts);
            return h && P.logger.debug("PTS rollover detected"), e;
          }, f.remux = function(t, h, e, d, E, p, D, R) {
            var b, O, M, w, U, N, K = E, W = E, G = t.pid > -1, j = h.pid > -1, H = h.samples.length, X = t.samples.length > 0, Z = D && H > 0 || H > 1, J = (!G || X) && (!j || Z) || this.ISGenerated || D;
            if (J) {
              this.ISGenerated || (M = this.generateIS(t, h, E));
              var $ = this.isVideoContiguous, z = -1, q;
              if (Z && (z = i(h.samples), !$ && this.config.forceKeyFrameOnDiscontinuity))
                if (N = !0, z > 0) {
                  P.logger.warn("[mp4-remuxer]: Dropped " + z + " out of " + H + " video samples due to a missing keyframe");
                  var ie = this.getVideoStartPts(h.samples);
                  h.samples = h.samples.slice(z), h.dropped += z, W += (h.samples[0].pts - ie) / h.inputTimeScale, q = W;
                } else
                  z === -1 && (P.logger.warn("[mp4-remuxer]: No keyframe found out of " + H + " video samples"), N = !1);
              if (this.ISGenerated) {
                if (X && Z) {
                  var ne = this.getVideoStartPts(h.samples), de = a(t.samples[0].pts, ne) - ne, se = de / h.inputTimeScale;
                  K += Math.max(0, se), W += Math.max(0, -se);
                }
                if (X) {
                  if (t.samplerate || (P.logger.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), M = this.generateIS(t, h, E)), O = this.remuxAudio(t, K, this.isAudioContiguous, p, j || Z || R === L.PlaylistLevelType.AUDIO ? W : void 0), Z) {
                    var ue = O ? O.endPTS - O.startPTS : 0;
                    h.inputTimeScale || (P.logger.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), M = this.generateIS(t, h, E)), b = this.remuxVideo(h, W, $, ue);
                  }
                } else
                  Z && (b = this.remuxVideo(h, W, $, 0));
                b && (b.firstKeyFrame = z, b.independent = z !== -1, b.firstKeyFramePTS = q);
              }
            }
            return this.ISGenerated && (e.samples.length && (U = g(e, E, this._initPTS, this._initDTS)), d.samples.length && (w = l(d, E, this._initPTS))), {
              audio: O,
              video: b,
              initSegment: M,
              independent: N,
              text: w,
              id3: U
            };
          }, f.generateIS = function(t, h, e) {
            var d = t.samples, E = h.samples, p = this.typeSupported, D = {}, R = !(0, F.isFiniteNumber)(this._initPTS), b = "audio/mp4", O, M, w;
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
            if (h.sps && h.pps && E.length && (h.timescale = h.inputTimeScale, D.video = {
              id: "main",
              container: "video/mp4",
              codec: h.codec,
              initSegment: C.default.initSegment([h]),
              metadata: {
                width: h.width,
                height: h.height
              }
            }, R)) {
              w = h.inputTimeScale;
              var U = this.getVideoStartPts(E), N = Math.round(w * e);
              M = Math.min(M, a(E[0].dts, U) - N), O = Math.min(O, U - N);
            }
            if (Object.keys(D).length)
              return this.ISGenerated = !0, R && (this._initPTS = O, this._initDTS = M), {
                tracks: D,
                initPTS: O,
                timescale: w
              };
          }, f.remuxVideo = function(t, h, e, d) {
            var E = t.inputTimeScale, p = t.samples, D = [], R = p.length, b = this._initPTS, O = this.nextAvcDts, M = 8, w = this.videoSampleDuration, U, N, K = Number.POSITIVE_INFINITY, W = Number.NEGATIVE_INFINITY, G = !1;
            if (!e || O === null) {
              var j = h * E, H = p[0].pts - a(p[0].dts, p[0].pts);
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
              } else if (n && Se - De < _e - be && $ / _e < 0.025 && D[0].cts === 0) {
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
          }, f.remuxAudio = function(t, h, e, d, E) {
            var p = t.inputTimeScale, D = t.samplerate ? t.samplerate : p, R = p / D, b = t.segmentCodec === "aac" ? c : y, O = b * R, M = this._initPTS, w = t.segmentCodec === "mp3" && this.typeSupported.mpeg, U = [], N = E !== void 0, K = t.samples, W = w ? 0 : 8, G = this.nextAudioPts || -1, j = h * p;
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
          }, f.remuxEmptyAudio = function(t, h, e, d) {
            var E = t.inputTimeScale, p = t.samplerate ? t.samplerate : E, D = E / p, R = this.nextAudioPts, b = (R !== null ? R : d.startDTS * E) + this._initDTS, O = d.endDTS * E + this._initDTS, M = D * c, w = Math.ceil((O - b) / M), U = A.default.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
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
            return t.samples = N, this.remuxAudio(t, h, e, !1);
          }, v;
        }();
        function a(v, f) {
          var s;
          if (f === null)
            return v;
          for (f < v ? s = -8589934592 : s = 8589934592; Math.abs(v - f) > 4294967296; )
            v += s;
          return v;
        }
        function i(v) {
          for (var f = 0; f < v.length; f++)
            if (v[f].key)
              return f;
          return -1;
        }
        function g(v, f, s, t) {
          var h = v.samples.length;
          if (!!h) {
            for (var e = v.inputTimeScale, d = 0; d < h; d++) {
              var E = v.samples[d];
              E.pts = a(E.pts - s, f * e) / e, E.dts = a(E.dts - t, f * e) / e;
            }
            var p = v.samples;
            return v.samples = [], {
              samples: p
            };
          }
        }
        function l(v, f, s) {
          var t = v.samples.length;
          if (!!t) {
            for (var h = v.inputTimeScale, e = 0; e < t; e++) {
              var d = v.samples[e];
              d.pts = a(d.pts - s, f * h) / h;
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
        var r = function(f, s, t, h) {
          this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = s, this.size = t, this.cts = h, this.flags = new u(f);
        }, u = function(f) {
          this.isLeading = 0, this.isDependedOn = 0, this.hasRedundancy = 0, this.degradPrio = 0, this.dependsOn = 1, this.isNonSync = 1, this.dependsOn = f ? 2 : 1, this.isNonSync = f ? 0 : 1;
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
          }, T.resetInitSegment = function(y, m, n, o) {
            this.audioCodec = m, this.videoCodec = n, this.generateInitSegment((0, C.patchEncyptionData)(y, o)), this.emitInitSegment = !0;
          }, T.generateInitSegment = function(y) {
            var m = this.audioCodec, n = this.videoCodec;
            if (!y || !y.byteLength) {
              this.initTracks = void 0, this.initData = void 0;
              return;
            }
            var o = this.initData = (0, C.parseInitSegment)(y);
            m || (m = L(o.audio, I.ElementaryStreamTypes.AUDIO)), n || (n = L(o.video, I.ElementaryStreamTypes.VIDEO));
            var a = {};
            o.audio && o.video ? a.audiovideo = {
              container: "video/mp4",
              codec: m + "," + n,
              initSegment: y,
              id: "main"
            } : o.audio ? a.audio = {
              container: "audio/mp4",
              codec: m,
              initSegment: y,
              id: "audio"
            } : o.video ? a.video = {
              container: "video/mp4",
              codec: n,
              initSegment: y,
              id: "main"
            } : k.logger.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = a;
          }, T.remux = function(y, m, n, o, a) {
            var i, g = this.initPTS, l = this.lastEndTime, r = {
              audio: void 0,
              video: void 0,
              text: o,
              id3: n,
              initSegment: void 0
            };
            (0, F.isFiniteNumber)(l) || (l = this.lastEndTime = a || 0);
            var u = m.samples;
            if (!u || !u.length)
              return r;
            var v = {
              initPTS: void 0,
              timescale: 1
            }, f = this.initData;
            if ((!f || !f.length) && (this.generateInitSegment(u), f = this.initData), !f || !f.length)
              return k.logger.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), r;
            this.emitInitSegment && (v.tracks = this.initTracks, this.emitInitSegment = !1);
            var s = (0, C.getStartDTS)(f, u);
            (0, F.isFiniteNumber)(g) || (this.initPTS = v.initPTS = g = s - a);
            var t = (0, C.getDuration)(u, f), h = y ? s - g : l, e = h + t;
            (0, C.offsetStartDTS)(f, u, g), t > 0 ? this.lastEndTime = e : (k.logger.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
            var d = !!f.audio, E = !!f.video, p = "";
            d && (p += "audio"), E && (p += "video");
            var D = {
              data1: u,
              startPTS: h,
              startDTS: h,
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
            return r.id3 = (0, A.flushTextTrackMetadataCueSamples)(n, a, R, R), o.samples.length && (r.text = (0, A.flushTextTrackUserdataCueSamples)(o, a, R)), r;
          }, _;
        }();
        function L(_, T) {
          var c = _ == null ? void 0 : _.codec;
          return c && c.length > 4 ? c : c === "hvc1" || c === "hev1" ? "hvc1.1.c.L120.90" : c === "av01" ? "av01.0.04M.08" : c === "avc1" || T === I.ElementaryStreamTypes.VIDEO ? "avc1.42e01e" : "mp4a.40.5";
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
        function F(T, c) {
          for (var y = 0; y < c.length; y++) {
            var m = c[y];
            m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(T, C(m.key), m);
          }
        }
        function A(T, c, y) {
          return c && F(T.prototype, c), y && F(T, y), Object.defineProperty(T, "prototype", { writable: !1 }), T;
        }
        function C(T) {
          var c = I(T, "string");
          return typeof c == "symbol" ? c : String(c);
        }
        function I(T, c) {
          if (typeof T != "object" || T === null)
            return T;
          var y = T[Symbol.toPrimitive];
          if (y !== void 0) {
            var m = y.call(T, c || "default");
            if (typeof m != "object")
              return m;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (c === "string" ? String : Number)(T);
        }
        var k = ["NONE", "TYPE-0", "TYPE-1", "TYPE-2", null], P;
        (function(T) {
          T.No = "", T.Yes = "YES", T.v2 = "v2";
        })(P || (P = {}));
        function L(T, c) {
          var y = T.canSkipUntil, m = T.canSkipDateRanges, n = T.endSN, o = c !== void 0 ? c - n : 0;
          return y && o < y ? m ? P.v2 : P.Yes : P.No;
        }
        var x = /* @__PURE__ */ function() {
          function T(y, m, n) {
            this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = y, this.part = m, this.skip = n;
          }
          var c = T.prototype;
          return c.addDirectives = function(m) {
            var n = new self.URL(m);
            return this.msn !== void 0 && n.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && n.searchParams.set("_HLS_part", this.part.toString()), this.skip && n.searchParams.set("_HLS_skip", this.skip), n.href;
          }, T;
        }(), _ = /* @__PURE__ */ function() {
          function T(c) {
            this.attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.unknownCodecs = void 0, this.audioGroupIds = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.textGroupIds = void 0, this.url = void 0, this._urlId = 0, this.url = [c.url], this.attrs = c.attrs, this.bitrate = c.bitrate, c.details && (this.details = c.details), this.id = c.id || 0, this.name = c.name, this.width = c.width || 0, this.height = c.height || 0, this.audioCodec = c.audioCodec, this.videoCodec = c.videoCodec, this.unknownCodecs = c.unknownCodecs, this.codecSet = [c.videoCodec, c.audioCodec].filter(function(y) {
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
              var c = x[2];
              c.indexOf(T) === 0 && c.lastIndexOf(T) === c.length - 1 && (c = c.slice(1, -1)), _[x[1]] = c;
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
                var _ = I.getBuffered(P), T = [], c;
                for (c = 0; c < _.length; c++)
                  T.push({
                    start: _.start(c),
                    end: _.end(c)
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
            L = Math.max(0, L), P.sort(function(r, u) {
              var v = r.start - u.start;
              return v || u.end - r.end;
            });
            var _ = [];
            if (x)
              for (var T = 0; T < P.length; T++) {
                var c = _.length;
                if (c) {
                  var y = _[c - 1].end;
                  P[T].start - y < x ? P[T].end > y && (_[c - 1].end = P[T].end) : _.push(P[T]);
                } else
                  _.push(P[T]);
              }
            else
              _ = P;
            for (var m = 0, n, o = L, a = L, i = 0; i < _.length; i++) {
              var g = _[i].start, l = _[i].end;
              if (L + x >= g && L < l)
                o = g, a = l, m = a - L;
              else if (L + x < g) {
                n = g;
                break;
              }
            }
            return {
              len: m,
              start: o || 0,
              end: a || 0,
              nextStart: n
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
          default: () => f
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
          var h = t;
          return A.hasOwnProperty(t) && (h = A[t]), String.fromCharCode(h);
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
        }, T = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"], c;
        (function(s) {
          s[s.ERROR = 0] = "ERROR", s[s.TEXT = 1] = "TEXT", s[s.WARNING = 2] = "WARNING", s[s.INFO = 2] = "INFO", s[s.DEBUG = 3] = "DEBUG", s[s.DATA = 3] = "DATA";
        })(c || (c = {}));
        var y = /* @__PURE__ */ function() {
          function s() {
            this.time = null, this.verboseLevel = c.ERROR;
          }
          var t = s.prototype;
          return t.log = function(e, d) {
            if (this.verboseLevel >= e) {
              var E = typeof d == "function" ? d() : d;
              F.logger.log(this.time + " [" + e + "] " + E);
            }
          }, s;
        }(), m = function(t) {
          for (var h = [], e = 0; e < t.length; e++)
            h.push(t[e].toString(16));
          return h;
        }, n = /* @__PURE__ */ function() {
          function s(h, e, d, E, p) {
            this.foreground = void 0, this.underline = void 0, this.italics = void 0, this.background = void 0, this.flash = void 0, this.foreground = h || "white", this.underline = e || !1, this.italics = d || !1, this.background = E || "black", this.flash = p || !1;
          }
          var t = s.prototype;
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
          }, s;
        }(), o = /* @__PURE__ */ function() {
          function s(h, e, d, E, p, D) {
            this.uchar = void 0, this.penState = void 0, this.uchar = h || " ", this.penState = new n(e, d, E, p, D);
          }
          var t = s.prototype;
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
          }, s;
        }(), a = /* @__PURE__ */ function() {
          function s(h) {
            this.chars = void 0, this.pos = void 0, this.currPenState = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chars = [];
            for (var e = 0; e < k; e++)
              this.chars.push(new o());
            this.logger = h, this.pos = 0, this.currPenState = new n();
          }
          var t = s.prototype;
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
            this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(c.DEBUG, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > k && (this.logger.log(c.DEBUG, "Too large cursor position " + this.pos), this.pos = k);
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
              this.logger.log(c.ERROR, function() {
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
          }, s;
        }(), i = /* @__PURE__ */ function() {
          function s(h) {
            this.rows = void 0, this.currRow = void 0, this.nrRollUpRows = void 0, this.lastOutputScreen = void 0, this.logger = void 0, this.rows = [];
            for (var e = 0; e < I; e++)
              this.rows.push(new a(h));
            this.logger = h, this.currRow = I - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.reset();
          }
          var t = s.prototype;
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
            this.logger.log(c.INFO, "setCursor: " + e);
            var d = this.rows[this.currRow];
            d.setCursor(e);
          }, t.setPAC = function(e) {
            this.logger.log(c.INFO, function() {
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
            this.logger.log(c.INFO, function() {
              return "bkgData = " + JSON.stringify(e);
            }), this.backSpace(), this.setPen(e), this.insertChar(32);
          }, t.setRollUpRows = function(e) {
            this.nrRollUpRows = e;
          }, t.rollUp = function() {
            var e = this;
            if (this.nrRollUpRows === null) {
              this.logger.log(c.DEBUG, "roll_up but nrRollUpRows not set yet");
              return;
            }
            this.logger.log(c.TEXT, function() {
              return e.getDisplayText();
            });
            var d = this.currRow + 1 - this.nrRollUpRows, E = this.rows.splice(d, 1)[0];
            E.clear(), this.rows.splice(this.currRow, 0, E), this.logger.log(c.INFO, "Rolling up");
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
          }, s;
        }(), g = /* @__PURE__ */ function() {
          function s(h, e, d) {
            this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = h, this.outputFilter = e, this.mode = null, this.verbose = 0, this.displayedMemory = new i(d), this.nonDisplayedMemory = new i(d), this.lastOutputScreen = new i(d), this.currRollUpRow = this.displayedMemory.rows[I - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = d;
          }
          var t = s.prototype;
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
            e !== this.mode && (this.mode = e, this.logger.log(c.INFO, function() {
              return "MODE=" + e;
            }), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e);
          }, t.insertChars = function(e) {
            for (var d = this, E = 0; E < e.length; E++)
              this.writeScreen.insertChar(e[E]);
            var p = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
            this.logger.log(c.INFO, function() {
              return p + ": " + d.writeScreen.getDisplayText(!0);
            }), (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") && (this.logger.log(c.TEXT, function() {
              return "DISPLAYED: " + d.displayedMemory.getDisplayText(!0);
            }), this.outputDataUpdate());
          }, t.ccRCL = function() {
            this.logger.log(c.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
          }, t.ccBS = function() {
            this.logger.log(c.INFO, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
          }, t.ccAOF = function() {
          }, t.ccAON = function() {
          }, t.ccDER = function() {
            this.logger.log(c.INFO, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
          }, t.ccRU = function(e) {
            this.logger.log(c.INFO, "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e);
          }, t.ccFON = function() {
            this.logger.log(c.INFO, "FON - Flash On"), this.writeScreen.setPen({
              flash: !0
            });
          }, t.ccRDC = function() {
            this.logger.log(c.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
          }, t.ccTR = function() {
            this.logger.log(c.INFO, "TR"), this.setMode("MODE_TEXT");
          }, t.ccRTD = function() {
            this.logger.log(c.INFO, "RTD"), this.setMode("MODE_TEXT");
          }, t.ccEDM = function() {
            this.logger.log(c.INFO, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
          }, t.ccCR = function() {
            this.logger.log(c.INFO, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
          }, t.ccENM = function() {
            this.logger.log(c.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
          }, t.ccEOC = function() {
            var e = this;
            if (this.logger.log(c.INFO, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
              var d = this.displayedMemory;
              this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = d, this.writeScreen = this.nonDisplayedMemory, this.logger.log(c.TEXT, function() {
                return "DISP: " + e.displayedMemory.getDisplayText();
              });
            }
            this.outputDataUpdate(!0);
          }, t.ccTO = function(e) {
            this.logger.log(c.INFO, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e);
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
            this.logger.log(c.INFO, "MIDROW: " + JSON.stringify(d)), this.writeScreen.setPen(d);
          }, t.outputDataUpdate = function(e) {
            e === void 0 && (e = !1);
            var d = this.logger.time;
            d !== null && this.outputFilter && (this.cueStartTime === null && !this.displayedMemory.isEmpty() ? this.cueStartTime = d : this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, d, this.lastOutputScreen), e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : d), this.lastOutputScreen.copy(this.displayedMemory));
          }, t.cueSplitAtTime = function(e) {
            this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e));
          }, s;
        }(), l = /* @__PURE__ */ function() {
          function s(h, e, d) {
            this.channels = void 0, this.currentChannel = 0, this.cmdHistory = void 0, this.logger = void 0;
            var E = new y();
            this.channels = [null, new g(h, e, E), new g(h + 1, d, E)], this.cmdHistory = v(), this.logger = E;
          }
          var t = s.prototype;
          return t.getHandler = function(e) {
            return this.channels[e].getHandler();
          }, t.setHandler = function(e, d) {
            this.channels[e].setHandler(d);
          }, t.addData = function(e, d) {
            var E, p, D, R = !1;
            this.logger.time = e;
            for (var b = 0; b < d.length; b += 2)
              if (p = d[b] & 127, D = d[b + 1] & 127, !(p === 0 && D === 0)) {
                if (this.logger.log(c.DATA, "[" + m([d[b], d[b + 1]]) + "] -> (" + m([p, D]) + ")"), E = this.parseCmd(p, D), E || (E = this.parseMidrow(p, D)), E || (E = this.parsePAC(p, D)), E || (E = this.parseBackgroundAttributes(p, D)), !E && (R = this.parseChars(p, D), R)) {
                  var O = this.currentChannel;
                  if (O && O > 0) {
                    var M = this.channels[O];
                    M.insertChars(R);
                  } else
                    this.logger.log(c.WARNING, "No channel found yet. TEXT-MODE?");
                }
                !E && !R && this.logger.log(c.WARNING, "Couldn't parse cleaned data " + m([p, D]) + " orig: " + m([d[b], d[b + 1]]));
              }
          }, t.parseCmd = function(e, d) {
            var E = this.cmdHistory, p = (e === 20 || e === 28 || e === 21 || e === 29) && d >= 32 && d <= 47, D = (e === 23 || e === 31) && d >= 33 && d <= 35;
            if (!(p || D))
              return !1;
            if (u(e, d, E))
              return r(null, null, E), this.logger.log(c.DEBUG, "Repeated command (" + m([e, d]) + ") is dropped"), !0;
            var R = e === 20 || e === 21 || e === 23 ? 1 : 2, b = this.channels[R];
            return e === 20 || e === 21 || e === 28 || e === 29 ? d === 32 ? b.ccRCL() : d === 33 ? b.ccBS() : d === 34 ? b.ccAOF() : d === 35 ? b.ccAON() : d === 36 ? b.ccDER() : d === 37 ? b.ccRU(2) : d === 38 ? b.ccRU(3) : d === 39 ? b.ccRU(4) : d === 40 ? b.ccFON() : d === 41 ? b.ccRDC() : d === 42 ? b.ccTR() : d === 43 ? b.ccRTD() : d === 44 ? b.ccEDM() : d === 45 ? b.ccCR() : d === 46 ? b.ccENM() : d === 47 && b.ccEOC() : b.ccTO(d - 32), r(e, d, E), this.currentChannel = R, !0;
          }, t.parseMidrow = function(e, d) {
            var E = 0;
            if ((e === 17 || e === 25) && d >= 32 && d <= 47) {
              if (e === 17 ? E = 1 : E = 2, E !== this.currentChannel)
                return this.logger.log(c.ERROR, "Mismatch channel in midrow parsing"), !1;
              var p = this.channels[E];
              return p ? (p.ccMIDROW(d), this.logger.log(c.DEBUG, "MIDROW (" + m([e, d]) + ")"), !0) : !1;
            }
            return !1;
          }, t.parsePAC = function(e, d) {
            var E, p = this.cmdHistory, D = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && d >= 64 && d <= 127, R = (e === 16 || e === 24) && d >= 64 && d <= 95;
            if (!(D || R))
              return !1;
            if (u(e, d, p))
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
              D === 17 ? R = d + 80 : D === 18 ? R = d + 112 : R = d + 144, this.logger.log(c.INFO, "Special char '" + C(R) + "' in channel " + E), p = [R];
            } else
              e >= 32 && e <= 127 && (p = d === 0 ? [e] : [e, d]);
            if (p) {
              var b = m(p);
              this.logger.log(c.DEBUG, "Char codes =  " + b.join(",")), r(e, d, this.cmdHistory);
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
          }, s;
        }();
        function r(s, t, h) {
          h.a = s, h.b = t;
        }
        function u(s, t, h) {
          return h.a === s && h.b === t;
        }
        function v() {
          return {
            a: null,
            b: null
          };
        }
        const f = l;
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
          newCue: function(x, _, T, c) {
            for (var y = [], m, n, o, a, i, g = self.VTTCue || self.TextTrackCue, l = 0; l < c.rows.length; l++)
              if (m = c.rows[l], o = !0, a = 0, i = "", !m.isEmpty()) {
                for (var r = 0; r < m.chars.length; r++)
                  I.test(m.chars[r].uchar) && o ? a++ : (i += m.chars[r].uchar, o = !1);
                m.cueStartTime = _, _ === T && (T += 1e-4), a >= 16 ? a-- : a++;
                var u = (0, F.fixLineBreaks)(i.trim()), v = (0, A.generateCueId)(_, T, u);
                (!x || !x.cues || !x.cues.getCueById(v)) && (n = new g(_, T, u), n.id = v, n.line = l + 1, n.align = "left", n.position = 10 + Math.min(80, Math.floor(a * 8 / 32) * 10), y.push(n));
              }
            return x && y.length && (y.sort(function(f, s) {
              return f.line === "auto" || s.line === "auto" ? 0 : f.line > 8 && s.line > 8 ? s.line - f.line : f.line - s.line;
            }), y.forEach(function(f) {
              return (0, C.addCueToTrack)(x, f);
            })), y;
          }
        };
        const P = k;
      },
      "./src/utils/discontinuities.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          adjustSlidingStart: () => x,
          alignMediaPlaylistByPDT: () => y,
          alignPDT: () => c,
          alignStream: () => _,
          findDiscontinuousReferenceFrag: () => P,
          findFirstFragWithCC: () => I,
          shouldAlignOnDiscontinuities: () => k
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/logger.ts"), C = S("./src/controller/level-helper.ts");
        function I(m, n) {
          for (var o = null, a = 0, i = m.length; a < i; a++) {
            var g = m[a];
            if (g && g.cc === n) {
              o = g;
              break;
            }
          }
          return o;
        }
        function k(m, n, o) {
          return !!(n.details && (o.endCC > o.startCC || m && m.cc < o.startCC));
        }
        function P(m, n, o) {
          var a = m.fragments, i = n.fragments;
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
        function L(m, n) {
          if (m) {
            var o = m.start + n;
            m.start = m.startPTS = o, m.endPTS = o + m.duration;
          }
        }
        function x(m, n) {
          for (var o = n.fragments, a = 0, i = o.length; a < i; a++)
            L(o[a], m);
          n.fragmentHint && L(n.fragmentHint, m), n.alignedSliding = !0;
        }
        function _(m, n, o) {
          !n || (T(m, o, n), !o.alignedSliding && n.details && c(o, n.details), !o.alignedSliding && n.details && !o.skippedSegments && (0, C.adjustSliding)(n.details, o));
        }
        function T(m, n, o) {
          if (k(m, o, n)) {
            var a = P(o.details, n);
            a && (0, F.isFiniteNumber)(a.start) && (A.logger.log("Adjusting PTS using last level due to CC increase within current level " + n.url), x(a.start, n));
          }
        }
        function c(m, n) {
          if (!(!n.fragments.length || !m.hasProgramDateTime || !n.hasProgramDateTime)) {
            var o = n.fragments[0].programDateTime, a = m.fragments[0].programDateTime, i = (a - o) / 1e3 + n.fragments[0].start;
            i && (0, F.isFiniteNumber)(i) && (A.logger.log("Adjusting PTS using programDateTime delta " + (a - o) + "ms, sliding:" + i.toFixed(3) + " " + m.url + " "), x(i, m));
          }
        }
        function y(m, n) {
          if (!(!m.hasProgramDateTime || !n.hasProgramDateTime)) {
            var o = m.fragments, a = n.fragments;
            if (!(!o.length || !a.length)) {
              var i = Math.round(a.length / 2) - 1, g = a[i], l = I(o, g.cc) || o[Math.round(o.length / 2) - 1], r = g.programDateTime, u = l.programDateTime;
              if (!(r === null || u === null)) {
                var v = (u - r) / 1e3 - (l.start - g.start);
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
            var _ = 8 * x, T = L / 1e3, c = _ / T;
            this.fast_.sample(T, c), this.slow_.sample(T, c);
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
        function I(g, l) {
          g.prototype = Object.create(l.prototype), g.prototype.constructor = g, _(g, l);
        }
        function k(g) {
          var l = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
          return k = function(u) {
            if (u === null || !x(u))
              return u;
            if (typeof u != "function")
              throw new TypeError("Super expression must either be null or a function");
            if (typeof l != "undefined") {
              if (l.has(u))
                return l.get(u);
              l.set(u, v);
            }
            function v() {
              return P(u, arguments, T(this).constructor);
            }
            return v.prototype = Object.create(u.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), _(v, u);
          }, k(g);
        }
        function P(g, l, r) {
          return L() ? P = Reflect.construct.bind() : P = function(v, f, s) {
            var t = [null];
            t.push.apply(t, f);
            var h = Function.bind.apply(v, t), e = new h();
            return s && _(e, s.prototype), e;
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
        function _(g, l) {
          return _ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(u, v) {
            return u.__proto__ = v, u;
          }, _(g, l);
        }
        function T(g) {
          return T = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
            return r.__proto__ || Object.getPrototypeOf(r);
          }, T(g);
        }
        function c() {
          return c = Object.assign ? Object.assign.bind() : function(g) {
            for (var l = 1; l < arguments.length; l++) {
              var r = arguments[l];
              for (var u in r)
                Object.prototype.hasOwnProperty.call(r, u) && (g[u] = r[u]);
            }
            return g;
          }, c.apply(this, arguments);
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
            this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = void 0, this.response = void 0, this.controller = void 0, this.context = void 0, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = r.fetchSetup || o, this.controller = new self.AbortController(), this.stats = new A.LoadStats();
          }
          var l = g.prototype;
          return l.destroy = function() {
            this.loader = this.callbacks = null, this.abortInternal();
          }, l.abortInternal = function() {
            var u = this.response;
            (!u || !u.ok) && (this.stats.aborted = !0, this.controller.abort());
          }, l.abort = function() {
            var u;
            this.abortInternal(), (u = this.callbacks) !== null && u !== void 0 && u.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
          }, l.load = function(u, v, f) {
            var s = this, t = this.stats;
            if (t.loading.start)
              throw new Error("Loader can only be used once.");
            t.loading.start = self.performance.now();
            var h = n(u, this.controller.signal), e = f.onProgress, d = u.responseType === "arraybuffer", E = d ? "byteLength" : "length";
            this.context = u, this.config = v, this.callbacks = f, this.request = this.fetchSetup(u, h), self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(function() {
              s.abortInternal(), f.onTimeout(t, u, s.response);
            }, v.timeout), self.fetch(this.request).then(function(p) {
              if (s.response = s.loader = p, !p.ok) {
                var D = p.status, R = p.statusText;
                throw new a(R || "fetch, bad network response", D, p);
              }
              return t.loading.first = Math.max(self.performance.now(), t.loading.start), t.total = parseInt(p.headers.get("Content-Length") || "0"), e && (0, F.isFiniteNumber)(v.highWaterMark) ? s.loadProgressively(p, t, u, v.highWaterMark, e) : d ? p.arrayBuffer() : p.text();
            }).then(function(p) {
              var D = s.response;
              self.clearTimeout(s.requestTimeout), t.loading.end = Math.max(self.performance.now(), t.loading.first);
              var R = p[E];
              R && (t.loaded = t.total = R);
              var b = {
                url: D.url,
                data: p
              };
              e && !(0, F.isFiniteNumber)(v.highWaterMark) && e(t, u, p, D), f.onSuccess(b, t, u, D);
            }).catch(function(p) {
              if (self.clearTimeout(s.requestTimeout), !t.aborted) {
                var D = p && p.code || 0, R = p ? p.message : null;
                f.onError({
                  code: D,
                  text: R
                }, u, p ? p.details : null);
              }
            });
          }, l.getCacheAge = function() {
            var u = null;
            if (this.response) {
              var v = this.response.headers.get("age");
              u = v ? parseFloat(v) : null;
            }
            return u;
          }, l.loadProgressively = function(u, v, f, s, t) {
            s === void 0 && (s = 0);
            var h = new C.default(), e = u.body.getReader(), d = function E() {
              return e.read().then(function(p) {
                if (p.done)
                  return h.dataLength && t(v, f, h.flush(), u), Promise.resolve(new ArrayBuffer(0));
                var D = p.value, R = D.length;
                return v.loaded += R, R < s || h.dataLength ? (h.push(D), h.dataLength >= s && t(v, f, h.flush(), u)) : t(v, f, D, u), E();
              }).catch(function() {
                return Promise.reject();
              });
            };
            return d();
          }, g;
        }();
        function n(g, l) {
          var r = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            signal: l,
            headers: new self.Headers(c({}, g.headers))
          };
          return g.rangeEnd && r.headers.set("Range", "bytes=" + g.rangeStart + "-" + String(g.rangeEnd - 1)), r;
        }
        function o(g, l) {
          return new self.Request(g.url, l);
        }
        var a = /* @__PURE__ */ function(g) {
          I(l, g);
          function l(r, u, v) {
            var f;
            return f = g.call(this, r) || this, f.code = void 0, f.details = void 0, f.code = u, f.details = v, f;
          }
          return l;
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
          return L = Object.assign ? Object.assign.bind() : function(f) {
            for (var s = 1; s < arguments.length; s++) {
              var t = arguments[s];
              for (var h in t)
                Object.prototype.hasOwnProperty.call(t, h) && (f[h] = t[h]);
            }
            return f;
          }, L.apply(this, arguments);
        }
        var x = "stpp.ttml.im1t", _ = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, T = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, c = {
          left: "start",
          center: "center",
          right: "end",
          start: "start",
          end: "end"
        };
        function y(f, s, t, h, e) {
          var d = (0, F.findBox)(new Uint8Array(f), ["mdat"]);
          if (d.length === 0) {
            e(new Error("Could not parse IMSC1 mdat"));
            return;
          }
          var E = d.map(function(D) {
            return (0, I.utf8ArrayToStr)(D);
          }), p = (0, k.toTimescaleFromScale)(s, 1, t);
          try {
            E.forEach(function(D) {
              return h(m(D, p));
            });
          } catch (D) {
            e(D);
          }
        }
        function m(f, s) {
          var t = new DOMParser(), h = t.parseFromString(f, "text/xml"), e = h.getElementsByTagName("tt")[0];
          if (!e)
            throw new Error("Invalid ttml");
          var d = {
            frameRate: 30,
            subFrameRate: 1,
            frameRateMultiplier: 0,
            tickRate: 0
          }, E = Object.keys(d).reduce(function(O, M) {
            return O[M] = e.getAttribute("ttp:" + M) || d[M], O;
          }, {}), p = e.getAttribute("xml:space") !== "preserve", D = o(n(e, "styling", "style")), R = o(n(e, "layout", "region")), b = n(e, "body", "[begin]");
          return [].map.call(b, function(O) {
            var M = a(O, p);
            if (!M || !O.hasAttribute("begin"))
              return null;
            var w = r(O.getAttribute("begin"), E), U = r(O.getAttribute("dur"), E), N = r(O.getAttribute("end"), E);
            if (w === null)
              throw l(O);
            if (N === null) {
              if (U === null)
                throw l(O);
              N = w + U;
            }
            var K = new C.default(w - s, N - s, M);
            K.id = (0, P.generateCueId)(K.startTime, K.endTime, K.text);
            var W = R[O.getAttribute("region")], G = D[O.getAttribute("style")], j = i(W, G, D), H = j.textAlign;
            if (H) {
              var X = c[H];
              X && (K.lineAlign = X), K.align = H;
            }
            return L(K, j), K;
          }).filter(function(O) {
            return O !== null;
          });
        }
        function n(f, s, t) {
          var h = f.getElementsByTagName(s)[0];
          return h ? [].slice.call(h.querySelectorAll(t)) : [];
        }
        function o(f) {
          return f.reduce(function(s, t) {
            var h = t.getAttribute("xml:id");
            return h && (s[h] = t), s;
          }, {});
        }
        function a(f, s) {
          return [].slice.call(f.childNodes).reduce(function(t, h, e) {
            var d;
            return h.nodeName === "br" && e ? t + `
` : (d = h.childNodes) !== null && d !== void 0 && d.length ? a(h, s) : s ? t + h.textContent.trim().replace(/\s+/g, " ") : t + h.textContent;
          }, "");
        }
        function i(f, s, t) {
          var h = "http://www.w3.org/ns/ttml#styling", e = null, d = [
            "displayAlign",
            "textAlign",
            "color",
            "backgroundColor",
            "fontSize",
            "fontFamily"
          ], E = f != null && f.hasAttribute("style") ? f.getAttribute("style") : null;
          return E && t.hasOwnProperty(E) && (e = t[E]), d.reduce(function(p, D) {
            var R = g(s, h, D) || g(f, h, D) || g(e, h, D);
            return R && (p[D] = R), p;
          }, {});
        }
        function g(f, s, t) {
          return f && f.hasAttributeNS(s, t) ? f.getAttributeNS(s, t) : null;
        }
        function l(f) {
          return new Error("Could not parse ttml timestamp " + f);
        }
        function r(f, s) {
          if (!f)
            return null;
          var t = (0, A.parseTimeStamp)(f);
          return t === null && (_.test(f) ? t = u(f, s) : T.test(f) && (t = v(f, s))), t;
        }
        function u(f, s) {
          var t = _.exec(f), h = (t[4] | 0) + (t[5] | 0) / s.subFrameRate;
          return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + h / s.frameRate;
        }
        function v(f, s) {
          var t = T.exec(f), h = Number(t[1]), e = t[2];
          switch (e) {
            case "h":
              return h * 3600;
            case "m":
              return h * 60;
            case "ms":
              return h * 1e3;
            case "f":
              return h / s.frameRate;
            case "t":
              return h / s.tickRate;
          }
          return h;
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
          var L = function(_, T, c) {
            var y = _[T];
            _[T] = _[c], _[c] = y;
          };
          L(P, 0, 3), L(P, 1, 2), L(P, 4, 5), L(P, 6, 7);
        }
        function I(P) {
          var L = P.split(":"), x = null;
          if (L[0] === "data" && L.length === 2) {
            var _ = L[1].split(";"), T = _[_.length - 1].split(",");
            if (T.length === 2) {
              var c = T[0] === "base64", y = T[1];
              c ? (_.splice(-1, 1), x = (0, F.base64Decode)(y)) : x = A(y);
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
          for (var _ = arguments.length, T = new Array(_ > 1 ? _ - 1 : 0), c = 1; c < _; c++)
            T[c - 1] = arguments[c];
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
        (function(c) {
          c.CLEARKEY = "org.w3.clearkey", c.FAIRPLAY = "com.apple.fps", c.PLAYREADY = "com.microsoft.playready", c.WIDEVINE = "com.widevine.alpha";
        })(F || (F = {}));
        var A;
        (function(c) {
          c.CLEARKEY = "org.w3.clearkey", c.FAIRPLAY = "com.apple.streamingkeydelivery", c.PLAYREADY = "com.microsoft.playready", c.WIDEVINE = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
        })(A || (A = {}));
        function C(c) {
          switch (c) {
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
        (function(c) {
          c.WIDEVINE = "edef8ba979d64acea3c827dcd51d21ed";
        })(I || (I = {}));
        function k(c) {
          if (c === I.WIDEVINE)
            return F.WIDEVINE;
        }
        function P(c) {
          switch (c) {
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
        function L(c) {
          var y = c.drmSystems, m = c.widevineLicenseUrl, n = y ? [F.FAIRPLAY, F.WIDEVINE, F.PLAYREADY, F.CLEARKEY].filter(function(o) {
            return !!y[o];
          }) : [];
          return !n[F.WIDEVINE] && m && n.push(F.WIDEVINE), n;
        }
        var x = function() {
          return typeof self != "undefined" && self.navigator && self.navigator.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
        }();
        function _(c, y, m, n) {
          var o;
          switch (c) {
            case F.FAIRPLAY:
              o = ["cenc", "sinf"];
              break;
            case F.WIDEVINE:
            case F.PLAYREADY:
              o = ["cenc"];
              break;
            case F.CLEARKEY:
              o = ["cenc", "keyids"];
              break;
            default:
              throw new Error("Unknown key-system: " + c);
          }
          return T(o, y, m, n);
        }
        function T(c, y, m, n) {
          var o = {
            initDataTypes: c,
            persistentState: n.persistentState || "not-allowed",
            distinctiveIdentifier: n.distinctiveIdentifier || "not-allowed",
            sessionTypes: n.sessionTypes || [n.sessionType || "temporary"],
            audioCapabilities: y.map(function(a) {
              return {
                contentType: 'audio/mp4; codecs="' + a + '"',
                robustness: n.audioRobustness || "",
                encryptionScheme: n.audioEncryptionScheme || null
              };
            }),
            videoCapabilities: m.map(function(a) {
              return {
                contentType: 'video/mp4; codecs="' + a + '"',
                robustness: n.videoRobustness || "",
                encryptionScheme: n.videoEncryptionScheme || null
              };
            })
          };
          return [o];
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
          appendUint8Array: () => s,
          bin2str: () => _,
          computeRawDurationFromSamples: () => u,
          discardEPB: () => E,
          findBox: () => n,
          getDuration: () => r,
          getStartDTS: () => l,
          mp4Box: () => D,
          mp4pssh: () => R,
          offsetStartDTS: () => v,
          parseEmsg: () => p,
          parseInitSegment: () => a,
          parsePssh: () => b,
          parseSEIMessageFromNALu: () => d,
          parseSamples: () => t,
          parseSegmentIndex: () => o,
          parseSinf: () => g,
          patchEncyptionData: () => i,
          readSint32: () => y,
          readUint16: () => T,
          readUint32: () => c,
          segmentValidRange: () => f,
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
        function c(O, M) {
          var w = y(O, M);
          return w < 0 ? 4294967296 + w : w;
        }
        function y(O, M) {
          return O[M] << 24 | O[M + 1] << 16 | O[M + 2] << 8 | O[M + 3];
        }
        function m(O, M, w) {
          O[M] = w >> 24, O[M + 1] = w >> 16 & 255, O[M + 2] = w >> 8 & 255, O[M + 3] = w & 255;
        }
        function n(O, M) {
          var w = [];
          if (!M.length)
            return w;
          for (var U = O.byteLength, N = 0; N < U; ) {
            var K = c(O, N), W = _(O.subarray(N + 4, N + 8)), G = K > 1 ? N + K : U;
            if (W === M[0])
              if (M.length === 1)
                w.push(O.subarray(N + 8, G));
              else {
                var j = n(O.subarray(N + 8, G), M.slice(1));
                j.length && L.apply(w, j);
              }
            N = G;
          }
          return w;
        }
        function o(O) {
          var M = [], w = O[0], U = 8, N = c(O, U);
          U += 4;
          var K = 0, W = 0;
          w === 0 ? U += 8 : U += 16, U += 2;
          var G = O.length + W, j = T(O, U);
          U += 2;
          for (var H = 0; H < j; H++) {
            var X = U, Z = c(O, X);
            X += 4;
            var J = Z & 2147483647, $ = (Z & 2147483648) >>> 31;
            if ($ === 1)
              return console.warn("SIDX has hierarchical references (not supported)"), null;
            var z = c(O, X);
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
          for (var M = [], w = n(O, ["moov", "trak"]), U = 0; U < w.length; U++) {
            var N = w[U], K = n(N, ["tkhd"])[0];
            if (K) {
              var W = K[0], G = W === 0 ? 12 : 20, j = c(K, G), H = n(N, ["mdia", "mdhd"])[0];
              if (H) {
                W = H[0], G = W === 0 ? 12 : 20;
                var X = c(H, G), Z = n(N, ["mdia", "hdlr"])[0];
                if (Z) {
                  var J = _(Z.subarray(8, 12)), $ = {
                    soun: F.ElementaryStreamTypes.AUDIO,
                    vide: F.ElementaryStreamTypes.VIDEO
                  }[J];
                  if ($) {
                    var z = n(N, ["mdia", "minf", "stbl", "stsd"])[0], q = void 0;
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
          var ie = n(O, ["moov", "mvex", "trex"]);
          return ie.forEach(function(ne) {
            var de = c(ne, 4), se = M[de];
            se && (se.default = {
              duration: c(ne, 12),
              flags: c(ne, 20)
            });
          }), M;
        }
        function i(O, M) {
          if (!O || !M)
            return O;
          var w = M.keyId;
          if (w && M.isCommonEncryption) {
            var U = n(O, ["moov", "trak"]);
            U.forEach(function(N) {
              var K = n(N, ["mdia", "minf", "stbl", "stsd"])[0], W = K.subarray(8), G = n(W, ["enca"]), j = G.length > 0;
              j || (G = n(W, ["encv"])), G.forEach(function(H) {
                var X = j ? H.subarray(28) : H.subarray(78), Z = n(X, ["sinf"]);
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
          var M = n(O, ["schm"])[0];
          if (M) {
            var w = _(M.subarray(4, 8));
            if (w === "cbcs" || w === "cenc")
              return n(O, ["schi", "tenc"])[0];
          }
          return I.logger.error("[eme] missing 'schm' box"), null;
        }
        function l(O, M) {
          return n(M, ["moof", "traf"]).reduce(function(w, U) {
            var N = n(U, ["tfdt"])[0], K = N[0], W = n(U, ["tfhd"]).reduce(function(G, j) {
              var H = c(j, 4), X = O[H];
              if (X) {
                var Z = c(N, 4);
                K === 1 && (Z *= Math.pow(2, 32), Z += c(N, 8));
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
          for (var w = 0, U = 0, N = 0, K = n(O, ["moof", "traf"]), W = 0; W < K.length; W++) {
            var G = K[W], j = n(G, ["tfhd"])[0], H = c(j, 4), X = M[H];
            if (!!X) {
              var Z = X.default, J = c(j, 0) | (Z == null ? void 0 : Z.flags), $ = Z == null ? void 0 : Z.duration;
              J & 8 && (J & 2 ? $ = c(j, 12) : $ = c(j, 8));
              for (var z = X.timescale || 9e4, q = n(G, ["trun"]), ie = 0; ie < q.length; ie++) {
                if (w = u(q[ie]), !w && $) {
                  var ne = c(q[ie], 4);
                  w = $ * ne;
                }
                X.type === F.ElementaryStreamTypes.VIDEO ? U += w / z : X.type === F.ElementaryStreamTypes.AUDIO && (N += w / z);
              }
            }
          }
          if (U === 0 && N === 0) {
            for (var de = 0, se = n(O, ["sidx"]), ue = 0; ue < se.length; ue++) {
              var ae = o(se[ue]);
              ae != null && ae.references && (de += ae.references.reduce(function(oe, le) {
                return oe + le.info.duration || 0;
              }, 0));
            }
            return de;
          }
          return U || N;
        }
        function u(O) {
          var M = c(O, 0), w = 8;
          M & 1 && (w += 4), M & 4 && (w += 4);
          for (var U = 0, N = c(O, 4), K = 0; K < N; K++) {
            if (M & 256) {
              var W = c(O, w);
              U += W, w += 4;
            }
            M & 512 && (w += 4), M & 1024 && (w += 4), M & 2048 && (w += 4);
          }
          return U;
        }
        function v(O, M, w) {
          n(M, ["moof", "traf"]).forEach(function(U) {
            n(U, ["tfhd"]).forEach(function(N) {
              var K = c(N, 4), W = O[K];
              if (!!W) {
                var G = W.timescale || 9e4;
                n(U, ["tfdt"]).forEach(function(j) {
                  var H = j[0], X = c(j, 4);
                  if (H === 0)
                    X -= w * G, X = Math.max(X, 0), m(j, 4, X);
                  else {
                    X *= Math.pow(2, 32), X += c(j, 8), X -= w * G, X = Math.max(X, 0);
                    var Z = Math.floor(X / (P + 1)), J = Math.floor(X % (P + 1));
                    m(j, 4, Z), m(j, 8, J);
                  }
                });
              }
            });
          });
        }
        function f(O) {
          var M = {
            valid: null,
            remainder: null
          }, w = n(O, ["moof"]);
          if (w) {
            if (w.length < 2)
              return M.remainder = O, M;
          } else
            return M;
          var U = w[w.length - 1];
          return M.valid = (0, A.sliceUint8)(O, 0, U.byteOffset - 8), M.remainder = (0, A.sliceUint8)(O, U.byteOffset - 8), M;
        }
        function s(O, M) {
          var w = new Uint8Array(O.length + M.length);
          return w.set(O), w.set(M, O.length), w;
        }
        function t(O, M) {
          var w = [], U = M.samples, N = M.timescale, K = M.id, W = !1, G = n(U, ["moof"]);
          return G.map(function(j) {
            var H = j.byteOffset - 8, X = n(j, ["traf"]);
            X.map(function(Z) {
              var J = n(Z, ["tfdt"]).map(function($) {
                var z = $[0], q = c($, 4);
                return z === 1 && (q *= Math.pow(2, 32), q += c($, 8)), q / N;
              })[0];
              return J !== void 0 && (O = J), n(Z, ["tfhd"]).map(function($) {
                var z = c($, 4), q = c($, 0) & 16777215, ie = (q & 1) !== 0, ne = (q & 2) !== 0, de = (q & 8) !== 0, se = 0, ue = (q & 16) !== 0, ae = 0, oe = (q & 32) !== 0, le = 8;
                z === K && (ie && (le += 8), ne && (le += 4), de && (se = c($, le), le += 4), ue && (ae = c($, le), le += 4), oe && (le += 4), M.type === "video" && (W = h(M.codec)), n(Z, ["trun"]).map(function(he) {
                  var me = he[0], ce = c(he, 0) & 16777215, pe = (ce & 1) !== 0, Re = 0, Te = (ce & 4) !== 0, be = (ce & 256) !== 0, De = 0, _e = (ce & 512) !== 0, Se = 0, ye = (ce & 1024) !== 0, Ee = (ce & 2048) !== 0, xe = 0, Ae = c(he, 4), ve = 8;
                  pe && (Re = c(he, ve), ve += 4), Te && (ve += 4);
                  for (var Le = Re + H, Pe = 0; Pe < Ae; Pe++) {
                    if (be ? (De = c(he, ve), ve += 4) : De = se, _e ? (Se = c(he, ve), ve += 4) : Se = ae, ye && (ve += 4), Ee && (me === 0 ? xe = c(he, ve) : xe = y(he, ve), ve += 4), M.type === F.ElementaryStreamTypes.VIDEO)
                      for (var ke = 0; ke < Se; ) {
                        var Ce = c(U, Le);
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
        function h(O) {
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
                  var $ = c(N, K);
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
            U += _(O.subarray(H, H + 1)), H += 1, N = c(O, 12), K = c(O, 16), G = c(O, 20), j = c(O, 24), H = 28;
          } else if (M === 1) {
            H += 4, N = c(O, H), H += 4;
            var X = c(O, H);
            H += 4;
            var Z = c(O, H);
            for (H += 4, W = Math.pow(2, 32) * X + Z, Number.isSafeInteger(W) || (W = Number.MAX_SAFE_INTEGER, console.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), G = c(O, H), H += 4, j = c(O, H), H += 4; _(O.subarray(H, H + 1)) !== "\0"; )
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
          } catch (c) {
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
              var c = new self.TextTrackCue(_.startTime, _.endTime, _.text);
              c.id = _.id, x.addCue(c);
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
        function k(x, _, T, c) {
          var y = x.mode;
          if (y === "disabled" && (x.mode = "hidden"), x.cues && x.cues.length > 0)
            for (var m = L(x.cues, _, T), n = 0; n < m.length; n++)
              (!c || c(m[n])) && x.removeCue(m[n]);
          y === "disabled" && (x.mode = y);
        }
        function P(x, _) {
          if (_ < x[0].startTime)
            return 0;
          var T = x.length - 1;
          if (_ > x[T].endTime)
            return -1;
          for (var c = 0, y = T; c <= y; ) {
            var m = Math.floor((y + c) / 2);
            if (_ < x[m].startTime)
              y = m - 1;
            else if (_ > x[m].startTime && c < T)
              c = m + 1;
            else
              return m;
          }
          return x[c].startTime - _ < _ - x[y].startTime ? c : y;
        }
        function L(x, _, T) {
          var c = [], y = P(x, _);
          if (y > -1)
            for (var m = y, n = x.length; m < n; m++) {
              var o = x[m];
              if (o.startTime >= _ && o.endTime <= T)
                c.push(o);
              else if (o.startTime > T)
                return c;
            }
          return c;
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
            var c = T.toLowerCase();
            return ~_.indexOf(c) ? c : !1;
          }
          function k(_) {
            return I(A, _);
          }
          function P(_) {
            return I(C, _);
          }
          function L(_) {
            for (var T = arguments.length, c = new Array(T > 1 ? T - 1 : 0), y = 1; y < T; y++)
              c[y - 1] = arguments[y];
            for (var m = 1; m < arguments.length; m++) {
              var n = arguments[m];
              for (var o in n)
                _[o] = n[o];
            }
            return _;
          }
          function x(_, T, c) {
            var y = this, m = {
              enumerable: !0
            };
            y.hasBeenReset = !1;
            var n = "", o = !1, a = _, i = T, g = c, l = null, r = "", u = !0, v = "auto", f = "start", s = 50, t = "middle", h = 50, e = "middle";
            Object.defineProperty(y, "id", L({}, m, {
              get: function() {
                return n;
              },
              set: function(E) {
                n = "" + E;
              }
            })), Object.defineProperty(y, "pauseOnExit", L({}, m, {
              get: function() {
                return o;
              },
              set: function(E) {
                o = !!E;
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
                return l;
              },
              set: function(E) {
                l = E, this.hasBeenReset = !0;
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
                return u;
              },
              set: function(E) {
                u = !!E, this.hasBeenReset = !0;
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
                return f;
              },
              set: function(E) {
                var p = P(E);
                if (!p)
                  throw new SyntaxError("An invalid or illegal string was specified.");
                f = p, this.hasBeenReset = !0;
              }
            })), Object.defineProperty(y, "position", L({}, m, {
              get: function() {
                return s;
              },
              set: function(E) {
                if (E < 0 || E > 100)
                  throw new Error("Position must be between 0 and 100.");
                s = E, this.hasBeenReset = !0;
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
                return h;
              },
              set: function(E) {
                if (E < 0 || E > 100)
                  throw new Error("Size must be between 0 and 100.");
                h = E, this.hasBeenReset = !0;
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
          function c() {
          }
          var y = c.prototype;
          return y.decode = function(n, o) {
            if (!n)
              return "";
            if (typeof n != "string")
              throw new Error("Error - expected string data.");
            return decodeURIComponent(encodeURIComponent(n));
          }, c;
        }();
        function C(c) {
          function y(n, o, a, i) {
            return (n | 0) * 3600 + (o | 0) * 60 + (a | 0) + parseFloat(i || 0);
          }
          var m = c.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
          return m ? parseFloat(m[2]) > 59 ? y(m[2], m[3], 0, m[4]) : y(m[1], m[2], m[3], m[4]) : null;
        }
        var I = /* @__PURE__ */ function() {
          function c() {
            this.values = /* @__PURE__ */ Object.create(null);
          }
          var y = c.prototype;
          return y.set = function(n, o) {
            !this.get(n) && o !== "" && (this.values[n] = o);
          }, y.get = function(n, o, a) {
            return a ? this.has(n) ? this.values[n] : o[a] : this.has(n) ? this.values[n] : o;
          }, y.has = function(n) {
            return n in this.values;
          }, y.alt = function(n, o, a) {
            for (var i = 0; i < a.length; ++i)
              if (o === a[i]) {
                this.set(n, o);
                break;
              }
          }, y.integer = function(n, o) {
            /^-?\d+$/.test(o) && this.set(n, parseInt(o, 10));
          }, y.percent = function(n, o) {
            if (/^([\d]{1,3})(\.[\d]*)?%$/.test(o)) {
              var a = parseFloat(o);
              if (a >= 0 && a <= 100)
                return this.set(n, a), !0;
            }
            return !1;
          }, c;
        }();
        function k(c, y, m, n) {
          var o = n ? c.split(n) : [c];
          for (var a in o)
            if (typeof o[a] == "string") {
              var i = o[a].split(m);
              if (i.length === 2) {
                var g = i[0], l = i[1];
                y(g, l);
              }
            }
        }
        var P = new F.default(0, 0, ""), L = P.align === "middle" ? "middle" : "center";
        function x(c, y, m) {
          var n = c;
          function o() {
            var g = C(c);
            if (g === null)
              throw new Error("Malformed timestamp: " + n);
            return c = c.replace(/^[^\sa-zA-Z-]+/, ""), g;
          }
          function a(g, l) {
            var r = new I();
            k(g, function(f, s) {
              var t;
              switch (f) {
                case "region":
                  for (var h = m.length - 1; h >= 0; h--)
                    if (m[h].id === s) {
                      r.set(f, m[h].region);
                      break;
                    }
                  break;
                case "vertical":
                  r.alt(f, s, ["rl", "lr"]);
                  break;
                case "line":
                  t = s.split(","), r.integer(f, t[0]), r.percent(f, t[0]) && r.set("snapToLines", !1), r.alt(f, t[0], ["auto"]), t.length === 2 && r.alt("lineAlign", t[1], ["start", L, "end"]);
                  break;
                case "position":
                  t = s.split(","), r.percent(f, t[0]), t.length === 2 && r.alt("positionAlign", t[1], ["start", L, "end", "line-left", "line-right", "auto"]);
                  break;
                case "size":
                  r.percent(f, s);
                  break;
                case "align":
                  r.alt(f, s, ["start", L, "end", "left", "right"]);
                  break;
              }
            }, /:/, /\s/), l.region = r.get("region", null), l.vertical = r.get("vertical", "");
            var u = r.get("line", "auto");
            u === "auto" && P.line === -1 && (u = -1), l.line = u, l.lineAlign = r.get("lineAlign", "start"), l.snapToLines = r.get("snapToLines", !0), l.size = r.get("size", 100), l.align = r.get("align", L);
            var v = r.get("position", "auto");
            v === "auto" && P.position === 50 && (v = l.align === "start" || l.align === "left" ? 0 : l.align === "end" || l.align === "right" ? 100 : 50), l.position = v;
          }
          function i() {
            c = c.replace(/^\s+/, "");
          }
          if (i(), y.startTime = o(), i(), c.slice(0, 3) !== "-->")
            throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + n);
          c = c.slice(3), i(), y.endTime = o(), i(), a(c, y);
        }
        function _(c) {
          return c.replace(/<br(?: \/)?>/gi, `
`);
        }
        var T = /* @__PURE__ */ function() {
          function c() {
            this.state = "INITIAL", this.buffer = "", this.decoder = new A(), this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
          }
          var y = c.prototype;
          return y.parse = function(n) {
            var o = this;
            n && (o.buffer += o.decoder.decode(n, {
              stream: !0
            }));
            function a() {
              var v = o.buffer, f = 0;
              for (v = _(v); f < v.length && v[f] !== "\r" && v[f] !== `
`; )
                ++f;
              var s = v.slice(0, f);
              return v[f] === "\r" && ++f, v[f] === `
` && ++f, o.buffer = v.slice(f), s;
            }
            function i(v) {
              k(v, function(f, s) {
              }, /:/);
            }
            try {
              var g = "";
              if (o.state === "INITIAL") {
                if (!/\r\n|\n/.test(o.buffer))
                  return this;
                g = a();
                var l = g.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                if (!l || !l[0])
                  throw new Error("Malformed WebVTT signature.");
                o.state = "HEADER";
              }
              for (var r = !1; o.buffer; ) {
                if (!/\r\n|\n/.test(o.buffer))
                  return this;
                switch (r ? r = !1 : g = a(), o.state) {
                  case "HEADER":
                    /:/.test(g) ? i(g) : g || (o.state = "ID");
                    continue;
                  case "NOTE":
                    g || (o.state = "ID");
                    continue;
                  case "ID":
                    if (/^NOTE($|[ \t])/.test(g)) {
                      o.state = "NOTE";
                      break;
                    }
                    if (!g)
                      continue;
                    if (o.cue = new F.default(0, 0, ""), o.state = "CUE", g.indexOf("-->") === -1) {
                      o.cue.id = g;
                      continue;
                    }
                  case "CUE":
                    if (!o.cue) {
                      o.state = "BADCUE";
                      continue;
                    }
                    try {
                      x(g, o.cue, o.regionList);
                    } catch (v) {
                      o.cue = null, o.state = "BADCUE";
                      continue;
                    }
                    o.state = "CUETEXT";
                    continue;
                  case "CUETEXT":
                    {
                      var u = g.indexOf("-->") !== -1;
                      if (!g || u && (r = !0)) {
                        o.oncue && o.cue && o.oncue(o.cue), o.cue = null, o.state = "ID";
                        continue;
                      }
                      if (o.cue === null)
                        continue;
                      o.cue.text && (o.cue.text += `
`), o.cue.text += g;
                    }
                    continue;
                  case "BADCUE":
                    g || (o.state = "ID");
                }
              }
            } catch (v) {
              o.state === "CUETEXT" && o.cue && o.oncue && o.oncue(o.cue), o.cue = null, o.state = o.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
            }
            return this;
          }, y.flush = function() {
            var n = this;
            try {
              if ((n.cue || n.state === "HEADER") && (n.buffer += `

`, n.parse()), n.state === "INITIAL" || n.state === "BADWEBVTT")
                throw new Error("Malformed WebVTT signature.");
            } catch (o) {
              n.onparsingerror && n.onparsingerror(o);
            }
            return n.onflush && n.onflush(), this;
          }, c;
        }();
      },
      "./src/utils/webvtt-parser.ts": (V, B, S) => {
        S.r(B), S.d(B, {
          generateCueId: () => T,
          parseWebVTT: () => y
        });
        var F = S("./src/polyfills/number.ts"), A = S("./src/utils/vttparser.ts"), C = S("./src/demux/id3.ts"), I = S("./src/utils/timescale-conversion.ts"), k = S("./src/remux/mp4-remuxer.ts"), P = /\r\n|\n\r|\n|\r/g, L = function(n, o, a) {
          return a === void 0 && (a = 0), n.slice(a, a + o.length) === o;
        }, x = function(n) {
          var o = parseInt(n.slice(-3)), a = parseInt(n.slice(-6, -4)), i = parseInt(n.slice(-9, -7)), g = n.length > 9 ? parseInt(n.substring(0, n.indexOf(":"))) : 0;
          if (!(0, F.isFiniteNumber)(o) || !(0, F.isFiniteNumber)(a) || !(0, F.isFiniteNumber)(i) || !(0, F.isFiniteNumber)(g))
            throw Error("Malformed X-TIMESTAMP-MAP: Local:" + n);
          return o += 1e3 * a, o += 60 * 1e3 * i, o += 60 * 60 * 1e3 * g, o;
        }, _ = function(n) {
          for (var o = 5381, a = n.length; a; )
            o = o * 33 ^ n.charCodeAt(--a);
          return (o >>> 0).toString();
        };
        function T(m, n, o) {
          return _(m.toString()) + _(n.toString()) + _(o);
        }
        var c = function(n, o, a) {
          var i = n[o], g = n[i.prevCC];
          if (!g || !g.new && i.new) {
            n.ccOffset = n.presentationOffset = i.start, i.new = !1;
            return;
          }
          for (; (l = g) !== null && l !== void 0 && l.new; ) {
            var l;
            n.ccOffset += i.start - g.start, i.new = !1, i = g, g = n[i.prevCC];
          }
          n.presentationOffset = a;
        };
        function y(m, n, o, a, i, g, l, r) {
          var u = new A.VTTParser(), v = (0, C.utf8ArrayToStr)(new Uint8Array(m)).trim().replace(P, `
`).split(`
`), f = [], s = (0, I.toMpegTsClockFromTimescale)(n, o), t = "00:00.000", h = 0, e = 0, d, E = !0;
          u.oncue = function(p) {
            var D = a[i], R = a.ccOffset, b = (h - s) / 9e4;
            D != null && D.new && (e !== void 0 ? R = a.ccOffset = D.start : c(a, i, b)), b && (R = b - a.presentationOffset);
            var O = p.endTime - p.startTime, M = (0, k.normalizePts)((p.startTime + R - e) * 9e4, g * 9e4) / 9e4;
            p.startTime = Math.max(M, 0), p.endTime = Math.max(M + O, 0);
            var w = p.text.trim();
            p.text = decodeURIComponent(encodeURIComponent(w)), p.id || (p.id = T(p.startTime, p.endTime, w)), p.endTime > 0 && f.push(p);
          }, u.onparsingerror = function(p) {
            d = p;
          }, u.onflush = function() {
            if (d) {
              r(d);
              return;
            }
            l(f);
          }, v.forEach(function(p) {
            if (E)
              if (L(p, "X-TIMESTAMP-MAP=")) {
                E = !1, p.slice(16).split(",").forEach(function(D) {
                  L(D, "LOCAL:") ? t = D.slice(6) : L(D, "MPEGTS:") && (h = parseInt(D.slice(7)));
                });
                try {
                  e = x(t) / 1e3;
                } catch (D) {
                  d = D;
                }
                return;
              } else
                p === "" && (E = !1);
            u.parse(p + `
`);
          }), u.flush();
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
          }, L.load = function(_, T, c) {
            if (this.stats.loading.start)
              throw new Error("Loader can only be used once.");
            this.stats.loading.start = self.performance.now(), this.context = _, this.config = T, this.callbacks = c, this.retryDelay = T.retryDelay, this.loadInternal();
          }, L.loadInternal = function() {
            var _ = this.config, T = this.context;
            if (!!_) {
              var c = this.loader = new self.XMLHttpRequest(), y = this.stats;
              y.loading.first = 0, y.loaded = 0;
              var m = this.xhrSetup;
              try {
                if (m)
                  try {
                    m(c, T.url);
                  } catch (a) {
                    c.open("GET", T.url, !0), m(c, T.url);
                  }
                c.readyState || c.open("GET", T.url, !0);
                var n = this.context.headers;
                if (n)
                  for (var o in n)
                    c.setRequestHeader(o, n[o]);
              } catch (a) {
                this.callbacks.onError({
                  code: c.status,
                  text: a.message
                }, T, c);
                return;
              }
              T.rangeEnd && c.setRequestHeader("Range", "bytes=" + T.rangeStart + "-" + (T.rangeEnd - 1)), c.onreadystatechange = this.readystatechange.bind(this), c.onprogress = this.loadprogress.bind(this), c.responseType = T.responseType, self.clearTimeout(this.requestTimeout), this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), _.timeout), c.send();
            }
          }, L.readystatechange = function() {
            var _ = this.context, T = this.loader, c = this.stats;
            if (!(!_ || !T)) {
              var y = T.readyState, m = this.config;
              if (!c.aborted && y >= 2)
                if (self.clearTimeout(this.requestTimeout), c.loading.first === 0 && (c.loading.first = Math.max(self.performance.now(), c.loading.start)), y === 4) {
                  T.onreadystatechange = null, T.onprogress = null;
                  var n = T.status, o = T.responseType === "arraybuffer";
                  if (n >= 200 && n < 300 && (o && T.response || T.responseText !== null)) {
                    c.loading.end = Math.max(self.performance.now(), c.loading.first);
                    var a, i;
                    if (o ? (a = T.response, i = a.byteLength) : (a = T.responseText, i = a.length), c.loaded = c.total = i, !this.callbacks)
                      return;
                    var g = this.callbacks.onProgress;
                    if (g && g(c, _, a, T), !this.callbacks)
                      return;
                    var l = {
                      url: T.responseURL,
                      data: a
                    };
                    this.callbacks.onSuccess(l, c, _, T);
                  } else
                    c.retry >= m.maxRetry || n >= 400 && n < 499 ? (F.logger.error(n + " while loading " + _.url), this.callbacks.onError({
                      code: n,
                      text: T.statusText
                    }, _, T)) : (F.logger.warn(n + " while loading " + _.url + ", retrying in " + this.retryDelay + "..."), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, m.maxRetryDelay), c.retry++);
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
          var c = new A(x, _ || P, T), y = S ? S + L : L;
          return P._events[y] ? P._events[y].fn ? P._events[y] = [P._events[y], c] : P._events[y].push(c) : (P._events[y] = c, P._eventsCount++), P;
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
          for (var T = 0, c = _.length, y = new Array(c); T < c; T++)
            y[T] = _[T].fn;
          return y;
        }, k.prototype.listenerCount = function(L) {
          var x = S ? S + L : L, _ = this._events[x];
          return _ ? _.fn ? 1 : _.length : 0;
        }, k.prototype.emit = function(L, x, _, T, c, y) {
          var m = S ? S + L : L;
          if (!this._events[m])
            return !1;
          var n = this._events[m], o = arguments.length, a, i;
          if (n.fn) {
            switch (n.once && this.removeListener(L, n.fn, void 0, !0), o) {
              case 1:
                return n.fn.call(n.context), !0;
              case 2:
                return n.fn.call(n.context, x), !0;
              case 3:
                return n.fn.call(n.context, x, _), !0;
              case 4:
                return n.fn.call(n.context, x, _, T), !0;
              case 5:
                return n.fn.call(n.context, x, _, T, c), !0;
              case 6:
                return n.fn.call(n.context, x, _, T, c, y), !0;
            }
            for (i = 1, a = new Array(o - 1); i < o; i++)
              a[i - 1] = arguments[i];
            n.fn.apply(n.context, a);
          } else {
            var g = n.length, l;
            for (i = 0; i < g; i++)
              switch (n[i].once && this.removeListener(L, n[i].fn, void 0, !0), o) {
                case 1:
                  n[i].fn.call(n[i].context);
                  break;
                case 2:
                  n[i].fn.call(n[i].context, x);
                  break;
                case 3:
                  n[i].fn.call(n[i].context, x, _);
                  break;
                case 4:
                  n[i].fn.call(n[i].context, x, _, T);
                  break;
                default:
                  if (!a)
                    for (l = 1, a = new Array(o - 1); l < o; l++)
                      a[l - 1] = arguments[l];
                  n[i].fn.apply(n[i].context, a);
              }
          }
          return !0;
        }, k.prototype.on = function(L, x, _) {
          return C(this, L, x, _, !1);
        }, k.prototype.once = function(L, x, _) {
          return C(this, L, x, _, !0);
        }, k.prototype.removeListener = function(L, x, _, T) {
          var c = S ? S + L : L;
          if (!this._events[c])
            return this;
          if (!x)
            return I(this, c), this;
          var y = this._events[c];
          if (y.fn)
            y.fn === x && (!T || y.once) && (!_ || y.context === _) && I(this, c);
          else {
            for (var m = 0, n = [], o = y.length; m < o; m++)
              (y[m].fn !== x || T && !y[m].once || _ && y[m].context !== _) && n.push(y[m]);
            n.length ? this._events[c] = n.length === 1 ? n[0] : n : I(this, c);
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
                var c = F.exec(T.path);
                T.netLoc = c[1], T.path = c[2];
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
                  var m = T.path, n = m.substring(0, m.lastIndexOf("/") + 1) + _.path;
                  y.path = I.normalizePath(n);
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
    re(this, "containerArea"), re(this, "subtitles"), re(this, "video"), re(this, "accentColor", "hsl(353, 86%, 54%)"), re(this, "theatreMode", !0), re(this, "options"), re(this, "_isPlayed", !1), re(this, "_currentVolume", 1), re(this, "_playbackSpeed", 1), re(this, "_container"), re(this, "_idleTimer", null), re(this, "_idleState", !1), re(this, "_idleDuration", 3500), re(this, "_playbackSpeeds", [0.25, 0.5, 0.7, 1, 1.25, 1.5, 1.75, 2]), re(this, "_settingsMenuPanels"), re(this, "_tooltips"), re(this, "_settingsButtons"), re(this, "_durationSlider"), re(this, "_volumeSlider"), re(this, "_durationIndicator"), re(this, "_durationIndicatorMobile"), re(this, "_videoEl"), re(this, "_bottomPanel"), re(this, "_toast"), re(this, "_posterEl"), re(this, "_settingsMenu"), re(this, "_captionsWrapper"), re(this, "_captionsArray"), re(this, "_selectedCaption"), re(this, "_buttons"), re(this, "_playIcon"), re(this, "_videoCaptions"), re(this, "_videoCaption"), re(this, "_ambientCanvas"), re(this, "_ctx"), re(this, "_loader"), re(this, "_actionsWrapperMobile"), re(this, "_settingsPanelMobile"), re(this, "_settingsMenuPanelsMobile"), re(this, "_overlay");
    var Q;
    this.options = Object.assign(this, Y), this.subtitles = Y.subtitles, this.video = Y.video, this.theatreMode = Y.theatreMode, this._videoCaption = this.subtitles ? this.subtitles[0].short : null, this.containerArea = Y.containerArea, rt(this.containerArea, this.video, this.subtitles, this._playbackSpeed, this._playbackSpeeds, this._videoCaption), this._container = this.containerArea.querySelector(".videoary"), this._settingsMenuPanels = this._container.querySelectorAll(".settings-menu-panel"), this._tooltips = this._container.querySelectorAll('div[role="tooltip"]'), this._settingsButtons = this._container.querySelectorAll(".settings-menu > li button"), this._durationSlider = this._container.querySelector("input:is(#duration)"), this._volumeSlider = this._container.querySelector("input:is(#volume)"), this._durationIndicator = this._container.querySelector("#duration-indicator"), this._durationIndicatorMobile = this._container.querySelector("#duration-indicator-mobile"), this._videoEl = this._container.querySelector("video"), this._bottomPanel = this._container.querySelector(".videoary__bottom-panel"), this._toast = this._container.querySelector(".toast"), this._posterEl = this._container.querySelector(".poster"), this._settingsMenu = this._container.querySelector(".settings-menu"), this._captionsWrapper = this._container.querySelector(".captions-wrapper"), this._captionsArray = Array.from(this._videoEl.textTracks), this._selectedCaption = this._captionsArray.find((ee) => ee.language == this._videoCaption), this._buttons = {
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
      var Y, Q, ee, te, ge, V, B, S, F, A, C, I, k, P, L, x, _, T;
      document.documentElement.style.setProperty("--primaryColor", this.accentColor), this.subtitles || (this._settingsButtons[1].classList.add("hidden"), this._settingsMenuPanels[1].classList.add("hidden"), (Y = this._buttons.captions) == null || Y.classList.add("hidden"), (Q = this._buttons.mobile.captions) == null || Q.classList.add("hidden")), this.theatreMode || (te = (ee = this._buttons.theater) == null ? void 0 : ee.parentElement) == null || te.classList.add("hidden"), yield this.loadVideo((ge = this.video) == null ? void 0 : ge.source), this.showLoader(!1), this._videoCaptions.forEach((n) => n.track.mode = "hidden"), this.showBottomPanel(), this._videoEl.addEventListener("loadeddata", this.loadedVideo.bind(this)), this._videoEl.addEventListener("ended", () => {
        var n;
        this._playIcon.classList.replace("fa-pause", "fa-play");
        const o = (n = this._buttons.mobile.play) == null ? void 0 : n.querySelector("i");
        o == null || o.classList.replace("fa-pause", "fa-play");
      }), this._videoEl.addEventListener("timeupdate", this.runDuration.bind(this)), this._videoEl.addEventListener("play", this.runAmbient.bind(this)), this._container.addEventListener("contextmenu", (n) => n.preventDefault()), this._container.addEventListener("fullscreenchange", this.fullscreenChange.bind(this)), this._videoEl.addEventListener("touchstart", () => {
        this._videoEl.paused || this._actionsWrapperMobile.classList.toggle("hide"), this._actionsWrapperMobile.classList.contains("hide") ? (this._bottomPanel.classList.remove("showed-up"), this._captionsWrapper.classList.add("get-down"), this._overlay.classList.add("invisible")) : (this._bottomPanel.classList.add("showed-up"), this._captionsWrapper.classList.remove("get-down"), this._overlay.classList.remove("invisible"));
      }), document.addEventListener("touchstart", (n) => {
        n.target.closest(".videoary") || this._videoEl.paused || (this._actionsWrapperMobile.classList.add("hide"), this._bottomPanel.classList.remove("showed-up"), this._captionsWrapper.classList.add("get-down"), this._overlay.classList.add("invisible"));
      }), this._settingsPanelMobile.addEventListener("touchstart", (n) => {
        n.target.closest(".settings-panel-mobile .wrapper") || this._settingsPanelMobile.classList.remove("showed");
      }), window.matchMedia("screen and (min-width: 768px)").matches && (this._videoEl.addEventListener("click", this.playVideo.bind(this)), this._container.addEventListener("mousemove", this.idlingWatch.bind(this)), this._container.addEventListener("mouseout", this.hideBottomPanel.bind(this)), this._overlay.addEventListener("mouseover", this.showBottomPanel.bind(this)), this._videoEl.addEventListener("mouseover", this.showBottomPanel.bind(this)), this._bottomPanel.addEventListener("mouseover", this.showBottomPanel.bind(this)), document.addEventListener("click", this.hideSettingsPanelOutside.bind(this))), document.addEventListener("keydown", this.keyEvents.bind(this)), this._durationSlider.addEventListener("input", this.seekingVideo.bind(this)), this._durationSlider.addEventListener("change", this.seekingVideoPaused.bind(this)), this._volumeSlider.addEventListener("click", (n) => n.stopPropagation()), this._volumeSlider.addEventListener("input", this.seekingVolume.bind(this)), window.addEventListener("click", () => this._volumeSlider.classList.remove("active")), window.addEventListener("resize", () => {
        this.setCanvasDimension(), this._videoEl.paused && this.paintStaticVideo();
      }), this._videoEl.addEventListener("seeked", this.paintStaticVideo.bind(this)), this.subtitles && this.runCaptions(this._selectedCaption), this._videoEl.addEventListener("leavepictureinpicture", this.leavePIP.bind(this)), this._settingsButtons.forEach((n, o) => {
        n.addEventListener("click", () => {
          this._settingsMenu.classList.add("hide");
          const a = this._settingsMenuPanels[o];
          a.classList.add("show"), a.querySelector("button:is(.action)").addEventListener("click", this.hideSettingsMenuPanel.bind(this));
        });
      });
      const c = this.settingsPanelButtons(2);
      this.settingsAction(c, this._playbackSpeed, "data-speed", (n) => {
        this._videoEl.playbackRate = n;
        const o = this._settingsButtons[2].querySelector("span:nth-child(2)");
        o.innerHTML = `${`${n == 1 ? "Normal" : n} <i class="far fa-fw fa-chevron-right"></i>`}`;
      });
      const y = this.settingsPanelButtons(1);
      this.settingsAction(y, this._videoCaption, "data-lang", (n) => {
        var o;
        this._videoCaption = n, this._selectedCaption = this._captionsArray.find((i) => i.language == this._videoCaption), this.runCaptions(this._selectedCaption);
        const a = this._settingsButtons[1].querySelector("span:nth-child(2)");
        a.innerHTML = `${`${(o = this._selectedCaption) == null ? void 0 : o.label} <i class="far fa-fw fa-chevron-right"></i>`}`;
      }), (V = this._buttons.play) == null || V.addEventListener("click", this.playVideo.bind(this)), (B = this._buttons.fullscreen) == null || B.addEventListener("click", this.openFullScreen.bind(this)), (S = this._buttons.picInPic) == null || S.addEventListener("click", this.openPIP.bind(this)), (F = this._buttons.captions) == null || F.addEventListener("click", this.showCaptions.bind(this)), (A = this._buttons.volume) == null || A.addEventListener("click", this.muteVolume.bind(this)), (C = this._buttons.theater) == null || C.addEventListener("click", this.theaterMode.bind(this)), (I = this._buttons.settings) == null || I.addEventListener("click", this.openSettings.bind(this)), (k = this._buttons.mobile.play) == null || k.addEventListener("click", this.playVideo.bind(this)), (P = this._buttons.mobile.fullscreen) == null || P.addEventListener("click", this.openFullScreen.bind(this)), (L = this._buttons.mobile.volume) == null || L.addEventListener("click", () => {
        var n;
        this.muteVolume();
        const o = (n = this._buttons.mobile.volume) == null ? void 0 : n.querySelector("i");
        this._videoEl.muted ? o == null || o.classList.replace("fa-volume", "fa-volume-mute") : o == null || o.classList.replace("fa-volume-mute", "fa-volume");
      }), (x = this._buttons.mobile.captions) == null || x.addEventListener("click", this.showCaptions.bind(this)), (_ = this._buttons.mobile.settings) == null || _.addEventListener("click", () => this._settingsPanelMobile.classList.add("showed"));
      const m = (T = this._settingsPanelMobile) == null ? void 0 : T.querySelector(".close-btn");
      m == null || m.addEventListener("click", () => this._settingsPanelMobile.classList.remove("showed"));
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
