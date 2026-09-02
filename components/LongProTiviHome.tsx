"use client";

import { useEffect, useMemo, useState } from "react";

type ScreenProfile = "desktop-16-9" | "wide" | "compact" | "portrait";
type ProModule = "overview" | "live" | "mixer" | "agents" | "bridge" | "boss";

function detectProfile(width: number, height: number): ScreenProfile {
  const ratio = width / Math.max(height, 1);
  if (ratio < 1.1) return "portrait";
  if (width < 1180) return "compact";
  if (ratio > 1.92) return "wide";
  return "desktop-16-9";
}

function useScreenProfile() {
  const [screen, setScreen] = useState({
    width: 1920,
    height: 1080,
    profile: "desktop-16-9" as ScreenProfile,
  });

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const profile = detectProfile(width, height);
      const scale = Math.min(width / 1920, height / 1080);

      document.documentElement.dataset.lpScreen = profile;
      document.documentElement.style.setProperty("--lp-screen-w", `${width}px`);
      document.documentElement.style.setProperty("--lp-screen-h", `${height}px`);
      document.documentElement.style.setProperty("--lp-fit-scale", scale.toFixed(3));
      setScreen({ width, height, profile });
    }

    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return screen;
}

const signalCards = [
  ["Live input", "Camera, DSLR, audio, screen source", "720p default, 1080p optional"],
  ["Mixer Pro", "Sound, video, object AI", "Preset saved per user"],
  ["AI HQ", "Boss AI, user agents, credit guard", "Controlled upgrade loop"],
  ["Device bridge", "TV, AR, VR, MR, desktop", "QR remote ready"],
];

const qualityRows = [
  ["Default output", "720p", "Smooth first, lower operating cost"],
  ["Upgrade option", "1080p", "Manual switch for strong source"],
  ["Desktop canvas", "1920 x 1080", "Primary design and QA baseline"],
  ["Adaptive ratio", "Auto", "Portrait, compact, 16:9 and ultrawide"],
];

const modules: Array<{ id: ProModule; label: string }> = [
  { id: "overview", label: "HQ Overview" },
  { id: "live", label: "Live Control" },
  { id: "mixer", label: "Mixer Pro" },
  { id: "agents", label: "AI Agents" },
  { id: "bridge", label: "Device Bridge" },
  { id: "boss", label: "Boss Console" },
];

const appLinks = [
  ["Home", "/home"],
  ["superBUY", "/store"],
  ["Live", "/live"],
  ["Thông báo", "/notify"],
  ["Menu user", "/dashboard"],
  ["Long Lab", "/dashboard"],
];

const moduleCopy: Record<ProModule, {
  kicker: string;
  title: string;
  output: string;
  note: string;
  canvas: string;
  cards: Array<[string, string, string]>;
}> = {
  overview: {
    kicker: "Live display mode",
    title: "Canvas chuẩn 16:9",
    output: "Output: 720p",
    note: "Balanced cost, smooth playback, adaptive bitrate",
    canvas: "HQ điều phối toàn bộ livestream, AI, thiết bị và chất lượng phát.",
    cards: signalCards,
  },
  live: {
    kicker: "Live control",
    title: "Khởi tạo và điều hành phiên live",
    output: "Room: standby",
    note: "Chỉ mở phòng khi bấm Bắt đầu live",
    canvas: "Bàn Live nhận form tạo phòng nhanh, giữ phòng ở trạng thái chờ và mở live khi chủ phòng xác nhận.",
    cards: [
      ["Quick room", "Nhận form từ Home", "Chờ chủ phòng xác nhận"],
      ["Ticket gate", "Soát vé, QRFlow, trạng thái vào phòng", "AI chuyển Boss khi chưa chắc"],
      ["TV cast", "Kết nối TiviApp để chiếu 1 video fullscreen", "Không hở đen"],
      ["Replay", "Ghi nhận sự kiện để FlashFlow tạo tin", "Chờ user duyệt trước đăng"],
    ],
  },
  mixer: {
    kicker: "Mixer pro",
    title: "Bàn chỉnh âm thanh, hình ảnh và layout",
    output: "Mixer: saved preset",
    note: "Nút âm lượng nổi đã bỏ, điều chỉnh tập trung tại Mixer",
    canvas: "Mixer là nơi gom toàn bộ cài đặt trong phòng live ra ngoài: âm thanh, video, layout, vật thể và preset.",
    cards: [
      ["Audio", "Mic, nhạc nền, âm thanh ngoài tivi", "Preset theo thiết bị"],
      ["Video", "720p/1200p, 4K Enhanced khi đủ điều kiện", "Flash điều phối"],
      ["Layout", "Fullscreen, thu nhỏ, playing mini", "Giống luồng video hiện đại"],
      ["Objects", "Khóa vật thể, overlay, QR trace", "Có log cho Boss"],
    ],
  },
  agents: {
    kicker: "AI agents",
    title: "AI Boss, AI Flash và AI User",
    output: "AI: startup mode",
    note: "Mặc định không thu phí, đề xuất nhạy cảm gửi duyệt",
    canvas: "Các AI làm việc theo cấp quyền, gửi đề xuất vào hộp thông báo và chỉ xin xác nhận khi vượt rule.",
    cards: [
      ["AI Boss", "Điều phối quyền và báo cáo hằng ngày", "Boss thật duyệt"],
      ["AI Flash", "Điều hành chất lượng phát và app ngoài 0 đồng", "Runtime safe boundary"],
      ["AI User", "Hỗ trợ user trong và ngoài app", "Giao tiếp qua thông báo"],
      ["QR-Growth", "Mã QR riêng cho user/AI", "Follow và deep link tự động"],
    ],
  },
  bridge: {
    kicker: "Device bridge",
    title: "Kết nối web, mobile, tivi và nền tảng ngoài",
    output: "Bridge: QR ready",
    note: "Chưa có app thì mở đúng trang tải theo thiết bị",
    canvas: "QRFlow và AI Gateway kết nối WebApp, MobiApp, TiviApp và môi trường ngoài bằng một luồng rõ ràng.",
    cards: [
      ["WebApp", "app.phuclong.live", "ProApp/WebPro"],
      ["MobiApp", "mobi.phuclong.live", "iOS/Android mini"],
      ["TiviApp", "tivi.phuclong.live", "Fullscreen player"],
      ["AI Gateway", "Một nút kết nối nền tảng ngoài", "User xác nhận trước"],
    ],
  },
  boss: {
    kicker: "Boss console",
    title: "Bảng quyền hạn, theme, phí và log",
    output: "Boss: control ready",
    note: "2FA mặc định tắt, Boss/User tự bật khi cần",
    canvas: "Boss thật điều khiển quyền AI, theme, phí Flash, log duyệt bill và các nâng cấp runtime.",
    cards: [
      ["Permission", "5 cấp quyền theo từng AI và tác vụ", "Đổi bất cứ lúc nào"],
      ["Themes", "Mặc định, Rực Rỡ, Pink, Lavender", "Boss mở thêm theme"],
      ["Fees", "Flash/AI thương mại tách rõ", "Mặc định chưa bật thu phí"],
      ["Logs", "AI đề xuất, app ngoài, OCR, duyệt bill", "Có dấu vết kiểm tra"],
    ],
  },
};

export default function LongProTiviHome() {
  const screen = useScreenProfile();
  const [activeModule, setActiveModule] = useState<ProModule>("overview");
  const active = moduleCopy[activeModule];
  const profileLabel = useMemo(() => {
    if (screen.profile === "portrait") return "Portrait fallback";
    if (screen.profile === "compact") return "Compact web";
    if (screen.profile === "wide") return "Ultrawide";
    return "1920 x 1080";
  }, [screen.profile]);

  return (
    <main className="lp-protivi-page">
      <section className="lp-protivi-stage" aria-label="Long ProTivi headquarters">
        <header className="lp-protivi-topbar">
          <div>
            <span className="lp-kicker">Long ProApp</span>
            <h1>Headquarter điều phối livestream và AI</h1>
          </div>
          <div className="lp-screen-readout" aria-label="Screen detection">
            <strong>{profileLabel}</strong>
            <span>{screen.width} x {screen.height}</span>
          </div>
        </header>

        <nav className="lp-app-shortcuts" aria-label="Long app shortcuts">
          {appLinks.map(([label, href]) => (
            <a href={href} key={label}>{label}</a>
          ))}
        </nav>

        <div className="lp-protivi-grid">
          <aside className="lp-panel lp-nav-panel" aria-label="Primary modules">
            <span className="lp-kicker">Command rail</span>
            {modules.map((module) => (
              <button
                aria-pressed={activeModule === module.id}
                className={activeModule === module.id ? "lp-rail-button active" : "lp-rail-button"}
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                type="button"
              >
                {module.label}
              </button>
            ))}
          </aside>

          <section className="lp-panel lp-live-panel">
            <div className="lp-section-title">
              <span className="lp-kicker">{active.kicker}</span>
              <strong>{active.title}</strong>
            </div>
            <div className="lp-live-canvas" key={activeModule}>
              <div className="lp-canvas-mark">1920 x 1080</div>
              <div className="lp-canvas-grid">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="lp-module-board">
                <span className="lp-kicker">{modules.find((module) => module.id === activeModule)?.label}</span>
                <h2>{active.title}</h2>
                <p>{active.canvas}</p>
                <div className="lp-module-pills">
                  {active.cards.slice(0, 3).map(([title]) => (
                    <span key={title}>{title}</span>
                  ))}
                </div>
              </div>
              <div className="lp-live-status">
                <b>{active.output}</b>
                <span>{active.note}</span>
              </div>
            </div>
            <div className="lp-signal-strip">
              {active.cards.map(([title, body, meta]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{body}</span>
                  <small>{meta}</small>
                </article>
              ))}
            </div>
          </section>

          <aside className="lp-panel lp-side-panel">
            <div className="lp-section-title">
              <span className="lp-kicker">Adaptive profile</span>
              <strong>Auto screen fit</strong>
            </div>
            <table className="lp-quality-table">
              <tbody>
                {qualityRows.map(([label, value, note]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value}</td>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="lp-quick-actions">
              <button type="button" onClick={() => setActiveModule("bridge")}>Connect TV</button>
              <button type="button" onClick={() => setActiveModule("agents")}>AR / VR / MR</button>
              <button type="button" onClick={() => setActiveModule("mixer")}>Open Mixer</button>
            </div>
          </aside>
        </div>

        <footer className="lp-protivi-footer">
          <span>Light sci-fi theme active</span>
          <span>Mobile screens use compact fallback, not iPhone-only layout</span>
          <span>Desktop first baseline: 1920 x 1080</span>
        </footer>
      </section>
    </main>
  );
}
