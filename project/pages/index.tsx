import Head from 'next/head';
import React, { useContext } from 'react'
import CardBoxInfiniteScroll from '../comps/cards/CardBoxInfiniteScroll';

import { PokemonContext } from '../context/Pokemon';

const index = ({data} : {data:any}) => {
  const { state } : any = useContext(PokemonContext);

  return (
    <>
      <Head>
        <title>Pokémon List</title>
      </Head>
      <h1 className="font-medium text-amber-300 mb-5">All - Pokémon List</h1>
      <CardBoxInfiniteScroll data={data.results} owned={Object.keys(state).length ? Object.keys(state).length : 0} />
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
