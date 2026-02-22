import { useState } from "react";
import { data } from "react-router";

export const client_id = '4exzgvtnuxt3t60heervsbl3gntfve';
const client_secret = 'pj0jqfixlwbyrvpcwdos0bnt5705vw';

export const auth = async () => {
    const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`, {
        method: 'POST'
    })

    const data = await res.json()

    console.log(data.access_token)
    localStorage.setItem('access_token', data.access_token)
    return data
}

export default function Authorization() {
    
}