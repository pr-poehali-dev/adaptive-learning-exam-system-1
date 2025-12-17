import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

type TestScreenProps = {
  selectedSubject: Subject | null;
  currentQuestion: number;
  totalQuestions: number;
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
};

export default function TestScreen({
  selectedSubject,
  currentQuestion,
  totalQuestions,
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
}: TestScreenProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

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
              {currentQuestion + 1} / {totalQuestions}
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
                  onClick={() => onAnswerSelect(index)}
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
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-lg font-semibold mt-6"
            >
              {currentQuestion < totalQuestions - 1 ? 'Следующий вопрос' : 'Завершить тест'}
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
