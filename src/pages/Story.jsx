import FadeSection from "../components/FadeSection";
import Day7 from "../components/Day7";
import { story } from "../data/story";
import dayjs from "dayjs";

export default function Story() {
  const today = dayjs().date();

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      {story
        .filter(s => s.day <= today)
        .map((s, i) => {
          if (s.day === 7 && s.shayaris) {
            return <Day7 key={i} shayariData={s} />;
          }
          return (
            <FadeSection 
              key={i} 
              text={s.text} 
              image={s.image}
            />
          );
        })}
    </div>
  );
}
