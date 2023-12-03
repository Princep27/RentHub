function DisplayImage({image,setImageList}) {
    return ( <>
           <img 
                src={URL.createObjectURL(image)} 
                alt="" 
                width="100px" 
                height="70px" 
                className="m-1"
                onClick={()=>{setImageList((current)=>current.filter((x)=>image !== x))}}
           />
    </> );
}

export default DisplayImage;