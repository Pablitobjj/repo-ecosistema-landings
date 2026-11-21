'use strict'; // Rebuild browser-served copies from canonical release05 manifests.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const pairs=[
['release05/intelligence-universe/model.v1.json','culturalbrain/public/assets/data/cb-universe-model.v1.json'],
['release05/intelligence-universe/architecture.v1.json','culturalbrain/public/assets/data/cb-universe-architecture.v1.json']
];
for(const [src,dest] of pairs){const x=fs.readFileSync(path.join(root,src));fs.mkdirSync(path.dirname(path.join(root,dest)),{recursive:true});fs.writeFileSync(path.join(root,dest),x);console.log('SYNC',src,'→',dest)}
