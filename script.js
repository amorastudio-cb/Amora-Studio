
/* =====================================
   AMORA STUDIO - JAVASCRIPT
===================================== */

// 1. Atualizar automaticamente o ano do rodapé

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 2. Animação suave ao aparecer na tela

const animatedElements = document.querySelectorAll(
    ".service-card, .step, .about, .faq details"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedElements.forEach(element => {
        element.classList.add("animate");
        observer.observe(element);
    });
}


// 3. Efeito de rolagem no cabeçalho

const header = document.querySelector(".header");

function atualizarCabecalho() {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }
}

atualizarCabecalho();

window.addEventListener("scroll", atualizarCabecalho);


// 4. Fechar outras perguntas ao abrir uma nova

const faqItems = document.querySelectorAll(".faq details");

faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
        if (item.open) {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        }
    });
});


// 5. Registrar acesso ao catálogo de serviços

document.querySelectorAll(".service-card a").forEach(link => {
    link.addEventListener("click", () => {
        console.log("Cliente acessou o catálogo de serviços.");
    });
});


// 6. Registrar carregamento para testes

console.log("Amora Studio carregada com sucesso! 🍇");
