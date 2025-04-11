import { HealthResponse, SYMPTOMS_DATABASE, EMERGENCY_KEYWORDS } from '../types/health';

export function processHealthQuery(query: string): HealthResponse {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check for emergencies first
  const isEmergency = EMERGENCY_KEYWORDS.some(keyword => 
    normalizedQuery.includes(keyword.toLowerCase())
  );

  if (isEmergency) {
    return {
      explanation: "⚠️ This appears to be a medical emergency.",
      isEmergency: true,
      disclaimer: "SEEK IMMEDIATE MEDICAL ATTENTION. Call emergency services or go to the nearest emergency room immediately.",
    };
  }

  // Simple symptom matching (in a real app, this would use more sophisticated NLP)
  const matchedSymptom = SYMPTOMS_DATABASE.find(symptom => 
    normalizedQuery.includes(symptom.name)
  );

  if (matchedSymptom) {
    return {
      explanation: matchedSymptom.description,
      preventiveMeasures: matchedSymptom.selfCare,
      isEmergency: matchedSymptom.severity === 'emergency',
      disclaimer: "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider.",
      sources: [
        "https://www.cdc.gov",
        "https://www.who.int"
      ]
    };
  }

  return {
    explanation: "I apologize, but I couldn't find specific information about your query. Please rephrase or consult with a healthcare provider for accurate medical advice.",
    isEmergency: false,
    disclaimer: "This information is for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider."
  };
}