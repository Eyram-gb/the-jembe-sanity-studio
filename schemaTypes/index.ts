import { category } from "./category";
import { homeQuiz } from "./homeQuiz";
import { caseStudySection } from "./caseStudySection";
import { categorySpotlight } from "./categorySpotlight";
import { pageSeo } from "./pageSeo";
import { post } from "./post";
import { quizCategory } from "./quizCategory";
import { quizPage } from "./quizPage";
import { quizProfile } from "./quizProfile";
import { quizQuestion } from "./quizQuestion";
import { quizReveal } from "./quizReveal";
import { seo } from "./seo";
import { stat } from "./stat";

export const schemaTypes = [
  seo,
  stat,
  caseStudySection,
  categorySpotlight,
  category,
  post,
  pageSeo,
  quizReveal,
  quizProfile,
  quizCategory,
  quizQuestion,
  quizPage,
  homeQuiz,
]
