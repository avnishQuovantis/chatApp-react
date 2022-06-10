import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function useUrlPath() {
    const [urlPath, setUrlPath] = useState("")
    const location = useLocation()
    useEffect(() => {
        console.log('url path is', location.pathname);
    }, [location])
    return [urlPath, setUrlPath]
}

export default useUrlPath