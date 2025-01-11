import { useEffect, useState } from "react";
import { BASE_API_URL } from '../../constants';
import axios from "axios";
function Englishbook1(){
const [book,setBook]=useState([]);
console.log("book1")
useEffect(()=>{
       const fetchData=async()=>{
        const response= await axios.get(`${BASE_API_URL}user/getbook?standard=10&chapter=1&bookName=First Flight`,{withCredentials:true});

        if(response.status===200){
            setBook(response.data.data);
            console.log(response.data.data);
        }
       }

       fetchData();
},[])

    return(
<>
<div>bsahshv</div>
<div>
    {book.map((sentence,index)=>{
      <p key={index}>{sentence.value}</p>
    })}
   </div>
</>
    );

}
export default Englishbook1;