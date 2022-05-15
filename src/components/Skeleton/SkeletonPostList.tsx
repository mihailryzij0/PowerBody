import { Stack, Skeleton, styled } from "@mui/material";
import React from "react";

export default function SkeletonPostList() {
  const MySkeleton = styled(Skeleton)`
    width: 100%;
    height: 164px;
    border-radius: 20px;
  `;
  return (
    <Stack spacing={2} mt={2}>
      <MySkeleton variant="rectangular" />
      <MySkeleton variant="rectangular" />
      <MySkeleton variant="rectangular" />
      <MySkeleton variant="rectangular" />
    </Stack>
  );
}
