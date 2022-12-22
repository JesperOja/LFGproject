import React from "react";
import { ProfileModel } from "../../types";

interface Props {
    currentUser: ProfileModel;
}

const ProfileInfo: React.FC<Props> = ({ currentUser }) => {
    const nameGiven = () => {
        if (Number(currentUser.firstname?.length) > 0){
            return true;
        }else{
            return false;
        }
    }
    return (
        <div id="profileInfo" className='flex py-10 px-10'>
            
            <div className='flex w-full relative'>

                <div>
                    <div className='flex h-fit'>
                        <h1 className="text-3xl font-bold h-fit"> {currentUser.username} </h1>
                        {nameGiven() && <h4 className="text-md capitalize font-semibold italic ml-2 h-fit my-auto">( {currentUser.firstname} {currentUser.lastname} )</h4>}
                    </div>
                    <div>
                        {Number(currentUser.age)< 0 && <p>Age: {currentUser.age}</p>}
                    </div>
                </div>

                <div className='ml-auto font-semibold h-fit'>
                    <div className='flex w-fit absolute bottom-0 w-38 right-0'>
                        <p>{currentUser.discord}</p>
                    </div>
                    <p className='absolute top-0 w-38 right-0'>Join date: {currentUser.joiningDate}</p>
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo;