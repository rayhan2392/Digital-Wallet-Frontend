import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

export default function UserProfile() {
  
    const {data:myProfile}= useUserInfoQuery({});
    console.log(myProfile);

  return (
    <div>
       {/* show name, email and a profile Icon
       also a edit button to update user information. The api is cont created yet.
       just add button once the update api is ready, then we will implement
       */}

        <h1>Name:{myProfile?.name} </h1>
        This is UserProfile component</div>
  )
}