import React, { useState } from 'react';
import { Settings, Users, FileText, BarChart3, Edit3, Save, Plus, Trash2 } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('faq');
  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah@stanford.edu',
      company: 'Stanford University',
      researchArea: 'biology',
      projectType: 'new-website',
      budget: '25k-50k',
      message: 'Looking for a modern biology research platform...',
      submittedAt: '2025-01-25T10:30:00Z'
    },
    {
      id: '2', 
      name: 'Prof. Michael Rodriguez',
      email: 'mrodriguez@mit.edu',
      company: 'MIT',
      researchArea: 'chemistry',
      projectType: 'data-platform',
      budget: '50k-100k',
      message: 'Need a comprehensive chemical data analysis platform...',
      submittedAt: '2025-01-24T15:45:00Z'
    }
  ]);

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How long does a typical project take?',
      answer: '[REPLACE WITH COMPANY_TEXT] Most projects take 6-12 weeks depending on complexity and requirements. We provide detailed timelines during our initial consultation.'
    },
    {
      id: '2',
      question: 'Do you work with international research institutions?',
      answer: '[REPLACE WITH COMPANY_TEXT] Yes, we work with research institutions worldwide. We have experience with different compliance requirements and can accommodate various time zones.'
    },
    {
      id: '3',
      question: 'What makes Sagittarius different from other web development companies?',
      answer: '[REPLACE WITH COMPANY_TEXT] We specialize exclusively in AI-powered websites for scientific research. Our team has deep expertise in biology, chemistry, and physics applications.'
    },
    {
      id: '4',
      question: 'Can you integrate with our existing research systems?',
      answer: '[REPLACE WITH COMPANY_TEXT] Absolutely. We have experience integrating with various research databases, lab equipment, and existing software systems used in scientific research.'
    }
  ]);

  const [footerContent, setFooterContent] = useState({
    companyDescription: '[REPLACE WITH COMPANY_TEXT] Building the future of scientific research through AI-powered websites that help researchers in biology, chemistry, and physics share their discoveries more effectively.',
    contactEmail: '[REPLACE WITH COMPANY_TEXT] info@sagittarius.ai',
    contactPhone: '[REPLACE WITH COMPANY_TEXT] +1 (555) 123-4567',
    contactAddress: '[REPLACE WITH COMPANY_TEXT] San Francisco, CA'
  });

  const [editingFAQ, setEditingFAQ] = useState<string | null>(null);
  const [editingFooter, setEditingFooter] = useState(false);

  const tabs = [
    { id: 'faq', name: 'FAQ Management', icon: FileText },
    { id: 'footer', name: 'Footer Content', icon: Edit3 },
    { id: 'leads', name: 'Lead Management', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const exportLeadsToCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Research Area', 'Project Type', 'Budget', 'Message', 'Submitted At'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.name,
        lead.email,
        lead.company,
        lead.researchArea,
        lead.projectType,
        lead.budget,
        `"${lead.message}"`,
        new Date(lead.submittedAt).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sagittarius-leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const addNewFAQ = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: 'New FAQ Question',
      answer: '[REPLACE WITH COMPANY_TEXT] New FAQ answer...'
    };
    setFaqItems([...faqItems, newFAQ]);
    setEditingFAQ(newFAQ.id);
  };

  const deleteFAQ = (id: string) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqItems(faqItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateFooterContent = (field: keyof typeof footerContent, value: string) => {
    setFooterContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-sage-bg">
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-sage-text-light mb-6">
                Admin Dashboard
              </h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-sage-accent text-sage-bg'
                          : 'text-sage-text hover:bg-sage-deep hover:text-sage-text-light'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* FAQ Management */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-sage-text-light">
                      FAQ Management
                    </h3>
                    <button
                      onClick={addNewFAQ}
                      className="btn-primary inline-flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New FAQ
                    </button>
                  </div>

                  <div className="space-y-4">
                    {faqItems.map((faq) => (
                      <div key={faq.id} className="border border-sage-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-sage-text-light">
                            FAQ Item #{faq.id}
                          </h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingFAQ(editingFAQ === faq.id ? null : faq.id)}
                              className="p-2 text-sage-accent hover:bg-sage-accent/10 rounded-lg transition-all duration-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteFAQ(faq.id)}
                              className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {editingFAQ === faq.id ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-sage-text-light mb-2">
                                Question
                              </label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                                className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-sage-text-light mb-2">
                                Answer
                              </label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent resize-none"
                              />
                            </div>
                            <button
                              onClick={() => setEditingFAQ(null)}
                              className="btn-primary inline-flex items-center"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="font-medium text-sage-text-light">
                              Q: {faq.question}
                            </p>
                            <p className="text-sage-text">
                              A: {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Content Management */}
            {activeTab === 'footer' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-sage-text-light">
                      Footer Content Management
                    </h3>
                    <button
                      onClick={() => setEditingFooter(!editingFooter)}
                      className="btn-primary inline-flex items-center"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {editingFooter ? 'Save Changes' : 'Edit Footer'}
                    </button>
                  </div>

                  {editingFooter ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-sage-text-light mb-2">
                          Company Description
                        </label>
                        <textarea
                          value={footerContent.companyDescription}
                          onChange={(e) => updateFooterContent('companyDescription', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent resize-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-sage-text-light mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={footerContent.contactEmail}
                            onChange={(e) => updateFooterContent('contactEmail', e.target.value)}
                            className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-sage-text-light mb-2">
                            Contact Phone
                          </label>
                          <input
                            type="text"
                            value={footerContent.contactPhone}
                            onChange={(e) => updateFooterContent('contactPhone', e.target.value)}
                            className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-sage-text-light mb-2">
                          Contact Address
                        </label>
                        <input
                          type="text"
                          value={footerContent.contactAddress}
                          onChange={(e) => updateFooterContent('contactAddress', e.target.value)}
                          className="w-full px-3 py-2 bg-sage-deep border border-sage-border rounded-lg text-sage-text focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sage-text-light mb-2">Company Description</h4>
                        <p className="text-sage-text">{footerContent.companyDescription}</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-sage-text-light mb-2">Email</h4>
                          <p className="text-sage-text">{footerContent.contactEmail}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sage-text-light mb-2">Phone</h4>
                          <p className="text-sage-text">{footerContent.contactPhone}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sage-text-light mb-2">Address</h4>
                          <p className="text-sage-text">{footerContent.contactAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lead Management */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-sage-text-light">
                      Lead Management
                    </h3>
                    <button
                      onClick={exportLeadsToCSV}
                      className="btn-primary"
                    >
                      Export to CSV
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-sage-border">
                          <th className="text-left p-3 text-sage-text-light font-medium">Name</th>
                          <th className="text-left p-3 text-sage-text-light font-medium">Email</th>
                          <th className="text-left p-3 text-sage-text-light font-medium">Company</th>
                          <th className="text-left p-3 text-sage-text-light font-medium">Research Area</th>
                          <th className="text-left p-3 text-sage-text-light font-medium">Budget</th>
                          <th className="text-left p-3 text-sage-text-light font-medium">Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-sage-border hover:bg-sage-deep/50">
                            <td className="p-3 text-sage-text">{lead.name}</td>
                            <td className="p-3 text-sage-text">{lead.email}</td>
                            <td className="p-3 text-sage-text">{lead.company}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-xs">
                                {lead.researchArea}
                              </span>
                            </td>
                            <td className="p-3 text-sage-text">{lead.budget}</td>
                            <td className="p-3 text-sage-text">
                              {new Date(lead.submittedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {leads.length === 0 && (
                    <div className="text-center py-8 text-sage-text">
                      No leads yet. Check back later!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-2xl font-bold text-sage-text-light mb-6">
                    Analytics Dashboard
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="stat-card text-center">
                      <div className="text-3xl font-bold text-sage-accent mb-2">2,847</div>
                      <div className="text-sage-text">Total Visitors</div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-3xl font-bold text-sage-accent mb-2">127</div>
                      <div className="text-sage-text">Leads Generated</div>
                    </div>
                    <div className="stat-card text-center">
                      <div className="text-3xl font-bold text-sage-accent mb-2">4.2%</div>
                      <div className="text-sage-text">Conversion Rate</div>
                    </div>
                  </div>

                  <p className="text-sage-text">
                    [REPLACE WITH COMPANY_TEXT] Detailed analytics integration would go here. 
                    Connect your preferred analytics service (Google Analytics, etc.) to see 
                    comprehensive website performance data.
                  </p>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-2xl font-bold text-sage-text-light mb-6">
                    System Settings
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-sage-text-light mb-3">Style Guide Information</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-sage-text-light">Primary Background:</strong>
                          <p className="text-sage-text">#050A12 (--bg-color)</p>
                        </div>
                        <div>
                          <strong className="text-sage-text-light">Accent Color:</strong>
                          <p className="text-sage-text">#53D5FF (--accent-color)</p>
                        </div>
                        <div>
                          <strong className="text-sage-text-light">Text Color:</strong>
                          <p className="text-sage-text">#B8BBC4 (--text-color)</p>
                        </div>
                        <div>
                          <strong className="text-sage-text-light">Font Family:</strong>
                          <p className="text-sage-text">Inter, system fonts</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sage-text-light mb-3">Editable Placeholders</h4>
                      <p className="text-sage-text text-sm mb-2">
                        Look for <code className="bg-sage-deep px-2 py-1 rounded">[REPLACE WITH COMPANY_TEXT]</code> 
                        throughout the site to customize content.
                      </p>
                      <p className="text-sage-text text-sm">
                        Use this admin panel to edit FAQ items and footer content. For other content changes, 
                        edit the component files directly or implement a full CMS solution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;