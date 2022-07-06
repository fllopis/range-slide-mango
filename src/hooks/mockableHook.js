import { useState, useEffect } from "react";

//Function to obtain the min-max value from mockable.
const fetchMockableUri = (url, method) => {
    
    const [data, setData] = useState([]);

    useEffect( () => {
        fetch(url + method)
        .then((response) => response.json())
        .then((responseJson) => {
            setData(responseJson);
        });
    }, []);

    return data;
}

export default fetchMockableUri;