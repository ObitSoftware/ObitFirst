import React, { useState } from "react";
import {Pagination} from "@nextui-org/react";
import rowLeft from "../../img/rowLeft.png"
import rowRight from "../../img/rowRight.png"

export default function PaginationTable() { 
 
 
  const [actualPage, setActualPage] = useState(1)

  const changePageToNext = () => { 
    if(actualPage === 5) { 
      setActualPage(actualPage)
    } else { 
      setActualPage(actualPage + 1)
    }
  }

  const changePageToBack = () => { 
    if(actualPage === 0) { 
      setActualPage(actualPage)
    } else { 
      setActualPage(actualPage - 1)
    }
   
  }

  return (
    <div className="join">
      <button className=" btn border border-none hover:bg-blue-400 hover:border-none" onClick={() => changePageToBack()}>«</button>
      <button className=" btn border border-none hover:bg-white">{actualPage}</button>
      <button className=" btn border border-none hover:bg-blue-400" onClick={() => changePageToNext()}>»</button>
  </div>
  );
}
