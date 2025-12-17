import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Results = {
  correct: number;
  total: number;
  percentage: number;
};

type ResultsScreenProps = {
  step: 'results';
  userName: string;
  results: Results | null;
  onContinue: () => void;
  onRetry: () => void;
  onHome: () => void;
};

export default function ResultsScreen({
  userName,
  results,
  onContinue,
  onRetry,
}: ResultsScreenProps) {
  if (results) {
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
                onClick={onContinue}
                className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold"
              >
                Перейти к обучению
                <Icon name="GraduationCap" size={20} className="ml-2" />
              </Button>
              <Button
                onClick={onRetry}
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

  return null;
}