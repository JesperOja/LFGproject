import React from "react";
import { useStateValue } from "../state/state";

const ProfileInfo: React.FC = () => {
    const [{profile, email}] = useStateValue();

    const user = Object.values(profile).filter(prof => prof.email === email);
    const myProfile = user[0];
    return(
        <>
            <h1 className="text-3xl">{myProfile.username}</h1>
            <div>First name: {myProfile.firstName}</div>
            <div>Last name: {myProfile.lastName}</div>
            <div>Age: {myProfile.age}</div>
            <div>Discord Nick: {myProfile.discord}</div>
            <div>Joining date: {myProfile.joiningDate}</div>
        </>
    )
}

export default ProfileInfo;