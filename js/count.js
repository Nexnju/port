// Nav: solid on scroll + mobile menu
const nav=document.getElementById('nav'),burger=document.getElementById('burger'),links=document.getElementById('links');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40));
burger.onclick=()=>{burger.classList.toggle('open');links.classList.toggle('open')};
links.querySelectorAll('a').forEach(a=>a.onclick=()=>{burger.classList.remove('open');links.classList.remove('open')});

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Hero counters
document.querySelectorAll('[data-count]').forEach(el=>{
  const end=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now(),dur=2200;
  (function tick(t){const p=Math.min((t-t0)/dur,1),v=Math.round(end*(1-Math.pow(1-p,3)));
    el.textContent=v.toLocaleString()+suf;if(p<1)requestAnimationFrame(tick)})(t0);
});

// Ticker
const items=[['VAT','16.0%',''],['PAYE','Filed','up'],['M-Pesa Recon','Matched','up'],['Net Profit','+12.4%','up'],['Cash Flow','Positive','up'],['Trial Balance','Balanced','up'],['Invoices','Reconciled','up'],['Corp Tax','30%',''],['Payroll','On time','up'],['Audit','Ready','up']];
const html=items.map(([a,b,c])=>`<div><b>${a}</b><i class="${c}" style="font-style:normal">${b}</i></div>`).join('');
document.getElementById('track').innerHTML=html+html;

// Floating numbers & accounting symbols canvas
const cv=document.getElementById('fin'),ctx=cv.getContext('2d');
const glyphs=['$','%','KES','Σ','Dr','Cr','VAT','+','−','=','Tax','÷','×','Net','P&L','₋','#','Δ'];
let W,H,parts=[];
function size(){const d=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  parts=Array.from({length:Math.min(60,Math.floor(W/22))},()=>make(true))}
function make(init){
  const num=Math.random()<.55;
  return{x:Math.random()*W,y:init?Math.random()*H:H+20,
    t:num?(Math.random()*9999).toFixed(Math.random()<.5?2:0).replace(/\B(?=(\d{3})+(?!\d))/g,','):glyphs[Math.random()*glyphs.length|0],
    s:num?12+Math.random()*10:18+Math.random()*30,v:.2+Math.random()*.6,a:.08+Math.random()*.22,
    gold:Math.random()<.6,ph:Math.random()*6.28,tick:0}}
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const p of parts){
    p.y-=p.v;p.ph+=.01;p.x+=Math.sin(p.ph)*.25;
    if(++p.tick%90===0&&/^[\d,.]+$/.test(p.t))p.t=(Math.random()*9999).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');
    if(p.y<-40){Object.assign(p,make(false))}
    const fade=Math.min(1,(H-p.y)/150,p.y/150);
    ctx.globalAlpha=p.a*Math.max(fade,0);
    ctx.fillStyle=p.gold?'#e6c97a':'#9fb8d0';
    ctx.font=`${p.s}px "Playfair Display", serif`;
    ctx.fillText(p.t,p.x,p.y);
  }
  ctx.globalAlpha=1;requestAnimationFrame(draw);
}
addEventListener('resize',size);size();draw();

/* =========================================================
   SERVICES SECTION – 100+ counter
   Save as js/services.js and load it AFTER port4.js:
   <script src="js/services.js"></script>
========================================================= */

(function () {

    var el = document.getElementById('svcNum');

    // Do nothing if the element is missing or the browser is too old
    if (!el || !('IntersectionObserver' in window)) return;

    // Respect "reduce motion": just show 100
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var target = +el.dataset.target;
    el.textContent = '0';

    var observer = new IntersectionObserver(function (entries) {

        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        var start = null;
        var duration = 1600;

        requestAnimationFrame(function step(time) {

            if (!start) start = time;

            var progress = Math.min((time - start) / duration, 1);

            // ease-out so it slows down near 100
            el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            if (progress < 1) requestAnimationFrame(step);

        });

    }, { threshold: 0.5 });

    observer.observe(el);

})();