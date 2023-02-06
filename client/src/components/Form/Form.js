import React,{useState,useEffect} from 'react'
import useStyles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useSelector} from 'react-redux'


import {useDispatch} from 'react-redux'
import { createPost,updatePost } from '../../actions/posts'

function Form({currentId,setCurrentId}) {
  const classes=useStyles()
  const dispatch=useDispatch()

const [postData, setPostData] = useState({

creator:'',title:'',message:"",tags:"",selectedFile:""

})

const post=useSelector((state)=>currentId ? state.posts.find((p)=>p._id===currentId) : null)


useEffect(()=>{
if(post) setPostData(post)

},[post])

  const handleSubmit=(e)=>{
 e.preventDefault()


 if(currentId){
  dispatch(updatePost(currentId,postData))
  
}
else{
  dispatch(createPost(postData))
}
clear()
  }

  const clear=()=>{
  setCurrentId(null)
  setPostData({

    creator:'',title:'',message:"",tags:"",selectedFile:""
    
    })
  }




  return (
    <Paper className={classes.paper}>
   <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant="h6">{currentId?'Editing':'Creating'} a Memory</Typography>
    <TextField 
     name="creator" 
     variant="outlined" 
     label="Creator" 
     fullwidth="true"
     value={postData.creator}
      onChange={(e)=>{
    setPostData({...postData,creator:e.target.value})
      }}
     />
       <TextField 
     name="title" 
     variant="outlined" 
     label="Title" 
     fullwidth="true"
     value={postData.title}
      onChange={(e)=>{
    setPostData({...postData,title:e.target.value})
      }}
     />
      <TextField 
     name="message" 
     variant="outlined" 
     label="Message" 
     fullwidth="true"
     value={postData.message}
      onChange={(e)=>{
    setPostData({...postData,message:e.target.value})
      }}
     />
      <TextField 
     name="tags" 
     variant="outlined" 
     label="Tags" 
     fullwidth="true"
     value={postData.tags}
      onChange={(e)=>{
    setPostData({...postData,tags:e.target.value.split(',')
  })
      }}
     />
    <div className={classes.fileInput}></div>
    <FileBase
    type="file"
    multiple={false}
    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
    
    />
    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

    </form>   
   


    </Paper>
  )
}

export default Form