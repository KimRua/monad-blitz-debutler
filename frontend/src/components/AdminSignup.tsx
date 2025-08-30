import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import Layout, { Card, Button } from './Layout';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    organization: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 에러 메시지 초기화
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.email || !formData.organization) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }

    if (formData.username.length < 4) {
      setError('아이디는 4자 이상이어야 합니다.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 로딩 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 더미 회원가입 성공 처리
      // 실제로는 백엔드에서 계정 생성 후 성공 응답
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/admin-login', { 
        state: { 
          message: '회원가입이 완료되었습니다. 로그인해주세요.',
          username: formData.username 
        } 
      });
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Layout 
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      pageTitle="회원가입"
      showHeader={false}
    >
      {/* 페이지 헤더 */}
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <UserPlus size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          회원가입
        </h1>
        <p className="text-base xl:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          이벤트 관리 시스템을 사용하기 위해 계정을 생성해주세요.
        </p>
      </div>

      {/* 회원가입 폼 */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <Card isDarkMode={isDarkMode} className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 아이디 입력 */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  아이디 *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="4자 이상의 아이디를 입력하세요"
                  disabled={isLoading}
                />
              </div>

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="이메일을 입력하세요"
                  disabled={isLoading}
                />
              </div>

              {/* 소속/기관 입력 */}
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  소속/기관 *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  placeholder="소속 또는 기관명을 입력하세요"
                  disabled={isLoading}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  비밀번호 *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="6자 이상의 비밀번호를 입력하세요"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 입력 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                    placeholder="비밀번호를 다시 입력하세요"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    회원가입 중...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <UserPlus size={16} className="mr-2" />
                    회원가입
                  </div>
                )}
              </Button>
            </form>

            {/* 로그인 페이지로 돌아가기 */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                이미 계정이 있으신가요?
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/admin-login')}
                className="w-full flex items-center justify-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                로그인으로 돌아가기
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 하단 안내 */}
    </Layout>
  );
};

export default AdminSignup;
