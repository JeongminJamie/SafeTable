# SafeTable

**프로젝트 소개**: 이 프로젝트는 농림축산부에서 지정한 안심식당의 공공데이터를 이용해 안심식당을 소개하고, 해당 식당들을 예약한 후 방문할 수 있는 서비스를 제공합니다. 

---

## 🛠️ 주요 기능 (Features)

(영상 용량으로 인해 이미지 깨짐 현상이 있습니다)
![safetable](https://github.com/user-attachments/assets/55c5d559-63d2-48ae-adec-702a646818e7)

- **사용 스택**

  - React.js, TailwindCSS, Zustand, React Query, Node.js, Express, MongoDB

- **회원 관리**
  - 회원 가입 및 로그인/로그아웃 기능 제공
  - 이메일 인증 및 `useRef`를 활용한 유효성 검사 구현

- **지역 검색 및 식당 조회**
  - 시군구 **Open API**를 활용한 지역 검색 기능 (Debouncing 적용)
  - 검색한 지역의 안심식당 조회:
    - **농림축산부 Open API**와 **Google Places API**를 결합
    - Skeleton UI, Lazy & Suspense, 무한 스크롤링 구현

- **식당 관리**
  - 식당 저장(찜) 기능 제공
  - 저장한 식당 목록 조회 및 삭제 가능

- **예약 및 결제**
  - 예약 생성 및 예약금 결제 기능 구현 (실제 결제 X)
  - 예약 확인 메일 전송 (Nodemailer 사용)

- **내 정보 관리**
  - **예약 관리**:
    - 과거 예약 내역 조회
    - 현재 예약 내역 조회 및 취소
  - **사용자 정보 관리**:
    - 유저 정보 조회 및 수정
  - **저장한 식당 관리**:
    - 저장된 식당 목록 조회 및 삭제
  - **결제 카드 관리**:
    - 등록된 카드 조회/생성/삭제 기능

---

## 📍 기여 - 최정민

- 메인, 소개, 카드 추가, 예약 페이지 **UI/UX**
- 안심식당 **전체 조회** 및 지역명 **검색**에 따른 안심식당 조회
- 안심식당 조회 페이지 **스켈레톤 UI**와 **무한 스크롤링**
- Intersection Observer API를 이용한 안심식당 **Lazy Loading** (두 개의 API 결합으로 인한 매우 긴 초기 로딩 속도 개선 15000ms → 514ms)
- **Lazy/Suspense, Error Boundary** 적용
- **http-proxy-middleware** 라이브러리 사용으로 프록시 서버 설정 및 CORS 에러 해결
- **nodemailer**을 이용한 예약 확정 이메일 발송
  

## 📦 설치 방법 (Installation)

이 프로젝트를 로컬에서 실행하려면 아래 단계를 따라주세요.

### 1. 프로젝트 클론

```bash
git clone https://github.com/SafeTable-FS/SafeTable.git
cd SafeTable
```

### 2. 패키지 설치

프로젝트에서 필요한 의존성을 설치합니다.

```bash
npm install
```

### 3. 개발 서버 실행

아래 명령어를 실행하여 개발 서버를 시작합니다.

```bash
npm run start
```
