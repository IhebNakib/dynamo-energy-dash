import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTopProducers } from "@/lib/energyData";

export function TopProducersTable() {
  const topProducers = getTopProducers(10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Producteurs (2017)</CardTitle>
        <CardDescription>Installations avec la plus haute production énergétique</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rang</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Technologie</TableHead>
              <TableHead className="text-right">Puissance (kW)</TableHead>
              <TableHead className="text-right">Production (MWh)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducers.map((producer, index) => (
              <TableRow key={producer.nom}>
                <TableCell className="font-medium">
                  <Badge variant={index < 3 ? "default" : "secondary"}>{index + 1}</Badge>
                </TableCell>
                <TableCell className="font-medium">{producer.nom}</TableCell>
                <TableCell>{producer.region}</TableCell>
                <TableCell>
                  <Badge variant="outline">{producer.type}</Badge>
                </TableCell>
                <TableCell className="text-right">{producer.puissance.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold">
                  {producer.production2017.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
