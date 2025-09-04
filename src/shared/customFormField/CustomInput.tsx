import { Input } from "@heroui/input";
import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import "./custom.scss";

type LabelPlacement = "outside" | "outside-left" | "outside-top" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomInputProps extends FieldProps {
    type?: string;
    label?: string;
    disabled?: boolean;
    value?: any;
    variant?: Variants;
    onChange?: (value: any) => void;
    labelPlacement?: LabelPlacement;
    className?: string;
    placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { type, label, disabled, value, variant, onChange, placeholder, labelPlacement, className } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <Input
                type={type === 'password' ? isVisible ? "text" : "password" : type}
                label={label}
                className={className}
                onChange={(e) => onChange && onChange(e?.target?.value)}
                value={value}
                disabled={disabled}
                variant={variant || "bordered"} 
                placeholder={placeholder}
                labelPlacement={labelPlacement || 'outside-top'}
                endContent={
                    type === 'password' && (<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <GoEye className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <GoEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>)
                }
                classNames={{
                    label: "!text-black"
                }}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </>
    )
}

export default CustomInput
