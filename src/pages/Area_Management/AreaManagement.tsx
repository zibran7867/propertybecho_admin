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

const AreaManagement = () => {
  const [data, setData] = React.useState([]);
  const [areaId, setAreaId] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialogDelete, setOpenConfirmDialogDelete] = React.useState(false);
  const areaRef = React.useRef<AreaModel>(null);
  
  // Refs for pagination/sorting
  // const totalCountRef = React.useRef(Digits.One);
  const countRef = React.useRef(Digits.Zero)
  const pageRef = React.useRef<Pagination>(PAGINATION);
  // const sortRef = React.useRef<SortDescriptor>({ column: "", direction: "ascending" });
  // const formRef = React.useRef(null);


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

  const getAllArea = async () => {
    await areaService
      .getAllAreas()
      .then((response) => {
        const responseData: any = response?.data;
        console.log("Area responseData", responseData)
        setData(responseData.data.rows)
        if (response?.data?.status) {
          // toast.success(response?.data?.message);
        }
      })
      .catch((error: Error) => console.log(error?.message));
  }

  const handleStatusChange = async (userId : string, status: string) => {
    await areaService
      .UpdateAreaStatus(userId, {status})
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
      <div className='flex justify-between items-center w-full mb-5'>
        <h2 className="text-2xl font-semibold">Area Management</h2>
        <div className='flex justify-between items-center gap-4'>
          <Button variant="solid" color='primary' className='text-white' onClick={handleAddClick}>
            Add
          </Button>
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={data}
        Edit
        onEditClickReceived={handleEditClick}
        Delete
        onDeleteClickReceived={handleDeleteClick}
        onStatusChangeClickReceived={handleStatusChange}
      // onViewClickReceived={handleViewClick}
      // totalCountRef={totalCountRef}
      // pageRef={pageRef}
      // formRef={formRef}
      // sortRef={sortRef}
      />


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
