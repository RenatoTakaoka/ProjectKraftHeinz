"use client"
import Image from "next/image";
import Logo from "../../public/LogoKraftv2 1.svg";
import {useEffect, useState} from "react";
import axios from "axios";
import {Controller} from "react-hook-form";
import {tag} from "postcss-selector-parser";

interface tag{
    codTag: number,
    nomeTag: string,
    avaliacaoFuncionario: [],
    avaliacaoCliente: []
}



export default function DropdownTags({ control, name }:any) {
    const [Marcas, setMarcas] = useState<tag[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/tags").then(function (response) {
            setMarcas(response.data);
        })
    }, []);

    return(
        <div>
            <label htmlFor="marcas" className="block mb-2 text-sm font-medium text-gray-900 ">Selecione a tag </label>
            <Controller
                name={name}
                control={control}
                defaultValue={1}
                render={({ field }) => (
                    <select {...field} onChange={(e) => {
                        field.onChange(Number(e.target.value));  // default handler from the Controller
                    }} id="marcas" className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        {Marcas.map((tag)=>{
                            return  <option key={tag.codTag} value={tag.codTag}>{tag.nomeTag}</option>
                        })}
                    </select>
                )}
            />
        </div>
    )
}
