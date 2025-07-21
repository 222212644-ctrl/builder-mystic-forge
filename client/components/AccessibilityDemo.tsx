import React from "react";
import { useTheme } from "./ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Keyboard,
  Eye,
  Volume2,
} from "lucide-react";

export function AccessibilityDemo() {
  const { theme, actualTheme } = useTheme();

  const features = [
    {
      icon: actualTheme === "dark" ? Moon : Sun,
      title: "Dark Mode",
      description: "Mode gelap/terang untuk kenyamanan mata",
      status: "active",
      details: `Mode aktif: ${actualTheme === "dark" ? "Gelap" : "Terang"} (${theme === "system" ? "Otomatis" : "Manual"})`,
    },
    {
      icon: Keyboard,
      title: "Keyboard Navigation",
      description: "Navigasi penuh menggunakan keyboard",
      status: "active",
      details: "Tab, Enter, Escape, Arrow keys",
    },
    {
      icon: Eye,
      title: "Screen Reader Support",
      description: "Dukungan pembaca layar (NVDA, JAWS)",
      status: "active",
      details: "ARIA labels, semantic HTML, skip links",
    },
    {
      icon: Volume2,
      title: "Reduced Motion",
      description: "Animasi berkurang untuk sensitivitas gerak",
      status: "auto-detect",
      details: "Mengikuti preferensi sistem pengguna",
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Fitur Aksesibilitas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30"
          >
            <feature.icon className="w-5 h-5 mt-0.5 text-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{feature.title}</h3>
                <Badge
                  variant={
                    feature.status === "active" ? "default" : "secondary"
                  }
                >
                  {feature.status === "active" ? "Aktif" : "Auto"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {feature.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {feature.details}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Tips Aksesibilitas:
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>
              • Tekan{" "}
              <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">
                Tab
              </kbd>{" "}
              untuk navigasi
            </li>
            <li>
              • Tekan{" "}
              <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">
                Enter
              </kbd>{" "}
              untuk aktivasi
            </li>
            <li>
              • Tekan{" "}
              <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">
                Esc
              </kbd>{" "}
              untuk tutup menu
            </li>
            <li>• Gunakan pembaca layar untuk narasi</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
