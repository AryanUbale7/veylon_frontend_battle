export interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  detailText: string;
  iconName: "ChartPie" | "ArrowPath" | "Cube16Solid" | "LinkSolid";
  gridClass?: string; // Tailwind grid layout classes for desktop bento
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "analytics",
    badge: "INGESTION",
    title: "Cognitive Ingestion Pipelines",
    description: "Ingest unstructured data streams dynamically with automatic format mapping and agentic schema inference.",
    detailText: "Leverages lightweight, local transformer models to analyze inbound blobs, structure keys on-the-fly, and validate data types against target compliance blueprints with zero delay.",
    iconName: "ChartPie",
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    id: "styling",
    badge: "CLEANING",
    title: "Automated Schema Cleaning",
    description: "Detect anomalies, resolve null fields, and normalize outliers using automated validation rules.",
    detailText: "Enforces strict data hygiene checks. If a column violates target thresholds, it runs local repair functions to normalize data distributions, satisfying enterprise-grade compliance benchmarks.",
    iconName: "LinkSolid",
    gridClass: "lg:col-span-1 lg:row-span-2",
  },
  {
    id: "isolation",
    badge: "ORCHESTRATION",
    title: "Vector Database ETL Pipelines",
    description: "Orchestrate high-throughput data syncs directly to vector stores and analytical warehouses.",
    detailText: "Synchronizes cleaned datasets with engines like BigQuery, Pinecone, or Spanner. State locks are managed in local subtrees to ensure dashboard visuals remain fast and highly isolated.",
    iconName: "Cube16Solid",
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    id: "code-split",
    badge: "PERFORMANCE",
    title: "Isolated Monitoring Dashboards",
    description: "Track data automation metrics using CSS-isolated layouts and dynamic, lazy-loaded visual grids.",
    detailText: "Features zero parent state reflows during dashboard updates. Code-split components employ static height skeleton spacers to prevent layout shifts (CLS), yielding 95+ performance scores.",
    iconName: "ArrowPath",
    gridClass: "lg:col-span-3 lg:row-span-1",
  },
];
