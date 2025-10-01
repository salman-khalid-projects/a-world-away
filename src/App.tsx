import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "./components/layout/MainLayout";
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

function App() {
  const [tab, setTab] = useState("overview");
  const [dataset, setDataset] = useState("TESS");
  const [targetId, setTargetId] = useState("TIC 307210830");
  const [judgesMode, setJudgesMode] = useState(true);

  // Generate demo data
  const demoData = useMemo(() => generateDemoData(), []);

  const handleAnalyze = () => {
    // In a real app, this would trigger the analysis
    console.log("Analyzing target:", targetId, "with dataset:", dataset);
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

  return (
    <MainLayout
      judgesMode={judgesMode}
      onToggleJudgesMode={() => setJudgesMode(!judgesMode)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
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
  );
}

export default App;
