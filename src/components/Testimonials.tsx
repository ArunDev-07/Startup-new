

// File: src/components/Testimonials.tsx
import React from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "Sagittarius approach has truly simplified our biology research data presentation. The AI-powered tools make it more efficient and cost-effective to see what works.",
      author: "Dr. Sarah Chen",
      position: "Senior Research Scientist, Stanford",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "$350K",
      metricLabel: "Annual savings in SEM licensing and data storage costs"
    },
    {
      content: "We have recently started a journey with Sagittarius platform and I can't speak highly enough of the chemistry data visualization capabilities.",
      author: "Prof. Michael Rodriguez", 
      position: "Head of Chemistry, MIT",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "500+",
      metricLabel: "Compounds analyzed with automatic structure recognition"
    },
    {
      content: "We achieved efficient visibility and robust security without the operational complexity and had to deal with multiple going to different platforms.",
      author: "Dr. Lisa Thompson",
      position: "Physics Department, CERN",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "$254K",
      metricLabel: "Annual savings in SEM licensing and data storage costs"
    },
    {
      content: "Sagittarius amplifies the value of our research data. It changes how we look at collaboration and data sharing with international partners.",
      author: "Dr. James Wilson",
      position: "Director, National Institutes of Health",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "90%+",
      metricLabel: "Reduction in manual data processing time"
    },
    {
      content: "Sagittarius simplified the entire process of managing our quantum physics research data and made it accessible to non-technical stakeholders.",
      author: "Dr. Rachel Kim",
      position: "Quantum Research Lead, IBM Research",
      avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "75%",
      metricLabel: "Faster time-to-insight for research findings"
    },
    {
      content: "The platform revolutionized how we present our molecular biology findings to grant committees and collaborate with international research teams.",
      author: "Prof. David Park",
      position: "Vice President of Research, Harvard Medical School",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
      metric: "3x",
      metricLabel: "Increase in successful grant applications"
    }
  ];

  return (
    <section className="section-padding bg-sage-bg">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Don't just take our word for it;
            <br />
            our customers <span className="gradient-text">say it best</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card group hover:scale-[1.02] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sage-accent text-sage-accent" />
                ))}
              </div>

              {/* Quote */}
              <div className="mb-6">
                <Quote className="w-6 h-6 text-sage-accent mb-3" />
                <p className="text-sage-text leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-sage-text-light">{testimonial.author}</div>
                  <div className="text-sm text-sage-text">{testimonial.position}</div>
                </div>
              </div>

              {/* Metric */}
              <div className="border-t border-sage-border pt-4">
                <div className="text-2xl font-bold text-sage-accent mb-1">
                  {testimonial.metric}
                </div>
                <div className="text-xs text-sage-text">
                  {testimonial.metricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-sage-text-light mb-4">
            Join these leading research institutions
          </h3>
          <p className="text-sage-text mb-8 max-w-2xl mx-auto">
            See how Sagittarius can transform your scientific data presentation and research collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Request a Demo</button>
            <button className="btn-secondary">View Case Studies</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;