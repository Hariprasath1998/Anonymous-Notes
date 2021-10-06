import React,{useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/form';
import auth from '../../reducers/auth';
import form from '../../reducers/form';
import SubmitResponse from './SubmitResponse';


const ListItem = ({ response }) => {

  return <li className="list-group-item px-2 p-2 ">{response}</li>
}

const Response = ( { match, auth:{user, isAuthenticated}, form:{form, loading}, getCurrentProfile} ) => {
  {
    useEffect(() => {
        getCurrentProfile()
    },[]);
  }
  const id = match.params.id;
  console.log(id)
    if(isAuthenticated){
        const currentForm = form.find((x)=> x._id === id)
        const {question, responses} = currentForm
        console.log(responses)
        responses.map((response, index) => console.log(response))

        return (
          <div>
            <h1>{question}</h1>
            {responses.map((response, index) => 
              <ListItem
                  key={index}
                  response = {response.text}
              />    
          )}
            <ul className="list-group">
            
            </ul>
          </div>
        )  
          
          
    }else{
        return (
          <div>
          <SubmitResponse id={id}/>  
          </div>
          )
    }

}
SubmitResponse.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  form: propTypes.object.isRequired
  }
  
  const mapStateToProps = (state, props) => ({
    auth: state.auth,
    form: state.form,
    user: state.user
  })
  
export default connect( mapStateToProps, { getCurrentProfile })(Response);

// export default SubmitResponse;