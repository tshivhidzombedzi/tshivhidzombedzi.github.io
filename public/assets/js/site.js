/* =============================================================================
   The only JavaScript on this site.
   -----------------------------------------------------------------------------
   Three small jobs: the mobile navigation toggle, the "current section" highlight
   in a case study's contents list, and the print button on the CV page.

   Every page is fully readable, navigable and usable with JavaScript disabled —
   nothing here adds content or behaviour that the page depends on.
   ============================================================================= */
(function () {
  'use strict';

  /* ---- mobile navigation ---------------------------------------------------
     A real button with aria-expanded, so it is announced correctly and works
     from the keyboard. Escape closes it and returns focus to the toggle. */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when a link is followed, so the menu is not still open on the next page
    // in browsers that restore scroll and DOM state.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Reset state if the viewport grows past the breakpoint while the menu is open.
    var mq = window.matchMedia('(min-width: 1081px)');
    var onChange = function () {
      if (mq.matches) setOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---- case-study contents highlight --------------------------------------
     IntersectionObserver rather than a scroll handler: no layout thrash, and it
     degrades to simply doing nothing in a browser that lacks it. */
  var toc = document.querySelector('.toc');

  if (toc && 'IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var byId = {};
    var sections = [];

    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        byId[id] = a;
        sections.push(el);
      }
    });

    var current = null;
    var mark = function (id) {
      if (current === id) return;
      links.forEach(function (a) {
        a.classList.remove('is-current');
      });
      if (byId[id]) byId[id].classList.add('is-current');
      current = id;
    };

    var observer = new IntersectionObserver(
      function (entries) {
        // Pick the entry nearest the top of the reading area among those visible.
        var visible = entries.filter(function (e) {
          return e.isIntersecting;
        });
        if (!visible.length) return;
        visible.sort(function (a, b) {
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        mark(visible[0].target.id);
      },
      // Top offset clears the sticky header; bottom margin stops the last short
      // section from never activating.
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 },
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---- CV print button ----------------------------------------------------
     The print stylesheet does the real work; this is just a convenience so the
     visitor does not have to find their browser's print menu. */
  var printBtn = document.querySelector('[data-print]');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }
})();
