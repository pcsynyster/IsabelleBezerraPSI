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
