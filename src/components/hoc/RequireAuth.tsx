import React, { ReactElement } from "react";
import {
  Hash,
  Navigate,
  Pathname,
  Search,
  useLocation,
} from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";

export interface Location {
  search: Search;
  state?: {
    from: {
      pathname: Pathname;
    };
  };
  hash: Hash;
}

export default function RequireAutch({
  children,
}: Record<string, ReactElement>) {
  const { isAuth, status } = useAppSelector((state) => state.user);
  const location = useLocation() as Location;

  if (!isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return children;
}
