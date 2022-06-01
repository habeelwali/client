import React, { useState, useEffect } from 'react'
import './editprofile.css'
import { useSelector, useDispatch } from 'react-redux'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {updateProfileUser} from '../../redux/actions/profileAction'
function EditProfile({  setOnEdit }) {
    const initState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: '',
    }
    const [userData, setUserData] = useState(initState)

    const { fullname, mobile, address, website, story, gender } = userData
    const [avatar, setAvater] = useState('')
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(()=>{
           setUserData(auth.user)
    },[auth.user])

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setAvater(file)
    }
    const handleInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfileUser({userData,avatar,auth}))
    }
    return (
        <div className="edit_profile">
            <button className="close_btn"
                onClick={() => setOnEdit(false)}
            >
                close
            </button>
            <form onSubmit={handleSubmit} >
                <div className="image_edit">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgqLqC18yVDR5mTQE9jI2FuPXxSlxVPk672GG9lgR6lB-pgSUo2m8KQP6PfRM4_fqLQkk&usqp=CAU" alt="avatar" /> */}
                    <span>
                        <CameraAltOutlinedIcon />
                        <p>change</p>
                        <input type="file" name="file" id="file_up"
                            accept='image/*' onChange={changeAvatar}
                        />
                    </span>
                </div>
                <div className="form_group">
                    <label htmlFor="fullname">full name</label>
                    <div>
                        <input className="form_control"
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={fullname}
                            onChange={handleInput}
                        />
                        <small style={{ top: "50%", right: "5%", color: "red", transform: 'translateY(-5%)' }}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>
                <div className="form_group">
                    <label htmlFor="mobile">Mobile</label>
                    <div>
                        <input className="form_control" type="text" name="mobile" id="mobile"
                            value={mobile}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <label htmlFor="address">Address</label>
                    <div>
                        <input className="form_control" type="text" name="address" id="address"
                            value={address}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <label htmlFor="website">Website</label>
                    <div>
                        <input className="form_control" type="text" name="website" id="website"
                            value={website}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <label htmlFor="story">story</label>
                    <div>
                        <textarea className="form_control" name="story" id="story"
                            value={story}
                            cols="50" rows="4"
                            onChange={handleInput}

                        />
                    </div>
                    <small style={{ right: "text" }}>
                        {story.length}/200
                    </small>
                </div>
                <label htmlFor='gender'>Gender</label>
                <div>
                    <select className="form_group" name="gender" id="gender" onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button className="save_btn" type='submit'>save</button>
            </form>
        </div>
    )
}

export default EditProfile