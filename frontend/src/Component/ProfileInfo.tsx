import React from "react";
import { useStateValue } from "../state/state";

const ProfileInfo: React.FC = () => {
    const [{profile, email}, dispatch] = useStateValue();

    const user = Object.values(profile).filter(prof => prof.Email === email);
    const myProfile = user[0];
    return(
        <>
            <h1 className="text-3xl">{myProfile.Nickname}</h1>
            <div>First name: {myProfile.FirstName}</div>
            <div>Last name: {myProfile.LastName}</div>
            <div>Age: {myProfile.Age}</div>
            <div>Discord Nick: {myProfile.DiscordNick}</div>
            <div>Joining date: {myProfile.JoiningDate}</div>
        </>
    )
}

export default ProfileInfo;