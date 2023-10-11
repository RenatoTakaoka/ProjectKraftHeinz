"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import { Controller } from 'react-hook-form';
import {z} from "zod";

interface marca{
    codProduto: number,
    nome: string,
    descricao: string,
    imagemMarca: string,
    avaliacaoFuncionarios: [] | null,
    avaliacaoClientes: [] | null
}



export default  function DropdownProduto({ control, name }:any) {
    const [Produtos, setProdutos] = useState<marca[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/produto").then(function (response) {
            setProdutos(response.data);
        })
    }, []);



    return(
        <div>
            <label htmlFor="produtos" className="block mb-2 text-sm font-medium text-gray-900 ">Selecione o produto </label>
            <Controller
                name={name}
                control={control}
                defaultValue={1}
                render={({ field }) => (
                    <select {...field}  onChange={(e) => {
                        field.onChange(Number(e.target.value)) ;
                    }} id="marcas" className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {Produtos.map((produto)=>{
                            return  <option key={produto.codProduto} selected={true} value={produto.codProduto}>{produto.nome}</option>
                        })}
                    </select>
                )}
            />
        </div>
    )
}