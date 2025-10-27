import { useState } from "react";
import { Zap, TrendingUp, Battery, Gauge } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/FilterBar";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { energyData } from "@/lib/energyData";
import { filterData, getFilteredProduction, getFilteredConsumption } from "@/lib/filterUtils";

const Production = () => {
  const [selectedYear, setSelectedYear] = useState("2017");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");

  const filteredData = filterData(energyData, selectedYear, selectedRegion, selectedTech);

  const totalProduction = filteredData.reduce(
    (sum, f) => sum + getFilteredProduction(f, selectedYear),
    0
  );

  const totalConsumption = filteredData.reduce(
    (sum, f) => sum + getFilteredConsumption(f, selectedYear),
    0
  );

  const totalCapacity = filteredData.reduce((sum, f) => sum + f.puissanceInstallee, 0);

  const avgEfficiency = totalProduction > 0 ? ((totalProduction - totalConsumption) / totalProduction * 100) : 0;

  // Production by combustible
  const combustibleMap = new Map<string, number>();
  filteredData.forEach((f) => {
    const prod = getFilteredProduction(f, selectedYear);
    const current = combustibleMap.get(f.combustible) || 0;
    combustibleMap.set(f.combustible, current + prod);
  });

  const combustibleData = Array.from(combustibleMap.entries())
    .map(([name, value]) => ({ name, production: Math.round(value) }))
    .sort((a, b) => b.production - a.production);

  // Capacity vs Production scatter
  const scatterData = filteredData
    .filter((f) => getFilteredProduction(f, selectedYear) > 0)
    .map((f) => ({
      nom: f.nom,
      capacity: f.puissanceInstallee,
      production: getFilteredProduction(f, selectedYear),
      efficiency: f.puissanceInstallee > 0 
        ? (getFilteredProduction(f, selectedYear) / f.puissanceInstallee).toFixed(2)
        : 0,
    }))
    .slice(0, 50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Production & Performance Énergétique</h1>
          <p className="text-muted-foreground">Analyse détaillée de la production et des performances des installations</p>
        </header>

        <FilterBar
          selectedYear={selectedYear}
          selectedRegion={selectedRegion}
          selectedTech={selectedTech}
          onYearChange={setSelectedYear}
          onRegionChange={setSelectedRegion}
          onTechChange={setSelectedTech}
          onReset={() => {
            setSelectedYear("2017");
            setSelectedRegion("all");
            setSelectedTech("all");
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Production Totale"
            value={`${Math.round(totalProduction).toLocaleString()} MWh`}
            subtitle={`${filteredData.length} installations`}
            icon={Zap}
          />
          <KPICard
            title="Consommation"
            value={`${Math.round(totalConsumption).toLocaleString()} MWh`}
            subtitle="Énergie consommée"
            icon={Battery}
          />
          <KPICard
            title="Puissance Installée"
            value={`${Math.round(totalCapacity).toLocaleString()} kW`}
            subtitle="Capacité totale"
            icon={Gauge}
          />
          <KPICard
            title="Taux d'Injection"
            value={`${avgEfficiency.toFixed(1)}%`}
            subtitle="Surplus réseau"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Production par Type de Combustible</CardTitle>
              <CardDescription>Répartition de la production selon la source d'énergie</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={combustibleData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="production" fill="hsl(var(--chart-1))" name="Production (MWh)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capacité vs Production</CardTitle>
              <CardDescription>Relation entre puissance installée et production réelle</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    type="number"
                    dataKey="capacity"
                    name="Capacité (kW)"
                    className="text-xs"
                    label={{ value: "Capacité Installée (kW)", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="production"
                    name="Production (MWh)"
                    className="text-xs"
                    label={{ value: "Production (MWh)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} ${name === "capacity" ? "kW" : "MWh"}`,
                      name === "capacity" ? "Capacité" : "Production",
                    ]}
                  />
                  <Scatter name="Installations" data={scatterData} fill="hsl(var(--chart-2))" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Production;
