import './App.css';
import Navbar from './components/Navbar';
import Register from './auth/register';
import Login from './auth/login';
import { useState } from 'react';

function Home() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    return (
        <>
        <Navbar onOpenRegister={() => {setIsLoginOpen(false); setIsRegisterOpen(true)}}  onOpenLogin={() => {setIsRegisterOpen(false); setIsLoginOpen(true)}}/>
            <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        <div id="home" className="min-h-[693px] w-[100%] max-w-[1563px] bg-[url('background-4876988_1920.jpg')] bg-center bg-cover flex justify-center items-center mx-auto scroll-mt-20.5">
            <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-row items-center">
                <div className="w-full lg:w-1/2">
                    <h1 className="text-[30px] md:text-4xl text-white font-[600] pl-5 pr-5 pt-13">Bring up your creativity to another level of quantity</h1>
                    <h1 className="text-[28px] md:text-3x1 text-white font-inter pt-10 pl-5 pr-5">most of people using todo-list to reach whatever they want to, we bring freedom with some benefits to lack of democracy. for more time has been passed, we will use capitalism system to avoid some low caste. in this application we will be user-friendly based on.</h1>
                <div className="flex justify-end pt-6 mr-5">
                    <button className="bg-white hover:bg-gray-100 rounded-lg px-7 py-2 mb-10 font-medium">Learn More</button>
                </div>
            </div>
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center p-4 pt-24">
                    <img className="w-full max-w-[550px] h-auto object-contain" src="public\Screenshot_2025-07-17_202653-removebg-preview.png" alt="" />
                </div>
            </div>
            {/* <h1 className="text-3xl flex justify-center pt-30">Home</h1> */}
        </div>



        <div id="service" className="min-h-[693px] w-full max-w-[1563px] bg-center bg-cover flex flex-col lg:flex-row justify-center items-stretch mx-auto scroll-mt-20.5 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-start z-10 lg:ml-20 p-4 lg:p-0">
                <div className="mb-0">
                    <p className="text-[25px]">Write down what you want to do</p>
                    <p className="text-[20px]">And start to make your time</p>
                    <p className="text-[28px] mt-1">More Better!</p>
                    <p className="text-gray-500">For free user will be have 2 notes</p>
                </div>
            <div className="outline-3 rounded-2xl outline-blue-500 w-full max-w-[360px] lg:w-90 h-auto lg:h-65 mt-4 lg:mt-1">
                <div className="bg-blue-600 rounded-t-2xl h-12 lg:h-13 flex justify-center items-center">
                    <p className="text-white text-[25px]">Subscription</p>
                    </div>
                        <p className="text-[22px] font-semibold pl-5">Benefits</p>
                        <p className="text-[18px] pl-5 pt-1">- No Limitation Notes</p>
                        <p className="text-[18px] pl-5">- Social Disparity</p>
                        <p className="text-[18px] pl-5">- Write More Than 1000 Words</p>
                        <button className="bg-blue-600 px-12 py-1.5 ml-5 rounded-lg text-white font-semibold">Join Us</button>
                        <p className="text-[17px] pl-5 pt-1">Rp 169.000,00/Months</p>
                    </div>
                <div className="w-full z-10">
                    <button className="max-w-[180px] bg-blue-600 px-12 mt-10 py-1.5 rounded-lg text-white font-semibold">Lets Dive In</button>
                </div>
            </div>
            <div className="flex items-end justify-end">
                <img className="w-full max-w-[1470px] object-contain" src="public\contact-7693801_1920.jpg" alt="" />
            </div>
        </div>



        <div id='about' className="min-h-[383px] w-[100%] max-w-[1563px] bg-[#F9F9F9] bg-center bg-cover justify-center mx-auto">
            <div className="w-full max-w-[85%] flex pt-15 flex-col lg:flex-row justify-between mx-auto gap-8">
                <div className="w-full lg:w-1/2">
                    <p className="text-[30px]">Contact Us</p>
                    <div className="flex items-center gap-2">
                        <img src="public\email.png" alt="" className="w-[3%]"/>
                        <p className="text-[20px] text-[#565656]">takaminesan@outlook.com</p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <p className="text-[30px]">Social Media</p>
                    <div className="flex items-center gap-2">
                        <img src="public\video.png" alt="" className="w-[2.5%]"/>
                        <p className="text-[20px] text-[#565656]">ntr.syosetsu</p>
                    </div>
                </div>
            </div>
            <div className="w-[85%] flex mx-auto pt-10 flex-wrap">
                <p className="text-[30px]">About Us</p>
                <p className="text-[20px] text-[#565656]">We are a dedicated company that bring capitalism to the world, so it’s our honor to be part of it. although of that, we do enjoy the lack of delighted partners about the future of this website. but we are always dedicated to do so whatever we like. and you cannot critism us about it. so subscribe us to enjoy the journey of yours... outlanders.</p>
            </div>
            <div className="w-full max-w-[85%] mx-auto mt-18 pb-3 text-right">
                <p>Copyright © 2025 takamine-san. All rights reserved.</p>
            </div>
        </div>
    </>












    // <div>
    //     <div className="w-[100%] max-w-[1536px] mx-auto bg-[url(background-4876988_1920.jpg)] bg-cover bg-center flex min-h-[693px]">
    //         <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center">
    //             <div className="w-full lg:w-1/2">
    //                 <p className="text-[44px] text-white pl-32 pr-26">Bring up your creativity to <br />another level of quantity</p>
    //                 <p className="text-[26px] text-white pl-32 pr-26 pt-5">most of people using todo-list to reach whatever they want to, we bring freedom with some benefits to lack of democracy. for more time has been passed, we will use capitalism system to avoid some low caste. in this application we will be user-friendly based on.</p>
    //                 <div className="flex justify-end  ml-26 mr-26 pt-8">
    //                     <button className="px-7 py-2 bg-white rounded-lg flex justify-end">Learn More</button>
    //                 </div>
    //             </div>
    //             <div className="w-full min-h-[500px] lg:w-1/2 flex justify-center">
    //                 <img src="Screenshot_2025-07-17_202653-removebg-preview.png" alt="" />
    //             </div>
    //         </div>        
    //     </div>
    //     <div className="w-[100%] max-w-[1536px] mx-auto bg-[url(Screenshot_2025-07-17_202653-removebg-preview.png)] bg-cover bg-center py-16 min-h-[693px]">
        
    //     </div>
    // </div>
    )
}

export default Home;