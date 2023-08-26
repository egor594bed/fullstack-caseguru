import { Box, Typography } from "@mui/material";
import { DefaultContainer } from "../DefaultContainer/DefaultContainer";

export const Loading = () => {
  return (
    <>
      <DefaultContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height={"100px"}
        >
          <Typography>Loading...</Typography>
        </Box>
      </DefaultContainer>
    </>
  );
};
