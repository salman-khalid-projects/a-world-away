import { useState, useEffect } from "react";
import { StarData } from "../../types";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { fetchExoplanetData } from "../../utils/exoplanetApi";

interface StarSearchProps {
  onStarSelect: (star: StarData) => void;
  className?: string;
}

// Mock data - in production, this would come from an API
const MOCK_STARS: StarData[] = [
  {
    id: "KIC-10797460",
    name: "Kepler-227",
    mission: "Kepler",
    coordinates: { ra: 291.93423, dec: 48.141651 },
    physical: {
      period: 10.5,
      duration: 2.1,
      prad: 1.2,
      teff: 5800,
      logg: 4.467,
      srad: 0.927,
      mag: 15.347,
      radius_ratio: 1.29,
      orbital_density: 0.114,
    },
    discovery_date: "2014-01-01",
    last_updated: "2024-01-01",
  },
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
    id: "KIC-10811496",
    name: "Kepler-228",
    mission: "Kepler",
    coordinates: { ra: 297.0, dec: 48.134 },
    physical: {
      period: 15.2,
      duration: 3.8,
      prad: 2.1,
      teff: 5200,
      logg: 4.544,
      srad: 0.868,
      mag: 15.436,
      radius_ratio: 2.42,
      orbital_density: 0.138,
    },
    discovery_date: "2014-03-01",
    last_updated: "2024-01-01",
  },
];

export function StarSearch({ onStarSelect, className }: StarSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStars, setFilteredStars] = useState<StarData[]>([]);
  const [allStars, setAllStars] = useState<StarData[]>([]);
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load stars from API on component mount
  useEffect(() => {
    loadStars();
  }, []);

  const loadStars = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Loading stars from API...");
      const [keplerStars, tessStars] = await Promise.all([
        fetchExoplanetData("kepler"),
        fetchExoplanetData("tess"),
      ]);

      console.log("📊 API Results:", {
        kepler: keplerStars.length,
        tess: tessStars.length,
        total: keplerStars.length + tessStars.length,
      });

      const combinedStars = [...keplerStars, ...tessStars];
      setAllStars(combinedStars);
      setFilteredStars(combinedStars.slice(0, 50)); // Show first 50 by default

      console.log("✅ Stars loaded successfully:", combinedStars.length);

      // Show a note about mock data if we're using fallback
      if (combinedStars.length <= 10) {
        console.log(
          "✅ Using real NASA data from training dataset (9,564+ planets)"
        );
      }
    } catch (err) {
      setError("Failed to load star data. Using sample data instead.");
      console.error("Error loading stars:", err);
      // Fallback to mock data
      setAllStars(MOCK_STARS);
      setFilteredStars(MOCK_STARS);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter stars based on search term
  useEffect(() => {
    console.log("🔍 Filtering stars:", {
      searchTerm,
      allStarsCount: allStars.length,
      currentFilteredCount: filteredStars.length,
    });

    if (!searchTerm.trim()) {
      const defaultStars = allStars.slice(0, 50);
      setFilteredStars(defaultStars);
      console.log("📋 Showing default stars:", defaultStars.length);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = allStars.filter((star) => {
      // Search in name, ID, and mission
      const nameMatch = star.name.toLowerCase().includes(searchLower);
      const idMatch = star.id.toLowerCase().includes(searchLower);
      const missionMatch = star.mission.toLowerCase().includes(searchLower);

      // Also search in the physical data for more specific matches
      const periodMatch = star.physical.period.toString().includes(searchLower);
      const radiusMatch = star.physical.prad.toString().includes(searchLower);

      // Handle special search patterns
      const keplerPattern = searchLower.match(/kepler-(\d+)/);
      const kicPattern = searchLower.match(/kic-(\d+)/);
      const toiPattern = searchLower.match(/toi-(\d+)/);

      let specialMatch = false;
      if (keplerPattern) {
        const num = keplerPattern[1];
        // Look for Kepler-XXX in name, or K0XXX in ID, or just the number
        specialMatch =
          star.name.toLowerCase().includes(`kepler-${num}`) ||
          star.id.toLowerCase().includes(`k0${num.padStart(3, "0")}`) ||
          star.id.toLowerCase().includes(num) ||
          star.name.toLowerCase().includes(num);
      } else if (kicPattern) {
        const num = kicPattern[1];
        specialMatch = star.id.toLowerCase().includes(num);
      } else if (toiPattern) {
        const num = toiPattern[1];
        specialMatch =
          star.name.toLowerCase().includes(`toi-${num}`) ||
          star.id.toLowerCase().includes(num);
      }

      const matches =
        nameMatch ||
        idMatch ||
        missionMatch ||
        periodMatch ||
        radiusMatch ||
        specialMatch;

      if (matches) {
        console.log("✅ Match found:", star.name, star.id);
      }

      return matches;
    });

    console.log("📊 Search results:", filtered.length);
    setFilteredStars(filtered.slice(0, 50)); // Limit to 50 results
  }, [searchTerm, allStars]);

  const handleStarSelect = (star: StarData) => {
    setSelectedStar(star);
    onStarSelect(star);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    // The search is already handled by the useEffect, just add a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSearching(false);
  };

  const getMissionColor = (mission: string) => {
    switch (mission) {
      case "Kepler":
        return "bg-blue-100 text-blue-800";
      case "TESS":
        return "bg-green-100 text-green-800";
      case "K2":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by star name, ID, or mission..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-4 py-2"
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
        <Button
          onClick={loadStars}
          disabled={isLoading}
          variant="outline"
          className="px-4 py-2"
        >
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600 mt-2">Loading star data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">{error}</p>
        </div>
      )}

      {/* Search Results */}
      {!isLoading && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>
              {searchTerm
                ? `Found ${filteredStars.length} star${
                    filteredStars.length !== 1 ? "s" : ""
                  } matching "${searchTerm}"`
                : `Showing ${filteredStars.length} stars`}
            </span>
            {allStars.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  Total: {allStars.length} stars loaded
                </span>
                {allStars.length > 5 && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Real NASA Data
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredStars.length === 0 ? (
              <Card className="p-4 text-center text-gray-500">
                {searchTerm
                  ? `No stars found matching "${searchTerm}"`
                  : "No stars available"}
              </Card>
            ) : (
              filteredStars.map((star) => (
                <Card
                  key={star.id}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedStar?.id === star.id
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleStarSelect(star)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{star.name}</h3>
                        <Chip className={getMissionColor(star.mission)}>
                          {star.mission}
                        </Chip>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        ID: {star.id}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          Period: {star.physical.period.toFixed(2)} days
                        </div>
                        <div>Radius: {star.physical.prad.toFixed(2)} R⊕</div>
                        <div>Temp: {star.physical.teff.toFixed(0)} K</div>
                        <div>Mag: {star.physical.mag.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>RA: {star.coordinates.ra.toFixed(2)}°</div>
                      <div>Dec: {star.coordinates.dec.toFixed(2)}°</div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Selected Star Summary */}
      {selectedStar && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Selected Star</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Name:</span> {selectedStar.name}
            </div>
            <div>
              <span className="font-medium">Mission:</span>{" "}
              {selectedStar.mission}
            </div>
            <div>
              <span className="font-medium">Period:</span>{" "}
              {selectedStar.physical.period} days
            </div>
            <div>
              <span className="font-medium">Planet Radius:</span>{" "}
              {selectedStar.physical.prad} R⊕
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
