import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  Phone,
  Mail,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Status() {
  const [searchType, setSearchType] = useState("nik");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockApplications = [
    {
      id: "IMB2024001234",
      type: "Izin Mendirikan Bangunan",
      applicantName: "Ahmad Wijaya",
      submitDate: "2024-01-15",
      estimatedCompletion: "2024-01-29",
      status: "processing",
      currentStep: "Verifikasi Dokumen",
      progress: 60,
      documents: [
        { name: "KTP Pemohon", status: "approved" },
        { name: "Surat Tanah", status: "approved" },
        { name: "Gambar Denah", status: "processing" },
        { name: "Gambar Tampak", status: "pending" },
      ],
      timeline: [
        {
          date: "2024-01-15",
          title: "Permohonan Diterima",
          description: "Permohonan telah masuk ke sistem",
          status: "completed",
        },
        {
          date: "2024-01-16",
          title: "Verifikasi Berkas",
          description: "Pemeriksaan kelengkapan dokumen",
          status: "completed",
        },
        {
          date: "2024-01-18",
          title: "Survei Lapangan",
          description: "Tim survei akan melakukan kunjungan",
          status: "processing",
        },
        {
          date: "2024-01-25",
          title: "Pemeriksaan Teknis",
          description: "Review teknis oleh ahli",
          status: "pending",
        },
        {
          date: "2024-01-29",
          title: "Penerbitan Izin",
          description: "Izin siap diambil",
          status: "pending",
        },
      ],
    },
    {
      id: "SIUP2024005678",
      type: "Surat Izin Usaha Perdagangan",
      applicantName: "Sari Delima",
      submitDate: "2024-01-20",
      estimatedCompletion: "2024-01-27",
      status: "approved",
      currentStep: "Selesai",
      progress: 100,
      documents: [
        { name: "KTP Penanggung Jawab", status: "approved" },
        { name: "Akta Pendirian", status: "approved" },
        { name: "NPWP Perusahaan", status: "approved" },
        { name: "Domisili Usaha", status: "approved" },
      ],
    },
  ];

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (
        searchValue === "3271234567890123" ||
        searchValue === "IMB2024001234"
      ) {
        setSearchResults(mockApplications);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-status-pending text-foreground";
      case "processing":
        return "bg-status-processing text-white";
      case "approved":
        return "bg-status-approved text-white";
      case "rejected":
        return "bg-status-rejected text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Clock;
      case "processing":
        return RefreshCw;
      case "approved":
        return CheckCircle;
      case "rejected":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "processing":
        return "Diproses";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Cek Status Permohonan</h1>
            <p className="text-muted-foreground">
              Lacak progres permohonan izin Anda secara real-time
            </p>
          </div>

          {/* Search Form */}
          <Card className="gov-card-shadow mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-6 h-6 mr-2 text-primary" />
                Cari Permohonan
              </CardTitle>
              <CardDescription>
                Masukkan NIK atau nomor permohonan untuk melihat status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Cari Berdasarkan</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nik">NIK</SelectItem>
                        <SelectItem value="application">
                          Nomor Permohonan
                        </SelectItem>
                        <SelectItem value="phone">Nomor Telepon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label>
                      {searchType === "nik"
                        ? "Nomor Induk Kependudukan"
                        : searchType === "application"
                          ? "Nomor Permohonan"
                          : "Nomor Telepon"}
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder={
                          searchType === "nik"
                            ? "Masukkan NIK (16 digit)"
                            : searchType === "application"
                              ? "Contoh: IMB2024001234"
                              : "Contoh: 08123456789"
                        }
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button
                        onClick={handleSearch}
                        disabled={!searchValue || isLoading}
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4 mr-2" />
                        )}
                        Cari
                      </Button>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Demo:</strong> Gunakan NIK "3271234567890123" atau
                    nomor permohonan "IMB2024001234" untuk melihat contoh hasil
                    pencarian.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults !== null && (
            <div className="space-y-6">
              {searchResults.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Data Tidak Ditemukan
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Tidak ada permohonan yang ditemukan dengan kriteria
                      pencarian tersebut.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/apply">Ajukan Izin Baru</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                searchResults.map((application) => (
                  <Card key={application.id} className="gov-card-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{application.type}</span>
                            <Badge
                              className={getStatusColor(application.status)}
                            >
                              {(() => {
                                const Icon = getStatusIcon(application.status);
                                return <Icon className="w-3 h-3 mr-1" />;
                              })()}
                              {getStatusText(application.status)}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Nomor: {application.id}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>
                            Diajukan:{" "}
                            {new Date(
                              application.submitDate,
                            ).toLocaleDateString("id-ID")}
                          </p>
                          <p>
                            Target Selesai:{" "}
                            {new Date(
                              application.estimatedCompletion,
                            ).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {application.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${application.progress}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Tahap saat ini: {application.currentStep}
                        </p>
                      </div>

                      {/* Application Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Informasi Pemohon
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-muted-foreground">
                                Nama:
                              </span>{" "}
                              {application.applicantName}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Nomor:
                              </span>{" "}
                              {application.id}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Waktu Proses
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-muted-foreground">
                                Tanggal Ajuan:
                              </span>{" "}
                              {new Date(
                                application.submitDate,
                              ).toLocaleDateString("id-ID")}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Estimasi Selesai:
                              </span>{" "}
                              {new Date(
                                application.estimatedCompletion,
                              ).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      {application.timeline && (
                        <div>
                          <h4 className="font-semibold mb-4">Riwayat Proses</h4>
                          <div className="space-y-4">
                            {application.timeline.map((step, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-3"
                              >
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    step.status === "completed"
                                      ? "bg-status-approved text-white"
                                      : step.status === "processing"
                                        ? "bg-status-processing text-white"
                                        : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {step.status === "completed" ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : step.status === "processing" ? (
                                    <RefreshCw className="w-4 h-4" />
                                  ) : (
                                    <Clock className="w-4 h-4" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-medium">
                                      {step.title}
                                    </h5>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(step.date).toLocaleDateString(
                                        "id-ID",
                                      )}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Documents Status */}
                      {application.documents && (
                        <div>
                          <h4 className="font-semibold mb-3">Status Dokumen</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {application.documents.map((doc, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded"
                              >
                                <span className="text-sm">{doc.name}</span>
                                <Badge
                                  className={getStatusColor(doc.status)}
                                  variant="secondary"
                                >
                                  {getStatusText(doc.status)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Detail
                        </Button>
                        {application.status === "approved" && (
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Izin
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Hubungi CS
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Butuh Bantuan?</h3>
                <p className="text-muted-foreground mb-4">
                  Tim customer service kami siap membantu Anda 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    (0541) 123-4567
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    info@dpmptsp.samarindakota.go.id
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
