import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  FormProviderMethods,
  renderWithReactHookForm,
} from "../../../test-utils/renderWithReactHookForm";
import { FormInputSlider } from "../SliderForm";

describe("FormInputSlider", () => {
  let initialValueForm: { defaultValues: { weeks: number } };
  beforeEach(() => {
    initialValueForm = { defaultValues: { weeks: 4 } };
    renderWithReactHookForm(<FormInputSlider name="weeks" />);
  });

  it("FormInputSlider render", async () => {
    const sliderInput = screen.getByTestId("slider");
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(sliderInput).toBeInTheDocument();
  });

  it("the value is written to the form state", async () => {
    const sliderInput = screen.getByTestId("slider");
    // @ts-ignore: Unreachable code error
    sliderInput.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      };
    });
    fireEvent.mouseDown(sliderInput, { clientX: 162, clientY: 302 });

    expect(FormProviderMethods.getValues()).not.toEqual(initialValueForm);
  });
});
