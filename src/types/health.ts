export interface HealthResponse {
  explanation: string;
  preventiveMeasures?: string[];
  sources?: string[];
  isEmergency: boolean;
  disclaimer: string;
}

export interface Symptom {
  name: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  selfCare?: string[];
  emergencyWarning?: string;
}

// Sample medical knowledge base
export const SYMPTOMS_DATABASE: Symptom[] = [
  {
    name: 'headache',
    severity: 'low',
    description: 'Common condition involving pain in the head region',
    selfCare: [
      'Rest in a quiet, dark room',
      'Stay hydrated',
      'Try over-the-counter pain relievers if appropriate'
    ]
  },
  {
    name: 'chest pain',
    severity: 'emergency',
    description: 'Pain or discomfort in the chest area',
    emergencyWarning: 'This could be a sign of a heart attack. Seek immediate medical attention.'
  }
];

export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'difficulty breathing',
  'stroke',
  'heart attack',
  'severe bleeding',
  'unconscious',
  'suicide',
  'emergency'
];