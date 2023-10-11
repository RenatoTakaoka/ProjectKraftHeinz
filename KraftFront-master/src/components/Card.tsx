import Image from "next/image";
import Logo from "../../public/LogoKraftv2 1.svg";
import Link from "next/link";


interface card {
    srcImg: string,
    nome: string,
    descricao: string,
    id: number,
    tipo: string
}
export default  function Card({srcImg,descricao,nome, id,tipo}:card){
    return(
        <div className="card card-compact w-96 bg-base-100 shadow-xl ">
            <figure className="p-6"><img src={`data:image/jpeg;base64,${srcImg}`} alt={nome} className="w-full"/></figure>
            <div className="card-body">
                <h2 className="card-title">{nome}</h2>
                <p>{descricao}</p>
                <div className="card-actions justify-center py-2">
                    <Link className="btn hover:bg-gray-600 bg-MainColor text-white w-full" href={`avaliacao/${tipo}/${id}`}>Avaliar</Link>
                </div>
            </div>
        </div>
    )

}