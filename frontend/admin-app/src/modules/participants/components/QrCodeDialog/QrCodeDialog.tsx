import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
} from "@mui/material";
import React from "react";
import { StudyQrCode } from "..";
import { Button, IconButton, Row, Text } from "@modules/core/components";
import { Check, CopyAll } from "@mui/icons-material";
import { useClipboard } from "@modules/core/hooks";
import { LoginData } from "@modules/participants/types";

export interface QrCodeDialogProps
  extends Omit<DialogProps, "open" | "onClose"> {
  onClose: () => void;
  loginData?: LoginData;
}

export const QrCodeDialog: React.FC<QrCodeDialogProps> = ({
  loginData,
  onClose,
  ...props
}) => {
  const clipboard = useClipboard();

  return (
    <Dialog data-testid="qr code page" open={Boolean(loginData)} {...props}>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Dies ist der QR Code zur Probanden-App. Dieser QR Code sollte nun von
          dem Probanden gescannt werden. Dieser QR Code kann nicht nochmal
          angezeigt werden.
        </DialogContentText>
        <Row>
          <StudyQrCode uri={loginData?.uri} m={2} />
          <StudyQrCode 
            uri={JSON.stringify({
              loginId: loginData?.loginId, 
              password: loginData?.password
            })} 
            m={2}
          />
        </Row>
        <DialogContentText sx={{ textAlign: "center" }}>
          Falls der QR Code nicht funktioniert ist hier nochmal der Link zur
          App:
        </DialogContentText>
        <Row mt={2} justifyContent="center">
          <Text align="center">{loginData?.uri}</Text>
          <IconButton
            testId="copy uri"
            Icon={
              clipboard.isCopied ? (
                <Check color="success" />
              ) : (
                <CopyAll color="primary" />
              )
            }
            onClick={clipboard.handleCopy(loginData?.uri ?? '')}
          />
        </Row>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button testId="close qr dialog" onClick={onClose}>
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
