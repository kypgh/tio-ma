import Link, { LinkProps } from "next/link";
import React from "react";

/**
 *
 * @typedef {Object} AlinkProps
 * @property {string} href
 * @property {string} name
 * @param {LinkProps & AlinkProps & React.AnchorHTMLAttributes<AnchorHTMLAttributes>} param0
 */
export default function Alink({ href, name, ...rest }) {
  return (
    <Link href={href} {...rest}>
      {name}
    </Link>
  );
}
