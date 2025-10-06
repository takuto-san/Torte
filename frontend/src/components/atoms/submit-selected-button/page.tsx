"use client";

import React, { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import { FormButton } from "@/components/atoms/form-button/page";
import { useSubmitSelected } from "@/hooks/useSubmitSelected";

export const SubmitSelectedButton: React.FC<{
  confirmMessage?: string;
}> = ({ confirmMessage = "選択されたアイテムを送信しますか？" }) => {
  const { submit, loading, error, selectedCount } = useSubmitSelected();
  const [open, setOpen] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const openConfirm = useCallback(() => {
    if (selectedCount === 0) return;
    setOpen(true);
    setInternalError(null);
  }, [selectedCount]);

  const closeConfirm = useCallback(() => {
    if (loading) return;
    setOpen(false);
    setInternalError(null);
  }, [loading]);

  const extractErrorMessage = (e: unknown): string =>
    e instanceof Error
      ? e.message
      : typeof e === "string"
      ? e
      : e && typeof e === "object" && typeof (e as Record<string, unknown>)?.message === "string"
      ? (e as Record<string, string>).message
      : "送信に失敗しました";

  const handleSubmit = useCallback(async () => {
    setInternalError(null);
    try {
      await submit();
      setOpen(false);
    } catch (err: unknown) {
      setInternalError(extractErrorMessage(err));
    }
  }, [submit]);

  return (
    <>
      {/* 画面右下の送信ボタン */}
      <Box
        sx={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: (theme) => theme.zIndex.tooltip + 1,
        }}
      >
        <Tooltip title={selectedCount > 0 ? "送信" : "選択項目がありません"}>
          <span>
            <FormButton
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={openConfirm}
              disabled={selectedCount === 0 || loading}
            >
              送信
            </FormButton>
          </span>
        </Tooltip>
      </Box>

      {/* 確認ダイアログ */}
      <Dialog open={open} onClose={closeConfirm}>
        <DialogTitle>送信確認</DialogTitle>
        <DialogContent>
          <div>{confirmMessage}</div>
          <div style={{ marginTop: 8, color: "rgba(255,0,0,0.8)" }}>
            {internalError ?? ""}
          </div>
          {error && (
            <div style={{ marginTop: 8, color: "rgba(255,0,0,0.8)" }}>
              {error.message}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} disabled={loading}>
            キャンセル
          </Button>
          <FormButton onClick={handleSubmit} loading={loading} variant="contained" color="primary">
            送信する
          </FormButton>
        </DialogActions>
      </Dialog>
    </>
  );
};