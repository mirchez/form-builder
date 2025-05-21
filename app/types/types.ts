export type Questions = {
  id: string;
  text: string;
};

export type Form = {
  id?: string;
  title: string;
  description: string;
  questions: Questions[];
};

//TODO: create a form for db response

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

export type FormProps = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  _count: {
    responses: number;
  };
};
export type FormListProps = {
  forms: FormProps[];
};
