import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { div, li } from "motion/react-client";

// ვიცი ცუდი პრაქტიკაა უბრალოდ ვჩქარობდი ყველა დავალება
// რომ მომესწროდა აღარ გავიტანე ცალკე კომპონენტებად ბარემ
// ერთიანად დავწერე

const App = () => {
  const headerElems = ["Home", "About", "Portfolio", "Cotact us"];
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ScrollingFunc = () => {
      sectionRefs.current.forEach((ref, i) => {
        const rect = ref.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(headerElems[i]);
        }
      });
    };
    window.addEventListener("scroll", ScrollingFunc);
    return () => window.removeEventListener("scroll", ScrollingFunc);
  }, [headerElems]);

  const handleSubmit = () => {
    setIsOpen(false);
    setTimeout(() => {
      alert("Form is successfully submitted!");
    }, 250);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      {/* Header */}
      <header className="w-[100%] h-[80px] flex items-center justify-center bg-black/80 sticky top-0 z-50">
        <ul className="flex gap-[20px]">
          {headerElems.map((elem) => (
            <li
              key={elem}
              className={`capitalize px-4 py-2 transition-all duration-300 cursor-pointer ${
                activeSection === elem
                  ? "text-teal-400 border-b-2 border-teal-400"
                  : "text-gray-300"
              }`}
            >
              {elem}
            </li>
          ))}
        </ul>
      </header>
      {/* Section */}
      {headerElems.map((elem, i) => (
        <motion.div
          key={elem}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="flex flex-col items-center justify-center h-screen text-center gap-[20px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[35px] font-bold">{elem}</h1>
          <button
            className="bg-teal-400 hover:bg-teal-500 text-black px-6 py-2 rounded-lg transition-all"
            onClick={() => setIsOpen(true)}
          >
            Click to open PopUp!
          </button>
        </motion.div>
      ))}
      {/* PopUp */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <motion.div
            className="bg-white text-black p-8 rounded-lg shadow-xl w-80 flex flex-col gap-[20px]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-center text-[24px]">Contact Us!</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-[5px]"
            >
              <label for="name" className="cursor-pointer">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="border border-grey rounded-md mb-[5px] p-[5px]"
              />
              <label for="email" className="cursor-pointer">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="border border-grey rounded-md mb-[5px] p-[5px]"
              />
              <label for="message" className="cursor-pointer">
                Message:
              </label>
              <input
                type="text"
                id="message"
                className="border border-grey rounded-md p-[5px]"
              />
            </form>
            <div className="flex justify-between">
              <button
                className="bg-teal-400 hover:bg-teal-500 text-black px-6 py-2 rounded-lg transition-all "
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-teal-400 hover:bg-teal-500 text-black px-6 py-2 rounded-lg transition-all "
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
