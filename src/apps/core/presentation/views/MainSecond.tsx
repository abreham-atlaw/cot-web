import NavBar from "../components/Navbar"


interface Props{
    child:JSX.Element
}
function MainSecond(props:Props){
  return(
    <div >
        <NavBar/>
      
           {props.child}
    
    </div>
  )
}
export default MainSecond