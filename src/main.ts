import { starRatingFeedback } from "./components/starRatingFeedback";
import "./styles/style.scss";

const app = <HTMLDivElement>document.querySelector("#app");
const div = document.createElement("div");

div.style.display = "flex";
div.style.flexDirection = "column";
div.style.alignItems = "center";
div.style.gap = "16px";
app.appendChild(div);

new starRatingFeedback({
  title: "What is your opinion about the application?",
  element: div,
  icon: "star",
  maxCount: 5,
});

new starRatingFeedback({
  title: "What is your opinion about the design?",
  element: div,
  icon: "star",
  maxCount: 5,
});

new starRatingFeedback({
  title: "What is your opinion about the application functionalities?",
  element: div,
  icon: "star",
  maxCount: 5,
});
