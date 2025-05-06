export type Questions = {
  id: string;
  text: string;
};

export type Form = {
  title: string;
  description: string;
  questions: Questions[];
};

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    questions?: {
      id?: string[];
      text?: string[];
    }[];
  };
  message?: string | null;
};
