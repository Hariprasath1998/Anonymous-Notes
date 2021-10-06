import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import { deleteForm, getCurrentProfile } from '../../actions/form';




const FormItem = ({ 
    formID,
    question,
    deleteForm
}) => {

    const onClick = e => {
        deleteForm(formID)
    }

    useEffect(() => {
        getCurrentProfile()
    },[]);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
        <Link to={`/dashboard/${formID}`} className="text-dark">
            {question}
        </Link>
        
        <button type="button" className="close" aria-label="Close" onClick={e => onClick(e)}>
            <span aria-hidden="true">&times;</span>
        </button>
        
        </li>      
    )
}


export default FormItem;