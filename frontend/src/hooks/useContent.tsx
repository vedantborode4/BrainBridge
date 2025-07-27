import axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "../App";

export function useContent () {
    const [contents, setContents] = useState([]);

    function refresh () {
        axios.get(`${BackendURL}/api/v1/content`, 
        {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }
        ).then( (response) =>  {
            setContents(response.data.content)
        }).catch ( (error) => {
            console.log("Error while gettinng content", error)
        })
    }

    useEffect( () => {

        refresh()
        let interval = setInterval(() =>  {
            refresh()
        }, 10*1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return {contents, refresh};
}