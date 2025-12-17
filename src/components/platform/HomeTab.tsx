import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Results = {
  correct: number;
  total: number;
  percentage: number;
};

type HomeTabProps = {
  userName: string;
  results: Results | null;
  selectedSubject: { name: string; icon: string; color: string } | null;
};

export default function HomeTab({ userName, results, selectedSubject }: HomeTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Добро пожаловать, {userName}! 👋</h2>
        <p className="text-lg text-muted-foreground">Продолжайте обучение и отслеживайте прогресс</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Target" size={28} className="text-white" />
            <h3 className="text-lg font-bold">Пройдено тестов</h3>
          </div>
          <p className="text-4xl font-bold">1</p>
          <p className="text-purple-100 mt-2">Отличное начало!</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="TrendingUp" size={28} className="text-white" />
            <h3 className="text-lg font-bold">Общий прогресс</h3>
          </div>
          <p className="text-4xl font-bold">{results?.percentage || 0}%</p>
          <Progress value={results?.percentage || 0} className="h-2 mt-3 bg-blue-200" />
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="Flame" size={28} className="text-white" />
            <h3 className="text-lg font-bold">Активных дней</h3>
          </div>
          <p className="text-4xl font-bold">1</p>
          <p className="text-orange-100 mt-2">Начните серию!</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-br ${selectedSubject?.color || 'from-purple-500 to-pink-500'} rounded-xl flex items-center justify-center`}>
              <Icon name={selectedSubject?.icon as any || 'BookOpen'} size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Текущий предмет</h3>
              <p className="text-muted-foreground">{selectedSubject?.name || 'Не выбран'}</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Основы алгебры', progress: 60 },
              { title: 'Геометрические задачи', progress: 30 },
              { title: 'Тригонометрия', progress: 10 },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold">
            Продолжить обучение
            <Icon name="Play" size={20} className="ml-2" />
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Lightbulb" size={24} className="text-amber-500" />
            Рекомендации ИИ
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Icon name="CheckCircle" size={20} className="text-blue-600 mt-1" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Сильные стороны</p>
                  <p className="text-sm text-blue-700">Базовые концепции и простые задачи</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3">
                <Icon name="Target" size={20} className="text-orange-600 mt-1" />
                <div>
                  <p className="font-semibold text-orange-900 mb-1">Зоны роста</p>
                  <p className="text-sm text-orange-700">Сложные задачи требуют дополнительной практики</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <Icon name="Sparkles" size={20} className="text-purple-600 mt-1" />
                <div>
                  <p className="font-semibold text-purple-900 mb-1">План на сегодня</p>
                  <p className="text-sm text-purple-700">Пройдите 5 задач по алгебре и закрепите материал</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
