'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', requestDetails: '', budget: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', requestDetails: '', budget: '' }); // Reset form
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-neutral-900 rounded-lg text-white">
      <div>
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          required
          className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-neutral-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Project Details</label>
        <textarea
          required
          rows={4}
          placeholder="Tell us what you want to build..."
          className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-neutral-500"
          value={formData.requestDetails}
          onChange={(e) => setFormData({ ...formData, requestDetails: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Estimated Budget</label>
        <select
          required
          className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-neutral-500"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        >
          <option value="" disabled>Select a tier...</option>
          <option value="Under €1,500">Under €1,500</option>
          <option value="€1,500 - €3,000">€1,500 - €3,000</option>
          <option value="€3,000 - €5,000">€3,000 - €5,000</option>
          <option value="€5,000+">€5,000+</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 px-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>

      {status === 'success' && <p className="text-green-400 text-sm">Inquiry sent! We will reach out shortly.</p>}
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
    </form>
  );
}