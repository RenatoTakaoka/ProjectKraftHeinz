"use client"
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import dynamic from "next/dynamic";
import {getCookie} from "typescript-cookie";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const DropdownMarca = dynamic(() => import('@/components/DropdownMarca'), {
    loading: () => <select  className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option>Loading...</option>
    </select>,
})

const RegistrerProdutoSchema = z.object({
    produto: z.object({
            nome: z.string().nonempty("Não pode estar vazio!"),
            descricao: z.string().nonempty("Não pode estar vazio!"),
        funcionario: z.object({
                codFuncionario: z.number().int().positive().optional()
            }).default({}),
        marca: z.object({
            codMarca: z.number().int().positive()
        }),
        }
    ),
    file: z.any().refine((files) => files?.length == 1, "É necessario ter uma imagen")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Tamanho maximo de 5MB.")
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png"

        )
});

type RegistrerProdutoSchema = z.infer<typeof RegistrerProdutoSchema>

export default function AdicionarProduto(){
    const {register,control, handleSubmit, formState: {errors}} = useForm<RegistrerProdutoSchema>({resolver: zodResolver(RegistrerProdutoSchema)});

        function registrarProduto(data:RegistrerProdutoSchema){
            const codFuncion = getCookie("UserFuncCod")
            let formData = new FormData();
            if(codFuncion != undefined) {
                data.produto.funcionario.codFuncionario = parseInt(getCookie("UserFuncCod") as string)
            }else {
                return
            }
        formData.append('produto', JSON.stringify(data.produto));
        formData.append('file', data.file[0]);
        axios.post("http://localhost:8080/produto", formData).then(function (response) {
        }).catch(function (error) {
            console.log(error);
        });
    }


    return(
        <>
            <section className=" col-start-2 col-span-12 lg:col-start-3">
                <div className="flex flex-col items-center h-full  pt-0 mx-auto justify-center lg:py-0">
                    <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="  p-5">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Adicione um produto
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(registrarProduto)}>
                                <div>
                                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 ">Nome do produto</label>
                                    <input   type="text" placeholder="Digite aqui" className="input input-bordered input-md bg-gray-50 border border-gray-300 text-gray-900 w-full  align-text-top p-2.5 pt-1" {...register('produto.nome')}/>
                                    {errors.produto?.nome && <span className="text-red-700 border-rose-500">{errors.produto.nome.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 ">Descrição</label>
                                    <textarea maxLength={200}  rows={2} cols={4} placeholder="Digite aqui" className="input input-bordered input-lg bg-gray-50 border border-gray-300 text-gray-900 w-full h-52 align-text-top resize-none p-2.5 pt-1" {...register('produto.descricao')}/>
                                    {errors.produto?.descricao && <span className="text-red-700 border-rose-500">{errors.produto.descricao.message}</span>}
                                </div>
                                     <DropdownMarca  control={control}  name='produto.marca.codMarca'></DropdownMarca>
                                {errors.produto?.marca?.codMarca && <span className="text-red-700 border-rose-500">{errors.produto.marca.codMarca.message}</span>}
                                <div>
                                    <label htmlFor="imagem" className="block mb-2 text-sm font-medium text-gray-900 ">Selecione uma imagem</label>
                                    <input type="file" className="file-input file-input-bordered w-full " {...register('file')}/>

                                </div>
                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}