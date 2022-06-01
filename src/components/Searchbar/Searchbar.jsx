import './Searchbar.css'

const Searchbar=({handler:handleNameSearch, placeholder:placeholderTxt})=>{
    return(
        <>
        <input 
            type="text"
            className='searchbar'
            placeholder={`${placeholderTxt}`}
            onChange={(event)=>handleNameSearch(event)}
        ></input>
        </>
    );
}
export default Searchbar;