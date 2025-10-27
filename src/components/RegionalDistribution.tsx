import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getRegionalDistribution } from "@/lib/energyData";

export function RegionalDistribution() {
  const data = getRegionalDistribution();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution Régionale (2017)</CardTitle>
        <CardDescription>Production et consommation par région en MWh</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="region" className="text-xs" angle={-45} textAnchor="end" height={80} />
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
  );
}
