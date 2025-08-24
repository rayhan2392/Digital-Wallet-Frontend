/* eslint-disable @typescript-eslint/no-unused-vars */
import { useBlockUserMutation, useGetAllUsersQuery, useUnBlockUserMutation } from "@/redux/features/admin/admin.api"

export default function ManageUsers() {
    const { data: users } = useGetAllUsersQuery({ role: "user" })
    const [blockUser]=useBlockUserMutation();
    const [unBlockUser]=useUnBlockUserMutation();

    console.log(users);
    return (
        <div>
            {/* implement this component as like manage agent. check amdin api */}
            This is ManageUsers component
        </div>
    )
}