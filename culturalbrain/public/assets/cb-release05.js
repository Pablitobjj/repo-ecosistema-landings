/* CB R05. Hooks are add-only and scoped to R05 assets; existing shell owns locale. */
(()=>{'use strict';
 const objects=[...document.querySelectorAll('[data-cb-r05-loop]')];
 const controls=[...document.querySelectorAll('[data-cb-r05-pause]')];
 if(!objects.length)return;
 let paused=false;
 const currentLang=()=>document.documentElement.lang==='es'?'es':'en';
 const updateControls=()=>{const lang=currentLang();controls.forEach(button=>{button.hidden=false;button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',lang==='es'?(paused?'Reanudar animación':'Pausar animación'):(paused?'Resume animation':'Pause animation'));button.innerHTML=lang==='es'?(paused?'▶ Reanudar animación':'Ⅱ Pausar animación'):(paused?'▶ Resume animation':'Ⅱ Pause animation')})};
 const syncObject=o=>{const lang=currentLang(),size=o.dataset.cbR05Size||'desktop';const suffix=(size==='mobile'?'-mobile':'')+(lang==='es'?'-es':'');const src='/assets/cb-intelligence-loop'+suffix+'.svg';if(o.getAttribute('data')!==src)o.setAttribute('data',src);const svg=o.contentDocument?.documentElement;if(svg){svg.classList.toggle('is-paused',paused);o.setAttribute('aria-label',lang==='es'?'Ciclo continuo de conocimiento, recomendación, decisión, ejecución, medición y aprendizaje':'Continuous cycle of knowledge, recommendation, decision, execution, measurement and learning')}};
 const update=()=>{objects.forEach(syncObject);updateControls()};
 objects.forEach(o=>o.addEventListener('load',()=>syncObject(o)));
 controls.forEach(b=>b.addEventListener('click',()=>{paused=!paused;update()}));
 new MutationObserver(()=>update()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
})();
