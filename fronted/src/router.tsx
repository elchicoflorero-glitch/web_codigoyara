import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home          from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import Privacy       from "@/pages/legal/Privacy";
import Terms         from "@/pages/legal/Terms";
import AdminLogin        from "@/pages/admin/AdminLogin";
import AdminDashboard    from "@/pages/admin/AdminDashboard";
import AdminProjects     from "@/pages/admin/AdminProjects";
import AdminTeam         from "@/pages/admin/AdminTeam";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminQuotes       from "@/pages/admin/AdminQuotes";
import AdminDesigns      from "@/pages/admin/AdminDesigns";
import ScrollToTop       from "@/components/ui/ScrollToTop";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/"                element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        <Route path="/privacidad"      element={<Privacy />} />
        <Route path="/terminos"        element={<Terms />} />
        {/* Admin */}
        <Route path="/admin"                  element={<AdminLogin />} />
        <Route path="/admin/dashboard"        element={<AdminDashboard />} />
        <Route path="/admin/proyectos"        element={<AdminProjects />} />
        <Route path="/admin/equipo"           element={<AdminTeam />} />
        <Route path="/admin/testimonios"      element={<AdminTestimonials />} />
        <Route path="/admin/cotizaciones"     element={<AdminQuotes />} />
        <Route path="/admin/designs"          element={<AdminDesigns />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
