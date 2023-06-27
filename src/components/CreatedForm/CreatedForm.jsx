import React from 'react';
import { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import { useLocalStorage } from 'hooks';

import './CreatedForm.scss';
import CardUser from '../Cards/CardUser';
import Search from '../Search';

const USERS_API = import.meta.env.VITE_API_ENDPOINT;

function CreatedForm() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditName] = useState(name);
    const [editCountry, setEditCountry] = useState(country);
    const [editYear, setEditYear] = useState(year);

    const [list, setList] = useLocalStorage('list', []);

    const inputRef = useRef();

    // read cards
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(USERS_API);
                const data = await response.json();
                console.log('data', data);
                setList(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    //add card
    function handleAdd(e) {
        e.preventDefault();

        if (name !== '' && country !== '' && year !== '') {
            const newUser = {
                id: uuid(),
                name,
                country,
                year,
                role: isAdmin ? 'Admin' : 'User',
            };

            const newList = [newUser, ...list];
            setList(newList);

            setName('');
            setCountry('');
            setYear('');
            setIsAdmin(false);

            inputRef.current.focus();
        }
    }

    function handleDelete(id) {
        const newList = list.filter((user) => user.id !== id);
        setList(newList);
    }

    function handleEdit(index) {
        const item = list[index];
        setIsEditing(item.id);
        setEditName(item.name);
        setEditCountry(item.country);
        setEditYear(item.year);
    }

    function handleSave(e, index) {
        e.preventDefault();

        const newList = list.map((item, i) =>
            i === index ? { ...item, name: editName, country: editCountry, year: editYear } : item,
        );

        setList(newList);
        setIsEditing(null);
    }

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const filteredUsers = list.filter((user) =>
                Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            );
            setList(filteredUsers);
        }
    };

    const handleClearSearch = async () => {
        try {
            const response = await fetch(USERS_API);
            const data = await response.json();
            setList(data);
        } catch (error) {
            console.error('Error clearing search:', error);
        }
    };

    return (
        <section className="created_form">
            <h1 className="title">Admin dasboard</h1>
            <p className="text-center">Managent all users</p>
            {/* Form */}
            <form className="form_control" method="POST">
                <div className="form_item">
                    <input
                        className="input input-lg"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        ref={inputRef}
                    />
                </div>
                <div className="form_item">
                    <input
                        className="input input-lg"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                </div>
                <div className="form_item">
                    <input
                        className="input input-lg"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Year"
                    />
                </div>
                <div className="form_item">
                    <label className="input_checkbox flex gap-4 items-center">
                        <input
                            className="is-admin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <svg viewBox="0 0 64 64" height="1em" width="1em">
                            <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                className="path"
                            ></path>
                        </svg>
                        Is an admin ?
                    </label>
                </div>

                <div className="form_item">
                    <button
                        className="btn btn_submit"
                        name="submitBtn"
                        onClick={handleAdd}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAdd(e);
                            }
                        }}
                    >
                        ADD
                    </button>
                </div>
            </form>

            <Search onSearch={handleSearch} onClear={handleClearSearch} />

            {/* List */}
            <ul className="cards_list">
                {list.map((user, index) => (
                    <li key={user.id}>
                        {isEditing === user.id ? (
                            <div className="card">
                                <form onSubmit={(e) => handleSave(e, index)} className="form_card">
                                    <input
                                        className="input input-sm"
                                        name="name"
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                    <input
                                        className="input input-sm"
                                        name="country"
                                        type="text"
                                        value={editCountry}
                                        onChange={(e) => setEditCountry(e.target.value)}
                                    />
                                    <input
                                        className="input input-sm"
                                        name="year"
                                        type="text"
                                        value={editYear}
                                        onChange={(e) => setEditYear(e.target.value)}
                                    />

                                    <button type="submit" className="btn btn_submit-sm">
                                        Save
                                    </button>
                                    <button type="button" className="btn btn_cancel" onClick={() => setIsEditing(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <CardUser
                                    id={user.id}
                                    name={user.name}
                                    country={user.country}
                                    year={user.year}
                                    role={user.role}
                                    handleDelete={handleDelete}
                                    handleEdit={() => handleEdit(index)}
                                />
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default CreatedForm;
