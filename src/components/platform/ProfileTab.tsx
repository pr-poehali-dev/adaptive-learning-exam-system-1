import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type ProfileTabProps = {
  userName: string;
  selectedSubject: { name: string; icon: string; color: string } | null;
};

export default function ProfileTab({ userName, selectedSubject }: ProfileTabProps) {
  const achievements = [
    {
      id: 1,
      title: 'Первый шаг',
      description: 'Пройдите первый тест',
      icon: 'Award',
      color: 'from-purple-500 to-pink-500',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Серия из 7 дней',
      description: 'Занимайтесь 7 дней подряд',
      icon: 'Flame',
      color: 'from-orange-500 to-red-500',
      unlocked: false,
    },
    {
      id: 3,
      title: 'Мастер алгебры',
      description: 'Освойте раздел на 100%',
      icon: 'Trophy',
      color: 'from-amber-500 to-yellow-500',
      unlocked: false,
    },
    {
      id: 4,
      title: 'Марафонец',
      description: 'Пройдите 50 тестов',
      icon: 'Target',
      color: 'from-green-500 to-emerald-500',
      unlocked: false,
    },
  ];

  const stats = [
    { label: 'Дней на платформе', value: '1', icon: 'Calendar' },
    { label: 'Пройдено тестов', value: '1', icon: 'FileText' },
    { label: 'Изучено тем', value: '3', icon: 'BookOpen' },
    { label: 'Часов обучения', value: '0.5', icon: 'Clock' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Профиль</h2>
        <p className="text-lg text-muted-foreground">Управляйте своим аккаунтом</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="User" size={24} className="text-purple-600" />
              Личная информация
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Имя</Label>
                <Input id="profile-name" defaultValue={userName} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-11 rounded-xl"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить изменения
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="BookOpen" size={24} className="text-blue-600" />
              Предпочтения обучения
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Текущий предмет</Label>
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedSubject?.color || 'from-purple-500 to-pink-500'} rounded-xl flex items-center justify-center`}>
                    <Icon name={selectedSubject?.icon as any || 'Calculator'} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{selectedSubject?.name || 'Математика'}</p>
                    <p className="text-sm text-muted-foreground">Основной предмет</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Изменить
                  </Button>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Уровень сложности</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="rounded-xl">
                    Легко
                  </Button>
                  <Button className="bg-purple-600 text-white rounded-xl hover:bg-purple-700">
                    Средне
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Сложно
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Award" size={24} className="text-amber-500" />
              Достижения
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mb-3 ${
                      !achievement.unlocked && 'grayscale'
                    }`}
                  >
                    <Icon name={achievement.icon as any} size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                      Получено
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{userName}</h3>
              <p className="text-purple-100 mb-4">Студент</p>
              <Badge className="bg-white/20 text-white border-white/30">
                <Icon name="Star" size={14} className="mr-1" />
                Новичок
              </Badge>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Статистика</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Icon name={stat.icon as any} size={20} className="text-purple-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Icon name="Settings" size={20} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Настройки</h4>
                <p className="text-sm text-blue-700 mb-3">Уведомления, темы, конфиденциальность</p>
                <Button variant="outline" size="sm" className="rounded-xl border-blue-300 text-blue-700 hover:bg-blue-100">
                  Открыть настройки
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
