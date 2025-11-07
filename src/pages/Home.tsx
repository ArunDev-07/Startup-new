// Updated Home that uses existing components and appends the BenefitsSection at the bottom
import Hero from "../components/Hero";
import Features from "../components/Features";

import { BenefitsSection } from "./Benifits";
import ThreeSectionPage from "../components/ThreeSectionPage";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <ThreeSectionPage/>
      <Features />
      
      <BenefitsSection />
    </div>
  );
};

export default Home;