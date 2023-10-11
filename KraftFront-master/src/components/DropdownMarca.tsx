"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import { Controller } from 'react-hook-form';
import {z} from "zod";

interface marca{
    codMarca: number,
    nome: string,
    imagemMarca: string,
    avaliacaoFuncionarios: [] | null,
    avaliacaoClientes: [] | null
    produtos: [] | null
}



export default  function DropdownMarca({ control, name }:any) {
    const [Marcas, setMarcas] = useState<marca[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/marcas").then(function (response) {
            setMarcas(response.data);
        })
    }, []);



    return(
        <div>
            <label htmlFor="marcas" className="block mb-2 text-sm font-medium text-gray-900 ">Selecione a marca </label>
            <Controller
                name={name}
                control={control}
                defaultValue={1}
                render={({ field }) => (
                    <select {...field}  onChange={(e) => {
                        field.onChange(Number(e.target.value)) ;
                    }} id="marcas" className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {Marcas.map((marca)=>{
                            return  <option key={marca.codMarca} selected={true} value={marca.codMarca}>{marca.nome}</option>
                        })}
                    </select>
                )}
            />
        </div>
    )
}