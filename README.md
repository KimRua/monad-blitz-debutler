# Monad Blitz Seoul Submission Process

1. Visit the `monad-blitz-seoul` repo (link [here](https://github.com/monad-developers/monad-blitz-seoul)) and fork it.

<img width="1511" alt="Screenshot 2025-07-07 at 10 17 05 AM" src="https://github.com/user-attachments/assets/341c6774-f5ea-484d-a700-28e89eee9f95" />

2. Give it your project name, a one-liner description, make sure you are forking `main` branch and click `Create Fork`.

<img width="1511" alt="Screenshot 2025-07-07 at 10 17 55 AM" src="https://github.com/user-attachments/assets/b4a60b3b-6fd9-42b8-ba38-77fd79f76986" />

3. In your fork you can make all the changes you want, add code of your project, create branches, add information to `README.md`, you can change anything and everything.

---

# monad-blitz-debutler 서비스 환경

## 구성
- **frontend**: React 앱 (Node.js, Nginx로 서빙)
- **backend**: Python Flask + Gunicorn
- **nginx**: 리버스 프록시 및 정적 파일 서빙
- **mysql**: 데이터베이스
- **docker-compose.yml**: 전체 서비스 오케스트레이션

## 시작 방법

1. 프론트엔드 의존성 설치

```bash
cd frontend
npm install
```

2. 도커 컴포즈로 전체 서비스 실행

```bash
docker-compose up --build
```

- React 앱: http://localhost (Nginx를 통해)
- Flask API: http://localhost/api/health
- MySQL: localhost:3306 (root/example)

## 폴더 구조

```
frontend/   # React 앱
backend/    # Flask API
nginx/      # Nginx 설정
mysql/      # MySQL 데이터 (볼륨)
docker-compose.yml
```
