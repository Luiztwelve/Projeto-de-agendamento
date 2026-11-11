/**
 * ANA BEATRIZ EUGENIO - NAIL DESIGNER
 * Arquivo de Scripts JavaScript (script.js)
 * Interatividade, Menu Responsivo, ScrollSpy, Filtro de Portfólio e Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // -------------------------------------------------------------------------
    // 1. CABEÇALHO COM SOMBRA AO ROLAR (STICKY HEADER SCROLLED STATE)
    // -------------------------------------------------------------------------
    const header = document.getElementById('header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // -------------------------------------------------------------------------
    // 2. MENU MOBILE (DRAWER & OVERLAY)
    // -------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobileMenu = () => {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
    };

    const closeMobileMenu = () => {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', openMobileMenu);
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // -------------------------------------------------------------------------
    // 3. ROLAGEM SUAVE COM COMPENSAÇÃO DA ALTURA DO HEADER (SMOOTH SCROLL)
    // -------------------------------------------------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 2);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 4. SCROLLSPY (DESTAQUE DO LINK ATIVO AO ROLAR A PÁGINA)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // -------------------------------------------------------------------------
    // 5. FILTRO DE PROCEDIMENTOS NA GALERIA (PORTFÓLIO)
    // -------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Atualiza classe ativa dos botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Efeito de transição de aparição
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 6. LIGHTBOX MODAL PARA EXPANDIR FOTOS DA GALERIA
    // -------------------------------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    const openLightbox = (imgSrc, imgAlt, captionText) => {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt || 'Imagem ampliada do portfólio';
        lightboxCaption.textContent = captionText || imgAlt;
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 200);
    };

    // Adiciona evento de clique em cada card da galeria
    galleryCards.forEach(card => {
        const img = card.querySelector('.gallery-img');
        const title = card.querySelector('.overlay-title')?.textContent || '';
        const tag = card.querySelector('.overlay-tag')?.textContent || '';
        const zoomBtn = card.querySelector('.overlay-zoom-btn');

        const triggerAction = () => {
            if (img) {
                openLightbox(img.src, img.alt, `${tag ? tag + ' — ' : ''}${title}`);
            }
        };

        if (zoomBtn) {
            zoomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                triggerAction();
            });
        }

        card.addEventListener('click', triggerAction);
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', closeLightbox);
    }

    // Fechar lightbox pressionando tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    // -------------------------------------------------------------------------
    // 7. ANIMAÇÕES SUAVES AO ENTRAR NA TELA (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------------
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll(
            '.service-card, .about-photo-wrapper, .about-bio-column, .about-features-column, .testimonial-card, .contact-card-banner'
        );

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            revealOnScroll.observe(el);
        });
    }

    console.log('Site de Nail Design Ana Beatriz Eugênio carregado com sucesso!');
});
