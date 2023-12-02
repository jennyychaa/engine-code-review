'use client'

import { FormEvent, useEffect, useState } from "react"

import { useArtworkApi } from "../../hooks/useArtworkApi"
import Results from "../Results"

const Search = () => {
    const [search, setSearch] = useState<string>('');

    const { artwork, error, isLoading, searchArtwork } = useArtworkApi();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchArtwork(search);
    };

    useEffect(() => {
        searchArtwork('');
    }, []);

    return (
        <div style={{ padding: '2em' }}>
            <form role="search" onSubmit={handleFormSubmit} style={{ marginBottom: '1em' }}>
                <input
                    aria-label="Search artwork by name"
                    type="search"
                    id="search"
                    name="search"
                    onChange={e => setSearch(e.currentTarget.value)}
                    value={search || ""}
                />
                <button type='submit' onClick={() => searchArtwork(search)}>Search</button>
            </form>
            {error && <p>{ error }</p>}
            {isLoading
                ? <p>Loading ...</p>
                : artwork.length > 0
                    ? <Results data={artwork} />
                    : <p>No results.</p>
            }
        </div>
    )
}

export default Search

