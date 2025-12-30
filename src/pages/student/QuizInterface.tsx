import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function QuizInterface() {
    // const { quizId } = useParams(); // In a real app, fetch quiz by ID
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // Mock Questions
    const questions = [
        {
            id: 1,
            question: "What is the primary purpose of React?",
            options: [
                "To build mobile apps only",
                "To build user interfaces",
                "To manage databases",
                "To style web pages"
            ],
            correct: 1
        },
        {
            id: 2,
            question: "Which hook is used for side effects?",
            options: [
                "useState",
                "useReducer",
                "useEffect",
                "useContext"
            ],
            correct: 2
        },
        {
            id: 3,
            question: "What is JSX?",
            options: [
                "A template engine",
                "A JavaScript syntax extension",
                "A CSS library",
                "A database query language"
            ],
            correct: 1
        }
    ];

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto py-10 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={40} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Quiz Completed!</h1>
                <p className="text-gray-600">You have successfully completed the React Assessment.</p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 inline-block text-left w-full">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">Summary</h2>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Total Questions</span>
                        <span className="font-semibold">{questions.length}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Correct Answers</span>
                        <span className="font-semibold text-green-600">{questions.length}</span> 
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-600">Score</span>
                        <span className="font-semibold text-blue-600">100%</span>
                    </div>
                </div>

                <div className="pt-4">
                    <Link to="/student/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span>Time Remaining: 14:30</span>
                </div>
                <span className="text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full">
                    Question {currentQuestion + 1} / {questions.length}
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-2 bg-gray-100">
                    <div 
                        className="h-full bg-indigo-600 transition-all duration-300" 
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
                
                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, idx) => (
                            <button 
                                key={idx}
                                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center group"
                            >
                                <div className="w-6 h-6 rounded-full border border-gray-300 mr-4 flex items-center justify-center group-hover:border-indigo-600">
                                    <div className="w-3 h-3 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <span className="text-gray-700 font-medium group-hover:text-indigo-900">{option}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between">
                    <button 
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    >
                        <ArrowLeft size={18} /> Previous
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
