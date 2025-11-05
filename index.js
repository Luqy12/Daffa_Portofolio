// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// Certificate popup functionality
document.addEventListener('DOMContentLoaded', function() {
  const certificateItems = document.querySelectorAll('.certificate-item');
  const popup = document.createElement('div');
  popup.className = 'certificate-popup';
  popup.innerHTML = `
    <button class="close-btn">&times;</button>
    <img src="" alt="Certificate" />
  `;
  document.body.appendChild(popup);

  const popupImg = popup.querySelector('img');
  const closeBtn = popup.querySelector('.close-btn');

  certificateItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('.certificate-img').src;
      popupImg.src = imgSrc;
      popup.classList.add('show');
    });
  });

  closeBtn.addEventListener('click', function() {
    popup.classList.remove('show');
  });

  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });
});

// Mouse movement effect on text
document.addEventListener('mousemove', (e) => {
  const texts = document.querySelectorAll('.heading-primary, .text-primary, .heading-sec__main, .heading-sec__sub, .about__content-details-para, .projects__row-content-title, .projects__row-content-desc');
  texts.forEach(text => {
    const rect = text.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    text.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

// Scroll animations with stagger and fade-in effect, triggered only on slow scrolling
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  let delay = 0;
  let lastScrollTop = 0;
  let scrollSpeed = 0;
  let lastScrollTime = Date.now();

  // Detect scroll speed
  window.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;
    const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
    scrollSpeed = scrollDiff / timeDiff; // pixels per millisecond
    lastScrollTop = currentScrollTop;
    lastScrollTime = currentTime;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && scrollSpeed < 0.5) { // Trigger only if scrolling slowly (less than 0.5 px/ms)
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        delay += 200; // Further increased stagger delay for premium feel
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.heading-primary, .text-primary, .heading-sec__main, .heading-sec__sub, .about__content-details-para, .projects__row, .skills__skill, .certificate-item');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// Parallax effect for background
document.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.home-hero');
  if (hero) {
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
  }
});

// Click animations for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  const clickableElements = document.querySelectorAll('.btn, .certificate-item, .projects__row-img-cont');
  clickableElements.forEach(el => {
    el.addEventListener('click', function() {
      this.style.transform = 'scale(0.95) rotate(2deg)';
      setTimeout(() => {
        this.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    });
  });
});

// Button click transition effect
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});

// Gmail integration for contact form
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    // Create professional email template
    const currentDate = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subject = encodeURIComponent(`Portfolio Contact - ${name} (${currentDate})`);

    const professionalBody = `Dear Daffa Luqyana Ryanaf,

I hope this email finds you well. I am reaching out to you through your portfolio website.

**Contact Information:**
• Name: ${name}
• Email: ${email}
• Date: ${currentDate}

**Message:**
${message}

I look forward to hearing from you and discussing potential opportunities for collaboration.

Best regards,
${name}
${email}

---
This message was sent from your portfolio contact form.`;

    const body = encodeURIComponent(professionalBody);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=luqydaffa32@gmail.com&su=${subject}&body=${body}`;

    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');

    // Reset form
    contactForm.reset();

    // Show success message
    alert('Gmail compose window opened with professional template! Please review and send the email.');
  });
});
