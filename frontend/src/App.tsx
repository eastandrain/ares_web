import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import whiteLogo from "./asset/images/ares_logo_white.png";
import navyLogo from "./asset/images/ares_logo_navy.png";

type AnalysisPageProps = {
  title: string;
  description: string;
};

const hbmMenus = [
  { path: "/hbm/assy", label: "HBM 조립 수율" },
  { path: "/hbm/cow-test-dc", label: "HBM COW Test DC 수율" },
  { path: "/hbm/assy-eptr", label: "HBM 조립 비수율" },
  { path: "/hbm/cow-test-eptr", label: "HBM COW Test 비수율" },
];

const homeSubtitle = "S.PKG 제조기술센터를 위한 수율 분석 시스템";

function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/ares" aria-label="ARES 메인 페이지">
        <img src={whiteLogo} alt="ARES" />
      </Link>
      <nav className="navigation" aria-label="주요 메뉴">
        <div className="menu-group">
          <button className="menu-button" type="button">HBM</button>
          <div className="submenu">
            {hbmMenus.map((menu) => (
              <Link key={menu.path} to={menu.path}>{menu.label}</Link>
            ))}
          </div>
        </div>
        <button className="menu-button" type="button" disabled>LOGIC</button>
      </nav>
    </header>
  );
}

function HomePage() {
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    const subtitleCharacters = Array.from(homeSubtitle);
    let characterIndex = 0;
    let typingTimer: number | undefined;

    const typingStartTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        characterIndex += 1;
        setTypedSubtitle(subtitleCharacters.slice(0, characterIndex).join(""));

        if (characterIndex === subtitleCharacters.length) {
          window.clearInterval(typingTimer);
        }
      }, 55);
    }, 300);

    return () => {
      window.clearTimeout(typingStartTimer);

      if (typingTimer !== undefined) {
        window.clearInterval(typingTimer);
      }
    };
  }, []);

  return (
    <main className="home-page">
      <section className="hero" aria-labelledby="ares-title">
        <div className="hero-intro">
          <img className="hero-logo" src={navyLogo} alt="ARES" />
          <h1 id="ares-title">Advanced Reporting for Yield Enhancement System</h1>
        </div>
        <p className="typewriter" aria-label={homeSubtitle}>
          {typedSubtitle}
          <span className="typing-cursor" aria-hidden="true">|</span>
        </p>
      </section>
    </main>
  );
}

function AnalysisPage({ title, description }: AnalysisPageProps) {
  return (
    <main className="analysis-page">
      <section className="analysis-card">
        <p className="section-label">HBM ANALYSIS</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="coming-soon">분석 화면은 다음 단계에서 연결됩니다.</p>
      </section>
    </main>
  );
}

function AssemblyYieldPage() {
  return (
    <main className="analysis-page assembly-yield-page">
      <section className="analysis-column" aria-label="첫 번째 분석 영역" />
      <section className="analysis-column" aria-label="두 번째 분석 영역" />
      <section className="analysis-column" aria-label="세 번째 분석 영역" />
    </main>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/ares" replace />} />
        <Route path="/ares" element={<HomePage />} />
        <Route path="/hbm/assy" element={<AssemblyYieldPage />} />
        <Route path="/hbm/cow-test-dc" element={<AnalysisPage title="HBM COW Test DC 수율" description="COW Test DC 수율을 조회합니다." />} />
        <Route path="/hbm/assy-eptr" element={<AnalysisPage title="HBM 조립 비수율" description="HBM 조립 공정의 비수율 원인을 조회합니다." />} />
        <Route path="/hbm/cow-test-eptr" element={<AnalysisPage title="HBM COW Test 비수율" description="COW Test 비수율 원인을 조회합니다." />} />
        <Route path="*" element={<Navigate to="/ares" replace />} />
      </Routes>
    </div>
  );
}

export default App;
