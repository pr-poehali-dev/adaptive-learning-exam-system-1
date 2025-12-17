import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type WelcomeScreenProps = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
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
            onClick={onStart}
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
