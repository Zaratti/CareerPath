import React,{useRef} from 'react'
import fullImage from "../assets/Arrow.png";
import subtractimage from "../assets/Subtract.png";
import { motion,useScroll,useSpring,useTransform } from 'framer-motion';


function Home() {
    const ref =useRef(null)
    const {scrollYProgress}=useScroll({
        target:ref,
        offset:["start start","end start"]
    })
    const scalex = useSpring(scrollYProgress);

    const backgroundy = useTransform(scrollYProgress,[0,1],["0%","100% "])
    const texty =useTransform(scrollYProgress,[0,1],["0%","200%"])
  return (
    <div
      ref={ref}
      style={{ scalex }}
      className="w-full gradient-overlay h-[100vh] overflow-hidden relative grid place-items-center bg-black"
    >
      <div className="blurred-ball ball1"></div>
      <div className="blurred-ball ball2"></div>
      <div className="blurred-ball ball3"></div>

      <motion.div
        style={{ y: texty }}
        className="  relative z-10 text-white h-[70vh] flex flex-col justify-between items-center "
      >
        <div className='text-center'>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-5xl md:text-9xl">
            A new medium for
          </h1>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-5xl md:text-9xl">
            Presenting Ideas.
          </h1>

          {/* <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  font-bold text-white text-7xl md:text-9xl "></h1> */}
        </div>
        <div className="font-[700] text-[rgb(104, 105, 209)] text-[15px] sm:text-[25px] ">
          <h2 className="text-4xl sm:text-6xl">Powered by AI.</h2>
        </div>
        <div className="font-[400] text-[rgb(104, 105, 209)] text-[20px] ">
          <p> Search  Tech Skill You Want To Learn About. </p>
          <p className="text-center">Tech Road Map. </p>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          //   backgroundImage: `url(${fullImage})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundy,
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          //   backgroundImage: `url(${subtractimage})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}

export default Home
