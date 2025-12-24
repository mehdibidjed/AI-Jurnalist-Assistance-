import React from 'react';
import MainLayout from '../layout/MainLayout';
import { FormField, TextArea, InputField } from '../components/FormElements';
import StatusLegend from '../components/StatusLegend';

const TellUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("AI Analysis Started...");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#0A3D62] mb-4">
            Tell Us
          </h1>
          <p className="text-gray-500 font-medium">
            Submit a news item for AI-powered verification and analysis
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 p-12 border border-gray-50">
          <form onSubmit={handleSubmit}>
            
            <FormField label="News Content">
              <TextArea placeholder="Paste or type the news content here..." />
            </FormField>

            <FormField label="Source / Link (Optional)">
              <InputField placeholder="https://example.com/article" />
            </FormField>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-200"
            >
              <span className="text-xl">🛡️</span>
              Analyze News
            </button>

            {/* Bottom Indicators */}
            <StatusLegend />
          </form>
        </div>
      </div>
    </>
  );
};

export default TellUs;