import React, { useEffect, useState } from "react";
import {Pagination} from "@nextui-org/react";
import rowLeft from "../../img/rowLeft.png"
import rowRight from "../../img/rowRight.png"

export default function PaginationTable({firstNumberToSliceData, secondNumberToSliceData}) { 
 
 
  const [actualPage, setActualPage] = useState(1)

  const changePageToNext = () => { 
    if(actualPage === 1) { 
      setActualPage(actualPage + 1)
      firstNumberToSliceData(10)
      secondNumberToSliceData(20)
    } else if(actualPage === 5) { 
      setActualPage(actualPage)
    }  
  }

  const changePageToBack = () => { 
    if(actualPage === 0) { 
      setActualPage(actualPage)
    }  else if (actualPage === 2) { 
      firstNumberToSliceData(0)
      secondNumberToSliceData(10)
      setActualPage(actualPage - 1)
      console.log("skdbiuo")
    }
  }

  useEffect(() => { 
    console.log(actualPage)
  }, [actualPage])

  return (
    <div className="join">
      <button className="border border-none focus:outline-none hover:border-none bg-white text-black" onClick={() => changePageToBack()}>«</button>
      <button className="border border-none hover:bg-white bg-white text-black">{actualPage}</button>
      <button className="border border-none focus:outline-none bg-white text-black" onClick={() => changePageToNext()}>»</button>
  </div>
  );
}
