import React from 'react';
import { Button, ModalBody, ModalFooter } from '@heroui/react';
import { Field, Form, Formik } from 'formik';
import { CustomInput, CustomSelect } from '../../shared/customFormField';
import { ActiveOrInactive } from '../../shared/enums/status';
import toast from 'react-hot-toast';
import { BuilderModel } from '../../models/builder';
import builderService from '../../services/builder-service';
import { BuilderValidationSchema } from '../../validation/builder';


interface BuilderFormProps {
    builder: BuilderModel | null;
    onBuilderAdd?: () => void;
    handleDialogClose: () => void;
}


const BuilderForm: React.FC<BuilderFormProps> = ({ builder, onBuilderAdd, handleDialogClose }) => {
    const initialState: BuilderModel = {
        name: "",
        status: []
    };

    const newBuilder = {
        ...builder,
        status: builder?.status ? (Array.isArray(builder.status) ? builder.status : [builder.status]) : []
    }

    const getData = () => builder ? newBuilder : initialState;

    const handleSubmit = async (value: BuilderModel) => {
        console.log(value)
        const newValue : any = {
            name: value?.name,
            status : value?.status?.[0] || ''
        }
        console.log("newValue", newValue)


        if (builder?.id) {
            await builderService
                .UpdateBuilder(builder?.id, newValue)
                .then((response: any) => {
                    console.log("response", response)
                    const { status } = response?.data;
                    if (status) {
                        onBuilderAdd?.();
                        toast.success("Builder Updated successfully");
                    }
                })
                .catch((error: Error) => console.log(error?.message));
        } else {
            await builderService
                .AddBuilder(newValue)
                .then((response: any) => {
                    const { status } = response?.data;
                    if (status) {
                        onBuilderAdd?.();
                        toast.success("Builder Add successfully");
                    }
                })
                .catch((error: Error) => console.log(error?.message));
        };
    };


    return (
        <Formik
            initialValues={getData()}
            onSubmit={handleSubmit}
            validationSchema={BuilderValidationSchema}
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
                                        label="Builder Name"
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
                                            onChange={(value: string[]) =>{
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
                                {builder?.id ? 'Update' : 'Add'}
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

export default BuilderForm
