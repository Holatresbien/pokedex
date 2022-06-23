import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../comps/Loading';

const index = ({data} : {data:any}) => {
  const [ pokemons, setPokemons ] : any = useState([]);

  function showDataPokemons(){
    const allPokemons = data.results;
    let pokemonsSlice : any[] = allPokemons.slice(pokemons.length, pokemons.length+96);
    let newPokemons : any [] = [...pokemons, ...pokemonsSlice];
    setPokemons(newPokemons);
    console.log(newPokemons);
  }
   
  useEffect(() => {
    showDataPokemons();
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      showDataPokemons()
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Pokémon List</title>
      </Head>
      <InfiniteScroll
          dataLength={pokemons.length}
          next={fetchMoreData}
          hasMore={true}
          loader={pokemons.length<data.count ? <Loading /> : <></>}
        >
        <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 !space-x-1 !space-y-1">
          {pokemons.map((item:any, index:any) => {
              let pokeCode = item.url.replace('https://pokeapi.co/api/v2/pokemon/','');
              pokeCode = pokeCode.replace('/', '');
              return <Link
                key={index}
                href={`pokedex?pokename=${item.name}`}>
                  <div className="border border-gray-400">
                    <div className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-gray-700 hover:text-gray-200 rounded duration-300">
                      <small className="float-left p-1 bg-gray-600 text-gray-200 rounded-br-lg">#{pokeCode}</small>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeCode}.png`}
                        width="100"
                        height="100"
                        layout="responsive"
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                      />
                      <p className="capitalize text-amber-200">{item.name}</p>
                    </div>
                  </div>
              </Link>
          })}
          </div>
        <div className="text-xs float-right text-gray-200">Showing Pokemons: <b className="text-amber-300">{pokemons.length}</b> / {data.count}</div>
        </InfiniteScroll>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const url = process.env.APP_POKE_URL!==undefined ? process.env.APP_POKE_URL : ''
  const res = await fetch(url)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

export default index
