import { Snackbar, Alert } from "@mui/material";

export default function ErrorSnackbar({
    handleOpen,
    handleClose,
    children,
    severityType,
}) {
    return (
        <Snackbar
            open={handleOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severityType}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {children}
            </Alert>
        </Snackbar>
    );
}
