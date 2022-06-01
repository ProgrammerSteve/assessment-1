import './Tagbar.css'
import {useEffect,useRef } from 'react';
import{ studentSlice} from '../../redux/reduxtools';
import{useSelector, useDispatch} from 'react-redux';

const Tagbar=({placeholder:placeholderTxt, index})=>{
    const dispatch=useDispatch();
    const {apiList}=useSelector((state)=>state.student);
    const {actions}=studentSlice;
    const inputRef=useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.studentsAddTag([index,inputRef.current.value]));
        inputRef.current.value = '';
    };

    const handleFocus=()=>{
        dispatch(actions.studentsFocusTag(index));
    }

    const handleBlur=()=>{
        dispatch(actions.studentsBlurTag(index));
    }

    //empty dependency array so it runs once
    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter' && apiList[index].isFocused) {
                event.preventDefault();
                handleSubmit();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return(
        <>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <input 
                type="text"
                className='tagbar'
                ref={inputRef}
                placeholder={`${placeholderTxt}`}
                onFocus={()=>handleFocus()}
                onBlur={()=>handleBlur()}
            ></input>
        </form>
        </>
    );
}
export default Tagbar;