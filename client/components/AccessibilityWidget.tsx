import React, { useState } from "react";
import {
  Settings,
  X,
  Moon,
  Sun,
  Monitor,
  Type,
  Eye,
  Volume2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "./ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [announcement, setAnnouncement] = useState("");
  const { theme, setTheme, actualTheme } = useTheme();

  // Announce changes to screen readers
  const announce = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 1000);
  };

  // Apply font size changes
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    if (fontSize !== 100) {
      announce(`Ukuran teks diubah ke ${fontSize}%`);
    }
  }, [fontSize]);

  // Apply contrast changes
  React.useEffect(() => {
    document.documentElement.style.filter =
      contrast !== 100 ? `contrast(${contrast}%)` : "";
    if (contrast !== 100) {
      announce(`Kontras diubah ke ${contrast}%`);
    }
  }, [contrast]);

  // Announce theme changes
  React.useEffect(() => {
    announce(
      `Tema berubah ke mode ${actualTheme === "dark" ? "gelap" : "terang"}`,
    );
  }, [actualTheme]);

  const resetSettings = () => {
    setFontSize(100);
    setContrast(100);
    document.documentElement.style.fontSize = "";
    document.documentElement.style.filter = "";
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A to toggle accessibility widget
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      // Escape to close widget
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>

      {/* Floating Accessibility Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={
            isOpen
              ? "Tutup pengaturan aksesibilitas"
              : "Buka pengaturan aksesibilitas"
          }
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Settings className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80">
          <Card className="shadow-xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Aksesibilitas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Theme Selection */}
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  Mode Tema
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex flex-col items-center p-3 h-auto"
                    aria-label="Mode terang"
                  >
                    <Sun className="h-4 w-4 mb-1" />
                    <span className="text-xs">Terang</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex flex-col items-center p-3 h-auto"
                    aria-label="Mode gelap"
                  >
                    <Moon className="h-4 w-4 mb-1" />
                    <span className="text-xs">Gelap</span>
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="flex flex-col items-center p-3 h-auto"
                    aria-label="Mengikuti sistem"
                  >
                    <Monitor className="h-4 w-4 mb-1" />
                    <span className="text-xs">Auto</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Aktif: {actualTheme === "dark" ? "Gelap" : "Terang"}
                </p>
              </div>

              {/* Font Size Control */}
              <div>
                <h4 className="font-medium mb-3 flex items-center justify-between">
                  <span className="flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    Ukuran Teks
                  </span>
                  <Badge variant="secondary">{fontSize}%</Badge>
                </h4>
                <div className="space-y-3">
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    max={150}
                    min={75}
                    step={5}
                    className="w-full"
                    aria-label="Atur ukuran teks"
                  />
                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFontSize(Math.max(75, fontSize - 10))}
                      disabled={fontSize <= 75}
                      aria-label="Perkecil teks"
                    >
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFontSize(100)}
                      aria-label="Reset ukuran teks"
                    >
                      Normal
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                      disabled={fontSize >= 150}
                      aria-label="Perbesar teks"
                    >
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contrast Control */}
              <div>
                <h4 className="font-medium mb-3 flex items-center justify-between">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Kontras
                  </span>
                  <Badge variant="secondary">{contrast}%</Badge>
                </h4>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  max={150}
                  min={50}
                  step={5}
                  className="w-full"
                  aria-label="Atur kontras"
                />
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSettings}
                    className="flex items-center"
                    aria-label="Reset semua pengaturan aksesibilitas"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Volume2 className="h-3 w-3 mr-1" />
                    NVDA/JAWS Ready
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                <strong>Shortcut:</strong>
                <br />
                Alt + A = Buka widget ini
                <br />
                Tab = Navigasi elemen
                <br />
                Esc = Tutup menu
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
