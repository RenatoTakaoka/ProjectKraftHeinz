"use client"
import Image from 'next/image'
import Logo from '../../../../../public/LogoKraftv2 1.svg'
import dynamic from 'next/dynamic'
const DropdownTag = dynamic(() => import('@/components/DropdownTags'), {
    loading: () => <select id="tags" className="bg-gray-50 m-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <option>Loading...</option>
    </select>,
})
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import {z} from "zod";
import SelectTag from "@/components/SelectTag";
import RadioGroupRating from "@/components/RadioGroupRating";
import {useRouter} from "next/navigation";
import SelectTags from "@/components/SelectTag";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getCookie} from "typescript-cookie";

interface pageProps{
    params: {id: number}
}
interface marca{
    nome: string,
    funcionario : {codFuncionario: number}
}


const RegistrerAvaliacaoMarcaSchema = z.object({
    mensagem: z.string().nonempty(),
    tagsCliente: z.array(z.object({codTag: z.number().int().optional()})).default([]),
    clientes: z.object({codCliente: z.number().optional()}).default({}),
    nota: z.number().int().min(1).max(5).default(1),
    marcas: z.object({codMarca: z.number().int().optional()}).default({})
})
type RegistrerAvaliacaoMarcaSchema = z.infer<typeof RegistrerAvaliacaoMarcaSchema>

 function Avaliacao({params}:pageProps) {
     const router = useRouter()
     const [codTags, setCodTags] = useState([]);
    const marcaId = params.id;
    const [marca,setMarca] = useState<marca>();
     const {register,control, handleSubmit, formState: {errors}} = useForm<RegistrerAvaliacaoMarcaSchema>({resolver: zodResolver(RegistrerAvaliacaoMarcaSchema)});
    useEffect(() => {
        axios.get(`http://localhost:8080/marcas/${marcaId}`).then(function (response) {
            setMarca(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, [marcaId]);

     function registrarAvalicaoMarca(data:RegistrerAvaliacaoMarcaSchema){
         const UserCode = getCookie('UserCode') as string
         if(UserCode === undefined) {
             router.push('/signin', { scroll: false })
             return
         }
         data.clientes.codCliente = parseInt(UserCode)
         data.marcas.codMarca = marcaId;
         data.tagsCliente = codTags
         axios.post("http://localhost:8080/avaliacaoclientes", data)
             .then(function (response) {
             }).catch(function (error) {
             router.push('/signin', { scroll: false })
             console.log(error);
         });
     }
     const handleSelectedTags = (selectedTags:any) => {
         const codTags = selectedTags.map((tag : any) => ({codTag: tag.value}));
         setCodTags(codTags);
     };
    return(
        <>
            <section className=" bg-MainColor ">
                <div className="flex flex-col items-center h-screen  pt-0 mx-auto justify-center lg:py-0">
                    <div className="w-full bg-MainColor rounded-lg  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="  p-5">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center mb-10">
                                <a className="m-auto"><Image src={Logo} alt={"Logo"} width={325} height={82}/></a>
                            </div>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white  md:text-2xl ">
                                Fazer uma avaliação
                            </h1>
                            <h2 className="text-lg font-bold leading-tight tracking-tight text-white">Marca: {marca?.nome}</h2>

                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(registrarAvalicaoMarca)}>
                                <div>
                                    <label htmlFor="mensagem" className="block mb-2 text-sm font-medium text-white ">Mensagem</label>
                                    <textarea maxLength={200}  rows={2} cols={4} placeholder="Digite aqui" className="input input-bordered input-lg bg-gray-50 border border-gray-300 text-gray-900 w-full h-52 align-text-top resize-none p-2.5 pt-1" {...register("mensagem")}/>
                                </div>
                                <h2  className="py-2 text-white">Adicionar uma tag:</h2>
                                <SelectTags control={control}   name='tagsCliente' onSelectedTags={handleSelectedTags} ></SelectTags>
                                <h2  className="py-2 text-white">Nota:</h2>
                                <RadioGroupRating control={control}  name='nota'></RadioGroupRating>
                                <div className="flex justify-between">
                                    <Link href="/" className="w-full"> <button type="submit" className="w-2/5 text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Voltar</button></Link>
                                    <button type="submit" className="w-2/5 text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Avaliacao;