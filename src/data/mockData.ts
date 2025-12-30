export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    status: 'active' | 'suspended' | 'pending';
    joinDate: string;
    avatar?: string;
}

export const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@student.com', role: 'student', status: 'active', joinDate: '2023-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@student.com', role: 'student', status: 'active', joinDate: '2023-02-20' },
    { id: '3', name: 'Bob Johnson', email: 'bob@student.com', role: 'student', status: 'suspended', joinDate: '2023-03-10' },
    { id: '4', name: 'Alice Williams', email: 'alice@student.com', role: 'student', status: 'active', joinDate: '2023-04-05' },
    { id: '5', name: 'Instructor Budi', email: 'budi@instructor.com', role: 'instructor', status: 'active', joinDate: '2022-11-01' },
    { id: '6', name: 'Instructor Siti', email: 'siti@instructor.com', role: 'instructor', status: 'pending', joinDate: '2023-05-12' },
];

export interface Course {
    id: string;
    title: string;
    instructor: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    students: number;
    rating: number;
}

export interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz';
    duration?: string; // e.g., "10:00"
    completed?: boolean; // For student progress
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Assessment {
    id: string;
    title: string;
    type: 'quiz' | 'assignment';
    courseId: string;
    dueDate: string;
    questions?: number; // for quiz
    submissions?: number;
    status: 'published' | 'draft';
}

export const mockAssessments: Assessment[] = [
    { id: 'a1', title: 'React Component Lifecycle Quiz', type: 'quiz', courseId: '1', dueDate: '2024-12-30', questions: 10, submissions: 45, status: 'published' },
    { id: 'a2', title: 'Build a Todo App', type: 'assignment', courseId: '1', dueDate: '2025-01-15', submissions: 12, status: 'published' },
];

export const mockCourseContent: Record<string, Module[]> = {
    '1': [
        {
            id: 'm1',
            title: 'Introduction to React',
            lessons: [
                { id: 'l1', title: 'What is React?', type: 'video', duration: '05:30' },
                { id: 'l2', title: 'Setting up the Environment', type: 'text', duration: '10:00' },
            ]
        },
        {
            id: 'm2',
            title: 'Components & Props',
            lessons: [
                { id: 'l3', title: 'Functional Components', type: 'video', duration: '12:00' },
                { id: 'l4', title: 'Understanding Props', type: 'video', duration: '08:45' },
                { id: 'l5', title: 'Component Quiz', type: 'quiz' },
            ]
        }
    ]
};


export interface ActivationCode {
    code: string;
    courseId: string;
    type: 'single' | 'multi';
    maxUses: number;
    usedCount: number;
    expiresAt: string;
    status: 'active' | 'disabled' | 'blacklisted';
    batchId?: string;
    createdAt: string;
}

export interface ActivationRequest {
    id: string;
    instructorId: string;
    courseId: string;
    reason: string;
    estimatedParticipants: number;
    duration: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

export const mockActivationCodes: ActivationCode[] = [
    { code: 'PMT-REACT-2024-X9Y2', courseId: '1', type: 'single', maxUses: 1, usedCount: 0, expiresAt: '2024-12-31', status: 'active', createdAt: '2023-12-01' },
    { code: 'PMT-LARAVEL-BATCH-1', courseId: '2', type: 'multi', maxUses: 50, usedCount: 12, expiresAt: '2025-06-30', status: 'active', createdAt: '2023-11-15' },
    { code: 'PMT-DESIGN-OLD', courseId: '3', type: 'single', maxUses: 1, usedCount: 1, expiresAt: '2023-01-01', status: 'disabled', createdAt: '2022-01-01' },
];

export const mockActivationRequests: ActivationRequest[] = [
    { id: 'req1', instructorId: '5', courseId: '1', reason: 'Bootcamp Batch 5', estimatedParticipants: 30, duration: '6 months', status: 'pending', createdAt: '2023-12-28' },
    { id: 'req2', instructorId: '6', courseId: '2', reason: 'University Collaboration', estimatedParticipants: 100, duration: '1 year', status: 'approved', createdAt: '2023-11-10' },
];

export const mockCourses: Course[] = [
    { id: '1', title: 'React Frontend Masterclass', instructor: 'Instructor Budi', category: 'Programming', status: 'published', students: 450, rating: 4.8 },
    { id: '2', title: 'Fullstack Laravel 10', instructor: 'Instructor Siti', category: 'Programming', status: 'published', students: 380, rating: 4.9 },
    { id: '3', title: 'UI/UX Design Fundamentals', instructor: 'Joko Anwar', category: 'Design', status: 'draft', students: 0, rating: 0 },
    { id: '4', title: 'Digital Marketing 101', instructor: 'Rina Wati', category: 'Marketing', status: 'published', students: 245, rating: 4.6 },
    { id: '5', title: 'Python for Data Science', instructor: 'Instructor Siti', category: 'Data Science', status: 'published', students: 310, rating: 4.7 },
    { id: '6', title: 'Advanced CSS Animations', instructor: 'Instructor Budi', category: 'Programming', status: 'archived', students: 120, rating: 4.5 },
];
