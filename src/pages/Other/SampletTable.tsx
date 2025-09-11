import React, { useRef } from "react";
import { IColumn, Pagination } from "../../models/base-type";
import CustomTable from "../../shared/components/CustomTable"
import { SortDescriptor } from "@heroui/react";
import { Digits } from "../../shared/enums/digits";
import { PAGINATION } from "../../shared/constants/pagination";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../routes/routing";

const SampleTable = () => {
  const navigate = useNavigate();
  

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialogDelete, setOpenConfirmDialogDelete] = React.useState(false);

  // DialogForm
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  // Conform Box 
  const handleConfirmDialogOpenForDelete = () => setOpenConfirmDialogDelete(true);
  const handleConfirmDialogCloseForDelete = () => setOpenConfirmDialogDelete(false);

  // const [data, setData] = React.useState([]);
  const columns: IColumn[] = [
    { name: "ID", data: "index", width: 50, orderable: false },
    { name: "Full Name", data: "full_name", width: 200, orderable: true },
    { name: "Phone", data: "phone", width: 150, orderable: false },
    { name: "Status", data: "status", width: 120, orderable: true },
    { name: "Type", data: "type", width: 120, orderable: false },
    { name: "Experience", data: "experience", width: 120, orderable: true },
    { name: "Rating", data: "rating", width: 120, orderable: false },
    { name: "Actions", data: "actions", width: 150, orderable: false },
  ];

  const Alldata = [
    {
      id: 1,
      index: 1,
      full_name: "John Doe",
      phone: "+91 9876543210",
      profile_pic: "https://i.pravatar.cc/150?img=1",
      status: "verified",
      type: "video",
      experience: 5,
      rating: 4.5,
      is_active: true,
    },
    {
      id: 2,
      index: 2,
      full_name: "Jane Smith",
      phone: "+91 9998887777",
      profile_pic: "https://i.pravatar.cc/150?img=2",
      status: "pending",
      type: "call",
      experience: 3,
      rating: 3.8,
      is_active: false,
    },
    {
      id: 3,
      index: 3,
      full_name: "Amit Patel",
      phone: "+91 8887776666",
      profile_pic: "https://i.pravatar.cc/150?img=3",
      status: "blocked",
      type: "chat",
      experience: 7,
      rating: 4.9,
      is_active: true,
    },
  ];

  const handleAddClick = () => {
    // astrologerRef.current = null;
    handleDialogOpen();
  };

  const handleEditClick = () => {
    // astrologerRef.current = astrologer;
    handleDialogOpen();
  };

  const handleDeleteClick = (id: string) => {
    // setAstrologerId(id);
    handleConfirmDialogOpenForDelete();
  };

  const handleDeleteConfirm = () => {
    // handleCustomerDelete(astrologerId);
    // setAstrologerId(null);
    handleConfirmDialogCloseForDelete();
  };

  // OnView
  const handleViewClick = (id: string) => {
    navigate(`${Routing.Address_Management}/${id}`)
  };


  // Refs for pagination/sorting
  const totalCountRef = React.useRef(Digits.One);
  const pageRef = React.useRef<Pagination>(PAGINATION);
  const sortRef = React.useRef<SortDescriptor>({ column: "", direction: "ascending" });
  const formRef = React.useRef(null);


  return (
    <section>
      <h1>Address Management</h1>


      <CustomTable
        columns={columns}
        data={Alldata}
        Edit
        onEditClickReceived={handleEditClick}
        Delete
        // onDeleteClickReceived={handleDeleteClick}
        View
      // onViewClickReceived={handleViewClick}
      // totalCountRef={totalCountRef}
      // pageRef={pageRef}
      // formRef={formRef}
      // sortRef={sortRef}
      />
    </section>
  )
}

export default SampleTable