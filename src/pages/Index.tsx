import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type Question = {
  id: number;
  text: string;
  options: string[];
  correct: number;
  difficulty: number;
};

const subjects: Subject[] = [
  { id: 'math', name: 'Математика', icon: 'Calculator', color: 'from-purple-500 to-pink-500' },
  { id: 'russian', name: 'Русский язык', icon: 'BookOpen', color: 'from-blue-500 to-cyan-500' },
  { id: 'physics', name: 'Физика', icon: 'Atom', color: 'from-orange-500 to-red-500' },
  { id: 'chemistry', name: 'Химия', icon: 'Flask', color: 'from-green-500 to-emerald-500' },
  { id: 'biology', name: 'Биология', icon: 'Microscope', color: 'from-teal-500 to-cyan-500' },
  { id: 'history', name: 'История', icon: 'Landmark', color: 'from-amber-500 to-yellow-500' },
];

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: 'Решите уравнение: 2x + 5 = 13',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correct: 1,
    difficulty: 1,
  },
  {
    id: 2,
    text: 'Чему равна производная функции f(x) = x²?',
    options: ['x', '2x', 'x²', '2'],
    correct: 1,
    difficulty: 2,
  },
  {
    id: 3,
    text: 'Какое из чисел является простым?',
    options: ['15', '21', '23', '27'],
    correct: 2,
    difficulty: 1,
  },
];

type Step = 'welcome' | 'register' | 'subjects' | 'test' | 'results' | 'dashboard';

export default function Index() {
  const [step, setStep] = useState<Step>('welcome');
  const [userName, setUserName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const { toast } = useToast();

  const handleRegister = () => {
    if (userName.trim()) {
      setStep('subjects');
      toast({
        title: 'Добро пожаловать!',
        description: `${userName}, давайте выберем предмет для обучения`,
      });
    }
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setStep('test');
    toast({
      title: 'Предмет выбран',
      description: `Начинаем адаптивное тестирование по предмету "${subject.name}"`,
    });
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setStep('results');
      }
    }
  };

  const calculateResults = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correct) {
        correct++;
      }
    });
    return {
      correct,
      total: sampleQuestions.length,
      percentage: Math.round((correct / sampleQuestions.length) * 100),
    };
  };

  const results = step === 'results' ? calculateResults() : null;

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 animate-scale-in shadow-2xl border-0">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4">
              <Icon name="Brain" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EduAI Platform
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Система адаптивного обучения с искусственным интеллектом. ИИ анализирует ваши результаты и создаёт персональный учебный план.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                <Icon name="Target" size={32} className="text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-purple-900">Адаптивные тесты</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100">
                <Icon name="TrendingUp" size={32} className="text-pink-600 mb-2" />
                <p className="text-sm font-semibold text-pink-900">ИИ-аналитика</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                <Icon name="Award" size={32} className="text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-blue-900">Отслеживание прогресса</p>
              </div>
            </div>
            <Button
              onClick={() => setStep('register')}
              size="lg"
              className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Начать обучение
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 animate-fade-in shadow-2xl border-0">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                <Icon name="UserPlus" size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Регистрация</h2>
              <p className="text-muted-foreground mt-2">Создайте свой учебный профиль</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 text-base rounded-xl"
                  onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                />
              </div>
              <Button
                onClick={handleRegister}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-base font-semibold"
                disabled={!userName.trim()}
              >
                Продолжить
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'subjects') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-3">Выберите предмет</h2>
            <p className="text-lg text-muted-foreground">Какой предмет хотите изучать, {userName}?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {subjects.map((subject) => (
              <Card
                key={subject.id}
                onClick={() => handleSubjectSelect(subject)}
                className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${subject.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={subject.icon as any} size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">Начать адаптивное обучение</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedSubject?.color} rounded-xl flex items-center justify-center`}>
                  <Icon name={selectedSubject?.icon as any} size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedSubject?.name}</h3>
                  <p className="text-sm text-muted-foreground">Адаптивное тестирование</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-base px-4 py-2">
                {currentQuestion + 1} / {sampleQuestions.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8 animate-scale-in shadow-xl border-0">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Badge className="mt-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Вопрос {currentQuestion + 1}
                </Badge>
                <h2 className="text-2xl font-bold flex-1">{question.text}</h2>
              </div>

              <div className="space-y-3 pt-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAnswer === index && <Icon name="Check" size={16} />}
                      </div>
                      <span className="text-lg font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold mt-6"
              >
                {currentQuestion < sampleQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'results' && results) {
    const strengths = results.percentage >= 70 ? ['Базовые концепции', 'Простые задачи'] : [];
    const weaknesses = results.percentage < 70 ? ['Требуется практика', 'Основные темы'] : ['Сложные задачи'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 animate-scale-in shadow-2xl border-0">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4">
                <Icon name="BarChart" size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Анализ результатов</h2>
              <p className="text-lg text-muted-foreground">ИИ проанализировал ваши ответы</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                  <h3 className="font-bold text-lg">Правильно</h3>
                </div>
                <p className="text-3xl font-bold text-green-700">{results.correct}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="XCircle" size={24} className="text-orange-600" />
                  <h3 className="font-bold text-lg">Ошибок</h3>
                </div>
                <p className="text-3xl font-bold text-orange-700">{results.total - results.correct}</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Percent" size={24} className="text-purple-600" />
                  <h3 className="font-bold text-lg">Процент</h3>
                </div>
                <p className="text-3xl font-bold text-purple-700">{results.percentage}%</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 border-2 border-green-200 bg-green-50">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="TrendingUp" size={24} className="text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Сильные стороны</h3>
                </div>
                <ul className="space-y-2">
                  {strengths.length > 0 ? (
                    strengths.map((strength, i) => (
                      <li key={i} className="flex items-center gap-2 text-green-800">
                        <Icon name="Check" size={16} className="text-green-600" />
                        {strength}
                      </li>
                    ))
                  ) : (
                    <li className="text-green-700">Продолжайте практиковаться!</li>
                  )}
                </ul>
              </Card>

              <Card className="p-6 border-2 border-orange-200 bg-orange-50">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="AlertCircle" size={24} className="text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-900">Зоны роста</h3>
                </div>
                <ul className="space-y-2">
                  {weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-center gap-2 text-orange-800">
                      <Icon name="Target" size={16} className="text-orange-600" />
                      {weakness}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Lightbulb" size={24} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Рекомендации ИИ</h3>
                  <p className="text-blue-800 leading-relaxed">
                    {results.percentage >= 70
                      ? 'Отличный результат! Рекомендую перейти к более сложным темам и углубить знания в продвинутых концепциях.'
                      : 'Рекомендую сосредоточиться на основных темах. Я подготовил персональный учебный план с упором на ваши слабые стороны.'}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setStep('dashboard')}
                className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold"
              >
                Перейти к обучению
                <Icon name="GraduationCap" size={20} className="ml-2" />
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setSelectedAnswer(null);
                  setStep('test');
                }}
                variant="outline"
                className="flex-1 h-14 rounded-xl text-lg font-semibold border-2"
              >
                Пройти ещё раз
                <Icon name="RotateCw" size={20} className="ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Привет, {userName}! 👋</h1>
                <p className="text-lg text-muted-foreground">Ваш персональный учебный план готов</p>
              </div>
              <Button
                onClick={() => {
                  setStep('subjects');
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setSelectedAnswer(null);
                }}
                variant="outline"
                className="rounded-xl"
              >
                <Icon name="Home" size={20} className="mr-2" />
                Главная
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Target" size={28} className="text-white" />
                <h3 className="text-lg font-bold">Пройдено тестов</h3>
              </div>
              <p className="text-4xl font-bold">1</p>
              <p className="text-purple-100 mt-2">Продолжайте практиковаться!</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="TrendingUp" size={28} className="text-white" />
                <h3 className="text-lg font-bold">Общий прогресс</h3>
              </div>
              <p className="text-4xl font-bold">{results?.percentage || 0}%</p>
              <Progress value={results?.percentage || 0} className="h-2 mt-3 bg-blue-200" />
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Flame" size={28} className="text-white" />
                <h3 className="text-lg font-bold">Активных дней</h3>
              </div>
              <p className="text-4xl font-bold">1</p>
              <p className="text-orange-100 mt-2">Начните серию!</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 animate-scale-in">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="BookOpen" size={28} className="text-purple-600" />
                Персональный план
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Основы алгебры', progress: 60, color: 'bg-purple-500' },
                  { title: 'Геометрические задачи', progress: 30, color: 'bg-pink-500' },
                  { title: 'Тригонометрия', progress: 10, color: 'bg-blue-500' },
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

            <Card className="p-6 animate-scale-in">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Calendar" size={28} className="text-blue-600" />
                Активность
              </h3>
              <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl mb-4">
                <div className="text-center">
                  <Icon name="Activity" size={48} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-blue-700 font-semibold">График активности</p>
                  <p className="text-sm text-blue-600 mt-1">Начните заниматься регулярно</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-xl text-center border border-green-200">
                  <p className="text-sm text-green-700 font-semibold">Правильных ответов</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{results?.correct || 0}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl text-center border border-purple-200">
                  <p className="text-sm text-purple-700 font-semibold">Изучено тем</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">3</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
