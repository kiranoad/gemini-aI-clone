
import { createContext, useState } from "react";
import runChart from "../comfig/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt,setProvPrompt] = useState ([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,SetResultData] = useState("");
    

      const delayPara =(index, nextWord ) =>{
          setTimeout(function name(params) {
            SetResultData(prev =>prev+nextWord)
          },75*index)
      }

      const newChat = () =>{
        setLoading(false)
        setShowResult(false)
      }

     const onSent = async(prompt) => {
      SetResultData("");
      setLoading(true);
      setShowResult(true);
      let response;
      if(prompt !== undefined){
          response = await runChart(prompt);
          setRecentPrompt(prompt);
      }
      else{
        setProvPrompt(prev =>[...prev,input])
        setRecentPrompt(input)
        response = await runChart(input)
      }
     
      let responseArray = response.split("**");
      let newResponse ="";
      for(let i= 0; i < responseArray.length; i++){
        if(i === 0 || i%2 !==1 ){
          newResponse += responseArray[i]
        }
        else{
          newResponse += "<b> " +responseArray[i]+"</b> ";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ");
       for(let i = 0; i< newResponseArray.length;i++){
           const nextWord = newResponseArray[i];
           delayPara(i,nextWord+" ")

       }
       setLoading(false);
       setInput("");
     }

    const contextValue = {
        prevPrompt,
        setProvPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat


    }
    return(
       <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    )
}
export default ContextProvider