import { Textarea } from '@heroui/input';
import { FieldProps } from "formik";
import _ from 'lodash';

type LabelPlacement = "outside" | "outside-left" | "outside-top" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomTextAreaProps extends FieldProps {
    label?: string;
    value?: any;
    variant?: Variants;
    onChange?: (value: any) => void;
    labelPlacement?: LabelPlacement;
    className?: string;
    placeholder?: string;
    maxRows?: number;
    minRows?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ 
    field: { ...fields }, 
    form: { touched, errors }, 
    ...props 
}) => {
    const { label, value, onChange, variant, placeholder, labelPlacement, className, maxRows, minRows } = props
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <>
            <Textarea
                label={label}
                value={value}
                onValueChange={onChange}
                variant={variant || "bordered"}
                placeholder={placeholder}
                labelPlacement={labelPlacement || "outside-top"}
                className={className}
                maxRows={maxRows}
                minRows={minRows}
                classNames={{
                    label: "!text-black"
                }}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </>
    )
}

export default CustomTextArea
