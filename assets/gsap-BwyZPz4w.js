import {n as e} from "./rolldown-runtime-BpQH8Ho1.js";
var t = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
  , n = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
  , r = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
  , i = /(^[#\.][a-z]|[a-y][a-z])/i
  , a = Math.PI / 180
  , o = 180 / Math.PI
  , s = Math.sin
  , c = Math.cos
  , l = Math.abs
  , u = Math.sqrt
  , d = Math.atan2
  , f = 1e8
  , p = function(e) {
    return typeof e == `string`
}
  , m = function(e) {
    return typeof e == `number`
}
  , h = function(e) {
    return e === void 0
}
  , g = {}
  , _ = {}
  , v = 1e5
  , y = function(e) {
    return Math.round((e + f) % 1 * v) / v || (e < 0 ? 0 : 1)
}
  , b = function(e) {
    return Math.round(e * v) / v || 0
}
  , x = function(e) {
    return Math.round(e * 1e10) / 1e10 || 0
}
  , S = function(e) {
    return e.closed = Math.abs(e[0] - e[e.length - 2]) < .001 && Math.abs(e[1] - e[e.length - 1]) < .001
}
  , C = function(e, t, n, r) {
    var i = e[t]
      , a = r === 1 ? 6 : ie(i, n, r);
    if ((a || !r) && a + n + 2 < i.length)
        return e.splice(t, 0, i.slice(0, n + a + 2)),
        i.splice(0, n + a),
        1
}
  , w = function(e, t, n) {
    var r = e.length
      , i = ~~(n * r);
    if (e[i] > t) {
        for (; --i && e[i] > t; )
            ;
        i < 0 && (i = 0)
    } else
        for (; e[++i] < t && i < r; )
            ;
    return i < r ? i : r - 1
}
  , T = function(e, t) {
    var n = e.length;
    for (t || e.reverse(); n--; )
        e[n].reversed || A(e[n])
}
  , E = function(e, t) {
    return t.totalLength = e.totalLength,
    e.samples ? (t.samples = e.samples.slice(0),
    t.lookup = e.lookup.slice(0),
    t.minLength = e.minLength,
    t.resolution = e.resolution) : e.totalPoints && (t.totalPoints = e.totalPoints),
    t
}
  , D = function(e, t) {
    var n = e.length
      , r = e[n - 1] || []
      , i = r.length;
    n && t[0] === r[i - 2] && t[1] === r[i - 1] && (t = r.concat(t.slice(2)),
    n--),
    e[n] = t
};
function O(e) {
    e = p(e) && i.test(e) && document.querySelector(e) || e;
    var t = e.getAttribute ? e : 0, n;
    return t && (e = e.getAttribute(`d`)) ? (t._gsPath ||= {},
    n = t._gsPath[e],
    n && !n._dirty ? n : t._gsPath[e] = se(e)) : e ? p(e) ? se(e) : m(e[0]) ? [e] : e : console.warn(`Expecting a <path> element or an SVG path data string`)
}
function k(e) {
    for (var t = [], n = 0; n < e.length; n++)
        t[n] = E(e[n], e[n].slice(0));
    return E(e, t)
}
function A(e) {
    var t = 0, n;
    for (e.reverse(); t < e.length; t += 2)
        n = e[t],
        e[t] = e[t + 1],
        e[t + 1] = n;
    e.reversed = !e.reversed
}
var j = function(e, t) {
    var n = document.createElementNS(`http://www.w3.org/2000/svg`, `path`), r = [].slice.call(e.attributes), i = r.length, a;
    for (t = `,` + t + `,`; --i > -1; )
        a = r[i].nodeName.toLowerCase(),
        t.indexOf(`,` + a + `,`) < 0 && n.setAttributeNS(null, a, r[i].nodeValue);
    return n
}
  , M = {
    rect: `rx,ry,x,y,width,height`,
    circle: `r,cx,cy`,
    ellipse: `rx,ry,cx,cy`,
    line: `x1,x2,y1,y2`
}
  , N = function(e, t) {
    for (var n = t ? t.split(`,`) : [], r = {}, i = n.length; --i > -1; )
        r[n[i]] = +e.getAttribute(n[i]) || 0;
    return r
};
function P(e, t) {
    var r = e.tagName.toLowerCase(), i = .552284749831, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E;
    return r === `path` || !e.getBBox ? e : (u = j(e, `x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points`),
    E = N(e, M[r]),
    r === `rect` ? (c = E.rx,
    l = E.ry || c,
    o = E.x,
    s = E.y,
    m = E.width - c * 2,
    h = E.height - l * 2,
    c || l ? (g = o + c * (1 - i),
    _ = o + c,
    v = _ + m,
    y = v + c * i,
    b = v + c,
    x = s + l * (1 - i),
    S = s + l,
    C = S + h,
    w = C + l * i,
    T = C + l,
    a = `M` + b + `,` + S + ` V` + C + ` C` + [b, w, y, T, v, T, v - (v - _) / 3, T, _ + (v - _) / 3, T, _, T, g, T, o, w, o, C, o, C - (C - S) / 3, o, S + (C - S) / 3, o, S, o, x, g, s, _, s, _ + (v - _) / 3, s, v - (v - _) / 3, s, v, s, y, s, b, x, b, S].join(`,`) + `z`) : a = `M` + (o + m) + `,` + s + ` v` + h + ` h` + -m + ` v` + -h + ` h` + m + `z`) : r === `circle` || r === `ellipse` ? (r === `circle` ? (c = l = E.r,
    f = c * i) : (c = E.rx,
    l = E.ry,
    f = l * i),
    o = E.cx,
    s = E.cy,
    d = c * i,
    a = `M` + (o + c) + `,` + s + ` C` + [o + c, s + f, o + d, s + l, o, s + l, o - d, s + l, o - c, s + f, o - c, s, o - c, s - f, o - d, s - l, o, s - l, o + d, s - l, o + c, s - f, o + c, s].join(`,`) + `z`) : r === `line` ? a = `M` + E.x1 + `,` + E.y1 + ` L` + E.x2 + `,` + E.y2 : (r === `polyline` || r === `polygon`) && (p = (e.getAttribute(`points`) + ``).match(n) || [],
    o = p.shift(),
    s = p.shift(),
    a = `M` + o + `,` + s + ` L` + p.join(`,`),
    r === `polygon` && (a += `,` + o + `,` + s + `z`)),
    u.setAttribute(`d`, L(u._gsRawPath = se(a))),
    t && e.parentNode && (e.parentNode.insertBefore(u, e),
    e.parentNode.removeChild(e)),
    u)
}
function ee(e, t, n) {
    var r = e[t], i = e[t + 2], a = e[t + 4], s;
    return r += (i - r) * n,
    i += (a - i) * n,
    r += (i - r) * n,
    s = i + (a + (e[t + 6] - a) * n - i) * n - r,
    r = e[t + 1],
    i = e[t + 3],
    a = e[t + 5],
    r += (i - r) * n,
    i += (a - i) * n,
    r += (i - r) * n,
    b(d(i + (a + (e[t + 7] - a) * n - i) * n - r, s) * o)
}
function te(e, t, n) {
    n = h(n) ? 1 : x(n) || 0,
    t = x(t) || 0;
    var r = Math.max(0, ~~(l(n - t) - 1e-8))
      , i = k(e);
    if (t > n && (t = 1 - t,
    n = 1 - n,
    T(i),
    i.totalLength = 0),
    t < 0 || n < 0) {
        var a = Math.abs(~~Math.min(t, n)) + 1;
        t += a,
        n += a
    }
    i.totalLength || re(i);
    var o = n > 1, s = ae(i, t, g, !0), c = ae(i, n, _), u = c.segment, d = s.segment, f = c.segIndex, p = s.segIndex, m = c.i, v = s.i, y = p === f, b = m === v && y, S, w, E, O, A, j, M, N;
    if (o || r) {
        for (S = f < p || y && m < v || b && c.t < s.t,
        C(i, p, v, s.t) && (p++,
        S || (f++,
        b ? (c.t = (c.t - s.t) / (1 - s.t),
        m = 0) : y && (m -= v))),
        Math.abs(1 - (n - t)) < 1e-5 ? f = p - 1 : !c.t && f ? f-- : C(i, f, m, c.t) && S && p++,
        s.t === 1 && (p = (p + 1) % i.length),
        A = [],
        j = i.length,
        M = 1 + j * r,
        N = p,
        M += (j - p + f) % j,
        O = 0; O < M; O++)
            D(A, i[N++ % j]);
        i = A
    } else if (E = c.t === 1 ? 6 : ie(u, m, c.t),
    t !== n)
        for (w = ie(d, v, b ? s.t / c.t : s.t),
        y && (E += w),
        u.splice(m + E + 2),
        (w || v) && d.splice(0, v + w),
        O = i.length; O--; )
            (O < p || O > f) && i.splice(O, 1);
    else
        u.angle = ee(u, m + E, 0),
        m += E,
        s = u[m],
        c = u[m + 1],
        u.length = u.totalLength = 0,
        u.totalPoints = i.totalPoints = 8,
        u.push(s, c, s, c, s, c, s, c);
    return i.totalLength = 0,
    i
}
function ne(e, t, n) {
    t ||= 0,
    e.samples || (e.samples = [],
    e.lookup = []);
    var r = ~~e.resolution || 12, i = 1 / r, a = n ? t + n * 6 + 1 : e.length, o = e[t], s = e[t + 1], c = t ? t / 6 * r : 0, d = e.samples, p = e.lookup, m = (t ? e.minLength : f) || f, h = d[c + n * r - 1], g = t ? d[c - 1] : 0, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N;
    for (d.length = p.length = 0,
    v = t + 2; v < a; v += 6) {
        if (y = e[v + 4] - o,
        b = e[v + 2] - o,
        x = e[v] - o,
        w = e[v + 5] - s,
        T = e[v + 3] - s,
        E = e[v + 1] - s,
        S = C = D = O = 0,
        l(y) < .01 && l(w) < .01 && l(x) + l(E) < .01)
            e.length > 8 && (e.splice(v, 6),
            v -= 6,
            a -= 6);
        else
            for (_ = 1; _ <= r; _++)
                A = i * _,
                k = 1 - A,
                S = C - (C = (A * A * y + 3 * k * (A * b + k * x)) * A),
                D = O - (O = (A * A * w + 3 * k * (A * T + k * E)) * A),
                M = u(D * D + S * S),
                M < m && (m = M),
                g += M,
                d[c++] = g;
        o += y,
        s += w
    }
    if (h)
        for (h -= g; c < d.length; c++)
            d[c] += h;
    if (d.length && m) {
        if (e.totalLength = N = d[d.length - 1] || 0,
        e.minLength = m,
        N / m < 9999)
            for (M = j = 0,
            _ = 0; _ < N; _ += m)
                p[M++] = d[j] < _ ? ++j : j
    } else
        e.totalLength = d[0] = 0;
    return t ? g - d[t / 2 - 1] : g
}
function re(e, t) {
    for (var n, r, i = n = r = 0; i < e.length; i++)
        e[i].resolution = ~~t || 12,
        n += ne(e[i]),
        r += e[i].length;
    return e.totalPoints = r,
    e.totalLength = n,
    e
}
function ie(e, t, n) {
    if (n <= 0 || n >= 1)
        return 0;
    var r = e[t]
      , i = e[t + 1]
      , a = e[t + 2]
      , o = e[t + 3]
      , s = e[t + 4]
      , c = e[t + 5]
      , l = e[t + 6]
      , u = e[t + 7]
      , d = r + (a - r) * n
      , f = a + (s - a) * n
      , p = i + (o - i) * n
      , m = o + (c - o) * n
      , h = d + (f - d) * n
      , g = p + (m - p) * n
      , _ = s + (l - s) * n
      , v = c + (u - c) * n;
    return f += (_ - f) * n,
    m += (v - m) * n,
    e.splice(t + 2, 4, b(d), b(p), b(h), b(g), b(h + (f - h) * n), b(g + (m - g) * n), b(f), b(m), b(_), b(v)),
    e.samples && e.samples.splice(t / 6 * e.resolution | 0, 0, 0, 0, 0, 0, 0, 0),
    6
}
function ae(e, t, n, r) {
    n ||= {},
    e.totalLength || re(e),
    (t < 0 || t > 1) && (t = y(t));
    var i = 0, a = e[0], o, s, c, l, u, d, f;
    if (!t)
        f = d = i = 0,
        a = e[0];
    else if (t === 1)
        f = 1,
        i = e.length - 1,
        a = e[i],
        d = a.length - 8;
    else {
        if (e.length > 1) {
            for (c = e.totalLength * t,
            u = d = 0; (u += e[d++].totalLength) < c; )
                i = d;
            a = e[i],
            l = u - a.totalLength,
            t = (c - l) / (u - l) || 0
        }
        o = a.samples,
        s = a.resolution,
        c = a.totalLength * t,
        d = a.lookup.length ? a.lookup[~~(c / a.minLength)] || 0 : w(o, c, t),
        l = d ? o[d - 1] : 0,
        u = o[d],
        u < c && (l = u,
        u = o[++d]),
        f = 1 / s * ((c - l) / (u - l) + d % s),
        d = ~~(d / s) * 6,
        r && f === 1 && (d + 6 < a.length ? (d += 6,
        f = 0) : i + 1 < e.length && (d = f = 0,
        a = e[++i]))
    }
    return n.t = f,
    n.i = d,
    n.path = e,
    n.segment = a,
    n.segIndex = i,
    n
}
function oe(e, t, n, r) {
    var i = e[0], a = r || {}, o, s, c, l, u, d, f, p, m;
    if ((t < 0 || t > 1) && (t = y(t)),
    i.lookup || re(e),
    e.length > 1) {
        for (c = e.totalLength * t,
        u = d = 0; (u += e[d++].totalLength) < c; )
            i = e[d];
        l = u - i.totalLength,
        t = (c - l) / (u - l) || 0
    }
    return o = i.samples,
    s = i.resolution,
    c = i.totalLength * t,
    d = i.lookup.length ? i.lookup[t < 1 ? ~~(c / i.minLength) : i.lookup.length - 1] || 0 : w(o, c, t),
    l = d ? o[d - 1] : 0,
    u = o[d],
    u < c && (l = u,
    u = o[++d]),
    f = 1 / s * ((c - l) / (u - l) + d % s) || 0,
    m = 1 - f,
    d = ~~(d / s) * 6,
    p = i[d],
    a.x = b((f * f * (i[d + 6] - p) + 3 * m * (f * (i[d + 4] - p) + m * (i[d + 2] - p))) * f + p),
    a.y = b((f * f * (i[d + 7] - (p = i[d + 1])) + 3 * m * (f * (i[d + 5] - p) + m * (i[d + 3] - p))) * f + p),
    n && (a.angle = i.totalLength ? ee(i, d, f >= 1 ? 1 - 1e-9 : f || 1e-9) : i.angle || 0),
    a
}
function F(e, t, n, r, i, a, o) {
    for (var s = e.length, c, l, u, d, f; --s > -1; )
        for (c = e[s],
        l = c.length,
        u = 0; u < l; u += 2)
            d = c[u],
            f = c[u + 1],
            c[u] = d * t + f * r + a,
            c[u + 1] = d * n + f * i + o;
    return e._dirty = 1,
    e
}
function I(e, t, n, r, i, o, d, f, p) {
    if (e !== f || t !== p) {
        n = l(n),
        r = l(r);
        var m = i % 360 * a
          , h = c(m)
          , g = s(m)
          , _ = Math.PI
          , v = _ * 2
          , y = (e - f) / 2
          , b = (t - p) / 2
          , x = h * y + g * b
          , S = -g * y + h * b
          , C = x * x
          , w = S * S
          , T = C / (n * n) + w / (r * r);
        T > 1 && (n = u(T) * n,
        r = u(T) * r);
        var E = n * n
          , D = r * r
          , O = (E * D - E * w - D * C) / (E * w + D * C);
        O < 0 && (O = 0);
        var k = (o === d ? -1 : 1) * u(O)
          , A = k * (n * S / r)
          , j = k * -(r * x / n)
          , M = (e + f) / 2
          , N = (t + p) / 2
          , P = M + (h * A - g * j)
          , ee = N + (g * A + h * j)
          , te = (x - A) / n
          , ne = (S - j) / r
          , re = (-x - A) / n
          , ie = (-S - j) / r
          , ae = te * te + ne * ne
          , oe = (ne < 0 ? -1 : 1) * Math.acos(te / u(ae))
          , F = (te * ie - ne * re < 0 ? -1 : 1) * Math.acos((te * re + ne * ie) / u(ae * (re * re + ie * ie)));
        isNaN(F) && (F = _),
        !d && F > 0 ? F -= v : d && F < 0 && (F += v),
        oe %= v,
        F %= v;
        for (var I = Math.ceil(l(F) / (v / 4)), se = [], ce = F / I, le = 4 / 3 * s(ce / 2) / (1 + c(ce / 2)), L = h * n, R = g * n, ue = g * -r, z = h * r, B = 0; B < I; B++)
            i = oe + B * ce,
            x = c(i),
            S = s(i),
            te = c(i += ce),
            ne = s(i),
            se.push(x - le * S, S + le * x, te + le * ne, ne - le * te, te, ne);
        for (B = 0; B < se.length; B += 2)
            x = se[B],
            S = se[B + 1],
            se[B] = x * L + S * ue + P,
            se[B + 1] = x * R + S * z + ee;
        return se[B - 2] = f,
        se[B - 1] = p,
        se
    }
}
function se(e) {
    var n = (e + ``).replace(r, function(e) {
        var t = +e;
        return t < 1e-4 && t > -1e-4 ? 0 : t
    }).match(t) || [], i = [], a = 0, o = 0, s = 2 / 3, c = n.length, u = 0, d = `ERROR: malformed path: ` + e, f, p, m, h, g, _, v, y, b, x, C, w, T, E, D, O = function(e, t, n, r) {
        x = (n - e) / 3,
        C = (r - t) / 3,
        v.push(e + x, t + C, n - x, r - C, n, r)
    };
    if (!e || !isNaN(n[0]) || isNaN(n[1]))
        return console.log(d),
        i;
    for (f = 0; f < c; f++)
        if (T = g,
        isNaN(n[f]) ? (g = n[f].toUpperCase(),
        _ = g !== n[f]) : f--,
        m = +n[f + 1],
        h = +n[f + 2],
        _ && (m += a,
        h += o),
        f || (y = m,
        b = h),
        g === `M`)
            v && (v.length < 8 ? --i.length : u += v.length,
            S(v)),
            a = y = m,
            o = b = h,
            v = [m, h],
            i.push(v),
            f += 2,
            g = `L`;
        else if (g === `C`)
            v ||= [0, 0],
            _ || (a = o = 0),
            v.push(m, h, a + n[f + 3] * 1, o + n[f + 4] * 1, a += n[f + 5] * 1, o += n[f + 6] * 1),
            f += 6;
        else if (g === `S`)
            x = a,
            C = o,
            (T === `C` || T === `S`) && (x += a - v[v.length - 4],
            C += o - v[v.length - 3]),
            _ || (a = o = 0),
            v.push(x, C, m, h, a += n[f + 3] * 1, o += n[f + 4] * 1),
            f += 4;
        else if (g === `Q`)
            x = a + (m - a) * s,
            C = o + (h - o) * s,
            _ || (a = o = 0),
            a += n[f + 3] * 1,
            o += n[f + 4] * 1,
            v.push(x, C, a + (m - a) * s, o + (h - o) * s, a, o),
            f += 4;
        else if (g === `T`)
            x = a - v[v.length - 4],
            C = o - v[v.length - 3],
            v.push(a + x, o + C, m + (a + x * 1.5 - m) * s, h + (o + C * 1.5 - h) * s, a = m, o = h),
            f += 2;
        else if (g === `H`)
            O(a, o, a = m, o),
            f += 1;
        else if (g === `V`)
            O(a, o, a, o = m + (_ ? o - a : 0)),
            f += 1;
        else if (g === `L` || g === `Z`)
            g === `Z` && (m = y,
            h = b,
            v.closed = !0),
            (g === `L` || l(a - m) > .5 || l(o - h) > .5) && (O(a, o, m, h),
            g === `L` && (f += 2)),
            a = m,
            o = h;
        else if (g === `A`) {
            if (E = n[f + 4],
            D = n[f + 5],
            x = n[f + 6],
            C = n[f + 7],
            p = 7,
            E.length > 1 && (E.length < 3 ? (C = x,
            x = D,
            p--) : (C = D,
            x = E.substr(2),
            p -= 2),
            D = E.charAt(1),
            E = E.charAt(0)),
            w = I(a, o, +n[f + 1], +n[f + 2], +n[f + 3], +E, +D, (_ ? a : 0) + x * 1, (_ ? o : 0) + C * 1),
            f += p,
            w)
                for (p = 0; p < w.length; p++)
                    v.push(w[p]);
            a = v[v.length - 2],
            o = v[v.length - 1]
        } else
            console.log(d);
    return f = v.length,
    f < 6 ? (i.pop(),
    f = 0) : S(v),
    i.totalPoints = u + f,
    i
}
function ce(e, t) {
    t === void 0 && (t = 1);
    for (var n = e[0], r = 0, i = [n, r], a = 2; a < e.length; a += 2)
        i.push(n, r, e[a], r = (e[a] - n) * t / 2, n = e[a], -r);
    return i
}
function le(e, t) {
    l(e[0] - e[2]) < 1e-4 && l(e[1] - e[3]) < 1e-4 && (e = e.slice(2));
    var n = e.length - 2, r = +e[0], i = +e[1], a = +e[2], o = +e[3], s = [r, i, r, i], c = a - r, d = o - i, f = e.nonSmooth || [], p = Math.abs(e[n] - r) < .001 && Math.abs(e[n + 1] - i) < .001, m, h, g, _, v, y, x, S, C, w, T, E, D, O, k;
    if (!n)
        return [r, i, r, i, r, i, r, i];
    for (p && (e.push(a, o),
    a = r,
    o = i,
    r = e[n - 2],
    i = e[n - 1],
    e.unshift(r, i),
    n += 4,
    f = [0, 0].concat(f)),
    t = t || t === 0 ? +t : 1,
    g = 2; g < n; g += 2)
        if (m = r,
        h = i,
        r = a,
        i = o,
        a = +e[g + 2],
        o = +e[g + 3],
        r !== a || i !== o) {
            if (_ = c,
            v = d,
            c = a - r,
            d = o - i,
            f[g]) {
                s.push(r - (r - m) / 4, i - (i - h) / 4, r, i, r + (a - r) / 4, i + (o - i) / 4);
                continue
            }
            y = u(_ * _ + v * v),
            x = u(c * c + d * d),
            S = u((c / x + _ / y) ** 2 + (d / x + v / y) ** 2),
            C = (y + x) * t * .25 / S,
            w = r - (r - m) * (y ? C / y : 0),
            T = r + (a - r) * (x ? C / x : 0),
            E = r - (w + ((T - w) * (y * 3 / (y + x) + .5) / 4 || 0)),
            D = i - (i - h) * (y ? C / y : 0),
            O = i + (o - i) * (x ? C / x : 0),
            k = i - (D + ((O - D) * (y * 3 / (y + x) + .5) / 4 || 0)),
            s.push(b(w + E), b(D + k), b(r), b(i), b(T + E), b(O + k))
        }
    return r !== a || i !== o || s.length < 4 ? s.push(b(a), b(o), b(a), b(o)) : s.length -= 2,
    s.length === 2 ? s.push(r, i, r, i, r, i) : p && (s.splice(0, 6),
    s.length -= 6),
    s.closed = p,
    s
}
function L(e) {
    m(e[0]) && (e = [e]);
    for (var t = ``, n = e.length, r, i = 0, a, o; i < n; i++) {
        for (o = e[i],
        t += `M` + b(o[0]) + `,` + b(o[1]) + ` C`,
        r = o.length,
        a = 2; a < r; a++)
            t += b(o[a++]) + `,` + b(o[a++]) + ` ` + b(o[a++]) + `,` + b(o[a++]) + ` ` + b(o[a++]) + `,` + b(o[a]) + ` `;
        o.closed && (t += `z`)
    }
    return t
}
var R, ue, z, B, de, fe, pe, me, he = `transform`, ge = he + `Origin`, _e, ve = function(e) {
    var t = e.ownerDocument || e;
    for (!(he in e.style) && (`msTransform` in e.style) && (he = `msTransform`,
    ge = he + `Origin`); t.parentNode && (t = t.parentNode); )
        ;
    if (ue = window,
    pe = new ke,
    t) {
        R = t,
        z = t.documentElement,
        B = t.body,
        me = R.createElementNS(`http://www.w3.org/2000/svg`, `g`),
        me.style.transform = `none`;
        var n = t.createElement(`div`)
          , r = t.createElement(`div`)
          , i = t && (t.body || t.firstElementChild);
        i && i.appendChild && (i.appendChild(n),
        n.appendChild(r),
        n.style.position = `static`,
        n.style.transform = `translate3d(0,0,1px)`,
        _e = r.offsetParent !== n,
        i.removeChild(n))
    }
    return t
}, V = function(e) {
    for (var t, n; e && e !== B; )
        n = e._gsap,
        n && n.uncache && n.get(e, `x`),
        n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4,
        n.renderTransform(1, n),
        t ? t.push(n) : t = [n]),
        e = e.parentNode;
    return t
}, ye = [], H = [], be = function() {
    return ue.pageYOffset || R.scrollTop || z.scrollTop || B.scrollTop || 0
}, xe = function() {
    return ue.pageXOffset || R.scrollLeft || z.scrollLeft || B.scrollLeft || 0
}, Se = function(e) {
    return e.ownerSVGElement || ((e.tagName + ``).toLowerCase() === `svg` ? e : null)
}, Ce = function e(t) {
    if (ue.getComputedStyle(t).position === `fixed`)
        return !0;
    if (t = t.parentNode,
    t && t.nodeType === 1)
        return e(t)
}, we = function e(t, n) {
    if (t.parentNode && (R || ve(t))) {
        var r = Se(t)
          , i = r ? r.getAttribute(`xmlns`) || `http://www.w3.org/2000/svg` : `http://www.w3.org/1999/xhtml`
          , a = r ? n ? `rect` : `g` : `div`
          , o = n === 2 ? 100 : 0
          , s = n === 3 ? 100 : 0
          , c = {
            position: `absolute`,
            display: `block`,
            pointerEvents: `none`,
            margin: `0`,
            padding: `0`
        }
          , l = R.createElementNS ? R.createElementNS(i.replace(/^https/, `http`), a) : R.createElement(a);
        return n && (r ? (fe ||= e(t),
        l.setAttribute(`width`, .01),
        l.setAttribute(`height`, .01),
        l.setAttribute(`transform`, `translate(` + o + `,` + s + `)`),
        l.setAttribute(`fill`, `transparent`),
        fe.appendChild(l)) : (de || (de = e(t),
        Object.assign(de.style, c)),
        Object.assign(l.style, c, {
            width: `0.1px`,
            height: `0.1px`,
            top: s + `px`,
            left: o + `px`
        }),
        de.appendChild(l))),
        l
    }
    throw `Need document and parent.`
}, Te = function(e) {
    for (var t = new ke, n = 0; n < e.numberOfItems; n++)
        t.multiply(e.getItem(n).matrix);
    return t
}, Ee = function(e) {
    var t = e.getCTM(), n;
    return t || (n = e.style[he],
    e.style[he] = `none`,
    e.appendChild(me),
    t = me.getCTM(),
    e.removeChild(me),
    n ? e.style[he] = n : e.style.removeProperty(he.replace(/([A-Z])/g, `-$1`).toLowerCase())),
    t || pe.clone()
}, De = function(e, t) {
    var n = Se(e), r = e === n, i = n ? ye : H, a = e.parentNode, o = a && !n && a.shadowRoot && a.shadowRoot.appendChild ? a.shadowRoot : a, s, c, l, u, d, f;
    if (e === ue)
        return e;
    if (i.length || i.push(we(e, 1), we(e, 2), we(e, 3)),
    s = n ? fe : de,
    n)
        r ? (l = Ee(e),
        u = -l.e / l.a,
        d = -l.f / l.d,
        c = pe) : e.getBBox ? (l = e.getBBox(),
        c = e.transform ? e.transform.baseVal : {},
        c = c.numberOfItems ? c.numberOfItems > 1 ? Te(c) : c.getItem(0).matrix : pe,
        u = c.a * l.x + c.c * l.y,
        d = c.b * l.x + c.d * l.y) : (c = new ke,
        u = d = 0),
        t && e.tagName.toLowerCase() === `g` && (u = d = 0),
        (r || !e.getBoundingClientRect().width ? n : a).appendChild(s),
        s.setAttribute(`transform`, `matrix(` + c.a + `,` + c.b + `,` + c.c + `,` + c.d + `,` + (c.e + u) + `,` + (c.f + d) + `)`);
    else {
        if (u = d = 0,
        _e)
            for (c = e.offsetParent,
            l = e; (l &&= l.parentNode) && l !== c && l.parentNode; )
                (ue.getComputedStyle(l)[he] + ``).length > 4 && (u = l.offsetLeft,
                d = l.offsetTop,
                l = 0);
        if (f = ue.getComputedStyle(e),
        f.position !== `absolute` && f.position !== `fixed`)
            for (c = e.offsetParent; a && a !== c; )
                u += a.scrollLeft || 0,
                d += a.scrollTop || 0,
                a = a.parentNode;
        l = s.style,
        l.top = e.offsetTop - d + `px`,
        l.left = e.offsetLeft - u + `px`,
        l[he] = f[he],
        l[ge] = f[ge],
        l.position = f.position === `fixed` ? `fixed` : `absolute`,
        o.appendChild(s)
    }
    return s
}, Oe = function(e, t, n, r, i, a, o) {
    return e.a = t,
    e.b = n,
    e.c = r,
    e.d = i,
    e.e = a,
    e.f = o,
    e
}, ke = function() {
    function e(e, t, n, r, i, a) {
        e === void 0 && (e = 1),
        t === void 0 && (t = 0),
        n === void 0 && (n = 0),
        r === void 0 && (r = 1),
        i === void 0 && (i = 0),
        a === void 0 && (a = 0),
        Oe(this, e, t, n, r, i, a)
    }
    var t = e.prototype;
    return t.inverse = function() {
        var e = this.a
          , t = this.b
          , n = this.c
          , r = this.d
          , i = this.e
          , a = this.f
          , o = e * r - t * n || 1e-10;
        return Oe(this, r / o, -t / o, -n / o, e / o, (n * a - r * i) / o, -(e * a - t * i) / o)
    }
    ,
    t.multiply = function(e) {
        var t = this.a
          , n = this.b
          , r = this.c
          , i = this.d
          , a = this.e
          , o = this.f
          , s = e.a
          , c = e.c
          , l = e.b
          , u = e.d
          , d = e.e
          , f = e.f;
        return Oe(this, s * t + l * r, s * n + l * i, c * t + u * r, c * n + u * i, a + d * t + f * r, o + d * n + f * i)
    }
    ,
    t.clone = function() {
        return new e(this.a,this.b,this.c,this.d,this.e,this.f)
    }
    ,
    t.equals = function(e) {
        var t = this.a
          , n = this.b
          , r = this.c
          , i = this.d
          , a = this.e
          , o = this.f;
        return t === e.a && n === e.b && r === e.c && i === e.d && a === e.e && o === e.f
    }
    ,
    t.apply = function(e, t) {
        t === void 0 && (t = {});
        var n = e.x
          , r = e.y
          , i = this.a
          , a = this.b
          , o = this.c
          , s = this.d
          , c = this.e
          , l = this.f;
        return t.x = n * i + r * o + c || 0,
        t.y = n * a + r * s + l || 0,
        t
    }
    ,
    e
}();
function U(e, t, n, r) {
    if (!e || !e.parentNode || (R || ve(e)).documentElement === e)
        return new ke;
    var i = V(e)
      , a = Se(e) ? ye : H
      , o = De(e, n)
      , s = a[0].getBoundingClientRect()
      , c = a[1].getBoundingClientRect()
      , l = a[2].getBoundingClientRect()
      , u = o.parentNode
      , d = !r && Ce(e)
      , f = new ke((c.left - s.left) / 100,(c.top - s.top) / 100,(l.left - s.left) / 100,(l.top - s.top) / 100,s.left + (d ? 0 : xe()),s.top + (d ? 0 : be()));
    if (u.removeChild(o),
    i)
        for (s = i.length; s--; )
            c = i[s],
            c.scaleX = c.scaleY = 0,
            c.renderTransform(1, c);
    return t ? f.inverse() : f
}
var Ae = e({
    MotionPathPlugin: () => Qe,
    default: () => Qe
}), je = `x,translateX,left,marginLeft,xPercent`.split(`,`), Me = `y,translateY,top,marginTop,yPercent`.split(`,`), Ne = Math.PI / 180, Pe, Fe, Ie, Le, Re, ze, Be = function() {
    return Pe || typeof window < `u` && (Pe = window.gsap) && Pe.registerPlugin && Pe
}, Ve = function(e, t, n, r) {
    for (var i = t.length, a = r === 2 ? 0 : r, o = 0; o < i; o++)
        e[a] = parseFloat(t[o][n]),
        r === 2 && (e[a + 1] = 0),
        a += 2;
    return e
}, He = function(e, t, n) {
    return parseFloat(e._gsap.get(e, t, n || `px`)) || 0
}, Ue = function(e) {
    for (var t = e[0], n = e[1], r = 2; r < e.length; r += 2)
        t = e[r] += t,
        n = e[r + 1] += n
}, We = function(e, t, n, r, i, a, o, s, c) {
    return o.type === `cubic` ? t = [t] : (o.fromCurrent !== !1 && t.unshift(He(n, r, s), i ? He(n, i, c) : 0),
    o.relative && Ue(t),
    t = [(i ? le : ce)(t, o.curviness)]),
    t = a(Ye(t, n, o)),
    Xe(e, n, r, t, `x`, s),
    i && Xe(e, n, i, t, `y`, c),
    re(t, o.resolution || (o.curviness === 0 ? 20 : 12))
}, Ge = function(e) {
    return e
}, Ke = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g, qe = function(e, t, n) {
    var r = U(e), i = 0, a = 0, o;
    return (e.tagName + ``).toLowerCase() === `svg` ? (o = e.viewBox.baseVal,
    o.width || (o = {
        width: +e.getAttribute(`width`),
        height: +e.getAttribute(`height`)
    })) : o = t && e.getBBox && e.getBBox(),
    t && t !== `auto` && (i = t.push ? t[0] * (o ? o.width : e.offsetWidth || 0) : t.x,
    a = t.push ? t[1] * (o ? o.height : e.offsetHeight || 0) : t.y),
    n.apply(i || a ? r.apply({
        x: i,
        y: a
    }) : {
        x: r.e,
        y: r.f
    })
}, Je = function(e, t, n, r) {
    var i = U(e.parentNode, !0, !0), a = i.clone().multiply(U(t)), o = qe(e, n, i), s = qe(t, r, i), c = s.x, l = s.y, u;
    return a.e = a.f = 0,
    r === `auto` && t.getTotalLength && t.tagName.toLowerCase() === `path` && (u = t.getAttribute(`d`).match(Ke) || [],
    u = a.apply({
        x: +u[0],
        y: +u[1]
    }),
    c += u.x,
    l += u.y),
    u && (u = a.apply(t.getBBox()),
    c -= u.x,
    l -= u.y),
    a.e = c - o.x,
    a.f = l - o.y,
    a
}, Ye = function(e, t, n) {
    var r = n.align, i = n.matrix, a = n.offsetX, o = n.offsetY, s = n.alignOrigin, c = e[0][0], l = e[0][1], u = He(t, `x`), d = He(t, `y`), f, p, m;
    return !e || !e.length ? O(`M0,0L0,0`) : (r && (r === `self` || (f = Le(r)[0] || t) === t ? F(e, 1, 0, 0, 1, u - c, d - l) : (s && s[2] !== !1 ? Pe.set(t, {
        transformOrigin: s[0] * 100 + `% ` + s[1] * 100 + `%`
    }) : s = [He(t, `xPercent`) / -100, He(t, `yPercent`) / -100],
    p = Je(t, f, s, `auto`),
    m = p.apply({
        x: c,
        y: l
    }),
    F(e, p.a, p.b, p.c, p.d, u + p.e - (m.x - p.e), d + p.f - (m.y - p.f)))),
    i ? F(e, i.a, i.b, i.c, i.d, i.e, i.f) : (a || o) && F(e, 1, 0, 0, 1, a || 0, o || 0),
    e)
}, Xe = function(e, t, n, r, i, a) {
    var o = t._gsap
      , s = o.harness
      , c = s && s.aliases && s.aliases[n]
      , l = c && c.indexOf(`,`) < 0 ? c : n
      , u = e._pt = new Fe(e._pt,t,l,0,0,Ge,0,o.set(t, l, e));
    u.u = Ie(o.get(t, l, a)) || 0,
    u.path = r,
    u.pp = i,
    e._props.push(l)
}, Ze = function(e, t) {
    return function(n) {
        return e || t !== 1 ? te(n, e, t) : n
    }
}, Qe = {
    version: `3.15.0`,
    name: `motionPath`,
    register: function(e, t, n) {
        Pe = e,
        Ie = Pe.utils.getUnit,
        Le = Pe.utils.toArray,
        Re = Pe.core.getStyleSaver,
        ze = Pe.core.reverting || function() {}
        ,
        Fe = n
    },
    init: function(e, t, n) {
        if (!Pe)
            return console.warn(`Please gsap.registerPlugin(MotionPathPlugin)`),
            !1;
        (typeof t != `object` || t.style || !t.path) && (t = {
            path: t
        });
        var r = [], i = t, a = i.path, o = i.autoRotate, s = i.unitX, c = i.unitY, l = i.x, u = i.y, d = a[0], f = Ze(t.start, `end` in t ? t.end : 1), p, m;
        if (this.rawPaths = r,
        this.target = e,
        this.tween = n,
        this.styles = Re && Re(e, `transform`),
        (this.rotate = o || o === 0) && (this.rOffset = parseFloat(o) || 0,
        this.radians = !!t.useRadians,
        this.rProp = t.rotation || `rotation`,
        this.rSet = e._gsap.set(e, this.rProp, this),
        this.ru = Ie(e._gsap.get(e, this.rProp)) || 0),
        Array.isArray(a) && !(`closed` in a) && typeof d != `number`) {
            for (m in d)
                !l && ~je.indexOf(m) ? l = m : !u && ~Me.indexOf(m) && (u = m);
            for (m in l && u ? r.push(We(this, Ve(Ve([], a, l, 0), a, u, 1), e, l, u, f, t, s || Ie(a[0][l]), c || Ie(a[0][u]))) : l = u = 0,
            d)
                m !== l && m !== u && r.push(We(this, Ve([], a, m, 2), e, m, 0, f, t, Ie(a[0][m])))
        } else
            p = f(Ye(O(t.path), e, t)),
            re(p, t.resolution),
            r.push(p),
            Xe(this, e, t.x || `x`, p, `x`, t.unitX || `px`),
            Xe(this, e, t.y || `y`, p, `y`, t.unitY || `px`);
        n.vars.immediateRender && this.render(n.progress(), this)
    },
    render: function(e, t) {
        var n = t.rawPaths
          , r = n.length
          , i = t._pt;
        if (t.tween._time || !ze()) {
            for (e > 1 ? e = 1 : e < 0 && (e = 0); r--; )
                oe(n[r], e, !r && t.rotate, n[r]);
            for (; i; )
                i.set(i.t, i.p, i.path[i.pp] + i.u, i.d, e),
                i = i._next;
            t.rotate && t.rSet(t.target, t.rProp, n[0].angle * (t.radians ? Ne : 1) + t.rOffset + t.ru, t, e)
        } else
            t.styles.revert()
    },
    getLength: function(e) {
        return re(O(e)).totalLength
    },
    sliceRawPath: te,
    getRawPath: O,
    pointsToSegment: le,
    stringToRawPath: se,
    rawPathToString: L,
    transformRawPath: F,
    getGlobalMatrix: U,
    getPositionOnPath: oe,
    cacheRawPathMeasurements: re,
    convertToPath: function(e, t) {
        return Le(e).map(function(e) {
            return P(e, t !== !1)
        })
    },
    convertCoordinates: function(e, t, n) {
        var r = U(t, !0, !0).multiply(U(e));
        return n ? r.apply(n) : r
    },
    getAlignMatrix: Je,
    getRelativePosition: function(e, t, n, r) {
        var i = Je(e, t, n, r);
        return {
            x: i.e,
            y: i.f
        }
    },
    arrayToRawPath: function(e, t) {
        t ||= {};
        var n = Ve(Ve([], e, t.x || `x`, 0), e, t.y || `y`, 1);
        return t.relative && Ue(n),
        [t.type === `cubic` ? n : le(n, t.curviness)]
    }
};
Be() && Pe.registerPlugin(Qe);
function $e(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1,
        r.configurable = !0,
        `value` in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r)
    }
}
function et(e, t, n) {
    return t && $e(e.prototype, t),
    n && $e(e, n),
    e
}
var tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt = function() {
    return tt || typeof window < `u` && (tt = window.gsap) && tt.registerPlugin && tt
}, ht = 1, gt = [], W = [], _t = [], vt = Date.now, yt = function(e, t) {
    return t
}, bt = function() {
    var e = lt.core
      , t = e.bridge || {}
      , n = e._scrollers
      , r = e._proxies;
    n.push.apply(n, W),
    r.push.apply(r, _t),
    W = n,
    _t = r,
    yt = function(e, n) {
        return t[e](n)
    }
}, xt = function(e, t) {
    return ~_t.indexOf(e) && _t[_t.indexOf(e) + 1][t]
}, St = function(e) {
    return !!~ut.indexOf(e)
}, Ct = function(e, t, n, r, i) {
    return e.addEventListener(t, n, {
        passive: r !== !1,
        capture: !!i
    })
}, wt = function(e, t, n, r) {
    return e.removeEventListener(t, n, !!r)
}, Tt = `scrollLeft`, Et = `scrollTop`, Dt = function() {
    return dt && dt.isPressed || W.cache++
}, Ot = function(e, t) {
    var n = function n(r) {
        if (r || r === 0) {
            ht && (rt.history.scrollRestoration = `manual`);
            var i = dt && dt.isPressed;
            r = n.v = Math.round(r) || (dt && dt.iOS ? 1 : 0),
            e(r),
            n.cacheID = W.cache,
            i && yt(`ss`, r)
        } else
            (t || W.cache !== n.cacheID || yt(`ref`)) && (n.cacheID = W.cache,
            n.v = e());
        return n.v + n.offset
    };
    return n.offset = 0,
    e && n
}, kt = {
    s: Tt,
    p: `left`,
    p2: `Left`,
    os: `right`,
    os2: `Right`,
    d: `width`,
    d2: `Width`,
    a: `x`,
    sc: Ot(function(e) {
        return arguments.length ? rt.scrollTo(e, At.sc()) : rt.pageXOffset || it[Tt] || at[Tt] || ot[Tt] || 0
    })
}, At = {
    s: Et,
    p: `top`,
    p2: `Top`,
    os: `bottom`,
    os2: `Bottom`,
    d: `height`,
    d2: `Height`,
    a: `y`,
    op: kt,
    sc: Ot(function(e) {
        return arguments.length ? rt.scrollTo(kt.sc(), e) : rt.pageYOffset || it[Et] || at[Et] || ot[Et] || 0
    })
}, jt = function(e, t) {
    return (t && t._ctx && t._ctx.selector || tt.utils.toArray)(e)[0] || (typeof e == `string` && tt.config().nullTargetWarn !== !1 ? console.warn(`Element not found:`, e) : null)
}, Mt = function(e, t) {
    for (var n = t.length; n--; )
        if (t[n] === e || t[n].contains(e))
            return !0;
    return !1
}, Nt = function(e, t) {
    var n = t.s
      , r = t.sc;
    St(e) && (e = it.scrollingElement || at);
    var i = W.indexOf(e)
      , a = r === At.sc ? 1 : 2;
    !~i && (i = W.push(e) - 1),
    W[i + a] || Ct(e, `scroll`, Dt);
    var o = W[i + a]
      , s = o || (W[i + a] = Ot(xt(e, n), !0) || (St(e) ? r : Ot(function(t) {
        return arguments.length ? e[n] = t : e[n]
    })));
    return s.target = e,
    o || (s.smooth = tt.getProperty(e, `scrollBehavior`) === `smooth`),
    s
}, Pt = function(e, t, n) {
    var r = e
      , i = e
      , a = vt()
      , o = a
      , s = t || 50
      , c = Math.max(500, s * 3)
      , l = function(e, t) {
        var c = vt();
        t || c - a > s ? (i = r,
        r = e,
        o = a,
        a = c) : n ? r += e : r = i + (e - i) / (c - o) * (a - o)
    };
    return {
        update: l,
        reset: function() {
            i = r = n ? 0 : r,
            o = a = 0
        },
        getVelocity: function(e) {
            var t = o
              , s = i
              , u = vt();
            return (e || e === 0) && e !== r && l(e),
            a === o || u - o > c ? 0 : (r + (n ? s : -s)) / ((n ? u : a) - t) * 1e3
        }
    }
}, Ft = function(e, t) {
    return t && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(),
    e.changedTouches ? e.changedTouches[0] : e
}, It = function(e) {
    var t = Math.max.apply(Math, e)
      , n = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(n) ? t : n
}, Lt = function() {
    lt = tt.core.globals().ScrollTrigger,
    lt && lt.core && bt()
}, Rt = function(e) {
    return tt = e || mt(),
    !nt && tt && typeof document < `u` && document.body && (rt = window,
    it = document,
    at = it.documentElement,
    ot = it.body,
    ut = [rt, it, at, ot],
    tt.utils.clamp,
    pt = tt.core.context || function() {}
    ,
    ct = `onpointerenter` in ot ? `pointer` : `mouse`,
    st = zt.isTouch = rt.matchMedia && rt.matchMedia(`(hover: none), (pointer: coarse)`).matches ? 1 : `ontouchstart` in rt || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
    ft = zt.eventTypes = (`ontouchstart` in at ? `touchstart,touchmove,touchcancel,touchend` : `onpointerdown` in at ? `pointerdown,pointermove,pointercancel,pointerup` : `mousedown,mousemove,mouseup,mouseup`).split(`,`),
    setTimeout(function() {
        return ht = 0
    }, 500),
    nt = 1),
    lt || Lt(),
    nt
};
kt.op = At,
W.cache = 0;
var zt = function() {
    function e(e) {
        this.init(e)
    }
    var t = e.prototype;
    return t.init = function(e) {
        nt || Rt(tt) || console.warn(`Please gsap.registerPlugin(Observer)`),
        lt || Lt();
        var t = e.tolerance
          , n = e.dragMinimum
          , r = e.type
          , i = e.target
          , a = e.lineHeight
          , o = e.debounce
          , s = e.preventDefault
          , c = e.onStop
          , l = e.onStopDelay
          , u = e.ignore
          , d = e.wheelSpeed
          , f = e.event
          , p = e.onDragStart
          , m = e.onDragEnd
          , h = e.onDrag
          , g = e.onPress
          , _ = e.onRelease
          , v = e.onRight
          , y = e.onLeft
          , b = e.onUp
          , x = e.onDown
          , S = e.onChangeX
          , C = e.onChangeY
          , w = e.onChange
          , T = e.onToggleX
          , E = e.onToggleY
          , D = e.onHover
          , O = e.onHoverEnd
          , k = e.onMove
          , A = e.ignoreCheck
          , j = e.isNormalizer
          , M = e.onGestureStart
          , N = e.onGestureEnd
          , P = e.onWheel
          , ee = e.onEnable
          , te = e.onDisable
          , ne = e.onClick
          , re = e.scrollSpeed
          , ie = e.capture
          , ae = e.allowClicks
          , oe = e.lockAxis
          , F = e.onLockAxis;
        this.target = i = jt(i) || at,
        this.vars = e,
        u &&= tt.utils.toArray(u),
        t ||= 1e-9,
        n ||= 0,
        d ||= 1,
        re ||= 1,
        r ||= `wheel,touch,pointer`,
        o = o !== !1,
        a ||= parseFloat(rt.getComputedStyle(ot).lineHeight) || 22;
        var I, se, ce, le, L, R, ue, z = this, B = 0, de = 0, fe = e.passive || !s && e.passive !== !1, pe = Nt(i, kt), me = Nt(i, At), he = pe(), ge = me(), _e = ~r.indexOf(`touch`) && !~r.indexOf(`pointer`) && ft[0] === `pointerdown`, ve = St(i), V = i.ownerDocument || it, ye = [0, 0, 0], H = [0, 0, 0], be = 0, xe = function() {
            return be = vt()
        }, Se = function(e, t) {
            return (z.event = e) && u && Mt(e.target, u) || t && _e && e.pointerType !== `touch` || A && A(e, t)
        }, Ce = function() {
            z._vx.reset(),
            z._vy.reset(),
            se.pause(),
            c && c(z)
        }, we = function() {
            var e = z.deltaX = It(ye)
              , n = z.deltaY = It(H)
              , r = Math.abs(e) >= t
              , i = Math.abs(n) >= t;
            w && (r || i) && w(z, e, n, ye, H),
            r && (v && z.deltaX > 0 && v(z),
            y && z.deltaX < 0 && y(z),
            S && S(z),
            T && z.deltaX < 0 != B < 0 && T(z),
            B = z.deltaX,
            ye[0] = ye[1] = ye[2] = 0),
            i && (x && z.deltaY > 0 && x(z),
            b && z.deltaY < 0 && b(z),
            C && C(z),
            E && z.deltaY < 0 != de < 0 && E(z),
            de = z.deltaY,
            H[0] = H[1] = H[2] = 0),
            (le || ce) && (k && k(z),
            ce &&= (p && ce === 1 && p(z),
            h && h(z),
            0),
            le = !1),
            R && !(R = !1) && F && F(z),
            L &&= (P(z),
            !1),
            I = 0
        }, Te = function(e, t, n) {
            ye[n] += e,
            H[n] += t,
            z._vx.update(e),
            z._vy.update(t),
            o ? I ||= requestAnimationFrame(we) : we()
        }, Ee = function(e, t) {
            oe && !ue && (z.axis = ue = Math.abs(e) > Math.abs(t) ? `x` : `y`,
            R = !0),
            ue !== `y` && (ye[2] += e,
            z._vx.update(e, !0)),
            ue !== `x` && (H[2] += t,
            z._vy.update(t, !0)),
            o ? I ||= requestAnimationFrame(we) : we()
        }, De = function(e) {
            if (!Se(e, 1)) {
                e = Ft(e, s);
                var t = e.clientX
                  , r = e.clientY
                  , i = t - z.x
                  , a = r - z.y
                  , o = z.isDragging;
                z.x = t,
                z.y = r,
                (o || (i || a) && (Math.abs(z.startX - t) >= n || Math.abs(z.startY - r) >= n)) && (ce ||= o ? 2 : 1,
                o || (z.isDragging = !0),
                Ee(i, a))
            }
        }, Oe = z.onPress = function(e) {
            Se(e, 1) || e && e.button || (z.axis = ue = null,
            se.pause(),
            z.isPressed = !0,
            e = Ft(e),
            B = de = 0,
            z.startX = z.x = e.clientX,
            z.startY = z.y = e.clientY,
            z._vx.reset(),
            z._vy.reset(),
            Ct(j ? i : V, ft[1], De, fe, !0),
            z.deltaX = z.deltaY = 0,
            g && g(z))
        }
        , ke = z.onRelease = function(e) {
            if (!Se(e, 1)) {
                wt(j ? i : V, ft[1], De, !0);
                var t = !isNaN(z.y - z.startY)
                  , n = z.isDragging
                  , r = n && (Math.abs(z.x - z.startX) > 3 || Math.abs(z.y - z.startY) > 3)
                  , a = Ft(e);
                !r && t && (z._vx.reset(),
                z._vy.reset(),
                s && ae && tt.delayedCall(.08, function() {
                    if (vt() - be > 300 && !e.defaultPrevented) {
                        if (e.target.click)
                            e.target.click();
                        else if (V.createEvent) {
                            var t = V.createEvent(`MouseEvents`);
                            t.initMouseEvent(`click`, !0, !0, rt, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null),
                            e.target.dispatchEvent(t)
                        }
                    }
                })),
                z.isDragging = z.isGesturing = z.isPressed = !1,
                c && n && !j && se.restart(!0),
                ce && we(),
                m && n && m(z),
                _ && _(z, r)
            }
        }
        , U = function(e) {
            return e.touches && e.touches.length > 1 && (z.isGesturing = !0) && M(e, z.isDragging)
        }, Ae = function() {
            return (z.isGesturing = !1) || N(z)
        }, je = function(e) {
            if (!Se(e)) {
                var t = pe()
                  , n = me();
                Te((t - he) * re, (n - ge) * re, 1),
                he = t,
                ge = n,
                c && se.restart(!0)
            }
        }, Me = function(e) {
            if (!Se(e)) {
                e = Ft(e, s),
                P && (L = !0);
                var t = (e.deltaMode === 1 ? a : e.deltaMode === 2 ? rt.innerHeight : 1) * d;
                Te(e.deltaX * t, e.deltaY * t, 0),
                c && !j && se.restart(!0)
            }
        }, Ne = function(e) {
            if (!Se(e)) {
                var t = e.clientX
                  , n = e.clientY
                  , r = t - z.x
                  , i = n - z.y;
                z.x = t,
                z.y = n,
                le = !0,
                c && se.restart(!0),
                (r || i) && Ee(r, i)
            }
        }, Pe = function(e) {
            z.event = e,
            D(z)
        }, Fe = function(e) {
            z.event = e,
            O(z)
        }, Ie = function(e) {
            return Se(e) || Ft(e, s) && ne(z)
        };
        se = z._dc = tt.delayedCall(l || .25, Ce).pause(),
        z.deltaX = z.deltaY = 0,
        z._vx = Pt(0, 50, !0),
        z._vy = Pt(0, 50, !0),
        z.scrollX = pe,
        z.scrollY = me,
        z.isDragging = z.isGesturing = z.isPressed = !1,
        pt(this),
        z.enable = function(e) {
            return z.isEnabled || (Ct(ve ? V : i, `scroll`, Dt),
            r.indexOf(`scroll`) >= 0 && Ct(ve ? V : i, `scroll`, je, fe, ie),
            r.indexOf(`wheel`) >= 0 && Ct(i, `wheel`, Me, fe, ie),
            (r.indexOf(`touch`) >= 0 && st || r.indexOf(`pointer`) >= 0) && (Ct(i, ft[0], Oe, fe, ie),
            Ct(V, ft[2], ke),
            Ct(V, ft[3], ke),
            ae && Ct(i, `click`, xe, !0, !0),
            ne && Ct(i, `click`, Ie),
            M && Ct(V, `gesturestart`, U),
            N && Ct(V, `gestureend`, Ae),
            D && Ct(i, ct + `enter`, Pe),
            O && Ct(i, ct + `leave`, Fe),
            k && Ct(i, ct + `move`, Ne)),
            z.isEnabled = !0,
            z.isDragging = z.isGesturing = z.isPressed = le = ce = !1,
            z._vx.reset(),
            z._vy.reset(),
            he = pe(),
            ge = me(),
            e && e.type && Oe(e),
            ee && ee(z)),
            z
        }
        ,
        z.disable = function() {
            z.isEnabled && (gt.filter(function(e) {
                return e !== z && St(e.target)
            }).length || wt(ve ? V : i, `scroll`, Dt),
            z.isPressed && (z._vx.reset(),
            z._vy.reset(),
            wt(j ? i : V, ft[1], De, !0)),
            wt(ve ? V : i, `scroll`, je, ie),
            wt(i, `wheel`, Me, ie),
            wt(i, ft[0], Oe, ie),
            wt(V, ft[2], ke),
            wt(V, ft[3], ke),
            wt(i, `click`, xe, !0),
            wt(i, `click`, Ie),
            wt(V, `gesturestart`, U),
            wt(V, `gestureend`, Ae),
            wt(i, ct + `enter`, Pe),
            wt(i, ct + `leave`, Fe),
            wt(i, ct + `move`, Ne),
            z.isEnabled = z.isPressed = z.isDragging = !1,
            te && te(z))
        }
        ,
        z.kill = z.revert = function() {
            z.disable();
            var e = gt.indexOf(z);
            e >= 0 && gt.splice(e, 1),
            dt === z && (dt = 0)
        }
        ,
        gt.push(z),
        j && St(i) && (dt = z),
        z.enable(f)
    }
    ,
    et(e, [{
        key: `velocityX`,
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: `velocityY`,
        get: function() {
            return this._vy.getVelocity()
        }
    }]),
    e
}();
zt.version = `3.15.0`,
zt.create = function(e) {
    return new zt(e)
}
,
zt.register = Rt,
zt.getAll = function() {
    return gt.slice()
}
,
zt.getById = function(e) {
    return gt.filter(function(t) {
        return t.vars.id === e
    })[0]
}
,
mt() && tt.registerPlugin(zt);
var Bt = e({
    ScrollTrigger: () => X,
    default: () => X
}), G, Vt, K, q, Ht, J, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn = 1, yn = Date.now, bn = yn(), xn = 0, Sn = 0, Cn = function(e, t, n) {
    var r = zn(e) && (e.substr(0, 6) === `clamp(` || e.indexOf(`max`) > -1);
    return n[`_` + t + `Clamp`] = r,
    r ? e.substr(6, e.length - 7) : e
}, wn = function(e, t) {
    return t && (!zn(e) || e.substr(0, 6) !== `clamp(`) ? `clamp(` + e + `)` : e
}, Tn = function e() {
    return Sn && requestAnimationFrame(e)
}, En = function() {
    return Xt = 1
}, Dn = function() {
    return Xt = 0
}, On = function(e) {
    return e
}, kn = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, An = function() {
    return typeof window < `u`
}, jn = function() {
    return G || An() && (G = window.gsap) && G.registerPlugin && G
}, Mn = function(e) {
    return !!~Ut.indexOf(e)
}, Nn = function(e) {
    return (e === `Height` ? mn : K[`inner` + e]) || Ht[`client` + e] || J[`client` + e]
}, Pn = function(e) {
    return xt(e, `getBoundingClientRect`) || (Mn(e) ? function() {
        return oi.width = K.innerWidth,
        oi.height = mn,
        oi
    }
    : function() {
        return ur(e)
    }
    )
}, Fn = function(e, t, n) {
    var r = n.d
      , i = n.d2
      , a = n.a;
    return (a = xt(e, `getBoundingClientRect`)) ? function() {
        return a()[r]
    }
    : function() {
        return (t ? Nn(i) : e[`client` + i]) || 0
    }
}, In = function(e, t) {
    return !t || ~_t.indexOf(e) ? Pn(e) : function() {
        return oi
    }
}, Ln = function(e, t) {
    var n = t.s
      , r = t.d2
      , i = t.d
      , a = t.a;
    return Math.max(0, (n = `scroll` + r) && (a = xt(e, n)) ? a() - Pn(e)()[i] : Mn(e) ? (Ht[n] || J[n]) - Nn(r) : e[n] - e[`offset` + r])
}, Rn = function(e, t) {
    for (var n = 0; n < tn.length; n += 3)
        (!t || ~t.indexOf(tn[n + 1])) && e(tn[n], tn[n + 1], tn[n + 2])
}, zn = function(e) {
    return typeof e == `string`
}, Bn = function(e) {
    return typeof e == `function`
}, Vn = function(e) {
    return typeof e == `number`
}, Hn = function(e) {
    return typeof e == `object`
}, Un = function(e, t, n) {
    return e && e.progress(+!t) && n && e.pause()
}, Wn = function(e, t, n) {
    if (e.enabled) {
        var r = e._ctx ? e._ctx.add(function() {
            return t(e, n)
        }) : t(e, n);
        r && r.totalTime && (e.callbackAnimation = r)
    }
}, Gn = Math.abs, Kn = `left`, qn = `top`, Jn = `right`, Yn = `bottom`, Xn = `width`, Zn = `height`, Qn = `Right`, $n = `Left`, er = `Top`, tr = `Bottom`, nr = `padding`, rr = `margin`, ir = `Width`, ar = `Height`, or = `px`, sr = function(e) {
    return K.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e)
}, cr = function(e) {
    var t = sr(e).position;
    e.style.position = t === `absolute` || t === `fixed` ? t : `relative`
}, lr = function(e, t) {
    for (var n in t)
        n in e || (e[n] = t[n]);
    return e
}, ur = function(e, t) {
    var n = t && sr(e)[Zt] !== `matrix(1, 0, 0, 1, 0, 0)` && G.to(e, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
    }).progress(1)
      , r = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
    return n && n.progress(0).kill(),
    r
}, dr = function(e, t) {
    var n = t.d2;
    return e[`offset` + n] || e[`client` + n] || 0
}, fr = function(e) {
    var t = [], n = e.labels, r = e.duration(), i;
    for (i in n)
        t.push(n[i] / r);
    return t
}, pr = function(e) {
    return function(t) {
        return G.utils.snap(fr(e), t)
    }
}, mr = function(e) {
    var t = G.utils.snap(e)
      , n = Array.isArray(e) && e.slice(0).sort(function(e, t) {
        return e - t
    });
    return n ? function(e, r, i) {
        i === void 0 && (i = .001);
        var a;
        if (!r)
            return t(e);
        if (r > 0) {
            for (e -= i,
            a = 0; a < n.length; a++)
                if (n[a] >= e)
                    return n[a];
            return n[a - 1]
        }
        for (a = n.length,
        e += i; a--; )
            if (n[a] <= e)
                return n[a];
        return n[0]
    }
    : function(n, r, i) {
        i === void 0 && (i = .001);
        var a = t(n);
        return !r || Math.abs(a - n) < i || a - n < 0 == r < 0 ? a : t(r < 0 ? n - e : n + e)
    }
}, hr = function(e) {
    return function(t, n) {
        return mr(fr(e))(t, n.direction)
    }
}, gr = function(e, t, n, r) {
    return n.split(`,`).forEach(function(n) {
        return e(t, n, r)
    })
}, _r = function(e, t, n, r, i) {
    return e.addEventListener(t, n, {
        passive: !r,
        capture: !!i
    })
}, vr = function(e, t, n, r) {
    return e.removeEventListener(t, n, !!r)
}, yr = function(e, t, n) {
    n &&= n.wheelHandler,
    n && (e(t, `wheel`, n),
    e(t, `touchmove`, n))
}, br = {
    startColor: `green`,
    endColor: `red`,
    indent: 0,
    fontSize: `16px`,
    fontWeight: `normal`
}, xr = {
    toggleActions: `play`,
    anticipatePin: 0
}, Sr = {
    top: 0,
    left: 0,
    center: .5,
    bottom: 1,
    right: 1
}, Cr = function(e, t) {
    if (zn(e)) {
        var n = e.indexOf(`=`)
          , r = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0;
        ~n && (e.indexOf(`%`) > n && (r *= t / 100),
        e = e.substr(0, n - 1)),
        e = r + (e in Sr ? Sr[e] * t : ~e.indexOf(`%`) ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
    }
    return e
}, wr = function(e, t, n, r, i, a, o, s) {
    var c = i.startColor
      , l = i.endColor
      , u = i.fontSize
      , d = i.indent
      , f = i.fontWeight
      , p = q.createElement(`div`)
      , m = Mn(n) || xt(n, `pinType`) === `fixed`
      , h = e.indexOf(`scroller`) !== -1
      , g = m ? J : n.tagName === `IFRAME` ? n.contentDocument.body : n
      , _ = e.indexOf(`start`) !== -1
      , v = _ ? c : l
      , y = `border-color:` + v + `;font-size:` + u + `;color:` + v + `;font-weight:` + f + `;pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;`;
    return y += `position:` + ((h || s) && m ? `fixed;` : `absolute;`),
    (h || s || !m) && (y += (r === At ? Jn : Yn) + `:` + (a + parseFloat(d)) + `px;`),
    o && (y += `box-sizing:border-box;text-align:left;width:` + o.offsetWidth + `px;`),
    p._isStart = _,
    p.setAttribute(`class`, `gsap-marker-` + e + (t ? ` marker-` + t : ``)),
    p.style.cssText = y,
    p.innerText = t || t === 0 ? e + `-` + t : e,
    g.children[0] ? g.insertBefore(p, g.children[0]) : g.appendChild(p),
    p._offset = p[`offset` + r.op.d2],
    Tr(p, 0, r, _),
    p
}, Tr = function(e, t, n, r) {
    var i = {
        display: `block`
    }
      , a = n[r ? `os2` : `p2`]
      , o = n[r ? `p2` : `os2`];
    e._isFlipped = r,
    i[n.a + `Percent`] = r ? -100 : 0,
    i[n.a] = r ? `1px` : 0,
    i[`border` + a + ir] = 1,
    i[`border` + o + ir] = 0,
    i[n.p] = t + `px`,
    G.set(e, i)
}, Y = [], Er = {}, Dr, Or = function() {
    return yn() - xn > 34 && (Dr ||= requestAnimationFrame(Zr))
}, kr = function() {
    (!on || !on.isPressed || on.startX > J.clientWidth) && (W.cache++,
    on ? Dr ||= requestAnimationFrame(Zr) : Zr(),
    xn || Fr(`scrollStart`),
    xn = yn())
}, Ar = function() {
    ln = K.innerWidth,
    cn = K.innerHeight
}, jr = function(e) {
    W.cache++,
    (e === !0 || !Yt && !an && !q.fullscreenElement && !q.webkitFullscreenElement && (!sn || ln !== K.innerWidth || Math.abs(K.innerHeight - cn) > K.innerHeight * .25)) && Wt.restart(!0)
}, Mr = {}, Nr = [], Pr = function e() {
    return vr(X, `scrollEnd`, e) || qr(!0)
}, Fr = function(e) {
    return Mr[e] && Mr[e].map(function(e) {
        return e()
    }) || Nr
}, Ir = [], Lr = function(e) {
    for (var t = 0; t < Ir.length; t += 5)
        (!e || Ir[t + 4] && Ir[t + 4].query === e) && (Ir[t].style.cssText = Ir[t + 1],
        Ir[t].getBBox && Ir[t].setAttribute(`transform`, Ir[t + 2] || ``),
        Ir[t + 3].uncache = 1)
}, Rr = function() {
    return W.forEach(function(e) {
        return Bn(e) && ++e.cacheID && (e.rec = e())
    })
}, zr = function(e, t) {
    var n;
    for (Qt = 0; Qt < Y.length; Qt++)
        n = Y[Qt],
        n && (!t || n._ctx === t) && (e ? n.kill(1) : n.revert(!0, !0));
    hn = !0,
    t && Lr(t),
    t || Fr(`revert`)
}, Br = function(e, t) {
    W.cache++,
    (t || !Vr) && W.forEach(function(e) {
        return Bn(e) && e.cacheID++ && (e.rec = 0)
    }),
    zn(e) && (K.history.scrollRestoration = fn = e)
}, Vr, Hr = 0, Ur, Wr = function() {
    if (Ur !== Hr) {
        var e = Ur = Hr;
        requestAnimationFrame(function() {
            return e === Hr && qr(!0)
        })
    }
}, Gr = function() {
    J.appendChild(pn),
    mn = !on && pn.offsetHeight || K.innerHeight,
    J.removeChild(pn)
}, Kr = function(e) {
    return Gt(`.gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end`).forEach(function(t) {
        return t.style.display = e ? `none` : `block`
    })
}, qr = function(e, t) {
    if (Ht = q.documentElement,
    J = q.body,
    Ut = [K, q, Ht, J],
    xn && !e && !hn) {
        _r(X, `scrollEnd`, Pr);
        return
    }
    Gr(),
    Vr = X.isRefreshing = !0,
    hn || Rr();
    var n = Fr(`refreshInit`);
    nn && X.sort(),
    t || zr(),
    W.forEach(function(e) {
        Bn(e) && (e.smooth && (e.target.style.scrollBehavior = `auto`),
        e(0))
    }),
    Y.slice(0).forEach(function(e) {
        return e.refresh()
    }),
    hn = !1,
    Y.forEach(function(e) {
        if (e._subPinOffset && e.pin) {
            var t = e.vars.horizontal ? `offsetWidth` : `offsetHeight`
              , n = e.pin[t];
            e.revert(!0, 1),
            e.adjustPinSpacing(e.pin[t] - n),
            e.refresh()
        }
    }),
    gn = 1,
    Kr(!0),
    Y.forEach(function(e) {
        var t = Ln(e.scroller, e._dir)
          , n = e.vars.end === `max` || e._endClamp && e.end > t
          , r = e._startClamp && e.start >= t;
        (n || r) && e.setPositions(r ? t - 1 : e.start, n ? Math.max(r ? t : e.start + 1, t) : e.end, !0)
    }),
    Kr(!1),
    gn = 0,
    n.forEach(function(e) {
        return e && e.render && e.render(-1)
    }),
    W.forEach(function(e) {
        Bn(e) && (e.smooth && requestAnimationFrame(function() {
            return e.target.style.scrollBehavior = `smooth`
        }),
        e.rec && e(e.rec))
    }),
    Br(fn, 1),
    Wt.pause(),
    Hr++,
    Vr = 2,
    Zr(2),
    Y.forEach(function(e) {
        return Bn(e.vars.onRefresh) && e.vars.onRefresh(e)
    }),
    Vr = X.isRefreshing = !1,
    Fr(`refresh`)
}, Jr = 0, Yr = 1, Xr, Zr = function(e) {
    if (e === 2 || !Vr && !hn) {
        X.isUpdating = !0,
        Xr && Xr.update(0);
        var t = Y.length
          , n = yn()
          , r = n - bn >= 50
          , i = t && Y[0].scroll();
        if (Yr = Jr > i ? -1 : 1,
        Vr || (Jr = i),
        r && (xn && !Xt && n - xn > 200 && (xn = 0,
        Fr(`scrollEnd`)),
        qt = bn,
        bn = n),
        Yr < 0) {
            for (Qt = t; Qt-- > 0; )
                Y[Qt] && Y[Qt].update(0, r);
            Yr = 1
        } else
            for (Qt = 0; Qt < t; Qt++)
                Y[Qt] && Y[Qt].update(0, r);
        X.isUpdating = !1
    }
    Dr = 0
}, Qr = [Kn, qn, Yn, Jn, rr + tr, rr + Qn, rr + er, rr + $n, `display`, `flexShrink`, `float`, `zIndex`, `gridColumnStart`, `gridColumnEnd`, `gridRowStart`, `gridRowEnd`, `gridArea`, `justifySelf`, `alignSelf`, `placeSelf`, `order`], $r = Qr.concat([Xn, Zn, `boxSizing`, `max` + ir, `max` + ar, `position`, rr, nr, nr + er, nr + Qn, nr + tr, nr + $n]), ei = function(e, t, n) {
    ri(n);
    var r = e._gsap;
    if (r.spacerIsNative)
        ri(r.spacerState);
    else if (e._gsap.swappedIn) {
        var i = t.parentNode;
        i && (i.insertBefore(e, t),
        i.removeChild(t))
    }
    e._gsap.swappedIn = !1
}, ti = function(e, t, n, r) {
    if (!e._gsap.swappedIn) {
        for (var i = Qr.length, a = t.style, o = e.style, s; i--; )
            s = Qr[i],
            a[s] = n[s];
        a.position = n.position === `absolute` ? `absolute` : `relative`,
        n.display === `inline` && (a.display = `inline-block`),
        o[Yn] = o[Jn] = `auto`,
        a.flexBasis = n.flexBasis || `auto`,
        a.overflow = `visible`,
        a.boxSizing = `border-box`,
        a[Xn] = dr(e, kt) + or,
        a[Zn] = dr(e, At) + or,
        a[nr] = o[rr] = o[qn] = o[Kn] = `0`,
        ri(r),
        o[Xn] = o[`max` + ir] = n[Xn],
        o[Zn] = o[`max` + ar] = n[Zn],
        o[nr] = n[nr],
        e.parentNode !== t && (e.parentNode.insertBefore(t, e),
        t.appendChild(e)),
        e._gsap.swappedIn = !0
    }
}, ni = /([A-Z])/g, ri = function(e) {
    if (e) {
        var t = e.t.style, n = e.length, r = 0, i, a;
        for ((e.t._gsap || G.core.getCache(e.t)).uncache = 1; r < n; r += 2)
            a = e[r + 1],
            i = e[r],
            a ? t[i] = a : t[i] && t.removeProperty(i.replace(ni, `-$1`).toLowerCase())
    }
}, ii = function(e) {
    for (var t = $r.length, n = e.style, r = [], i = 0; i < t; i++)
        r.push($r[i], n[$r[i]]);
    return r.t = e,
    r
}, ai = function(e, t, n) {
    for (var r = [], i = e.length, a = n ? 8 : 0, o; a < i; a += 2)
        o = e[a],
        r.push(o, o in t ? t[o] : e[a + 1]);
    return r.t = e.t,
    r
}, oi = {
    left: 0,
    top: 0
}, si = function(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
    Bn(e) && (e = e(s)),
    zn(e) && e.substr(0, 3) === `max` && (e = d + (e.charAt(4) === `=` ? Cr(`0` + e.substr(3), n) : 0));
    var m = f ? f.time() : 0, h, g, _;
    if (f && f.seek(0),
    isNaN(e) || (e = +e),
    Vn(e))
        f && (e = G.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, d, e)),
        o && Tr(o, n, r, !0);
    else {
        Bn(t) && (t = t(s));
        var v = (e || `0`).split(` `), y, b, x, S;
        _ = jt(t, s) || J,
        y = ur(_) || {},
        (!y || !y.left && !y.top) && sr(_).display === `none` && (S = _.style.display,
        _.style.display = `block`,
        y = ur(_),
        S ? _.style.display = S : _.style.removeProperty(`display`)),
        b = Cr(v[0], y[r.d]),
        x = Cr(v[1] || `0`, n),
        e = y[r.p] - c[r.p] - l + b + i - x,
        o && Tr(o, x, r, n - x < 20 || o._isStart && x > 20),
        n -= n - x
    }
    if (p && (s[p] = e || -.001,
    e < 0 && (e = 0)),
    a) {
        var C = e + n
          , w = a._isStart;
        h = `scroll` + r.d2,
        Tr(a, C, r, w && C > 20 || !w && (u ? Math.max(J[h], Ht[h]) : a.parentNode[h]) <= C + 1),
        u && (c = ur(o),
        u && (a.style[r.op.p] = c[r.op.p] - r.op.m - a._offset + or))
    }
    return f && _ && (h = ur(_),
    f.seek(d),
    g = ur(_),
    f._caScrollDist = h[r.p] - g[r.p],
    e = e / f._caScrollDist * d),
    f && f.seek(m),
    f ? e : Math.round(e)
}, ci = /(webkit|moz|length|cssText|inset)/i, li = function(e, t, n, r) {
    if (e.parentNode !== t) {
        var i = e.style, a, o;
        if (t === J) {
            for (a in e._stOrig = i.cssText,
            o = sr(e),
            o)
                !+a && !ci.test(a) && o[a] && typeof i[a] == `string` && a !== `0` && (i[a] = o[a]);
            i.top = n,
            i.left = r
        } else
            i.cssText = e._stOrig;
        G.core.getCache(e).uncache = 1,
        t.appendChild(e)
    }
}, ui = function(e, t, n) {
    var r = t
      , i = r;
    return function(t) {
        var a = Math.round(e());
        return a !== r && a !== i && Math.abs(a - r) > 3 && Math.abs(a - i) > 3 && (t = a,
        n && n()),
        i = r,
        r = Math.round(t),
        r
    }
}, di = function(e, t, n) {
    var r = {};
    r[t.p] = `+=` + n,
    G.set(e, r)
}, fi = function(e, t) {
    var n = Nt(e, t)
      , r = `_scroll` + t.p2
      , i = function t(i, a, o, s, c) {
        var l = t.tween
          , u = a.onComplete
          , d = {};
        o ||= n();
        var f = ui(n, o, function() {
            l.kill(),
            t.tween = 0
        });
        return c = s && c || 0,
        s ||= i - o,
        l && l.kill(),
        a[r] = i,
        a.inherit = !1,
        a.modifiers = d,
        d[r] = function() {
            return f(o + s * l.ratio + c * l.ratio * l.ratio)
        }
        ,
        a.onUpdate = function() {
            W.cache++,
            t.tween && Zr()
        }
        ,
        a.onComplete = function() {
            t.tween = 0,
            u && u.call(l)
        }
        ,
        l = t.tween = G.to(e, a),
        l
    };
    return e[r] = n,
    n.wheelHandler = function() {
        return i.tween && i.tween.kill() && (i.tween = 0)
    }
    ,
    _r(e, `wheel`, n.wheelHandler),
    X.isTouch && _r(e, `touchmove`, n.wheelHandler),
    i
}, X = function() {
    function e(t, n) {
        Vt || e.register(G) || console.warn(`Please gsap.registerPlugin(ScrollTrigger)`),
        dn(this),
        this.init(t, n)
    }
    var t = e.prototype;
    return t.init = function(t, n) {
        if (this.progress = this.start = 0,
        this.vars && this.kill(!0, !0),
        !Sn) {
            this.update = this.refresh = this.kill = On;
            return
        }
        t = lr(zn(t) || Vn(t) || t.nodeType ? {
            trigger: t
        } : t, xr);
        var r = t, i = r.onUpdate, a = r.toggleClass, o = r.id, s = r.onToggle, c = r.onRefresh, l = r.scrub, u = r.trigger, d = r.pin, f = r.pinSpacing, p = r.invalidateOnRefresh, m = r.anticipatePin, h = r.onScrubComplete, g = r.onSnapComplete, _ = r.once, v = r.snap, y = r.pinReparent, b = r.pinSpacer, x = r.containerAnimation, S = r.fastScrollEnd, C = r.preventOverlaps, w = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? kt : At, T = !l && l !== 0, E = jt(t.scroller || K), D = G.core.getCache(E), O = Mn(E), k = (`pinType` in t ? t.pinType : xt(E, `pinType`) || O && `fixed`) === `fixed`, A = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], j = T && t.toggleActions.split(` `), M = `markers` in t ? t.markers : xr.markers, N = O ? 0 : parseFloat(sr(E)[`border` + w.p2 + ir]) || 0, P = this, ee = t.onRefreshInit && function() {
            return t.onRefreshInit(P)
        }
        , te = Fn(E, O, w), ne = In(E, O), re = 0, ie = 0, ae = 0, oe = Nt(E, w), F, I, se, ce, le, L, R, ue, z, B, de, fe, pe, me, he, ge, _e, ve, V, ye, H, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, U, Ae, je, Me, Ne, Pe, Fe, Ie;
        if (P._startClamp = P._endClamp = !1,
        P._dir = w,
        m *= 45,
        P.scroller = E,
        P.scroll = x ? x.time.bind(x) : oe,
        ce = oe(),
        P.vars = t,
        n ||= t.animation,
        `refreshPriority` in t && (nn = 1,
        t.refreshPriority === -9999 && (Xr = P)),
        D.tweenScroll = D.tweenScroll || {
            top: fi(E, At),
            left: fi(E, kt)
        },
        P.tweenTo = F = D.tweenScroll[w.p],
        P.scrubDuration = function(e) {
            Ae = Vn(e) && e,
            Ae ? U ? U.duration(e) : U = G.to(n, {
                ease: `expo`,
                totalProgress: `+=0`,
                inherit: !1,
                duration: Ae,
                paused: !0,
                onComplete: function() {
                    return h && h(P)
                }
            }) : (U && U.progress(1).kill(),
            U = 0)
        }
        ,
        n && (n.vars.lazy = !1,
        n._initted && !P.isReverted || n.vars.immediateRender !== !1 && t.immediateRender !== !1 && n.duration() && n.render(0, !0, !0),
        P.animation = n.pause(),
        n.scrollTrigger = P,
        P.scrubDuration(l),
        Oe = 0,
        o ||= n.vars.id),
        v && ((!Hn(v) || v.push) && (v = {
            snapTo: v
        }),
        `scrollBehavior` in J.style && G.set(O ? [J, Ht] : E, {
            scrollBehavior: `auto`
        }),
        W.forEach(function(e) {
            return Bn(e) && e.target === (O ? q.scrollingElement || Ht : E) && (e.smooth = !1)
        }),
        se = Bn(v.snapTo) ? v.snapTo : v.snapTo === `labels` ? pr(n) : v.snapTo === `labelsDirectional` ? hr(n) : v.directional === !1 ? G.utils.snap(v.snapTo) : function(e, t) {
            return mr(v.snapTo)(e, yn() - ie < 500 ? 0 : t.direction)
        }
        ,
        je = v.duration || {
            min: .1,
            max: 2
        },
        je = Hn(je) ? Kt(je.min, je.max) : Kt(je, je),
        Me = G.delayedCall(v.delay || Ae / 2 || .1, function() {
            var e = oe()
              , t = yn() - ie < 500
              , r = F.tween;
            if ((t || Math.abs(P.getVelocity()) < 10) && !r && !Xt && re !== e) {
                var i = (e - L) / me, a = n && !T ? n.totalProgress() : i, o = t ? 0 : (a - ke) / (yn() - qt) * 1e3 || 0, s = G.utils.clamp(-i, 1 - i, Gn(o / 2) * o / .185), c = i + (v.inertia === !1 ? 0 : s), l, u, d = v, f = d.onStart, p = d.onInterrupt, m = d.onComplete;
                if (l = se(c, P),
                Vn(l) || (l = c),
                u = Math.max(0, Math.round(L + l * me)),
                e <= R && e >= L && u !== e) {
                    if (r && !r._initted && r.data <= Gn(u - e))
                        return;
                    v.inertia === !1 && (s = l - i),
                    F(u, {
                        duration: je(Gn(Math.max(Gn(c - a), Gn(l - a)) * .185 / o / .05 || 0)),
                        ease: v.ease || `power3`,
                        data: Gn(u - e),
                        onInterrupt: function() {
                            return Me.restart(!0) && p && Wn(P, p)
                        },
                        onComplete: function() {
                            P.update(),
                            re = oe(),
                            n && !T && (U ? U.resetTo(`totalProgress`, l, n._tTime / n._tDur) : n.progress(l)),
                            Oe = ke = n && !T ? n.totalProgress() : P.progress,
                            g && g(P),
                            m && Wn(P, m)
                        }
                    }, e, s * me, u - e - s * me),
                    f && Wn(P, f, F.tween)
                }
            } else
                P.isActive && re !== e && Me.restart(!0)
        }).pause()),
        o && (Er[o] = P),
        u = P.trigger = jt(u || d !== !0 && d),
        Ie = u && u._gsap && u._gsap.stRevert,
        Ie &&= Ie(P),
        d = d === !0 ? u : jt(d),
        zn(a) && (a = {
            targets: u,
            className: a
        }),
        d && (f === !1 || f === rr || (f = !f && d.parentNode && d.parentNode.style && sr(d.parentNode).display === `flex` ? !1 : nr),
        P.pin = d,
        I = G.core.getCache(d),
        I.spacer ? he = I.pinState : (b && (b = jt(b),
        b && !b.nodeType && (b = b.current || b.nativeElement),
        I.spacerIsNative = !!b,
        b && (I.spacerState = ii(b))),
        I.spacer = ve = b || q.createElement(`div`),
        ve.classList.add(`pin-spacer`),
        o && ve.classList.add(`pin-spacer-` + o),
        I.pinState = he = ii(d)),
        t.force3D !== !1 && G.set(d, {
            force3D: !0
        }),
        P.spacer = ve = I.spacer,
        De = sr(d),
        Se = De[f + w.os2],
        ye = G.getProperty(d),
        H = G.quickSetter(d, w.a, or),
        ti(d, ve, De),
        _e = ii(d)),
        M) {
            fe = Hn(M) ? lr(M, br) : br,
            B = wr(`scroller-start`, o, E, w, fe, 0),
            de = wr(`scroller-end`, o, E, w, fe, 0, B),
            V = B[`offset` + w.op.d2];
            var Le = jt(xt(E, `content`) || E);
            ue = this.markerStart = wr(`start`, o, Le, w, fe, V, 0, x),
            z = this.markerEnd = wr(`end`, o, Le, w, fe, V, 0, x),
            x && (Fe = G.quickSetter([ue, z], w.a, or)),
            !k && !(_t.length && xt(E, `fixedMarkers`) === !0) && (cr(O ? J : E),
            G.set([B, de], {
                force3D: !0
            }),
            we = G.quickSetter(B, w.a, or),
            Ee = G.quickSetter(de, w.a, or))
        }
        if (x) {
            var Re = x.vars.onUpdate
              , ze = x.vars.onUpdateParams;
            x.eventCallback(`onUpdate`, function() {
                P.update(0, 0, 1),
                Re && Re.apply(x, ze || [])
            })
        }
        if (P.previous = function() {
            return Y[Y.indexOf(P) - 1]
        }
        ,
        P.next = function() {
            return Y[Y.indexOf(P) + 1]
        }
        ,
        P.revert = function(e, t) {
            if (!t)
                return P.kill(!0);
            var r = e !== !1 || !P.enabled
              , i = Yt;
            r !== P.isReverted && (r && (Ne = Math.max(oe(), P.scroll.rec || 0),
            ae = P.progress,
            Pe = n && n.progress()),
            ue && [ue, z, B, de].forEach(function(e) {
                return e.style.display = r ? `none` : `block`
            }),
            r && (Yt = P,
            P.update(r)),
            d && (!y || !P.isActive) && (r ? ei(d, ve, he) : ti(d, ve, sr(d), Ce)),
            r || P.update(r),
            Yt = i,
            P.isReverted = r)
        }
        ,
        P.refresh = function(r, i, a, o) {
            if (!Yt && P.enabled || i) {
                if (d && r && xn) {
                    _r(e, `scrollEnd`, Pr);
                    return
                }
                !Vr && ee && ee(P),
                Yt = P,
                F.tween && !a && (F.tween.kill(),
                F.tween = 0),
                U && U.pause(),
                p && n && (n.revert({
                    kill: !1
                }).invalidate(),
                n.getChildren ? n.getChildren(!0, !0, !1).forEach(function(e) {
                    return e.vars.immediateRender && e.render(0, !0, !0)
                }) : n.vars.immediateRender && n.render(0, !0, !0)),
                P.isReverted || P.revert(!0, !0),
                P._subPinOffset = !1;
                var s = te(), l = ne(), m = x ? x.duration() : Ln(E, w), h = me <= .01 || !me, g = 0, _ = o || 0, v = Hn(a) ? a.end : t.end, b = t.endTrigger || u, S = Hn(a) ? a.start : t.start || (t.start === 0 || !u ? 0 : d ? `0 0` : `0 100%`), C = P.pinnedContainer = t.pinnedContainer && jt(t.pinnedContainer, P), D = u && Math.max(0, Y.indexOf(P)) || 0, A = D, j, I, se, fe, V, H, Se, we, Ee, De, Oe, ke, Ae;
                for (M && Hn(a) && (ke = G.getProperty(B, w.p),
                Ae = G.getProperty(de, w.p)); A-- > 0; )
                    H = Y[A],
                    H.end || H.refresh(0, 1) || (Yt = P),
                    Se = H.pin,
                    Se && (Se === u || Se === d || Se === C) && !H.isReverted && (De ||= [],
                    De.unshift(H),
                    H.revert(!0, !0)),
                    H !== Y[A] && (D--,
                    A--);
                for (Bn(S) && (S = S(P)),
                S = Cn(S, `start`, P),
                L = si(S, u, s, w, oe(), ue, B, P, l, N, k, m, x, P._startClamp && `_startClamp`) || (d ? -.001 : 0),
                Bn(v) && (v = v(P)),
                zn(v) && !v.indexOf(`+=`) && (~v.indexOf(` `) ? v = (zn(S) ? S.split(` `)[0] : ``) + v : (g = Cr(v.substr(2), s),
                v = zn(S) ? S : (x ? G.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, L) : L) + g,
                b = u)),
                v = Cn(v, `end`, P),
                R = Math.max(L, si(v || (b ? `100% 0` : m), b, s, w, oe() + g, z, de, P, l, N, k, m, x, P._endClamp && `_endClamp`)) || -.001,
                g = 0,
                A = D; A--; )
                    H = Y[A] || {},
                    Se = H.pin,
                    Se && H.start - H._pinPush <= L && !x && H.end > 0 && (j = H.end - (P._startClamp ? Math.max(0, H.start) : H.start),
                    (Se === u && H.start - H._pinPush < L || Se === C) && isNaN(S) && (g += j * (1 - H.progress)),
                    Se === d && (_ += j));
                if (L += g,
                R += g,
                P._startClamp && (P._startClamp += g),
                P._endClamp && !Vr && (P._endClamp = R || -.001,
                R = Math.min(R, Ln(E, w))),
                me = R - L || (L -= .01) && .001,
                h && (ae = G.utils.clamp(0, 1, G.utils.normalize(L, R, Ne))),
                P._pinPush = _,
                ue && g && (j = {},
                j[w.a] = `+=` + g,
                C && (j[w.p] = `-=` + oe()),
                G.set([ue, z], j)),
                d && !(gn && P.end >= Ln(E, w)))
                    j = sr(d),
                    fe = w === At,
                    se = oe(),
                    be = parseFloat(ye(w.a)) + _,
                    !m && R > 1 && (Oe = (O ? q.scrollingElement || Ht : E).style,
                    Oe = {
                        style: Oe,
                        value: Oe[`overflow` + w.a.toUpperCase()]
                    },
                    O && sr(J)[`overflow` + w.a.toUpperCase()] !== `scroll` && (Oe.style[`overflow` + w.a.toUpperCase()] = `scroll`)),
                    ti(d, ve, j),
                    _e = ii(d),
                    I = ur(d, !0),
                    we = k && Nt(E, fe ? kt : At)(),
                    f ? (Ce = [f + w.os2, me + _ + or],
                    Ce.t = ve,
                    A = f === nr ? dr(d, w) + me + _ : 0,
                    A && (Ce.push(w.d, A + or),
                    ve.style.flexBasis !== `auto` && (ve.style.flexBasis = A + or)),
                    ri(Ce),
                    C && Y.forEach(function(e) {
                        e.pin === C && e.vars.pinSpacing !== !1 && (e._subPinOffset = !0)
                    }),
                    k && oe(Ne)) : (A = dr(d, w),
                    A && ve.style.flexBasis !== `auto` && (ve.style.flexBasis = A + or)),
                    k && (V = {
                        top: I.top + (fe ? se - L : we) + or,
                        left: I.left + (fe ? we : se - L) + or,
                        boxSizing: `border-box`,
                        position: `fixed`
                    },
                    V[Xn] = V[`max` + ir] = Math.ceil(I.width) + or,
                    V[Zn] = V[`max` + ar] = Math.ceil(I.height) + or,
                    V[rr] = V[rr + er] = V[rr + Qn] = V[rr + tr] = V[rr + $n] = `0`,
                    V[nr] = j[nr],
                    V[nr + er] = j[nr + er],
                    V[nr + Qn] = j[nr + Qn],
                    V[nr + tr] = j[nr + tr],
                    V[nr + $n] = j[nr + $n],
                    ge = ai(he, V, y),
                    Vr && oe(0)),
                    n ? (Ee = n._initted,
                    rn(1),
                    n.render(n.duration(), !0, !0),
                    xe = ye(w.a) - be + me + _,
                    Te = Math.abs(me - xe) > 1,
                    k && Te && ge.splice(ge.length - 2, 2),
                    n.render(0, !0, !0),
                    Ee || n.invalidate(!0),
                    n.parent || n.totalTime(n.totalTime()),
                    rn(0)) : xe = me,
                    Oe && (Oe.value ? Oe.style[`overflow` + w.a.toUpperCase()] = Oe.value : Oe.style.removeProperty(`overflow-` + w.a));
                else if (u && oe() && !x)
                    for (I = u.parentNode; I && I !== J; )
                        I._pinOffset && (L -= I._pinOffset,
                        R -= I._pinOffset),
                        I = I.parentNode;
                De && De.forEach(function(e) {
                    return e.revert(!1, !0)
                }),
                P.start = L,
                P.end = R,
                ce = le = Vr ? Ne : oe(),
                !x && !Vr && (ce < Ne && oe(Ne),
                P.scroll.rec = 0),
                P.revert(!1, !0),
                ie = yn(),
                Me && (re = -1,
                Me.restart(!0)),
                Yt = 0,
                n && T && (n._initted || Pe) && n.progress() !== Pe && n.progress(Pe || 0, !0).render(n.time(), !0, !0),
                (h || ae !== P.progress || x || p || n && !n._initted) && (n && !T && (n._initted || ae || n.vars.immediateRender !== !1) && n.totalProgress(x && L < -.001 && !ae ? G.utils.normalize(L, R, 0) : ae, !0),
                P.progress = h || (ce - L) / me === ae ? 0 : ae),
                d && f && (ve._pinOffset = Math.round(P.progress * xe)),
                U && U.invalidate(),
                isNaN(ke) || (ke -= G.getProperty(B, w.p),
                Ae -= G.getProperty(de, w.p),
                di(B, w, ke),
                di(ue, w, ke - (o || 0)),
                di(de, w, Ae),
                di(z, w, Ae - (o || 0))),
                h && !Vr && P.update(),
                c && !Vr && !pe && (pe = !0,
                c(P),
                pe = !1)
            }
        }
        ,
        P.getVelocity = function() {
            return (oe() - le) / (yn() - qt) * 1e3 || 0
        }
        ,
        P.endAnimation = function() {
            Un(P.callbackAnimation),
            n && (U ? U.progress(1) : n.paused() ? T || Un(n, P.direction < 0, 1) : Un(n, n.reversed()))
        }
        ,
        P.labelToScroll = function(e) {
            return n && n.labels && (L || P.refresh() || L) + n.labels[e] / n.duration() * me || 0
        }
        ,
        P.getTrailing = function(e) {
            var t = Y.indexOf(P)
              , n = P.direction > 0 ? Y.slice(0, t).reverse() : Y.slice(t + 1);
            return (zn(e) ? n.filter(function(t) {
                return t.vars.preventOverlaps === e
            }) : n).filter(function(e) {
                return P.direction > 0 ? e.end <= L : e.start >= R
            })
        }
        ,
        P.update = function(e, t, r) {
            if (!x || r || e) {
                var o = Vr === !0 ? Ne : P.scroll(), c = e ? 0 : (o - L) / me, u = c < 0 ? 0 : c > 1 ? 1 : c || 0, p = P.progress, h, g, b, D, O, M, N, ee;
                if (t && (le = ce,
                ce = x ? oe() : o,
                v && (ke = Oe,
                Oe = n && !T ? n.totalProgress() : u)),
                m && d && !Yt && !vn && xn && (!u && L < o + (o - le) / (yn() - qt) * m ? u = 1e-4 : u === 1 && R > o + (o - le) / (yn() - qt) * m && (u = .9999)),
                u !== p && P.enabled) {
                    if (h = P.isActive = !!u && u < 1,
                    g = !!p && p < 1,
                    M = h !== g,
                    O = M || !!u != !!p,
                    P.direction = u > p ? 1 : -1,
                    P.progress = u,
                    O && !Yt && (b = u && !p ? 0 : u === 1 ? 1 : p === 1 ? 2 : 3,
                    T && (D = !M && j[b + 1] !== `none` && j[b + 1] || j[b],
                    ee = n && (D === `complete` || D === `reset` || D in n))),
                    C && (M || ee) && (ee || l || !n) && (Bn(C) ? C(P) : P.getTrailing(C).forEach(function(e) {
                        return e.endAnimation()
                    })),
                    T || (U && !Yt && !vn ? (U._dp._time - U._start !== U._time && U.render(U._dp._time - U._start),
                    U.resetTo ? U.resetTo(`totalProgress`, u, n._tTime / n._tDur) : (U.vars.totalProgress = u,
                    U.invalidate().restart())) : n && n.totalProgress(u, !!(Yt && (ie || e)))),
                    d) {
                        if (e && f && (ve.style[f + w.os2] = Se),
                        !k)
                            H(kn(be + xe * u));
                        else if (O) {
                            if (N = !e && u > p && R + 1 > o && o + 1 >= Ln(E, w),
                            y) {
                                if (!e && (h || N)) {
                                    var te = ur(d, !0)
                                      , ne = o - L;
                                    li(d, J, te.top + (w === At ? ne : 0) + or, te.left + (w === At ? 0 : ne) + or)
                                } else
                                    li(d, ve)
                            }
                            ri(h || N ? ge : _e),
                            Te && u < 1 && h || H(be + (u === 1 && !N ? xe : 0))
                        }
                    }
                    v && !F.tween && !Yt && !vn && Me.restart(!0),
                    a && (M || _ && u && (u < 1 || !_n)) && Gt(a.targets).forEach(function(e) {
                        return e.classList[h || _ ? `add` : `remove`](a.className)
                    }),
                    i && !T && !e && i(P),
                    O && !Yt ? (T && (ee && (D === `complete` ? n.pause().totalProgress(1) : D === `reset` ? n.restart(!0).pause() : D === `restart` ? n.restart(!0) : n[D]()),
                    i && i(P)),
                    (M || !_n) && (s && M && Wn(P, s),
                    A[b] && Wn(P, A[b]),
                    _ && (u === 1 ? P.kill(!1, 1) : A[b] = 0),
                    M || (b = u === 1 ? 1 : 3,
                    A[b] && Wn(P, A[b]))),
                    S && !h && Math.abs(P.getVelocity()) > (Vn(S) ? S : 2500) && (Un(P.callbackAnimation),
                    U ? U.progress(1) : Un(n, D === `reverse` ? 1 : !u, 1))) : T && i && !Yt && i(P)
                }
                if (Ee) {
                    var re = x ? o / x.duration() * (x._caScrollDist || 0) : o;
                    we(re + +!!B._isFlipped),
                    Ee(re)
                }
                Fe && Fe(-o / x.duration() * (x._caScrollDist || 0))
            }
        }
        ,
        P.enable = function(t, n) {
            P.enabled || (P.enabled = !0,
            _r(E, `resize`, jr),
            O || _r(E, `scroll`, kr),
            ee && _r(e, `refreshInit`, ee),
            t !== !1 && (P.progress = ae = 0,
            ce = le = re = oe()),
            n !== !1 && P.refresh())
        }
        ,
        P.getTween = function(e) {
            return e && F ? F.tween : U
        }
        ,
        P.setPositions = function(e, t, n, r) {
            if (x) {
                var i = x.scrollTrigger
                  , a = x.duration()
                  , o = i.end - i.start;
                e = i.start + o * e / a,
                t = i.start + o * t / a
            }
            P.refresh(!1, !1, {
                start: wn(e, n && !!P._startClamp),
                end: wn(t, n && !!P._endClamp)
            }, r),
            P.update()
        }
        ,
        P.adjustPinSpacing = function(e) {
            if (Ce && e) {
                var t = Ce.indexOf(w.d) + 1;
                Ce[t] = parseFloat(Ce[t]) + e + or,
                Ce[1] = parseFloat(Ce[1]) + e + or,
                ri(Ce)
            }
        }
        ,
        P.disable = function(t, n) {
            if (t !== !1 && P.revert(!0, !0),
            P.enabled && (P.enabled = P.isActive = !1,
            n || U && U.pause(),
            Ne = 0,
            I && (I.uncache = 1),
            ee && vr(e, `refreshInit`, ee),
            Me && (Me.pause(),
            F.tween && F.tween.kill() && (F.tween = 0)),
            !O)) {
                for (var r = Y.length; r--; )
                    if (Y[r].scroller === E && Y[r] !== P)
                        return;
                vr(E, `resize`, jr),
                O || vr(E, `scroll`, kr)
            }
        }
        ,
        P.kill = function(e, r) {
            P.disable(e, r),
            U && !r && U.kill(),
            o && delete Er[o];
            var i = Y.indexOf(P);
            i >= 0 && Y.splice(i, 1),
            i === Qt && Yr > 0 && Qt--,
            i = 0,
            Y.forEach(function(e) {
                return e.scroller === P.scroller && (i = 1)
            }),
            i || Vr || (P.scroll.rec = 0),
            n && (n.scrollTrigger = null,
            e && n.revert({
                kill: !1
            }),
            r || n.kill()),
            ue && [ue, z, B, de].forEach(function(e) {
                return e.parentNode && e.parentNode.removeChild(e)
            }),
            Xr === P && (Xr = 0),
            d && (I && (I.uncache = 1),
            i = 0,
            Y.forEach(function(e) {
                return e.pin === d && i++
            }),
            i || (I.spacer = 0)),
            t.onKill && t.onKill(P)
        }
        ,
        Y.push(P),
        P.enable(!1, !1),
        Ie && Ie(P),
        n && n.add && !me) {
            var Be = P.update;
            P.update = function() {
                P.update = Be,
                W.cache++,
                L || R || P.refresh()
            }
            ,
            G.delayedCall(.01, P.update),
            me = .01,
            L = R = 0
        } else
            P.refresh();
        d && Wr()
    }
    ,
    e.register = function(t) {
        return Vt ||= (G = t || jn(),
        An() && window.document && e.enable(),
        Sn),
        Vt
    }
    ,
    e.defaults = function(e) {
        if (e)
            for (var t in e)
                xr[t] = e[t];
        return xr
    }
    ,
    e.disable = function(e, t) {
        Sn = 0,
        Y.forEach(function(n) {
            return n[t ? `kill` : `disable`](e)
        }),
        vr(K, `wheel`, kr),
        vr(q, `scroll`, kr),
        clearInterval(Jt),
        vr(q, `touchcancel`, On),
        vr(J, `touchstart`, On),
        gr(vr, q, `pointerdown,touchstart,mousedown`, En),
        gr(vr, q, `pointerup,touchend,mouseup`, Dn),
        Wt.kill(),
        Rn(vr);
        for (var n = 0; n < W.length; n += 3)
            yr(vr, W[n], W[n + 1]),
            yr(vr, W[n], W[n + 2])
    }
    ,
    e.enable = function() {
        if (K = window,
        q = document,
        Ht = q.documentElement,
        J = q.body,
        G) {
            if (Gt = G.utils.toArray,
            Kt = G.utils.clamp,
            dn = G.core.context || On,
            rn = G.core.suppressOverwrites || On,
            fn = K.history.scrollRestoration || `auto`,
            Jr = K.pageYOffset || 0,
            G.core.globals(`ScrollTrigger`, e),
            J) {
                Sn = 1,
                pn = document.createElement(`div`),
                pn.style.height = `100vh`,
                pn.style.position = `absolute`,
                Gr(),
                Tn(),
                zt.register(G),
                e.isTouch = zt.isTouch,
                un = zt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
                sn = zt.isTouch === 1,
                _r(K, `wheel`, kr),
                Ut = [K, q, Ht, J],
                G.matchMedia ? (e.matchMedia = function(e) {
                    var t = G.matchMedia(), n;
                    for (n in e)
                        t.add(n, e[n]);
                    return t
                }
                ,
                G.addEventListener(`matchMediaInit`, function() {
                    Rr(),
                    zr()
                }),
                G.addEventListener(`matchMediaRevert`, function() {
                    return Lr()
                }),
                G.addEventListener(`matchMedia`, function() {
                    qr(0, 1),
                    Fr(`matchMedia`)
                }),
                G.matchMedia().add(`(orientation: portrait)`, function() {
                    return Ar(),
                    Ar
                })) : console.warn(`Requires GSAP 3.11.0 or later`),
                Ar(),
                _r(q, `scroll`, kr);
                var t = J.hasAttribute(`style`), n = J.style, r = n.borderTopStyle, i = G.core.Animation.prototype, a, o;
                for (i.revert || Object.defineProperty(i, "revert", {
                    value: function() {
                        return this.time(-.01, !0)
                    }
                }),
                n.borderTopStyle = `solid`,
                a = ur(J),
                At.m = Math.round(a.top + At.sc()) || 0,
                kt.m = Math.round(a.left + kt.sc()) || 0,
                r ? n.borderTopStyle = r : n.removeProperty(`border-top-style`),
                t || (J.setAttribute(`style`, ``),
                J.removeAttribute(`style`)),
                Jt = setInterval(Or, 250),
                G.delayedCall(.5, function() {
                    return vn = 0
                }),
                _r(q, `touchcancel`, On),
                _r(J, `touchstart`, On),
                gr(_r, q, `pointerdown,touchstart,mousedown`, En),
                gr(_r, q, `pointerup,touchend,mouseup`, Dn),
                Zt = G.utils.checkPrefix(`transform`),
                $r.push(Zt),
                Vt = yn(),
                Wt = G.delayedCall(.2, qr).pause(),
                tn = [q, `visibilitychange`, function() {
                    var e = K.innerWidth
                      , t = K.innerHeight;
                    q.hidden ? ($t = e,
                    en = t) : ($t !== e || en !== t) && jr()
                }
                , q, `DOMContentLoaded`, qr, K, `load`, qr, K, `resize`, jr],
                Rn(_r),
                Y.forEach(function(e) {
                    return e.enable(0, 1)
                }),
                o = 0; o < W.length; o += 3)
                    yr(vr, W[o], W[o + 1]),
                    yr(vr, W[o], W[o + 2])
            } else
                q && q.addEventListener(`DOMContentLoaded`, function t() {
                    e.enable(),
                    q.removeEventListener(`DOMContentLoaded`, t)
                })
        }
    }
    ,
    e.config = function(t) {
        `limitCallbacks` in t && (_n = !!t.limitCallbacks);
        var n = t.syncInterval;
        n && clearInterval(Jt) || (Jt = n) && setInterval(Or, n),
        `ignoreMobileResize` in t && (sn = e.isTouch === 1 && t.ignoreMobileResize),
        `autoRefreshEvents` in t && (Rn(vr) || Rn(_r, t.autoRefreshEvents || `none`),
        an = (t.autoRefreshEvents + ``).indexOf(`resize`) === -1)
    }
    ,
    e.scrollerProxy = function(e, t) {
        var n = jt(e)
          , r = W.indexOf(n)
          , i = Mn(n);
        ~r && W.splice(r, i ? 6 : 2),
        t && (i ? _t.unshift(K, t, J, t, Ht, t) : _t.unshift(n, t))
    }
    ,
    e.clearMatchMedia = function(e) {
        Y.forEach(function(t) {
            return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0)
        })
    }
    ,
    e.isInViewport = function(e, t, n) {
        var r = (zn(e) ? jt(e) : e).getBoundingClientRect()
          , i = r[n ? Xn : Zn] * t || 0;
        return n ? r.right - i > 0 && r.left + i < K.innerWidth : r.bottom - i > 0 && r.top + i < K.innerHeight
    }
    ,
    e.positionInViewport = function(e, t, n) {
        zn(e) && (e = jt(e));
        var r = e.getBoundingClientRect()
          , i = r[n ? Xn : Zn]
          , a = t == null ? i / 2 : t in Sr ? Sr[t] * i : ~t.indexOf(`%`) ? parseFloat(t) * i / 100 : parseFloat(t) || 0;
        return n ? (r.left + a) / K.innerWidth : (r.top + a) / K.innerHeight
    }
    ,
    e.killAll = function(e) {
        if (Y.slice(0).forEach(function(e) {
            return e.vars.id !== `ScrollSmoother` && e.kill()
        }),
        e !== !0) {
            var t = Mr.killAll || [];
            Mr = {},
            t.forEach(function(e) {
                return e()
            })
        }
    }
    ,
    e
}();
X.version = `3.15.0`,
X.saveStyles = function(e) {
    return e ? Gt(e).forEach(function(e) {
        if (e && e.style) {
            var t = Ir.indexOf(e);
            t >= 0 && Ir.splice(t, 5),
            Ir.push(e, e.style.cssText, e.getBBox && e.getAttribute(`transform`), G.core.getCache(e), dn())
        }
    }) : Ir
}
,
X.revert = function(e, t) {
    return zr(!e, t)
}
,
X.create = function(e, t) {
    return new X(e,t)
}
,
X.refresh = function(e) {
    return e ? jr(!0) : (Vt || X.register()) && qr(!0)
}
,
X.update = function(e) {
    return ++W.cache && Zr(e === !0 ? 2 : 0)
}
,
X.clearScrollMemory = Br,
X.maxScroll = function(e, t) {
    return Ln(e, t ? kt : At)
}
,
X.getScrollFunc = function(e, t) {
    return Nt(jt(e), t ? kt : At)
}
,
X.getById = function(e) {
    return Er[e]
}
,
X.getAll = function() {
    return Y.filter(function(e) {
        return e.vars.id !== `ScrollSmoother`
    })
}
,
X.isScrolling = function() {
    return !!xn
}
,
X.snapDirectional = mr,
X.addEventListener = function(e, t) {
    var n = Mr[e] || (Mr[e] = []);
    ~n.indexOf(t) || n.push(t)
}
,
X.removeEventListener = function(e, t) {
    var n = Mr[e]
      , r = n && n.indexOf(t);
    r >= 0 && n.splice(r, 1)
}
,
X.batch = function(e, t) {
    var n = [], r = {}, i = t.interval || .016, a = t.batchMax || 1e9, o = function(e, t) {
        var n = []
          , r = []
          , o = G.delayedCall(i, function() {
            t(n, r),
            n = [],
            r = []
        }).pause();
        return function(e) {
            n.length || o.restart(!0),
            n.push(e.trigger),
            r.push(e),
            a <= n.length && o.progress(1)
        }
    }, s;
    for (s in t)
        r[s] = s.substr(0, 2) === `on` && Bn(t[s]) && s !== `onRefreshInit` ? o(s, t[s]) : t[s];
    return Bn(a) && (a = a(),
    _r(X, `refresh`, function() {
        return a = t.batchMax()
    })),
    Gt(e).forEach(function(e) {
        var t = {};
        for (s in r)
            t[s] = r[s];
        t.trigger = e,
        n.push(X.create(t))
    }),
    n
}
;
var pi = function(e, t, n, r) {
    return t > r ? e(r) : t < 0 && e(0),
    n > r ? (r - t) / (n - t) : n < 0 ? t / (t - n) : 1
}, mi = function e(t, n) {
    n === !0 ? t.style.removeProperty(`touch-action`) : t.style.touchAction = n === !0 ? `auto` : n ? `pan-` + n + (zt.isTouch ? ` pinch-zoom` : ``) : `none`,
    t === Ht && e(J, n)
}, hi = {
    auto: 1,
    scroll: 1
}, gi = function(e) {
    var t = e.event, n = e.target, r = e.axis, i = (t.changedTouches ? t.changedTouches[0] : t).target, a = i._gsap || G.core.getCache(i), o = yn(), s;
    if (!a._isScrollT || o - a._isScrollT > 2e3) {
        for (; i && i !== J && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(hi[(s = sr(i)).overflowY] || hi[s.overflowX])); )
            i = i.parentNode;
        a._isScroll = i && i !== n && !Mn(i) && (hi[(s = sr(i)).overflowY] || hi[s.overflowX]),
        a._isScrollT = o
    }
    (a._isScroll || r === `x`) && (t.stopPropagation(),
    t._gsapAllow = !0)
}, _i = function(e, t, n, r) {
    return zt.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: t,
        onWheel: r &&= gi,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
            return n && _r(q, zt.eventTypes[0], bi, !1, !0)
        },
        onDisable: function() {
            return vr(q, zt.eventTypes[0], bi, !0)
        }
    })
}, vi = /(input|label|select|textarea)/i, yi, bi = function(e) {
    var t = vi.test(e.target.tagName);
    (t || yi) && (e._gsapAllow = !0,
    yi = t)
}, xi = function(e) {
    Hn(e) || (e = {}),
    e.preventDefault = e.isNormalizer = e.allowClicks = !0,
    e.type || (e.type = `wheel,touch`),
    e.debounce = !!e.debounce,
    e.id = e.id || `normalizer`;
    var t = e, n = t.normalizeScrollX, r = t.momentum, i = t.allowNestedScroll, a = t.onRelease, o, s, c = jt(e.target) || Ht, l = G.core.globals().ScrollSmoother, u = l && l.get(), d = un && (e.content && jt(e.content) || u && e.content !== !1 && !u.smooth() && u.content()), f = Nt(c, At), p = Nt(c, kt), m = 1, h = (zt.isTouch && K.visualViewport ? K.visualViewport.scale * K.visualViewport.width : K.outerWidth) / K.innerWidth, g = 0, _ = Bn(r) ? function() {
        return r(o)
    }
    : function() {
        return r || 2.8
    }
    , v, y, b = _i(c, e.type, !0, i), x = function() {
        return y = !1
    }, S = On, C = On, w = function() {
        s = Ln(c, At),
        C = Kt(+!!un, s),
        n && (S = Kt(0, Ln(c, kt))),
        v = Hr
    }, T = function() {
        d._gsap.y = kn(parseFloat(d._gsap.y) + f.offset) + `px`,
        d.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ` + parseFloat(d._gsap.y) + `, 0, 1)`,
        f.offset = f.cacheID = 0
    }, E = function() {
        if (y) {
            requestAnimationFrame(x);
            var e = kn(o.deltaY / 2)
              , t = C(f.v - e);
            if (d && t !== f.v + f.offset) {
                f.offset = t - f.v;
                var n = kn((parseFloat(d && d._gsap.y) || 0) - f.offset);
                d.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ` + n + `, 0, 1)`,
                d._gsap.y = n + `px`,
                f.cacheID = W.cache,
                Zr()
            }
            return !0
        }
        f.offset && T(),
        y = !0
    }, D, O, k, A, j = function() {
        w(),
        D.isActive() && D.vars.scrollY > s && (f() > s ? D.progress(1) && f(s) : D.resetTo(`scrollY`, s))
    };
    return d && G.set(d, {
        y: `+=0`
    }),
    e.ignoreCheck = function(e) {
        return un && e.type === `touchmove` && E(e) || m > 1.05 && e.type !== `touchstart` || o.isGesturing || e.touches && e.touches.length > 1
    }
    ,
    e.onPress = function() {
        y = !1;
        var e = m;
        m = kn((K.visualViewport && K.visualViewport.scale || 1) / h),
        D.pause(),
        e !== m && mi(c, m > 1.01 || !n && `x`),
        O = p(),
        k = f(),
        w(),
        v = Hr
    }
    ,
    e.onRelease = e.onGestureStart = function(e, t) {
        if (f.offset && T(),
        !t)
            A.restart(!0);
        else {
            W.cache++;
            var r = _(), i, o;
            n && (i = p(),
            o = i + r * .05 * -e.velocityX / .227,
            r *= pi(p, i, o, Ln(c, kt)),
            D.vars.scrollX = S(o)),
            i = f(),
            o = i + r * .05 * -e.velocityY / .227,
            r *= pi(f, i, o, Ln(c, At)),
            D.vars.scrollY = C(o),
            D.invalidate().duration(r).play(.01),
            (un && D.vars.scrollY >= s || i >= s - 1) && G.to({}, {
                onUpdate: j,
                duration: r
            })
        }
        a && a(e)
    }
    ,
    e.onWheel = function() {
        D._ts && D.pause(),
        yn() - g > 1e3 && (v = 0,
        g = yn())
    }
    ,
    e.onChange = function(e, t, r, i, a) {
        if (Hr !== v && w(),
        t && n && p(S(i[2] === t ? O + (e.startX - e.x) : p() + t - i[1])),
        r) {
            f.offset && T();
            var o = a[2] === r
              , s = o ? k + e.startY - e.y : f() + r - a[1]
              , c = C(s);
            o && s !== c && (k += c - s),
            f(c)
        }
        (r || t) && Zr()
    }
    ,
    e.onEnable = function() {
        mi(c, !n && `x`),
        X.addEventListener(`refresh`, j),
        _r(K, `resize`, j),
        f.smooth &&= (f.target.style.scrollBehavior = `auto`,
        p.smooth = !1),
        b.enable()
    }
    ,
    e.onDisable = function() {
        mi(c, !0),
        vr(K, `resize`, j),
        X.removeEventListener(`refresh`, j),
        b.kill()
    }
    ,
    e.lockAxis = e.lockAxis !== !1,
    o = new zt(e),
    o.iOS = un,
    un && !f() && f(1),
    un && G.ticker.add(On),
    A = o._dc,
    D = G.to(o, {
        ease: `power4`,
        paused: !0,
        inherit: !1,
        scrollX: n ? `+=0.1` : `+=0`,
        scrollY: `+=0.1`,
        modifiers: {
            scrollY: ui(f, f(), function() {
                return D.pause()
            })
        },
        onUpdate: Zr,
        onComplete: A.vars.onComplete
    }),
    o
};
X.sort = function(e) {
    if (Bn(e))
        return Y.sort(e);
    var t = K.pageYOffset || 0;
    return X.getAll().forEach(function(e) {
        return e._sortY = e.trigger ? t + e.trigger.getBoundingClientRect().top : e.start + K.innerHeight
    }),
    Y.sort(e || function(e, t) {
        return (e.vars.refreshPriority || 0) * -1e6 + (e.vars.containerAnimation ? 1e6 : e._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6)
    }
    )
}
,
X.observe = function(e) {
    return new zt(e)
}
,
X.normalizeScroll = function(e) {
    if (e === void 0)
        return on;
    if (e === !0 && on)
        return on.enable();
    if (e === !1) {
        on && on.kill(),
        on = e;
        return
    }
    var t = e instanceof zt ? e : xi(e);
    return on && on.target === t.target && on.kill(),
    Mn(t.target) && (on = t),
    t
}
,
X.core = {
    _getVelocityProp: Pt,
    _inputObserver: _i,
    _scrollers: W,
    _proxies: _t,
    bridge: {
        ss: function() {
            xn || Fr(`scrollStart`),
            xn = yn()
        },
        ref: function() {
            return Yt
        }
    }
},
jn() && G.registerPlugin(X);
function Si(e) {
    if (e === void 0)
        throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);
    return e
}
function Ci(e, t) {
    e.prototype = Object.create(t.prototype),
    e.prototype.constructor = e,
    e.__proto__ = t
}
var wi = {
    autoSleep: 120,
    force3D: `auto`,
    nullTargetWarn: 1,
    units: {
        lineHeight: ``
    }
}, Ti = {
    duration: .5,
    overwrite: !1,
    delay: 0
}, Ei, Di, Oi, ki = 1e8, Z = 1 / ki, Ai = Math.PI * 2, ji = Ai / 4, Mi = 0, Ni = Math.sqrt, Pi = Math.cos, Fi = Math.sin, Ii = function(e) {
    return typeof e == `string`
}, Li = function(e) {
    return typeof e == `function`
}, Ri = function(e) {
    return typeof e == `number`
}, zi = function(e) {
    return e === void 0
}, Bi = function(e) {
    return typeof e == `object`
}, Vi = function(e) {
    return e !== !1
}, Hi = function() {
    return typeof window < `u`
}, Ui = function(e) {
    return Li(e) || Ii(e)
}, Wi = typeof ArrayBuffer == `function` && ArrayBuffer.isView || function() {}
, Gi = Array.isArray, Ki = /random\([^)]+\)/g, qi = /,\s*/g, Ji = /(?:-?\.?\d|\.)+/gi, Yi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Xi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Zi = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Qi = /[+-]=-?[.\d]+/, $i = /[^,'"\[\]\s]+/gi, ea = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ta, na, ra, ia, aa = {}, oa = {}, sa, ca = function(e) {
    return (oa = Ba(e, aa)) && ic
}, la = function(e, t) {
    return console.warn(`Invalid property`, e, `set to`, t, `Missing plugin? gsap.registerPlugin()`)
}, ua = function(e, t) {
    return !t && console.warn(e)
}, da = function(e, t) {
    return e && (aa[e] = t) && oa && (oa[e] = t) || aa
}, fa = function() {
    return 0
}, pa = {
    suppressEvents: !0,
    isStart: !0,
    kill: !1
}, ma = {
    suppressEvents: !0,
    kill: !1
}, ha = {
    suppressEvents: !0
}, ga = {}, _a = [], va = {}, ya, ba = {}, xa = {}, Sa = 30, Ca = [], wa = ``, Ta = function(e) {
    var t = e[0], n, r;
    if (Bi(t) || Li(t) || (e = [e]),
    !(n = (t._gsap || {}).harness)) {
        for (r = Ca.length; r-- && !Ca[r].targetTest(t); )
            ;
        n = Ca[r]
    }
    for (r = e.length; r--; )
        e[r] && (e[r]._gsap || (e[r]._gsap = new ms(e[r],n))) || e.splice(r, 1);
    return e
}, Ea = function(e) {
    return e._gsap || Ta(wo(e))[0]._gsap
}, Da = function(e, t, n) {
    return (n = e[t]) && Li(n) ? e[t]() : zi(n) && e.getAttribute && e.getAttribute(t) || n
}, Oa = function(e, t) {
    return (e = e.split(`,`)).forEach(t) || e
}, ka = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, Aa = function(e) {
    return Math.round(e * 1e7) / 1e7 || 0
}, ja = function(e, t) {
    var n = t.charAt(0)
      , r = parseFloat(t.substr(2));
    return e = parseFloat(e),
    n === `+` ? e + r : n === `-` ? e - r : n === `*` ? e * r : e / r
}, Ma = function(e, t) {
    for (var n = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < n; )
        ;
    return r < n
}, Na = function() {
    var e = _a.length, t = _a.slice(0), n, r;
    for (va = {},
    _a.length = 0,
    n = 0; n < e; n++)
        r = t[n],
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0)
}, Pa = function(e) {
    return !!(e._initted || e._startAt || e.add)
}, Fa = function(e, t, n, r) {
    _a.length && !Di && Na(),
    e.render(t, n, r || !!(Di && t < 0 && Pa(e))),
    _a.length && !Di && Na()
}, Ia = function(e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + ``).match($i).length < 2 ? t : Ii(e) ? e.trim() : e
}, La = function(e) {
    return e
}, Ra = function(e, t) {
    for (var n in t)
        n in e || (e[n] = t[n]);
    return e
}, za = function(e) {
    return function(t, n) {
        for (var r in n)
            r in t || r === `duration` && e || r === `ease` || (t[r] = n[r])
    }
}, Ba = function(e, t) {
    for (var n in t)
        e[n] = t[n];
    return e
}, Va = function e(t, n) {
    for (var r in n)
        r !== `__proto__` && r !== `constructor` && r !== `prototype` && (t[r] = Bi(n[r]) ? e(t[r] || (t[r] = {}), n[r]) : n[r]);
    return t
}, Ha = function(e, t) {
    var n = {}, r;
    for (r in e)
        r in t || (n[r] = e[r]);
    return n
}, Ua = function(e) {
    var t = e.parent || ta
      , n = e.keyframes ? za(Gi(e.keyframes)) : Ra;
    if (Vi(e.inherit))
        for (; t; )
            n(e, t.vars.defaults),
            t = t.parent || t._dp;
    return e
}, Wa = function(e, t) {
    for (var n = e.length, r = n === t.length; r && n-- && e[n] === t[n]; )
        ;
    return n < 0
}, Ga = function(e, t, n, r, i) {
    n === void 0 && (n = `_first`),
    r === void 0 && (r = `_last`);
    var a = e[r], o;
    if (i)
        for (o = t[i]; a && a[i] > o; )
            a = a._prev;
    return a ? (t._next = a._next,
    a._next = t) : (t._next = e[n],
    e[n] = t),
    t._next ? t._next._prev = t : e[r] = t,
    t._prev = a,
    t.parent = t._dp = e,
    t
}, Ka = function(e, t, n, r) {
    n === void 0 && (n = `_first`),
    r === void 0 && (r = `_last`);
    var i = t._prev
      , a = t._next;
    i ? i._next = a : e[n] === t && (e[n] = a),
    a ? a._prev = i : e[r] === t && (e[r] = i),
    t._next = t._prev = t.parent = null
}, qa = function(e, t) {
    e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e),
    e._act = 0
}, Ja = function(e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
        for (var n = e; n; )
            n._dirty = 1,
            n = n.parent;
    return e
}, Ya = function(e) {
    for (var t = e.parent; t && t.parent; )
        t._dirty = 1,
        t.totalDuration(),
        t = t.parent;
    return e
}, Xa = function(e, t, n, r) {
    return e._startAt && (Di ? e._startAt.revert(ma) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r))
}, Za = function e(t) {
    return !t || t._ts && e(t.parent)
}, Qa = function(e) {
    return e._repeat ? $a(e._tTime, e = e.duration() + e._rDelay) * e : 0
}, $a = function(e, t) {
    var n = Math.floor(e = Aa(e / t));
    return e && n === e ? n - 1 : n
}, eo = function(e, t) {
    return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
}, to = function(e) {
    return e._end = Aa(e._start + (e._tDur / Math.abs(e._ts || e._rts || Z) || 0))
}, no = function(e, t) {
    var n = e._dp;
    return n && n.smoothChildTiming && e._ts && (e._start = Aa(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)),
    to(e),
    n._dirty || Ja(n, e)),
    e
}, ro = function(e, t) {
    var n;
    if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = eo(e.rawTime(), t),
    (!t._dur || vo(0, t.totalDuration(), n) - t._tTime > Z) && t.render(n, !0)),
    Ja(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration())
            for (n = e; n._dp; )
                n.rawTime() >= 0 && n.totalTime(n._tTime),
                n = n._dp;
        e._zTime = -Z
    }
}, io = function(e, t, n, r) {
    return t.parent && qa(t),
    t._start = Aa((Ri(n) ? n : n || e !== ta ? ho(e, n, t) : e._time) + t._delay),
    t._end = Aa(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
    Ga(e, t, `_first`, `_last`, e._sort ? `_start` : 0),
    co(t) || (e._recent = t),
    r || ro(e, t),
    e._ts < 0 && no(e, e._tTime),
    e
}, ao = function(e, t) {
    return (aa.ScrollTrigger || la(`scrollTrigger`, t)) && aa.ScrollTrigger.create(t, e)
}, oo = function(e, t, n, r, i) {
    if (Cs(e, t, i),
    !e._initted)
        return 1;
    if (!n && e._pt && !Di && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && ya !== ts.frame)
        return _a.push(e),
        e._lazy = [i, r],
        1
}, so = function e(t) {
    var n = t.parent;
    return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || e(n))
}, co = function(e) {
    var t = e.data;
    return t === `isFromStart` || t === `isStart`
}, lo = function(e, t, n, r) {
    var i = e.ratio, a = t < 0 || !t && (!e._start && so(e) && (e._initted || !co(e)) || (e._ts < 0 || e._dp._ts < 0) && !co(e)) ? 0 : 1, o = e._rDelay, s = 0, c, l, u;
    if (o && e._repeat && (s = vo(0, e._tDur, t),
    l = $a(s, o),
    e._yoyo && l & 1 && (a = 1 - a),
    l !== $a(e._tTime, o) && (i = 1 - a,
    e.vars.repeatRefresh && e._initted && e.invalidate())),
    a !== i || Di || r || e._zTime === Z || !t && e._zTime) {
        if (!e._initted && oo(e, t, r, n, s))
            return;
        for (u = e._zTime,
        e._zTime = t || (n ? Z : 0),
        n ||= t && !u,
        e.ratio = a,
        e._from && (a = 1 - a),
        e._time = 0,
        e._tTime = s,
        c = e._pt; c; )
            c.r(a, c.d),
            c = c._next;
        t < 0 && Xa(e, t, n, !0),
        e._onUpdate && !n && Vo(e, `onUpdate`),
        s && e._repeat && !n && e.parent && Vo(e, `onRepeat`),
        (t >= e._tDur || t < 0) && e.ratio === a && (a && qa(e, 1),
        !n && !Di && (Vo(e, a ? `onComplete` : `onReverseComplete`, !0),
        e._prom && e._prom()))
    } else
        e._zTime ||= t
}, uo = function(e, t, n) {
    var r;
    if (n > t)
        for (r = e._first; r && r._start <= n; ) {
            if (r.data === `isPause` && r._start > t)
                return r;
            r = r._next
        }
    else
        for (r = e._last; r && r._start >= n; ) {
            if (r.data === `isPause` && r._start < t)
                return r;
            r = r._prev
        }
}, fo = function(e, t, n, r) {
    var i = e._repeat
      , a = Aa(t) || 0
      , o = e._tTime / e._tDur;
    return o && !r && (e._time *= a / e._dur),
    e._dur = a,
    e._tDur = i ? i < 0 ? 1e10 : Aa(a * (i + 1) + e._rDelay * i) : a,
    o > 0 && !r && no(e, e._tTime = e._tDur * o),
    e.parent && to(e),
    n || Ja(e.parent, e),
    e
}, po = function(e) {
    return e instanceof gs ? Ja(e) : fo(e, e._dur)
}, mo = {
    _start: 0,
    endTime: fa,
    totalDuration: fa
}, ho = function e(t, n, r) {
    var i = t.labels, a = t._recent || mo, o = t.duration() >= ki ? a.endTime(!1) : t._dur, s, c, l;
    return Ii(n) && (isNaN(n) || n in i) ? (c = n.charAt(0),
    l = n.substr(-1) === `%`,
    s = n.indexOf(`=`),
    c === `<` || c === `>` ? (s >= 0 && (n = n.replace(/=/, ``)),
    (c === `<` ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (l ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (n in i || (i[n] = o),
    i[n]) : (c = parseFloat(n.charAt(s - 1) + n.substr(s + 1)),
    l && r && (c = c / 100 * (Gi(r) ? r[0] : r).totalDuration()),
    s > 1 ? e(t, n.substr(0, s - 1), r) + c : o + c)) : n == null ? o : +n
}, go = function(e, t, n) {
    var r = Ri(t[1]), i = (r ? 2 : 1) + (e < 2 ? 0 : 1), a = t[i], o, s;
    if (r && (a.duration = t[1]),
    a.parent = n,
    e) {
        for (o = a,
        s = n; s && !(`immediateRender` in o); )
            o = s.vars.defaults || {},
            s = Vi(s.vars.inherit) && s.parent;
        a.immediateRender = Vi(o.immediateRender),
        e < 2 ? a.runBackwards = 1 : a.startAt = t[i - 1]
    }
    return new As(t[0],a,t[i + 1])
}, _o = function(e, t) {
    return e || e === 0 ? t(e) : t
}, vo = function(e, t, n) {
    return n < e ? e : n > t ? t : n
}, yo = function(e, t) {
    return !Ii(e) || !(t = ea.exec(e)) ? `` : t[1]
}, bo = function(e, t, n) {
    return _o(n, function(n) {
        return vo(e, t, n)
    })
}, xo = [].slice, So = function(e, t) {
    return e && Bi(e) && `length` in e && (!t && !e.length || e.length - 1 in e && Bi(e[0])) && !e.nodeType && e !== na
}, Co = function(e, t, n) {
    return n === void 0 && (n = []),
    e.forEach(function(e) {
        var r;
        return Ii(e) && !t || So(e, 1) ? (r = n).push.apply(r, wo(e)) : n.push(e)
    }) || n
}, wo = function(e, t, n) {
    return Oi && !t && Oi.selector ? Oi.selector(e) : Ii(e) && !n && (ra || !ns()) ? xo.call((t || ia).querySelectorAll(e), 0) : Gi(e) ? Co(e, n) : So(e) ? xo.call(e, 0) : e ? [e] : []
}, To = function(e) {
    return e = wo(e)[0] || ua(`Invalid scope`) || {},
    function(t) {
        var n = e.current || e.nativeElement || e;
        return wo(t, n.querySelectorAll ? n : n === e ? ua(`Invalid scope`) || ia.createElement(`div`) : e)
    }
}, Eo = function(e) {
    return e.sort(function() {
        return .5 - Math.random()
    })
}, Do = function(e) {
    if (Li(e))
        return e;
    var t = Bi(e) ? e : {
        each: e
    }
      , n = ls(t.ease)
      , r = t.from || 0
      , i = parseFloat(t.base) || 0
      , a = {}
      , o = r > 0 && r < 1
      , s = isNaN(r) || o
      , c = t.axis
      , l = r
      , u = r;
    return Ii(r) ? l = u = {
        center: .5,
        edges: .5,
        end: 1
    }[r] || 0 : !o && s && (l = r[0],
    u = r[1]),
    function(e, o, d) {
        var f = (d || t).length, p = a[f], m, h, g, _, v, y, b, x, S;
        if (!p) {
            if (S = t.grid === `auto` ? 0 : (t.grid || [1, ki])[1],
            !S) {
                for (b = -ki; b < (b = d[S++].getBoundingClientRect().left) && S < f; )
                    ;
                S < f && S--
            }
            for (p = a[f] = [],
            m = s ? Math.min(S, f) * l - .5 : r % S,
            h = S === ki ? 0 : s ? f * u / S - .5 : r / S | 0,
            b = 0,
            x = ki,
            y = 0; y < f; y++)
                g = y % S - m,
                _ = h - (y / S | 0),
                p[y] = v = c ? Math.abs(c === `y` ? _ : g) : Ni(g * g + _ * _),
                v > b && (b = v),
                v < x && (x = v);
            r === `random` && Eo(p),
            p.max = b - x,
            p.min = x,
            p.v = f = (parseFloat(t.amount) || parseFloat(t.each) * (S > f ? f - 1 : c ? c === `y` ? f / S : S : Math.max(S, f / S)) || 0) * (r === `edges` ? -1 : 1),
            p.b = f < 0 ? i - f : i,
            p.u = yo(t.amount || t.each) || 0,
            n = n && f < 0 ? cs(n) : n
        }
        return f = (p[e] - p.min) / p.max || 0,
        Aa(p.b + (n ? n(f) : f) * p.v) + p.u
    }
}, Oo = function(e) {
    var t = 10 ** ((e + ``).split(`.`)[1] || ``).length;
    return function(n) {
        var r = Aa(Math.round(parseFloat(n) / e) * e * t);
        return (r - r % 1) / t + (Ri(n) ? 0 : yo(n))
    }
}, ko = function(e, t) {
    var n = Gi(e), r, i;
    return !n && Bi(e) && (r = n = e.radius || ki,
    e.values ? (e = wo(e.values),
    (i = !Ri(e[0])) && (r *= r)) : e = Oo(e.increment)),
    _o(t, n ? Li(e) ? function(t) {
        return i = e(t),
        Math.abs(i - t) <= r ? i : t
    }
    : function(t) {
        for (var n = parseFloat(i ? t.x : t), a = parseFloat(i ? t.y : 0), o = ki, s = 0, c = e.length, l, u; c--; )
            i ? (l = e[c].x - n,
            u = e[c].y - a,
            l = l * l + u * u) : l = Math.abs(e[c] - n),
            l < o && (o = l,
            s = c);
        return s = !r || o <= r ? e[s] : t,
        i || s === t || Ri(t) ? s : s + yo(t)
    }
    : Oo(e))
}, Ao = function(e, t, n, r) {
    return _o(Gi(e) ? !t : n === !0 ? !!(n = 0) : !r, function() {
        return Gi(e) ? e[~~(Math.random() * e.length)] : (n ||= 1e-5) && (r = n < 1 ? 10 ** ((n + ``).length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * .99)) / n) * n * r) / r
    })
}, jo = function() {
    var e = [...arguments];
    return function(t) {
        return e.reduce(function(e, t) {
            return t(e)
        }, t)
    }
}, Mo = function(e, t) {
    return function(n) {
        return e(parseFloat(n)) + (t || yo(n))
    }
}, No = function(e, t, n) {
    return Ro(e, t, 0, 1, n)
}, Po = function(e, t, n) {
    return _o(n, function(n) {
        return e[~~t(n)]
    })
}, Fo = function e(t, n, r) {
    var i = n - t;
    return Gi(t) ? Po(t, e(0, t.length), n) : _o(r, function(e) {
        return (i + (e - t) % i) % i + t
    })
}, Io = function e(t, n, r) {
    var i = n - t
      , a = i * 2;
    return Gi(t) ? Po(t, e(0, t.length - 1), n) : _o(r, function(e) {
        return e = (a + (e - t) % a) % a || 0,
        t + (e > i ? a - e : e)
    })
}, Lo = function(e) {
    return e.replace(Ki, function(e) {
        var t = e.indexOf(`[`) + 1
          , n = e.substring(t || 7, t ? e.indexOf(`]`) : e.length - 1).split(qi);
        return Ao(t ? n : +n[0], t ? 0 : +n[1], +n[2] || 1e-5)
    })
}, Ro = function(e, t, n, r, i) {
    var a = t - e
      , o = r - n;
    return _o(i, function(t) {
        return n + ((t - e) / a * o || 0)
    })
}, zo = function e(t, n, r, i) {
    var a = isNaN(t + n) ? 0 : function(e) {
        return (1 - e) * t + e * n
    }
    ;
    if (!a) {
        var o = Ii(t), s = {}, c, l, u, d, f;
        if (r === !0 && (i = 1) && (r = null),
        o)
            t = {
                p: t
            },
            n = {
                p: n
            };
        else if (Gi(t) && !Gi(n)) {
            for (u = [],
            d = t.length,
            f = d - 2,
            l = 1; l < d; l++)
                u.push(e(t[l - 1], t[l]));
            d--,
            a = function(e) {
                e *= d;
                var t = Math.min(f, ~~e);
                return u[t](e - t)
            }
            ,
            r = n
        } else
            i || (t = Ba(Gi(t) ? [] : {}, t));
        if (!u) {
            for (c in n)
                vs.call(s, t, c, `get`, n[c]);
            a = function(e) {
                return zs(e, s) || (o ? t.p : t)
            }
        }
    }
    return _o(r, a)
}, Bo = function(e, t, n) {
    var r = e.labels, i = ki, a, o, s;
    for (a in r)
        o = r[a] - t,
        o < 0 == !!n && o && i > (o = Math.abs(o)) && (s = a,
        i = o);
    return s
}, Vo = function(e, t, n) {
    var r = e.vars, i = r[t], a = Oi, o = e._ctx, s, c, l;
    if (i)
        return s = r[t + `Params`],
        c = r.callbackScope || e,
        n && _a.length && Na(),
        o && (Oi = o),
        l = s ? i.apply(c, s) : i.call(c),
        Oi = a,
        l
}, Ho = function(e) {
    return qa(e),
    e.scrollTrigger && e.scrollTrigger.kill(!!Di),
    e.progress() < 1 && Vo(e, `onInterrupt`),
    e
}, Uo, Wo = [], Go = function(e) {
    if (e) {
        if (e = !e.name && e.default || e,
        Hi() || e.headless) {
            var t = e.name
              , n = Li(e)
              , r = t && !n && e.init ? function() {
                this._props = []
            }
            : e
              , i = {
                init: fa,
                render: zs,
                add: vs,
                kill: Vs,
                modifier: Bs,
                rawVars: 0
            }
              , a = {
                targetTest: 0,
                get: 0,
                getSetter: Fs,
                aliases: {},
                register: 0
            };
            if (ns(),
            e !== r) {
                if (ba[t])
                    return;
                Ra(r, Ra(Ha(e, i), a)),
                Ba(r.prototype, Ba(i, Ha(e, a))),
                ba[r.prop = t] = r,
                e.targetTest && (Ca.push(r),
                ga[t] = 1),
                t = (t === `css` ? `CSS` : t.charAt(0).toUpperCase() + t.substr(1)) + `Plugin`
            }
            da(t, r),
            e.register && e.register(ic, r, Ws)
        } else
            Wo.push(e)
    }
}, Q = 255, Ko = {
    aqua: [0, Q, Q],
    lime: [0, Q, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, Q],
    navy: [0, 0, 128],
    white: [Q, Q, Q],
    olive: [128, 128, 0],
    yellow: [Q, Q, 0],
    orange: [Q, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [Q, 0, 0],
    pink: [Q, 192, 203],
    cyan: [0, Q, Q],
    transparent: [Q, Q, Q, 0]
}, qo = function(e, t, n) {
    return e += e < 0 ? 1 : e > 1 ? -1 : 0,
    (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * Q + .5 | 0
}, Jo = function(e, t, n) {
    var r = e ? Ri(e) ? [e >> 16, e >> 8 & Q, e & Q] : 0 : Ko.black, i, a, o, s, c, l, u, d, f, p;
    if (!r) {
        if (e.substr(-1) === `,` && (e = e.substr(0, e.length - 1)),
        Ko[e])
            r = Ko[e];
        else if (e.charAt(0) === `#`) {
            if (e.length < 6 && (i = e.charAt(1),
            a = e.charAt(2),
            o = e.charAt(3),
            e = `#` + i + i + a + a + o + o + (e.length === 5 ? e.charAt(4) + e.charAt(4) : ``)),
            e.length === 9)
                return r = parseInt(e.substr(1, 6), 16),
                [r >> 16, r >> 8 & Q, r & Q, parseInt(e.substr(7), 16) / 255];
            e = parseInt(e.substr(1), 16),
            r = [e >> 16, e >> 8 & Q, e & Q]
        } else if (e.substr(0, 3) === `hsl`) {
            if (r = p = e.match(Ji),
            !t)
                s = r[0] % 360 / 360,
                c = r[1] / 100,
                l = r[2] / 100,
                a = l <= .5 ? l * (c + 1) : l + c - l * c,
                i = l * 2 - a,
                r.length > 3 && (r[3] *= 1),
                r[0] = qo(s + 1 / 3, i, a),
                r[1] = qo(s, i, a),
                r[2] = qo(s - 1 / 3, i, a);
            else if (~e.indexOf(`=`))
                return r = e.match(Yi),
                n && r.length < 4 && (r[3] = 1),
                r
        } else
            r = e.match(Ji) || Ko.transparent;
        r = r.map(Number)
    }
    return t && !p && (i = r[0] / Q,
    a = r[1] / Q,
    o = r[2] / Q,
    u = Math.max(i, a, o),
    d = Math.min(i, a, o),
    l = (u + d) / 2,
    u === d ? s = c = 0 : (f = u - d,
    c = l > .5 ? f / (2 - u - d) : f / (u + d),
    s = u === i ? (a - o) / f + (a < o ? 6 : 0) : u === a ? (o - i) / f + 2 : (i - a) / f + 4,
    s *= 60),
    r[0] = ~~(s + .5),
    r[1] = ~~(c * 100 + .5),
    r[2] = ~~(l * 100 + .5)),
    n && r.length < 4 && (r[3] = 1),
    r
}, Yo = function(e) {
    var t = []
      , n = []
      , r = -1;
    return e.split(Zo).forEach(function(e) {
        var i = e.match(Xi) || [];
        t.push.apply(t, i),
        n.push(r += i.length + 1)
    }),
    t.c = n,
    t
}, Xo = function(e, t, n) {
    var r = ``, i = (e + r).match(Zo), a = t ? `hsla(` : `rgba(`, o = 0, s, c, l, u;
    if (!i)
        return e;
    if (i = i.map(function(e) {
        return (e = Jo(e, t, 1)) && a + (t ? e[0] + `,` + e[1] + `%,` + e[2] + `%,` + e[3] : e.join(`,`)) + `)`
    }),
    n && (l = Yo(e),
    s = n.c,
    s.join(r) !== l.c.join(r)))
        for (c = e.replace(Zo, `1`).split(Xi),
        u = c.length - 1; o < u; o++)
            r += c[o] + (~s.indexOf(o) ? i.shift() || a + `0,0,0,0)` : (l.length ? l : i.length ? i : n).shift());
    if (!c)
        for (c = e.split(Zo),
        u = c.length - 1; o < u; o++)
            r += c[o] + i[o];
    return r + c[u]
}, Zo = function() {
    var e = `(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`, t;
    for (t in Ko)
        e += `|` + t + `\\b`;
    return RegExp(e + `)`, `gi`)
}(), Qo = /hsl[a]?\(/, $o = function(e) {
    var t = e.join(` `), n;
    if (Zo.lastIndex = 0,
    Zo.test(t))
        return n = Qo.test(t),
        e[1] = Xo(e[1], n),
        e[0] = Xo(e[0], n, Yo(e[1])),
        !0
}, es, ts = function() {
    var e = Date.now, t = 500, n = 33, r = e(), i = r, a = 1e3 / 240, o = a, s = [], c, l, u, d, f, p, m = function u(m) {
        var h = e() - i, g = m === !0, _, v, y, b;
        if ((h > t || h < 0) && (r += h - n),
        i += h,
        y = i - r,
        _ = y - o,
        (_ > 0 || g) && (b = ++d.frame,
        f = y - d.time * 1e3,
        d.time = y /= 1e3,
        o += _ + (_ >= a ? 4 : a - _),
        v = 1),
        g || (c = l(u)),
        v)
            for (p = 0; p < s.length; p++)
                s[p](y, f, b, m)
    };
    return d = {
        time: 0,
        frame: 0,
        tick: function() {
            m(!0)
        },
        deltaRatio: function(e) {
            return f / (1e3 / (e || 60))
        },
        wake: function() {
            sa && (!ra && Hi() && (na = ra = window,
            ia = na.document || {},
            aa.gsap = ic,
            (na.gsapVersions || (na.gsapVersions = [])).push(ic.version),
            ca(oa || na.GreenSockGlobals || !na.gsap && na || {}),
            Wo.forEach(Go)),
            u = typeof requestAnimationFrame < `u` && requestAnimationFrame,
            c && d.sleep(),
            l = u || function(e) {
                return setTimeout(e, o - d.time * 1e3 + 1 | 0)
            }
            ,
            es = 1,
            m(2))
        },
        sleep: function() {
            (u ? cancelAnimationFrame : clearTimeout)(c),
            es = 0,
            l = fa
        },
        lagSmoothing: function(e, r) {
            t = e || 1 / 0,
            n = Math.min(r || 33, t)
        },
        fps: function(e) {
            a = 1e3 / (e || 240),
            o = d.time * 1e3 + a
        },
        add: function(e, t, n) {
            var r = t ? function(t, n, i, a) {
                e(t, n, i, a),
                d.remove(r)
            }
            : e;
            return d.remove(e),
            s[n ? `unshift` : `push`](r),
            ns(),
            r
        },
        remove: function(e, t) {
            ~(t = s.indexOf(e)) && s.splice(t, 1) && p >= t && p--
        },
        _listeners: s
    },
    d
}(), ns = function() {
    return !es && ts.wake()
}, $ = {}, rs = /^[\d.\-M][\d.\-,\s]/, is = /["']/g, as = function(e) {
    for (var t = {}, n = e.substr(1, e.length - 3).split(`:`), r = n[0], i = 1, a = n.length, o, s, c; i < a; i++)
        s = n[i],
        o = i === a - 1 ? s.length : s.lastIndexOf(`,`),
        c = s.substr(0, o),
        t[r] = isNaN(c) ? c.replace(is, ``).trim() : +c,
        r = s.substr(o + 1).trim();
    return t
}, os = function(e) {
    var t = e.indexOf(`(`) + 1
      , n = e.indexOf(`)`)
      , r = e.indexOf(`(`, t);
    return e.substring(t, ~r && r < n ? e.indexOf(`)`, n + 1) : n)
}, ss = function(e) {
    var t = (e + ``).split(`(`)
      , n = $[t[0]];
    return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf(`{`) ? [as(t[1])] : os(e).split(`,`).map(Ia)) : $._CE && rs.test(e) ? $._CE(``, e) : n
}, cs = function(e) {
    return function(t) {
        return 1 - e(1 - t)
    }
}, ls = function(e, t) {
    return e && (Li(e) ? e : $[e] || ss(e)) || t
}, us = function(e, t, n, r) {
    n === void 0 && (n = function(e) {
        return 1 - t(1 - e)
    }
    ),
    r === void 0 && (r = function(e) {
        return e < .5 ? t(e * 2) / 2 : 1 - t((1 - e) * 2) / 2
    }
    );
    var i = {
        easeIn: t,
        easeOut: n,
        easeInOut: r
    }, a;
    return Oa(e, function(e) {
        for (var t in $[e] = aa[e] = i,
        $[a = e.toLowerCase()] = n,
        i)
            $[a + (t === `easeIn` ? `.in` : t === `easeOut` ? `.out` : `.inOut`)] = $[e + `.` + t] = i[t]
    }),
    i
}, ds = function(e) {
    return function(t) {
        return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2
    }
}, fs = function e(t, n, r) {
    var i = n >= 1 ? n : 1
      , a = (r || (t ? .3 : .45)) / (n < 1 ? n : 1)
      , o = a / Ai * (Math.asin(1 / i) || 0)
      , s = function(e) {
        return e === 1 ? 1 : i * 2 ** (-10 * e) * Fi((e - o) * a) + 1
    }
      , c = t === `out` ? s : t === `in` ? function(e) {
        return 1 - s(1 - e)
    }
    : ds(s);
    return a = Ai / a,
    c.config = function(n, r) {
        return e(t, n, r)
    }
    ,
    c
}, ps = function e(t, n) {
    n === void 0 && (n = 1.70158);
    var r = function(e) {
        return e ? --e * e * ((n + 1) * e + n) + 1 : 0
    }
      , i = t === `out` ? r : t === `in` ? function(e) {
        return 1 - r(1 - e)
    }
    : ds(r);
    return i.config = function(n) {
        return e(t, n)
    }
    ,
    i
};
Oa(`Linear,Quad,Cubic,Quart,Quint,Strong`, function(e, t) {
    var n = t < 5 ? t + 1 : t;
    us(e + `,Power` + (n - 1), t ? function(e) {
        return e ** +n
    }
    : function(e) {
        return e
    }
    , function(e) {
        return 1 - (1 - e) ** n
    }, function(e) {
        return e < .5 ? (e * 2) ** n / 2 : 1 - ((1 - e) * 2) ** n / 2
    })
}),
$.Linear.easeNone = $.none = $.Linear.easeIn,
us(`Elastic`, fs(`in`), fs(`out`), fs()),
(function(e, t) {
    var n = 1 / t
      , r = 2 * n
      , i = 2.5 * n
      , a = function(a) {
        return a < n ? e * a * a : a < r ? e * (a - 1.5 / t) ** 2 + .75 : a < i ? e * (a -= 2.25 / t) * a + .9375 : e * (a - 2.625 / t) ** 2 + .984375
    };
    us(`Bounce`, function(e) {
        return 1 - a(1 - e)
    }, a)
}
)(7.5625, 2.75),
us(`Expo`, function(e) {
    return 2 ** (10 * (e - 1)) * e + e * e * e * e * e * e * (1 - e)
}),
us(`Circ`, function(e) {
    return -(Ni(1 - e * e) - 1)
}),
us(`Sine`, function(e) {
    return e === 1 ? 1 : -Pi(e * ji) + 1
}),
us(`Back`, ps(`in`), ps(`out`), ps()),
$.SteppedEase = $.steps = aa.SteppedEase = {
    config: function(e, t) {
        e === void 0 && (e = 1);
        var n = 1 / e
          , r = e + +!t
          , i = +!!t
          , a = 1 - Z;
        return function(e) {
            return ((r * vo(0, a, e) | 0) + i) * n
        }
    }
},
Ti.ease = $[`quad.out`],
Oa(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`, function(e) {
    return wa += e + `,` + e + `Params,`
});
var ms = function(e, t) {
    this.id = Mi++,
    e._gsap = this,
    this.target = e,
    this.harness = t,
    this.get = t ? t.get : Da,
    this.set = t ? t.getSetter : Fs
}
  , hs = function() {
    function e(e) {
        this.vars = e,
        this._delay = +e.delay || 0,
        (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0,
        this._yoyo = !!e.yoyo || !!e.yoyoEase),
        this._ts = 1,
        fo(this, +e.duration, 1, 1),
        this.data = e.data,
        Oi && (this._ctx = Oi,
        Oi.data.push(this)),
        es || ts.wake()
    }
    var t = e.prototype;
    return t.delay = function(e) {
        return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay),
        this._delay = e,
        this) : this._delay
    }
    ,
    t.duration = function(e) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur
    }
    ,
    t.totalDuration = function(e) {
        return arguments.length ? (this._dirty = 0,
        fo(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }
    ,
    t.totalTime = function(e, t) {
        if (ns(),
        !arguments.length)
            return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
            for (no(this, e),
            !n._dp || n.parent || ro(n, this); n && n.parent; )
                n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0),
                n = n.parent;
            !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && io(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== e || !this._dur && !t || this._initted && Math.abs(this._zTime) === Z || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e),
        Fa(this, e, t)),
        this
    }
    ,
    t.time = function(e, t) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Qa(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), t) : this._time
    }
    ,
    t.totalProgress = function(e, t) {
        return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
    }
    ,
    t.progress = function(e, t) {
        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + Qa(this), t) : this.duration() ? Math.min(1, this._time / this._dur) : +(this.rawTime() > 0)
    }
    ,
    t.iteration = function(e, t) {
        var n = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (e - 1) * n, t) : this._repeat ? $a(this._tTime, n) + 1 : 1
    }
    ,
    t.timeScale = function(e, t) {
        if (!arguments.length)
            return this._rts === -Z ? 0 : this._rts;
        if (this._rts === e)
            return this;
        var n = this.parent && this._ts ? eo(this.parent._time, this) : this._tTime;
        return this._rts = +e || 0,
        this._ts = this._ps || e === -Z ? 0 : this._rts,
        this.totalTime(vo(-Math.abs(this._delay), this.totalDuration(), n), t !== !1),
        to(this),
        Ya(this)
    }
    ,
    t.paused = function(e) {
        return arguments.length ? (this._ps !== e && (this._ps = e,
        e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
        this._ts = this._act = 0) : (ns(),
        this._ts = this._rts,
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Z && (this._tTime -= Z)))),
        this) : this._ps
    }
    ,
    t.startTime = function(e) {
        if (arguments.length) {
            this._start = Aa(e);
            var t = this.parent || this._dp;
            return t && (t._sort || !this.parent) && io(t, this, this._start - this._delay),
            this
        }
        return this._start
    }
    ,
    t.endTime = function(e) {
        return this._start + (Vi(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }
    ,
    t.rawTime = function(e) {
        var t = this.parent || this._dp;
        return t ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? eo(t.rawTime(e), this) : this._tTime : this._tTime
    }
    ,
    t.revert = function(e) {
        e === void 0 && (e = ha);
        var t = Di;
        return Di = e,
        Pa(this) && (this.timeline && this.timeline.revert(e),
        this.totalTime(-.01, e.suppressEvents)),
        this.data !== `nested` && e.kill !== !1 && this.kill(),
        Di = t,
        this
    }
    ,
    t.globalTime = function(e) {
        for (var t = this, n = arguments.length ? e : t.rawTime(); t; )
            n = t._start + n / (Math.abs(t._ts) || 1),
            t = t._dp;
        return !this.parent && this._sat ? this._sat.globalTime(e) : n
    }
    ,
    t.repeat = function(e) {
        return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e,
        po(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
    }
    ,
    t.repeatDelay = function(e) {
        if (arguments.length) {
            var t = this._time;
            return this._rDelay = e,
            po(this),
            t ? this.time(t) : this
        }
        return this._rDelay
    }
    ,
    t.yoyo = function(e) {
        return arguments.length ? (this._yoyo = e,
        this) : this._yoyo
    }
    ,
    t.seek = function(e, t) {
        return this.totalTime(ho(this, e), Vi(t))
    }
    ,
    t.restart = function(e, t) {
        return this.play().totalTime(e ? -this._delay : 0, Vi(t)),
        this._dur || (this._zTime = -Z),
        this
    }
    ,
    t.play = function(e, t) {
        return e != null && this.seek(e, t),
        this.reversed(!1).paused(!1)
    }
    ,
    t.reverse = function(e, t) {
        return e != null && this.seek(e || this.totalDuration(), t),
        this.reversed(!0).paused(!1)
    }
    ,
    t.pause = function(e, t) {
        return e != null && this.seek(e, t),
        this.paused(!0)
    }
    ,
    t.resume = function() {
        return this.paused(!1)
    }
    ,
    t.reversed = function(e) {
        return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -Z : 0)),
        this) : this._rts < 0
    }
    ,
    t.invalidate = function() {
        return this._initted = this._act = 0,
        this._zTime = -Z,
        this
    }
    ,
    t.isActive = function() {
        var e = this.parent || this._dp, t = this._start, n;
        return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= t && n < this.endTime(!0) - Z)
    }
    ,
    t.eventCallback = function(e, t, n) {
        var r = this.vars;
        return arguments.length > 1 ? (t ? (r[e] = t,
        n && (r[e + `Params`] = n),
        e === `onUpdate` && (this._onUpdate = t)) : delete r[e],
        this) : r[e]
    }
    ,
    t.then = function(e) {
        var t = this
          , n = t._prom;
        return new Promise(function(r) {
            var i = Li(e) ? e : La
              , a = function() {
                var e = t.then;
                t.then = null,
                n && n(),
                Li(i) && (i = i(t)) && (i.then || i === t) && (t.then = e),
                r(i),
                t.then = e
            };
            t._initted && t.totalProgress() === 1 && t._ts >= 0 || !t._tTime && t._ts < 0 ? a() : t._prom = a
        }
        )
    }
    ,
    t.kill = function() {
        Ho(this)
    }
    ,
    e
}();
Ra(hs.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -Z,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var gs = function(e) {
    Ci(t, e);
    function t(t, n) {
        var r;
        return t === void 0 && (t = {}),
        r = e.call(this, t) || this,
        r.labels = {},
        r.smoothChildTiming = !!t.smoothChildTiming,
        r.autoRemoveChildren = !!t.autoRemoveChildren,
        r._sort = Vi(t.sortChildren),
        ta && io(t.parent || ta, Si(r), n),
        t.reversed && r.reverse(),
        t.paused && r.paused(!0),
        t.scrollTrigger && ao(Si(r), t.scrollTrigger),
        r
    }
    var n = t.prototype;
    return n.to = function(e, t, n) {
        return go(0, arguments, this),
        this
    }
    ,
    n.from = function(e, t, n) {
        return go(1, arguments, this),
        this
    }
    ,
    n.fromTo = function(e, t, n, r) {
        return go(2, arguments, this),
        this
    }
    ,
    n.set = function(e, t, n) {
        return t.duration = 0,
        t.parent = this,
        Ua(t).repeatDelay || (t.repeat = 0),
        t.immediateRender = !!t.immediateRender,
        new As(e,t,ho(this, n),1),
        this
    }
    ,
    n.call = function(e, t, n) {
        return io(this, As.delayedCall(0, e, t), n)
    }
    ,
    n.staggerTo = function(e, t, n, r, i, a, o) {
        return n.duration = t,
        n.stagger = n.stagger || r,
        n.onComplete = a,
        n.onCompleteParams = o,
        n.parent = this,
        new As(e,n,ho(this, i)),
        this
    }
    ,
    n.staggerFrom = function(e, t, n, r, i, a, o) {
        return n.runBackwards = 1,
        Ua(n).immediateRender = Vi(n.immediateRender),
        this.staggerTo(e, t, n, r, i, a, o)
    }
    ,
    n.staggerFromTo = function(e, t, n, r, i, a, o, s) {
        return r.startAt = n,
        Ua(r).immediateRender = Vi(r.immediateRender),
        this.staggerTo(e, t, r, i, a, o, s)
    }
    ,
    n.render = function(e, t, n) {
        var r = this._time, i = this._dirty ? this.totalDuration() : this._tDur, a = this._dur, o = e <= 0 ? 0 : Aa(e), s = this._zTime < 0 != e < 0 && (this._initted || !a), c, l, u, d, f, p, m, h, g, _, v, y;
        if (this !== ta && o > i && e >= 0 && (o = i),
        o !== this._tTime || n || s) {
            if (r !== this._time && a && (o += this._time - r,
            e += this._time - r),
            c = o,
            g = this._start,
            h = this._ts,
            p = !h,
            s && (a || (r = this._zTime),
            (e || !t) && (this._zTime = e)),
            this._repeat) {
                if (v = this._yoyo,
                f = a + this._rDelay,
                this._repeat < -1 && e < 0)
                    return this.totalTime(f * 100 + e, t, n);
                if (c = Aa(o % f),
                o === i ? (d = this._repeat,
                c = a) : (_ = Aa(o / f),
                d = ~~_,
                d && d === _ && (c = a,
                d--),
                c > a && (c = a)),
                _ = $a(this._tTime, f),
                !r && this._tTime && _ !== d && this._tTime - _ * f - this._dur <= 0 && (_ = d),
                v && d & 1 && (c = a - c,
                y = 1),
                d !== _ && !this._lock) {
                    var b = v && _ & 1
                      , x = b === (v && d & 1);
                    if (d < _ && (b = !b),
                    r = b ? 0 : o % a ? a : o,
                    this._lock = 1,
                    this.render(r || (y ? 0 : Aa(d * f)), t, !a)._lock = 0,
                    this._tTime = o,
                    !t && this.parent && Vo(this, `onRepeat`),
                    this.vars.repeatRefresh && !y && (this.invalidate()._lock = 1,
                    _ = d),
                    r && r !== this._time || p !== !this._ts || this.vars.onRepeat && !this.parent && !this._act || (a = this._dur,
                    i = this._tDur,
                    x && (this._lock = 2,
                    r = b ? a : -1e-4,
                    this.render(r, !0),
                    this.vars.repeatRefresh && !y && this.invalidate()),
                    this._lock = 0,
                    !this._ts && !p))
                        return this
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (m = uo(this, Aa(r), Aa(c)),
            m && (o -= c - (c = m._start))),
            this._tTime = o,
            this._time = c,
            this._act = !!h,
            this._initted || (this._onUpdate = this.vars.onUpdate,
            this._initted = 1,
            this._zTime = e,
            r = 0),
            !r && o && a && !t && !_ && (Vo(this, `onStart`),
            this._tTime !== o))
                return this;
            if (c >= r && e >= 0)
                for (l = this._first; l; ) {
                    if (u = l._next,
                    (l._act || c >= l._start) && l._ts && m !== l) {
                        if (l.parent !== this)
                            return this.render(e, t, n);
                        if (l.render(l._ts > 0 ? (c - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (c - l._start) * l._ts, t, n),
                        c !== this._time || !this._ts && !p) {
                            m = 0,
                            u && (o += this._zTime = -Z);
                            break
                        }
                    }
                    l = u
                }
            else {
                l = this._last;
                for (var S = e < 0 ? e : c; l; ) {
                    if (u = l._prev,
                    (l._act || S <= l._end) && l._ts && m !== l) {
                        if (l.parent !== this)
                            return this.render(e, t, n);
                        if (l.render(l._ts > 0 ? (S - l._start) * l._ts : (l._dirty ? l.totalDuration() : l._tDur) + (S - l._start) * l._ts, t, n || Di && Pa(l)),
                        c !== this._time || !this._ts && !p) {
                            m = 0,
                            u && (o += this._zTime = S ? -Z : Z);
                            break
                        }
                    }
                    l = u
                }
            }
            if (m && !t && (this.pause(),
            m.render(c >= r ? 0 : -Z)._zTime = c >= r ? 1 : -1,
            this._ts))
                return this._start = g,
                to(this),
                this.render(e, t, n);
            this._onUpdate && !t && Vo(this, `onUpdate`, !0),
            (o === i && this._tTime >= this.totalDuration() || !o && r) && (g === this._start || Math.abs(h) !== Math.abs(this._ts)) && (this._lock || ((e || !a) && (o === i && this._ts > 0 || !o && this._ts < 0) && qa(this, 1),
            !t && !(e < 0 && !r) && (o || r || !i) && (Vo(this, o === i && e >= 0 ? `onComplete` : `onReverseComplete`, !0),
            this._prom && !(o < i && this.timeScale() > 0) && this._prom())))
        }
        return this
    }
    ,
    n.add = function(e, t) {
        var n = this;
        if (Ri(t) || (t = ho(this, t, e)),
        !(e instanceof hs)) {
            if (Gi(e))
                return e.forEach(function(e) {
                    return n.add(e, t)
                }),
                this;
            if (Ii(e))
                return this.addLabel(e, t);
            if (Li(e))
                e = As.delayedCall(0, e);
            else
                return this
        }
        return this === e ? this : io(this, e, t)
    }
    ,
    n.getChildren = function(e, t, n, r) {
        e === void 0 && (e = !0),
        t === void 0 && (t = !0),
        n === void 0 && (n = !0),
        r === void 0 && (r = -ki);
        for (var i = [], a = this._first; a; )
            a._start >= r && (a instanceof As ? t && i.push(a) : (n && i.push(a),
            e && i.push.apply(i, a.getChildren(!0, t, n)))),
            a = a._next;
        return i
    }
    ,
    n.getById = function(e) {
        for (var t = this.getChildren(1, 1, 1), n = t.length; n--; )
            if (t[n].vars.id === e)
                return t[n]
    }
    ,
    n.remove = function(e) {
        return Ii(e) ? this.removeLabel(e) : Li(e) ? this.killTweensOf(e) : (e.parent === this && Ka(this, e),
        e === this._recent && (this._recent = this._last),
        Ja(this))
    }
    ,
    n.totalTime = function(t, n) {
        return arguments.length ? (this._forcing = 1,
        !this._dp && this._ts && (this._start = Aa(ts.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))),
        e.prototype.totalTime.call(this, t, n),
        this._forcing = 0,
        this) : this._tTime
    }
    ,
    n.addLabel = function(e, t) {
        return this.labels[e] = ho(this, t),
        this
    }
    ,
    n.removeLabel = function(e) {
        return delete this.labels[e],
        this
    }
    ,
    n.addPause = function(e, t, n) {
        var r = As.delayedCall(0, t || fa, n);
        return r.data = `isPause`,
        this._hasPause = 1,
        io(this, r, ho(this, e))
    }
    ,
    n.removePause = function(e) {
        var t = this._first;
        for (e = ho(this, e); t; )
            t._start === e && t.data === `isPause` && qa(t),
            t = t._next
    }
    ,
    n.killTweensOf = function(e, t, n) {
        for (var r = this.getTweensOf(e, n), i = r.length; i--; )
            xs !== r[i] && r[i].kill(e, t);
        return this
    }
    ,
    n.getTweensOf = function(e, t) {
        for (var n = [], r = wo(e), i = this._first, a = Ri(t), o; i; )
            i instanceof As ? Ma(i._targets, r) && (a ? (!xs || i._initted && i._ts) && i.globalTime(0) <= t && i.globalTime(i.totalDuration()) > t : !t || i.isActive()) && n.push(i) : (o = i.getTweensOf(r, t)).length && n.push.apply(n, o),
            i = i._next;
        return n
    }
    ,
    n.tweenTo = function(e, t) {
        t ||= {};
        var n = this, r = ho(n, e), i = t, a = i.startAt, o = i.onStart, s = i.onStartParams, c = i.immediateRender, l, u = As.to(n, Ra({
            ease: t.ease || `none`,
            lazy: !1,
            immediateRender: !1,
            time: r,
            overwrite: `auto`,
            duration: t.duration || Math.abs((r - (a && `time` in a ? a.time : n._time)) / n.timeScale()) || Z,
            onStart: function() {
                if (n.pause(),
                !l) {
                    var e = t.duration || Math.abs((r - (a && `time` in a ? a.time : n._time)) / n.timeScale());
                    u._dur !== e && fo(u, e, 0, 1).render(u._time, !0, !0),
                    l = 1
                }
                o && o.apply(u, s || [])
            }
        }, t));
        return c ? u.render(0) : u
    }
    ,
    n.tweenFromTo = function(e, t, n) {
        return this.tweenTo(t, Ra({
            startAt: {
                time: ho(this, e)
            }
        }, n))
    }
    ,
    n.recent = function() {
        return this._recent
    }
    ,
    n.nextLabel = function(e) {
        return e === void 0 && (e = this._time),
        Bo(this, ho(this, e))
    }
    ,
    n.previousLabel = function(e) {
        return e === void 0 && (e = this._time),
        Bo(this, ho(this, e), 1)
    }
    ,
    n.currentLabel = function(e) {
        return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + Z)
    }
    ,
    n.shiftChildren = function(e, t, n) {
        n === void 0 && (n = 0);
        var r = this._first, i = this.labels, a;
        for (e = Aa(e); r; )
            r._start >= n && (r._start += e,
            r._end += e),
            r = r._next;
        if (t)
            for (a in i)
                i[a] >= n && (i[a] += e);
        return Ja(this)
    }
    ,
    n.invalidate = function(t) {
        var n = this._first;
        for (this._lock = 0; n; )
            n.invalidate(t),
            n = n._next;
        return e.prototype.invalidate.call(this, t)
    }
    ,
    n.clear = function(e) {
        e === void 0 && (e = !0);
        for (var t = this._first, n; t; )
            n = t._next,
            this.remove(t),
            t = n;
        return this._dp && (this._time = this._tTime = this._pTime = 0),
        e && (this.labels = {}),
        Ja(this)
    }
    ,
    n.totalDuration = function(e) {
        var t = 0, n = this, r = n._last, i = ki, a, o, s;
        if (arguments.length)
            return n.timeScale((n._repeat < 0 ? n.duration() : n.totalDuration()) / (n.reversed() ? -e : e));
        if (n._dirty) {
            for (s = n.parent; r; )
                a = r._prev,
                r._dirty && r.totalDuration(),
                o = r._start,
                o > i && n._sort && r._ts && !n._lock ? (n._lock = 1,
                io(n, r, o - r._delay, 1)._lock = 0) : i = o,
                o < 0 && r._ts && (t -= o,
                (!s && !n._dp || s && s.smoothChildTiming) && (n._start += Aa(o / n._ts),
                n._time -= o,
                n._tTime -= o),
                n.shiftChildren(-o, !1, -1 / 0),
                i = 0),
                r._end > t && r._ts && (t = r._end),
                r = a;
            fo(n, n === ta && n._time > t ? n._time : t, 1, 1),
            n._dirty = 0
        }
        return n._tDur
    }
    ,
    t.updateRoot = function(e) {
        if (ta._ts && (Fa(ta, eo(e, ta)),
        ya = ts.frame),
        ts.frame >= Sa) {
            Sa += wi.autoSleep || 120;
            var t = ta._first;
            if ((!t || !t._ts) && wi.autoSleep && ts._listeners.length < 2) {
                for (; t && !t._ts; )
                    t = t._next;
                t || ts.sleep()
            }
        }
    }
    ,
    t
}(hs);
Ra(gs.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var _s = function(e, t, n, r, i, a, o) {
    var s = new Ws(this._pt,e,t,0,1,Rs,null,i), c = 0, l = 0, u, d, f, p, m, h, g, _;
    for (s.b = n,
    s.e = r,
    n += ``,
    r += ``,
    (g = ~r.indexOf(`random(`)) && (r = Lo(r)),
    a && (_ = [n, r],
    a(_, e, t),
    n = _[0],
    r = _[1]),
    d = n.match(Zi) || []; u = Zi.exec(r); )
        p = u[0],
        m = r.substring(c, u.index),
        f ? f = (f + 1) % 5 : m.substr(-5) === `rgba(` && (f = 1),
        p !== d[l++] && (h = parseFloat(d[l - 1]) || 0,
        s._pt = {
            _next: s._pt,
            p: m || l === 1 ? m : `,`,
            s: h,
            c: p.charAt(1) === `=` ? ja(h, p) - h : parseFloat(p) - h,
            m: f && f < 4 ? Math.round : 0
        },
        c = Zi.lastIndex);
    return s.c = c < r.length ? r.substring(c, r.length) : ``,
    s.fp = o,
    (Qi.test(r) || g) && (s.e = 0),
    this._pt = s,
    s
}, vs = function(e, t, n, r, i, a, o, s, c, l) {
    Li(r) && (r = r(i || 0, e, a));
    var u = e[t], d = n === `get` ? Li(u) ? c ? e[t.indexOf(`set`) || !Li(e[`get` + t.substr(3)]) ? t : `get` + t.substr(3)](c) : e[t]() : u : n, f = Li(u) ? c ? Ns : Ms : js, p;
    if (Ii(r) && (~r.indexOf(`random(`) && (r = Lo(r)),
    r.charAt(1) === `=` && (p = ja(d, r) + (yo(d) || 0),
    (p || p === 0) && (r = p))),
    !l || d !== r || Ss)
        return !isNaN(d * r) && r !== `` ? (p = new Ws(this._pt,e,t,+d || 0,r - (d || 0),typeof u == `boolean` ? Ls : Is,0,f),
        c && (p.fp = c),
        o && p.modifier(o, this, e),
        this._pt = p) : (!u && !(t in e) && la(t, r),
        _s.call(this, e, t, d, r, f, s || wi.stringFilter, c))
}, ys = function(e, t, n, r, i) {
    if (Li(e) && (e = Ds(e, i, t, n, r)),
    !Bi(e) || e.style && e.nodeType || Gi(e) || Wi(e))
        return Ii(e) ? Ds(e, i, t, n, r) : e;
    var a = {}, o;
    for (o in e)
        a[o] = Ds(e[o], i, t, n, r);
    return a
}, bs = function(e, t, n, r, i, a) {
    var o, s, c, l;
    if (ba[e] && (o = new ba[e]).init(i, o.rawVars ? t[e] : ys(t[e], r, i, a, n), n, r, a) !== !1 && (n._pt = s = new Ws(n._pt,i,e,0,1,o.render,o,0,o.priority),
    n !== Uo))
        for (c = n._ptLookup[n._targets.indexOf(i)],
        l = o._props.length; l--; )
            c[o._props[l]] = s;
    return o
}, xs, Ss, Cs = function e(t, n, r) {
    var i = t.vars, a = i.ease, o = i.startAt, s = i.immediateRender, c = i.lazy, l = i.onUpdate, u = i.runBackwards, d = i.yoyoEase, f = i.keyframes, p = i.autoRevert, m = t._dur, h = t._startAt, g = t._targets, _ = t.parent, v = _ && _.data === `nested` ? _.vars.targets : g, y = t._overwrite === `auto` && !Ei, b = t.timeline, x = i.easeReverse || d, S, C, w, T, E, D, O, k, A, j, M, N, P;
    if (b && (!f || !a) && (a = `none`),
    t._ease = ls(a, Ti.ease),
    t._rEase = x && (ls(x) || t._ease),
    t._from = !b && !!i.runBackwards,
    t._from && (t.ratio = 1),
    !b || f && !i.stagger) {
        if (k = g[0] ? Ea(g[0]).harness : 0,
        N = k && i[k.prop],
        S = Ha(i, ga),
        h && (h._zTime < 0 && h.progress(1),
        n < 0 && u && s && !p ? h.render(-1, !0) : h.revert(u && m ? ma : pa),
        h._lazy = 0),
        o) {
            if (qa(t._startAt = As.set(g, Ra({
                data: `isStart`,
                overwrite: !1,
                parent: _,
                immediateRender: !0,
                lazy: !h && Vi(c),
                startAt: null,
                delay: 0,
                onUpdate: l && function() {
                    return Vo(t, `onUpdate`)
                }
                ,
                stagger: 0
            }, o))),
            t._startAt._dp = 0,
            t._startAt._sat = t,
            n < 0 && (Di || !s && !p) && t._startAt.revert(ma),
            s && m && n <= 0 && r <= 0) {
                n && (t._zTime = n);
                return
            }
        } else if (u && m && !h) {
            if (n && (s = !1),
            w = Ra({
                overwrite: !1,
                data: `isFromStart`,
                lazy: s && !h && Vi(c),
                immediateRender: s,
                stagger: 0,
                parent: _
            }, S),
            N && (w[k.prop] = N),
            qa(t._startAt = As.set(g, w)),
            t._startAt._dp = 0,
            t._startAt._sat = t,
            n < 0 && (Di ? t._startAt.revert(ma) : t._startAt.render(-1, !0)),
            t._zTime = n,
            !s)
                e(t._startAt, Z, Z);
            else if (!n)
                return
        }
        for (t._pt = t._ptCache = 0,
        c = m && Vi(c) || c && !m,
        C = 0; C < g.length; C++) {
            if (E = g[C],
            O = E._gsap || Ta(g)[C]._gsap,
            t._ptLookup[C] = j = {},
            va[O.id] && _a.length && Na(),
            M = v === g ? C : v.indexOf(E),
            k && (A = new k).init(E, N || S, t, M, v) !== !1 && (t._pt = T = new Ws(t._pt,E,A.name,0,1,A.render,A,0,A.priority),
            A._props.forEach(function(e) {
                j[e] = T
            }),
            A.priority && (D = 1)),
            !k || N)
                for (w in S)
                    ba[w] && (A = bs(w, S, t, M, E, v)) ? A.priority && (D = 1) : j[w] = T = vs.call(t, E, w, `get`, S[w], M, v, 0, i.stringFilter);
            t._op && t._op[C] && t.kill(E, t._op[C]),
            y && t._pt && (xs = t,
            ta.killTweensOf(E, j, t.globalTime(n)),
            P = !t.parent,
            xs = 0),
            t._pt && c && (va[O.id] = 1)
        }
        D && Us(t),
        t._onInit && t._onInit(t)
    }
    t._onUpdate = l,
    t._initted = (!t._op || t._pt) && !P,
    f && n <= 0 && b.render(ki, !0, !0)
}, ws = function(e, t, n, r, i, a, o, s) {
    var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], l, u, d, f;
    if (!c)
        for (c = e._ptCache[t] = [],
        d = e._ptLookup,
        f = e._targets.length; f--; ) {
            if (l = d[f][t],
            l && l.d && l.d._pt)
                for (l = l.d._pt; l && l.p !== t && l.fp !== t; )
                    l = l._next;
            if (!l)
                return Ss = 1,
                e.vars[t] = `+=0`,
                Cs(e, o),
                Ss = 0,
                s ? ua(t + ` not eligible for reset. Try splitting into individual properties`) : 1;
            c.push(l)
        }
    for (f = c.length; f--; )
        u = c[f],
        l = u._pt || u,
        l.s = (r || r === 0) && !i ? r : l.s + (r || 0) + a * l.c,
        l.c = n - l.s,
        u.e && (u.e = ka(n) + yo(u.e)),
        u.b && (u.b = l.s + yo(u.b))
}, Ts = function(e, t) {
    var n = e[0] ? Ea(e[0]).harness : 0, r = n && n.aliases, i, a, o, s;
    if (!r)
        return t;
    for (a in i = Ba({}, t),
    r)
        if (a in i)
            for (s = r[a].split(`,`),
            o = s.length; o--; )
                i[s[o]] = i[a];
    return i
}, Es = function(e, t, n, r) {
    var i = t.ease || r || `power1.inOut`, a, o;
    if (Gi(t))
        o = n[e] || (n[e] = []),
        t.forEach(function(e, n) {
            return o.push({
                t: n / (t.length - 1) * 100,
                v: e,
                e: i
            })
        });
    else
        for (a in t)
            o = n[a] || (n[a] = []),
            a === `ease` || o.push({
                t: parseFloat(e),
                v: t[a],
                e: i
            })
}, Ds = function(e, t, n, r, i) {
    return Li(e) ? e.call(t, n, r, i) : Ii(e) && ~e.indexOf(`random(`) ? Lo(e) : e
}, Os = wa + `repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`, ks = {};
Oa(Os + `,id,stagger,delay,duration,paused,scrollTrigger`, function(e) {
    return ks[e] = 1
});
var As = function(e) {
    Ci(t, e);
    function t(t, n, r, i) {
        var a;
        typeof n == `number` && (r.duration = n,
        n = r,
        r = null),
        a = e.call(this, i ? n : Ua(n)) || this;
        var o = a.vars, s = o.duration, c = o.delay, l = o.immediateRender, u = o.stagger, d = o.overwrite, f = o.keyframes, p = o.defaults, m = o.scrollTrigger, h = n.parent || ta, g = (Gi(t) || Wi(t) ? Ri(t[0]) : `length` in n) ? [t] : wo(t), _, v, y, b, x, S, C, w;
        if (a._targets = g.length ? Ta(g) : ua(`GSAP target ` + t + ` not found. https://gsap.com`, !wi.nullTargetWarn) || [],
        a._ptLookup = [],
        a._overwrite = d,
        f || u || Ui(s) || Ui(c)) {
            n = a.vars;
            var T = n.easeReverse || n.yoyoEase;
            if (_ = a.timeline = new gs({
                data: `nested`,
                defaults: p || {},
                targets: h && h.data === `nested` ? h.vars.targets : g
            }),
            _.kill(),
            _.parent = _._dp = Si(a),
            _._start = 0,
            u || Ui(s) || Ui(c)) {
                if (b = g.length,
                C = u && Do(u),
                Bi(u))
                    for (x in u)
                        ~Os.indexOf(x) && (w ||= {},
                        w[x] = u[x]);
                for (v = 0; v < b; v++)
                    y = Ha(n, ks),
                    y.stagger = 0,
                    T && (y.easeReverse = T),
                    w && Ba(y, w),
                    S = g[v],
                    y.duration = +Ds(s, Si(a), v, S, g),
                    y.delay = (+Ds(c, Si(a), v, S, g) || 0) - a._delay,
                    !u && b === 1 && y.delay && (a._delay = c = y.delay,
                    a._start += c,
                    y.delay = 0),
                    _.to(S, y, C ? C(v, S, g) : 0),
                    _._ease = $.none;
                _.duration() ? s = c = 0 : a.timeline = 0
            } else if (f) {
                Ua(Ra(_.vars.defaults, {
                    ease: `none`
                })),
                _._ease = ls(f.ease || n.ease || `none`);
                var E = 0, D, O, k;
                if (Gi(f))
                    f.forEach(function(e) {
                        return _.to(g, e, `>`)
                    }),
                    _.duration();
                else {
                    for (x in y = {},
                    f)
                        x === `ease` || x === `easeEach` || Es(x, f[x], y, f.easeEach);
                    for (x in y)
                        for (D = y[x].sort(function(e, t) {
                            return e.t - t.t
                        }),
                        E = 0,
                        v = 0; v < D.length; v++)
                            O = D[v],
                            k = {
                                ease: O.e,
                                duration: (O.t - (v ? D[v - 1].t : 0)) / 100 * s
                            },
                            k[x] = O.v,
                            _.to(g, k, E),
                            E += k.duration;
                    _.duration() < s && _.to({}, {
                        duration: s - _.duration()
                    })
                }
            }
            s || a.duration(s = _.duration())
        } else
            a.timeline = 0;
        return d === !0 && !Ei && (xs = Si(a),
        ta.killTweensOf(g),
        xs = 0),
        io(h, Si(a), r),
        n.reversed && a.reverse(),
        n.paused && a.paused(!0),
        (l || !s && !f && a._start === Aa(h._time) && Vi(l) && Za(Si(a)) && h.data !== `nested`) && (a._tTime = -Z,
        a.render(Math.max(0, -c) || 0)),
        m && ao(Si(a), m),
        a
    }
    var n = t.prototype;
    return n.render = function(e, t, n) {
        var r = this._time, i = this._tDur, a = this._dur, o = e < 0, s = e > i - Z && !o ? i : e < Z ? 0 : e, c, l, u, d, f, p, m, h;
        if (!a)
            lo(this, e, t, n);
        else if (s !== this._tTime || !e || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== o || this._lazy) {
            if (c = s,
            h = this.timeline,
            this._repeat) {
                if (d = a + this._rDelay,
                this._repeat < -1 && o)
                    return this.totalTime(d * 100 + e, t, n);
                if (c = Aa(s % d),
                s === i ? (u = this._repeat,
                c = a) : (f = Aa(s / d),
                u = ~~f,
                u && u === f ? (c = a,
                u--) : c > a && (c = a)),
                p = this._yoyo && u & 1,
                p && (c = a - c),
                f = $a(this._tTime, d),
                c === r && !n && this._initted && u === f)
                    return this._tTime = s,
                    this;
                u !== f && this.vars.repeatRefresh && !p && !this._lock && c !== d && this._initted && (this._lock = n = 1,
                this.render(Aa(d * u), !0).invalidate()._lock = 0)
            }
            if (!this._initted) {
                if (oo(this, o ? e : c, n, t, s))
                    return this._tTime = 0,
                    this;
                if (r !== this._time && !(n && this.vars.repeatRefresh && u !== f))
                    return this;
                if (a !== this._dur)
                    return this.render(e, t, n)
            }
            if (this._rEase) {
                var g = c < r;
                if (g !== this._inv) {
                    var _ = g ? r : a - r;
                    this._inv = g,
                    this._from && (this.ratio = 1 - this.ratio),
                    this._invRatio = this.ratio,
                    this._invTime = r,
                    this._invRecip = _ ? (g ? -1 : 1) / _ : 0,
                    this._invScale = g ? -this.ratio : 1 - this.ratio,
                    this._invEase = g ? this._rEase : this._ease
                }
                this.ratio = m = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip)
            } else
                this.ratio = m = this._ease(c / a);
            if (this._from && (this.ratio = m = 1 - m),
            this._tTime = s,
            this._time = c,
            !this._act && this._ts && (this._act = 1,
            this._lazy = 0),
            !r && s && !t && !f && (Vo(this, `onStart`),
            this._tTime !== s))
                return this;
            for (l = this._pt; l; )
                l.r(m, l.d),
                l = l._next;
            h && h.render(e < 0 ? e : h._dur * h._ease(c / this._dur), t, n) || this._startAt && (this._zTime = e),
            this._onUpdate && !t && (o && Xa(this, e, t, n),
            Vo(this, `onUpdate`)),
            this._repeat && u !== f && this.vars.onRepeat && !t && this.parent && Vo(this, `onRepeat`),
            (s === this._tDur || !s) && this._tTime === s && (o && !this._onUpdate && Xa(this, e, !0, !0),
            (e || !a) && (s === this._tDur && this._ts > 0 || !s && this._ts < 0) && qa(this, 1),
            !t && (!o || r) && (s || r || p) && (Vo(this, s === i ? `onComplete` : `onReverseComplete`, !0),
            this._prom && !(s < i && this.timeScale() > 0) && this._prom()))
        }
        return this
    }
    ,
    n.targets = function() {
        return this._targets
    }
    ,
    n.invalidate = function(t) {
        return (!t || !this.vars.runBackwards) && (this._startAt = 0),
        this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
        this._ptLookup = [],
        this.timeline && this.timeline.invalidate(t),
        e.prototype.invalidate.call(this, t)
    }
    ,
    n.resetTo = function(e, t, n, r, i) {
        es || ts.wake(),
        this._ts || this.play();
        var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts), o;
        return this._initted || Cs(this, a),
        o = this._ease(a / this._dur),
        ws(this, e, t, n, r, o, a, i) ? this.resetTo(e, t, n, r, 1) : (no(this, 0),
        this.parent || Ga(this._dp, this, `_first`, `_last`, this._dp._sort ? `_start` : 0),
        this.render(0))
    }
    ,
    n.kill = function(e, t) {
        if (t === void 0 && (t = `all`),
        !e && (!t || t === `all`))
            return this._lazy = this._pt = 0,
            this.parent ? Ho(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Di),
            this;
        if (this.timeline) {
            var n = this.timeline.totalDuration();
            return this.timeline.killTweensOf(e, t, xs && xs.vars.overwrite !== !0)._first || Ho(this),
            this.parent && n !== this.timeline.totalDuration() && fo(this, this._dur * this.timeline._tDur / n, 0, 1),
            this
        }
        var r = this._targets, i = e ? wo(e) : r, a = this._ptLookup, o = this._pt, s, c, l, u, d, f, p;
        if ((!t || t === `all`) && Wa(r, i))
            return t === `all` && (this._pt = 0),
            Ho(this);
        for (s = this._op = this._op || [],
        t !== `all` && (Ii(t) && (d = {},
        Oa(t, function(e) {
            return d[e] = 1
        }),
        t = d),
        t = Ts(r, t)),
        p = r.length; p--; )
            if (~i.indexOf(r[p]))
                for (d in c = a[p],
                t === `all` ? (s[p] = t,
                u = c,
                l = {}) : (l = s[p] = s[p] || {},
                u = t),
                u)
                    f = c && c[d],
                    f && ((!(`kill` in f.d) || f.d.kill(d) === !0) && Ka(this, f, `_pt`),
                    delete c[d]),
                    l !== `all` && (l[d] = 1);
        return this._initted && !this._pt && o && Ho(this),
        this
    }
    ,
    t.to = function(e, n) {
        return new t(e,n,arguments[2])
    }
    ,
    t.from = function(e, t) {
        return go(1, arguments)
    }
    ,
    t.delayedCall = function(e, n, r, i) {
        return new t(n,0,{
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: e,
            onComplete: n,
            onReverseComplete: n,
            onCompleteParams: r,
            onReverseCompleteParams: r,
            callbackScope: i
        })
    }
    ,
    t.fromTo = function(e, t, n) {
        return go(2, arguments)
    }
    ,
    t.set = function(e, n) {
        return n.duration = 0,
        n.repeatDelay || (n.repeat = 0),
        new t(e,n)
    }
    ,
    t.killTweensOf = function(e, t, n) {
        return ta.killTweensOf(e, t, n)
    }
    ,
    t
}(hs);
Ra(As.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
}),
Oa(`staggerTo,staggerFrom,staggerFromTo`, function(e) {
    As[e] = function() {
        var t = new gs
          , n = xo.call(arguments, 0);
        return n.splice(e === `staggerFromTo` ? 5 : 4, 0, 0),
        t[e].apply(t, n)
    }
});
var js = function(e, t, n) {
    return e[t] = n
}
  , Ms = function(e, t, n) {
    return e[t](n)
}
  , Ns = function(e, t, n, r) {
    return e[t](r.fp, n)
}
  , Ps = function(e, t, n) {
    return e.setAttribute(t, n)
}
  , Fs = function(e, t) {
    return Li(e[t]) ? Ms : zi(e[t]) && e.setAttribute ? Ps : js
}
  , Is = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
}
  , Ls = function(e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t)
}
  , Rs = function(e, t) {
    var n = t._pt
      , r = ``;
    if (!e && t.b)
        r = t.b;
    else if (e === 1 && t.e)
        r = t.e;
    else {
        for (; n; )
            r = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + r,
            n = n._next;
        r += t.c
    }
    t.set(t.t, t.p, r, t)
}
  , zs = function(e, t) {
    for (var n = t._pt; n; )
        n.r(e, n.d),
        n = n._next
}
  , Bs = function(e, t, n, r) {
    for (var i = this._pt, a; i; )
        a = i._next,
        i.p === r && i.modifier(e, t, n),
        i = a
}
  , Vs = function(e) {
    for (var t = this._pt, n, r; t; )
        r = t._next,
        t.p === e && !t.op || t.op === e ? Ka(this, t, `_pt`) : t.dep || (n = 1),
        t = r;
    return !n
}
  , Hs = function(e, t, n, r) {
    r.mSet(e, t, r.m.call(r.tween, n, r.mt), r)
}
  , Us = function(e) {
    for (var t = e._pt, n, r, i, a; t; ) {
        for (n = t._next,
        r = i; r && r.pr > t.pr; )
            r = r._next;
        (t._prev = r ? r._prev : a) ? t._prev._next = t : i = t,
        (t._next = r) ? r._prev = t : a = t,
        t = n
    }
    e._pt = i
}
  , Ws = function() {
    function e(e, t, n, r, i, a, o, s, c) {
        this.t = t,
        this.s = r,
        this.c = i,
        this.p = n,
        this.r = a || Is,
        this.d = o || this,
        this.set = s || js,
        this.pr = c || 0,
        this._next = e,
        e && (e._prev = this)
    }
    var t = e.prototype;
    return t.modifier = function(e, t, n) {
        this.mSet = this.mSet || this.set,
        this.set = Hs,
        this.m = e,
        this.mt = n,
        this.tween = t
    }
    ,
    e
}();
Oa(wa + `parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`, function(e) {
    return ga[e] = 1
}),
aa.TweenMax = aa.TweenLite = As,
aa.TimelineLite = aa.TimelineMax = gs,
ta = new gs({
    sortChildren: !1,
    defaults: Ti,
    autoRemoveChildren: !0,
    id: `root`,
    smoothChildTiming: !0
}),
wi.stringFilter = $o;
var Gs = []
  , Ks = {}
  , qs = []
  , Js = 0
  , Ys = 0
  , Xs = function(e) {
    return (Ks[e] || qs).map(function(e) {
        return e()
    })
}
  , Zs = function() {
    var e = Date.now()
      , t = [];
    e - Js > 2 && (Xs(`matchMediaInit`),
    Gs.forEach(function(e) {
        var n = e.queries, r = e.conditions, i, a, o, s;
        for (a in n)
            i = na.matchMedia(n[a]).matches,
            i && (o = 1),
            i !== r[a] && (r[a] = i,
            s = 1);
        s && (e.revert(),
        o && t.push(e))
    }),
    Xs(`matchMediaRevert`),
    t.forEach(function(e) {
        return e.onMatch(e, function(t) {
            return e.add(null, t)
        })
    }),
    Js = e,
    Xs(`matchMedia`))
}
  , Qs = function() {
    function e(e, t) {
        this.selector = t && To(t),
        this.data = [],
        this._r = [],
        this.isReverted = !1,
        this.id = Ys++,
        e && this.add(e)
    }
    var t = e.prototype;
    return t.add = function(e, t, n) {
        Li(e) && (n = t,
        t = e,
        e = Li);
        var r = this
          , i = function() {
            var e = Oi, i = r.selector, a;
            return e && e !== r && e.data.push(r),
            n && (r.selector = To(n)),
            Oi = r,
            a = t.apply(r, arguments),
            Li(a) && r._r.push(a),
            Oi = e,
            r.selector = i,
            r.isReverted = !1,
            a
        };
        return r.last = i,
        e === Li ? i(r, function(e) {
            return r.add(null, e)
        }) : e ? r[e] = i : i
    }
    ,
    t.ignore = function(e) {
        var t = Oi;
        Oi = null,
        e(this),
        Oi = t
    }
    ,
    t.getTweens = function() {
        var t = [];
        return this.data.forEach(function(n) {
            return n instanceof e ? t.push.apply(t, n.getTweens()) : n instanceof As && !(n.parent && n.parent.data === `nested`) && t.push(n)
        }),
        t
    }
    ,
    t.clear = function() {
        this._r.length = this.data.length = 0
    }
    ,
    t.kill = function(e, t) {
        var n = this;
        if (e ? (function() {
            for (var t = n.getTweens(), r = n.data.length, i; r--; )
                i = n.data[r],
                i.data === `isFlip` && (i.revert(),
                i.getChildren(!0, !0, !1).forEach(function(e) {
                    return t.splice(t.indexOf(e), 1)
                }));
            for (t.map(function(e) {
                return {
                    g: e._dur || e._delay || e._sat && !e._sat.vars.immediateRender ? e.globalTime(0) : -1 / 0,
                    t: e
                }
            }).sort(function(e, t) {
                return t.g - e.g || -1 / 0
            }).forEach(function(t) {
                return t.t.revert(e)
            }),
            r = n.data.length; r--; )
                i = n.data[r],
                i instanceof gs ? i.data !== `nested` && (i.scrollTrigger && i.scrollTrigger.revert(),
                i.kill()) : !(i instanceof As) && i.revert && i.revert(e);
            n._r.forEach(function(t) {
                return t(e, n)
            }),
            n.isReverted = !0
        }
        )() : this.data.forEach(function(e) {
            return e.kill && e.kill()
        }),
        this.clear(),
        t)
            for (var r = Gs.length; r--; )
                Gs[r].id === this.id && Gs.splice(r, 1)
    }
    ,
    t.revert = function(e) {
        this.kill(e || {})
    }
    ,
    e
}()
  , $s = function() {
    function e(e) {
        this.contexts = [],
        this.scope = e,
        Oi && Oi.data.push(this)
    }
    var t = e.prototype;
    return t.add = function(e, t, n) {
        Bi(e) || (e = {
            matches: e
        });
        var r = new Qs(0,n || this.scope), i = r.conditions = {}, a, o, s;
        for (o in Oi && !r.selector && (r.selector = Oi.selector),
        this.contexts.push(r),
        t = r.add(`onMatch`, t),
        r.queries = e,
        e)
            o === `all` ? s = 1 : (a = na.matchMedia(e[o]),
            a && (Gs.indexOf(r) < 0 && Gs.push(r),
            (i[o] = a.matches) && (s = 1),
            a.addListener ? a.addListener(Zs) : a.addEventListener(`change`, Zs)));
        return s && t(r, function(e) {
            return r.add(null, e)
        }),
        this
    }
    ,
    t.revert = function(e) {
        this.kill(e || {})
    }
    ,
    t.kill = function(e) {
        this.contexts.forEach(function(t) {
            return t.kill(e, !0)
        })
    }
    ,
    e
}()
  , ec = {
    registerPlugin: function() {
        [...arguments].forEach(function(e) {
            return Go(e)
        })
    },
    timeline: function(e) {
        return new gs(e)
    },
    getTweensOf: function(e, t) {
        return ta.getTweensOf(e, t)
    },
    getProperty: function(e, t, n, r) {
        Ii(e) && (e = wo(e)[0]);
        var i = Ea(e || {}).get
          , a = n ? La : Ia;
        return n === `native` && (n = ``),
        e && (t ? a((ba[t] && ba[t].get || i)(e, t, n, r)) : function(t, n, r) {
            return a((ba[t] && ba[t].get || i)(e, t, n, r))
        }
        )
    },
    quickSetter: function(e, t, n) {
        if (e = wo(e),
        e.length > 1) {
            var r = e.map(function(e) {
                return ic.quickSetter(e, t, n)
            })
              , i = r.length;
            return function(e) {
                for (var t = i; t--; )
                    r[t](e)
            }
        }
        e = e[0] || {};
        var a = ba[t]
          , o = Ea(e)
          , s = o.harness && (o.harness.aliases || {})[t] || t
          , c = a ? function(t) {
            var r = new a;
            Uo._pt = 0,
            r.init(e, n ? t + n : t, Uo, 0, [e]),
            r.render(1, r),
            Uo._pt && zs(1, Uo)
        }
        : o.set(e, s);
        return a ? c : function(t) {
            return c(e, s, n ? t + n : t, o, 1)
        }
    },
    quickTo: function(e, t, n) {
        var r, i = ic.to(e, Ra((r = {},
        r[t] = `+=0.1`,
        r.paused = !0,
        r.stagger = 0,
        r), n || {})), a = function(e, n, r) {
            return i.resetTo(t, e, n, r)
        };
        return a.tween = i,
        a
    },
    isTweening: function(e) {
        return ta.getTweensOf(e, !0).length > 0
    },
    defaults: function(e) {
        return e && e.ease && (e.ease = ls(e.ease, Ti.ease)),
        Va(Ti, e || {})
    },
    config: function(e) {
        return Va(wi, e || {})
    },
    registerEffect: function(e) {
        var t = e.name
          , n = e.effect
          , r = e.plugins
          , i = e.defaults
          , a = e.extendTimeline;
        (r || ``).split(`,`).forEach(function(e) {
            return e && !ba[e] && !aa[e] && ua(t + ` effect requires ` + e + ` plugin.`)
        }),
        xa[t] = function(e, t, r) {
            return n(wo(e), Ra(t || {}, i), r)
        }
        ,
        a && (gs.prototype[t] = function(e, n, r) {
            return this.add(xa[t](e, Bi(n) ? n : (r = n) && {}, this), r)
        }
        )
    },
    registerEase: function(e, t) {
        $[e] = ls(t)
    },
    parseEase: function(e, t) {
        return arguments.length ? ls(e, t) : $
    },
    getById: function(e) {
        return ta.getById(e)
    },
    exportRoot: function(e, t) {
        e === void 0 && (e = {});
        var n = new gs(e), r, i;
        for (n.smoothChildTiming = Vi(e.smoothChildTiming),
        ta.remove(n),
        n._dp = 0,
        n._time = n._tTime = ta._time,
        r = ta._first; r; )
            i = r._next,
            (t || !(!r._dur && r instanceof As && r.vars.onComplete === r._targets[0])) && io(n, r, r._start - r._delay),
            r = i;
        return io(ta, n, 0),
        n
    },
    context: function(e, t) {
        return e ? new Qs(e,t) : Oi
    },
    matchMedia: function(e) {
        return new $s(e)
    },
    matchMediaRefresh: function() {
        return Gs.forEach(function(e) {
            var t = e.conditions, n, r;
            for (r in t)
                t[r] && (t[r] = !1,
                n = 1);
            n && e.revert()
        }) || Zs()
    },
    addEventListener: function(e, t) {
        var n = Ks[e] || (Ks[e] = []);
        ~n.indexOf(t) || n.push(t)
    },
    removeEventListener: function(e, t) {
        var n = Ks[e]
          , r = n && n.indexOf(t);
        r >= 0 && n.splice(r, 1)
    },
    utils: {
        wrap: Fo,
        wrapYoyo: Io,
        distribute: Do,
        random: Ao,
        snap: ko,
        normalize: No,
        getUnit: yo,
        clamp: bo,
        splitColor: Jo,
        toArray: wo,
        selector: To,
        mapRange: Ro,
        pipe: jo,
        unitize: Mo,
        interpolate: zo,
        shuffle: Eo
    },
    install: ca,
    effects: xa,
    ticker: ts,
    updateRoot: gs.updateRoot,
    plugins: ba,
    globalTimeline: ta,
    core: {
        PropTween: Ws,
        globals: da,
        Tween: As,
        Timeline: gs,
        Animation: hs,
        getCache: Ea,
        _removeLinkedListItem: Ka,
        reverting: function() {
            return Di
        },
        context: function(e) {
            return e && Oi && (Oi.data.push(e),
            e._ctx = Oi),
            Oi
        },
        suppressOverwrites: function(e) {
            return Ei = e
        }
    }
};
Oa(`to,from,fromTo,delayedCall,set,killTweensOf`, function(e) {
    return ec[e] = As[e]
}),
ts.add(gs.updateRoot),
Uo = ec.to({}, {
    duration: 0
});
var tc = function(e, t) {
    for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
        n = n._next;
    return n
}
  , nc = function(e, t) {
    var n = e._targets, r, i, a;
    for (r in t)
        for (i = n.length; i--; )
            a = e._ptLookup[i][r],
            (a &&= a.d) && (a._pt && (a = tc(a, r)),
            a && a.modifier && a.modifier(t[r], e, n[i], r))
}
  , rc = function(e, t) {
    return {
        name: e,
        headless: 1,
        rawVars: 1,
        init: function(e, n, r) {
            r._onInit = function(e) {
                var r, i;
                if (Ii(n) && (r = {},
                Oa(n, function(e) {
                    return r[e] = 1
                }),
                n = r),
                t) {
                    for (i in r = {},
                    n)
                        r[i] = t(n[i]);
                    n = r
                }
                nc(e, n)
            }
        }
    }
}
  , ic = ec.registerPlugin({
    name: `attr`,
    init: function(e, t, n, r, i) {
        var a, o, s;
        for (a in this.tween = n,
        t)
            s = e.getAttribute(a) || ``,
            o = this.add(e, `setAttribute`, (s || 0) + ``, t[a], r, i, 0, 0, a),
            o.op = a,
            o.b = s,
            this._props.push(a)
    },
    render: function(e, t) {
        for (var n = t._pt; n; )
            Di ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d),
            n = n._next
    }
}, {
    name: `endArray`,
    headless: 1,
    init: function(e, t) {
        for (var n = t.length; n--; )
            this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1)
    }
}, rc(`roundProps`, Oo), rc(`modifiers`), rc(`snap`, ko)) || ec;
As.version = gs.version = ic.version = `3.15.0`,
sa = 1,
Hi() && ns();
var ac = $.Power0, oc = $.Power1, sc = $.Power2, cc = $.Power3, lc = $.Power4, uc = $.Linear, dc = $.Quad, fc = $.Cubic, pc = $.Quart, mc = $.Quint, hc = $.Strong, gc = $.Elastic, _c = $.Back, vc = $.SteppedEase, yc = $.Bounce, bc = $.Sine, xc = $.Expo, Sc = $.Circ, Cc, wc, Tc, Ec, Dc, Oc, kc, Ac = function() {
    return typeof window < `u`
}, jc = {}, Mc = 180 / Math.PI, Nc = Math.PI / 180, Pc = Math.atan2, Fc = 1e8, Ic = /([A-Z])/g, Lc = /(left|right|width|margin|padding|x)/i, Rc = /[\s,\(]\S/, zc = {
    autoAlpha: `opacity,visibility`,
    scale: `scaleX,scaleY`,
    alpha: `opacity`
}, Bc = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Vc = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Hc = function(e, t) {
    return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
}, Uc = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
}, Wc = function(e, t) {
    var n = t.s + t.c * e;
    t.set(t.t, t.p, ~~(n + (n < 0 ? -.5 : .5)) + t.u, t)
}, Gc = function(e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
}, Kc = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : t.b, t)
}, qc = function(e, t, n) {
    return e.style[t] = n
}, Jc = function(e, t, n) {
    return e.style.setProperty(t, n)
}, Yc = function(e, t, n) {
    return e._gsap[t] = n
}, Xc = function(e, t, n) {
    return e._gsap.scaleX = e._gsap.scaleY = n
}, Zc = function(e, t, n, r, i) {
    var a = e._gsap;
    a.scaleX = a.scaleY = n,
    a.renderTransform(i, a)
}, Qc = function(e, t, n, r, i) {
    var a = e._gsap;
    a[t] = n,
    a.renderTransform(i, a)
}, $c = `transform`, el = $c + `Origin`, tl = function e(t, n) {
    var r = this
      , i = this.target
      , a = i.style
      , o = i._gsap;
    if (t in jc && a) {
        if (this.tfm = this.tfm || {},
        t !== `transform`)
            t = zc[t] || t,
            ~t.indexOf(`,`) ? t.split(`,`).forEach(function(e) {
                return r.tfm[e] = bl(i, e)
            }) : this.tfm[t] = o.x ? o[t] : bl(i, t),
            t === el && (this.tfm.zOrigin = o.zOrigin);
        else
            return zc.transform.split(`,`).forEach(function(t) {
                return e.call(r, t, n)
            });
        if (this.props.indexOf($c) >= 0)
            return;
        o.svg && (this.svgo = i.getAttribute(`data-svg-origin`),
        this.props.push(el, n, ``)),
        t = $c
    }
    (a || n) && this.props.push(t, n, a[t])
}, nl = function(e) {
    e.translate && (e.removeProperty(`translate`),
    e.removeProperty(`scale`),
    e.removeProperty(`rotate`))
}, rl = function() {
    for (var e = this.props, t = this.target, n = t.style, r = t._gsap, i = 0, a; i < e.length; i += 3)
        e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === `--` ? e[i] : e[i].replace(Ic, `-$1`).toLowerCase());
    if (this.tfm) {
        for (a in this.tfm)
            r[a] = this.tfm[a];
        r.svg && (r.renderTransform(),
        t.setAttribute(`data-svg-origin`, this.svgo || ``)),
        i = kc(),
        (!i || !i.isStart) && !n[$c] && (nl(n),
        r.zOrigin && n[el] && (n[el] += ` ` + r.zOrigin + `px`,
        r.zOrigin = 0,
        r.renderTransform()),
        r.uncache = 1)
    }
}, il = function(e, t) {
    var n = {
        target: e,
        props: [],
        revert: rl,
        save: tl
    };
    return e._gsap || ic.core.getCache(e),
    t && e.style && e.nodeType && t.split(`,`).forEach(function(e) {
        return n.save(e)
    }),
    n
}, al, ol = function(e, t) {
    var n = wc.createElementNS ? wc.createElementNS((t || `http://www.w3.org/1999/xhtml`).replace(/^https/, `http`), e) : wc.createElement(e);
    return n && n.style ? n : wc.createElement(e)
}, sl = function e(t, n, r) {
    var i = getComputedStyle(t);
    return i[n] || i.getPropertyValue(n.replace(Ic, `-$1`).toLowerCase()) || i.getPropertyValue(n) || !r && e(t, ll(n) || n, 1) || ``
}, cl = `O,Moz,ms,Ms,Webkit`.split(`,`), ll = function(e, t, n) {
    var r = (t || Dc).style
      , i = 5;
    if (e in r && !n)
        return e;
    for (e = e.charAt(0).toUpperCase() + e.substr(1); i-- && !(cl[i] + e in r); )
        ;
    return i < 0 ? null : (i === 3 ? `ms` : i >= 0 ? cl[i] : ``) + e
}, ul = function() {
    Ac() && window.document && (Cc = window,
    wc = Cc.document,
    Tc = wc.documentElement,
    Dc = ol(`div`) || {
        style: {}
    },
    ol(`div`),
    $c = ll($c),
    el = $c + `Origin`,
    Dc.style.cssText = `border-width:0;line-height:0;position:absolute;padding:0`,
    al = !!ll(`perspective`),
    kc = ic.core.reverting,
    Ec = 1)
}, dl = function(e) {
    var t = e.ownerSVGElement, n = ol(`svg`, t && t.getAttribute(`xmlns`) || `http://www.w3.org/2000/svg`), r = e.cloneNode(!0), i;
    r.style.display = `block`,
    n.appendChild(r),
    Tc.appendChild(n);
    try {
        i = r.getBBox()
    } catch {}
    return n.removeChild(r),
    Tc.removeChild(n),
    i
}, fl = function(e, t) {
    for (var n = t.length; n--; )
        if (e.hasAttribute(t[n]))
            return e.getAttribute(t[n])
}, pl = function(e) {
    var t, n;
    try {
        t = e.getBBox()
    } catch {
        t = dl(e),
        n = 1
    }
    return t && (t.width || t.height) || n || (t = dl(e)),
    t && !t.width && !t.x && !t.y ? {
        x: +fl(e, [`x`, `cx`, `x1`]) || 0,
        y: +fl(e, [`y`, `cy`, `y1`]) || 0,
        width: 0,
        height: 0
    } : t
}, ml = function(e) {
    return !(!e.getCTM || e.parentNode && !e.ownerSVGElement || !pl(e))
}, hl = function(e, t) {
    if (t) {
        var n = e.style, r;
        t in jc && t !== el && (t = $c),
        n.removeProperty ? (r = t.substr(0, 2),
        (r === `ms` || t.substr(0, 6) === `webkit`) && (t = `-` + t),
        n.removeProperty(r === `--` ? t : t.replace(Ic, `-$1`).toLowerCase())) : n.removeAttribute(t)
    }
}, gl = function(e, t, n, r, i, a) {
    var o = new Ws(e._pt,t,n,0,1,a ? Kc : Gc);
    return e._pt = o,
    o.b = r,
    o.e = i,
    e._props.push(n),
    o
}, _l = {
    deg: 1,
    rad: 1,
    turn: 1
}, vl = {
    grid: 1,
    flex: 1
}, yl = function e(t, n, r, i) {
    var a = parseFloat(r) || 0, o = (r + ``).trim().substr((a + ``).length) || `px`, s = Dc.style, c = Lc.test(n), l = t.tagName.toLowerCase() === `svg`, u = (l ? `client` : `offset`) + (c ? `Width` : `Height`), d = 100, f = i === `px`, p = i === `%`, m, h, g, _;
    if (i === o || !a || _l[i] || _l[o])
        return a;
    if (o !== `px` && !f && (a = e(t, n, r, `px`)),
    _ = t.getCTM && ml(t),
    (p || o === `%`) && (jc[n] || ~n.indexOf(`adius`)))
        return m = _ ? t.getBBox()[c ? `width` : `height`] : t[u],
        ka(p ? a / m * d : a / 100 * m);
    if (s[c ? `width` : `height`] = d + (f ? o : i),
    h = i !== `rem` && ~n.indexOf(`adius`) || i === `em` && t.appendChild && !l ? t : t.parentNode,
    _ && (h = (t.ownerSVGElement || {}).parentNode),
    (!h || h === wc || !h.appendChild) && (h = wc.body),
    g = h._gsap,
    g && p && g.width && c && g.time === ts.time && !g.uncache)
        return ka(a / g.width * d);
    if (p && (n === `height` || n === `width`)) {
        var v = t.style[n];
        t.style[n] = d + i,
        m = t[u],
        v ? t.style[n] = v : hl(t, n)
    } else
        (p || o === `%`) && !vl[sl(h, `display`)] && (s.position = sl(t, `position`)),
        h === t && (s.position = `static`),
        h.appendChild(Dc),
        m = Dc[u],
        h.removeChild(Dc),
        s.position = `absolute`;
    return c && p && (g = Ea(h),
    g.time = ts.time,
    g.width = h[u]),
    ka(f ? m * a / d : m && a ? d / m * a : 0)
}, bl = function(e, t, n, r) {
    var i;
    return Ec || ul(),
    t in zc && t !== `transform` && (t = zc[t],
    ~t.indexOf(`,`) && (t = t.split(`,`)[0])),
    jc[t] && t !== `transform` ? (i = Ml(e, r),
    i = t === `transformOrigin` ? i.svg ? i.origin : Nl(sl(e, el)) + ` ` + i.zOrigin + `px` : i[t]) : (i = e.style[t],
    (!i || i === `auto` || r || ~(i + ``).indexOf(`calc(`)) && (i = Tl[t] && Tl[t](e, t, n) || sl(e, t) || Da(e, t) || +(t === `opacity`))),
    n && !~(i + ``).trim().indexOf(` `) ? yl(e, t, i, n) + n : i
}, xl = function(e, t, n, r) {
    if (!n || n === `none`) {
        var i = ll(t, e, 1)
          , a = i && sl(e, i, 1);
        a && a !== n ? (t = i,
        n = a) : t === `borderColor` && (n = sl(e, `borderTopColor`))
    }
    var o = new Ws(this._pt,e.style,t,0,1,Rs), s = 0, c = 0, l, u, d, f, p, m, h, g, _, v, y, b;
    if (o.b = n,
    o.e = r,
    n += ``,
    r += ``,
    r.substring(0, 6) === `var(--` && (r = sl(e, r.substring(4, r.indexOf(`)`)))),
    r === `auto` && (m = e.style[t],
    e.style[t] = r,
    r = sl(e, t) || r,
    m ? e.style[t] = m : hl(e, t)),
    l = [n, r],
    $o(l),
    n = l[0],
    r = l[1],
    d = n.match(Xi) || [],
    b = r.match(Xi) || [],
    b.length) {
        for (; u = Xi.exec(r); )
            h = u[0],
            _ = r.substring(s, u.index),
            p ? p = (p + 1) % 5 : (_.substr(-5) === `rgba(` || _.substr(-5) === `hsla(`) && (p = 1),
            h !== (m = d[c++] || ``) && (f = parseFloat(m) || 0,
            y = m.substr((f + ``).length),
            h.charAt(1) === `=` && (h = ja(f, h) + y),
            g = parseFloat(h),
            v = h.substr((g + ``).length),
            s = Xi.lastIndex - v.length,
            v || (v = v || wi.units[t] || y,
            s === r.length && (r += v,
            o.e += v)),
            y !== v && (f = yl(e, t, m, v) || 0),
            o._pt = {
                _next: o._pt,
                p: _ || c === 1 ? _ : `,`,
                s: f,
                c: g - f,
                m: p && p < 4 || t === `zIndex` ? Math.round : 0
            });
        o.c = s < r.length ? r.substring(s, r.length) : ``
    } else
        o.r = t === `display` && r === `none` ? Kc : Gc;
    return Qi.test(r) && (o.e = 0),
    this._pt = o,
    o
}, Sl = {
    top: `0%`,
    bottom: `100%`,
    left: `0%`,
    right: `100%`,
    center: `50%`
}, Cl = function(e) {
    var t = e.split(` `)
      , n = t[0]
      , r = t[1] || `50%`;
    return (n === `top` || n === `bottom` || r === `left` || r === `right`) && (e = n,
    n = r,
    r = e),
    t[0] = Sl[n] || n,
    t[1] = Sl[r] || r,
    t.join(` `)
}, wl = function(e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
        var n = t.t, r = n.style, i = t.u, a = n._gsap, o, s, c;
        if (i === `all` || i === !0)
            r.cssText = ``,
            s = 1;
        else
            for (i = i.split(`,`),
            c = i.length; --c > -1; )
                o = i[c],
                jc[o] && (s = 1,
                o = o === `transformOrigin` ? el : $c),
                hl(n, o);
        s && (hl(n, $c),
        a && (a.svg && n.removeAttribute(`transform`),
        r.scale = r.rotate = r.translate = `none`,
        Ml(n, 1),
        a.uncache = 1,
        nl(r)))
    }
}, Tl = {
    clearProps: function(e, t, n, r, i) {
        if (i.data !== `isFromStart`) {
            var a = e._pt = new Ws(e._pt,t,n,0,0,wl);
            return a.u = r,
            a.pr = -10,
            a.tween = i,
            e._props.push(n),
            1
        }
    }
}, El = [1, 0, 0, 1, 0, 0], Dl = {}, Ol = function(e) {
    return e === `matrix(1, 0, 0, 1, 0, 0)` || e === `none` || !e
}, kl = function(e) {
    var t = sl(e, $c);
    return Ol(t) ? El : t.substr(7).match(Yi).map(ka)
}, Al = function(e, t) {
    var n = e._gsap || Ea(e), r = e.style, i = kl(e), a, o, s, c;
    return n.svg && e.getAttribute(`transform`) ? (s = e.transform.baseVal.consolidate().matrix,
    i = [s.a, s.b, s.c, s.d, s.e, s.f],
    i.join(`,`) === `1,0,0,1,0,0` ? El : i) : (i === El && !e.offsetParent && e !== Tc && !n.svg && (s = r.display,
    r.display = `block`,
    a = e.parentNode,
    (!a || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1,
    o = e.nextElementSibling,
    Tc.appendChild(e)),
    i = kl(e),
    s ? r.display = s : hl(e, `display`),
    c && (o ? a.insertBefore(e, o) : a ? a.appendChild(e) : Tc.removeChild(e))),
    t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i)
}, jl = function(e, t, n, r, i, a) {
    var o = e._gsap, s = i || Al(e, !0), c = o.xOrigin || 0, l = o.yOrigin || 0, u = o.xOffset || 0, d = o.yOffset || 0, f = s[0], p = s[1], m = s[2], h = s[3], g = s[4], _ = s[5], v = t.split(` `), y = parseFloat(v[0]) || 0, b = parseFloat(v[1]) || 0, x, S, C, w;
    n ? s !== El && (S = f * h - p * m) && (C = h / S * y + b * (-m / S) + (m * _ - h * g) / S,
    w = y * (-p / S) + f / S * b - (f * _ - p * g) / S,
    y = C,
    b = w) : (x = pl(e),
    y = x.x + (~v[0].indexOf(`%`) ? y / 100 * x.width : y),
    b = x.y + (~(v[1] || v[0]).indexOf(`%`) ? b / 100 * x.height : b)),
    r || r !== !1 && o.smooth ? (g = y - c,
    _ = b - l,
    o.xOffset = u + (g * f + _ * m) - g,
    o.yOffset = d + (g * p + _ * h) - _) : o.xOffset = o.yOffset = 0,
    o.xOrigin = y,
    o.yOrigin = b,
    o.smooth = !!r,
    o.origin = t,
    o.originIsAbsolute = !!n,
    e.style[el] = `0px 0px`,
    a && (gl(a, o, `xOrigin`, c, y),
    gl(a, o, `yOrigin`, l, b),
    gl(a, o, `xOffset`, u, o.xOffset),
    gl(a, o, `yOffset`, d, o.yOffset)),
    e.setAttribute(`data-svg-origin`, y + ` ` + b)
}, Ml = function(e, t) {
    var n = e._gsap || new ms(e);
    if (`x` in n && !t && !n.uncache)
        return n;
    var r = e.style, i = n.scaleX < 0, a = `px`, o = `deg`, s = getComputedStyle(e), c = sl(e, el) || `0`, l = u = d = m = h = g = _ = v = y = 0, u, d, f = p = 1, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, ee, te, ne, re, ie, ae;
    return n.svg = !!(e.getCTM && ml(e)),
    s.translate && ((s.translate !== `none` || s.scale !== `none` || s.rotate !== `none`) && (r[$c] = (s.translate === `none` ? `` : `translate3d(` + (s.translate + ` 0 0`).split(` `).slice(0, 3).join(`, `) + `) `) + (s.rotate === `none` ? `` : `rotate(` + s.rotate + `) `) + (s.scale === `none` ? `` : `scale(` + s.scale.split(` `).join(`,`) + `) `) + (s[$c] === `none` ? `` : s[$c])),
    r.scale = r.rotate = r.translate = `none`),
    S = Al(e, n.svg),
    n.svg && (n.uncache ? (N = e.getBBox(),
    c = n.xOrigin - N.x + `px ` + (n.yOrigin - N.y) + `px`,
    M = ``) : M = !t && e.getAttribute(`data-svg-origin`),
    jl(e, M || c, !!M || n.originIsAbsolute, n.smooth !== !1, S)),
    b = n.xOrigin || 0,
    x = n.yOrigin || 0,
    S !== El && (E = S[0],
    D = S[1],
    O = S[2],
    k = S[3],
    l = A = S[4],
    u = j = S[5],
    S.length === 6 ? (f = Math.sqrt(E * E + D * D),
    p = Math.sqrt(k * k + O * O),
    m = E || D ? Pc(D, E) * Mc : 0,
    _ = O || k ? Pc(O, k) * Mc + m : 0,
    _ && (p *= Math.abs(Math.cos(_ * Nc))),
    n.svg && (l -= b - (b * E + x * O),
    u -= x - (b * D + x * k))) : (ae = S[6],
    re = S[7],
    ee = S[8],
    te = S[9],
    ne = S[10],
    ie = S[11],
    l = S[12],
    u = S[13],
    d = S[14],
    C = Pc(ae, ne),
    h = C * Mc,
    C && (w = Math.cos(-C),
    T = Math.sin(-C),
    M = A * w + ee * T,
    N = j * w + te * T,
    P = ae * w + ne * T,
    ee = A * -T + ee * w,
    te = j * -T + te * w,
    ne = ae * -T + ne * w,
    ie = re * -T + ie * w,
    A = M,
    j = N,
    ae = P),
    C = Pc(-O, ne),
    g = C * Mc,
    C && (w = Math.cos(-C),
    T = Math.sin(-C),
    M = E * w - ee * T,
    N = D * w - te * T,
    P = O * w - ne * T,
    ie = k * T + ie * w,
    E = M,
    D = N,
    O = P),
    C = Pc(D, E),
    m = C * Mc,
    C && (w = Math.cos(C),
    T = Math.sin(C),
    M = E * w + D * T,
    N = A * w + j * T,
    D = D * w - E * T,
    j = j * w - A * T,
    E = M,
    A = N),
    h && Math.abs(h) + Math.abs(m) > 359.9 && (h = m = 0,
    g = 180 - g),
    f = ka(Math.sqrt(E * E + D * D + O * O)),
    p = ka(Math.sqrt(j * j + ae * ae)),
    C = Pc(A, j),
    _ = Math.abs(C) > 2e-4 ? C * Mc : 0,
    y = ie ? 1 / (ie < 0 ? -ie : ie) : 0),
    n.svg && (M = e.getAttribute(`transform`),
    n.forceCSS = e.setAttribute(`transform`, ``) || !Ol(sl(e, $c)),
    M && e.setAttribute(`transform`, M))),
    Math.abs(_) > 90 && Math.abs(_) < 270 && (i ? (f *= -1,
    _ += m <= 0 ? 180 : -180,
    m += m <= 0 ? 180 : -180) : (p *= -1,
    _ += _ <= 0 ? 180 : -180)),
    t ||= n.uncache,
    n.x = l - ((n.xPercent = l && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-l) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + a,
    n.y = u - ((n.yPercent = u && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + a,
    n.z = d + a,
    n.scaleX = ka(f),
    n.scaleY = ka(p),
    n.rotation = ka(m) + o,
    n.rotationX = ka(h) + o,
    n.rotationY = ka(g) + o,
    n.skewX = _ + o,
    n.skewY = v + o,
    n.transformPerspective = y + a,
    (n.zOrigin = parseFloat(c.split(` `)[2]) || !t && n.zOrigin || 0) && (r[el] = Nl(c)),
    n.xOffset = n.yOffset = 0,
    n.force3D = wi.force3D,
    n.renderTransform = n.svg ? Bl : al ? zl : Fl,
    n.uncache = 0,
    n
}, Nl = function(e) {
    return (e = e.split(` `))[0] + ` ` + e[1]
}, Pl = function(e, t, n) {
    var r = yo(t);
    return ka(parseFloat(t) + parseFloat(yl(e, `x`, n + `px`, r))) + r
}, Fl = function(e, t) {
    t.z = `0px`,
    t.rotationY = t.rotationX = `0deg`,
    t.force3D = 0,
    zl(e, t)
}, Il = `0deg`, Ll = `0px`, Rl = `) `, zl = function(e, t) {
    var n = t || this
      , r = n.xPercent
      , i = n.yPercent
      , a = n.x
      , o = n.y
      , s = n.z
      , c = n.rotation
      , l = n.rotationY
      , u = n.rotationX
      , d = n.skewX
      , f = n.skewY
      , p = n.scaleX
      , m = n.scaleY
      , h = n.transformPerspective
      , g = n.force3D
      , _ = n.target
      , v = n.zOrigin
      , y = ``
      , b = g === `auto` && e && e !== 1 || g === !0;
    if (v && (u !== Il || l !== Il)) {
        var x = parseFloat(l) * Nc, S = Math.sin(x), C = Math.cos(x), w;
        x = parseFloat(u) * Nc,
        w = Math.cos(x),
        a = Pl(_, a, S * w * -v),
        o = Pl(_, o, -Math.sin(x) * -v),
        s = Pl(_, s, C * w * -v + v)
    }
    h !== Ll && (y += `perspective(` + h + Rl),
    (r || i) && (y += `translate(` + r + `%, ` + i + `%) `),
    (b || a !== Ll || o !== Ll || s !== Ll) && (y += s !== Ll || b ? `translate3d(` + a + `, ` + o + `, ` + s + `) ` : `translate(` + a + `, ` + o + Rl),
    c !== Il && (y += `rotate(` + c + Rl),
    l !== Il && (y += `rotateY(` + l + Rl),
    u !== Il && (y += `rotateX(` + u + Rl),
    (d !== Il || f !== Il) && (y += `skew(` + d + `, ` + f + Rl),
    (p !== 1 || m !== 1) && (y += `scale(` + p + `, ` + m + Rl),
    _.style[$c] = y || `translate(0, 0)`
}, Bl = function(e, t) {
    var n = t || this, r = n.xPercent, i = n.yPercent, a = n.x, o = n.y, s = n.rotation, c = n.skewX, l = n.skewY, u = n.scaleX, d = n.scaleY, f = n.target, p = n.xOrigin, m = n.yOrigin, h = n.xOffset, g = n.yOffset, _ = n.forceCSS, v = parseFloat(a), y = parseFloat(o), b, x, S, C, w;
    s = parseFloat(s),
    c = parseFloat(c),
    l = parseFloat(l),
    l && (l = parseFloat(l),
    c += l,
    s += l),
    s || c ? (s *= Nc,
    c *= Nc,
    b = Math.cos(s) * u,
    x = Math.sin(s) * u,
    S = Math.sin(s - c) * -d,
    C = Math.cos(s - c) * d,
    c && (l *= Nc,
    w = Math.tan(c - l),
    w = Math.sqrt(1 + w * w),
    S *= w,
    C *= w,
    l && (w = Math.tan(l),
    w = Math.sqrt(1 + w * w),
    b *= w,
    x *= w)),
    b = ka(b),
    x = ka(x),
    S = ka(S),
    C = ka(C)) : (b = u,
    C = d,
    x = S = 0),
    (v && !~(a + ``).indexOf(`px`) || y && !~(o + ``).indexOf(`px`)) && (v = yl(f, `x`, a, `px`),
    y = yl(f, `y`, o, `px`)),
    (p || m || h || g) && (v = ka(v + p - (p * b + m * S) + h),
    y = ka(y + m - (p * x + m * C) + g)),
    (r || i) && (w = f.getBBox(),
    v = ka(v + r / 100 * w.width),
    y = ka(y + i / 100 * w.height)),
    w = `matrix(` + b + `,` + x + `,` + S + `,` + C + `,` + v + `,` + y + `)`,
    f.setAttribute(`transform`, w),
    _ && (f.style[$c] = w)
}, Vl = function(e, t, n, r, i) {
    var a = 360, o = Ii(i), s = parseFloat(i) * (o && ~i.indexOf(`rad`) ? Mc : 1) - r, c = r + s + `deg`, l, u;
    return o && (l = i.split(`_`)[1],
    l === `short` && (s %= a,
    s !== s % (a / 2) && (s += s < 0 ? a : -a)),
    l === `cw` && s < 0 ? s = (s + a * Fc) % a - ~~(s / a) * a : l === `ccw` && s > 0 && (s = (s - a * Fc) % a - ~~(s / a) * a)),
    e._pt = u = new Ws(e._pt,t,n,r,s,Vc),
    u.e = c,
    u.u = `deg`,
    e._props.push(n),
    u
}, Hl = function(e, t) {
    for (var n in t)
        e[n] = t[n];
    return e
}, Ul = function(e, t, n) {
    var r = Hl({}, n._gsap), i = `perspective,force3D,transformOrigin,svgOrigin`, a = n.style, o, s, c, l, u, d, f, p;
    for (s in r.svg ? (c = n.getAttribute(`transform`),
    n.setAttribute(`transform`, ``),
    a[$c] = t,
    o = Ml(n, 1),
    hl(n, $c),
    n.setAttribute(`transform`, c)) : (c = getComputedStyle(n)[$c],
    a[$c] = t,
    o = Ml(n, 1),
    a[$c] = c),
    jc)
        c = r[s],
        l = o[s],
        c !== l && i.indexOf(s) < 0 && (f = yo(c),
        p = yo(l),
        u = f === p ? parseFloat(c) : yl(n, s, c, p),
        d = parseFloat(l),
        e._pt = new Ws(e._pt,o,s,u,d - u,Bc),
        e._pt.u = p || 0,
        e._props.push(s));
    Hl(o, r)
};
Oa(`padding,margin,Width,Radius`, function(e, t) {
    var n = `Top`
      , r = `Right`
      , i = `Bottom`
      , a = `Left`
      , o = (t < 3 ? [n, r, i, a] : [n + a, n + r, i + r, i + a]).map(function(n) {
        return t < 2 ? e + n : `border` + n + e
    });
    Tl[t > 1 ? `border` + e : e] = function(e, t, n, r, i) {
        var a, s;
        if (arguments.length < 4)
            return a = o.map(function(t) {
                return bl(e, t, n)
            }),
            s = a.join(` `),
            s.split(a[0]).length === 5 ? a[0] : s;
        a = (r + ``).split(` `),
        s = {},
        o.forEach(function(e, t) {
            return s[e] = a[t] = a[t] || a[(t - 1) / 2 | 0]
        }),
        e.init(t, s, i)
    }
});
var Wl = {
    name: `css`,
    register: ul,
    targetTest: function(e) {
        return e.style && e.nodeType
    },
    init: function(e, t, n, r, i) {
        var a = this._props, o = e.style, s = n.vars.startAt, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w;
        for (m in Ec || ul(),
        this.styles = this.styles || il(e),
        C = this.styles.props,
        this.tween = n,
        t)
            if (m !== `autoRound` && (l = t[m],
            !(ba[m] && bs(m, t, n, r, e, i)))) {
                if (f = typeof l,
                p = Tl[m],
                f === `function` && (l = l.call(n, r, e, i),
                f = typeof l),
                f === `string` && ~l.indexOf(`random(`) && (l = Lo(l)),
                p)
                    p(this, e, m, l, n) && (S = 1);
                else if (m.substr(0, 2) === `--`)
                    c = (getComputedStyle(e).getPropertyValue(m) + ``).trim(),
                    l += ``,
                    Zo.lastIndex = 0,
                    Zo.test(c) || (h = yo(c),
                    g = yo(l),
                    g ? h !== g && (c = yl(e, m, c, g) + g) : h && (l += h)),
                    this.add(o, `setProperty`, c, l, r, i, 0, 0, m),
                    a.push(m),
                    C.push(m, 0, o[m]);
                else if (f !== `undefined`) {
                    if (s && m in s ? (c = typeof s[m] == `function` ? s[m].call(n, r, e, i) : s[m],
                    Ii(c) && ~c.indexOf(`random(`) && (c = Lo(c)),
                    yo(c + ``) || c === `auto` || (c += wi.units[m] || yo(bl(e, m)) || ``),
                    (c + ``).charAt(1) === `=` && (c = bl(e, m))) : c = bl(e, m),
                    d = parseFloat(c),
                    _ = f === `string` && l.charAt(1) === `=` && l.substr(0, 2),
                    _ && (l = l.substr(2)),
                    u = parseFloat(l),
                    m in zc && (m === `autoAlpha` && (d === 1 && bl(e, `visibility`) === `hidden` && u && (d = 0),
                    C.push(`visibility`, 0, o.visibility),
                    gl(this, o, `visibility`, d ? `inherit` : `hidden`, u ? `inherit` : `hidden`, !u)),
                    m !== `scale` && m !== `transform` && (m = zc[m],
                    ~m.indexOf(`,`) && (m = m.split(`,`)[0]))),
                    v = m in jc,
                    v) {
                        if (this.styles.save(m),
                        w = l,
                        f === `string` && l.substring(0, 6) === `var(--`) {
                            if (l = sl(e, l.substring(4, l.indexOf(`)`))),
                            l.substring(0, 5) === `calc(`) {
                                var T = e.style.perspective;
                                e.style.perspective = l,
                                l = sl(e, `perspective`),
                                T ? e.style.perspective = T : hl(e, `perspective`)
                            }
                            u = parseFloat(l)
                        }
                        if (y || (b = e._gsap,
                        b.renderTransform && !t.parseTransform || Ml(e, t.parseTransform),
                        x = t.smoothOrigin !== !1 && b.smooth,
                        y = this._pt = new Ws(this._pt,o,$c,0,1,b.renderTransform,b,0,-1),
                        y.dep = 1),
                        m === `scale`)
                            this._pt = new Ws(this._pt,b,`scaleY`,b.scaleY,(_ ? ja(b.scaleY, _ + u) : u) - b.scaleY || 0,Bc),
                            this._pt.u = 0,
                            a.push(`scaleY`, m),
                            m += `X`;
                        else if (m === `transformOrigin`) {
                            C.push(el, 0, o[el]),
                            l = Cl(l),
                            b.svg ? jl(e, l, 0, x, 0, this) : (g = parseFloat(l.split(` `)[2]) || 0,
                            g !== b.zOrigin && gl(this, b, `zOrigin`, b.zOrigin, g),
                            gl(this, o, m, Nl(c), Nl(l)));
                            continue
                        } else if (m === `svgOrigin`) {
                            jl(e, l, 1, x, 0, this);
                            continue
                        } else if (m in Dl) {
                            Vl(this, b, m, d, _ ? ja(d, _ + l) : l);
                            continue
                        } else if (m === `smoothOrigin`) {
                            gl(this, b, `smooth`, b.smooth, l);
                            continue
                        } else if (m === `force3D`) {
                            b[m] = l;
                            continue
                        } else if (m === `transform`) {
                            Ul(this, l, e);
                            continue
                        }
                    } else
                        m in o || (m = ll(m) || m);
                    if (v || (u || u === 0) && (d || d === 0) && !Rc.test(l) && m in o)
                        h = (c + ``).substr((d + ``).length),
                        u ||= 0,
                        g = yo(l) || (m in wi.units ? wi.units[m] : h),
                        h !== g && (d = yl(e, m, c, g)),
                        this._pt = new Ws(this._pt,v ? b : o,m,d,(_ ? ja(d, _ + u) : u) - d,!v && (g === `px` || m === `zIndex`) && t.autoRound !== !1 ? Wc : Bc),
                        this._pt.u = g || 0,
                        v && w !== l ? (this._pt.b = c,
                        this._pt.e = w,
                        this._pt.r = Uc) : h !== g && g !== `%` && (this._pt.b = c,
                        this._pt.r = Hc);
                    else if (m in o)
                        xl.call(this, e, m, c, _ ? _ + l : l);
                    else if (m in e)
                        this.add(e, m, c || e[m], _ ? _ + l : l, r, i);
                    else if (m !== `parseTransform`) {
                        la(m, l);
                        continue
                    }
                    v || (m in o ? C.push(m, 0, o[m]) : typeof e[m] == `function` ? C.push(m, 2, e[m]()) : C.push(m, 1, c || e[m])),
                    a.push(m)
                }
            }
        S && Us(this)
    },
    render: function(e, t) {
        if (t.tween._time || !kc())
            for (var n = t._pt; n; )
                n.r(e, n.d),
                n = n._next;
        else
            t.styles.revert()
    },
    get: bl,
    aliases: zc,
    getSetter: function(e, t, n) {
        var r = zc[t];
        return r && r.indexOf(`,`) < 0 && (t = r),
        t in jc && t !== el && (e._gsap.x || bl(e, `x`)) ? n && Oc === n ? t === `scale` ? Xc : Yc : (Oc = n || {}) && (t === `scale` ? Zc : Qc) : e.style && !zi(e.style[t]) ? qc : ~t.indexOf(`-`) ? Jc : Fs(e, t)
    },
    core: {
        _removeProperty: hl,
        _getMatrix: Al
    }
};
ic.utils.checkPrefix = ll,
ic.core.getStyleSaver = il,
(function(e, t, n, r) {
    var i = Oa(e + `,` + t + `,` + n, function(e) {
        jc[e] = 1
    });
    Oa(t, function(e) {
        wi.units[e] = `deg`,
        Dl[e] = 1
    }),
    zc[i[13]] = e + `,` + t,
    Oa(r, function(e) {
        var t = e.split(`:`);
        zc[t[1]] = i[t[0]]
    })
}
)(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`, `rotation,rotationX,rotationY,skewX,skewY`, `transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`, `0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),
Oa(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`, function(e) {
    wi.units[e] = `px`
}),
ic.registerPlugin(Wl);
var Gl = e({
    Back: () => _c,
    Bounce: () => yc,
    CSSPlugin: () => Wl,
    Circ: () => Sc,
    Cubic: () => fc,
    Elastic: () => gc,
    Expo: () => xc,
    Linear: () => uc,
    Power0: () => ac,
    Power1: () => oc,
    Power2: () => sc,
    Power3: () => cc,
    Power4: () => lc,
    Quad: () => dc,
    Quart: () => pc,
    Quint: () => mc,
    Sine: () => bc,
    SteppedEase: () => vc,
    Strong: () => hc,
    TimelineLite: () => gs,
    TimelineMax: () => gs,
    TweenLite: () => As,
    TweenMax: () => ql,
    default: () => Kl,
    gsap: () => Kl
})
  , Kl = ic.registerPlugin(Wl) || ic
  , ql = Kl.core.Tween;
export {Ae as a, Bt as i, Gl as n, X as r, Kl as t};
