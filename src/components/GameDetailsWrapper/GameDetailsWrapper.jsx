import { useParams } from "react-router";
import GameDetails from "../GameDetails/GameDetails";

export const GameDetailsWrapper = () => {
  const { id } = useParams();
  return <GameDetails key={id} />;
};
