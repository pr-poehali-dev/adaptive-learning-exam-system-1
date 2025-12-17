import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import WelcomeScreen from '@/components/WelcomeScreen';
import RegisterScreen from '@/components/RegisterScreen';
import TestScreen from '@/components/TestScreen';
import ResultsScreen from '@/components/ResultsScreen';
import PlatformLayout from '@/components/PlatformLayout';
import HomeTab from '@/components/platform/HomeTab';
import PreparationTab from '@/components/platform/PreparationTab';
import TestsTab from '@/components/platform/TestsTab';
import AnalyticsTab from '@/components/platform/AnalyticsTab';
import ProfileTab from '@/components/platform/ProfileTab';

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

type Step = 'welcome' | 'register' | 'subjects' | 'test' | 'results' | 'platform';
type PlatformTab = 'home' | 'preparation' | 'tests' | 'analytics' | 'profile';

export default function Index() {
  const [step, setStep] = useState<Step>('welcome');
  const [activeTab, setActiveTab] = useState<PlatformTab>('home');
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

  const results = step === 'results' || step === 'platform' ? calculateResults() : null;

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setStep('test');
  };

  const handleHome = () => {
    setStep('subjects');
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  if (step === 'welcome') {
    return <WelcomeScreen onStart={() => setStep('register')} />;
  }

  if (step === 'register' || step === 'subjects') {
    return (
      <RegisterScreen
        step={step}
        userName={userName}
        subjects={subjects}
        onNameChange={setUserName}
        onRegister={handleRegister}
        onSubjectSelect={handleSubjectSelect}
      />
    );
  }

  if (step === 'test') {
    return (
      <TestScreen
        selectedSubject={selectedSubject}
        currentQuestion={currentQuestion}
        totalQuestions={sampleQuestions.length}
        question={sampleQuestions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
        onSubmit={handleAnswerSubmit}
      />
    );
  }

  if (step === 'results') {
    return (
      <ResultsScreen
        step={step}
        userName={userName}
        results={results}
        onContinue={() => {
          setStep('platform');
          setActiveTab('home');
        }}
        onRetry={handleRetry}
        onHome={handleHome}
      />
    );
  }

  if (step === 'platform') {
    return (
      <PlatformLayout userName={userName} activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'home' && (
          <HomeTab userName={userName} results={results} selectedSubject={selectedSubject} />
        )}
        {activeTab === 'preparation' && <PreparationTab />}
        {activeTab === 'tests' && <TestsTab />}
        {activeTab === 'analytics' && <AnalyticsTab results={results} />}
        {activeTab === 'profile' && <ProfileTab userName={userName} selectedSubject={selectedSubject} />}
      </PlatformLayout>
    );
  }

  return null;
}