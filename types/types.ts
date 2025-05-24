export type Questions = {
  id: string;
  text: string;
  order: number;
};

export type Form = {
  id?: string;
  title: string;
  description?: string;
  questions: Questions[];
};

//TODO: create a form for db response

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
