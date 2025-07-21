import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  FileText,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Download,
  BookOpen,
  Headphones,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Help() {
  const faqs = [
    {
      id: 1,
      category: "registration",
      question:
        "Bagaimana cara mendaftar akun baru di sistem perizinan online?",
      answer:
        "Untuk mendaftar akun baru, klik tombol 'Daftar' pada halaman utama, lalu isi formulir pendaftaran dengan data diri yang valid. Anda akan menerima email konfirmasi untuk aktivasi akun. Setelah aktivasi, Anda dapat login dan mulai mengajukan permohonan izin.",
      popular: true,
    },
    {
      id: 2,
      category: "documents",
      question: "Dokumen apa saja yang diperlukan untuk mengajukan IMB?",
      answer:
        "Dokumen yang diperlukan untuk IMB antara lain: KTP pemohon, surat tanah/sertifikat, gambar denah, gambar tampak, gambar potongan, gambar situasi, perhitungan struktur, dan SPPL. Pastikan semua dokumen dalam format PDF dengan ukuran maksimal 5MB per file.",
      popular: true,
    },
    {
      id: 3,
      category: "payment",
      question: "Bagaimana cara melakukan pembayaran retribusi izin?",
      answer:
        "Pembayaran dapat dilakukan melalui: 1) Transfer bank ke rekening resmi DPMPTSP, 2) Pembayaran di loket bank yang bekerja sama, 3) Pembayaran elektronik melalui sistem online. Setelah pembayaran, upload bukti transfer untuk verifikasi.",
      popular: true,
    },
    {
      id: 4,
      category: "status",
      question: "Bagaimana cara mengecek status permohonan izin saya?",
      answer:
        "Anda dapat mengecek status permohonan melalui menu 'Cek Status' dengan memasukkan NIK atau nomor permohonan. Sistem akan menampilkan tahapan proses secara real-time beserta estimasi waktu penyelesaian.",
      popular: true,
    },
    {
      id: 5,
      category: "technical",
      question: "Mengapa file saya tidak bisa diupload?",
      answer:
        "Masalah upload file biasanya disebabkan oleh: ukuran file terlalu besar (maksimal 5MB), format file tidak didukung (gunakan PDF, JPG, PNG), atau koneksi internet tidak stabil. Pastikan juga browser Anda sudah terupdate.",
      popular: false,
    },
    {
      id: 6,
      category: "registration",
      question: "Bisakah saya mengajukan izin atas nama orang lain?",
      answer:
        "Ya, Anda dapat mengajukan izin atas nama orang lain dengan menyertakan surat kuasa yang ditandatangani di atas materai dan fotokopi KTP pemberi kuasa. Pastikan data yang diisi sesuai dengan identitas pemberi kuasa.",
      popular: false,
    },
    {
      id: 7,
      category: "documents",
      question: "Bagaimana jika dokumen yang saya miliki masih dalam proses?",
      answer:
        "Jika dokumen masih dalam proses (misalnya sertifikat tanah), Anda dapat menggunakan dokumen sementara seperti surat keterangan dari kelurahan atau dokumen lain yang sah. Tim verifikasi akan membantu menentukan dokumen alternatif yang dapat diterima.",
      popular: false,
    },
    {
      id: 8,
      category: "payment",
      question: "Berapa biaya retribusi untuk masing-masing jenis izin?",
      answer:
        "Biaya retribusi bervariasi sesuai jenis izin dan skala usaha/bangunan. SIUP umumnya gratis, IMB dihitung berdasarkan luas bangunan, TDP berdasarkan modal perusahaan. Simulasi biaya dapat dilihat di kalkulator retribusi online.",
      popular: false,
    },
    {
      id: 9,
      category: "status",
      question: "Berapa lama proses persetujuan izin?",
      answer:
        "Waktu proses bervariasi: SIUP (7 hari), TDP (5 hari), IMB (14 hari), HO (10 hari), IUI (15 hari). Waktu ini dihitung sejak berkas lengkap dan pembayaran telah diverifikasi. Status dapat dipantau secara real-time.",
      popular: true,
    },
    {
      id: 10,
      category: "technical",
      question: "Sistem error atau tidak bisa diakses, bagaimana?",
      answer:
        "Jika mengalami masalah teknis: 1) Refresh halaman dan coba lagi, 2) Hapus cache browser, 3) Coba browser lain, 4) Hubungi customer service di (0541) 123-4567. Tim IT kami siap membantu 24/7.",
      popular: false,
    },
    {
      id: 11,
      category: "documents",
      question: "Apakah dokumen fotokopi perlu dilegalisir?",
      answer:
        "Untuk pengajuan online, Anda cukup upload scan/foto dokumen asli. Legalisir diperlukan hanya saat pengambilan izin fisik atau jika diminta khusus oleh petugas verifikasi. Pastikan kualitas scan jelas dan terbaca.",
      popular: false,
    },
    {
      id: 12,
      category: "status",
      question: "Bagaimana jika permohonan saya ditolak?",
      answer:
        "Jika permohonan ditolak, Anda akan menerima notifikasi beserta alasan penolakan. Anda dapat memperbaiki dokumen/persyaratan yang kurang dan mengajukan ulang tanpa biaya tambahan dalam periode 30 hari.",
      popular: false,
    },
  ];

  const popularFAQs = faqs.filter((faq) => faq.popular);
  const allFAQs = faqs;

  const contactMethods = [
    {
      title: "Telepon",
      description: "Hubungi customer service kami",
      contact: "(0541) 123-4567",
      hours: "Senin - Jumat: 08:00 - 16:00",
      icon: Phone,
    },
    {
      title: "Email",
      description: "Kirim pertanyaan via email",
      contact: "dpmptst@samarindakota.go.id",
      hours: "Respon dalam 24 jam",
      icon: Mail,
    },
    {
      title: "WhatsApp",
      description: "Chat langsung via WhatsApp",
      contact: "+62 821-5224-6964",
      hours: "Senin - Jumat: 08:00 - 17:00",
      icon: MessageSquare,
    },
    {
      title: "Kunjungi Kantor",
      description: "Datang langsung ke kantor kami",
      contact: "Jl. P. Suryanata No. 1, Samarinda",
      hours: "Senin - Jumat: 08:00 - 16:00",
      icon: MapPin,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Bantuan & FAQ</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan Anda atau hubungi tim customer
            service kami untuk bantuan lebih lanjut.
          </p>
        </div>

        {/* Quick Contact Alert */}
        <Alert className="mb-8">
          <Headphones className="h-4 w-4" />
          <AlertDescription>
            <strong>Bantuan Cepat:</strong> Hubungi (0541) 123-4567 untuk
            bantuan langsung atau browse pertanyaan yang sering diajukan di
            bawah.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">
              Pertanyaan yang Sering Diajukan
            </h2>

            {/* Popular FAQs */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                Pertanyaan Populer
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {popularFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <Badge variant="secondary" className="mr-3">
                          {faq.category === "registration"
                            ? "Pendaftaran"
                            : faq.category === "documents"
                              ? "Dokumen"
                              : faq.category === "payment"
                                ? "Pembayaran"
                                : faq.category === "status"
                                  ? "Status & Tracking"
                                  : faq.category === "technical"
                                    ? "Teknis"
                                    : "Lainnya"}
                        </Badge>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* All FAQs */}
            <div>
              <h3 className="text-lg font-medium mb-4">Semua Pertanyaan</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {allFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`all-faq-${faq.id}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-3">
                          {faq.category === "registration"
                            ? "Pendaftaran"
                            : faq.category === "documents"
                              ? "Dokumen"
                              : faq.category === "payment"
                                ? "Pembayaran"
                                : faq.category === "status"
                                  ? "Status & Tracking"
                                  : faq.category === "technical"
                                    ? "Teknis"
                                    : "Lainnya"}
                        </Badge>
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Hubungi Kami</CardTitle>
                <CardDescription>
                  Berbagai cara untuk mendapatkan bantuan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 border rounded-lg"
                  >
                    <method.icon className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium">{method.contact}</p>
                      <p className="text-xs text-muted-foreground">
                        {method.hours}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-red-900 mb-2">
                    Bantuan Darurat
                  </h3>
                  <p className="text-sm text-red-700 mb-4">
                    Untuk masalah sistem yang mendesak atau kehilangan data
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Hubungi Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Masih Butuh Bantuan?
              </h3>
              <p className="text-muted-foreground mb-6">
                Tim customer service kami siap membantu Anda menyelesaikan
                masalah dan memberikan panduan personal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a
                    href="https://wa.me/+6282386126309"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:222212644@stis.ac.id">
                    <Mail className="w-4 h-4 mr-2" />
                    Kirim Email
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/apply">
                    <FileText className="w-4 h-4 mr-2" />
                    Mulai Permohonan
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
