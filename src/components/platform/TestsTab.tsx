import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function TestsTab() {
  const availableTests = [
    {
      id: 1,
      title: 'Пробный ЕГЭ по математике',
      description: 'Полный вариант с таймером',
      questions: 27,
      duration: 235,
      difficulty: 'hard',
      status: 'available',
      color: 'from-purple-500 to-pink-500',
      icon: 'FileText',
    },
    {
      id: 2,
      title: 'Быстрый тест: Алгебра',
      description: 'Проверьте базовые знания',
      questions: 10,
      duration: 20,
      difficulty: 'easy',
      status: 'available',
      color: 'from-blue-500 to-cyan-500',
      icon: 'Zap',
    },
    {
      id: 3,
      title: 'Геометрия: Планиметрия',
      description: 'Задачи на плоскости',
      questions: 15,
      duration: 45,
      difficulty: 'medium',
      status: 'available',
      color: 'from-green-500 to-emerald-500',
      icon: 'Triangle',
    },
  ];

  const completedTests = [
    {
      id: 101,
      title: 'Вводное тестирование',
      date: 'Сегодня',
      score: 67,
      maxScore: 100,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-amber-100 text-amber-700 border-amber-200',
      hard: 'bg-red-100 text-red-700 border-red-200',
    };
    const labels = {
      easy: 'Легко',
      medium: 'Средне',
      hard: 'Сложно',
    };
    return (
      <Badge variant="outline" className={colors[difficulty as keyof typeof colors]}>
        {labels[difficulty as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Тесты</h2>
        <p className="text-lg text-muted-foreground">Проверьте свои знания</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Brain" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Адаптивное тестирование</h3>
            <p className="text-muted-foreground">
              ИИ автоматически подбирает вопросы в зависимости от ваших ответов, определяя точный уровень знаний
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-2xl font-bold mb-4">Доступные тесты</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableTests.map((test) => (
            <Card key={test.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${test.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={test.icon as any} size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{test.title}</h4>
                    <p className="text-sm text-muted-foreground">{test.description}</p>
                  </div>
                </div>
                {getDifficultyBadge(test.difficulty)}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Вопросов:</span>
                  <span className="font-semibold">{test.questions}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Время:</span>
                  <span className="font-semibold">{test.duration} мин</span>
                </div>
              </div>

              <Button
                className={`w-full h-11 bg-gradient-to-r ${test.color} text-white rounded-xl font-semibold hover:shadow-lg transition-shadow`}
              >
                Начать тест
                <Icon name="Play" size={18} className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Пройденные тесты</h3>
        <div className="space-y-3">
          {completedTests.map((test) => (
            <Card key={test.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${test.color} rounded-xl flex items-center justify-center`}>
                    <Icon name="CheckCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">{test.title}</h4>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">
                      {test.score}
                      <span className="text-lg text-muted-foreground">/{test.maxScore}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">баллов</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Посмотреть
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
