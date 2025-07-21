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
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>(
    {},
  );
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

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

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
    if (validateCurrentStep() && currentStep < 4) {
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

  // Validation functions
  const validateFullName = (name: string): string => {
    if (!name.trim()) return "Nama lengkap wajib diisi";
    if (name.trim().length < 3) return "Nama lengkap minimal 3 karakter";
    if (!/^[a-zA-Z\s.']+$/.test(name))
      return "Nama hanya boleh mengandung huruf, spasi, titik, dan apostrof";
    return "";
  };

  const validateNIK = (nik: string): string => {
    if (!nik.trim()) return "NIK wajib diisi";
    if (!/^\d{16}$/.test(nik)) return "NIK harus 16 digit angka";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email wajib diisi";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Format email tidak valid";
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return "Nomor telepon wajib diisi";
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return "Nomor telepon harus 10-15 digit";
    }
    if (!cleanPhone.startsWith("08") && !cleanPhone.startsWith("628")) {
      return "Nomor telepon harus dimulai dengan 08 atau +628";
    }
    return "";
  };

  const validateAddress = (address: string): string => {
    if (!address.trim()) return "Alamat wajib diisi";
    if (address.trim().length < 10) return "Alamat minimal 10 karakter";
    return "";
  };

  const validateBusinessName = (name: string): string => {
    if (!name.trim()) return "Nama usaha/proyek wajib diisi";
    if (name.trim().length < 3) return "Nama usaha/proyek minimal 3 karakter";
    return "";
  };

  const validateBusinessType = (type: string): string => {
    if (!type.trim()) return "Jenis usaha wajib dipilih";
    return "";
  };

  const validateBusinessAddress = (address: string): string => {
    if (!address.trim()) return "Alamat usaha/lokasi proyek wajib diisi";
    if (address.trim().length < 10)
      return "Alamat usaha/lokasi proyek minimal 10 karakter";
    return "";
  };

  const validateBusinessDescription = (description: string): string => {
    if (!description.trim()) return "Deskripsi usaha/proyek wajib diisi";
    if (description.trim().length < 20)
      return "Deskripsi usaha/proyek minimal 20 karakter";
    return "";
  };

  // Real-time validation handler
  const handleInputChange = (field: string, value: string) => {
    // Update form data
    setFormData({ ...formData, [field]: value });

    // Validate field
    let error = "";
    switch (field) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "nik":
        error = validateNIK(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      case "businessName":
        error = validateBusinessName(value);
        break;
      case "businessType":
        error = validateBusinessType(value);
        break;
      case "businessAddress":
        error = validateBusinessAddress(value);
        break;
      case "businessDescription":
        error = validateBusinessDescription(value);
        break;
    }

    // Update validation errors
    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Validate step before proceeding
  const validateCurrentStep = (): boolean => {
    if (currentStep === 2) {
      const errors = {
        fullName: validateFullName(formData.fullName),
        nik: validateNIK(formData.nik),
        email: validateEmail(formData.email),
        phone: validatePhone(formData.phone),
        address: validateAddress(formData.address),
      };
      setValidationErrors((prev) => ({ ...prev, ...errors }));
      return !Object.values(errors).some((error) => error !== "");
    }

    if (currentStep === 3) {
      const errors = {
        businessName: validateBusinessName(formData.businessName),
        businessType: validateBusinessType(formData.businessType),
        businessAddress: validateBusinessAddress(formData.businessAddress),
        businessDescription: validateBusinessDescription(
          formData.businessDescription,
        ),
      };
      setValidationErrors((prev) => ({ ...prev, ...errors }));
      return !Object.values(errors).some((error) => error !== "");
    }

    return true;
  };

  // Save Draft functionality
  const handleSaveDraft = () => {
    const draftData = {
      currentStep,
      selectedService,
      formData,
      uploadedFiles: Object.keys(uploadedFiles),
      savedAt: new Date().toISOString(),
    };

    // Save to localStorage as a simple solution
    localStorage.setItem("dpmptsp_draft", JSON.stringify(draftData));

    toast.success("Draft berhasil disimpan!", {
      description: "Data formulir Anda telah tersimpan di perangkat ini",
      duration: 3000,
    });
  };

  // File Upload functionality for specific document
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    documentKey: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error(`File terlalu besar (maksimal 5MB)`);
        return;
      }

      // Validate file types
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Format file tidak didukung. Gunakan PDF, JPG, atau PNG`);
        return;
      }

      setUploadedFiles((prev) => ({
        ...prev,
        [documentKey]: file,
      }));

      toast.success(`File berhasil diupload`, {
        description: `Dokumen ${documentKey} telah ditambahkan`,
        duration: 3000,
      });
    }
  };

  // Remove uploaded file
  const handleRemoveFile = (documentKey: string) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[documentKey];
      return newFiles;
    });
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
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      const applicationData = {
        applicationId: `PTSP-${new Date().getFullYear()}-${Math.floor(
          Math.random() * 10000,
        )
          .toString()
          .padStart(4, "0")}`,
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
        documents: Object.keys(uploadedFiles),
        submittedAt: new Date().toISOString(),
        status: "submitted",
      };

      // In a real app, this would be sent to your backend API
      localStorage.setItem(
        "dpmptsp_last_application",
        JSON.stringify(applicationData),
      );

      // Store NIK for easy status checking
      localStorage.setItem("dpmptsp_user_nik", formData.nik);

      toast.success("Permohonan berhasil dikirim!", {
        description: `Nomor permohonan: ${applicationData.applicationId}. Anda dapat mengecek status dengan NIK yang sama.`,
        duration: 5000,
      });

      // Show success message with option to check status
      setTimeout(() => {
        const shouldCheckStatus = window.confirm(
          "Permohonan berhasil dikirim! Apakah Anda ingin mengecek status permohonan sekarang?",
        );
        if (shouldCheckStatus) {
          window.location.href = "/status";
        }
      }, 2000);

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
      setUploadedFiles({});
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.",
      );
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
                          handleInputChange("fullName", e.target.value)
                        }
                        className={
                          validationErrors.fullName ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nik">NIK *</Label>
                      <Input
                        id="nik"
                        placeholder="Nomor Induk Kependudukan (16 digit)"
                        value={formData.nik}
                        onChange={(e) => {
                          // Only allow numbers and limit to 16 characters
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                          handleInputChange("nik", value);
                        }}
                        maxLength={16}
                        className={validationErrors.nik ? "border-red-500" : ""}
                      />
                      {validationErrors.nik && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.nik}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={
                          validationErrors.email ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        placeholder="08xxxxxxxxxx atau +628xxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => {
                          // Allow numbers, +, and - characters
                          const value = e.target.value.replace(
                            /[^0-9+\-]/g,
                            "",
                          );
                          handleInputChange("phone", value);
                        }}
                        className={
                          validationErrors.phone ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      placeholder="Alamat lengkap sesuai KTP"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className={
                        validationErrors.address ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.address}
                      </p>
                    )}
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
                        placeholder="Nama lengkap usaha atau proyek"
                        value={formData.businessName}
                        onChange={(e) =>
                          handleInputChange("businessName", e.target.value)
                        }
                        className={
                          validationErrors.businessName ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.businessName && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.businessName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Jenis Usaha *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          handleInputChange("businessType", value)
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
                      {validationErrors.businessType && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.businessType}
                        </p>
                      )}
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
                        handleInputChange("businessAddress", e.target.value)
                      }
                      className={
                        validationErrors.businessAddress ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.businessAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.businessAddress}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">
                      Deskripsi Usaha/Proyek *
                    </Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Jelaskan secara detail tentang usaha/proyek yang akan dilakukan (minimal 20 karakter)"
                      value={formData.businessDescription}
                      onChange={(e) =>
                        handleInputChange("businessDescription", e.target.value)
                      }
                      className={
                        validationErrors.businessDescription
                          ? "border-red-500"
                          : ""
                      }
                      rows={4}
                    />
                    {validationErrors.businessDescription && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.businessDescription}
                      </p>
                    )}
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
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">
                          Upload dokumen yang diperlukan untuk{" "}
                          {getSelectedServiceDetails()?.title}:
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload setiap dokumen secara terpisah. Format: PDF,
                          JPG, PNG. Maksimal 5MB per file.
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {getSelectedServiceDetails()?.requirements.map(
                          (req, index) => {
                            const documentKey = req
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "_");
                            const hasFile = uploadedFiles[documentKey];

                            return (
                              <div
                                key={index}
                                className={`p-4 border rounded-lg ${
                                  hasFile
                                    ? "border-status-approved bg-status-approved/5"
                                    : "border-border"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <FileText
                                      className={`w-5 h-5 ${
                                        hasFile
                                          ? "text-status-approved"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                    <div>
                                      <h4 className="font-medium">{req}</h4>
                                      {hasFile && (
                                        <p className="text-sm text-status-approved">
                                          ✓ File telah diupload
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {hasFile && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        handleRemoveFile(documentKey)
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      Hapus
                                    </Button>
                                  )}
                                </div>

                                {hasFile ? (
                                  <div className="flex items-center space-x-3 p-3 bg-background rounded border">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">
                                        {uploadedFiles[documentKey].name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {(
                                          uploadedFiles[documentKey].size /
                                          1024 /
                                          1024
                                        ).toFixed(2)}{" "}
                                        MB
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground mb-3">
                                      Pilih file untuk {req}
                                    </p>
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) =>
                                        handleFileUpload(e, documentKey)
                                      }
                                      className="hidden"
                                      id={`file-upload-${documentKey}`}
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        document
                                          .getElementById(
                                            `file-upload-${documentKey}`,
                                          )
                                          ?.click()
                                      }
                                    >
                                      <Upload className="w-4 h-4 mr-2" />
                                      Pilih File
                                    </Button>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}

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
                            !formData.phone ||
                            !formData.address ||
                            Object.keys(validationErrors).some(
                              (key) =>
                                [
                                  "fullName",
                                  "nik",
                                  "email",
                                  "phone",
                                  "address",
                                ].includes(key) && validationErrors[key],
                            ))) ||
                        (currentStep === 3 &&
                          (!formData.businessName ||
                            !formData.businessType ||
                            !formData.businessAddress ||
                            !formData.businessDescription ||
                            Object.keys(validationErrors).some(
                              (key) =>
                                [
                                  "businessName",
                                  "businessType",
                                  "businessAddress",
                                  "businessDescription",
                                ].includes(key) && validationErrors[key],
                            )))
                      }
                    >
                      Selanjutnya
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-status-approved hover:bg-status-approved/90"
                      onClick={handleSubmitApplication}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Kirim Permohonan
                        </>
                      )}
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
