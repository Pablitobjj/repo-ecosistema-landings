#!/usr/bin/env python3
"""Generate 1200x630 Open Graph JPEG assets for Hispaño and DELTA DAWN.
No external network, fonts, private data, or generative API required; requires Pillow.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import argparse, math, random

W,H=1200,630
S=2
FONT_REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_MONO='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
FONT_MONO_BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'

def rgb(hexcol):
    h=hexcol.lstrip('#')
    return tuple(int(h[i:i+2],16) for i in (0,2,4))

def font(path, size):return ImageFont.truetype(path,int(size*S))

def coords(p):return tuple(int(v*S) for v in p)

def text(draw, xy, val, size, fill, f=FONT_BOLD, tracking=0, anchor=None):
    if not tracking: draw.text(coords(xy),val,font=font(f,size),fill=fill,anchor=anchor);return
    xx,yy=xy
    ft=font(f,size)
    for ch in val:
        draw.text(coords((xx,yy)),ch,font=ft,fill=fill)
        xx+=(draw.textlength(ch,font=ft)/S+tracking)

def line(d, pts, color, width=2):d.line([coords(p) for p in pts],fill=color,width=max(1,int(width*S)),joint='curve')

def ellipse(d, box, fill=None, outline=None, width=1):d.ellipse(coords(box),fill=fill,outline=outline,width=int(width*S))

def rectangle(d, box, fill=None, outline=None, width=1):d.rectangle(coords(box),fill=fill,outline=outline,width=max(1,int(width*S)))

def glow(im,x,y,radius,col,maxa=115):
    glowlayer=Image.new('RGBA',im.size,(0,0,0,0));g=ImageDraw.Draw(glowlayer)
    c=rgb(col)
    ellipse(g,(x-radius,y-radius,x+radius,y+radius),fill=(*c,maxa))
    glowlayer=glowlayer.filter(ImageFilter.GaussianBlur(int(radius*.6*S)))
    im.alpha_composite(glowlayer)

def render_hispano():
    # Palette sampled from hispano/public/hispano_index.html, no new claims.
    im=Image.new('RGBA',(W*S,H*S),(8,19,47,255));pix=im.load()
    for y in range(H*S):
        for x in range(W*S):
            xn=x/(W*S);yn=y/(H*S)
            violet=max(0,1-math.hypot(xn-.98,yn-.15)/.85)
            px=(int(8+20*xn+41*violet),int(22+35*xn-7*violet),int(49+56*xn+38*violet),255)
            pix[x,y]=px
    glow(im,920,260,215,'#6D1B8F',85)
    glow(im,1045,525,150,'#2DD4BF',80)
    d=ImageDraw.Draw(im)
    for xx in range(30,1200,55): line(d,[(xx,0),(xx,H)],(59,89,130,35),1)
    for yy in range(25,630,55): line(d,[(0,yy),(W,yy)],(59,89,130,35),1)
    rectangle(d,(72,75,114,85),fill='#2DD4BF')
    text(d,(126,66),'HISPAÑO',19,'#FFFFFF',FONT_BOLD,tracking=3)
    text(d,(72,148),'CULTURAL',68,'#FFFFFF',FONT_BOLD)
    text(d,(72,226),'INTELLIGENCE',59,'#2DD4BF',FONT_BOLD)
    text(d,(75,332),'For Hispanic advertising',31,'#F1F6FF',FONT_REG)
    text(d,(75,380),'Research • Planning • Activation',20,'#A8D9E1',FONT_REG)
    rectangle(d,(75,443,365,446),fill='#2DD4BF')
    text(d,(75,474),'Culture becomes actionable.',19,'#D9E7FF',FONT_REG)
    text(d,(75,569),'HISPAN.IO',16,'#A4B4D1',FONT_MONO_BOLD,tracking=3)
    random.seed(42)
    continent=[
      (778,115),(869,96),(938,124),(949,172),(925,207),(885,213),(856,250),
      (835,277),(853,303),(913,306),(945,336),(929,370),(908,399),
      (892,451),(876,498),(852,539),(831,542),(815,499),(802,459),
      (789,425),(783,397),(757,365),(727,347),(720,314),(738,290),
      (740,253),(720,217),(737,170)
    ]
    def inside(px,py):
       c=False
       j=len(continent)-1
       for i in range(len(continent)):
           xi,yi=continent[i];xj,yj=continent[j]
           if (yi>py)!=(yj>py) and px<(xj-xi)*(py-yi)/(yj-yi+1e-9)+xi:c=not c
           j=i
       return c
    for yy in range(112,550,16):
        for xx in range(702,982,16):
            if inside(xx,yy) and random.random()>.16:
                col='#2DD4BF' if xx+yy>1180 and random.random()>.6 else '#7694C8'
                ellipse(d,(xx,yy,xx+3.8,yy+3.8),fill=col)
    ellipse(d,(683,75,1033,559),outline='#406A8D',width=2)
    ellipse(d,(715,105,1001,529),outline='#315673',width=1)
    for a,b in [((751,195),(913,345)),((774,324),(854,492)),((860,141),(783,405))]:
        line(d,[a,b],'#2DD4BF',1.5)
    for x,y in [(751,195),(913,345),(774,324),(854,492),(860,141),(783,405)]:
        ellipse(d,(x-7,y-7,x+7,y+7),outline='#2DD4BF',width=2)
        ellipse(d,(x-2,y-2,x+2,y+2),fill='#2DD4BF')
    rectangle(d,(987,116,1113,147),fill='#173C67')
    text(d,(1000,121),'US + LATAM',14,'#CCFFF4',FONT_BOLD)
    return im.convert('RGB').resize((W,H),Image.Resampling.LANCZOS)

def render_caracas():
    # Palette and copy follow operacion-caracas-site/styles.css and index.html.
    im=Image.new('RGBA',(W*S,H*S),(4,4,5,255));d=ImageDraw.Draw(im)
    rectangle(d,(0,0,W,H),fill='#090909')
    for yy in range(0,630,7):line(d,[(0,yy),(W,yy)],'#121212',1)
    for xx in range(0,1200,42):line(d,[(xx,0),(xx,630)],'#111111',1)
    glow(im,935,310,200,'#FF0000',95)
    glow(im,1130,515,120,'#FFD700',52)
    d=ImageDraw.Draw(im)
    d.polygon([coords(p) for p in [(0,0),(310,0),(0,135)]],fill='#800808')
    d.polygon([coords(p) for p in [(1140,0),(1200,0),(1200,330)]],fill='#8B0707')
    rectangle(d,(72,81,218,87),fill='#FF0000')
    text(d,(72,103),'▼ DELTA FORCE ▼',19,'#B4B4B4',FONT_MONO_BOLD,tracking=2)
    text(d,(72,170),'DELTA',91,'#F8F8F8',FONT_MONO_BOLD)
    text(d,(72,256),'DAWN',109,'#FFD700',FONT_MONO_BOLD)
    text(d,(74,389),'OPERACIÓN CARACAS',31,'#FF2020',FONT_MONO_BOLD)
    text(d,(76,440),'ARCADE  /  RUN & GUN',20,'#DFDFDF',FONT_MONO)
    rectangle(d,(74,508,360,563),fill='#A80000',outline='#FFD700',width=2)
    text(d,(92,524),'INICIAR MISIÓN  >',17,'#FFFFFF',FONT_MONO_BOLD)
    text(d,(76,582),'CARACAS • 2026',13,'#8A8A8A',FONT_MONO_BOLD,tracking=2)
    random.seed(7)
    line(d,[(650,430),(740,375),(825,390),(900,342),(965,361),(1045,299),(1200,378)],'#5C0909',5)
    for x,ww,hh in [(664,37,90),(706,54,139),(775,34,104),(816,54,174),(887,28,132),(933,63,208),(1011,35,155),(1066,73,190),(1150,59,133)]:
        ybase=551
        rectangle(d,(x,ybase-hh,x+ww,ybase),fill='#1B1B1B',outline='#4E1010',width=1)
        for wy in range(ybase-hh+12,ybase-6,17):
            for wx in range(x+9,x+ww-3,13):
                if random.random()>.56:rectangle(d,(wx,wy,wx+4,wy+8),fill='#BB5208')
    rectangle(d,(628,549,1200,580),fill='#300808')
    for xx in range(650,1200,75):rectangle(d,(xx,564,xx+35,568),fill='#FFD700')
    ellipse(d,(795,165,1089,459),outline='#FF2929',width=3)
    ellipse(d,(843,214,1041,412),outline='#FF2020',width=2)
    line(d,[(941,140),(941,483)],'#FF3636',2)
    line(d,[(767,312),(1114,312)],'#FF3636',2)
    ellipse(d,(929,300,953,324),fill='#FFD700')
    rectangle(d,(1000,84,1140,124),fill='#1A0707',outline='#CC2B2B',width=1)
    text(d,(1010,94),'01 / 2026',15,'#FFD700',FONT_MONO_BOLD)
    rectangle(d,(0,0,1200,6),fill='#FF0000')
    rectangle(d,(0,624,1200,630),fill='#FFD700')
    return im.convert('RGB').resize((W,H),Image.Resampling.LANCZOS)

if __name__=='__main__':
    ap=argparse.ArgumentParser()
    ap.add_argument('--brand',required=True,choices=['hispano','caracas'])
    ap.add_argument('--output',required=True)
    a=ap.parse_args()
    im=render_hispano() if a.brand=='hispano' else render_caracas()
    p=Path(a.output);p.parent.mkdir(parents=True,exist_ok=True)
    im.save(p,'JPEG',quality=87,subsampling=0,optimize=True,progressive=True)
    print(f'{p} {im.size} {p.stat().st_size} bytes')
