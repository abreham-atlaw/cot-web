import Profile, { Role } from "@/apps/auth/domain/models/profile";



interface OwnerTableComponenentProps{
    owners: Profile[]
}


const OwnerTableComponent: React.FC<OwnerTableComponenentProps> = (props: OwnerTableComponenentProps) => {
    return (
        <table className="w-full">

            <thead className="border-b py-10">
                <tr className="">
                    {
                        ["No", "ID", "Email", "Department", "Roles"].map(
                            (title) => (
                                <th className="font-bold w-1/5 text-left my-10 border-b py-5 border-dark" key={title}>
                                    {title}
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.owners.map(
                        (profile: Profile, idx: number) => (
                            <tr key={profile.id!} className="">
                                {
                                    [
                                        (idx + 1).toString(),
                                        profile.id!.split("-")[0], 
                                        profile.email, 
                                        profile.department?.name ?? 'No Department', 
                                        Role[profile.role].toUpperCase()
                                    ].map(
                                        (value) => <td className="w-1/5 py-5 border-b" key={value}>{value}</td>
                                    )
                                }
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
}

export default OwnerTableComponent;