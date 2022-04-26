import { Slider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormInputSlider = ({ name }: Record<string, string>) => {
  const [sliderValue, setSliderValue] = React.useState(2);
  const { setValue, control } = useFormContext();

  useEffect(() => {
    if (sliderValue) setValue("weeks", sliderValue);
  }, [sliderValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <>
      <Typography id="non-linear-slider" gutterBottom>
        Недель: {sliderValue}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={() => (
          <Slider
            aria-label="Always visible"
            value={sliderValue}
            onChange={handleChange}
            defaultValue={6}
            min={2}
            step={1}
            max={12}
          />
        )}
      />
    </>
  );
};
