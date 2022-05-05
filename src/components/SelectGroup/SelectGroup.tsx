import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  SelectGroupState,
  SelectGroupItems,
} from "../../pages/GeneratorWorkout";

interface SelectGroup {
  state: SelectGroupState;
  onCriteriaChange: Dispatch<SetStateAction<SelectGroupState>>;
  selectGroupItems: SelectGroupItems[];
  error: boolean;
}

export default function SelectGroup({
  state,
  onCriteriaChange,
  selectGroupItems,
  error,
}: SelectGroup) {
  const handleSelectChange = useCallback(
    (ev, item) => {
      onCriteriaChange({ ...state, ...{ [item]: ev.target.value } });
    },
    [state]
  );
  return (
    <>
      {selectGroupItems.map((select) => (
        <FormControl sx={{ mt: 1, minWidth: "100%" }} key={select.criteria}>
          <FormHelperText>{select.placeholder}</FormHelperText>
          <Select
            error={error}
            value={state[select.criteria]}
            onChange={(e) => handleSelectChange(e, select.criteria)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem key={"20"} value="">
              <em>{select.placeholder}</em>
            </MenuItem>
            {select.items.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </>
  );
}
