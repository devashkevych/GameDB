import { Link } from "react-router-dom";
import { useState } from "react";
import { client_id } from "../Authorization/Authorization";


export const top10 = async () => {
    const access_token = localStorage.getItem('access_token')

    const res = await fetch(`https://api.igdb.com/v4/games`, {
        method: 'POST', 
        headers: {
            'Client-ID': `${client_id}`,
            'Authorization': `Bearer ${access_token}`,
        },
        body: 'fields name; limit 10'
    })

    const data = await res.json()
    console.log(data)

    return data 
} 

export default  function TopG() {
    return (
        <div>
            <h1>TopG</h1>
            <Link to='/'>Back</Link>
        </div>
    )
}
