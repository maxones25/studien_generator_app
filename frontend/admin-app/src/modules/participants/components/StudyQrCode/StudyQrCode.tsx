import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";
import QRCode from "react-qr-code";

export interface StudyQrCodeProps extends BoxProps {
  uri: string | undefined;
}

export const StudyQrCode = forwardRef<any, StudyQrCodeProps>(
  ({ uri, ...props }, ref) => {
    return (
      <Box display="flex" justifyContent="center" {...props}>
        {uri && <QRCode ref={ref} value={uri} />}
      </Box>
    );
  }
);
