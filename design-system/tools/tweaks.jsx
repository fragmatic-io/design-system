// tweaks.jsx — Fragmatic Design System tweaks
// Four expressive levers that reshape the feel.
//   • Temperament — rewrites the emerald-* scale (brand hue family)
//   • Surface     — page bg, card bg, border, shadow recipe
//   • Density     — single root font-size; the whole DS is in rem
//   • Dark        — flips the gray scale + semantic vars via tokens.css

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "temperament": "cool",
  "surface": "paper",
  "density": "standard",
  "dark": false
}/*EDITMODE-END*/;

// ── Temperament: shifts the brand hue family ────────────────────────────
const TEMPERAMENT = {
  cool: { // default — true emerald
    name: "Emerald",
    sub: "balanced · canonical",
    50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
    400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
    800: "#065f46", 900: "#064e3b", 950: "#052119",
    spark: "#065f46",
  },
  warm: { // moss — yellower, friendlier
    name: "Moss",
    sub: "warmer · friendly",
    50: "#f5fbe9", 100: "#e6f4c7", 200: "#cfe89a", 300: "#a8d367",
    400: "#7fb83c", 500: "#5a9620", 600: "#427515", 700: "#345a12",
    800: "#2a4a10", 900: "#22390e", 950: "#13210a",
    spark: "#345a12",
  },
  deep: { // forest — bluer, institutional
    name: "Forest",
    sub: "deeper · institutional",
    50: "#eaf6f3", 100: "#cfeae3", 200: "#a3d4c7", 300: "#6cb6a3",
    400: "#3f967f", 500: "#1f7864", 600: "#106152", 700: "#0a4f43",
    800: "#063f37", 900: "#04302a", 950: "#021a17",
    spark: "#0a4f43",
  },
};

// ── Surface character — only applied in light mode ──────────────────────
const SURFACE = {
  paper: {
    name: "Paper",
    sub: "white card · gray-50 page",
    pageBg: "#f9fafb",
    cardBg: "#ffffff",
    border: "#e5e7eb",
    cardShadow:
      "0 0.483px 0.483px -1.875px rgba(0,0,0,0.17), 0 4px 4px -3.75px rgba(0,0,0,0.06)",
    elevShadow:
      "0 1px 2px 0 rgba(16,24,40,0.06), 0 1px 3px 0 rgba(16,24,40,0.10)",
  },
  canvas: {
    name: "Canvas",
    sub: "off-white · soft warmth",
    pageBg: "#f6f3ec",
    cardBg: "#fdfaf3",
    border: "#e7e0cf",
    cardShadow:
      "0 0.5px 0.5px -1.5px rgba(60,40,10,0.18), 0 4px 6px -3.5px rgba(60,40,10,0.08)",
    elevShadow:
      "0 1px 2px 0 rgba(60,40,10,0.06), 0 2px 6px 0 rgba(60,40,10,0.08)",
  },
  inked: {
    name: "Inked",
    sub: "near-black ink · crisp rules",
    pageBg: "#f3f3f0",
    cardBg: "#ffffff",
    border: "#1f2937",
    cardShadow: "0 0 0 1px #1f2937",
    elevShadow: "3px 3px 0 0 #1f2937",
  },
};

// ── Density: single root font-size, the whole DS is in rem ──────────────
const DENSITY = {
  relaxed:  { name: "Relaxed",  px: 16, sub: "airy · generous spacing" },
  standard: { name: "Standard", px: 14, sub: "as-shipped" },
  dense:    { name: "Dense",    px: 12, sub: "compact · pro · ops view" },
};

function applyTweaks(t) {
  const temp = TEMPERAMENT[t.temperament] || TEMPERAMENT.cool;
  const surf = SURFACE[t.surface] || SURFACE.paper;
  const den  = DENSITY[t.density]   || DENSITY.standard;
  const dark = !!t.dark;

  // Dark mode toggle — tokens.css carries the override block
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');

  const r = document.documentElement.style;

  // Emerald scale rewrite — cascades to every component (works in both modes)
  for (const k of [50,100,200,300,400,500,600,700,800,900,950]) {
    r.setProperty(`--emerald-${k}`, temp[k]);
  }
  if (!dark) {
    r.setProperty("--primary", temp[800]);
    r.setProperty("--primary-hover", temp[700]);
  } else {
    // In dark, lean on a bright accent rather than the deep brand
    r.setProperty("--primary", temp[500]);
    r.setProperty("--primary-hover", temp[400]);
  }

  // Surface — only in light mode; dark mode owns its own surface tokens
  if (!dark) {
    r.setProperty("--page-bg",       surf.pageBg);
    r.setProperty("--card-bg",       surf.cardBg);
    r.setProperty("--border-subtle", surf.border);
    r.setProperty("--shadow-card",   surf.cardShadow);
    r.setProperty("--shadow-elev",   surf.elevShadow);
  } else {
    // Clear any light overrides so the [data-theme="dark"] block wins
    r.removeProperty("--page-bg");
    r.removeProperty("--card-bg");
    r.removeProperty("--border-subtle");
    r.removeProperty("--shadow-card");
    r.removeProperty("--shadow-elev");
  }

  // Density — the whole DS is in rem, so this single line scales everything
  r.setProperty("font-size", den.px + "px");

  // Update inline-stamped sparks
  document.querySelectorAll('[data-spark]').forEach(el => {
    el.setAttribute('stroke', temp.spark);
    if (el.tagName === 'path' && el.getAttribute('fill') !== 'none' && el.getAttribute('fill')) {
      el.setAttribute('fill', temp.spark);
    }
  });
}

function FragmaticTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  const temp = TEMPERAMENT[t.temperament];
  const surf = SURFACE[t.surface];
  const den  = DENSITY[t.density];

  const swatchRow = (a, b, c, d) => (
    <div style={{display:'flex',gap:3,marginTop:4}}>
      <span style={{flex:1,height:8,borderRadius:2,background:a}}/>
      <span style={{flex:1,height:8,borderRadius:2,background:b}}/>
      <span style={{flex:1,height:8,borderRadius:2,background:c}}/>
      <span style={{flex:1,height:8,borderRadius:2,background:d}}/>
    </div>
  );

  const subStyle = {fontSize:10,color:'rgba(41,38,27,.55)',marginTop:-2};

  return (
    <TweaksPanel title="Tweaks · Fragmatic">

      <TweakSection label="Brand temperament" />
      <TweakRadio
        value={t.temperament}
        options={[
          { value: 'cool', label: 'Emerald' },
          { value: 'warm', label: 'Moss' },
          { value: 'deep', label: 'Forest' },
        ]}
        onChange={(v) => setTweak('temperament', v)}
      />
      <div style={subStyle}>
        {temp.sub}
        {swatchRow(temp[200], temp[500], temp[700], temp[900])}
      </div>

      <TweakSection label="Surface" />
      <TweakRadio
        value={t.surface}
        options={[
          { value: 'paper',  label: 'Paper'  },
          { value: 'canvas', label: 'Canvas' },
          { value: 'inked',  label: 'Inked'  },
        ]}
        onChange={(v) => setTweak('surface', v)}
      />
      <div style={subStyle}>
        {t.dark ? 'overridden by dark mode' : surf.sub}
      </div>

      <TweakSection label="Density" />
      <TweakRadio
        value={t.density}
        options={[
          { value: 'relaxed',  label: 'Relaxed'  },
          { value: 'standard', label: 'Standard' },
          { value: 'dense',    label: 'Dense'    },
        ]}
        onChange={(v) => setTweak('density', v)}
      />
      <div style={subStyle}>
        {den.sub} · root {den.px}px
      </div>

      <TweakSection label="Theme" />
      <TweakToggle
        label="Dark mode"
        value={t.dark}
        onChange={(v) => setTweak('dark', v)}
      />

    </TweaksPanel>
  );
}

const __root = document.createElement('div');
document.body.appendChild(__root);
ReactDOM.createRoot(__root).render(<FragmaticTweaks/>);
applyTweaks(TWEAK_DEFAULTS);
