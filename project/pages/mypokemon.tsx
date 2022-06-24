import Head from 'next/head';
import React, { useContext } from 'react'
import CardBoxPokemon from '../comps/cards/CardBoxPokemon';

import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { PokemonContext } from '../context/Pokemon';

const mypokemon = () => {
  const { state, setPokemon } : any = useContext(PokemonContext);

  const MySwal = withReactContent(Swal);

  function deletePokemon(pokeName : any){
      const pokemons = state;
      let newPokemons : any = []
      Object.keys(pokemons).map((index:any) => {
        if(pokemons[index].name !== pokeName){
          newPokemons = [...newPokemons, pokemons[index]];
        }
      })
      setPokemon(newPokemons);
  }

  function removePokemon(poke : any){
      MySwal.fire({
          title: <span className="text-gray-200">RELEASE</span>,
          icon: 'error',
          html: <span className="text-md text-gray-400">Remove `{poke.nickname}` from the list?</span>,
          footer: <small className="text-gray-200">* This will be deleted from Pokemon List!</small>,
          showCancelButton: true,
          confirmButtonText: <span><Icon className="inline-block" icon="ant-design:check-outlined" /> Confirm</span>,
          cancelButtonText: <span><Icon className="inline-block" icon="fa-solid:times" /> Cancel</span>,
          confirmButtonColor: '#9e1000',
          cancelButtonColor: '#008022',
          showLoaderOnConfirm: true,
          preConfirm: () => {
              return true;
          },allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
          if(result.isConfirmed){
              deletePokemon(poke.name);
              Swal.fire(
                  '<span class="text-gray-200">Success!</span>',
                  `<span class="text-gray-300">${poke.nickname} has been removed!</span>`,
                  'success'
              )
          }
      })
  }

  return (
    <>
      <Head>
        <title>Pokémon List</title>
      </Head>
      <h1 className="font-medium text-amber-300 mb-5">Captured Pokémon</h1>
      { Object.keys(state).length>0
        ? <CardBoxPokemon
            pokemons={state}
            owned={Object.keys(state).length ? Object.keys(state).length : 0}
            delete={true}
            removePokemon={removePokemon}
          />
        : <>
          <span className="text-gray-200">Please catch at least 1 Pokemon</span>
        </> }
    </>
  )
}

export default mypokemon