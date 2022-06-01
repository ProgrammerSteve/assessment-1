import './Card.css';
import Tagbar from '../Tagbar/Tagbar';
import {useState} from 'react';

const Card=({props})=>{
    let {
        firstName,
        lastName,
        email,
        skill,
        company,
        pic,
        grades,
        tags,
        index,
    }=props;

    const [toggleGrades,setToggleGrades]=useState(false);
    const getGradeAverage=(grades)=>{
        return grades.reduce((acc,num)=>{
            return acc+=parseInt(num);
        },0)/grades.length
    }

    const createGradeList=(grades)=>{
        let elements=[];
        grades.forEach((grade,index)=>elements.push(<p className="infoText" key={index}>{`Test ${index}: ${grade}%`}</p>));
        return elements;
    }

    const createTagList=(tags)=>{
        let elements=[];
        tags.forEach((tag,index)=>{
                elements.push(
                <div 
                className="tagText" 
                key={index}
                style={{
                    width:`${10+(tag.split("").length*10)}px`,
                    maxWidth:'280px',
                }}
                >
                    <p key={index}>{`${tag}`}</p>
                </div>);
            }
        );
        return elements;
    }

    return(
        <div className='cardContainer'>
                <div className="cardFlexContainer">
                        <div className='picContainer'>
                            <img id="profilepic" src={`${pic}`} alt={`profile-card-${firstName}-${lastName}`} />
                        </div>
                        <div className='infoContainer'>
                            <p className='nameText'>{`${firstName} ${lastName}`.toUpperCase()}</p>
                            <p className="infoText">{`Email: ${email}`}</p>
                            <p className="infoText">{`Company: ${company}`}</p>
                            <p className="infoText">{`Skill: ${skill}`}</p>
                            <p className="infoText">{`Average: ${getGradeAverage(grades)}%`}</p>
                            <div className='tagContainer'>
                                {toggleGrades?<></>:createTagList(tags)}
                            </div>
                            <Tagbar 
                                placeholder={`Add a Tag`}
                                index={index}
                            />
                            <div className='spacer'></div>
                            <div>
                                {toggleGrades?createGradeList(grades):<></>}
                            </div>
                        </div>
                </div>

                <div className='plusMinusButton'>
                    {toggleGrades? 
                    <div 
                    className='plusMinusParagraph' 
                    onClick={()=>setToggleGrades(toggle=>toggle?false:true)}
                    >&#8722;</div>
                    : 
                    <div 
                    className='plusMinusParagraph' 
                    onClick={()=>setToggleGrades(toggle=>toggle?false:true)}
                    >&#43;</div>}
                </div>
        </div>
    );
}

export default Card;