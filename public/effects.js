(function(){
  const d = document, w = window;
  const prefersReduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) Detecta e ativa “glass” na navbar existente sem mudar HTML */
  (function navGlass(){
    const header = d.querySelector('header, nav');
    if(!header) return;
    const style = w.getComputedStyle(header);
    const isSticky = ['sticky','fixed'].includes(style.position);
    if(!isSticky){
      let applied = false;
      w.addEventListener('scroll', ()=>{
        const rect = header.getBoundingClientRect();
        const nearTop = rect.top <= 0;
        if(nearTop && !applied){ header.setAttribute('data-nav-glass',''); applied = true; }
      }, {passive:true});
    } else {
      header.setAttribute('data-nav-glass','');
    }
  })();

  /* 2) Scroll suave + scrollspy (aponta active sem mexer nos links) */
  (function smoothAndSpy(){
    // smooth scrolling
    d.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        if(!id || id.length < 2) return;
        const target = d.querySelector(id);
        if(!target) return;
        e.preventDefault();
        if(prefersReduce){
          target.scrollIntoView({behavior:'auto', block:'start'});
        } else {
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }, {passive:false});
    });

    // scrollspy
    const sections = Array.from(d.querySelectorAll('section[id]'));
    const links    = Array.from(d.querySelectorAll('a[href^="#"]'));
    if(!sections.length || !links.length) return;

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach(l=>{
          l.removeAttribute('data-nav-active');
          if(l.getAttribute('href') === id){ l.setAttribute('data-nav-active',''); }
        });
      });
    }, { rootMargin: '0px 0px -60% 0px', threshold: 0.25 });

    sections.forEach(sec=> io.observe(sec));
  })();

  /* 3) Reveal-on-scroll: aplica a .reveal e exibe quando entra na viewport */
  (function revealOnScroll(){
    const eligible = [
      '.reveal', '.card', '.portfolio-card',
      '#servicos .service-item', '#portfolio .portfolio-item',
      '#processo .process-step', '#diferenciais .differential-item',
      '#depoimentos .testimonial-item', '#faq .faq-item', '#contato .contact-card'
    ];
    const nodes = new Set();
    eligible.forEach(sel => d.querySelectorAll(sel).forEach(el => nodes.add(el)));
    if(!nodes.size) return;
    nodes.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('show'); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    nodes.forEach(el => io.observe(el));
  })();

  /* 4) Parallax sutil no hero (se existir .hero ou #hero) */
  (function parallaxHero(){
    if(prefersReduce) return;
    const hero = d.querySelector('.hero, #hero') || d.querySelector('.section-with-bg');
    if(!hero) return;
    hero.classList.add('parallax-bg');
    let ticking = false;
    const update = ()=>{
      const y = w.scrollY || w.pageYOffset || 0;
      const offset = Math.max(-40, Math.min(40, y * 0.04)); // clamp
      hero.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };
    w.addEventListener('scroll', ()=>{
      if(!ticking){
        ticking = true;
        w.requestAnimationFrame(update);
      }
    }, {passive:true});
  })();

  /* 5) Lightbox global para imagens do portfólio */
  (function globalLightbox(){
    const root = d.getElementById('portfolio') || d.body;
    if(!root) return;

    // construir elementos
    const backdrop = d.createElement('div');
    backdrop.className = 'lb-backdrop';
    const closeBtn = d.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.setAttribute('aria-label','Fechar imagem');
    closeBtn.textContent = '×';
    const img = d.createElement('img');

    backdrop.appendChild(img);
    backdrop.appendChild(closeBtn);
    d.body.appendChild(backdrop);

    const open = (src, alt)=>{
      if(!src) return;
      img.src = src;
      img.alt = alt || '';
      backdrop.classList.add('open');
      d.body.style.overflow = 'hidden';
    };
    const close = ()=>{
      backdrop.classList.remove('open');
      img.removeAttribute('src');
      d.body.style.overflow = '';
    };

    backdrop.addEventListener('click', (e)=>{
      if(e.target === backdrop) close();
    });
    closeBtn.addEventListener('click', close);
    d.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

    // delegação de clique para imagens dentro do portfólio
    root.addEventListener('click', (e)=>{
      const target = e.target;
      if(!(target instanceof Element)) return;
      if(target.tagName.toLowerCase() !== 'img') return;
      // evitar conflito com botões/carrossel
      if(target.closest('button')) return;
      const src = target.getAttribute('src');
      const alt = target.getAttribute('alt');
      open(src, alt);
    });
  })();
})();