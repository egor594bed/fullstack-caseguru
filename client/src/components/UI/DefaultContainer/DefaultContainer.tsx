import { Container, Paper } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DefaultContainer: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Paper elevation={5} sx={{ padding: 3, marginTop: 3 }}>
        {children}
      </Paper>
    </Container>
  );
};
