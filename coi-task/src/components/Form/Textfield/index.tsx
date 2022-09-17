import {ReactElement} from "react";
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

export interface InputFieldProps {
    label: string;
    name: string;
    control: any;
}

const COITextField = ({label, control, name}: InputFieldProps) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => (
                <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={label}
                />
            )}
        />
    );
};

export default COITextField;
