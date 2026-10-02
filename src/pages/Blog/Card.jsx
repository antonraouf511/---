import GridCard from "./GridCard";
import ListCard from "./ListCard";

export default function Card({ viewMode, ...postData }) {
  return viewMode === "list" ? <ListCard {...postData} /> : <GridCard {...postData} />;
}