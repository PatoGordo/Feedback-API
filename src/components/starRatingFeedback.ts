import { GenerateId } from "../utils/generateId";

interface IStarRatingFeedback {
  title: string;
  element: HTMLElement;
  maxCount: number;
  icon: "star" | "heart";
}

export class starRatingFeedback {
  public title: string;
  public element: HTMLElement;
  public maxCount: number;
  public icon: "star" | "heart";
  public surveyId: string;
  private starsDiv: HTMLDivElement;
  private submitButton: HTMLButtonElement;
  private feedbackSurveyTitle: HTMLHeadingElement;
  private feedbackContainer: HTMLDivElement;
  private feedbackScreen: HTMLDivElement;
  private afterFeedbackScreen: HTMLDivElement;
  private stars: HTMLElement[];

  constructor({ title, element, maxCount, icon }: IStarRatingFeedback) {
    this.title = title;
    this.element = element;
    this.maxCount = maxCount;
    this.icon = icon;

    this.surveyId = `DKSR_${GenerateId(8)}`;
    this.stars = [];
    this.starsDiv = document.createElement("div");
    this.submitButton = document.createElement("button");
    this.feedbackSurveyTitle = document.createElement("h2");
    this.feedbackContainer = document.createElement("div");
    this.feedbackScreen = document.createElement("div");
    this.afterFeedbackScreen = document.createElement("div");

    this.render();
    this.submit();
  }

  private render() {
    this.feedbackSurveyTitle.appendChild(document.createTextNode(this.title));
    this.submitButton.appendChild(document.createTextNode("Submit Feedback"));

    for (let i = 0; i < this.maxCount; i++) {
      const star = document.createElement("span");
      star.classList.add("fa");
      star.classList.add(`fa-${this.icon}`);

      if (i === 0) {
        star.classList.add("checked");
      }

      star.addEventListener("click", () => {
        this.clickedAtStar(star);

        star.classList.add("checked");
      });

      this.stars.push(star);
    }

    this.stars.forEach((star) => {
      this.starsDiv.appendChild(star);
    });

    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Close"));
    button.addEventListener("click", () => {
      this.feedbackScreen.style.display = "none";
    });
    h2.appendChild(document.createTextNode("Thank you for your feedback!"));

    this.feedbackContainer.appendChild(this.feedbackSurveyTitle);
    this.feedbackContainer.appendChild(this.starsDiv);
    this.feedbackContainer.appendChild(this.submitButton);
    this.feedbackScreen.id = this.surveyId;
    this.feedbackScreen.appendChild(this.feedbackContainer);
    this.feedbackScreen.appendChild(this.afterFeedbackScreen);
    this.feedbackScreen.appendChild(this.feedbackContainer);
    this.afterFeedbackScreen.appendChild(h2);
    this.afterFeedbackScreen.appendChild(button);
    this.afterFeedbackScreen.style.display = "none";
    this.feedbackScreen.classList.add("dks-star-rating");
    this.element.appendChild(this.feedbackScreen);
  }

  private clickedAtStar(star: HTMLElement) {
    const item = this.stars.indexOf(star);

    const allItemsBeforeStar = item > -1 ? this.stars.slice(0, item) : [];
    const allItemsAfterStar = this.stars.slice(item + 1);

    allItemsAfterStar.forEach((item) => {
      item.classList.remove("checked");
    });

    allItemsBeforeStar.forEach((item) => {
      item.classList.add("checked");
    });
  }

  private submit() {
    this.submitButton.addEventListener("click", () => {
      let starFeedbackCount = 0;

      this.stars.map((star) => {
        if (star.className === "fa fa-star checked") {
          starFeedbackCount++;
        }
      });

      console.log(starFeedbackCount);
      this.feedbackContainer.style.display = "none";
      this.afterFeedbackScreen.style.display = "flex";
    });
  }
}
