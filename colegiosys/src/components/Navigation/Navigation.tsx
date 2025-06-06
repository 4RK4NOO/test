import { Link, useLocation } from "react-router-dom";
import { futuristicTheme } from "../../theme/futuristic";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/schools", label: "Colegios" },
  { to: "/courses", label: "Cursos" },
  { to: "/students", label: "Alumnos" },
  { to: "/grades", label: "Calificaciones" },
  { to: "/invoices", label: "Facturación" },
  { to: "/notifications", label: "Notificaciones" },
];

export default function Navigation() {
  const location = useLocation();
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-accent shadow-neon">
      <div className="text-2xl font-futuristic text-primary tracking-widest">EDUFUTURE</div>
      <ul className="flex gap-6">
        {navLinks.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`transition ${location.pathname === link.to ? "underline text-primary" : "text-primary/70"} hover:text-primary`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}