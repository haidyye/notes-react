import React , {useEffect , useState} from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import $ from 'jquery'
import { Link } from 'react-router-dom'


export default function Home (){
 
   let token = localStorage.getItem("token")
   let baseUrl = "https://route-egypt-api.herokuapp.com/"
   
   let decoded = jwt_decode(token)
   let userID = decoded._id

   const [notes, setNotes] = useState([])
 //  console.log(userID)
  
    async function getUserNotes(){
     let {data} = await axios.get(baseUrl+"getUserNotes", {
         headers:{
             token,
             userID
         }
     })
     if(data.message == "success"){
        setNotes(data.Notes)
     }
   }

   useEffect(()=>{
       getUserNotes()
   },[])

   const [note , setNote] = useState({title:"" , desc:"" , userID , token })
   
   function getNotes({target}){
    setNote({ ...note, [target.name]:target.value})
   }
 //  console.log(note)
    
    async function addNote(e){
    e.preventDefault()
    let { data } = await axios.post(baseUrl+"addNote", note)
   // console.log(data);
    if(data.message == "success"){
        getUserNotes()
      
       $("#exampleModal").fadeOut(()=>{
            $(".modal-backdrop").fadeOut()
        })
    }
  
  }

  async function deleteNotes(NoteID){
    let { data } = await axios.delete(baseUrl+"deleteNote",{
        data:{
            NoteID,
            token
        }}
        
        )
            getUserNotes()
       
      console.log(data)
    
  }

  async function updateNote(){
      let {data}= await axios.put(baseUrl+"updateNote" , {note})
    console.log(data)
  }
    return (
        <>
           <div className="container my-5">
        <div className="col-md-12 text-end">
            <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
        New</a>
        </div>
    </div>
   


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form onSubmit={addNote} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                    </div>
                    <div className="modal-body">
                        <input onChange={getNotes} placeholder="Type Title" name="title" className="form-control" type="text"/>
                        <textarea onChange={getNotes} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button  type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button className="btn btn-info"><i className="fas fa-plus-circle"></i>  Add Note</button>
                    </div>
                </div>
            </div>
        </form>
    </div>



 

    <div className="container">
        <div className="row">
          {notes.map( (note , index)=>{
             return(   <div key={index} className='col-md-4 my-4'>
            <div className="note p-4">
            <h3 className="float-left">{note.title} </h3>
            <a ><i className="fas fa-edit float-right edit"></i></a>
             <i onClick={()=>{
                 deleteNotes(note._id)
             } }  className="fas fa-trash-alt float-right px-3 del "></i>
            <span className="clearfix"></span>
            <p> {note.desc} </p> </div>
        </div>
          )})}
        
        </div>
       
    </div>
  
        </>
    )
}