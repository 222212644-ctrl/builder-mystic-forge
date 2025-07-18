import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
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
  PieChart as PieChartIcon,
  Activity,
  RefreshCw,
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

export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [chartType, setChartType] = useState("monthly");

  // Mock data for various statistics
  const monthlyData = [
    { month: "Jan", izinMasuk: 156, izinSelesai: 142, rata2Hari: 12.5 },
    { month: "Feb", izinMasuk: 189, izinSelesai: 178, rata2Hari: 11.8 },
    { month: "Mar", izinMasuk: 234, izinSelesai: 221, rata2Hari: 10.2 },
    { month: "Apr", izinMasuk: 198, izinSelesai: 201, rata2Hari: 9.8 },
    { month: "May", izinMasuk: 267, izinSelesai: 245, rata2Hari: 9.1 },
    { month: "Jun", izinMasuk: 223, izinSelesai: 234, rata2Hari: 8.9 },
    { month: "Jul", izinMasuk: 289, izinSelesai: 267, rata2Hari: 8.5 },
    { month: "Aug", izinMasuk: 301, izinSelesai: 289, rata2Hari: 8.2 },
    { month: "Sep", izinMasuk: 278, izinSelesai: 298, rata2Hari: 7.9 },
    { month: "Oct", izinMasuk: 245, izinSelesai: 267, rata2Hari: 7.8 },
    { month: "Nov", izinMasuk: 189, izinSelesai: 201, rata2Hari: 8.1 },
    { month: "Dec", izinMasuk: 156, izinSelesai: 178, rata2Hari: 8.3 },
  ];

  const serviceTypeData = [
    { name: "IMB", value: 1245, color: "#3b82f6" },
    { name: "SIUP", value: 987, color: "#10b981" },
    { name: "TDP", value: 654, color: "#f59e0b" },
    { name: "HO", value: 432, color: "#ef4444" },
    { name: "IUI", value: 234, color: "#8b5cf6" },
    { name: "Lainnya", value: 189, color: "#6b7280" },
  ];

  const satisfactionData = [
    { kategori: "Sangat Puas", jumlah: 1456, persentase: 67 },
    { kategori: "Puas", jumlah: 478, persentase: 22 },
    { kategori: "Cukup", jumlah: 156, persentase: 7 },
    { kategori: "Kurang", jumlah: 67, persentase: 3 },
    { kategori: "Sangat Kurang", jumlah: 23, persentase: 1 },
  ];

  const dailyTrafficData = [
    { hari: "Sen", pengunjung: 245, permohonan: 34 },
    { hari: "Sel", pengunjung: 189, permohonan: 28 },
    { hari: "Rab", pengunjung: 267, permohonan: 42 },
    { hari: "Kam", pengunjung: 234, permohonan: 38 },
    { hari: "Jum", pengunjung: 198, permohonan: 31 },
    { hari: "Sab", pengunjung: 123, permohonan: 15 },
    { hari: "Min", pengunjung: 89, permohonan: 12 },
  ];

  const keyMetrics = [
    {
      title: "Total Permohonan 2024",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Rata-rata Waktu Proses",
      value: "8.9 hari",
      change: "-2.1 hari",
      trend: "down",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Tingkat Penyelesaian",
      value: "94.2%",
      change: "+3.1%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Kepuasan Masyarakat",
      value: "89.4%",
      change: "+1.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

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
                    className={`w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center ${metric.color.replace(
                      "text-",
                      "bg-",
                    )}`}
                  >
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Permit Trends */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Tren Bulanan Permohonan Izin
              </CardTitle>
              <CardDescription>
                Perbandingan permohonan masuk vs selesai per bulan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="izinMasuk" fill="#3b82f6" name="Izin Masuk" />
                  <Bar
                    dataKey="izinSelesai"
                    fill="#10b981"
                    name="Izin Selesai"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Type Distribution */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2 text-primary" />
                Distribusi Jenis Layanan
              </CardTitle>
              <CardDescription>
                Proporsi pengajuan berdasarkan jenis izin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Processing Time Trend */}
        <Card className="gov-card-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Tren Waktu Pemrosesan
            </CardTitle>
            <CardDescription>
              Rata-rata waktu pemrosesan izin dalam hari
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rata2Hari"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                  name="Rata-rata Hari"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Traffic and Satisfaction */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Traffic */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle>Aktivitas Harian</CardTitle>
              <CardDescription>
                Pengunjung website dan permohonan per hari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hari" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pengunjung"
                    stroke="#3b82f6"
                    name="Pengunjung"
                  />
                  <Line
                    type="monotone"
                    dataKey="permohonan"
                    stroke="#ef4444"
                    name="Permohonan"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Satisfaction Levels */}
          <Card className="gov-card-shadow">
            <CardHeader>
              <CardTitle>Tingkat Kepuasan</CardTitle>
              <CardDescription>
                Hasil survei kepuasan masyarakat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {item.kategori}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.jumlah} ({item.persentase}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.persentase}%` }}
                      />
                    </div>
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
