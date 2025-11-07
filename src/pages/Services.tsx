import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  Microscope,
  FlaskConical,
  Atom,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ReactDOM from 'react-dom';

// --- types
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
  exampleVideo?: string; // new: optional video preview for the service
};

type Lang = {
  name: string;
  short: string;
  img?: string; // image or video path
};

// --- data (now includes exampleVideo fields)
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
    exampleVideo: '/Videos/bio.mp4'
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
    exampleVideo: '/Videos/che.mp4'
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
    exampleVideo: '/Videos/phy.mp4'
  }
];

// hero poster (fallback)
const HERO_POSTER = '/mnt/data/f7273739-cd23-407a-aa5c-6b007d733ab8.png';

// languages / tags data (includes service video tags and programming languages)
const LANGUAGES: Lang[] = [
  { name: 'Java', short: 'Enterprise backends', img: '/Images/java3.png' },
  { name: 'Python', short: 'Data & ML', img: '/Images/python.png' },
  { name: 'JavaScript', short: 'Web scripting', img: '/Images/JavaScript.png' },
  { name: 'React JS', short: 'UI library', img: '/Images/react.png' },
  { name: 'SpringBoot', short: 'Java microservices', img: '/Images/spring1.png' },
  { name: 'TypeScript', short: 'Typed JavaScript', img: '/Images/TypeScript.png' },
  { name: 'MySql', short: 'Relational DB', img: '/Images/mysql.png' },
  { name: 'PostgreSQL', short: 'Advanced relational DB', img: '/Images/PostgreSQL.png' },
  { name: 'Docker', short: 'Containerization', img: '/Images/Docker.png' },
  { name: 'AWS', short: 'Cloud services', img: '/Images/aws.png' },
  { name: 'HTML', short: 'Markup language', img: '/Images/html.png' },
  { name: 'CSS', short: 'Styling language', img: '/Images/css.png' },
  { name: 'Figma', short: 'Design & prototyping', img: '/Images/Figma.png' },
  { name: 'ChatGPT', short: 'Conversational AI', img: '/Images/gpt.png' },
  { name: 'Next JS', short: 'React framework', img: '/Images/next2.png' },
  { name: 'FastAPI', short: 'Fast Python APIs', img: '/Images/fast1.png' },
  { name: 'Django', short: 'Full-stack Python', img: '/Images/jango1.png' },
  { name: 'Tailwind CSS', short: 'Utility-first CSS', img: '/Images/tailwind.png' }
];


// small helper components
function ServiceCard({ svc, onOpen }: { svc: Service; onOpen: (s: Service) => void }) {
  return (
    <article
      className="bg-white/5 rounded-xl border border-sage-border p-6 flex flex-col h-full hover:shadow-lg transition focus-within:shadow-lg"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(svc)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(svc)}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-r from-sage-accent to-blue-400">
          <svc.Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-sage-text-light">{svc.title}</h3>
          <p className="text-sage-text mt-2 text-sm">{svc.short}</p>
        </div>
      </div>

      <div className="mt-4 mt-auto flex items-center gap-3">
        <span className="px-2 py-1 rounded-full bg-sage-card text-xs">{svc.price}</span>
        <span className="text-xs text-sage-text/60">{svc.timeline}</span>
        <button className="ml-auto inline-flex items-center text-sage-accent text-sm font-medium">
          Learn more <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </article>
  );
}

// Reusable hero-split (video + content). videoOnLeft flips layout.
function HeroSplit({
  id,
  title,
  subtitle,
  ctaPath,
  videoSrc,
  videoPoster,
  videoOnLeft = true
}: {
  id: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  ctaPath?: string;
  videoSrc: string;
  videoPoster?: string;
  videoOnLeft?: boolean;
}) {
  return (
    <section id={id} className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
        {videoOnLeft && (
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-[780px] rounded-xl overflow-hidden shadow-2xl h-64 lg:h-[360px]">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={videoPoster || HERO_POSTER}
                aria-hidden
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            </div>
          </div>
        )}

        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-4">
            {id.toUpperCase()}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{title}</h2>

          <p className="mt-4 text-sage-text text-base">{subtitle}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link to={ctaPath || '/contact'} className="btn-primary inline-flex items-center gap-2 justify-center w-full sm:w-auto">
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2 justify-center w-full sm:w-auto">
              View Related Work
            </Link>
          </div>
        </div>

        {!videoOnLeft && (
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-[780px] rounded-xl overflow-hidden shadow-2xl h-64 lg:h-[360px]">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={videoPoster || HERO_POSTER}
                aria-hidden
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// --- main page
export default function ServicesInteractive(): JSX.Element {
  const [selected, setSelected] = useState<Service | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // languages interactive preview
  const [selectedLang, setSelectedLang] = useState<Lang | null>(LANGUAGES[0]);

  useEffect(() => {
    const match = location.pathname.match(/\/services\/([^/]+)\/?$/);
    if (match) {
      const svc = SERVICES.find((s) => s.id === match[1]);
      if (svc) setSelected(svc);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (selected && panelRef.current) panelRef.current.focus();
  }, [selected]);

  function openPanel(svc: Service) {
    setSelected(svc);
    navigate(`/services/${svc.id}`, { replace: false });
  }

  function closePanel() {
    setSelected(null);
    navigate('/services', { replace: false });
  }

  const exampleImages = useMemo(
    () => ({
      biology: ['/images/biology-sample-1.jpg', '/images/biology-sample-2.jpg'],
      chemistry: ['/images/chemistry-sample-1.jpg', '/images/chemistry-sample-2.jpg'],
      physics: ['/images/physics-sample-1.jpg']
    }),
    []
  );

  // helper to detect whether a path is a video (basic extension check)
  function isVideoPath(path?: string) {
    if (!path) return false;
    return /\.(mp4|webm|ogg)$/i.test(path);
  }

  return (
    <div className="pt-12 lg:pt-20">
      {/* 1) Primary Hero (original) */}
      <section className="bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-4">
              OUR SERVICES
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Rapidly Build Scalable<br /> High-Impact Web Apps
            </h1>

            <p className="mt-4 text-sage-text text-base md:text-lg max-w-xl">
              We deliver research-grade, AI-powered websites and data portals for biology, chemistry and physics labs — interactive visualizations, reproducible pipelines and secure deployments.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 justify-center w-full sm:w-auto">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-2 justify-center w-full sm:w-auto">
                View Related Work
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-[780px] rounded-xl overflow-hidden shadow-2xl h-64 lg:h-[420px]">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={HERO_POSTER}
                aria-hidden
              >
                <source src="/Videos/ai.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

              <div className="relative w-full h-full flex items-center justify-center text-sage-text" />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Quick feature highlights (cards row) */}
      <section className="container-custom py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-sage-border bg-sage-bg/40">
              <h4 className="font-semibold text-sage-text-light">Interactive Data Visualizations</h4>
              <p className="mt-2 text-sage-text text-sm">Dashboards, genome browsers and interactive figures that let researchers explore data fast.</p>
            </div>
            <div className="p-6 rounded-xl border border-sage-border bg-sage-bg/40">
              <h4 className="font-semibold text-sage-text-light">AI-Powered Workflows</h4>
              <p className="mt-2 text-sage-text text-sm">Model-backed annotations, image analysis and experiment summarization integrated into reproducible pipelines.</p>
            </div>
            <div className="p-6 rounded-xl border border-sage-border bg-sage-bg/40">
              <h4 className="font-semibold text-sage-text-light">Secure & Compliant</h4>
              <p className="mt-2 text-sage-text text-sm">Role-based access, audit logs and export-safe deployments for research data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Added hero splits for Chemistry / Biology / Physics */}
      <HeroSplit
        id="chemistry"
        title={<><strong>Chemistry AI</strong><br />Molecular editors & reaction search</>}
        subtitle="Draw, simulate and query molecules with integrated ML property prediction and spectral tools."
        videoSrc="/Videos/che.mp4"
        videoOnLeft={true}
        ctaPath="/contact?service=chemistry"
      />

      <HeroSplit
        id="biology"
        title={<><strong>Biology AI</strong><br />Genome browsers & notebook workflows</>}
        subtitle="Explore genomes, annotate experiments and run lightweight in-browser inference for quick insights."
        videoSrc="/Videos/bio.mp4"
        videoOnLeft={false}
        ctaPath="/contact?service=biology"
      />

      <HeroSplit
        id="physics"
        title={<><strong>Physics AI</strong><br />Simulation dashboards & real-time telemetry</>}
        subtitle="Interactive simulators and anomaly detection pipelines for experimental groups and instrument teams."
        videoSrc="/Videos/phy.mp4"
        videoOnLeft={true}
        ctaPath="/contact?service=physics"
      />

      {/* 4) Technology / logos grid -> now interactive preview + grid (supports video tags) */}
      <section className="py-12 container-custom">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h4 className="text-lg font-semibold text-sage-text-light text-center">Tools & Languages — click to preview</h4>
          <p className="text-sage-text text-sm mt-2 mb-6 text-center">Click a tag to see a preview area (video or logo). Replace the preview files with your assets when ready.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* preview area */}
            <div className="order-2 lg:order-1 bg-sage-bg rounded-xl border border-sage-border p-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-xs">
                <div className="w-full h-44 rounded-lg bg-gray-800/20 flex items-center justify-center overflow-hidden">
                  {/* show selected image or video if available */}
                  {selectedLang && isVideoPath(selectedLang.img) ? (
                    <video className="w-full h-full object-cover" src={selectedLang.img} autoPlay muted loop playsInline aria-hidden poster={HERO_POSTER} />
                  ) : selectedLang?.img ? (
                    <img src={selectedLang.img} alt={`${selectedLang.name} preview`} className="max-h-full object-contain" />
                  ) : (
                    <div className="text-sage-text text-lg">{selectedLang?.name}</div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <div className="font-semibold text-sage-text-light">{selectedLang?.name}</div>
                  <div className="text-sage-text text-sm mt-1">{selectedLang?.short}</div>
                </div>
              </div>
            </div>

            {/* languages grid */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.name}
                    onClick={() => setSelectedLang(l)}
                    className={`flex gap-3 items-center p-3 rounded-lg border transition transform hover:-translate-y-0.5 focus:-translate-y-0.5 focus:outline-none ${
                      selectedLang?.name === l.name ? 'ring-2 ring-sage-accent/40 border-sage-accent/30' : 'border-sage-border/40'
                    }`}
                    aria-pressed={selectedLang?.name === l.name}
                    title={l.short}
                  >
                    <div className="w-12 h-12 rounded-md bg-sage-card flex items-center justify-center overflow-hidden">
                      {isVideoPath(l.img) ? (
                        <video src={l.img} className="w-full h-full object-cover" autoPlay muted loop playsInline aria-hidden poster={HERO_POSTER} />
                      ) : l.img ? (
                        <img src={l.img} alt={`${l.name} logo`} className="w-full h-full object-contain" />
                      ) : (
                        <div className="font-semibold">{l.name[0]}</div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sage-text-light">{l.name}</div>
                      <div className="text-xs text-sage-text mt-1">{l.short}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Project case-study grid */}
      <section className="bg-sage-bg py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-sage-text-light mb-6">Our Web Application Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl border border-sage-border overflow-hidden">
              <div className="w-full h-48 bg-gray-800/20 flex items-center justify-center text-sage-text overflow-hidden">
                <img
                  src="/Images/pro1.png"
                  alt="Genome Explorer — interactive genome browser screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-sage-text-light">Genome Explorer</h4>
                <p className="text-sage-text text-sm mt-2">Interactive genome browser and annotation tools used by research groups to explore sequencing results.</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-sage-card text-xs">D3.js</span>
                  <span className="px-2 py-1 rounded bg-sage-card text-xs">WebGL</span>
                  <Link to="/portfolio" className="ml-auto text-sage-accent text-sm inline-flex items-center gap-1">View case study <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-sage-border overflow-hidden">
              <div className="w-full h-48 bg-gray-800/20 flex items-center justify-center text-sage-text overflow-hidden">
                <img
                  src="/Images/pro2.png"
                  alt="Molecular Viewer — 3D molecule viewer screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-sage-text-light">Molecular Viewer</h4>
                <p className="text-sage-text text-sm mt-2">3D molecule viewer with annotation, search and integrated ML-based property prediction.</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-sage-card text-xs">Three.js</span>
                  <span className="px-2 py-1 rounded bg-sage-card text-xs">RDKit</span>
                  <Link to="/portfolio" className="ml-auto text-sage-accent text-sm inline-flex items-center gap-1">View case study <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) Testimonials */}
      <section className="py-12 container-custom">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-sage-text-light mb-6 text-center">What our clients say</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Sagittarius helped us visualize sequencing results in minutes instead of weeks.',
                author: 'Dr. Sarah Chen, Stanford'
              },
              {
                quote: 'We reduced manual curation time by 70% with their platform.',
                author: 'Prof. Michael Rodriguez, MIT'
              },
              {
                quote: 'Secure deployments and reproducible pipelines were game changers for our lab.',
                author: 'Dr. Lisa Thompson, CERN'
              }
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-sage-border bg-sage-bg/20">
                <p className="text-sage-text">“{t.quote}”</p>
                <div className="mt-4 font-semibold text-sage-text-light">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) Blog / resources teaser */}
      <section className="bg-sage-deep py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-sage-text-light mb-6">Related Blogs</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-5 rounded-xl border border-sage-border bg-sage-bg/30">
              <h5 className="font-semibold text-sage-text-light">Designing reproducible data portals</h5>
              <p className="text-sage-text text-sm mt-2">Principles and patterns for research portals that stand the test of time.</p>
            </article>

            <article className="p-5 rounded-xl border border-sage-border bg-sage-bg/30">
              <h5 className="font-semibold text-sage-text-light">Fast ML inference on the web</h5>
              <p className="text-sage-text text-sm mt-2">Strategies to run and cache lightweight models for interactive UIs.</p>
            </article>

            <article className="p-5 rounded-xl border border-sage-border bg-sage-bg/30">
              <h5 className="font-semibold text-sage-text-light">Security & compliance for research apps</h5>
              <p className="text-sage-text text-sm mt-2">What research teams need to know about access, audit trails and export rules.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 8) CTA footer */}
      <section className="py-12 container-custom">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 bg-sage-card rounded-xl p-8 flex flex-col sm:flex-row items-center gap-4">
          <div>
            <h4 className="text-xl font-bold text-sage-text-light">Ready to accelerate your research?</h4>
            <p className="text-sage-text text-sm mt-1">Talk to our team about a pilot project or prototype.</p>
          </div>

          <div className="ml-auto flex gap-3 w-full sm:w-auto">
            <Link to="/contact" className="btn-primary w-full sm:w-auto">Request a Demo</Link>
            <Link to="/portfolio" className="btn-secondary w-full sm:w-auto">View More Work</Link>
          </div>
        </div>
      </section>

      {/* Selected details modal (rendered into document.body to avoid ancestor transform issues) */}
      {selected &&
        ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999]"
              role="dialog"
              aria-labelledby={`service-${selected.id}-title`}
            >
              {/* backdrop */}
              <div className="absolute inset-0 bg-black/50" onClick={closePanel} />

              {/* center container */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.98, y: 12, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.98, y: 12, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  ref={panelRef}
                  className="w-full max-w-[96vw] sm:max-w-4xl mx-auto bg-sage-bg border border-sage-border rounded-xl shadow-2xl p-3 sm:p-6 max-h-[90vh] overflow-y-auto relative"
                  tabIndex={-1}
                  aria-modal="true"
                >
                  {/* Close button */}
                  <button
                    onClick={closePanel}
                    aria-label="Close details"
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/6 text-sage-text-light hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-sage-accent/40 z-50"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <h3 id={`service-${selected.id}-title`} className="text-xl font-bold text-sage-text-light">
                        {selected.title}
                      </h3>
                      <p className="text-sage-text text-sm mt-2">{selected.short}</p>
                    </div>

                    {/* copy button removed per request */}
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="w-full h-48 rounded-lg bg-gray-800/20 flex items-center justify-center overflow-hidden">
                        {selected.exampleVideo && isVideoPath(selected.exampleVideo) ? (
                          <video
                            src={selected.exampleVideo}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={HERO_POSTER}
                            aria-hidden
                          />
                        ) : selected.exampleImage ? (
                          <img
                            src={selected.exampleImage}
                            alt={`${selected.title} example`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sage-text">Image (add later)</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-sage-text-light">Overview</h5>
                      <p className="text-sage-text text-sm mt-2">{selected.long}</p>

                      <h6 className="mt-4 font-semibold text-sage-text-light">AI integrations</h6>
                      <ul className="mt-2 text-sage-text text-sm space-y-2">
                        {selected.aiIntegrations.map((a) => (
                          <li key={a} className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-sage-accent mt-1" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link to={`/contact?service=${selected.id}`} className="btn-primary w-full sm:w-auto">
                      Start Project
                    </Link>
                    <Link to="/portfolio" className="btn-secondary w-full sm:w-auto">
                      View Related Work
                    </Link>
                  </div>

                  <div className="h-4 sm:hidden" aria-hidden />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

    </div>
  );
}
