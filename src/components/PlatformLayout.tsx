import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Tab = 'home' | 'preparation' | 'tests' | 'analytics' | 'profile';

type PlatformLayoutProps = {
  userName: string;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
};

const tabs = [
  { id: 'home' as Tab, name: 'Главная', icon: 'Home' },
  { id: 'preparation' as Tab, name: 'Подготовка', icon: 'BookOpen' },
  { id: 'tests' as Tab, name: 'Тесты', icon: 'FileText' },
  { id: 'analytics' as Tab, name: 'Анализ', icon: 'BarChart3' },
  { id: 'profile' as Tab, name: 'Профиль', icon: 'User' },
];

export default function PlatformLayout({
  userName,
  activeTab,
  onTabChange,
  children,
}: PlatformLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EduAI
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Привет, <span className="font-semibold text-foreground">{userName}</span>!
              </span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => onTabChange('profile')}
              >
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-purple-100 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-purple-200'
                }`}
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
