import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBarProps {
  selectedYear: string;
  selectedRegion: string;
  selectedTech: string;
  onYearChange: (year: string) => void;
  onRegionChange: (region: string) => void;
  onTechChange: (tech: string) => void;
  onReset: () => void;
}

export function FilterBar({
  selectedYear,
  selectedRegion,
  selectedTech,
  onYearChange,
  onRegionChange,
  onTechChange,
  onReset,
}: FilterBarProps) {
  const hasFilters = selectedYear !== "all" || selectedRegion !== "all" || selectedTech !== "all";

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Année</label>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les années" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les années</SelectItem>
              <SelectItem value="2014">2014</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
              <SelectItem value="2016">2016</SelectItem>
              <SelectItem value="2017">2017</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Région</label>
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les régions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les régions</SelectItem>
              <SelectItem value="Tunis">Tunis</SelectItem>
              <SelectItem value="Nord">Nord</SelectItem>
              <SelectItem value="Centre">Centre</SelectItem>
              <SelectItem value="Sfax">Sfax</SelectItem>
              <SelectItem value="Sud">Sud</SelectItem>
              <SelectItem value="Sud ouest">Sud Ouest</SelectItem>
              <SelectItem value="Nord ouest">Nord Ouest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-2 block">Technologie</label>
          <Select value={selectedTech} onValueChange={onTechChange}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les technologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les technologies</SelectItem>
              <SelectItem value="Cogénération">Cogénération</SelectItem>
              <SelectItem value="PV">PV (Photovoltaïque)</SelectItem>
              <SelectItem value="Trigénération">Trigénération</SelectItem>
              <SelectItem value="Auto production">Auto production</SelectItem>
              <SelectItem value="Valorisation Thermique">Valorisation Thermique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <div className="flex items-end">
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
