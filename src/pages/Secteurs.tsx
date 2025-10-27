import { useState } from "react";
import { Factory, Building2, TrendingUp, Users } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/FilterBar";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { energyData } from "@/lib/energyData";
import { filterData, getFilteredProduction, getFilteredConsumption } from "@/lib/filterUtils";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const Secteurs = () => {
  const [selectedYear, setSelectedYear] = useState("2017");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");

  const filteredData = filterData(energyData, selectedYear, selectedRegion, selectedTech);

  // Sector analysis
  const sectorMap = new Map<string, { production: number; consumption: number; facilities: number; capacity: number }>();
  
  filteredData.forEach((f) => {
    const sector = f.typeActivite || "Autre";
    const current = sectorMap.get(sector) || { production: 0, consumption: 0, facilities: 0, capacity: 0 };
    
    sectorMap.set(sector, {
      production: current.production + getFilteredProduction(f, selectedYear),
      consumption: current.consumption + getFilteredConsumption(f, selectedYear),
      facilities: current.facilities + 1,
      capacity: current.capacity + f.puissanceInstallee,
    });
  });

  const sectorData = Array.from(sectorMap.entries())
    .map(([sector, data]) => ({
      sector,
      production: Math.round(data.production),
      consumption: Math.round(data.consumption),
      facilities: data.facilities,
      capacity: Math.round(data.capacity),
      efficiency: data.production > 0 ? ((data.production - data.consumption) / data.production * 100).toFixed(1) : "0",
    }))
    .sort((a, b) => b.production - a.production);

  const topSectors = sectorData.slice(0, 5);
  
  const totalProduction = sectorData.reduce((sum, s) => sum + s.production, 0);
  const totalFacilities = sectorData.reduce((sum, s) => sum + s.facilities, 0);
  const totalCapacity = sectorData.reduce((sum, s) => sum + s.capacity, 0);

  // Pie chart data for top 5 sectors
  const pieData = topSectors.map((s) => ({
    name: s.sector,
    value: s.production,
    percentage: ((s.production / totalProduction) * 100).toFixed(1),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analyse Sectorielle</h1>
          <p className="text-muted-foreground">Performance énergétique par secteur d'activité</p>
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
            title="Secteurs Actifs"
            value={sectorData.length}
            subtitle="Secteurs d'activité"
            icon={Factory}
          />
          <KPICard
            title="Production Totale"
            value={`${totalProduction.toLocaleString()} MWh`}
            subtitle="Tous secteurs confondus"
            icon={TrendingUp}
          />
          <KPICard
            title="Installations"
            value={totalFacilities}
            subtitle="Nombre de sites"
            icon={Building2}
          />
          <KPICard
            title="Capacité Installée"
            value={`${totalCapacity.toLocaleString()} kW`}
            subtitle="Puissance totale"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Production par Secteur</CardTitle>
              <CardDescription>Top 5 des secteurs les plus productifs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topSectors} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="sector" className="text-xs" width={150} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="production" fill="hsl(var(--chart-1))" name="Production (MWh)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition de la Production</CardTitle>
              <CardDescription>Part de chaque secteur dans la production totale</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value: number) => `${value.toLocaleString()} MWh`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Détaillée par Secteur</CardTitle>
            <CardDescription>Analyse comparative de tous les secteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="sector" className="text-xs" angle={-45} textAnchor="end" height={120} />
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
                <Bar dataKey="consumption" fill="hsl(var(--chart-2))" name="Consommation (MWh)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Secteurs;
