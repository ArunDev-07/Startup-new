import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  researchArea: string;
  projectType: string;
  budget: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    researchArea: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '4d9c6de1-751f-4a1e-988d-37f201f8ec32',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          researchArea: formData.researchArea,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          subject: `New Project Inquiry from ${formData.name}`
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          researchArea: '',
          projectType: '',
          budget: '',
          message: ''
        });
      } else {
        console.error('Form submission failed:', result);
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: '[REPLACE WITH COMPANY_TEXT] hello@sagittarius.ai',
      action: 'Send an email'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '[REPLACE WITH COMPANY_TEXT] +1 (555) 123-4567',
      action: 'Give us a call'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '[REPLACE WITH COMPANY_TEXT] San Francisco, CA',
      action: 'Get directions'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri: 9AM-6PM PST',
      action: 'Schedule a meeting'
    }
  ];

  return (
    <div className="pt-12 sm:pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-3 sm:mb-5">
            GET IN TOUCH
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Let's Build Your
            <br />
            <span className="gradient-text">Scientific Website</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-sage-text max-w-2xl mx-auto mb-4 sm:mb-6">
            Ready to transform how you share your research? Our team of AI and web development 
            experts is here to help you create something extraordinary.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Contact Form */}
            <div className="w-full lg:w-1/2 card p-5 sm:p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-6 sm:py-8">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-sage-accent mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold text-sage-text-light mb-3 sm:mb-4">
                    Thank You!
                  </h3>
                  <p className="text-sm sm:text-base text-sage-text mb-4 sm:mb-6 px-4">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary px-6 py-3 w-full sm:w-auto"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
                  <h2 className="text-xl sm:text-2xl font-bold text-sage-text-light mb-1">
                    Start Your Project
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-text-light mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                        placeholder="Dr. Jane Smith"
                        aria-label="Name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-sage-text-light mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                        placeholder="jane@university.edu"
                        aria-label="Email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-text-light mb-2">
                      Institution/Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                      placeholder="Stanford University"
                      aria-label="Institution or Company"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-text-light mb-2">
                        Research Area *
                      </label>
                      <select
                        name="researchArea"
                        value={formData.researchArea}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                        aria-label="Research Area"
                      >
                        <option value="">Select area</option>
                        <option value="biology">Biology</option>
                        <option value="chemistry">Chemistry</option>
                        <option value="physics">Physics</option>
                        <option value="interdisciplinary">Interdisciplinary</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-sage-text-light mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                        aria-label="Project Type"
                      >
                        <option value="">Select type</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="data-platform">Data Platform</option>
                        <option value="research-portal">Research Portal</option>
                        <option value="collaboration-tool">Collaboration Tool</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-text-light mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent text-sm sm:text-base"
                      aria-label="Budget Range"
                    >
                      <option value="">Select budget</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-text-light mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder="Tell us about your research, goals, and what kind of website or platform you need..."
                      aria-label="Project Details"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base inline-flex items-center justify-center gap-2"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-sage-bg border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-sage-text-light mb-2">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-sage-text leading-relaxed mb-4">
                  [REPLACE WITH COMPANY_TEXT] We're here to help you create amazing 
                  AI-powered websites for your scientific research. Reach out using 
                  any of the methods below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="card p-4 sm:p-5">
                      <div className="w-10 h-10 bg-gradient-to-r from-sage-accent to-blue-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                        <Icon className="w-5 h-5 text-sage-bg" />
                      </div>
                      <h3 className="font-semibold text-sage-text-light mb-1 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-sage-text mb-2 text-xs sm:text-sm break-words">
                        {item.details}
                      </p>
                      <a
                        href="#"
                        className="text-sage-accent text-xs sm:text-sm font-medium hover:text-blue-400 transition-colors duration-200 inline-block"
                        aria-label={item.action}
                      >
                        {item.action} →
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Quick Links */}
              <div className="card p-4 sm:p-5">
                <h3 className="font-semibold text-sage-text-light mb-3 text-sm sm:text-base">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                  {[
                    'How long does a typical project take?',
                    'What makes Sagittarius different?',
                    'Do you work with international institutions?',
                    'Can you integrate with our existing systems?'
                  ].map((question) => (
                    <a
                      key={question}
                      href="#"
                      className="block text-sage-text hover:text-sage-accent transition-colors duration-200 py-2 border-b border-sage-border last:border-b-0 text-xs sm:text-sm"
                    >
                      {question}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
