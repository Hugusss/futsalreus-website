import { SubPage } from "@/components/SubPage";
import { BookOpen, Heart, Users, MessageCircle, Shield } from "lucide-react";
import { usePageTitle } from "@/hooks/use-page-title";
import teamMethod from "@/assets/metodologia/team-train.jpg";
import type { Language } from "@/App";

interface MetodologiaProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const texts = {
  ca: {
    title: "Metodologia",
    subtitle: "El nostre projecte educatiu i esportiu",
    back: "Tornar a l'inici",
    missionTitle: "Missió",
    mission:
      "Fomentar el futbol escolar i el desenvolupament personal i esportiu dels nostres jugadors i jugadores en el futbol sala, mitjançant l'educació en l'esport i en valors.",
    visionTitle: "Visió",
    vision:
      "Ser un club que competeixi al màxim nivell, reconegut per portar sempre els nostres valors per davant com a eina principal per impulsar el nostre èxit. Així mateix, que els jugadors/es siguin el més feliços possible practicant un esport d'equip com és el futsal.",
    valuesTitle: "Valors fundacionals",
    values: [
      "Educació",
      "Inclusió",
      "Treball en equip",
      "Superació",
      "Esforç",
      "Amistat",
      "Igualtat d'oportunitats",
      "Confiança",
      "Respecte",
    ],
    motto: "Som club, som futsal, som família i amics.",
    howTitle: "Com actuem?",
    howItems: [
      {
        icon: Shield,
        title: "Respecte",
        text: "Es vetllarà activament pel respecte entre companys i/o qualsevol altre membre del club. Tampoc es tolerarà cap falta de respecte de cap tipus i a cap persona independentment del seu grau de vinculació al club.",
      },
      {
        icon: Heart,
        title: "Gestió emocional",
        text: "S'ajudarà als nens en la regulació i gestió emocional de les situacions que es produeixen al voltant de l'esport, per veure l'error com un aprenentatge i l'èxit com un pas més en el camí del progrés personal i col·lectiu.",
      },
      {
        icon: MessageCircle,
        title: "Comunicació oberta",
        text: "Es fomentarà una relació propera i constant entre les famílies, els entrenadors i la junta directiva. Aquesta col·laboració es basarà en el diàleg obert, la comunicació directa i l'ús de canals clars i fàcilment accessibles.",
      },
      {
        icon: Users,
        title: "Equip i comunitat",
        text: "Es buscaran espais de trobada i convivència per enfortir el sentiment de pertinença al club.",
      },
    ],
    dedicationTitle: "Dedicació principal",
    dedication:
      "La principal dedicació s'invertirà a iniciar el club amb almenys un equip \"Sènior\" amb l'objectiu d'expandir-se a totes les categories posteriors al futbol escolar. Totes aquelles altres categories que s'obrin juntament amb el primer equip o posteriorment tindran el mateix pes i atenció.",
  },
  es: {
    title: "Metodología",
    subtitle: "Nuestro proyecto educativo y deportivo",
    back: "Volver al inicio",
    missionTitle: "Misión",
    mission:
      "Fomentar el fútbol escolar y el desarrollo personal y deportivo de nuestros jugadores y jugadoras en el fútbol sala, mediante la educación en el deporte y en valores.",
    visionTitle: "Visión",
    vision:
      "Ser un club que compita al máximo nivel, reconocido por llevar siempre nuestros valores por delante como herramienta principal para propulsar nuestro éxito. Asimismo, que los jugadores/as sean lo más felices posible practicando un deporte en equipo como es el futsal.",
    valuesTitle: "Valores fundacionales",
    values: [
      "Educación",
      "Inclusión",
      "Trabajo en equipo",
      "Superación",
      "Esfuerzo",
      "Amistad",
      "Igualdad de oportunidades",
      "Confianza",
      "Respeto",
    ],
    motto: "Somos club, somos futsal, somos familia y amigos.",
    howTitle: "¿Cómo actuamos?",
    howItems: [
      {
        icon: Shield,
        title: "Respeto",
        text: "Se velará activamente por el respeto entre compañeros y/o cualquier otro miembro del club. Tampoco se tolerará ninguna falta de respeto de ningún tipo y a ninguna persona independientemente de su grado de vinculación al club.",
      },
      {
        icon: Heart,
        title: "Gestión emocional",
        text: "Se apoyará a los niños en la regulación y gestión emocional de las situaciones que se producen en torno al deporte, para ver el error como un aprendizaje y el éxito como un paso más en el camino del progreso personal y colectivo.",
      },
      {
        icon: MessageCircle,
        title: "Comunicación abierta",
        text: "Se fomentará una relación cercana y constante entre las familias, los entrenadores y la junta directiva. Esta colaboración se basará en el diálogo abierto, la comunicación directa y el uso de canales claros y fácilmente accesibles.",
      },
      {
        icon: Users,
        title: "Equipo y comunidad",
        text: "Se buscarán espacios de encuentro y convivencia para fortalecer el sentimiento de pertenencia al club.",
      },
    ],
    dedicationTitle: "Dedicación principal",
    dedication:
      "La principal dedicación se invertirá en iniciar el club con al menos un equipo \"Senior\" con el objetivo de expandirse a todas las categorías posteriores al fútbol escolar. Todas aquellas otras categorías que se abran junto con el primer equipo o posteriormente tendrán el mismo peso y atención.",
  },
};

const Metodologia = ({ language, onLanguageChange }: MetodologiaProps) => {
  const t = texts[language];
  usePageTitle(t.title);

  return (
    <SubPage
      language={language}
      onLanguageChange={onLanguageChange}
      icon={BookOpen}
      title={t.title}
      subtitle={t.subtitle}
      back={t.back}
    >

          <article className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {/* Motto */}
              <div className="text-center py-6 border-y border-border">
                <p className="text-xl md:text-2xl font-bold text-primary italic">
                  "{t.motto}"
                </p>
              </div>

              {/* Mission */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t.missionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.mission}
                </p>
              </section>

              {/* Vision */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t.visionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.vision}
                </p>
              </section>

              {/* Values */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {t.valuesTitle}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {t.values.map((val) => (
                    <span
                      key={val}
                      className="px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </section>

              {/* Dedication */}
              <section className="bg-muted/50 rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t.dedicationTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.dedication}
                </p>
              </section>

              {/* How we act */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                  {t.howTitle}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {t.howItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-card border border-border shadow-card"
                    >
                      <item.icon className="text-primary mb-3" size={28} />
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <img
                src={teamMethod}
                alt={language === "ca" ? "Entrenament de l'equip" : "Entrenamiento del equipo"}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </article>
    </SubPage>
  );
};

export default Metodologia;
