import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  FileText,
  AlertTriangle,
  CheckCircle,
  Search,
  Calendar,
  User,
  Building,
  MessageCircle,
  ExternalLink,
  Info,
  Star,
  Headphones,
  Upload,
  Eye,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function Complaints() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    description: "",
    attachments: [],
    agreement: false,
  });
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const complaintCategories = [
    { value: "pelayanan", label: "Kualitas Pelayanan" },
    { value: "prosedur", label: "Prosedur/Persyaratan" },
    { value: "waktu", label: "Waktu Pemrosesan" },
    { value: "biaya", label: "Biaya/Retribusi" },
    { value: "sistem", label: "Sistem SIPO Online" },
    { value: "staff", label: "Sikap Petugas" },
    { value: "fasilitas", label: "Fasilitas Kantor" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const contactChannels = [
    {
      title: "LAPOR! (Layanan Aspirasi dan Pengaduan Online)",
      description: "Platform pengaduan resmi pemerintah dengan tracking status",
      icon: ExternalLink,
      contact: "lapor.go.id",
      type: "website",
      priority: "Tinggi",
      response: "24 jam",
      color: "bg-blue-500",
    },
    {
      title: "Formulir Pengaduan Online",
      description: "Pengaduan melalui website resmi DPMPTSP",
      icon: MessageSquare,
      contact: "Form di bawah ini",
      type: "form",
      priority: "Tinggi",
      response: "1-2 hari kerja",
      color: "bg-green-500",
    },
    {
      title: "SMS Center Pengaduan",
      description: "Kirim keluhan via SMS",
      icon: MessageCircle,
      contact: "0811 5843 555",
      type: "sms",
      priority: "Sedang",
      response: "2-3 hari kerja",
      color: "bg-yellow-500",
    },
    {
      title: "Email Pengaduan",
      description: "Kirim pengaduan detail via email",
      icon: Mail,
      contact: "ptsp.samarinda@gmail.com",
      type: "email",
      priority: "Sedang",
      response: "1-3 hari kerja",
      color: "bg-purple-500",
    },
    {
      title: "Telepon Langsung",
      description: "Hubungi customer service langsung",
      icon: Phone,
      contact: "(0541) 123-4567",
      type: "phone",
      priority: "Tinggi",
      response: "Langsung",
      color: "bg-red-500",
    },
    {
      title: "Datang Langsung",
      description: "Kunjungi kantor DPMPTSP Kota Samarinda",
      icon: MapPin,
      contact: "Jl. P. Suryanata No. 1",
      type: "visit",
      priority: "Tinggi",
      response: "Langsung",
      color: "bg-gray-500",
    },
  ];

  const recentComplaints = [
    {
      id: "PTSP-2024-001",
      category: "Waktu Pemrosesan",
      subject: "IMB terlambat dari jadwal",
      status: "Dalam Proses",
      date: "2024-01-15",
      response: "Sedang ditindaklanjuti oleh tim teknis",
    },
    {
      id: "PTSP-2024-002",
      category: "Sistem SIPO",
      subject: "Error saat upload dokumen",
      status: "Selesai",
      date: "2024-01-10",
      response: "Masalah telah diperbaiki, sistem normal",
    },
    {
      id: "PTSP-2024-003",
      category: "Pelayanan",
      subject: "Informasi kurang jelas",
      status: "Selesai",
      date: "2024-01-08",
      response: "Petugas telah diberi pelatihan tambahan",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        description: "",
        attachments: [],
        agreement: false,
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Dalam Proses":
        return "bg-blue-100 text-blue-800";
      case "Menunggu":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (showSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">
                Pengaduan Berhasil Dikirim
              </h2>
              <p className="text-muted-foreground mb-6">
                Terima kasih atas pengaduan Anda. Nomor tiket pengaduan Anda
                adalah:
              </p>
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-lg font-mono font-bold text-primary">
                  PTSP-2024-
                  {Math.floor(Math.random() * 1000)
                    .toString()
                    .padStart(3, "0")}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Simpan nomor tiket ini untuk melacak status pengaduan Anda. Kami
                akan memberikan tanggapan dalam 1-3 hari kerja.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setShowSuccess(false)}>
                  Kirim Pengaduan Lain
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/complaints?tab=track">Lacak Status Pengaduan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Pengaduan dan Keluhan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sampaikan keluhan, saran, atau masukan Anda terkait pelayanan
            DPMPTSP Kota Samarinda. Kami berkomitmen untuk terus meningkatkan
            kualitas pelayanan.
          </p>
        </div>

        {/* LAPOR! Integration Info */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>
              LAPOR! (Layanan Aspirasi dan Pengaduan Online Rakyat)
            </strong>{" "}
            - Platform resmi pemerintah untuk menyampaikan pengaduan dengan
            sistem tracking transparan.
            <Button variant="link" className="p-0 ml-2 h-auto" asChild>
              <a
                href="https://lapor.go.id"
                target="_blank"
                rel="noopener noreferrer"
              >
                Akses LAPOR! <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Complaint Form */}
          <div className="lg:col-span-2">
            <Card className="gov-card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                  Form Pengaduan Online
                </CardTitle>
                <CardDescription>
                  Isi form di bawah ini dengan lengkap dan jelas untuk
                  mempercepat penanganan pengaduan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        placeholder="Nama sesuai KTP"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        placeholder="08xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori Pengaduan *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {complaintCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Complaint Details */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Judul/Subjek Pengaduan *</Label>
                    <Input
                      id="subject"
                      placeholder="Ringkas dalam satu kalimat"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Lengkap *</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan secara detail kronologi, tempat, waktu, dan pihak yang terlibat..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Lampiran Pendukung (Opsional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload foto, dokumen, atau file pendukung lainnya
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Pilih File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Format: PDF, JPG, PNG. Maksimal 5MB per file.
                      </p>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreement"
                      checked={formData.agreement}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreement: checked as boolean,
                        })
                      }
                      required
                    />
                    <Label
                      htmlFor="agreement"
                      className="text-sm leading-relaxed"
                    >
                      Saya menyatakan bahwa informasi yang saya berikan adalah
                      benar dan dapat dipertanggungjawabkan. Saya memahami bahwa
                      pengaduan palsu dapat dikenakan sanksi sesuai peraturan
                      yang berlaku.
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !formData.agreement}
                  >
                    {isSubmitting ? (
                      <>
                        <MessageCircle className="w-4 h-4 mr-2 animate-spin" />
                        Mengirim Pengaduan...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Pengaduan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Track Complaint */}
            <Card className="mt-8 gov-card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-6 h-6 mr-2 text-primary" />
                  Lacak Status Pengaduan
                </CardTitle>
                <CardDescription>
                  Masukkan nomor tiket untuk melihat status pengaduan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Contoh: PTSP-2024-001"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Lacak
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Channels */}
            <Card className="gov-card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="w-5 h-5 mr-2" />
                  Saluran Pengaduan
                </CardTitle>
                <CardDescription>
                  Pilih saluran yang sesuai dengan kebutuhan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${channel.color}`}
                      >
                        <channel.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">
                            {channel.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {channel.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {channel.description}
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs font-medium">
                            {channel.contact}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Respon: {channel.response}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Complaints */}
            <Card className="gov-card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Pengaduan Terbaru
                </CardTitle>
                <CardDescription>
                  Status pengaduan yang sedang ditangani
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-primary">
                        {complaint.id}
                      </span>
                      <Badge
                        className={getStatusColor(complaint.status)}
                        variant="secondary"
                      >
                        {complaint.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">
                      {complaint.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Kategori: {complaint.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {complaint.response}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(complaint.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      Tips Pengaduan Efektif
                    </h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Jelaskan kronologi secara detail</li>
                      <li>• Sertakan bukti pendukung jika ada</li>
                      <li>• Gunakan bahasa yang sopan</li>
                      <li>• Cantumkan kontak yang bisa dihubungi</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Hours & Contact */}
        <Card className="mt-8 bg-muted/30">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Jam Pelayanan Pengaduan
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Senin - Kamis</span>
                    <span>08:00 - 16:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumat</span>
                    <span>08:00 - 16:30 WIB</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Sabtu - Minggu</span>
                    <span>Tutup</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Alamat Kantor
                </h3>
                <div className="text-sm space-y-1">
                  <p>DPMPTSP Kota Samarinda</p>
                  <p>Jl. P. Suryanata No. 1</p>
                  <p>Samarinda, Kalimantan Timur 75123</p>
                  <p className="mt-2">
                    <strong>Telepon:</strong> (0541) 123-4567
                    <br />
                    <strong>Email:</strong> ptsp.samarinda@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
