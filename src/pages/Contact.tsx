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
      // Simulate form submission - in real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate CSV data for admin
      const csvData = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      
      console.log('Lead captured:', csvData);
      
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        researchArea: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="container-custom text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-6">
            GET IN TOUCH
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Let's Build Your
            <br />
            <span className="gradient-text">Scientific Website</span>
          </h1>
          <p className="text-xl text-sage-text max-w-3xl mx-auto mb-8">
            Ready to transform how you share your research? Our team of AI and web development 
            experts is here to help you create something extraordinary.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="card">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-sage-accent mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-sage-text-light mb-4">
                    Thank You!
                  </h3>
                  <p className="text-sage-text mb-6">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-sage-text-light mb-6">
                    Start Your Project
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
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
                          className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                          placeholder="Dr. Jane Smith"
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
                          className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                          placeholder="jane@university.edu"
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
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                        placeholder="Stanford University"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-text-light mb-2">
                          Research Area *
                        </label>
                        <select
                          name="researchArea"
                          value={formData.researchArea}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
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
                          className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
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
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
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
                        className="w-full px-4 py-3 bg-sage-deep border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent resize-none"
                        placeholder="Tell us about your research, goals, and what kind of website or platform you need..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-sage-bg border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-sage-text-light mb-6">
                  Get in Touch
                </h2>
                <p className="text-sage-text leading-relaxed mb-8">
                  [REPLACE WITH COMPANY_TEXT] We're here to help you create amazing 
                  AI-powered websites for your scientific research. Reach out using 
                  any of the methods below.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="card">
                      <div className="w-10 h-10 bg-gradient-to-r from-sage-accent to-blue-400 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-sage-bg" />
                      </div>
                      <h3 className="font-semibold text-sage-text-light mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sage-text mb-3">
                        {item.details}
                      </p>
                      <a
                        href="#"
                        className="text-sage-accent text-sm font-medium hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.action} →
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* FAQ Quick Links */}
              <div className="card">
                <h3 className="font-semibold text-sage-text-light mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {[
                    'How long does a typical project take?',
                    'What makes Sagittarius different?',
                    'Do you work with international institutions?',
                    'Can you integrate with our existing systems?'
                  ].map((question) => (
                    <a
                      key={question}
                      href="#"
                      className="block text-sage-text hover:text-sage-accent transition-colors duration-200 py-2 border-b border-sage-border last:border-b-0"
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