export interface EnergyFacility {
  nom: string;
  reference: string;
  region: string;
  typeActivite: string;
  technologie: string;
  type: string;
  combustible: string;
  puissanceInstallee: number;
  energieProduite2014: number;
  energieProduite2015: number;
  energieProduite2016: number;
  energieProduite2017: number;
  energieConsommee2014: number;
  energieConsommee2015: number;
  energieConsommee2016: number;
  energieConsommee2017: number;
  energieInjectee2014: number;
  energieInjectee2015: number;
  energieInjectee2016: number;
  energieInjectee2017: number;
}

// Sample data extracted from the Excel file
export const energyData: EnergyFacility[] = [
  {
    nom: "Héritiers Ali SFAR",
    reference: "8540",
    region: "Tunis",
    typeActivite: "SERVICES ET AUTRES",
    technologie: "PV",
    type: "PV",
    combustible: "Lumière",
    puissanceInstallee: 37.8,
    energieProduite2014: 0,
    energieProduite2015: 57.45,
    energieProduite2016: 68.94,
    energieProduite2017: 70.78,
    energieConsommee2014: 0,
    energieConsommee2015: 57.45,
    energieConsommee2016: 68.94,
    energieConsommee2017: 63.7,
    energieInjectee2014: 0,
    energieInjectee2015: 0,
    energieInjectee2016: 0,
    energieInjectee2017: 7.1,
  },
  {
    nom: "SFBT",
    reference: "18500",
    region: "Tunis",
    typeActivite: "INDUSTRIE ALIMENTAIRE",
    technologie: "Moteur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 400,
    energieProduite2014: 678,
    energieProduite2015: 3480,
    energieProduite2016: 0,
    energieProduite2017: 0,
    energieConsommee2014: 678,
    energieConsommee2015: 3480,
    energieConsommee2016: 0,
    energieConsommee2017: 0,
    energieInjectee2014: 0,
    energieInjectee2015: 0,
    energieInjectee2016: 0,
    energieInjectee2017: 0,
  },
  {
    nom: "CNEFOD",
    reference: "22250",
    region: "Tunis",
    typeActivite: "SERVICES ET AUTRES",
    technologie: "Moteur",
    type: "Trigénération",
    combustible: "Gaz",
    puissanceInstallee: 120,
    energieProduite2014: 0,
    energieProduite2015: 525.6,
    energieProduite2016: 562,
    energieProduite2017: 395.2,
    energieConsommee2014: 0,
    energieConsommee2015: 525.6,
    energieConsommee2016: 562,
    energieConsommee2017: 348.15,
    energieInjectee2014: 0,
    energieInjectee2015: 0,
    energieInjectee2016: 0,
    energieInjectee2017: 47,
  },
  {
    nom: "Sitep",
    reference: "60560",
    region: "Tunis",
    typeActivite: "SERVICES ET AUTRES",
    technologie: "Turbine gaz",
    type: "Auto production",
    combustible: "Gaz",
    puissanceInstallee: 22500,
    energieProduite2014: 104100,
    energieProduite2015: 108000,
    energieProduite2016: 107000,
    energieProduite2017: 107623,
    energieConsommee2014: 104100,
    energieConsommee2015: 108000,
    energieConsommee2016: 107000,
    energieConsommee2017: 107623,
    energieInjectee2014: 0,
    energieInjectee2015: 0,
    energieInjectee2016: 0,
    energieInjectee2017: 0,
  },
  {
    nom: "Azur Papier",
    reference: "291136",
    region: "Nord",
    typeActivite: "INDUSTRIE TEXTILE ET HABILLEMENT",
    technologie: "Turbine vapeur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 3500,
    energieProduite2014: 28192,
    energieProduite2015: 27532,
    energieProduite2016: 28124,
    energieProduite2017: 28074.33,
    energieConsommee2014: 21403,
    energieConsommee2015: 21170,
    energieConsommee2016: 23075,
    energieConsommee2017: 22057.73,
    energieInjectee2014: 6789,
    energieInjectee2015: 6362,
    energieInjectee2016: 5049,
    energieInjectee2017: 6016.6,
  },
  {
    nom: "BBM",
    reference: "301384",
    region: "Nord",
    typeActivite: "I.M.C.C.V",
    technologie: "Turbine vapeur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 5000,
    energieProduite2014: 25335,
    energieProduite2015: 25064,
    energieProduite2016: 21519,
    energieProduite2017: 24097.67,
    energieConsommee2014: 13118,
    energieConsommee2015: 13604,
    energieConsommee2016: 15890,
    energieConsommee2017: 21317.63,
    energieInjectee2014: 12217,
    energieInjectee2015: 11460,
    energieInjectee2016: 5629,
    energieInjectee2017: 2780,
  },
  {
    nom: "Tunisie sucre",
    reference: "311190",
    region: "Nord",
    typeActivite: "INDUSTRIE ALIMENTAIRE",
    technologie: "Turbine gaz",
    type: "Auto production",
    combustible: "fuel",
    puissanceInstallee: 10000,
    energieProduite2014: 0,
    energieProduite2015: 10142,
    energieProduite2016: 11969.6,
    energieProduite2017: 11698,
    energieConsommee2014: 0,
    energieConsommee2015: 10142,
    energieConsommee2016: 11969.6,
    energieConsommee2017: 11144.25,
    energieInjectee2014: 0,
    energieInjectee2015: 0,
    energieInjectee2016: 0,
    energieInjectee2017: 553.8,
  },
  {
    nom: "Sotupapier",
    reference: "398410",
    region: "Nord",
    typeActivite: "INDUSTRIE DU PAPIER",
    technologie: "Moteur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 10000,
    energieProduite2014: 61800,
    energieProduite2015: 61232,
    energieProduite2016: 59209,
    energieProduite2017: 60872,
    energieConsommee2014: 45000,
    energieConsommee2015: 44329,
    energieConsommee2016: 45192,
    energieConsommee2017: 55199.06,
    energieInjectee2014: 16800,
    energieInjectee2015: 16903,
    energieInjectee2016: 14017,
    energieInjectee2017: 5672.9,
  },
  {
    nom: "TAV",
    reference: "574225",
    region: "Centre",
    typeActivite: "TRANSPORT ET TELECOMMUNICATION",
    technologie: "Moteur",
    type: "Trigénération",
    combustible: "Gaz",
    puissanceInstallee: 4044,
    energieProduite2014: 23920,
    energieProduite2015: 21870,
    energieProduite2016: 22420,
    energieProduite2017: 24783,
    energieConsommee2014: 18190,
    energieConsommee2015: 15370,
    energieConsommee2016: 14960,
    energieConsommee2017: 19302.72,
    energieInjectee2014: 5730,
    energieInjectee2015: 6500,
    energieInjectee2016: 7460,
    energieInjectee2017: 5480.2,
  },
  {
    nom: "TPAP",
    reference: "863481",
    region: "Sfax",
    typeActivite: "SERVICES ET AUTRES",
    technologie: "Turbine vapeur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 5000,
    energieProduite2014: 22605,
    energieProduite2015: 28275,
    energieProduite2016: 30552.7,
    energieProduite2017: 27269.25,
    energieConsommee2014: 14008,
    energieConsommee2015: 20360,
    energieConsommee2016: 22821.082,
    energieConsommee2017: 21215.53,
    energieInjectee2014: 8598,
    energieInjectee2015: 7916,
    energieInjectee2016: 7731.666,
    energieInjectee2017: 6053.7,
  },
  {
    nom: "Carthage Ceramique",
    reference: "865480",
    region: "Sfax",
    typeActivite: "I.M.C.C.V",
    technologie: "Turbine vapeur",
    type: "Cogénération",
    combustible: "Gaz",
    puissanceInstallee: 5200,
    energieProduite2014: 40179,
    energieProduite2015: 31933,
    energieProduite2016: 35340,
    energieProduite2017: 35942.33,
    energieConsommee2014: 28800,
    energieConsommee2015: 23623,
    energieConsommee2016: 28136.5,
    energieConsommee2017: 30067.99,
    energieInjectee2014: 11379,
    energieInjectee2015: 8310,
    energieInjectee2016: 7203.5,
    energieInjectee2017: 5874.3,
  },
  {
    nom: "DAP",
    reference: "888050",
    region: "Sud",
    typeActivite: "INDUSTRIE CHIMIQUE",
    technologie: "Turbine vapeur",
    type: "Valorisation Thermique",
    combustible: "Soufre",
    puissanceInstallee: 20000,
    energieProduite2014: 70223,
    energieProduite2015: 54158,
    energieProduite2016: 71571,
    energieProduite2017: 71195.9,
    energieConsommee2014: 70054,
    energieConsommee2015: 54153.7,
    energieConsommee2016: 70908,
    energieConsommee2017: 65558.88,
    energieInjectee2014: 169,
    energieInjectee2015: 4.3,
    energieInjectee2016: 663,
    energieInjectee2017: 5637,
  },
  {
    nom: "GCT GAFSA",
    reference: "765200",
    region: "Sud ouest",
    typeActivite: "INDUSTRIE CHIMIQUE",
    technologie: "Turbine vapeur",
    type: "Valorisation Thermique",
    combustible: "Soufre",
    puissanceInstallee: 15000,
    energieProduite2014: 52865,
    energieProduite2015: 43590,
    energieProduite2016: 48652,
    energieProduite2017: 52722.2,
    energieConsommee2014: 44161,
    energieConsommee2015: 41067,
    energieConsommee2016: 42360,
    energieConsommee2017: 49869.57,
    energieInjectee2014: 8704,
    energieInjectee2015: 2523,
    energieInjectee2016: 6292,
    energieInjectee2017: 2852.6,
  },
];

export function calculateYearlyTotals() {
  const years = [2014, 2015, 2016, 2017];
  return years.map((year) => {
    const yearKey = year.toString().slice(-4);
    const production = energyData.reduce(
      (sum, facility) => sum + (facility[`energieProduite${yearKey}` as keyof EnergyFacility] as number || 0),
      0
    );
    const consumption = energyData.reduce(
      (sum, facility) => sum + (facility[`energieConsommee${yearKey}` as keyof EnergyFacility] as number || 0),
      0
    );
    const injection = energyData.reduce(
      (sum, facility) => sum + (facility[`energieInjectee${yearKey}` as keyof EnergyFacility] as number || 0),
      0
    );

    return {
      year,
      production: Math.round(production),
      consumption: Math.round(consumption),
      injection: Math.round(injection),
      efficiency: production > 0 ? ((injection / production) * 100).toFixed(2) : "0",
    };
  });
}

export function getRegionalDistribution() {
  const regionMap = new Map<string, { production: number; consumption: number; facilities: number }>();

  energyData.forEach((facility) => {
    const region = facility.region || "Autre";
    const current = regionMap.get(region) || { production: 0, consumption: 0, facilities: 0 };

    regionMap.set(region, {
      production: current.production + facility.energieProduite2017,
      consumption: current.consumption + facility.energieConsommee2017,
      facilities: current.facilities + 1,
    });
  });

  return Array.from(regionMap.entries())
    .map(([region, data]) => ({
      region,
      production: Math.round(data.production),
      consumption: Math.round(data.consumption),
      facilities: data.facilities,
    }))
    .sort((a, b) => b.production - a.production);
}

export function getTechnologyDistribution() {
  const techMap = new Map<string, { count: number; totalPower: number; production2017: number }>();

  energyData.forEach((facility) => {
    const tech = facility.type || "Autre";
    const current = techMap.get(tech) || { count: 0, totalPower: 0, production2017: 0 };

    techMap.set(tech, {
      count: current.count + 1,
      totalPower: current.totalPower + facility.puissanceInstallee,
      production2017: current.production2017 + facility.energieProduite2017,
    });
  });

  return Array.from(techMap.entries())
    .map(([technology, data]) => ({
      technology,
      count: data.count,
      totalPower: Math.round(data.totalPower),
      production: Math.round(data.production2017),
    }))
    .sort((a, b) => b.production - a.production);
}

export function getTopProducers(limit = 10) {
  return [...energyData]
    .sort((a, b) => b.energieProduite2017 - a.energieProduite2017)
    .slice(0, limit)
    .map((facility) => ({
      nom: facility.nom,
      region: facility.region,
      type: facility.type,
      production2017: Math.round(facility.energieProduite2017),
      puissance: facility.puissanceInstallee,
    }));
}
