import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [modal, setModal] = useState("");
  const [popover, setPopover] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fullname, setFullname] = useState("Faouzia");
  const [selectedData, setSelectedData] = useState("");

  const contextValue = {
    globalCtx: {
      modal,
      popover,
      errorMsg,
      isFetch,
      fullname,
      selectedData,
    },
    globalAct: {
      setModal,
      setPopover,
      setErrorMsg,
      setIsFetch,
      setFullname,
      setSelectedData,
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
