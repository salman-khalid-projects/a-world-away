import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "./components/layout/MainLayout";
import { HeroSection } from "./components/hero";
import { StarPicker } from "./components/star-picker";
import { PageTransition } from "./components/transitions";
import { ClassificationCard } from "./components/analysis/ClassificationCard";
import { PhysicalPropertiesCard } from "./components/analysis/PhysicalPropertiesCard";
import { Tabs } from "./components/ui/Tabs";
import { OverviewTab } from "./components/analysis/OverviewTab";
import { DetectionTab } from "./components/analysis/DetectionTab";
import { ExplainabilityTab } from "./components/analysis/ExplainabilityTab";
import { TabConfig, StarData } from "./types";
import { generateDemoData } from "./data/demoData";

// Tab configuration
const tabs: TabConfig[] = [
  { id: "overview", label: "Overview" },
  { id: "detection", label: "Detection" },
  { id: "explain", label: "Explainability" },
];

// App flow states
type AppScreen = "hero" | "star-picker" | "analysis";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");
  const [tab, setTab] = useState("overview");
  const [selectedStar, setSelectedStar] = useState<StarData | null>(null);
  const [judgesMode, setJudgesMode] = useState(true);

  // Generate demo data
  const demoData = useMemo(() => generateDemoData(), []);

  // Navigation handlers
  const handleStartJourney = () => {
    setCurrentScreen("star-picker");
  };

  const handleStarSelect = (star: StarData) => {
    setSelectedStar(star);
  };

  const handleAnalyze = () => {
    if (selectedStar) {
      setCurrentScreen("analysis");
      setTab("overview");
    }
  };

  const handleBackToStarPicker = () => {
    setCurrentScreen("star-picker");
  };

  const handleTargetSelect = () => {
    setTab("overview");
  };

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return selectedStar ? (
          <OverviewTab star={selectedStar} />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No star selected</p>
            <p className="text-white/40 text-sm mt-2">
              Please select a star to view overview analysis
            </p>
          </div>
        );
      case "detection":
        return selectedStar ? (
          <DetectionTab star={selectedStar} />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No star selected</p>
            <p className="text-white/40 text-sm mt-2">
              Please select a star to view detection analysis
            </p>
          </div>
        );
      case "explain":
        return selectedStar ? (
          <ExplainabilityTab star={selectedStar} />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No star selected</p>
            <p className="text-white/40 text-sm mt-2">
              Please select a star to view explainability analysis
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Render different screens based on current state
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "hero":
        return (
          <PageTransition key="hero" direction="fade">
            <HeroSection onStartJourney={handleStartJourney} />
          </PageTransition>
        );

      case "star-picker":
        return (
          <PageTransition key="star-picker" direction="fade">
            <StarPicker
              onStarSelect={handleStarSelect}
              onAnalyze={handleAnalyze}
              selectedStar={selectedStar || undefined}
            />
          </PageTransition>
        );

      case "analysis":
        return (
          <PageTransition key="analysis" direction="fade">
            <MainLayout
              judgesMode={judgesMode}
              onToggleJudgesMode={() => setJudgesMode(!judgesMode)}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
                {/* Back to Star Picker Button */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <button
                    onClick={handleBackToStarPicker}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Star Picker
                  </button>
                </motion.div>

                {/* Selected Star Analysis */}
                {selectedStar ? (
                  <div className="grid md:grid-cols-2 gap-6 items-stretch">
                    <ClassificationCard star={selectedStar} />
                    <PhysicalPropertiesCard star={selectedStar} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60 text-lg">No star selected</p>
                    <p className="text-white/40 text-sm mt-2">
                      Please go back to the star picker to select a star for
                      analysis
                    </p>
                  </div>
                )}

                {/* Tabs */}
                <Tabs tabs={tabs} activeTab={tab} onTabChange={setTab} />

                {/* Tab Content */}
                <motion.div
                  key={tab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </div>
            </MainLayout>
          </PageTransition>
        );

      default:
        return null;
    }
  };

  return <div className="min-h-screen">{renderCurrentScreen()}</div>;
}

export default App;
