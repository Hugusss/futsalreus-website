import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Shirt, Wind } from "lucide-react";

const products = [
  {
    name: "Bufanda del Club",
    price: "15€",
    icon: Wind,
    description: "Bufanda oficial amb els colors del club",
  },
  {
    name: "Equipació Oficial",
    price: "45€",
    icon: Shirt,
    description: "Samarreta i pantalons de competició",
  },
  {
    name: "Dessuadora",
    price: "35€",
    icon: ShoppingBag,
    description: "Dessuadora amb caputxa i escut brodat",
  },
];

export function Merchandising() {
  return (
    <section id="botiga" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            BOTIGA OFICIAL
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Merchandising
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Porta els colors del Montsant amb orgull. Tots els beneficis van destinats al club.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="border-none shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 group overflow-hidden"
            >
              <div className="bg-gradient-hero h-40 flex items-center justify-center">
                <product.icon 
                  className="text-primary-foreground/80 group-hover:scale-110 transition-transform" 
                  size={64} 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{product.name}</h3>
                  <span className="text-lg font-black text-primary">{product.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Més informació
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vols fer una comanda o tens preguntes?
          </p>
          <Button variant="cta" asChild>
            <a href="#contacte">Contacta'ns</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
