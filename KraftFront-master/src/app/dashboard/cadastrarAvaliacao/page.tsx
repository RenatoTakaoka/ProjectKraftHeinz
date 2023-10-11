"use client"
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import {getCookie} from "typescript-cookie";
import SelectTags from "@/components/SelectTag";
import RadioGroupRating from "@/components/RadioGroupRating";

const DropdownMarca = dynamic(() => import('@/components/DropdownMarca'), {
    loading: () => <select
        className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option>Loading...</option>
    </select>,
})


const DropdownProduto = dynamic(() => import('@/components/DropdownProduto'), {
    loading: () => <select
        className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option>Loading...</option>
    </select>,
})

const RegistrerAvaliacaoSchema = z.object({
    avaliacaoFuncionario: z.object({
            mensagem: z.string().nonempty("Não pode estar vazio!"),
            redeSocial: z.string().nonempty("Não pode estar vazio!"),
            usuarioPostagem: z.string().nonempty("Não pode estar vazio!"),
            tagsFuncionario: z.array(z.object({
                codTag: z.number().int().positive().optional()
            })).default([{}]),
            funcionarios: z.object({
                codFuncionario: z.number().int().positive().optional()
            }).default({}),
            produtos: z.object({
                codProduto: z.number().int().positive().optional()
            }).default({}).optional(),
            marcas: z.object({
                codMarca: z.number().int().positive().optional()
            }).default({}).optional(),
            nota: z.number().int().min(1).max(5).default(1),
        }
    ),

});

type RegistrerAvaliacaoSchema = z.infer<typeof RegistrerAvaliacaoSchema>


export default function CadastrarAvaliacao() {
    const [sucesso, setSucesso] = useState(false);
    const [AvalicaoOpition, setAvalicaoOpition] = useState("1");
    const {
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<RegistrerAvaliacaoSchema>({resolver: zodResolver(RegistrerAvaliacaoSchema)});
    const [codTags, setCodTags] = useState([]);

    function registrarAvaliacao(data: RegistrerAvaliacaoSchema) {
        const codFuncion = getCookie("UserFuncCod")
        if (codFuncion != undefined) {
            data.avaliacaoFuncionario.funcionarios.codFuncionario = parseInt(getCookie("UserFuncCod") as string)
        } else {
            return
        }
        if (AvalicaoOpition == "1") {
            data.avaliacaoFuncionario.produtos = undefined;
        } else {
            data.avaliacaoFuncionario.marcas = undefined;
        }

        data.avaliacaoFuncionario.tagsFuncionario = codTags
        axios.post("http://localhost:8080/avaliacaofuncionarios", data.avaliacaoFuncionario)
            .then(function (response) {
                setSucesso(true);
            }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSelectedTags = (selectedTags: any) => {
        const codTags = selectedTags.map((tag: any) => ({codTag: tag.value}));
        setCodTags(codTags);
    };
    return (
        <>
            <section className=" col-start-2 col-span-12 lg:col-start-3">
                <div className="flex flex-col items-center h-full  pt-0 mx-auto justify-center lg:py-0">
                    <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="  p-5">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Adicione uma avaliação
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#"
                                  onSubmit={handleSubmit(registrarAvaliacao)}>
                                <div>
                                    <label htmlFor="mensagem"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">Mensagem</label>
                                    <textarea maxLength={200} rows={2} cols={4} placeholder="Digite aqui"
                                              className="input input-bordered input-lg bg-gray-50 border border-gray-300 text-gray-900 w-full h-52 align-text-top resize-none p-2.5 pt-1" {...register('avaliacaoFuncionario.mensagem')}/>
                                    {errors.avaliacaoFuncionario?.mensagem && <span
                                        className="text-red-700 border-rose-500">{errors.avaliacaoFuncionario.mensagem.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="redesSociais"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rede
                                        Social: </label>
                                    <select defaultValue={"1-Nenhuma"} id="redesSociais"
                                            className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " {...register('avaliacaoFuncionario.redeSocial')}>
                                        <option value={"1-Nenhuma"}>Nenhuma</option>
                                        <option value={"2-Instagram"}>Instagram</option>
                                        <option value={"3-Twitter"}>Twitter</option>
                                        <option value={"4-Youtube"}>Youtube</option>
                                        <option value={"5-Outras"}>Outras</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 ">Usuário
                                        da postagem</label>
                                    <input type="text" id="user" placeholder="@ do usuário"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " {...register('avaliacaoFuncionario.usuarioPostagem')}/>
                                    {errors.avaliacaoFuncionario?.usuarioPostagem && <span
                                        className="text-red-700 border-rose-500">{errors.avaliacaoFuncionario.usuarioPostagem.message}</span>}
                                </div>
                                <div>
                                    <label htmlFor="marcaOuProduto"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">Escolha o tipo da
                                        avaliação </label>
                                    <select defaultValue={1} onChange={(e: any) => {
                                        setAvalicaoOpition(e.target.value)
                                    }}
                                            className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option value={1}>Marca</option>
                                        <option value={2}>Produto</option>
                                    </select>
                                </div>
                                {AvalicaoOpition === "1" ? <DropdownMarca control={control}
                                                                          name='avaliacaoFuncionario.marcas.codMarca'></DropdownMarca> :
                                    <DropdownProduto control={control}
                                                     name='avaliacaoFuncionario.produtos.codProduto'></DropdownProduto>}
                                {errors.avaliacaoFuncionario?.marcas?.codMarca && <span
                                    className="text-red-700 border-rose-500">{errors.avaliacaoFuncionario.marcas.codMarca.message}</span>}
                                <h2>Tags:</h2>
                                <SelectTags control={control} name='avaliacaoFuncionario.tagsFuncionario'
                                            onSelectedTags={handleSelectedTags}></SelectTags>
                                <h2>Nota:</h2>
                                <RadioGroupRating control={control} name='avaliacaoFuncionario.nota'></RadioGroupRating>
                                {sucesso ? <span className="text-green-600">Cadastrado com sucesso!!!</span> : null}
                                <button type="submit"
                                        className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
