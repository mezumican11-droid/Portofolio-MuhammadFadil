
/* ==================================
   OPENING SCREEN
================================== */
const openingVideo = document.querySelector(".opening-logo");

if (openingVideo) {

  openingVideo.muted = true;
  openingVideo.playsInline = true;

  openingVideo.addEventListener("canplay", () => {

    openingVideo.style.visibility = "visible";

    openingVideo.play().catch(() => {});

  }, { once: true });

}
window.addEventListener("load", () => {
  setTimeout(() => {

    document.getElementById("opening").classList.add("hide");

    setTimeout(() => {

      document.body.classList.add("page-ready");

      const heroReveal = document.querySelector(".hero .reveal");

      if (heroReveal) {
        heroReveal.classList.add("show");
      }

    }, 900);

  }, 2400);
});

/* ==================================
   NAVIGATION + MOVING ROBOT
================================== */
const nav = document.getElementById("navbar");
const links = [...document.querySelectorAll(".nav-link")];
const robot = document.getElementById("navRobot");
const indicator = document.getElementById("indicator");

function moveNavAnimation(link) {
  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const left = linkRect.left - navRect.left;
  const width = linkRect.width;

  indicator.style.left = left + "px";
  indicator.style.width = width + "px";

  // Posisi tengah tombol
  const robotWidth = robot.offsetWidth;
  const robotLeft = left + (width / 2) - (robotWidth / 2);

  // Posisi horizontal tujuan
  robot.style.left = robotLeft + "px";

  // Reset animasi loncat
  robot.classList.remove("bounce");

  // Memaksa browser membaca posisi terbaru
  void robot.offsetWidth;

  // Jalankan animasi loncat
  robot.classList.add("bounce");
}

function setActive(link, scroll = true) {
  links.forEach(item => item.classList.remove("active"));
  link.classList.add("active");

  moveNavAnimation(link);

  if (scroll) {
    const target = document.getElementById(link.dataset.target);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
}

links.forEach(link => {
  link.addEventListener("click", () => {
    setActive(link, true);
  });
});

/* Posisi awal */
window.addEventListener("load", () => {
  setTimeout(() => {
    setActive(links[0], false);
  }, 50);
});

window.addEventListener("resize", () => {
  const active = document.querySelector(".nav-link.active");
  if (active) moveNavAnimation(active);
});

/* ==================================
   ACTIVE NAV WHEN SCROLLING
================================== */
const sections = links
  .map(link => document.getElementById(link.dataset.target))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  const link = links.find(
    item => item.dataset.target === visible.target.id
  );

  if (link) {
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    moveNavAnimation(link);
  }
}, {
  threshold: [0.25, 0.5, 0.75],
  rootMargin: "-15% 0px -25% 0px"
});

sections.forEach(section => observer.observe(section));

/* ==================================
   SCROLL REVEAL
================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});
  
  /* ==================================
   ABOUT CHARACTER + CURSOR REVEAL
================================== */

const aboutCharacter = document.querySelector(".about-character");
const characterImages = document.querySelector(".character-images");

if (aboutCharacter && characterImages) {

  /* ==============================
     CURSOR REVEAL SPIDERMAN
  ============================== */

  aboutCharacter.addEventListener("pointermove", (e) => {

    /* Izinkan Spider-Man muncul lagi setelah intro selesai */
    aboutCharacter.classList.remove("intro-finished");

    const rect = characterImages.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    aboutCharacter.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    aboutCharacter.style.setProperty(
      "--mouse-y",
      `${y}px`
    );

    /* Ukuran bulatan */
    aboutCharacter.style.setProperty(
      "--reveal-size",
      "100px"
    );

    aboutCharacter.classList.add("revealing");

  });


  /* ==============================
     KURSOR KELUAR
  ============================== */

  aboutCharacter.addEventListener("pointerleave", () => {

    aboutCharacter.style.setProperty(
      "--reveal-size",
      "0px"
    );

    aboutCharacter.classList.remove("revealing");

  });


  /* ==================================
     TYPING TEXT
  ================================== */

  const text1 =
    "Hallo, Saya adalah Muhammad Fadil, lulusan Paket C tahun 2025 yang memiliki pengalaman di bidang warehouse, F&B, dan direct selling. Saya senang bekerja secara langsung di lapangan, bertemu dengan orang baru, dan menghadapi berbagai situasi yang membuat saya terus belajar.";

  const text2 =
    "Dari pengalaman sebelumnya, saya terbiasa menangani transaksi, berkomunikasi dengan pelanggan, mengelola barang dan data, serta bekerja sama dalam tim untuk menyelesaikan pekerjaan dengan baik.";

  const typingText1 =
    document.getElementById("typingText1");

  const typingText2 =
    document.getElementById("typingText2");

  const readMoreBtn =
    document.getElementById("readMoreBtn");

  let index1 = 0;
  let index2 = 0;


  function typeFirstText() {

    if (index1 < text1.length) {

      typingText1.textContent +=
        text1.charAt(index1);

      index1++;

      setTimeout(typeFirstText, 40);

    } else {

      readMoreBtn.style.display =
        "inline-block";

    }

  }


  function typeSecondText() {

    if (index2 < text2.length) {

      typingText2.textContent +=
        text2.charAt(index2);

      index2++;

      setTimeout(typeSecondText, 40);

    }

  }


  /* ==============================
     READ MORE
  ============================== */

  readMoreBtn.addEventListener("click", () => {

    readMoreBtn.style.display = "none";

    document.querySelector(
      ".second-text"
    ).style.display = "block";

    typeSecondText();

  });


  /* ==============================
     MULAI TYPING
  ============================== */

  setTimeout(() => {

    typeFirstText();

  }, 1000);


  /* ==================================
     EDUCATION GALLERY
  ================================== */

  const educationImages = [
    "./sekolah.jpg",
    "./sekolah2.jpg",
    "./sekolah3.jpg"
  ];

  const educationImage =
    document.getElementById("educationImage");

  const galleryArrows =
    document.querySelectorAll(".gallery-arrow");

  const galleryDots =
    document.querySelectorAll(".gallery-dots span");

  let educationIndex = 0;


  function showEducationImage(index) {

    educationIndex = index;

    educationImage.src =
      educationImages[educationIndex];

    galleryDots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === educationIndex
      );

    });

  }


  /* Tombol kiri */
  galleryArrows[0].addEventListener("click", () => {

    educationIndex--;

    if (educationIndex < 0) {

      educationIndex =
        educationImages.length - 1;

    }

    showEducationImage(educationIndex);

  });


  /* Tombol kanan */
  galleryArrows[1].addEventListener("click", () => {

    educationIndex++;

    if (
      educationIndex >=
      educationImages.length
    ) {

      educationIndex = 0;

    }

    showEducationImage(educationIndex);

  });

}
  /* ==================================
   INTRO SPIDERMAN
================================== */

const aboutCharacterIntro =
  document.querySelector(".about-character");

const spidermanIntro =
  document.querySelector(".spiderman-image");

if (aboutCharacterIntro && spidermanIntro) {

  let introStarted = false;

  const introObserver = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting && !introStarted) {

      introStarted = true;

      /* ==============================
         MULAI INTRO
      ============================== */

      aboutCharacterIntro.classList.add("intro-playing");


      /* ==============================
         TUNGGU 4 DETIK
         LALU FADIL FADE OUT
      ============================== */

      setTimeout(() => {

        aboutCharacterIntro.classList.add("fadil-fading");


        /* ==============================
           SPIDERMAN MULAI MUNCUL
           300ms SETELAH FADIL FADE OUT
        ============================== */

        setTimeout(() => {

          spidermanIntro.classList.add("intro-spiderman");


          /* ==============================
             FADIL MULAI FADE-IN
             2 DETIK SETELAH SPIDERMAN MULAI
          ============================== */

          setTimeout(() => {

            aboutCharacterIntro.classList.remove("fadil-fading");
            aboutCharacterIntro.classList.remove("intro-playing");
            aboutCharacterIntro.classList.add("fadil-returning");

          }, 2000);


          /* ==============================
             SPIDERMAN SELESAI
             SETELAH 4 DETIK
          ============================== */

          setTimeout(() => {

            spidermanIntro.classList.remove("intro-spiderman");

            aboutCharacterIntro.classList.add("intro-finished");

            aboutCharacterIntro.style.setProperty(
              "--reveal-size",
              "0px"
            );

          }, 4000);


        }, 300);

      }, 4000);

    }

  }, {
    threshold: 0.3
  });


  introObserver.observe(aboutCharacterIntro);

}

/* =========================
   SPACE WARP PARTICLES
========================= */

const warpContainer =
  document.querySelector(".warp-particles");

if (warpContainer) {
  
  const particleCount = 350;

  for (let i = 0; i < particleCount; i++) {

    const particle =
      document.createElement("div");

    particle.classList.add("warp-particle");

    /* 75% putih, 25% ungu */
    if (Math.random() < 0.25) {
      particle.classList.add("purple");
    }

    /* Ukuran random */
    const sizeType = Math.random();

    if (sizeType < 0.15) {

      particle.classList.add("large");

    } else if (sizeType < 0.55) {

      particle.classList.add("small");

    }

    /* Posisi random seluruh Home */
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    /* Simpan posisi awal */
    particle.dataset.x = x;
    particle.dataset.y = y;

    /* Variasi brightness */
    particle.style.opacity =
      (0.35 + Math.random() * 0.65).toFixed(2);

    warpContainer.appendChild(particle);
  }
}
/* =========================
   WARP SCROLL CONTROL
========================= */

const warpParticles =
  document.querySelectorAll(".warp-particle");

let warpProgress = 0;

function updateWarpProgress() {

  warpProgress = Math.max(
    0,
    Math.min(
      window.scrollY / window.innerHeight,
      1
    )
  );

}

window.addEventListener(
  "scroll",
  updateWarpProgress,
  { passive: true }
);

updateWarpProgress();

/* =========================
   WARP PARTICLE ANIMATION
========================= */

function updateWarpParticles() {

  /* =========================
     HOME SLIDE + WARP MOTION
  ========================= */

  const heroLogo =
    document.querySelector(".hero-logo");

  const heroCopy =
    document.querySelector(".hero-copy");


/* =========================
   ROBOT + TEXT SCROLL
========================= */

if (heroLogo) {

  const robotMove =
    warpProgress * -300;

  const robotRotate =
    warpProgress * -18;

  heroLogo.style.left =
    `${robotMove}px`;

  heroLogo.style.rotate =
    `${robotRotate}deg`;
}

if (heroCopy) {

  const textMove =
    warpProgress * 300;

  heroCopy.style.position = "relative";

  heroCopy.style.left =
    `${textMove}px`;
}
  /* =========================
     RADIAL SPACE WARP
  ========================= */

  warpParticles.forEach(particle => {

    const x =
      parseFloat(particle.dataset.x);

    const y =
      parseFloat(particle.dataset.y);

    const centerX = 50;
    const centerY = 50;

    const dx = x - centerX;
    const dy = y - centerY;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    const angle =
      Math.atan2(dy, dx);

    const zoom =
      warpProgress * 2;

    const newX =
      centerX + dx * (1 + zoom);

    const newY =
      centerY + dy * (1 + zoom);

    const streak =
      warpProgress * 80;

    const length =
      streak * (distance / 50);

    particle.style.transform =
      `
      translate(
        ${newX - x}vw,
        ${newY - y}vh
      )
      rotate(${angle}rad)
      scaleX(${1 + length})
      `;
  });


  requestAnimationFrame(
    updateWarpParticles
  );
}

updateWarpParticles();
