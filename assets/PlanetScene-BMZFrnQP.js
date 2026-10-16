import {r as e, t} from "./gsap-BwyZPz4w.js";
import {n} from "./variants-DcK5NRvD.js";
import {A as r, C as i, D as a, E as o, M as s, O as c, S as l, T as u, _ as d, a as f, b as p, c as m, d as h, f as g, g as _, h as v, i as y, j as b, k as x, l as S, m as C, n as w, o as T, p as E, r as D, s as O, t as k, u as A, v as j, w as M, x as N, y as P} from "./three-BNlcGrAU.js";
var F = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
function I(e) {
    let t = e >>> 0;
    return () => {
        t = t + 1831565813 >>> 0;
        let e = t;
        return e = Math.imul(e ^ e >>> 15, e | 1),
        e ^= e + Math.imul(e ^ e >>> 7, e | 61),
        ((e ^ e >>> 14) >>> 0) / 4294967296
    }
}
var L = class {
    perm = new Uint8Array(512);
    permMod12 = new Uint8Array(512);
    constructor(e=1) {
        let t = I(e)
          , n = new Uint8Array(256);
        for (let e = 0; e < 256; e++)
            n[e] = e;
        for (let e = 255; e > 0; e--) {
            let r = Math.floor(t() * (e + 1))
              , i = n[e];
            n[e] = n[r],
            n[r] = i
        }
        for (let e = 0; e < 512; e++)
            this.perm[e] = n[e & 255],
            this.permMod12[e] = this.perm[e] % 12
    }
    noise(e, t, n) {
        let r = 1 / 6, i = (e + t + n) * .3333333333333333, a = Math.floor(e + i), o = Math.floor(t + i), s = Math.floor(n + i), c = (a + o + s) * r, l = e - (a - c), u = t - (o - c), d = n - (s - c), f, p, m, h, g, _;
        l >= u ? u >= d ? (f = 1,
        p = 0,
        m = 0,
        h = 1,
        g = 1,
        _ = 0) : l >= d ? (f = 1,
        p = 0,
        m = 0,
        h = 1,
        g = 0,
        _ = 1) : (f = 0,
        p = 0,
        m = 1,
        h = 1,
        g = 0,
        _ = 1) : u < d ? (f = 0,
        p = 0,
        m = 1,
        h = 0,
        g = 1,
        _ = 1) : l < d ? (f = 0,
        p = 1,
        m = 0,
        h = 0,
        g = 1,
        _ = 1) : (f = 0,
        p = 1,
        m = 0,
        h = 1,
        g = 1,
        _ = 0);
        let v = l - f + r
          , y = u - p + r
          , b = d - m + r
          , x = l - h + 2 * r
          , S = u - g + 2 * r
          , C = d - _ + 2 * r
          , w = l - 1 + 3 * r
          , T = u - 1 + 3 * r
          , E = d - 1 + 3 * r
          , D = a & 255
          , O = o & 255
          , k = s & 255
          , {perm: A, permMod12: j} = this
          , M = 0
          , N = .6 - l * l - u * u - d * d;
        if (N > 0) {
            let e = F[j[D + A[O + A[k]]]];
            N *= N,
            M += N * N * (e[0] * l + e[1] * u + e[2] * d)
        }
        let P = .6 - v * v - y * y - b * b;
        if (P > 0) {
            let e = F[j[D + f + A[O + p + A[k + m]]]];
            P *= P,
            M += P * P * (e[0] * v + e[1] * y + e[2] * b)
        }
        let I = .6 - x * x - S * S - C * C;
        if (I > 0) {
            let e = F[j[D + h + A[O + g + A[k + _]]]];
            I *= I,
            M += I * I * (e[0] * x + e[1] * S + e[2] * C)
        }
        let L = .6 - w * w - T * T - E * E;
        if (L > 0) {
            let e = F[j[D + 1 + A[O + 1 + A[k + 1]]]];
            L *= L,
            M += L * L * (e[0] * w + e[1] * T + e[2] * E)
        }
        return 32 * M
    }
    fbm(e, t, n, r=4, i=2.1, a=.5) {
        let o = 0
          , s = 1
          , c = 0
          , l = 1;
        for (let u = 0; u < r; u++)
            o += s * this.noise(e * l, t * l, n * l),
            c += s,
            s *= a,
            l *= i;
        return o / c
    }
}
;
function ee(e, t, n, r, i) {
    let a = new L(r)
      , o = new L(r + 101)
      , s = new Float32Array(e * t)
      , c = [];
    for (let n = 0; n < t; n++) {
        let r = Math.PI / 2 - (n + .5) / t * Math.PI
          , l = Math.cos(r)
          , u = Math.sin(r);
        for (let t = 0; t < e; t++) {
            let r = (t + .5) / e * Math.PI * 2 - Math.PI
              , d = l * Math.cos(r)
              , f = u
              , p = l * Math.sin(r)
              , m = o.fbm(d * i * .8 + 3.1, f * i * .8, p * i * .8, 2) * .35
              , h = o.fbm(d * i * .8, f * i * .8 + 7.7, p * i * .8, 2) * .35
              , g = o.fbm(d * i * .8, f * i * .8, p * i * .8 + 11.3, 2) * .35
              , _ = a.fbm((d + m) * i, (f + h) * i, (p + g) * i, 4);
            s[n * e + t] = _,
            c.push({
                v: _,
                w: l
            })
        }
    }
    c.sort( (e, t) => t.v - e.v);
    let l = 0;
    for (let e of c)
        l += e.w;
    let u = 0
      , d = c[c.length - 1].v;
    for (let e of c)
        if (u += e.w,
        u >= l * n) {
            d = e.v;
            break
        }
    return {
        width: e,
        height: t,
        values: s,
        threshold: d
    }
}
function te(e, t, n, r) {
    let i = Math.atan2(r, t)
      , a = Math.asin(Math.max(-1, Math.min(1, n)))
      , o = (i + Math.PI) / (Math.PI * 2) * e.width - .5
      , s = (Math.PI / 2 - a) / Math.PI * e.height - .5
      , c = Math.floor(o)
      , l = Math.floor(s)
      , u = o - c
      , d = s - l
      , f = t => (t % e.width + e.width) % e.width
      , p = t => Math.max(0, Math.min(e.height - 1, t))
      , m = (t, n) => e.values[p(n) * e.width + f(t)]
      , h = m(c, l) * (1 - u) + m(c + 1, l) * u
      , g = m(c, l + 1) * (1 - u) + m(c + 1, l + 1) * u;
    return h * (1 - d) + g * d
}
function ne(e) {
    return new Promise( (t, n) => {
        let r = new Image;
        r.onload = () => {
            let e = document.createElement(`canvas`);
            e.width = r.naturalWidth,
            e.height = r.naturalHeight;
            let i = e.getContext(`2d`, {
                willReadFrequently: !0
            });
            if (!i)
                return n(Error(`2D canvas unavailable`));
            i.drawImage(r, 0, 0);
            let {data: a, width: o, height: s} = i.getImageData(0, 0, e.width, e.height)
              , c = new Float32Array(o * s);
            for (let e = 0; e < c.length; e++)
                c[e] = a[e * 4] / 255;
            t({
                width: o,
                height: s,
                values: c,
                threshold: .5
            })
        }
        ,
        r.onerror = () => n(Error(`Could not load ${e}`)),
        r.src = e
    }
    )
}
var R = {
    BTC(e, t) {
        e.save(),
        e.translate(.5 * t, .5 * t),
        e.rotate(Math.PI / 180 * -14),
        e.fillStyle = `#fff`,
        e.font = `800 ${.58 * t}px "Instrument Sans Variable", Arial, sans-serif`,
        e.textAlign = `center`,
        e.textBaseline = `middle`,
        e.fillText(`B`, .01 * t, .03 * t),
        e.fillRect(-.075 * t, -.33 * t, .05 * t, .09 * t),
        e.fillRect(0 * t, -.33 * t, .05 * t, .09 * t),
        e.fillRect(-.075 * t, .25 * t, .05 * t, .09 * t),
        e.fillRect(0 * t, .25 * t, .05 * t, .09 * t),
        e.restore()
    },
    ETH(e, t) {
        let n = [.5, .16]
          , r = [.27, .53]
          , i = [.73, .53]
          , a = [.5, .86]
          , o = [.5, .63]
          , s = [.27, .59]
          , c = [.73, .59]
          , l = [.5, .69]
          , u = (n, r) => {
            e.fillStyle = `rgba(255,255,255,${r})`,
            e.beginPath(),
            n.forEach( ([n,r], i) => i ? e.lineTo(n * t, r * t) : e.moveTo(n * t, r * t)),
            e.closePath(),
            e.fill()
        }
        ;
        u([n, r, o], .62),
        u([n, i, o], 1),
        u([s, l, a], .62),
        u([c, l, a], 1)
    },
    USDT(e, t) {
        e.fillStyle = `#fff`,
        e.fillRect(.26 * t, .24 * t, .48 * t, .11 * t),
        e.fillRect(.44 * t, .24 * t, .12 * t, .52 * t),
        e.lineWidth = .075 * t,
        e.strokeStyle = `#fff`,
        e.beginPath(),
        e.ellipse(.5 * t, .46 * t, .27 * t, .085 * t, 0, 0, Math.PI * 2),
        e.stroke(),
        e.fillStyle = re,
        e.fillRect(.44 * t, .4 * t, .12 * t, .12 * t),
        e.fillStyle = `#fff`,
        e.fillRect(.44 * t, .24 * t, .12 * t, .52 * t)
    },
    USDC(e, t) {
        e.strokeStyle = `#fff`,
        e.lineWidth = .075 * t,
        e.lineCap = `round`,
        e.beginPath(),
        e.arc(.5 * t, .5 * t, .32 * t, Math.PI * .62, Math.PI * 1.38),
        e.stroke(),
        e.beginPath(),
        e.arc(.5 * t, .5 * t, .32 * t, Math.PI * 1.62, Math.PI * 2.38),
        e.stroke(),
        e.fillStyle = `#fff`,
        e.font = `700 ${.42 * t}px "Instrument Sans Variable", Arial, sans-serif`,
        e.textAlign = `center`,
        e.textBaseline = `middle`,
        e.fillText(`$`, .5 * t, .52 * t)
    }
}
  , re = `#000`;
function z(e, t, n=`color`, r=`#111214`) {
    let i = document.createElement(`canvas`);
    i.width = t,
    i.height = t;
    let a = i.getContext(`2d`)
      , o = t / 2
      , s = t * .36
      , c = n === `mono` ? r : e.color
      , l = n => {
        a.clearRect(0, 0, t, t),
        a.fillStyle = `#ffffff`,
        a.beginPath(),
        a.arc(o, o, s + t * .02, 0, Math.PI * 2),
        a.fill(),
        a.fillStyle = c,
        a.beginPath(),
        a.arc(o, o, s, 0, Math.PI * 2),
        a.fill(),
        a.save(),
        a.translate(o - s, o - s);
        let r = s * 2;
        n ? (a.beginPath(),
        a.arc(s, s, s, 0, Math.PI * 2),
        a.clip(),
        a.drawImage(n, 0, 0, r, r)) : (re = c,
        (R[e.symbol] ?? R.USDC)(a, r)),
        a.restore()
    }
    ;
    l();
    let u = new y(i);
    if (u.anisotropy = 4,
    e.logo) {
        let t = new Image;
        t.onload = () => {
            l(t),
            u.needsUpdate = !0
        }
        ,
        t.src = e.logo
    }
    return u
}
var ie = {
    bg: `#ffffff`,
    line: `#dadee2`,
    sub: `#a2a6aa`,
    ink: `#122433`
};
function ae(e, t, n=512, r=ie) {
    let i = document.createElement(`canvas`)
      , a = i.getContext(`2d`)
      , o = `"Onest Variable", "Instrument Sans Variable", Arial, sans-serif`
      , s = Math.round(n * .19)
      , c = Math.round(n * .25)
      , l = Math.round(n * .07)
      , u = `700 ${s}px ${o}`
      , d = `700 ${c}px ${o}`
      , f = t.toUpperCase();
    a.font = u,
    a.letterSpacing = `${-s * .03}px`;
    let p = a.measureText(f).width;
    a.font = d,
    a.letterSpacing = `${-c * .03}px`;
    let m = a.measureText(e).width
      , h = Math.round(n * .2)
      , g = Math.ceil(Math.max(p, m) + h * 2);
    i.width = g,
    i.height = n;
    let b = n * .1
      , x = Math.max(1.5, n * .012);
    a.beginPath(),
    a.roundRect(x, x, g - x * 2, n - x * 2, b),
    a.fillStyle = r.bg,
    a.fill(),
    a.lineWidth = x,
    a.strokeStyle = r.line,
    a.stroke();
    let S = (n - s - l - c) / 2;
    a.textAlign = `center`,
    a.textBaseline = `top`,
    a.fillStyle = r.sub,
    a.font = u,
    a.letterSpacing = `${-s * .03}px`,
    a.fillText(f, g / 2, S),
    a.fillStyle = r.ink,
    a.font = d,
    a.letterSpacing = `${-c * .03}px`,
    a.fillText(e, g / 2, S + s + l);
    let C = new y(i);
    return C.anisotropy = 8,
    C.minFilter = _,
    C.magFilter = v,
    {
        texture: C,
        aspect: g / n
    }
}
var B = `// Camera-facing quad. \`uSize\` is the quad's world-space width, \`uAspect\` = height / width.
uniform float uSize;
uniform float uAspect;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 centre = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  centre.xy += vec2(position.x * uSize, position.y * uSize * uAspect);
  gl_Position = projectionMatrix * centre;
}
`
  , V = `// Radial bloom. Used for the big glow behind the sphere and for node halos.
precision highp float;

uniform vec3  uColor;
uniform float uOpacity;   // peak alpha
uniform float uInner;     // 0..1 — where the falloff begins
uniform float uFalloff;   // curve exponent; higher = tighter

varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  float d = length(vUv - 0.5) * 2.0;          // 0 centre → 1 edge
  float g = 1.0 - smoothstep(uInner, 1.0, d);
  g = pow(g, uFalloff);
  // ±1/255 alpha dither kills banding in the gradient.
  float dither = (hash(gl_FragCoord.xy) - 0.5) * (2.0 / 255.0);
  float a = clamp(uOpacity * g + dither * step(0.001, g), 0.0, 1.0);
  if (a <= 0.0) discard;
  gl_FragColor = vec4(uColor, a);
}
`
  , H = `// Hairline circle on a billboard quad, optionally drawn in as a sweep from uStart.
precision highp float;

uniform vec3  uColor;
uniform float uOpacity;
uniform float uRadius;     // circle radius in quad units (0..0.5)
uniform float uWidth;      // stroke width in quad units
uniform float uSweep;      // 0..1 fraction of the circle drawn (clockwise from uStart)
uniform float uStart;      // start angle, radians
uniform float uPulse;      // 0..1 position of a travelling highlight along the circle (loop)
uniform float uPulseLen;   // 0..1 length of its tail; 0 disables
uniform vec3  uPulseColor;

varying vec2 vUv;

void main() {
  vec2 c = vUv - 0.5;
  float d = length(c);
  float aa = fwidth(d) * 1.2;
  float ring = smoothstep(uRadius - uWidth - aa, uRadius - uWidth, d) * (1.0 - smoothstep(uRadius, uRadius + aa, d));
  float ang = fract((uStart - atan(c.y, c.x)) / 6.28318530718);
  float head = fwidth(ang) * 2.0;
  float sweep = 1.0 - smoothstep(uSweep - head, uSweep, ang);
  // travelling highlight: brightest at the head, fading along its tail
  float behind = fract(uPulse - ang);
  float tail = uPulseLen > 0.0 ? pow(clamp(1.0 - behind / uPulseLen, 0.0, 1.0), 1.6) : 0.0;
  vec3 col = mix(uColor, uPulseColor, tail);
  float a = uOpacity * ring * sweep * (1.0 + tail * 0.6);
  if (a <= 0.002) discard;
  gl_FragColor = vec4(col, min(a, 1.0));
}
`
  , oe = (e, t=1.9) => {
    let n = e - 1;
    return n * n * ((t + 1) * n + t) + 1
}
  , U = (e, t, n) => {
    let r = Math.min(1, Math.max(0, (n - e) / (t - e)));
    return r * r * (3 - 2 * r)
}
;
function W(e) {
    return e.popupSites.map( ([e,t,n]) => {
        let r = t * Math.PI / 180
          , i = n * Math.PI / 180;
        return {
            name: e,
            dir: new s(Math.cos(r) * Math.cos(i),Math.sin(r),Math.cos(r) * Math.sin(i)),
            lastUsed: -1 / 0
        }
    }
    )
}
function G(e, t, n) {
    let r = new j(e,new M({
        vertexShader: B,
        fragmentShader: V,
        uniforms: {
            uSize: {
                value: t
            },
            uAspect: {
                value: 1
            },
            uColor: {
                value: new O(n)
            },
            uOpacity: {
                value: 0
            },
            uInner: {
                value: .86
            },
            uFalloff: {
                value: 1
            }
        },
        transparent: !0,
        depthWrite: !1,
        depthTest: !1
    }));
    return r.renderOrder = 5,
    r.frustumCulled = !1,
    r
}
function K(e, t, n) {
    let r = new j(e,new M({
        vertexShader: B,
        fragmentShader: H,
        uniforms: {
            uSize: {
                value: t
            },
            uAspect: {
                value: 1
            },
            uColor: {
                value: new O(n)
            },
            uOpacity: {
                value: 0
            },
            uRadius: {
                value: .1
            },
            uWidth: {
                value: .01
            },
            uSweep: {
                value: 1
            },
            uStart: {
                value: 0
            },
            uPulse: {
                value: 0
            },
            uPulseLen: {
                value: 0
            },
            uPulseColor: {
                value: new O(n)
            }
        },
        transparent: !0,
        depthWrite: !1,
        depthTest: !1
    }));
    return r.renderOrder = 5,
    r.frustumCulled = !1,
    r
}
function q(e, t, n, r) {
    let {texture: i, aspect: o} = ae(e, t, void 0, r)
      , s = new a(new c({
        map: i,
        transparent: !0,
        depthWrite: !1,
        depthTest: !1,
        opacity: 0
    }));
    return s.scale.set(n * o, n, 1),
    s.center.set(-.12, .5),
    s.renderOrder = 7,
    s
}
function J(e, t, n) {
    let r = t / e.scale.x;
    e.center.x = n ? 1 + r : -r
}
function Y(e, t, n, r) {
    e.forEach( (e, i) => {
        let a = Math.min(1, Math.max(0, (t - i * .3) / n))
          , o = 1 - (1 - a) ** 2;
        e.material.uniforms.uRadius.value = .06 + .42 * o,
        e.material.uniforms.uOpacity.value = (a > 0 && a < 1 ? 1 - o : 0) * .9 * Math.min(1, r)
    }
    )
}
var se = class {
    cfg;
    parent;
    camera;
    quad;
    sites;
    textures;
    live = [];
    lastSpawn = -1 / 0;
    coinIndex = 0;
    tmp = new s;
    IN = .55;
    OUT = .4;
    constructor(e, t, n, r) {
        this.cfg = e,
        this.parent = t,
        this.camera = n,
        this.quad = r,
        this.sites = W(e),
        this.textures = e.coins.map(t => z(t, e.badgeTexturePx, e.badgeStyle, e.badgeMonoColor))
    }
    viewX(e) {
        return this.tmp.copy(e.dir).transformDirection(this.parent.matrixWorld).transformDirection(this.camera.matrixWorldInverse),
        this.tmp.x
    }
    facing(e) {
        return this.tmp.copy(e.dir).transformDirection(this.parent.matrixWorld).transformDirection(this.camera.matrixWorldInverse),
        this.tmp.z
    }
    spawn(e, t) {
        let n = this.cfg
          , r = this.sites.filter(t => this.facing(t) > n.popupMinFacing && e - t.lastUsed > n.popupSiteCooldownSec && !this.live.some(e => e.site === t));
        if (!r.length)
            return;
        let i = r[Math.floor(Math.random() * r.length)];
        i.lastUsed = e;
        let o = n.coins[this.coinIndex % n.coins.length]
          , l = this.textures[this.coinIndex % this.textures.length];
        this.coinIndex++;
        let u = n.popupMarkerColor ?? (n.badgeStyle === `mono` ? n.badgeMonoColor : o.color)
          , d = new h;
        d.position.copy(i.dir),
        d.quaternion.setFromUnitVectors(new s(0,0,1), i.dir);
        let f = new a(new c({
            map: l,
            transparent: !0,
            depthWrite: !1,
            depthTest: !1
        }));
        f.renderOrder = 6;
        let p = G(this.quad, n.popupMarkerSize, u);
        p.position.z = .004;
        let m = [];
        for (let e = 0; e < n.popupRings; e++) {
            let e = K(this.quad, n.popupPingSize, u);
            e.position.z = .05,
            m.push(e)
        }
        d.add(p, ...m, f);
        let _ = null;
        if (n.popupStem) {
            let e = new D().setFromPoints([new s(0,0,.01), new s(0,0,.02)]);
            _ = new g(e,new E({
                color: u,
                transparent: !0,
                opacity: 0,
                depthTest: !1
            })),
            _.renderOrder = 5,
            _.frustumCulled = !1,
            d.add(_)
        }
        let v = null;
        n.popupLabels && (v = q(i.name, `${o.symbol} to ${n.siteCurrency[i.name] ?? `local`}`, n.popupLabelHeight),
        d.add(v),
        J(v, n.badgeSize * .55, this.viewX(i) > .12)),
        this.parent.add(d);
        let y = n.popupHoldSec[0] + Math.random() * (n.popupHoldSec[1] - n.popupHoldSec[0]);
        this.live.push({
            site: i,
            group: d,
            sprite: f,
            label: v,
            marker: p,
            rings: m,
            stem: _,
            spawnedAt: t ? e - this.IN : e,
            hold: y,
            leaving: null
        }),
        this.lastSpawn = e
    }
    remove(e) {
        this.parent.remove(e.group),
        e.sprite.material.dispose(),
        e.marker.material.dispose();
        for (let t of e.rings)
            t.material.dispose();
        e.stem && (e.stem.geometry.dispose(),
        e.stem.material.dispose()),
        e.label && (e.label.material.map?.dispose(),
        e.label.material.dispose())
    }
    update(e, t, n) {
        let r = this.cfg;
        if (t > .05 && this.live.length < r.popupVisible && e - this.lastSpawn > r.popupSpawnGapSec && (this.spawn(e, n),
        n))
            for (; this.live.length < r.popupVisible; ) {
                let t = this.live.length;
                if (this.spawn(e, !0),
                this.live.length === t)
                    break
            }
        for (let i = this.live.length - 1; i >= 0; i--) {
            let a = this.live[i]
              , o = e - a.spawnedAt
              , s = U(r.popupMinFacing * .5, r.popupMinFacing, this.facing(a.site));
            a.leaving === null && !n && (o > this.IN + a.hold || s < .4) && (a.leaving = e);
            let c;
            if (a.leaving !== null) {
                let t = (e - a.leaving) / this.OUT;
                if (t >= 1) {
                    this.remove(a),
                    this.live.splice(i, 1);
                    continue
                }
                c = 1 - t * t
            } else
                c = oe(Math.min(1, o / this.IN));
            let l = c * t * Math.max(s, a.leaving === null ? .4 : 0)
              , u = r.popupLift * Math.min(1, c) + .02;
            if (a.sprite.position.z = u,
            a.sprite.scale.setScalar(Math.max(1e-4, r.badgeSize * c)),
            a.sprite.material.opacity = Math.min(1, l),
            a.marker.material.uniforms.uOpacity.value = Math.min(1, l),
            a.stem) {
                let e = a.stem.geometry.attributes.position;
                e.setZ(1, Math.max(.012, u - r.badgeSize * c / 2)),
                e.needsUpdate = !0,
                a.stem.material.opacity = .7 * Math.min(1, l)
            }
            a.label && (a.label.position.set(0, 0, u),
            a.label.material.opacity = Math.min(1, l) * U(.6, 1, c)),
            Y(a.rings, o, r.popupPingSec, l)
        }
    }
    dispose() {
        for (let e of this.live)
            this.remove(e);
        this.live.length = 0;
        for (let e of this.textures)
            e.dispose()
    }
}
  , X = 56
  , ce = e => e < .5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2
  , le = class {
    cfg;
    parent;
    camera;
    quad;
    sites;
    textures;
    live = [];
    lastSpawn = -1 / 0;
    coinIndex = 0;
    tmp = new s;
    constructor(e, t, n, r) {
        this.cfg = e,
        this.parent = t,
        this.camera = n,
        this.quad = r,
        this.sites = W(e),
        this.textures = e.coins.map(t => z(t, e.badgeTexturePx, e.badgeStyle, e.badgeMonoColor))
    }
    viewX(e) {
        return this.tmp.copy(e.dir).transformDirection(this.parent.matrixWorld).transformDirection(this.camera.matrixWorldInverse),
        this.tmp.x
    }
    facing(e) {
        return this.tmp.copy(e.dir).transformDirection(this.parent.matrixWorld).transformDirection(this.camera.matrixWorldInverse),
        this.tmp.z
    }
    spawn(e, t) {
        let n = this.cfg
          , r = new Set(this.live.flatMap(e => [e.from, e.to]))
          , i = this.sites.filter(t => this.facing(t) > n.popupMinFacing && e - t.lastUsed > n.popupSiteCooldownSec && !r.has(t));
        if (i.length < 2)
            return;
        let o = [];
        for (let e of i)
            for (let t of i) {
                if (e === t)
                    continue;
                let r = e.dir.angleTo(t.dir) * 180 / Math.PI;
                r >= n.corridorMinDeg && r <= n.corridorMaxDeg && o.push([e, t])
            }
        if (!o.length)
            return;
        let[l,u] = o[Math.floor(Math.random() * o.length)];
        l.lastUsed = e,
        u.lastUsed = e;
        let d = n.coins[this.coinIndex % n.coins.length]
          , f = this.textures[this.coinIndex % this.textures.length];
        this.coinIndex++;
        let p = n.popupMarkerColor ?? (n.badgeStyle === `mono` ? n.badgeMonoColor : d.color)
          , m = n.corridorLift * (.6 + .4 * Math.min(1, l.dir.angleTo(u.dir) / 1.2))
          , _ = [];
        for (let e = 0; e <= X; e++) {
            let t = e / X;
            _.push(l.dir.clone().lerp(u.dir, t).normalize().multiplyScalar(1.006 + Math.sin(t * Math.PI) * m))
        }
        let v = new D().setFromPoints(_);
        v.setDrawRange(0, 0);
        let y = new g(v,new E({
            color: p,
            transparent: !0,
            opacity: 0,
            depthTest: !1
        }));
        y.renderOrder = 5,
        y.frustumCulled = !1;
        let b = new a(new c({
            map: f,
            transparent: !0,
            depthWrite: !1,
            depthTest: !1,
            opacity: 0
        }));
        b.renderOrder = 6,
        b.scale.setScalar(n.badgeSize);
        let x = G(this.quad, n.popupMarkerSize, p);
        x.position.copy(l.dir).multiplyScalar(1.004);
        let S = new h;
        S.position.copy(u.dir),
        S.quaternion.setFromUnitVectors(new s(0,0,1), u.dir);
        let C = G(this.quad, n.popupMarkerSize, p);
        C.position.z = .004;
        let w = [];
        for (let e = 0; e < n.popupRings; e++) {
            let e = K(this.quad, n.popupPingSize, p);
            e.position.z = .05,
            w.push(e)
        }
        S.add(C, ...w);
        let T = null;
        n.popupLabels && (T = q(`${l.name} to ${u.name}`, `${d.symbol} → ${n.siteCurrency[u.name] ?? `local`}`, n.popupLabelHeight, n.popupCard),
        S.add(T),
        T.position.set(0, 0, n.popupLift + .02),
        J(T, n.badgeSize * .55, this.viewX(u) > .12)),
        this.parent.add(y, b, x, S),
        this.live.push({
            from: l,
            to: u,
            arc: y,
            points: _,
            coin: b,
            label: T,
            origin: x,
            dest: S,
            destMarker: C,
            rings: w,
            spawnedAt: t ? e - n.corridorTravelSec : e,
            leaving: null
        }),
        this.lastSpawn = e
    }
    remove(e) {
        this.parent.remove(e.arc, e.coin, e.origin, e.dest),
        e.arc.geometry.dispose(),
        e.arc.material.dispose(),
        e.coin.material.dispose(),
        e.origin.material.dispose(),
        e.destMarker.material.dispose();
        for (let t of e.rings)
            t.material.dispose();
        e.label && (e.label.material.map?.dispose(),
        e.label.material.dispose())
    }
    update(e, t, n) {
        let r = this.cfg;
        if (t > .05 && this.live.length < r.corridorVisible && e - this.lastSpawn > r.popupSpawnGapSec * 1.6 && (this.spawn(e, n),
        n))
            for (; this.live.length < r.corridorVisible; ) {
                let t = this.live.length;
                if (this.spawn(e, !0),
                this.live.length === t)
                    break
            }
        for (let i = this.live.length - 1; i >= 0; i--) {
            let a = this.live[i]
              , o = e - a.spawnedAt
              , s = ce(Math.min(1, o / r.corridorTravelSec))
              , c = U(r.popupMinFacing * .5, r.popupMinFacing, this.facing(a.to))
              , l = U(r.popupMinFacing * .4, r.popupMinFacing * .8, this.facing(a.from))
              , u = Math.min(c, Math.max(l, s));
            a.leaving === null && !n && (o > r.corridorTravelSec + r.corridorHoldSec || u < .35) && (a.leaving = e);
            let d = 1;
            if (a.leaving !== null) {
                let t = (e - a.leaving) / .5;
                if (t >= 1) {
                    this.remove(a),
                    this.live.splice(i, 1);
                    continue
                }
                d = 1 - t * t
            }
            let f = t * d * Math.max(u, .25)
              , p = s * X;
            a.arc.geometry.setDrawRange(0, Math.max(2, Math.ceil(p) + 1)),
            a.arc.material.opacity = .75 * f;
            let m = Math.min(55, Math.floor(p))
              , h = p - m;
            a.coin.position.copy(a.points[m]).lerp(a.points[m + 1], h),
            a.coin.position.multiplyScalar(1 + .015 / a.coin.position.length());
            let g = Math.min(1, o / .35);
            a.coin.scale.setScalar(Math.max(1e-4, r.badgeSize * g)),
            a.coin.material.opacity = f,
            a.origin.material.uniforms.uOpacity.value = f,
            a.destMarker.material.uniforms.uOpacity.value = f * U(.85, 1, s),
            Y(a.rings, o - r.corridorTravelSec, r.popupPingSec, f * +(s >= 1)),
            a.label && (a.label.material.opacity = f * U(.9, 1, s))
        }
    }
    dispose() {
        for (let e of this.live)
            this.remove(e);
        this.live.length = 0;
        for (let e of this.textures)
            e.dispose()
    }
}
  , ue = `// Dot-matrix sphere — one point per sample.
attribute float aLand;     // 0 = ocean, 1 = land (soft coasts in between)
attribute float aSeed;     // 0..1 per-point jitter
attribute vec3  aStart;    // where the dot starts during the assemble entrance

uniform float uPointScale;      // dpr * cameraDistance * (onScreenRadius / referenceRadius)
uniform float uLandSize;        // px
uniform float uOceanSize;       // px
uniform float uSizeMin;         // px (sizeByLight mode)
uniform float uSizeMax;         // px (sizeByLight mode)
uniform float uSizeByLight;     // 0/1
uniform float uLitInfluence;    // 0..1
uniform float uUseLand;         // 0/1
uniform float uLandOpacity;
uniform float uOceanOpacity;
uniform float uSilhouettePower;
uniform float uProgress;        // entrance 0..1
uniform float uAssemble;        // 0 = flying in from aStart, 1 = settled
uniform float uLighten;
uniform vec3  uLightDir;        // view space, normalised
uniform vec3  uColorLand;
uniform vec3  uColorOcean;
uniform vec3  uColorLand2;      // second colours, blended in by uMixMode
uniform vec3  uColorOcean2;
uniform float uMixMode;         // 0 none, 1 latitude, 2 light, 3 tide
uniform float uMixSpeed;        // tide drift, radians per second
uniform float uTime;

varying float vAlpha;
varying vec3  vColor;

void main() {
  // Assemble: each dot eases from aStart to its place with a per-dot stagger.
  float at = clamp((uAssemble - aSeed * 0.35) / 0.65, 0.0, 1.0);
  at = 1.0 - pow(1.0 - at, 3.0);
  vec3 p = mix(aStart, position, at);
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  vec3 n = normalize(normalMatrix * position);
  vec3 viewDir = normalize(-mvPosition.xyz);
  float facing = dot(n, viewDir);            // 1 at centre, 0 at the silhouette, <0 behind
  float rim = pow(clamp(facing, 0.0, 1.0), uSilhouettePower);

  // Entrance: fade in from the centre outward with a small stagger.
  float stagger = (1.0 - clamp(facing, 0.0, 1.0)) * 0.35 + aSeed * 0.1;
  float appear = smoothstep(stagger, stagger + 0.6, uProgress * 1.05);

  float land = mix(1.0, aLand, uUseLand);
  float lit = clamp(dot(n, uLightDir), 0.0, 1.0);
  float baseSize = mix(uOceanSize, uLandSize, land);
  // Halftone: dense (large) dots in shadow, fine dots toward the light.
  float litSize = mix(uSizeMax, uSizeMin, pow(lit, 0.7));
  float size = mix(baseSize, litSize, uSizeByLight) * mix(0.85 + aSeed * 0.3, 1.0, uSizeByLight);
  size *= mix(1.0, 0.55 + 0.55 * lit, uLitInfluence);
  float opacity = mix(uOceanOpacity, uLandOpacity, land);

  // Two-colour mix: by latitude (north → south), by light (shadow → lit), or a drifting diagonal band.
  float t = 0.0;
  if (uMixMode > 2.5) t = 0.5 + 0.5 * sin((mvPosition.x - mvPosition.y * 0.6) * 2.2 - uTime * uMixSpeed);
  else if (uMixMode > 1.5) t = smoothstep(0.05, 0.95, lit);
  else if (uMixMode > 0.5) t = smoothstep(-0.85, 0.85, position.y);
  vec3 base = mix(mix(uColorOcean, uColorOcean2, t), mix(uColorLand, uColorLand2, t), land);
  vColor = mix(base, vec3(1.0), lit * uLighten);
  // Dots in flight stay visible regardless of which side they will land on.
  vAlpha = opacity * mix(0.55, rim, at) * appear;

  gl_PointSize = size * mix(0.6, 1.0, at) * uPointScale / max(-mvPosition.z, 0.001) * mix(0.7 + 0.3 * rim, 1.0, uSizeByLight);
  gl_Position = projectionMatrix * mvPosition;
}
`
  , de = `precision highp float;

varying float vAlpha;
varying vec3  vColor;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  // Soft-edged disc; the 0.5 radius maps to the point's edge.
  float disc = 1.0 - smoothstep(0.32, 0.5, d);
  float a = disc * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor, a);
}
`
  , fe = `uniform float uCenterViewZ;   // planet centre in view space
varying float vDepth;         // view-space z relative to the planet centre (negative = behind)

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDepth = mv.z - uCenterViewZ;
  gl_Position = projectionMatrix * mv;
}
`
  , pe = `precision highp float;

uniform vec3  uColor;
uniform float uOpacity;
uniform float uBackFade;   // opacity multiplier when fully behind the sphere
uniform float uRadius;     // sphere radius, for scale-independent fade

varying float vDepth;

void main() {
  float behind = smoothstep(0.15 * uRadius, -0.55 * uRadius, vDepth);
  float a = uOpacity * mix(1.0, uBackFade, behind);
  gl_FragColor = vec4(uColor, a);
}
`
  , me = `varying vec3 vN;
varying vec3 vV;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`
  , he = `// Solid sphere: ink → indigo by light, fresnel rim, soft top-left highlight.
precision highp float;

uniform vec3  uColorDark;
uniform vec3  uColorLight;
uniform vec3  uColorRim;
uniform vec3  uLightDir;
uniform float uSpecular;
uniform float uProgress;

varying vec3 vN;
varying vec3 vV;

void main() {
  vec3 N = normalize(vN);
  vec3 V = normalize(vV);
  vec3 L = normalize(uLightDir);
  float lit = clamp(dot(N, L), 0.0, 1.0);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);
  vec3 col = mix(uColorDark, uColorLight, smoothstep(0.0, 1.0, lit * 0.9 + 0.08));
  col = mix(col, uColorRim, fres * 0.85);
  vec3 H = normalize(L + V);
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), 48.0) * uSpecular;
  col += spec;
  gl_FragColor = vec4(col, uProgress);
}
`
  , ge = `// Latitude / longitude hairlines on the unit sphere.
varying float vFacing;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalize(normalMatrix * position);
  vFacing = dot(n, normalize(-mv.xyz));
  gl_Position = projectionMatrix * mv;
}
`
  , _e = `precision highp float;

uniform vec3  uColor;
uniform float uOpacity;
uniform float uProgress;

varying float vFacing;

void main() {
  float a = uOpacity * smoothstep(-0.02, 0.45, vFacing) * uProgress;
  if (a <= 0.002) discard;
  gl_FragColor = vec4(uColor, a);
}
`
  , ve = `// Elevated great-circle arcs between points on the sphere; aT runs 0..1 along each arc.
attribute float aT;
attribute float aArc;

uniform float uCenterViewZ;

varying float vT;
varying float vArc;
varying float vDepth;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vT = aT;
  vArc = aArc;
  vDepth = mv.z - uCenterViewZ;
  gl_Position = projectionMatrix * mv;
}
`
  , ye = `precision highp float;

uniform vec3  uColor;
uniform vec3  uPulseColor;
uniform float uOpacity;
uniform float uPulseLength;
uniform float uTime;
uniform float uPeriod;
uniform float uProgress;

varying float vT;
varying float vArc;
varying float vDepth;

void main() {
  // Each arc's pulse is phase-shifted so they never fire together.
  float phase = fract(uTime / uPeriod + vArc * 0.37);
  float head = phase * (1.0 + uPulseLength * 2.0) - uPulseLength;
  float x = (head - vT) / uPulseLength;          // 0 at the head, 1 at the tail
  float pulse = (x >= 0.0 && x <= 1.0) ? pow(1.0 - x, 1.6) : 0.0;
  float behind = smoothstep(0.1, -0.5, vDepth);
  float base = uOpacity * mix(1.0, 0.25, behind);
  float a = (base + pulse * 0.95 * mix(1.0, 0.3, behind)) * uProgress;
  vec3 col = mix(uColor, uPulseColor, pulse);
  if (a <= 0.002) discard;
  gl_FragColor = vec4(col, min(a, 1.0));
}
`;
t.registerPlugin(e),
m.enabled = !1;
var Z = Math.PI / 180
  , Q = () => new Promise(e => {
    typeof window.requestIdleCallback == `function` ? window.requestIdleCallback( () => e(), {
        timeout: 500
    }) : window.setTimeout(e, 16)
}
)
  , be = (e, t, n) => {
    let r = Math.min(1, Math.max(0, (n - e) / (t - e)));
    return r * r * (3 - 2 * r)
}
  , $ = e => {
    let t = e * 7919 + 1 >>> 0;
    return () => (t = t * 1664525 + 1013904223 >>> 0,
    t / 4294967296)
}
  , xe = class {
    renderer;
    scene = new i;
    camera;
    cfg;
    opts;
    clock = new T(!1);
    root = new h;
    tilt = new h;
    spinner = new h;
    dots;
    glow = null;
    shadow = null;
    outline = null;
    halo = null;
    shell = null;
    lattice = null;
    arcs = null;
    rings = [];
    popups = null;
    quad = new N(1,1);
    state = {
        glow: 0,
        dots: 0,
        assemble: 0,
        spin: 1,
        scale: .92,
        halo: 0,
        ring0: 0,
        ring1: 0,
        ring2: 0,
        nodes: 0
    };
    entrance = null;
    scrollTrigger = null;
    scrollProgress = 0;
    basePosition = new s;
    drift = new b;
    raf = 0;
    running = !1;
    disposed = !1;
    hostVisible = !0;
    resizeTimer = 0;
    resizeObserver = null;
    intersection = null;
    entranceStarted = !1;
    tmpV3 = new s;
    constructor(e) {
        this.opts = {
            scroll: !0,
            variant: null,
            theme: `light`,
            ...e
        },
        this.cfg = n(this.opts.variant, this.opts.theme);
        let {canvas: t} = this.opts
          , r = performance.now();
        this.renderer = new k({
            canvas: t,
            alpha: !0,
            antialias: !0,
            premultipliedAlpha: !0,
            powerPreference: `high-performance`
        }),
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.cfg.maxPixelRatio)),
        this.renderer.setClearColor(0, 0),
        this.renderer.outputColorSpace = d,
        performance.measure(`planet:context`, {
            start: r,
            end: performance.now()
        }),
        this.camera = new p(this.cfg.cameraFovDeg,1,.1,100),
        this.scene.add(this.root),
        this.root.add(this.tilt),
        this.tilt.rotation.z = -this.cfg.axisTiltDeg * Z,
        this.tilt.add(this.spinner),
        this.buildBackdrop(),
        this.buildOccluder(),
        this.ready = this.init()
    }
    ready;
    compiled = !1;
    async init() {
        let e = (e, t) => {
            let n = performance.now();
            t(),
            performance.measure(`planet:${e}`, {
                start: n,
                end: performance.now()
            })
        }
        ;
        if (await Q(),
        this.disposed)
            return;
        let[t,n] = this.cfg.landMaskSize
          , r = null;
        if (this.cfg.useLandMask) {
            if (this.cfg.landMaskSource === `image`) {
                let e = performance.now();
                r = await ne(this.cfg.landMaskUrl).catch( () => null),
                performance.measure(`planet:mask`, {
                    start: e,
                    end: performance.now()
                })
            }
            if (r || e(`mask`, () => {
                r = ee(t, n, this.cfg.landCoverage, this.cfg.landMaskSeed, this.cfg.landMaskFrequency)
            }
            ),
            await Q(),
            this.disposed)
                return
        }
        if (e(`dots`, () => this.buildDots(r)),
        await Q(),
        this.disposed)
            return;
        e(`rings`, () => {
            this.cfg.shell && this.buildShell(),
            this.cfg.lattice && this.buildLattice(),
            this.cfg.arcs && this.buildArcs(),
            this.buildRings(),
            this.cfg.coinMode === `popup` && (this.popups = new se(this.cfg,this.spinner,this.camera,this.quad)),
            this.cfg.coinMode === `corridor` && (this.popups = new le(this.cfg,this.spinner,this.camera,this.quad)),
            this.layout(),
            this.attach(),
            this.opts.reducedMotion ? this.setStaticPose() : this.applyState()
        }
        );
        let i = performance.now();
        if (await this.renderer.compileAsync(this.scene, this.camera).catch( () => void 0),
        performance.measure(`planet:compile`, {
            start: i,
            end: performance.now()
        }),
        !this.disposed) {
            if (this.compiled = !0,
            this.opts.reducedMotion) {
                e(`firstFrame`, () => this.renderOnce());
                return
            }
            await Q(),
            !this.disposed && (e(`firstFrame`, () => this.renderOnce()),
            this.updateRunning(),
            await (document.fonts?.ready ?? Promise.resolve()),
            this.disposed || this.playEntrance())
        }
    }
    billboard(e, t, n={}) {
        let r = new j(this.quad,new M({
            vertexShader: B,
            fragmentShader: e,
            uniforms: {
                uSize: {
                    value: 1
                },
                uAspect: {
                    value: 1
                },
                ...t
            },
            transparent: !0,
            depthWrite: !1,
            ...n
        }));
        return r.frustumCulled = !1,
        r
    }
    buildBackdrop() {
        let e = this.cfg;
        if (e.glow && (this.glow = this.billboard(V, {
            uSize: {
                value: e.glowScale
            },
            uColor: {
                value: new O(e.colorAccent)
            },
            uOpacity: {
                value: 0
            },
            uInner: {
                value: e.glowInner
            },
            uFalloff: {
                value: e.glowFalloff
            }
        }, {
            depthTest: !1,
            blending: e.glowAdditive ? 2 : 1
        }),
        this.glow.position.z = -.3,
        this.glow.renderOrder = -2,
        this.root.add(this.glow)),
        e.body) {
            let t = this.billboard(V, {
                uSize: {
                    value: 2.02
                },
                uColor: {
                    value: new O(e.bodyColor)
                },
                uOpacity: {
                    value: e.bodyOpacity
                },
                uInner: {
                    value: e.bodyEdge
                },
                uFalloff: {
                    value: 1
                }
            }, {
                depthTest: !1
            });
            t.position.z = -.05,
            t.renderOrder = -1,
            this.root.add(t)
        }
        if (e.shadow && (this.shadow = this.billboard(V, {
            uSize: {
                value: e.shadowWidth
            },
            uAspect: {
                value: e.shadowAspect
            },
            uColor: {
                value: new O(e.colorInk)
            },
            uOpacity: {
                value: 0
            },
            uInner: {
                value: 0
            },
            uFalloff: {
                value: 2.2
            }
        }, {
            depthTest: !1
        }),
        this.shadow.position.set(.05, e.shadowOffsetY, -.2),
        this.shadow.renderOrder = -1,
        this.root.add(this.shadow)),
        e.halo) {
            let t = e.haloRadius * 2 * 1.04;
            this.halo = this.billboard(H, {
                uSize: {
                    value: t
                },
                uColor: {
                    value: new O(e.haloColor)
                },
                uOpacity: {
                    value: e.haloOpacity
                },
                uRadius: {
                    value: e.haloRadius / t
                },
                uWidth: {
                    value: .002
                },
                uSweep: {
                    value: 0
                },
                uStart: {
                    value: e.haloStartDeg * Z
                },
                uPulse: {
                    value: 0
                },
                uPulseLen: {
                    value: 0
                },
                uPulseColor: {
                    value: new O(e.haloPulseColor)
                }
            }, {
                depthTest: !1
            }),
            this.halo.renderOrder = -1,
            this.root.add(this.halo)
        }
        e.outline && (this.outline = this.billboard(H, {
            uSize: {
                value: 2.08
            },
            uColor: {
                value: new O(e.outlineColor)
            },
            uOpacity: {
                value: 0
            },
            uRadius: {
                value: 1 / 2.08
            },
            uWidth: {
                value: .003
            },
            uSweep: {
                value: 1
            },
            uStart: {
                value: 0
            },
            uPulse: {
                value: 0
            },
            uPulseLen: {
                value: 0
            },
            uPulseColor: {
                value: new O(e.outlineColor)
            }
        }, {
            depthTest: !1
        }),
        this.outline.renderOrder = 5,
        this.root.add(this.outline))
    }
    buildOccluder() {
        let e = new j(new o(this.cfg.occluderRadius,48,32),new P({
            colorWrite: !1
        }));
        e.renderOrder = 0,
        this.root.add(e)
    }
    buildShell() {
        let e = this.cfg;
        this.shell = new j(new o(.992,96,64),new M({
            vertexShader: me,
            fragmentShader: he,
            uniforms: {
                uColorDark: {
                    value: new O(e.shellColorDark)
                },
                uColorLight: {
                    value: new O(e.shellColorLight)
                },
                uColorRim: {
                    value: new O(e.shellColorRim)
                },
                uLightDir: {
                    value: new s(...e.lightDirection).normalize()
                },
                uSpecular: {
                    value: e.shellSpecular
                },
                uProgress: {
                    value: 0
                }
            },
            transparent: !0
        })),
        this.shell.renderOrder = 1,
        this.spinner.add(this.shell)
    }
    buildDots(e) {
        let t = this.cfg
          , n = typeof window < `u` && window.matchMedia(`(max-width: 720px)`).matches
          , r = this.opts.layout === `mobile` || n ? t.pointCountMobile : t.pointCountDesktop
          , i = [];
        if (t.pointLayout === `grid`) {
            let e = Math.sqrt(4 * Math.PI / r)
              , t = Math.max(8, Math.round(Math.PI / e));
            for (let n = 0; n < t; n++) {
                let r = -Math.PI / 2 + (n + .5) / t * Math.PI
                  , a = Math.cos(r)
                  , o = Math.max(1, Math.round(2 * Math.PI * a / e))
                  , s = n % 2 * .5;
                for (let e = 0; e < o; e++) {
                    let t = (e + s) / o * Math.PI * 2;
                    i.push(a * Math.cos(t), Math.sin(r), a * Math.sin(t))
                }
            }
        } else {
            let e = Math.PI * (3 - Math.sqrt(5));
            for (let t = 0; t < r; t++) {
                let n = 1 - t / (r - 1) * 2
                  , a = Math.sqrt(Math.max(0, 1 - n * n))
                  , o = e * t;
                i.push(Math.cos(o) * a, n, Math.sin(o) * a)
            }
        }
        let a = i.length / 3
          , o = new Float32Array(i)
          , c = new Float32Array(a)
          , d = new Float32Array(a)
          , f = $(t.landMaskSeed);
        for (let n = 0; n < a; n++) {
            let r = o[n * 3]
              , i = o[n * 3 + 1]
              , a = o[n * 3 + 2];
            c[n] = e ? be(e.threshold - t.coastSoftness, e.threshold + t.coastSoftness, te(e, r, i, a)) : 1,
            d[n] = f()
        }
        let p = new Float32Array(a * 3)
          , m = t.assembleSwirlDeg * Z;
        for (let e = 0; e < a; e++) {
            let n = o[e * 3]
              , r = o[e * 3 + 1]
              , i = o[e * 3 + 2]
              , a = 1 + t.assembleSpread * (.4 + d[e] * .6)
              , s = m * (.5 + d[e]) * (r > 0 ? 1 : -1)
              , c = Math.cos(s)
              , l = Math.sin(s);
            p[e * 3] = (n * c + i * l) * a,
            p[e * 3 + 1] = r * a * 1.3 + (d[e] - .5) * .6,
            p[e * 3 + 2] = (-n * l + i * c) * a
        }
        let h = new D;
        h.setAttribute(`position`, new w(o,3)),
        h.setAttribute(`aLand`, new w(c,1)),
        h.setAttribute(`aSeed`, new w(d,1)),
        h.setAttribute(`aStart`, new w(p,3)),
        h.boundingSphere = new u(new s,1 + t.assembleSpread);
        let g = new s(...t.lightDirection).normalize()
          , _ = new M({
            vertexShader: ue,
            fragmentShader: de,
            uniforms: {
                uPointScale: {
                    value: 1
                },
                uLandSize: {
                    value: t.landPointSizePx
                },
                uOceanSize: {
                    value: t.oceanPointSizePx
                },
                uSizeMin: {
                    value: t.sizeMinPx
                },
                uSizeMax: {
                    value: t.sizeMaxPx
                },
                uSizeByLight: {
                    value: +!!t.sizeByLight
                },
                uLitInfluence: {
                    value: t.litInfluence
                },
                uUseLand: {
                    value: +!!e
                },
                uLandOpacity: {
                    value: t.landOpacity
                },
                uOceanOpacity: {
                    value: t.oceanOpacity
                },
                uSilhouettePower: {
                    value: t.silhouettePower
                },
                uProgress: {
                    value: 0
                },
                uAssemble: {
                    value: 1
                },
                uLighten: {
                    value: t.lightenAmount
                },
                uLightDir: {
                    value: g
                },
                uColorLand: {
                    value: new O(t.colorPlanet)
                },
                uColorOcean: {
                    value: new O(t.colorOcean)
                },
                uColorLand2: {
                    value: new O(t.colorPlanet2)
                },
                uColorOcean2: {
                    value: new O(t.colorOcean2)
                },
                uMixMode: {
                    value: {
                        none: 0,
                        latitude: 1,
                        light: 2,
                        tide: 3
                    }[t.dotMix]
                },
                uMixSpeed: {
                    value: t.dotMixSpeed
                },
                uTime: {
                    value: 0
                }
            },
            transparent: !0,
            depthWrite: !1
        });
        this.dots = new l(h,_),
        this.dots.renderOrder = 2,
        this.dots.frustumCulled = !1,
        t.shell && this.dots.scale.setScalar(1.006),
        this.spinner.add(this.dots)
    }
    buildLattice() {
        let e = this.cfg
          , t = []
          , n = (e, n) => t.push(e.x, e.y, e.z, n.x, n.y, n.z)
          , r = e.latticeStepDeg * Z;
        for (let e = -Math.PI / 2 + r; e < Math.PI / 2 - 1e-6; e += r) {
            let t = Math.cos(e)
              , r = Math.sin(e);
            for (let e = 0; e < 96; e++) {
                let i = e / 96 * Math.PI * 2
                  , a = (e + 1) / 96 * Math.PI * 2;
                n(new s(t * Math.cos(i),r,t * Math.sin(i)), new s(t * Math.cos(a),r,t * Math.sin(a)))
            }
        }
        for (let e = 0; e < Math.PI * 2 - 1e-6; e += r)
            for (let t = 0; t < 96; t++) {
                let r = -Math.PI / 2 + t / 96 * Math.PI
                  , i = -Math.PI / 2 + (t + 1) / 96 * Math.PI;
                n(new s(Math.cos(r) * Math.cos(e),Math.sin(r),Math.cos(r) * Math.sin(e)), new s(Math.cos(i) * Math.cos(e),Math.sin(i),Math.cos(i) * Math.sin(e)))
            }
        let i = new D;
        i.setAttribute(`position`, new A(t,3)),
        i.boundingSphere = new u(new s,1),
        this.lattice = new C(i,new M({
            vertexShader: ge,
            fragmentShader: _e,
            uniforms: {
                uColor: {
                    value: new O(e.latticeColor)
                },
                uOpacity: {
                    value: e.latticeOpacity
                },
                uProgress: {
                    value: 0
                }
            },
            transparent: !0,
            depthWrite: !1
        })),
        this.lattice.renderOrder = 1,
        this.spinner.add(this.lattice)
    }
    buildArcs() {
        let e = this.cfg
          , t = $(e.arcSeed)
          , n = () => {
            let e = t() * 1.6 - .8
              , n = Math.sqrt(1 - e * e)
              , r = t() * Math.PI * 2;
            return new s(n * Math.cos(r),e,n * Math.sin(r))
        }
          , r = []
          , i = []
          , a = []
          , o = 0
          , c = 0;
        for (; o < e.arcCount && c++ < 200; ) {
            let s = n()
              , c = n()
              , l = s.angleTo(c);
            if (l < 40 * Z || l > 125 * Z)
                continue;
            let u = e.arcLift * (.7 + t() * .6)
              , d = null;
            for (let e = 0; e <= 48; e++) {
                let t = e / 48
                  , n = s.clone().lerp(c, t).normalize().multiplyScalar(1.004 + Math.sin(t * Math.PI) * u);
                d && (r.push(d.x, d.y, d.z, n.x, n.y, n.z),
                i.push((e - 1) / 48, t),
                a.push(o, o)),
                d = n
            }
            o++
        }
        let l = new D;
        l.setAttribute(`position`, new A(r,3)),
        l.setAttribute(`aT`, new A(i,1)),
        l.setAttribute(`aArc`, new A(a,1)),
        l.boundingSphere = new u(new s,1.5),
        this.arcs = new C(l,new M({
            vertexShader: ve,
            fragmentShader: ye,
            uniforms: {
                uCenterViewZ: {
                    value: 0
                },
                uColor: {
                    value: new O(e.arcColor)
                },
                uPulseColor: {
                    value: new O(e.arcPulseColor)
                },
                uOpacity: {
                    value: e.arcOpacity
                },
                uPulseLength: {
                    value: e.arcPulseLength
                },
                uTime: {
                    value: 0
                },
                uPeriod: {
                    value: e.arcPulsePeriodSec
                },
                uProgress: {
                    value: 0
                }
            },
            transparent: !0,
            depthWrite: !1
        })),
        this.arcs.renderOrder = 3,
        this.spinner.add(this.arcs)
    }
    buildRings() {
        let e = this.cfg;
        for (let t = 0; t < e.ringRadii.length; t++) {
            let n = e.ringRadii[t]
              , i = new S(0,0,n,n,0,Math.PI * 2,!1,0).getPoints(e.ringSegments).map(e => new s(e.x,0,e.y));
            i.pop();
            let o = new f(i,!0,`catmullrom`,.5)
              , l = new r(o,e.ringSegments,e.ringTubeRadius,6,!0)
              , u = new M({
                vertexShader: fe,
                fragmentShader: pe,
                uniforms: {
                    uCenterViewZ: {
                        value: 0
                    },
                    uColor: {
                        value: new O(e.colorRing)
                    },
                    uOpacity: {
                        value: e.ringOpacity
                    },
                    uBackFade: {
                        value: e.ringBackFade
                    },
                    uRadius: {
                        value: 1
                    }
                },
                transparent: !0,
                depthWrite: !1
            })
              , d = new j(l,u);
            d.renderOrder = 1,
            d.frustumCulled = !1;
            let p = l.index.count;
            l.setDrawRange(0, 0);
            let m = new h;
            m.rotation.set(e.ringInclinationsDeg[t] * Z, (e.ringAzimuthsDeg[t] ?? 0) * Z, (e.ringRollsDeg[t] ?? 0) * Z, `ZYX`),
            d.visible = e.ringsVisible,
            m.add(d);
            let g = e.coinMode === `orbit` ? e.coins.filter( (n, r) => r % e.ringRadii.length === t) : []
              , _ = g.map( (t, n) => {
                let r = z(t, e.badgeTexturePx)
                  , i = new a(new c({
                    map: r,
                    transparent: !0,
                    opacity: 0,
                    depthWrite: !1
                }));
                i.scale.setScalar(1e-4),
                i.renderOrder = 4,
                m.add(i);
                let o = [];
                for (let n = 0; n < e.nodeTrailLength; n++) {
                    let n = this.billboard(V, {
                        uSize: {
                            value: e.nodeTrailSize
                        },
                        uColor: {
                            value: new O(t.color)
                        },
                        uOpacity: {
                            value: 0
                        },
                        uInner: {
                            value: 0
                        },
                        uFalloff: {
                            value: 1.6
                        }
                    });
                    n.renderOrder = 3,
                    m.add(n),
                    o.push(n)
                }
                return {
                    sprite: i,
                    phase: n / Math.max(1, g.length) % 1,
                    trail: o
                }
            }
            );
            this.root.add(m),
            this.rings.push({
                pivot: m,
                mesh: d,
                curve: o,
                indexCount: p,
                indexStep: 36,
                badges: _
            })
        }
    }
    layout() {
        let e = this.cfg
          , {canvas: t, host: n, layout: r} = this.opts
          , i = n.getBoundingClientRect()
          , a = t.getBoundingClientRect()
          , o = Math.max(1, Math.round(a.width))
          , s = Math.max(1, Math.round(a.height));
        this.renderer.setSize(o, s, !1);
        let c = r === `mobile` ? e.mobileSphereDiameterFraction : r === `tablet` ? e.tabletSphereDiameterFraction : r === `capture` ? e.captureSphereDiameterFraction : e.sphereDiameterFraction
          , l = o / s
          , u = 2 / c
          , d = u / 2 / Math.tan(e.cameraFovDeg * Z / 2);
        this.camera.aspect = l,
        this.camera.position.z = d,
        this.camera.updateProjectionMatrix();
        let f = u * l, p, m;
        r === `mobile` || r === `capture` ? (p = r === `mobile` ? e.mobilePlanetCenterX : .5,
        m = .5) : (p = ((r === `tablet` ? e.tabletPlanetCenterX : e.planetCenterX) * i.width - (a.left - i.left)) / a.width,
        m = (e.planetCenterY * i.height - (a.top - i.top)) / a.height),
        this.basePosition.set((p - .5) * f, (.5 - m) * u, 0),
        this.drift.set(i.width / a.width * f * e.scrollDriftFraction, -(i.height / a.height) * u * e.scrollDriftFraction),
        this.applyScroll();
        let h = c * s / 2
          , g = this.renderer.getPixelRatio();
        this.dots && (this.dots.material.uniforms.uPointScale.value = g * d * (h / e.referenceSphereRadiusPx)),
        this.outline && (this.outline.material.uniforms.uWidth.value = e.outlineWidthPx / h / 2.08),
        this.halo && (this.halo.material.uniforms.uWidth.value = e.haloWidthPx / h / (e.haloRadius * 2 * 1.04))
    }
    applyScroll() {
        let e = this.scrollProgress;
        this.root.position.set(this.basePosition.x + this.drift.x * e, this.basePosition.y + this.drift.y * e, 0),
        this.opts.canvas.style.opacity = String(1 - e)
    }
    attach() {
        let t = this.cfg
          , {host: n, canvas: r, reducedMotion: i, scroll: a} = this.opts;
        this.resizeObserver = new ResizeObserver( () => {
            window.clearTimeout(this.resizeTimer),
            this.resizeTimer = window.setTimeout( () => {
                this.disposed || (this.layout(),
                this.compiled && !this.running && this.renderOnce())
            }
            , t.resizeDebounceMs)
        }
        ),
        this.resizeObserver.observe(n),
        r.parentElement && r.parentElement !== n && this.resizeObserver.observe(r.parentElement),
        !i && (this.intersection = new IntersectionObserver(e => {
            this.hostVisible = e.some(e => e.isIntersecting),
            this.updateRunning()
        }
        ,{
            threshold: 0
        }),
        this.intersection.observe(n),
        document.addEventListener(`visibilitychange`, this.onVisibility),
        a && (this.scrollTrigger = e.create({
            trigger: n,
            start: `top top`,
            end: `bottom top`,
            scrub: !0,
            onUpdate: e => {
                this.scrollProgress = e.progress,
                this.applyScroll()
            }
        })))
    }
    onVisibility = () => this.updateRunning();
    updateRunning() {
        this.compiled && !this.disposed && !this.opts.reducedMotion && this.hostVisible && document.visibilityState !== `hidden` ? this.start() : this.stop()
    }
    start() {
        this.running || this.disposed || (this.running = !0,
        this.clock.start(),
        this.raf = requestAnimationFrame(this.tick))
    }
    stop() {
        this.running && (this.running = !1,
        this.clock.stop(),
        cancelAnimationFrame(this.raf))
    }
    tick = () => {
        this.running && (this.raf = requestAnimationFrame(this.tick),
        this.clock.getDelta(),
        this.update(this.clock.elapsedTime),
        this.renderer.render(this.scene, this.camera))
    }
    ;
    renderOnce() {
        this.update(this.opts.reducedMotion ? 0 : this.clock.elapsedTime),
        this.renderer.render(this.scene, this.camera)
    }
    playEntrance() {
        if (this.entranceStarted)
            return;
        this.entranceStarted = !0;
        let e = this.cfg.entranceTotalSec / 1.8
          , n = t.timeline({
            defaults: {
                ease: `power2.out`
            }
        })
          , r = this.cfg;
        if (r.assemble) {
            n.to(this.state, {
                dots: 1,
                duration: .6
            }, 0).to(this.state, {
                assemble: 1,
                duration: r.assembleSec,
                ease: `power2.inOut`
            }, 0).to(this.state, {
                spin: 0,
                duration: r.assembleSec * 1.15,
                ease: `power3.out`
            }, 0).to(this.state, {
                scale: 1,
                duration: r.assembleSec,
                ease: `power2.out`
            }, 0).to(this.state, {
                glow: 1,
                duration: .9
            }, r.assembleSec * .55).to(this.state, {
                halo: 1,
                duration: r.haloSweepSec,
                ease: `power2.inOut`
            }, r.assembleSec * .45),
            n.to(this.state, {
                ring0: 1,
                duration: .7 * e
            }, r.assembleSec * .6).to(this.state, {
                ring1: 1,
                duration: .7 * e
            }, r.assembleSec * .6 + .12).to(this.state, {
                ring2: 1,
                duration: .7 * e
            }, r.assembleSec * .6 + .24).to(this.state, {
                nodes: 1,
                duration: .5 * e,
                ease: `power2.out`
            }, r.assembleSec * .75),
            this.entrance = n;
            return
        }
        this.state.assemble = 1,
        this.state.spin = 0,
        n.to(this.state, {
            glow: 1,
            duration: .7 * e
        }, 0).to(this.state, {
            halo: 1,
            duration: r.haloSweepSec,
            ease: `power2.inOut`
        }, .3 * e).to(this.state, {
            scale: 1,
            duration: 1.2 * e
        }, .1 * e).to(this.state, {
            dots: 1,
            duration: 1.2 * e
        }, .1 * e).to(this.state, {
            ring0: 1,
            duration: .7 * e
        }, .75 * e).to(this.state, {
            ring1: 1,
            duration: .7 * e
        }, .87 * e).to(this.state, {
            ring2: 1,
            duration: .7 * e
        }, .99 * e).to(this.state, {
            nodes: 1,
            duration: .4 * e,
            ease: `back.out(2)`
        }, 1.4 * e),
        this.entrance = n
    }
    replayEntrance() {
        this.disposed || this.opts.reducedMotion || !this.compiled || (this.entrance?.kill(),
        t.killTweensOf(this.state),
        Object.assign(this.state, {
            glow: 0,
            dots: 0,
            assemble: 0,
            spin: 1,
            scale: .92,
            halo: 0,
            ring0: 0,
            ring1: 0,
            ring2: 0,
            nodes: 0
        }),
        this.entranceStarted = !1,
        this.playEntrance())
    }
    setStaticPose() {
        Object.assign(this.state, {
            glow: 1,
            dots: 1,
            assemble: 1,
            spin: 0,
            scale: 1,
            halo: 1,
            ring0: 1,
            ring1: 1,
            ring2: 1,
            nodes: 1
        })
    }
    applyState() {
        let e = this.cfg
          , t = this.state;
        this.glow && (this.glow.material.uniforms.uOpacity.value = e.glowOpacity * t.glow),
        this.shadow && (this.shadow.material.uniforms.uOpacity.value = e.shadowOpacity * t.glow),
        this.outline && (this.outline.material.uniforms.uOpacity.value = e.outlineOpacity * t.dots),
        this.halo && (this.halo.material.uniforms.uSweep.value = t.halo),
        this.shell && (this.shell.material.uniforms.uProgress.value = t.dots),
        this.lattice && (this.lattice.material.uniforms.uProgress.value = t.dots),
        this.arcs && (this.arcs.material.uniforms.uProgress.value = t.nodes),
        this.dots.material.uniforms.uProgress.value = t.dots,
        this.dots.material.uniforms.uAssemble.value = t.assemble,
        this.spinner.scale.setScalar(t.scale);
        let n = [t.ring0, t.ring1, t.ring2];
        this.rings.forEach( (e, t) => {
            let r = n[t] ?? 1
              , i = Math.floor(e.indexCount * r / e.indexStep) * e.indexStep;
            e.mesh.geometry.setDrawRange(0, i)
        }
        )
    }
    update(e) {
        this.dots && (this.dots.material.uniforms.uTime.value = e);
        let t = this.cfg;
        this.applyState(),
        this.spinner.rotation.y = t.staticRotationDeg * Z + e * Math.PI * 2 / t.rotationPeriodSec - this.state.spin * t.entranceSpinDeg * Z,
        this.camera.updateMatrixWorld(),
        this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert(),
        this.root.updateMatrixWorld();
        let n = this.tmpV3.setFromMatrixPosition(this.root.matrixWorld).applyMatrix4(this.camera.matrixWorldInverse).z;
        if (this.halo && t.haloLoop) {
            let n = this.halo.material.uniforms;
            n.uPulseLen.value = t.haloPulseLength * Math.max(0, (this.state.halo - .85) / .15),
            n.uPulse.value = e / t.haloLoopPeriodSec % 1
        }
        this.arcs && (this.arcs.material.uniforms.uCenterViewZ.value = n,
        this.arcs.material.uniforms.uTime.value = e);
        let r = this.state.nodes;
        this.popups && (this.spinner.updateMatrixWorld(),
        this.popups.update(e, r, this.opts.reducedMotion)),
        this.rings.forEach( (i, a) => {
            i.mesh.material.uniforms.uCenterViewZ.value = n;
            let o = t.nodePeriodsSec[a] ?? 20;
            for (let a of i.badges) {
                let s = (a.phase + e / o) % 1;
                i.curve.getPointAt(s, a.sprite.position),
                a.sprite.updateMatrixWorld();
                let c = be(.15, -.55, this.tmpV3.setFromMatrixPosition(a.sprite.matrixWorld).applyMatrix4(this.camera.matrixWorldInverse).z - n)
                  , l = r * (1 - c * (1 - t.nodeBackFade));
                a.sprite.material.opacity = l,
                a.sprite.scale.setScalar(Math.max(1e-4, t.badgeSize * r));
                let u = a.trail.length;
                for (let e = 0; e < u; e++) {
                    let n = a.trail[e]
                      , c = (e + 1) / u * (t.nodeTrailSpan / o);
                    i.curve.getPointAt(((s - c) % 1 + 1) % 1, n.position);
                    let d = 1 - (e + 1) / (u + 1);
                    n.material.uniforms.uOpacity.value = t.nodeTrailOpacity * d * l,
                    n.material.uniforms.uSize.value = t.nodeTrailSize * (.5 + .5 * d) * r
                }
            }
        }
        )
    }
    get isRunning() {
        return this.running
    }
    get isDisposed() {
        return this.disposed
    }
    info() {
        let {memory: n, render: r, programs: i} = this.renderer.info;
        return {
            variant: this.cfg.variant,
            geometries: n.geometries,
            textures: n.textures,
            programs: i?.length ?? 0,
            calls: r.calls,
            points: r.points,
            triangles: r.triangles,
            scrollTriggers: e.getAll().length,
            activeTweens: t.getTweensOf(this.state).length
        }
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = !0,
        this.stop(),
        window.clearTimeout(this.resizeTimer),
        this.entrance?.kill(),
        this.entrance = null,
        this.scrollTrigger?.kill(),
        this.scrollTrigger = null,
        t.killTweensOf(this.state),
        this.resizeObserver?.disconnect(),
        this.intersection?.disconnect(),
        document.removeEventListener(`visibilitychange`, this.onVisibility),
        this.opts.canvas.style.opacity = ``;
        let e = new Set;
        this.scene.traverse(t => {
            let n = t;
            n.geometry && !e.has(n.geometry) && (e.add(n.geometry),
            n.geometry.dispose());
            let r = Array.isArray(n.material) ? n.material : n.material ? [n.material] : [];
            for (let t of r)
                if (!e.has(t)) {
                    e.add(t);
                    for (let e of Object.values(t.uniforms ?? {}))
                        e.value instanceof x && e.value.dispose();
                    t.map?.dispose(),
                    t.dispose()
                }
        }
        ),
        this.popups?.dispose(),
        this.popups = null,
        this.quad.dispose(),
        this.scene.clear(),
        this.renderer.renderLists.dispose(),
        this.renderer.dispose()
    }
}
;
export {xe as PlanetScene};
