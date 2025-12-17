import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function PreparationTab() {
  const topics = [
    {
      id: 1,
      title: 'Основы алгебры',
      description: 'Уравнения, неравенства, системы',
      progress: 60,
      lessons: 12,
      completed: 7,
      difficulty: 'easy',
      color: 'from-purple-500 to-pink-500',
      icon: 'Calculator',
    },
    {
      id: 2,
      title: 'Геометрические задачи',
      description: 'Планиметрия, стереометрия',
      progress: 30,
      lessons: 15,
      completed: 5,
      difficulty: 'medium',
      color: 'from-blue-500 to-cyan-500',
      icon: 'Triangle',
    },
    {
      id: 3,
      title: 'Тригонометрия',
      description: 'Функции, формулы, преобразования',
      progress: 10,
      lessons: 10,
      completed: 1,
      difficulty: 'hard',
      color: 'from-orange-500 to-red-500',
      icon: 'Waves',
    },
    {
      id: 4,
      title: 'Производные и интегралы',
      description: 'Дифференциальное исчисление',
      progress: 0,
      lessons: 20,
      completed: 0,
      difficulty: 'hard',
      color: 'from-green-500 to-emerald-500',
      icon: 'TrendingUp',
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
        <h2 className="text-3xl font-bold mb-2">Подготовка</h2>
        <p className="text-lg text-muted-foreground">Выберите тему для изучения</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">ИИ-персонализация</h3>
            <p className="text-muted-foreground mb-4">
              Материалы адаптированы под ваш уровень знаний. Сложность заданий будет увеличиваться по мере вашего прогресса.
            </p>
            <Button variant="outline" className="rounded-xl">
              <Icon name="Settings" size={16} className="mr-2" />
              Настроить план
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={topic.icon as any} size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
              {getDifficultyBadge(topic.difficulty)}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Прогресс</span>
                <span className="text-sm text-muted-foreground">
                  {topic.completed} / {topic.lessons} уроков
                </span>
              </div>
              <Progress value={topic.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <Icon name="BookOpen" size={16} className="text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Уроков</p>
                <p className="text-sm font-bold">{topic.lessons}</p>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <Icon name="Clock" size={16} className="text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Времени</p>
                <p className="text-sm font-bold">{topic.lessons * 15} мин</p>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-green-600 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Готово</p>
                <p className="text-sm font-bold">{topic.progress}%</p>
              </div>
            </div>

            <Button
              className={`w-full h-11 bg-gradient-to-r ${topic.color} text-white rounded-xl font-semibold hover:shadow-lg transition-shadow`}
            >
              {topic.progress === 0 ? 'Начать изучение' : 'Продолжить'}
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
