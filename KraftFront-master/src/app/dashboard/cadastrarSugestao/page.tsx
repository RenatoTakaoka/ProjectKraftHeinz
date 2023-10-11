"use client"
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import dynamic from "next/dynamic";
import {getCookie} from "typescript-cookie";

const RegistrerSugestaoSchema = z.object({
    sugestao: z.object({
        mensagem: z.string().nonempty("Não pode estar vazio!"),
            redeSocial: z.string().nonempty("Não pode estar vazio!"),
            usuarioPostagem: z.string().nonempty("Não pode estar vazio!"),
            tagsFuncionario: z.array(z.object({
                codTag: z.number().int().positive()
            })).default([{codTag: 14}]),
        funcionarios: z.object({
                codFuncionario: z.number().int().positive().optional()
            }).default({codFuncionario: 1}),
        marcas: z.object({
            codMarca: z.number().int().positive()
        }).default({codMarca: 14})
        }
    ),
});

type RegistrerSugestaoSchema = z.infer<typeof RegistrerSugestaoSchema>

export default function CadastrarSugestao(){
    const [sucesso,setSucesso] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<RegistrerSugestaoSchema>({resolver: zodResolver(RegistrerSugestaoSchema)});

    function registrarSugestao(data:RegistrerSugestaoSchema){
        const codFuncion = getCookie("UserFuncCod")
        if(codFuncion != undefined) {
            data.sugestao.funcionarios.codFuncionario = parseInt(getCookie("UserFuncCod") as string)
        }else {
            return
        }
        axios.post("http://localhost:8080/avaliacaofuncionarios", data.sugestao).then(function (response) {
            setSucesso(true);
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
                                Adicione uma sugestão
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(registrarSugestao)}>
                                <div>
                                    <label htmlFor="mensagem" className="block mb-2 text-sm font-medium text-gray-900 ">Mensagem</label>
                                    <textarea maxLength={200}   rows={2} cols={4} placeholder="Digite aqui" className="input input-bordered input-lg bg-gray-50 border border-gray-300 text-gray-900 w-full h-52 align-text-top resize-none p-2.5 pt-1" {...register('sugestao.mensagem')}/>
                                    {errors.sugestao?.message && <span className="text-red-700 border-rose-500">{errors.sugestao.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="redesSociais" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rede Social: </label>
                                    <select id="redesSociais" className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " {...register('sugestao.redeSocial')}>
                                        <option>Nenhuma</option>
                                        <option>Instagram</option>
                                        <option>Twitter</option>
                                        <option>Youtube</option>
                                        <option>Outras</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 ">Usuário da postagem</label>
                                    <input type="text" id="user" placeholder="@ do usuário" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " {...register('sugestao.usuarioPostagem')}/>
                                    {errors.sugestao?.message && <span className="text-red-700 border-rose-500">{errors.sugestao.message}</span>}
                                </div>
                                {sucesso ? <span className="text-green-600">Cadastrado com sucesso!!!</span> : null}
                                <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 ">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
