import React from 'react'

const pokedex = ({data}) => {
  // console.log(data)
  return (
    <div>pokedex</div>
  )
}

export async function getServerSideProps({context}) {
  console.log(context.query);
  // Fetch data from external API
  const url = process.env.APP_POKE_URL!==undefined ? process.env.APP_POKE_URL : ''
  const res = await fetch(url)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

export default pokedex