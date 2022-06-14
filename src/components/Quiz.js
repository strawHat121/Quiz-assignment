import React, {useState, useEffect} from 'react';
import style from './Quiz.module.css'

const Quiz=(props)=>{
    
    useEffect(()=>{
        setuserAns('');
    }, [props.qsnNumber])

    const [userAns, setuserAns]=useState(null);

    const inputChangedHandler=(event)=>{
        setuserAns(event.target.value);
    }

    return (
        <div className={style.Body1}>
            <h2>Question no. - {props.qsnNumber}</h2>
            <br/><br/><br/>
            <b>{props.operand1} </b>
            <b>{props.operator} </b>
            <b>{props.operand2} </b>
            <b>= </b>
            <form style={{display:'inline'}} onSubmit={(e)=>props.submitAnswer(e, {...props, userAns:userAns})}>
            <input type='number' value={userAns} required={true} onChange={inputChangedHandler}  ref={input => input && input.focus()}/>
            <button >Submit</button>
            </form>
        </div>
    );
}

export default Quiz;