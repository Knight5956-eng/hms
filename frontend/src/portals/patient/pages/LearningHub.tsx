import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Award,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface Lesson {
  id: string;
  moduleNum: string;
  category: 'Nutrition' | 'Basics' | 'Medication' | 'Safety' | 'Lifestyle';
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  content: {
    summary: string;
    keyPoints: string[];
    localContextTip: string;
    quizQuestion: string;
    quizOptions: string[];
    correctOptionIndex: number;
  };
}

const LESSONS_DATA: Lesson[] = [
  {
    id: 'l1',
    moduleNum: '01 / 08',
    category: 'Nutrition',
    title: 'Food & Blood Sugar: Building a Balanced Plate',
    duration: '6 min read',
    description: 'Learn how to construct healthy Kenyan meals using the plate method with Sukuma Wiki, Ndengu, Eggs, and whole grains.',
    completed: true,
    content: {
      summary: 'The Plate Method helps manage blood sugar without counting complex calories. Fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with high-fiber whole grains.',
      keyPoints: [
        '50% Vegetables: Sukuma wiki, spinach, cabbage, traditional greens (Terere, Managu).',
        '25% Lean Protein: Ndengu (green grams), beans, eggs, grilled fish, or lean beef/chicken.',
        '25% Complex Carbohydrates: Small portion of brown ugali, sweet potatoes, oats, or boiled cassava.',
        'Pair meals with water or sugar-free tea instead of sweetened soda or juice.',
      ],
      localContextTip: 'In Kenya, staple foods like white ugali digested quickly can raise blood glucose fast. Switching to brown ugali or reducing portion size while increasing vegetables keeps your sugar steady.',
      quizQuestion: 'According to the Diabetes Plate Method, how much of your plate should consist of non-starchy vegetables?',
      quizOptions: ['One quarter (25%)', 'One half (50%)', 'Three quarters (75%)', 'None'],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l2',
    moduleNum: '02 / 08',
    category: 'Basics',
    title: 'Understanding Your Glucose & HbA1c Targets',
    duration: '5 min read',
    description: 'Master what fasting blood sugar, post-meal readings, and 3-month HbA1c numbers mean for your overall health.',
    completed: true,
    content: {
      summary: 'Monitoring blood glucose provides real-time feedback, while HbA1c measures your average glycemic control over 2 to 3 months.',
      keyPoints: [
        'Fasting / Before Meal Target: 4.4 to 7.2 mmol/L (80–130 mg/dL).',
        '2 Hours After Meal Target: Under 10.0 mmol/L (180 mg/dL).',
        'Target HbA1c: Below 7.0% for most non-pregnant adults (personalized by your clinician).',
        'Consistency in logging helps Dr. Faith Mugo adjust your care plan accurately.',
      ],
      localContextTip: 'Log readings right in the HMS app after morning check-ins. If you see readings above 16.7 mmol/L twice in 24 hours, notify Embu Level 5 Hospital clinic immediately.',
      quizQuestion: 'What is the recommended fasting glucose target range for most adults with Type 2 diabetes?',
      quizOptions: ['2.0 to 4.0 mmol/L', '4.4 to 7.2 mmol/L', '10.0 to 15.0 mmol/L', 'Above 18.0 mmol/L'],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l3',
    moduleNum: '03 / 08',
    category: 'Medication',
    title: 'Medication Schedule & Pharmacy Refills',
    duration: '4 min read',
    description: 'How Metformin and other prescribed medicines work, setting dose reminders, and ordering Embu Level 5 Pharmacy refills.',
    completed: true,
    content: {
      summary: 'Diabetes medications help your body produce or utilize insulin efficiently. Taking your prescribed doses consistently prevents sudden glucose spikes.',
      keyPoints: [
        'Take Metformin with meals to reduce stomach upset.',
        'Never skip or double dose without consulting Nurse Peter Mutua or your clinician.',
        'Track remaining doses in the HMS Medications tab.',
        'Request prescription refills 7 days before running out to allow smooth pharmacy processing at Embu Level 5.',
      ],
      localContextTip: 'Use the 1-tap "Request Refill" feature in the HMS app. The pharmacy team will prepare your prescription for hassle-free collection.',
      quizQuestion: 'When is the best time to request a prescription refill at Embu Level 5 Pharmacy?',
      quizOptions: ['On the day you run out completely', '7 days before your medication supply runs out', '30 days after missing doses', 'Only during annual review'],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l4',
    moduleNum: '04 / 08',
    category: 'Safety',
    title: 'Recognizing & Treating Low Blood Sugar (Hypo)',
    duration: '7 min read',
    description: 'Learn the warning signs of hypoglycemia (<3.9 mmol/L) and how to safely treat it using the 15/15 Rule.',
    completed: false,
    content: {
      summary: 'Hypoglycemia occurs when blood sugar drops below 3.9 mmol/L. Recognizing symptoms early prevents severe complications.',
      keyPoints: [
        'Symptoms: Trembling, sweating, fast heart rate, dizziness, sudden hunger, or confusion.',
        'The 15/15 Rule: Eat or drink 15 grams of fast-acting carbs immediately.',
        'Examples of 15g carbs: 1/2 cup fruit juice, 3-4 glucose tablets, or 3 teaspoons of sugar dissolved in water.',
        'Wait 15 minutes and recheck glucose. If still under 3.9 mmol/L, repeat with another 15g of carbs.',
      ],
      localContextTip: 'Always carry a small packet of glucose sweets or sugar when leaving home for clinic visits or farm work.',
      quizQuestion: 'What glucose reading defines hypoglycemia (low blood sugar)?',
      quizOptions: ['Below 3.9 mmol/L', 'Between 5.0 and 7.0 mmol/L', 'Above 11.1 mmol/L', 'Above 16.7 mmol/L'],
      correctOptionIndex: 0,
    },
  },
  {
    id: 'l5',
    moduleNum: '05 / 08',
    category: 'Lifestyle',
    title: 'Daily Movement & Insulin Sensitivity',
    duration: '5 min read',
    description: 'Discover how 30 minutes of simple daily movement like walking helps lower blood glucose naturally.',
    completed: false,
    content: {
      summary: 'Physical activity makes your muscle cells more sensitive to insulin, allowing them to take up glucose from your bloodstream.',
      keyPoints: [
        'Aim for 30 minutes of moderate activity at least 5 days a week (150 minutes total).',
        'A brisk walk after meals helps prevent post-meal sugar spikes.',
        'Wear comfortable, non-binding footwear to protect your feet.',
        'Stay hydrated with clean water before and after exercising.',
      ],
      localContextTip: 'Walking to Embu market or around your local estate counts towards your 30-minute daily self-care habit!',
      quizQuestion: 'How does physical activity help in managing Type 2 diabetes?',
      quizOptions: [
        'It increases insulin resistance',
        'It helps muscle cells use blood glucose more effectively',
        'It replaces the need for proper nutrition',
        'It raises blood pressure dangerously',
      ],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l6',
    moduleNum: '06 / 08',
    category: 'Safety',
    title: 'Foot Care & Daily Prevention Habits',
    duration: '6 min read',
    description: 'Essential daily routines to inspect, clean, and protect your feet from neuropathy and minor injuries.',
    completed: false,
    content: {
      summary: 'High blood sugar over time can reduce blood flow and nerve sensation in your feet. Daily foot checks prevent undetected wounds.',
      keyPoints: [
        'Inspect your feet every evening for cuts, blisters, redness, or swelling.',
        'Wash feet daily in lukewarm water; dry thoroughly between toes.',
        'Apply lotion to feet but avoid putting lotion between toes.',
        'Never walk barefoot, even indoors.',
      ],
      localContextTip: 'If you notice a cut or sore on your foot that does not heal within 2 days, show it to Nurse Peter Mutua at your next appointment.',
      quizQuestion: 'Why should you inspect your feet daily?',
      quizOptions: [
        'To pick shoe colors',
        'To catch cuts or sores early before they cause complications',
        'Only if you feel severe pain',
        'To prepare for running',
      ],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l7',
    moduleNum: '07 / 08',
    category: 'Basics',
    title: 'Sick Day Rules & Maintaining Hydration',
    duration: '5 min read',
    description: 'What to do when you have a cold, fever, or stomach illness to keep blood sugar under control.',
    completed: false,
    content: {
      summary: 'Illness and stress trigger hormones that elevate blood sugar levels, requiring closer monitoring.',
      keyPoints: [
        'Check blood glucose more frequently (every 3 to 4 hours).',
        'Drink plenty of sugar-free fluids (water, broth, herbal tea) to prevent dehydration.',
        'Continue taking your diabetes medications unless specifically instructed otherwise by your doctor.',
        'Contact Embu Level 5 Hospital if you experience persistent vomiting or sugar over 16.7 mmol/L.',
      ],
      localContextTip: 'Keep clean bottled water or boiled water readily available at home when feeling unwell.',
      quizQuestion: 'During an illness, how should you adjust blood glucose monitoring?',
      quizOptions: [
        'Stop testing until you recover',
        'Test more frequently (every 3-4 hours)',
        'Test only once a week',
        'Ignore readings',
      ],
      correctOptionIndex: 1,
    },
  },
  {
    id: 'l8',
    moduleNum: '08 / 08',
    category: 'Lifestyle',
    title: 'Partnering with Your Embu Level 5 Care Team',
    duration: '4 min read',
    description: 'Preparing questions for Dr. Faith Mugo and Nurse Peter Mutua to get the most out of every consultation.',
    completed: false,
    content: {
      summary: 'Effective diabetes care is a collaboration between you and your healthcare team. Preparing before visits ensures your concerns are addressed.',
      keyPoints: [
        'Bring your glucose log and medication list or open your HMS app.',
        'Write down 2 or 3 top questions about your food, meds, or daily challenges.',
        'Discuss any recent low sugar events or difficulties taking medication.',
        'Ask about scheduling your next quarterly HbA1c test.',
      ],
      localContextTip: 'You can use the HMS virtual appointment or in-person clinic visits at Embu Level 5 Hospital.',
      quizQuestion: 'What is a good way to prepare for your clinic visit?',
      quizOptions: [
        'Leave all medication at home',
        'Have your glucose log ready and list top questions for your care team',
        'Avoid mentioning low blood sugar episodes',
        'Skip your appointment if readings are good',
      ],
      correctOptionIndex: 1,
    },
  },
];

export const LearningHub: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(LESSONS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const filteredLessons = lessons.filter((lesson) => {
    if (selectedCategory === 'All') return true;
    return lesson.category === selectedCategory;
  });

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleToggleComplete = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l))
    );
    if (activeLesson && activeLesson.id === id) {
      setActiveLesson((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
    }
  };

  const categories = ['All', 'Nutrition', 'Basics', 'Medication', 'Safety', 'Lifestyle'];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-semibold text-emerald-100 backdrop-blur-sm w-fit">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Diabetes Self-Management Education (DSME)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Learning Hub & Care Guidance
            </h1>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Empower your daily care with practical skills, Kenyan nutritional guidance, and safety tips for Type 2 diabetes.
            </p>
          </div>

          <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white p-4 rounded-xl flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-200">
                <Award className="w-4 h-4 text-amber-300" /> Course Progress
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md font-bold">
                {completedCount} / {lessons.length}
              </span>
            </div>
            <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-100">
              <span>{progressPercent}% Completed</span>
              <span className="font-semibold text-amber-200">
                {progressPercent >= 35 ? 'Consistent Learner 🌟' : 'Keep Going!'}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface border border-border text-text-muted hover:bg-surface-hover hover:text-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`flex flex-col justify-between p-5 border transition-all cursor-pointer hover:border-primary/50 hover:shadow-md ${
              lesson.completed ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-surface border-border'
            }`}
            onClick={() => handleOpenLesson(lesson)}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-primary uppercase">
                  {lesson.moduleNum} · {lesson.category}
                </span>
                {lesson.completed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted bg-surface-hover px-2.5 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                <PlayCircle className="w-4 h-4" /> Start Lesson
              </span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </div>
          </Card>
        ))}
      </div>

      {/* Lesson Details Modal Drawer */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-surface-hover px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full uppercase">
                  {activeLesson.moduleNum}
                </span>
                <span className="text-xs font-semibold text-text-muted">{activeLesson.category}</span>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="p-1.5 text-text-muted hover:text-text rounded-lg hover:bg-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-text">{activeLesson.title}</h2>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeLesson.duration}
                  </span>
                  <span>•</span>
                  <span>Embu Level 5 Hospital Care Standard</span>
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm text-text leading-relaxed">
                <p className="font-medium">{activeLesson.content.summary}</p>
              </div>

              {/* Key Points List */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-text flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Key Takeaways
                </h3>
                <ul className="flex flex-col gap-2">
                  {activeLesson.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-text-muted leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Kenyan Context Box */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200">Local Kenyan Tip</span>
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                    {activeLesson.content.localContextTip}
                  </p>
                </div>
              </div>

              {/* Quick Quiz Section */}
              <div className="p-5 border border-border rounded-xl bg-surface-hover flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-text">Quick Knowledge Check</span>
                </div>
                <p className="text-xs font-semibold text-text">{activeLesson.content.quizQuestion}</p>

                <div className="flex flex-col gap-2 mt-1">
                  {activeLesson.content.quizOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedQuizOption(idx);
                        setQuizSubmitted(true);
                      }}
                      className={`p-3 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedQuizOption === idx
                          ? idx === activeLesson.content.correctOptionIndex
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                            : 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300'
                          : 'bg-surface border-border text-text hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {quizSubmitted && idx === activeLesson.content.correctOptionIndex && (
                          <span className="text-[10px] font-bold text-emerald-600 uppercase">Correct ✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {quizSubmitted && (
                  <p className="text-xs font-semibold mt-1 text-center">
                    {selectedQuizOption === activeLesson.content.correctOptionIndex ? (
                      <span className="text-emerald-600">Great job! You answered correctly. 🎉</span>
                    ) : (
                      <span className="text-amber-600">Not quite! Review the key takeaways above.</span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-surface border-t border-border flex items-center justify-between">
              <Button
                variant={activeLesson.completed ? 'outline' : 'primary'}
                onClick={() => handleToggleComplete(activeLesson.id)}
                className="w-full sm:w-auto"
              >
                {activeLesson.completed ? 'Mark as Incomplete' : '✓ Mark Lesson as Complete'}
              </Button>
              <Button variant="ghost" onClick={() => setActiveLesson(null)} className="hidden sm:inline-flex">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
