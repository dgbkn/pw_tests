// https://lelinhtinh.github.io/de4js/

(window.webpackJsonp = window.webpackJsonp || []).push([
    [3], {
        "+ntK": function (e, t, i) {
            var r, n = i("Tnqc"),
                s = i("WLGk"),
                o = i("ypnn"),
                a = i("zMFY"),
                c = i("44nb");
            "undefined" != typeof ArrayBuffer && (r = i("dOpE"));
            var h = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
                l = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
                p = h || l;
            t.protocol = 3;
            var u = t.packets = {
                open: 0,
                close: 1,
                ping: 2,
                pong: 3,
                message: 4,
                upgrade: 5,
                noop: 6
            },
                f = n(u),
                d = {
                    type: "error",
                    data: "parser error"
                },
                y = i("14A5");

            function m(e, t, i) {
                for (var r = new Array(e.length), n = a(e.length, i), s = function (e, i, n) {
                    t(i, (function (t, i) {
                        r[e] = i, n(t, r)
                    }))
                }, o = 0; o < e.length; o++) s(o, e[o], n)
            }
            t.encodePacket = function (e, i, r, n) {
                "function" == typeof i && (n = i, i = !1), "function" == typeof r && (n = r, r = null);
                var s = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                if ("undefined" != typeof ArrayBuffer && s instanceof ArrayBuffer) return function (e, i, r) {
                    if (!i) return t.encodeBase64Packet(e, r);
                    var n = e.data,
                        s = new Uint8Array(n),
                        o = new Uint8Array(1 + n.byteLength);
                    o[0] = u[e.type];
                    for (var a = 0; a < s.length; a++) o[a + 1] = s[a];
                    return r(o.buffer)
                }(e, i, n);
                if (void 0 !== y && s instanceof y) return function (e, i, r) {
                    if (!i) return t.encodeBase64Packet(e, r);
                    if (p) return function (e, i, r) {
                        if (!i) return t.encodeBase64Packet(e, r);
                        var n = new FileReader;
                        return n.onload = function () {
                            t.encodePacket({
                                type: e.type,
                                data: n.result
                            }, i, !0, r)
                        }, n.readAsArrayBuffer(e.data)
                    }(e, i, r);
                    var n = new Uint8Array(1);
                    return n[0] = u[e.type], r(new y([n.buffer, e.data]))
                }(e, i, n);
                if (s && s.base64) return function (e, i) {
                    return i("b" + t.packets[e.type] + e.data.data)
                }(e, n);
                var o = u[e.type];
                return void 0 !== e.data && (o += r ? c.encode(String(e.data), {
                    strict: !1
                }) : String(e.data)), n("" + o)
            }, t.encodeBase64Packet = function (e, i) {
                var r, n = "b" + t.packets[e.type];
                if (void 0 !== y && e.data instanceof y) {
                    var s = new FileReader;
                    return s.onload = function () {
                        var e = s.result.split(",")[1];
                        i(n + e)
                    }, s.readAsDataURL(e.data)
                }
                try {
                    r = String.fromCharCode.apply(null, new Uint8Array(e.data))
                } catch (h) {
                    for (var o = new Uint8Array(e.data), a = new Array(o.length), c = 0; c < o.length; c++) a[c] = o[c];
                    r = String.fromCharCode.apply(null, a)
                }
                return n += btoa(r), i(n)
            }, t.decodePacket = function (e, i, r) {
                if (void 0 === e) return d;
                if ("string" == typeof e) {
                    if ("b" === e.charAt(0)) return t.decodeBase64Packet(e.substr(1), i);
                    if (r && !1 === (e = function (e) {
                        try {
                            e = c.decode(e, {
                                strict: !1
                            })
                        } catch (t) {
                            return !1
                        }
                        return e
                    }(e))) return d;
                    var n = e.charAt(0);
                    return Number(n) == n && f[n] ? e.length > 1 ? {
                        type: f[n],
                        data: e.substring(1)
                    } : {
                        type: f[n]
                    } : d
                }
                n = new Uint8Array(e)[0];
                var s = o(e, 1);
                return y && "blob" === i && (s = new y([s])), {
                    type: f[n],
                    data: s
                }
            }, t.decodeBase64Packet = function (e, t) {
                var i = f[e.charAt(0)];
                if (!r) return {
                    type: i,
                    data: {
                        base64: !0,
                        data: e.substr(1)
                    }
                };
                var n = r.decode(e.substr(1));
                return "blob" === t && y && (n = new y([n])), {
                    type: i,
                    data: n
                }
            }, t.encodePayload = function (e, i, r) {
                "function" == typeof i && (r = i, i = null);
                var n = s(e);
                return i && n ? y && !p ? t.encodePayloadAsBlob(e, r) : t.encodePayloadAsArrayBuffer(e, r) : e.length ? void m(e, (function (e, r) {
                    t.encodePacket(e, !!n && i, !1, (function (e) {
                        r(null, function (e) {
                            return e.length + ":" + e
                        }(e))
                    }))
                }), (function (e, t) {
                    return r(t.join(""))
                })) : r("0:")
            }, t.decodePayload = function (e, i, r) {
                if ("string" != typeof e) return t.decodePayloadAsBinary(e, i, r);
                var n;
                if ("function" == typeof i && (r = i, i = null), "" === e) return r(d, 0, 1);
                for (var s, o, a = "", c = 0, h = e.length; c < h; c++) {
                    var l = e.charAt(c);
                    if (":" === l) {
                        if ("" === a || a != (s = Number(a))) return r(d, 0, 1);
                        if (a != (o = e.substr(c + 1, s)).length) return r(d, 0, 1);
                        if (o.length) {
                            if (n = t.decodePacket(o, i, !1), d.type === n.type && d.data === n.data) return r(d, 0, 1);
                            if (!1 === r(n, c + s, h)) return
                        }
                        c += s, a = ""
                    } else a += l
                }
                return "" !== a ? r(d, 0, 1) : void 0
            }, t.encodePayloadAsArrayBuffer = function (e, i) {
                if (!e.length) return i(new ArrayBuffer(0));
                m(e, (function (e, i) {
                    t.encodePacket(e, !0, !0, (function (e) {
                        return i(null, e)
                    }))
                }), (function (e, t) {
                    var r = t.reduce((function (e, t) {
                        var i;
                        return e + (i = "string" == typeof t ? t.length : t.byteLength).toString().length + i + 2
                    }), 0),
                        n = new Uint8Array(r),
                        s = 0;
                    return t.forEach((function (e) {
                        var t = "string" == typeof e,
                            i = e;
                        if (t) {
                            for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                            i = r.buffer
                        }
                        n[s++] = t ? 0 : 1;
                        var a = i.byteLength.toString();
                        for (o = 0; o < a.length; o++) n[s++] = parseInt(a[o]);
                        for (n[s++] = 255, r = new Uint8Array(i), o = 0; o < r.length; o++) n[s++] = r[o]
                    })), i(n.buffer)
                }))
            }, t.encodePayloadAsBlob = function (e, i) {
                m(e, (function (e, i) {
                    t.encodePacket(e, !0, !0, (function (e) {
                        var t = new Uint8Array(1);
                        if (t[0] = 1, "string" == typeof e) {
                            for (var r = new Uint8Array(e.length), n = 0; n < e.length; n++) r[n] = e.charCodeAt(n);
                            e = r.buffer, t[0] = 0
                        }
                        var s = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                            o = new Uint8Array(s.length + 1);
                        for (n = 0; n < s.length; n++) o[n] = parseInt(s[n]);
                        if (o[s.length] = 255, y) {
                            var a = new y([t.buffer, o.buffer, e]);
                            i(null, a)
                        }
                    }))
                }), (function (e, t) {
                    return i(new y(t))
                }))
            }, t.decodePayloadAsBinary = function (e, i, r) {
                "function" == typeof i && (r = i, i = null);
                for (var n = e, s = []; n.byteLength > 0;) {
                    for (var a = new Uint8Array(n), c = 0 === a[0], h = "", l = 1; 255 !== a[l]; l++) {
                        if (h.length > 310) return r(d, 0, 1);
                        h += a[l]
                    }
                    n = o(n, 2 + h.length), h = parseInt(h);
                    var p = o(n, 0, h);
                    if (c) try {
                        p = String.fromCharCode.apply(null, new Uint8Array(p))
                    } catch (y) {
                        var u = new Uint8Array(p);
                        for (p = "", l = 0; l < u.length; l++) p += String.fromCharCode(u[l])
                    }
                    s.push(p), n = o(n, h)
                }
                var f = s.length;
                s.forEach((function (e, n) {
                    r(t.decodePacket(e, i, !0), n, f)
                }))
            }
        },
        "0NTe": function (e, t, i) {
            "use strict";
            i.d(t, "a", (function () {
                return m
            })), i.d(t, "b", (function () {
                return v
            }));
            var r = i("mrSG"),
                n = i("8Y7J"),
                s = i("YW9T"),
                o = (i("ZZ/e"), i("HnBA"), i("7ig7"), i("PqYM")),
                a = i("AytR"),
                c = (i("lFSb"), i("8J1J"), i("Brdl"), i("EhJz")),
                h = i("Da6A"),
                l = i("4+6U"),
                p = i("qVkf"),
                u = (i("Rznk"), i("ZG37"), i("59gf"), i("J6zf"), i("un/a")),
                f = i("JIr8"),
                d = i("8B+k"),
                y = i("odh7");
            class m {
                constructor(e, t, i, r, o, a, c, h, l, p, u, f, d, y) {
                    this.platform = e, this.globalService = t, this.loaderService = i, this.socket = r, this.contentService = o, this.batchService = a, this.navContrl = c, this.storageService = h, this.videoLicenseService = l, this.leadSquaredService = p, this.showErrorService = u, this.doubtService = f, this.events = d, this.httpClient = y, this.playType = "hls", this.isFullScreen = !1, this.getStats = new n.EventEmitter, this.platForm = this.platform, this.cfPlatforms = this.globalService.currentPlatform, this.width = this.platform.width(), this.height = this.platform.height(), this.chatProcessing = !0, this.batchClass = new s.a(this.batchService), this.timeSpent = 0, this.videoDetails = new s.d({}), this.timeLine = this.doubtService.seekTime$.subscribe(e => {
                        this.setTimeLine(e)
                    }), this.events.subscribe("player", e => {
                        "pause" === e ? this.player.pause() : "play" === e && this.player.play()
                    }), this.doubtService.seekTime$.subscribe(e => {
                        this.player && this.player.currentTime(e)
                    })
                }
                ngOnDestroy() {
                    this.events.unsubscribe("player")
                }
                ngAfterViewInit() {
                    this.getVideoPlayType(), this.videoDetailsSubs = this.batchClass.getVideoDetails().subscribe(e => {
                        e && (this.videoDetails = e, "vimeo" === this.videoDetails.urlType && (this.getVimeoId(this.videoDetails.url), this.videoDetails.isLive && (this.chatProcessing = !1, setTimeout(() => {
                            this.loaderService.handleIframe(this.iframe.nativeElement, "Please wait..."), this.iframe.nativeElement.addEventListener("fullscreenchange", this.changeHandler, !1), this.iframe.nativeElement.addEventListener("webkitfullscreenchange", this.changeHandler, !1), this.iframe.nativeElement.addEventListener("mozfullscreenchange", this.changeHandler, !1)
                        }, 500))), this.playerInit())
                    })
                }
                setTimeLine(e) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        this.player && this.player.currentTime(Math.round(e))
                    }))
                }
                playerInit() {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        this.player && this.player.reset(), "desktop" === this.platForm && this.globalService.setUserMenuDisabled(!0);
                        const e = Object(o.a)(1e3, 1e3);
                        this.timer = e.subscribe(e => {
                            this.timeSpent++
                        });
                        const t = this.videoDetails.videoDetails.name || this.videoDetails.videoDetails.title,
                            i = this.videoDetails.videoDetails.image || this.videoDetails.videoDetails.thumbnail_url,
                            r = this.videoDetails.videoDetails.embedCode || this.videoDetails.videoDetails.hls_url || this.videoDetails.videoDetails.videoUrl || this.videoDetails.url,
                            n = this.videoDetails.isLive || !1;
                        if ("youtube" === this.videoDetails.urlType && r) this.playerConfig = {
                            poster: i,
                            liveui: n,
                            sources: [{
                                src: r,
                                type: "video/youtube"
                            }],
                            autoplay: !0,
                            startTime: 0,
                            fullScreenEnabled: !1,
                            fluid: !0,
                            fill: !1,
                            responsive: !1,
                            seekButtons: !0,
                            seekSeconds: 10
                        };
                        else if ("vimeo" === this.videoDetails.urlType && r && !this.videoDetails.isLive && this.videoDetails.videoDetails.hls_url) {
                            const e = this.videoDetails.videoDetails.vimeoId;
                            let n;
                            "mp4" === this.playType && (n = yield this.contentService.getVimeoDownloadUrl({
                                vimeoId: e,
                                type: "downloads"
                            }).toPromise());
                            let s = [];
                            s = n && n.data && n.data.length ? n.data.map(e => ({
                                src: e.link,
                                type: "video/mp4",
                                label: e.height
                            })) : [{
                                src: r,
                                type: "application/x-mpegURL"
                            }], this.loadNewVideoPlayer(t, i, s)
                        } else if ("vimeo" !== this.videoDetails.urlType || !r || this.videoDetails.isLive || this.videoDetails.videoDetails.hls_url) "penpencilvdo" === this.videoDetails.urlType && r ? yield this.penpencilLogic(n, r, i, !1) : "awsVideo" === this.videoDetails.urlType ? yield this.awsLogic(n, r, i, !1) : this.videoDetails.isLive || (yield this.globalService.showMessage("toast", {
                            message: "Video url does not exists"
                        }), yield this.navContrl.pop());
                        else try {
                            const e = yield this.batchClass.getVimeoDownloadUrl({
                                vimeoId: this.vimeoId,
                                type: "downloads"
                            });
                            if (!e || !e.data) return;
                            const t = e.data.map(e => ({
                                src: e.link,
                                type: "video/mp4",
                                label: e.height
                            }));
                            this.playerConfig = {
                                poster: i,
                                liveui: n,
                                sources: t,
                                autoplay: !0,
                                startTime: 0,
                                fullScreenEnabled: !1,
                                fluid: !0,
                                fill: !1,
                                responsive: !1,
                                seekButtons: !0,
                                seekSeconds: 10
                            }
                        } catch (s) {
                            yield this.showErrorService.showError(s)
                        }
                    }))
                }
                penpencilLogic(e, t, i, n) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        const r = videojs.browser,
                            s = r && (r.IS_SAFARI || r.IS_ANY_SAFARI || r.IS_IOS || r.IS_IPAD || r.IS_IPHONE || r.IS_IPOD || r.IS_EDGE),
                            o = this.videoDetails.videoDetails.types || ["DASH"];
                        if (this.platform.is("ios") && o.length && !o.includes("HLS")) return this.globalService.showMessage("toast", {
                            message: "Video not supported!!!"
                        }), void (yield this.navContrl.pop());
                        let c = "";
                        c = yield this.getAWSKey(t);
                        const h = {
                            poster: i,
                            liveui: e,
                            sources: [],
                            autoplay: !0,
                            startTime: 0,
                            fullScreenEnabled: n,
                            fluid: !0,
                            fill: !1,
                            responsive: !1,
                            seekButtons: !0,
                            seekSeconds: 0
                        };
                        let l;
                        if (l = r.IS_IPAD || r.IS_IPHONE ? (t = t.replace("d1d34p8vz63oiq", "d26g5bnklkwsh4")).slice(0, -3) + "m3u8" : t.slice(0, -3) + "m3u8" + c, s) {
                            const e = [];
                            e.push({
                                src: l,
                                type: "application/x-mpegURL",
                                withCredentials: !1,
                                cacheEncryptionKeys: !0
                            }), h.encryptionUri = `${a.a.BASE_URL_V1}videos/get-hls-key?videoId=${this.videoDetails.videoDetails.id}`, h.headers = [{
                                authorization: "Bearer " + this.globalService.accessToken
                            }], h.query = c.replace("?", ""), h.sources = e, this.playerConfig = h
                        } else h.sources = [{
                            src: t,
                            type: "application/dash+xml",
                            keySystems: {
                                "org.w3.clearkey": {
                                    videoContentType: 'video/mp4;codecs="avc1.42c01e"',
                                    audioContentType: 'audio/mp4;codecs="mp4a.40.2"',
                                    getLicense: (e, t, i) => {
                                        this.getLicenseFromServer(e, t, i)
                                    }
                                }
                            }
                        }], this.playerConfig = h
                    }))
                }
                awsLogic(e, t, i, n) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        this.epochStartTime = new Date(this.videoDetails.startTime).getTime() / 1e3, this.epochEndTime = new Date(this.videoDetails.endTime).getTime() / 1e3;
                        const r = yield this.getAWSKey(t), s = this.setCharAt(r, 0, "&"), o = {
                            poster: i,
                            liveui: e,
                            sources: [],
                            autoplay: !0,
                            startTime: 0,
                            fullScreenEnabled: n,
                            fluid: !0,
                            fill: !1,
                            responsive: !1,
                            seekButtons: !0,
                            seekSeconds: 0,
                            query: r.replace("?", "")
                        };
                        !1 === this.videoDetails.isLive && 0 === this.epochEndTime && (this.globalService.showMessage("toast", {
                            message: "No End Time found. Taking You Back..."
                        }), yield this.navContrl.pop()), o.sources = [{
                            src: this.videoDetails.isLive ? t + `?start=${this.epochStartTime}${s}` : t + `?start=${this.epochStartTime}${s}&end=${this.epochEndTime}`,
                            type: "application/x-mpegURL",
                            withCredentials: !1,
                            cacheEncryptionKeys: !0
                        }], this.playerConfig = o
                    }))
                }
                validateVideo() {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        const e = this.videoDetails.videoDetails.embedCode || this.videoDetails.videoDetails.hls_url || this.videoDetails.videoDetails.videoUrl || this.videoDetails.url;
                        this.epochStartTime = new Date(this.videoDetails.startTime).getTime() / 1e3, this.epochEndTime = new Date(this.videoDetails.endTime).getTime() / 1e3;
                        const t = yield this.getAWSKey(e), i = this.setCharAt(t, 0, "&"), r = this.videoDetails.isLive ? e + `?start=${this.epochStartTime}${i}` : e + `?start=${this.epochStartTime}${i}&end=${this.epochEndTime}`;
                        try {
                            yield this.httpClient.get(r).pipe(Object(u.a)(2), Object(f.a)(d.a)).toPromise()
                        } catch (n) {
                            console.log(n)
                        } finally {
                            yield this.playerInit()
                        }
                    }))
                }
                getAWSKey(e) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        const t = JSON.parse(this.storageService.getAwsCookie()) || [];
                        if (t && t.length > 0) {
                            const i = t.filter(t => t.videoUrl === e)[0];
                            if (i && Object.keys(i).length > 0) {
                                if (Object(c.a)(new Date, new Date(Object(h.a)(Object(l.a)(i.createdAt), 6)))) return this.getAwsCookieViaNetwork({
                                    videoUrl: e,
                                    cookie: ""
                                }, t); {
                                    const r = new Date,
                                        n = new Date(Object(h.a)(Object(l.a)(i.createdAt), 6));
                                    return Object(p.a)(new Date(Object(l.a)(this.videoDetails.endTime)), new Date(Object(l.a)(this.videoDetails.startTime))) > Object(p.a)(n, r) ? this.getAwsCookieViaNetwork({
                                        videoUrl: e,
                                        cookie: ""
                                    }, t) : i.cookie
                                }
                            }
                            return this.getAwsCookieViaNetwork({
                                videoUrl: e,
                                cookie: ""
                            }, t)
                        } {
                            const i = {
                                videoUrl: e,
                                cookie: ""
                            };
                            return yield this.getAwsCookieViaNetwork(i, t)
                        }
                    }))
                }
                setCharAt(e, t, i) {
                    return t > e.length - 1 ? e : e.substring(0, t) + i + e.substring(t + 1)
                }
                onFullScreenChange(e) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        e && !0 === e.fullScreen ? (this.isFullScreen = !0, yield this.connectSocket()) : (this.isFullScreen = !1, yield this.connectSocket())
                    }))
                }
                connectSocket() {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        this.videoDetails && this.videoDetails.isLive && !this.isFullScreen ? this.socket.connect() : this.socket.disconnect()
                    }))
                }
                getAwsCookieViaNetwork(e, t) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        try {
                            const i = yield this.videoLicenseService.getAwsKey(e.videoUrl).toPromise();
                            if (i && i.data) return e.cookie = i.data, e.createdAt = new Date, e.cookie
                        } catch (i) {
                            console.log(i)
                        } finally {
                            t.push(e), this.storageService.setAwsCookie(JSON.stringify(t))
                        }
                    }))
                }
                getLicenseFromServer(e, t, i) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        const e = JSON.parse((new TextDecoder).decode(t)),
                            r = {
                                key: this.videoLicenseService.encrypt(this.globalService.accessToken, this.videoLicenseService.base64ToHex(e.kids[0]))
                            };
                        try {
                            const t = yield this.videoLicenseService.getKeyFromServer(r).toPromise(), n = {
                                kty: "oct",
                                kid: e.kids[0],
                                k: this.videoLicenseService.hexToBase64(this.videoLicenseService.decrypt(this.globalService.accessToken, t.data.otp))
                            };
                            i(null, (new TextEncoder).encode(JSON.stringify({
                                keys: [n]
                            })))
                        } catch (n) {
                            yield this.navContrl.pop()
                        }
                    }))
                }
                loadNewVideoPlayer(e, t, i) {
                    this.playerConfig = {
                        poster: t,
                        liveui: !1,
                        sources: i,
                        autoplay: !0,
                        startTime: 0,
                        fullScreenEnabled: !1,
                        fluid: !0,
                        fill: !1,
                        responsive: !1,
                        seekButtons: !0,
                        seekSeconds: 10
                    }
                }
                getVimeoId(e) {
                    const t = e.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                    this.vimeoId = t && t.length && t.length >= 4 ? t[3] : ""
                }
                getVideoPlayType() {
                    this.cfPlatforms.indexOf("cordova") > -1 && (this.playType = "mp4"), "desktop" === this.platForm && this.globalService.setUserMenuDisabled(!0)
                }
                changeHandler(e) {
                    "landscape" === window.localStorage.getItem("vimeoIframe") ? (localStorage.setItem("vimeoIframe", "portrait"), window.screen.orientation.lock("portrait")) : (localStorage.setItem("vimeoIframe", "landscape"), window.screen.orientation.lock("landscape"))
                }
                playerLoaded(e) {
                    this.player = e
                }
                leadActivity() {
                    return Object(r.a)(this, void 0, void 0, (function* () { }))
                }
                handleVideoPlay(e) {
                    this.startTimeStamp = (new Date).getTime() || Object(y.a)(new Date), this.startTime = e.playTime || 0, this.initialPlayerInfo = new v(this.playerRef.playerInfo)
                }
                handleVideoPause(e) {
                    return Object(r.a)(this, void 0, void 0, (function* () {
                        this.initialPlayerInfo = new v(this.playerRef.playerInfo);
                        const e = Object.assign({}, this.initialPlayerInfo, {
                            startTimeStamp: this.startTimeStamp,
                            startTime: this.startTime
                        });
                        this.getStats.emit({
                            data: e
                        })
                    }))
                }
            }
            class v {
                constructor(e) {
                    this.play = e.play || !1, this.pause = e.pause || !1, this.ended = e.ended || !1, this.duration = Math.round(e.duration) || 0, this.poster = e.poster || "", this.volume = e.volumne || 0, this.playTime = Math.round(e.playTime) || 0, this.remainingTime = Math.round(e.remainingTime) || 0, this.muted = e.muted || !1, this.fullScreen = e.fullScreen || !1
                }
            }
        },
        "0z79": function (e, t, i) {
            var r = i("AdPF"),
                n = i("CUme"),
                s = i("cpc2"),
                o = i("Yvos"),
                a = i("HjK1")("engine.io-client:polling-xhr"),
                c = i("2UHX");

            function h() { }

            function l(e) {
                if (n.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, "undefined" != typeof location) {
                    var t = "https:" === location.protocol,
                        i = location.port;
                    i || (i = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || i !== e.port, this.xs = e.secure !== t
                }
            }

            function p(e) {
                this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.withCredentials = e.withCredentials, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
            }

            function u() {
                for (var e in p.requests) p.requests.hasOwnProperty(e) && p.requests[e].abort()
            }
            e.exports = l, e.exports.Request = p, o(l, n), l.prototype.supportsBinary = !0, l.prototype.request = function (e) {
                return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.withCredentials = this.withCredentials, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new p(e)
            }, l.prototype.doWrite = function (e, t) {
                var i = this.request({
                    method: "POST",
                    data: e,
                    isBinary: "string" != typeof e && void 0 !== e
                }),
                    r = this;
                i.on("success", t), i.on("error", (function (e) {
                    r.onError("xhr post error", e)
                })), this.sendXhr = i
            }, l.prototype.doPoll = function () {
                a("xhr poll");
                var e = this.request(),
                    t = this;
                e.on("data", (function (e) {
                    t.onData(e)
                })), e.on("error", (function (e) {
                    t.onError("xhr poll error", e)
                })), this.pollXhr = e
            }, s(p.prototype), p.prototype.create = function () {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new r(e),
                    i = this;
                try {
                    a("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                    try {
                        if (this.extraHeaders)
                            for (var n in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(n) && t.setRequestHeader(n, this.extraHeaders[n])
                    } catch (s) { }
                    if ("POST" === this.method) try {
                        t.setRequestHeader("Content-type", this.isBinary ? "application/octet-stream" : "text/plain;charset=UTF-8")
                    } catch (s) { }
                    try {
                        t.setRequestHeader("Accept", "*g,".* ? "))[0]?t.skips.push(new RegExp(" ^ "+e.substr(1)+"
                                        $ ")):t.names.push(new RegExp(" ^ "+e+"
                                        $ ")));for(i=0;i<t.instances.length;i++){var s=t.instances[i];s.enabled=t.enabled(s.namespace)}},t.enabled=function(e){if(" * "===e[e.length-1])return!0;var i,r;for(i=0,r=t.skips.length;i<r;i++)if(t.skips[i].test(e))return!1;for(i=0,r=t.names.length;i<r;i++)if(t.names[i].test(e))return!0;return!1},t.humanize=i("
                                        5 LH7 "),t.instances=[],t.names=[],t.skips=[],t.formatters={}},QN7Q:function(e,t){var i=[].slice;e.exports=function(e,t){if("
                                        string "==typeof t&&(t=e[t]),"
                                        function "!=typeof t)throw new Error("
                                        bind() requires a
                                        function ");var r=i.call(arguments,2);return function(){return t.apply(e,r.concat(i.call(arguments)))}}},Tnqc:function(e,t){e.exports=Object.keys||function(e){var t=[],i=Object.prototype.hasOwnProperty;for(var r in e)i.call(e,r)&&t.push(r);return t}},TypT:function(e,t){t.encode=function(e){var t="
                                        ";for(var i in e)e.hasOwnProperty(i)&&(t.length&&(t+=" & "),t+=encodeURIComponent(i)+" = "+encodeURIComponent(e[i]));return t},t.decode=function(e){for(var t={},i=e.split(" & "),r=0,n=i.length;r<n;r++){var s=i[r].split(" = ");t[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return t}},Uwu7:function(e,t,i){var r=i("
                                        x7D4 ")("
                                        socket.io - parser "),n=i("
                                        cpc2 "),s=i("
                                        Njrz "),o=i("
                                        49 sm "),a=i("
                                        qGlh ");function c(){}t.protocol=4,t.types=["
                                        CONNECT ","
                                        DISCONNECT ","
                                        EVENT ","
                                        ACK ","
                                        ERROR ","
                                        BINARY_EVENT ","
                                        BINARY_ACK "],t.CONNECT=0,t.DISCONNECT=1,t.EVENT=2,t.ACK=3,t.ERROR=4,t.BINARY_EVENT=5,t.BINARY_ACK=6,t.Encoder=c,t.Decoder=p;var h=t.ERROR+'"
                                        encode error "';function l(e){var i="
                                        "+e.type;if(t.BINARY_EVENT!==e.type&&t.BINARY_ACK!==e.type||(i+=e.attachments+" - "),e.nsp&&" / "!==e.nsp&&(i+=e.nsp+", "),null!=e.id&&(i+=e.id),null!=e.data){var n=function(e){try{return JSON.stringify(e)}catch(t){return!1}}(e.data);if(!1===n)return h;i+=n}return r("
                                        encoded % j as % s ",e,i),i}function p(){this.reconstructor=null}function u(e){this.reconPack=e,this.buffers=[]}function f(e){return{type:t.ERROR,data:"
                                        parser error : "+e}}c.prototype.encode=function(e,i){r("
                                        encoding packet % j ",e),t.BINARY_EVENT===e.type||t.BINARY_ACK===e.type?function(e,t){s.removeBlobs(e,(function(e){var i=s.deconstructPacket(e),r=l(i.packet),n=i.buffers;n.unshift(r),t(n)}))}(e,i):i([l(e)])},n(p.prototype),p.prototype.add=function(e){var i;if("
                                        string "==typeof e)i=function(e){var i=0,n={type:Number(e.charAt(0))};if(null==t.types[n.type])return f("
                                        unknown packet type "+n.type);if(t.BINARY_EVENT===n.type||t.BINARY_ACK===n.type){for(var s=i+1;" - "!==e.charAt(++i)&&i!=e.length;);var a=e.substring(s,i);if(a!=Number(a)||" - "!==e.charAt(i))throw new Error("
                                        Illegal attachments ");n.attachments=Number(a)}if(" / "===e.charAt(i+1)){for(s=i+1;++i&&", "!==(h=e.charAt(i))&&i!==e.length;);n.nsp=e.substring(s,i)}else n.nsp=" / ";var c=e.charAt(i+1);if("
                                        "!==c&&Number(c)==c){for(s=i+1;++i;){var h;if(null==(h=e.charAt(i))||Number(h)!=h){--i;break}if(i===e.length)break}n.id=Number(e.substring(s,i+1))}if(e.charAt(++i)){var l=function(e){try{return JSON.parse(e)}catch(t){return!1}}(e.substr(i));if(!1===l||n.type!==t.ERROR&&!o(l))return f("
                                        invalid payload ");n.data=l}return r("
                                        decoded % s as % j ",e,n),n}(e),t.BINARY_EVENT===i.type||t.BINARY_ACK===i.type?(this.reconstructor=new u(i),0===this.reconstructor.reconPack.attachments&&this.emit("
                                        decoded ",i)):this.emit("
                                        decoded ",i);else{if(!a(e)&&!e.base64)throw new Error("
                                        Unknown type: "+e);if(!this.reconstructor)throw new Error("
                                        got binary data when not reconstructing a packet ");(i=this.reconstructor.takeBinaryData(e))&&(this.reconstructor=null,this.emit("
                                        decoded ",i))}},p.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},u.prototype.takeBinaryData=function(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){var t=s.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null},u.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},Uxeu:function(e,t){var i=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["
                                        source ","
                                        protocol ","
                                        authority ","
                                        userInfo ","
                                        user ","
                                        password ","
                                        host ","
                                        port ","
                                        relative ","
                                        path ","
                                        directory ","
                                        file ","
                                        query ","
                                        anchor "];e.exports=function(e){var t,n,s=e,o=e.indexOf("["),a=e.indexOf("]
                                        ");-1!=o&&-1!=a&&(e=e.substring(0,o)+e.substring(o,a).replace(/:/g,";
                        ")+e.substring(a,e.length));for(var c,h=i.exec(e||"
                        "),l={},p=14;p--;)l[r[p]]=h[p]||"
                        ";return-1!=o&&-1!=a&&(l.source=s,l.host=l.host.substring(1,l.host.length-1).replace(/;/g,": "),l.authority=l.authority.replace("[","
                                            ").replace("
                                        ]
                                        ","
                                        ").replace(/;/g,": "),l.ipv6uri=!0),l.pathNames=(n=(t=l.path).replace(/\/{2,9}/g," / ").split(" / ")," / "!=t.substr(0,1)&&0!==t.length||n.splice(0,1)," / "==t.substr(t.length-1,1)&&n.splice(n.length-1,1),n),l.queryKey=(c={},l.query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(e,t,i){t&&(c[t]=i)})),c),l}},WLGk:function(e,t,i){var r=i("
                                        49 sm "),n=Object.prototype.toString,s="
                                        function "==typeof Blob||"
                                        undefined "!=typeof Blob&&"[object BlobConstructor]
    "===n.call(Blob),o="
                                        function "==typeof File||"
                                        undefined "!=typeof File&&"[object FileConstructor]
    "===n.call(File);e.exports=function e(t){if(!t||"
                                        object "!=typeof t)return!1;if(r(t)){for(var i=0,n=t.length;i<n;i++)if(e(t[i]))return!0;return!1}if("
                                        function "==typeof Buffer&&Buffer.isBuffer&&Buffer.isBuffer(t)||"
                                        function "==typeof ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||o&&t instanceof File)return!0;if(t.toJSON&&"
                                        function "==typeof t.toJSON&&1===arguments.length)return e(t.toJSON(),!0);for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a)&&e(t[a]))return!0;return!1}},WiHW:function(e,t){var i=1e3,r=6e4,n=60*r,s=24*n;function o(e,t,i){if(!(e<t))return e<1.5*t?Math.floor(e/t)+"
                                        "+i:Math.ceil(e/t)+"
                                        "+i+"
                                        s "}e.exports=function(e,t){t=t||{};var a,c=typeof e;if("
                                        string "===c&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var o=parseFloat(t[1]);switch((t[2]||"
                                        ms ").toLowerCase()){case"
                                        years ":case"
                                        year ":case"
                                        yrs ":case"
                                        yr ":case"
                                        y ":return 315576e5*o;case"
                                        days ":case"
                                        day ":case"
                                        d ":return o*s;case"
                                        hours ":case"
                                        hour ":case"
                                        hrs ":case"
                                        hr ":case"
                                        h ":return o*n;case"
                                        minutes ":case"
                                        minute ":case"
                                        mins ":case"
                                        min ":case"
                                        m ":return o*r;case"
                                        seconds ":case"
                                        second ":case"
                                        secs ":case"
                                        sec ":case"
                                        s ":return o*i;case"
                                        milliseconds ":case"
                                        millisecond ":case"
                                        msecs ":case"
                                        msec ":case"
                                        ms ":return o;default:return}}}}(e);if("
                                        number "===c&&!1===isNaN(e))return t.long?o(a=e,s,"
                                        day ")||o(a,n,"
                                        hour ")||o(a,r,"
                                        minute ")||o(a,i,"
                                        second ")||a+"
                                        ms ":function(e){return e>=s?Math.round(e/s)+"
                                        d ":e>=n?Math.round(e/n)+"
                                        h ":e>=r?Math.round(e/r)+"
                                        m ":e>=i?Math.round(e/i)+"
                                        s ":e+"
                                        ms "}(e);throw new Error("
                                        val is not a non - empty string or a valid number.val = "+JSON.stringify(e))}},YAho:function(e,t,i){"
                                        use strict ";i.r(t);var r=i("
                                        HDdC "),n=i("
                                        w1tV ");r.a.prototype.share=function(){return Object(n.a)()(this)}},Yvos:function(e,t){e.exports=function(e,t){var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}},ZG37:function(e,t,i){"
                                        use strict ";i.d(t,"
                                        a ",(function(){return a})),i("
                                        uMrK ");var r=i("
                                        IheW "),n=i("
                                        un / a "),s=i("
                                        JIr8 "),o=i("
                                        8 B + k ");class a{constructor(e,t){this.appUrlService=e,this.httpClient=t,this.b64="
                                        ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + /="}getAwsKey(e){const t=(new r.g).set("Content-Type","application/json
                                        ").set("
                                        client - type ","
                                        WEB ");return this.httpClient.post(this.appUrlService.GET_AWS_KEY(),{url:e},{headers:t}).pipe(Object(n.a)(1),Object(s.a)(o.a))}getKeyFromServer(e){return this.httpClient.get(this.appUrlService.GET_LICENCE,{params:e}).pipe(Object(n.a)(1),Object(s.a)(o.a))}getPenPencilKey(e){return this.httpClient.get(e,{headers:{"
                                        content - type ":"
                                        application / x - mpegURL ",cacheEncryptionKeys:"
                                        true ",withCredentials:"
                                        false "}}).pipe(Object(n.a)(1),Object(s.a)(o.a))}hexToBase64(e){return btoa(String.fromCharCode.apply(null,e.replace(/\r|\n/g,"
                                        ").replace(/([\da-fA-F]{2}) ?/g,"
                                        0x $1 ").replace(/ +$/,"
                                        ").split("
                                        "))).replace(/\+/g," - ").replace(/\//g,"
                                        _ ").replace(/=*$/,"
                                        ")}base64ToHex(e){e=e.replace(/\-/g," + ").replace(/\_/g," / ");for(var t=0,i=atob(e.replace(/[ \r\n]+$/,"
                                        ")),r=[];t<i.length;++t){let e=i.charCodeAt(t).toString(16);1===e.length&&(e="
                                        0 "+e),r[r.length]=e}return r.join("
                                        ")}encrypt(e,t){return t=this.xor_encrypt(e,t),this.b64_encode(t)}decrypt(e,t){return t=this.b64_decode(t),this.xor_decrypt(e,t)}b64_encode(e){let t,i,r,n,s,o,a,c,h,l=0,p="
                                        ";if(!e)return e;do{t=e[l++],i=e[l++],r=e[l++],c=t<<16|i<<8|r,n=c>>18&63,s=c>>12&63,o=c>>6&63,a=63&c,p+=this.b64.charAt(n)+this.b64.charAt(s)+this.b64.charAt(o)+this.b64.charAt(a)}while(l<e.length);return h=e.length%3,(h?p.slice(0,h-3):p)+" === ".slice(h||3)}b64_decode(e){let t,i,r,n,s,o,a,c,h=0,l=[];if(!e)return e;e+="
                                        ";do{n=this.b64.indexOf(e.charAt(h++)),s=this.b64.indexOf(e.charAt(h++)),o=this.b64.indexOf(e.charAt(h++)),a=this.b64.indexOf(e.charAt(h++)),c=n<<18|s<<12|o<<6|a,t=c>>16&255,i=c>>8&255,r=255&c,l.push(t),64!==o&&(l.push(i),64!==a&&l.push(r))}while(h<e.length);return l}keyCharAt(e,t){return e.charCodeAt(Math.floor(t%e.length))}xor_encrypt(e,t){return Object.assign([],t).map((t,i)=>t.charCodeAt(0)^this.keyCharAt(e,i))}xor_decrypt(e,t){return Object.assign([],t).map((t,i)=>String.fromCharCode(t^this.keyCharAt(e,i))).join("
                                        ")}}},aOhv:function(e,t,i){"
                                        use strict ";i.d(t,"
                                        a ",(function(){return h})),i.d(t,"
                                        b ",(function(){return u})),i.d(t,"
                                        c ",(function(){return c}));var r=i("
                                        8 Y7J "),n=i("
                                        2 Vo4 "),s=i("
                                        xgIS "),o=i("
                                        Kj3r "),a=i("
                                        JX91 ");let c=(()=>{class e{constructor(){this.currentState={hasInternetAccess:!1,hasNetworkConnection:window.navigator.onLine},this.stateChangeEventEmitter=new r.EventEmitter,this.resetPlayerSub=new n.a(null),this.checkNetworkState()}ngOnDestroy(){try{this.offlineSubscription.unsubscribe(),this.onlineSubscription.unsubscribe()}catch(e){}}checkNetworkState(){this.onlineSubscription=Object(s.a)(window,"
                                        online ").subscribe(()=>{this.currentState.hasNetworkConnection=!0,this.currentState.hasInternetAccess=!0,this.emitEvent()}),this.offlineSubscription=Object(s.a)(window,"
                                        offline ").subscribe(()=>{this.currentState.hasNetworkConnection=!1,this.currentState.hasInternetAccess=!1,this.emitEvent()})}emitEvent(){this.stateChangeEventEmitter.emit(this.currentState)}monitor(e=!0){return e?this.stateChangeEventEmitter.pipe(Object(o.a)(300),Object(a.a)(this.currentState)):this.stateChangeEventEmitter.pipe(Object(o.a)(300))}setResetPlayer(e){let t=e.resetAfter;const i=e.lastPlaybackRate;this.clearTimer(),this.resetPlayerTimer=setInterval(()=>{console.log(t),t-=i,t<=0&&(this.clearTimer(),this.resetPlayerSub.next({success:!0}))},1e3)}clearTimer(){this.resetPlayerTimer&&(clearInterval(this.resetPlayerTimer),this.resetPlayerTimer=null)}resetPlayer(){return this.resetPlayerSub}}return e.ngInjectableDef=Object(r["
                                        \u0275\u0275defineInjectable "])({factory:function(){return new e},token:e,providedIn:"
                                        root "}),e})();class h{constructor(e){this.networkDetectionService=e,this.inIt=new r.EventEmitter,this.onPlay=new r.EventEmitter,this.onPause=new r.EventEmitter,this.onEnded=new r.EventEmitter,this.onError=new r.EventEmitter,this.onFullscreenchange=new r.EventEmitter,this.MAX_RETRY=50,this.RETRY=0}ngOnInit(){this.playerConfigData=new p(this.playerConfig),this.callBacks(),this.networkChange()}ngAfterContentInit(){}ngOnChanges(e){this.play(this.playerConfig)}play(e){this.playerConfigData=new p(e),this.playerInit()}playerInit(){this.playerConfigData.sources&&this.playerConfigData.sources.length&&this.playerConfigData.sources[0].src&&(this.setupPlayerControls(),this.setupPlayer(),this.setupSrc(),this.initializePlugins())}setupPlayerControls(){this.playerControls=this.playerConfigData.liveui?{playToggle:{},currentTimeDisplay:{},progressControl:{},liveui:{},fullscreenToggle:{}}:{playToggle:{},currentTimeDisplay:{},progressControl:{},durationDisplay:{},fullscreenToggle:{}}}setupPlayer(){this.player=videojs("
                                        rs_penpencil_player ",{html5:{hls:{overrideNative:!0,enableLowInitialPlaylist:!1},nativeAudioTracks:!1,nativeTextTracks:!1},plugins:{eme:{}},poster:this.playerConfigData.poster,fill:this.playerConfigData.fill,fluid:this.playerConfigData.fluid,responsive:this.playerConfigData.responsive,playbackRates:[.5,1,1.25,1.5,1.75,2],controlBar:{children:this.playerControls},inactivityTimeout:5e3,preload:"
                                        auto ",controls:!0,liveui:!!this.playerConfigData.liveui,autoplay:this.playerConfigData.autoplay,errorDisplay:!0,loadingSpinner:!0,bigPlayButton:!1,youtube:{ytControls:0,enablePrivacyEnhancedMode:!0}})}setupSrc(){this.player.src(this.playerConfig.sources),this.inIt.emit(this.player)}initializePlugins(){this.player.settingMenu({menu:["
                                        speed ","
                                        quality "],defaultQuality:this.playerConfig.defaultQuality}),this.playerConfigData.seekButtons&&this.player.seekButtons({forward:{direction:"
                                        forward ",seconds:this.playerConfigData.seekSeconds},backward:{direction:"
                                        backward ",seconds:this.playerConfigData.seekSeconds}}),this.playerConfigData.watermark&&(this.playerConfigData.watermark.text||this.playerConfigData.watermark.imageUrl)&&this.player.watermark(this.playerConfigData.watermark)}retryInitPlayer(){if(this.RETRY===this.MAX_RETRY)return this.player.errorDisplay=!0,void console.log("
                                        Maximum Reached retry ");console.log("
                                        RETRY "+this.RETRY),this.player.error(null),setTimeout(()=>{this.play(this.playerConfig),this.RETRY++},500)}callBacks(){this.playerConfigData.fullScreenEnabled&&this.player.requestFullscreen(),this.player.on("
                                        error ",e=>{this.onError.emit(e),this.retryInitPlayer(),console.log("
                                        error: ",e)}),this.player.on("
                                        changePlaybackRate ",(e,t)=>{this.playerConfigData.lastPlaybackRate=t.item,this.networkDetectionService.resetPlayerTimer&&this.setResetPlayer(t.item)}),this.player.on("
                                        play ",()=>{this.player.networkState(),this.player.readyState();const e=this.player.seeking(),t=Math.round(this.player.currentTime());this.playerConfigData.startTime>0&&t!==this.playerConfigData.startTime&&this.playerConfigData.startTime>t&&!e&&(this.playerConfigData.startTime=Math.round(this.playerConfigData.startTime),this.setCurrentTime(this.playerConfigData.startTime)),this.setPlaybackRate(this.playerConfigData.lastPlaybackRate),this.onPlay.emit(this.getPlayerInfo()),e&&this.networkDetectionService.resetPlayerTimer&&this.setResetPlayer()}),this.player.on("
                                        pause ",()=>{this.onPause.emit(this.getPlayerInfo())}),this.player.on("
                                        ready ",()=>{this.player.play(),console.log("
                                        ready ",this.player.ready())}),this.player.on("
                                        ended ",()=>{this.onEnded.emit(this.getPlayerInfo())}),this.player.on("
                                        fullscreenchange ",()=>{this.onFullscreenchange.emit(this.getPlayerInfo())}),this.player.on("
                                        loadstart ",e=>{const t=this.player.tech().hls;t&&(t.xhr.beforeRequest=e=>{if(this.playerConfigData.query){let t=e.uri;if(" ? "!==this.playerConfigData.query[0]&&(this.playerConfigData.query=" ? "+this.playerConfigData.query),t.split(" ? ").length>1&&(t=t.split(" ? ")[0]+this.playerConfigData.query+" & "+t.split(" ? ")[1]),t.includes("
                                        v1 / videos / get - hls - key ? videoKey = ")){const e=this.playerConfigData.sources[0].src.split(" ? ")[0].split(" / ");t=e.slice(0,3).join(" / ")+" / "+e.slice(3).join(" / ").replace("
                                        master.m3u8 ","
                                        hls / enc.key ")}t.includes("
                                        Policy ")||t.includes("
                                        Policy ")||t.includes("
                                        Policy ")||(t=e.uri+this.playerConfigData.query),e.uri=t}if(this.playerConfigData.encryptionUri&&e.uri.includes("
                                        key : //")&&this.playerConfigData.encryptionUri){const t=e.uri.replace("key://","");if(e.uri=this.playerConfigData.encryptionUri+"&key="+t,this.playerConfigData.headers&&this.playerConfigData.headers.length){const t=e.headers||{};for(let e=0;e<this.playerConfigData.headers.length;e++)Object.assign(t,this.playerConfigData.headers[e]);e.headers=t}}})})}ngOnDestroy(){this.player.dispose()}setCurrentTime(e){this.player.currentTime(e)}setPlaybackRate(e){this.player.playbackRate(e)}getPlayerInfo(){return this.playerInfo=new l,this.playerInfo.play=!this.player.paused(),this.playerInfo.pause=this.player.paused(),this.playerInfo.ended=this.player.ended(),this.playerInfo.poster=this.player.poster(),this.playerInfo.duration=this.player.duration(),this.playerInfo.volume=this.player.volume(),this.playerInfo.playTime=this.player.currentTime(),this.playerInfo.remainingTime=this.player.remainingTime(),this.playerInfo.muted=this.player.muted(),this.playerInfo.fullScreen=this.player.isFullscreen(),this.playerInfo}networkChange(){this.networkDetectionSubs&&this.networkDetectionSubs.unsubscribe(),this.playerResetSubs&&this.playerResetSubs.unsubscribe(),this.networkDetectionSubs=this.networkDetectionService.monitor(!1).subscribe(e=>{e.hasNetworkConnection&&e.hasInternetAccess&&this.setResetPlayer()}),this.playerResetSubs=this.networkDetectionService.resetPlayer().subscribe(e=>{e&&this.resetPlayer()})}setResetPlayer(e){const t=e||this.player.playbackRate();let i=1e3*(Math.round(this.player.bufferedEnd())-Math.round(this.player.currentTime()))||0;i||(i=1e3),this.networkDetectionService.setResetPlayer({resetAfter:i,lastPlaybackRate:1e3*t})}resetPlayer(){const e=this.player.playbackRate(),t=Object.assign({},this.playerConfig);t.startTime=Math.round(this.player.currentTime()),t.lastPlaybackRate=e,this.playerConfigData=t,this.player.src(t.sources),t.autoplay||setTimeout(()=>{this.player.play()},500)}}class l{constructor(e){const t=e||{};this.play=t.play||!1,this.pause=t.pause||!1,this.ended=t.ended||!1,this.duration=Math.round(t.duration)||0,this.poster=t.poster||"",this.volume=t.volume||0,this.playTime=Math.round(t.playTime)||0,this.remainingTime=Math.round(t.remainingTime)||0,this.muted=t.muted||!1,this.fullScreen=t.fullScreen||!1}}class p{constructor(e,t){const i=e||{};this.poster=i.poster||"",this.liveui=i.liveui||!1,this.sources=i.sources||[],this.type=i.type||"application/x-mpegURL",this.autoplay=i.autoplay||!1,this.encryptionUri=i.encryptionUri||"",this.query=i.query||"",this.headers=i.headers||"",this.startTime=Math.round(i.startTime)||0,this.fullScreenEnabled=i.fullScreenEnabled||!1,this.fluid=i.fluid||!1,this.fill=i.fill||!1,this.responsive=i.responsive||!1,this.defaultQuality=i.defaultQuality||"Auto",this.forwardBackward=i.forwardBackward||!1,this.watermark=i.watermark||{},this.seekButtons=i.seekButtons||!1,this.seekSeconds=i.seekSeconds||10,this.lastPlaybackRate=i.lastPlaybackRate||1}}class u{}},akSB:function(e,t,i){var r=i("AdPF"),n=i("0z79"),s=i("Cl5A"),o=i("CIKq");t.polling=function(e){var t=!1,i=!1,o=!1!==e.jsonp;if("undefined"!=typeof location){var a="https:"===location.protocol,c=location.port;c||(c=a?443:80),t=e.hostname!==location.hostname||c!==e.port,i=e.secure!==a}if(e.xdomain=t,e.xscheme=i,"open"in new r(e)&&!e.forceJSONP)return new n(e);if(!o)throw new Error("JSONP disabled");return new s(e)},t.websocket=o},cpc2:function(e,t,i){function r(e){if(e)return function(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}(e)}e.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},r.prototype.once=function(e,t){function i(){this.off(e,i),t.apply(this,arguments)}return i.fn=t,this.on(e,i),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i,r=this._callbacks["$"+e];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var n=0;n<r.length;n++)if((i=r[n])===t||i.fn===t){r.splice(n,1);break}return 0===r.length&&delete this._callbacks["$"+e],this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),i=this._callbacks["$"+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(i){r=0;for(var n=(i=i.slice(0)).length;r<n;++r)i[r].apply(this,t)}return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},dOpE:function(e,t){!function(e){"use strict";t.encode=function(t){var i,r=new Uint8Array(t),n=r.length,s="";for(i=0;i<n;i+=3)s+=e[r[i]>>2],s+=e[(3&r[i])<<4|r[i+1]>>4],s+=e[(15&r[i+1])<<2|r[i+2]>>6],s+=e[63&r[i+2]];return n%3==2?s=s.substring(0,s.length-1)+"=":n%3==1&&(s=s.substring(0,s.length-2)+"=="),s},t.decode=function(t){var i,r,n,s,o,a=.75*t.length,c=t.length,h=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var l=new ArrayBuffer(a),p=new Uint8Array(l);for(i=0;i<c;i+=4)r=e.indexOf(t[i]),n=e.indexOf(t[i+1]),s=e.indexOf(t[i+2]),o=e.indexOf(t[i+3]),p[h++]=r<<2|n>>4,p[h++]=(15&n)<<4|s>>2,p[h++]=(3&s)<<6|63&o;return l}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},eOtv:function(e,t,i){var r=i("lKxJ"),n=i("KFGy"),s=i("cpc2"),o=i("Uwu7"),a=i("2Dig"),c=i("QN7Q"),h=i("x7D4")("socket.io-client:manager"),l=i("7jRU"),p=i("C2QD"),u=Object.prototype.hasOwnProperty;function f(e,t){if(!(this instanceof f))return new f(e,t);e&&"object"==typeof e&&(t=e,e=void 0),(t=t||{}).path=t.path||"/socket.io",this.nsps={},this.subs=[],this.opts=t,this.reconnection(!1!==t.reconnection),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor(t.randomizationFactor||.5),this.backoff=new p({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==t.timeout?2e4:t.timeout),this.readyState="closed",this.uri=e,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var i=t.parser||o;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this.autoConnect=!1!==t.autoConnect,this.autoConnect&&this.open()}e.exports=f,f.prototype.emitAll=function(){for(var e in this.emit.apply(this,arguments),this.nsps)u.call(this.nsps,e)&&this.nsps[e].emit.apply(this.nsps[e],arguments)},f.prototype.updateSocketIds=function(){for(var e in this.nsps)u.call(this.nsps,e)&&(this.nsps[e].id=this.generateId(e))},f.prototype.generateId=function(e){return("/"===e?"":e+"#")+this.engine.id},s(f.prototype),f.prototype.reconnection=function(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection},f.prototype.reconnectionAttempts=function(e){return arguments.length?(this._reconnectionAttempts=e,this):this._reconnectionAttempts},f.prototype.reconnectionDelay=function(e){return arguments.length?(this._reconnectionDelay=e,this.backoff&&this.backoff.setMin(e),this):this._reconnectionDelay},f.prototype.randomizationFactor=function(e){return arguments.length?(this._randomizationFactor=e,this.backoff&&this.backoff.setJitter(e),this):this._randomizationFactor},f.prototype.reconnectionDelayMax=function(e){return arguments.length?(this._reconnectionDelayMax=e,this.backoff&&this.backoff.setMax(e),this):this._reconnectionDelayMax},f.prototype.timeout=function(e){return arguments.length?(this._timeout=e,this):this._timeout},f.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},f.prototype.open=f.prototype.connect=function(e,t){if(h("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;h("opening %s",this.uri),this.engine=r(this.uri,this.opts);var i=this.engine,n=this;this.readyState="opening",this.skipReconnect=!1;var s=a(i,"open",(function(){n.onopen(),e&&e()})),o=a(i,"error",(function(t){if(h("connect_error"),n.cleanup(),n.readyState="closed",n.emitAll("connect_error",t),e){var i=new Error("Connection error");i.data=t,e(i)}else n.maybeReconnectOnOpen()}));if(!1!==this._timeout){var c=this._timeout;h("connect attempt will timeout after %d",c),0===c&&s.destroy();var l=setTimeout((function(){h("connect attempt timed out after %d",c),s.destroy(),i.close(),i.emit("error","timeout"),n.emitAll("connect_timeout",c)}),c);this.subs.push({destroy:function(){clearTimeout(l)}})}return this.subs.push(s),this.subs.push(o),this},f.prototype.onopen=function(){h("open"),this.cleanup(),this.readyState="open",this.emit("open");var e=this.engine;this.subs.push(a(e,"data",c(this,"ondata"))),this.subs.push(a(e,"ping",c(this,"onping"))),this.subs.push(a(e,"pong",c(this,"onpong"))),this.subs.push(a(e,"error",c(this,"onerror"))),this.subs.push(a(e,"close",c(this,"onclose"))),this.subs.push(a(this.decoder,"decoded",c(this,"ondecoded")))},f.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},f.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},f.prototype.ondata=function(e){this.decoder.add(e)},f.prototype.ondecoded=function(e){this.emit("packet",e)},f.prototype.onerror=function(e){h("error",e),this.emitAll("error",e)},f.prototype.socket=function(e,t){var i=this.nsps[e];if(!i){i=new n(this,e,t),this.nsps[e]=i;var r=this;i.on("connecting",s),i.on("connect",(function(){i.id=r.generateId(e)})),this.autoConnect&&s()}function s(){~l(r.connecting,i)||r.connecting.push(i)}return i},f.prototype.destroy=function(e){var t=l(this.connecting,e);~t&&this.connecting.splice(t,1),this.connecting.length||this.close()},f.prototype.packet=function(e){h("writing packet %j",e);var t=this;e.query&&0===e.type&&(e.nsp+="?"+e.query),t.encoding?t.packetBuffer.push(e):(t.encoding=!0,this.encoder.encode(e,(function(i){for(var r=0;r<i.length;r++)t.engine.write(i[r],e.options);t.encoding=!1,t.processPacketQueue()})))},f.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var e=this.packetBuffer.shift();this.packet(e)}},f.prototype.cleanup=function(){h("cleanup");for(var e=this.subs.length,t=0;t<e;t++)this.subs.shift().destroy();this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},f.prototype.close=f.prototype.disconnect=function(){h("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},f.prototype.onclose=function(e){h("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",e),this._reconnection&&!this.skipReconnect&&this.reconnect()},f.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)h("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var t=this.backoff.duration();h("will wait %dms before reconnect attempt",t),this.reconnecting=!0;var i=setTimeout((function(){e.skipReconnect||(h("attempting reconnect"),e.emitAll("reconnect_attempt",e.backoff.attempts),e.emitAll("reconnecting",e.backoff.attempts),e.skipReconnect||e.open((function(t){t?(h("reconnect attempt error"),e.reconnecting=!1,e.reconnect(),e.emitAll("reconnect_error",t.data)):(h("reconnect success"),e.onreconnect())})))}),t);this.subs.push({destroy:function(){clearTimeout(i)}})}},f.prototype.onreconnect=function(){var e=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",e)}},gFX4:function(e,t,i){var r=i("zJ60"),n=i("Uwu7"),s=i("eOtv"),o=i("x7D4")("socket.io-client");e.exports=t=c;var a=t.managers={};function c(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var i,n=r(e),c=n.source,h=n.id;return t.forceNew||t["force new connection"]||!1===t.multiplex||a[h]&&n.path in a[h].nsps?(o("ignoring socket cache for %s",c),i=s(c,t)):(a[h]||(o("new io instance for %s",c),a[h]=s(c,t)),i=a[h]),n.query&&!t.query&&(t.query=n.query),i.socket(n.path,t)}t.protocol=n.protocol,t.connect=c,t.Manager=i("eOtv"),t.Socket=i("KFGy")},kSER:function(e,t){e.exports=function(e,t){for(var i=[],r=(t=t||0)||0;r<e.length;r++)i[r-t]=e[r];return i}},lFSb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("swtw");t.SocketIoModule=r.SocketIoModule;var n=i("ytKu");t.Socket=n.WrappedSocket},lKxJ:function(e,t,i){e.exports=i("2pII"),e.exports.parser=i("+ntK")},lhf0:function(e,t,i){function r(e){var i;function r(){if(r.enabled){var e=r,n=+new Date,s=n-(i||n);e.diff=s,e.prev=i,e.curr=n,i=n;for(var o=new Array(arguments.length),a=0;a<o.length;a++)o[a]=arguments[a];o[0]=t.coerce(o[0]),"string"!=typeof o[0]&&o.unshift("%O");var c=0;o[0]=o[0].replace(/%([a-zA-Z%])/g,(function(i,r){if("%%"===i)return i;c++;var n=t.formatters[r];return"function"==typeof n&&(i=n.call(e,o[c]),o.splice(c,1),c--),i})),t.formatArgs.call(e,o);var h=r.log||t.log||console.log.bind(console);h.apply(e,o)}}return r.namespace=e,r.enabled=t.enabled(e),r.useColors=t.useColors(),r.color=function(e){var i,r=0;for(i in e)r=(r<<5)-r+e.charCodeAt(i),r|=0;return t.colors[Math.abs(r)%t.colors.length]}(e),r.destroy=n,"function"==typeof t.init&&t.init(r),t.instances.push(r),r}function n(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=r.debug=r.default=r).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var i;t.save(e),t.names=[],t.skips=[];var r=("string"==typeof e?e:"").split(/[\s,]+/),n=r.length;for(i=0;i<n;i++)r[i]&&("-"===(e=r[i].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(i=0;i<t.instances.length;i++){var s=t.instances[i];s.enabled=t.enabled(s.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var i,r;for(i=0,r=t.skips.length;i<r;i++)if(t.skips[i].test(e))return!1;for(i=0,r=t.names.length;i<r;i++)if(t.names[i].test(e))return!0;return!1},t.humanize=i("WiHW"),t.instances=[],t.names=[],t.skips=[],t.formatters={}},odh7:function(e,t,i){"use strict";var r=i("/Tr7"),n=i("jIYg");function s(e){Object(n.a)(1,arguments);var t=Object(r.a)(e),i=t.getTime();return i}function o(e){return Object(n.a)(1,arguments),Math.floor(s(e)/1e3)}i.d(t,"a",(function(){return o}))},pfa5:function(e,t,i){"use strict";i.d(t,"a",(function(){return n})),i.d(t,"b",(function(){return s}));var r=i("8Y7J"),n=(i("aOhv"),r["\u0275crt"]({encapsulation:2,styles:['.video-js{color:#555}.vjs-theme-city{--vjs-theme-city--primary:#bf3b4d;--vjs-theme-city--secondary:#fff;--vjs-theme-city--icon-color:#555555;--vjs-theme-city--size:2em}.vjs-theme-city .vjs-big-play-button{font-size:2.5em;line-height:2em;height:2em;width:2em;background-color:var(--vjs-theme-city--primary);color:var(--vjs-theme-city--secondary);border-radius:1em;left:50%;top:50%;margin-left:-1em;margin-top:-1em}.vjs-theme-city .vjs-loading-spinner{border:3px solid #2b333f!important}.vjs-theme-city .vjs-loading-spinner::after,.vjs-theme-city .vjs-loading-spinner::before{border-color:var(--vjs-theme-city--primary);margin:-3px}.vjs-theme-city .vjs-control{outline:0}.vjs-theme-city .vjs-setting-home{background-color:rgba(255,255,255,.66);position:absolute;right:10%;border-radius:5px;font-size:1.8em;height:auto;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;bottom:45px}.vjs-theme-city .vjs-control-bar{background-color:rgba(255,255,255,.66);bottom:.7em;height:40px;left:0;position:absolute;right:0;width:96%;margin:0 2%;border-radius:5px;font-weight:700}.vjs-theme-city .vjs-control-bar .vjs-current-time,.vjs-theme-city .vjs-control-bar .vjs-duration{display:block;font-size:1.3em;font-weight:500;line-height:40px;text-align:center;padding:0;margin:0}.vjs-theme-city .vjs-control-bar .vjs-liveui{line-height:4em}.vjs-theme-city .vjs-control-bar .vjs-liveui .vjs-liveui-display:before{content:"";position:absolute;bottom:18px;left:0;width:5px;height:5px;background-color:var(--vjs-theme-city--primary);border-radius:50%}.vjs-theme-city .vjs-control-bar .vjs-button>.vjs-icon-placeholder::before,.vjs-theme-city .vjs-control-bar .vjs-playback-rate .vjs-playback-rate-value{font-size:2.2em;line-height:1.8em}.vjs-theme-city .vjs-control-bar .vjs-icon-cog:before,.vjs-theme-city .vjs-control-bar .vjs-icon-replay:before{font-size:2.1em}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-button{transition:transform .3s;transform:rotate(0)}.vjs-theme-city .vjs-control-bar .vjs-setting-button-anim{transform:rotate(90deg)}.vjs-theme-city .vjs-control-bar .vjs-progress-control{font-size:1.6em}.vjs-theme-city .vjs-control-bar .vjs-progress-control .vjs-load-progress,.vjs-theme-city .vjs-control-bar .vjs-progress-control .vjs-play-progress,.vjs-theme-city .vjs-control-bar .vjs-progress-control .vjs-progress-holder{border-radius:25px}.vjs-theme-city .vjs-control-bar .vjs-progress-control .vjs-play-progress{background-color:var(--vjs-theme-city--primary)}.vjs-theme-city .vjs-control-bar .vjs-progress-control .vjs-play-progress::before{display:block;color:#fff}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main{position:absolute;bottom:110%;right:0;background-color:rgba(255,255,255,.66);font-size:1.3em;border-radius:5px;transition:width .5s;padding:2px}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content{list-style:none;padding:0;margin:0}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item{padding:4px;display:flex;cursor:pointer;text-transform:capitalize;border-radius:5px;width:9em}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item span{margin:4px 6px;width:50%;display:block}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .text-right{text-align:right}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .text-left{text-align:left}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .vjs-setting-icon{text-align:right}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .vjs-icon-circle-inner-circle,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .vjs-icon-circle-outline{font-size:1.3em}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item .vjs-icon-circle-inner-circle{color:var(--vjs-theme-city--primary)}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item-selected,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:active,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:focus,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:hover{background-color:var(--vjs-theme-city--primary);color:#fff}.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item-selected .vjs-icon-circle-inner-circle,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:active .vjs-icon-circle-inner-circle,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:focus .vjs-icon-circle-inner-circle,.vjs-theme-city .vjs-control-bar .vjs-setting-menu-main .vjs-menu-content .vjs-setting-item:hover .vjs-icon-circle-inner-circle{color:#fff}.video-js .vjs-title-bar{background:rgba(0,0,0,.5);color:#fff;display:none;font-size:2em;padding:.5em;position:absolute;top:0;left:0;width:100%}.video-js.vjs-paused.vjs-has-started .vjs-title-bar,.video-js.vjs-user-active.vjs-has-started .vjs-title-bar{display:block}'],data:{}}));function s(e){return r["\u0275vid"](0,[(e()(),r["\u0275eld"](0,0,null,null,4,"video",[["class","video-js video-js-default vjs-theme-city vjs-matrix vjs-16-9"],["controls",""],["data-setup","{}"],["id","rs_penpencil_player"]],null,null,null,null,null)),(e()(),r["\u0275eld"](1,0,null,null,3,"p",[["class","vjs-no-js"]],null,null,null,null,null)),(e()(),r["\u0275ted"](-1,null,["To view this video please enable JavaScript, and consider upgrading to a web browser that "])),(e()(),r["\u0275eld"](3,0,null,null,1,"a",[["href","http://videojs.com/html5-video-support/"],["target","_blank"]],null,null,null,null,null)),(e()(),r["\u0275ted"](-1,null,["supports HTML5 video"]))],null,null)}},pl0G:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var r=i("/h9T"),n=i("/Tr7"),s=i("jIYg");function o(e,t){Object(s.a)(2,arguments);var i=Object(n.a)(e).getTime(),o=Object(r.a)(t);return new Date(i+o)}},qGlh:function(e,t){e.exports=function(e){return i&&Buffer.isBuffer(e)||r&&(e instanceof ArrayBuffer||function(e){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer}(e))};var i="function"==typeof Buffer&&"function"==typeof Buffer.isBuffer,r="function"==typeof ArrayBuffer},swtw:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("8Y7J"),n=i("ytKu");function s(e){return new n.WrappedSocket(e)}t.SocketFactory=s,t.SOCKET_CONFIG_TOKEN=new r.InjectionToken("__SOCKET_IO_CONFIG__");var o=function(){function e(){}return e.forRoot=function(i){return{ngModule:e,providers:[{provide:t.SOCKET_CONFIG_TOKEN,useValue:i},{provide:n.WrappedSocket,useFactory:s,deps:[t.SOCKET_CONFIG_TOKEN]}]}},e.decorators=[{type:r.NgModule,args:[{}]}],e.ctorParameters=function(){return[]},e}();t.SocketIoModule=o},x7D4:function(e,t,i){function r(){var e;try{e=t.storage.debug}catch(i){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=i("Q80o")).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var i=this.useColors;if(e[0]=(i?"%c":"")+this.namespace+(i?" %c":" ")+e[0]+(i?"%c ":" ")+"+"+t.humanize(this.diff),i){var r="color: "+this.color;e.splice(1,0,r,"color: inherit");var n=0,s=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(n++,"%c"===e&&(s=n))})),e.splice(s,0,r)}},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(i){}},t.load=r,t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},t.enable(r())},yeub:function(e,t){try{e.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(i){e.exports=!1}},ypnn:function(e,t){e.exports=function(e,t,i){var r=e.byteLength;if(t=t||0,i=i||r,e.slice)return e.slice(t,i);if(t<0&&(t+=r),i<0&&(i+=r),i>r&&(i=r),t>=r||t>=i||0===r)return new ArrayBuffer(0);for(var n=new Uint8Array(e),s=new Uint8Array(i-t),o=t,a=0;o<i;o++,a++)s[a]=n[o];return s.buffer}},ytKu:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("8Y7J"),n=i("zE9r");i("YAho");var s=i("gFX4"),o=i("swtw"),a=function(){function e(e){this.subscribersCounter=0,this.ioSocket=s(e.url||"",e.options||{})}return e.prototype.on=function(e,t){this.ioSocket.on(e,t)},e.prototype.once=function(e,t){this.ioSocket.once(e,t)},e.prototype.connect=function(){return this.ioSocket.connect()},e.prototype.disconnect=function(e){return this.ioSocket.disconnect.apply(this.ioSocket,arguments)},e.prototype.emit=function(e,t,i){return this.ioSocket.emit.apply(this.ioSocket,arguments)},e.prototype.removeListener=function(e,t){return this.ioSocket.removeListener.apply(this.ioSocket,arguments)},e.prototype.removeAllListeners=function(e){return this.ioSocket.removeAllListeners.apply(this.ioSocket,arguments)},e.prototype.fromEvent=function(e){var t=this;return this.subscribersCounter++,n.Observable.create((function(i){return t.ioSocket.on(e,(function(e){i.next(e)})),function(){1===t.subscribersCounter&&t.ioSocket.removeListener(e)}})).share()},e.prototype.fromEventOnce=function(e){var t=this;return new Promise((function(i){return t.once(e,i)}))},e.ctorParameters=function(){return[{type:void 0,decorators:[{type:r.Inject,args:[o.SOCKET_CONFIG_TOKEN]}]}]},e}();t.WrappedSocket=a},zE9r:function(e,t,i){"use strict";i.r(t);var r=i("HDdC");i.d(t,"Observable",(function(){return r.a}))},zJ60:function(e,t,i){var r=i("Uxeu"),n=i("x7D4")("socket.io-client:url");e.exports=function(e,t){var i=e;t=t||"undefined"!=typeof location&&location,null==e&&(e=t.protocol+"//"+t.host),"string"==typeof e&&("/"===e.charAt(0)&&(e="/"===e.charAt(1)?t.protocol+e:t.host+e),/^(https?|wss?):\/\//.test(e)||(n("protocol-less url %s",e),e=void 0!==t?t.protocol+"//"+e:"https://"+e),n("parse %s",e),i=r(e)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";var s=-1!==i.host.indexOf(":")?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+s+":"+i.port,i.href=i.protocol+"://"+s+(t&&t.port===i.port?"":":"+i.port),i}},zMFY:function(e,t){function i(){}e.exports=function(e,t,r){var n=!1;return r=r||i,s.count=e,0===e?t():s;function s(e,i){if(s.count<=0)throw new Error("after called too many times");--s.count,e?(n=!0,t(e),t=r):0!==s.count||n||t(null,i)}}}}]);