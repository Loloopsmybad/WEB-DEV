import React, { useState, useEffect } from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './supabase'
import MobileReporter from './MobileReporter'

// Simple path-based routing
const isMobile = window.location.pathname === '/mobile'
// {isMobile ? <MobileReporter /> : <GlyphDashboard />}
// Inside GlyphDashboard(), add:



// ─── Types ────────────────────────────────────────────────────────────────────
interface QuickSetting {
  label: string;
  value: string;
  enabled: boolean;
}

// ─── Dot-Matrix Clock Font via Canvas-style SVG dots ─────────────────────────
const DOT_DIGITS: Record<string, number[][]> = {
  "0": [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  "1": [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
  "2": [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  "3": [[1,1,1],[0,0,1],[0,1,1],[0,0,1],[1,1,1]],
  "4": [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  "5": [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  "6": [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  "7": [[1,1,1],[0,0,1],[0,0,1],[0,1,0],[0,1,0]],
  "8": [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  "9": [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]],
  ":": [[0],[1],[0],[1],[0]],
};

function DotDigit({ char, size = 6, gap = 2 }: { char: string; size?: number; gap?: number }) {
  const matrix = DOT_DIGITS[char] || DOT_DIGITS["0"];
  const cols = matrix[0].length;
  const rows = matrix.length;
  const w = cols * (size + gap) - gap;
  const h = rows * (size + gap) - gap;
  return (
    <svg width={w} height={h} style={{ display: "inline-block" }}>
      {matrix.map((row, ri) =>
        row.map((cell, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={ci * (size + gap)}
            y={ri * (size + gap)}
            width={size}
            height={size}
            fill={cell ? "#1a1a1a" : "transparent"}
            rx={1}
          />
        ))
      )}
    </svg>
  );
}

function DotClock({ time }: { time: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {time.split("").map((ch, i) => (
        <DotDigit key={i} char={ch} size={7} gap={2} />
      ))}
    </div>
  );
}

// ─── Glyph Circle ────────────────────────────────────────────────────────────
function GlyphCircle() {
  const dots = Array.from({ length: 36 }, (_, i) => {
    const angle = (i / 36) * Math.PI * 2 - Math.PI / 2;
    const r = 52;
    const x = 70 + r * Math.cos(angle);
    const y = 70 + r * Math.sin(angle);
    const active = i < 15;
    const size = active ? 3.5 : 2;
    return { x, y, active, size };
  });
  const innerDots = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 - Math.PI / 2;
    const r = 34;
    const x = 70 + r * Math.cos(angle);
    const y = 70 + r * Math.sin(angle);
    const active = i < 8;
    return { x, y, active };
  });
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <rect x={8} y={8} width={124} height={124} rx={22} fill="#f0f0f0" stroke="#e0e0e0" strokeWidth={1} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.size} fill={d.active ? "#1a1a1a" : "#c8c8c8"} />
      ))}
      {innerDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={2} fill={d.active ? "#555" : "#d8d8d8"} />
      ))}
      <circle cx={70} cy={70} r={8} fill="#1a1a1a" />
      <circle cx={70} cy={88} r={3} fill="#1a1a1a" />
    </svg>
  );
}

// ─── CPU Arc Gauge ────────────────────────────────────────────────────────────
function ArcGauge({ value }: { value: number }) {
  const r = 32, cx = 42, cy = 48;
  const startAngle = -210 * (Math.PI / 180);
  const endAngle = startAngle + (value / 100) * (240 * (Math.PI / 180));
  const arcPath = (start: number, end: number, radius: number) => {
    const x1 = cx + radius * Math.cos(start);
    const y1 = cy + radius * Math.sin(start);
    const x2 = cx + radius * Math.cos(end);
    const y2 = cy + radius * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };
  const totalEnd = startAngle + 240 * (Math.PI / 180);
  return (
    <svg width={84} height={84}>
      <path d={arcPath(startAngle, totalEnd, r)} fill="none" stroke="#e8e8e8" strokeWidth={5} strokeLinecap="round" />
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#e05c2a" strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
}

// ─── Mini Waveform ────────────────────────────────────────────────────────────
function MiniWaveform({ width = 120, height = 40, color = "#1a1a1a" }: { width?: number; height?: number; color?: string }) {
  const bars = Array.from({ length: 28 }, (_, i) => ({
    h: Math.abs(Math.sin(i * 0.8 + 1) * Math.cos(i * 0.3)) * (height - 4) + 4,
    x: i * (width / 28),
  }));
  return (
    <svg width={width} height={height}>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={height - b.h} width={width / 28 - 1.5} height={b.h} fill={color} opacity={0.7} rx={1} />
      ))}
    </svg>
  );
}

// ─── ECG Line ─────────────────────────────────────────────────────────────────
function EcgLine({ width = 160, height = 50 }: { width?: number; height?: number }) {
  const points = [0,24,24,10,28,38,32,4,38,24,52,24,56,10,60,38,64,4,70,24,84,24,88,10,92,38,96,4,102,24,116,24,120,10,124,38,128,4,134,24,160,24];
  const path = points.reduce((acc, v, i) => {
    if (i % 2 === 0) return acc + (i === 0 ? `M` : ` L`) + ` ${(v / 160) * width}`;
    return acc + ` ${(v / 50) * height}`;
  }, "");
  return (
    <svg width={width} height={height}>
      <path d={path} fill="none" stroke="#1a1a1a" strokeWidth={1.5} strokeLinejoin="round" />
    </svg>
  );
}

// ─── Activity Heatmap ─────────────────────────────────────────────────────────
const HEAT_COLORS = ["#e8e8e8", "#c8d8b0", "#a8c878", "#88b848", "#c8a830", "#e89830"];
function ActivityHeatmap() {
  const grid = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 11 }, (_, c) => {
      const v = Math.random();
      if (v < 0.25) return 0;
      if (v < 0.45) return 1;
      if (v < 0.6) return 2;
      if (v < 0.75) return 3;
      if (v < 0.88) return 4;
      return 5;
    })
  );
  return (
    <div style={{ display: "grid", gridTemplateRows: `repeat(7, 14px)`, gap: 3 }}>
      {grid.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 3 }}>
          {row.map((val, ci) => (
            <div key={ci} style={{ width: 14, height: 14, borderRadius: 3, background: HEAT_COLORS[val] }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── RF Bar Chart ─────────────────────────────────────────────────────────────
function RfBars() {
  const bars = [3, 5, 8, 12, 18, 22, 20, 16, 11, 7, 4, 6, 10, 15, 19];
  const max = Math.max(...bars);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 44 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ width: 8, height: `${(b / max) * 100}%`, background: "#1a1a1a", borderRadius: 2, opacity: 0.8 }} />
      ))}
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 28, height: 16, borderRadius: 8,
        background: enabled ? "#1a1a1a" : "#d0d0d0",
        position: "relative", cursor: "pointer", transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 12, height: 12, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2,
        left: enabled ? 14 : 2, transition: "left 0.2s",
      }} />
    </div>
  );
}

// ─── CSS-in-JS styles ─────────────────────────────────────────────────────────
const S = {
  card: {
    background: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "14px 16px",
    fontFamily: '"Space Mono", "Courier New", monospace',
    overflow: "hidden",
  } as React.CSSProperties,
  label: {
    fontSize: 9,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#888",
    marginBottom: 6,
    fontFamily: '"Space Mono", monospace',
  },
  bigNum: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontFamily: '"Space Mono", monospace',
    color: "#1a1a1a",
  },
  sub: {
    fontSize: 10,
    color: "#888",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontFamily: '"Space Mono", monospace',
  },
  bar: (pct: number, color = "#1a1a1a") => ({
    height: 6, borderRadius: 3,
    background: `linear-gradient(to right, ${color} ${pct}%, #e8e8e8 ${pct}%)`,
  } as React.CSSProperties),
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function GlyphDashboard() {

  const [mobileData, setMobileData] = useState<any>(null)

useEffect(() => {
  // Fetch initial data
  supabase.from('device_data')
    .select('*')
    .eq('device_id', 'my-phone')
    .single()
    .then(({ data }) => data && setMobileData(data))

  // Subscribe to changes
  const channel = supabase
    .channel('device_data_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'device_data'
    }, (payload) => {
      setMobileData(payload.new)
    })
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}, [])
  const [time, setTime] = useState(new Date());
  const [songProgress, setSongProgress] = useState(252); // 4:12 in seconds
  const [countdown, setCountdown] = useState(24 * 60 + 38);
  const [settings, setSettings] = useState<QuickSetting[]>([
    { label: "Wi-Fi", value: "STUDIO 5G", enabled: true },
    { label: "Bluetooth", value: "3 DEVICES", enabled: true },
    { label: "Focus", value: "WORK", enabled: true },
    { label: "Glyph", value: "ESSENTIAL", enabled: true },
  ]);
  const [cpuLoad] = useState(33);
  const [memory] = useState(12.9);
const battery = mobileData?.battery_level ?? 87;
  const [bpm] = useState(78);
  const [rfFreq] = useState(104.0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
      setSongProgress(p => (p < 287 ? p + 1 : 252));
      setCountdown(c => (c > 0 ? c - 1 : 0));
      setIsLive(l => !l);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const raw = time.getHours();
  const hh = String(raw % 12 || 12).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ampm = raw < 12 ? "AM" : "PM";
  const clockStr = `${hh}:${mm}`;
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const dateStr = `${String(time.getDate()).padStart(2,"0")} ${months[time.getMonth()]} ${time.getFullYear()}`;
  const dayStr = days[time.getDay()];

  const songMin = Math.floor(songProgress / 60);
  const songSec = String(songProgress % 60).padStart(2, "0");
  const cdMin = Math.floor(countdown / 60);
  const cdSec = String(countdown % 60).padStart(2, "0");

  const toggleSetting = (i: number) => {
    setSettings(prev => prev.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f4f4f2",
      fontFamily: '"Space Mono", "Courier New", monospace',
      padding: "16px",
    }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f4f2; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e03030",
            boxShadow: "0 0 6px #e03030", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#444", fontWeight: 700 }}>LOCAL CORE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: isLive ? "#22c55e" : "#888",
            transition: "background 0.5s" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "#888" }}>LIVE</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>

        {/* Clock */}
        <div style={{ ...S.card, gridColumn: "1", gridRow: "1" }}>
          <DotClock time={clockStr} />
          <span style={{ ...S.sub, marginLeft: 6 }}>{ampm}</span>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "0.02em" }}>{dayStr}</div>
            <div style={{ ...S.sub, marginTop: 3 }}>{dateStr} / BERLIN</div>
          </div>
        </div>

        {/* Glyph Interface */}
        <div style={{ ...S.card, gridColumn: "2", gridRow: "1 / 3", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ ...S.label, alignSelf: "flex-start" }}>Glyph Interface</div>
          <GlyphCircle />
          <div style={{ width: "100%", marginTop: 8, padding: "6px 8px", background: "#f0f0f0", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ ...S.sub }}>PHONE (2)</span>
              <span style={{ ...S.sub, color: "#1a1a1a", fontWeight: 700 }}>ESSENTIAL</span>
            </div>
          </div>
          <div style={{ width: "100%", marginTop: 10, display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ ...S.label }}>Pattern</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>C1 / CALL</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ ...S.label }}>Intensity</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>42%</div>
            </div>
          </div>
        </div>

        {/* CPU Load */}
        <div style={{ ...S.card, gridColumn: "3", gridRow: "1" }}>
          <div style={{ ...S.label }}>CPU Load •</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ArcGauge value={cpuLoad} />
            <div>
              <div style={{ ...S.bigNum, fontSize: 40 }}>{cpuLoad}<span style={{ fontSize: 18, color: "#888" }}>%</span></div>
            </div>
          </div>
          <div style={{ ...S.sub, marginTop: 4 }}>P-CORE 3.61 GHZ</div>
        </div>

        {/* Memory */}
        <div style={{ ...S.card, gridColumn: "4", gridRow: "1" }}>
          <div style={{ ...S.label }}>Memory</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <div style={{ ...S.bigNum, fontSize: 40 }}>{memory}</div>
            <div style={{ fontSize: 18, color: "#888", fontWeight: 700 }}>GB</div>
          </div>
          <div style={{ ...S.sub, marginTop: 2 }}>/ 16 GB ACTIVE</div>
          <div style={{ marginTop: 8, display: "flex", gap: 2, flexWrap: "wrap" }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ width: 10, height: 8, background: i < 20 ? "#1a1a1a" : "#ddd", borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ ...S.sub, marginTop: 6 }}>SWAP 0.8 GB</div>
        </div>

        {/* Weather */}
        <div style={{ ...S.card, gridColumn: "1", gridRow: "2" }}>
          <div style={{ ...S.label }}>Weather</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ ...S.bigNum, fontSize: 42 }}>{mobileData?.weather_temp ?? 18}</div>
            <div style={{ fontSize: 22, color: "#888", marginBottom: 8 }}>°</div>
          </div>
<div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginTop: 4 }}>{mobileData?.weather_city ?? 'Berlin'}</div>          <div style={{ ...S.sub, marginTop: 2 }}>CODE {mobileData?.weather_code ?? '--'}</div>
          <div style={{ ...S.sub }}>WIND {mobileData?.weather_wind ?? '--'} KM/H</div>
        </div>

        {/* Now Playing */}
        <div style={{ ...S.card, gridColumn: "3 / 5", gridRow: "2" }}>
          <div style={{ ...S.label }}>Now Playing</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>Nightcall</div>
              <div style={{ ...S.sub, marginTop: 3 }}>KAVINSKY / OUTRUN</div>
            </div>
            <MiniWaveform width={110} height={38} color="#1a1a1a" />
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ ...S.bar((songProgress / 287) * 100, "#e05c2a") }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ ...S.sub, fontSize: 9 }}>{songMin}:{songSec}</span>
              <span style={{ ...S.sub, fontSize: 9 }}>04:47</span>
            </div>
          </div>
        </div>

        {/* Battery */}
        <div style={{ ...S.card, gridColumn: "1", gridRow: "3" }}>
          <div style={{ ...S.label }}>Battery</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <div style={{ ...S.bigNum, fontSize: 42 }}>{battery}</div>
            <div style={{ fontSize: 20, color: "#888", fontWeight: 700 }}>%</div>
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 2 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 8, background: i < Math.round(battery / 5) ? "#22c55e" : "#e0e0e0", borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ ...S.sub, marginTop: 6 }}>4H 23M / 31.4C</div>
        </div>

        {/* Quick Settings */}
        <div style={{ ...S.card, gridColumn: "2 / 4", gridRow: "3" }}>
          <div style={{ ...S.label }}>Quick Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
            {settings.map((s, i) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{s.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ ...S.sub, fontSize: 9 }}>{s.value}</span>
                  <Toggle enabled={s.enabled} onToggle={() => toggleSetting(i)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Event */}
        <div style={{ ...S.card, gridColumn: "4", gridRow: "3" }}>
          <div style={{ ...S.label }}>Next Event</div>
          <div style={{ ...S.bigNum, fontSize: 32, lineHeight: 1.1 }}>{cdMin}M {cdSec}S</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginTop: 8 }}>Design sync</div>
          <div style={{ ...S.sub, marginTop: 4, fontSize: 8 }}>CALL IN ROOM GLYPH-A / MIC CHECK PASSED</div>
          <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
            <div style={{ height: 4, flex: 3, background: "#1a1a1a", borderRadius: 2 }} />
            <div style={{ height: 4, flex: 1, background: "#e0e0e0", borderRadius: 2 }} />
          </div>
        </div>

        {/* System Pulse */}
        <div style={{ ...S.card, gridColumn: "1", gridRow: "4" }}>
          <div style={{ ...S.label }}>System Pulse •</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <div style={{ ...S.bigNum, fontSize: 36 }}>{bpm}</div>
            <div style={{ fontSize: 13, color: "#888", fontWeight: 700 }}>BPM</div>
          </div>
          <div style={{ marginTop: 6 }}>
            <EcgLine width={150} height={48} />
          </div>
          <div style={{ ...S.sub, marginTop: 4 }}>TIED TO SCHEDULER LOAD</div>
        </div>

        {/* RF Tuner */}
        <div style={{ ...S.card, gridColumn: "2", gridRow: "4" }}>
          <div style={{ ...S.label }}>RF Tuner</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <div style={{ ...S.bigNum, fontSize: 36 }}>{rfFreq.toFixed(1)}</div>
            <div style={{ fontSize: 14, color: "#888", fontWeight: 700 }}>MHz</div>
          </div>
          <div style={{ marginTop: 8 }}>
            <RfBars />
          </div>
          <div style={{ ...S.sub, marginTop: 6 }}>SIGNAL 08 / STEREO LOCK</div>
        </div>

        {/* Activity Heatmap */}
        <div style={{ ...S.card, gridColumn: "3", gridRow: "4" }}>
          <div style={{ ...S.label }}>Activity Heatmap</div>
          <div style={{ marginTop: 4 }}>
            <ActivityHeatmap />
          </div>
          <div style={{ ...S.sub, marginTop: 8 }}>KEYPRESSES / UPTIME CELLS</div>
        </div>

        {/* Spacer / extra metric */}
        <div style={{ ...S.card, gridColumn: "4", gridRow: "4", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ ...S.label }}>Network I/O</div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ ...S.sub }}>↑ UPLOAD</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1a1a1a" }}>2.4 MB/S</span>
            </div>
            <div style={{ ...S.bar(38, "#e05c2a"), marginBottom: 8 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ ...S.sub }}>↓ DOWNLOAD</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1a1a1a" }}>18.7 MB/S</span>
            </div>
            <div style={{ ...S.bar(72, "#1a1a1a") }} />
          </div>
          <div style={{ ...S.sub, marginTop: 8 }}>LATENCY 12MS / FIBER</div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isMobile ? <MobileReporter /> : <GlyphDashboard />}
  </StrictMode>
)
