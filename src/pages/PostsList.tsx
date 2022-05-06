import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Fab, ImageList, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SkeletonPostList from "../components/Skeleton/SkeletonPostList";
import { filterCards, getPostCards } from "../store/slices/cardsSlice";
import Card from "../components/cards/Card";
import CardsFilter from "../components/cards/CardsFilter";

export default function PostsList() {
  const dispatch = useAppDispatch();
  const { filteredCards, status } = useAppSelector((state) => state.cards);
  const { vitamins, workouts } = filteredCards;

  useEffect(() => {
    if (vitamins === null && workouts === null) {
      const execute = async () => {
        await dispatch(getPostCards());
        dispatch(
          filterCards({
            author: "Весь список",
            typeWorkout: "Весь список",
          })
        );
      };
      execute();
    }
  }, []);

  const { isAdmin } = useAppSelector((state) => state.userData);

  const [valueTabs, setValueTabs] = useState("1");
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTabs(newValue);
  };

  return (
    <div className="cards container">
      <div className="cards__header"></div>
      <Box sx={{ position: "relative" }}>
        <TabContext value={valueTabs}>
          <Box>
            <TabList centered onChange={handleChange}>
              <Tab label="Тренировки" value="1" />
              <Tab label="Витамины" value="2" />
            </TabList>
          </Box>
          <CardsFilter />
          {status === "pending" ? (
            <SkeletonPostList />
          ) : (
            <ImageList cols={1} rowHeight={164}>
              <TabPanel sx={{ padding: 0 }} value="1">
                {filteredCards.workouts?.map((post) => (
                  <Link
                    data-testid="cards-1-list"
                    key={post.id}
                    to={`/posts/${post.id}`}
                  >
                    <Card {...post}></Card>
                  </Link>
                ))}
              </TabPanel>
              <TabPanel sx={{ padding: 0 }} value="2">
                {filteredCards.vitamins?.map((post) => (
                  <Link
                    data-testid="cards-2-list"
                    key={post.id}
                    to={`/posts/${post.id}`}
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
