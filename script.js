document.documentElement.classList.add('js');

const WHATSAPP_NUMBER = '5584994580786';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  const floatBtn = document.querySelector('.wa-float');
  const contato = document.getElementById('contato');

  document.querySelectorAll('[data-wa]').forEach((link) => {
    const assunto = link.dataset.assunto || 'atendimento psicológico';
    const mensagem = `Olá! Encontrei seu site e gostaria de obter mais informações sobre ${assunto}.`;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const revealItems = document.querySelectorAll('.reveal-img');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((el) => io.observe(el));

    if (contato && floatBtn) {
      new IntersectionObserver(([entry]) => {
        floatBtn.classList.toggle('is-hidden', entry.isIntersecting);
      }, { threshold: 0.2 }).observe(contato);
    }
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel');
  if (!track) return;
  const prev = document.querySelector('[data-carousel="prev"]');
  const next = document.querySelector('[data-carousel="next"]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const step = () => {
    const card = track.querySelector('.card');
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= max - 4;
  };
  const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  track.addEventListener('keydown', (e) => {
    if (e.target !== track) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  update();

  let down = false;
  let moved = false;
  let startX = 0;
  let startLeft = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true;
    moved = false;
    startX = e.clientX;
    startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) {
      moved = true;
      track.classList.add('is-dragging');
    }
    if (moved) track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
  });
  track.addEventListener('click', (e) => {
    if (!moved) return;
    e.preventDefault();
    e.stopPropagation();
    moved = false;
  }, true);
});
