import { Box, Container, Paper } from "@mui/material";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const SingleComponentLayout: FC<Props> = ({ children }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "75%",
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
          "& .MuiTextField-root": { width: "100%", marginBottom: 2 },
        }}
      >
        <Paper elevation={3} sx={{ padding: 3 }}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
};
