import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./admin/AdminRoute";

// ── Layout components: DIRECT imports (never lazy) ──
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// ── Public pages: lazy loaded ──
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// ── Admin pages: lazy loaded ──
const AdminLogin = lazy(() => import("./admin/Login"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/Dashboard"));
const ManageProjects = lazy(() => import("./admin/ManageProjects"));
const ManageCategories = lazy(() => import("./admin/ManageCategories"));
const ManageServices = lazy(() => import("./admin/ManageServices"));
const ManageEnquiries = lazy(() => import("./admin/ManageEnquiries"));
const SiteSettings = lazy(() => import("./admin/SiteSettings"));

const Loader = () => (
    <div style={{
        height: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", background: "#F5F0EB"
    }}>
        <div style={{
            width: 40, height: 40, border: "2px solid #C9A96E",
            borderTopColor: "transparent", borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{
            fontFamily: "serif", color: "#1A1A2E",
            letterSpacing: "0.3em", marginTop: 16, fontSize: 14
        }}>
            CONCORD INTERIOR CONCEPTS
        </p>
    </div>
);

// PublicLayout uses direct imports — no lazy here
const PublicLayout = ({ children }) => (
    <>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
    </>
);

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Toaster position="top-right" toastOptions={{
                    style: {
                        background: "#1A1A2E",
                        color: "#F5F0EB",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                    },
                }} />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        {/* ── Public ── */}
                        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                        <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
                        <Route path="/portfolio/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
                        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
                        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

                        {/* ── Admin ── */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="projects" element={<ManageProjects />} />
                            <Route path="categories" element={<ManageCategories />} />
                            <Route path="services" element={<ManageServices />} />
                            <Route path="enquiries" element={<ManageEnquiries />} />
                            <Route path="settings" element={<SiteSettings />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
}