import React, { useEffect, useState,useContext } from 'react';
import { Typography, IconButton, Collapse, Box ,Tooltip,Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,TextField
} from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { LayoutPageContext } from '../layout';
import { BASE_API_URL } from '../../../constants'; 
import axios from 'axios';
const chapterSentences = [
    {
      value: "This is the first sentence.",
      explanations: [
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
        { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
      ],
    },
    {
      value: "This is the second sentence.",
      explanations: [
        { text: "Explanation 1 for sentence 1.", info: "Posted by John Doe" },
      { text: "Explanation 2 for sentence 1.", info: "Posted on Jan 5, 2025" },
      ],
    },
  ];
  
const SentenceDetails = () => {
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [sentenceswithhindi,setsentenceswithhindi]= useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSentence, setCurrentSentence] = useState({});
  const [newExplanation, setNewExplanation] = useState({ hindi: '', hindiexplain: '' });
  const[dialogTitleText, setDialogTitleText]= useState({});

   const{
      selectedChapter
    } = useContext(LayoutPageContext);
  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLike = (sentenceIndex, explanationIndex) => {
    console.log(`Liked explanation ${explanationIndex} of sentence ${sentenceIndex}`);
    // Add your logic here
  };

  const handleReport = (sentenceIndex, explanationIndex) => {
    console.log(`Reported explanation ${explanationIndex} of sentence ${sentenceIndex}`);
    // Add your logic here
  };
  const handleAddExplanation = ({value,uuid}) => {
    setCurrentSentence( {value,uuid});
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentSentence({});
    
    setDialogTitleText({});
    setNewExplanation({ hindi: '', hindiexplain: '' });
  };

  const handleSaveExplanation = async() => {
    console.log(`Saving explanation for sentence ${currentSentence}:`,currentSentence, newExplanation);
    try{
      const sentencesResponse= await axios.post(`${BASE_API_URL}/user/addhindi`,
        {englishSentenceId:currentSentence.uuid,
          hindi:newExplanation.hindi,
          hindiExplain:newExplanation.hindiexplain
        },
        {withCredentials:true});
      
        
       
        setDialogTitleText({message:"Saved Successfully",color:"blue"})
        setTimeout(function() {
          setDialogTitleText({});
      }, 4000);
            
    }
    catch(err){
      setDialogTitleText({message:err.response.data.message,color:"red"})
       
      console.log("hindi Sentences fetch api failed",err.response.data.message);
      setTimeout(function() {
        setDialogTitleText({});
    }, 4000);
    }

    // Add logic to save the explanation
    //handleDialogClose();
  };

  useEffect(()=>{

    console.log("calledcssd",selectedChapter);
    const fetchChapter= async()=>{
      try{
        const sentencesResponse= await axios.get(`${BASE_API_URL}/user/gethindibook?chapterId=${selectedChapter.chapter_id}`,{withCredentials:true});
        

        if(sentencesResponse.status!==200)
        {
          throw new Error("Api request failed");
        }
        //const data = await sentencesResponse.json();
              console.log("api cll data hindi book sentences",sentencesResponse.data.data);
             // setDropdownData(data.data)
             //setChapterSentences(sentencesResponse.data.data);
             setsentenceswithhindi(sentencesResponse.data.data);
      }
      catch(err){
        console.log("hindi Sentences fetch api failed",err)
      }
    
    }
    if(selectedChapter && selectedChapter.chapter_id)
    {
      console.log("called functin fetchchpter",selectedChapter);
      fetchChapter();
    }
    

  },[selectedChapter])

  return (
<>
    <Typography variant="body1" component="div" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
      {chapterSentences.map((sentence, index) => (
       // <Box key={index} sx={{ marginBottom: 2 }}> //this box separating each sentence in new line 
          <span style={{ display: 'inline' }}>
            {sentence.value}{' '}
            <IconButton
              onClick={() => toggleExpand(index)}
              size="small"
              aria-label="expand"
              color="info"
              sx={{
                fontSize: 'inherit',
                padding: 0,
                marginLeft: 0,
                verticalAlign: 'middle',
              }}
            >
              <ExpandMoreOutlinedIcon
                fontSize="inherit"
                sx={{
                  transform: expandedIndexes[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
          
          <Collapse in={expandedIndexes[index]} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginTop: 1,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: '#f9f9f9',
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {sentence.explanations.map((detail, detailIndex) => (
                <Box
                  key={detailIndex}
                  sx={{
                    marginBottom: 2,
                    padding: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                  }}
                >
                    <Box
                    sx={{
                      paddingBottom: 1,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {detail.text}
                    </Typography>
                  </Box>

                   {/* Lower Part: Additional Info and Buttons */}
                   <Box
                    sx={{
                      marginTop: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {detail.info} {/* Additional info */}
                    </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {detail}
                  </Typography> */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Like">
                    <IconButton
                      onClick={() => handleLike(index, detailIndex)}
                      color="primary"
                      size="small"
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Report">
                    <IconButton
                      onClick={() => handleReport(index, detailIndex)}
                      color="error"
                      size="small"
                    >
                      <FlagOutlinedIcon fontSize="small" />
                    </IconButton></Tooltip>
                  </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Collapse></span>
       // </Box>
      ))}
    </Typography>






    <Typography variant="body1" component="div" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
      {sentenceswithhindi&&sentenceswithhindi.map((sentence, index) => (
       // <Box key={index} sx={{ marginBottom: 2 }}> //this box separating each sentence in new line 
          <span style={{ display: 'inline' }}>
            {sentence.value}{' '}
            <IconButton
              onClick={() => toggleExpand(index)}
              size="small"
              aria-label="expand"
              color="info"
              sx={{
                fontSize: 'inherit',
                padding: 0,
                marginLeft: 0,
                verticalAlign: 'middle',
              }}
            >
              <ExpandMoreOutlinedIcon
                fontSize="inherit"
                sx={{
                  transform: expandedIndexes[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
            {expandedIndexes[index] && (
              <IconButton
                onClick={() =>handleAddExplanation({value:sentence.value,uuid:sentence.uuid})}
                size="small"
                aria-label="add explanation"
                color="success"
                sx={{
                  fontSize: 'inherit',
                  padding: 0,
                  marginLeft: 1,
                  verticalAlign: 'middle',
                }}
              >
                <AddOutlinedIcon fontSize="inherit" />
              </IconButton>
            )}
          
          <Collapse in={expandedIndexes[index]} timeout="auto" unmountOnExit>
            <Box
              sx={{
                marginTop: 1,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
                backgroundColor: '#f9f9f9',
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {sentence.translates.map((detail, detailIndex) => (
                <Box
                  key={detailIndex}
                  sx={{
                    marginBottom: 2,
                    padding: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                  }}
                >
                    <Box
                    sx={{
                      paddingBottom: 1,
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {detail.hindi}
                    </Typography>
                  </Box>

                   {/* Lower Part: Additional Info and Buttons */}
                   <Box
                    sx={{
                      marginTop: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {detail.hindiExplain} {/* Additional info */}
                    </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {detail}
                  </Typography> */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Like">
                    <IconButton
                      onClick={() => handleLike(index, detailIndex)}
                      color="primary"
                      size="small"
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Report">
                    <IconButton
                      onClick={() => handleReport(index, detailIndex)}
                      color="error"
                      size="small"
                    >
                      <FlagOutlinedIcon fontSize="small" />
                    </IconButton></Tooltip>
                    <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleReport(index, detailIndex)}
                      color="error"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton></Tooltip>
                  </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Collapse></span>
       // </Box>
      ))}
     <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        
        {Object.keys(dialogTitleText).length !== 0?(<DialogTitle sx={{ color: `${dialogTitleText.color}` }}>
        {  dialogTitleText.message } 
        
        </DialogTitle>):<DialogTitle sx={{ color: 'blue' }} >
        { currentSentence.value}
        
        </DialogTitle>}
        <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        <DialogContent dividers>
          <TextField
            label="Hindi"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={2}
            maxRows={6}
            value={newExplanation.hindi}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindi: e.target.value }))
            }
            sx={{ resize: 'vertical' }}
          />
          <TextField
            label="Hindi Explanation"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            maxRows={10}
            value={newExplanation.hindiexplain}
            onChange={(e) =>
              setNewExplanation((prev) => ({ ...prev, hindiexplain: e.target.value }))
            }
            sx={{ resize: 'vertical' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveExplanation} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Typography>


    </>
  );
};

export default SentenceDetails;

