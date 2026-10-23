/* ==========================================================================
   UMBRAL · interacción
   - Navegación y menú móvil
   - Test de señales (6 preguntas, resultado y handoff a contacto)
   - Formulario que arma el mensaje de WhatsApp
   - Animaciones de entrada
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG · cambia estos datos por los del psicólogo
     ------------------------------------------------------------------ */
  const CONFIG = {
    whatsapp: '573001234567',        // solo dígitos, con 57
    phoneDisplay: '+57 300 123 4567',
    email: 'hola@umbral.co',
    brand: 'Umbral'
  };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Un solo lugar para el número: actualiza todos los enlaces de WhatsApp.
  $$('a[href*="wa.me/"]').forEach(a => {
    a.href = a.href.replace(/wa\.me\/\d+/, `wa.me/${CONFIG.whatsapp}`);
  });

  /* ------------------------------------------------------------------
     Header + menú móvil
     ------------------------------------------------------------------ */
  const header = $('#header');
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  let lastScroll = 0;

  const onScroll = () => {
    const y = window.scrollY || 0;
    header.classList.toggle('is-scrolled', y > 16);
    lastScroll = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    document.body.classList.remove('is-locked');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
    const use = menuBtn.querySelector('use');
    if (use) use.setAttribute('href', '#i-menu');
  };

  const openMenu = () => {
    mobileMenu.hidden = false;
    document.body.classList.add('is-locked');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Cerrar menú');
    const use = menuBtn.querySelector('use');
    if (use) use.setAttribute('href', '#i-close');
    const first = mobileMenu.querySelector('a');
    if (first) first.focus({ preventScroll: true });
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      if (mobileMenu.hidden) openMenu();
      else closeMenu();
    });
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1120) closeMenu();
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     Año del footer
     ------------------------------------------------------------------ */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
     Test de señales
     ------------------------------------------------------------------ */
  const QUESTIONS = [
    {
      q: 'Cuando alguien no está de acuerdo, ¿qué pasa en tu equipo?',
      options: [
        { t: 'Se dice y se discute, aunque incomode.', s: 0 },
        { t: 'Se dice, pero después no cambia nada.', s: 1 },
        { t: 'Se calla y se comenta por fuera.', s: 2 },
        { t: 'No se habla: ya sabemos que no sirve.', s: 3 }
      ]
    },
    {
      q: 'En los últimos tres meses, ¿cómo se enteraron de las renuncias?',
      options: [
        { t: 'Las vimos venir y conversamos a tiempo.', s: 0 },
        { t: 'Algunas nos sorprendieron.', s: 1 },
        { t: 'Casi todas nos sorprendieron.', s: 2 },
        { t: 'Ya no nos sorprende; se está volviendo normal.', s: 3 }
      ]
    },
    {
      q: '¿Los líderes tienen tiempo para liderar?',
      options: [
        { t: 'Sí, es parte explícita de su trabajo.', s: 0 },
        { t: 'A veces; compite con la operación.', s: 1 },
        { t: 'Casi nunca; apagan incendios.', s: 2 },
        { t: 'No hay líderes, hay bomberos.', s: 3 }
      ]
    },
    {
      q: '¿Las personas saben qué se espera de ellas?',
      options: [
        { t: 'Sí, es claro y se revisa.', s: 0 },
        { t: 'En general sí, con vacíos.', s: 1 },
        { t: 'Cambia todo el tiempo.', s: 2 },
        { t: 'Cada quien interpreta como puede.', s: 3 }
      ]
    },
    {
      q: '¿Se puede decir la verdad sin miedo?',
      options: [
        { t: 'Sí, incluso cuando incomoda.', s: 0 },
        { t: 'Depende del tema y de quién esté.', s: 1 },
        { t: 'Hay temas que es mejor no tocar.', s: 2 },
        { t: 'Decir la verdad tiene costo.', s: 3 }
      ]
    },
    {
      q: '¿Cómo está repartida la carga mental?',
      options: [
        { t: 'Es visible y se ajusta.', s: 0 },
        { t: 'Recae en algunas personas.', s: 1 },
        { t: 'Siempre en las mismas.', s: 2 },
        { t: 'Está normalizado que unos sostengan todo.', s: 3 }
      ]
    }
  ];

  const BANDS = [
    {
      max: 5,
      name: 'Señales tempranas',
      text: 'Hay bases para conversar. El riesgo es normalizar lo que ya incomoda. Un diagnóstico breve puede evitar que las tensiones se vuelvan cultura.'
    },
    {
      max: 11,
      name: 'Riesgo moderado',
      text: 'Hay tensiones que ya están costando energía, decisiones y personas. No necesitas una transformación de dos años: necesitas priorizar una conversación y medirla.'
    },
    {
      max: 18,
      name: 'Intervención prioritaria',
      text: 'El sistema está pidiendo ayuda. La rotación, el silencio o la sobrecarga ya no son solo un tema de clima: son un riesgo de negocio. Empecemos por un diagnóstico y un plan de 90 días.'
    }
  ];

  const quiz = $('#quiz');
  const quizStart = $('#quizStart');
  const quizBody = $('#quizBody');
  const quizResult = $('#quizResult');
  const quizQuestion = $('#quizQuestion');
  const quizOptions = $('#quizOptions');
  const quizCount = $('#quizCount');
  const quizProgress = $('#quizProgress');
  const quizBack = $('#quizBack');
  const quizNext = $('#quizNext');
  const quizBegin = $('#quizBegin');
  const quizAgain = $('#quizAgain');
  const quizScore = $('#quizScore');
  const quizBand = $('#quizBand');
  const quizText = $('#quizText');
  const quizCta = $('#quizCta');

  let qIndex = 0;
  let answers = new Array(QUESTIONS.length).fill(null);
  let lastResult = null;

  const storeResult = result => {
    lastResult = result;
    try { sessionStorage.setItem('umbralQuiz', JSON.stringify(result)); } catch (_) {}
  };

  const getStoredResult = () => {
    if (lastResult) return lastResult;
    try {
      const raw = sessionStorage.getItem('umbralQuiz');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.score === 'number') return parsed;
    } catch (_) {}
    return null;
  };

  const renderQuestion = () => {
    if (!quizQuestion || !quizOptions) return;
    const item = QUESTIONS[qIndex];
    quizCount.textContent = `Pregunta ${qIndex + 1} de ${QUESTIONS.length}`;
    quizProgress.style.width = `${((qIndex + 1) / QUESTIONS.length) * 100}%`;
    quizQuestion.textContent = item.q;
    quizOptions.innerHTML = '';

    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__option' + (answers[qIndex] === i ? ' is-selected' : '');
      btn.setAttribute('aria-pressed', answers[qIndex] === i ? 'true' : 'false');
      btn.innerHTML = `<span>${String.fromCharCode(65 + i)}</span>${opt.t}`;
      btn.addEventListener('click', () => {
        answers[qIndex] = i;
        $$('.quiz__option', quizOptions).forEach((b, bi) => {
          const on = bi === i;
          b.classList.toggle('is-selected', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        quizNext.disabled = false;
      });
      quizOptions.appendChild(btn);
    });

    quizBack.disabled = qIndex === 0;
    quizNext.disabled = answers[qIndex] === null;
    quizNext.innerHTML = qIndex === QUESTIONS.length - 1
      ? 'Ver resultado <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>'
      : 'Siguiente <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>';
  };

  const showResult = () => {
    const score = answers.reduce((sum, a, i) => sum + (a === null ? 0 : QUESTIONS[i].options[a].s), 0);
    const band = BANDS.find(b => score <= b.max) || BANDS[BANDS.length - 1];
    storeResult({ score, band: band.name, text: band.text });

    quizScore.innerHTML = `${score}<span>/${QUESTIONS.length * 3}</span>`;
    quizBand.textContent = band.name;
    quizText.textContent = band.text;
    quizBody.hidden = true;
    quizResult.hidden = false;
    quizProgress.style.width = '100%';
    if (quiz) quiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const startQuiz = () => {
    qIndex = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    quizStart.hidden = true;
    quizResult.hidden = true;
    quizBody.hidden = false;
    renderQuestion();
  };

  if (quiz) {
    quizBegin && quizBegin.addEventListener('click', startQuiz);

    quizNext && quizNext.addEventListener('click', () => {
      if (answers[qIndex] === null) return;
      if (qIndex === QUESTIONS.length - 1) showResult();
      else {
        qIndex += 1;
        renderQuestion();
        quizQuestion.focus({ preventScroll: true });
      }
    });

    quizBack && quizBack.addEventListener('click', () => {
      if (qIndex === 0) return;
      qIndex -= 1;
      renderQuestion();
    });

    quizAgain && quizAgain.addEventListener('click', () => {
      quizStart.hidden = false;
      quizResult.hidden = true;
      quizBody.hidden = true;
      quizProgress.style.width = '0%';
      lastResult = null;
      try { sessionStorage.removeItem('umbralQuiz'); } catch (_) {}
    });

    quizCta && quizCta.addEventListener('click', () => {
      const result = getStoredResult();
      const message = $('#message');
      if (result && message && !message.value.trim()) {
        message.value = `Hice el test de señales y obtuve ${result.band} (${result.score}/18). Me gustaría conversar sobre lo que está pasando en mi equipo.`;
        message.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  /* ------------------------------------------------------------------
     Formulario de contacto → WhatsApp
     ------------------------------------------------------------------ */
  const form = $('#contactForm');
  const status = $('#formStatus');

  const setStatus = (text, type = '') => {
    if (!status) return;
    status.textContent = text;
    status.className = 'form-status' + (type ? ` is-${type}` : '');
  };

  const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const digits = value => (value || '').replace(/\D/g, '');

  const markError = (el, on) => {
    if (!el) return;
    const field = el.closest('.field');
    if (field) field.classList.toggle('has-error', on);
  };

  const validate = () => {
    const name = $('#name');
    const company = $('#company');
    const email = $('#email');
    const phone = $('#phone');
    const consent = $('#consent');
    let ok = true;

    [name, company, email, phone, consent].forEach(el => markError(el, false));

    if (!name.value.trim()) { markError(name, true); ok = false; }
    if (!company.value.trim()) { markError(company, true); ok = false; }
    if (!isEmail(email.value.trim())) { markError(email, true); ok = false; }
    if (digits(phone.value).length < 7) { markError(phone, true); ok = false; }
    if (!consent.checked) { markError(consent, true); ok = false; }

    if (!ok) {
      setStatus('Revisa los campos marcados para continuar.', 'error');
      const first = form.querySelector('.has-error input, .has-error textarea');
      if (first) first.focus();
    }
    return ok;
  };

  if (form) {
    ['input', 'change'].forEach(evt => {
      form.addEventListener(evt, e => {
        if (e.target.matches('input, textarea')) markError(e.target, false);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate()) return;

      const name = $('#name').value.trim();
      const company = $('#company').value.trim();
      const role = $('#role').value.trim();
      const email = $('#email').value.trim();
      const phone = $('#phone').value.trim();
      const message = $('#message').value.trim();
      const result = getStoredResult();

      const lines = [
        `Hola, soy ${name} de ${company}${role ? ` (${role})` : ''}.`,
        message ? `\n${message}` : '',
        result ? `\nHice el test de señales: ${result.band} (${result.score}/18).` : '',
        `\nMi correo: ${email}`,
        `Mi WhatsApp: ${phone}`
      ].filter(Boolean);

      const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
      setStatus('Abriendo WhatsApp con tu mensaje…', 'ok');

      const win = window.open(url, '_blank');
      if (win) {
        try { win.opener = null; } catch (_) {}
      } else {
        window.location.href = url;
      }

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'lead_whatsapp', { form: 'umbral_contact' });
      }

      showToast('Listo. Si WhatsApp no se abrió, escríbenos a ' + CONFIG.email);
      form.reset();
      markError($('#consent'), false);
      setStatus('Mensaje preparado. Completa el envío en WhatsApp.', 'ok');
    });
  }

  /* ------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------ */
  const toast = $('#toast');
  let toastTimer = null;
  const showToast = msg => {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 320);
    }, 4200);
  };

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  const revealTargets = $$('.section__head, .signal, .service, .method__step, .about__art, .about__copy, .quiz, .faq, .contact__copy, .contact__card');
  if ('IntersectionObserver' in window && revealTargets.length) {
    document.body.classList.add('reveal-ready');
    revealTargets.forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------------
     Aviso de configuración (solo consola, no visible)
     ------------------------------------------------------------------ */
  if (CONFIG.whatsapp === '573001234567') {
    console.info('[Umbral] Datos de ejemplo. Reemplaza CONFIG.whatsapp, phoneDisplay y email en assets/js/app.js, y los enlaces de WhatsApp del HTML.');
  }
})();
