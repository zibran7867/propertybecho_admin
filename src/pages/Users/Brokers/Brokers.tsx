import React from 'react'
import { AreaFilter } from '../../../shared/constants/filters';
import { Button, SortDescriptor } from '@heroui/react';
import { Digits } from '../../../shared/enums/digits';
import { IColumn, Pagination } from '../../../models/base-type';
import { PAGINATION } from '../../../shared/constants/pagination';
import { debounce } from 'lodash';
import brokerService from '../../../services/broker-service';
import CustomTable from '../../../shared/components/CustomTable';
import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { CustomInput, CustomSelect } from '../../../shared/customFormField';
import { ActiveOrInactive } from '../../../shared/enums/status';

const Brokers = () => {

    const [data, setData] = React.useState([]);

    // const areaRef = React.useRef<AreaModel | null>(null);
    const formRef = React.useRef<{ values: AreaFilter } | null>(null);
    const sortRef = React.useRef<SortDescriptor>({ column: "", direction: "ascending" });
    const totalCountRef = React.useRef(Digits.One);
    const countRef = React.useRef(Digits.Zero)
    const pageRef = React.useRef<Pagination>(PAGINATION);

    const columns: IColumn[] = [
        { name: "First Name", data: "first_name", width: 120, orderable: true },
        { name: "Last Name", data: "last_name", width: 120, orderable: true },
        { name: "Email", data: "email", width: 120, orderable: true },
        { name: "Phone", data: "phone", width: 120, orderable: true },
        { name: "Status", data: "status", width: 120, orderable: true },
        // { name: "Status", data: "areaDropdown", width: 120, orderable: true },
        // { name: "Actions", data: "actions", width: 150, orderable: false },
    ];

    const initialState: AreaFilter = {
        search: '',
        status: '',
    };

    const getAllBrokers = async (filter?: AreaFilter) => {
        // debugger
        await brokerService
            .getAllBroker(
                filter?.status ? filter?.status : '',
                filter?.search ? filter?.search : '',
                pageRef?.current,
                sortRef?.current)
            .then((response) => {
                const responseData: any = response?.data;
                console.log("Brokers responseData", response)
                setData(responseData.data.rows)
                const { data } = response.data;
                console.log("🚀 ~ getAllBrokers ~ status:", data)
                if (data) {
                    totalCountRef.current = data?.total;
                    countRef.current = data?.totalPages;
                }
            })
            .catch((error: Error) => console.log(error?.message));
    }

    // Calling get all area api
    React.useEffect(() => {
        getAllBrokers();
    }, [])

    const handleSetPageDetails = async (filter: AreaFilter, pageDetail: Pagination) => {
        pageRef.current = pageDetail;
        await getAllBrokers(filter || initialState);
    };

    const debouncedResults = React.useMemo(() => {
        return debounce(getAllBrokers, 300);
    }, []);


    return (
        <section>
            <div className='flex justify-between items-center w-full mb-3'>
                <h2 className="text-2xl font-semibold">All Brokers</h2>
            </div>
            <div className="white-box-graph bg-white py-5 px-1 rounded-xl border-1 border-gray-300">

                <Formik
                    initialValues={initialState}
                    onSubmit={(data) => {
                        formRef.current = { values: data };
                        pageRef.current = { ...pageRef.current, page: Digits.One };
                        getAllBrokers(data);
                    }}
                >
                    {(props) => {
                        const { values, setFieldValue, handleSubmit, resetForm } = props;
                        return (
                            <Form onSubmit={handleSubmit} noValidate className='flex justify-between mb-1.5 gap-4 w-full max-[1300px]:flex-wrap px-4'>
                                <div className="flex justify-center items-center gap-4">
                                    <Field
                                        label=""
                                        placeholder="Search User"
                                        type="text"
                                        name="search"
                                        value={values?.search}
                                        component={CustomInput}
                                        onChange={(value: any) => {
                                            setFieldValue('search', value);
                                            const values = formRef.current?.values
                                                ? formRef.current.values
                                                : initialState;
                                            pageRef.current = { ...pageRef.current, page: Digits.One };
                                            formRef.current = {
                                                values: { ...values, search: value },
                                            };
                                            debouncedResults(formRef.current?.values);
                                        }}
                                        className="form-input w-[300px] h-[50px] mt-2"
                                    />

                                </div>



                                <div className='flex justify-between items-center gap-4 '>
                                    <Button
                                        className=' text-white'
                                        variant="solid"
                                        color='primary'
                                        type="reset"
                                        onClick={() => {
                                            resetForm();
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>

                            </Form>
                        );
                    }}
                </Formik>



                <CustomTable
                    columns={columns}
                    data={data}
                    totalCountRef={totalCountRef}
                    pageRef={pageRef}
                    onSetPageDetailsReceived={handleSetPageDetails}
                />

            </div>
        </section>
    )
}

export default Brokers
