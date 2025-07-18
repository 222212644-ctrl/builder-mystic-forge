import { useState } from "react";
import {
  TrendingUp,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Calendar,
  Download,
  Filter,
  BarChart3,
  Activity,
  RefreshCw,
  Award,
  Building2,
  ShoppingCart,
  Factory,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");

  const keyMetrics = [
    {
      title: "Total Permohonan 2024",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Rata-rata Waktu Proses",
      value: "8.9 hari",
      change: "-2.1 hari",
      trend: "down",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tingkat Penyelesaian",
      value: "94.2%",
      change: "+3.1%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Kepuasan Masyarakat",
      value: "89.4%",
      change: "+1.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const monthlyStats = [
    { month: "Jan", applications: 156, completed: 142 },
    { month: "Feb", applications: 189, completed: 178 },
    { month: "Mar", applications: 234, completed: 221 },
    { month: "Apr", applications: 198, completed: 201 },
    { month: "May", applications: 267, completed: 245 },
    { month: "Jun", applications: 223, completed: 234 },
    { month: "Jul", applications: 289, completed: 267 },
    { month: "Aug", applications: 301, completed: 289 },
    { month: "Sep", applications: 278, completed: 298 },
    { month: "Oct", applications: 245, completed: 267 },
    { month: "Nov", applications: 189, completed: 201 },
    { month: "Dec", applications: 156, completed: 178 },
  ];

  const serviceTypes = [
    {
      name: "Izin Mendirikan Bangunan",
      count: 1245,
      percentage: 34.7,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      name: "Surat Izin Usaha Perdagangan",
      count: 987,
      percentage: 27.5,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      name: "Tanda Daftar Perusahaan",
      count: 654,
      percentage: 18.2,
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      name: "Izin Gangguan",
      count: 432,
      percentage: 12.0,
      icon: Award,
      color: "bg-red-500",
    },
    {
      name: "Izin Usaha Industri",
      count: 234,
      percentage: 6.5,
      icon: Factory,
      color: "bg-purple-500",
    },
    {
      name: "Lainnya",
      count: 37,
      percentage: 1.1,
      icon: FileText,
      color: "bg-gray-500",
    },
  ];

  const processingTimes = [
    { service: "SIUP", target: 7, actual: 6.1, status: "excellent" },
    { service: "TDP", target: 5, actual: 4.8, status: "excellent" },
    { service: "HO", target: 10, actual: 9.2, status: "good" },
    { service: "IMB", target: 14, actual: 12.3, status: "good" },
    { service: "IUI", target: 15, actual: 16.7, status: "needs_improvement" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100";
      case "good":
        return "text-blue-600 bg-blue-100";
      case "needs_improvement":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "Sangat Baik";
      case "good":
        return "Baik";
      case "needs_improvement":
        return "Perlu Perbaikan";
      default:
        return "Normal";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Statistik Layanan
            </h1>
            <p className="text-muted-foreground">
              Data dan analisis kinerja layanan perizinan DPMPTSP Kota Samarinda
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Pilih Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="gov-card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp
                        className={`w-3 h-3 mr-1 ${
                          metric.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          metric.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${metric.bgColor}`}
                  >
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Performance */}
        <Card className="gov-card-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Kinerja Bulanan {selectedPeriod}
            </CardTitle>
            <CardDescription>
              Perbandingan permohonan masuk vs selesai per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{stat.month}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Masuk: {stat.applications}</span>
                      <span>Selesai: {stat.completed}</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={(stat.completed / stat.applications) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-muted-foreground">
                    {((stat.completed / stat.applications) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Type Distribution and Processing Times */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Service Types */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle>Distribusi Jenis Layanan</CardTitle>
              <CardDescription>
                Proporsi pengajuan berdasarkan jenis izin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceTypes.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${service.color}`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          {service.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {service.count} ({service.percentage}%)
                        </span>
                      </div>
                      <Progress value={service.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Processing Times */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle>Waktu Pemrosesan</CardTitle>
              <CardDescription>
                Perbandingan target vs aktual waktu proses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingTimes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded"
                  >
                    <div>
                      <p className="font-medium">{item.service}</p>
                      <p className="text-sm text-muted-foreground">
                        Target: {item.target} hari | Aktual: {item.actual} hari
                      </p>
                    </div>
                    <Badge
                      className={getStatusColor(item.status)}
                      variant="secondary"
                    >
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics Table */}
        <Card className="gov-card-shadow mb-8">
          <CardHeader>
            <CardTitle>Statistik Detail per Jenis Layanan</CardTitle>
            <CardDescription>
              Data lengkap permohonan, penyelesaian, dan waktu proses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Jenis Layanan
                    </th>
                    <th className="text-center py-3 px-4 font-medium">
                      Permohonan
                    </th>
                    <th className="text-center py-3 px-4 font-medium">
                      Selesai
                    </th>
                    <th className="text-center py-3 px-4 font-medium">
                      Proses
                    </th>
                    <th className="text-center py-3 px-4 font-medium">
                      Rata² Hari
                    </th>
                    <th className="text-center py-3 px-4 font-medium">
                      Tingkat Selesai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      Izin Mendirikan Bangunan
                    </td>
                    <td className="text-center py-3 px-4">1,245</td>
                    <td className="text-center py-3 px-4">1,178</td>
                    <td className="text-center py-3 px-4">67</td>
                    <td className="text-center py-3 px-4">12.3</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">
                        94.6%
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      Surat Izin Usaha Perdagangan
                    </td>
                    <td className="text-center py-3 px-4">987</td>
                    <td className="text-center py-3 px-4">967</td>
                    <td className="text-center py-3 px-4">20</td>
                    <td className="text-center py-3 px-4">6.1</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">
                        98.0%
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      Tanda Daftar Perusahaan
                    </td>
                    <td className="text-center py-3 px-4">654</td>
                    <td className="text-center py-3 px-4">634</td>
                    <td className="text-center py-3 px-4">20</td>
                    <td className="text-center py-3 px-4">4.8</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">
                        96.9%
                      </Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Izin Gangguan</td>
                    <td className="text-center py-3 px-4">432</td>
                    <td className="text-center py-3 px-4">398</td>
                    <td className="text-center py-3 px-4">34</td>
                    <td className="text-center py-3 px-4">9.2</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        92.1%
                      </Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">
                      Izin Usaha Industri
                    </td>
                    <td className="text-center py-3 px-4">234</td>
                    <td className="text-center py-3 px-4">201</td>
                    <td className="text-center py-3 px-4">33</td>
                    <td className="text-center py-3 px-4">16.7</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        85.9%
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="gov-card-shadow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Peningkatan Efisiensi</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">15%</p>
              <p className="text-sm text-muted-foreground">
                Dibanding tahun lalu
              </p>
            </CardContent>
          </Card>

          <Card className="gov-card-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Pengguna Aktif</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">1,247</p>
              <p className="text-sm text-muted-foreground">Per bulan ini</p>
            </CardContent>
          </Card>

          <Card className="gov-card-shadow">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Rating Layanan</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">4.7/5</p>
              <p className="text-sm text-muted-foreground">Dari 2,156 review</p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                Butuh Data Lebih Detail?
              </h3>
              <p className="text-muted-foreground mb-6">
                Dapatkan laporan statistik lengkap dan analisis mendalam tentang
                kinerja layanan kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download Laporan
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwalkan Presentasi
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
