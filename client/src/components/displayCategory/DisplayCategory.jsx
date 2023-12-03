import { Button } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";

function DisplayCategory({category, setCategoryList}) {
    return ( 
        <Button
            className="mb-3 mx-2"
            style={{
                border:'2px solid #0A3E33',
                color:'#0A3E33',
                backgroundColor:'transparent',
                borderRadius:'20px',
                paddingTop:'0px'
            }}
            onClick={
                ()=>{
                    setCategoryList((curr)=>curr.filter((x)=>x !== category))
                }
            }
        >
            {category} <MdOutlineCancel style={{color:'#0A3E33'}}/>
        </Button>
     );
}

export default DisplayCategory;