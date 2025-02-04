import {useEffect, useState} from 'react';

import './Main.css';

const PAGE_SIZE = 20;

const genFetchData = async (searchTerm) => {
    const API_AUTH_KEY = 'Ugb5ctrsKDB0NoK9iAqLrh5yszy9PXlt';

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_AUTH_KEY}&q=${searchTerm}&limit=${PAGE_SIZE}`;
    const res = await fetch(url);
    const json = await res.json();

    console.log(json)
    return json;
}

function Main() {
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGifsData = async () => {
            try {
                const {data, pagination} = await genFetchData(searchTerm);

                setGifs(data);
            } catch(err) {
                // TODO: handle error
                alert(err.message);
            }
        };

        fetchGifsData();
    }, [searchTerm])

    return (
        <main>
            <Search 
                val={searchTerm}
                setVal={setSearchTerm}
            />
            <GifsGrid data={gifs} />
        </main>
    )
}

export default Main;

function Search({ val, setVal }) {
    return (
        <section id="search-area">
            <input
                type="search"
                className="search"
                placeholder="Search gifs here"
                autoCorrect='false'
                autoComplete='false'
                value={val}
                onInput={(event) => {
                    setVal(event?.target?.value)
                }}
            />
        </section>
    )
}

function GifsGrid({ data }) {
    return (
        <section id="gifs-grid" className="gifs-grid">
            {data.map(item => {
                return (
                    <img
                        src={item.images.fixed_width_small.webp}
                        alt={item.alt_text}
                        class="gifs-grid__item"
                    />
                )
            })}
        </section>    
    )
}