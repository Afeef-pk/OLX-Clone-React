import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [formIsValid,setFormIsValid] = useState('')
  const date = new Date();

  
  const handleCreatePost = () => {
    if (!user) {
      setFormIsValid('You Must Logged in to upload Products')
      return;
    }else if(name,category,price ===''){
      setFormIsValid('Please Fill all the fields')
      return;
    }
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          history.push("/");
        });
      });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Product Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setFormIsValid(e.target.value.length > 0 ? null : 'Please fill all field.');
             } }
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setFormIsValid(e.target.value.length > 0 ? null : 'Please fill all field.')
            }}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
              setFormIsValid(e.target.value.length > 0 ? null : 'Please fill all field.');
            }}
            type="number"
            id="fname"
            name="Price"
          />
          <br />

          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
          <br /><br />
          <p style={{color:'red'}}>{formIsValid}</p>
          <button onClick={handleCreatePost} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
