import React, { useEffect } from 'react'
import FormItem from './FormItem';
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteForm, addForm } from '../../actions/form';
import Spinner from '../layout/Spinner';
const FormList = ({
    addForm,
    deleteForm,
    getCurrentProfile,
    auth : { user },
    form : { form, loading }
}) => {
    useEffect(() => {
        getCurrentProfile()
    },[]);


    const onSubmit = (e) => {
        e.preventDefault(e);
        const question = document.getElementById('question').value;
        addForm(question);
        document.getElementById('question').value = '';
        
    }
    return (loading === true ) || form === null ?  (<Spinner />) : 
    
    (
        <div>
        <ul className="list-group">
        {form.map((formItem) => 
            <FormItem
                deleteForm={deleteForm}
                key={formItem._id}
                formID={formItem._id}
                question = {formItem.question}
            />    
        )}
        </ul>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input id='question' placeholder="New Form" className="form-control"></input>
            </div>

            <input type="submit" className="btn btn-primary" value="Add Form" />
        </form>
        </div>
    )
}

FormList.propTypes = {
    addForm: propTypes.func.isRequired,
    deleteForm: propTypes.func.isRequired,
    getCurrentProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    form: propTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    form: state.form,
})


export default connect(mapStateToProps, { getCurrentProfile, deleteForm, addForm })(FormList);