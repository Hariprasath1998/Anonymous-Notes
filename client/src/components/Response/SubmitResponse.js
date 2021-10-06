import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { getFormById, submitResponse } from '../../actions/form';
import propTypes from 'prop-types'

const SubmitResponse = ({ id, form: {form}, getFormById, submitResponse }) => {


    useEffect(() => {
        getFormById(id)
    },[]);

    const onSubmit = (e) => {
        e.preventDefault();
        const text = document.getElementById('response').value;
        submitResponse(id, text);
        document.getElementById('response').value = '';
    }
    console.log(form)
    return (
        <div>
            <h1>{form.question}</h1>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <textarea id='response' placeholder="Add Response" className="form-control"></textarea>
            </div>

            <input type="submit" className="btn btn-primary" value="Add Response" />
        </form>
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    form: state.form
})

SubmitResponse.propTypes = {
    getFormById: propTypes.func.isRequired,
    submitResponse: propTypes.func.isRequired
}


export default connect(mapStateToProps, { getFormById, submitResponse })(SubmitResponse);