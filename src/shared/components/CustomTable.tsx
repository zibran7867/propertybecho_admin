import {
    Button,
    Chip,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SortDescriptor,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    User
} from "@heroui/react";
import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { CgRadioChecked } from 'react-icons/cg';
import { IoIosVideocam } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { PiChatCircleTextFill, PiInfoBold } from 'react-icons/pi';
import { Link } from "react-router-dom";
// import StarRatings from 'react-star-ratings';
import { Rating } from "react-simple-star-rating";
import { IColumn } from "../../models/base-type";
import { handlePageDetailChange, truncatedText } from "../../utils/commonFunctions";
import { ActiveOrInactive, ActiveOrInactiveColor, ProviderStatus, ProviderStatusColor, WithdrawalPendingStatus, WithdrawalPendingStatusColor, WithdrawalStatus, WithdrawalStatusColor } from "../enums/status";
import { PageActions } from "../enums/table-page-actions";
import './custom.scss';
import TableFooter from "./TableFooter";

interface CustomUserComponentProps {
    className: string;
    description: string;
    name: string;
    src?: string;
}

const CustomUserComponent: React.FC<CustomUserComponentProps> = (props) => {
    const { className, description, name, src } = props;
    return (
        <div tabIndex={-1} className={`${className} inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 capitalize user-row`}>
            <span tabIndex={-1} className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large transition-none">
                {src ?
                    <img src={src} className="flex object-cover w-full h-full !duration-500 opacity-0 data-[loaded=true]:opacity-100 transition-none" alt="HASMUKHBHAI" data-loaded="true" />
                    :
                    <span aria-label="Praget X" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-normal text-center text-inherit" role="img">
                        {name?.trim()?.slice(0, 3)}
                    </span>
                }
            </span>
            <div className="inline-flex flex-col items-start">
                <span className="text-small text-inherit">
                    {name}
                </span>
                <span className="text-tiny text-foreground-400">
                    {description}
                </span>
            </div>
        </div>
    );
};

const statusColorMap = {
    verified: "success",
    success: "success",
    pending: "warning",
    declined: "warning",
    blocked: "warning",
    paid: "success",
    failed: "danger",
    cancelled: "danger",
};

const typeIconMap = {
    video: <IoIosVideocam size={18} />,
    call: <IoCall size={18} />,
    chat: <PiChatCircleTextFill size={18} />,
};

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface CustomTableProps {
    columns: IColumn[];
    data: any[];
    ActiveDeActiveSwitch?: boolean;
    Info?: boolean;
    Send?: boolean;
    Edit?: boolean;
    Delete?: boolean;
    View?: boolean;
    sortRef?: React.MutableRefObject<SortDescriptor>;
    formRef?: React.MutableRefObject<any>;
    pageRef?: React.MutableRefObject<{ page: number; limit: number }>;
    totalCountRef?: React.MutableRefObject<number>;
    onActiveDeactiveClickReceived?: (row: any) => void;
    onSendNotification?: (row: any) => void;
    onInfoClickReceived?: (row: any) => void;
    onEditClickReceived?: (row: any) => void;
    onDeleteClickReceived?: (id: number) => void;
    onViewClickReceived?: (id: number) => void;
    onSetPageDetailsReceived?: (a: any, b: any) => void;
    onSortDetailsReceived?: (formData: any, data: SortDescriptor) => void;
    onStatusChangeClickReceived?: (userId: string, newStatus: string) => void;
    onStatusChangeRemarkClickReceived?: (user: any, newStatus: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
    const { columns, data, ActiveDeActiveSwitch, Info, Send, Edit, Delete, View, sortRef, formRef, pageRef, totalCountRef } = props;

    const handleActiveDeactiveClick = (row: any) => {
        props.onActiveDeactiveClickReceived && props.onActiveDeactiveClickReceived(row);
    };

    const handleSendNotificationClick = (row: any) => {
        props.onSendNotification && props.onSendNotification(row);
    };

    const handleInfoClick = (row: any) => {
        props.onInfoClickReceived && props.onInfoClickReceived(row);
    };

    const handleEditClick = (row: any) => {
        props.onEditClickReceived && props.onEditClickReceived(row);
    };

    const handleDeleteClick = (id: number) => {
        props.onDeleteClickReceived && props.onDeleteClickReceived(id);
    };

    const handleViewClick = (id: number) => {
        props.onViewClickReceived && props.onViewClickReceived(id);
    };

    const handleSetPageDetails = (a: any, b: any) => {
        props.onSetPageDetailsReceived && props.onSetPageDetailsReceived(a, b);
    };

    const handleSorting = (formData: any, data: SortDescriptor) => {
        props.onSortDetailsReceived && props.onSortDetailsReceived(formData, data);
    };

    const handleStatusChangeClick = (userId: string, newStatus: string) => {
        console.log("New Status ", newStatus);
        
        props.onStatusChangeClickReceived && props.onStatusChangeClickReceived(userId, newStatus);
    };

    const handleStatusChangeRemarkClick = (user: any, newStatus: string) => {
        props.onStatusChangeRemarkClickReceived && props.onStatusChangeRemarkClickReceived(user, newStatus);
    };

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "index":
                return (
                    cellValue + ((pageRef?.current?.page ? pageRef.current.page - 1 : 0) * (pageRef?.current?.limit ?? 0))
                );
            case "full_name":
                return (
                    <CustomUserComponent
                        className="capitalize user-row"
                        src={user?.profile_pic}
                        description={user?.phone}
                        name={cellValue}
                    />
                );
            // case "name":
            //     return (
            //         <User
            //             className="capitalize user-row"
            //             avatarProps={{ radius: "lg", src: user?.image }}
            //             name={cellValue}
            //         >
            //         </User>
            //     );
            // case "title":
            //     return (
            //         <User
            //             className="capitalize user-row"
            //             avatarProps={{ radius: "lg", src: user?.image }}
            //             description={truncatedText(user?.description, 50)}
            //             name={cellValue}
            //         >
            //         </User>
            //     );
            case "subCategoryLink":
                return (
                    <Link to={cellValue} className="underline text-blue-600">
                        View All Sub Category
                    </Link>
                );
            case "status":
                return (
                    <Chip className="capitalize chip" color={statusColorMap[user.status as keyof typeof statusColorMap] as "success" | "warning" | "danger" | "default" | "primary" | "secondary" | undefined} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "type":
                return (
                    <Chip startContent={typeIconMap[user.type as keyof typeof typeIconMap]} className="capitalize chip p-3 text-black" color='primary' size="sm" variant="bordered">
                        {cellValue}
                    </Chip>
                );
            case "experience":
                return (
                    `${cellValue} years`
                );
            case "call_minutes":
                return (
                    `${cellValue} min.`
                );
            case "chat_minutes":
                return (
                    `${cellValue} min.`
                );
            // case "rating":
            //     return (
            //         <StarRatings
            //             rating={user?.rating}
            //             starDimension="20px"
            //             starSpacing="2px"
            //             starRatedColor="#FE8F00"
            //         />
            //     );
            case "rating":
                return (
                    <Rating
                        readonly
                        size={20}
                        allowFraction
                        initialValue={user?.rating ?? 0}
                        SVGstyle={{ display: "inline" }}
                        fillColor="#FE8F00"
                    />
                );

            case "areaDropdown":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize drop-down-btn min-w-[110px]"
                            >
                                <CgRadioChecked color={ActiveOrInactiveColor[user?.status as keyof typeof ActiveOrInactiveColor]} />
                                {user?.status}
                                <img src="/images/back.svg" alt='' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="selection"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={user?.status}
                            onSelectionChange={(e: any) => handleStatusChangeClick(user?.id, e?.currentKey)}
                        >
                            {Object.keys(ActiveOrInactive).map((status) => {
                                const providerColor = Object.keys(ActiveOrInactiveColor).find((color) => (color === ActiveOrInactive[status as keyof typeof ActiveOrInactive]));
                                return (
                                    <DropdownItem textValue={ActiveOrInactive[status as keyof typeof ActiveOrInactive]} key={ActiveOrInactive[status as keyof typeof ActiveOrInactive]} className="drop-down-btn-li">
                                        {providerColor && <CgRadioChecked color={ActiveOrInactiveColor[providerColor as keyof typeof ActiveOrInactiveColor]} />}
                                        {status}
                                    </DropdownItem>);
                            })}
                        </DropdownMenu>
                    </Dropdown>
                );
            case "statusDropdown":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                                className="capitalize drop-down-btn min-w-[110px]"
                            >
                                <CgRadioChecked color={ProviderStatusColor[user?.status as keyof typeof ProviderStatusColor]} />
                                {user?.status}
                                <img src="/images/back.svg" alt='' />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="selection"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={user?.status}
                            onSelectionChange={(e: any) => handleStatusChangeClick(user?.id, e?.currentKey)}
                        >
                            {Object.keys(ProviderStatus).map((status) => {
                                const providerColor = Object.keys(ProviderStatusColor).find((color) => (color === ProviderStatus[status as keyof typeof ProviderStatus]));
                                return (
                                    <DropdownItem textValue={ProviderStatus[status as keyof typeof ProviderStatus]} key={ProviderStatus[status as keyof typeof ProviderStatus]} className="drop-down-btn-li">
                                        {providerColor && <CgRadioChecked color={ProviderStatusColor[providerColor as keyof typeof ProviderStatusColor]} />}
                                        {status}
                                    </DropdownItem>);
                            })}
                        </DropdownMenu>
                    </Dropdown>
                );
            case "withdrawalStatusDropdown":
                return (
                    <>
                        {user?.status === "pending" ? <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize drop-down-btn min-w-[120px]"
                                >
                                    <CgRadioChecked color={WithdrawalPendingStatusColor[user?.status as keyof typeof WithdrawalPendingStatusColor]} />
                                    {Object?.keys(WithdrawalPendingStatus)?.find((status) => WithdrawalPendingStatus[status as keyof typeof WithdrawalPendingStatus] === user?.status)}
                                    <img src="/images/back.svg" alt='' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="selection"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={user?.status}
                                onSelectionChange={(e: any) => handleStatusChangeRemarkClick(user, e?.currentKey)}
                            >
                                {Object.keys(WithdrawalStatus).map((status) => {
                                    const providerColor = Object.keys(WithdrawalStatusColor).find((color) => (color === WithdrawalStatus[status as keyof typeof WithdrawalStatus]));
                                    return (
                                        <DropdownItem textValue={WithdrawalStatus[status as keyof typeof WithdrawalStatus]} key={WithdrawalStatus[status as keyof typeof WithdrawalStatus]} className="capitalize drop-down-btn-li">
                                            <CgRadioChecked color={WithdrawalStatusColor[providerColor as keyof typeof WithdrawalStatusColor] ?? 'default'} />
                                            {status}
                                        </DropdownItem>);
                                })}
                            </DropdownMenu>
                        </Dropdown>
                            :
                            <Chip className="capitalize chip" color={statusColorMap[user.status as keyof typeof statusColorMap] as "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined} size="sm" variant="flat">
                                {user?.status}
                            </Chip>}
                    </>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        {ActiveDeActiveSwitch &&
                            <Switch
                                classNames={{
                                    base: cn(
                                        "inline-flex flex-row-reverse items-center",
                                        "justify-between cursor-pointer rounded-lg",
                                        "data-[selected=true]:border-primary",
                                    ),
                                    wrapper: "p-0 h-4 overflow-visible",
                                    thumb: cn("w-6 h-6 border-2",
                                        "group-data-[hover=true]:border-primary",
                                        "group-data-[selected=true]:ml-6",
                                        "group-data-[pressed=true]:w-7",
                                        "group-data-[selected]:group-data-[pressed]:ml-4",
                                        "shadow-none"
                                    ),
                                }}
                                isSelected={user?.is_active || false}
                                onClick={() => handleActiveDeactiveClick(user)}
                            />
                        }
                        {Send && <Tooltip color="success" content="Send">
                            <span
                                className="text-lg text-warning cursor-pointer active:opacity-50"
                                onClick={() => handleSendNotificationClick(user)}
                            >
                                <div className="sidebar-icon bg-primary-200"><img src="/images/Announcements.svg" alt='announcement' /></div>
                            </span>
                        </Tooltip>}
                        {Info && <Tooltip color="warning" content="Info">
                            <span
                                className="text-lg text-warning cursor-pointer active:opacity-50"
                                onClick={() => handleInfoClick(user)}
                            >
                                <div className="sidebar-icon bg-primary-200"><PiInfoBold /></div>
                            </span>
                        </Tooltip>}
                        {Edit && <Tooltip content="Edit">
                            <span
                                className="text-lg text-default-400 cursor-pointer active:opacity-50 sidebar-icon "
                                onClick={() => handleEditClick(user)}
                            >
                                <AiOutlineEdit className="edit-icon" />
                            </span>
                        </Tooltip>}
                        {Delete && <Tooltip color="danger" content="Delete">
                            <span
                                className="text-lg text-danger cursor-pointer active:opacity-50 sidebar-icon"
                                onClick={() => handleDeleteClick(user?.id)}
                            >
                                <AiOutlineDelete />
                            </span>
                        </Tooltip>}
                        {View && <Tooltip color="foreground" content="Details">
                            <span
                                className="text-lg text-foreground cursor-pointer active:opacity-50 sidebar-icon"
                                onClick={() => handleViewClick(user?.id)}
                            >
                                <AiOutlineEye />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table
                // topContent="Builder Management"
                isCompact
                removeWrapper
                className="custom-table"
                aria-label="Table with custom cells, pagination and sorting"
                checkboxesProps={{
                    classNames: {
                        wrapper: "after:bg-foreground after:text-background text-background",
                    },
                }}
                sortDescriptor={sortRef?.current}
                onSortChange={(sortData: SortDescriptor) => handleSorting(
                    formRef?.current?.values,
                    sortData
                )}
            >
                <TableHeader columns={columns}>

                    {(column: IColumn) => (
                        <TableColumn
                            key={column?.data}
                            style={{ minWidth: `${column?.width}px` }}
                            align={column?.data === "actions" ? "center" : "start"}
                            allowsSorting={column?.orderable}
                            className={column?.className}
                        >
                            <span className="text-base text-black">{column?.name}</span>
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No users found"} items={data}>
                    {(item: any) => (
                        <TableRow key={item?.id}>
                            {columns?.map((columnKey) => {
                                return <TableCell key={columnKey?.data} className={`${columnKey?.width ? 'space-normal' : ''}`} >{renderCell(item, columnKey?.data)}</TableCell>
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableFooter
                totalCount={totalCountRef?.current}
                page={pageRef?.current?.page}
                rowsPerPage={pageRef?.current?.limit}
                onPageChange={(page) =>
                    handleSetPageDetails(
                        formRef?.current?.values,
                        handlePageDetailChange(
                            PageActions.PageChange,
                            page,
                            pageRef?.current ?? { page: 1, limit: 10 }
                        )
                    )
                }
                onRowsPerPageChange={(rowsPerPage) =>
                    handleSetPageDetails(
                        formRef?.current?.values,
                        handlePageDetailChange(
                            PageActions.RowsPerPageChange,
                            rowsPerPage,
                            pageRef?.current ?? { page: 1, limit: 10 }
                        )
                    )
                }
            />
        </>
    );
};
export default CustomTable;