import React, { useState } from 'react';

const SearchSubmit = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Đã gửi yêu cầu tìm kiếm:', searchTerm);
        setSearchTerm(''); // Đặt lại giá trị trường tìm kiếm sau khi gửi yêu cầu
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    return (
        <form onSubmit={handleSubmit} >
            <div style={{flexDirection:'row' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder= {props.placeholder}
                />
            </div>
        </form>
    );
};

export default SearchSubmit;
