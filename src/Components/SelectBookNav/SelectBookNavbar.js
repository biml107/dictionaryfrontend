 import Stack from 'react-bootstrap/Stack';
 

import React, { useState } from 'react';
import { Form ,Row,Col,Containe,Button} from 'react-bootstrap';
import LoadingButton from '../CommonComponents/LoadingButton';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
  const navigate = useNavigate();

  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBookTitle, setSelectedBookTitle] = useState('');
  const[selectedChapter,setSelectedChapter]=useState('');
   

  const navigateToGetBook=()=>{
    navigate(`/getbook`);
  }

  // Function to handle selection of standard
  const handleStandardSelect = (event) => {
    setSelectedStandard(event.target.value);
    setSelectedSubject(''); // Reset subject selection when standard changes
    setSelectedBookTitle(''); // Reset book title selection when standard changes
    setSelectedChapter('');
  };

  // Function to handle selection of subject
  const handleSubjectSelect = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedBookTitle(''); // Reset book title selection when subject changes
    setSelectedChapter('');
  };

  // Function to handle selection of book title
  const handleBookTitleSelect = (event) => {
    setSelectedBookTitle(event.target.value);
    setSelectedChapter('');
  };
  const handleChapterSelect = (event) => {
    setSelectedChapter(event.target.value);
     
  };

  return (
    <>
    <Stack direction="horizontal" gap={2}>
      
      <div className="p-2">
        <Form.Select size="sm" onChange={handleStandardSelect} value={selectedStandard}>
          <option value="">Select...</option>
          <option value="1">Class 1</option>
          <option value="2">Class 2</option>
          <option value="3">Class 3</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
          <option value="7">Class 7</option>
          <option value="8">Class 8</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
          {/* Add more standard options as needed */}
        </Form.Select>
     </div>
     <div className="p-2">
     <Form.Select size="sm" onChange={handleSubjectSelect} value={selectedSubject} disabled={!selectedStandard}>
          <option value="">Select...</option>
          {/* Dynamically render subject options based on selected standard */}
          {selectedStandard === '9' && (
            <>
              <option value="english">English</option>
           
            </>
          )}
          {selectedStandard === '10' && (
            <>
              <option value="english">English</option>
               
            </>
          )}
          {selectedStandard === '11' && (
            <>
              <option value="english">English</option>
               
            </>
          )}

          {/* Add more subject options as needed */}
        </Form.Select>
     </div>
       
     <div className="p-2">

     <Form.Select  size="sm" onChange={handleBookTitleSelect} value={selectedBookTitle} disabled={!selectedSubject}>
          <option value="">Select...</option>
          {/* Dynamically render book title options based on selected subject */}
          {selectedStandard==="9"&&selectedSubject === 'english' && (
            <>
              <option value="beehive">Beehive</option>
              <option value="moments">Moments</option>
            </>
          )}

{selectedStandard==="10"&&selectedSubject === 'english' && (
            <>
              <option value="First Flight">First Flight</option>
              <option value="footprintsWithoutFeet">Footprints Without Feet</option>
            </>
          )}
          
          {/* Add more book title options as needed */}
        </Form.Select>
    
        </div>

        <div className="p-2">
        <Form.Select size="sm" onChange={handleChapterSelect} value={selectedChapter} disabled={!selectedBookTitle}>
          <option value="">Select...</option>
          <option value="1">Chapter 1</option>
          <option value="2">Chapter 2</option>
          <option value="3">Chapter 3</option>
          <option value="4">Chapter 4</option>
          <option value="5">Chapter 5</option>
          <option value="6">Chapter 6</option>
          <option value="7">Chapter 7</option>
          <option value="8">Chapter 8</option>
          <option value="9">Chapter 9</option>
          <option value="10">Chapter 10</option>
          <option value="11">Chapter 11</option>
          <option value="12">Chapter 12</option>
          {/* Add more standard options as needed */}
        </Form.Select>
     </div>
        
       {selectedStandard&&selectedSubject&&selectedBookTitle&&selectedChapter&&<Button variant="outline-primary" onClick={navigateToGetBook}>Get Book</Button>}
        
      

      </Stack>


     

        
        </>

  );
};

export default MyForm;