import React from 'react'
import { useState, useEffect} from 'react'
import './Editor.css'

const Editor=()=>{

    const [txt,setText]=useState('')
    const [obj,setObj]=useState({word:0,character:0})
    const [search,setSearch]=useState('')
    const [replace,setReplace]=useState('')

    const textFunc=(event)=>{
       setText(event.target.value)
    }

    useEffect(()=>{
       const sentence=txt.toLowerCase().split(' ')
       const wordLen=(new Set(sentence)).size
       let count=0;
       for (let i of txt){
          const check=i.charCodeAt(0)
          if ((check>=97 && check<=122) || (check>=48 && check<=57)){
            count+=1 
          }
       }
       
       setObj({word:wordLen-1,character:count})
       

    },[txt])

    const submitFunc=(event)=>{
        event.preventDefault()
        
        if (search && txt.includes(search)){
            
            const newText = txt.replaceAll(search,replace)
            setText(newText)
        }
    
    }

    const searchFunc=(event)=>{
       setSearch(event.target.value)
    }

    const replaceFunc=(event)=>{
        setReplace(event.target.value)
    }
   

    const disp=()=>{
        return (
            
                <p>Unique word count: <span className='span'>{obj.word}</span> &nbsp;&nbsp;&nbsp; Character Count: <span className='span'>{obj.character}</span></p>
                
           
        )
    }

    return (
        <div>
        <h1 className='h'> Form Details </h1>
        <form className='form' onSubmit={submitFunc}>
             <textarea rows={10} cols={50}  className='txtarea' placeholder='Enter the text' onChange={textFunc} value={txt}>
             </textarea>
             <br/>
             <input type='text' className='inp' placeholder='Enter the text you want to replace' onChange={searchFunc} value={search}/>
             <br/>
             <input type='text' className='inp' placeholder='New String' onChange={replaceFunc} value={replace}/>
             <br/>
             <button type='submit' className='butt'> Replace All  </button>
            
             {
                obj.word!==0 && obj.character!==0?disp():''
            }
           
        </form>
        </div>
    )
}

export default Editor