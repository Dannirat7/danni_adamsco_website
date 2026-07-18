
(function () {
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navGroups = [
    { href: 'index.html', label: 'Home' },
    {
      label: 'Our Story',
      pages: ['about.html', 'news.html'],
      items: [
        ['about.html', 'About Us & Mission'],
        ['news.html', 'In the News']
      ]
    },
    {
      label: 'Meet the Partners',
      pages: ['team.html', 'partners.html'],
      items: [
        ['team.html', 'Behavioral Health Team'],
        ['partners.html', 'Community Partners']
      ]
    },
    {
      label: 'Resources',
      pages: ['resources.html'],
      items: [
        ['resources.html#youth', 'Youth Resources'],
        ['resources.html#caregivers', 'Caregiver Materials'],
        ['resources.html#providers', 'Provider Resources']
      ]
    },
    { href: 'faq.html', label: 'FAQs' },
    { href: 'events.html', label: 'Events & Programs' },
    { href: 'contact.html', label: 'Contact' }
  ];

  function renderNavItem(group, index) {
    if (!group.items) {
      return `<a href="${group.href}" class="${current === group.href ? 'active' : ''}">${group.label}</a>`;
    }
    const isActive = group.pages.includes(current);
    const menuId = `nav-dropdown-${index}`;
    return `
      <div class="nav-item has-dropdown">
        <button class="nav-dropdown-toggle ${isActive ? 'active' : ''}" aria-expanded="false" aria-controls="${menuId}">
          ${group.label}<span class="caret" aria-hidden="true">▾</span>
        </button>
        <div class="dropdown-menu" id="${menuId}">
          ${group.items.map(([href, label]) => `<a href="${href}" class="${current === href.split('#')[0] ? 'active' : ''}">${label}</a>`).join('')}
        </div>
      </div>`;
  }

  const header = `
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="topbar">
      <div class="container">
        <span>Local people helping local people across Adams County</span>
        <span><a href="referrals.html">Need support? Start here →</a></span>
      </div>
    </div>
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="Operation Better Together home">
          <img src="assets/obt-logo-transparent.png" alt="">
          <span class="brand-text">
            <strong>Operation Better Together</strong>
            <span>Uniting Services, Strengthening Families</span>
          </span>
        </a>
        <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
        <nav id="main-nav" class="main-nav" aria-label="Main navigation">
          ${navGroups.map(renderNavItem).join('')}
          <a href="referrals.html" class="nav-cta ${current === 'referrals.html' ? 'active' : ''}">Make a Referral</a>
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="assets/obt-logo-transparent.png" alt="Operation Better Together">
            <p>Operation Better Together uses the power of community to make high-quality social-emotional and behavioral health support easier to find and use.</p>
          </div>
          <div>
            <h3>Quick links</h3>
            <div class="footer-links">
              <a href="referrals.html">Make a Referral</a>
              <a href="faq.html">Frequently Asked Questions</a>
              <a href="resources.html">Resources</a>
              <a href="partners.html">Community Partners</a>
            </div>
          </div>
          <div>
            <h3>Information</h3>
            <div class="footer-links">
              <a href="accessibility.html">Accessibility</a>
              <a href="contact.html">Contact Us</a>
              <a href="news.html">News & Recognition</a>
              <a href="events.html">Events & Programs</a>
            </div>
          </div>
        </div>
        <div class="hrsa">Funded by grant number UL8TH53311 from the Office for the Advancement of Telehealth, HRSA, DHHS. Contents do not necessarily represent the official views of HRSA or the U.S. Government.</div>
        <div class="copyright">© <span id="year"></span> Operation Better Together. All rights reserved.</div>
      </div>
    </footer>`;

  const headerTarget = document.getElementById('site-header');
  const footerTarget = document.getElementById('site-footer');
  if (headerTarget) headerTarget.innerHTML = header;
  if (footerTarget) footerTarget.innerHTML = footer;

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const toggle = item.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.has-dropdown.open').forEach(open => {
        if (open !== item) {
          open.classList.remove('open');
          open.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });
  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-item.has-dropdown.open').forEach(item => {
      if (!item.contains(event.target)) {
        item.classList.remove('open');
        item.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const nextField = contactForm.querySelector('input[name="_next"]');
    if (nextField) {
      nextField.value = location.origin + location.pathname + '?sent=1';
    }
    if (new URLSearchParams(location.search).get('sent') === '1') {
      contactForm.hidden = true;
      const message = document.getElementById('form-message');
      if (message) {
        message.textContent = 'Thank you — your message has been sent. A member of the Operation Better Together team will get back to you soon.';
        message.hidden = false;
      }
    }
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
