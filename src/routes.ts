import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/AdminDashboard";
import { FacultyDashboard } from "./components/FacultyDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { Graphs } from "./components/Graphs";
import { Recommendations } from "./components/Recommendations";
import { Reports } from "./components/Reports";
import { ActivityLog } from "./components/ActivityLog";
import { TeacherReports } from "./components/TeacherReports";
import { ClassManagement } from "./components/ClassManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/faculty",
    Component: FacultyDashboard,
  },
  {
    path: "/class-management",
    Component: ClassManagement,
  },
  {
    path: "/teacher-reports",
    Component: TeacherReports,
  },
  {
    path: "/student",
    Component: StudentDashboard,
  },
  {
    path: "/graphs",
    Component: Graphs,
  },
  {
    path: "/recommendations",
    Component: Recommendations,
  },
  {
    path: "/reports",
    Component: Reports,
  },
  {
    path: "/activity-log",
    Component: ActivityLog,
  },
]);