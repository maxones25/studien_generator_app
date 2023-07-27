import { ExperimentalFormTextField, Form } from "@modules/core/components";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export interface TestPageProps {}

type Data = { employee: string };

const TestPage: React.FC<TestPageProps> = () => {
  const form = useForm<Data>();

  const handleSubmit = (data: Data) => {
    console.log(data);
  };
  return (
    <Form form={form} onSubmit={handleSubmit} p={2}>
      <ExperimentalFormTextField
        form={form}
        name="employee"
        required
        minLength={3}
        maxLength={10}
        withPlaceholder
        validate={{
          test: (value) => value === "Hallo" || "not hallo",
        }}
      />
      <Button type="submit">Submit 1</Button>
    </Form>
  );
};

export default TestPage;
