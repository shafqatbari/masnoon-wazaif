import React from 'react';
import HomeServiceComponent from '../services/index.services.js';
import HomeComponent from '../components/index.js';
class Home extends React.Component {
    //Seperate Component for Business Logic and UI
    render() {
        return (
            <HomeServiceComponent {...this.props}>
                {
                    props => (
                        <HomeComponent
                            {...props}
                        />
                    )
                }
            </HomeServiceComponent>
        );
    };
}
export default Home;