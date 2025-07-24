import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderProps {
  page: string;
}

export default function Placeholder({ page }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gov-gradient shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">DPMPTSP</h1>
                <p className="text-xs opacity-90">Kota Samarinda</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/index"
                className="text-white hover:text-white/80 transition-colors"
              >
                Beranda
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-white/80 transition-colors"
              >
                Layanan
              </Link>
              <Link
                to="/status"
                className="text-white hover:text-white/80 transition-colors"
              >
                Cek Status
              </Link>
              <Link
                to="/help"
                className="text-white hover:text-white/80 transition-colors"
              >
                Bantuan
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-white/80 transition-colors"
              >
                Tentang
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="gov-card-shadow">
            <CardHeader className="pb-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction className="w-10 h-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">
                Halaman {page} Sedang Dikembangkan
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Halaman {page} sedang dalam tahap pengembangan untuk memberikan
                pengalaman terbaik bagi pengguna. Silakan kembali ke halaman
                utama atau jelajahi fitur lainnya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/" className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Beranda
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/apply">Ajukan Izin Baru</Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Butuh bantuan? Hubungi kami di{" "}
                  <span className="font-medium">(0541) 123-4567</span> atau{" "}
                  <span className="font-medium">
                    info@dpmptsp.samarindakota.go.id
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">DPMPTSP Kota Samarinda</h3>
            </div>
          </div>
          <p className="text-sm opacity-80">
            &copy; 2024 DPMPTSP Kota Samarinda. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
