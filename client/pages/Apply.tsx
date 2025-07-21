import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  FileText,
  User,
  Building2,
  MapPin,
  Upload,
  Info,
  AlertCircle,
  ChevronRight,
  Save,
  Send,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    nik: "",
    email: "",
    phone: "",
    address: "",

    // Business Info
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessDescription: "",

    // Documents
    documents: [],
  });

  const steps = [
    {
      number: 1,
      title: "Pilih Layanan",
      description: "Tentukan jenis izin yang dibutuhkan",
      icon: FileText,
    },
    {
      number: 2,
      title: "Data Pemohon",
      description: "Isi data diri pemohon",
      icon: User,
    },
    {
      number: 3,
      title: "Data Usaha",
      description: "Informasi detail usaha/proyek",
      icon: Building2,
    },
    {
      number: 4,
      title: "Upload Dokumen",
      description: "Unggah dokumen pendukung",
      icon: Upload,
    },
  ];

  const services = [
    {
      id: "imb",
      title: "Izin Mendirikan Bangunan (IMB)",
      description:
        "Permohonan izin untuk mendirikan bangunan baru atau renovasi",
      estimatedDays: "14 hari kerja",
      fee: "Berbayar",
      requirements: [
        "KTP Pemohon",
        "Surat Tanah/Sertifikat",
        "Gambar Denah",
        "Gambar Tampak",
        "Gambar Potongan",
        "Gambar Situasi",
      ],
    },
    {
      id: "siup",
      title: "Surat Izin Usaha Perdagangan (SIUP)",
      description: "Izin untuk menjalankan kegiatan usaha perdagangan",
      estimatedDays: "7 hari kerja",
      fee: "Gratis",
      requirements: [
        "KTP Penanggung Jawab",
        "Akta Pendirian Perusahaan",
        "NPWP Perusahaan",
        "Domisili Usaha",
        "Pas Foto 4x6",
      ],
    },
    {
      id: "tdp",
      title: "Tanda Daftar Perusahaan (TDP)",
      description: "Pendaftaran perusahaan untuk legalitas usaha",
      estimatedDays: "5 hari kerja",
      fee: "Berbayar",
      requirements: [
        "Akta Pendirian Perusahaan",
        "SK Pengesahan Kemenkumham",
        "NPWP Perusahaan",
        "KTP Pengurus",
        "Domisili Perusahaan",
      ],
    },
    {
      id: "ho",
      title: "Izin Gangguan (HO)",
      description: "Izin tempat usaha yang berpotensi menimbulkan gangguan",
      estimatedDays: "10 hari kerja",
      fee: "Berbayar",
      requirements: [
        "KTP Pemohon",
        "SIUP",
        "TDP",
        "Surat Keterangan Domisili",
        "Denah Lokasi",
        "Rekomendasi Lingkungan",
      ],
    },
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSelectedServiceDetails = () => {
    return services.find((s) => s.id === selectedService);
  };

  // Save Draft functionality
  const handleSaveDraft = () => {
    const draftData = {
      currentStep,
      selectedService,
      formData,
      uploadedFiles: uploadedFiles.map(f => f.name),
      savedAt: new Date().toISOString(),
    };

    // Save to localStorage as a simple solution
    localStorage.setItem('dpmptsp_draft', JSON.stringify(draftData));

    toast.success("Draft berhasil disimpan!", {
      description: "Data formulir Anda telah tersimpan di perangkat ini",
      duration: 3000,
    });
  };

  // File Upload functionality
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // Validate file size (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validFiles = newFiles.filter(file => {
        if (file.size > maxSize) {
          toast.error(`File ${file.name} terlalu besar (maksimal 5MB)`);
          return false;
        }
        return true;
      });

      // Validate file types
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const validTypeFiles = validFiles.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          toast.error(`Format file ${file.name} tidak didukung. Gunakan PDF, JPG, atau PNG`);
          return false;
        }
        return true;
      });

      setUploadedFiles(prev => [...prev, ...validTypeFiles]);

      if (validTypeFiles.length > 0) {
        toast.success(`${validTypeFiles.length} file berhasil diupload`, {
          description: "File dokumen pendukung telah ditambahkan",
          duration: 3000,
        });
      }
    }
  };

  // Remove uploaded file
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File telah dihapus");
  };

  // Submit Application functionality
  const handleSubmitApplication = async () => {
    if (!selectedService || !formData.fullName || !formData.email) {
      toast.error("Mohon lengkapi semua data yang diperlukan");
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      const applicationData = {
        applicationId: `PTSP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        service: selectedService,
        personalData: {
          fullName: formData.fullName,
          nik: formData.nik,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        businessData: {
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          businessDescription: formData.businessDescription,
        },
        documents: uploadedFiles.map(f => f.name),
        submittedAt: new Date().toISOString(),
        status: 'submitted',
      };

      // In a real app, this would be sent to your backend API
      localStorage.setItem('dpmptsp_last_application', JSON.stringify(applicationData));

      toast.success("Permohonan berhasil dikirim!", {
        description: `Nomor permohonan: ${applicationData.applicationId}`,
        duration: 5000,
      });

      // Reset form
      setCurrentStep(1);
      setSelectedService("");
      setFormData({
        fullName: "",
        nik: "",
        email: "",
        phone: "",
        address: "",
        businessName: "",
        businessType: "",
        businessAddress: "",
        businessDescription: "",
        documents: [],
      });
      setUploadedFiles([]);

    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        currentStep > step.number
                          ? "bg-status-approved text-white"
                          : currentStep === step.number
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        currentStep > step.number
                          ? "bg-status-approved"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                {(() => {
                  const IconComponent = steps[currentStep - 1].icon;
                  return (
                    <IconComponent className="w-6 h-6 mr-2 text-primary" />
                  );
                })()}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Pilih jenis layanan perizinan yang sesuai dengan kebutuhan
                      Anda. Pastikan Anda memahami persyaratan yang diperlukan.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedService === service.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{service.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              {service.estimatedDays}
                            </Badge>
                            <Badge
                              variant={
                                service.fee === "Gratis" ? "default" : "outline"
                              }
                            >
                              {service.fee}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {service.description}
                        </p>
                        <div>
                          <p className="text-sm font-medium mb-2">
                            Persyaratan:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {service.requirements
                              .slice(0, 3)
                              .map((req, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {req}
                                </Badge>
                              ))}
                            {service.requirements.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.requirements.length - 3} lainnya
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Personal Data */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Isi data diri Anda dengan lengkap dan benar sesuai dengan
                      dokumen resmi.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nama Lengkap *</Label>
                      <Input
                        id="fullName"
                        placeholder="Sesuai KTP"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nik">NIK *</Label>
                      <Input
                        id="nik"
                        placeholder="Nomor Induk Kependudukan"
                        value={formData.nik}
                        onChange={(e) =>
                          setFormData({ ...formData, nik: e.target.value })
                        }
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        placeholder="08xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      placeholder="Alamat sesuai KTP"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Business Data */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Lengkapi informasi tentang usaha atau proyek yang akan
                      diajukan perizinannya.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nama Usaha/Proyek *</Label>
                      <Input
                        id="businessName"
                        placeholder="Nama lengkap usaha"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            businessName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Jenis Usaha *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, businessType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis usaha" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="perdagangan">
                            Perdagangan
                          </SelectItem>
                          <SelectItem value="jasa">Jasa</SelectItem>
                          <SelectItem value="industri">Industri</SelectItem>
                          <SelectItem value="konstruksi">Konstruksi</SelectItem>
                          <SelectItem value="pertanian">Pertanian</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">
                      Alamat Usaha/Lokasi Proyek *
                    </Label>
                    <Textarea
                      id="businessAddress"
                      placeholder="Alamat lengkap lokasi usaha/proyek"
                      value={formData.businessAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessAddress: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">
                      Deskripsi Usaha/Proyek *
                    </Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Jelaskan secara detail tentang usaha/proyek yang akan dilakukan"
                      value={formData.businessDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Document Upload */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Unggah semua dokumen yang diperlukan. Pastikan file dalam
                      format PDF atau gambar dengan ukuran maksimal 5MB per
                      file.
                    </AlertDescription>
                  </Alert>

                  {selectedService && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">
                        Dokumen yang diperlukan untuk{" "}
                        {getSelectedServiceDetails()?.title}:
                      </h3>
                      <div className="grid gap-3">
                        {getSelectedServiceDetails()?.requirements.map(
                          (req, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-background rounded border"
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-primary" />
                                <span>{req}</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">
                      Drag & Drop File Anda
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      atau klik untuk memilih file
                    </p>
                    <Button variant="outline">Pilih File</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Format: PDF, JPG, PNG. Maksimal 5MB per file.
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      Saya menyatakan bahwa data dan dokumen yang saya berikan
                      adalah benar dan dapat dipertanggungjawabkan. Saya
                      bersedia dikenakan sanksi sesuai peraturan yang berlaku
                      jika terbukti memberikan keterangan palsu.
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Sebelumnya
                </Button>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Draft
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && !selectedService) ||
                        (currentStep === 2 &&
                          (!formData.fullName ||
                            !formData.nik ||
                            !formData.email ||
                            !formData.phone)) ||
                        (currentStep === 3 &&
                          (!formData.businessName || !formData.businessType))
                      }
                    >
                      Selanjutnya
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="bg-status-approved hover:bg-status-approved/90">
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Permohonan
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
