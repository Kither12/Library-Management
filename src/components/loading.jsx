import { Stack, CircularProgress } from "@mui/material";

export default function LoadingProgress(){
    return(
        <Stack alignItems="center" sx={{width: "100%"}}>
            <CircularProgress />
        </Stack>
    )
}