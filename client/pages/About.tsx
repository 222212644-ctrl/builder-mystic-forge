import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  Target,
  Eye,
  Heart,
  CheckCircle,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  FileText,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const organizationStructure = [
    {
      position: "Kepala Dinas",
      name: "Dr. H. Muhammad Natsir, S.Sos., M.Si",
      responsibilities: [
        "Memimpin seluruh kegiatan DPMPTSP",
        "Koordinasi dengan instansi terkait",
        "Pengawasan pelayanan perizinan",
      ],
    },
    {
      position: "Sekretaris",
      name: "Dra. Hj. Sri Wahyuni, M.AP",
      responsibilities: [
        "Administrasi dan kepegawaian",
        "Perencanaan dan keuangan",
        "Koordinasi internal",
      ],
    },
    {
      position: "Kepala Bidang Pelayanan Perizinan",
      name: "Ir. Ahmad Suryadi, M.T",
      responsibilities: [
        "Pelayanan perizinan terpadu",
        "Inovasi layanan perizinan",
        "Standarisasi prosedur",
      ],
    },
    {
      position: "Kepala Bidang Promosi dan Penanaman Modal",
      name: "Drs. H. Bambang Setiawan, M.M",
      responsibilities: [
        "Promosi investasi daerah",
        "Fasilitasi penanaman modal",
        "Kerjasama dengan investor",
      ],
    },
    {
      position: "Kepala Bidang Pengolahan Data dan Informasi",
      name: "Dr. Siti Aisyah, S.Kom., M.T",
      responsibilities: [
        "Sistem informasi perizinan",
        "Pengolahan data statistik",
        "Digitalisasi layanan",
      ],
    },
  ];

  const achievements = [
    {
      year: "2024",
      title: "Top Digital Government Service",
      description:
        "Penghargaan layanan pemerintah digital terbaik tingkat provinsi",
      icon: Award,
    },
    {
      year: "2023",
      title: "ISO 9001:2015 Certification",
      description: "Sertifikasi sistem manajemen mutu untuk pelayanan publik",
      icon: Shield,
    },
    {
      year: "2023",
      title: "Innovation Award",
      description: "Inovasi sistem SIPELATARAN (Pelayanan Tanpa Antrian)",
      icon: Zap,
    },
    {
      year: "2022",
      title: "Best Public Service",
      description: "Pelayanan publik terbaik kategori perizinan dan investasi",
      icon: CheckCircle,
    },
  ];

  const statistics = [
    {
      number: "45+",
      label: "Jenis Layanan",
      description: "Berbagai perizinan yang dilayani",
      icon: FileText,
    },
    {
      number: "15,420",
      label: "Pengguna Terdaftar",
      description: "Masyarakat yang telah mendaftar",
      icon: Users,
    },
    {
      number: "89%",
      label: "Kepuasan Layanan",
      description: "Tingkat kepuasan masyarakat",
      icon: TrendingUp,
    },
    {
      number: "24/7",
      label: "Layanan Online",
      description: "Akses sistem kapan saja",
      icon: Clock,
    },
  ];

  const values = [
    {
      title: "Integritas",
      description:
        "Berkomitmen untuk memberikan pelayanan yang jujur, transparan, dan dapat dipercaya sesuai dengan peraturan yang berlaku.",
      icon: Shield,
    },
    {
      title: "Profesional",
      description:
        "Melayani dengan keahlian, kompetensi, dan standar kualitas tinggi untuk kepuasan masyarakat.",
      icon: Award,
    },
    {
      title: "Inovasi",
      description:
        "Terus mengembangkan cara-cara baru untuk meningkatkan kualitas dan efisiensi pelayanan publik.",
      icon: Zap,
    },
    {
      title: "Responsif",
      description:
        "Cepat tanggap dalam memberikan respon dan solusi atas kebutuhan masyarakat.",
      icon: TrendingUp,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tentang DPMPTSP Kota Samarinda
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Kota
            Samarinda adalah instansi pemerintah yang bertugas memberikan
            pelayanan perizinan dan non-perizinan serta penanaman modal secara
            terpadu dengan prinsip koordinasi, integrasi, sinkronisasi,
            simplifikasi, keamanan, dan kepastian.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-6 h-6 mr-2 text-primary" />
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-center p-4 bg-primary/5 rounded-lg">
                "Mewujudkan Samarinda sebagai Kota Investasi dan Pelayanan Prima
                yang Berkelanjutan"
              </p>
            </CardContent>
          </Card>

          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-2 text-primary" />
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Memberikan pelayanan perizinan yang cepat, mudah, dan
                    terpercaya
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Menciptakan iklim investasi yang kondusif dan berkelanjutan
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Mengembangkan sistem pelayanan berbasis teknologi informasi
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Meningkatkan kapasitas SDM dan kualitas pelayanan publik
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center">
            <CardTitle>DPMPTSP dalam Angka</CardTitle>
            <CardDescription>
              Data pencapaian dan kinerja pelayanan kami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {stat.number}
                  </h3>
                  <p className="font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi landasan dalam setiap pelayanan yang
              kami berikan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="gov-card-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Organization Structure */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Struktur Organisasi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pimpinan dan struktur organisasi DPMPTSP Kota Samarinda
            </p>
          </div>

          <div className="space-y-6">
            {organizationStructure.map((person, index) => (
              <Card key={index} className="gov-card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {person.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {person.position}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Tanggung Jawab:</h4>
                        <ul className="space-y-1">
                          {person.responsibilities.map(
                            (responsibility, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-muted-foreground"
                              >
                                <div className="w-1 h-1 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {responsibility}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prestasi & Penghargaan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pengakuan atas dedikasi kami dalam memberikan pelayanan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="gov-card-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gov-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <achievement.icon className="w-6 h-6 text-gov-yellow" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{achievement.year}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              Informasi Kontak
            </CardTitle>
            <CardDescription>
              Hubungi kami untuk informasi lebih lanjut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Alamat Kantor</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Kantor Pusat</p>
                      <p className="text-sm text-muted-foreground">
                        Jl. P. Suryanata No. 1<br />
                        Samarinda, Kalimantan Timur 75123
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Telepon</p>
                      <p className="text-sm text-muted-foreground">
                        (0541) 123-4567
                        <br />
                        (0541) 123-4568 (Fax)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-muted-foreground mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        dpmptst@samarindakota.go.id
                        <br />
                        info@dpmptsp.samarindakota.go.id
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Jam Operasional</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <span className="font-medium">Senin - Kamis</span>
                    <span className="text-sm">08:00 - 16:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                    <span className="font-medium">Jumat</span>
                    <span className="text-sm">08:00 - 16:30 WIB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded dark:bg-red-900/20">
                    <span className="font-medium text-muted-foreground">Sabtu - Minggu</span>
                    <span className="text-sm text-red-600 dark:text-red-400">Tutup</span>
                  </div>
                  <div className="mt-4 p-3 bg-primary/5 rounded">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 text-primary mr-2" />
                      <span className="font-medium text-primary">
                        Layanan Online 24/7
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sistem online dapat diakses kapan saja
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-primary text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Siap Memulai Permohonan Izin?
              </h3>
              <p className="mb-6 opacity-90">
                Bergabunglah dengan ribuan pengguna yang telah merasakan
                kemudahan layanan perizinan online kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  variant="secondary"
                  className="text-primary dark:text-white hover:bg-primary/80"
                  >
                  <Link to="/apply">Ajukan Izin Sekarang</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-primary"
                >
                  <Link to="/services">Lihat Semua Layanan</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
