// [1] Smooth Scroll (Lenis)
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// [2] Physics-based Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(cursor, { x: mouseX, y: mouseY });
});

gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.15; // Smooth lag
    posY += (mouseY - posY) * 0.15;
    gsap.set(follower, { x: posX - 20, y: posY - 20 });
});

// [3] Loading Logic (The Buffering Detail)
let count = { val: 0 };
const loaderTl = gsap.timeline();

loaderTl.to(count, {
    val: 100,
    duration: 3,
    ease: "power2.inOut",
    onUpdate: () => {
        document.querySelector('.count').textContent = Math.floor(count.val).toString().padStart(3, '0');
        document.querySelector('.loader-bar').style.width = count.val + "%";
    }
});

loaderTl.to("#loader", {
    yPercent: -100,
    duration: 1.2,
    ease: "expo.inOut"
})
.to(".hero-title", {
    y: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power4.out"
}, "-=0.5");

// [4] Grid Menu Interaction
const menuBtn = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-menu');
const menuTl = gsap.timeline({ paused: true });

menuTl.to(".menu-overlay", { display: "flex", duration: 0 })
    .to(".grid-col", {
        translateY: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.inOut"
    })
    .to(".menu-item a", {
        y: 0,
        stagger: 0.1,
        duration: 0.5
    }, "-=0.3");

menuBtn.addEventListener('click', () => menuTl.play());
closeBtn.addEventListener('click', () => menuTl.reverse());