import React, { useState, useEffect } from 'react'
import { Search as SearchSU, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { size } from 'lodash'
import { useQuery } from '@apollo/client'
import { SEARCH_USER } from '../../../gql/user'
import ImageNotFound from "../../../assets/png/avatar.png"
import './Search.scss'


export default function Search() {

    const [search, setSearch] = useState(null)
    const [results, setResults] = useState([])

    const { data, loading } = useQuery(SEARCH_USER, {
        variables:{ search }
    })

    const onChange = (e) => {
        if (e.target.value) setSearch(e.target.value)
    }

    useEffect(() => {
        if (size(data?.search)>0) {
            const users = []
            data.search.forEach( (user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                })
            })
            setResults(users)
        }else {
            setResults([])
        }
    }, [data])

    const handleResultSelect = () => {
        setSearch(null)
        setResults([])
    }

    return (
        <SearchSU
            className="search-users"
            fluid
            input={{icon: "search", iconPosition: "left"}}
            loading={loading}
            value={search || "" }
            onSearchChange={onChange}
            results={results}
            resultRenderer={(e)=><ResultSearch data={e}/>}
            onResultSelect={handleResultSelect}
        />
    )
}

function ResultSearch({ data }) {
    const {
        avatar,
        title, 
        username, 
    } = data

    return (
        <Link className="search-users__item" to={`/${username}`}>
            <Image src={avatar || ImageNotFound}/>
            <div>
                <p>{title}</p>
                <p>{username}</p>
            </div>
        </Link>
    )
}
