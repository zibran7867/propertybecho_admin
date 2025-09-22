import React from "react";
import { IColumn, Pagination } from "../../models/base-type";
import CustomTable from "../../shared/components/CustomTable"
import { Button } from "@heroui/react";
import { Digits } from "../../shared/enums/digits";
import { PAGINATION } from "../../shared/constants/pagination";
import DialogForm from "../../shared/components/DialogForm";
import ConfirmBox from "../../shared/components/ConfirmBox";
import areaService from "../../services/area-service";
import toast from "react-hot-toast";
import { AreaModel } from "../../models/area";
import AreaForm from "./AreaForm";
import { Field, Form, Formik } from "formik";
import { debounce } from 'lodash';
import { CustomInput, CustomSelect } from "../../shared/customFormField";
import { ActiveOrInactive } from "../../shared/enums/status";

interface AreaFilter {
  search?: string;
  status?: string;
  pagination?: string
}

const AreaManagement = () => {
  const [data, setData] = React.useState([]);
  const [areaId, setAreaId] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialogDelete, setOpenConfirmDialogDelete] = React.useState(false);
  const areaRef = React.useRef<AreaModel | null>(null);
  const formRef = React.useRef<{ values: AreaFilter } | null>(null);

  // Refs for pagination/sorting
  const totalCountRef = React.useRef(Digits.One);
  const countRef = React.useRef(Digits.Zero)
  const pageRef = React.useRef<Pagination>(PAGINATION);

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

  const initialState: AreaFilter = {
    search: '',
    status: '',
  };

  const getAllArea = async (filter?: AreaFilter) => {
    debugger
    await areaService
      .getAllAreas(
        filter?.status ? filter?.status : '',
        filter?.search ? filter?.search : '',
        pageRef?.current,
        // sortRef.current ? sortRef.current : undefined
      )
      .then((response) => {
        const responseData: any = response?.data;
        console.log("Area responseData", response)
        setData(responseData.data.rows)
        const { data } = response.data;
        console.log("🚀 ~ getAllArea ~ status:", data)
        if (data) {
          totalCountRef.current = data?.total;
          countRef.current = data?.totalPages;

          // const mapResponseToColumns = (res: AreaModel, index: any) => {
          //   return {
          //     id: res.id,
          //     index: index + 1,
          //     name: res.name,
          //     status: res.status,
          //     // created_at: res?.created_at ? DateUTCToLocalDateAndTimeString(res?.created_at) : '',
          //   }
          // }
          // const customResponse: any = responseData.map(mapResponseToColumns);
          // setAreas(customResponse);
        } else {
          // setAreas([])
        }
      })
      .catch((error: Error) => console.log(error?.message));
  }

  const handleStatusChange = async (userId: string, status: string) => {
    await areaService
      .UpdateAreaStatus(userId, { status })
      .then((response) => {
        // const responseData: any = response;
        if (response?.data?.status) {
          getAllArea()
          toast.success("Update status successfully");
        }
      })
      .catch((error: Error) => console.log(error?.message));
  }

  // Calling get all area api
  React.useEffect(() => {
    getAllArea();
  }, [])

  const onAreaAdd = () => {
    handleDialogClose();
    getAllArea();
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(getAllArea, 300);
  }, []);

  const handleAddClick = () => {
    areaRef.current = null;
    handleDialogOpen();
  };

  const handleEditClick = (area: AreaModel) => {
    areaRef.current = area;
    handleDialogOpen();
  };

  const handleDeleteClick = (id: number) => {
    setAreaId(id);
    handleConfirmDialogOpenForDelete();
  };

  const handleDeleteConfirm = () => {
    if (areaId !== null) {
      handleCustomerDelete(areaId);
      getAllArea();
    }
    setAreaId(null);
    handleConfirmDialogCloseForDelete();
  };

  const handleSetPageDetails = async (filter: AreaFilter, pageDetail: Pagination) => {
    pageRef.current = pageDetail;
    await getAllArea(filter || initialState);
  };

  const handleCustomerDelete = async (id: number) => {
    await areaService
      .DeleteArea(id)
      .then(async (response) => {
        if (response?.data?.status) {
          if (countRef.current === 1) pageRef.current = { ...pageRef.current, page: pageRef.current?.page - 1 }
          getAllArea();
          toast.success(response?.data?.message);
        }
      })
      .catch((error: Error) => console.log(error?.message));
  };

  return (
    <section>
      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className="text-2xl font-semibold">Area Management</h2>
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
            getAllArea(data);
          }}
        >
          {(props) => {
            const { values, setFieldValue, handleSubmit, resetForm } = props;
            return (
              <Form onSubmit={handleSubmit} noValidate className='flex justify-between mb-1.5 gap-4 w-full max-[1300px]:flex-wrap px-4'>
                <div className="flex justify-center items-center gap-4">
                  <Field
                    label=""
                    placeholder="Search Area"
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
          formRef={formRef}
          // sortRef={sortRef.current}
          Edit
          onEditClickReceived={handleEditClick}
          Delete
          onDeleteClickReceived={handleDeleteClick}
          // View
          // onViewClickReceived={handleViewClick}
          onSetPageDetailsReceived={handleSetPageDetails}
          // onSortDetailsReceived={handleSetSortDetails}
          onStatusChangeClickReceived={handleStatusChange}
        />
      </div>

      <DialogForm
        size='2xl'
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
      />

      <DialogForm
        size='2xl'
        title={`${areaRef.current?.id ? 'Update' : 'Add'} Area`}
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        bodyContent={<AreaForm
          area={areaRef.current}
          onAreaAdd={onAreaAdd}
          handleDialogClose={handleDialogClose}
        />}
      />

      <ConfirmBox
        title="Delete Area"
        openDialog={openConfirmDialogDelete}
        handleDialogClose={handleConfirmDialogCloseForDelete}
        handleSuccess={handleDeleteConfirm}
      />

    </section>
  )
}

export default AreaManagement
