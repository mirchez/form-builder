import { FormBuilder } from "@/components/form/form-builder";

export default function CreateFormPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Form</h1>
        <p className="text-gray-500 mt-1">
          Design your form to collect data from your users
        </p>
      </div>

      <FormBuilder />
    </div>
  );
}
