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
import {tag} from "postcss-selector-parser";


type AvaliacaoFuncionario = {
    "NomeMarca": string,
    "NomeProduto": string,
    "avaliacaoFuncionario":{
        codAvalicaoFuncionario: number,
        mensagem: string,
        usuarioPostagem: string,
        tagsFuncionarios: [{
         codTag: number,
         nomeTag: String
}] | [],
},
    }

const TableAvaliacaoFuncionario= () => {
    const [tableData, setTableData] = useState<AvaliacaoFuncionario[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {

        axios.get("http://localhost:8080/avaliacaofuncionarios/getMarcaProduto").then(function (response) {
            setTableData(response.data);
        })
    }, []);


    const handleSaveRowEdits: MaterialReactTableProps<AvaliacaoFuncionario>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values}) => {
            if (!Object.keys(validationErrors).length) {
                axios.put("http://localhost:8080/avaliacaoFuncionarios", values).then(function (response) {
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
        (row: MRT_Row<AvaliacaoFuncionario>) => {
            if (
                !confirm(`Você ter certeza que deseja deletar? Avaliação do usuario ${row.getValue('avaliacaoFuncionario.usuarioPostagem')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            axios.delete(`http://localhost:8080/avaliacaofuncionarios/${row.getValue('avaliacaoFuncionario.codAvalicaoFuncionario')}`).then(function (response) {

            })
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<AvaliacaoFuncionario>,
        ): MRT_ColumnDef<AvaliacaoFuncionario>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid = cell.column.id === "mensagem" ?  validateRequired(event.target.value) : null;
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

    const columns = useMemo<MRT_ColumnDef<AvaliacaoFuncionario>[]>(
        () => [
            {
                accessorKey: 'avaliacaoFuncionario.codAvalicaoFuncionario',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,

            },
            {
                accessorKey: 'avaliacaoFuncionario.mensagem',
                header: 'Mensagem',
                size: 250,

                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: "text"
                }),
            },
            {
                accessorKey: 'avaliacaoFuncionario.usuarioPostagem',
                header: 'Usuario da postagem',
                size: 25,

                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: "text"
                }),
            },
            {
                accessorKey: 'NomeProduto',
                header: 'Produto',
                size: 25,
                enableEditing: false,
            },
            {
                accessorKey: 'NomeMarca',
                header: 'marca',
                size: 25,
                enableEditing: false,
            },
            {
                accessorFn: (row) => row.avaliacaoFuncionario && row.avaliacaoFuncionario.tagsFuncionarios ? row.avaliacaoFuncionario.tagsFuncionarios.map(tag => tag.nomeTag).join(', ') : '',
                id: 'avaliacaoFuncionario.tagsFuncionario.codTag',
                header: 'Tags',
                size: 25,
                enableEditing: false,
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
    columns: MRT_ColumnDef<AvaliacaoFuncionario>[];
    onClose: () => void;
    onSubmit: (values: AvaliacaoFuncionario) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows

const validateRequired = (value: string) => !!value.length && value.length < 26;
export default TableAvaliacaoFuncionario;