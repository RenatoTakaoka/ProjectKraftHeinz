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




type AvaliacaoCliente = {
    PrimeiroNomeCliente: string,
    NomeMarca: string,
    NomeProduto: string,
    UltimoNomeCliente: string,
    AvaliacaoCliente: {
        codAvaliacoesCliente: number,
        mensagem: string,
        dataAvalicao: any,
        nota: number,
        tagsCliente: [{
            codTag: number,
            nomeTag: String}],
    }
};

const TableAvaliacaoCliente = () => {
    const [tableData, setTableData] = useState<AvaliacaoCliente[]>([]);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {
        axios.get("http://localhost:8080/avaliacaoclientes/getMarcaProduto").then(function (response) {
            setTableData(response.data);
        })
    }, []);



    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<AvaliacaoCliente>) => {
            if (
                !confirm(`Você ter certeza que deseja deletar? Avaliação do usuario ${row.getValue('AvaliacaoCliente.codAvaliacoesCliente')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            axios.delete(`http://localhost:8080/avaliacaoclientes/${row.getValue('AvaliacaoCliente.codAvaliacoesCliente')}`).then(function (response) {
                setTableData(response.data);
            })
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<AvaliacaoCliente>,
        ): MRT_ColumnDef<AvaliacaoCliente>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid = cell.column.id === "nome" ?  validateRequired(event.target.value) : null;
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

    const columns = useMemo<MRT_ColumnDef<AvaliacaoCliente>[]>(
        () => [
            {
                accessorKey: 'AvaliacaoCliente.codAvaliacoesCliente',
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,

            },
            {
                accessorFn: (row) => `${row.PrimeiroNomeCliente} ${row.UltimoNomeCliente}`,
                header: 'Cliente',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 250,
            },
            {
                accessorKey: 'AvaliacaoCliente.mensagem',
                header: 'Mensagem',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 250,

            },
            {
                accessorKey: 'AvaliacaoCliente.dataAvalicao',
                header: 'Data da avaliação',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 125,

            },
            {
                accessorKey: 'AvaliacaoCliente.nota',
                header: 'Nota',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 125,

            },
            {
                accessorKey: 'NomeProduto',
                header: 'Produto',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 125,
            },
            {
                accessorKey: 'NomeMarca',
                header: 'Marca',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 125,

            },

            {
                accessorFn: (row) => row.AvaliacaoCliente && row.AvaliacaoCliente.tagsCliente ? row.AvaliacaoCliente.tagsCliente.map(tag => tag.nomeTag).join(', ') : '',
                id: 'AvaliacaoCliente.',
                header: 'Tags',
                size: 125,
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
    columns: MRT_ColumnDef<AvaliacaoCliente>[];
    onClose: () => void;
    onSubmit: (values: AvaliacaoCliente) => void;
    open: boolean;
}

//example of creating a mui dialog modal for creating new rows

const validateRequired = (value: string) => !!value.length && value.length < 26;
export default TableAvaliacaoCliente;