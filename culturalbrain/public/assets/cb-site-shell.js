/* Cultural Brain single navigation + locale controller; no external runtime dependencies. */
(function(){
 'use strict';
 var STORAGE_KEY='culturalbrain-lang';
 function qs(sel,root){return (root||document).querySelector(sel);}
 var header=null, nav=null, toggle=null;
 function routeGroup(){
   var p=location.pathname.replace(/\/+$/,'')||'/';
   if(p==='/research-center')return 'research';
   if(p==='/pricing')return 'plans';
   if(p==='/resources')return 'resources';
   if(p==='/how-it-works')return 'how';
   if(p.indexOf('/solutions/')===0)return 'solutions';
   if(p==='/platform'&&location.hash==='#solutions')return 'solutions';
   if(p==='/platform'||p==='/cerebro'||p==='/sofia'||p==='/pulse')return 'platform';
   return '';
 }
 function setLanguage(locale){
   var l=locale==='es'?'es':'en';
   document.documentElement.lang=l;
   if(document.body)document.body.classList.toggle('lang-es',l==='es');
   document.querySelectorAll('[data-cb-locale]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-cb-locale')===l));});
   var html=document.documentElement;
   var title=html.getAttribute('data-title-'+l);
   if(title)document.title=title;
   var meta=qs('meta[name="description"]');
   if(meta&&meta.getAttribute('data-description-'+l))meta.setAttribute('content',meta.getAttribute('data-description-'+l));
   document.querySelectorAll('[data-placeholder-en]').forEach(function(el){var v=el.getAttribute('data-placeholder-'+l);if(v!==null)el.setAttribute('placeholder',v);});
   if(location.pathname==='/pricing'){
     [['name','Your name','Tu nombre'],['company','Your company','Tu empresa'],['email','Your email','Tu email']].forEach(function(a){var el=document.getElementById(a[0]);if(el)el.placeholder=l==='es'?a[2]:a[1];});
     var select=qs('#contact select');
     if(select&&select.options.length===4){
       var en=['Guided Product Demo','Cultural Brain for Teams','Cultural Brain for Agencies','Cultural Brain Enterprise'];
       var es=['Demo guiada de producto','Cultural Brain para equipos','Cultural Brain para agencias','Cultural Brain Enterprise'];
       Array.prototype.forEach.call(select.options,function(option,i){option.textContent=(l==='es'?es:en)[i];});
     }
   }
   try{localStorage.setItem(STORAGE_KEY,l)}catch(err){/* privacy mode */}
   document.dispatchEvent(new CustomEvent('cb:languagechange',{detail:{language:l}}));
 }
 function closeNav(){if(nav)nav.classList.remove('cb-site-open');if(toggle)toggle.setAttribute('aria-expanded','false');}
 function init(){
   header=qs('#cb-site-shell-header');
   nav=qs('[data-cb-site-nav]',header);
   toggle=qs('[data-cb-menu-toggle]',header);
   if(!header||!nav||!toggle)return;
   document.body.classList.add('cb-site-unified');
   function syncActive(){var active=routeGroup();header.querySelectorAll('[data-cb-nav-id]').forEach(function(a){if(a.dataset.cbNavId===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
   syncActive();
   window.addEventListener('hashchange',syncActive);
   header.querySelectorAll('[data-cb-locale]').forEach(function(b){b.addEventListener('click',function(){setLanguage(b.getAttribute('data-cb-locale'));});});
   toggle.addEventListener('click',function(){var open=nav.classList.toggle('cb-site-open');toggle.setAttribute('aria-expanded',String(open));});
   nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav);});
   document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('cb-site-open')){closeNav();toggle.focus();}});
   document.addEventListener('click',function(e){if(header&&!header.contains(e.target))closeNav();});
   window.addEventListener('resize',function(){if(innerWidth>1160)closeNav();});
   var saved='en';try{saved=localStorage.getItem(STORAGE_KEY)||document.documentElement.lang||'en'}catch(err){saved=document.documentElement.lang||'en';}
   setLanguage(saved);
 }
 window.CBSiteShell={setLanguage:setLanguage,closeNavigation:closeNav};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
