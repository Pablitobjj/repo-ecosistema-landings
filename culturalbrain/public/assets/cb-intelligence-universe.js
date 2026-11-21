/* Cultural Brain Intelligence Universe. Static, source-grounded product model. No API keys or tracking. */
(function () {
  'use strict';
  const ns='http://www.w3.org/2000/svg';
  const palette={brand_business_market:'#BBA2E8',audience_culture:'#6DD3C5',media_context:'#78B9EA',strategy_performance:'#E9B28E',learning_decisions:'#D998C2'};
  const copy={
    en:{label:'THE INTELLIGENCE UNIVERSE',search:'Search families, variables or profiles',hint:'Select a node to inspect its knowledge family.',all:'All families',results:'Typed semantic keys',free:'Qualitative findings and specialized domain contracts also contribute to this family.',select:'Select a family',details:'Knowledge family',types:'Knowledge types',rel:'Evidence relationships',ops:'Structured operations',dec:'Decision domains and recommendations',learn:'Learning and outcomes',ext:'Extensible intelligence',none:'No matching families or keys.',review:'Source and scope remain attached to each claim.',view:'View complete catalog',example:'Illustrative architecture',source:'Source model',owner:'Specialized owner',culture:'Culture, knowledge, decisions and learning',beta:'The atlas is a source-report presentation; final internal IDs must be reconciled with the current application catalog.',states:'Five evaluation outcomes',planning:'What can happen next',mods:'Knowledge',relations:'Relationships',operations:'Operations',decisions:'Decisions',learning:'Learning',extensions:'Extensions'},
    es:{label:'EL UNIVERSO DE INTELIGENCIA',search:'Buscar familias, variables o perfiles',hint:'Seleccioná un nodo para explorar su familia de conocimiento.',all:'Todas las familias',results:'Claves semánticas tipadas',free:'Los hallazgos cualitativos y los contratos especializados también aportan información a esta familia.',select:'Seleccioná una familia',details:'Familia de conocimiento',types:'Tipos de conocimiento',rel:'Relaciones entre evidencias',ops:'Operaciones estructuradas',dec:'Ámbitos de decisión y recomendaciones',learn:'Aprendizaje y resultados',ext:'Inteligencia extensible',none:'No se encontraron familias ni claves.',review:'Cada afirmación conserva fuente y alcance.',view:'Ver catálogo completo',example:'Arquitectura ilustrativa',source:'Modelo fuente',owner:'Motor responsable',culture:'Cultura, conocimiento, decisiones y aprendizaje',beta:'El atlas se basa en documentación auditada; los IDs internos finales deben contrastarse con el catálogo vigente de la aplicación.',states:'Cinco resultados de evaluación',planning:'Qué puede cambiar después',mods:'Conocimiento',relations:'Relaciones',operations:'Operaciones',decisions:'Decisiones',learning:'Aprendizaje',extensions:'Extensiones'}
  };
  const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const title=(x,lang)=>x?.label?.[lang]||x?.label?.es||x?.label?.en||x?.id||'';
  function renderSvg(model,state){
    const selected=state.selected, q=state.query.toLocaleLowerCase();
    const cx=440,cy=305,R=209;
    const filtered=model.families.filter(f=>{const names=[f.id,title(f,state.lang),title(f,state.lang==='es'?'en':'es'),...f.keys.map(k=>title(k,state.lang)),...f.keys.map(k=>k.display_id)].join(' ').toLocaleLowerCase();return !q||names.includes(q)});
    const allowed=new Set(filtered.map(f=>f.id));
    const stages=model.domains.map((d,i)=>{const start=-Math.PI/2+2*Math.PI*i/5;const r=278;const x=cx+r*Math.cos(start),y=cy+r*Math.sin(start);return '<g><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="'+palette[d.id]+'"/><text x="'+x.toFixed(1)+'" y="'+(y+18).toFixed(1)+'" text-anchor="middle" fill="#9BACC9" font-size="10" font-weight="600">'+esc(String(i+1).padStart(2,'0'))+'</text></g>'}).join('');
    const nodes=model.families.map((f,i)=>{const angle=2*Math.PI*i/model.families.length-Math.PI/2;const x=cx+R*Math.cos(angle),y=cy+R*Math.sin(angle);const active=f.id===selected,dim=!allowed.has(f.id);const color=palette[f.domain]||'#9CB4CD';return '<g data-family-id="'+esc(f.id)+'" class="cb-u-node'+(active?' is-selected':'')+(dim?' is-dim':'')+'" role="button" tabindex="0" aria-label="'+esc(f.id+' '+title(f,state.lang)+' '+f.keys.length+' typed keys')+'"><title>'+esc(title(f,state.lang))+'</title><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(active?25:19)+'" fill="#112348" stroke="'+color+'" stroke-width="'+(active?3:1.3)+'"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(active?31:23)+'" fill="none" stroke="'+color+'" stroke-opacity="'+(active?.44:.12)+'"/><text x="'+x.toFixed(1)+'" y="'+(y+4).toFixed(1)+'" text-anchor="middle" font-size="11" fill="#FFFFFF" font-weight="700">'+esc(f.id)+'</text></g>'}).join('');
    return '<svg class="cb-u-orbits" viewBox="0 0 880 650" role="group" aria-label="'+esc(copy[state.lang].culture)+'" xmlns="'+ns+'">'+
      '<defs><radialGradient id="cb-u-core" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#34447E"/><stop offset=".65" stop-color="#172A56"/><stop offset="1" stop-color="#101D3E"/></radialGradient></defs>'+
      '<circle class="cb-u-outer-orbit" cx="'+cx+'" cy="'+cy+'" r="308" fill="none" stroke="#526887" stroke-opacity=".26" stroke-width="1.2" stroke-dasharray="2 9"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="#8391B8" stroke-opacity=".46" stroke-width="1.5"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="157" fill="none" stroke="#7DB2C3" stroke-opacity=".3" stroke-dasharray="3 12"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="123" fill="url(#cb-u-core)" stroke="#948FD5" stroke-width="1.2"/>'+
      '<circle cx="'+cx+'" cy="'+cy+'" r="108" fill="none" stroke="#B3B8E0" stroke-opacity=".21"/>'+
      '<text x="'+cx+'" y="'+(cy-24)+'" text-anchor="middle" fill="#D3C6FF" font-size="13" font-weight="700" letter-spacing="3">CULTURAL</text>'+
      '<text x="'+cx+'" y="'+(cy+13)+'" text-anchor="middle" fill="white" font-size="32" font-weight="750">BRAIN</text>'+
      '<text x="'+cx+'" y="'+(cy+38)+'" text-anchor="middle" fill="#8ECAD0" font-size="11" letter-spacing="2">UNIVERSE</text>'+
      '<g>'+stages+'</g><g class="cb-u-family-nodes">'+nodes+'</g>'+
      '<text x="'+cx+'" y="635" text-anchor="middle" fill="#8FACC7" font-size="10" letter-spacing="2">19 FAMILIES • CONNECTED KNOWLEDGE</text></svg>';
  }
  function init(el){
    const q=n=>el.querySelector(n),state={lang:(document.documentElement.lang||'en').startsWith('es')?'es':'en',mode:'knowledge',selected:'F01',query:'',zoom:1};
    const modelUrl=el.getAttribute('data-model-url')||'/assets/data/cb-universe-model.v1.json';
    const archUrl=el.getAttribute('data-architecture-url')||'/assets/data/cb-universe-architecture.v1.json';
    el.innerHTML='<div class="cb-u-header"><div><p class="cb-u-kicker" data-u-kicker></p><h3 class="cb-u-heading">19 / 54 / 11 / 20</h3><p class="cb-u-header-copy" data-u-intro></p></div><div class="cb-u-stats" aria-label="Catalog metrics"><span><b>19</b><small>FAMILIES</small></span><span><b>54</b><small>TYPED KEYS</small></span><span><b>20</b><small>PROFILES</small></span></div></div><div class="cb-u-controls"><label class="cb-u-search-wrap"><span class="cb-u-sr-only" data-u-search-label></span><input class="cb-u-search" type="search" data-u-search autocomplete="off"></label><label class="cb-u-mobile-picker"><span class="cb-u-sr-only" data-u-family-picker-label></span><select data-u-family-select aria-label="Choose a knowledge family"></select></label><nav class="cb-u-mode-nav" aria-label="Intelligence Universe views"></nav></div><div class="cb-u-layout"><div class="cb-u-canvas"><div class="cb-u-zoom-controls" role="group" aria-label="Zoom"><button type="button" data-u-zoom="out" aria-label="Zoom out">−</button><button type="button" data-u-zoom="fit" aria-label="Reset zoom">1:1</button><button type="button" data-u-zoom="in" aria-label="Zoom in">+</button></div><div class="cb-u-visual" data-u-scene></div><p class="cb-u-canvas-caption" data-u-caption></p></div><aside class="cb-u-detail" aria-live="polite" data-u-detail></aside></div><details class="cb-u-catalog"><summary data-u-catalog-title></summary><div data-u-catalog></div></details><p class="cb-u-footnote" data-u-footnote></p>';
    q('[data-u-search]').addEventListener('input',ev=>{state.query=ev.target.value.trim();redraw()});
    q('[data-u-family-select]').addEventListener('change',ev=>{state.selected=ev.target.value;state.mode='knowledge';redraw()});
    q('.cb-u-mode-nav').addEventListener('click',ev=>{const b=ev.target.closest('[data-u-mode]');if(!b)return;state.mode=b.dataset.uMode;redraw()});
    q('[data-u-scene]').addEventListener('click',ev=>{const n=ev.target.closest('[data-family-id]');if(!n)return;state.selected=n.dataset.familyId;state.mode='knowledge';redraw()});
    q('[data-u-scene]').addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){const n=ev.target.closest('[data-family-id]');if(n){ev.preventDefault();state.selected=n.dataset.familyId;state.mode='knowledge';redraw();q('[data-u-detail]').focus()}}});
    q('.cb-u-zoom-controls').addEventListener('click',ev=>{const b=ev.target.closest('[data-u-zoom]');if(!b)return;const action=b.dataset.uZoom;state.zoom=action==='fit'?1:Math.max(.8,Math.min(1.35,state.zoom+(action==='in'?.15:-.15)));const svg=q('.cb-u-orbits');if(svg)svg.style.transform='scale('+state.zoom+')'});
    q('[data-u-catalog]').addEventListener('click',ev=>{const n=ev.target.closest('[data-family-id]');if(n){state.selected=n.dataset.familyId;state.mode='knowledge';redraw()}});
    let model,arch;
    function list(items){return '<ul class="cb-u-details-list">'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>'}
    function redraw(){
      if(!model||!arch)return;const l=state.lang,c=copy[l],t=x=>title(x,l);
      q('[data-u-family-picker-label]').textContent=c.select;
      const picker=q('[data-u-family-select]');picker.innerHTML=model.families.map(f=>'<option value="'+esc(f.id)+'">'+esc(f.id+' · '+t(f))+'</option>').join('');picker.value=state.selected;
      q('[data-u-kicker]').textContent=c.label;q('[data-u-intro]').textContent=c.culture;q('[data-u-search-label]').textContent=c.search;q('[data-u-search]').placeholder=c.search;q('[data-u-catalog-title]').textContent=c.view;q('[data-u-caption]').textContent=c.hint;q('[data-u-footnote]').textContent=c.beta;
      q('.cb-u-mode-nav').innerHTML=[['knowledge','mods'],['relationships','relations'],['operations','operations'],['decisions','decisions'],['learning','learning'],['extensions','extensions']].map(([id,label])=>'<button type="button" data-u-mode="'+id+'" aria-pressed="'+(state.mode===id)+'" class="'+(state.mode===id?'active':'')+'">'+esc(c[label])+'</button>').join('');
      q('[data-u-scene]').innerHTML=renderSvg(model,state);q('.cb-u-orbits').style.transform='scale('+state.zoom+')';
      const family=model.families.find(f=>f.id===state.selected)||model.families[0];
      const familyKeys=family.keys.map(k=>'<span class="cb-u-field">'+esc(t(k))+'</span>');
      const root=q('[data-u-detail]');root.setAttribute('tabindex','-1');
      if(state.mode==='knowledge'){
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.details)+' / '+esc(family.id)+'</p><h4>'+esc(t(family))+'</h4><div class="cb-u-count">'+family.keys.length+' '+esc(c.results.toLowerCase())+'</div><div class="cb-u-key-list">'+(familyKeys.length?familyKeys.join(''):'<p>'+esc(c.free)+'</p>')+'</div><p class="cb-u-note">'+esc(c.review)+'</p>';
      }else if(state.mode==='relationships'){
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.rel)+'</p><h4>'+esc(c.review)+'</h4>'+list(arch.relations.map(z=>'<strong>'+esc(z.from)+'</strong> → <strong>'+esc(z.to)+'</strong><small>'+esc(z.relationship_label)+'</small>'));
      }else if(state.mode==='operations'){
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.ops)+'</p><h4>'+esc(arch.operations.length+' '+c.operations.toLowerCase())+'</h4>'+list(arch.operations.map(z=>'<strong>'+esc(t(z))+'</strong><small>'+esc(c.owner)+': '+esc(z.owner)+'</small>'));
      }else if(state.mode==='decisions'){
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.dec)+'</p><h4>'+esc(model.cerebro_decision_domains.length+' + '+model.recommendation_types.length)+'</h4>'+list(model.cerebro_decision_domains.map(z=>'<strong>'+esc(t(z))+'</strong>'))+'<h5>'+esc(c.dec)+'</h5>'+list(model.recommendation_types.map(z=>esc(t(z))));
      }else if(state.mode==='learning'){
        const arr=l==='es'?['Confirmada','Refutada','Sin datos','No comparable','No concluyente']:['Confirmed','Refuted','No data','Not comparable','Inconclusive'];
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.learn)+'</p><h4>'+esc(c.states)+'</h4>'+list(arr.map(z=>'<strong>'+esc(z)+'</strong>'))+'<p class="cb-u-note">'+esc(c.review)+'</p>';
      }else{
        const a=l==='es'?['Retail & Commerce','Brand Equity','Operaciones de medios','Taxonomías propias','Modelos por cliente']:['Retail & Commerce','Brand Equity','Media operations','Custom taxonomies','Client-specific models'];
        root.innerHTML='<p class="cb-u-eyebrow">'+esc(c.ext)+'</p><h4>'+esc(c.planning)+'</h4>'+list(a.map(z=>'<strong>'+esc(z)+'</strong>'))+'<p class="cb-u-note">'+esc(c.example)+'</p>';
      }
      const s=state.query.toLocaleLowerCase();
      const familyResults=model.families.filter(f=>!s||[f.id,t(f),...f.keys.map(k=>t(k)),...f.keys.map(k=>k.display_id)].join(' ').toLocaleLowerCase().includes(s));
      q('[data-u-catalog]').innerHTML=familyResults.length?'<ul class="cb-u-plain-list">'+familyResults.map(f=>'<li><button type="button" data-family-id="'+esc(f.id)+'"><b>'+esc(f.id)+'</b> '+esc(t(f))+' <small>('+f.keys.length+')</small></button></li>').join('')+'</ul>':'<p>'+esc(c.none)+'</p>';
    }
    Promise.all([fetch(modelUrl).then(x=>{if(!x.ok)throw Error('model '+x.status);return x.json()}),fetch(archUrl).then(x=>{if(!x.ok)throw Error('architecture '+x.status);return x.json()})])
    .then(([m,a])=>{if(m.families.length!==19||m.families.reduce((n,x)=>n+x.keys.length,0)!==54||a.page_map.length!==14)throw Error('model schema mismatch');model=m;arch=a;redraw()})
    .catch(()=>{q('[data-u-detail]').textContent='The intelligence model could not be loaded. / No se pudo cargar el modelo de inteligencia.'});
    if(typeof MutationObserver!=='undefined'){const mo=new MutationObserver(()=>{const lang=(document.documentElement.lang||'en').startsWith('es')?'es':'en';if(lang!==state.lang){state.lang=lang;redraw()}});mo.observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}
  }
  const boot=()=>document.querySelectorAll('[data-cb-universe]').forEach(init);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();