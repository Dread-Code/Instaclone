import React from 'react'
import { Image } from 'semantic-ui-react'
import { size, map } from 'lodash'
import { useHistory } from 'react-router-dom'
import ImageNotFound from '../../../assets/png/avatar.png'

import './UsersList.scss'

export default function UsersList({ users, setShowModal }) {

    const history = useHistory()

    const goToUsers = (username) => {
        setShowModal(false)
        history.push(`/${username}`)
    }

    return (
        <div className="users-list">
            { size(users) === 0 ?(
            <p className="users-list__not-users">No se han encontrado usuarios</p>
            ) : (
                map(users, (user, index) => (
                    <div key={ index } className="users-list__user"onClick={() => goToUsers(user.username)}  >
                        <Image src={user.avatar || ImageNotFound}  />
                        <div>
                            <p>{ user.name }</p>
                            <p>{ user.username }</p>
                        </div>
                    </div>
                ))
            )} 
        </div>
    )
}
