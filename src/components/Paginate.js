import { useState, useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import Content from "./Content";
import Subheading from "./Subheading";

export default function Paginate() {
  const { fullList, pageSizeList } = useAppContext();
  const [pageNo, setPageNo] = useState(1);
  const [pagesList, setPagesList] = useState();
  const [pageSize, setPageSize] = useState(pageSizeList[0]);
  const [curList, setCurList] = useState();

  useEffect(() => {
    if (fullList) setCurList(fullList);
  }, [fullList]);

  useEffect(() => {
    if (!curList) return;
    console.log(curList[0]);
    let newList = [];
    for (let i = 1; i <= Math.ceil(curList.length / pageSize); i++)
      newList.push(i);
    setPagesList(newList);
  }, [curList, pageSize]);

  return (
    <>
      <Subheading
        setPageSize={setPageSize}
        curList={curList}
        pagesList={pagesList}
        setCurList={setCurList}
        setPagesList={setPagesList}
        setPageNo={setPageNo}
      />
      <div className="content">
        {curList ? (
          <Content
            list={curList.slice(pageSize * (pageNo - 1), pageSize * pageNo)}
          />
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}
