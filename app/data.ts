// Tipos para Preguntas y Opciones
export type QuestionOption = {
  id: string; // "A", "B", "C"
  text: string; // "Playa", "Montaña", "Ciudad"
};

export type QuestionRecord = {
  id: number;
  question: string;
  options: QuestionOption[];
};

////////////////////////////////////////////////////////////////////////////////
// Fake Questions DB
const fakeQuestions = {
  records: [] as QuestionRecord[],

  async getAll(): Promise<QuestionRecord[]> {
    return this.records;
  },

  async get(id: number): Promise<QuestionRecord | null> {
    return this.records.find((question) => question.id === id) || null;
  },

  initialize(questions: QuestionRecord[]) {
    this.records = questions;
  },
};

// Inicialización de las preguntas
const initialQuestions: QuestionRecord[] = [
  {
    id: 1,
    question: "¿Qué tipo de entorno prefieres para tus vacaciones?",
    options: [
      { id: "A", text: "Playa" },
      { id: "B", text: "Montaña" },
      { id: "C", text: "Ciudad" },
    ],
  },
  {
    id: 2,
    question: "¿Qué clima prefieres durante tus vacaciones?",
    options: [
      { id: "A", text: "Caluroso" },
      { id: "B", text: "Templado" },
      { id: "C", text: "Frío" },
    ],
  },
  {
    id: 3,
    question:
      "¿Qué tipo de actividades prefieres hacer durante tus vacaciones?",
    options: [
      { id: "A", text: "Deportes y aventuras" },
      { id: "B", text: "Cultura y museos" },
      { id: "C", text: "Relax y bienestar" },
    ],
  },
  {
    id: 4,
    question: "¿Qué tipo de alojamiento prefieres?",
    options: [
      { id: "A", text: "Hotel de lujo" },
      { id: "B", text: "Hostal o albergue" },
      { id: "C", text: "Airbnb o apartamento" },
    ],
  },
  {
    id: 5,
    question: "¿Cuánto tiempo planeas quedarte de vacaciones?",
    options: [
      { id: "A", text: "Menos de una semana" },
      { id: "B", text: "Una a dos semanas" },
      { id: "C", text: "Más de dos semanas" },
    ],
  },
  {
    id: 6,
    question: "¿Cuál es tu rango de edad?",
    options: [
      { id: "A", text: "Menos de 30 años" },
      { id: "B", text: "30-50 años" },
      { id: "C", text: "Más de 50 años" },
    ],
  },
];

fakeQuestions.initialize(initialQuestions);

////////////////////////////////////////////////////////////////////////////////
// Helper functions for questions
export async function getQuestions() {
  return fakeQuestions.getAll();
}

export async function getQuestion(id: number) {
  return fakeQuestions.get(id);
}
