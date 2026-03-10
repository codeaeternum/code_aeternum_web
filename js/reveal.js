/**
 * Scroll reveal: add .visible to .reveal elements when they enter the viewport.
 * Used on home (index) and any page with .reveal sections.
 * Hardened: DOMContentLoaded, IntersectionObserver fallback, safe iteration.
 */
(function () {
    function init() {
        if (typeof IntersectionObserver === 'undefined') {
            document.querySelectorAll('.reveal').forEach(function (el) {
                if (el && el.classList) el.classList.add('visible');
            });
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
        var nodes = document.querySelectorAll('.reveal');
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i]) observer.observe(nodes[i]);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
