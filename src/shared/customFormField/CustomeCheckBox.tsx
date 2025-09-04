import { Checkbox } from "@heroui/react";
import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';
import "./custom.scss";

type Size = "sm" | "md" | "lg";
type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type Radius = "full" | "lg" | "md" | "sm";

interface CustomCheckBoxProps extends FieldProps {
    label?: string;
    isDisabled?: boolean;
    defaultSelected?: boolean;
    value?: any;
    onChange?: (value: any) => void;
    className?: string;
    size?: Size;
    color?: Color;
    radius?: Radius;
    isIndeterminate?: boolean;
    lineThrough?: boolean;
    icon?: React.ReactNode;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { label, isDisabled, value, onChange, className, defaultSelected, size, color, radius, isIndeterminate, lineThrough, icon } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <>
            <Checkbox
                className={className}
                isDisabled={isDisabled}
                defaultSelected={defaultSelected}
                onValueChange={onChange}
                isSelected={value}
                color={color || "primary"}
                size={size || "md"}
                isIndeterminate={isIndeterminate || false}
                lineThrough={lineThrough || false}
                radius={radius || "md"}
                classNames={{
                    label: "!text-black"
                }}
                icon={icon}
            >
                {label}
            </ Checkbox>
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </>
    )
}

export default CustomCheckBox;
