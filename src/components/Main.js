import {useEffect, useState} from 'react';

import './Main.css';

const PAGE_SIZE = 20;

const fetchData = async (searchTerm, page) => {
    const AUTH_KEY = 'Ugb5ctrsKDB0NoK9iAqLrh5yszy9PXlt';
    const offSet = page * PAGE_SIZE;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${AUTH_KEY}&q=${searchTerm}&limit=${PAGE_SIZE}&offset=${offSet}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
}

function Main() {

    const [gifs, setGifs] = useState([]);
    const [term, setTerm] = useState('');
    const [gifDetails, setGifDetails] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const genFetchGifsData = async () => {
            try {
                const {data, pagination} = await fetchData(term, page);
                setGifs(data);
                setTotalCount(pagination.total_count);
            } catch(err) {
                // TODO: handle error
                alert(err.message);
            }
        }

        genFetchGifsData();
    }, [term, page]);

    const onSelectGif = (item) => {
        setGifDetails(item);
    };

    if (gifDetails != null) {
        return (
            <GifDetails
                data={gifDetails}
                goBack={() => {
                    setGifDetails(null);
                }}
            />
        );
    }

    const isPrevPageEnabled = page > 0;
    const isNextPageEnabled = (page + 1) * PAGE_SIZE < totalCount;
    const totalPages = 
        Math.floor(totalCount / PAGE_SIZE) + 
        (totalCount % PAGE_SIZE === 0 ? 0 : 1);

    const prevpage = () => {
        if (!isPrevPageEnabled) {
            return;
        }
        setPage(val => val - 1);
    };

    const nextPage = () => {
        if (!isNextPageEnabled) {
            return;
        }
        setPage(val => val + 1);
    };

    return (
        <main>
            <Search val={term} setVal={setTerm} />
            <GifsGrid data={gifs} onSelectGif={onSelectGif} />
            <section className='pagination'>
                <button 
                    onClick={prevpage}
                    disabled={!isPrevPageEnabled}
                >
                    {'<<'}
                </button>
                <span>{`Page ${page + 1} of ${totalPages}`}</span>
                <button 
                    onClick={nextPage} 
                    disabled={!isNextPageEnabled}
                >
                    {'>>'}
                </button>
            </section>
        </main>
    )
}

export default Main;

function GifsGrid({ data, onSelectGif }) {
    return (
        <section className='gifs-grid'>
            {data.map((item) => {
                return (
                    <img
                        key={item.id}
                        className="gif-img"
                        src={item.images.fixed_width_small.webp}
                        alt={item.alt_text}
                        onClick={() => {
                            onSelectGif(item)
                        }}
                    />
                )
            })}
        </section>
    );
}

function Search({ val, setVal }) {
    return (
        <section>
            <input
                type='search'
                className='search-gifs'
                placeholder='Search here'
                autoComplete='false'
                autoCorrect='false'
                value={val}
                onInput={(event) => {
                    setVal(event?.target?.value)
                }}
            />
        </section>
    )
}

function GifDetails({ data, goBack }) {
    return (
        <section className='gif-details'>
            <h1>{data.title}</h1>
            <img
                src={data.images.fixed_width.webp}
                alt={data.alt_text}
            />
            <a href="data.images.fixed_width_small.webp">
                {data.images.fixed_width.webp}
            </a>
            <a 
                href="#"
                onClick={goBack}
            >
                Go back
            </a> 
        </section>
    )
}