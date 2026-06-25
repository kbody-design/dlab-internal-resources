(function () {
  const PASSWORD = "dlab2025";
  const KEY = "dlab_auth";

  if (sessionStorage.getItem(KEY) === "1") return;

  // Build overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = [
    "position:fixed", "inset:0", "z-index:9999",
    "background:#182B49",
    "display:flex", "align-items:center", "justify-content:center",
    "font-family:'Source Sans 3',sans-serif"
  ].join(";");

  overlay.innerHTML = `
    <div style="background:#fff;border-radius:10px;padding:2.5rem 2rem;width:100%;max-width:380px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,0.3);">
      <img src="/assets/images/logo-mark.png" alt="The Design Lab" style="height:56px;margin-bottom:1.25rem;" onerror="this.style.display='none'">
      <h2 style="font-family:'Oswald',sans-serif;font-size:1.4rem;color:#182B49;margin-bottom:0.35rem;letter-spacing:0.04em;">DESIGN LAB</h2>
      <p style="font-size:0.88rem;color:#666;margin-bottom:1.5rem;">Internal Resources &mdash; Staff Access Only</p>
      <input id="gate-input" type="password" placeholder="Enter password"
        style="width:100%;padding:0.7rem 1rem;border:2px solid #D6CCB8;border-radius:5px;font-size:1rem;outline:none;margin-bottom:0.75rem;box-sizing:border-box;">
      <button id="gate-btn"
        style="width:100%;padding:0.7rem;background:#00629B;color:#fff;border:none;border-radius:5px;font-size:1rem;font-weight:600;cursor:pointer;">
        Enter
      </button>
      <p id="gate-error" style="color:#c0392b;font-size:0.85rem;margin-top:0.6rem;min-height:1.2em;"></p>
    </div>`;

  document.body.appendChild(overlay);

  // Fix relative logo path for subpages
  const img = overlay.querySelector("img");
  const depth = location.pathname.split("/").filter(Boolean).length;
  const prefix = depth > 1 ? "../".repeat(depth - 1) : "";
  img.src = prefix + "assets/images/logo-mark.png";

  function attempt() {
    const val = document.getElementById("gate-input").value;
    if (val === PASSWORD) {
      sessionStorage.setItem(KEY, "1");
      overlay.remove();
    } else {
      document.getElementById("gate-error").textContent = "Incorrect password. Please try again.";
      document.getElementById("gate-input").value = "";
      document.getElementById("gate-input").focus();
    }
  }

  document.getElementById("gate-btn").addEventListener("click", attempt);
  document.getElementById("gate-input").addEventListener("keydown", e => {
    if (e.key === "Enter") attempt();
  });

  // Focus input after render
  setTimeout(() => document.getElementById("gate-input").focus(), 50);
})();
