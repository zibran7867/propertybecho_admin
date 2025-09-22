import { Pagination, Select, SelectItem } from '@heroui/react';
import React from 'react';
import { PAGE_OPTIONS } from '../constants/pagination';

interface ITableFooterProps {
    page?: number;
    rowsPerPage?: number;
    totalCount?: number;
    onPageChange?: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TableFooter: React.FC<ITableFooterProps> = ({
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
}) => {
    const [selectedValue, setSelectedvalue] = React.useState(10)
    const start = ((page || 1) - 1) * (rowsPerPage || 10) + 1;
    let end = ((page || 1) - 1) * (rowsPerPage || 10) + (rowsPerPage || 10);
    end = end > (totalCount || 0) ? (totalCount || 0) : end;

    const pages = Math?.ceil((totalCount || 0) / (rowsPerPage || 1));

    return (
        <div className="py-2 px-2 flex justify-between items-center table-pagination">
            <label className="flex items-center text-default-400 text-small">
                <span className="label">Rows per page:</span>
                <Select
                    className="bg-transparent outline-none text-default-400 text-small pagination-select w-full"
                    value={rowsPerPage}
                    defaultSelectedKeys={[`${rowsPerPage}`]}
                    disabledKeys={[`${selectedValue}`]}
                    aria-label="table-footer"
                    onChange={(event) => {
                        setSelectedvalue((prev) => {
                            if (prev === rowsPerPage) {
                                onRowsPerPageChange(+event?.target?.value)
                                return +event?.target?.value;
                            } else {
                                onRowsPerPageChange(prev)
                                return prev;
                            }
                        });
                    }}
                >
                    {PAGE_OPTIONS?.map((option) => {
                        return (
                            <SelectItem key={option} textValue={`${option}`}>
                                {option}
                            </SelectItem>
                        )
                    })}
                </Select>
                <span className="label ms-2">
                    {`${totalCount && totalCount > 0 ? `${start} - ${end} out of ${totalCount}` : ''}`}
                </span>
            </label>
            <Pagination
                showControls
                initialPage={1}
                classNames={{
                    cursor: "text-white text-base",
                }}
                color="primary"
                variant="faded"
                page={page}
                total={pages}
                onChange={(page) => onPageChange && onPageChange(page)}
            />
        </div>
    );
}

export default TableFooter
