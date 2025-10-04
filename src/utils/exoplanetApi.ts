import { StarData } from "../types";
import { getRealNASAData, searchRealNASAData } from "../data/realExoplanetData";

// Note: We now use real NASA data from the training dataset instead of API calls
// This avoids CORS issues and uses the actual data your models were trained on

/**
 * Fetch exoplanet data from NASA Exoplanet Archive
 */
export async function fetchExoplanetData(
  mission: "kepler" | "tess" = "kepler"
): Promise<StarData[]> {
  try {
    // Use real NASA data from training dataset instead of API calls
    // This avoids CORS issues and uses the actual data your models were trained on
    console.log(`🔄 Loading real NASA data for ${mission} mission...`);

    const realData = getRealNASAData(mission);
    console.log(`✅ Loaded ${realData.length} real NASA ${mission} planets`);

    return realData;
  } catch (error) {
    console.error("Error loading real NASA data:", error);
    // Fallback to mock data if real data fails
    return getMockExoplanetData(mission);
  }
}

// Note: CSV parsing functions removed since we now use real NASA data directly

/**
 * Mock data fallback
 */
function getMockExoplanetData(mission: string): StarData[] {
  const baseStars: StarData[] = [
    // Kepler-227 system
    {
      id: "KIC-10797460",
      name: "Kepler-227 b",
      mission: "Kepler",
      coordinates: { ra: 291.93423, dec: 48.141651 },
      physical: {
        period: 9.48803557,
        duration: 2.9575,
        prad: 2.26,
        teff: 5455.0,
        logg: 4.467,
        srad: 0.927,
        mag: 15.347,
        radius_ratio: 2.44,
        orbital_density: 0.238,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    {
      id: "KIC-10797460",
      name: "Kepler-227 c",
      mission: "Kepler",
      coordinates: { ra: 291.93423, dec: 48.141651 },
      physical: {
        period: 54.4183827,
        duration: 4.507,
        prad: 2.83,
        teff: 5455.0,
        logg: 4.467,
        srad: 0.927,
        mag: 15.347,
        radius_ratio: 3.05,
        orbital_density: 0.052,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    // Kepler-385 system
    {
      id: "KIC-10811496",
      name: "Kepler-385 b",
      mission: "Kepler",
      coordinates: { ra: 297.0, dec: 48.134 },
      physical: {
        period: 10.04378351,
        duration: 3.0,
        prad: 2.94,
        teff: 5800,
        logg: 4.3,
        srad: 0.9,
        mag: 13.0,
        radius_ratio: 3.27,
        orbital_density: 0.293,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    {
      id: "KIC-10811496",
      name: "Kepler-385 c",
      mission: "Kepler",
      coordinates: { ra: 297.0, dec: 48.134 },
      physical: {
        period: 15.1622287,
        duration: 3.5,
        prad: 3.12,
        teff: 5800,
        logg: 4.3,
        srad: 0.9,
        mag: 13.0,
        radius_ratio: 3.47,
        orbital_density: 0.206,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    {
      id: "KIC-10811496",
      name: "Kepler-385 d",
      mission: "Kepler",
      coordinates: { ra: 297.0, dec: 48.134 },
      physical: {
        period: 25.0,
        duration: 4.0,
        prad: 2.5,
        teff: 5800,
        logg: 4.3,
        srad: 0.9,
        mag: 13.0,
        radius_ratio: 2.78,
        orbital_density: 0.1,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    // More Kepler planets
    {
      id: "KIC-10854555",
      name: "Kepler-664 b",
      mission: "Kepler",
      coordinates: { ra: 288.75, dec: 48.23 },
      physical: {
        period: 2.525591777,
        duration: 1.6545,
        prad: 2.75,
        teff: 6031.0,
        logg: 4.438,
        srad: 1.046,
        mag: 15.509,
        radius_ratio: 2.63,
        orbital_density: 1.09,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    {
      id: "KIC-10848459",
      name: "K00754.01",
      mission: "Kepler",
      coordinates: { ra: 285.53, dec: 48.29 },
      physical: {
        period: 1.736952453,
        duration: 2.40641,
        prad: 33.46,
        teff: 5805.0,
        logg: 4.564,
        srad: 0.791,
        mag: 15.597,
        radius_ratio: 42.3,
        orbital_density: 19.3,
      },
      discovery_date: "2014-01-01",
      last_updated: "2024-01-01",
    },
    // TESS planets
    {
      id: "TIC-123456789",
      name: "TOI-1234",
      mission: "TESS",
      coordinates: { ra: 285.5, dec: 48.3 },
      physical: {
        period: 3.14,
        duration: 2.5,
        prad: 0.8,
        teff: 5500,
        logg: 4.5,
        srad: 1.0,
        mag: 12.3,
        radius_ratio: 0.8,
        orbital_density: 0.255,
      },
      discovery_date: "2023-06-15",
      last_updated: "2024-01-15",
    },
    {
      id: "TIC-317060587",
      name: "TOI-1052.01",
      mission: "TESS",
      coordinates: { ra: 337.51, dec: -75.65 },
      physical: {
        period: 9.139804,
        duration: 3.0912936,
        prad: 3.0629855,
        teff: 5958.2,
        logg: 4.34,
        srad: 1.58,
        mag: 9.02,
        radius_ratio: 1.94,
        orbital_density: 0.335,
      },
      discovery_date: "2023-01-01",
      last_updated: "2024-01-01",
    },
    {
      id: "TIC-112395568",
      name: "TOI-1053.01",
      mission: "TESS",
      coordinates: { ra: 290.98, dec: -33.35 },
      physical: {
        period: 5.742625,
        duration: 2.860293,
        prad: 13.088532,
        teff: 5664.0,
        logg: 3.27,
        srad: 3.87,
        mag: 8.88,
        radius_ratio: 3.38,
        orbital_density: 2.28,
      },
      discovery_date: "2023-01-01",
      last_updated: "2024-01-01",
    },
  ];

  return mission === "kepler"
    ? baseStars.filter((star) => star.mission === "Kepler")
    : baseStars.filter((star) => star.mission === "TESS");
}

/**
 * Search for stars by name or ID using real NASA data
 */
export async function searchStars(
  query: string,
  mission?: "kepler" | "tess"
): Promise<StarData[]> {
  try {
    // Use real NASA data search
    const results = searchRealNASAData(query, mission);
    console.log(
      `🔍 Found ${results.length} real NASA planets matching "${query}"`
    );
    return results;
  } catch (error) {
    console.error("Error searching real NASA data:", error);
    // Fallback to mock data search
    const allStars = await fetchExoplanetData(mission);

    if (!query.trim()) return allStars;

    const searchTerm = query.toLowerCase();
    return allStars.filter(
      (star) =>
        star.name.toLowerCase().includes(searchTerm) ||
        star.id.toLowerCase().includes(searchTerm) ||
        star.mission.toLowerCase().includes(searchTerm)
    );
  }
}
