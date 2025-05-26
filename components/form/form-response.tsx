import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ResponseProps = {
  response: {
    id: string;
    createdAt: Date;
    respondentName: string | null;
    respondentEmail: string | null;
    answers: {
      id: string;
      text: string;
      question: {
        id: string;
        text: string;
        order: number;
      };
    }[];
  };
};

export default function FormResponse({ response }: ResponseProps) {
  const formattedDate: string = new Date(
    response.createdAt
  ).toLocaleDateString();
  const formattedTime: string = new Date(
    response.createdAt
  ).toLocaleTimeString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>
            {response.respondentName
              ? `From: ${response.respondentName}`
              : "Anonymous Response"}
            {response.respondentEmail && (
              <span className="text-gray-500 text-sm ml-2">
                ({response.respondentEmail})
              </span>
            )}
          </div>
          <div className="text-sm text-gray-400">
            {formattedDate} at {formattedTime}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {response.answers.map((a) => (
            <div key={a.id}>
              <h3 className="font-medium">
                {a.question.order}. {a.question.text}
              </h3>
              <p className="mt-1 whitespace-pre-wrap bg-gray-100 p-2 rounded">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
