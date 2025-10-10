/* script.js — small interactions & smooth scroll */

document.addEventListener("DOMContentLoaded", function () {
  // Set year in footer
  const y = new Date().getFullYear();
  const year = document.getElementById("year");
  if (year) year.textContent = y;

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      if (nav.style.display === "flex") {
        nav.style.display = "";
      } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.right = "20px";
        nav.style.top = "60px";
        nav.style.background = "rgba(255,255,255,0.98)";
        nav.style.padding = "14px";
        nav.style.borderRadius = "10px";
        nav.style.boxShadow = "0 8px 18px rgba(0,0,0,0.08)";
      }
    });
  }

  // Lightbox-on-click for cards (simple)
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (!img) return;
      openLightbox(img.src, card.querySelector("h3")?.textContent || "");
    });
  });

  function openLightbox(src, title = "") {
    // create overlay
    const overlay = document.createElement("div");
    overlay.style = "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);z-index:9999";
    overlay.innerHTML = `
      <div style="max-width:90%;max-height:90%;border-radius:10px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.5);background:#fff">
        <img src="${src}" style="display:block;max-width:100%;height:auto;"/>
        <div style="padding:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong>${title}</strong>
            <button id="lb-close" style="background:#000;color:#fff;border:0;padding:6px 10px;border-radius:6px;cursor:pointer">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector("#lb-close").addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }
});
