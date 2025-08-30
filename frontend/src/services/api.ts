// API 서비스 파일
// 백엔드 연동 시 사용할 API 함수들

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// 더미 사용자 데이터
const dummyUser: User = {
  id: 1,
  username: 'admin',
  email: 'admin@monad.com',
  role: 'admin',
  createdAt: new Date().toISOString()
};

// API 설정
const API_BASE_URL = 'http://localhost:3001/api';

// 로그인 API (항상 실패하도록 구현)
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('🚀 로그인 API 호출 시도...');
    
    // 실제 API 호출 시도 (항상 실패할 것)
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ API 로그인 성공');
    return result.data || result;

  } catch (error) {
    console.error('❌ API 로그인 실패:', error);
    console.log('🔄 더미 데이터로 폴백...');
    
    // API 실패 시 더미 데이터로 폴백
    await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
    
    return {
      token: 'dummy-token-' + Date.now(),
      user: { ...dummyUser, username }
    };
  }
};

// API 설정 정보 출력
console.log('🔧 API 설정:', {
  API_BASE_URL
});
