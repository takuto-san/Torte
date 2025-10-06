import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { FormButtonProps } from "@/types/propsTypes";

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  loading = false,
  loadingIndicator,
  hideChildrenOnLoading = false,
  replaceChildrenOnLoading = false,
  overlay = true,
  disabled,
  sx,
  ...buttonProps
}) => {
  const isDisabled = Boolean(disabled) || loading;
  const showOnlyIndicator = replaceChildrenOnLoading || hideChildrenOnLoading;
  const indicatorNode =
    loadingIndicator ?? <CircularProgress size={20} color="inherit" />;

  return (
    <Box
      position="relative"
      display={buttonProps.fullWidth ? "block" : "inline-block"}
    >
      <Button
        {...(buttonProps as ButtonProps)}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        sx={{
          minHeight: 40,
          position: "relative",
          ...((sx as any) ?? {}),
        }}
      >
        {showOnlyIndicator ? null : children}
      </Button>

      {loading && (overlay || showOnlyIndicator) && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {indicatorNode}
        </Box>
      )}
    </Box>
  );
};