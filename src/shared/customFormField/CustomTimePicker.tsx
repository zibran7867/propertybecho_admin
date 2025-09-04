import { TimeInput } from '@heroui/react';
import { parseAbsolute, toTime } from "@internationalized/date";
import { FieldProps } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';

type LabelPlacement = "outside" | "outside-left" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomTimePickerProps extends FieldProps {
  label?: string;
  value?: string;
  variant?: Variants;
  onChange: (value: string) => void;
  labelPlacement?: LabelPlacement;
  className?: string;
}

const formatInterTime = (timestr: string) => {
    const formattedTime = moment(`${moment().format('YYYY-MM-DD')} ${timestr}`).format("YYYY-MM-DD[T]HH:mm:ss") + "Z";
    return formattedTime;
};

export const formatOuterTime = (timestr: string) => {
    const newStr: any = typeof timestr === 'string' ? timestr : toTime(timestr);
    const time = `${newStr?.hour}:${newStr?.minute}:${newStr?.second}`?.split(':')?.map(part=> part.padStart(2,"0"))?.join(':')
    return typeof timestr === 'string' ? timestr : time;
};

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  field: { ...fields },
  form: { touched, errors },
  ...props
}) => {
    const { label, onChange, value, variant, labelPlacement, className } = props
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));

    return (
        <div>
            <TimeInput
                label={label}
                value={parseAbsolute(formatInterTime(value as string), "UTC")}
                labelPlacement={labelPlacement || "outside"}
                className={className}
                variant={variant || "bordered"}
                onChange={(time: any) => onChange && onChange(formatOuterTime(time))}
            />
            {error && <span className="text-sm text-danger ms-2">{errors[fields?.name] as string}</span>}
        </div>
    );
};

export default CustomTimePicker;