import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

type RegisterScreenProps = {
  step: 'register' | 'subjects';
  userName: string;
  subjects: Subject[];
  onNameChange: (name: string) => void;
  onRegister: () => void;
  onSubjectSelect: (subject: Subject) => void;
};

export default function RegisterScreen({
  step,
  userName,
  subjects,
  onNameChange,
  onRegister,
  onSubjectSelect,
}: RegisterScreenProps) {
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
                  onChange={(e) => onNameChange(e.target.value)}
                  className="h-12 text-base rounded-xl"
                  onKeyDown={(e) => e.key === 'Enter' && onRegister()}
                />
              </div>
              <Button
                onClick={onRegister}
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
              onClick={() => onSubjectSelect(subject)}
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
