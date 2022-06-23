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
    // let newPokemons : any = pokemons.concat(pokemonsSlice);
    let newPokemons : any [] = [...pokemons, ...pokemonsSlice];
    setPokemons(newPokemons);
    console.log(newPokemons);
  }
   
  useEffect(() => {
    showDataPokemons();
  }, []);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      showDataPokemons()
    }, 1000);
  };

  return (
    <>
      <InfiniteScroll
          dataLength={pokemons.length}
          next={fetchMoreData}
          hasMore={true}
          loader={pokemons.length<data.count ? <Loading /> : <></>}
        >
        <div className="w-full bg-gray-200 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
          {pokemons.map((item:any, index:any) => {
              let pokeCode = item.url.replace('https://pokeapi.co/api/v2/pokemon/','');
              pokeCode = pokeCode.replace('/', '');
              return <Link
                   key={index}
                   href={`/pokedex?pokename=${item.name}`}>
                      <div className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 hover:text-gray-200 rounded duration-300">
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeCode}.png`}
                          width="100"
                          height="100"
                          layout="responsive"
                        />
                        <p className="capitalize">{item.name}</p>
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
