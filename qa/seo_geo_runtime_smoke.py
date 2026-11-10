import json, ssl, urllib.request, urllib.error, xml.etree.ElementTree as ET, os
UA="SEO-GEO-Command-Center/QA"
MARK="CBPRICING-QA-20261109-S6"
results=[]
def fetch(u,p=None):
    q=urllib.request.Request(u,data=p,headers={"User-Agent":UA,"Accept":"application/json" if p else "*/*","Content-Type":"application/json" if p else "text/plain"},method="POST" if p else "GET")
    try:
        with urllib.request.urlopen(q,timeout=20,context=ssl.create_default_context()) as r:return r.status,r.url,dict(r.headers),r.read(900000)
    except urllib.error.HTTPError as e:return e.code,e.url,dict(e.headers),e.read(2000)
    except Exception as e:return None,str(e),{},b""
def test(n,u,func):
    code,end,hd,body=fetch(u)
    good,detail=func(code,end,hd,body)
    results.append({"test":n,"status":"PASS" if good else "FAIL","http":code,"detail":str(detail)[:140],"url":u})
    print("QA_RESULT "+json.dumps(results[-1],ensure_ascii=False))
def text_ok(expected):
    return lambda c,e,h,b: (c==200 and expected.encode() in b,"match="+str(expected.encode() in b))
for site,paths in [
  ("https://www.hispan.io",["platform","insights","resources","insights-analysis","hispanic-latino-latinx","miami-awakening","reporte-insights","whitepaper"]),
  ("https://www.culturalbrain.net",["about","pricing","resources"])
]:
    for path in paths:
        url=site+"/"+path
        test("canonical "+path,url,text_ok('<link rel="canonical" href="'+url+'">'))
for name,url in [
    ("OG Hispaño","https://www.hispan.io/images/og-hispano-authority.jpg"),
    ("OG Caracas","https://www.operationcaracas.com/og-cover.jpg")
]:
    test(name,url,lambda c,e,h,b:(c==200 and b[:2]==b"\xff\xd8" and "image/jpeg" in h.get("Content-Type","").lower(),"type="+h.get("Content-Type","")+" magic="+b[:2].hex()))
root="https://www.operationcaracas.com"
test("Caracas canonical",root+"/",text_ok('<link rel="canonical" href="'+root+'/">'))
c,e,h,b=fetch(root+"/")
s=b.decode('utf-8','replace')
for line in s.splitlines():
    if 'canonical' in line.lower() or 'og:url' in line.lower():
        print("CARACAS_META_LINE "+line.strip()[:500])
print("CARACAS_LIVE_DEBUG "+json.dumps({"HTTP":c,"final":e,"bytes":len(b),"doctype":s[:100]}))

test("Caracas robots",root+"/robots.txt",text_ok("Sitemap: "+root+"/sitemap.xml"))
def sitemap(c,e,h,b):
    try:
        x=ET.fromstring(b);urls=[y.text for y in x.iter() if y.tag.endswith("loc")]
        return (c==200 and urls==[root+"/"],str(urls))
    except Exception as ex:return False,str(ex)
test("Caracas sitemap",root+"/sitemap.xml",sitemap)
test("Caracas /play",root+"/play",lambda c,e,h,b:(c==200 and len(b)>100,"bytes "+str(len(b))))
test("ALINODO canonical www","https://www.alinodo.xyz/",text_ok('<link rel="canonical" href="https://www.alinodo.xyz/">'))
test("ALINODO robots","https://www.alinodo.xyz/robots.txt",text_ok("User-agent"))
test("ALINODO sitemap","https://www.alinodo.xyz/sitemap.xml",text_ok("<urlset"))
if os.getenv("RUN_FORMSPARK_TEST")=="1":
    payload={"name":"QA "+MARK,"company":"TEST ONLY - NO SALES","email":"qa-seogeo@example.com","interest":"Enterprise Demo","form_source":"culturalbrain_pricing","page_url":"https://www.culturalbrain.net/pricing","language":"es","qa_marker":MARK}
    c,e,h,b=fetch("https://submit-form.com/X1HimpPDC",json.dumps(payload).encode())
    results.append({"test":"Formspark synthetic Pricing POST","status":"PASS" if c and 200<=c<300 else "FAIL","http":c,"marker":MARK,"detail":"Inbox receipt must be checked independently"})
    print("QA_RESULT "+json.dumps(results[-1]))
print("QA_SUMMARY "+json.dumps({"passed":sum(x["status"]=="PASS" for x in results),"failed":sum(x["status"]=="FAIL" for x in results),"total":len(results),"marker":MARK}))
