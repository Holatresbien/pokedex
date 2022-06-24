import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import CardBoxPokemon from '../comps/cards/CardBoxPokemon';
import Loading from '../comps/Loading';

import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mypokemon = () => {
  let [myPokemon, setMyPokemon] : any = useState([]);

  useEffect(() => {
    const listPokemon : any = localStorage.getItem('myPokemon');
    setMyPokemon(JSON.parse(listPokemon));
  }, [])

  const MySwal = withReactContent(Swal);

  function deletePokemon(pokeName : any){
      const pokemons = myPokemon;
      const idx : any = pokemons.findIndex((p:any) => p.name === pokeName);
      if(pokemons.length > 0 && idx >= 0){
          pokemons.splice(idx, 1);
      }
      setMyPokemon(pokemons);
      localStorage.setItem('myPokemon', JSON.stringify(pokemons));
  }

  function removePokemon(poke : any){
      setMyPokemon([]);
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
          }else{
            setMyPokemon(myPokemon);
          }
      })
  }

  return (
    <>
      <Head>
        <title>Pokémon List</title>
      </Head>
      { myPokemon.length>0
        ? <CardBoxPokemon
            pokemons={myPokemon}
            allPokemons={myPokemon.length}
            delete={true}
            removePokemon={removePokemon}
          />
        : <Loading/> }
    </>
  )
}

export default mypokemon