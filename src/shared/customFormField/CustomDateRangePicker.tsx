import { DateRangePicker } from '@heroui/react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { DateValue } from "@react-types/datepicker";
import { RangeValue } from "@react-types/shared";
import { FieldProps } from "formik";
import _ from 'lodash';
import React from 'react';
import { formatMomentDate } from './CustomDatePicker';

type LabelPlacement = "outside" | "outside-left" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomInputProps extends FieldProps {
    minDate?: boolean;
    maxDate?: boolean;
    label?: string;
    visibleMonths?: number;
    value?: any;
    variant?: Variants;
    onChange?: (value: any) => void;
    labelPlacement?: LabelPlacement;
    className?: string;
    placeholder?: string;
}

const CustomDateRangePicker: React.FC<CustomInputProps> = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {

    const { label, value, minDate, maxDate, variant, onChange, visibleMonths, labelPlacement, className } = props

    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    const initialStart = value?.start ? parseDate(value?.start) : undefined;
    const initialEnd = value?.end ? parseDate(value?.end) : undefined;

    const [selectedValue, setSelectedValue] = React.useState<RangeValue<DateValue> | undefined>(
        initialStart && initialEnd
        ? { start: initialStart, end: initialEnd }
        : undefined
    );

    return (
        <div>
            <DateRangePicker
                label={label}
                value={selectedValue}
                labelPlacement={labelPlacement || "outside"}
                className={className}
                variant={variant || "bordered"}
                minValue={minDate ? today(getLocalTimeZone()) : undefined}
                maxValue={maxDate ? today(getLocalTimeZone()) : undefined}
                visibleMonths={visibleMonths ?? 2}
                pageBehavior="single"
                onChange={(value: any) => {
                    setSelectedValue(value);
                    if (value) {
                        onChange && onChange({ start: formatMomentDate(value?.start), end: formatMomentDate(value?.end)});
                    }
                }}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </div>
    )
}

export default CustomDateRangePicker
