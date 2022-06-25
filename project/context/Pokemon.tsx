import { createContext, useEffect, useReducer } from "react";

export const PokemonContext : any = createContext([]);

const initialState:any = [];

const reducer = (state:any, action:any) => {
    switch(action.type){
        case 'SET_POKEMON' :
            return { ...action.payload };
        default:
            throw new Error(`Unknown action ${action.type}`);
    }
}

const PokemonContextProvider = ({children} : {children: any}) => {
    const [ state, dispatch ] : any = useReducer(reducer, initialState);

    useEffect(() => {
        getPokemon()
    }, [])

    const setPokemon = (payload:any) => {
        dispatch( {type: 'SET_POKEMON', payload} )
        localStorage.setItem('myPokemon', JSON.stringify(payload));
    }
    const getPokemon = async () => {
        const pokemon = await localStorage.getItem('myPokemon');
        setPokemon(pokemon ? JSON.parse(pokemon) : []);
    };

    return (
        <PokemonContext.Provider value={{state, setPokemon}}>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonContextProvider;