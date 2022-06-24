import Link from "next/link";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
    const [ openNavbar, setOpenNavbar ] = useState(true)

    var classNames = require('classnames');

    const router = useRouter()

    const classIcon = "text-lg mr-2 float-left text-amber-50"

    const menubar = [
      {
          name: "Pokémon List",
          url: "/",
          icon: <Icon className={classIcon + " text-amber-300"} icon="arcticons:pokemon-unite" />
      },
      {
          name: "My Pokémon",
          url: "/mypokemon",
          icon: <Icon className={classIcon + " text-red-500"} icon="ic:twotone-catching-pokemon" />
      }
    ];

    return <>
        <nav className="fixed w-full shadow bg-dark-gray z-10">
            <div className="container px-6 py-3 lg:py-0 mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Link href="/">
                            <button
                                onClick={ () => setOpenNavbar(true) }
                                className="text-2xl font-bold transition-colors duration-200 transform lg:text-3xl text-gray-400 hover:text-gray-300 uppercase">
                                Pokédex
                            </button>
                          </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button
                                onClick={ () => setOpenNavbar(!openNavbar) }
                                type="button"
                                className="text-gray-500 hover:text-gray-400 focus:outline-none focus:text-gray-600"
                                aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={classNames("lg:flex", {"hidden" : openNavbar})}>
                        <div className="flex flex-col lg:items-center mt-2 lg:flex-row lg:mt-0 lg:mx-1">
                            { menubar.map((item, index) => {
                                return <div key={'link'+index}>
                                    <Link
                                        href={item.url}>
                                        <div onClick={ () => setOpenNavbar(!openNavbar) } className="px-3 bg-soft-gray lg:bg-transparent mt-1 cursor-pointer">
                                            <button className={classNames("hover:border-b-2 border-gray-400 my-1 py-2 font-bold text-sm lg:text-md uppercase leading-5 text-gray-300 font-bold transition-colors duration-200 transform text-gray-300 hover:text-amber-300 lg:mx-4 lg:my-0", router.pathname===item.url ? "text-amber-400" : "")} >
                                                {item.icon} {item.name}
                                            </button>
                                            <Icon className="text-gray-400 text-lg float-right mt-3 lg:hidden" icon="ic:baseline-navigate-next" />
                                        </div>
                                    </Link>
                                </div>
                            })}
                        </div>

                        <div className="flex items-center py-2 -mx-1 lg:mx-0">
                          <Link href="/pokedex">
                            <button onClick={ () => setOpenNavbar(!openNavbar) } className="flex-1">
                                  <div className="button button-cust">
                                      <div className="translate"></div>
                                      <a>FIND ONE</a>
                                  </div>
                              </button>
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar;