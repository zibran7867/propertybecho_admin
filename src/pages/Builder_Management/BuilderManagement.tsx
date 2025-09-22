import React from "react";
import { Routing } from "../../routes/routing";
import { IColumn, Pagination } from "../../models/base-type";
import { Button, SortDescriptor } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import builderService from "../../services/builder-service";
import toast from "react-hot-toast";
import CustomTable from "../../shared/components/CustomTable";
import { PAGINATION } from "../../shared/constants/pagination";
import { Digits } from "../../shared/enums/digits";
import ConfirmBox from "../../shared/components/ConfirmBox";
import { BuilderModel } from "../../models/builder";
import DialogForm from "../../shared/components/DialogForm";
import BuilderForm from "./BuilderForm";
import { BuilderFilter } from "../../shared/constants/filters";
import { Field, Form, Formik } from "formik";
import { CustomInput, CustomSelect } from "../../shared/customFormField";
import { ActiveOrInactive } from "../../shared/enums/status";
import { debounce } from "lodash";

const BuilderManagement = () => {
  const [data, setData] = React.useState([]);
  const [builderId, setBuilderId] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialogDelete, setOpenConfirmDialogDelete] = React.useState(false);

  // Refs for pagination/sorting
  const totalCountRef = React.useRef(Digits.One);
  const countRef = React.useRef(Digits.Zero)
  const pageRef = React.useRef<Pagination>(PAGINATION);
  const sortRef = React.useRef<SortDescriptor>({ column: "", direction: "ascending" });
  const formRef = React.useRef<{ values: BuilderFilter } | null>(null);
  const builderRef = React.useRef<BuilderModel>(null);
  // DialogForm
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  // Conform Box 
  const handleConfirmDialogOpenForDelete = () => setOpenConfirmDialogDelete(true);
  const handleConfirmDialogCloseForDelete = () => setOpenConfirmDialogDelete(false);

  // const [data, setData] = React.useState([]);
  const columns: IColumn[] = [
    { name: "Name", data: "name", width: 200, orderable: true },
    { name: "Status", data: "areaDropdown", width: 120, orderable: true },
    { name: "Actions", data: "actions", width: 150, orderable: false },
  ];

  const initialState: BuilderFilter = {
    search: '',
    status: '',
  };

  const getAllBuilders = async (filter?: BuilderFilter) => {
    await builderService
      .getAllBuilders(
        filter?.search ? filter?.search : '',
        filter?.status ? filter?.status : '',
        pageRef?.current,
        sortRef?.current
      )
      .then((response) => {
        const responseData: any = response?.data;
        console.log("Builder responseData", responseData)
        setData(responseData.data.rows)
        const { data } = response?.data
        if (data) {
          totalCountRef.current = data?.total;
          countRef.current = data?.totalPages;
        }
      })
      .catch((error: Error) => console.log(error?.message));
  }

  const handleStatusChange = async (userId: string, status: string) => {
    await builderService
      .UpdateStatusBuilder(userId, { status })
      .then((response) => {
        const responseData: any = response;
        console.log("handleStatusChange ~ responseData:", responseData)
        if (response?.data?.status) {
          getAllBuilders()
          toast.success("Update status successfully");
        }
      })
      .catch((error: Error) => console.log(error?.message));
  }


  // Calling get all area api
  React.useEffect(() => {
    getAllBuilders();
  }, [])

  const onBuilderAdd = () => {
    handleDialogClose();
    getAllBuilders();
  };


  const handleAddClick = () => {
    builderRef.current = null;
    handleDialogOpen();
  };

  const handleEditClick = (builder: BuilderModel) => {
    builderRef.current = builder;
    handleDialogOpen();
  };

  const handleDeleteClick = (id: number) => {
    setBuilderId(id);
    handleConfirmDialogOpenForDelete();
  };

  const handleDeleteConfirm = () => {
    if (builderId !== null) {
      handleCustomerDelete(builderId);
      getAllBuilders()
    }
    setBuilderId(null);
    handleConfirmDialogCloseForDelete();
  };

  const handleSetSortDetails = async (filter: BuilderFilter, sortData: SortDescriptor) => {
    sortRef.current = sortData;
    await getAllBuilders(filter || initialState);
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(getAllBuilders, 300);
  }, []);

  const handleSetPageDetails = async (filter: BuilderFilter, pageDetail: Pagination) => {
    pageRef.current = pageDetail;
    await getAllBuilders(filter || initialState);
  };

  const handleCustomerDelete = async (id: number) => {
    await builderService
      .DeleteBuilder(id)
      .then(async (response) => {
        if (response?.data?.status) {
          if (countRef.current === 1) pageRef.current = { ...pageRef.current, page: pageRef.current?.page - 1 }
          getAllBuilders();
          toast.success("Delete builder successfully");
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  return (
    <section>

      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className="text-2xl font-semibold">Builder Management</h2>
        <div className='flex justify-between items-center gap-4'>
          <Button variant="solid" color='primary' className='text-white' onClick={handleAddClick}>
            Add
          </Button>
        </div>
      </div>

      <div className="white-box-graph bg-white py-5 px-1 rounded-xl border-1 border-gray-300">
        <Formik
          initialValues={initialState}
          onSubmit={(data) => {
            formRef.current = { values: data };
            pageRef.current = { ...pageRef.current, page: Digits.One };
            getAllBuilders(data);
          }}
        >
          {(props) => {
            const { values, setFieldValue, handleSubmit, resetForm } = props;
            return (
              <Form onSubmit={handleSubmit} noValidate className='flex justify-between mb-1.5 gap-4 w-full max-[1300px]:flex-wrap px-4'>
                <div className="flex justify-center items-center gap-4">
                  <Field
                    label=""
                    placeholder="Search Builder"
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

                  <Field
                    placeholder="Select Status"
                    name="status"
                    value={values?.status}
                    options={Object.entries(ActiveOrInactive).map(([type, value]) => ({
                      title: type,
                      value: value,
                    }))}
                    component={CustomSelect}
                    onChange={(value: any) => {
                      setFieldValue('status', value);
                      const values = formRef.current?.values
                        ? formRef.current.values
                        : initialState;
                      pageRef.current = { ...pageRef.current, page: Digits.One };
                      formRef.current = {
                        values: { ...values, status: value },
                      };
                      debouncedResults(formRef.current?.values);
                    }}
                    className="form-input w-[300px] h-[50px"
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
          sortRef={sortRef}
          Edit
          onEditClickReceived={handleEditClick}
          Delete
          onDeleteClickReceived={handleDeleteClick}
          onSetPageDetailsReceived={handleSetPageDetails}
          onSortDetailsReceived={handleSetSortDetails}
          onStatusChangeClickReceived={handleStatusChange}
        />
      </div>

      <DialogForm
        size='2xl'
        title={`${builderRef.current?.id ? 'Update' : 'Add'} Builder`}
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        bodyContent={<BuilderForm
          builder={builderRef.current}
          onBuilderAdd={onBuilderAdd}
          handleDialogClose={handleDialogClose}
        />}
      />


      <ConfirmBox
        title="Delete Builder"
        openDialog={openConfirmDialogDelete}
        handleDialogClose={handleConfirmDialogCloseForDelete}
        // message={messages}
        handleSuccess={handleDeleteConfirm}
      />

    </section>
  )
}

export default BuilderManagement
