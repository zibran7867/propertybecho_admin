import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './custom.scss';

interface CustomPhoneNumberInputProps extends FieldProps {
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
    className?: string;
}

const CustomPhoneNumberInput: React.FC<CustomPhoneNumberInputProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const { label, value, onChange, className, ...rest } = props;

    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    React.useEffect(() => {
        // for tabIndex change in phone Input
        let selectedFlagDiv = document.getElementsByClassName('selected-flag')
        selectedFlagDiv[0].setAttribute("tabIndex", '1')
    }, []);

    return (
        <div className={className}>
            {label && <label>{label}</label>}
            <PhoneInput
                {...fields}
                {...rest}
                value={value}
                onChange={onChange}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </div>
    );
};

export default CustomPhoneNumberInput
