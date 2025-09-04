import { Select, SelectItem } from '@heroui/select';
import { FieldProps } from "formik";
import _ from 'lodash';

interface ISelectOption {
    title: string;
    value: string;
}

type LabelPlacement = "outside" | "outside-left" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomSelectProps extends FieldProps {
    options?: ISelectOption[];
    label?: string;
    defaultOption?: any;
    value?: any;
    variant?: Variants;
    onChange?: (value: any) => void;
    labelPlacement?: LabelPlacement;
    className?: string;
    placeholder?: string;
    multiple?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
     field: { ...fields }, 
     form: { touched, errors }, 
     ...props 
    }) => {
    const { value, label, onChange, multiple, variant, labelPlacement, placeholder, options, defaultOption, className, ...rest } = props; 
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));

    return (
        <div>
            <Select
                {...fields}
                {...rest}
                label={label}
                defaultSelectedKeys={value}
                variant={variant || "bordered"}
                labelPlacement={labelPlacement || "outside"}
                placeholder={placeholder}
                selectionMode={multiple ? "multiple" : "single"}
                onChange={(e) => {
                    if (onChange) {
                        const selected = multiple
                            ? e.target?.value?.toString()?.split(',')
                            : e.target?.value?.toString()?.split(',');
                        onChange(selected);
                    }
                }}
                className={`${className}`}
                classNames={{
                    label: "!text-black"
                }}
            >
                {(options ?? []).map((option: ISelectOption) => (
                    <SelectItem
                        className="h-[100]"
                        key={option.value}
                        textValue={option.title}
                    >
                        {option.title}
                    </SelectItem>
                ))}
            </Select>
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </div>
    )
}
export default CustomSelect;