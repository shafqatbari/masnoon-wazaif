import React from 'react';
import UploadFileServiceComponent from '../services/index.services.js';
import UploadFileComponent from '../components/index.js';
class UploadFile extends React.Component {
    //Seperate Component for Business Logic and UI
    render() {
        return (
            <UploadFileServiceComponent {...this.props}>
                {
                    props => (
                        <UploadFileComponent
                            {...props}
                        />
                    )
                }
            </UploadFileServiceComponent>
        );
    };
}
export default UploadFile;