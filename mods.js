/* mods.js: مهارات خاصة لكل شخصية + شكل أنمي. بيتحمّل بعد السكريبت الرئيسي */
(()=>{
TY.push('special');
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const later=(s,f)=>{(G.T=G.T||[]).push({t:s,f})};
const mark=(x,y,r,s,c,sq,o)=>{(G.M=G.M||[]).push({x,y,r,t:s,tot:s,c,sq,o})};
const zone=(x,y,r,s,c,o,d,w=.5)=>{(G.Z=G.Z||[]).push({x,y,r,t:s+w,w,c,o,d,k:0})};
const clampA=e=>{const r=Math.hypot(e.x,e.y),m=A-e.r;if(r>m){e.x*=m/r;e.y*=m/r}};

/* ===== المهارات الخاصة (sx في بيانات الشخصية بيشاور عليها) ===== */
const SP={
 red(i,s,e,t,a){e.lr=G.t;if(e.blue>0)e.pur=4;G.s.push({o:i,k:1,x:e.x,y:e.y,vx:Math.cos(a)*s.v,vy:Math.sin(a)*s.v,dmg:s.dmg,ex:s.ex,bn:0,col:'#ff3b4f',life:2.5,big:1,sz:s.ex*.16,rep:1})},
 dis(i,s,e,t){for(let n=0;n<5;n++){const ox=t.x+(Math.random()-.5)*90,oy=t.y+(Math.random()-.5)*90,dl=.4+n*.12;
   mark(ox,oy,48,dl,'#ff9aa8');
   later(dl,()=>{const q=G.p[1-i];slashFx(ox,oy,'#ff4d5e',2,52);G.shk=.1;if(D(q,{x:ox,y:oy})<48+q.r)dmgTo(1-i,s.dmg)})}},
 fuga(i,s,e,t){e.stun=Math.max(e.stun,.8);pop(e,'فوغا...','#ff9a3c');ring(e.x,e.y,'#ff9a3c',70);
   later(.8,()=>{const q=G.p[1-i],a=Math.atan2(q.y-e.y,q.x-e.x);G.s.push({o:i,k:2,x:e.x,y:e.y,vx:Math.cos(a)*560,vy:Math.sin(a)*560,dmg:s.dmg,ex:s.ex,bn:0,col:'#ff7a1c',life:2.5,big:1,sz:s.ex*.16,burn:1});G.shk=.25})},
 bolt(i,s,e,t,a){lightningFx(e.x,e.y);e.x=t.x-Math.cos(a)*48;e.y=t.y-Math.sin(a)*48;clampA(e);
   lightningFx(t.x,t.y);G.shk=.2;if(dmgTo(1-i,s.dmg)>0){t.stun=Math.max(t.stun,.5);pop(t,'صعق!','#9fd0ff')}},
 field(i,s,e,t){zone(t.x,t.y,85,3.5,'#60a5fa',i,s.dmg);mark(t.x,t.y,85,.5,'#60a5fa')},
 storm(i,s,e,t){for(let n=0;n<7;n++){const ox=t.x+(n?(Math.random()-.5)*160:0),oy=t.y+(n?(Math.random()-.5)*160:0),dl=.35+n*.18;
   mark(ox,oy,42,dl,'#9333ea');
   later(dl,()=>{const q=G.p[1-i];lightningFx(ox,oy);G.shk=.12;if(D(q,{x:ox,y:oy})<42+q.r)dmgTo(1-i,s.dmg)})}},
 glass(i,s,e){mark(e.x,e.y,46,.6,'#7ee8c9',1,e);pop(e,'إطار...','#7ee8c9');
   later(.6,()=>{if(e.hp<=0)return;e.haste=s.dur||5;e.dcd=0;slashFx(e.x,e.y,'#bff7ea',7,62);ring(e.x,e.y,'#7ee8c9',95);G.shk=.22;pop(e,'كسر الزجاج: سرعة!','#7ee8c9');
     const q=G.p[1-i];if(D(e,q)<95+q.r)dmgTo(1-i,s.dmg)})},
 frames(i,s,e,t){const ox=t.x,oy=t.y;mark(ox,oy,62,.55,'#7ee8c9',1);
   later(.55,()=>{const q=G.p[1-i];slashFx(ox,oy,'#bff7ea',4,50);G.shk=.12;
     if(D(q,{x:ox,y:oy})<62+q.r&&dmgTo(1-i,s.dmg)>0){q.stun=Math.max(q.stun,1.3);pop(q,'اتجمّد في الإطار','#7ee8c9')}})},
 blitz(i,s,e){const n=e.haste>0?5:3;for(let k=0;k<n;k++)later(k*.17,()=>{const q=G.p[1-i];if(e.hp<=0||q.hp<=0)return;
   const a=Math.random()*6.28;e.x=q.x+Math.cos(a)*50;e.y=q.y+Math.sin(a)*50;clampA(e);e.face=q.x>e.x?1:-1;e.dx=0;e.dy=0;e.dash=.14;
   slashFx(q.x,q.y,'#bff7ea',3,48);G.shk=.1;dmgTo(1-i,s.dmg)})},
 rain(i,s,e,t){for(let n=0;n<5;n++){const ox=t.x+(n?(Math.random()-.5)*150:0),oy=t.y+(n?(Math.random()-.5)*150:0);
   later(n*.2,()=>mark(ox,oy,50,.45,'#7ee8c9',1));
   later(.45+n*.2,()=>{const q=G.p[1-i];slashFx(ox,oy,'#bff7ea',3,45);if(D(q,{x:ox,y:oy})<50+q.r&&dmgTo(1-i,s.dmg)>0)q.stun=Math.max(q.stun,.5)})}}
};
function doBlz(i){const e=G.p[i],c=CH[e.k],b=c.bz||{n:'اندفاع 24 إطار',cd:11,hits:3,dmg:28,col:c.col,fx:'cut'};
  if(G.st!=='play'||e.bzcd>0||e.stun>0||e.dc>0)return;
  const ult=e.ult>0,n=b.hits+(e.haste>0?2:0)+(ult?2:0),dm=b.dmg*(ult?1.8:1);e.bzcd=b.cd;if(i===1)G.bc=G.t;
  for(let k=0;k<n;k++)later(k*.17,()=>{const q=G.p[1-i];if(G.st!=='play'||e.hp<=0||q.hp<=0)return;
    (G.Gh=G.Gh||[]).push({x:e.x,y:e.y,t:.35,c:b.col});
    const a=Math.random()*6.28;e.x=q.x+Math.cos(a)*52;e.y=q.y+Math.sin(a)*52;clampA(e);e.face=q.x>e.x?1:-1;e.dx=0;e.dy=0;e.dash=.14;
    if(b.fx==='bolt'){lightningFx(q.x,q.y);lightningFx(e.x,e.y)}
    else if(b.fx==='step'){ring(e.x,e.y,b.col,60);slashFx(q.x,q.y,b.col,2,36)}
    else if(b.fx==='frame'){slashFx(q.x,q.y,'#bff7ea',3,48);mark(q.x,q.y,34,.18,b.col,1)}
    else slashFx(q.x,q.y,b.col,5,55);
    G.shk=.1;const h=q.hp;dmgTo(1-i,dm);if(k===n-1&&b.stunEnd&&q.hp<h)q.stun=Math.max(q.stun,b.stunEnd)})}
CH.gojo.sk[1]={n:'أحمر طرد',t:'special',sx:'red',cd:6,dmg:60,ex:90,v:380,u:{dmg:130,ex:190}};
CH.suk.sk[0]={n:'تفكيك',t:'special',sx:'dis',cd:4.5,dmg:34};
CH.suk.sk[2]={n:'فوغا',t:'special',sx:'fuga',cd:9,dmg:150,ex:110,u:{dmg:260,ex:190}};
CH.kashimo.sk=[{n:'برق خاطف',t:'special',sx:'bolt',cd:5,dmg:70},{n:'مجال صاعق',t:'special',sx:'field',cd:8,dmg:26},{n:'عاصفة رعدية',t:'special',sx:'storm',cd:9,dmg:55}];
CH.naoya={n:'ناويه زينين',style:'naoya',hp:1400,col:'#f5d547',sp:215,rng:120,
  sk:[{n:'إطار الزجاج',t:'special',sx:'glass',cd:10,dmg:40,dur:5},{n:'تجميد الإطار',t:'special',sx:'frames',cd:7,dmg:50},{n:'اندفاع 24 إطار',t:'special',sx:'blitz',cd:8,dmg:30}],
  dom:{n:'مسار الـ24 إطار',type:'shrine',tick:.25,dmg:26,dur:7}};
const HP_MULT=2.5;/* غيّر الرقم ده عشان تطوّل أو تقصّر الماتش */
['gojo','suk','kashimo','naoya'].forEach(k=>{CH[k].hp=Math.round(CH[k].hp*HP_MULT)});
CH.naoya.sk[2]={n:'مطر الإطارات',t:'special',sx:'rain',cd:9,dmg:28};
/* اندفاع الـ24 إطار: زر رابع لكل الشخصيات. bz في بيانات الشخصية بيغيّر الاسم والدمج والمؤثرات (fx: cut / step / bolt / frame) */
CH.gojo.bz={n:'خطوة اللانهاية',cd:11,hits:4,dmg:24,col:'#4fc3ff',fx:'step'};
CH.suk.bz={n:'تقطيع متتالي',cd:11,hits:4,dmg:30,col:'#ff4d5e',fx:'cut'};
CH.kashimo.bz={n:'برق متتالي',cd:11,hits:4,dmg:26,col:'#60a5fa',fx:'bolt',stunEnd:.5};
CH.naoya.bz={n:'اندفاع 24 إطار',cd:9,hits:3,dmg:30,col:'#7ee8c9',fx:'frame'};
/* توجي: ملوش طاقة ملعونة ولا مجال ولا تقنية. مهاراته سلاح ومجهود جسدي بس */
CH.toji={n:'توجي',style:'toji',hp:Math.round(1400*HP_MULT),col:'#c9d3e6',sp:215,rng:140,
  sk:[{n:'رمح العكس',t:'beam',cd:4.5,dmg:120,w:42,col:'#e8eef8'},
      {n:'قطع الكاتانا',t:'slash',cd:2.4,dmg:42,cnt:4,v:700,col:'#dfe7f5'},
      {n:'رمية الرمح',t:'orb',cd:7,dmg:115,ex:85,v:460,bn:0,col:'#c9d3e6',u:{dmg:210,ex:140}}],
  dom:{n:'ضربة الكاتانا',type:'none',tick:1,dmg:0,dur:0},
  bz:{n:'ضربات السيفين',cd:10,hits:5,dmg:28,col:'#c9d3e6',fx:'cut'},
  noDom:true,domLabel:'ضربة الكاتانا',noHeal:true,healLabel:'بدون طاقة'};
/* ===== ضبط الماتش: الدم كبير، والمجال نادر، والضرر قابل للتعديل ===== */
const HP_BIG=32000;/* الدم لكل الشخصيات */
const DOM_CD=60;/* ثواني بين كل مجال والتاني */
const DMG_MULT=1;/* لو عايز الماتش أسرع زوّده (مثلاً 1.5)، ولو أطول قلله (مثلاً 0.7) */
/* دم مختلف لكل شخصية، كلهم فوق 30000 */
const HP_TABLE={gojo:36000,suk:34000,kashimo:31000,naoya:33000,toji:35000};
Object.keys(CH).forEach(k=>{CH[k].hp=HP_TABLE[k]||HP_BIG});

/* ===== ربط المهارات الخاصة باللعبة ===== */
const _use=use;
use=function(i,k,tx,ty){
  if(!isFinite(tx)||!isFinite(ty)){tx=undefined;ty=undefined}
  if(k==='blz'){if(G&&G.st==='play')doBlz(i);return}
  if(k==='rct'&&G&&G.st==='play'){const e=G.p[i],h=e.hp;_use(i,k,tx,ty);if(e.hp>h)e.hp=Math.min(e.max,e.hp+e.max*.1);return}
  if(G&&G.st==='play'&&typeof k==='number'){const e=G.p[i],s=CH[e.k].sk[k];
    if(s&&s.t==='special'){
      if(e.stun>0||e.dc>0||e.cd[k]>0||(s.need&&e.pur<=0))return;
      const o=usk(e,k),t=G.p[1-i],ax=tx===undefined?t.x:tx,ay=ty===undefined?t.y:ty;
      e.cd[k]=s.cd;if(i===1)G.bc=G.t;e.face=ax>e.x?1:-1;
      if(SP[s.sx])SP[s.sx](i,o,e,t,Math.atan2(ay-e.y,ax-e.x));return}}
  return _use(i,k,tx,ty)};
const _dmg=dmgTo;
dmgTo=function(i,d,sure){if(G&&G.p[1-i]&&G.p[1-i].haste>0)d*=1.35;return _dmg(i,d,sure)};
const _boom=boom;
boom=function(s){const t=G.p[1-s.o],h=t.hp;
  if(s.burn)zone(s.x,s.y,75,3,'#ff7a1c',s.o,22,0);
  _boom(s);
  if(s.rep&&t.hp<h){const a=Math.atan2(t.y-s.y,t.x-s.x);t.kx+=Math.cos(a)*1000;t.ky+=Math.sin(a)*1000;t.slam=1}};
const _step=step;
step=function(dt){if(!isFinite(M.v[0])||!isFinite(M.v[1]))M.v=[0,0];_step(dt);if(!G||G.st!=='play')return;G.p.forEach(q=>{q.domcd=Math.max(0,(q.domcd||0)-dt)});
  G.p.forEach(q=>{q.bzcd=Math.max(0,(q.bzcd||0)-dt)});G.Gh=(G.Gh||[]).filter(o=>(o.t-=dt)>0);
  {const a=G.p[0],bz=CH[a.k].bz,bb=document.getElementById('bblz');if(bb)bb.firstChild.style.transform='scaleY('+Math.min(1,a.bzcd/(bz?bz.cd:11))+')';
   const o=G.p[1];if(!(o.bzcd>0)&&o.stun<=0&&o.dc<=0&&D(o,a)<280&&Math.random()<.01+DIFF*.02)use(1,'blz')}
  G.T=G.T||[];G.T.forEach(o=>o.t-=dt);const due=G.T.filter(o=>o.t<=0);G.T=G.T.filter(o=>o.t>0);due.forEach(o=>o.f());
  G.M=(G.M||[]).filter(m=>(m.t-=dt)>0);
  G.Z=(G.Z||[]).filter(z=>{z.t-=dt;z.w-=dt;if(z.w<=0){z.k-=dt;if(z.k<=0){z.k+=.3;const q=G.p[1-z.o];ring(z.x,z.y,z.c,z.r*.5);if(D(z,q)<z.r+q.r)dmgTo(1-z.o,z.d)}}return z.t>0});
  G.p.forEach((q,i)=>{if(q.haste>0){q.haste-=dt;if(q.stun<=0&&q.dc<=0&&q.dash<=0){q.x+=q.d[0]*CH[q.k].sp*.7*dt;q.y+=q.d[1]*CH[q.k].sp*.7*dt;clampA(q)}}if(q.slam>0){q.slam-=dt;if(Math.hypot(q.x,q.y)>A-q.r-3){q.slam=0;dmgTo(i,70,1);q.stun=Math.max(q.stun,.6);pop(q,'ارتطام!','#ffd166');G.shk=.3}}})};

/* ===== الشكل الأنمي ===== */
const PAL={naoya:{hair:'#ecd773',skin:'#ffe0c8',coat:'#3a2f2a',acc:'#7ee8c9',eye:'#d9b84a'},gojo:{hair:'#f4f7ff',skin:'#ffe3d0',coat:'#1b2150',acc:'#4fc3ff',eye:'#6fd8ff'},suk:{hair:'#ff9db5',skin:'#ffd9c2',coat:'#e8e2d8',acc:'#2a2a33',eye:'#ff2e4a'},kashimo:{hair:'#242863',skin:'#ffdcc4',coat:'#2b2f63',acc:'#ffd23f',eye:'#8ad0ff'}};
const HR={naoya:[[-9,1],[-10,-7],[-4,-10],[3,-13],[10,-9],[11,0],[9,-3],[4,-6],[-2,-7],[-7,-5]],gojo:[[-9,-1],[-12,-9],[-6,-7],[-6,-15],[-1,-9],[3,-16],[5,-8],[12,-11],[9,-1],[5,-5],[1,-3],[-3,-5],[-6,-3]],
 suk:[[-9,0],[-11,-8],[-5,-7],[-3,-14],[1,-8],[6,-13],[7,-6],[12,-7],[9,0],[5,-4],[0,-2],[-5,-4]],
 kashimo:[[-9,7],[-11,-6],[-6,-9],[-2,-15],[3,-10],[8,-14],[10,-6],[10,7],[8,-1],[3,-4],[-2,-2],[-6,-4],[-8,2]]};
PAL.toji={hair:'#12121a',skin:'#e9bfa0',coat:'#23262f',acc:'#9aa3b5',eye:'#222630'};
HR.toji=[[-10,1],[-11,-5],[-8,-10],[-4,-7],[-2,-15],[2,-11],[5,-16],[9,-9],[11,-2],[8,2],[4,-2],[0,-3],[-5,-1]];
const ln=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
function overlays(){
  (G.Gh||[]).forEach(o=>{g.save();g.globalAlpha=Math.max(0,o.t/.35)*.5;g.fillStyle=o.c;g.beginPath();g.ellipse(X(o.x),Y(o.y),10*S,26*S,0,0,7);g.fill();g.restore()});
  (G.Z||[]).forEach(z=>{g.save();g.globalAlpha=z.w>0?.2:.3+.12*Math.sin(G.t*20);g.fillStyle=z.c;g.beginPath();g.arc(X(z.x),Y(z.y),z.r*S,0,7);g.fill();g.globalAlpha=.9;g.strokeStyle=z.c;g.lineWidth=2;g.stroke();g.restore()});
  (G.M||[]).forEach(m=>{const mx=X(m.o?m.o.x:m.x),my=Y(m.o?m.o.y:m.y),r=m.r*S;g.save();g.strokeStyle=m.c;g.fillStyle=m.c;
    if(m.sq){const k=1-.25*(1-m.t/m.tot);g.globalAlpha=.16;g.fillRect(mx-r,my-r,2*r,2*r);g.globalAlpha=.95;g.lineWidth=3;g.strokeRect(mx-r*k,my-r*k,2*r*k,2*r*k);g.globalAlpha=.4;g.lineWidth=1.5;g.beginPath();g.moveTo(mx-r*k,my-r*k);g.lineTo(mx+r*k,my+r*k);g.moveTo(mx+r*k,my-r*k);g.lineTo(mx-r*k,my+r*k);g.stroke()}
    else{g.lineWidth=2.5;g.setLineDash([5,4]);g.beginPath();g.arc(mx,my,r,0,7);g.stroke();g.setLineDash([]);g.globalAlpha=.3;g.beginPath();g.arc(mx,my,r*(1-m.t/m.tot),0,7);g.fill()}
    g.restore()})}
drawStickman=function(e){
  if(e===G.p[1])overlays();
  const c=CH[e.k],P=PAL[e.k]||{hair:c.col,skin:'#ffdcc4',coat:'#222a5a',acc:c.col,eye:c.col},H=HR[e.k]||HR.suk;
  const px=X(e.x),py=Y(e.y),f=e.face,sc=S*1.3,bob=e.walk>0?Math.abs(Math.sin(e.walk))*2*sc:Math.sin(G.t*4+e.x)*sc;
  g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(px,py+25*sc,15*sc,5*sc,0,0,7);g.fill();
  if(e.stun>0){g.strokeStyle='#ffd166';g.lineWidth=2.5;g.setLineDash([5,4]);g.beginPath();g.arc(px,py,32*sc,0,7);g.stroke();g.setLineDash([])}
  if(e.ult>0){g.strokeStyle='#ffd166';g.lineWidth=3;g.globalAlpha=.75;g.beginPath();g.arc(px,py,(38+4*Math.sin(G.t*20))*sc,0,7);g.stroke();g.globalAlpha=1}
  if(e.blue>0){g.strokeStyle='#4fc3ff';g.globalAlpha=.45;g.lineWidth=3;g.beginPath();g.arc(px,py,(60+30*Math.sin(G.t*14))*sc,0,7);g.stroke();g.globalAlpha=1}
  if(e.haste>0){g.fillStyle=c.col;for(let n=1;n<4;n++){g.globalAlpha=.22/n;g.beginPath();g.ellipse(px-f*n*11*sc,py,7*sc,20*sc,0,0,7);g.fill()}g.globalAlpha=1}
  g.save();g.translate(px,py-bob);g.rotate(e.dash>0?f*.35:(e.walk>0?f*.1:0));
  g.lineCap='round';g.lineJoin='round';g.shadowColor=e.dash>0?'#fff':c.col;g.shadowBlur=e.dash>0?25:8;
  const sw=e.walk>0?Math.sin(e.walk)*8*sc:3*sc,hy=-19*sc;
  if(e.k==='kashimo'){g.fillStyle=P.hair;g.beginPath();g.moveTo(-8*sc,hy);g.lineTo(-10*sc,hy+22*sc);g.lineTo(0,hy+14*sc);g.lineTo(10*sc,hy+22*sc);g.lineTo(8*sc,hy);g.fill()}
  g.strokeStyle='#12152e';g.lineWidth=5*sc;ln(-3*sc,9*sc,-3*sc-sw,23*sc);ln(3*sc,9*sc,3*sc+sw,23*sc);
  g.strokeStyle='#fff';g.lineWidth=5.5*sc;ln(-3*sc-sw,23*sc,-3*sc-sw+f*3*sc,23*sc);ln(3*sc+sw,23*sc,3*sc+sw+f*3*sc,23*sc);
  g.fillStyle=e.dash>0?'#fff':P.coat;g.beginPath();g.moveTo(-8*sc,-10*sc);g.lineTo(8*sc,-10*sc);g.lineTo(6*sc,11*sc);g.lineTo(-6*sc,11*sc);g.closePath();g.fill();
  g.shadowBlur=0;g.strokeStyle=P.acc;g.lineWidth=2*sc;ln(0,-10*sc,0,11*sc);
  if(e.k==='suk'){g.lineWidth=4*sc;ln(-6*sc,6*sc,6*sc,6*sc)}
  if(e.k==='gojo'){g.fillStyle='#0b0e26';g.fillRect(-4*sc,-12*sc,8*sc,4*sc)}
  if(e.k==='kashimo'){ln(-8*sc,-10*sc,-6*sc,11*sc);ln(8*sc,-10*sc,6*sc,11*sc)}
  g.strokeStyle=e.dash>0?'#fff':P.coat;g.lineWidth=4.5*sc;g.beginPath();
  let hx,hy2,bx,by;
  if(e.punch>0){hx=f*19*sc;hy2=-5*sc;bx=-f*7*sc;by=2*sc}else if(e.bl>0){hx=f*11*sc;hy2=-11*sc;bx=f*12*sc;by=-4*sc}else{const a=e.walk>0?-sw*.6:3*sc;hx=f*9*sc;hy2=2*sc+a;bx=-f*8*sc;by=3*sc-a}
  g.moveTo(0,-8*sc);g.lineTo(hx,hy2);g.moveTo(0,-8*sc);g.lineTo(bx,by);g.stroke();
  g.fillStyle=P.skin;g.beginPath();g.arc(hx,hy2,3*sc,0,7);g.fill();g.beginPath();g.arc(bx,by,3*sc,0,7);g.fill();
  if(e.bl>0){g.strokeStyle=e.ba<.25?'#ffd166':'#4fc3ff';g.lineWidth=2.5;g.beginPath();g.arc(f*11*sc,-5*sc,15*sc,-1.1,1.1);g.stroke()}
  g.fillStyle=P.skin;g.beginPath();g.arc(0,hy,9*sc,0,7);g.fill();
  const u=sc*.95;g.fillStyle=P.hair;g.beginPath();H.forEach(([x,y],j)=>j?g.lineTo(x*u,hy+y*u):g.moveTo(x*u,hy+y*u));g.closePath();g.fill();
  if(e.k==='gojo'){g.fillStyle='#0b0e26';g.fillRect(-9*sc,hy-1.5*sc,18*sc,4*sc);g.fillStyle=P.eye;g.shadowColor=P.eye;g.shadowBlur=8;g.fillRect(f*3*sc-1*sc,hy-.5*sc,2*sc,1.6*sc);g.shadowBlur=0}
  else{for(const s of[-1,1]){const ex=s*3.6*sc+f*1.2*sc;g.fillStyle='#fff';g.beginPath();g.ellipse(ex,hy+1*sc,2.4*sc,2.8*sc,0,0,7);g.fill();g.fillStyle=P.eye;g.beginPath();g.arc(ex+f*.7*sc,hy+1.2*sc,1.6*sc,0,7);g.fill()}}
  g.strokeStyle='#3a2b35';g.lineWidth=1.3*sc;ln(f*1.5*sc-2*sc,hy+6*sc,f*1.5*sc+2*sc,hy+6*sc);
  if(e.k==='suk'){g.strokeStyle='#2a2a33';g.lineWidth=1.4*sc;for(const s of[-1,1])ln(s*3.6*sc,hy+4.5*sc,s*3.6*sc,hy+7.5*sc);ln(-7*sc,hy-2*sc,-7*sc,hy+3*sc)}
  if(e.k==='kashimo'){g.strokeStyle='#d6455d';g.lineWidth=1.4*sc;ln(-5*sc,hy-3*sc,3*sc,hy+4*sc);
    g.strokeStyle='#8ad0ff';g.lineWidth=1.6*sc;g.beginPath();for(let n=0;n<2;n++){const sx=(Math.random()-.5)*34*sc,sy=(Math.random()-.5)*50*sc;g.moveTo(sx,sy);g.lineTo(sx+(Math.random()-.5)*10*sc,sy+(Math.random()-.5)*10*sc)}g.stroke()}
  if(e.k==='toji'){
    // توجي ماسك الاتنين: الرمح المعكوس في الشمال، والكاتانا المقسومة في اليمين
    g.lineCap='round';
    g.strokeStyle='#2a2330';g.lineWidth=2.6*sc;ln(bx,by,bx-f*2*sc,hy-30*sc);
    g.strokeStyle='#e8eef8';g.lineWidth=3.2*sc;ln(bx-f*2*sc,hy-30*sc,bx-f*2.8*sc,hy-40*sc);
    g.strokeStyle='#14151c';g.lineWidth=3.2*sc;ln(hx,hy2,hx-f*4*sc,hy2+3*sc);
    g.strokeStyle='#dfe7f5';g.lineWidth=3*sc;ln(hx+f*2*sc,hy2-2*sc,hx+f*30*sc,hy2-24*sc);
    g.fillStyle='#e9e4dc';g.beginPath();g.arc(hx+f*2*sc,hy2-2*sc,3.2*sc,0,7);g.fill();
    // كتافة توجي العضلية (زي الصورة، من غير نظارة)
    g.fillStyle='#2b2e38';g.beginPath();g.arc(-8.5*sc,-7*sc,4.8*sc,0,7);g.arc(8.5*sc,-7*sc,4.8*sc,0,7);g.fill();
  }
  if(e.k==='naoya'){
    // عصاية ناويه الحمرا في إيده، وشعرتين فوق دماغه
    g.strokeStyle='#c8322a';g.lineWidth=2.6*sc;ln(hx+f*4*sc,hy2+10*sc,hx+f*4*sc,hy2-30*sc);
    g.fillStyle='#e0b53a';g.beginPath();g.arc(hx+f*4*sc,hy2-30*sc,2.4*sc,0,7);g.fill();
    g.fillStyle=P.hair;g.beginPath();g.arc(-4*sc,hy-13*sc,2.6*sc,0,7);g.arc(4*sc,hy-13*sc,2.6*sc,0,7);g.fill();
    g.strokeStyle='#ffffff';g.lineWidth=1.4*sc;ln(-6*sc,6*sc,6*sc,6*sc);
  }
  if(e.k==='suk'){
    // وشم سوكونا وأساور سودا
    g.strokeStyle='#15151d';g.lineWidth=1.6*sc;
    ln(-5*sc,-6*sc,-2*sc,0);ln(4*sc,-4*sc,6*sc,2*sc);ln(-6*sc,-1*sc,-9*sc,3*sc);
    g.fillStyle='#15151d';g.fillRect(hx-3*sc,hy2-1*sc,6*sc,2*sc);
  }
  g.restore()};
/* ===== زر اندفاع الـ24 إطار ===== */
const _start=start;
start=function(k){_start(k);const b=document.createElement('button');b.className='b';b.id='bblz';b.style.borderColor='#c084fc';
  b.innerHTML='<i></i><span>'+(CH[k].bz?CH[k].bz.n:'اندفاع 24 إطار')+'</span>';
  b.addEventListener('pointerdown',e=>{e.preventDefault();use(0,'blz')});BT.insertBefore(b,document.getElementById('bdash'))};
addEventListener('keydown',e=>{if(e.key==='z')use(0,'blz')});
/* ===== حلبة أكبر وأحسن مع كاميرا بتتابع اللاعبين ===== */
let camOn=false;
const _draw=draw;
draw=function(t){
  if(G){camOn=true;const a=G.p[0],b=G.p[1],mx=(a.x+b.x)/2,my=(a.y+b.y)/2,wide=W>H;
    const ts=Math.min(W*.92/Math.max(640,Math.abs(a.x-b.x)+260),(wide?H*.66:H*.6)/Math.max(420,Math.abs(a.y-b.y)+220));
    const c=G.cam=G.cam||{x:mx,y:my,s:ts};c.x+=(mx-c.x)*.15;c.y+=(my-c.y)*.15;c.s+=(ts-c.s)*.1;
    S=c.s;cx=W/2-c.x*S;cy=(wide?H*.55:H*.38)-c.y*S}
  else if(camOn){camOn=false;rs()}
  _draw(t)};
const BG=Array.from({length:70},()=>({x:Math.random(),y:Math.random(),z:1+Math.random()*1.6,f:1+Math.random()*2,p:Math.random()*6}));
drawArena=function(){
  const T=G?G.t:performance.now()/1000,R=A*S,ox=X(0),oy=Y(0);
  const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#04061a');bg.addColorStop(1,'#0b1033');g.fillStyle=bg;g.fillRect(-20,-20,W+40,H+40);
  g.fillStyle='#9fb4ff';BG.forEach(q=>{g.globalAlpha=.2+.4*Math.abs(Math.sin(T*q.f+q.p));g.fillRect(((q.x*W-cx*.06)%W+W)%W,((q.y*H-cy*.06)%H+H)%H,q.z,q.z)});g.globalAlpha=1;
  g.save();g.shadowColor='#4fc3ff';g.shadowBlur=30;g.beginPath();g.arc(ox,oy,R+10*S,0,7);g.fillStyle='#0a0e33';g.fill();g.restore();
  const fl=g.createRadialGradient(ox,oy,R*.05,ox,oy,R);fl.addColorStop(0,'#232d7e');fl.addColorStop(.55,'#141a55');fl.addColorStop(1,'#080b2b');
  g.beginPath();g.arc(ox,oy,R,0,7);g.fillStyle=fl;g.fill();
  g.save();g.beginPath();g.arc(ox,oy,R,0,7);g.clip();
  g.strokeStyle='rgba(130,160,255,.09)';g.lineWidth=1;g.beginPath();
  for(let k=-A;k<=A;k+=60){g.moveTo(X(k),Y(-A));g.lineTo(X(k),Y(A));g.moveTo(X(-A),Y(k));g.lineTo(X(A),Y(k))}g.stroke();
  [.22,.42,.62,.82].forEach((r,n)=>{g.strokeStyle='rgba(79,195,255,.28)';g.lineWidth=2.5;g.setLineDash([R*r*.1,R*r*.07]);g.lineDashOffset=T*26*(n%2?-1:1);g.beginPath();g.arc(ox,oy,R*r,0,7);g.stroke()});
  g.setLineDash([]);
  g.strokeStyle='rgba(120,140,255,.35)';g.lineWidth=2;for(let n=0;n<8;n++){const ag=T*.15+n*Math.PI/4;g.beginPath();g.moveTo(ox+Math.cos(ag)*R*.1,oy+Math.sin(ag)*R*.1);g.lineTo(ox+Math.cos(ag)*R*.2,oy+Math.sin(ag)*R*.2);g.stroke()}
  g.strokeStyle='rgba(79,195,255,.5)';g.lineWidth=3;g.beginPath();g.arc(ox,oy,R*.1,0,7);g.stroke();
  g.fillStyle='rgba(120,150,255,.5)';for(let n=0;n<72;n++){const ag=n*Math.PI/36,r1=R*.9,l=n%3?R*.015:R*.03;g.beginPath();g.moveTo(ox+Math.cos(ag)*r1,oy+Math.sin(ag)*r1);g.lineTo(ox+Math.cos(ag)*(r1+l),oy+Math.sin(ag)*(r1+l));g.lineWidth=2;g.strokeStyle='rgba(120,150,255,.45)';g.stroke()}
  g.restore();
  g.save();g.shadowColor='#4fc3ff';g.shadowBlur=20;g.beginPath();g.arc(ox,oy,R,0,7);g.lineWidth=6;g.strokeStyle='#3e4fd0';g.stroke();g.restore();
  g.beginPath();g.arc(ox,oy,R+14*S,0,7);g.lineWidth=2;g.strokeStyle='rgba(79,195,255,.25)';g.stroke();
  for(let n=0;n<24;n++){const ag=n*Math.PI/12,px=ox+Math.cos(ag)*(R+14*S),py=oy+Math.sin(ag)*(R+14*S),pl=.6+.4*Math.sin(T*3+n);
    g.save();g.shadowColor='#4fc3ff';g.shadowBlur=12;g.globalAlpha=.5+.5*pl;g.fillStyle='#8fd8ff';g.beginPath();g.moveTo(px,py-9*S);g.lineTo(px+5*S,py);g.lineTo(px,py+9*S);g.lineTo(px-5*S,py);g.closePath();g.fill();g.restore()}
};
/* ===== الإعدادات: مكان الأزرار وحجمها ===== */
const LAY=Object.assign({swap:false,size:1},M.lay||{});
const SIZES=[[.8,'صغير'],[1,'وسط'],[1.2,'كبير']];
function applyLayout(){const pd=document.getElementById('pad'),bt=document.getElementById('btns');
  bt.style.left=LAY.swap?'8px':'auto';bt.style.right=LAY.swap?'auto':'8px';
  pd.style.left=LAY.swap?'auto':'0';pd.style.right=LAY.swap?'0':'auto';
  bt.style.zoom=LAY.size}
function saveLay(){M.lay={swap:LAY.swap,size:LAY.size};save()}
applyLayout();
function settings(){
  const si=SIZES.findIndex(s=>s[0]===LAY.size);
  ui('الإعدادات','غيّر مكان الأزرار وحجمها، والتغيير بيتحفظ على جهازك.',[
    ['مكان الأزرار: '+(LAY.swap?'شمال':'يمين'),()=>{LAY.swap=!LAY.swap;applyLayout();saveLay();settings()}],
    ['حجم الأزرار: '+(si<0?'وسط':SIZES[si][1]),()=>{const i=si<0?1:si;LAY.size=SIZES[(i+1)%SIZES.length][0];applyLayout();saveLay();settings()}],
    ['رجوع للوضع الافتراضي',()=>{LAY.swap=false;LAY.size=1;applyLayout();saveLay();settings()},'s'],
    ['رجوع',menu,'s']])}

/* ===== ابدأ اللعبة (اختيار الصعوبة والشخصية) ===== */
function pickChar(){G=null;ui('ابدأ اللعبة','اختار مستوى الصعوبة وبعدين شخصيتك',
  Object.keys(CH).map(k=>['العب بـ '+CH[k].n,()=>start(k)]).concat([['رجوع',menu,'s']]),undefined,true)}

/* ===== لعب جماعي (placeholder لحد ما يكون فيه سيرفر) ===== */
function multi(){G=null;ui('لعب جماعي','اللعب الجماعي أونلاين محتاج سيرفر، والنسخة دي لسه مش متصلة بسيرفر. الخيار ده تحت التطوير.',[['رجوع',menu,'s']])}

/* ===== الشاشة الرئيسية ===== */
menu=function(){G=null;ui('ساحة القتال - Anime 2D','اختار من القائمة',[
  ['ابدأ اللعبة',pick],
  ['تدريب',trainPick,'s'],
  ['لعب جماعي',multi,'s'],
  ['الإعدادات',settings,'s'],
  ['شخصياتي: إضافة وتعديل',editor,'s']])};

/* ===== توجي: مفيش مجال، فالزر بتاعه بيبقى "ضربة الكاتانا" ===== */
const _start3=start;
start=function(k){_start3(k);if(CH[k].noDom){const d=document.getElementById('bdom'),h=document.getElementById('brct');if(d)d.querySelector('span').textContent=CH[k].domLabel;if(h&&CH[k].noHeal)h.querySelector('span').textContent=CH[k].healLabel}};
function tojiFin(i){const e=G.p[i],t=G.p[1-i];if(e.dm<DOMCH||e.stun>0||e.dc>0)return;
  e.dm=0;if(i===1)G.bc=G.t;
  const a=Math.atan2(t.y-e.y,t.x-e.x)+Math.PI;
  ring(e.x,e.y,'#e6edf8',110);
  e.x=t.x+Math.cos(a)*44;e.y=t.y+Math.sin(a)*44;clampA(e);
  e.face=t.x>e.x?1:-1;e.dash=.12;
  slashFx(t.x,t.y,'#e6edf8',4,60);G.shk=.3;
  dmgTo(1-i,120,1);G.p[1-i].stun=Math.max(G.p[1-i].stun,.5);pop(e,'ضربة الكاتانا!','#e6edf8')}
const _use4=use;
use=function(i,k,tx,ty){if(G&&G.st==='play'){const e=G.p[i],c=CH[e.k],o=G.p[1-i];
  if(k==='dom'&&c.noDom){tojiFin(i);return}
  if(k==='rct'&&c.noHeal)return;
  if(k==='dom'&&e.domcd>0)return;
  /* الرمح المعكوس: أي تقنية ملعونة (مجال أو خاصة) الخصم بيستخدمها ضد توجي بتتبطل */
  if(o&&o.k==='toji'&&!c.noDom){if(k==='dom')return;if(typeof k==='number'&&c.sk[k]&&c.sk[k].t==='special')return}
  const was=e.dc,r=_use4(i,k,tx,ty);
  if(k==='dom'&&e.dc>0&&!(was>0))e.domcd=DOM_CD;
  return r}
  return _use4(i,k,tx,ty)};

/* ===== توجي: القيد السماوي، ضرره الجسدي +15% ===== */
const _dmgT=dmgTo;
dmgTo=function(i,d,sure){if(G&&G.p[1-i]&&G.p[1-i].k==='toji')d*=1.15;return _dmgT(i,d*DMG_MULT,sure)};

/* ===== تأثيرات الضربات الفاخرة: شرارات ولمعان وقوس قطع ===== */
const SPK=[];
function burst(x,y,c,dmg){const n=Math.min(18,6+Math.floor((dmg||30)/12));
  for(let k=0;k<n&&SPK.length<260;k++){const a=Math.random()*6.28,v=80+Math.random()*220;
    SPK.push({k:'s',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:.35+Math.random()*.25,c,r:1.5+Math.random()*2.5})}
  SPK.push({k:'f',x,y,t:0,life:.22,c,r:(dmg||30)*.5+18});
  SPK.push({k:'a',x,y,t:0,life:.3,c,r:(dmg||30)*.4+26,a:Math.random()*6.28})}
const _slashFx2=slashFx;
slashFx=function(x,y,c,cnt=4,sz=45){_slashFx2(x,y,c,cnt,sz);
  for(let k=0;k<cnt;k++){const a=Math.random()*6.28;SPK.push({k:'a',x,y,t:0,life:.25,c,r:sz*.9+k*6,a})}}
const _dmgF=dmgTo;
dmgTo=function(i,d,sure){const r=_dmgF(i,d,sure);if(r>0&&G&&G.p[i])burst(G.p[i].x,G.p[i].y,r>=60?'#ffd166':(G.p[1-i]&&G.p[1-i].k==='toji'?'#dfe7f5':'#ffffff'),r);return r};
const _draw2=draw;
draw=function(t){_draw2(t);
  if(!SPK.length||!g)return;
  const dt=1/60;g.save();g.globalCompositeOperation='lighter';
  for(let i=SPK.length-1;i>=0;i--){const p=SPK[i];p.t+=dt;if(p.t>=p.life){SPK.splice(i,1);continue}
    const q=1-p.t/p.life;
    if(p.k==='s'){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.9;p.vy*=.9;
      g.globalAlpha=q;g.fillStyle=p.c;g.shadowColor=p.c;g.shadowBlur=10;
      g.beginPath();g.arc(X(p.x),Y(p.y),p.r*S*1.6*q+.6,0,7);g.fill()}
    else if(p.k==='f'){const e=p.t/p.life;
      g.globalAlpha=q*.9;g.strokeStyle=p.c;g.lineWidth=5*S*q+1;g.shadowColor=p.c;g.shadowBlur=18;
      g.beginPath();g.arc(X(p.x),Y(p.y),p.r*S*(.3+.7*e),0,7);g.stroke();
      g.globalAlpha=q*.5;g.fillStyle=p.c;g.beginPath();g.arc(X(p.x),Y(p.y),p.r*S*.35*q,0,7);g.fill()}
    else{const e=p.t/p.life;
      g.globalAlpha=q;g.strokeStyle=p.c;g.lineCap='round';g.shadowColor=p.c;g.shadowBlur=14;
      const L=p.r*S*(.4+.6*e),ca=Math.cos(p.a),sa=Math.sin(p.a);
      g.lineWidth=(3.5*q+.5)*S;g.beginPath();g.moveTo(X(p.x-ca*L),Y(p.y-sa*L));g.lineTo(X(p.x+ca*L),Y(p.y+sa*L));g.stroke();
      g.lineWidth=1.2*S;g.strokeStyle='#ffffff';g.beginPath();g.moveTo(X(p.x-ca*L*.7),Y(p.y-sa*L*.7));g.lineTo(X(p.x+ca*L*.7),Y(p.y+sa*L*.7));g.stroke()}
  }
  g.restore()};
/* ===== مهارات توجي الجديدة: طعنة واضحة وعاصفة قطع ===== */
CH.toji.sk=[
  {n:'طعنة الرمح المعكوس',x:'lunge',cd:5,dmg:110},
  {n:'عاصفة الكاتانا',x:'flurry',cd:6,dmg:30,hits:6},
  {n:'رمية الرمح المعكوس',t:'orb',cd:8,dmg:130,ex:90,v:480,bn:0,col:'#e8eef8',u:{dmg:230,ex:150}}];
function tojiLunge(i,s){const e=G.p[i],t=G.p[1-i],dir=t.x>e.x?1:-1;
  ring(e.x,e.y,'#e8eef8',90);
  e.x=t.x-dir*44;clampA(e);e.face=dir;e.dash=.1;
  slashFx(t.x,t.y,'#e8eef8',3,70);G.shk=Math.max(G.shk,.25);
  dmgTo(1-i,s.dmg);t.stun=Math.max(t.stun,.6);pop(e,'طعنة!','#e8eef8')}
function tojiFlurry(i,s){const e=G.p[i],t=G.p[1-i];e.face=t.x>e.x?1:-1;
  G.shk=Math.max(G.shk,.2);
  for(let h=0;h<s.hits;h++){slashFx(t.x+(Math.random()-.5)*36,t.y-24+Math.random()*44,'#dfe7f5',3,50);dmgTo(1-i,s.dmg)}
  pop(e,'عاصفة!','#dfe7f5')}

/* ===== جوجو: الكرة الزرقا في نص الحلبة بتشفط الكل ما عدا صاحبها ===== */
let BLUE=null;
function spawnBlue(i,s){BLUE={o:i,x:0,y:0,t:0,dur:s.dur||5,tick:.125,acc:0,dmg:s.dmg||18};
  ring(0,0,'#4fc3ff',220);G.shk=Math.max(G.shk,.15)}
function tickBlue(dt){const B=BLUE;if(!B)return;B.t+=dt;if(B.t>=B.dur){BLUE=null;return}
  B.acc+=dt;const hit=B.acc>=B.tick;if(hit)B.acc-=B.tick;
  G.p.forEach((q,j)=>{if(j===B.o||q.hp<=0)return;
    const dx=B.x-q.x,dy=B.y-q.y,l=Math.hypot(dx,dy)||1,sp=Math.min(l,340*dt);
    if(l>8){q.x+=dx/l*sp;q.y+=dy/l*sp}clampA(q);
    if(hit)dmgTo(j,B.dmg)})}
function drawBlue(){const B=BLUE,pulse=1+.07*Math.sin(G.t*12),R=(60+30*Math.min(1,B.t*2))*pulse;
  const x=X(B.x),y=Y(B.y);
  g.save();g.globalCompositeOperation='lighter';
  const gr=g.createRadialGradient(x,y,R*.15*S,x,y,R*1.7*S);
  gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.3,'rgba(120,210,255,.9)');
  gr.addColorStop(.65,'rgba(40,120,255,.4)');gr.addColorStop(1,'rgba(40,120,255,0)');
  g.fillStyle=gr;g.beginPath();g.arc(x,y,R*1.7*S,0,7);g.fill();
  g.strokeStyle='rgba(79,195,255,.85)';g.lineWidth=3*S;g.beginPath();g.arc(x,y,R*S,0,7);g.stroke();
  g.restore()}
const _use5=use;
use=function(i,k,tx,ty){
  if(G&&G.st==='play'&&typeof k==='number'&&G.p[i]){
    const e=G.p[i],c=CH[e.k],s=c.sk[k],o=G.p[1-i];
    if(s&&(s.t==='pull'||s.x)){
      if(e.stun>0||e.dc>0||e.cd[k]>0)return;
      if(s.t==='pull'){
        if(BLUE||(o&&o.k==='toji'))return; /* الرمح المعكوس بيبطل الأزرق */
        e.cd[k]=s.cd;if(i===1)G.bc=G.t;spawnBlue(i,s);return}
      e.cd[k]=s.cd;if(i===1)G.bc=G.t;
      if(s.x==='lunge')tojiLunge(i,s);else if(s.x==='flurry')tojiFlurry(i,s);
      return}
  }
  return _use5(i,k,tx,ty)};
const _step3=step;
step=function(dt){_step3(dt);if(BLUE&&G&&G.st==='play')tickBlue(dt)};
const _start5=start;
start=function(k){BLUE=null;_start5(k)};
const _draw5=draw;
draw=function(t){_draw5(t);if(BLUE&&G&&G.st==='play')drawBlue()};
/* ===== طريقة اللعب: 1 ضد 1، 2 ضد 2 (قريباً)، تدريب ===== */
function pick(){G=null;ui('ابدأ اللعبة','اختار طريقة اللعب',[
  ['1 ضد 1',pickChar],
  ['2 ضد 2 (قريباً)',twov],
  ['رجوع',menu,'s']])}
function twov(){ui('2 ضد 2','الوضع ده لسه تحت التطوير، لأنه محتاج تعديل كبير على محرك القتال.',[['رجوع',pick,'s']])}
let TR=null;
function trainPick(){G=null;ui('التدريب','اختار شخصيتك، الدمية مش هترد بأي حركة وبتتعالج لوحدها',
  Object.keys(CH).map(k=>['تدرّب بـ '+CH[k].n,()=>{start(k);G.train=true;TR={x:G.p[1].x,y:G.p[1].y}}]).concat([['رجوع',menu,'s']]))}

/* ===== ناويه: إطار الزجاج، تجميد الإطار، مطر الإطارات ===== */
const NAO_POOL=100;/* إجمالي دمج المهارة. كل ضربة = 30% منه */
let FRM=[],NAO={glassT:0,rainT:0,held:-1,off:{x:0,y:0},bonus:false,mode:''};
function frameRing(){FRM=[];for(let n=0;n<6;n++){const a=n*Math.PI/3+.3,R=A*.55;
  FRM.push({x:Math.cos(a)*R,y:Math.sin(a)*R,ang:a+Math.PI/2,alive:true})}}
SP.glass=function(i,s,e){frameRing();NAO.mode='glass';NAO.glassT=8;NAO.rainT=0;NAO.held=-1;
  ring(e.x,e.y,'#7ee8c9',120);pop(e,'إطار زجاجي!','#7ee8c9');G.shk=Math.max(G.shk,.15)};
SP.frames=function(i,s,e,t){mark(t.x,t.y,62,.5,'#7ee8c9',1);
  later(.5,()=>{const q=G.p[1-i];if(!q||q.hp<=0)return;
    if(D(q,{x:t.x,y:t.y})<62+q.r){q.frz=4;q.stun=Math.max(q.stun,1);dmgTo(1-i,s.dmg);pop(q,'اتجمّد!','#7ee8c9')}
    else pop(e,'ضيّعت الهدف','#7ee8c9')})};
SP.rain=function(i,s,e){const q=G.p[1-i];if(!q||!(q.frz>0))return;
  NAO.mode='rain';NAO.held=1-i;NAO.off={x:q.x-e.x,y:q.y-e.y};NAO.rainT=8;NAO.glassT=0;
  frameRing();pop(e,'مطر الإطارات!','#7ee8c9');G.shk=Math.max(G.shk,.2)};

function tickNaoya(dt){
  const ni=G.p.findIndex(q=>q.k==='naoya');if(ni<0)return;const e=G.p[ni];
  NAO.glassT=Math.max(0,NAO.glassT-dt);NAO.rainT=Math.max(0,NAO.rainT-dt);
  if(FRM.length){
    for(const f of FRM){if(!f.alive||D(e,f)>=46)continue;
      f.alive=false;slashFx(f.x,f.y,'#bff7ea',3,40);G.shk=Math.max(G.shk,.1);
      e.haste=Math.max(e.haste,2);pop(e,'كسرت إطار: سرعة!','#7ee8c9');
      if(NAO.mode==='rain'&&NAO.held>=0){NAO.bonus=true;dmgTo(NAO.held,NAO_POOL*.3);NAO.bonus=false}}
    if(FRM.every(f=>!f.alive)){e.haste=Math.max(e.haste,6.5);pop(e,'سرعة 6.5 ث!','#7ee8c9');G.shk=Math.max(G.shk,.3);
      FRM=[];NAO.glassT=0;NAO.held=-1}
    else if(NAO.glassT<=0&&NAO.rainT<=0)FRM=[];
  }
  if(NAO.held>=0){const q=G.p[NAO.held];
    if(!q||q.hp<=0||NAO.rainT<=0){NAO.held=-1}
    else{q.x=e.x+NAO.off.x;q.y=e.y+NAO.off.y;clampA(q)}}
}
function drawFrm(){if(!FRM.length)return;
  FRM.forEach((f,idx)=>{if(!f.alive)return;
    const x=X(f.x),y=Y(f.y),w=58*S,h=88*S,pl=.6+.4*Math.sin(G.t*6+idx);
    g.save();g.translate(x,y);g.rotate(f.ang);g.globalCompositeOperation='lighter';
    g.strokeStyle='rgba(126,232,201,'+(.55+.35*pl)+')';g.lineWidth=3*S;g.shadowColor='#7ee8c9';g.shadowBlur=14;
    g.strokeRect(-w/2,-h/2,w,h);
    g.fillStyle='rgba(126,232,201,.08)';g.fillRect(-w/2,-h/2,w,h);
    g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.5*S;g.beginPath();g.moveTo(-w*.3,-h*.4);g.lineTo(w*.05,h*.05);g.stroke();
    g.restore()})}

/* ربط الحالات الجديدة باللعبة */
const _dmgX=dmgTo;
dmgTo=function(i,d,sure){const r=_dmgX(i,d,sure);
  const at=G&&G.p[1-i];
  if(at&&at.k==='naoya'&&NAO.glassT>0&&!NAO.bonus&&r>0){NAO.bonus=true;_dmgX(i,NAO_POOL*.3,sure);NAO.bonus=false}
  return r};
const _use6=use;
use=function(i,k,tx,ty){
  if(G&&G.st==='play'){
    if(G.train&&i===1)return;
    if(NAO.held===i)return;
    if(typeof k==='number'){const s=CH[G.p[i].k].sk[k],o=G.p[1-i];
      if(s&&s.sx==='rain'&&!(o&&o.frz>0))return}}
  return _use6(i,k,tx,ty)};
const _step4=step;
step=function(dt){_step4(dt);
  if(G&&G.st==='play'){G.p.forEach(q=>{q.frz=Math.max(0,(q.frz||0)-dt)});tickNaoya(dt);
    if(G.train&&G.p[1]&&TR){const d=G.p[1];d.x=TR.x;d.y=TR.y;d.hp=d.max;d.stun=0;d.dc=0}}};
const _start6=start;
start=function(k){FRM=[];NAO={glassT:0,rainT:0,held:-1,off:{x:0,y:0},bonus:false,mode:''};TR=null;_start6(k)};
const _draw6=draw;
draw=function(t){_draw6(t);if(G&&G.st==='play')drawFrm()};

/* ===== شكل الشخصيات زي الصور: ألوان، وإكسسوارات ===== */
PAL.gojo={hair:'#f4f7ff',skin:'#ffe3d0',coat:'#1f1a33',acc:'#7a5cc2',eye:'#6fd8ff'};
PAL.naoya={hair:'#9fe8c4',skin:'#ffe0c8',coat:'#f1f1f6',acc:'#d64434',eye:'#8fe0c0'};
PAL.kashimo={hair:'#c8c25c',skin:'#f4d3b8',coat:'#1c2636',acc:'#b8bdc9',eye:'#d6455d'};
PAL.suk={hair:'#ff7f9f',skin:'#e6b08a',coat:'#e6b08a',acc:'#15151d',eye:'#ff2e4a'};

if(!G)menu();
})();
