# ARES

**A**dvanced **R**eporting for **Y**ield **E**nhancement **S**ystem

ARES는 반도체 수율 분석 결과를 조회하는 웹 시스템입니다. 데이터 처리 프로그램인 `ares_pipeline`은 이 프로젝트와 분리된 별도 디렉터리 또는 저장소에서 실행합니다. `ares_pipeline`이 사내 DB에 분석 결과를 적재하면, ARES 백엔드가 그 결과를 읽어 프론트엔드 화면에 제공합니다.

```
ares_pipeline  ->  사내 DB  ->  ARES 백엔드  ->  ARES 프론트엔드
```

## 프로젝트 구조

```
ares_web/
├── frontend/  # React + TypeScript 화면
├── backend/   # FastAPI API 서버
└── docs/      # 배포 및 설계 문서
```

## 로컬에서 실행하기

`ares_web` 폴더에서 터미널을 두 개 열어 백엔드와 프론트엔드를 각각 실행합니다.

### 1. 백엔드 실행

```powershell
cd backend
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

브라우저에서 `http://localhost:8000/api/health`를 열어 `status: ok` 응답이 보이면 백엔드가 정상 실행된 것입니다.

### 2. 프론트엔드 실행

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

브라우저에서 `http://localhost:5173/ares`를 열면 ARES 메인 화면이 표시됩니다.

프론트엔드 개발 서버는 사내 IP 접속을 위해 `0.0.0.0`으로 실행됩니다. 같은 사내망의 사용자는 실행 PC의 IP를 사용해 `http://<사내-IP>:5173/ares`로 접속할 수 있습니다. 운영 배포 방법은 `docs/deployment.md`를 참고하세요.

## 화면 주소

| 주소 | 화면 |
| --- | --- |
| `/ares` | ARES 메인 페이지 |
| `/hbm/assy` | HBM 조립 수율 |
| `/hbm/cow-test-dc` | HBM COW Test DC 수율 |
| `/hbm/assy-eptr` | HBM 조립 비수율 |
| `/hbm/cow-test-eptr` | HBM COW Test 비수율 |

## 로고 파일 위치

로고 파일은 다음 경로에 둡니다.

```
frontend/src/asset/images/ares_logo_white.png
frontend/src/asset/images/ares_logo_navy.png
```

## 보안 원칙

- DB 연결 문자열과 비밀번호는 `backend/.env`에만 저장합니다.
- `.env` 파일은 Git에 올리지 않습니다.
- 프론트엔드에는 DB 계정, 비밀번호, 사내 API 비밀값을 넣지 않습니다.
