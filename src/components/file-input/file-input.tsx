import React, { Fragment, useRef, useState } from 'react';
import Progress from '../common/progress';
import Button from '../common/button';

const FileInput = () => {
    const fileInput = useRef<HTMLInputElement | any>(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async () => {
        const file = fileInput?.current?.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await fetch('/api/check', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <Fragment>
            {loading && <Progress />}
            <input type="file" ref={fileInput} />
            <Button className="bg-gray-800 block w-40 p-2 rounded text-white" onClick={handleFileUpload}>Upload</Button>
        </Fragment>
    )
}

export default FileInput;