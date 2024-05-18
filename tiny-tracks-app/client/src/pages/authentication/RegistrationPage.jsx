import React, { useState } from "react";
import { logo } from "@/assets/assets.js";
import PrimaryButton from "@/components/ui/PrimaryButton.jsx";
import { register } from "@/services/api/authentication.js";
import useRouting from "@/components/routes";
import ErrorSnackbar from "@/components/ui/ErrorSnackbar";
import { TextField } from "@mui/material";
import SomeCircles from "@/components/shared/styles/SomeCircles";
import {
    formFields,
    formFieldsLabels,
} from "@/components/lib/constants/formData";

function Login() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severityType, setSeverityType] = useState("success");
    const [errorMessage, setErrorMessage] = useState("");
    const { navigateToLogin } = useRouting();

    const [formData, setFormData] = useState(formFields);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    // Handles login event
    const handleLoginButton = async (e) => {
        // TODO: Add more error handling here

        e.preventDefault();
        if (!formData.email || !formData.password) {
            console.log("Forms are empty.");
            setSnackbarOpen(true);
            setErrorMessage("Please fill up all fields.");
            setSeverityType("error");
            return;
        }

        try {
            // Sends payload to server
            const response = await register(formData);

            if (response.status === 201) {
                navigateToLogin();
                setSnackbarOpen(true);
                setErrorMessage("Success.");
            }
        } catch (error) {
            setSnackbarOpen(true);
            setSeverityType("error");

            const responseText = JSON.parse(error.response.request.response);
            // console.log(JSON.parse(error.response.request.response));

            if (Object.keys(responseText).length > 0) {
                for (const key in responseText) {
                    setErrorMessage(
                        `Error ${error.response.status} - ${responseText[key][0]}`
                    );
                }
                return;
            }
            //! Custom error message
            setErrorMessage("Please try again later");
        }
    };

    // Handles input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-light-tint justify-around items-center hidden">
                <div>
                    <img src={logo} alt="" className="w-96" />
                    <p className="mx-5 text-lg">
                        Pediatric Gross Motor Skills Assessment System
                    </p>
                </div>
                <SomeCircles />
            </div>
            <div className="flex-col flex md:w-1/2 justify-center py-10 items-center bg-white">
                <form className="bg-blue-700 w-[45%] p-10 rounded-lg">
                    <h1 className="font-bold text-white text-2xl mb-1">
                        Create a new account
                    </h1>
                    <p className="text-white text-sm">
                        Welcome! Let's create your account.
                    </p>
                    <div className="flex flex-col mt-3">
                        <div className="flex flex-col mt-3 gap-3">
                            {Object.keys(formData).map((key) => (
                                <TextField
                                    key={key}
                                    fullWidth
                                    id={key}
                                    label={formFieldsLabels[key]}
                                    variant="filled"
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    type={
                                        key.toLowerCase().includes("password")
                                            ? "password"
                                            : ""
                                    }
                                    autoComplete={
                                        key.toLowerCase().includes("password")
                                            ? "currentPassword"
                                            : ""
                                    }
                                    name={key}
                                    InputProps={{
                                        disableUnderline: true,
                                        style: {
                                            color: "black",
                                            backgroundColor: "white",
                                        },
                                    }}
                                />
                            ))}
                        </div>
                        <PrimaryButton onClick={handleLoginButton}>
                            Sign Up
                        </PrimaryButton>
                        <div className=" flex border border-white p-2 my-2 gap-2 items-center rounded-lg align-around">
                            <span className="text-white text-sm">
                                Already have an account yet?
                            </span>
                            <button
                                className="font-bold text-blue-200 text-sm hover:text-white hover:underline-offset-2 cursor-pointer"
                                onClick={() => navigateToLogin()}
                            >
                                Log in
                            </button>
                        </div>
                        <p className="text-white text-xs">
                            By signing in, you accept all our terms and
                            agreements.
                        </p>
                    </div>
                </form>
            </div>
            <ErrorSnackbar
                handleOpen={snackbarOpen}
                handleClose={handleClose}
                severityType={severityType}
            >
                {errorMessage}
            </ErrorSnackbar>
        </div>
    );
}

export default Login;
