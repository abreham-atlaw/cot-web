import { Role } from '@/apps/auth/domain/models/profile';
import DetailUserState from '@/apps/staffManagement/application/states/detailUserState';

interface StaffDetailProps{
    state: DetailUserState;
}

const StaffDetail = (props:StaffDetailProps) => {
    
  //  const features= [props.state.instance?.name,props.state.instance?.id!.split("-")[0],props.state.instance?.email,Role[props.state.instance?.role as number]];
  
    const assetHeading = ['Asset Id', "category","name","status"]
    const requestHeading = ['Request Id',"Asset Id","Status","Request_date"]
    console.log(props.state.assets)
    const cols = assetHeading.length + 1;
 return  <div>
 
 <ul>
  <li className="flex my-2">
    <span className="font-bold text-lg mr-2">Employee Name:</span>
    <span>{props.state.instance?.name}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Employee Id:</span>
    <span>{props.state.instance?.id?.split('-')[0]}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Email:</span>
    <span>{props.state.instance?.email}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Role:</span>
    <span>{(Role[props.state.instance?.role as number]).toUpperCase()}</span>
  </li>
</ul>

   <div className='my-20 '>
    <h3 className='text-center font-bold text-lg'>Owned Asset</h3>
    <table className='table-auto w-full border-collapse h-1/2 ml-8 mt-8'> 
        <thead>
            {assetHeading.map((heading)=>(
                <th
                className={`truncate overflow-hidden whitespace-nowrap py-4 border-b text-start font-bold w-[${
                  100 / cols
                }%]`}
              >
                {heading}
              </th>
            ))}
        </thead>
        <tbody>
           
            {props.state.assets?.map((asset)=>(
                <tr className='text-start border-b '>
                   <td className='py-4'>{asset.id?.split("-")[0]}</td>
                   <td>{asset.category?.name}</td>
                   <td>{asset.name}</td>
                   <td>"used"</td>
                  
                </tr>
                
            
            ))}
            
           
        </tbody>
    </table>
   </div>


   <div className='my-20 '>
    <h3 className='text-center font-bold text-lg'>Request Asset</h3>
    <table className='table-auto w-full border-collapse h-10 ml-8 mt-8'> 
        <thead>
            {requestHeading.map((heading)=>(
                <th
                className={`truncate overflow-hidden whitespace-nowrap py-4 border-b text-start font-bold w-[${
                  100 / cols
                }%]`}
              >
                {heading}
              </th>
            ))}
        </thead>
        <tbody>
           
            {props.state.assets?.map((asset)=>(
                <tr className='text-start border-b '>
                   <td className='py-4'>{asset.id?.split("-")[0]}</td>
                   <td>{asset.category?.name}</td>
                   <td>{asset.name}</td>
                   <td>"used"</td>
                  
                </tr>
                
            
            ))}
            
           
        </tbody>
    </table>
   </div>



   
 </div>
}

export default StaffDetail;
