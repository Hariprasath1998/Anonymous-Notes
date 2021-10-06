import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        login(userid.trim(), password.trim());
    }

    const [ formData, setFormData] = useState({
        userid: '',
        password: ''
    });

    const { userid, password } = formData;

    // Redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
        <h1 className="large">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit= {e => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="User ID" name="userid" onChange={e => onChange(e)} value={userid} required />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              onChange={e => onChange(e)} value={password} required 
            />
          </div>
          
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        </Fragment>
    )
}

Login.propTypes = {
  login : propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect( mapStateToProps, {login})(Login);