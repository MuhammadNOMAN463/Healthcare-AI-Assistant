import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';
import { processHealthQuery } from './utils/healthUtils';
import { HealthDisclaimer } from './components/HealthDisclaimer';
import { EmergencyAlert } from './components/EmergencyAlert';
import type { HealthResponse } from './types/health';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<HealthResponse | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const result = processHealthQuery(query);
      setResponse(result);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-8">
            <AlertCircle className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">
              Healthcare AI Assistant
            </h1>
          </div>

          <HealthDisclaimer />

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your health concern..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                Ask
              </button>
            </div>
          </form>

          {response && (
            <div className="mt-6 space-y-4">
              {response.isEmergency && <EmergencyAlert />}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="font-semibold text-lg mb-2">Response:</h2>
                <p className="text-gray-700">{response.explanation}</p>
                
                {response.preventiveMeasures && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Preventive Measures:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {response.preventiveMeasures.map((measure, index) => (
                        <li key={index} className="text-gray-700">{measure}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {response.sources && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Sources:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {response.sources.map((source, index) => (
                        <li key={index}>
                          <a
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-500 italic">
                  {response.disclaimer}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;