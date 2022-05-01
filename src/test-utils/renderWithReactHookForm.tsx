import React from "react";
import { render } from "@testing-library/react";
import { store } from "../store/store";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";

export let FormProviderMethods: UseFormReturn<any, any>;
export function renderWithReactHookForm(
  ui: JSX.Element,
  { defaultValues = {} } = {}
) {
  const Wrapper = ({ children }: Record<string, JSX.Element>) => {
    FormProviderMethods = useForm<any>({ defaultValues });
    return <FormProvider {...FormProviderMethods}>{children}</FormProvider>;
  };
  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
