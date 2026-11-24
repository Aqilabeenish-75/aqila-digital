// =====================================================
// Aqila Digital: shared JavaScript for all pages
// Features:
//   1. Mobile menu
//   2. Scroll reveal
//   3. Footer year
//   4. Portfolio filter
//   5. Contact form (contact.html)
//   6. Social media icons (footer and contact page)
//
// Everything is wrapped in (function () { ... })();
// This keeps our variables private, so they can't clash with other code.
// =====================================================
// =====================================================
// YOUR SOCIAL MEDIA LINKS: the ONE place to change them.
// Replace each "#" with the full address of your profile, inside the quotes,
// for example:  linkedin: "https://www.linkedin.com/in/your-name",
// While a link is "#", the icon shows a small "Coming soon" tip when clicked.
// With a real link, the icon opens your profile in a new tab.
// All icons on all pages read their links from this list.
// =====================================================
const SOCIAL_LINKS = {
  linkedin:  "#",
  tiktok:    "https://www.tiktok.com/@aqiladigital",
  instagram: "#",
  facebook:  "#",
  youtube:   "#"
};

(function () {
  'use strict'; // makes JavaScript stricter, so mistakes show up sooner

  // Add the class "js" to <html>. The CSS only hides ".reveal" elements when
  // this class exists, so if JavaScript ever fails, the page is still visible.
  document.documentElement.classList.add('js');

  // Does the visitor's device ask for less motion? (true or false)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  // -----------------------------------------------------
  // 1. MOBILE MENU
  // The three-line button toggles the class "open" on the links.
  // The CSS does the sliding; JavaScript only adds or removes the class.
  // -----------------------------------------------------
  var menuBtn = document.querySelector('.menu-btn');
  var navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {

    // Opens or closes the menu and tells screen readers what happened
    function setMenu(isOpen) {
      navLinks.classList.toggle('open', isOpen);         // add or remove "open"
      menuBtn.setAttribute('aria-expanded', isOpen);     // true / false
      menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    // Click the button: flip between open and closed
    menuBtn.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('open'));
    });

    // Pressing the Escape key closes the menu
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
  }


  // -----------------------------------------------------
  // 2. SCROLL REVEAL
  // Elements with class "reveal" start invisible (see the CSS). When one
  // scrolls into view, we add the class "in" and the CSS fades it in.
  // -----------------------------------------------------
  var revealItems = document.querySelectorAll('.reveal');

  // Show everything straight away, with no animation
  function showAll() {
    revealItems.forEach(function (el) { el.classList.add('in'); });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Reduced motion, or an old browser without IntersectionObserver:
    // skip the effect and just show everything.
    showAll();
  } else {
    // IntersectionObserver tells us when an element enters the screen.
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');   // reveal it
          observer.unobserve(entry.target);   // stop watching: it only animates once
        }
      });
    }, { threshold: 0.12 });                  // fires when 12% of the element is visible

    revealItems.forEach(function (el) { observer.observe(el); });
  }


  // -----------------------------------------------------
  // 3. FOOTER YEAR
  // Puts the current year inside <span id="year">.
  // -----------------------------------------------------
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  // -----------------------------------------------------
  // 4. PORTFOLIO FILTER (portfolio.html only)
  // Each button has data-cat="all", "web" or "leads".
  // Each project card has data-cat="web" or "leads".
  // -----------------------------------------------------
  var filterButtons = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {

      // Mark only the clicked button as active (class "on")
      filterButtons.forEach(function (b) { b.classList.remove('on'); });
      button.classList.add('on');

      // Show the cards that match, hide the others
      var category = button.getAttribute('data-cat');
      projects.forEach(function (card) {
        var matches = category === 'all' || card.getAttribute('data-cat') === category;
        card.style.display = matches ? '' : 'none';   // '' = back to normal
      });
    });
  });


  // -----------------------------------------------------
  // 5. CONTACT FORM (contact.html only)
  // The site has no server, so the form can't send anything itself.
  // Instead it builds a message and gives the visitor three ways to send it:
  // email, WhatsApp, or copy.
  // -----------------------------------------------------
  var form = document.getElementById('contactForm');

  if (form) {

    // Your contact details live here, so there is only one place to change them
    var EMAIL = 'drawingacadmey@gmail.com';
    var WHATSAPP = '923176497826';

    var mode = 'project';   // which tab is active: 'project' (Hire Me) or 'sample' (Free 5 Leads)
    var tabs = form.querySelectorAll('.tabs button');
    var projectFields = form.querySelector('.project-only');
    var sampleFields = form.querySelector('.sample-only');
    var result = document.getElementById('formResult');

    // ----- 5a. Tabs -----
    // Switches the active tab and shows or hides the matching fields.
    function setMode(newMode) {
      mode = newMode;
      tabs.forEach(function (tab) {
        // classList.toggle(name, true/false) adds or removes the class
        tab.classList.toggle('on', tab.getAttribute('data-mode') === newMode);
      });
      projectFields.classList.toggle('hide', newMode !== 'project');
      sampleFields.classList.toggle('hide', newMode !== 'sample');
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setMode(tab.getAttribute('data-mode'));
      });
    });

    // If the page was opened as contact.html#leads, start on "Free 5 Leads"
    setMode(window.location.hash === '#leads' ? 'sample' : 'project');

    // ----- 5b. Helpers -----
    // Returns what the visitor typed in a field (spaces at the ends removed)
    function value(id) {
      var field = document.getElementById(id);
      return field ? field.value.trim() : '';
    }

    // Builds the message text from the fields of the active tab.
    // Empty optional fields are left out. "\n" means "new line".
    function buildMessage() {
      var lines = [];
      var fields;

      if (mode === 'sample') {
        lines.push('Hi Aqila, I would like to try your lead generation service with 5 free verified leads.');
        fields = [
          ['Name', 'name'],
          ['Email', 'email'],
          ['Company', 'company'],
          ['Target industry', 'industry'],
          ['Target location', 'location'],
          ['Job titles to reach', 'titles']
        ];
      } else {
        lines.push('Hi Aqila, I saw your portfolio and would like to work with you.');
        fields = [
          ['Name', 'name'],
          ['Email', 'email'],
          ['Company', 'company'],
          ['I need help with', 'service'],
          ['Details', 'details']
        ];
      }

      lines.push('');   // an empty line between the greeting and the list
      fields.forEach(function (pair) {
        var text = value(pair[1]);
        if (text) lines.push(pair[0] + ': ' + text);   // "Label: value"
      });

      return lines.join('\n');
    }

    // Shows text in the result box. Using textContent (not innerHTML)
    // means nothing the visitor types can ever be run as code.
    function showResult(contentNodes) {
      result.textContent = '';                       // clear the old content
      contentNodes.forEach(function (node) { result.appendChild(node); });
      result.classList.add('show');
      result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }

    // Small helper that creates an element with a class and text
    function make(tag, className, text) {
      var el = document.createElement(tag);
      if (className) el.className = className;
      if (text) el.textContent = text;
      return el;
    }

    // Copies text to the clipboard. Calls done(true) or done(false).
    function copyText(text, done) {
      // Modern way
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done(true); },
          function () { done(legacyCopy(text)); }
        );
      } else {
        done(legacyCopy(text));
      }
    }

    // Older way (for browsers that block the modern one): copy from a hidden textarea
    function legacyCopy(text) {
      var box = document.createElement('textarea');
      box.value = text;
      box.style.position = 'fixed';
      box.style.opacity = '0';
      document.body.appendChild(box);
      box.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(box);
      return ok;
    }

    // ----- 5c. Submit -----
    form.addEventListener('submit', function (event) {
      event.preventDefault();   // stops the page from reloading

      // Name and email are required
      if (!value('name') || !value('email')) {
        showResult([make('strong', '', 'Please add your name and email so I can reply to you.')]);
        return;
      }

      var message = buildMessage();
      var subject = mode === 'sample' ? 'Free 5 Verified Leads Request'
                                      : 'New Project Enquiry from your Portfolio';

      // encodeURIComponent turns spaces into %20 and line breaks into %0A,
      // so they survive inside a link.
      var mailLink = 'mailto:' + EMAIL +
                     '?subject=' + encodeURIComponent(subject) +
                     '&body=' + encodeURIComponent(message);
      var whatsappLink = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message);

      // Build the three buttons
      var emailBtn = make('a', 'btn btn-primary', 'Send by Email');
      emailBtn.href = mailLink;

      var whatsappBtn = make('a', 'btn btn-ghost', 'Send on WhatsApp');
      whatsappBtn.href = whatsappLink;

      var copyBtn = make('button', 'btn btn-ghost', 'Copy Message');
      copyBtn.type = 'button';
      copyBtn.addEventListener('click', function () {
        copyText(message, function (success) {
          copyBtn.textContent = success ? 'Copied ✓' : 'Copy failed: please select the text and copy it yourself';
        });
      });

      var buttons = make('div', 'result-buttons');
      buttons.appendChild(emailBtn);
      buttons.appendChild(whatsappBtn);
      buttons.appendChild(copyBtn);

      showResult([
        make('strong', '', 'Your message is ready! Choose how to send it:'),
        buttons,
        make('p', 'result-note', "If the email app doesn't open, copy the message and send it to " + EMAIL + '.')
      ]);
    });
  }


  // -----------------------------------------------------
  // 6. SOCIAL MEDIA ICONS
  // Each icon in the HTML has data-social="linkedin" (or tiktok, etc.).
  // We look up its address in SOCIAL_LINKS (at the top of this file).
  // -----------------------------------------------------
  document.querySelectorAll('.social-link').forEach(function (link) {
    var url = SOCIAL_LINKS[link.getAttribute('data-social')];

    // A real link starts with http:// or https://
    var isReal = typeof url === 'string' && /^https?:\/\//i.test(url);

    if (isReal) {
      link.href = url;
      link.target = '_blank';           // open in a new tab
      link.rel = 'noopener';            // a safety setting for links that open a new tab
    } else {
      // Still a placeholder: clicking does nothing (no jump) and shows "Coming soon"
      link.classList.add('is-placeholder');
      link.addEventListener('click', function (event) {
        event.preventDefault();                       // stops the jump to the top of the page
        link.classList.add('show-tip');               // shows the tip (helps on phones, which have no hover)
        setTimeout(function () { link.classList.remove('show-tip'); }, 1800);
      });
    }
  });

})();
