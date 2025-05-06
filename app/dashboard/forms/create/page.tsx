import { FormBuilder } from "@/app/components/form/form-builder";

export default function CreateFormPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Form</h1>
        <p className="text-gray-500 mt-1">
          Desing your form to collect d ata from your users
        </p>
      </div>

      <FormBuilder />
    </div>
  );
}
