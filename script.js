/**
 * Ismoiljon Polatov — Portfolio JavaScript
 * Interaktivlik, Mobil menyu, Jonli soat va Nusxalash funksiyalari
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobil Menyu (Burger toggle)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // 2. Jonli Soat (Loyiha 2 uchun Real-Time Soat)
    const demoClock = document.getElementById('demoClock');
    function updateClock() {
        if (!demoClock) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        demoClock.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 3. Aktiv bo'limni kuzatish (Scroll spy)
    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNavOnScroll);

    // 4. Header soyasi scroll bo'lganda
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.9)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

// 5. Matndan nusxa olish funksiyasi (Clipboard)
function copyText(text, label = 'Matn') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} nusxalandi!`);
    }).catch(err => {
        console.error('Nusxalashda xatolik:', err);
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} nusxalandi!`);
    });
}

// 6. Xabarnoma oynasi (Toast)
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// 7. Aloqa shaklini yuborish (Form submit handler)
function handleMessageSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const contact = document.getElementById('senderContact').value.trim();
    const message = document.getElementById('senderMessage').value.trim();
    const statusBox = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!name || !contact || !message) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Yuborilmoqda...';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Xabarni Yuborish';
        statusBox.textContent = `Rahmat, ${name}! Xabaringiz qabul qilindi. Tez orada bog'lanaman.`;
        statusBox.className = 'form-status success';
        document.getElementById('contactForm').reset();

        setTimeout(() => {
            statusBox.style.display = 'none';
        }, 5000);
    }, 700);
}
