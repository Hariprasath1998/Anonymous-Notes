import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteForm } from '../../actions/form';
import auth from '../../reducers/auth';
import form from '../../reducers/form';

import FormList from './FormList';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
const Dashboard = ({
    deleteForm,
    getCurrentProfile,
    auth : { user },
    form : { form, loading }
}) => {
        useEffect(() => {
            getCurrentProfile()
        },[]);
    return (loading === true ) || form === null ?  (<Spinner />) : 
    (   
        <Fragment >
        <h1>User ID: {user && capitalize(user.userid)}</h1>
        <h2>Your Forms</h2>
        <FormList form={form} />        
        </Fragment>
        );

}

Dashboard.propTypes = {
    getCurrentProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    form: propTypes.object.isRequired

}

const mapStateToProps = state => ({
    auth: state.auth,
    form: state.form,
    user: state.user
})


export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

