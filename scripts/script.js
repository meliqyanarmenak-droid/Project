document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('navMenu');

    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    const modal = document.getElementById('payment-modal');
    const modalServiceName = document.getElementById('modal-service-name');
    const modalPrice = document.querySelector('.modal-price');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const closeModal = document.querySelector('.close-modal');
    const paymentForm = document.getElementById('payment-form');

    if (modal && modalServiceName && modalPrice && buyButtons.length > 0 && closeModal && paymentForm) {
        buyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.card, .service-card, .start-card, .lux-card');
                if (card) {
                    const service = card.querySelector('h3')?.textContent || 'Услуга';
                    const price = card.querySelector('.price')?.textContent || 'Цена';
                    modalServiceName.textContent = service;
                    modalPrice.textContent = price;
                    modal.style.display = 'flex';
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за интерес! В реальном проекте здесь будет интеграция с YooKassa / ЮMoney.');
            modal.style.display = 'none';
        });
    }

    const sections = document.querySelectorAll('section');
    if (sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => observer.observe(section));
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10,10,10,0.95)';
            } else {
                header.style.background = 'rgba(10,10,10,0.8)';
            }
        });
    }

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = form.elements["name"]?.value;
            const contact = form.elements["contact"]?.value;

            if (!name || !contact) {
                alert("Заполните все поля");
                return;
            }

            try {
                const res = await fetch("/.netlify/functions/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, contact })
                });

                if (res.ok) {
                    alert("Заявка отправлена! Мы скоро свяжемся с вами.");
                    form.reset();
                } else {
                    alert("Ошибка отправки. Попробуйте позже.");
                }
            } catch (error) {
                alert("Ошибка сети. Попробуйте позже.");
                console.error(error);
            }
        });
    }
});