import urllib.request, urllib.error, urllib.parse, time, json, re, html, collections, concurrent.futures
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

ROOT="https://masterenmarketingdigital.cc"
UA="Mozilla/5.0 (compatible; ELJAB-SEO-GEO-QA/1.0; +https://masterenmarketingdigital.cc/)"
HEADERS={"User-Agent":UA,"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}
def get(url,timeout=22):
    t=time.monotonic()
    try:
        req=urllib.request.Request(url,headers=HEADERS)
        with urllib.request.urlopen(req,timeout=timeout) as r:
            body=r.read(1400000)
            enc=r.headers.get_content_charset() or "utf-8"
            return r.status,r.url,dict(r.headers),body.decode(enc,"replace"),round((time.monotonic()-t)*1000)
    except urllib.error.HTTPError as e:
        return e.code,e.url,dict(e.headers),"",round((time.monotonic()-t)*1000)
    except Exception as e:
        return 0,url,{},str(e),round((time.monotonic()-t)*1000)
def cleanurl(raw,base):
    try:
        url=urllib.parse.urljoin(base,html.unescape(raw))
        p=urllib.parse.urlparse(url)
        if p.netloc.lower() not in ("masterenmarketingdigital.cc","www.masterenmarketingdigital.cc"):return None
        return urllib.parse.urlunparse(("https","masterenmarketingdigital.cc",p.path.rstrip("/") or "/","","",""))
    except: return None
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title="";self.h1=[];self.h2=0;self.meta={};self.canonical="";self.links=[];self.ld=[];self.imgs=0;self.img_missing=0;self.alltext=[];self.maintext=[]
        self.stack=[];self.in_title=False;self.in_h1=False;self.in_json=False;self.json_buf=[];self.skip=0;self.main=0;self.header_tags=[];self.hreflangs=[];self.anchors=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.stack.append(tag)
        if tag in ("script","style","noscript","svg") and not self.skip:self.skip=1
        elif self.skip:self.skip+=1
        if tag=="main":self.main+=1
        if tag=="title":self.in_title=True
        if tag=="h1":self.in_h1=True;self.h1.append("")
        if tag=="h2":self.h2+=1
        if tag in ("h1","h2","h3","h4"):self.header_tags.append(tag)
        if tag=="meta":
            k=a.get("name",a.get("property","")).lower()
            if k:self.meta[k]=a.get("content","").strip()
        if tag=="link":
            rel=a.get("rel","").lower()
            if "canonical" in rel:self.canonical=a.get("href","")
            if "alternate" in rel and a.get("hreflang"):self.hreflangs.append(a.get("hreflang"))
        if tag=="a" and a.get("href"):self.links.append(a["href"]);self.anchors+=1
        if tag=="img":
            self.imgs+=1
            if not (a.get("alt") or "").strip():self.img_missing+=1
        if tag=="script" and "ld+json" in a.get("type","").lower():self.in_json=True;self.json_buf=[]
    def handle_endtag(self,tag):
        if tag=="title":self.in_title=False
        if tag=="h1":self.in_h1=False
        if tag=="main":self.main=max(0,self.main-1)
        if tag=="script" and self.in_json:self.in_json=False;self.ld.append("".join(self.json_buf))
        if self.stack:self.stack.pop()
        if self.skip:self.skip-=1
    def handle_data(self,data):
        if self.in_json:self.json_buf.append(data)
        if self.skip:return
        txt=re.sub(r"\s+"," ",data).strip()
        if not txt:return
        if self.in_title:self.title+=txt
        if self.in_h1 and self.h1:self.h1[-1]+=txt
        self.alltext.append(txt)
        if self.main:self.maintext.append(txt)
def types_ld(ld):
    found=set(); invalid=0
    def rec(o):
        if isinstance(o,dict):
            t=o.get("@type")
            for ty in (t if isinstance(t,list) else [t]):
                if isinstance(ty,str):found.add(ty)
            for sub in o.values():rec(sub)
        if isinstance(o,list):
            for sub in o:rec(sub)
    for a in ld:
        try:rec(json.loads(a))
        except Exception:invalid+=1
    return ",".join(sorted(found))[:140],invalid
def audit(job):
    no,url=job
    status,final,hd,body,latency=get(url)
    row={"n":no,"url":url,"status":status,"final":final if final!=url else "","ms":latency,"title":"","desc":"","canon":"","robots":"","h1":0,"h1txt":"","words":0,"og":0,"tw":0,"schema":"","schemaErr":0,"images":0,"missingAlt":0,"internal":0,"hreflang":"","links":[],"xrobots":hd.get("X-Robots-Tag",""),"error":""}
    if status!=200:row["error"]=body[:100] if not status else f"HTTP {status}";return row
    p=Page()
    try:p.feed(body)
    except Exception as e:row["error"]="HTML parse: "+str(e)[:80]
    linked=set(filter(None,(cleanurl(h,url) for h in p.links)))
    typ,lderr=types_ld(p.ld)
    words=len(re.findall(r"\b[\wÁÉÍÓÚÜÑáéíóúüñ]+\b", " ".join(p.maintext or p.alltext)))
    row.update({"title":p.title,"desc":p.meta.get("description",""),"canon":p.canonical,"robots":p.meta.get("robots",""),"h1":len(p.h1),"h1txt":" | ".join(p.h1)[:160],"words":words,"og":int(bool(p.meta.get("og:title")))+int(bool(p.meta.get("og:image")))+int(bool(p.meta.get("og:description"))),"tw":int(bool(p.meta.get("twitter:card"))),"schema":typ,"schemaErr":lderr,"images":p.imgs,"missingAlt":p.img_missing,"internal":len(linked),"hreflang":",".join(p.hreflangs),"links":sorted(linked)})
    return row

st,final,headers,sitemap,ms=get(ROOT+"/sitemap.xml")
if st!=200: raise RuntimeError("sitemap HTTP "+str(st)+" "+sitemap[:150])
try:
    xm=ET.fromstring(sitemap)
    urls=[x.text.strip() for x in xm.iter() if x.tag.endswith("loc") and x.text]
except Exception:
    urls=re.findall(r"https://masterenmarketingdigital\.cc/[^<\" ]*",sitemap)
urls=list(dict.fromkeys(urls))
print("ELJAB_START "+json.dumps({"count":len(urls),"sitemapHttp":st,"sitemapBytes":len(sitemap),"fetchMs":ms,"home":ROOT}))
assert len(urls)==75,("Expected 75 URLs; manual review needed",len(urls))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    rows=list(pool.map(audit,enumerate(urls,1)))
inbound=collections.Counter()
inmap={r["url"]:set(r.pop("links",[])) for r in rows}
for links in inmap.values():
    for link in links:inbound[link]+=1
tc=collections.Counter(r["title"].strip().lower() for r in rows if r["title"])
dc=collections.Counter(r["desc"].strip().lower() for r in rows if r["desc"])
def issues(r):
    out=[]
    if r["status"]!=200:out.append("HTTP_"+str(r["status"]))
    if r["status"]==200:
        if r["canon"].rstrip("/")!=r["url"].rstrip("/"):out.append("CANONICAL")
        if "noindex" in (r["robots"]+" "+r["xrobots"]).lower():out.append("NOINDEX")
        if not r["title"]:out.append("TITLE_MISSING")
        elif tc[r["title"].lower()] > 1:out.append("TITLE_DUP")
        elif len(r["title"])>65:out.append("TITLE_LONG")
        elif len(r["title"])<25:out.append("TITLE_SHORT")
        if not r["desc"]:out.append("DESC_MISSING")
        elif dc[r["desc"].lower()]>1:out.append("DESC_DUP")
        elif len(r["desc"])>165:out.append("DESC_LONG")
        if r["h1"]!=1:out.append("H1_"+str(r["h1"]))
        if r["words"]<170 and not any(z in r["url"] for z in ("/herramientas/","/privacidad")):out.append("THIN_"+str(r["words"]))
        if r["missingAlt"]>0:out.append("IMG_ALT_"+str(r["missingAlt"]))
        if r["schemaErr"]>0:out.append("SCHEMA_INVALID")
        if r["og"]<3:out.append("OG_"+str(r["og"]))
        if r["ms"]>3000:out.append("SLOW_"+str(r["ms"]))
        if inbound[r["url"]]==0 and r["url"]!=ROOT+"/":out.append("NO_INBOUND")
    return out
for r in rows:
    r["inbound"]=inbound[r["url"]];r["issues"]=issues(r)
    r["linksOut"]=r.pop("internal")
    print("ELJAB_ROW "+json.dumps(r,ensure_ascii=False,separators=(",",":")))
codes=collections.Counter(str(r["status"]) for r in rows)
issuecounts=collections.Counter(z for r in rows for z in r["issues"])
classes=collections.Counter((r["url"][len(ROOT):].strip("/").split("/")[0] or "home") for r in rows)
externalLinked=[x for x in inbound if x not in urls]
summary={"count":len(rows),"http":dict(codes),"issues":dict(issuecounts.most_common()),"categories":dict(classes.most_common()),"sitePagesNoInbound":[r["url"] for r in rows if r["inbound"]==0 and r["url"]!=ROOT+"/"],"linkedOutsideSitemap":externalLinked[:45],"linksOutsideSitemapTotal":len(externalLinked),"sitemap":ROOT+"/sitemap.xml"}
print("ELJAB_SUMMARY "+json.dumps(summary,ensure_ascii=False,separators=(",",":")))
