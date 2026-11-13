/* mods.js: تعديل مهارات توجي (داش شق الروح وسلسلة سريعة) + دعم LAN حقيقي */
(()=>{
TY.push('special');
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const later=(s,f)=>{(G.T=G.T||[]).push({t:s,f})};
const mark=(x,y,r,s,c,sq,o)=>{(G.M=G.M||[]).push({x,y,r,t:s,tot:s,c,sq,o})};
const zone=(x,y,r,s,c,o,d,w=.5)=>{(G.Z=G.Z||[]).push({x,y,r,t:s+w,w,c,o,d,k:0})};
const clampA=e=>{const r=Math.hypot(e.x,e.y),m=A-e.r;if(r>m){e.x*=m/r;e.y*=m/r}};

/* ===== المهارات الخاصة ===== */
const SP={
 red(i,s,e,t,a){e.lr=G.t;if(e.blue>0)e.pur=4;G.s.push({o:i,k:1,x:e.x,y:e.y,vx:Math.cos(a)*s.v,vy:Math.sin(a)*s.v,dmg:s.dmg,ex:s.ex,bn:0,col:'#ff3b4f',life:2.5,big:1,sz:s.ex*.16,rep:1})},
 dis(i,s,e,t){const ti=getTarget(i);for(let n=0;n<5;n++){const ox=t.x+(Math.random()-.5)*90,oy=t.y+(Math.random()-.5)*90,dl=.4+n*.12;
   mark(ox,oy,48,dl,'#ff9aa8');
   later(dl,()=>{const q=G.p[ti];if(!q||q.hp<=0)return;slashFx(ox,oy,'#ff4d5e',2,52);G.shk=.1;if(D(q,{x:ox,y:oy})<48+q.r)dmgTo(ti,s.dmg,false,i)})}},
 fuga(i,s,e,t){e.stun=Math.max(e.stun,.8);pop(e,'فوغا...','#ff9a3c');ring(e.x,e.y,'#ff9a3c',70);
   later(.8,()=>{const ti=getTarget(i),q=G.p[ti]||t,a=Math.atan2(q.y-e.y,q.x-e.x);G.s.push({o:i,k:2,x:e.x,y:e.y,vx:Math.cos(a)*560,vy:Math.sin(a)*560,dmg:s.dmg,ex:s.ex,bn:0,col:'#ff7a1c',life:2.5,big:1,sz:s.ex*.16,burn:1});G.shk=.25})},
 bolt(i,s,e,t,a){const ti=getTarget(i);lightningFx(e.x,e.y);e.x=t.x-Math.cos(a)*48;e.y=t.y-Math.sin(a)*48;clampA(e);
   lightningFx(t.x,t.y);G.shk=.2;if(dmgTo(ti,s.dmg,false,i)>0){t.stun=Math.max(t.stun,.5);pop(t,'صعق!','#9fd0ff')}},
 field(i,s,e,t){zone(t.x,t.y,85,3.5,'#60a5fa',i,s.dmg);mark(t.x,t.y,85,.5,'#60a5fa')},
 storm(i,s,e,t){const ti=getTarget(i);for(let n=0;n<7;n++){const ox=t.x+(n?(Math.random()-.5)*160:0),oy=t.y+(n?(Math.random()-.5)*160:0),dl=.35+n*.18;
   mark(ox,oy,42,dl,'#9333ea');
   later(dl,()=>{const q=G.p[ti];if(!q||q.hp<=0)return;lightningFx(ox,oy);G.shk=.12;if(D(q,{x:ox,y:oy})<42+q.r)dmgTo(ti,s.dmg,false,i)})}},
 glass(i,s,e){mark(e.x,e.y,46,.6,'#7ee8c9',1,e);pop(e,'إطار...','#7ee8c9');
   later(.6,()=>{if(e.hp<=0)return;e.haste=s.dur||5;e.dcd=0;slashFx(e.x,e.y,'#bff7ea',7,62);ring(e.x,e.y,'#7ee8c9',95);G.shk=.22;pop(e,'كسر الزجاج: سرعة!','#7ee8c9');
     const ti=getTarget(i),q=G.p[ti];if(q&&q.hp>0&&D(e,q)<95+q.r)dmgTo(ti,s.dmg,false,i)})},
 frames(i,s,e,t){const ti=getTarget(i),ox=t.x,oy=t.y;mark(ox,oy,62,.55,'#7ee8c9',1);
   later(.55,()=>{const q=G.p[ti];if(!q||q.hp<=0)return;slashFx(ox,oy,'#bff7ea',4,50);G.shk=.12;
     if(D(q,{x:ox,y:oy})<62+q.r&&dmgTo(ti,s.dmg,false,i)>0){q.stun=Math.max(q.stun,1.3);pop(q,'اتجمّد في الإطار','#7ee8c9')}})},
 blitz(i,s,e){const n=e.haste>0?5:3;for(let k=0;k<n;k++)later(k*.17,()=>{const ti=getTarget(i),q=G.p[ti];if(e.hp<=0||!q||q.hp<=0)return;
   const a=Math.random()*6.28;e.x=q.x+Math.cos(a)*50;e.y=q.y+Math.sin(a)*50;clampA(e);e.face=q.x>e.x?1:-1;e.dx=0;e.dy=0;e.dash=.14;
   slashFx(q.x,q.y,'#bff7ea',3,48);G.shk=.1;dmgTo(ti,s.dmg,false,i)})},
 rain(i,s,e,t){const ti=getTarget(i);for(let n=0;n<5;n++){const ox=t.x+(n?(Math.random()-.5)*150:0),oy=t.y+(n?(Math.random()-.5)*150:0);
   later(n*.2,()=>mark(ox,oy,50,.45,'#7ee8c9',1));
   later(.45+n*.2,()=>{const q=G.p[ti];if(!q||q.hp<=0)return;slashFx(ox,oy,'#bff7ea',3,45);if(D(q,{x:ox,y:oy})<50+q.r&&dmgTo(ti,s.dmg,false,i)>0)q.stun=Math.max(q.stun,.5)})}},

 /* ===== مهارات توجي فوشيغورو (معدلة للسرعة العالية) ===== */
 isoh(i,s,e,t,a){
   const ti=getTarget(i);
   e.x=t.x-Math.cos(a)*46;e.y=t.y-Math.sin(a)*46;clampA(e);
   e.face=t.x>e.x?1:-1;e.punch=.28;e.wepMode='isoh';
   slashFx(t.x,t.y,'#38bdf8',4,58);ring(t.x,t.y,'#e2e8f0',70);G.shk=.22;
   t.bl=0;t.blue=0;t.haste=0;
   if(dmgTo(ti,s.dmg,true,i)>0){
     t.stun=Math.max(t.stun,.65);
     pop(t,'إلغاء التقنية! 🗡️','#38bdf8');
   }
 },
 /* كاتانا شق الروح: داش قطعي واسع لا يمكن تفاديه مع الحركة السريعة */
 ssk(i,s,e,t,a){
   e.punch=.3;e.wepMode='ssk';
   // اندفاع سريع جداً باتجاه الخصم مع مساحة ضرب واسعة
   const dashDist=130;
   e.x+=Math.cos(a)*dashDist; e.y+=Math.sin(a)*dashDist;
   clampA(e);
   slashFx(e.x,e.y,'#c084fc',8,105);
   ring(e.x,e.y,'#1e1b4b',140);
   G.shk=.28;
   G.p.forEach((foe,idx)=>{
     if(foe.hp<=0||foe.team===e.team)return;
     if(D(e,foe)<125+foe.r){
       if(dmgTo(idx,s.dmg,true,i)>0){
         foe.noHeal=8;
         foe.stun=Math.max(foe.stun,.8);
         pop(foe,'شق الروح القاتل!','#c084fc');
       }
     }
   });
 },
 /* سلسلة الألف ميل: مقذوف فائق السرعة وبحجم كبير جداً لصيد الحركة السريعة */
 chain(i,s,e,t,a){
   e.wepMode='isoh';
   G.s.push({
     o:i,k:2,x:e.x,y:e.y,
     vx:Math.cos(a)*1350, vy:Math.sin(a)*1350,
     dmg:s.dmg, col:'#e2e8f0', life:1.2,
     big:1, sz:35, blade:1, ang:a, chainWhip:1
   });
   G.shk=.22;
 }
};

function doBlz(i){
  const e=G.p[i];if(!e||e.hp<=0)return;
  const c=CH[e.k],b=c.bz||{n:'اندفاع 24 إطار',cd:11,hits:3,dmg:55,col:c.col,fx:'cut'};
  if(G.st!=='play'||e.bzcd>0||e.stun>0||e.dc>0)return;
  const ult=e.ult>0,n=b.hits+(e.haste>0?2:0)+(ult?2:0),dm=b.dmg*(ult?1.8:1);e.bzcd=b.cd;if(i>0)G.bc=G.t;
  for(let k=0;k<n;k++)later(k*.17,()=>{
    const ti=getTarget(i),q=G.p[ti];
    if(G.st!=='play'||e.hp<=0||!q||q.hp<=0)return;
    (G.Gh=G.Gh||[]).push({x:e.x,y:e.y,t:.35,c:b.col});
    const a=Math.random()*6.28;e.x=q.x+Math.cos(a)*52;e.y=q.y+Math.sin(a)*52;clampA(e);e.face=q.x>e.x?1:-1;e.dx=0;e.dy=0;e.dash=.14;
    if(b.fx==='bolt'){lightningFx(q.x,q.y);lightningFx(e.x,e.y)}
    else if(b.fx==='step'){ring(e.x,e.y,b.col,60);slashFx(q.x,q.y,b.col,2,36)}
    else if(b.fx==='frame'){slashFx(q.x,q.y,'#bff7ea',3,48);mark(q.x,q.y,34,.18,b.col,1)}
    else slashFx(q.x,q.y,b.col,5,55);
    G.shk=.1;const h=q.hp;dmgTo(ti,dm,false,i);if(k===n-1&&b.stunEnd&&q.hp<h)q.stun=Math.max(q.stun,b.stunEnd)
  })
}

CH.gojo.sk[1]={n:'أحمر طرد',t:'special',sx:'red',cd:6,dmg:120,ex:90,v:380,u:{dmg:250,ex:190}};
CH.suk.sk[0]={n:'تفكيك',t:'special',sx:'dis',cd:4.5,dmg:68};
CH.suk.sk[2]={n:'فوغا',t:'special',sx:'fuga',cd:9,dmg:290,ex:110,u:{dmg:500,ex:190}};
CH.kashimo.sk=[{n:'برق خاطف',t:'special',sx:'bolt',cd:5,dmg:140},{n:'مجال صاعق',t:'special',sx:'field',cd:8,dmg:52},{n:'عاصفة رعدية',t:'special',sx:'storm',cd:9,dmg:110}];

CH.naoya={n:'ناويه زينين',style:'naoya',hp:9500,col:'#f5d547',sp:215,rng:120,
  sk:[{n:'إطار الزجاج',t:'special',sx:'glass',cd:10,dmg:85,dur:5},{n:'تجميد الإطار',t:'special',sx:'frames',cd:7,dmg:105},{n:'مطر الإطارات',t:'special',sx:'rain',cd:9,dmg:60}],
  dom:{n:'مسار الـ24 إطار',type:'shrine',tick:.25,dmg:52,dur:7}};

CH.toji={n:'توجي فوشيغورو',style:'toji',noCE:true,hp:10500,col:'#a855f7',sp:235,rng:95,
  sk:[
    {n:'رمح السماء المعكوس',t:'special',sx:'isoh',cd:4.5,dmg:165},
    {n:'كاتانا شق الروح',t:'special',sx:'ssk',cd:5.5,dmg:215},
    {n:'سلسلة الألف ميل',t:'special',sx:'chain',cd:4,dmg:160}
  ],
  dom:{n:'بدون مجال',type:'none',tick:1,dmg:0,dur:0},
  bz:{n:'انقضاض قاتل السحرة',cd:8.5,hits:5,dmg:62,col:'#c084fc',fx:'cut'}
};

CH.gojo.bz={n:'خطوة اللانهاية',cd:11,hits:4,dmg:52,col:'#4fc3ff',fx:'step'};
CH.suk.bz={n:'تقطيع متتالي',cd:11,hits:4,dmg:62,col:'#ff4d5e',fx:'cut'};
CH.kashimo.bz={n:'برق متتالي',cd:11,hits:4,dmg:56,col:'#60a5fa',fx:'bolt',stunEnd:.5};
CH.naoya.bz={n:'اندفاع 24 إطار',cd:9,hits:3,dmg:62,col:'#7ee8c9',fx:'frame'};

const _use=use;
use=function(i,k,tx,ty){
  if(!isFinite(tx)||!isFinite(ty)){tx=undefined;ty=undefined}
  if(k==='blz'){if(G&&G.st==='play')doBlz(i);return}
  if(G&&G.st==='play'&&typeof k==='number'){const e=G.p[i];if(!e||e.hp<=0)return;const s=CH[e.k].sk[k];
    if(s&&s.t==='special'){
      if(e.stun>0||e.dc>0||e.cd[k]>0||(s.need&&e.pur<=0))return;
      const o=usk(e,k),ti=getTarget(i),t=G.p[ti]||G.p[0],ax=tx===undefined?t.x:tx,ay=ty===undefined?t.y:ty;
      e.cd[k]=s.cd;if(i>0)G.bc=G.t;e.face=ax>e.x?1:-1;
      if(SP[s.sx])SP[s.sx](i,o,e,t,Math.atan2(ay-e.y,ax-e.x));return}}
  return _use(i,k,tx,ty)};

const _dmg=dmgTo;
dmgTo=function(i,d,sure,attIdx){
  const sIdx=attIdx!==undefined?attIdx:getTarget(i);
  if(G&&G.p[sIdx]&&G.p[sIdx].haste>0)d*=1.35;
  return _dmg(i,d,sure,attIdx)
};

const _boom=boom;
boom=function(s){
  const hitsBefore=G.p.map(x=>x.hp);
  if(s.burn)zone(s.x,s.y,75,3,'#ff7a1c',s.o,45,0);
  _boom(s);
  if(s.rep){
    G.p.forEach((t,idx)=>{
      if(t.hp<hitsBefore[idx]){
        const a=Math.atan2(t.y-s.y,t.x-s.x);t.kx+=Math.cos(a)*1000;t.ky+=Math.sin(a)*1000;t.slam=1
      }
    });
  }
};

const _step=step;
step=function(dt){if(!isFinite(M.v[0])||!isFinite(M.v[1]))M.v=[0,0];_step(dt);if(!G||G.st!=='play')return;
  G.p.forEach(q=>{q.bzcd=Math.max(0,(q.bzcd||0)-dt)});G.Gh=(G.Gh||[]).filter(o=>(o.t-=dt)>0);
  {const a=G.p[0],bz=CH[a.k].bz,bb=document.getElementById('bblz');if(bb)bb.firstChild.style.transform='scaleY('+Math.min(1,a.bzcd/(bz?bz.cd:11))+')';
   for(let idx=1;idx<G.p.length;idx++){
     const o=G.p[idx];if(!o||o.hp<=0)continue;
     const ti=getTarget(idx),foe=G.p[ti];
     if(foe&&!(o.bzcd>0)&&o.stun<=0&&o.dc<=0&&D(o,foe)<280&&Math.random()<.01+(o.ai||DIFF)*.02)use(idx,'blz');
   }
  }
  G.T=G.T||[];G.T.forEach(o=>o.t-=dt);const due=G.T.filter(o=>o.t<=0);G.T=G.T.filter(o=>o.t>0);due.forEach(o=>o.f());
  G.M=(G.M||[]).filter(m=>(m.t-=dt)>0);
  G.Z=(G.Z||[]).filter(z=>{z.t-=dt;z.w-=dt;if(z.w<=0){z.k-=dt;if(z.k<=0){z.k+=.3;ring(z.x,z.y,z.c,z.r*.5);
    G.p.forEach((q,idx)=>{if(q.hp>0&&q.team!==G.p[z.o].team&&D(z,q)<z.r+q.r)dmgTo(idx,z.d,false,z.o)})}}return z.t>0});
  G.p.forEach((q,i)=>{if(q.hp<=0)return;if(q.haste>0){q.haste-=dt;if(q.stun<=0&&q.dc<=0&&q.dash<=0){q.x+=q.d[0]*CH[q.k].sp*.7*dt;q.y+=q.d[1]*CH[q.k].sp*.7*dt;clampA(q)}}if(q.slam>0){q.slam-=dt;if(Math.hypot(q.x,q.y)>A-q.r-3){q.slam=0;dmgTo(i,140,1);q.stun=Math.max(q.stun,.6);pop(q,'ارتطام!','#ffd166');G.shk=.3}}})};

const PAL={
  naoya:{hair:'#ecd773',skin:'#ffe0c8',coat:'#3a2f2a',acc:'#7ee8c9',eye:'#d9b84a'},
  gojo:{hair:'#f4f7ff',skin:'#ffe3d0',coat:'#1b2150',acc:'#4fc3ff',eye:'#6fd8ff'},
  suk:{hair:'#ff9db5',skin:'#ffd9c2',coat:'#e8e2d8',acc:'#2a2a33',eye:'#ff2e4a'},
  kashimo:{hair:'#242863',skin:'#ffdcc4',coat:'#2b2f63',acc:'#ffd23f',eye:'#8ad0ff'},
  toji:{hair:'#14161f',skin:'#f5d0b5',coat:'#1e2029',acc:'#c084fc',eye:'#10b981'}
};
const HR={
  naoya:[[-9,1],[-10,-7],[-4,-10],[3,-13],[10,-9],[11,0],[9,-3],[4,-6],[-2,-7],[-7,-5]],
  gojo:[[-9,-1],[-12,-9],[-6,-7],[-6,-15],[-1,-9],[3,-16],[5,-8],[12,-11],[9,-1],[5,-5],[1,-3],[-3,-5],[-6,-3]],
  suk:[[-9,0],[-11,-8],[-5,-7],[-3,-14],[1,-8],[6,-13],[7,-6],[12,-7],[9,0],[5,-4],[0,-2],[-5,-4]],
  kashimo:[[-9,7],[-11,-6],[-6,-9],[-2,-15],[3,-10],[8,-14],[10,-6],[10,7],[8,-1],[3,-4],[-2,-2],[-6,-4],[-8,2]],
  toji:[[-9,1],[-10,-6],[-5,-9],[0,-11],[6,-9],[10,-5],[9,2],[6,-2],[1,-4],[-4,-3],[-7,0]]
};
const ln=(x1,y1,x2,y2)=>{g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};

function drawTojiWeapons(e,f,sc,hx,hy2,bx,by){
  g.save();
  g.save();
  g.translate(hx,hy2);
  const ang1=e.punch>0?0:(f>0?-0.45:Math.PI+0.45);
  g.rotate(ang1);
  g.strokeStyle='#78350f';g.lineWidth=3.2*sc;ln(-6*sc,0,6*sc,0);
  g.fillStyle='#fbbf24';g.fillRect(5*sc,-3.5*sc,3*sc,7*sc);
  g.fillStyle='#e2e8f0';g.strokeStyle='#38bdf8';g.lineWidth=1.1*sc;
  g.beginPath();
  g.moveTo(8*sc,-2.5*sc);g.lineTo(25*sc,-1*sc);g.lineTo(29*sc,0);g.lineTo(25*sc,1.5*sc);g.lineTo(8*sc,2.5*sc);
  g.closePath();g.fill();g.stroke();
  g.beginPath();
  g.moveTo(11*sc,-2*sc);g.lineTo(19*sc,-7*sc);g.lineTo(15*sc,-2*sc);
  g.closePath();g.fill();g.stroke();
  g.restore();

  g.save();
  g.translate(bx,by);
  const ang2=e.punch>0?(f>0?-0.6:Math.PI+0.6):(f>0?-2.3:-0.85);
  g.rotate(ang2);
  g.strokeStyle='#312e81';g.lineWidth=3*sc;ln(-7*sc,0,3*sc,0);
  g.fillStyle='#1f2937';g.beginPath();g.arc(4*sc,0,4.5*sc,0,7);g.fill();
  g.fillStyle='#090d16';g.strokeStyle='#c084fc';g.lineWidth=1.3*sc;
  g.beginPath();
  g.moveTo(5*sc,-2.4*sc);g.lineTo(31*sc,-1.8*sc);g.lineTo(35*sc,0);g.lineTo(31*sc,2.2*sc);g.lineTo(5*sc,2.4*sc);
  g.closePath();g.fill();g.stroke();
  g.restore();
  g.restore();
}

function overlays(){
  (G.Gh||[]).forEach(o=>{g.save();g.globalAlpha=Math.max(0,o.t/.35)*.5;g.fillStyle=o.c;g.beginPath();g.ellipse(X(o.x),Y(o.y),10*S,26*S,0,0,7);g.fill();g.restore()});
  (G.Z||[]).forEach(z=>{g.save();g.globalAlpha=z.w>0?.2:.3+.12*Math.sin(G.t*20);g.fillStyle=z.c;g.beginPath();g.arc(X(z.x),Y(z.y),z.r*S,0,7);g.fill();g.globalAlpha=.9;g.strokeStyle=z.c;g.lineWidth=2;g.stroke();g.restore()});
  (G.M||[]).forEach(m=>{const mx=X(m.o?m.o.x:m.x),my=Y(m.o?m.o.y:m.y),r=m.r*S;g.save();g.strokeStyle=m.c;g.fillStyle=m.c;
    if(m.sq){const k=1-.25*(1-m.t/m.tot);g.globalAlpha=.16;g.fillRect(mx-r,my-r,2*r,2*r);g.globalAlpha=.95;g.lineWidth=3;g.strokeRect(mx-r*k,my-r*k,2*r*k,2*r*k);g.globalAlpha=.4;g.lineWidth=1.5;g.beginPath();g.moveTo(mx-r*k,my-r*k);g.lineTo(mx+r*k,my+r*k);g.moveTo(mx+r*k,my-r*k);g.lineTo(mx-r*k,my+r*k);g.stroke()}
    else{g.lineWidth=2.5;g.setLineDash([5,4]);g.beginPath();g.arc(mx,my,r,0,7);g.stroke();g.setLineDash([]);g.globalAlpha=.3;g.beginPath();g.arc(mx,my,r*(1-m.t/m.tot),0,7);g.fill()}
    g.restore()})}

drawStickman=function(e){
  if(!e||e.hp<=0)return;
  if(e===G.p[G.p.length-1])overlays();
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
  g.strokeStyle=e.k==='toji'?'#e5e7eb':'#12152e';g.lineWidth=5*sc;ln(-3*sc,9*sc,-3*sc-sw,23*sc);ln(3*sc,9*sc,3*sc+sw,23*sc);
  g.strokeStyle=e.k==='toji'?'#111827':'#fff';g.lineWidth=5.5*sc;ln(-3*sc-sw,23*sc,-3*sc-sw+f*3*sc,23*sc);ln(3*sc+sw,23*sc,3*sc+sw+f*3*sc,23*sc);
  g.fillStyle=e.dash>0?'#fff':P.coat;g.beginPath();g.moveTo(-8*sc,-10*sc);g.lineTo(8*sc,-10*sc);g.lineTo(6*sc,11*sc);g.lineTo(-6*sc,11*sc);g.closePath();g.fill();
  g.shadowBlur=0;g.strokeStyle=P.acc;g.lineWidth=2*sc;ln(0,-10*sc,0,11*sc);
  if(e.k==='suk'){g.lineWidth=4*sc;ln(-6*sc,6*sc,6*sc,6*sc)}
  if(e.k==='gojo'){g.fillStyle='#0b0e26';g.fillRect(-4*sc,-12*sc,8*sc,4*sc)}
  if(e.k==='kashimo'){ln(-8*sc,-10*sc,-6*sc,11*sc);ln(8*sc,-10*sc,6*sc,11*sc)}
  g.strokeStyle=e.dash>0?'#fff':(e.k==='toji'?P.skin:P.coat);g.lineWidth=4.5*sc;g.beginPath();
  let hx,hy2,bx,by;
  if(e.punch>0){hx=f*19*sc;hy2=-5*sc;bx=-f*7*sc;by=2*sc}else if(e.bl>0){hx=f*11*sc;hy2=-11*sc;bx=f*12*sc;by=-4*sc}else{const a=e.walk>0?-sw*.6:3*sc;hx=f*9*sc;hy2=2*sc+a;bx=-f*8*sc;by=3*sc-a}
  g.moveTo(0,-8*sc);g.lineTo(hx,hy2);g.moveTo(0,-8*sc);g.lineTo(bx,by);g.stroke();
  g.fillStyle=P.skin;g.beginPath();g.arc(hx,hy2,3*sc,0,7);g.fill();g.beginPath();g.arc(bx,by,3*sc,0,7);g.fill();
  
  if(e.k==='toji')drawTojiWeapons(e,f,sc,hx,hy2,bx,by);

  if(e.bl>0){g.strokeStyle=e.ba<.25?'#ffd166':'#4fc3ff';g.lineWidth=2.5;g.beginPath();g.arc(f*11*sc,-5*sc,15*sc,-1.1,1.1);g.stroke()}
  g.fillStyle=P.skin;g.beginPath();g.arc(0,hy,9*sc,0,7);g.fill();
  const u=sc*.95;g.fillStyle=P.hair;g.beginPath();H.forEach(([x,y],j)=>j?g.lineTo(x*u,hy+y*u):g.moveTo(x*u,hy+y*u));g.closePath();g.fill();
  if(e.k==='gojo'){g.fillStyle='#0b0e26';g.fillRect(-9*sc,hy-1.5*sc,18*sc,4*sc);g.fillStyle=P.eye;g.shadowColor=P.eye;g.shadowBlur=8;g.fillRect(f*3*sc-1*sc,hy-.5*sc,2*sc,1.6*sc);g.shadowBlur=0}
  else{for(const s of[-1,1]){const ex=s*3.6*sc+f*1.2*sc;g.fillStyle='#fff';g.beginPath();g.ellipse(ex,hy+1*sc,2.4*sc,2.8*sc,0,0,7);g.fill();g.fillStyle=P.eye;g.beginPath();g.arc(ex+f*.7*sc,hy+1.2*sc,1.6*sc,0,7);g.fill()}}
  g.strokeStyle='#3a2b35';g.lineWidth=1.3*sc;ln(f*1.5*sc-2*sc,hy+6*sc,f*1.5*sc+2*sc,hy+6*sc);
  if(e.k==='toji'){g.strokeStyle='#991b1b';g.lineWidth=1.2*sc;ln(f*3*sc,hy+4*sc,f*4.5*sc,hy+7.5*sc)}
  if(e.k==='suk'){g.strokeStyle='#2a2a33';g.lineWidth=1.4*sc;for(const s of[-1,1])ln(s*3.6*sc,hy+4.5*sc,s*3.6*sc,hy+7.5*sc);ln(-7*sc,hy-2*sc,-7*sc,hy+3*sc)}
  if(e.k==='kashimo'){g.strokeStyle='#d6455d';g.lineWidth=1.4*sc;ln(-5*sc,hy-3*sc,3*sc,hy+4*sc);
    g.strokeStyle='#8ad0ff';g.lineWidth=1.6*sc;g.beginPath();for(let n=0;n<2;n++){const sx=(Math.random()-.5)*34*sc,sy=(Math.random()-.5)*50*sc;g.moveTo(sx,sy);g.lineTo(sx+(Math.random()-.5)*10*sc,sy+(Math.random()-.5)*10*sc)}g.stroke()}
  g.restore()};

const _buildActionButtons=buildActionButtons;
buildActionButtons=function(k){
  _buildActionButtons(k);
  const b=document.createElement('button');b.className='b';b.id='bblz';b.style.borderColor='#c084fc';
  b.innerHTML='<i></i><span>'+(CH[k].bz?CH[k].bz.n:'اندفاع 24 إطار')+'</span>';
  b.addEventListener('pointerdown',e=>{e.preventDefault();use(0,'blz')});
  BT.insertBefore(b,document.getElementById('bdash'));
  applyLayout();
};
addEventListener('keydown',e=>{if(e.key==='z')use(0,'blz')});

let camOn=false;
const _draw=draw;
draw=function(t){
  if(G){camOn=true;
    const alive=G.p.filter(x=>x.hp>0);
    if(alive.length){
      let minX=1e9,maxX=-1e9,minY=1e9,maxY=-1e9;
      alive.forEach(p=>{minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y)});
      const mx=(minX+maxX)/2,my=(minY+maxY)/2,wide=W>H;
      const ts=Math.min(W*.92/Math.max(660,(maxX-minX)+280),(wide?H*.66:H*.6)/Math.max(440,(maxY-minY)+240));
      const c=G.cam=G.cam||{x:mx,y:my,s:ts};c.x+=(mx-c.x)*.15;c.y+=(my-c.y)*.15;c.s+=(ts-c.s)*.1;
      S=c.s;cx=W/2-c.x*S;cy=(wide?H*.55:H*.38)-c.y*S;
    }
  }
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
  g.beginPath();g.arc(ox,oy,R+14*S,0,7);g.lineWidth=2;g.strokeStyle='rgba(79,195,255,.25isComposite)'?'' : '';g.stroke();
  for(let n=0;n<24;n++){const ag=n*Math.PI/12,px=ox+Math.cos(ag)*(R+14*S),py=oy+Math.sin(ag)*(R+14*S),pl=.6+.4*Math.sin(T*3+n);
    g.save();g.shadowColor='#4fc3ff';g.shadowBlur=12;g.globalAlpha=.5+.5*pl;g.fillStyle='#8fd8ff';g.beginPath();g.moveTo(px,py-9*S);g.lineTo(px+5*S,py);g.lineTo(px,py+9*S);g.lineTo(px-5*S,py);g.closePath();g.fill();g.restore()}
};
if(!G)menu();
})();
