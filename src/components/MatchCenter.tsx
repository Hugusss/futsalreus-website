import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const nextMatch = {
  date: "21 Desembre 2024",
  time: "18:00h",
  rival: "FS Salou",
  location: "Pavelló Municipal de Reus",
  isHome: true,
};

export function MatchCenter() {
  return (
    <section id="partits" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.05)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4 animate-scale-in">
            PROPER PARTIT
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            Centre de Partits
          </h2>
        </div>

        <Card className="max-w-2xl mx-auto border-none shadow-elevated overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
          <div className="bg-gradient-hero h-2 group-hover:h-3 transition-all duration-300" />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Home Team */}
              <div className="text-center flex-1 group/team">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover/team:scale-110 group-hover/team:bg-primary/20 transition-all duration-300">
                  <span className="text-2xl font-black text-primary">CFM</span>
                </div>
                <p className="font-bold text-foreground">Montsant Reus</p>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Local</span>
              </div>

              {/* VS Badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-glow animate-glow-pulse">
                  <span className="text-xl font-black text-accent-foreground">VS</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={14} className="animate-pulse" />
                  <span className="text-sm font-medium">{nextMatch.date}</span>
                </div>
                <span className="text-lg font-bold text-primary">{nextMatch.time}</span>
              </div>

              {/* Away Team */}
              <div className="text-center flex-1 group/team">
                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-3 group-hover/team:scale-110 transition-all duration-300">
                  <Users className="text-muted-foreground" size={32} />
                </div>
                <p className="font-bold text-foreground">{nextMatch.rival}</p>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Visitant</span>
              </div>
            </div>

            {/* Location */}
            <div className="mt-8 pt-6 border-t border-border group/loc">
              <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover/loc:text-primary transition-colors duration-300">
                <MapPin size={18} className="text-primary" />
                <span className="font-medium">{nextMatch.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
