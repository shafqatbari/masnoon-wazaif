import React from 'react';
import AdminDashboardServiceComponent from '../services/index.services.js';
import AdminDashboardComponent from '../components/index.js';
class AdminDashboard extends React.Component {
    //Seperate Component for Business Logic and UI
    render() {
        return (
            <AdminDashboardServiceComponent {...this.props}>
                {
                    props => (
                        <AdminDashboardComponent
                            {...props}
                        />
                    )
                }
            </AdminDashboardServiceComponent>
        );
    };
}
export default AdminDashboard;