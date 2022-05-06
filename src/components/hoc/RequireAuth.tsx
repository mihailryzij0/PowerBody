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

export default function RequireAuth({
  children,
}: Record<string, ReactElement>) {
  const location = useLocation() as Location;
  const isAuth = localStorage.getItem("isAuth");
  if (!isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return children;
}
