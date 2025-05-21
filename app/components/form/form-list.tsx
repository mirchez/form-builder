"use client";

import { FormListProps } from "@/app/types/types";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../ui/button";
import Link from "next/link";
import FormCard from "./form-card";

const FormList = ({ forms }: FormListProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = useDebouncedCallback((term) => {
    console.log("works");
    setSearchValue(term);
  }, 300);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2">
        <Input
          type="text"
          placeholder="Search Forms"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Button asChild>
          <Link href="/dashboard/forms/create">Algo Util</Link>
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 font-medium">
            No forms found. Create a new form to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
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
