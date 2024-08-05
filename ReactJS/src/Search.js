import React, { useState } from 'react';

function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={query} 
                onChange={handleChange} 
                placeholder="Tìm kiếm sản phẩm..." 
                className="form-control"
            />
        </div>
    );
}

export default Search;
