interface OverviewProps{
    stat:{
    title:string;
    value:number;
    }[]
}
interface TitleProps{
    topic:string
}
export function OverviewTitle(props:TitleProps){
    return <h3> {props.topic}</h3>
    
}
function Overview(props:OverviewProps){
    return <div className='categ'>
     <div className='each'>
        {props.stat.map((item)=>(
            <div className='listed'>
                <p>{item.title} </p>
                <h2>{item.value}</h2>
            </div>
            ))}
            </div>
   
</div>
}
export default Overview