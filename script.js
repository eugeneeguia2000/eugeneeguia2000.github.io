const CONFIG = {
  education: [
        {
          degree: "Bachelor of Science in Computer Engineering",
          institution: "Silliman University, Philippines"
        }
      ],

      languages: ["English"],

      contacts: [
        { label: "Email", value: "e.eugeneeguia@gmail.com", href: "mailto:e.eugeneeguia@gmail.com" },
        { label: "LinkedIn", value: "linkedin.com/in/eugeneeguia", href: "https://www.linkedin.com/in/eugeneeguia" }
      ],

      skills: [
        { image: "./certifications/pl600-removebg-preview.png", name: "Microsoft Certified Power Platform Solutions Architect Expert", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/2a45450211aa7c62" },
        { image: "./certifications/pl400-removebg-preview.png", name: "Microsoft Certified Power Platform Developer Associate", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/e269174ac92c7f56" },
        { image: "./certifications/dp700-removebg-preview.png", name: "Microsoft Certified Fabric Data Engineer Associate", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/5AE920E321454F2F" },
        { image: "./certifications/az700-removebg-preview.png", name: "Microsoft Certified Azure Network Engineer Associate", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/5e66ae3a34f4f752" },
        { image: "./certifications/dp203-removebg-preview.png", name: "Microsoft Certified Azure Data Engineer Associate", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/59e5976847ea72da" },
        { image: "./certifications/pl900-removebg-preview.png", name: "Microsoft Certified Power Platform Fundamentals", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/abb67f51432754dc" },
        { image: "./certifications/ai900-removebg-preview.png", name: "Microsoft Certified Azure AI Fundamentals", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/dced34235a2b3636" },
        { image: "./certifications/az900-removebg-preview.png", name: "Microsoft Certified Azure Fundamentals", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/b9a5e1c9a45072a3" },
        { image: "./certifications/ms900-removebg-preview.png", name: "Microsoft Certified Fundamentals", url: "https://learn.microsoft.com/en-us/users/eugeneeguia/credentials/cb5114edb6ffcde7" },
        { image: "./certifications/Technology_Architect_Associate_Certificate-removebg-preview.png", name: "Accenture Technology Architect Associate Professional Certificate", url: "https://www.credly.com/badges/6d88c90a-1143-4280-a8ca-fdcde10e7df9/public_url?trk=public_profile_see-credential" }
      ],

      experience: [
        {
          period: "2024 – PRESENT",
          role: "Technology Architect - Power Platform",
          company: "Accenture"
        },
        {
          period: "2022 – 2024",
          role: "Low-Code Technical Specialist (Power Platform)",
          company: "Alliance Software Inc."
        }
      ],

      marqueeItems: [
        "TECHNOLOGY ARCHITECT",
        "POWER PLATFORM",
        "EUGENE EGUIA"
      ],

      cutoutPortrait: { img: "./Portrait.png" }
    };

    function renderMedia(slot, mediaObj, altText = "") {
      if (mediaObj.img) {
        slot.innerHTML = `<img src="${mediaObj.img}" alt="${altText}" loading="lazy" />`;
      } else if (mediaObj.svg) {
        slot.innerHTML = mediaObj.svg;
      }
    }

    function renderList(elementId, items, renderItem) {
      document.getElementById(elementId).innerHTML = items.map(renderItem).join("");
    }

    function renderResume() {
      renderList("education-list", CONFIG.education, (education) => `
          <div class="entry-item">
            <div class="entry-role">${education.degree}</div>
            <div class="entry-org">${education.institution}${education.years ? ` (${education.years})` : ""}</div>
          </div>`);

      renderList("language-list", CONFIG.languages, (language) => `
          <div class="entry-item">
            <div class="entry-role">${language}</div>
          </div>`);

      renderList("contact-list", CONFIG.contacts, (contact) => `
          <div class="entry-item contact-item">
            <div class="entry-period">${contact.label}</div>
            <a class="contact-link" href="${contact.href}"${contact.href.startsWith("https:") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${contact.value}</a>
          </div>`);

      renderList("experience-list", CONFIG.experience, (experience) => `
          <div class="entry-item">
            <div class="entry-period">${experience.period}</div>
            <div class="entry-role">${experience.role}</div>
            ${experience.company ? `<div class="entry-org">${experience.company}</div>` : ""}
          </div>`);
    }

    function renderSkills() {
      renderList("skills-grid", CONFIG.skills, (skill) => `
          <a class="skill-badge"
               href="${skill.url}"
               target="_blank"
               rel="noopener noreferrer"
               data-tooltip="${skill.name}"
               title="${skill.name}"
               aria-label="${skill.name}">
            <img src="${skill.image}" alt="" loading="lazy" decoding="async" />
          </a>`);
    }

    function renderMarquee() {
      const marqueeHtml = CONFIG.marqueeItems
        .map(item => `<span>${item}</span><span class="marquee-star" aria-hidden="true">✦</span>`)
        .join("");
      document.getElementById("marquee-track").innerHTML = `
        <div class="marquee-group">${marqueeHtml}</div>
        <div class="marquee-group" aria-hidden="true">${marqueeHtml}</div>
      `;
    }

    function renderCutoutPortrait() {
      const cutoutSlot = document.getElementById("cutout-slot");
      renderMedia(cutoutSlot, CONFIG.cutoutPortrait, "Portrait of Eugene Eguia");
      if (CONFIG.cutoutPortrait.img) {
        cutoutSlot.insertAdjacentHTML("beforeend", `
          <svg class="shoulder-outline" viewBox="0 0 447 558" aria-hidden="true">
            <path d="M 4 378 C 2 412, 2 455, 2 500" />
            <path d="M 443 378 C 445 412, 445 455, 445 500" />
          </svg>
        `);
      }
    }

    function renderPortfolio() {
      renderResume();
      renderSkills();
      renderMarquee();
      renderCutoutPortrait();
    }

    function initSoundEffects() {
      const soundToggle = document.getElementById("sound-toggle");
      const soundLabel = soundToggle.querySelector(".sound-label");

      let soundEnabled = false;
      let audioContext = null;

      function playThock() {
        if (!soundEnabled || !audioContext) return;

        const now = audioContext.currentTime;
        const thump = audioContext.createOscillator();
        const thumpGain = audioContext.createGain();
        thump.type = "triangle";
        thump.frequency.setValueAtTime(145, now);
        thump.frequency.exponentialRampToValueAtTime(52, now + 0.075);
        thumpGain.gain.setValueAtTime(0.24, now);
        thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
        thump.connect(thumpGain);
        thumpGain.connect(audioContext.destination);
        thump.start(now);
        thump.stop(now + 0.12);

        const sampleCount = Math.ceil(audioContext.sampleRate * 0.018);
        const noiseBuffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < sampleCount; i += 1) {
          noiseData[i] = Math.random() * 2 - 1;
        }

        const noise = audioContext.createBufferSource();
        const lowPass = audioContext.createBiquadFilter();
        const noiseGain = audioContext.createGain();
        noise.buffer = noiseBuffer;
        lowPass.type = "lowpass";
        lowPass.frequency.setValueAtTime(900, now);
        noiseGain.gain.setValueAtTime(0.08, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        noise.connect(lowPass);
        lowPass.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noise.start(now);
        noise.stop(now + 0.025);
      }

      function playMarqueeGlide() {
        if (!soundEnabled || !audioContext) return;

        const now = audioContext.currentTime;
        const duration = 0.55;
        const sampleCount = Math.ceil(audioContext.sampleRate * duration);
        const noiseBuffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < sampleCount; i += 1) {
          noiseData[i] = Math.random() * 2 - 1;
        }

        const noise = audioContext.createBufferSource();
        const lowPass = audioContext.createBiquadFilter();
        const gain = audioContext.createGain();
        noise.buffer = noiseBuffer;
        lowPass.type = "lowpass";
        lowPass.frequency.setValueAtTime(700, now);
        lowPass.frequency.exponentialRampToValueAtTime(320, now + duration);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.065, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        noise.connect(lowPass);
        lowPass.connect(gain);
        gain.connect(audioContext.destination);
        noise.start(now);
        noise.stop(now + duration);
      }

      document
        .querySelectorAll("h2, h3, .skill-badge, .bio-emphasis")
        .forEach((element) => {
          element.addEventListener("pointerenter", playThock);
          element.addEventListener("focus", playThock);
        });

      document.getElementById("marquee-track")
        .addEventListener("animationiteration", playMarqueeGlide);

      async function enableSound() {
        try {
          audioContext = audioContext || new AudioContext();
          await audioContext.resume();
          soundEnabled = true;
          soundToggle.classList.add("active");
          soundLabel.textContent = "SOUND: ON";
          soundToggle.setAttribute("aria-label", "Disable sound");
          soundToggle.title = "Disable sound";
          soundToggle.setAttribute("aria-pressed", "true");
          playMarqueeGlide();
        } catch (error) {
          soundEnabled = false;
          soundToggle.classList.remove("active");
          soundLabel.textContent = "SOUND UNAVAILABLE";
          soundToggle.setAttribute("aria-label", "Sound unavailable");
          soundToggle.title = "Sound unavailable";
          soundToggle.disabled = true;
          console.error("Unable to enable the portfolio sound effects.", error);
        }
      }

      function disableSound() {
        soundEnabled = false;
        soundToggle.classList.remove("active");
        soundLabel.textContent = "SOUND: OFF";
        soundToggle.setAttribute("aria-label", "Enable sound");
        soundToggle.title = "Enable sound";
        soundToggle.setAttribute("aria-pressed", "false");
      }

      soundToggle.addEventListener("click", () => {
        if (soundEnabled) {
          disableSound();
        } else {
          void enableSound();
        }
      });

    }

    renderPortfolio();
    initSoundEffects();
