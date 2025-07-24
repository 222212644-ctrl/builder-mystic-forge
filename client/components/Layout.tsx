import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { SamarindaLogo } from "@/components/SamarindaLogo";

interface LayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

export default function Layout({ children, showHero = false }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/services", label: "Layanan" },
    { path: "/status", label: "Cek Status" },
    { path: "/complaints", label: "Pengaduan" },
    { path: "/help", label: "Bantuan" },
    { path: "/about", label: "Tentang" },
  ];

  // Handle skip link click
  const handleSkipToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    mainContentRef.current?.focus();
    mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isMenuOpen]);

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        backgroundImage: "url(https://kaltimfaktual.co/wp-content/uploads/2024/05/cover-smr.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Background overlay for content readability */}
      <div className="min-h-screen bg-background/90">
        {/* Skip Link for Accessibility */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Langsung ke konten utama
      </a>
      {/* Header/Navigation */}
      <header
        className="sticky top-0 z-50 gov-gradient shadow-lg"
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"
              aria-label="DPMPTSP Kota Samarinda - Kembali ke Beranda"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                <SamarindaLogo size={36} />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">DPMPTSP</h1>
                <p className="text-xs opacity-90">Kota Samarinda</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-6"
              role="navigation"
              aria-label="Navigasi utama"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 ${
                    isActive(item.path)
                      ? "text-gov-yellow font-semibold"
                      : "text-white hover:text-white/80"
                  }`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mb-4 p-4"
              role="navigation"
              aria-label="Navigasi mobile"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 ${
                      isActive(item.path)
                        ? "text-gov-yellow font-semibold"
                        : "text-white hover:text-white/80"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        ref={mainContentRef}
        tabIndex={-1}
        className="focus:outline-none"
        role="main"
        aria-label="Konten utama"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-foreground text-background py-12"
        role="contentinfo"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                  <SamarindaLogo size={36} />
                </div>
                <div>
                  <h3 className="font-bold">DPMPTSP</h3>
                  <p className="text-sm opacity-80">Kota Samarinda</p>
                </div>
              </div>
              <p className="text-sm opacity-80">
                Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kota
                Samarinda
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="https://samarindakota.go.id/" target="_blank" className="hover:opacity-100">
                    Kota Samarinda
                  </a>
                </li>
                <li>
                  <a href="https://disdukcapil.samarindakota.go.id/pelayanan_online" target="_blank" className="hover:opacity-100">
                    Dukcapil Samarinda
                  </a>
                </li>
                <li>
                  <a href="https://data.samarindakota.go.id/" target="_blank" className="hover:opacity-100">
                    Open Data
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link to="/about" className="hover:opacity-100">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="hover:opacity-100">
                    Berita
                  </Link>
                </li>
                <li>
                  <Link to="/regulations" className="hover:opacity-100">
                    Peraturan
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="hover:opacity-100">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>(0541) 123-4567</p>
                <p>dpmptst@samarindakota.go.id</p>
                <p>
                  Jl. P. Suryanata No. 1<br />
                  Samarinda, Kalimantan Timur
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>
              &copy; 2024 DPMPTSP Kota Samarinda. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>

        {/* Accessibility Widget */}
        <AccessibilityWidget />
      </div>
    </div>
  );
}
