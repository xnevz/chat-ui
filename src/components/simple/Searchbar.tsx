import React from 'react';
import { Search } from '../../images/search';

export default function Searchbar({ placeholder }: { placeholder: string }) {
    return (
        <label htmlFor='mSearch' className="search-container">
            <Search />
            <input id='mSearch' type="text" placeholder={placeholder} />
        </label>
    )
}
