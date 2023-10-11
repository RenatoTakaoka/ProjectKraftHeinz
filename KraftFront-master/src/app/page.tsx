"use client"
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import SwiperMarcas from "@/components/SwiperMarcas";
import SwiperProdutos from "@/components/SwiperProdutos";
import dynamic from "next/dynamic";
const Navbar = dynamic(
    () => import('@/components/Navbar'),
    { ssr: false }
)
export default function Home() {

  return (
    <>
        <Navbar></Navbar>
        <main className="bg-blue-600">
        <Banner></Banner>
          <SwiperMarcas titulo={"marcas"}></SwiperMarcas>
          <SwiperProdutos titulo={"produto"}></SwiperProdutos>
      </main>
        <Footer></Footer>
    </>
  )
}
