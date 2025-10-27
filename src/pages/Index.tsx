import { Zap, TrendingUp, Battery, Activity } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { KPICard } from "@/components/KPICard";
import { YearlyTrendChart } from "@/components/YearlyTrendChart";
import { RegionalDistribution } from "@/components/RegionalDistribution";
import { TechnologyChart } from "@/components/TechnologyChart";
import { TopProducersTable } from "@/components/TopProducersTable";
import { calculateYearlyTotals, energyData } from "@/lib/energyData";

const Index = () => {
  const yearlyData = calculateYearlyTotals();
  const latest = yearlyData[yearlyData.length - 1];
  const previous = yearlyData[yearlyData.length - 2];

  const productionGrowth = previous.production > 0
    ? (((latest.production - previous.production) / previous.production) * 100).toFixed(1)
    : "0";

  const totalCapacity = energyData.reduce((sum, f) => sum + f.puissanceInstallee, 0);
  const activeProducers = energyData.filter((f) => f.energieProduite2017 > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tableau de Bord Énergétique
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualisation interactive des données énergétiques 2014-2017
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Analyse approfondie de la production, consommation et efficacité énergétique
          </p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Production Totale 2017"
            value={`${latest.production.toLocaleString()} MWh`}
            subtitle="Énergie produite"
            icon={Zap}
            trend={{
              value: parseFloat(productionGrowth),
              isPositive: parseFloat(productionGrowth) > 0,
            }}
          />
          <KPICard
            title="Consommation 2017"
            value={`${latest.consumption.toLocaleString()} MWh`}
            subtitle="Énergie consommée"
            icon={Activity}
          />
          <KPICard
            title="Puissance Installée"
            value={`${Math.round(totalCapacity).toLocaleString()} kW`}
            subtitle="Capacité totale"
            icon={Battery}
          />
          <KPICard
            title="Installations Actives"
            value={activeProducers}
            subtitle={`Sur ${energyData.length} installations`}
            icon={TrendingUp}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <YearlyTrendChart />
          <TechnologyChart />
        </div>

        {/* Regional Distribution */}
        <div className="mb-8">
          <RegionalDistribution />
        </div>

        {/* Top Producers Table */}
        <div className="mb-8">
          <TopProducersTable />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground border-t pt-6">
          <p>Dashboard Énergétique - Données 2014-2017 | Analyse interactive des performances énergétiques</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
