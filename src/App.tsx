import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "./components/layout/MainLayout";
import { HeroSection } from "./components/hero";
import { StarPicker } from "./components/star-picker";
import { PageTransition } from "./components/transitions";
import { AnalysisForm } from "./components/analysis/AnalysisForm";
import { OverviewStats } from "./components/analysis/OverviewStats";
import { Tabs } from "./components/ui/Tabs";
import { OverviewTab } from "./components/analysis/OverviewTab";
import { DetectionTab } from "./components/analysis/DetectionTab";
import { ExplainabilityTab } from "./components/analysis/ExplainabilityTab";
import { CatalogTab } from "./components/analysis/CatalogTab";
import { MethodsTab } from "./components/analysis/MethodsTab";
import { TabConfig } from "./types";
import { generateDemoData } from "./data/demoData";

// Tab configuration
const tabs: TabConfig[] = [
  { id: "overview", label: "Overview" },
  { id: "detection", label: "Detection" },
  { id: "explain", label: "Explainability" },
  { id: "catalog", label: "Catalog" },
  { id: "methods", label: "Methods" },
];

// App flow states
type AppScreen = "hero" | "star-picker" | "analysis";

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");
  const [tab, setTab] = useState("overview");
  const [dataset, setDataset] = useState("TESS");
  const [targetId, setTargetId] = useState("");
  const [judgesMode, setJudgesMode] = useState(true);

  // Generate demo data
  const demoData = useMemo(() => generateDemoData(), []);

  // Navigation handlers
  const handleStartJourney = () => {
    setCurrentScreen("star-picker");
  };

  const handleStarSelect = (selectedTargetId: string) => {
    setTargetId(selectedTargetId);
  };

  const handleManualInput = (inputTargetId: string) => {
    setTargetId(inputTargetId);
  };

  const handleAnalyze = () => {
    if (targetId) {
      setCurrentScreen("analysis");
      setTab("overview");
    }
  };

  const handleBackToStarPicker = () => {
    setCurrentScreen("star-picker");
  };

  const handleUpload = () => {
    // In a real app, this would open file upload dialog
    console.log("Opening file upload dialog");
  };

  const handleTargetSelect = (selectedTargetId: string) => {
    setTargetId(selectedTargetId);
    setTab("overview");
  };

  const renderTabContent = () => {
    switch (tab) {
      case "overview":
        return <OverviewTab verdict={demoData.verdict} />;
      case "detection":
        return (
          <DetectionTab
            rawLightCurve={demoData.rawLightCurve}
            detrended={demoData.detrended}
            periodogram={demoData.periodogram}
            phaseFolded={demoData.phaseFolded}
          />
        );
      case "explain":
        return (
          <ExplainabilityTab featureImportances={demoData.featureImportances} />
        );
      case "catalog":
        return (
          <CatalogTab
            targets={demoData.targets}
            onTargetSelect={handleTargetSelect}
          />
        );
      case "methods":
        return <MethodsTab />;
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
              onManualInput={handleManualInput}
              onAnalyze={handleAnalyze}
              selectedStarId={targetId}
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

                {/* Hero + Analyzer */}
                <div className="grid md:grid-cols-2 gap-6 items-stretch">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <AnalysisForm
                      dataset={dataset}
                      targetId={targetId}
                      onDatasetChange={setDataset}
                      onTargetIdChange={setTargetId}
                      onAnalyze={handleAnalyze}
                      onUpload={handleUpload}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                  >
                    <OverviewStats
                      verdict={demoData.verdict}
                      phaseFoldedData={demoData.phaseFolded}
                    />
                  </motion.div>
                </div>

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
