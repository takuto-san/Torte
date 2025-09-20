import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import type { LinkButtonProps } from "@/types/propsTypes";

export const LinkButton: React.FC<LinkButtonProps> = ({ href, children, ...buttonProps }) => (
  <Link href={href} passHref>
    <Button {...buttonProps}>
      {children}
    </Button>
  </Link>
);
