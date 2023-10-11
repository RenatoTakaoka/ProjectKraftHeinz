import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    MaterialReactTable,
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from "axios";


export type Tags = {
    codTag: number;
    nomeTag: string;
    avaliacaoFuncionario: [];
    avaliacaoCliente: [];
};

const TableTags = () => {
    const [tableData, setTableData] = useState<Tags[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {
        axios.get("http://localhost:8080/tags").then(function (response) {
            setTableData(response.data);
        })
    }, []);


    const handleSaveRowEdits: MaterialReactTableProps<Tags>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values}) => {
            if (!Object.keys(validationErrors).length) {
                axios.put("http://localhost:8080/tags", values).then(function (response) {
                    setTableData(response.data);
                })
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Tags>) => {
            if (
                !confirm(`Você ter certeza que deseja deletar? ${row.getValue('nomeTag')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            axios.delete(`http://localhost:8080/tags/${row.id}`).then(function (response) {
                setTableData(response.data);
            })
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<Tags>,
        ): MRT_ColumnDef<Tags>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid = cell.column.id === "nomeTag" ?  validateRequired(event.target.value) : null;
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} inválido`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo<MRT_ColumnDef<Tags>[]>(
        () => [
            {
                accessorKey: 'codTag',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,

            },
            {
                accessorKey: 'nomeTag',
                header: 'Nome da tag',
                size: 25,

                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: "text"
                }),
            },
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <>
            <MaterialReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 120,

                    },
                }}
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}

                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}  >
                        <Tooltip arrow placement="left" title="Editar">
                            <IconButton  onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Deletar">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />
        </>
    );
};

interface CreateModalProps {
    columns: MRT_ColumnDef<Tags>[];
    onClose: () => void;
    onSubmit: (values: Tags) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows

const validateRequired = (value: string) => !!value.length && value.length < 26;
export default TableTags;