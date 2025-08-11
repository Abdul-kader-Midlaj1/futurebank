// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if(toggle){
  toggle.addEventListener('click', ()=> {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counters
function animateCounter(el, target){
  let duration = 1200;
  const start = performance.now();
  function step(now){
    let t = Math.min(1, (now - start)/duration);
    const eased = 1 - Math.pow(1 - t, 2);
    el.textContent = Math.floor(eased * target);
    if(t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.counter').forEach(c=>{
    const target = Number(c.dataset.target) || 0;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(c, target);
          io.disconnect();
        }
      });
    }, {threshold:0.3});
    io.observe(c);
  });
});
