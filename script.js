document.addEventListener('DOMContentLoaded', () => {
  // 1. Switch Mode Terang & Gelap
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  const savedTheme = localStorage.getItem('editorial-theme') || 'dark-theme';
  document.body.className = savedTheme;
  updateThemeButton(savedTheme);

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('editorial-theme', 'light-theme');
      updateThemeButton('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('editorial-theme', 'dark-theme');
      updateThemeButton('dark-theme');
    }
  });

  function updateThemeButton(theme) {
    if (theme === 'light-theme') {
      themeIcon.className = 'bx bx-moon';
      themeText.textContent = 'DARK';
    } else {
      themeIcon.className = 'bx bx-sun';
      themeText.textContent = 'LIGHT';
    }
  }

  // 2. Smooth Scrolling untuk Navigasi Menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Efek Parallax Tipografi Hero
  const giantTitle = document.querySelector('.giant-portfolio-text');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    if (giantTitle && scrollPos < 600) {
      giantTitle.style.transform = `translateY(${scrollPos * 0.15}px)`;
    }
  });

  // 4. Chatbot Otomatis Responsif Sesuai Data Anda
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.querySelectorAll('.quick-chip');

  chatbotToggleBtn.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open')) {
      chatInput.focus();
    }
  });

  chatbotCloseBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    chatInput.value = '';

    setTimeout(() => {
      botResponse(message);
    }, 400);
  });

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      appendMessage(msg, 'user');
      setTimeout(() => {
        botResponse(msg);
      }, 400);
    });
  });

  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function botResponse(query) {
    const lower = query.toLowerCase();
    let reply = "";

    if (lower.includes('siapa') || lower.includes('nim') || lower.includes('profil') || lower.includes('about')) {
      reply = "Saya Callysta Zahra Wijaya, mahasiswi Sistem Informasi di Universitas Negeri Surabaya dengan NIM 26051214105.";
    } else if (lower.includes('tool') || lower.includes('aplikasi') || lower.includes('keahlian') || lower.includes('skill')) {
      reply = "Tools yang saya kuasai adalah Canva, CapCut, VS Code, Cisco Packet Tracer, Python, dan MIT App Inventor.";
    } else if (lower.includes('kontak') || lower.includes('email') || lower.includes('wa') || lower.includes('whatsapp') || lower.includes('hubungi') || lower.includes('linkedin')) {
      reply = "Anda bisa menghubungi saya langsung via WhatsApp di +62 823-3023-3060, email callysta.zw9@gmail.com, atau via profil LinkedIn di bagian Contact.";
    } else if (lower.includes('cv') || lower.includes('resume') || lower.includes('unduh')) {
      reply = "File resmi CV saya (CV_CALLYSTA ZAHRA WIJAYA.docx) dapat diunduh pada tombol di bagian Contact.";
    } else if (lower.includes('prestasi') || lower.includes('achievement') || lower.includes('pengalaman')) {
      reply = "Pengalaman saya antara lain sebagai Calon Kandidat Ketua Umum ECC, Anggota Divisi Advokasi & Pergerakan UKM Kependudukan UNESA, dan Humas Teater TRESSA.";
    } else {
      reply = "Terima kasih atas pertanyaannya! Silakan pilih tombol opsi cepat di atas atau hubungi melalui WhatsApp di +62 823-3023-3060.";
    }

    appendMessage(reply, 'bot');
  }
});