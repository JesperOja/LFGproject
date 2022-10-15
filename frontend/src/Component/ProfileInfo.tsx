import React from "react";
import { useStateValue } from "../state/state";
import { ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}

const ProfileInfo: React.FC<Props> = ({currentUser}) => {

    return (
        <div id="profileInfo" >
            
            <div >

                <div>
                    <div >
                        <h1 > {currentUser.username} </h1>
                        <h4 >( {currentUser.firstname} {currentUser.lastname} )</h4>
                    </div>
                    <div>
                        <p>Age: {currentUser.age}</p>
                    </div>
                </div>

                <div >
                    <div >
                         <p>{currentUser.discord}</p>
                    </div>
                    <p >Join date: {currentUser.joiningDate}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;