import { InputOtp } from "@heroui/react";
import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';

type Variants = "flat" | "bordered" | "underlined" | "faded";
type TYPES = "number" | "password";

interface CustomOTPInputProps extends FieldProps {
    type?: TYPES;
    value?: any;
    disabled?: boolean;
    variant?: Variants;
    onChange?: (value: any) => void;
    length?: number;
    className?: string;
    placeholder?: string;
}

const CustomOtpInput: React.FC<CustomOTPInputProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { type, disabled, variant, value, length, onChange, className } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <div className='otp-container'>
            <InputOtp 
                type={type || 'number'}
                length={length || 4}
                value={value}
                variant={variant || "bordered"}
                isDisabled={disabled}
                className={className}
                onValueChange={onChange}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </div>
    )
}

export default CustomOtpInput
