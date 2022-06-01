import './App.css';
import {useEffect, useState, useCallback, useMemo} from 'react';
import Card from './components/Card/Card';
import Searchbar from './components/Searchbar/Searchbar';
import{useSelector, useDispatch} from 'react-redux';
import{ getStudents} from './redux/reduxtools';

function App() {
  const [nameTxt,setNameTxt]=useState('');
  const [tagTxt,setTagTxt]=useState('');

  const dispatch=useDispatch();
  const {apiList}=useSelector((state)=>state.student);

  useEffect(() => {
    dispatch(getStudents());
  },[]);

  const renderProfile=useCallback((List)=>{
    let elements=[];
    List.forEach((el,index)=>elements.push(<Card key={index} props={el}/>));
    return elements;
  },[apiList])

  const handleNameSearch=(e)=>{
    setNameTxt(()=>e.target.value);
  }
  
  const handleTagSearch=(e)=>{
    setTagTxt(()=>e.target.value);
  }

  return (
    <div className="backgroundContainer">
      <div className="App">
        <div className='searchContainers'>
          <Searchbar handler={handleNameSearch} placeholder={`Search by name`}/>
          <Searchbar handler={handleTagSearch} placeholder={`Search by Tag`}/>
        </div>
        <div className='profileListContainer'>
        {  
            (apiList.length!==0)?
            renderProfile(
                  apiList
                  .filter((el,index)=>{
                    let TFlag=false;
                    let NFlag=false;
                    let TLen=tagTxt.split('').length;
                    let NLen=nameTxt.split('').length;
                    if(TLen==0 && NLen==0){
                      return true
                    }
                    apiList[index].tags.forEach((tag,ind)=>{
                      if(tag.toLowerCase().includes(tagTxt.toLowerCase())){
                        TFlag=true;
                      }
                    })
                    if(`${el.firstName} ${el.lastName}`.toLowerCase().includes(nameTxt.toLowerCase())){
                      NFlag=true;
                    }
                    if((TFlag && NLen==0)||(TLen==0 && NFlag)||(TFlag&&NFlag)){
                      return true;
                    }
                    else{
                      return false;
                    }
                  })
              )
            :(<h1 style={{position:'absolute',left:'50%',transform:'translate(-50%,0)'}}>Loading Profiles...</h1>)    
        }
        </div>  
      </div>
    </div>
  );
}

export default App;
