'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const model=JSON.parse(fs.readFileSync(path.join(__dirname,'model.v1.json'),'utf8'));
const architecture=JSON.parse(fs.readFileSync(path.join(__dirname,'architecture.v1.json'),'utf8'));
const same=(set,expected,description)=>{assert.equal(set.size,expected,description)};
// Counts (registry entries backed by local app code; not process counts, not a deployment certification).
assert.equal(model.families.length,19);
assert.equal(model.families.reduce((n,x)=>n+x.typed_key_count,0),54);
assert.equal(model.families.reduce((n,x)=>n+x.keys.length,0),54);
assert.equal(model.knowledge_types.length,11);
assert.equal(model.selection_profiles.length,20);
assert.equal(model.cerebro_decision_domains.length,5);
assert.equal(model.recommendation_types.length,10);
same(new Set(model.families.map(x=>x.id)),19,'family ids');
same(new Set(model.selection_profiles.map(x=>x.id)),20,'profile ids');
same(new Set(model.families.flatMap(x=>x.keys.map(k=>k.display_id))),54,'presentation locators');
assert(model.families.every(f=>f.free_form_finding_supported===true),'qualitative findings in all families');
assert(model.domains.length===5);
same(new Set(model.domains.flatMap(d=>d.family_ids)),19,'domain coverage');
// Verification block: local source registry only, never a deployment certification.
const v=model.verification;
assert.equal(v.status,'local_source_registry_reconciled_not_deployment_certified','verification status must stay local, not deployment');
assert(!/^(source_code_verified|deployment_certified|production_certified)$/.test(v.status));
assert.deepEqual(v.missing_authoritative_sources,[]);
assert.equal(v.source_catalog_path,'services/conocimiento/catalogo.json');
assert.match(v.source_catalog_sha256,/^[0-9a-f]{64}$/);
assert.match(v.count_semantics,/not a certification of the PythonAnywhere deployment/);
assert.match(v.count_semantics,/not a count of complete end-to-end processes/);
assert.match(v.repository_checked,/Not the PythonAnywhere deployment/);
for(const [name,r] of Object.entries(v.code_registries)){assert(r.path&&/^[0-9a-f]{64}$/.test(r.sha256),'registry evidence '+name)}
assert.equal(v.code_registries.typed_semantic_keys.sha256,v.source_catalog_sha256);
// Editorial vs technical identifiers: separate fields, never interchangeable.
const editorial=/^F\d{2}(\/\d{2})?$/;
const keys=model.families.flatMap(f=>f.keys);
for(const k of keys){
  assert.match(k.display_id,editorial,'display_id stays an editorial locator');
  assert.equal(typeof k.canonical_key_id,'string');
  assert.match(k.canonical_key_id,/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/,'canonical key format '+k.display_id);
  assert(!editorial.test(k.canonical_key_id),'display ID used as canonical ID');
  assert.equal(k.canonical_id_status,'verified_local_source_registry');
  assert.equal(k.source_status,'source_code_verified_local');
  assert.equal(k.source_evidence.path,v.source_catalog_path);
  assert.equal(k.source_evidence.sha256,v.source_catalog_sha256);
  assert(Number.isInteger(k.source_evidence.line)&&k.source_evidence.line>0);
}
same(new Set(keys.map(k=>k.canonical_key_id)),54,'canonical key ids unique');
// Frozen binding digest: any change to an Fxx/NN→canonical pair must be re-verified against app source and this digest updated deliberately.
const digest=crypto.createHash('sha256').update(keys.map(k=>k.display_id+'='+k.canonical_key_id).join('\n')).digest('hex');
assert.equal(digest,'710d525b000aace67acbda3925bf8e4f2261e9194f80d1f90364cce9bd22e29d','binding digest changed');
assert.equal(keys.find(k=>k.display_id==='F01/01').canonical_key_id,'marca.descripcion');
assert.equal(keys.find(k=>k.display_id==='F03/01').canonical_key_id,'presupuesto.mensual');
// Exact registries (services/conocimiento/unidad.py TIPOS; services/cerebro/contracts.py DECISION_KINDS / REC_KINDS).
assert.deepEqual(model.knowledge_types.map(t=>t.canonical_id),['dato_declarado','observacion','estimacion','metrica_derivada','hallazgo_cualitativo','restriccion','hipotesis','interpretacion','aprendizaje','recomendacion','decision']);
assert.deepEqual(model.knowledge_types.map(t=>t.ordinal),[1,2,3,4,5,6,7,8,9,10,11]);
assert.deepEqual(model.cerebro_decision_domains.map(d=>d.canonical_domain_id),['brand_strategy','audience_recommendation','campaign_preflight','campaign_learning','brand_panorama']);
assert.deepEqual(model.recommendation_types.map(r=>r.canonical_type_id),['priority','channel_role','campaign_blueprint','postpone','research','presence','measurement','audience','ai_reading','learning_proposal']);
const defer=model.recommendation_types.find(r=>r.presentation_id==='defer');
assert(defer&&defer.canonical_type_id==='postpone','presentation defer must map to canonical postpone');
assert(!model.recommendation_types.some(r=>r.canonical_type_id==='defer'),'defer is editorial, not canonical');
assert(!model.recommendation_types.some(r=>r.presentation_id==='postpone'),'postpone is canonical, not editorial');
// Architecture.
assert(architecture.page_map.length===14);
same(new Set(architecture.page_map.map(x=>x.site+':'+x.url)),14,'page map');
assert.equal(architecture.page_map.filter(x=>x.expected_new_route).length,1);
assert.equal(architecture.visual_metaphors.loop.steps.length,6);
assert.equal(architecture.asset_map.length,5);
console.log('R05-01 PASS: 19 families; 54 typed keys bound to canonical IDs; 11 knowledge types; 20 profiles; 5 domains; 10 recommendations (defer→postpone); 14 pages; 5 assets. Verified against local app source registries; not a PythonAnywhere deployment certification nor a count of complete processes.');
