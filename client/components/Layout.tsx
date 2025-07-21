import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

export default function Layout({ children, showHero = false }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/services", label: "Layanan" },
    { path: "/status", label: "Cek Status" },
    { path: "/complaints", label: "Pengaduan" },
    { path: "/help", label: "Bantuan" },
    { path: "/about", label: "Tentang" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 gov-gradient shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">DPMPTSP</h1>
                <p className="text-xs opacity-90">Kota Samarinda</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? "text-gov-yellow font-semibold"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mb-4 p-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`py-2 transition-colors ${
                      isActive(item.path)
                        ? "text-gov-yellow font-semibold"
                        : "text-white hover:text-white/80"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
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
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
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
                  <Link to="/services/imb" className="hover:opacity-100">
                    Izin Mendirikan Bangunan
                  </Link>
                </li>
                <li>
                  <Link to="/services/siup" className="hover:opacity-100">
                    Surat Izin Usaha
                  </Link>
                </li>
                <li>
                  <Link to="/services/tdp" className="hover:opacity-100">
                    Tanda Daftar Perusahaan
                  </Link>
                </li>
                <li>
                  <Link to="/services/ho" className="hover:opacity-100">
                    Izin Gangguan
                  </Link>
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
                  <Link to="/faq" className="hover:opacity-100">
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
    </div>
  );
}
