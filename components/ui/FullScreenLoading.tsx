import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

interface Props {}
const FullScreenLoading: FC<Props> = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 200px)'
      sx={{}}
    >
      <CircularProgress thickness={2} />
    </Box>
  );
};
export default FullScreenLoading;
