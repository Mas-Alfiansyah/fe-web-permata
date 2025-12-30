import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import Students from './pages/admin/users/Students';
import Instructors from './pages/admin/users/Instructors';
import Roles from './pages/admin/users/Roles';
import AdminCourseList from './pages/admin/courses/CourseList';
import AdminCourseDetail from './pages/admin/courses/CourseDetail';
import CourseForm from './pages/admin/courses/CourseForm';
import CourseCategories from './pages/admin/courses/CourseCategories';
import CourseApproval from './pages/admin/courses/CourseApproval';
import ActivationCodes from './pages/admin/courses/ActivationCodes';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import Events from './pages/common/Events';
import Discussion from './pages/common/Discussion';
import InstructorDashboard from './pages/instructor/Dashboard';
import MyCourses from './pages/instructor/courses/MyCourses';
import CourseBuilder from './pages/instructor/courses/CourseBuilder';
import AssessmentList from './pages/instructor/assessments/AssessmentList';
import ActivationRequests from './pages/instructor/courses/ActivationRequests';
import ModuleList from './pages/instructor/modules/ModuleList';
import MaterialList from './pages/instructor/materials/MaterialList';
import StudentDashboard from './pages/student/Dashboard';
import CourseCatalog from './pages/student/CourseCatalog';
import StudentCourseDetail from './pages/student/CourseDetail';
import LearningPlayer from './pages/student/LearningPlayer';
import StudentMyCourses from './pages/student/MyCourses';
import QuizInterface from './pages/student/QuizInterface';
import RedeemCode from './pages/student/RedeemCode';
import Profile from './pages/common/Profile';
import Certificates from './pages/common/Certificates';

import AdminLayout from './layouts/AdminLayout';
import InstructorLayout from './layouts/InstructorLayout';
import StudentLayout from './layouts/StudentLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
        <ProtectedRoute allowedRoles={['super_admin']}>
            <AdminLayout />
        </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'users/students',
        element: <Students />,
      },
      {
        path: 'users/instructors',
        element: <Instructors />,
      },
      {
        path: 'courses',
        element: <AdminCourseList />,
      },
      {
        path: 'courses/create',
        element: <CourseForm />,
      },
      {
        path: 'courses/:id',
        element: <AdminCourseDetail />,
      },
      {
        path: 'courses/:id/edit',
        element: <CourseForm isEdit={true} />,
      },
      {
        path: 'courses/categories',
        element: <CourseCategories />,
      },
      {
        path: 'courses/approval',
        element: <CourseApproval />,
      },
      {
        path: 'courses/activation',
        element: <ActivationCodes />,
      },
      {
        path: 'users/roles',
        element: <Roles />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      // Add more admin routes here
    ],
  },
  {
    path: '/instructor',
    element: (
        <ProtectedRoute allowedRoles={['instructor']}>
            <InstructorLayout />
        </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <InstructorDashboard />,
      },
      {
        path: 'courses',
        element: <MyCourses />,
      },
      {
        path: 'courses/:courseId/edit',
        element: <CourseBuilder />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'certificates',
        element: <Certificates />,
      },
      {
        path: 'assessments',
        element: <AssessmentList />,
      },
      {
        path: 'discussions',
        element: <Discussion />,
      },
      {
        path: 'courses/activation',
        element: <ActivationRequests />,
      },
      {
        path: 'modules',
        element: <ModuleList />,
      },
      {
        path: 'modules/:moduleId/materials', // Or just 'materials' if simplified
        element: <MaterialList />,
      },
      // Add more instructor routes here
    ],
  },
  {
    path: '/student',
    element: (
        <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
        </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
      {
        path: 'catalog',
        element: <CourseCatalog />,
      },
      {
        path: 'activation',
        element: <RedeemCode />,
      },
      {
        path: 'course/:courseId',
        element: <StudentCourseDetail />,
      },
      {
        path: 'my-courses',
        element: <StudentMyCourses />,
      },
      {
        path: 'learning/:courseId',
        element: <LearningPlayer />,
      },
      {
        path: 'quiz/:quizId',
        element: <QuizInterface />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'discussions',
        element: <Discussion />,
      },
      // Add more student routes here
    ],
  },
]);

export default router;
