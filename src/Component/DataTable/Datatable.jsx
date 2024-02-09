import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { MuiCustomTable } from "../../utils/MuiCustomTable";
import ActionDropdown from "../../utils/ActionDropdown";
import { DataTableContext } from "../../Contexts/DataTableContext";

const Datatable = ({
    columnsName = [],
    data,
    actionColumnVisibility,
    uniqueId,
    checkboxSelection,
    processRowUpdate,
    dropDownOptions,
    handleRowClickInParent,
    loading,
    secondaryColor,
    getFilteredOptions,
    showToolbarSlot,
}) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState([]);
    const [record, setRecord] = useState([]);
    const { rowSelectionModel, setRowSelectionModel, tableSelectedRows, setTableSelectedRows, setTableSelectedExportRows } = useContext(DataTableContext);

    const handleRowClick = (item) => {
        if (item && item._id && item._id.includes(uniqueId)) {
            handleRowClickInParent(item);
        }
    };

    useEffect(() => {
        if (data) {
            setRecord(data.map((item, index) => ({ ...item, no: index + 1 })));
        }
    }, [data]);

    const idColumn = [
        {
            field: "no",
            headerName: 'ID',
            width: 30,
        },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: 'Actions',
            width: uniqueId === "customerListId" ? 200 : 150,
            renderCell: (params) => (
                <ActionDropdown
                    row={params.row}
                    dropDownOptions={dropDownOptions || []}
                    getFilteredOptions={getFilteredOptions}
                />
            ),
        },
    ];

    return (
        <>
            <div
                className="datatable"
                style = {{ overflowX: "auto" }}
            >
                <MuiCustomTable
                    secondaryColor={secondaryColor ? secondaryColor : null}
                    loading={loading}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                    }
                    editMode="row" // set to row if need to edit row
                    processRowUpdate={processRowUpdate ? processRowUpdate : null}
                    onProcessRowUpdateError={(params, error) => {
                        console.log(error);
                    }}
                    slots={{ toolbar: showToolbarSlot !== false ? GridToolbar : undefined }}
                    rows={record}
                    columns={
                        actionColumnVisibility !== false
                            ? [
                                ...idColumn.slice(0, 1),
                                ...actionColumn,
                                ...idColumn.slice(1),
                                ...columnsName,
                            ]
                            : [...idColumn, ...columnsName]
                    }
                    pageSize={30}
                    pageSizeOptions={[50, 100, { value: -1, label: "All" }]}
                    checkboxSelection={checkboxSelection !== "disabled"}
                    getRowId={(row) => row.no}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                        const selectedRows = record.filter((row) => newRowSelectionModel.includes(row.no));
                        setSelectedRow(selectedRows.map((item, index) => ({ data: item, index })));
                        setTableSelectedRows(selectedRows);
                        setTableSelectedExportRows(selectedRows);
                        handleRowClick(selectedRows);
                    }}
                />
            </div>
        </>
    );
};

export default Datatable;
