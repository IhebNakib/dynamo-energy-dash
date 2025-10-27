import { useState } from "react";
import { TrendingUp, Percent, Zap, Target } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/FilterBar";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { energyData } from "@/lib/energyData";
import { filterData, getFilteredProduction, getFilteredConsumption, getFilteredInjection } from "@/lib/filterUtils";

const Efficacite = () => {
  const [selectedYear, setSelectedYear] = useState("2017");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTech, setSelectedTech] = useState("all");

  const filteredData = filterData(energyData, selectedYear, selectedRegion, selectedTech);

  // Calculate efficiency metrics
  const facilitiesWithEfficiency = filteredData
    .map((f) => {
      const prod = getFilteredProduction(f, selectedYear);
      const cons = getFilteredConsumption(f, selectedYear);
      const inj = getFilteredInjection(f, selectedYear);
      const efficiency = prod > 0 ? ((inj / prod) * 100) : 0;
      const selfConsumption = prod > 0 ? ((cons / prod) * 100) : 0;
      
      return {
        ...f,
        production: prod,
        consumption: cons,
        injection: inj,
        efficiency,
        selfConsumption,
      };
    })
    .filter((f) => f.production > 0);

  const avgEfficiency = facilitiesWithEfficiency.length > 0
    ? facilitiesWithEfficiency.reduce((sum, f) => sum + f.efficiency, 0) / facilitiesWithEfficiency.length
    : 0;

  const avgSelfConsumption = facilitiesWithEfficiency.length > 0
    ? facilitiesWithEfficiency.reduce((sum, f) => sum + f.selfConsumption, 0) / facilitiesWithEfficiency.length
    : 0;

  const totalInjection = facilitiesWithEfficiency.reduce((sum, f) => sum + f.injection, 0);
  const totalProduction = facilitiesWithEfficiency.reduce((sum, f) => sum + f.production, 0);

  // Top efficient facilities
  const topEfficient = [...facilitiesWithEfficiency]
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 10);

  // Efficiency by technology
  const techEfficiencyMap = new Map<string, { totalProd: number; totalInj: number; count: number }>();
  facilitiesWithEfficiency.forEach((f) => {
    const tech = f.type;
    const current = techEfficiencyMap.get(tech) || { totalProd: 0, totalInj: 0, count: 0 };
    techEfficiencyMap.set(tech, {
      totalProd: current.totalProd + f.production,
      totalInj: current.totalInj + f.injection,
      count: current.count + 1,
    });
  });

  const techEfficiencyData = Array.from(techEfficiencyMap.entries())
    .map(([tech, data]) => ({
      technology: tech,
      efficiency: data.totalProd > 0 ? ((data.totalInj / data.totalProd) * 100).toFixed(1) : "0",
      count: data.count,
    }))
    .sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency));

  // Yearly efficiency trend
  const yearlyEfficiency = [2014, 2015, 2016, 2017].map((year) => {
    const yearData = filteredData.map((f) => {
      const yearKey = year.toString();
      const prod = getFilteredProduction(f, yearKey);
      const inj = getFilteredInjection(f, yearKey);
      return { prod, inj };
    });

    const totalProd = yearData.reduce((sum, d) => sum + d.prod, 0);
    const totalInj = yearData.reduce((sum, d) => sum + d.inj, 0);
    const eff = totalProd > 0 ? ((totalInj / totalProd) * 100) : 0;

    return {
      year,
      efficiency: parseFloat(eff.toFixed(2)),
      injection: Math.round(totalInj),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Efficacité Énergétique</h1>
          <p className="text-muted-foreground">Analyse des performances et du rendement énergétique</p>
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
            title="Taux d'Injection Moyen"
            value={`${avgEfficiency.toFixed(1)}%`}
            subtitle="Surplus injecté au réseau"
            icon={Percent}
          />
          <KPICard
            title="Auto-consommation Moyenne"
            value={`${avgSelfConsumption.toFixed(1)}%`}
            subtitle="Énergie auto-consommée"
            icon={Target}
          />
          <KPICard
            title="Énergie Injectée"
            value={`${Math.round(totalInjection).toLocaleString()} MWh`}
            subtitle="Contribution au réseau"
            icon={Zap}
          />
          <KPICard
            title="Taux Global d'Injection"
            value={`${((totalInjection / totalProduction) * 100).toFixed(1)}%`}
            subtitle="Sur production totale"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de l'Efficacité (2014-2017)</CardTitle>
              <CardDescription>Tendance du taux d'injection réseau</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={yearlyEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="year" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" label={{ value: "Efficacité (%)", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" label={{ value: "Injection (MWh)", angle: 90, position: "insideRight" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Efficacité (%)"
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="injection"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Injection (MWh)"
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Efficacité par Technologie</CardTitle>
              <CardDescription>Taux d'injection moyen par type de technologie</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={techEfficiencyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" unit="%" />
                  <YAxis type="category" dataKey="technology" className="text-xs" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="efficiency" fill="hsl(var(--chart-3))" name="Efficacité (%)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Installations les Plus Efficaces</CardTitle>
            <CardDescription>Classement par taux d'injection réseau</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rang</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead>Technologie</TableHead>
                  <TableHead className="text-right">Production (MWh)</TableHead>
                  <TableHead className="text-right">Injection (MWh)</TableHead>
                  <TableHead className="text-right">Efficacité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topEfficient.map((facility, index) => (
                  <TableRow key={facility.nom}>
                    <TableCell>
                      <Badge variant={index < 3 ? "default" : "secondary"}>{index + 1}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{facility.nom}</TableCell>
                    <TableCell>{facility.region}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{facility.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{Math.round(facility.production).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{Math.round(facility.injection).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-secondary">{facility.efficiency.toFixed(1)}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Efficacite;
