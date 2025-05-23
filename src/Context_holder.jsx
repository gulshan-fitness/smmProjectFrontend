import axios from "axios";
import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdDashboard,
  MdGridOn,
  MdFunctions,
  MdAdd,
  MdVisibility,
} from "react-icons/md";


const Context = createContext();

export default function Context_holder(props) {
  const [user, setuser] = useState(null);

  const [usertoken, setusertoken] = useState("");
  const [UserLoginPopUp, setUserLoginPopUp] = useState(false);

  const [admin, setadmin] = useState(null);

  const [adminToken, setadminToken] = useState("");

  const [UserSignUpPopUp, setUserSignUpPopUp] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [CrosswordPuzzle, setCrosswordPuzzle] = useState(null);
  const [AllCrosswordPuzzle, setAllCrosswordPuzzle] = useState(null);
  const [userGrid, setUserGrid] = useState([]);
  const [CrosswordPuzzleScore_id, setCrosswordPuzzleScore_id] = useState(null);
  const [CrosswordPuzzlePreviousScore, setCrosswordPuzzlePreviousScore] =
    useState(null);
  const [AllSudoko, setAllSudoko] = useState([]);
  const [Sudoko, setSudoko] = useState(null);

  const notify = (msg, status) => {
    toast(msg, {
      position: "top-right",
      type: status === 1 ? "success" : "error",
    });
  };

  const logout_handler = () => {
    localStorage.removeItem("user");

    setuser(null);
    localStorage.removeItem("usertoken");

    setusertoken("");
  };

  const CrosswordPuzzleFetch = (id, user_id) => {
    let api = `${import.meta.env.VITE_API_BASE_URL}${
      import.meta.env.VITE_CROSSWORDPUZZLE_URL
    }read`;

     if (id) {
      api += `/${id}`;
    }

     if(user_id){
          api += `/${user_id}`;
    }

    axios
      .get(api)

      .then((success) => {
        if (success.data.status == 1) {
          const data = success.data.Crosswordpuzzle;

          if (id) {
            setCrosswordPuzzle(data[0]);

            if (data[0].userScore) {
              setUserGrid(data[0].userScore.answersGrid || []);
              setCrosswordPuzzleScore_id(data[0].userScore._id);
              setCrosswordPuzzlePreviousScore(data[0].userScore.currentScore);
            } else {
              setUserGrid([]);
              setCrosswordPuzzleScore_id(null);
              setCrosswordPuzzlePreviousScore(null);
            }
          } else {
            setAllCrosswordPuzzle(data);
          }
        }
      })

      .catch((error) => {});
  };

  const SudokoFetch = (id, user_id) => {
   

    let api = `${import.meta.env.VITE_API_BASE_URL}${
      import.meta.env.VITE_SUDOKO_URL
    }read`;

    if (id) {
      api += `/${id}`;
    }
     if(user_id){
          api += `/${user_id}`;
    }

    axios
      .get(api)

      .then((success) => {
        if (success.data.status == 1) {
          const data = success.data.Sudoko;

          if (id) {
            setSudoko(data[0]);

           
          }

      
          else {
            setAllSudoko(data);
          }
        }
      })

      .catch((error) => {});
  };
  

 const menu_links = [
  {
    name: "Dashboard",
    url: "",
    icon: <MdDashboard className="text-xl"  />,
  },
  {
    name: "Crossword Puzzle",
    url: "",
    icon: <MdGridOn  className="text-xl" />,
    subitems: [
      { name: "Add", url: "crosswordpuzzle/add", icon: <MdAdd /> },
      { name: "View", url: "crosswordpuzzle/view", icon: <MdVisibility /> },
    ],
  },
  {
    name: "Sudoko",
    url: "",
    icon: <MdFunctions  className="text-xl" />,
    subitems: [
      { name: "Add", url: "sudoko/add", icon: <MdAdd /> },
      { name: "View", url: "sudoko/view", icon: <MdVisibility /> },
    ],
  },
];

  return (
    <Context.Provider
      value={{
        UserLoginPopUp,
        setUserLoginPopUp,
        UserSignUpPopUp,
        setUserSignUpPopUp,
        user,
        setuser,
        usertoken,
        setusertoken,
        notify,
        isMobileMenuOpen,
        setMobileMenuOpen,
        isScrolled,
        setIsScrolled,
        logout_handler,
        admin,
        setadmin,
        adminToken,
        setadminToken,
        menu_links,
        CrosswordPuzzle,
        setCrosswordPuzzle,
        CrosswordPuzzleFetch,
        userGrid,
        setUserGrid,
        CrosswordPuzzleScore_id,
        setCrosswordPuzzleScore_id,
        CrosswordPuzzlePreviousScore,
        setCrosswordPuzzlePreviousScore,
        AllCrosswordPuzzle,
        setAllCrosswordPuzzle,
        Sudoko,
        setSudoko,
        AllSudoko,
        setAllSudoko,
        SudokoFetch,
      }}
    >
      {props.children}

      <ToastContainer />
    </Context.Provider>
  );
}

export { Context };
