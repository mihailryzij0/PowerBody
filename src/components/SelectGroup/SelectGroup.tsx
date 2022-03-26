import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  SelectGroupState,
  SelectGrupItems,
} from "../../pages/IndividualWorkout";

interface SelectGroup {
  state: SelectGroupState;
  onCriteriaChange: Dispatch<SetStateAction<SelectGroupState>>;
  selectGrupItems: SelectGrupItems[];
}

export default function SelectGroup({
  state,
  onCriteriaChange,
  selectGrupItems,
}: SelectGroup) {
  const handleSelectChange = useCallback(
    (ev, item) => {
      onCriteriaChange({ ...state, ...{ [item]: ev.target.value } });
      console.log(state);
    },
    [state]
  );
  return (
    <>
      {selectGrupItems.map((select) => (
        <FormControl sx={{ mt: 1, minWidth: 360 }} key={select.criteria}>
          <FormHelperText>{select.placeholder}</FormHelperText>
          <Select
            value={state[select.criteria]}
            onChange={(e) => handleSelectChange(e, select.criteria)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disableRipple={true} key={"20"} value="">
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