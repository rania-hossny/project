import React,  { useEffect, useState ,Fragment } from 'react'
import { Badge, Button, Card, Col, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

import styles from "./profilelayout.module.css"
import axios from "axios"

import photo from "./pietra-schwarzler-FqdfVIdgR98-unsplash.jpg";
import { Link } from 'react-router-dom';
import { FiEdit ,FiLogOut } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import {AiOutlineFacebook,AiOutlineInstagram,AiOutlineTwitter} from 'react-icons/ai'
// import {UpdateProfile} from "../pages/UpdateProfile";




const ProfileLayout = (props) => {
  console.warn(props.id)
  const token=localStorage.getItem("token")
  const [users, setUser] = useState([])
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setUsername] = useState("");
  const [track, setTrack] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImg] = useState("");
  const [userId,setUserId]=useState(null)

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    fetch("https://boiling-shelf-43809.herokuapp.com/user/"+props.id+"/profile"
    , {
      headers:{
        "authorization":`${token}`
      }
    }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        console.warn(resp.profile)
        setUser(resp.profile)
        setBio(resp.profile.bio)
        setPhone(resp.profile.phone)
        setEmail(resp.profile.email)
        setAddress(resp.profile.address)
        setUsername(resp.profile.name)
        setUrl(resp.profile.url)
        setImg(resp.profile.image)
        // setSpecialist(resp.specialist)
        // setUserId(resp.id)
      })
    })
  }

  const updateProfile=(e)=>{
    e.preventDefault();
    let item={name,bio,phone,email,address,image}
    console.warn("item",item)
    const formData = new FormData();
    formData.append('name',name)
    formData.append('bio',bio)
    formData.append('phone',phone)
    formData.append('email',email)
    // formData.append('address',address)
    formData.append("",image)
    axios({
      method:"PUT",
      url:"https://boiling-shelf-43809.herokuapp.com/user/editProfile",
      data:formData,
      headers:{"authorization":`${token}`}
    }).then(resp=>{
      (console.log(resp))
      getUsers();
    })
  }
  // console.log(users.discreption);
    return (
        <div className="container-fluid">
            <Row>
            <Col md={8}style={{marginLeft:"10px",Color:'primary'}} >
                <Card className={styles.cardprofile} style={{height:"41rem"}} >
               
            
            <Card.Body style={{padding:"26px", marginTop:"10px"}} >
            <Form onSubmit={(e)=>updateProfile(e)} className="text-primary">
              <div style={{ marginBottom:"30px",color:'#062847'}}>
              <h3>
                Edit Profile
                </h3></div>
              
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label >Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="name"
                    defaultValue={name}
                    onChange={(e)=>console.log(e.target.value)}
                    />
                  </Form.Group>

                </Form.Row>

                <Form.Group controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Apartment, or floor"
                  defaultValue={address}
                  />
                </Form.Group>

                <Form.Group controlId="formGridSpecialist">
                  <Form.Label>Specialist</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Specialist.."
                  defaultValue={track}
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your Phone"
                    defaultValue={phone}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label color="primary">Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter your Email"
                    defaultValue={email} 
                    />
                  </Form.Group>
                  
                

                </Form.Row>
                <div className="form-group">
                <Form.Label color="primary">Bio</Form.Label>
                          <textarea
                          className="form-control"
                          placeholder="Enter Bio ..."
                          rows="3"
                          defaultValue={bio}
                          />
                      </div>

                

                <Button variant="primary " 
                style={{backgroundColor:'#062847'}} 
                type="submit"
                
                >
                  Update Profile
                </Button>
              </Form>
            </Card.Body>     
                </Card>
                </Col>
                <Col md={3}>
                
                <Card style={{ width: '26rem',minHeight:"20rem" }} className={styles.cardprofile} >
               
                  <div className={styles.imgprofile}>
                    <Card.Img variant="top" src={url} style={{margin:"0px", borderRadius:"0%", width:"100%"}}  />
                    
                          <div className={styles.editimg} > 
                              <HiOutlineCamera className={styles.iconimg} />
                 
                      </div>
                    </div> 
                    <Card.Body className="text-center">
                        <Card.Title><strong>{users.name}</strong></Card.Title>
                
                        <Card.Title style={{color:"rgba(0,0,0,0.3)"}}>
                           <strong>{users.bio}</strong>
                        </Card.Title>
                        <Card.Title style={{color:"rgba(0,0,0,0.3)"}}>
                           <strong>{users.track}</strong>
                        </Card.Title>
                        <Card.Title>
                           <strong>{users.email}</strong>
                        </Card.Title>
                        <Card.Title >
                           <strong>{users.phone}</strong>
                        </Card.Title>
                        <Card.Title style={{color:"rgba(0,0,0,0.3)"}}>
                           <strong>{users.address}</strong>
                        </Card.Title>
                    </Card.Body>
                   
                  
                </Card>
                
              
                </Col>

                
               
            </Row>
            
        </div>
    )
}

export default ProfileLayout