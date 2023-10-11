

import Image from "next/image";
import Logo from "../../public/LogoKraftv2 1.svg";
import profilePic from "../../public/user-interface1.png";
import Link from 'next/link'
import {getCookie} from "typescript-cookie";
export default function Navbar(){

    const userName = getCookie('UserName') as string

    return(
        <nav className="navbar bg-MainColor ">
            <div className="flex-1">
                <a><Image src={Logo} alt={"Logo"} width={325} height={82} /></a>
            </div>

            <div className="flex-none gap-2">
                <Link href="/signin" className="flex items-center">
                {userName != undefined ? <p className="text-white">Bem vindo {JSON.parse(userName)} !</p>: <p className="text-white">Logar</p>}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full hover:bg-blue-500">
                           <Image src={profilePic} alt={"test"} width={60} height={60}/>
                        </div>
                    </label>
                </div>
                </Link>
            </div>
        </nav>
    )
}