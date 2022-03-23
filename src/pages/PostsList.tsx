import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Cards from "../components/cards/Cards";
import { getPostCards } from "../store/slices/cardsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CircularProgress, Tab } from "@mui/material";
export default function PostsList() {
  const dispach = useAppDispatch();
  useEffect(() => {
    dispach(getPostCards());
  }, []);
  const { postCards, status, error } = useAppSelector((state) => state.cards);
  const { vitamins, workouts } = postCards;

  const [valueTabs, setValueTabs] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTabs(newValue);
  };

  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <TabContext value={valueTabs}>
          <Box>
            <TabList centered onChange={handleChange}>
              <Tab label="Тренировки" value="1" />
              <Tab label="Анаболики" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {workouts?.map((post) => (
              <Link key={post.id} to={`/posts/${Number(post.id)}`}>
                <Cards postData={post}></Cards>
              </Link>
            ))}
          </TabPanel>
          <TabPanel value="2">
            {vitamins?.map((post) => (
              <Link key={post.id} to={`/posts/${Number(post.id)}`}>
                <Cards postData={post}></Cards>
              </Link>
            ))}
          </TabPanel>
        </TabContext>
        {status === "pending" && <CircularProgress color="secondary" />}
      </Box>
      <Header></Header>
    </div>
  );
}
