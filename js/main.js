/* Gloz Vet (demostración) · Landing
   Movimiento de la dirección 3 «Marea que late». La portada es la misma de la hoja aprobada.
   Todo el contenido se ve sin JavaScript y con «Reducir movimiento». */
(() => {
  'use strict';
  const d = document, html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ESCRITORIO = matchMedia('(min-width: 900px)');
  const MOUSE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const safe = (fn) => { try { fn(); } catch (e) { console.warn('[gloz-vet]', e); } };

  /* ---------- WhatsApp: cada botón arma su enlace con su propio mensaje ----------
     El texto se edita en el atributo data-wa del HTML. */
  const WA = '50662652841';
  safe(() => {
    $$('[data-wa]').forEach((a) => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`; });
  });

  /* ---------- Barra fija del celular: después de la portada, nunca sobre el contacto ---------- */
  safe(() => {
    const barra = $('[data-barra]'), inicio = $('[data-cta-inicio]'), fin = $('#contacto');
    if (!barra || !inicio || !('IntersectionObserver' in window)) return;
    let paso = false, alFinal = false;
    const pintar = () => {
      const on = paso && !alFinal;
      barra.classList.toggle('visible', on);
      barra.setAttribute('aria-hidden', String(!on));
      $$('a', barra).forEach((el) => { el.tabIndex = on ? 0 : -1; });
    };
    new IntersectionObserver(([e]) => { paso = !e.isIntersecting && e.boundingClientRect.top < 0; pintar(); }).observe(inicio);
    if (fin) new IntersectionObserver(([e]) => { alFinal = e.isIntersecting; pintar(); }, { threshold: 0.12 }).observe(fin);
    pintar();
  });

  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (!hasGSAP) { html.classList.remove('js'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Movimiento de la marca: vivo, sereno y preciso
  const M = { ease: 'power3.out', io: 'sine.inOut', pop: 'back.out(1.4)', dur: 1.15, stagger: 0.06, dist: 40, lerp: 0.08 };

  /* ---------- La marea que late ----------
     Tres capas de agua que respiran. El filo de la capa del frente es un electrocardiograma:
     un complejo P-QRS-T recorre el filo y, al pasar, dispara el eco y el latido del botón. */
  const ECG = [[-66,0],[-58,-5],[-50,-7],[-42,-5],[-34,0],[-14,0],[-9,7],[0,-46],[8,15],[14,0],[26,0],[34,-8],[42,-11],[50,-8],[58,0]];
  const ecgY = (dx, s) => {
    const x = dx / s;
    if (x <= ECG[0][0] || x >= ECG[ECG.length - 1][0]) return 0;
    for (let i = 1; i < ECG.length; i++) {
      if (x <= ECG[i][0]) { const [x0, y0] = ECG[i - 1], [x1, y1] = ECG[i]; return (y0 + (y1 - y0) * (x - x0) / (x1 - x0)) * s; }
    }
    return 0;
  };

  const crearMarea = (o) => {
    const atras = $('[data-marea-atras]', o.host), frente = $('[data-marea-frente]', o.host);
    const capas = [$('[data-capa="1"]', atras), $('[data-capa="2"]', atras), $('[data-capa="3"]', frente)];
    const gloss = $('[data-gloss]', atras), filo = $('[data-filo]', frente), brillo = $('[data-brillo]', frente);
    const st = { draw: 1, r1: 1, r2: 1, r3: 1, p: o.pInicial ?? 0.6, surge: 0, t: 0, trazando: false };
    let W = 0, H = 0, N = null, pxAntes = null;
    const medir = () => {
      const r = o.host.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      [atras, frente].forEach((s) => { s.setAttribute('viewBox', `0 0 ${W} ${H}`); s.setAttribute('preserveAspectRatio', 'none'); });
      N = o.niveles(W, H);
    };
    const suave = (u) => { const [a, b] = N.curva; const k = Math.min(1, Math.max(0, (u - a) / (b - a))); return k * k * (3 - 2 * k); };
    const cresta = (lv, x, i) => {
      const base = lv[0] + (lv[1] - lv[0]) * suave(x / W);
      const A = N.amp * (1 + st.surge * 0.9), L = N.largo;
      return base + A * Math.sin((x / L) * 6.283 + st.t * (0.8 + i * 0.22) + i * 1.7)
                  + A * 0.5 * Math.sin((x / (L * 0.47)) * 6.283 - st.t * (1.1 + i * 0.18) + i);
    };
    const linea = (lv, i, r, prefijo) => {
      const paso = Math.max(6, W / 110); let dd = prefijo;
      for (let x = 0; x <= W + paso; x += paso) { const xx = Math.min(x, W); dd += `L${xx.toFixed(1)} ${(H - (H - cresta(lv, xx, i)) * r).toFixed(1)}`; }
      return dd;
    };
    const pulsoX = () => (st.trazando ? st.draw * W - 10 * N.s : st.p * (W + 260 * N.s) - 130 * N.s);
    const pintar = () => {
      if (!N) return;
      capas[0].setAttribute('d', linea(N.l1, 0, st.r1, `M0 ${H}`) + `L${W} ${H}Z`);
      capas[1].setAttribute('d', linea(N.l2, 1, st.r2, `M0 ${H}`) + `L${W} ${H}Z`);
      capas[2].setAttribute('d', linea(N.l3, 2, st.r3, `M0 ${H}`) + `L${W} ${H}Z`);
      gloss.setAttribute('d', linea(N.l2, 1, st.r2, '').replace(/^L/, 'M'));
      const lim = st.draw * W, px = pulsoX(), paso = Math.max(5, W / 150), xs = [];
      for (let x = 0; x < lim; x += paso) xs.push(x);
      ECG.forEach(([k]) => { const x = px + k * N.s; if (x > 0 && x < lim) xs.push(x); });
      xs.push(lim); xs.sort((a, b) => a - b);
      let dd = '';
      xs.forEach((x, j) => { dd += `${j ? 'L' : 'M'}${x.toFixed(1)} ${(cresta(N.l3, x, 2) + ecgY(x - px, N.s)).toFixed(1)}`; });
      filo.setAttribute('d', lim > 0 ? dd : 'M0 0');
      const bx = st.trazando ? lim : px;
      const by = cresta(N.l3, bx, 2) + (st.trazando ? ecgY(lim - px, N.s) : -46 * N.s);
      const visible = st.draw > 0 && bx > -20 && bx < W + 20 && (st.trazando || st.draw >= 1);
      brillo.setAttribute('transform', `translate(${bx.toFixed(1)} ${by.toFixed(1)})`);
      brillo.setAttribute('opacity', visible ? 1 : 0);
      if (o.alCruzar && !st.trazando && pxAntes !== null) o.alCruzar.forEach((c) => { const cx = c.x(); if (pxAntes < cx && px >= cx) c.fn(); });
      pxAntes = px;
    };
    let activo = false;
    const tick = (time, dms) => { if (!activo) return; st.t += Math.min(dms, 60) / 1000; pintar(); };
    const api = { st, medir, pintar,
      encender() { if (RM || activo) return; activo = true; gsap.ticker.add(tick); },
      apagar() { activo = false; gsap.ticker.remove(tick); },
      latir() { gsap.fromTo(st, { surge: 1 }, { surge: 0, duration: 1.8, ease: 'power2.out', overwrite: 'auto' }); } };
    medir(); pintar();
    if ('ResizeObserver' in window) new ResizeObserver(() => { medir(); pintar(); }).observe(o.host);
    if (!RM && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { if (e.isIntersecting && !d.hidden) api.encender(); else api.apagar(); }).observe(o.host);
    } else if (!RM) api.encender();
    return api;
  };

  // El eco: aros de azul clínico que se abren como un ultrasonido
  const eco = (el) => {
    if (!el || RM) return;
    $$('span', el).forEach((s, i) => {
      gsap.fromTo(s, { scale: 0.35, opacity: 0.7 - i * 0.15 }, { scale: 1.25 + i * 0.12, opacity: 0, duration: 2.2, delay: i * 0.22, ease: 'power2.out', overwrite: true });
    });
  };
  // El botón late cuando el pulso pasa encima
  const latidoBoton = (b) => {
    if (!b || RM) return;
    const ic = $('.boton__icono', b), p = $('path', b);
    gsap.timeline()
      .fromTo(ic, { scale: 1 }, { scale: 1.16, duration: 0.14, ease: 'power2.out' })
      .to(ic, { scale: 1, duration: 0.5, ease: 'elastic.out(1,.45)' })
      .fromTo(p, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 0)
      .fromTo(b, { boxShadow: '0 0 0 0 rgba(62,210,188,.55), 0 14px 28px -14px rgba(1,12,38,.85)' }, { boxShadow: '0 0 0 16px rgba(62,210,188,0), 0 14px 28px -14px rgba(1,12,38,.85)', duration: 0.9, ease: 'power2.out', clearProps: 'boxShadow' }, 0);
  };

  /* ---------- Portada ---------- */
  const portada = $('[data-portada]'), pie = $('[data-pie]'), perro = $('[data-perro]'), cta = $('[data-cta]');
  const relY = (el, host = portada) => { const a = el.getBoundingClientRect(), b = host.getBoundingClientRect(); return { top: a.top - b.top, bottom: a.bottom - b.top, left: a.left - b.left, right: a.right - b.left }; };

  let marea = null;
  safe(() => {
    marea = crearMarea({
      host: portada,
      pInicial: 0.62,
      niveles: (W, H) => {
        const pTop = relY(pie).top, pBot = relY(pie).bottom;
        let N;
        if (ESCRITORIO.matches) {
          const izq = Math.min(H - 30, pBot + 90);
          const der = H * 0.88;
          N = { l1: [izq - 66, der - 310], l2: [izq - 36, der - 200], l3: [izq, der], curva: [0.34, 0.96], amp: 9, largo: W * 0.55, s: 1, fundido: 64 };
        } else {
          const f = pTop - 58;
          N = { l1: [f - 60, f - 150], l2: [f - 32, f - 96], l3: [f, f - 14], curva: [0.25, 1], amp: 6, largo: W * 0.9, s: 0.78, fundido: 44 };
        }
        // El perro queda sólido hasta un poco debajo del filo y ahí se desvanece en el agua honda
        const cx = perro.offsetLeft + perro.offsetWidth / 2, u = cx / W;
        const k = Math.min(1, Math.max(0, (u - N.curva[0]) / (N.curva[1] - N.curva[0])));
        const filoY = N.l3[0] + (N.l3[1] - N.l3[0]) * k * k * (3 - 2 * k);
        perro.style.setProperty('--corte', `${Math.round(filoY - perro.offsetTop + 2 * N.amp + 8)}px`);
        perro.style.setProperty('--fundido', `${N.fundido}px`);
        return N;
      },
      alCruzar: [
        { x: () => { const r = relY(perro); return (r.left + r.right) / 2; }, fn: () => { eco($('[data-eco]')); marea.latir(); } },
        { x: () => { const r = relY(cta); return r.left + 28; }, fn: () => latidoBoton(cta) }
      ]
    });
    // El eco se centra en la cabeza del perro
    const centrarEco = () => {
      const r = relY(perro), e = $('[data-eco]');
      e.style.setProperty('--eco-x', `${(r.left + r.right) / 2}px`);
      e.style.setProperty('--eco-y', `${r.top + (r.bottom - r.top) * 0.36}px`);
    };
    centrarEco();
    addEventListener('resize', centrarEco);
    ESCRITORIO.addEventListener('change', () => { marea.medir(); marea.pintar(); centrarEco(); });
  });

  /* ---------- Firma: el monitor traza el filo, la marea sube al ritmo y el peludito emerge ---------- */
  let bucle = null, splits = [];
  const empezarBucle = () => {
    if (bucle) bucle.kill();
    marea.st.p = 0;
    bucle = gsap.to(marea.st, { p: 1, duration: 3, ease: 'none', repeat: -1, repeatDelay: 1.4 });
  };
  const firmaPortada = () => {
    if (window.SplitText && !splits.length) {
      splits = [SplitText.create('[data-linea]', { type: 'words', mask: 'words', wordsClass: 'palabra' })];
      $$('[data-gigante]').forEach((g) => splits.push(SplitText.create(g, { type: 'chars', mask: 'chars', charsClass: 'gl' })));
    }
    const palabras = splits[0] ? splits[0].words : [$('[data-linea]')];
    const letrasA = splits[1] ? splits[1].chars : [$('[data-gigante]')];
    const letrasB = splits[2] ? splits[2].chars : [];
    const st = marea.st;
    gsap.set('[data-portada] [data-pieza]', { autoAlpha: 1 });
    return gsap.timeline({ defaults: { ease: M.ease },
        onStart: () => { if (bucle) bucle.kill(); },
        onComplete: () => { st.trazando = false; empezarBucle(); } })
      .add(() => { st.trazando = true; }, 0)
      .fromTo(st, { draw: 0, r1: 0, r2: 0, r3: 0 }, { draw: 1, duration: 2, ease: 'sine.inOut' }, 0)
      .fromTo(palabras, { yPercent: 115 }, { yPercent: 0, duration: M.dur, stagger: M.stagger }, 0.25)
      .fromTo(letrasA, { yPercent: 105 }, { yPercent: 0, duration: 1.2, stagger: 0.045, ease: 'expo.out' }, 0.45)
      .fromTo(letrasB, { yPercent: 105 }, { yPercent: 0, duration: 1.2, stagger: 0.045, ease: 'expo.out' }, 0.45)
      .to(st, { r1: 1, duration: 1.5, ease: 'expo.out' }, 0.75)
      .to(st, { r2: 1, duration: 1.5, ease: 'expo.out' }, 0.88)
      .to(st, { r3: 1, duration: 1.5, ease: 'expo.out' }, 1.0)
      .add(() => marea.latir(), 0.75)
      .fromTo('[data-perro]', { yPercent: 30 }, { yPercent: 0, duration: 1.6, ease: 'expo.out' }, 0.9)
      .fromTo('[data-perro]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'none' }, 0.9)
      .add(() => eco($('[data-eco]')), 1.3)
      .fromTo('.portada__sub', { autoAlpha: 0, y: M.dist }, { autoAlpha: 1, y: 0, duration: M.dur }, 1.35)
      .fromTo('.portada__acciones', { autoAlpha: 0, y: M.dist }, { autoAlpha: 1, y: 0, duration: M.dur }, 1.5)
      .add(() => latidoBoton(cta), 2.05)
      .fromTo('[data-decor] > *', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, stagger: 0.05, ease: M.pop }, 1.6);
  };

  safe(() => {
    if (RM || !marea) return;
    Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
      .then(() => safe(() => { marea.medir(); firmaPortada(); }));
  });

  /* ---------- Cierre: la marea vuelve en el contacto y su latido pasa por el botón ---------- */
  safe(() => {
    const host = $('[data-contacto]'), boton = $('[data-cta-cierre]');
    if (!host) return;
    const cierre = crearMarea({
      host,
      pInicial: 0.3,
      niveles: (W, H) => {
        // La cresta más alta queda justo debajo del contenido: el agua nunca tapa los datos
        const pb = parseFloat(getComputedStyle(host).paddingBottom) || 220;
        const techo = H - pb + 24;
        return { l1: [techo + 44, techo], l2: [techo + 74, techo + 32], l3: [techo + 104, techo + 62], curva: [0.05, 1],
          amp: ESCRITORIO.matches ? 8 : 6, largo: W * (ESCRITORIO.matches ? 0.6 : 0.9), s: ESCRITORIO.matches ? 1 : 0.78 };
      },
      alCruzar: [{ x: () => { const r = relY(boton, host); return r.left + 28; }, fn: () => latidoBoton(boton) }]
    });
    if (RM) return;
    gsap.set(cierre.st, { draw: 0, r1: 0, r2: 0, r3: 0 });
    cierre.pintar();
    ScrollTrigger.create({ trigger: host, start: 'top 70%', once: true, onEnter: () => {
      gsap.timeline({ onComplete: () => { cierre.st.trazando = false; cierre.st.p = 0;
          gsap.to(cierre.st, { p: 1, duration: 3.2, ease: 'none', repeat: -1, repeatDelay: 1.6, onRepeat: () => cierre.latir() }); } })
        .add(() => { cierre.st.trazando = true; })
        .to(cierre.st, { draw: 1, duration: 1.8, ease: 'sine.inOut' }, 0)
        .to(cierre.st, { r1: 1, duration: 1.4, ease: 'expo.out' }, 0.3)
        .to(cierre.st, { r2: 1, duration: 1.4, ease: 'expo.out' }, 0.42)
        .to(cierre.st, { r3: 1, duration: 1.4, ease: 'expo.out' }, 0.54)
        .add(() => cierre.latir(), 0.4);
    } });
  });

  if (RM) return; // Con «Reducir movimiento» todo queda visible y quieto

  /* ---------- Scroll suave ---------- */
  let lenis = null;
  safe(() => {
    if (!window.Lenis) return;
    lenis = new Lenis({ lerp: M.lerp, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const meta = id.length > 1 ? $(id) : null;
      if (!meta) return;
      e.preventDefault();
      lenis.scrollTo(meta, { duration: 1.4 });
      history.replaceState(null, '', id);
    }));
  });

  /* ---------- Decoración que flota y portada con scroll ---------- */
  safe(() => {
    $$('[data-decor] > *, [data-flota] > *').forEach((el, i) => {
      gsap.to(el, { y: i % 2 ? -12 : 12, x: i % 3 ? 5 : -5, duration: 7 + (i % 4), ease: M.io, yoyo: true, repeat: -1, delay: i * 0.3 });
    });
    gsap.to('[data-gigante]', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: portada, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.escena', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: portada, start: 'top top', end: 'bottom top', scrub: true } });
  });

  /* ---------- Salud: cada renglón de la carta late al aparecer ---------- */
  safe(() => {
    gsap.fromTo('.carta__pulso', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, stagger: 0.14, ease: 'power2.inOut',
      scrollTrigger: { trigger: '[data-carta]', start: 'top 80%', once: true } });
  });

  /* ---------- Emergencias: «24/7» sube letra por letra ---------- */
  safe(() => {
    if (!window.SplitText) return;
    const lineas = $$('[data-letras]');
    const letras = lineas.flatMap((l) => SplitText.create(l, { type: 'chars', mask: 'chars', charsClass: 'gl' }).chars);
    gsap.fromTo(letras, { yPercent: 105 }, { yPercent: 0, duration: 1.1, stagger: 0.035, ease: 'expo.out',
      scrollTrigger: { trigger: '#t-urgencias', start: 'top 82%', once: true } });
  });

  /* ---------- La marea sube con el scroll hacia la sección azul rey ---------- */
  safe(() => {
    gsap.fromTo('[data-subida-ola]', { yPercent: 38 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '[data-subida]', start: 'top bottom', end: 'bottom 55%', scrub: true } });
  });

  /* ---------- Fotos de hotel, estética y gatos: se acercan despacio al entrar ---------- */
  safe(() => {
    $$('[data-emerge]').forEach((img) => {
      gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'center 55%', scrub: true } });
    });
  });

  /* ---------- Gatos: el eco de ultrasonido late sobre el michi mientras está en pantalla ---------- */
  safe(() => {
    const el = $('[data-eco-michi]');
    if (!el) return;
    let rep = null;
    const latir = () => { eco(el); rep = gsap.delayedCall(3.2, latir); };
    const parar = () => { if (rep) rep.kill(); rep = null; };
    ScrollTrigger.create({ trigger: el.parentElement, start: 'top 75%', end: 'bottom 20%',
      onEnter: latir, onEnterBack: latir, onLeave: parar, onLeaveBack: parar });
  });

  /* ---------- Pets Card: flota y se inclina con el mouse ---------- */
  safe(() => {
    const card = $('[data-pets-card]');
    if (!card) return;
    gsap.set(card, { rotation: -4, transformPerspective: 900 });
    gsap.to(card, { y: -10, duration: 3.6, ease: M.io, yoyo: true, repeat: -1 });
    if (!MOUSE) return;
    const zona = card.parentElement;
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    zona.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 14);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
    });
    zona.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });

  /* ---------- Confianza: los nombres se destapan como una cortina de agua ---------- */
  safe(() => {
    gsap.fromTo('[data-nombres] > span', { clipPath: 'inset(0 0 100% 0)', yPercent: 30 }, { clipPath: 'inset(0 0 -12% 0)', yPercent: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out',
      scrollTrigger: { trigger: '[data-nombres]', start: 'top 85%', once: true } });
  });

  /* ---------- Cómo agendar: tres latidos que se dibujan en orden ---------- */
  safe(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-pasos]', start: 'top 80%', once: true } });
    $$('.paso').forEach((p, i) => {
      tl.fromTo($('path', p), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, i * 0.45)
        .fromTo($('.paso__latido span', p), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, i * 0.45 + 0.45)
        .fromTo([$('h3', p), $('p', p)], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: M.ease }, i * 0.45 + 0.2);
    });
  });

  /* ---------- El filo del pie se dibuja al llegar ---------- */
  safe(() => {
    const t = $('[data-pie-filo] .trazo'); const L = t.getTotalLength();
    gsap.fromTo(t, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: '[data-pie-filo]', start: 'top 95%', once: true } });
  });

  /* ---------- Títulos por líneas y revelados ---------- */
  const titulos = () => safe(() => {
    if (!window.SplitText) return;
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'renglon', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: M.dur, stagger: M.stagger, ease: M.ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) });
    });
  });
  safe(() => {
    gsap.set('[data-reveal]', { autoAlpha: 0, y: M.dist });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: M.dur, stagger: M.stagger, ease: M.ease }) });
  });
  (d.fonts ? d.fonts.ready : Promise.resolve()).then(() => { titulos(); ScrollTrigger.refresh(); });
})();
