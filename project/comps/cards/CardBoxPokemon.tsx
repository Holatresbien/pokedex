import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@iconify/react';


const CardBoxPokemon = (props:any) => {
    return (
        <div className="w-full">
            <div className="w-full place-content-center grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
                <div className="border-t border-b border-gray-600 bg-gray-900 rounded-lg">
                    <div className="">
                        <small className="float-left p-1 bg-gray-600 text-gray-200 rounded-tl-lg rounded-br-lg">#Pokemon</small>
                    </div>
                    <div className="text-sm capitalize text-amber-400 p-3 pt-10 space-y-2">
                        <div>&nbsp;<span className="float-left">OWNED</span><span className="float-right text-amber-200">{props.owned}</span></div>
                        {props.allPokemons !== undefined && <div>&nbsp;<span className="float-left">ALL<Icon className="float-left mt-0.5 mr-2" icon="ic:twotone-catching-pokemon" /></span><span className="float-right text-amber-200">{props.allPokemons}</span></div>}
                    </div>
                </div>
                {Object.keys(props.pokemons).map((index:any) => {
                    const item = props.pokemons[index];
                    let pokeCode = item.url.replace('https://pokeapi.co/api/v2/pokemon/','');
                    pokeCode = pokeCode.replace('/', '');
                    return <Link
                        key={index}
                        href={`pokedex?pokename=${item.name}`}>
                        <div className="border-t border-b border-gray-600 rounded-lg">
                            <div className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 rounded duration-300">
                                <small className="float-left p-1 bg-gray-600 text-gray-200 rounded-tl-lg rounded-br-lg">#{pokeCode}</small>
                                { props.delete && <button
                                    className="float-right p-1 rounded-lg animate-pulse"
                                    onClick={ (e) => {
                                        e.stopPropagation();
                                        props.removePokemon(item);
                                    } }>
                                    <Icon className="text-2xl text-gray-200" icon="fa-solid:times-circle" />
                                </button>}
                                <Image
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeCode}.png`}
                                    width="100"
                                    height="100"
                                    layout="responsive"
                                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                                />
                                <p className="capitalize text-amber-200">{item.name}</p>
                                { item.nickname && <small className="text-xs capitalize text-amber-400">#{item.nickname}</small>}
                            </div>
                        </div>
                    </Link>
                })}
            </div>
            <div className="text-xs float-right text-gray-200">
                Showing Pokemons: <b className="text-amber-300">{Object.keys(props.pokemons).length}</b>{props.allPokemons && `/ ${props.allPokemons}`}
            </div>
        </div>
    )
}

export default CardBoxPokemon