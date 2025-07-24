import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle, SimpleThemeToggle } from "@/components/ThemeToggle";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { SamarindaLogo } from "@/components/SamarindaLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Mock data for statistics
  const stats = [
    {
      label: "Izin Diproses Hari Ini",
      value: "127",
      icon: Clock,
      color: "text-status-processing",
    },
    {
      label: "Izin Selesai Bulan Ini",
      value: "2,840",
      icon: CheckCircle,
      color: "text-status-approved",
    },
    {
      label: "Total Pengguna Terdaftar",
      value: "15,420",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Jenis Layanan",
      value: "45",
      icon: Building2,
      color: "text-gov-blue",
    },
  ];

  const services = [
    {
      title: "Izin Mendirikan Bangunan (IMB)",
      description:
        "Permohonan izin untuk mendirikan bangunan baru atau renovasi",
      estimatedDays: "14 hari",
      fee: "Berbayar",
      popular: true,
    },
    {
      title: "Surat Izin Usaha Perdagangan (SIUP)",
      description: "Izin untuk menjalankan kegiatan usaha perdagangan",
      estimatedDays: "7 hari",
      fee: "Gratis",
      popular: true,
    },
    {
      title: "Tanda Daftar Perusahaan (TDP)",
      description: "Pendaftaran perusahaan untuk legalitas usaha",
      estimatedDays: "5 hari",
      fee: "Berbayar",
      popular: false,
    },
    {
      title: "Izin Gangguan (HO)",
      description: "Izin tempat usaha yang berpotensi menimbulkan gangguan",
      estimatedDays: "10 hari",
      fee: "Berbayar",
      popular: true,
    },
  ];

  const quickActions = [
    {
      title: "Ajukan Izin Baru",
      icon: FileText,
      href: "/apply",
      description: "Mulai permohonan izin baru",
    },
    {
      title: "Cek Status Izin",
      icon: Search,
      href: "/status",
      description: "Lacak progres permohonan Anda",
    },
    {
      title: "Bantuan & FAQ",
      icon: HelpCircle,
      href: "/help",
      description: "Temukan jawaban atas pertanyaan Anda",
    },
    {
      title: "Statistik Layanan",
      icon: BarChart3,
      href: "/stats",
      description: "Lihat data kinerja layanan",
    },
  ];

  // Search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Mohon masukkan kata kunci pencarian");
      return;
    }

    const query = searchQuery.trim();

    // Check if it's a NIK (16 digits)
    if (/^\d{16}$/.test(query)) {
      // Navigate to status page with NIK
      localStorage.setItem("dpmptsp_user_nik", query);
      navigate("/status");
      toast.success("Mengarahkan ke halaman cek status dengan NIK Anda");
      return;
    }

    // Check if it's an application number (format: XXX2024XXXXXX)
    if (/^[A-Z]{2,4}\d{4}\d{6}$/.test(query.toUpperCase())) {
      // Navigate to status page with application number
      navigate("/status");
      toast.success(
        "Mengarahkan ke halaman cek status dengan nomor permohonan",
      );
      return;
    }

    // Search for services
    const matchingServices = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()),
    );

    if (matchingServices.length > 0) {
      // Navigate to services page
      navigate("/services");
      toast.success(`Ditemukan ${matchingServices.length} layanan yang sesuai`);
    } else {
      // General search - show help with suggestion
      toast.info(
        "Tidak ditemukan hasil yang sesuai. Mengalihkan ke halaman bantuan...",
        {
          description:
            "Coba gunakan kata kunci lain atau hubungi customer service",
        },
      );
      setTimeout(() => {
        navigate("/help");
      }, 2000);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);

      // Apply parallax effect to background
      if (backgroundRef.current) {
        const parallaxSpeed = 0.5;
        backgroundRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 gov-gradient shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                <SamarindaLogo size={36} />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">DPMPTSP</h1>
                <p className="text-xs opacity-90">Kota Samarinda</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink
                to="/"
                className="text-white hover:text-white/80 transition-colors"
              >
                Beranda
              </NavLink>
              <NavLink
                to="/services"
                className="text-white hover:text-white/80 transition-colors"
              >
                Layanan
              </NavLink>
              <NavLink
                to="/status"
                className="text-white hover:text-white/80 transition-colors"
              >
                Cek Status
              </NavLink>
              <NavLink
                to="/complaints"
                className="text-white hover:text-white/80 transition-colors"
              >
                Pengaduan
              </NavLink>
              <NavLink
                to="/help"
                className="text-white hover:text-white/80 transition-colors"
              >
                Bantuan
              </NavLink>
              <NavLink
                to="/about"
                className="text-white hover:text-white/80 transition-colors"
              >
                Tentang
              </NavLink>
              <ThemeToggle />
            </nav>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <SimpleThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mb-4 p-4">
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Beranda
                </Link>
                <Link
                  to="/services"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Layanan
                </Link>
                <Link
                  to="/status"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Cek Status
                </Link>
                <Link
                  to="/complaints"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Pengaduan
                </Link>
                <Link
                  to="/help"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Bantuan
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-white/80 transition-colors py-2"
                >
                  Tentang
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative text-white py-20 overflow-hidden min-h-[80vh] flex items-center"
        role="banner"
        aria-labelledby="hero-title"
      >
        {/* Background Image with Parallax */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0 scale-110"
          style={{
            backgroundImage:
              "url(https://kaltimfaktual.co/wp-content/uploads/2024/05/cover-smr.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
          }}
        ></div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4">
          {/* Text shadow for better readability */}
          <style jsx>{`
            .hero-text {
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }
          `}</style>
          <div className="max-w-4xl mx-auto text-center">
            <h1
              id="hero-title"
              className="text-4xl md:text-6xl font-bold mb-6 hero-text"
            >
              Layanan Perizinan
              <span className="block text-gov-yellow">Terpadu Online</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 hero-text">
              Sistem Pelayanan Terpadu Satu Pintu Kota Samarinda yang modern,
              cepat, dan transparan
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cari jenis izin, NIK, atau nomor permohonan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm text-foreground border-0 rounded-full shadow-xl"
                  aria-label="Pencarian layanan, NIK, atau nomor permohonan"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2"
                  size="sm"
                >
                  Cari
                </Button>
              </div>
            </div>

            {/* Quick Access Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="bg-white/15 backdrop-blur-md rounded-xl p-5 hover:bg-white/25 focus:bg-white/25 transition-all duration-300 text-center group focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20 shadow-lg"
                >
                  <action.icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs opacity-80 mt-1">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-md">
                <CardContent className="pt-6">
                  <stat.icon
                    className={`w-12 h-12 mx-auto mb-4 ${stat.color}`}
                  />
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Layanan Populer
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Layanan perizinan yang paling sering digunakan oleh masyarakat
              Samarinda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="gov-card-shadow hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    {service.popular && (
                      <Badge
                        variant="secondary"
                        className="bg-gov-green text-white"
                      >
                        Populer
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.estimatedDays}
                      </div>
                      <div className="flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-1" />
                        {service.fee}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full group"
                    onClick={() => navigate("/apply")}
                  >
                    Ajukan Sekarang
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Keunggulan Sistem Kami
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Teknologi modern untuk pelayanan publik yang lebih baik
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proses Cepat</h3>
              <p className="text-muted-foreground">
                Sistem terintegrasi yang mempercepat proses permohonan izin
                hingga 50%
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gov-green rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aman & Terpercaya</h3>
              <p className="text-muted-foreground">
                Data Anda dilindungi dengan enkripsi tingkat bank dan sistem
                keamanan berlapis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gov-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparan</h3>
              <p className="text-muted-foreground">
                Lacak status permohonan secara real-time dengan notifikasi
                otomatis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Butuh Bantuan?</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Tim layanan pelanggan kami siap membantu Anda 24/7. Jangan ragu
                untuk menghubungi kami.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3" />
                  <span>(0541) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <span>info@dpmptsp.samarindakota.go.id</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <span>
                    Jl. P. Suryanata No. 1, Samarinda, Kalimantan Timur
                  </span>
                </div>
              </div>
            </div>

            <Card className="gov-card-shadow">
              <CardHeader>
                <CardTitle>Hubungi Kami</CardTitle>
                <CardDescription>
                  Kirim pesan dan kami akan merespon dalam 24 jam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input placeholder="Nama Lengkap" className="gov-input" />
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="gov-input"
                  />
                </div>
                <div>
                  <Input placeholder="Nomor Telepon" className="gov-input" />
                </div>
                <div>
                  <textarea
                    placeholder="Pesan Anda"
                    rows={4}
                    className="gov-input resize-none"
                  />
                </div>
                <Button className="w-full gov-button-primary">
                  Kirim Pesan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
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
              <h4 className="font-semibold mb-4">Tautan Lainnya</h4>
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
                <p>info@dpmptsp.samarindakota.go.id</p>
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
  );
}
