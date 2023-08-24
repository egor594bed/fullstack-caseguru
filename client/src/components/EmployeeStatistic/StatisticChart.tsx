import { Typography, Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

type Props = {
  salaryPayouts: { x: string; y: number }[];
};

export const StatisticChart: FC<Props> = ({ salaryPayouts }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <Box ref={ref}>
      <Typography variant="h5">Ожидаемые выплаты зарплаты за год:</Typography>
      <Box sx={{ height: 400 }}>
        <VictoryChart theme={VictoryTheme.material} width={width}>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={salaryPayouts}
          />
        </VictoryChart>
      </Box>
    </Box>
  );
};
