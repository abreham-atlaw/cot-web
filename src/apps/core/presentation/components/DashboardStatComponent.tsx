

interface DashboardStatComponentProps{

    title: string;
    value: number;

}

const DashboardStatComponent: React.FC<DashboardStatComponentProps> = (props: DashboardStatComponentProps) => {
    return (
        <div className="shadow-lg rounded-xl p-8 w-[15em]">

            <h5 className="text-grey">{props.title}</h5>
            <h6 className="font-bold text-4xl mt-10">{props.value}</h6>

        </div>
    )
}

export default DashboardStatComponent;