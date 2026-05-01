/**
 * Maison des Nus — Theme JS
 * Editorial luxury · New York
 */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
  const html = document.documentElement;

  // =================================================
  // Header: hide on scroll down, show on scroll up
  // =================================================
  function initHeader() {
    const header = $('[data-header]');
    if (!header) return;
    let lastY = 0;
    let ticking = false;
    const threshold = 120;

    function tick() {
      const y = window.scrollY;
      if (y > threshold) {
        if (y > lastY + 4) header.classList.add('is-hidden');
        else if (y < lastY - 4) header.classList.remove('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      if (y > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(tick); ticking = true; }
    }, { passive: true });
  }

  // =================================================
  // Shop dropdown (click toggle)
  // =================================================
  function initShopDropdown() {
    const item = $('[data-shop-dropdown]');
    const toggle = $('[data-shop-dropdown-toggle]');
    if (!item || !toggle) return;

    const close = () => {
      item.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const open = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', e => {
      if (!item.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && item.classList.contains('is-open')) close();
    });
  }

  // =================================================
  // Mobile menu
  // =================================================
  function initMobileMenu() {
    const menu = $('[data-mobile-menu]');
    if (!menu) return;
    const openBtns = $$('[data-menu-open]');
    const closeBtns = $$('[data-menu-close]');

    const open = () => {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      html.classList.add('is-scroll-locked');
      openBtns.forEach(b => b.setAttribute('aria-expanded', 'true'));
    };
    const close = () => {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      html.classList.remove('is-scroll-locked');
      openBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
    };

    openBtns.forEach(b => b.addEventListener('click', open));
    closeBtns.forEach(b => b.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) close(); });
  }

  // =================================================
  // Cart Drawer
  // =================================================
  function initCartDrawer() {
    const drawer = $('[data-cart-drawer]');
    const overlay = $('[data-cart-overlay]');
    if (!drawer || !overlay) return;
    const openBtns = $$('[data-cart-toggle]');
    const closeBtn = $('[data-cart-close]');

    const open = () => {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      html.classList.add('is-scroll-locked');
    };
    const close = () => {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      html.classList.remove('is-scroll-locked');
    };

    openBtns.forEach(b => b.addEventListener('click', open));
    closeBtn && closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) close(); });

    // Item qty + remove
    async function updateItem(key, qty) {
      try {
        const r = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: key, quantity: qty })
        });
        if (!r.ok) throw new Error('cart');
        await refreshCart();
      } catch (e) { console.error(e); }
    }

    drawer.addEventListener('click', e => {
      const item = e.target.closest('[data-cart-item]');
      if (!item) return;
      const key = item.dataset.key;
      const qtyEl = item.querySelector('.cart-drawer__item-qty span');
      const qty = parseInt(qtyEl?.textContent || '1', 10);
      if (e.target.matches('[data-cart-qty-inc]')) updateItem(key, qty + 1);
      else if (e.target.matches('[data-cart-qty-dec]')) updateItem(key, Math.max(0, qty - 1));
      else if (e.target.matches('[data-cart-remove]')) updateItem(key, 0);
    });

    // Quick-add
    $$('[data-quick-add-btn]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.variantId;
        if (!id) return;
        btn.textContent = 'Adding...';
        try {
          await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ items: [{ id, quantity: 1 }] })
          });
          await refreshCart();
          btn.textContent = 'Added ✓';
          setTimeout(() => { btn.textContent = 'Quick Add'; }, 1600);
          open();
        } catch (err) {
          btn.textContent = 'Try Again';
          setTimeout(() => { btn.textContent = 'Quick Add'; }, 1600);
        }
      });
    });
  }

  async function refreshCart() {
    try {
      const r = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
      const cart = await r.json();
      $$('[data-cart-count]').forEach(el => {
        el.textContent = String(cart.item_count).padStart(2, '0');
      });
      // Reload the drawer contents
      const sectionR = await fetch(window.location.pathname + '?section_id=header');
      // Simple approach: reload drawer HTML from the current page rendering
      const drawerR = await fetch(window.location.pathname);
      const text = await drawerR.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const newDrawer = doc.querySelector('[data-cart-drawer]');
      const oldDrawer = $('[data-cart-drawer]');
      if (newDrawer && oldDrawer) {
        const wasOpen = oldDrawer.classList.contains('is-open');
        oldDrawer.innerHTML = newDrawer.innerHTML;
        if (wasOpen) oldDrawer.classList.add('is-open');
        // Re-bind events for new drawer contents
        bindDrawerEvents();
      }
    } catch (e) { console.error(e); }
  }

  function bindDrawerEvents() {
    // Re-bind close button after drawer refresh
    const drawer = $('[data-cart-drawer]');
    if (!drawer) return;
    const closeBtn = drawer.querySelector('[data-cart-close]');
    closeBtn && closeBtn.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      $('[data-cart-overlay]').classList.remove('is-open');
      html.classList.remove('is-scroll-locked');
    });
  }

  // =================================================
  // Search Overlay
  // =================================================
  function initSearchOverlay() {
    const overlay = $('[data-search-overlay]');
    if (!overlay) return;
    const openBtns = $$('[data-search-toggle]');
    const closeBtn = $('[data-search-close]');
    const input = $('[data-search-input]');
    const results = $('[data-search-results]');

    const open = () => {
      overlay.classList.add('is-open');
      html.classList.add('is-scroll-locked');
      setTimeout(() => input?.focus(), 220);
    };
    const close = () => {
      overlay.classList.remove('is-open');
      html.classList.remove('is-scroll-locked');
    };

    openBtns.forEach(b => b.addEventListener('click', open));
    closeBtn && closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); overlay.classList.contains('is-open') ? close() : open(); }
    });

    // Debounced live search via predictive API
    let debounce;
    input && input.addEventListener('input', () => {
      const q = input.value.trim();
      clearTimeout(debounce);
      if (!q) { results.innerHTML = ''; return; }
      debounce = setTimeout(async () => {
        try {
          const r = await fetch(`/search/suggest.json?q=${encodeURIComponent(q)}&resources[type]=product&resources[limit]=8`);
          const data = await r.json();
          const products = (data.resources?.results?.products) || [];
          results.innerHTML = products.map(p => `
            <a class="product-card" href="${p.url}">
              <div class="product-card__media">
                ${p.featured_image?.url ? `<img class="product-card__image product-card__image--primary" src="${p.featured_image.url.replace('.jpg', '_500x.jpg')}" alt="${p.title}" loading="lazy">` : ''}
              </div>
              <div class="product-card__info">
                <h3 class="product-card__title">${p.title}</h3>
                <p class="product-card__price">${p.price}</p>
              </div>
            </a>
          `).join('');
        } catch (e) { /* swallow */ }
      }, 180);
    });
  }

  // =================================================
  // Product accordions
  // =================================================
  function initAccordions() {
    $$('[data-accordion-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.product-accordion__item');
        if (item) item.classList.toggle('is-open');
      });
    });
  }

  // =================================================
  // Filter drawer
  // =================================================
  function initFilters() {
    const toggle = $('[data-filter-toggle]');
    const drawer = $('[data-filter-drawer]');
    toggle && drawer && toggle.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', drawer.classList.contains('is-open'));
    });
  }

  // =================================================
  // Sort select
  // =================================================
  function initSort() {
    const select = $('[data-sort-select]');
    if (!select) return;
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', select.value);
      window.location.href = url.toString();
    });
  }

  // =================================================
  // Image zoom modal
  // =================================================
  function initImageZoom() {
    $$('[data-zoom-image]').forEach(img => {
      img.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal is-open';
        modal.innerHTML = `
          <button type="button" class="image-modal__close" aria-label="Close">Close</button>
          <img src="${img.dataset.zoomSrc || img.src}" alt="${img.alt || ''}">
        `;
        modal.addEventListener('click', () => {
          modal.classList.remove('is-open');
          setTimeout(() => modal.remove(), 300);
        });
        document.body.appendChild(modal);
      });
    });
  }

  // =================================================
  // Variant selectors
  // =================================================
  function initVariantSelectors() {
    $$('[data-variant-group]').forEach(group => {
      group.addEventListener('click', e => {
        const opt = e.target.closest('.variant-selector__option, .variant-selector__swatch');
        if (!opt) return;
        group.querySelectorAll('.variant-selector__option, .variant-selector__swatch').forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        const label = group.querySelector('[data-variant-selected]');
        if (label) label.textContent = opt.dataset.value || opt.textContent.trim();
        // Trigger variant swap event
        const form = group.closest('form');
        if (form) form.dispatchEvent(new CustomEvent('variant:change', { detail: { value: opt.dataset.value } }));
      });
    });
  }

  // =================================================
  // Gift card preset picker
  // =================================================
  function initGiftCardPresets() {
    const presets = $$('[data-gc-preset]');
    const input = $('[data-gc-custom]');
    const form = $('[data-gc-form]');
    if (!presets.length) return;
    presets.forEach(p => {
      p.addEventListener('click', () => {
        presets.forEach(x => x.classList.remove('is-active'));
        p.classList.add('is-active');
        if (input) input.value = p.dataset.amount;
      });
    });
    input && input.addEventListener('input', () => {
      presets.forEach(x => x.classList.remove('is-active'));
    });
  }

  // =================================================
  // Init
  // =================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initShopDropdown();
    initMobileMenu();
    initCartDrawer();
    initSearchOverlay();
    initAccordions();
    initFilters();
    initSort();
    initImageZoom();
    initVariantSelectors();
    initGiftCardPresets();
  });

})();
