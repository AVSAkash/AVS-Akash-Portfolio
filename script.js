// Smooth scroll for nav links
document.querySelectorAll("nav ul li a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Carousel: Drag to scroll + wheel support
const carousel = document.querySelector('.project-carousel');
if(carousel) {
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', e => {
    isDown = true; carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => isDown = false);
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
  carousel.addEventListener('wheel', evt => {
    carousel.scrollLeft += evt.deltaY * 0.3;
  });
}

// Contact Form Demo Logic
const contactForm = document.getElementById('contact-form');
const sendButton = contactForm.querySelector('button[type="submit"]');
const contactInputs = contactForm.querySelectorAll('input, textarea');

function checkContactForm() {
  const allFilled = Array.from(contactInputs).every(input => input.value.trim() !== '');
  sendButton.disabled = !allFilled;
  sendButton.style.filter = allFilled ? 'brightness(1)' : 'brightness(0.7)';
}
contactInputs.forEach(input => input.addEventListener('input', checkContactForm));
checkContactForm();

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Your message has been sent! (Demo)');
  contactForm.reset();
  checkContactForm();
});

// Chatbot UI Logic
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openChat');
  const chatWidget = document.getElementById('chatbot-widget');
  const closeBtn = document.getElementById('closeChat');
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatInvite = document.querySelector('.chatbot-invite');

  openBtn.onclick = () => {
    chatWidget.classList.add('open');
    openBtn.style.display = 'none';
    chatInvite.style.opacity = '0';
  };

  closeBtn.onclick = () => {
    chatWidget.classList.remove('open');
    openBtn.style.display = 'block';
    chatInvite.style.opacity = '0.9';
  };

  // Fade out invite after 10s inactivity, reappear on scroll or keypress
  let inviteTimeout;
  function resetInviteTimer() {
    chatInvite.style.opacity = '0.9';
    clearTimeout(inviteTimeout);
    inviteTimeout = setTimeout(() => {
      chatInvite.style.opacity = '0';
    }, 10000);
  }
  resetInviteTimer();

  chatInvite.addEventListener('click', () => openBtn.click());
  window.addEventListener('scroll', resetInviteTimer);
  window.addEventListener('keydown', resetInviteTimer);

  const botDB = [
    { q: /project|work|have you made/i,
      a: "Some projects I'm proud of: UniEvent, Real-Time Q&A with LLMs, Motion Tracking & Rehab. Explore more above!" },
    { q: /stack|tech stack|technologies|languages|framework/i,
      a: "I mainly use: Python, JavaScript, React, Node.js, MongoDB, TensorFlow, and Figma." },
    { q: /resume|cv/i,
      a: "You can view or download my resumes in the Resume section above." },
    { q: /email|contact/i,
      a: "You can reach me via email: <a style='color:#4b5563;' href='mailto:venkatasaiakash.arvapalli@gmail.com'>venkatasaiakash.arvapalli@gmail.com</a>" },
    { q: /about|background|yourself/i,
      a: "I'm a Computer Science undergraduate passionate about AI, web development, and UI/UX design, focused on impactful digital experiences." },
    { q: /hi|hello|hey|good morning|good afternoon/i,
      a: "Hello! 👋 How can I help? Ask about my skills, projects, or how to get in touch!" },
  ];

  function botResponse(msg) {
    for (let pair of botDB) {
      if (pair.q.test(msg)) return pair.a;
    }
    return "I’m here to answer questions about me, my work, or how to contact me. Try asking, 'What projects have you done?'";
  }

  function addMessage(msg, from) {
    const div = document.createElement('div');
    div.className = 'chatbot-message ' + (from === 'user' ? 'user-msg' : 'bot-msg');
    div.innerHTML = msg;
    chatbotBody.appendChild(div);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  chatbotForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const userMsg = chatbotInput.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    chatbotInput.value = '';
    setTimeout(() => addMessage(botResponse(userMsg), 'bot'), 500);
  });

  // Chatbot send button enabling
  chatbotInput.addEventListener('input', () => {
    const sendBtn = chatbotForm.querySelector('button[type="submit"]');
    if (chatbotInput.value.trim().length > 0) {
      sendBtn.disabled = false;
      sendBtn.style.filter = 'brightness(1.2)';
    } else {
      sendBtn.disabled = true;
      sendBtn.style.filter = 'brightness(0.7)';
    }
  });

  // Intro greet on first open
  let greeted = false;
  openBtn.addEventListener('click', () => {
    if (!greeted) {
      addMessage("Hi there! 👋 I’m your portfolio assistant. Ask about my projects, skills, or how to get in touch.", "bot");
      greeted = true;
    }
  });
});
