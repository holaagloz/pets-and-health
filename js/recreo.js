(() => {
  'use strict';
  const d = document, html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINO = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const safe = (fn) => { try { fn(); } catch (e) { console.warn('[gloz-vet]', e); } };

  // Movimiento de la marca: juguetón, elástico y corto, como un dibujo animado
  const M = { ease: 'expo.out', pop: 'back.out(2.2)', io: 'sine.inOut', dur: 0.7, stagger: 0.055, dist: 26, lerp: 0.1 };

  /* ---------- Lo que funciona aunque no carguen las librerías ---------- */
  // WhatsApp: cada botón arma su enlace con el mensaje de su atributo data-msj
  const WA = '50662652841';
  safe(() => { $$('[data-msj]').forEach((a) => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.msj)}`; }); });

  // Navegación: al bajar se vuelve una barra marino
  const nav = $('[data-nav]');
  const fijarNav = () => nav && nav.classList.toggle('nav--fija', scrollY > 40);
  addEventListener('scroll', fijarNav, { passive: true }); fijarNav();

  // Menú del celular
  let lenis = null;
  const menu = $('[data-menu]'), abrirMenu = $('[data-abrir-menu]'), cerrarMenu = $('[data-cerrar-menu]');
  const menuAbierto = (on) => {
    if (!menu) return;
    menu.hidden = !on;
    abrirMenu.setAttribute('aria-expanded', String(on));
    html.style.overflow = on ? 'hidden' : '';
    if (lenis) { if (on) lenis.stop(); else lenis.start(); }
    (on ? cerrarMenu : abrirMenu).focus();
  };
  safe(() => {
    abrirMenu.addEventListener('click', () => menuAbierto(true));
    cerrarMenu.addEventListener('click', () => menuAbierto(false));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) menuAbierto(false); });
  });

  // Enlaces internos: cierran el menú y bajan suave, sin quedar debajo de la barra
  safe(() => {
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href'), destino = id.length > 1 && $(id);
      if (!destino) return;
      e.preventDefault();
      if (menu && !menu.hidden) menuAbierto(false);
      const y = id === '#inicio' ? 0 : destino.getBoundingClientRect().top + scrollY - 76;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    }));
  });

  // Barra fija del celular: después de la portada y nunca encima del contacto
  safe(() => {
    const barra = $('[data-barra]'), portadaEl = $('[data-portada]'), fin = $('#contacto');
    if (!barra || !('IntersectionObserver' in window)) return;
    const estado = { portada: true, fin: false };
    const pintar = () => {
      const on = !estado.portada && !estado.fin;
      barra.classList.toggle('visible', on);
      barra.setAttribute('aria-hidden', String(!on));
      $$('a', barra).forEach((el) => { el.tabIndex = on ? 0 : -1; });
    };
    new IntersectionObserver(([e]) => { estado.portada = e.isIntersecting; pintar(); }).observe(portadaEl);
    new IntersectionObserver(([e]) => { estado.fin = e.isIntersecting; pintar(); }, { rootMargin: '0px 0px -30% 0px' }).observe(fin);
  });

  if (!hasGSAP) { html.classList.remove('js'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- Piezas de la portada ---------- */
  const portada = $('[data-portada]'), gig = $('[data-gigante]'), bola = $('[data-bola]'), bolaSvg = $('svg', bola), giro = $('[data-giro]', bola);
  const perro = $('[data-perro]'), juega = $('[data-reverencia]'), salto = $('[data-salto]'), globo = $('[data-globo]');
  const cola = $('[data-cola]'), cabeza = $('[data-cabeza]'), ojo = $('[data-ojo]'), marcas = $('[data-marcas]'), meneo = $('[data-meneo]');
  const gata = $('[data-gata]'), pupilas = $('[data-pupilas]'), ojosGata = $('[data-ojos-gata]'), colaGata = $('[data-cola-gata]');
  const estela = $('[data-estela]'), estelaPath = $('path', estela), cta = $('[data-cta]');
  const sentado = $('[data-sentado]'), sentadoDib = $('[data-sentado-dibujo]'), globoS = $('[data-globo-s]');
  const colaS = $('[data-cola-s]'), colaSLenta = $('[data-cola-s-lenta]'), meneoS = $('[data-meneo-s]');
  const respira = $('[data-respira]'), cabezaS = $('[data-cabeza-s]'), lengua = $('[data-lengua]'), mira = $('[data-mira]'), ojosS = $('[data-ojos-s]');

  // Letras sueltas para que la pelota las haga rebotar (el punto lo pone la pelota)
  const palabra = $('[data-palabra]');
  const letras = [...palabra.textContent].map((ch) => { const s = d.createElement('span'); s.className = 'gl'; s.textContent = ch; return s; });
  palabra.textContent = ''; letras.forEach((s) => palabra.appendChild(s));
  const linea = $('[data-linea]');
  const palabras1 = linea.textContent.trim().split(/\s+/).map((w) => { const s = d.createElement('span'); s.className = 'pal'; s.textContent = w; return s; });
  linea.textContent = ''; palabras1.forEach((s, i) => { linea.appendChild(s); if (i < palabras1.length - 1) linea.appendChild(d.createTextNode(' ')); });

  // Medidas de Gabarito: línea base y alto de cada letra, en fracciones del tamaño de la letra
  const BASE = 0.77, ALTO = { p: .51, e: .51, l: .68, u: .49, d: .68, i: .75, t: .62, o: .51, s: .51 };
  const rel = (el) => { const a = el.getBoundingClientRect(), b = portada.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }; };
  const curva = (a, c, b, t) => { const u = 1 - t; return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y }; };
  const control = (a, b, h) => ({ x: (a.x + b.x) / 2, y: 2 * (Math.min(a.y, b.y) - h) - (a.y + b.y) / 2 });
  const f1 = (n) => n.toFixed(1);
  const tramo = (a, c, b, t) => { const c1 = { x: a.x + (c.x - a.x) * t, y: a.y + (c.y - a.y) * t }, p = curva(a, c, b, t); return `M${f1(a.x)} ${f1(a.y)}Q${f1(c1.x)} ${f1(c1.y)} ${f1(p.x)} ${f1(p.y)}`; };

  // El botón late (rima con la pelota)
  const latidoBoton = (b) => {
    if (!b || RM) return;
    const ic = $('.boton__icono', b), p = $('path', b);
    gsap.timeline()
      .fromTo(ic, { scale: 1 }, { scale: 1.18, duration: 0.13, ease: 'power2.out' })
      .to(ic, { scale: 1, duration: 0.55, ease: 'elastic.out(1,.4)' })
      .fromTo(p, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 0)
      .fromTo(b, { boxShadow: '0 6px 0 #021C4C, 0 0 0 0 rgba(169,247,240,.75)' }, { boxShadow: '0 6px 0 #021C4C, 0 0 0 16px rgba(169,247,240,0)', duration: 0.9, ease: 'power2.out', clearProps: 'boxShadow' }, 0);
  };
  const apachurrar = (el, fuerza = 1) => gsap.timeline()
    .to(el, { scaleY: 1 - 0.28 * fuerza, scaleX: 1 + 0.22 * fuerza, duration: 0.06, ease: 'power2.out', transformOrigin: '50% 100%' })
    .to(el, { scaleY: 1, scaleX: 1, duration: 0.42, ease: 'elastic.out(1,.38)' });
  const menear = (veces = 6) => gsap.timeline()
    .set(meneo, { opacity: 1 })
    .fromTo(cola, { rotation: -12 }, { rotation: 16, duration: 0.11, ease: M.io, yoyo: true, repeat: veces * 2 - 1, svgOrigin: '92 78' })
    .to(cola, { rotation: 0, duration: 0.2, svgOrigin: '92 78' })
    .to(meneo, { opacity: 0, duration: 0.2 }, '<');
  const parpadeo = (el, origen) => gsap.timeline().to(el, { scaleY: 0.1, duration: 0.07, svgOrigin: origen }).to(el, { scaleY: 1, duration: 0.11, svgOrigin: origen });
  // El sentado: meneo rápido de cola y cabeza ladeada, como cuando te escucha
  const menearS = (veces = 6) => gsap.timeline()
    .set(meneoS, { opacity: 1 })
    .fromTo(colaS, { rotation: -14 }, { rotation: 18, duration: 0.1, ease: M.io, yoyo: true, repeat: veces * 2 - 1, svgOrigin: '182 296' })
    .to(colaS, { rotation: 0, duration: 0.2, svgOrigin: '182 296' })
    .to(meneoS, { opacity: 0, duration: 0.2 }, '<');
  let lado = 1;
  const ladear = () => { lado = -lado; return gsap.timeline()
    .to(cabezaS, { rotation: 9 * lado, duration: 0.32, ease: M.pop, svgOrigin: '130 150' })
    .to(cabezaS, { rotation: 0, duration: 0.7, ease: 'elastic.out(1,.45)', svgOrigin: '130 150' }, '+=0.9'); };

  /* ---------- Firma: la pelota rebota en las letras, el dálmata la persigue y la pelota se vuelve el punto ---------- */
  let firma = null, intro = false;
  const construirFirma = () => {
    if (firma) firma.kill();
    gsap.killTweensOf([bola, bolaSvg, giro, perro, juega, salto, cola, cabeza, gata, sentado, sentadoDib, ...letras]);
    gsap.set([bola, bolaSvg, perro, sentado, sentadoDib, ...letras], { clearProps: 'transform' });
    perro.style.display = '';
    gsap.set('[data-portada] [data-pieza], [data-logo], [data-urgencia], [data-wa], [data-abrir-menu]', { autoAlpha: 1 });

    const fs = parseFloat(getComputedStyle(gig).fontSize);
    const P = portada.getBoundingClientRect();
    estela.setAttribute('viewBox', `0 0 ${P.width} ${P.height}`);
    const B = rel(bola), r = B.w / 2, quieta = { x: B.x + r, y: B.y + r };
    const G = rel(gig), base = G.y + BASE * fs;
    const encima = (i) => { const L = rel(letras[i]); return { x: L.x + L.w * 0.46, y: base - (ALTO[letras[i].textContent] || 0.51) * fs - r }; };

    // Recorrido: entra por la izquierda, rebota en «e», «u» y «t» y cae como el punto final
    const pts = [{ x: -3 * r, y: G.y - 1.15 * fs }, encima(1), encima(3), encima(6), quieta];
    const altos = [0.22, 0.7, 0.55, 0.85].map((k) => k * fs);
    const durs = [0.34, 0.38, 0.34, 0.46];
    const golpes = [1, 3, 6];
    const ctrls = pts.slice(0, -1).map((a, i) => control(a, pts[i + 1], altos[i]));
    const enteros = ctrls.map((c, i) => tramo(pts[i], c, pts[i + 1], 1));

    const D = rel(perro), S = rel(sentado);
    gsap.set(bola, { autoAlpha: 0 });
    gsap.set(perro, { autoAlpha: 0 });
    gsap.set(sentado, { autoAlpha: 0 });
    gsap.set(estelaPath, { attr: { d: '' }, opacity: 0.9 });

    intro = true;
    const tl = gsap.timeline({ defaults: { ease: M.ease }, onComplete: () => { intro = false; } });
    tl.fromTo('[data-logo]', { autoAlpha: 0, scale: 0.6, rotation: -10 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.6, ease: M.pop }, 0)
      .fromTo(palabras1, { autoAlpha: 0, yPercent: 70, rotation: () => gsap.utils.random(-8, 8) }, { autoAlpha: 1, yPercent: 0, rotation: 0, duration: M.dur, stagger: M.stagger, ease: 'back.out(1.8)' }, 0.08)
      .fromTo(letras, { autoAlpha: 0, yPercent: 60, scaleY: 0.3 }, { autoAlpha: 1, yPercent: 0, scaleY: 1, duration: 0.6, stagger: 0.045, ease: M.pop }, 0.18)
      .fromTo(gata, { autoAlpha: 0, scaleY: 0.2, yPercent: 20 }, { autoAlpha: 1, scaleY: 1, yPercent: 0, duration: 0.55, ease: 'back.out(2.6)', transformOrigin: '50% 72%' }, 0.6)
      .fromTo('[data-urgencia], [data-wa], [data-abrir-menu], [data-sub], [data-cta], [data-tel]', { autoAlpha: 0 }, { autoAlpha: 0, duration: 0.01 }, 0);

    // La pelota y su estela
    let t = 0.72;
    tl.set(bola, { autoAlpha: 1 }, t);
    pts.slice(0, -1).forEach((a, i) => {
      const b = pts[i + 1], c = ctrls[i], o = { k: 0 }, previo = enteros.slice(0, i).join('');
      tl.to(o, { k: 1, duration: durs[i], ease: 'none', onUpdate: () => {
        const p = curva(a, c, b, o.k);
        gsap.set(bola, { x: p.x - quieta.x, y: p.y - quieta.y });
        gsap.set(giro, { rotation: (p.x - pts[0].x) / r * 38, svgOrigin: '50 50' });
        estelaPath.setAttribute('d', previo + tramo(a, c, b, o.k));
      } }, t);
      t += durs[i];
      tl.add(apachurrar(bolaSvg, i === 3 ? 1.1 : 0.9), t);
      if (golpes[i] != null) {
        const L = letras[golpes[i]];
        tl.to(L, { y: 0.07 * fs, scaleY: 0.88, duration: 0.07, ease: 'power2.out' }, t)
          .to(L, { y: 0, scaleY: 1, duration: 0.65, ease: 'elastic.out(1,.32)' }, t + 0.07);
      }
      // Cada rebote enciende una pieza de la portada
      if (i === 0) tl.fromTo('[data-urgencia]', { autoAlpha: 0, scale: 0.5, y: -12 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: M.pop, immediateRender: false }, t);
      if (i === 1) tl.fromTo('[data-wa], [data-abrir-menu]', { autoAlpha: 0, scale: 0.4, rotation: -30 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.55, ease: M.pop, immediateRender: false }, t);
      if (i === 2) tl.fromTo('[data-sub]', { autoAlpha: 0, y: M.dist }, { autoAlpha: 1, y: 0, duration: M.dur, immediateRender: false }, t - 0.05);
    });
    const llega = t;
    // Dos rebotitos en su lugar: ya es el punto de «peluditos.»
    [0.2, 0.08].forEach((k, j) => {
      const o = { k: 0 }, h = k * fs, dur = j ? 0.14 : 0.22;
      tl.to(o, { k: 1, duration: dur, ease: 'none', onUpdate: () => gsap.set(bola, { x: 0, y: -4 * h * o.k * (1 - o.k) }) }, t);
      t += dur;
      tl.add(apachurrar(bolaSvg, j ? 0.35 : 0.6), t);
    });
    tl.set(bola, { x: 0, y: 0 }, t);
    tl.fromTo('[data-cta]', { autoAlpha: 0, scale: 0.6, y: 14 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2.6)', immediateRender: false }, llega)
      .add(() => latidoBoton(cta), llega + 0.35)
      .fromTo('[data-tel]', { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.5, immediateRender: false }, llega + 0.12)
      .to(estelaPath, { opacity: 0, duration: 0.7, ease: 'none' }, llega + 0.45);

    // El dálmata llega saltando detrás de la pelota
    const salida = { x: -(D.x + D.w + 24), y: -0.25 * fs }, meta = { x: 0, y: 0 }, cs = control(salida, meta, 0.75 * fs), oP = { k: 0 };
    const tSalto = llega - 0.55, durSalto = 0.78;
    tl.set(perro, { autoAlpha: 1 }, tSalto)
      .set(salto, { autoAlpha: 1 }, tSalto)
      .set(juega, { autoAlpha: 0 }, tSalto)
      .to(oP, { k: 1, duration: durSalto, ease: 'none', onUpdate: () => { const p = curva(salida, cs, meta, oP.k); gsap.set(perro, { x: p.x, y: p.y }); } }, tSalto)
      .fromTo(perro, { rotation: -12 }, { rotation: 9, duration: durSalto, ease: 'sine.inOut' }, tSalto)
      .set(salto, { autoAlpha: 0 }, tSalto + durSalto)
      .set(juega, { autoAlpha: 1 }, tSalto + durSalto)
      .set(perro, { rotation: 0 }, tSalto + durSalto)
      .add(apachurrar(perro, 0.7), tSalto + durSalto)
      .fromTo(marcas, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: M.pop, svgOrigin: '292 74', immediateRender: false }, tSalto + durSalto + 0.05)
      .to(marcas, { opacity: 0, duration: 0.4 }, tSalto + durSalto + 0.9)
      .add(() => menear(5), tSalto + durSalto + 0.1)
      .fromTo('[data-decor] > *', { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: M.pop }, llega + 0.3);

    // Después de jugar, se da cuenta de que lo estás viendo: brinca a su lugar y se sienta de frente
    // (en escritorio, al hueco de la derecha; en celular, ahí mismo sobre «itos»)
    const destino = { x: (S.x + S.w / 2) - (D.x + D.w / 2), y: (S.y + S.h * 0.94) - (D.y + D.h * 0.94) };
    const tBrinco = tSalto + durSalto + 1.25, durBrinco = Math.min(0.66, 0.42 + Math.abs(destino.x) / 2600), oB = { k: 0 };
    const cb = control({ x: 0, y: 0 }, destino, 0.42 * fs);
    tl.set(juega, { autoAlpha: 0 }, tBrinco)
      .set(salto, { autoAlpha: 1 }, tBrinco)
      .to(oB, { k: 1, duration: durBrinco, ease: 'none', onUpdate: () => { const p = curva({ x: 0, y: 0 }, cb, destino, oB.k); gsap.set(perro, { x: p.x, y: p.y }); } }, tBrinco)
      .fromTo(perro, { rotation: -10 }, { rotation: 7, duration: durBrinco, ease: 'sine.inOut', immediateRender: false }, tBrinco)
      .set(perro, { display: 'none' }, tBrinco + durBrinco)
      .set(sentado, { autoAlpha: 1 }, tBrinco + durBrinco)
      .fromTo(sentadoDib, { scaleX: 1.18, scaleY: 0.72 }, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1,.38)', transformOrigin: '50% 94%', immediateRender: false }, tBrinco + durBrinco)
      .add(() => { menearS(6); ladear(); }, tBrinco + durBrinco + 0.25);
    firma = tl;
    return tl;
  };

  /* ---------- La gata sigue la pelota (o el mouse) con los ojos ---------- */
  let puntero = null, portadaVisible = true;
  if (FINO) addEventListener('pointermove', (e) => { puntero = { x: e.clientX, y: e.clientY, t: performance.now() }; }, { passive: true });
  const mirar = () => {
    if (!portadaVisible) return;
    const g = gata.getBoundingClientRect(); if (!g.width) return;
    const ex = g.left + g.width * 0.5, ey = g.top + g.height * 0.19;
    let tx, ty;
    if (puntero && performance.now() - puntero.t < 4000 && !intro) { tx = puntero.x; ty = puntero.y; }
    else { const b = bola.getBoundingClientRect(); tx = b.left + b.width / 2; ty = b.top + b.height / 2; }
    const dx = tx - ex, dy = ty - ey, n = Math.hypot(dx, dy) || 1, k = Math.min(1, n / 120);
    gsap.set(pupilas, { x: (dx / n) * 2.6 * k, y: (dy / n) * 2 * k });
    // El sentado te mira de frente; si movés el mouse, lo sigue con los ojos y vuelve a verte
    const s = sentado.getBoundingClientRect(); if (!s.width) return;
    let mx = 0, my = 0;
    if (puntero && performance.now() - puntero.t < 4000 && !intro) {
      const sx = s.left + s.width * 0.5, sy = s.top + s.height * 0.29, ddx = puntero.x - sx, ddy = puntero.y - sy, nn = Math.hypot(ddx, ddy) || 1, kk = Math.min(1, nn / 160);
      mx = (ddx / nn) * 4 * kk; my = (ddy / nn) * 3 * kk;
    }
    miraX(mx); miraY(my);
  };
  const miraX = gsap.quickTo(mira, 'x', { duration: 0.35, ease: 'power2.out' }), miraY = gsap.quickTo(mira, 'y', { duration: 0.35, ease: 'power2.out' });

  /* ---------- La pelota late: dos rebotes como un latido, y el botón late con ella ---------- */
  const latido = () => {
    const fs = parseFloat(getComputedStyle(gig).fontSize), h1 = 0.3 * fs, h2 = 0.14 * fs;
    latidoBoton(cta);
    gsap.timeline()
      .to(bola, { y: -h1, duration: 0.17, ease: 'power2.out' })
      .to(bola, { y: 0, duration: 0.15, ease: 'power2.in' })
      .add(apachurrar(bolaSvg, 0.7))
      .to(bola, { y: -h2, duration: 0.12, ease: 'power2.out' }, '-=0.38')
      .to(bola, { y: 0, duration: 0.11, ease: 'power2.in' })
      .add(apachurrar(bolaSvg, 0.4));
    gsap.timeline().to(cabeza, { rotation: 5, duration: 0.17, ease: 'power2.out', svgOrigin: '236 128' }).to(cabeza, { rotation: 0, duration: 0.6, ease: 'elastic.out(1,.4)', svgOrigin: '236 128' });
  };

  const guau = () => {
    if (intro || RM) return;
    gsap.timeline()
      .fromTo(globo, { autoAlpha: 0, scale: 0.3, rotation: -14 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.4, ease: M.pop, transformOrigin: '20% 90%' })
      .to(globo, { autoAlpha: 0, scale: 0.8, duration: 0.3, delay: 0.9 });
    apachurrar(perro, 0.5);
    latido(); menear(6);
  };
  const guauS = () => {
    if (intro || RM) return;
    gsap.timeline()
      .fromTo(globoS, { autoAlpha: 0, scale: 0.3, rotation: 14 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.4, ease: M.pop, transformOrigin: '84% 90%' })
      .to(globoS, { autoAlpha: 0, scale: 0.8, duration: 0.3, delay: 0.9 });
    apachurrar(sentadoDib, 0.4);
    latido(); menearS(7); ladear();
  };

  /* ---------- Vida después de la entrada ---------- */
  const vida = () => {
    if (RM) return;
    gsap.ticker.add(mirar);
    let vuelta = 0;
    const ciclo = () => { if (!intro && portadaVisible && !d.hidden) { latido(); gsap.delayedCall(0.4, () => menearS(4)); if (vuelta++ % 2) gsap.delayedCall(1.2, ladear); } gsap.delayedCall(4.4, ciclo); };
    gsap.delayedCall(4.6, ciclo);
    const parpadea = () => { if (!intro && portadaVisible) { parpadeo(ojosS, '130 92'); if (Math.random() > 0.4) gsap.delayedCall(0.25, () => parpadeo(ojosGata, '60 38')); } gsap.delayedCall(gsap.utils.random(2.6, 4.8), parpadea); };
    // El sentado nunca se queda quieto: respira, jadea con la lengüita y la cola se mece
    gsap.fromTo(respira, { scaleY: 1, scaleX: 1 }, { scaleY: 1.022, scaleX: 1.01, duration: 0.95, ease: M.io, yoyo: true, repeat: -1, svgOrigin: '130 300' });
    gsap.fromTo(lengua, { scaleY: 1 }, { scaleY: 1.16, duration: 0.24, ease: M.io, yoyo: true, repeat: -1, svgOrigin: '130 127' });
    gsap.fromTo(colaSLenta, { rotation: -5 }, { rotation: 9, duration: 0.55, ease: M.io, yoyo: true, repeat: -1, svgOrigin: '182 296' });
    sentado.addEventListener('click', guauS);
    gsap.delayedCall(3.4, parpadea);
    gsap.fromTo(colaGata, { rotation: -7 }, { rotation: 9, duration: 1.6, ease: M.io, yoyo: true, repeat: -1, svgOrigin: '32 138' });
    $$('[data-decor] > *').forEach((el, i) => gsap.to(el, { y: i % 2 ? -10 : 10, duration: 3.6 + (i % 3) * 0.7, ease: M.io, yoyo: true, repeat: -1, delay: 3.2 + i * 0.2 }));
    perro.addEventListener('click', guau);
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { portadaVisible = e.isIntersecting; }).observe(portada);

    // El trazo tiembla como un dibujo animado (unas 7 veces por segundo)
    const hervores = $$('[data-hervor]'); let semilla = 0;
    setInterval(() => { if (d.hidden) return; semilla = (semilla + 1) % 3; hervores.forEach((h, i) => h.setAttribute('seed', 3 + semilla * 7 + i)); }, 140);
  };

  // Saltar la entrada con un toque
  portada.addEventListener('pointerdown', () => { if (intro && firma) firma.progress(1); });

  safe(() => {
    if (RM) return;
    Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))]).then(() => {
      safe(() => { construirFirma(); vida(); });
    });
  });

  if (!RM) {
    // Scroll suave
    safe(() => {
      if (!window.Lenis) return;
      lenis = new Lenis({ lerp: M.lerp, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    });

    // Trazos que se dibujan: subrayado, raya y garabatos de la foto
    safe(() => {
      const dibujar = (paths, trigger, extra = {}) => {
        $$(paths).forEach((p) => { if (!p.getAttribute('stroke-dasharray')) gsap.set(p, { strokeDasharray: 1, strokeDashoffset: 1 }); else gsap.set(p, { opacity: 0 }); });
        ScrollTrigger.create({ trigger, start: 'top 82%', once: true, onEnter: () => {
          $$(paths).forEach((p, i) => {
            if (p.getAttribute('stroke-dasharray')) gsap.to(p, { opacity: 1, duration: 0.6, delay: i * 0.12 });
            else gsap.to(p, { strokeDashoffset: 0, duration: 0.7, delay: 0.2 + i * 0.14, ease: 'power2.inOut', ...extra });
          });
        } });
      };
      dibujar('[data-subrayado] path', '[data-subrayado]');
      dibujar('[data-raya] path', '[data-raya]');
      dibujar('[data-pegatina] [data-dibuja]', '[data-pegatina]');
      dibujar('.estetica__burbujas [data-dibuja]', '.estetica__foto');
    });
  }

  /* ---------- Muestra: la pelota que late deja dibujada la línea del monitor ---------- */
  safe(() => {
    const lienzo = $('[data-lienzo]'), b = $('[data-lienzo-bola]'), e = $('[data-lienzo-estela]'), gb = $('[data-lienzo-giro]');
    const PISO = 156;
    // Rueda, rebote grande, rebote chico… como un latido
    const seg = [];
    let x = 40;
    for (let n = 0; n < 3; n++) {
      seg.push({ x0: x, x1: x + 70, h: 0, dur: 0.32 }); x += 70;
      seg.push({ x0: x, x1: x + 62, h: 104, dur: 0.36 }); x += 62;
      seg.push({ x0: x, x1: x + 38, h: 42, dur: 0.22 }); x += 38;
    }
    seg.push({ x0: x, x1: 560, h: 0, dur: 0.3 });
    const forma = (s, k) => {
      if (!s.h) return { d: `M${f1(s.x0)} ${PISO}L${f1(s.x0 + (s.x1 - s.x0) * k)} ${PISO}`, x: s.x0 + (s.x1 - s.x0) * k, y: PISO };
      const a = { x: s.x0, y: PISO }, z = { x: s.x1, y: PISO }, c = control(a, z, s.h), p = curva(a, c, z, k);
      return { d: tramo(a, c, z, k), x: p.x, y: p.y };
    };
    const final = seg.map((s) => forma(s, 1).d).join('');
    const pintarFinal = () => { e.setAttribute('d', final); b.setAttribute('transform', `translate(560 ${PISO})`); };
    if (RM) { pintarFinal(); return; }
    let tl = null;
    const correr = () => {
      if (tl) tl.kill();
      tl = gsap.timeline({ repeat: -1, repeatDelay: 0.9, onRepeat: () => gsap.set(e, { opacity: 1 }) });
      tl.set(e, { opacity: 1, attr: { d: '' } });
      seg.forEach((s, i) => {
        const o = { k: 0 }, antes = seg.slice(0, i).map((q) => forma(q, 1).d).join('');
        tl.to(o, { k: 1, duration: s.dur, ease: 'none', onUpdate: () => { const f = forma(s, o.k); e.setAttribute('d', antes + f.d); b.setAttribute('transform', `translate(${f1(f.x)} ${f1(f.y)})`); gb.setAttribute('transform', `rotate(${f1((f.x - 40) * 1.6)} 50 50)`); } });
      });
      tl.to({}, { duration: 1.4 });
    };
    pintarFinal();
    ScrollTrigger.create({ trigger: lienzo, start: 'top 85%', once: true, onEnter: correr });
  });

  // Títulos: las palabras saltan a su lugar
  const titulos = () => safe(() => {
    if (!window.SplitText || RM) return;
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, { type: 'words', wordsClass: 'palabra', autoSplit: true,
        onSplit: (self) => gsap.from(self.words, { yPercent: 70, autoAlpha: 0, rotation: () => gsap.utils.random(-9, 9), duration: M.dur, stagger: M.stagger, ease: 'back.out(1.9)', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) });
    });
  });
  // Revelados: se pegan como stickers
  safe(() => {
    if (RM) return;
    gsap.set('[data-reveal]', { autoAlpha: 0, y: M.dist, rotation: () => gsap.utils.random(-2.5, 2.5) });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, rotation: 0, duration: M.dur, stagger: M.stagger, ease: 'back.out(1.5)' }) });
  });
  (d.fonts ? d.fonts.ready : Promise.resolve()).then(() => { titulos(); ScrollTrigger.refresh(); });
})();
