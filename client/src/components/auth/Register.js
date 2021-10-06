import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import propTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        if(password.trim() !== password2.trim()){
            setAlert('Passwords do not match', 'danger');
        }else{

            register({ userid: userid.trim(), password: password.trim()})
        }
    }

    const [ formData, setFormData] = useState({
        userid : '',
        password: '',
        password2: ''
    });

    const { userid, password, password2 } = formData;

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
        <h1 className="large">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit= {e => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="User ID" name="userid" onChange={e => onChange(e)} value={userid} />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              
              onChange={e => onChange(e)} value={password} 
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={e => onChange(e)} value={password2} 
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        </Fragment>
    )
}

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, {setAlert, register})(Register);