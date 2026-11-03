import { useEffect, useRef } from "react";

/* A detection box that follows the mouse and snaps around whatever
   interactive element is under it, labelled like a model's output.
   The native cursor stays visible; this only adds the box. */

const TARGETS = "a, button, input, textarea, [data-detect]";

function labelFor(el) {
  if (el.dataset.detect) return el.dataset.detect;
  if (el.tagName === "A") return "link";
  if (el.tagName === "BUTTON") return "button";
  return "field";
}

// Stable pseudo-confidence per label so it doesn't flicker
const score = (s) => (0.91 + ([...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 9) / 100).toFixed(2);

export default function DetectCursor() {
  const boxRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = boxRef.current;
    if (!fine || !box) return;

    const mouse = { x: -100, y: -100, inside: false };
    const cur = { x: -100, y: -100, w: 22, h: 22 };
    let target = null;
    let raf;

    const detect = () => {
      const el = document.elementFromPoint(mouse.x, mouse.y)?.closest(TARGETS);
      target = el || null;
      if (target) {
        const text = labelFor(target);
        labelRef.current.textContent = `${text} ${score(text)}`;
      }
    };

    // Hit-testing is batched to once per frame instead of on every event
    let dirty = false;
    const mark = () => { dirty = true; };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.inside = true; dirty = true; };
    const onLeave = () => { mouse.inside = false; };

    const tick = () => {
      if (!labelRef.current) return; // unmounted
      if (dirty) { dirty = false; detect(); }
      let x, y, w, h;
      if (target) {
        const r = target.getBoundingClientRect();
        x = r.left - 8; y = r.top - 6; w = r.width + 16; h = r.height + 12;
      } else {
        x = mouse.x - 11; y = mouse.y - 11; w = 22; h = 22;
      }
      const k = reduce ? 1 : 0.22;
      cur.x += (x - cur.x) * k; cur.y += (y - cur.y) * k;
      cur.w += (w - cur.w) * k; cur.h += (h - cur.h) * k;
      box.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      box.style.width = `${cur.w}px`;
      box.style.height = `${cur.h}px`;
      box.style.opacity = mouse.inside ? 1 : 0;
      labelRef.current.style.opacity = target ? 1 : 0;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", mark, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", mark);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={boxRef} className="det cursor-det" aria-hidden="true" style={{ opacity: 0 }}>
      <span ref={labelRef} className="det-label" />
    </div>
  );
}
