import '../Profile.css';
import pic from '../image/jman.png';
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useFormik } from "formik";
import { env } from "../env";
import Modal from "react-bootstrap/Modal";
import { useNavigate, Link } from "react-router-dom";
function Profile() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [change, setChange] = useState(false);
  // const [showIcon, setShowIcon] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [Dob, setDob] = useState("");
  const [Doj, setDoj] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobile, setMobile] = useState("");
  const [educationBackground, setEducationBackground] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  async function getProfileData(email) {
    console.log(email);
    let data = await axios
      .get(`${env.REACT_APP_API}/users/profile/get/${email}`)
      .then((d) => {
        console.log(d.data.profile);
        setImageUrl(d.data.profile.imageUrl);
        setJobTitle(d.data.profile.jobTitle);
        setDob(d.data.profile.Dob);
        setDoj(d.data.profile.Doj);
        setAddress(d.data.profile.address);
        setBloodGroup(d.data.profile.bloodGroup);
        setMobile(d.data.profile.mobile);
        setEducationBackground(d.data.profile.educationBackground);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  async function updateProfile(values, action, eMail) {
    console.log(eMail);
    let sendProfileData = await axios
      .put(`${env.REACT_APP_API}/users/profile_update`, {
        email: eMail,
        imageUrl: values.imageUrl,
        jobTitle: values.jobTitle,
        Dob: values.Dob,
        Doj: values.Doj,
        address: values.address,
        bloodGroup: values.bloodGroup,
        mobile: values.mobile,
        educationBackground: values.educationBackground,
      })
      .then((d) => {
        console.log(d);
        setChange(!change);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function onSubmit2(values, action) {
    console.log(email);
    let sendProfileData = await axios
      .post(`${env.REACT_APP_API}/users/profile`, {
        email: email,
        imageUrl: values.imageUrl,
        jobTitle: values.jobTitle,
        Dob: values.Dob,
        Doj: values.Doj,
        address: values.address,
        bloodGroup: values.bloodGroup,
        mobile: values.mobile,
        educationBackground: values.educationBackground,
      })
      .then((d) => {
        console.log(d);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          updateProfile(values, action, email);
        }
      });
    setTimeout(() => {
      handleClose();
    }, 1000);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      imageUrl: imageUrl ? imageUrl : "",
      jobTitle: jobTitle ? jobTitle : "",
      Dob: Dob ? Dob : "",
      Doj: Doj ? Doj : "",
      address: address ? address : "",
      bloodGroup: bloodGroup ? bloodGroup : "",
      mobile: mobile ? mobile : "",
      educationBackground: educationBackground ? educationBackground : "",
    },
    onSubmit: onSubmit2,
  });
  useEffect(() => {
    let loginSignupClass = document.querySelector(".login-signup");
    if (loginSignupClass) loginSignupClass.className = "ls-remove";
    let headClass = document.querySelector(".head1");
    if (headClass) headClass.className = "head";
    let getData = localStorage.getItem("user");
    if (getData === "") {
      let loginSignupClass = document.querySelector(".ls-remove");
      loginSignupClass.className = "login-signup";
      let headClass = document.querySelector(".head");
      headClass.className = "head1";
      // navigate("/");
    } else {
      // console.log(getData);
      setEmail(JSON.parse(getData).email);
      getProfileData(JSON.parse(getData).email);
    }
  }, [change]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Update</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body> */}
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label>Image URL</label>
            <input
              type="text"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              placeholder="Image Url"
              id="imageUrl"
            />
          </div>
          <div className="mb-3">
            <label>Job Title</label>
            <input
              type="text"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              placeholder="Job Title"
              id="jobTitle"
            />
          </div>
          <div className="mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              value={formik.values.Dob}
              onChange={formik.handleChange}
              placeholder="Date of birth"
              id="Dob"
            />
          </div>
          <div className="mb-3">
            <label>Date of Join</label>
            <input
              type="date"
              value={formik.values.Doj}
              onChange={formik.handleChange}
              placeholder="Date of Joining"
              id="Doj"
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Address"
              id="address"
            />
          </div>
          <div className="mb-3">
            <label>Blood</label>
            <input
              type="text"
              value={formik.values.bloodGroup}
              onChange={formik.handleChange}
              placeholder="Blood Group"
              id="bloodGroup"
            />
          </div>
          <div className="mb-3">
            <label>Mobile</label>
            <input
              type="text"
              min="10"
              max="10"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              placeholder="Mobile"
              id="mobile"
            />
          </div>
          <div className="mb-3">
            <label>Qualification</label>
            <input
              type="text"
              value={formik.values.educationBackground}
              onChange={formik.handleChange}
              placeholder="Qualification"
              id="educationBackground"
            />
          </div>

          {/* </Modal.Body> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              // disabled={formik.isSubmitting}
              type="submit"
              variant="primary"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="conatiners">
        {/* col1 */}
        <div className="row">
          <div className="col-2 col1">
            <div className="sidebar">
              <ul className="unorder">
                <li className="order"><img src={pic} alt="jman" /></li>
                <li className="order"><a href="#">Profile</a></li>
                <li className="order"><Link to="/">Logout</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-5">
            {/* col2 */}
            <div className='in-f'>
             <div className='in-o'>
             Job Title:<span>{jobTitle}</span>
             </div>
            </div>
            <div className='in-f'>
              <div className='in-o'>
              DoB:<span>{Dob}</span>
              </div>
            </div>
            <div className='in-f'>
              <div className='in-o'>
              DoJ:<span>{Doj}</span>
              </div>
            </div>
            <div className='in-f'>
              <div className='in-o'>
              Address:<span>{address}</span>
              </div>
            </div>
          </div>
          <div className='col-5'>
            <div className='in-f'>
              <div className='in-o'>
              Blood:<span>{bloodGroup}</span>
              </div>
            </div>
            <div className='in-f'>
              <div className='in-o'>
              Mobile:<span>{mobile}</span>
              </div>
            </div>
            <div className='in-f'>
              <div className='in-o'>
              Qualification:<span>{educationBackground}</span>
              </div>
            </div>
            <div>
              <button onClick={handleShow} className='btn bton form-control'>Update</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;