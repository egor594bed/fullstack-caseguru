import { Container } from "@mui/material";
import { NewEmployeeAuthForm } from "../components/NewEmployeeAuth/NewEmployeeAuthForm";
import { SingleComponentLayout } from "../components/UI/SingleComponentLayout/SingleComponentLayout";

export const NewEmployeeAuth = () => {
  return (
    <SingleComponentLayout>
      <NewEmployeeAuthForm />
    </SingleComponentLayout>
  );
};
