import React from "react";
import TextField from "@mui/material/TextField";

const TextInput = ({ label, value, onChange, ...rest }) => {
    return (
        <TextField
            className="bg-white hover:bg-white focus:bg-white focus:ring-0 border border-gray-300 rounded-md"
            label={label}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
};

export default TextInput;
