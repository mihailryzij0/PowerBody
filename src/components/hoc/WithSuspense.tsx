import React, { FC, Suspense } from "react";

export default function WithSuspense(Component: FC) {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}
