import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSearchParams } from 'react-router-dom';
import { useEffect ,useState,useCallback} from 'react';
import { BASE_API_URL } from '../../constants';
import axios from 'axios';
function Englishbook() {
   const[searchParams]= useSearchParams();
   const standard=searchParams.get('class');
   const subject = searchParams.get('subject');
   const chapter = searchParams.get('chapter');
   const bookName=searchParams.get('bookname');
   
   const [loading, setLoading] = useState(true);
   const [page,setPage]=useState(1);
   const [error, setError] = useState(null);
   const [book,setBook]= useState([]);
   const [hasMore, setHasMore] = useState(true);

const fetchData= async(pageNumber)=>
  {
     setLoading(true);
     try{
            const response=await axios.get(`${BASE_API_URL}user/getbook?
            standard=${standard}
            &bookName=${bookName}
            &chapter=${chapter}
            &page=${pageNumber}` ,{withCredentials:true});

            if(response.status===200){
              if(response.data.data.length===0){
                setHasMore(false);
              }
              else{
                console.log(response.data.data);
                setBook(prevData=>[...prevData,...response.data.data]);
              }
            }

    
    
    }
     catch(err)
    {
        setError(err);
   }

  setLoading(false);
}


useEffect(()=>{
  
    fetchData(page);
  
},[]);


const handleScroll = useCallback(() => {
  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
    return;
  }
  setPage(prevPage => prevPage + 1);
}, [loading, hasMore]);

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [handleScroll]);

 

 

  



  

  return (
   
   <div>
    {book.map((sentence,index)=>{
      <p key={index}>{sentence.value}</p>
    })}
   </div>
  );

}

export default Englishbook;