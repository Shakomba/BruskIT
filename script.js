(function () {
  var root = document.documentElement;
  var body = document.body;

  /* ================== TRANSLATIONS ================== */
  var i18n = (typeof translations !== 'undefined') ? translations : {};

  function applyLang(lang) {
    var dict = i18n[lang] || i18n.en || {};
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (dict[key]) {
        nodes[i].innerHTML = dict[key];
      }
    }

    // Direction & language attributes
    var isKu = lang === 'ckb';
    root.setAttribute('dir', isKu ? 'rtl' : 'ltr');
    root.setAttribute('lang', isKu ? 'ckb' : 'en');
    body.classList.toggle('lang-ku', isKu);

    if (dict.pageTitle) {
      document.title = dict.pageTitle;
    } else {
      document.title = isKu ? 'بروسک ئای تی' : 'Brusk IT';
    }

    if (dict.metaDesc) {
      var metaDescEl = document.querySelector('meta[name="description"]');
      if (metaDescEl) metaDescEl.setAttribute('content', dict.metaDesc);
    }

    // Toggle active state on buttons
    var btns = document.querySelectorAll('.lang-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle('active', btns[j].getAttribute('data-lang') === lang);
    }
  }

  /* ================== LANGUAGE INIT ================== */
  var LANG_KEY = 'bruskit-lang';
  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}

  if (savedLang === 'en' || savedLang === 'ckb') {
    applyLang(savedLang);
  } else {
    // Auto-detect: Kurdish device language -> Kurdish, otherwise English
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('ku') === 0 || nav.indexOf('ckb') === 0) {
      applyLang('ckb');
    } else {
      applyLang('en');
    }
  }

  var langBtns = document.querySelectorAll('.lang-btn');
  for (var k = 0; k < langBtns.length; k++) {
    langBtns[k].addEventListener('click', function () {
      this.blur();
      var lang = this.getAttribute('data-lang');
      applyLang(lang);
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    });
  }

  /* ================== THEME ================== */
  var toggle = document.getElementById('themeToggle');
  var THEME_KEY = 'bruskit-theme';
  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}

  if (savedTheme === 'dark' || savedTheme === 'light') {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      this.blur();
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      try { savedTheme = localStorage.getItem(THEME_KEY); } catch (err) { savedTheme = null; }
      if (!savedTheme) {
        root.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      }
    });
  }
})();
