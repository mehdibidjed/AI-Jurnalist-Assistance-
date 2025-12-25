from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.router import router # the file you showed

def create_app() -> FastAPI:
    app = FastAPI(
        title="AI News Intelligence API",
        description="Trending news, fact checking, fake news detection, and content generation",
        version="1.0.0",
    )
    # 1. Define allowed origins (your React app URL)
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # 2. Add CORSMiddleware to the application
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # Allows your React app
        allow_credentials=True,
        allow_methods=["*"],  # Allows POST, OPTIONS, GET, etc.
        allow_headers=["*"],  # Allows Content-Type, Authorization, etc.
    )
    # Register all routes
    app.include_router(router, prefix="/api")
    return app


app = create_app()
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "backend.app.main:app",
        host="localhost",
        port=8000,
        reload=True
    )
