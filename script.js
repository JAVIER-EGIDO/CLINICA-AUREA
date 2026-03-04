document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader "WOW" Effect
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1500); // 1.5s load effect

    // 2. Sticky Header
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const nav = document.querySelector(".nav");
    
    mobileBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        if(nav.classList.contains("nav-active")) {
            mobileBtn.innerHTML = '<i class="ph ph-x"></i>';
            mobileBtn.style.color = "var(--color-dark)";
        } else {
            mobileBtn.innerHTML = '<i class="ph ph-list"></i>';
            mobileBtn.style.color = header.classList.contains("scrolled") ? "var(--color-dark)" : "#fff";
        }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav-active");
            mobileBtn.innerHTML = '<i class="ph ph-list"></i>';
        });
    });

    // 4. ScrollReveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // 5. Before / After Slider
    const baContainer = document.querySelector('.ba-slider-container');
    const baSlider = document.getElementById('ba-slider-input');
    const baBefore = document.getElementById('ba-before-img');
    const baLine = document.getElementById('ba-slider-line');
    
    // Auto rescale before image inner container 
    const beforeImg = baBefore.querySelector('img');

    function updateSlider() {
        const sliderPos = baSlider.value;
        baBefore.style.width = `${sliderPos}%`;
        baLine.style.left = `${sliderPos}%`;
        
        // Ensure the inner image always stretches the full container width securely
        beforeImg.style.width = `${baContainer.offsetWidth}px`;
    }

    if (baSlider) {
        // Init
        updateSlider();
        
        baSlider.addEventListener("input", updateSlider);
        window.addEventListener("resize", updateSlider);
    }

    // 6. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Name validation
            const nameInput = document.getElementById('name');
            if(nameInput.value.trim() === "") {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('error');
            }

            // Phone validation
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^[0-9\+ ]{9,}$/;
            if(!phoneRegex.test(phoneInput.value.trim())) {
                phoneInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                phoneInput.parentElement.classList.remove('error');
            }

            // Interest validation
            const interestInput = document.getElementById('interest');
            if(interestInput.value === "") {
                interestInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                interestInput.parentElement.classList.remove('error');
            }

            // Simulate form submission
            if(isValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                btn.innerHTML = 'Enviando...';
                btn.disabled = true;

                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                }, 1500);
            }
        });
        
        // Clear errors on input
        contactForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }
});
/* =========================================
   ENVÍO DEL FORMULARIO CON FORMSPREE
   ========================================= */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Evita que el navegador salte a otra página

        // Cambiar el texto del botón mientras carga
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Si todo va bien: ocultamos formulario y mostramos mensaje de éxito dorado
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                contactForm.reset();
            } else {
                alert('Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.');
                btn.innerText = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            alert('Error de conexión. Por favor, revisa tu internet.');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
