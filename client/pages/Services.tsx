import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Clock,
  FileText,
  Building2,
  ShoppingCart,
  Heart,
  GraduationCap,
  Users,
  Truck,
  Megaphone,
  MapPin,
  ChevronRight,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Star,
  Building,
  Store,
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
    { id: "perdagangan", name: "Perdagangan", icon: ShoppingCart },
    { id: "kesehatan", name: "Kesehatan", icon: Heart },
    {
      id: "pekerjaan_umum",
      name: "Pekerjaan Umum & Penataan Ruang",
      icon: Building2,
    },
    { id: "pendidikan", name: "Pendidikan", icon: GraduationCap },
    { id: "sosial", name: "Sosial", icon: Users },
    { id: "simbg", name: "Manajemen Bangunan Gedung", icon: Building },
    { id: "reklame", name: "Izin Reklame", icon: Megaphone },
  ];

  // Updated services based on actual DPMPTSP Samarinda website
  const services = [
    // Perdagangan
    {
      id: "siup",
      title: "Surat Izin Usaha Perdagangan (SIUP)",
      description:
        "Izin untuk menjalankan kegiatan usaha perdagangan barang dan jasa di wilayah Kota Samarinda",
      category: "perdagangan",
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
        "Pendaftaran Online SIPO",
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
      category: "perdagangan",
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
        "Pendaftaran Online SIPO",
        "Verifikasi Berkas",
        "Validasi Data",
        "Penerbitan TDP",
      ],
      popular: true,
    },
    {
      id: "iutm",
      title: "Izin Usaha Toko Modern (IUTM)",
      description:
        "Izin untuk pendirian dan operasional toko modern/minimarket/waralaba retail",
      category: "perdagangan",
      duration: "14 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "SIUP",
        "TDP",
        "IMB",
        "Rekomendasi Perdagangan",
        "Studi Kelayakan Sosial Ekonomi",
        "Hasil Sosialisasi Masyarakat",
      ],
      process: [
        "Sosialisasi ke Masyarakat",
        "Pendaftaran Online SIPO",
        "Verifikasi Kelayakan",
        "Survei Dampak Sosial Ekonomi",
        "Penerbitan Izin",
      ],
      popular: false,
    },

    // Kesehatan
    {
      id: "iopk",
      title: "Izin Operasional Puskesmas Keliling",
      description:
        "Izin untuk mengoperasikan fasilitas kesehatan bergerak/puskesmas keliling",
      category: "kesehatan",
      duration: "10 hari kerja",
      fee: "Gratis",
      difficulty: "Sedang",
      requirements: [
        "Permohonan Tertulis",
        "Akta Pendirian/Izin Yayasan",
        "NPWP",
        "Rekomendasi Dinas Kesehatan",
        "Daftar Peralatan Medis",
        "Daftar Tenaga Kesehatan",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Administrasi",
        "Survei Lokasi",
        "Evaluasi Kelayakan",
        "Penerbitan Izin",
      ],
      popular: false,
    },
    {
      id: "ik3",
      title: "Izin Kerja Tenaga Kesehatan (IK3)",
      description:
        "Izin praktik untuk tenaga kesehatan yang bekerja di fasilitas kesehatan",
      category: "kesehatan",
      duration: "7 hari kerja",
      fee: "Gratis",
      difficulty: "Mudah",
      requirements: [
        "KTP",
        "Ijazah Pendidikan Kesehatan",
        "STR (Surat Tanda Registrasi)",
        "Surat Rekomendasi Organisasi Profesi",
        "Surat Pernyataan Sehat",
        "Pas Foto 4x6",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Dokumen",
        "Validasi STR",
        "Penerbitan IK3",
      ],
      popular: true,
    },

    // Pekerjaan Umum & Penataan Ruang
    {
      id: "imb",
      title: "Izin Mendirikan Bangunan (IMB)",
      description:
        "Izin untuk mendirikan, mengubah, memperluas, mengurangi dan/atau merawat bangunan gedung",
      category: "pekerjaan_umum",
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
        "Pendaftaran Online SIPO",
        "Verifikasi Berkas",
        "Survei Lapangan",
        "Pemeriksaan Teknis",
        "Penerbitan IMB",
      ],
      popular: true,
    },
    {
      id: "ipb",
      title: "Izin Pembuangan Air Limbah",
      description:
        "Izin untuk membuang air limbah ke lingkungan dengan standar baku mutu yang ditetapkan",
      category: "pekerjaan_umum",
      duration: "21 hari kerja",
      fee: "Berbayar",
      difficulty: "Sulit",
      requirements: [
        "Permohonan Tertulis",
        "AMDAL/UKL-UPL",
        "Rencana Teknis Pengolahan Limbah",
        "Data Kualitas Air Limbah",
        "Izin Lokasi",
        "Rekomendasi Dinas Lingkungan Hidup",
      ],
      process: [
        "Konsultasi Pra-Pendaftaran",
        "Pendaftaran Online SIPO",
        "Verifikasi Teknis",
        "Uji Lab Air Limbah",
        "Survei Lapangan",
        "Penerbitan Izin",
      ],
      popular: false,
    },
    {
      id: "ipp",
      title: "Izin Penimbunan BBM",
      description:
        "Izin untuk menyimpan dan menimbun bahan bakar minyak dalam jumlah tertentu",
      category: "pekerjaan_umum",
      duration: "14 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "KTP Penanggung Jawab",
        "SIUP Bidang Energi",
        "TDP",
        "Izin Lokasi",
        "Analisis Dampak Lalu Lintas",
        "Sertifikat Keselamatan Kerja",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Administrasi",
        "Survei Keselamatan",
        "Inspeksi Teknis",
        "Penerbitan Izin",
      ],
      popular: false,
    },

    // Pendidikan
    {
      id: "itk",
      title: "Izin Taman Kanak-Kanak (ITK)",
      description:
        "Izin pendirian dan operasional lembaga pendidikan anak usia dini/taman kanak-kanak",
      category: "pendidikan",
      duration: "14 hari kerja",
      fee: "Gratis",
      difficulty: "Sedang",
      requirements: [
        "Akta Notaris Yayasan",
        "NPWP Yayasan",
        "Sertifikat Tanah/IMB",
        "Kurikulum Pembelajaran",
        "Daftar Tenaga Pendidik",
        "Sarana dan Prasarana",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Administrasi",
        "Survei Kelayakan Lokasi",
        "Evaluasi Kurikulum",
        "Penerbitan Izin",
      ],
      popular: false,
    },

    // Sosial
    {
      id: "ipanti",
      title: "Izin Panti Asuhan",
      description:
        "Izin pendirian dan operasional panti asuhan/panti sosial untuk anak terlantar",
      category: "sosial",
      duration: "21 hari kerja",
      fee: "Gratis",
      difficulty: "Sedang",
      requirements: [
        "Akta Notaris Yayasan",
        "NPWP Yayasan",
        "Sertifikat Tanah/IMB",
        "Program Kerja Panti",
        "Daftar Pengurus",
        "Sumber Pembiayaan",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Administrasi",
        "Survei Kelayakan",
        "Evaluasi Program",
        "Penerbitan Izin",
      ],
      popular: false,
    },

    // SIMBG (Sistem Informasi Manajemen Bangunan Gedung)
    {
      id: "sbg",
      title: "Sertifikat Bangunan Gedung (SBG)",
      description:
        "Sertifikat yang diterbitkan untuk bangunan gedung yang telah selesai dibangun",
      category: "simbg",
      duration: "7 hari kerja",
      fee: "Berbayar",
      difficulty: "Mudah",
      requirements: [
        "IMB yang Masih Berlaku",
        "Berita Acara Pemeriksaan Kelaikan Fungsi",
        "As Built Drawing",
        "Sertifikat Keselamatan Kebakaran",
        "APAR dan Sistem Proteksi Kebakaran",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Kelengkapan IMB",
        "Inspeksi Bangunan",
        "Evaluasi Kelaikan Fungsi",
        "Penerbitan SBG",
      ],
      popular: true,
    },

    // Reklame
    {
      id: "irt",
      title: "Izin Reklame Tetap (Permanen)",
      description:
        "Izin untuk memasang reklame tetap/permanen di tempat strategis dalam kota",
      category: "reklame",
      duration: "10 hari kerja",
      fee: "Berbayar",
      difficulty: "Sedang",
      requirements: [
        "KTP/NPWP Pemohon",
        "Surat Izin Usaha",
        "Desain/Gambar Reklame",
        "Foto Lokasi Pemasangan",
        "Persetujuan Pemilik Lahan",
        "Analisis Dampak Lalu Lintas (jika diperlukan)",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Desain",
        "Survei Lokasi",
        "Evaluasi Dampak",
        "Penerbitan Izin",
      ],
      popular: true,
    },
    {
      id: "irs",
      title: "Izin Reklame Sementara",
      description:
        "Izin untuk memasang reklame sementara untuk keperluan promosi atau event tertentu",
      category: "reklame",
      duration: "5 hari kerja",
      fee: "Berbayar",
      difficulty: "Mudah",
      requirements: [
        "KTP/NPWP Pemohon",
        "Proposal Kegiatan/Event",
        "Desain Reklame",
        "Foto Lokasi",
        "Jadwal Pemasangan dan Pembongkaran",
      ],
      process: [
        "Pendaftaran Online SIPO",
        "Verifikasi Proposal",
        "Persetujuan Lokasi",
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

  const handleDownload = (serviceName: string) => {
    toast.success(`Dokumen persyaratan ${serviceName} berhasil diunduh!`, {
      description:
        "File formulir dan panduan telah tersimpan di perangkat Anda",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Layanan Perizinan Online
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sistem Informasi Perizinan Online (SIPO) DPMPTSP Kota Samarinda.
            Semua proses perizinan dapat dilakukan secara online dengan mudah
            dan transparan.
          </p>
        </div>

        {/* SIPO Information */}
        <Alert className="mb-8 bg-primary/5 border-primary/20">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Sistem Informasi Perizinan Online (SIPO)</strong> - Akses
            semua layanan perizinan DPMPTSP Kota Samarinda secara online.
            Daftar, ajukan, dan pantau status izin Anda dengan mudah melalui
            platform digital resmi.
          </AlertDescription>
        </Alert>

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
                    placeholder="Cari layanan perizinan..."
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

        {/* Quick Access to SIPO */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Akses SIPO (Sistem Informasi Perizinan Online)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Platform resmi untuk mengajukan dan memantau seluruh layanan
                  perizinan DPMPTSP Kota Samarinda
                </p>
                <div className="flex space-x-3">
                  <Button asChild>
                    <Link to="/apply">
                      <Star className="w-4 h-4 mr-2" />
                      Mulai Permohonan
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/status">
                      <Search className="w-4 h-4 mr-2" />
                      Cek Status Izin
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <Building className="w-20 h-20 text-primary/30" />
              </div>
            </div>
          </CardContent>
        </Card>

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

                {/* Category Badge */}
                <div>
                  <Badge variant="outline" className="text-xs">
                    {
                      serviceCategories.find(
                        (cat) => cat.id === service.category,
                      )?.name
                    }
                  </Badge>
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(service.title)}
                  >
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
                tepat sesuai dengan kebutuhan usaha atau proyek Anda melalui
                SIPO.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/help">Konsultasi Gratis</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/apply">Mulai Permohonan SIPO</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
