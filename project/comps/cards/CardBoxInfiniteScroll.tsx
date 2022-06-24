import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../Loading';
import CardBoxPokemon from './CardBoxPokemon';


const BoxPokemon = (props:any) => {
    let [ pokemons, setPokemons ] : any = useState([]);

    function showDataPokemons(){
        const allPokemons = props.data;
        let pokemonsSlice : any[] = allPokemons.slice(pokemons.length, pokemons.length+96);
        let newPokemons : any [] = [...pokemons, ...pokemonsSlice];
        setPokemons(newPokemons);
    }
       
    useEffect(() => {
        showDataPokemons();
    }, []);

    const fetchMoreData = () => {
        setTimeout(() => {
            showDataPokemons()
        }, 1000);
    };

    interface InfiniteScrollFix extends React.Component {}
    
    const InfiniteSc:any = (InfiniteScroll as any) as {
        new(): InfiniteScrollFix;
    };
    return (
        <div className="w-full">
            <InfiniteSc
                dataLength={pokemons.length}
                next= {fetchMoreData}
                hasMore= {true}
                loader= {pokemons.length<props.data.count ? <Loading /> : <></>}
                >
                <CardBoxPokemon
                    owned={props.owned}
                    pokemons={pokemons} setPokemons={setPokemons}
                    allPokemons={props.data.count !== undefined ? props.data.count : props.data.length}
                />
            </InfiniteSc>
        </div>
    )
}

export default BoxPokemon