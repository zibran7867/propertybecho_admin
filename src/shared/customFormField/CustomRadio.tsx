import { Radio, RadioGroup } from '@heroui/radio';
import { FieldProps } from "formik";
import _ from 'lodash';

interface ISelectOption {
    title: string;
    value: string;
}

type Orientation = "horizontal" | "vertical";

interface CustomRadioProps extends FieldProps {
    label?: string;
    orientation?: Orientation;
    value?: any;
    options?: ISelectOption[];
    defaultOption?: string;
    onChange?: (value: any) => void;
    className?: string;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
    field: { ...fields }, 
    form: { touched, errors },
     ...props 
}) => {

    const { value, label, orientation, onChange, options, defaultOption, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));

    return (
        <>
            <RadioGroup
                label={label}
                value={value}
                orientation={orientation || "horizontal"}
                onValueChange={(value) => onChange && onChange(value)}
                className='d-flex'
            >
                {(options ?? []).map((option: ISelectOption) => (
                    <Radio key={option.value} value={option.value}>{option.title}</Radio>
                ))}
            </RadioGroup>
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </>
    )
}

export default CustomRadio
