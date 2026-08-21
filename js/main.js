(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  const intro = document.getElementById("intro");
  const gate = document.getElementById("gate");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const progressBar = document.getElementById("progressBar");

  let lenis = null;

  document.body.classList.add("is-locked");

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const splitChars = (el) => {
    const word = el.dataset.word;
    el.textContent = "";
    [...word].forEach((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      el.appendChild(span);
    });
    return el.querySelectorAll(".char");
  };

  const langToggle = document.getElementById("langToggle");

  const I18N_PAIRS = [
    [".nav__logo span", "\u00A0·\u00A0ODISSEIA", "\u00A0·\u00A0ODYSSEY"],
    ["#navLinks a[href='#origem']", "I · A Origem", "I · The Origin"],
    ["#navLinks a[href='#arsenal']", "II · O Arsenal", "II · The Arsenal"],
    ["#navLinks a[href='#batalhas']", "III · As Batalhas", "III · The Battles"],
    ["#navLinks a[href='#chamado']", "IV · O Chamado", "IV · The Call"],
    ["#gate .gate__kicker", "PORTFÓLIO DE MARCELO EXPEDITO", "MARCELO EXPEDITO'S PORTFOLIO"],
    ["#gate .gate__title", "ODISSEIA", "ODYSSEY"],
    ["#gate .gate__cta", "— CLIQUE PARA INICIAR A JORNADA —", "— CLICK TO START THE JOURNEY —"],
    [".intro-eyebrow", "Prepare-se para a batalha", "Prepare for battle"],
    [".intro-sub", "PORTFÓLIO — MMXXVI", "PORTFOLIO — MMXXVI"],
    [".hero-kicker", "SÃO PAULO · BRASIL — FORJADO COM DISCIPLINA ESPARTANA", "SÃO PAULO · BRAZIL — FORGED WITH SPARTAN DISCIPLINE"],
    [".hero-tagline", "Transformando Ideias em <em>arquiteturas digitais</em>.", "Turning Ideas into <em>digital architectures</em>.", true],
    [".hero-cta a[href='#batalhas']", "Ver as Batalhas", "See the Battles"],
    [".hero-cta a[href='#chamado']", "O Chamado", "The Call"],
    [".scroll-cue span", "Iniciar a jornada", "Begin the journey"],
    ["#origem .chapter-head__num", "CAPÍTULO I", "CHAPTER I"],
    ["#origem .chapter-head__title", "A Origem", "The Origin"],
    ["#origem .lead",
      "Todo herói tem uma origem. A minha começa em São Paulo, entre linhas de código, telas acesas de madrugada e a vontade de construir coisas que funcionam — e que impressionam.",
      "Every hero has an origin. Mine begins in São Paulo, among lines of code, screens glowing through the night and the will to build things that work — and impress."],
    ["#origem .origem__text p:not(.lead)",
      "Sou estudante de Desenvolvimento de Sistemas — faço o curso na Etec Horácio Augusto da Silveira e também na EE Afrânio Peixoto, trilhando o caminho para me tornar desenvolvedor Full Stack. Cada projeto é uma batalha, cada bug é um minotauro esperando ser enfrentado.",
      "I am a Systems Development student — taking the course at both Etec Horácio Augusto da Silveira and EE Afrânio Peixoto, walking the path to become a Full Stack developer. Every project is a battle, every bug is a minotaur waiting to be faced."],
    ["#origem .quote",
      "“Transformando Ideias em arquiteturas digitais.”<cite>— Marcelo Expedito</cite>",
      "“Turning Ideas into digital architectures.”<cite>— Marcelo Expedito</cite>", true],
    ["#origem .stele h3", "ESTELA DO HERÓI", "HERO'S STELE"],
    ["#origem .stele li:nth-child(1) span", "Nome", "Name"],
    ["#origem .stele li:nth-child(2) span", "Território", "Territory"],
    ["#origem .stele li:nth-child(2) strong", "São Paulo — Brasil", "São Paulo — Brazil"],
    ["#origem .stele li:nth-child(3) span", "Curso", "Course"],
    ["#origem .stele li:nth-child(3) strong", "Desenvolvimento de Sistemas", "Systems Development"],
    ["#origem .stele li:nth-child(4) span", "Escolas", "Schools"],
    ["#origem .stele li:nth-child(5) span", "Destino", "Destiny"],
    ["#origem .stele li:nth-child(5) strong", "Desenvolvedor Full Stack", "Full Stack Developer"],
    ["#arsenal .chapter-head__num", "CAPÍTULO II", "CHAPTER II"],
    ["#arsenal .chapter-head__title", "O Arsenal", "The Arsenal"],
    ["#arsenal .chapter-head__desc",
      "Armas forjadas em horas de estudo, batalhas e refatorações.<span class=\"greek\">ΜΟΛΩΝ ΛΑΒΕ</span>",
      "Weapons forged in hours of study, battles and refactors.<span class=\"greek\">ΜΟΛΩΝ ΛΑΒΕ</span>", true],
    ["#arsenal .arsenal-card:nth-of-type(1) h3", "<span class=\"arsenal-card__icon\">⚔</span> Frontend", "<span class=\"arsenal-card__icon\">⚔</span> Frontend", true],
    ["#arsenal .arsenal-card:nth-of-type(2) h3", "<span class=\"arsenal-card__icon\">🛡</span> Backend &amp; Dados", "<span class=\"arsenal-card__icon\">🛡</span> Backend &amp; Data", true],
    ["#arsenal .arsenal-card:nth-of-type(3) h3", "<span class=\"arsenal-card__icon\">⚒</span> Ferramentas &amp; Treinamento", "<span class=\"arsenal-card__icon\">⚒</span> Tools &amp; Training", true],
    ["#arsenal .tags:not(.tags--training) li:nth-child(2)", "Lógica de Programação", "Programming Logic"],
    ["#arsenal .tags:not(.tags--training) li:nth-child(3)", "Análise de Sistemas", "Systems Analysis"],
    ["#arsenal .training-label", "EM TREINAMENTO PARA AS PRÓXIMAS BATALHAS", "IN TRAINING FOR THE NEXT BATTLES"],
    ["#arsenal .tags--training li:nth-child(1)", "C# Avançado", "Advanced C#"],
    ["#arsenal .tags--training li:nth-child(5)", "Arquitetura de Software", "Software Architecture"],
    ["#batalhas .chapter-head__num", "CAPÍTULO III", "CHAPTER III"],
    ["#batalhas .chapter-head__title", "As Batalhas", "The Battles"],
    ["#batalhas .chapter-head__desc", "Campos onde o código foi posto à prova.", "Fields where the code was put to the test."],
    ["#batalhas .battle-card--main .battle-card__num", "BATALHA I", "BATTLE I"],
    ["#batalhas .battle-card--main p:not(.battle-card__soon)",
      "Sistema web para conferência de compras em mercados de autoatendimento: cruza produtos do banco de dados com itens apontados pelo fiscal da porta, gera relatórios completos e exportação em PDF.",
      "Web system for checkout auditing in self-checkout markets: cross-references database products against items flagged by the door inspector, generates full reports and PDF exports."],
    ["#batalhas .battle-card__stack li:nth-child(3)", "Relatórios PDF", "PDF Reports"],
    ["#batalhas .battle-card--main .btn", "Ver campo de batalha ↗", "View battlefield ↗"],
    ["#batalhas .battle-card--fog .battle-card__num", "BATALHA II", "BATTLE II"],
    ["#batalhas .battle-card--fog h3", "Próximas Conquistas", "Next Conquests"],
    ["#batalhas .battle-card--fog > p",
      "Novas campanhas estão sendo forjadas no calor da forja. Sempre aprendendo, sempre marchando.",
      "New campaigns are being forged in the heat of the fire. Always learning, always marching."],
    ["#batalhas .battle-card__soon", "— EM BREVE —", "— COMING SOON —"],
    ["#chamado .chapter-head__num", "CAPÍTULO IV", "CHAPTER IV"],
    ["#chamado .chapter-head__title", "O Chamado", "The Call"],
    ["#chamado .chapter-head__desc",
      "Os oráculos dizem que grandes projetos precisam de grandes aliados. Vamos construir juntos?",
      "The oracles say great projects need great allies. Shall we build together?"],
    ["#chamado .cv-cta .btn", "Recrutar este guerreiro — CV em PDF", "Recruit this warrior — Résumé PDF"],
    [".footer__motto",
      "“Com o escudo… ou sobre ele.”<cite>— despedida espartana</cite>",
      "“With your shield… or upon it.”<cite>— Spartan farewell</cite>", true]
  ];

  let currentLang = "pt";
  try { currentLang = localStorage.getItem("odisseia-lang") || "pt"; } catch (e) {}

  const applyLang = (lang) => {
    currentLang = lang;
    try { localStorage.setItem("odisseia-lang", lang); } catch (e) {}
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.title = lang === "en" ? "Marcelo Expedito — Odyssey" : "Marcelo Expedito — Odisseia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", lang === "en"
        ? "Marcelo Expedito's portfolio — Systems Development student and future Full Stack developer."
        : "Portfólio de Marcelo Expedito — desenvolvedor em formação. Uma jornada épica pelo código.");
    }
    I18N_PAIRS.forEach(([sel, pt, en, isHtml]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (isHtml) el.innerHTML = lang === "en" ? en : pt;
        else el.textContent = lang === "en" ? en : pt;
      });
    });
    langToggle.textContent = lang === "en" ? "PT" : "EN";
  };

  langToggle.addEventListener("click", () => {
    applyLang(currentLang === "en" ? "pt" : "en");
  });

  if (currentLang === "en") applyLang("en");

  const Sound = (() => {
    let actx = null;
    let master = null;
    let ambientOn = false;
    let enabled = true;
    try { enabled = localStorage.getItem("odisseia-som") !== "0"; } catch (e) {}

    const ensureCtx = () => {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!actx) {
        actx = new AC();
        master = actx.createGain();
        master.gain.value = enabled ? 1 : 0;
        master.connect(actx.destination);
      }
      if (actx.state === "suspended") actx.resume();
      return actx;
    };

    const noiseBuffer = (seconds) => {
      const buf = actx.createBuffer(1, Math.floor(actx.sampleRate * seconds), actx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      return buf;
    };

    const horn = () => {
      if (!ensureCtx()) return;
      const t = actx.currentTime;
      const lp = actx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(320, t);
      lp.frequency.linearRampToValueAtTime(920, t + 0.55);
      const g = actx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.4, t + 0.14);
      g.gain.setValueAtTime(0.4, t + 0.95);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
      lp.connect(g);
      g.connect(master);
      [[110, "sawtooth", 0], [164.81, "sawtooth", 5], [220, "triangle", -4]].forEach(([f, type, det]) => {
        const o = actx.createOscillator();
        o.type = type;
        o.frequency.value = f;
        o.detune.value = det;
        o.connect(lp);
        o.start(t);
        o.stop(t + 2.2);
      });
      const nb = actx.createBufferSource();
      nb.buffer = noiseBuffer(0.25);
      const nf = actx.createBiquadFilter();
      nf.type = "bandpass";
      nf.frequency.value = 700;
      const ng = actx.createGain();
      ng.gain.setValueAtTime(0.05, t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      nb.connect(nf);
      nf.connect(ng);
      ng.connect(master);
      nb.start(t);
    };

    const crackle = () => {
      if (!actx) return;
      const t = actx.currentTime;
      const c = actx.createBufferSource();
      c.buffer = noiseBuffer(0.05);
      const bp = actx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1500 + Math.random() * 2500;
      bp.Q.value = 8;
      const cg = actx.createGain();
      cg.gain.setValueAtTime(0.04 + Math.random() * 0.08, t);
      cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      c.connect(bp);
      bp.connect(cg);
      cg.connect(master);
      c.start(t);
      setTimeout(crackle, 200 + Math.random() * 1200);
    };

    const startAmbient = () => {
      if (!ensureCtx() || ambientOn) return;
      ambientOn = true;
      const src = actx.createBufferSource();
      src.buffer = noiseBuffer(3);
      src.loop = true;
      const lp = actx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 380;
      const g = actx.createGain();
      g.gain.value = 0.03;
      src.connect(lp);
      lp.connect(g);
      g.connect(master);
      src.start();
      crackle();
    };

    const sizzle = () => {
      if (!enabled || !ensureCtx()) return;
      const t = actx.currentTime;
      const s = actx.createBufferSource();
      s.buffer = noiseBuffer(0.12);
      const hp = actx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 2600;
      const sg = actx.createGain();
      sg.gain.setValueAtTime(0.07, t);
      sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      s.connect(hp);
      hp.connect(sg);
      sg.connect(master);
      s.start(t);
    };

    const setEnabled = (v) => {
      enabled = v;
      try { localStorage.setItem("odisseia-som", v ? "1" : "0"); } catch (e) {}
      if (master && actx) master.gain.setTargetAtTime(v ? 1 : 0, actx.currentTime, 0.04);
    };

    return { horn, startAmbient, sizzle, getEnabled: () => enabled, setEnabled };
  })();

  const soundToggle = document.getElementById("soundToggle");

  const syncSoundBtn = () => {
    const on = Sound.getEnabled();
    document.body.classList.toggle("is-muted", !on);
    soundToggle.setAttribute("aria-pressed", String(on));
  };

  soundToggle.addEventListener("click", () => {
    Sound.setEnabled(!Sound.getEnabled());
    syncSoundBtn();
  });

  syncSoundBtn();

  const fallbackNoAnim = () => {
    if (intro) intro.style.display = "none";
    if (gate) gate.style.display = "none";
    document.body.classList.remove("is-locked");
    document.querySelectorAll(".hero-title__word").forEach(splitChars);
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".reveal-hero").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".hero-title__word").forEach((w) => {
      w.style.opacity = "1";
    });
  };

  if (reducedMotion || !hasGsap) {
    fallbackNoAnim();
    window.addEventListener("scroll", () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (typeof window.Lenis !== "undefined") {
    document.documentElement.style.scrollBehavior = "auto";
    lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          e.preventDefault();
          lenis.scrollTo(id, { offset: -70, duration: 1.5 });
        }
      });
    });
  }

  const heroWords = document.querySelectorAll(".hero-title__word");
  heroWords.forEach(splitChars);

  const embersCanvas = document.getElementById("embers");
  const ctx = embersCanvas.getContext("2d");
  let embers = [];
  let bursts = [];
  let canvasW = 0;
  let canvasH = 0;
  let embersActive = true;

  const emberSprite = document.createElement("canvas");
  emberSprite.width = 64;
  emberSprite.height = 64;
  (() => {
    const sctx = emberSprite.getContext("2d");
    const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,238,180,1)");
    g.addColorStop(0.3, "rgba(240,190,80,0.85)");
    g.addColorStop(0.65, "rgba(200,120,40,0.25)");
    g.addColorStop(1, "rgba(200,120,40,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, 64, 64);
  })();

  const RES = 0.65;

  const resizeCanvas = () => {
    canvasW = embersCanvas.offsetWidth;
    canvasH = embersCanvas.offsetHeight;
    embersCanvas.width = Math.max(1, Math.round(canvasW * RES));
    embersCanvas.height = Math.max(1, Math.round(canvasH * RES));
    ctx.setTransform(RES, 0, 0, RES, 0, 0);
  };

  const createEmber = () => ({
    x: Math.random() * canvasW,
    y: canvasH + Math.random() * canvasH * 0.3,
    r: 0.6 + Math.random() * 2,
    speed: 0.25 + Math.random() * 0.9,
    drift: 12 + Math.random() * 30,
    phase: Math.random() * Math.PI * 2,
    flickerSpeed: 0.02 + Math.random() * 0.05,
    alpha: 0.15 + Math.random() * 0.5
  });

  const seedEmbers = () => {
    const count = Math.min(55, Math.floor(canvasW / 20));
    embers = Array.from({ length: count }, () => {
      const e = createEmber();
      e.y = Math.random() * canvasH;
      return e;
    });
  };

  const spawnBurst = (x, y) => {
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1.5 + Math.random() * 3.2;
      bursts.push({
        x, y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 1.6,
        r: 0.8 + Math.random() * 1.8,
        life: 1,
        decay: 0.018 + Math.random() * 0.03
      });
    }
    if (bursts.length > 320) bursts.splice(0, bursts.length - 320);
  };

  let time = 0;
  const drawEmbers = () => {
    requestAnimationFrame(drawEmbers);
    if (!embersActive || !canvasW || document.hidden) return;
    time += 1;
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.globalCompositeOperation = "lighter";
    embers.forEach((e) => {
      e.y -= e.speed;
      if (e.y < -20) Object.assign(e, createEmber());
      const x = e.x + Math.sin(time * 0.01 + e.phase) * e.drift * 0.35;
      const flicker = 0.65 + Math.sin(time * e.flickerSpeed * 10 + e.phase) * 0.35;
      ctx.globalAlpha = e.alpha * flicker;
      const d = e.r * 8;
      ctx.drawImage(emberSprite, x - d / 2, e.y - d / 2, d, d);
    });
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.045;
      b.life -= b.decay;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      ctx.globalAlpha = b.life * 0.85;
      const d = b.r * 9;
      ctx.drawImage(emberSprite, b.x - d / 2, b.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
  };

  resizeCanvas();
  seedEmbers();
  drawEmbers();

  new IntersectionObserver(([entry]) => {
    embersActive = entry.isIntersecting;
  }).observe(document.querySelector(".hero"));

  window.addEventListener("resize", () => {
    resizeCanvas();
    seedEmbers();
  });

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      progressBar.style.transform = `scaleX(${self.progress})`;
    }
  });

  ScrollTrigger.create({
    start: 40,
    end: "max",
    onToggle: (self) => nav.classList.toggle("is-scrolled", self.isActive)
  });

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 85%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        overwrite: true
      })
  });

  gsap.utils.toArray(".chapter-rule").forEach((rule) => {
    gsap.fromTo(rule.querySelectorAll("i"),
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.inOut",
        scrollTrigger: { trigger: rule, start: "top 88%", once: true }
      });
  });

  gsap.utils.toArray(".chapter-num").forEach((num) => {
    gsap.fromTo(num, { yPercent: 22 }, {
      yPercent: -22,
      ease: "none",
      scrollTrigger: {
        trigger: num.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".skill__bar i").forEach((bar) => {
    gsap.to(bar, {
      scaleX: parseFloat(bar.dataset.level),
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: { trigger: bar.closest(".arsenal-card"), start: "top 78%" }
    });
  });

  gsap.to(".hero__content", {
    yPercent: -18,
    opacity: 0.25,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".hero-bg", {
    yPercent: 14,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.fromTo(".column__flute",
    { scaleY: 0 },
    {
      scaleY: 1,
      transformOrigin: "top center",
      duration: 1.6,
      ease: "power3.inOut"
    }
  );

  gsap.set([".reveal-hero"], { opacity: 0, y: 34 });
  gsap.set(heroWords, { perspective: 600 });
  gsap.set(".char", { opacity: 0, y: 110, rotateX: -80 });

  const heroIn = () => {
    const tl = gsap.timeline();
    tl.fromTo(".hero__watermark",
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" }, 0)
      .fromTo(".hero-bg",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" }, 0)
      .fromTo(".hero-rule i",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", stagger: 0.12 }, 1.25)
      .to("#nav", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.1)
      .to(".hero-title__word:first-child .char", {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1.1, stagger: 0.055, ease: "power4.out"
      }, 0.25)
      .to(".hero-title__word--gold .char", {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1.1, stagger: 0.055, ease: "power4.out"
      }, 0.55)
      .to(".reveal-hero", {
        opacity: 1, y: 0,
        duration: 0.9, stagger: 0.14, ease: "power3.out"
      }, 1.15);
    return tl;
  };

  gsap.set("#nav", { opacity: 0, y: -20 });

  gsap.to(".gate__helmet", { y: 10, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

  let journeyStarted = false;

  const startJourney = () => {
    if (journeyStarted) return;
    journeyStarted = true;
    Sound.horn();
    setTimeout(() => Sound.startAmbient(), 900);

    const introTl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
      onComplete: () => {
        intro.style.display = "none";
        document.body.classList.remove("is-locked");
        if (lenis) lenis.start();
      }
    });

    introTl
      .to(".intro-line", { width: 220, duration: 0.9, ease: "power2.inOut" })
      .to(".intro-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
      .fromTo(".intro-title",
        { opacity: 0, y: 26, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.35"
      )
      .to(".intro-sub", { opacity: 1, duration: 0.7 }, "-=0.5")
      .to({}, { duration: 0.9 })
      .to(intro, {
        yPercent: -100,
        duration: 1.05,
        ease: "power4.inOut"
      })
      .add(heroIn(), "-=0.75");

    gsap.timeline({ onComplete: () => { gate.style.display = "none"; } })
      .to(".gate__content", { opacity: 0, scale: 0.94, duration: 0.45, ease: "power2.in" })
      .to(".gate__panel--l", { xPercent: -101, duration: 1.1, ease: "power4.inOut" }, "-=0.05")
      .to(".gate__panel--r", { xPercent: 101, duration: 1.1, ease: "power4.inOut" }, "<")
      .add(() => introTl.play(), "-=0.15");
  };

  gate.addEventListener("click", startJourney);
  gate.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      startJourney();
    }
  });

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (finePointer) {
    const heroSection = document.querySelector(".hero");
    const emblem = document.querySelector(".hero__watermark");
    const heroBg = document.querySelector(".hero-bg");

    const embX = gsap.quickTo(emblem, "x", { duration: 0.8, ease: "power3.out" });
    const embY = gsap.quickTo(emblem, "y", { duration: 0.8, ease: "power3.out" });
    const bgX = gsap.quickTo(heroBg, "x", { duration: 1.1, ease: "power3.out" });
    const bgY = gsap.quickTo(heroBg, "y", { duration: 1.1, ease: "power3.out" });

    heroSection.addEventListener("mousemove", (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      embX(nx * 26);
      embY(ny * 18);
      bgX(nx * -42);
      bgY(ny * -26);
    });

    heroSection.addEventListener("mouseleave", () => {
      embX(0); embY(0); bgX(0); bgY(0);
    });

    embersCanvas.addEventListener("pointerdown", (e) => {
      const r = embersCanvas.getBoundingClientRect();
      spawnBurst(e.clientX - r.left, e.clientY - r.top);
      Sound.sizzle();
    });

    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        gsap.fromTo(btn, { scale: 0.94 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.4)", clearProps: "scale" });
      });
    });
  }

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (canHover) {
    document.querySelectorAll(".battle-card, .arsenal-card, .oracle-link, .stele").forEach((card) => {
      const rX = gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power2.out" });
      const rY = gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power2.out" });
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        rX(-ny * 7);
        rY(nx * 7);
        gsap.set(card, { y: -6, transformPerspective: 900 });
      });
      card.addEventListener("mouseleave", () => {
        rX(0); rY(0);
        gsap.to(card, { y: 0, duration: 0.8, ease: "power3.out" });
      });
    });

    document.querySelectorAll(".btn").forEach((btn) => {
      const mX = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" });
      const mY = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" });
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        mX((e.clientX - (r.left + r.width / 2)) * 0.25);
        mY((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      });
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
