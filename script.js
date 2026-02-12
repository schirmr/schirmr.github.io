        // Atualizar ano automaticamente no footer (somente se o elemento existir)
        const direitos = document.getElementById("direitos");
        if (direitos) {
            const anoAtual = new Date().getFullYear();
            direitos.innerHTML = `&copy; ${anoAtual}. Todos os direitos reservados. | Feito com ❤️ por Gabriel Lorenson Schirmer`;
        }
        
        // Tela de carregamento (se existir)
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            if (!loader) return;
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1000);
        });

        // Nav mobile (só se existir no DOM)
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Link ativo na navegação ao rolar a página
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Observador de interseção para animações (só em páginas com fade-in)
        const fadeElements = document.querySelectorAll('.fade-in');
        if (fadeElements.length) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (entry.target.id === 'skills') {
                            renderSkillRatings();
                        }
                    }
                });
            }, observerOptions);

            fadeElements.forEach(el => observer.observe(el));
        }

        // Render star ratings for skills (supports half stars)
        function renderSkillRatings() {
            const ratings = document.querySelectorAll('.skill-rating');
            ratings.forEach(el => {
                if (el.dataset.rendered) return;
                const raw = el.getAttribute('data-rating') || '0';
                const value = Math.max(0, Math.min(5, parseFloat(raw)));
                const full = Math.floor(value);
                const half = (value - full) >= 0.5;
                let html = '';
                for (let i = 0; i < full; i++) {
                    html += '<i class="fas fa-star" aria-hidden="true"></i>';
                }
                if (half) {
                    html += '<i class="fas fa-star-half-stroke" aria-hidden="true"></i>';
                }
                const empty = 5 - full - (half ? 1 : 0);
                for (let i = 0; i < empty; i++) {
                    html += '<i class="far fa-star" aria-hidden="true"></i>';
                }
                el.innerHTML = html;
                el.dataset.rendered = '1';
            });
        }

        // Botão voltar ao topo
        const backToTopButton = document.getElementById('back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Manipulador do formulário de contato
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Criar link mailto
            const mailtoLink = `mailto:contato@exemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
            
            // Mostrar mensagem de sucesso
            alert('Obrigado pela sua mensagem! Seu cliente de email será aberto para enviar a mensagem.');
            
            // Resetar formulário
            form.reset();
        }

        // Rolagem suave para links de âncora
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Adicionar efeito de partículas interativas na seção hero
        function createParticles() {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(34, 211, 238, 0.3)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                hero.appendChild(particle);
            }
        }

        // Adicionar animação flutuante
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Inicializar partículas após o carregamento da página
        window.addEventListener('load', createParticles);

        // Filtro por semestre na página de currículo
        function initCourseFilter() {
            const filterButtons = document.querySelectorAll('.filter-button');
            const courseCards = document.querySelectorAll('.courses-grid .course-card');
            if (!filterButtons.length || !courseCards.length) return;

            function applyFilter(semester) {
                courseCards.forEach(card => {
                    const cardSemester = card.getAttribute('data-semester');
                    if (semester === cardSemester) {
                        card.classList.remove('is-hidden');
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            }

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const semester = btn.getAttribute('data-semester-filter');
                    applyFilter(semester);
                });
            });

            // Estado inicial: mostrar 1º semestre
            const initialBtn = Array.from(filterButtons).find(b => b.getAttribute('data-semester-filter') === '1');
            if (initialBtn) {
                filterButtons.forEach(b => b.classList.remove('active'));
                initialBtn.classList.add('active');
            }
            applyFilter('1');
        }

        // Inicializar filtros após o carregamento do DOM
        window.addEventListener('DOMContentLoaded', initCourseFilter);

        // Adicionar efeito de digitação ao título hero
        function typeWriter(element, text, speed = 100, delay = 1500) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, delay);
        }

        // Inicializar efeito de digitação
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const typewriterText = heroTitle.getAttribute('data-typewriter-text') || heroTitle.textContent || 'Gabriel L. Schirmer';
                typeWriter(heroTitle, typewriterText, 150);
            }
        });

        // Página de interesses (love.html): animação de entrada + parallax
        function initLovePage() {
            const wrapper = document.querySelector('.love-wrapper');
            const blocks = Array.from(document.querySelectorAll('.love-block'));
            if (!wrapper || !blocks.length) return;

            const trackTitle = document.querySelector('.track-title.typewriter');
            if (trackTitle) {
                const text = trackTitle.getAttribute('data-typewriter-text') || trackTitle.textContent.trim();
                typeWriter(trackTitle, text, 200, 320);
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = blocks.indexOf(entry.target);
                        if (idx >= 0) {
                            entry.target.style.animationDelay = `${0.12 * idx}s`;
                        }
                        entry.target.classList.add('entered');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

            blocks.forEach((el) => observer.observe(el));

            let ticking = false;
            const update = () => {
                const y = window.scrollY || window.pageYOffset;
                wrapper.style.setProperty('--parallax', `${y}px`);
                wrapper.style.setProperty('--parallax-rev', `${y}px`);

                blocks.forEach((el, idx) => {
                    const depth = idx % 2 === 0 ? 0.012 : -0.01;
                    el.style.translate = `0 ${y * depth}px`;
                });

                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(update);
                    ticking = true;
                }
            }, { passive: true });

            update();
        }

        window.addEventListener('DOMContentLoaded', initLovePage);