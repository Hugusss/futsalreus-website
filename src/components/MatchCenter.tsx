import { useState } from "react";
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Language = "ca" | "es";

interface Match {
  id: number;
  date: string;
  time: string;
  rival: string;
  location: string;
  isHome: boolean;
  month: number;
  year: number;
}

const matches: Match[] = [
  // Octubre 2024
  { id: 1, date: "5 Octubre 2024", time: "18:00h", rival: "Amposta FS", location: "Pavelló Municipal de Reus", isHome: true, month: 9, year: 2024 },
  { id: 2, date: "12 Octubre 2024", time: "19:30h", rival: "Tortosa FC", location: "Pavelló Tortosa", isHome: false, month: 9, year: 2024 },
  { id: 3, date: "26 Octubre 2024", time: "17:00h", rival: "Roquetes FS", location: "Pavelló Municipal de Reus", isHome: true, month: 9, year: 2024 },
  // Novembre 2024
  { id: 4, date: "2 Novembre 2024", time: "18:00h", rival: "El Vendrell", location: "Pavelló Vendrell", isHome: false, month: 10, year: 2024 },
  { id: 5, date: "15 Novembre 2024", time: "18:00h", rival: "Valls FS", location: "Pavelló Valls", isHome: false, month: 10, year: 2024 },
  { id: 6, date: "23 Novembre 2024", time: "19:00h", rival: "Mont-roig FS", location: "Pavelló Municipal de Reus", isHome: true, month: 10, year: 2024 },
  // Desembre 2024
  { id: 7, date: "7 Desembre 2024", time: "17:30h", rival: "Constantí FC", location: "Pavelló Municipal de Reus", isHome: true, month: 11, year: 2024 },
  { id: 8, date: "14 Desembre 2024", time: "18:00h", rival: "La Selva FS", location: "Pavelló La Selva", isHome: false, month: 11, year: 2024 },
  { id: 9, date: "21 Desembre 2024", time: "18:00h", rival: "FS Salou", location: "Pavelló Municipal de Reus", isHome: true, month: 11, year: 2024 },
  { id: 10, date: "28 Desembre 2024", time: "19:00h", rival: "Tarragona FS", location: "Pavelló Tarragona", isHome: false, month: 11, year: 2024 },
  // Gener 2025
  { id: 11, date: "4 Gener 2025", time: "17:30h", rival: "Cambrils FC", location: "Pavelló Municipal de Reus", isHome: true, month: 0, year: 2025 },
  { id: 12, date: "11 Gener 2025", time: "18:00h", rival: "Vila-seca FS", location: "Pavelló Vila-seca", isHome: false, month: 0, year: 2025 },
  { id: 13, date: "18 Gener 2025", time: "19:00h", rival: "Alcover FS", location: "Pavelló Municipal de Reus", isHome: true, month: 0, year: 2025 },
  { id: 14, date: "25 Gener 2025", time: "18:30h", rival: "Riudoms FC", location: "Pavelló Riudoms", isHome: false, month: 0, year: 2025 },
  // Febrer 2025
  { id: 15, date: "1 Febrer 2025", time: "18:00h", rival: "Amposta FS", location: "Pavelló Amposta", isHome: false, month: 1, year: 2025 },
  { id: 16, date: "8 Febrer 2025", time: "19:00h", rival: "Roda de Barà", location: "Pavelló Municipal de Reus", isHome: true, month: 1, year: 2025 },
  { id: 17, date: "15 Febrer 2025", time: "17:30h", rival: "Tortosa FC", location: "Pavelló Municipal de Reus", isHome: true, month: 1, year: 2025 },
  { id: 18, date: "22 Febrer 2025", time: "18:00h", rival: "Roquetes FS", location: "Pavelló Roquetes", isHome: false, month: 1, year: 2025 },
  // Març 2025
  { id: 19, date: "1 Març 2025", time: "18:00h", rival: "El Vendrell", location: "Pavelló Municipal de Reus", isHome: true, month: 2, year: 2025 },
  { id: 20, date: "8 Març 2025", time: "19:30h", rival: "Valls FS", location: "Pavelló Municipal de Reus", isHome: true, month: 2, year: 2025 },
  { id: 21, date: "15 Març 2025", time: "18:00h", rival: "Mont-roig FS", location: "Pavelló Mont-roig", isHome: false, month: 2, year: 2025 },
  { id: 22, date: "29 Març 2025", time: "17:00h", rival: "Constantí FC", location: "Pavelló Constantí", isHome: false, month: 2, year: 2025 },
];

const monthNames = {
  ca: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
  es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
};

interface MatchCenterProps {
  language?: Language;
}

export function MatchCenter({ language = "ca" }: MatchCenterProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const filteredMatches = matches.filter(
    (match) => match.month === currentMonth && match.year === currentYear
  );

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const texts = {
    ca: {
      title: "Centre de Partits",
      nextMatch: "CALENDARI DE PARTITS",
      noMatches: "No hi ha partits programats aquest mes",
      local: "Local",
      visitant: "Visitant",
      today: "Avui",
    },
    es: {
      title: "Centro de Partidos",
      nextMatch: "CALENDARIO DE PARTIDOS",
      noMatches: "No hay partidos programados este mes",
      local: "Local",
      visitant: "Visitante",
      today: "Hoy",
    },
  };

  const t = texts[language];

  return (
    <section id="partits" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            {t.nextMatch}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            {t.title}
          </h2>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMonth}
            className="rounded-full"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold text-foreground min-w-[200px] text-center">
              {monthNames[language][currentMonth]} {currentYear}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMonth}
            className="rounded-full"
          >
            <ChevronRight size={20} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="ml-2 text-primary font-semibold"
          >
            {t.today}
          </Button>
        </div>

        {/* Matches Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <Card key={match.id} className="border-none shadow-elevated overflow-hidden hover:shadow-glow transition-shadow">
                <div className="bg-gradient-hero h-1" />
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    {/* Home Team */}
                    <div className="text-center flex-1">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg font-black text-primary">CFM</span>
                      </div>
                      <p className="font-bold text-foreground text-sm">Montsant Reus</p>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {match.isHome ? t.local : t.visitant}
                      </span>
                    </div>

                    {/* VS Badge & Time */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-glow">
                        <span className="text-sm font-black text-accent-foreground">VS</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={12} />
                        <span className="text-xs font-medium">{match.date}</span>
                      </div>
                      <span className="text-base font-bold text-primary">{match.time}</span>
                    </div>

                    {/* Away Team */}
                    <div className="text-center flex-1">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-2">
                        <Users className="text-muted-foreground" size={24} />
                      </div>
                      <p className="font-bold text-foreground text-sm">{match.rival}</p>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {match.isHome ? t.visitant : t.local}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <MapPin size={14} className="text-primary" />
                      <span className="text-sm font-medium">{match.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-none shadow-card">
              <CardContent className="p-8 text-center">
                <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium">{t.noMatches}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
