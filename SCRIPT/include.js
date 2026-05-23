/* ========================
   INCLUDE.JS
   Loads header + footer dynamically
======================== */

const pageType = document.body.dataset.layout;

// ---- Load HTML component into element ----
const load = async (id, file) => {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Cannot fetch ${file}`);
    const data = await response.text();
    const el = document.getElementById(id);
    if (!el) return;

    // Extract and inject only the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    el.innerHTML = doc.body.innerHTML;

    // Re-run any inline scripts in the loaded HTML
    el.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    document.dispatchEvent(new Event('headerLoaded'));

  } catch (error) {
    console.error('Include error:', error);
  }
};

// ---- Load components ----
async function loadComponents() {
  if (pageType === 'public') {
    await load('header', '/COMPONENTS/header.html');
    await load('footer', '/COMPONENTS/footer.html');
  }
}

loadComponents();
