import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`to-top ${visible ? "show" : ""}`}
      onClick={goTop}
      aria-label="Move to top"
    >
      <FaArrowUp />
    </button>
  );
}

export default BackToTopButton;
