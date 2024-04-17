import React from 'react'
import Context from './Context'

export const State = (props) => {
    const BASE_URL = 'http://localhost:4001'
    return (
        <Context.Provider value={{ BASE_URL }}>
            {props.children}
        </Context.Provider>
    )
}
