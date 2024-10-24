import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import Chatapp from "../components/chatApp";


const Home = () => {
  return (
    <>
    
      <div className="w-full h-full mt-32">
        <div className="flex flex-col items-center mx-auto mt-3">
          <div>
            <TypingAnim />
          </div>

          {/* Images Section */}
          <div className="w-full flex flex-col md:flex-row gap-5 my-10 items-center">
            <img
              src="robot.png"
              alt="robot"
              className="w-80 mx-auto"
            />
            <img
          
              src="openai.png"
              alt="openai"
              className="w-64 mx-auto transform"
            />
          </div>

          {/* Chatbot Image Section */}
          <div className="flex mx-auto">
            <img
              src="new-chat.png"
              alt="chatbot"
              className="flex mx-auto w-4/5 md:w-3/5 rounded-lg mt-5 mb-5 p-2"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
