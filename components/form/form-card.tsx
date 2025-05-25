import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import DeleteFormButton from "@/components/form/delete-form-button";

type FormCardProps = {
  id: string;
  title: string;
  description?: string | null;
  responsesCount: number;
  createdAt: Date;
};

const FormCard = ({
  id,
  title,
  description,
  responsesCount,
  createdAt,
}: FormCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 ">
        <p className="text-sm text-gray-500">{responsesCount} responses</p>
        <p className="text-sm text-gray-500">Created: {formattedDate}</p>
      </CardContent>
      <CardFooter className="flex-col xl:flex-row justify-between gap-2">
        <Button asChild variant="outline" className="flex-1 w-full">
          <Link href={`/dashboard/forms/${id}`}>View Form</Link>
        </Button>

        <Button asChild className="flex-1 w-full">
          <Link href={`/dashboard/forms/${id}/responses`}>Responses</Link>
        </Button>

        <DeleteFormButton formId={id} />
      </CardFooter>
    </Card>
  );
};

export default FormCard;
