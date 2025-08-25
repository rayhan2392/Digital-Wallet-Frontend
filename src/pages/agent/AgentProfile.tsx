import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

export default function AgentProfile() {
    const { data: myProfile } = useUserInfoQuery({})
    console.log(myProfile);
    return (
        <div>This is AgentProfile component</div>
    )
}