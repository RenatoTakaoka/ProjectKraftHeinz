"use client"
import GraficoDeBarraMarcas from "@/components/GraficoDeBarraMarcas";


export default function Dashboard(){

    return(
<div className="w-full h-screen col-start-2 col-span-12 lg:col-start-3">
    <div className="grid grid-cols-1 grid-rows-6 w-full h-full ">
<div className="bg-blue-800 grid grid-cols-2  row-start-1 row-span-2 place-items-center">

</div>
        <div className="col-start-1 col-span-3  p-10 row-start-3 row-span-6"> <GraficoDeBarraMarcas></GraficoDeBarraMarcas></div>
    </div>
</div>
    )
}

