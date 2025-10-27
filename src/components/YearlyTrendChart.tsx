import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { calculateYearlyTotals } from "@/lib/energyData";

export function YearlyTrendChart() {
  const data = calculateYearlyTotals();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution Production & Consommation (2014-2017)</CardTitle>
        <CardDescription>Tendances énergétiques annuelles en MWh</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="year" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="production"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="Production (MWh)"
              dot={{ fill: "hsl(var(--chart-1))" }}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              name="Consommation (MWh)"
              dot={{ fill: "hsl(var(--chart-2))" }}
            />
            <Line
              type="monotone"
              dataKey="injection"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              name="Injection réseau (MWh)"
              dot={{ fill: "hsl(var(--chart-3))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
