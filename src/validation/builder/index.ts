import * as Yup from 'yup';
import { RegularExpression } from '../../shared/constants/regular-expression';

export const BuilderValidationSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required('Builder name is required!'),
        status: Yup.array()
            .of(Yup.string())
            .min(1, "Select at least one Status"),
    });
};
