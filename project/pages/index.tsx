import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardBoxInfiniteScroll from '../comps/cards/CardBoxInfiniteScroll';

const index = ({data} : {data:any}) => {
  let [myPokemon, setMyPokemon] : any = useState([]);

  useEffect(() => {
    const listPokemon : any = localStorage.getItem('myPokemon');
    setMyPokemon(JSON.parse(listPokemon));
  }, [])

  return (
    <>
      <Head>
        <title>Pokémon List</title>
      </Head>
      <CardBoxInfiniteScroll data={data.results} owned={myPokemon.length} />
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
