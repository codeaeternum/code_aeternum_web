/**
 * Scroll reveal: add .visible to .reveal elements when they enter the viewport.
 * Used on home (index) and any page with .reveal sections.
 * Hardened: DOMContentLoaded, IntersectionObserver fallback, safe iteration,
 * prefers-reduced-motion early return.
 */
(function () {
    'use strict';

    function init() {
        var nodes;
        var i;

        // With prefers-reduced-motion, CSS already forces .reveal visible;
        // skip the observer entirely.
        if (window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        nodes = document.querySelectorAll('.reveal');

        if (typeof IntersectionObserver === 'undefined') {
            // Browsers without IntersectionObserver also lack NodeList.forEach;
            // iterate with a classic loop so .reveal content still shows.
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i] && nodes[i].classList) {
                    nodes[i].classList.add('visible');
                }
            }
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting && e.target && e.target.classList) {
                        e.target.classList.add('visible');
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i]) observer.observe(nodes[i]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
