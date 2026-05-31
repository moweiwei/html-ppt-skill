(function() {
  'use strict';

  let editMode = false;
  let saveTimer = null;
  const SAVE_DELAY = 600;

  // Create floating button
  const btn = document.createElement('button');
  btn.id = 'edit-mode-btn';
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
  btn.title = 'Toggle edit mode';
  btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;width:48px;height:48px;border-radius:50%;border:none;background:#111;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(0,0,0,0.15);transition:background 0.2s;';
  document.body.appendChild(btn);

  // Create toast
  const toast = document.createElement('div');
  toast.id = 'edit-toast';
  toast.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:12px;text-align:center;font-size:14px;font-weight:600;z-index:99998;transform:translateY(-100%);transition:transform 0.3s ease;';
  document.body.appendChild(toast);

  function showToast(msg, color) {
    toast.textContent = msg;
    toast.style.background = color;
    toast.style.color = '#fff';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => { toast.style.transform = 'translateY(-100%)'; }, 1500);
  }

  function getEditableElements() {
    return document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, td, th, blockquote, figcaption');
  }

  function enableEditMode() {
    editMode = true;
    btn.style.background = '#dc2626';
    btn.title = 'Exit edit mode';
    getEditableElements().forEach(el => {
      if (el.textContent.trim() && el.children.length === 0) {
        el.contentEditable = 'true';
        el.style.outline = '1px dashed rgba(59,130,246,0.4)';
        el.style.outlineOffset = '2px';
        el.addEventListener('input', onInput);
      }
    });
    document.addEventListener('keydown', blockNav, true);
  }

  function disableEditMode() {
    editMode = false;
    btn.style.background = '#111';
    btn.title = 'Toggle edit mode';
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      el.contentEditable = 'false';
      el.style.outline = '';
      el.style.outlineOffset = '';
      el.removeEventListener('input', onInput);
    });
    document.removeEventListener('keydown', blockNav, true);
  }

  function blockNav(e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.stopPropagation();
    }
    if (e.key === 'Escape') {
      disableEditMode();
    }
  }

  function onInput() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveToServer, SAVE_DELAY);
  }

  function saveToServer() {
    const html = document.documentElement.outerHTML;
    fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: html
    })
    .then(res => {
      if (res.ok) {
        showToast('✓ Saved', '#16a34a');
      } else {
        showToast('Save failed', '#dc2626');
      }
    })
    .catch(() => {
      showToast('Server not running — start with: node server.js', '#dc2626');
    });
  }

  btn.addEventListener('click', () => {
    if (editMode) {
      disableEditMode();
    } else {
      enableEditMode();
    }
  });
})();
