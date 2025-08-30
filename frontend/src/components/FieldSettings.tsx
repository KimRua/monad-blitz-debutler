import React, { useState } from 'react';
import { Plus, X, User, Mail, Phone, Wallet, Settings } from 'lucide-react';
import Layout, { GridContainer, GridItem, Card, Button } from './Layout';
import { useEvent } from '../contexts/EventContext';
import { useNavigate } from 'react-router-dom';

const FieldSettings = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCustomFieldPopup, setShowCustomFieldPopup] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  
  const { fields = [], customFields = [], updateFields, updateCustomFields } = useEvent();

  // 기본 필드가 없으면 초기화
  React.useEffect(() => {
    if (fields.length === 0) {
      const defaultFields = [
        { id: 1, name: '이름', isRequired: false, isFixed: false },
        { id: 2, name: '이메일', isRequired: false, isFixed: false },
        { id: 3, name: '전화', isRequired: false, isFixed: false },
        { id: 4, name: 'ETH 주소', isRequired: true, isFixed: true },
        { id: 5, name: 'SOL 주소', isRequired: false, isFixed: false },
      ];
      updateFields(defaultFields);
    }
  }, [fields.length, updateFields]);
  
  // 아이콘 매핑
  const getIconForField = (fieldName: string) => {
    switch (fieldName) {
      case '이름':
        return User;
      case '이메일':
        return Mail;
      case '전화':
        return Phone;
      case 'ETH 주소':
      case 'SOL 주소':
        return Wallet;
      default:
        return Settings;
    }
  };

  const toggleFieldRequired = (id: number) => {
    const updatedFields = fields.map(field => 
      field.id === id && !field.isFixed ? { ...field, isRequired: !field.isRequired } : field
    );
    updateFields(updatedFields);
  };

  const toggleCustomFieldRequired = (id: number) => {
    const updatedCustomFields = customFields.map(field => 
      field.id === id ? { ...field, isRequired: !field.isRequired } : field
    );
    updateCustomFields(updatedCustomFields);
  };

  const removeCustomField = (id: number) => {
    const updatedCustomFields = customFields.filter(field => field.id !== id);
    updateCustomFields(updatedCustomFields);
  };

  const addCustomField = () => {
    if (newFieldName.trim()) {
      const newField = {
        id: Date.now(),
        name: newFieldName.trim(),
        isRequired: true,
        isDefault: false
      };
      const updatedCustomFields = [...customFields, newField];
      updateCustomFields(updatedCustomFields);
      setNewFieldName('');
      setShowCustomFieldPopup(false);
    }
  };

  const FieldCard = ({ 
    field, 
    color, 
    onToggle, 
    onRemove = null,
    showRemove = false 
  }: {
    field: any;
    color: string;
    onToggle: () => void;
    onRemove?: (() => void) | null;
    showRemove?: boolean;
  }) => {
    const IconComponent = getIconForField(field.name);
    
    return (
      <div
        onClick={!field.isFixed ? onToggle : undefined}
        className={`flex items-center justify-between gap-3 p-4 rounded-lg border transition-all duration-200 min-h-[60px]
          ${field.isFixed 
            ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 cursor-not-allowed' 
            : field.isRequired
              ? `bg-${color}-50 dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-700 cursor-pointer hover:shadow-sm`
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <IconComponent 
              size={18} 
              className={field.isRequired ? `text-${color}-600` : 'text-gray-400 dark:text-gray-500'} 
            />
          </div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className={`font-medium text-sm truncate ${field.isRequired ? `text-${color}-700 dark:text-${color}-300` : 'text-gray-700 dark:text-gray-300'}`}>
              {field.name}
            </span>
            {field.isFixed && (
              <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap">
                고정
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap
            ${field.isRequired 
              ? `bg-${color}-100 dark:bg-${color}-800 text-${color}-600 dark:text-${color}-300` 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }
          `}>
            {field.isRequired ? '필수' : '선택'}
          </span>
          
          {showRemove && onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout 
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      pageTitle="필드 설정"
    >
      {/* 페이지 헤더 */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          응모 필드를 설정해보세요
        </h1>
        <p className="text-base xl:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          경품 응모 참가자들을 식별하기 위해 사용할 필드들을 선택하세요.
          <br />
          ETH 주소는 필수이며, 필요에 따라 추가 정보를 요청할 수 있습니다.
        </p>
      </div>

      <GridContainer gap="lg">
        {/* 개인정보 섹션 */}
        <GridItem>
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">개인정보</h2>
            </div>
            
            <div className="space-y-3">
              {fields
                .filter(field => field.name !== 'ETH 주소' && field.name !== 'SOL 주소')
                .map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                    color="green"
                    onToggle={() => toggleFieldRequired(field.id)}
                  />
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                개인정보는 참가자 식별 및 경품 전달을 위해 사용됩니다.
              </p>
            </div>
          </Card>
        </GridItem>

        {/* 지갑주소 섹션 */}
        <GridItem>
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Wallet size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">지갑주소</h2>
            </div>
            
            <div className="space-y-3">
              {fields
                .filter(field => field.name === 'ETH 주소' || field.name === 'SOL 주소')
                .map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                    color="purple"
                    onToggle={() => toggleFieldRequired(field.id)}
                  />
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                ETH 주소는 블록체인 기반 응모 시스템의 핵심 요소로 필수입니다.
              </p>
            </div>
          </Card>
        </GridItem>

        {/* 맞춤 필드 섹션 */}
        <GridItem>
          <Card isDarkMode={isDarkMode}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Plus size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">맞춤 필드</h2>
            </div>
            
            <div className="space-y-3 mb-6">
              {customFields.map((field) => (
                <FieldCard
                  key={field.id}
                  field={field}
                  color="orange"
                  onToggle={() => toggleCustomFieldRequired(field.id)}
                  onRemove={() => removeCustomField(field.id)}
                  showRemove={true}
                />
              ))}
            </div>
            
            <button
              onClick={() => setShowCustomFieldPopup(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-200 group"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors">
                  맞춤 질문 추가
                </span>
              </div>
            </button>
            
            {customFields.length === 0 && (
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  필요한 경우 추가 정보를 수집하기 위한 맞춤 질문을 만들 수 있습니다.
                </p>
              </div>
            )}
          </Card>
        </GridItem>
      </GridContainer>

      {/* 액션 버튼 */}
      <div className="mt-12 flex justify-center space-x-4">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => navigate('/prize-management')}
        >
          이전으로
        </Button>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => navigate('/entry-status')}
        >
          다음 단계
        </Button>
      </div>

      {/* 맞춤 필드 추가 팝업 */}
      {showCustomFieldPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">새 질문 추가</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  질문 내용
                </label>
                <input
                  type="text"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="예: 소속 회사명, 관심 분야 등"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  autoFocus
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  추가된 질문은 기본적으로 필수 항목으로 설정됩니다.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={addCustomField}
                  disabled={!newFieldName.trim()}
                  className="flex-1"
                >
                  질문 추가
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setShowCustomFieldPopup(false);
                    setNewFieldName('');
                  }}
                  className="flex-1"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FieldSettings;