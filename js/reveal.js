/**
 * Scroll reveal: add .visible to .reveal elements when they enter the viewport.
 * Used on home (index) and any page with .reveal sections.
 */
(function () {
    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();
