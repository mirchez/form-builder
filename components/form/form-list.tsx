"use client";

import { FormListProps } from "@/app/types/types";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import FormCard from "./form-card";

const FormList = ({ forms }: FormListProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredForms = forms.filter((form) =>
    form.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2">
        <Input
          type="text"
          placeholder="Search Forms"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <Button asChild>
          <Link href="/dashboard/forms/create">Algo Util</Link>
        </Button>
      </div>

      {filteredForms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 font-medium">
            No forms found. Create a new form to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <FormCard
              key={form.id}
              id={form.id}
              title={form.title}
              description={form.description}
              responsesCount={form._count.responses}
              createdAt={form.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;
