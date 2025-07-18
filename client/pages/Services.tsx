import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Clock,
  FileText,
  Building2,
  ShoppingCart,
  Factory,
  Home,
  Users,
  Truck,
  Zap,
  ChevronRight,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const serviceCategories = [
    { id: "all", name: "Semua Layanan", icon: FileText },
    { id: "building", name: "Perizinan Bangunan", icon: Building2 },
    { id: "business", name: "Perizinan Usaha", icon: ShoppingCart },
    { id: "industry", name: "Perizinan Industri", icon: Factory },
    { id: "residential", name: "Perizinan Perumahan", icon: Home },
    { id: "social", name: "Perizinan Sosial", icon: Users },
    { id: "transport", name: "Perizinan Transportasi", icon: Truck },
    { id: "energy", name: "Perizinan Energi", icon: Zap },
  ];

  const services = [
    {
      id: "imb",
      title: "Izin Mendirikan Bangunan (IMB)",
      description:
        "Permohonan izin untuk mendirikan bangunan baru atau renovasi bangunan existing",
      category: "building",
      duration: "14 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "KTP Pemohon",
        "Surat Tanah/Sertifikat",
        "Gambar Denah",
        "Gambar Tampak",
        "Gambar Potongan",
        "Gambar Situasi",
        "Perhitungan Struktur",
        "SPPL (Surat Pernyataan Pengelolaan Lingkungan)",
      ],
      process: [
        "Pendaftaran Online",
        "Verifikasi Berkas",
        "Survei Lapangan",
        "Pemeriksaan Teknis",
        "Penerbitan Izin",
      ],
      popular: true,
    },
    {
      id: "siup",
      title: "Surat Izin Usaha Perdagangan (SIUP)",
      description:
        "Izin untuk menjalankan kegiatan usaha perdagangan barang dan jasa",
      category: "business",
      duration: "7 hari kerja",
      fee: "Gratis",
      difficulty: "Mudah",
      requirements: [
        "KTP Penanggung Jawab",
        "Akta Pendirian Perusahaan",
        "NPWP Perusahaan",
        "Domisili Usaha",
        "Pas Foto 4x6",
        "Surat Keterangan Modal",
      ],
      process: [
        "Pendaftaran Online",
        "Verifikasi Dokumen",
        "Pemeriksaan Data",
        "Penerbitan SIUP",
      ],
      popular: true,
    },
    {
      id: "tdp",
      title: "Tanda Daftar Perusahaan (TDP)",
      description:
        "Pendaftaran perusahaan untuk legalitas usaha dan pencatatan dalam database resmi",
      category: "business",
      duration: "5 hari kerja",
      fee: "Berbayar",
      difficulty: "Mudah",
      requirements: [
        "Akta Pendirian Perusahaan",
        "SK Pengesahan Kemenkumham",
        "NPWP Perusahaan",
        "KTP Pengurus",
        "Domisili Perusahaan",
        "SIUP (jika ada)",
      ],
      process: [
        "Pendaftaran Online",
        "Verifikasi Berkas",
        "Validasi Data",
        "Penerbitan TDP",
      ],
      popular: false,
    },
    {
      id: "ho",
      title: "Izin Gangguan (HO)",
      description:
        "Izin tempat usaha yang berpotensi menimbulkan gangguan lingkungan",
      category: "business",
      duration: "10 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "KTP Pemohon",
        "SIUP",
        "TDP",
        "Surat Keterangan Domisili",
        "Denah Lokasi",
        "Rekomendasi Lingkungan",
        "AMDAL (jika diperlukan)",
      ],
      process: [
        "Pendaftaran Online",
        "Verifikasi Berkas",
        "Survei Lapangan",
        "Konsultasi Publik",
        "Penerbitan Izin",
      ],
      popular: true,
    },
    {
      id: "iui",
      title: "Izin Usaha Industri (IUI)",
      description: "Izin untuk menjalankan kegiatan usaha industri pengolahan",
      category: "industry",
      duration: "15 hari kerja",
      fee: "Berbayar",
      difficulty: "Sulit",
      requirements: [
        "Akta Pendirian Perusahaan",
        "NPWP Perusahaan",
        "Rencana Teknis Industri",
        "AMDAL/UKL-UPL",
        "Izin Lokasi",
        "IMB Pabrik",
      ],
      process: [
        "Konsultasi Pra-Pendaftaran",
        "Pendaftaran Online",
        "Verifikasi Teknis",
        "Survei Lapangan",
        "Pemeriksaan AMDAL",
        "Penerbitan Izin",
      ],
      popular: false,
    },
    {
      id: "iul",
      title: "Izin Usaha Lingkungan (IUL)",
      description: "Izin untuk kegiatan yang berdampak pada lingkungan",
      category: "industry",
      duration: "20 hari kerja",
      fee: "Berbayar",
      difficulty: "Sulit",
      requirements: [
        "Dokumen AMDAL",
        "RKL-RPL",
        "Izin Lokasi",
        "NPWP",
        "Akta Perusahaan",
        "Studi Kelayakan",
      ],
      process: [
        "Penyusunan AMDAL",
        "Konsultasi Publik",
        "Review Komisi AMDAL",
        "Pendaftaran Online",
        "Evaluasi Teknis",
        "Penerbitan Izin",
      ],
      popular: false,
    },
    {
      id: "ipp",
      title: "Izin Pemanfaatan Parkir (IPP)",
      description: "Izin untuk pengelolaan dan pemanfaatan lahan parkir",
      category: "transport",
      duration: "7 hari kerja",
      fee: "Berbayar",
      difficulty: "Mudah",
      requirements: [
        "KTP Pengelola",
        "Surat Tanah/Sewa",
        "Denah Parkir",
        "Rekomendasi Kepolisian",
        "NPWP",
      ],
      process: [
        "Pendaftaran Online",
        "Verifikasi Lokasi",
        "Koordinasi Dinas Terkait",
        "Penerbitan Izin",
      ],
      popular: false,
    },
    {
      id: "iutm",
      title: "Izin Usaha Toko Modern (IUTM)",
      description:
        "Izin untuk pendirian dan operasional toko modern/minimarket",
      category: "business",
      duration: "14 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "SIUP",
        "TDP",
        "IMB",
        "Rekomendasi Perdagangan",
        "Studi Kelayakan",
        "Sosialisasi Masyarakat",
      ],
      process: [
        "Sosialisasi ke Masyarakat",
        "Pendaftaran Online",
        "Verifikasi Kelayakan",
        "Survei Dampak",
        "Penerbitan Izin",
      ],
      popular: false,
    },
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesDuration =
      selectedDuration === "all" ||
      (selectedDuration === "fast" && parseInt(service.duration) <= 7) ||
      (selectedDuration === "medium" &&
        parseInt(service.duration) > 7 &&
        parseInt(service.duration) <= 14) ||
      (selectedDuration === "slow" && parseInt(service.duration) > 14);

    return matchesSearch && matchesCategory && matchesDuration;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800";
      case "Sedang":
        return "bg-yellow-100 text-yellow-800";
      case "Sulit":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Layanan Perizinan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Temukan layanan perizinan yang sesuai dengan kebutuhan Anda. Semua
            proses dapat dilakukan secara online dengan mudah dan transparan.
          </p>
        </div>

        {/* Service Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Kategori Layanan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Cari layanan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durasi Proses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Durasi</SelectItem>
                    <SelectItem value="fast">Cepat (≤ 7 hari)</SelectItem>
                    <SelectItem value="medium">Sedang (8-14 hari)</SelectItem>
                    <SelectItem value="slow">Lama (&gt; 14 hari)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {filteredServices.length} layanan ditemukan
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Tips:</strong> Pastikan Anda menyiapkan semua dokumen yang
            diperlukan sebelum mengajukan permohonan. Dokumen yang tidak lengkap
            akan memperlambat proses persetujuan.
          </AlertDescription>
        </Alert>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="gov-card-shadow hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">
                    {service.title}
                  </CardTitle>
                  <div className="flex flex-col space-y-1">
                    {service.popular && (
                      <Badge
                        variant="secondary"
                        className="bg-gov-green text-white text-xs"
                      >
                        Populer
                      </Badge>
                    )}
                    <Badge
                      className={getDifficultyColor(service.difficulty)}
                      variant="secondary"
                    >
                      {service.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Service Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span
                      className={
                        service.fee === "Gratis"
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      {service.fee}
                    </span>
                  </div>
                </div>

                {/* Requirements Preview */}
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Persyaratan Utama:
                  </h4>
                  <div className="space-y-1">
                    {service.requirements.slice(0, 3).map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-muted-foreground"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                        {req}
                      </div>
                    ))}
                    {service.requirements.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{service.requirements.length - 3} persyaratan lainnya
                      </div>
                    )}
                  </div>
                </div>

                {/* Process Steps Preview */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Tahapan Proses:</h4>
                  <div className="flex items-center space-x-2">
                    {service.process.slice(0, 4).map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                        </div>
                        {index < 3 && index < service.process.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-muted-foreground mx-1" />
                        )}
                      </div>
                    ))}
                    {service.process.length > 4 && (
                      <span className="text-xs text-muted-foreground">...</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link
                      to="/apply"
                      className="flex items-center justify-center"
                    >
                      Ajukan Sekarang
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Layanan Tidak Ditemukan
              </h3>
              <p className="text-muted-foreground mb-4">
                Tidak ada layanan yang cocok dengan kriteria pencarian Anda.
                Coba ubah filter atau kata kunci pencarian.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedDuration("all");
                }}
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Butuh Bantuan Memilih Layanan?
              </h3>
              <p className="text-muted-foreground mb-6">
                Tim konsultan kami siap membantu Anda menentukan jenis izin yang
                tepat sesuai dengan kebutuhan usaha atau proyek Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/help">Konsultasi Gratis</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/apply">Mulai Permohonan</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
