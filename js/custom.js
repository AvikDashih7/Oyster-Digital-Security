// ! Pre Loader By Jquery

// $(window).on("load", function () {
//     $("#pre_Loader").fadeOut(2000);
// });

// =======================<<<<<>>>>>=======================


// ! Custom Fixed NavBar

// $(function () {
//     $(window).scroll(function () {
//         if ($(window).scrollTop() > 400) {
//             $("header").addClass("active");
//         } else {
//             $("header").removeClass("active");
//         }
//     });
// });

// =======================<<<<<>>>>>=======================


// ! Back To Top (Jquery)

// let btn = $('#backToTop');
// $(window).on('scroll', function () {
//     if ($(window).scrollTop() > 300) {
//         btn.addClass('show');
//     } else {
//         btn.removeClass('show');
//     }
// });
// btn.on('click', function (e) {
//     e.preventDefault();
//     $('html, body').animate({
//         scrollTop: 0
//     }, '1000');
// });


// =======================<<<<<>>>>>=======================

// ! Easy Responsive Tabs

// $(document).ready(function () {
//     $('#horizontalTab').easyResponsiveTabs({
//         type: 'default',
//         width: 'auto',
//         fit: true,
//         closed: 'accordion',
//         activate: function (event) {
//             var $tab = $(this);
//             var $info = $('#tabInfo');
//             var $name = $('span', $info);
//             $name.text($tab.text());
//             $info.show();
//         }
//     });
// });

// =======================<<<<<>>>>>=======================


// ! Swiper Slider

// var swiper = new Swiper(".mySwiper", {
//     loop: true,
//     // centeredSlides: true,
//     slidesPerView: 3,
//     spaceBetween: 30,
//     autoplay: {
//         delay: 1000,
//         disableOnInteraction: true,
//     },
//     speed: 1500,
//     // direction: "vertical",
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
// });

// Autoplay Stop on Hover

/* $(".swiper").mouseenter(function () {
    swiper.autoplay.stop();
});

$(".swiper").mouseleave(function () {
    swiper.autoplay.start();
});

*/

// =======================<<<<<>>>>>=======================



const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
// reveal
const io = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add('in'), io.unobserve(x.target))), { threshold: .15 });
$$('.rv').forEach(e => io.observe(e));
// nav + progress + parallax
addEventListener('scroll', () => {
    const y = scrollY; $('#nav').classList.toggle('s', y > 60);
    $('#pb').style.width = (y / (document.body.scrollHeight - innerHeight) * 100) + '%';
    $('#house').style.transform = `translateY(${y * .12}px)`
}, { passive: true });
// cursor glow + hero parallax
addEventListener('pointermove', e => {
    const g = $('#glow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';
    const h = $('#hero').getBoundingClientRect(); if (h.bottom > 0) {
        const dx = (e.clientX / innerWidth - .5), dy = (e.clientY / innerHeight - .5);
        $$('.ico').forEach((i, n) => i.style.translate = `${dx * (14 + n * 6)}px ${dy * (14 + n * 6)}px`)
    }
});
// stars canvas
(() => {
    const c = $('#stars'), x = c.getContext('2d'); let w, h, s = [];
    const r = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; s = Array.from({ length: 110 }, () => ({ x: Math.random() * w, y: Math.random() * h * .65, r: Math.random() * 1.4 + .2, p: Math.random() * 6 })) }; r(); addEventListener('resize', r);
    (function f(t) { x.clearRect(0, 0, w, h); s.forEach(a => { x.globalAlpha = .4 + .6 * Math.abs(Math.sin(t / 900 + a.p)); x.fillStyle = '#fff'; x.beginPath(); x.arc(a.x, a.y, a.r, 0, 7); x.fill() }); requestAnimationFrame(f) })(0)
})();
// card tilt + select
$$('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
        const b = c.getBoundingClientRect(), px = (e.clientX - b.left) / b.width - .5, py = (e.clientY - b.top) / b.height - .5;
        c.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-6px)`
    }); c.addEventListener('pointerleave', () => c.style.transform = '');
    c.addEventListener('click', () => { $$('.card').forEach(k => k.classList.remove('on')); c.classList.add('on') })
});
// features accordion autoplay
const fi = $$('.fi'); let fx = 2; const setF = n => { fi.forEach((e, i) => e.classList.toggle('on', i == n)); fx = n };
fi.forEach((e, i) => e.onclick = () => setF(i)); setInterval(() => setF((fx + 1) % 4), 4000);
// devices
const D = [['Fiber', '<path d="M4 18c6-8 10 4 16-4"/><rect x="2" y="16" width="5" height="5"/>'], ['Drones', '<circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><rect x="8" y="9" width="8" height="6" rx="2"/><path d="M5 9l4 3M19 9l-4 3"/>'], ['Security Cameras', '<path d="M3 8l12-4 2 5-12 4zM11 13l-3 7"/>'], ['Wireless Networks', '<path d="M8 20h8M12 20V8M8 4l4 4 4-4"/>'], ['Intrusion', '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="10" r="3"/>'], ['Access Panels', '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="9" r="2"/>'], ['Alarms', '<path d="M6 18V11a6 6 0 0112 0v7zM4 18h16M10 21h4"/>']];
const dh = D.map(d => `<div class="dc"><svg viewBox="0 0 24 24">${d[1]}</svg>${d[0]}</div>`).join(''); $('#dev').innerHTML = dh + dh;
// testimonials
const T = ['“Oyster delivered exactly what we needed. Their team took the time to understand our requirements, recommended the right technology, and handled every stage of the installation with professionalism. The entire process was seamless, and the final solution has given us greater confidence in our security and infrastructure.”<br><br>— Operations Director, Commercial Client', '“Our cameras and network now work as one system. Setup was fast, support is responsive, and we finally trust what we see on the screen.”<br><br>— Facilities Manager, Retail Group', '“From the first walkthrough to the final handover, the crew was clear, tidy, and on schedule. Access control across three buildings just works.”<br><br>— Property Owner, Residential Client'];
let ti = 0; const q = $('#q'), go = d => { ti = (ti + d + 3) % 3; q.classList.add('h'); setTimeout(() => { q.innerHTML = T[ti]; q.classList.remove('h') }, 450) };
$('#nx').onclick = () => go(1); $('#pv').onclick = () => go(-1); setInterval(() => go(1), 7000);
// counter-less magnetic buttons
$$('.btn').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .12}px,${(e.clientY - r.top - r.height / 2) * .2}px)` }); b.addEventListener('pointerleave', () => b.style.transform = '') });
