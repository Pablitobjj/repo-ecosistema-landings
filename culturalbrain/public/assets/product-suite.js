/* Shared functionality for Cultural Brain capability landings. Demonstrations are preauthored; no fake live AI/API calls. */
(function () {
  'use strict';
  function setLocale(locale) {
    var lang = locale === 'es' ? 'es' : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-locale]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.locale === lang));
    });
    var de = document.querySelector('meta[name="description"]');
    if (de && de.dataset['description' + (lang === 'es' ? 'Es' : 'En')]) {
      de.setAttribute('content', de.dataset['description' + (lang === 'es' ? 'Es' : 'En')]);
    }
    var enTitle = document.documentElement.dataset.titleEn;
    var esTitle = document.documentElement.dataset.titleEs;
    if (enTitle && esTitle) document.title = lang === 'es' ? esTitle : enTitle;
    try { localStorage.setItem('culturalbrain-lang', lang); } catch (e) { /* blocked storage */ }
  }
  document.querySelectorAll('[data-locale]').forEach(function (button) {
    button.addEventListener('click', function () { setLocale(button.dataset.locale); });
  });
  var initial = 'en';
  try { initial = localStorage.getItem('culturalbrain-lang') || 'en'; } catch (e) { /* blocked storage */ }
  setLocale(initial);
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var opened = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(opened));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
  document.querySelectorAll('[data-tabs]').forEach(function (container) {
    var buttons = Array.prototype.slice.call(container.querySelectorAll('[data-tab-target]'));
    var panels = Array.prototype.slice.call(container.querySelectorAll('[data-tab-panel]'));
    if (!buttons.length || !panels.length) return;
    function activate(id, focus) {
      if (!panels.some(function (p) { return p.id === id; })) return;
      buttons.forEach(function (button) {
        var chosen = button.dataset.tabTarget === id;
        button.setAttribute('aria-selected', String(chosen));
        button.tabIndex = chosen ? 0 : -1;
        if (focus && chosen) button.focus();
      });
      panels.forEach(function (panel) {
        var visible = panel.id === id;
        panel.hidden = !visible;
        panel.tabIndex = visible ? 0 : -1;
      });
    }
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () { activate(button.dataset.tabTarget, false); });
      button.addEventListener('keydown', function (e) {
        var next = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % buttons.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = buttons.length - 1;
        else return;
        e.preventDefault();
        activate(buttons[next].dataset.tabTarget, true);
      });
    });
    activate(buttons.find(function (b) { return b.getAttribute('aria-selected') === 'true'; })?.dataset.tabTarget || buttons[0].dataset.tabTarget, false);
  });
})();