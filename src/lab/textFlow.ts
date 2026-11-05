import { layoutNextLine, prepareWithSegments, type LayoutCursor, type PreparedTextWithSegments } from "@chenglou/pretext";

// Makes the plain-text paragraphs of a page open up around a circle (the ball), using the free space on both
// sides of it in reading order, which a CSS float cannot do. Only a paragraph the ball has touched is taken
// over: the original element stays in place, with its text made transparent so screen readers, copying and
// the page height keep working, and an aria-hidden layer of absolutely positioned lines is drawn over it.
// release() puts every paragraph back exactly as it was.

export interface Circle {
  x: number; // viewport coordinates
  y: number;
  r: number;
}

const PADDING = 10; // air between the ball and the text
const MIN_SLOT = 48; // narrower gaps than this are left empty

interface Item {
  el: HTMLElement;
  text: string;
  prepared: PreparedTextWithSegments;
  lineHeight: number;
  centred: boolean;
  layer: HTMLDivElement;
  spans: HTMLSpanElement[];
  height: number;
  signature: string;
  saved: { position: string; color: string; minHeight: string };
}

const firstText = (el: HTMLElement) => (el.firstChild?.nodeType === Node.TEXT_NODE ? (el.firstChild.nodeValue ?? "") : "");

const isEligible = (el: HTMLElement) =>
  el.childElementCount === 0 && el.firstChild?.nodeType === Node.TEXT_NODE && firstText(el).trim().length > 30 && !el.classList.contains("sr-only") && !el.closest("[aria-hidden='true']");

export function createTextFlow(root: ParentNode) {
  const items = new Map<HTMLElement, Item>();
  const pending = new Set<HTMLElement>();

  function build(el: HTMLElement, previous?: Item): Item | null {
    const style = getComputedStyle(el);
    const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const text = firstText(el);
    // Measuring before the web font is ready would use the fallback font's widths.
    if (!document.fonts.check(font, text)) {
      if (!pending.has(el)) {
        pending.add(el);
        document.fonts.load(font, text).finally(() => pending.delete(el));
      }
      return null;
    }
    const letterSpacing = parseFloat(style.letterSpacing) || 0;
    const layer = previous?.layer ?? document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = `position:absolute;pointer-events:none;inset:${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`;
    el.appendChild(layer);
    const saved = previous?.saved ?? { position: el.style.position, color: el.style.color, minHeight: el.style.minHeight };
    const color = previous ? el.dataset.flowColor! : style.color;
    el.dataset.flowColor = color;
    if (style.position === "static") el.style.position = "relative";
    el.style.color = "transparent";
    return {
      el,
      text,
      prepared: prepareWithSegments(text, font, { letterSpacing }),
      lineHeight: parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5,
      centred: style.textAlign === "center",
      layer,
      spans: previous?.spans ?? [],
      height: previous?.height ?? 0,
      signature: "",
      saved,
    };
  }

  function lines(item: Item, width: number, ball: Circle, left: number, top: number) {
    const out: Array<{ text: string; x: number; y: number }> = [];
    const reach = ball.r + PADDING;
    const cx = ball.x - left;
    const cy = ball.y - top;
    let cursor: LayoutCursor | undefined;
    let y = 0;
    for (; y < 6000; y += item.lineHeight) {
      const dy = Math.abs(y + item.lineHeight / 2 - cy);
      let slots: Array<[number, number]> = [[0, width]];
      if (dy < reach) {
        const half = Math.sqrt(reach * reach - dy * dy);
        slots = [
          [0, Math.min(width, cx - half)],
          [Math.max(0, cx + half), width],
        ];
      }
      for (const [from, to] of slots) {
        if (to - from < MIN_SLOT) continue;
        const line = layoutNextLine(item.prepared, to - from, cursor);
        if (!line) return { out, height: y };
        out.push({ text: line.text, x: item.centred ? from + (to - from - line.width) / 2 : from, y });
        cursor = line.end;
      }
    }
    return { out, height: y };
  }

  return {
    update(ball: Circle) {
      const paragraphs = [...root.querySelectorAll<HTMLElement>("main p")].filter((el) => items.has(el) || isEligible(el));
      // Reads first, writes after, so one frame costs one layout.
      const rects = paragraphs.map((el) => el.getBoundingClientRect());
      paragraphs.forEach((el, index) => {
        const rect = rects[index];
        let item = items.get(el);
        if (item && (firstText(el) !== item.text || !item.layer.isConnected)) {
          // The text changed (language switch) or React replaced the children: start again.
          item = build(el, item) ?? undefined;
          if (item) items.set(el, item);
        }
        if (!item) {
          const dx = Math.max(rect.left - ball.x, 0, ball.x - rect.right);
          const dy = Math.max(rect.top - ball.y, 0, ball.y - rect.bottom);
          if (dx * dx + dy * dy > (ball.r + PADDING) ** 2) return;
          item = build(el) ?? undefined;
          if (!item) return;
          items.set(el, item);
        }
        const style = getComputedStyle(el);
        const left = rect.left + parseFloat(style.paddingLeft);
        const top = rect.top + parseFloat(style.paddingTop);
        const width = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const signature = `${Math.round(ball.x - left)}|${Math.round(ball.y - top)}|${Math.round(width)}`;
        if (signature === item.signature) return;
        item.signature = signature;
        const result = lines(item, width, ball, left, top);
        // The paragraph only ever grows while the ball is out, so the page below does not jump.
        item.height = Math.max(item.height, result.height);
        el.style.minHeight = `${item.height}px`;
        while (item.spans.length < result.out.length) {
          const span = document.createElement("span");
          span.style.cssText = `position:absolute;left:0;top:0;white-space:pre;font:inherit;letter-spacing:inherit;color:${el.dataset.flowColor}`;
          item.layer.appendChild(span);
          item.spans.push(span);
        }
        item.spans.forEach((span, i) => {
          const line = result.out[i];
          span.style.display = line ? "" : "none";
          if (!line) return;
          span.style.lineHeight = `${item.lineHeight}px`;
          span.style.transform = `translate(${line.x}px,${line.y}px)`;
          if (span.textContent !== line.text) span.textContent = line.text;
        });
      });
    },
    release() {
      for (const item of items.values()) {
        item.layer.remove();
        item.el.style.position = item.saved.position;
        item.el.style.color = item.saved.color;
        item.el.style.minHeight = item.saved.minHeight;
        delete item.el.dataset.flowColor;
      }
      items.clear();
    },
  };
}
