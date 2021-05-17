import React from 'react';

const FileUpload = () => {

    const fileUploadAndResize = (e) => {
        //console.log(e.target.files);
        //resize
        //send back to server to upload to clouidinary
        //set url to images[]
    };

    return (
        <div className="row">
            <label className="btn btn-primary btn-raised"> 
                Choose file 

                <input 
                    type="file" 
                    multiple 
                    hidden 
                    accept="images/*" 
                    onChange={fileUploadAndResize} 
                />
            </label>
            
        </div>
    )};

export default FileUpload;