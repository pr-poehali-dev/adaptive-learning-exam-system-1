import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Results = {
  correct: number;
  total: number;
  percentage: number;
};

type AnalyticsTabProps = {
  results: Results | null;
};

export default function AnalyticsTab({ results }: AnalyticsTabProps) {
  const weeklyActivity = [
    { day: 'Пн', value: 0, label: 'Пн' },
    { day: 'Вт', value: 0, label: 'Вт' },
    { day: 'Ср', value: 0, label: 'Ср' },
    { day: 'Чт', value: 0, label: 'Чт' },
    { day: 'Пт', value: 0, label: 'Пт' },
    { day: 'Сб', value: 0, label: 'Сб' },
    { day: 'Вс', value: 100, label: 'Вс' },
  ];

  const topicAnalysis = [
    { topic: 'Алгебра', mastery: 65, color: 'bg-purple-500' },
    { topic: 'Геометрия', mastery: 40, color: 'bg-blue-500' },
    { topic: 'Тригонометрия', mastery: 25, color: 'bg-orange-500' },
    { topic: 'Анализ', mastery: 15, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Анализ прогресса</h2>
        <p className="text-lg text-muted-foreground">Детальная статистика вашего обучения</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Target" size={24} className="text-purple-600" />
            <h3 className="font-bold text-sm">Всего тестов</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900">1</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="CheckCircle" size={24} className="text-green-600" />
            <h3 className="font-bold text-sm">Правильных</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">{results?.correct || 0}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="XCircle" size={24} className="text-orange-600" />
            <h3 className="font-bold text-sm">Ошибок</h3>
          </div>
          <p className="text-3xl font-bold text-orange-900">{results ? results.total - results.correct : 0}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Percent" size={24} className="text-blue-600" />
            <h3 className="font-bold text-sm">Точность</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">{results?.percentage || 0}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Calendar" size={24} className="text-purple-600" />
            Активность за неделю
          </h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyActivity.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-purple-100 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className={`w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg absolute bottom-0 transition-all duration-500 ${
                      item.value > 0 ? 'opacity-100' : 'opacity-20'
                    }`}
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Вы начали обучение сегодня. Продолжайте заниматься регулярно!
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={24} className="text-blue-600" />
            Освоение тем
          </h3>
          <div className="space-y-4">
            {topicAnalysis.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{topic.topic}</span>
                  <span className="text-sm text-muted-foreground">{topic.mastery}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${topic.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${topic.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="TrendingUp" size={28} className="text-green-600" />
            <h3 className="text-xl font-bold text-green-900">Сильные стороны</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Базовые концепции</p>
                <p className="text-sm text-green-700">Отлично справляетесь с фундаментальными задачами</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Простые уравнения</p>
                <p className="text-sm text-green-700">Быстрое решение линейных уравнений</p>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="AlertCircle" size={28} className="text-orange-600" />
            <h3 className="text-xl font-bold text-orange-900">Зоны роста</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Icon name="Target" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-900">Сложные задачи</p>
                <p className="text-sm text-orange-700">Требуется больше практики с комплексными заданиями</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Target" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-900">Тригонометрия</p>
                <p className="text-sm text-orange-700">Рекомендуем пройти базовый курс по теме</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Рекомендации ИИ</h3>
            <p className="text-muted-foreground mb-4">
              На основе анализа ваших результатов, рекомендуем сосредоточиться на практике сложных задач.
              Начните с раздела "Геометрия" и пройдите 5-7 заданий средней сложности для закрепления материала.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Геометрия
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Тригонометрия
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Анализ функций
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
