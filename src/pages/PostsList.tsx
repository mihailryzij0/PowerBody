import React, { useEffect, useState } from "react";
import Card from "../components/card/Card";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Fab, ImageList, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SkeletonPostList from "../components/Skeleton/SkeletonPostList";
import { getPostCards } from "../store/slices/cardsSlice";

export default function PostsList() {
  const dispach = useAppDispatch();
  useEffect(() => {
    dispach(getPostCards());
  }, []);

  const { postCards, status } = useAppSelector((state) => state.cards);
  const { isAdmin } = useAppSelector((state) => state.userData);
  const { vitamins, workouts } = postCards;
  const navigate = useNavigate();
  const [valueTabs, setValueTabs] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTabs(newValue);
  };

  return (
    <div className="container">
      <Box sx={{ position: "relative" }}>
        <TabContext value={valueTabs}>
          <Box>
            <TabList centered onChange={handleChange}>
              <Tab label="Тренировки" value="1" />
              <Tab label="Витамины" value="2" />
            </TabList>
          </Box>
          {status === "pending" ? (
            <SkeletonPostList />
          ) : (
            <ImageList cols={1} rowHeight={164}>
              <TabPanel sx={{ padding: 0 }} value="1">
                {workouts?.map((post) => (
                  <Link
                    data-testid="cards-1-list"
                    key={post.id}
                    to={`/posts/${Number(post.id)}`}
                  >
                    <Card {...post}></Card>
                  </Link>
                ))}
              </TabPanel>
              <TabPanel sx={{ padding: 0 }} value="2">
                {vitamins?.map((post) => (
                  <Link
                    data-testid="cards-2-list"
                    key={post.id}
                    to={`/posts/${Number(post.id)}`}
                  >
                    <Card {...post}></Card>
                  </Link>
                ))}
              </TabPanel>
            </ImageList>
          )}
        </TabContext>
        {isAdmin && (
          <Fab
            color="secondary"
            sx={{ position: "fixed", bottom: "15%", right: "20px" }}
            onClick={() => navigate("/addWorkout")}
          >
            <AddIcon />
          </Fab>
        )}
      </Box>
    </div>
  );
}
