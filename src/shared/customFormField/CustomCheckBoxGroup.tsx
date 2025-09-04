import { Checkbox, CheckboxGroup } from "@heroui/react";
import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';
import "./custom.scss";

type Size = "sm" | "md" | "lg";
type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type Radius = "full" | "lg" | "md" | "sm";

interface ISelectOption {
    title: string;
    value: string;
}

interface CustomCheckBoxGroupProps extends FieldProps {
    label?: string;
    isDisabled?: boolean;
    defaultSelected?: string[];
    options?: ISelectOption[];
    value?: string[];
    onChange?: (value: any) => void;
    className?: string;
    size?: Size;
    color?: Color;
    radius?: Radius;
    isIndeterminate?: boolean;
    lineThrough?: boolean;
    icon?: React.ReactNode;
    orientation?: "horizontal" | "vertical";
}


const CustomCheckBoxGroup: React.FC<CustomCheckBoxGroupProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { orientation, isDisabled, value, onChange, className, options, defaultSelected, size, color, radius, isIndeterminate, lineThrough, icon } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <>
            <CheckboxGroup
                className={className}
                isDisabled={isDisabled}
                defaultValue={defaultSelected}
                onValueChange={onChange}
                value={value}
                color={color || "primary"}
                size={size || "md"}
                orientation={orientation || "vertical"}
                lineThrough={lineThrough || false}
                radius={radius || "md"}
                classNames={{
                    label: "!text-black"
                }}
                // icon={icon}
            >
                {(options ?? []).map((option: ISelectOption) => (
                    <Checkbox  key={option.value} value={option.value}>{option.title}</Checkbox>
                ))}
            </CheckboxGroup>
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </>
    )
}

export default CustomCheckBoxGroup;
