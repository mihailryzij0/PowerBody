import { List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getPostData } from "../store/slices/postSlice";

export default function Singlepage() {
  const { id } = useParams();
  const [urls, setUrl] = useState("");
  const dispach = useAppDispatch();
  useEffect(() => {
    dispach(getPostData(id));
  }, []);
  const { description } = useAppSelector((state) => state.post.postData);

  return (
    <div>
      <div>{description}</div>
      {/* <List>
               { clirPost[0].workout[0].workoutItems?.map((el, i)=>(
                <ListItem key={clirPost[0].idPost} >
                <ListItemText
                  primary="sdvsdv"
                  secondary={el}
                />
                </ListItem>
               ))     
                }
            </List> */}
      <Header />
    </div>
  );
}
