document.addEventListener('DOMContentLoaded', () => {
  // ===== LOADER =====
  const loader = document.querySelector('.loader');
  
  // Esconder loader após 1.5s (simulando carregamento)
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.querySelector('.scroll-progress');
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== DARK MODE TOGGLE =====
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // ===== MOBILE MENU TOGGLE =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Bloquear scroll quando o menu estiver aberto
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== ANIMAÇÕES COM INTERSECTION OBSERVER =====
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar seções
        if (entry.target.classList.contains('section')) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
        
        // Animar cards de projeto em sequência
        if (entry.target.classList.contains('projects-grid')) {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 150);
          });
        }
        
        // Animar itens de habilidade em sequência
        if (entry.target.classList.contains('skills-grid')) {
          const items = entry.target.querySelectorAll('.skill-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
        
        // Animar itens da linha do tempo em sequência
        if (entry.target.classList.contains('timeline')) {
          const items = entry.target.querySelectorAll('.timeline-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 200);
          });
        }
      }
    });
  };
  
  // Criar observador
  const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1
  });
  
  // Observar seções
  document.querySelectorAll('.section, .projects-grid, .skills-grid, .timeline').forEach(section => {
    observer.observe(section);
  });

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      // Simular envio do formulário
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        
        // Resetar formulário após 2 segundos
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          // Mostrar mensagem de sucesso
          const successMessage = document.createElement('div');
          successMessage.className = 'form-success';
          successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!';
          contactForm.appendChild(successMessage);
          
          // Remover mensagem após 3 segundos
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }, 2000);
      }, 1500);
    });
  }

  // ===== MODAIS =====
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(`${modalId}-modal`);
      
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ===== ANO ATUAL NO FOOTER =====
  const currentYear = document.getElementById('current-year');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ===== ANIMAÇÃO DE FLUTUAÇÃO PARA A IMAGEM DO HERO =====
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    setInterval(() => {
      heroImage.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        heroImage.style.transform = 'translateY(0)';
      }, 1000);
    }, 2000);
  }

  // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
