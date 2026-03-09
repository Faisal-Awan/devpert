import { useEffect, useRef, useState } from "react";

function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let value = 0;
    const increment = Math.max(1, Math.floor(target / 70));
    const timer = setInterval(() => {
      value += increment;
      if (value >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(value);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div className="stat" ref={ref}>
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  );
}

export default Counter;
