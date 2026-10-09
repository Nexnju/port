/* =========================================================
   NJUE PORTFOLIO JAVASCRIPT
========================================================= */

/* =========================================================
   GOLD + SILVER PARTICLES INSIDE NJUE
========================================================= */

const confettiContainer =
    document.getElementById("confetti");


const particleColors = [
    "#D4AF37",   // Gold
    "#F1D27A",   // Light gold
    "#C0C0C0",   // Silver
    "#E5E5E5"    // Light silver
];


function createParticles() {

    for (let i = 0; i < 55; i++) {

        const particle =
            document.createElement("span");

        particle.classList.add("confetti");

        /* Random position */
        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";


        /* Gold or silver */
        particle.style.background =
            particleColors[
                Math.floor(
                    Math.random() *
                    particleColors.length
                )
            ];


        /* Different particle sizes */
        const size =
            2 + Math.random() * 5;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        /* Slow movement */
        particle.style.animationDuration =
            (6 + Math.random() * 7) + "s";


        /* Start at different times */
        particle.style.animationDelay =
            (-Math.random() * 10) + "s";


        /* Random starting direction */
        particle.style.transform =
            `translate(
                ${Math.random() * 20 - 10}px,
                ${Math.random() * 20 - 10}px
            )`;


        confettiContainer.appendChild(
            particle
        );
    }
}


createParticles();


/* =========================================================
   BACKGROUND PARALLAX
========================================================= */

const websiteWall =
    document.querySelector(".website-wall");


window.addEventListener(
    "scroll",
    () => {

        const scrollPosition =
            window.scrollY;

        websiteWall.style.transform =
            `rotate(-4deg)
             translateY(${-scrollPosition * 0.08}px)
             scale(1.1)`;

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .project-card, .tool-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal",
                        "active"
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   NAVBAR BACKGROUND ON SCROLL
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(5,5,5,.75)";

            navbar.style.backdropFilter =
                "blur(20px)";

        } else {

            navbar.style.background =
                "linear-gradient(to bottom, rgba(5,5,5,.85), transparent)";

            navbar.style.backdropFilter =
                "none";

        }

    }
);



/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 35;

            const rotateY =
                (centerX - x) / 35;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});



/* =========================================================
   MOUSE MOVEMENT ON HERO
========================================================= */

const heroTitle =
    document.querySelector(
        ".hero-title"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (!heroTitle) return;

        const x =
            (event.clientX /
                window.innerWidth - .5)
            * 12;

        const y =
            (event.clientY /
                window.innerHeight - .5)
            * 12;


        heroTitle.style.transform =
            `perspective(900px)
             rotateY(${x}deg)
             rotateX(${-y}deg)`;

    }
);



/* =========================================================
   SMOOTH ANCHOR NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});

/* =====================================================
   NJUE TECHNOLOGY LAB
   ===================================================== */

const techNodes = document.querySelectorAll(".tech-node");

const techTitle = document.getElementById("techTitle");
const techCategory = document.getElementById("techCategory");
const techDescription = document.getElementById("techDescription");

const techLevelText = document.getElementById("techLevelText");
const techLevelBar = document.getElementById("techLevelBar");

let currentTech = 0;


/* -----------------------------------------------------
   UPDATE TECHNOLOGY INFORMATION
   ----------------------------------------------------- */

function updateTechnology(node) {

    if (!node) return;

    const technology = node.dataset.tech;
    const category = node.dataset.category;
    const description = node.dataset.description;
    const level = node.dataset.level;


    /* Remove active state */

    techNodes.forEach(item => {

        item.classList.remove("active");

    });


    /* Activate selected technology */

    node.classList.add("active");


    /* Update information */

    techTitle.textContent = technology;

    techCategory.textContent = category;

    techDescription.textContent = description;

    techLevelText.textContent = `${level}%`;


    /* Reset bar first */

    techLevelBar.style.width = "0%";


    /* Animate bar */

    setTimeout(() => {

        techLevelBar.style.width = `${level}%`;

    }, 50);

}


/* -----------------------------------------------------
   CLICK TECHNOLOGY
   ----------------------------------------------------- */

techNodes.forEach((node, index) => {

    node.addEventListener("click", () => {

        currentTech = index;

        updateTechnology(node);

    });

});


/* -----------------------------------------------------
   INITIAL TECHNOLOGY
   ----------------------------------------------------- */

if (techNodes.length > 0) {

    updateTechnology(techNodes[0]);

}


/* -----------------------------------------------------
   AUTOMATIC TECHNOLOGY ROTATION
   ----------------------------------------------------- */

let techInterval = setInterval(() => {

    currentTech++;

    if (currentTech >= techNodes.length) {

        currentTech = 0;

    }

    updateTechnology(techNodes[currentTech]);

}, 5000);


/* -----------------------------------------------------
   PAUSE ROTATION WHEN MOUSE IS OVER LAB
   ----------------------------------------------------- */

const techLab = document.querySelector(".tech-lab");

if (techLab) {

    techLab.addEventListener("mouseenter", () => {

        clearInterval(techInterval);

    });


    techLab.addEventListener("mouseleave", () => {

        techInterval = setInterval(() => {

            currentTech++;

            if (currentTech >= techNodes.length) {

                currentTech = 0;

            }

            updateTechnology(techNodes[currentTech]);

        }, 5000);

    });

}


/* =====================================================
   TERMINAL TYPING EFFECT
   ===================================================== */

const typingElement = document.querySelector(".typing-text");

const terminalMessages = [

    "keep_learning();",

    "build_something_useful();",

    "solve_real_world_problems();",

    "stay_curious();",

    "improve_every_day();"

];

let messageIndex = 0;
let characterIndex = 0;
let deleting = false;


function terminalTyping() {

    if (!typingElement) return;


    const currentMessage =
        terminalMessages[messageIndex];


    if (!deleting) {

        typingElement.textContent =
            currentMessage.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentMessage.length) {

            deleting = true;

            setTimeout(terminalTyping, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentMessage.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            messageIndex++;

            if (messageIndex >= terminalMessages.length) {

                messageIndex = 0;

            }

        }

    }


    const typingSpeed = deleting ? 40 : 80;

    setTimeout(terminalTyping, typingSpeed);

}


terminalTyping();

/* =========================================================
   PHONE MENU  (js/menu.js)
   Opens and closes the hamburger menu.
   Load it AFTER port4.js:  <script src="js/menu.js"></script>
========================================================= */

(function () {

    var header = document.querySelector('.navbar');
    var button = document.getElementById('menuToggle');
    var nav    = document.getElementById('siteNav');

    if (!header || !button || !nav) return;

    function setMenu(open) {
        header.classList.toggle('nav-open', open);
        document.body.classList.toggle('menu-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    // Tap the button to open / close
    button.addEventListener('click', function () {
        setMenu(!header.classList.contains('nav-open'));
    });

    // Tapping a link closes the menu (the page then scrolls to the section)
    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    // Tapping "Contact Me" in the top bar also closes it
    var contactBtn = header.querySelector('.contact-button');
    if (contactBtn) contactBtn.addEventListener('click', function () { setMenu(false); });

    // Escape key closes it
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    // If the screen becomes wide (e.g. phone rotated / desktop), reset it
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) setMenu(false);
    });

})();