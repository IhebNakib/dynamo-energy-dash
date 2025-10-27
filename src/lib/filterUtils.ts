import { EnergyFacility } from "./energyData";

export function filterData(
  data: EnergyFacility[],
  year: string,
  region: string,
  tech: string
): EnergyFacility[] {
  return data.filter((facility) => {
    const yearMatch = year === "all" || true; // Year filtering applied in metrics
    const regionMatch = region === "all" || facility.region === region;
    const techMatch = tech === "all" || facility.type === tech;
    
    return yearMatch && regionMatch && techMatch;
  });
}

export function getFilteredProduction(
  facility: EnergyFacility,
  year: string
): number {
  if (year === "all") {
    return (
      facility.energieProduite2014 +
      facility.energieProduite2015 +
      facility.energieProduite2016 +
      facility.energieProduite2017
    ) / 4;
  }
  
  const yearKey = `energieProduite${year}` as keyof EnergyFacility;
  return facility[yearKey] as number || 0;
}

export function getFilteredConsumption(
  facility: EnergyFacility,
  year: string
): number {
  if (year === "all") {
    return (
      facility.energieConsommee2014 +
      facility.energieConsommee2015 +
      facility.energieConsommee2016 +
      facility.energieConsommee2017
    ) / 4;
  }
  
  const yearKey = `energieConsommee${year}` as keyof EnergyFacility;
  return facility[yearKey] as number || 0;
}

export function getFilteredInjection(
  facility: EnergyFacility,
  year: string
): number {
  if (year === "all") {
    return (
      facility.energieInjectee2014 +
      facility.energieInjectee2015 +
      facility.energieInjectee2016 +
      facility.energieInjectee2017
    ) / 4;
  }
  
  const yearKey = `energieInjectee${year}` as keyof EnergyFacility;
  return facility[yearKey] as number || 0;
}
