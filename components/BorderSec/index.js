import React from "react";
import { Bordersec } from "./border-sec.styles";

export default function BorderSec({ children, ...rest }) {
  return <Bordersec {...rest}>{children}</Bordersec>;
}
