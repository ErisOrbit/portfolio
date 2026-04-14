// CURSOR
const cur = document.getElementById("cur");
let frame = 0;
document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
  if (frame++ % 3 === 0) trail(e.clientX, e.clientY);
});
document.querySelectorAll("a,.chip").forEach((el) => {
  el.addEventListener("mouseenter", () => cur.classList.add("big"));
  el.addEventListener("mouseleave", () => cur.classList.remove("big"));
});
document.addEventListener(
  "mousedown",
  () => (cur.style.transform = "translate(-50%,-50%) scale(.65)"),
);
document.addEventListener("mouseup", () => (cur.style.transform = ""));
const COLS = ["#c94a2a", "#2a5cc9", "#0c0c0e", "#8a8478", "#c94a2a"];
function trail(x, y) {
  const d = document.createElement("div");
  d.className = "trail";
  const s = Math.random() * 7 + 2;
  d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${COLS[Math.floor(Math.random() * COLS.length)]};animation-duration:${0.3 + Math.random() * 0.3}s`;
  document.body.appendChild(d);
  d.addEventListener("animationend", () => d.remove());
}
// REVEAL
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.06 + "s";
  io.observe(el);
});
// LINK ROW MAGNETIC
document.querySelectorAll(".link-row").forEach((r) => {
  r.addEventListener("mousemove", (e) => {
    const rect = r.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    r.style.transform = `translateY(${y}px)`;
  });
  r.addEventListener("mouseleave", () => (r.style.transform = ""));
});
