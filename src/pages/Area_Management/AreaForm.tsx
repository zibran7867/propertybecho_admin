import React from 'react';
import { Button, ModalBody, ModalFooter } from '@heroui/react';
import { Field, Form, Formik } from 'formik';
import { AreaModel } from '../../models/area';
import areaService from '../../services/area-service';
import { CustomInput, CustomSelect } from '../../shared/customFormField';
import { ActiveOrInactive } from '../../shared/enums/status';
import { AreaValidationSchema } from '../../validation/area';
import toast from 'react-hot-toast';


interface AreaFormProps {
    area: AreaModel | null;
    onAreaAdd?: () => void;
    handleDialogClose: () => void;
}


const AreaForm: React.FC<AreaFormProps> = ({ area, onAreaAdd, handleDialogClose }) => {
    const initialState: AreaModel = {
        name: "",
        status: []
    };

    const newArea = {
        ...area,
        status: area?.status ? (Array.isArray(area.status) ? area.status : [area.status]) : []
    }

    const getData = () => area ? newArea : initialState;

    const handleSubmit = async (value: AreaModel) => {
        console.log(value)
        const newValue: any = {
            name: value?.name,
            status: value?.status?.[0] || ''
        }
        console.log("newValue", newValue)


        if (area?.id) {
            await areaService
                .UpdateArea(area?.id, newValue)
                .then((response: any) => {
                    console.log("response", response)
                    const { status } = response?.data;
                    if (status) {
                        onAreaAdd?.();
                        toast.success("Area Updated successfully");
                    }
                })
                .catch((error: Error) => console.log(error?.message));
        } else {
            await areaService
                .AddArea(newValue)
                .then((response: any) => {
                    const { status } = response?.data;
                    console.log("Add new Area : ", response?.data)                       
                    if (status) {
                        onAreaAdd?.();
                        toast.success("Area Add successfully");
                    }
                })
                .catch((error: Error) => console.log(error?.message));
        };
    };


    return (
        <Formik
            initialValues={getData()}
            onSubmit={handleSubmit}
            validationSchema={AreaValidationSchema}
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {(props) => {
                const { values, handleSubmit, setFieldValue } = props;
                console.log(values)
                return (
                    <Form onSubmit={handleSubmit}>
                        <ModalBody>
                            <div className='flex gap-5 my-1 w-full'>
                                <div className='w-[50%]'>
                                    <Field
                                        label="Area Name"
                                        type="text"
                                        name="name"
                                        value={values?.name}
                                        onChange={(value: string) => setFieldValue('name', value)}
                                        component={CustomInput}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-5 my-1 w-full'>
                                <div className='w-[50%]'>
                                    <div className='w-[50%]'>
                                        <Field
                                            label="Status"
                                            placeholder="Status"
                                            name="status"
                                            value={values?.status}
                                            options={Object.entries(ActiveOrInactive).map(([type, value]: [string, string]) => ({
                                                title: type,
                                                value: value
                                            }))}
                                            onChange={(value: string[]) => {
                                                console.log("value", value)
                                                setFieldValue('status', value)
                                            }}
                                            component={CustomSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant='solid' type="submit">
                                {area?.id ? 'Update' : 'Add'}
                            </Button>
                            <Button color="danger" variant="solid" onClick={handleDialogClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default AreaForm
