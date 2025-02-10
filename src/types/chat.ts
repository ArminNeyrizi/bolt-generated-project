export interface Therapist {
  id: string;
  first_name: string;
  last_name: string;
  specialty: 'anxiety_depression' | 'relationship_counseling' | 'stress_management' | 'general';
  image_url: string | null;
  status: string;
}

export interface ChatSession {
  id: string;
  patient_id: string;
  therapist_id: string;
  status: string;
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}
