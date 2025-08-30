import React, { useState } from 'react';
import { Plus, X, Image } from 'lucide-react';
import Layout, { GridContainer, GridItem, Card, Button, Input } from './Layout';
import { useEvent } from '../contexts/EventContext';
import { useNavigate } from 'react-router-dom';

const PrizeManagement = () => {
  const navigate = useNavigate();
  const { prizes = [], updatePrizes } = useEvent();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 초기 상태가 없으면 1등 경품 추가
  React.useEffect(() => {
    if (prizes.length === 0) {
      updatePrizes([{
        id: 1,
        rank: '1등 경품',
        name: '',
        image: '',
        winners: 1
      }]);
    }
  }, [prizes.length, updatePrizes]);

  const addPrize = () => {
    const newPrize = {
      id: prizes.length + 1,
      rank: `${prizes.length + 1}등 경품`,
      name: '',
      image: '',
      winners: 1
    };
    updatePrizes([...prizes, newPrize]);
  };

  const removePrize = (id: number) => {
    if (prizes.length > 1) {
      const updatedPrizes = prizes
        .filter(prize => prize.id !== id)
        .map((prize, index) => ({
          ...prize,
          rank: `${index + 1}등 경품`
        }));
      updatePrizes(updatedPrizes);
    }
  };

  const updatePrize = (id: number, field: string, value: any) => {
    updatePrizes(prizes.map(prize => 
      prize.id === id ? { ...prize, [field]: value } : prize
    ));
  };

  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updatePrize(id, 'image', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getRankColor = (index: number) => {
    const colors = [
      'from-yellow-400 via-orange-500 to-red-500', // 1등 - 금색
      'from-slate-300 via-slate-400 to-slate-500', // 2등 - 은색  
      'from-amber-600 via-orange-700 to-amber-800'  // 3등 - 동색
    ];
    return colors[index] || 'from-purple-400 via-purple-500 to-purple-600';
  };

  const getRankIcon = (index: number) => {
    const icons = ['🥇', '🥈', '🥉'];
    return icons[index] || '🏆';
  };

  return (
    <Layout 
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      pageTitle="경품 관리"
    >
      {/* 페이지 헤더 */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          경품을 관리하세요
        </h1>
        <p className="text-base xl:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          참가자들이 응모할 수 있는 멋진 경품들을 추가하고 관리하세요. 
        </p>
      </div>

      {/* 경품 목록 */}
      <div className="space-y-8">
        {prizes.map((prize, index) => (
          <Card key={prize.id} isDarkMode={isDarkMode} hover={false}>
            <GridContainer gap="lg">
              {/* 경품 이미지 영역 - 4컬럼 */}
              <GridItem>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(index)} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      <span className="text-2xl">{getRankIcon(index)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl xl:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        {prize.rank}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {prize.name || '경품명을 입력하세요'}
                      </p>
                    </div>
                  </div>

                  {/* 이미지 업로드 */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(prize.id, e)}
                      className="hidden"
                      id={`image-${prize.id}`}
                    />
                    <label
                      htmlFor={`image-${prize.id}`}
                      className="block w-full h-48 xl:h-56 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all duration-300 group-hover:scale-[1.02]"
                    >
                      {prize.image ? (
                        <div className="relative w-full h-full">
                          <img
                            src={prize.image}
                            alt={prize.name || '경품 이미지'}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                            <div className="opacity-0 hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 rounded-full p-3">
                              <Image className="text-gray-700 dark:text-gray-300" size={24} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 transition-all duration-300 group-hover:text-purple-500">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Image size={24} className="text-white" />
                          </div>
                          <span className="font-medium">이미지 업로드</span>
                          <span className="text-sm mt-1">PNG, JPG 최대 10MB</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </GridItem>

              {/* 경품 정보 영역 - 8컬럼 */}
              <GridItem>
                <div className="h-full flex flex-col justify-between">
                  {/* 상단: 삭제 버튼 */}
                  <div className="flex justify-end mb-4">
                    {prizes.length > 1 && (
                      <button 
                        onClick={() => removePrize(prize.id)}
                        className="text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>

                  {/* 폼 필드들 */}
                  <div className="space-y-6 flex-1">
                    <div className="auto-grid">
                      {/* 경품명 */}
                      <Input
                        label="경품명"
                        value={prize.name}
                        onChange={(value) => updatePrize(prize.id, 'name', value)}
                        placeholder="예: iPhone 15 Pro"
                        required
                        isDarkMode={isDarkMode}
                      />

                      {/* 당첨 인원 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          당첨 인원 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="number"
                            min="1"
                            value={prize.winners}
                            onChange={(e) => updatePrize(prize.id, 'winners', parseInt(e.target.value) || 1)}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                            placeholder="1"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm group-hover:opacity-0">
                            명
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 경품 설명 (선택사항) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        경품 설명 (선택사항)
                      </label>
                      <textarea
                        value={prize.description || ''}
                        onChange={(e) => updatePrize(prize.id, 'description', e.target.value)}
                        placeholder="경품에 대한 자세한 설명을 입력하세요..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </Card>
        ))}
      </div>

      {/* 경품 추가 버튼 */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={addPrize}
          className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
            <Plus size={14} />
          </div>
          <span className="font-medium">경품 추가하기</span>
        </button>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-12 flex justify-center space-x-4">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => navigate('/event-creation')}
        >
          이전으로
        </Button>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => navigate('/field-settings')}
        >
          다음 단계
        </Button>
      </div>
    </Layout>
  );
};

export default PrizeManagement;