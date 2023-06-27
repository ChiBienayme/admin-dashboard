import React, { useState, useRef, useEffect } from 'react';
import './Search.scss';

const Search = ({ onSearch, onClear }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            onClear();
        }
    };

    // return all datas if input is empty
    useEffect(() => {
        if (searchTerm === '') {
            onSearch('');
        }
    }, [searchTerm, onSearch]);

    const handleSearch = async (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        onClear();
    };

    return (
        <section className="search">
            <form className="search_form" onSubmit={handleSearch}>
                <div className="search_form_item">
                    <div className="input-container">
                        <input
                            className="input input-lg"
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        {searchTerm && (
                            <button className="btn-X" onClick={handleClear}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        fill="currentColor"
                                        d="M18.3 19.71L13.58 15l4.71-4.71a1 1 0 1 0-1.42-1.42L12.17 13 7.46 8.29a1 1 0 0 0-1.42 1.42L10.77 15 6.06 19.71a1 1 0 0 0 1.42 1.42L12 16.42l4.71 4.71a1 1 0 0 0 1.42-1.42z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <button className="btn btn_search" type="submit">
                        Search
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Search;
