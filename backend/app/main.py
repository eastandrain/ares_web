from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="ARES API",
    version="0.1.0",
    description="Advanced Reporting for Yield Enhancement System API입니다.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["system"])
def health_check() -> dict[str, str]:
    """배포 상태를 확인하기 위한 간단한 응답을 반환합니다."""
    return {"status": "ok", "service": "ares-backend"}


@app.get("/api", tags=["system"])
def api_root() -> dict[str, str]:
    return {"message": "ARES API is running"}
