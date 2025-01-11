import {useEffect,useRef,createContext,useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box,Stack} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import Avatar from '@mui/material/Avatar';
import {loggedIn,notLoggedIn} from '../../redux/login/loginSlice';
import { useSelector,useDispatch } from 'react-redux';
import { BASE_API_URL } from '../../constants'; 
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import {MenuItem ,
  Menu,Fade 
}
  from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
 
 
import Tooltip from '@mui/material/Tooltip';
import LoginPopup from './loginpopup'; 
 
  
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })((
  { theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: theme.spacing(8),
    variants: [
      {
        props: { open: true },
        style: {
          marginLeft:0,
        },
      },
    ],
  }),
);



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export const LayoutPageContext=createContext();
export default function PersistentDrawerLeft({children}) {

 

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [dropdownData,setDropdownData]= useState([]);
  const [standards,setStandards]=useState([]);
  const [subjects,setSubjects]= useState([]);
  const[books,setBooks]=useState([]);
  const [chapters,setChapters]=useState([]);
  const [selectedStandard,setSelectedStandard]=useState(null);
  const[selectedSubject,setSelectedSubject]=useState(null);
  const[selectedBook,setSelectedBook]=useState(null);
  const[selectedChapter,setSelectedChapter]=useState(null);
  const [userMenuPopup,setuserMenuPopup]= useState(null);

 

  const loginState = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("layout componn rendering");
  
  })

  useEffect(()=>{
    const fetchLogin = async () => {
      try {
        
        
        const profile=await axios.get(`${BASE_API_URL}/user/getprofile` ,{withCredentials:true});
        if (profile.status === 200 ) {
          dispatch(loggedIn(profile.data.userDetails));

        }
        else {
        dispatch(notLoggedIn());
        }
      } catch (err) {
        

      }
    }
    fetchLogin();
  
  },[])

  const handleuserMenuPopup=(event)=>{
    setuserMenuPopup(event.currentTarget)
  }
  const handleCloseuserMenuPopup=()=>{
    setuserMenuPopup(null);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // Here you can implement additional logic to apply the dark theme
  };
  const getProfile=async()=>{
    try{
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/getprofile`,
        {
          method:"GET",
          credentials:"include",
          headers:{
            "Content-type":"application/json",
          },
        }
      );
      if(profileResponse.ok){
        const data= await profileResponse.json();
        console.log("presponsedata",data)
      }

    }catch(error){
      console.log("error on fetching proifile");
    }
  }
  //function to handle stndrd change
  const handleStandardChange=(e)=>
               {
                        const selectedClass=e.target.value;
                        console.log("selecclass",selectedClass)
                        const newSlectedClass= dropdownData.find(
                          (standard)=>standard.standard_name===selectedClass
                        );
                        setSelectedStandard({...newSlectedClass});
                        setSelectedSubject(null);
                        setSelectedBook(null);
                        setSelectedChapter(null);
                        setChapters([]);
                }

  const handleSubjectChange=(e)=>
                      {
                      const selectedSubject=e.target.value;
                      console.log("selec subject  ,,,",selectedSubject)
                      const newSlectedSubject= selectedStandard?.subjects?.find(
                        (subject)=>subject.subject_id===selectedSubject
                      );
                      console.log("selec subject in function",newSlectedSubject);
                      setSelectedSubject({...newSlectedSubject});
                      setSelectedBook({});
                      setSelectedChapter(null);
                    
                    }

  const handleBookChange=(e)=>
                    {
                    const selectedBook=e.target.value;
                    console.log("selec book",selectedBook)
                    const newSlectedBook= selectedSubject?.books?.find(
                      (book)=>book.book_name===selectedBook
                    );
                    setSelectedBook({...newSlectedBook});
                    setSelectedChapter(null);
                    
                  
                  }
  const handleChapterChange=(e)=>
                {
                const selectedChapter=e.target.value;
                
                const newSlectedChapter= chapters.find(
                  (chapter)=>chapter.chapter_name===selectedChapter
                );
                setSelectedChapter({...newSlectedChapter});
              
              }

  
              const logout = async(e) => {
                try {
                  const res = await axios.get(`${BASE_API_URL}/auth/logout`,  { withCredentials: true });
                  
                  if (res.status === 200)
                  {
                    //console.log("Successfully logged out");
                    // failure()
                    dispatch(notLoggedIn());
                    handleCloseuserMenuPopup();
                  
                  }
                  else {
                    console.log("Unsuccessfull logout");
                  }
                }
                catch (err) {
                  console.log("Error While Logging Out . please try again");
                }
              }

  useEffect(()=>{
      const fetchDropdownOptions= async()=>{
        try{

            const response= await axios.get(`${BASE_API_URL}/user/getDropdownOptions`,{withCredentials:true});
            if(response.status===200)
            {
                console.log("dropdown response ",response.data.data);
                setDropdownData(response.data.data)
            }
            else {
                throw new Error("Response not ok ");
            }
           
               

        }
        catch(err){
          console.log("Standarrrrrd fetch api failed",err)
        }
      
      }
      fetchDropdownOptions();
  },[]);
useEffect(()=>{
  const fetchChapters= async()=>{
                  try{
                    if(selectedBook.book_id)
                      {
                            

                     const chapterresponse = await axios.post(`${BASE_API_URL}/user/getChapters`,{ book_id:selectedBook.book_id} ,{withCredentials:true} );

                    if(chapterresponse.status!==200)
                    {
                      throw new Error("Api request failed");
                    }
                     
                          console.log(chapterresponse.data.data);
                          setChapters(chapterresponse.data.data)
                  }
                  }
                  catch(err){
                    console.log("chpters fetch api failed",err)
                  }
  
  }
  fetchChapters();
},[selectedBook?.book_id]);


  return (
    <LayoutPageContext.Provider
    value={{
      selectedChapter
    }}
    >
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={false}  >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dictionary
          </Typography>
          <Stack direction="column" sx={{flexGrow:1}}></Stack>
           
           
          <div className='header-dropdown-container' sx={{color:"white"}}>
          <FormControl sx={{m:1,minWidth:135}} size='small'>
        <InputLabel 
       
         sx={{
          color:"white",
          "&.Mui-focused":{color:"white"},
          fontSize:"0.8rem",
         }}
          id="demo-select-small-label-name"
        // shrink={selectedStandard?.standard_name?true:false}
        >Class</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          sx={{
            color:"white",
            "& .MuiOutlinedInput-notchedOutline":{
              borderColor:"grey"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
              borderColor:"black",
            },
            fontSize:"0.8rem",
          }}
          value={selectedStandard?.standard_name}
          label="Class"
         onChange={(e)=>handleStandardChange(e)}
        >
          <MenuItem
          value=""
          disabled
          style={{fontSize:"0.8rem",height:"0.5rem"}}
          >
          <em>Select Class</em>
          </MenuItem>
          {dropdownData&&
            dropdownData.map(standard=>
              <MenuItem value={standard.standard_name}>{standard.standard_name}</MenuItem>
            )
          }
           
        </Select>
      </FormControl>
      <FormControl sx={{m:1,minWidth:135}} size='small'>
        <InputLabel 
       
       sx={{
        color:"white",
        "&.Mui-focused":{color:"white"},
        fontSize:"0.8rem",
       }}
        id="demo-select-small-label-name"
           
         // shrink={true}
         //shrink={Boolean(selectedSubject?.subject_name)}
        >Subject</InputLabel>
        <Select
         labelId="demo-select-small-label"
         id="demo-select-small"
         sx={{
           color:"white",
           "& .MuiOutlinedInput-notchedOutline":{
             borderColor:"grey"
           },
           "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
             borderColor:"black",
           },
           fontSize:"0.8rem",
         }}
         
          value={selectedStandard?selectedSubject?selectedSubject.subject_id:"":""}
          label="Subject"
         onChange={(e)=>handleSubjectChange(e)}
        >
          <MenuItem
          value=""
          disabled
          style={{fontSize:"0.8rem",height:"0.5rem"}}
          >
          <em>Select Subject</em>
          </MenuItem>
          {selectedStandard&&
            selectedStandard.subjects?.map(subject=>
              <MenuItem value={subject.subject_id}>{subject.subject_name}</MenuItem>
            )
          }
           
        </Select>
      </FormControl>
      <FormControl sx={{m:1,minWidth:135}} size='small'>
        <InputLabel 
       
         sx={{
          color:"white",
          "&.Mui-focused":{color:"white"},
          fontSize:"0.8rem",
         }}
          id="demo-select-small-label-name"
        // shrink={selectedBook?.book_name?true:false}
        >Book</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          sx={{
            color:"white",
            "& .MuiOutlinedInput-notchedOutline":{
              borderColor:"grey"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
              borderColor:"black",
            },
            fontSize:"0.8rem",
          }}
          value={selectedStandard?selectedBook?.book_name:""}
          label="Class"
         onChange={(e)=>handleBookChange(e)}
        >
          <MenuItem
          value=""
          disabled
          style={{fontSize:"0.8rem",height:"0.5rem"}}
          >
          <em>Select Book</em>
          </MenuItem>
          {selectedSubject&&
            selectedSubject?.books?.map(book=>
              <MenuItem value={book.book_name}>{book.book_name}</MenuItem>
            )
          }
           
        </Select>
      </FormControl>
      <FormControl sx={{m:1,minWidth:135}} size='small'>
        <InputLabel 
       
         sx={{
          color:"white",
          "&.Mui-focused":{color:"white"},
          fontSize:"0.8rem",
         }}
          id="demo-select-small-label-name"
        // shrink={chapters?selectedChapter?.chapter_name?true:false}
        >Chapter</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          sx={{
            color:"white",
            "& .MuiOutlinedInput-notchedOutline":{
              borderColor:"grey"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
              borderColor:"black",
            },
            fontSize:"0.8rem",
          }}
          value={chapters?selectedChapter?.chapter_name:""}
          label="Class"
         onChange={(e)=>handleChapterChange(e)}
        >
          <MenuItem
          value=""
          disabled
          style={{fontSize:"0.8rem",height:"0.5rem"}}
          >
          <em>Select Chapter</em>
          </MenuItem>
          {chapters&&
            chapters.map(chapter=>
              <MenuItem value={chapter.chapter_name}>{chapter.chapter_name}</MenuItem>
            )
          }
           
        </Select>
      </FormControl>
      </div>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {
            !loginState.status?
            <Tooltip title="Please Login">
             <IconButton color="inherit" onClick={toggleLogin}>
            <Avatar alt="profile"></Avatar>
          </IconButton>  </Tooltip>  : 
          <Tooltip title={loginState?.user?.name}>
          <IconButton color="inherit" onClick={handleuserMenuPopup}>
            <Avatar alt={loginState?.user?.name}
             sx={{ bgcolor: 'primary.main'  }}
            >
            {loginState?.user?.name ? loginState.user.name.charAt(0).toUpperCase() : ''}
            </Avatar>
          </IconButton>
          </Tooltip>
          
          }
           <Menu
           sx={{mt:"45px"}}
           id="fade-menu"
           MenuListProps={{
          'aria-labelledby': 'fade-button',

        }}
        anchorEl={userMenuPopup}
        open={Boolean(userMenuPopup)}
        onClose={handleCloseuserMenuPopup}
        //TransitionComponent={Fade}
        anchorOrigin={{vertical:"top",horizontal:"right"}}
      >
        <MenuItem onClick={getProfile}>Profile</MenuItem>
        <MenuItem onClick={handleCloseuserMenuPopup}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

           
           

        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: open?drawerWidth:'0px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor:"primary.dark",
            color:"white",
           // position: 'relative', using this it s
            overflowY:"hidden"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
      <LoginPopup toggleLogin={toggleLogin} showLogin={showLogin} />
        {children}
      </Main>
     
     
    </Box>
    </LayoutPageContext.Provider>
  );
}
