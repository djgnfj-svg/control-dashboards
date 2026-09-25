// 슬라이드 넘기기 — ←→ · PgUp/PgDn · Space, 번호 표시
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const pos = document.querySelector('.bar .pos');
  let cur = 0;
  slides.forEach((s, i) => {
    const no = s.querySelector('.card .no');
    if (no) no.textContent = `${i + 1} / ${slides.length}`;
  });
  const show = () => { if (pos) pos.textContent = `${cur + 1} / ${slides.length}`; };
  const go = i => {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides[cur].scrollIntoView({ behavior: 'smooth', block: 'center' });
    show();
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { cur = slides.indexOf(e.target); show(); }
  }), { threshold: 0.6 });
  slides.forEach(s => io.observe(s));
  addEventListener('keydown', e => {
    if (e.target.closest('input,textarea')) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  });
  document.querySelector('.bar .prev')?.addEventListener('click', () => go(cur - 1));
  document.querySelector('.bar .next')?.addEventListener('click', () => go(cur + 1));
  // #3 처럼 번호로 들어오면 그 장부터
  const n = +location.hash.slice(1);
  if (n > 0 && n <= slides.length) {
    cur = n - 1;
    document.documentElement.style.scrollBehavior = 'auto';
    slides[cur].scrollIntoView({ block: 'center' });
    document.documentElement.style.scrollBehavior = '';
  }
  show();
})();
