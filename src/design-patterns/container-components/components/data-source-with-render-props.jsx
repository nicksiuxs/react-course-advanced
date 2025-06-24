import React, { useState, useEffect } from 'react'

const DataSourceWithRenderProps = ({ getData = () => { }, render }) => {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getData();
            setResource(data);
        })();
    }, [getData]);
    return (
        render(resource)
    )
}

export default DataSourceWithRenderProps;