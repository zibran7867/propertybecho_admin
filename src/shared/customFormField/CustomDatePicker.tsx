import { DatePicker } from "@heroui/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { FieldProps, FormikErrors, FormikTouched } from "formik";
import _ from "lodash";
import moment from "moment";
import React from "react";

type LabelPlacement = "outside" | "outside-left" | "inside";
type Variants = "flat" | "bordered" | "underlined" | "faded";

interface CustomDatePickerProps extends FieldProps {
  label?: string;
  value?: string;
  variant?: Variants;
  onChange: (value: string) => void;
  labelPlacement?: LabelPlacement;
  className?: string;
}

// ✅ Type for dateObj based on @internationalized/date CalendarDate
export const formatMomentDate = (dateObj: CalendarDate) => {
  const date = moment({
    year: dateObj.year,
    month: dateObj.month - 1,
    date: dateObj.day,
    // calendar: dateObj.calendar  // CalendarDate doesn't need this
  });
  return date.format("YYYY-MM-DD");
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  field: { ...fields },
  form: { touched, errors },
  ...props
}) => {
  const { label, value, variant, onChange, labelPlacement, className } = props;

  // ✅ Type cast for touched & errors
  const error = Boolean(
    _.get(touched as FormikTouched<any>, fields?.name) &&
    _.get(errors as FormikErrors<any>, fields?.name)
  );

  return (
    <div>
      <DatePicker
        label={label}
        value={value ? parseDate(value) : null}
        variant={variant || "bordered"}
        labelPlacement={labelPlacement || "outside"}
        className={className}
        onChange={(date) => onChange(formatMomentDate(date as CalendarDate))}
      />
      {error && (
        <span className="text-sm text-danger ms-2">
          {_.get(errors as FormikErrors<any>, fields?.name) as string}
        </span>
      )}
    </div>
  );
};

export default CustomDatePicker;
