import { useEffect, useState } from "react";
import { profile } from "../data/content";

function useLocalTime(timeZone) {
  const fmt = () => new Date().toLocaleTimeString("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useLocalTime(profile.timeZone);
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>It's {time} in Chennai</span>
        <a href="#top" className="link">Back to top</a>
      </div>
    </footer>
  );
}
