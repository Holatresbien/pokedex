import Image from 'next/image';
import Head from 'next/head';
import React, { useContext } from 'react';

import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PokemonContext } from '../context/Pokemon';

const pokedex = ({data} : {data:any}) => {
  const MySwal = withReactContent(Swal);
  const imgType:any = [
    {
      type:`normal`,
      icon: "✶",
    },
    {
      type:`fighting`,
      icon: "🥊",
    },
    {
      type:`flying`,
      icon: "🪶",
    },
    {
      type:`poison`,
      icon: "💀",
    },
    {
      type:`ground`,
      icon: "🌍",
    },
    {
      type:`rock`,
      icon: "🪨",
    },
    {
      type:`bug`,
      icon: "🐛",
    },
    {
      type:`ghost`,
      icon: "👻",
    },
    {
      type:`steel`,
      icon: "🪨",
    },
    {
      type:`fire`,
      icon: "🔥",
    },
    {
      type:`water`,
      icon: "🌊",
    },
    {
      type:`grass`,
      icon: "🌲",
    },
    {
      type:`electric`,
      icon: "⚡",
    },
    {
      type:`psychic`,
      icon: "🌀",
    },
    {
      type:`ice`,
      icon: "🧊",
    },

    {
      type:`dragon`,
      icon: "🐉",
    },
    {
      type:`dark`,
      icon: "🌑",
    },
    {
      type:`fairy`,
      icon: "🧚",
    },
    {
      type:`unknown`,
      icon: "⍼",
    },
    {
      type:`shadow`,
      icon: "🕶",
    }
  ]

  const { state, setPokemon } : any = useContext(PokemonContext);

  function saveNickname(dataNickname:any){
    const dataPokemon : any = {
      name : data.name,
      url : `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
      nickname: dataNickname
    }
    let newPokemons : any = [];
    let isFound : any = 0;
    Object.keys(state).map((index:any) => {
      let newState = state[index];
      if(state[index].name === data.name){
        newState = dataPokemon;
        isFound++;
      }
      newPokemons = [...newPokemons, newState];
    })
    if(!isFound){
      newPokemons = [...newPokemons, dataPokemon];
    }
    setPokemon(newPokemons);
  }

  const saveButton : any = <button
    className="text-xs text-gray-200 font-bold float-right -mt-4 mr-5 bg-green-700 p-2 border border-green-300 animate-bounce"
    onClick={() => {
      let timerInterval : any;
      let dataNickname : any;
      MySwal.fire({
        title: <span className="text-amber-200">CATCHING...</span>,
        html: <span className="text-gray-200">Catch in <b></b> milliseconds.</span>,
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          let b:any = Swal.getHtmlContainer()!.querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()?.toString()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then(() => {
        /* Read more about handling dismissals below */
        MySwal.fire({
          title: '',
          html: <div className="w-full">
                  <div className="w-full p-3">
                      <h2 className="text-left text-lg font-medium text-gray-400 uppercase">
                        GOT <span className="text-amber-300">{data.name} </span> - SAVE TO LIST ?
                      </h2>
                  </div>
                  <div className="px-3 grid grid-cols-5 py-2">
                      <div className="text-gray-200">
                          <span className="text-sm float-right pt-3 pr-2">* Nick</span>
                      </div>
                      <div className="text-sm px-2 py-1 col-span-4">
                          <Icon className="absolute float-left mt-3 ml-3" icon="entypo:info-with-circle" />
                          <input
                              type="text"
                              className="text-sm bg-gray-800 text-gray-200 placeholder-gray-500 pl-10 pr-4 rounded border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                              placeholder="Fill nickname for your pokemon"
                              autoComplete="off"
                              onChange={e => {
                                dataNickname = e.target.value;
                              }}
                          />
                      </div>
                  </div>
              </div>,
            footer: <small className="text-gray-200">* This will be sent to My Pokemon List!</small>,
            showCancelButton: true,
            confirmButtonText: <span><Icon className="inline-block" icon="ant-design:check-outlined" /> Confirm</span>,
            cancelButtonText: <span><Icon className="inline-block" icon="fa-solid:times" /> Cancel</span>,
            confirmButtonColor: '#008022',
            cancelButtonColor: '#9e1000',
            showLoaderOnConfirm: true,
        preConfirm: () => {
          return true;
        },allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if(result.isConfirmed){
            saveNickname(dataNickname);
            Swal.fire(
                '<span class="text-gray-200">Success!</span>',
                '<span class="text-gray-300">Pokemon has been added!</span>',
                'success'
            )
          }
        })
      })
  }}>
    
    { Object.keys(state).findIndex((index:any) => state[index].name === data.name) < 0
    ? <>
      <Icon className="text-gray-200 float-left mr-1 mt-0.5" icon="tabler:pokeball" /> CATCH
    </>
    : <>
      <Icon className="text-amber-200 float-left mr-1 mt-0.5" icon="ic:baseline-catching-pokemon" /> <i className="text-amber-200">RE-CATCH</i>
    </>}
  </button>

  return (
    <>
      <Head>
        <title>Pokémon - {data.name}</title>
      </Head>
      <h1 className="font-medium text-amber-300">Detail Pokémon - <b className="capitalize">{data.name}</b></h1>
      <div className="w-full">
        <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              {/* Image wrapper */}
              <div className="w-full flex justify-center">
                <div className="relative">
                  <div
                    className="bg-black rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]">
                    <Image
                      src={data.sprites.other.dream_world.front_default}
                      width="150"
                      height="150"
                      layout="fixed"
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
              {/* Button Catch */}
              <div className="w-full absolute">
                {saveButton}
              </div>
              {/* Status HP, Attack, Defense */}
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div className="flex-1 p-3 text-center">
                    <small className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {data.stats[0].base_stat}
                    </small>
                    <small className="text-sm text-slate-400">HP</small>
                  </div>
                  <div className="flex-1 p-3 text-center">
                    <small className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {data.stats[1].base_stat}
                    </small>
                    <small className="text-sm text-slate-400">Attack</small>
                  </div>
                  <div className="flex-1 p-3 text-center">
                    <small className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                      {data.stats[2].base_stat}
                    </small>
                    <small className="text-sm text-slate-400">Defense</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              {/* Pokemon Name */}
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1 capitalize">
                {data.name}
              </h3>
              {/* Pokemon Type */}
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase space-x-2">
                {
                  data.types.map((itemTypes:any, index:any) => {
                    let elementName = itemTypes.type.name;
                    let elementIcon = imgType.find((x:any) => x.type === elementName).icon;
                    return <b key={'types'+index}>
                      {elementIcon}
                      <small className="ml-1">{elementName}</small>
                    </b>
                  })
                }
              </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:px-4">
                  {/* Pokemon Moves */}
                  <p className="font-light leading-relaxed text-slate-600 mb-4 space-x-1">
                    {
                      data.moves.map((itemMoves:any, index:any) => {
                        return <small
                          className="break-all text-xs bg-amber-800 text-gray-200 px-2 py-1 rounded-sm"
                          key={'moves'+index}>
                          {itemMoves.move.name}
                        </small>
                      })
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({query} : {query:any}) {
  let pokename = query.pokename ? query.pokename : 'ditto';
  // Fetch data from external API
  const url = process.env.APP_POKE_URL!==undefined ? process.env.APP_POKE_URL+'/'+pokename : ''
  const res = await fetch(url)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}

export default pokedex