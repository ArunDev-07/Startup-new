// ServicesInteractive.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
  Microscope,
  FlaskConical,
  Atom,
  Database,
  Server,
  Cpu,
  Zap,
  Check,
  ArrowRight,
  X
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

type Service = {
  id: string;
  Icon: React.ComponentType<any>;
  title: string;
  short: string;
  long: string;
  aiIntegrations: string[];
  useCases: string[];
  dataTypes: string[];
  compliance: string[];
  features: string[];
  technologies: string[];
  price: string;
  timeline: string;
  exampleImage?: string;
};

const SERVICES: Service[] = [
  {
    id: 'biology',
    Icon: Microscope,
    title: 'Biology AI Websites',
    short:
      'Interactive genome browsers, protein visualizers, collaborative notebooks and reproducible pipelines.',
    long:
      'We build intelligent biology platforms that combine large-scale data visualization with model-backed interpretation, enabling researchers to explore genomes, annotate experiments, and run lightweight ML inference in-browser or on cloud endpoints.',
    aiIntegrations: [
      'Sequence annotation with fine-tuned transformers',
      'Image analysis for microscopy (cell segmentation)',
      'Assisted literature summarization for experiments'
    ],
    useCases: [
      'Genomics portals and variant explorers',
      'Microscopy image processing & annotation',
      'Collaborative lab notebooks with reproducible pipelines'
    ],
    dataTypes: ['FASTQ / BAM', 'Microscopy images (TIFF)', 'Tabular assays (CSV, TSV)'],
    compliance: ['HIPAA-ready integrations', 'Role-based access', 'Audit logging'],
    features: [
      'Interactive genome browser (zoom/pan/annotations)',
      'Protein structure viewer (WebGL)',
      'Experiment versioning & reproducible pipelines',
      'Notebook-style experiment reports'
    ],
    technologies: ['Next.js', 'D3.js', 'WebGL/Three.js', 'Python APIs', 'Postgres / MinIO'],
    price: 'From $18,000',
    timeline: '8-10 weeks',
    exampleImage: '/images/biology-sample.jpg'
  },
  {
    id: 'chemistry',
    Icon: FlaskConical,
    title: 'Chemistry AI Websites',
    short:
      'Molecular editors, reaction search, spectral analysis, and model-backed property prediction.',
    long:
      'Chemistry platforms we build allow chemists to draw, simulate and query molecules, connect with computational engines, and apply ML models for property prediction or reaction outcome scoring.',
    aiIntegrations: [
      'Molecular property prediction (ML models)',
      'Reaction outcome scoring & retrosynthesis hints',
      'OCR for instrument outputs & spectral interpretation'
    ],
    useCases: [
      'Reaction registry + search with similarity',
      'Spectral data indexing and automatic annotation',
      'Laboratory data connectivity (LIMS integrations)'
    ],
    dataTypes: ['MOL/SDF', 'Spectra (NMR, MS)', 'Reaction SMILES'],
    compliance: ['Access control for IP', 'Export controls', 'Audit trails'],
    features: [
      '2D/3D molecular editor & viewer',
      'Reaction search and similarity ranking',
      'Spectral data viewer with auto-annotations'
    ],
    technologies: ['React', 'RDKit/Wasmtime', 'Three.js', 'Redis', 'Postgres'],
    price: 'From $20,000',
    timeline: '8-12 weeks',
    exampleImage: '/images/chemistry-sample.jpg'
  },
  {
    id: 'physics',
    Icon: Atom,
    title: 'Physics AI Websites',
    short:
      'Simulation dashboards, interactive visualizations, and real-time data analysis for experiments.',
    long:
      'Physics platforms focus on interactive simulations, real-time telemetry dashboards, and analysis tools that let researchers prototype experiments, visualize outcomes and integrate ML-driven analysis.',
    aiIntegrations: [
      'Surrogate simulation models for fast exploration',
      'Anomaly detection on instrument telemetry',
      'Auto-summarization of experiment results'
    ],
    useCases: [
      'Real-time experiment dashboards',
      'Parameter sweeps with surrogate models',
      'Collaborative result annotation'
    ],
    dataTypes: ['Time-series telemetry', 'Simulation outputs', 'Large arrays / HDF5'],
    compliance: ['Data provenance', 'Access controls', 'Export-safe deployments'],
    features: [
      'Interactive parameterized simulators',
      'Telemetry ingestion + anomaly detection',
      'Visualization playgrounds (3D/volume rendering)'
    ],
    technologies: ['Vue/React', 'WebAssembly', 'TensorFlow.js', 'Redis', 'TimescaleDB'],
    price: 'From $22,000',
    timeline: '10-14 weeks',
    exampleImage: '/images/physics-sample.jpg'
  }
];

export default function ServicesInteractive(): JSX.Element {
  const [selected, setSelected] = useState<Service | null>(null);
  const [expandedFeatureIndexes, setExpandedFeatureIndexes] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Open detail panel if URL matches /services/:id
  useEffect(() => {
    const match = location.pathname.match(/\/services\/([^/]+)\/?$/);
    if (match) {
      const id = match[1];
      const svc = SERVICES.find((s) => s.id === id);
      if (svc) setSelected(svc);
    } else {
      // don't auto-close when route is root of services; keep current selection
    }
  }, [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePanel();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // focus panel when opened
    if (selected && panelRef.current) panelRef.current.focus();
  }, [selected]);

  function openPanel(svc: Service) {
    setSelected(svc);
    // push URL so it's deep-linkable
    navigate(`/services/${svc.id}`, { replace: false });
  }

  function closePanel() {
    setSelected(null);
    navigate('/services', { replace: false });
  }

  function toggleFeature(idx: number) {
    setExpandedFeatureIndexes((prev) => ({ ...prev, [String(idx)]: !prev[String(idx)] }));
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="container-custom text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-6">
            OUR SERVICES
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">AI-Powered Websites for</h1>
          <h2 className="text-4xl lg:text-6xl gradient-text font-bold mb-6">Biology · Chemistry · Physics</h2>
          <p className="text-xl text-sage-text max-w-3xl mx-auto mb-8">
            We integrate modern AI with domain tools used by scientists to deliver interactive,
            secure and reproducible research platforms.
          </p>
        </div>
      </section>

      {/* Cards + Panel layout */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="card p-6 rounded-xl border border-sage-border cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
                onClick={() => openPanel(svc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openPanel(svc)}
                aria-label={`Open ${svc.title} details`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-r from-sage-accent to-blue-400">
                    <svc.Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-sage-text-light">{svc.title}</h3>
                    <p className="text-sage-text mt-2">{svc.short}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="px-3 py-1 text-xs bg-sage-card rounded-full">{svc.price}</span>
                      <span className="text-xs text-sage-text/60">{svc.timeline}</span>
                      <span className="ml-auto text-sage-accent inline-flex items-center gap-2 font-medium">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="mt-8">
            <div
              className={`relative transition-all duration-400 ${
                selected ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
              }`}
            >
              {selected && (
                <div
                  ref={panelRef}
                  tabIndex={-1}
                  className="relative rounded-xl border border-sage-border bg-white/3 p-6 shadow-2xl focus:outline-none"
                >
                  <button
                    onClick={closePanel}
                    aria-label="Close details"
                    className="absolute right-4 top-4 p-2 rounded-md hover:bg-white/6"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left column: hero image / icon */}
                    <div className="md:col-span-1 flex flex-col items-center gap-4">
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-sage-bg/30">
                        {/* Replace with real image if available */}
                        {selected.exampleImage ? (
                          <img src={selected.exampleImage} alt={selected.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sage-text/40">
                            <selected.Icon className="w-20 h-20" />
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-sage-text-light">{selected.title}</h3>
                        <p className="text-sage-text mt-2">{selected.short}</p>
                      </div>

                      <div className="mt-4 w-full">
                        <div className="flex gap-2 flex-wrap">
                          {selected.technologies.map((t) => (
                            <span key={t} className="px-3 py-1 bg-sage-card rounded-full text-sm text-sage-text">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle column: core content */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-sage-text-light">Overview</h4>
                        <p className="text-sage-text mt-2">{selected.long}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-sage-text-light">AI integrations</h5>
                          <ul className="space-y-2">
                            {selected.aiIntegrations.map((a, i) => (
                              <li key={a} className="flex items-start gap-3">
                                <div className="mt-1">
                                  <Zap className="w-4 h-4 text-sage-accent" />
                                </div>
                                <div>
                                  <div className="text-sage-text">{a}</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-semibold text-sage-text-light">Use cases</h5>
                          <ul className="list-disc pl-4 text-sage-text">
                            {selected.useCases.map((u) => (
                              <li key={u}>{u}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h6 className="text-sm font-semibold text-sage-text-light">Data types</h6>
                          <div className="mt-2 text-sage-text text-sm">
                            {selected.dataTypes.join(' • ')}
                          </div>
                        </div>

                        <div>
                          <h6 className="text-sm font-semibold text-sage-text-light">Compliance</h6>
                          <div className="mt-2 text-sage-text text-sm">{selected.compliance.join(' • ')}</div>
                        </div>

                        <div>
                          <h6 className="text-sm font-semibold text-sage-text-light">Pricing & timeline</h6>
                          <div className="mt-2 text-sage-text">
                            <div className="font-semibold text-sage-accent">{selected.price}</div>
                            <div className="text-sm text-sage-text/60">{selected.timeline}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sage-text-light">Features</h5>
                        <div className="mt-3 grid gap-3">
                          {selected.features.map((f, idx) => (
                            <div
                              key={f}
                              className="p-3 border border-sage-border rounded-lg bg-sage-bg/30 flex items-start justify-between"
                            >
                              <div className="flex items-start gap-3">
                                <Check className="w-4 h-4 text-sage-accent mt-1" />
                                <div>
                                  <div className="font-medium text-sage-text-light">{f}</div>
                                  <div className="text-sm text-sage-text/70">
                                    {/* short explanatory text — keep small & focused */}
                                    {f} — we implement this as an interactive, production-ready feature.
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => toggleFeature(idx)}
                                className="text-sage-accent text-sm px-2 py-1 rounded hover:bg-white/6"
                                aria-expanded={!!expandedFeatureIndexes[String(idx)]}
                              >
                                {expandedFeatureIndexes[String(idx)] ? 'Hide' : 'Details'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expanded feature details area */}
                      <div>
                        {Object.entries(expandedFeatureIndexes).map(([k, v]) =>
                          v ? (
                            <div key={k} className="p-4 mt-3 border border-sage-border rounded bg-white/4">
                              <strong className="text-sage-text-light">Feature details</strong>
                              <p className="mt-2 text-sage-text">
                                Example implementation notes and integration patterns that explain how we'd deliver this feature
                                in a secure, scalable manner (APIs, storage, model hosting, caching).
                              </p>
                            </div>
                          ) : null
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <Link
                          to={`/contact?service=${selected.id}`}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          Start a Project
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => {
                            // example: open docs or case study
                            window.open('/portfolio', '_self');
                          }}
                          className="btn-secondary inline-flex items-center gap-2"
                        >
                          View Related Work
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process + CTA */}
      <section className="section-padding bg-sage-deep">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-sage-text-light">How we deliver</h3>
            <p className="text-sage-text mt-3 max-w-2xl mx-auto">
              Discovery → Prototyping → Model Integration → Deployment → Monitoring. We provide research-grade tooling,
              reproducible pipelines and secure deployments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-sage-accent to-blue-400 flex items-center justify-center mb-4">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-sage-text-light">Data & Storage</h4>
              <p className="text-sage-text mt-2">Encrypted, versioned storage and fine-grained access control.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-sage-accent to-blue-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-sage-text-light">Serving & Models</h4>
              <p className="text-sage-text mt-2">Model hosting, batching and secure inference endpoints.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-sage-accent to-blue-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-sage-text-light">Performance</h4>
              <p className="text-sage-text mt-2">Caching, horizontal scaling and near real-time UX.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
