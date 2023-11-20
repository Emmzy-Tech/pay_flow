import * as React from "react";
import { Link } from "react-router-dom";

const Home = ()=> {
  return (
    <div className="flex flex-col items-center pl-20 max-md:pl-5 bg-black w-full">
    <nav className="flex items-center w-full max-w-[1320px] justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
    <div className="self-center flex items-stretch gap-1.5 my-auto">
      <div className="text-white text-2xl font-semibold leading-7 tracking-tighter grow whitespace-nowrap self-start">
        Payflow
      </div>
    </div>
   
    <div className="flex items-center justify-between gap-5 pr-7 max-md:pr-5">
    <Link to="/login">
      <div className="text-white text-lg font-medium leading-6 tracking-tighter my-auto">
        Login
      </div>
      </Link>
      <Link to="/register">
      <div className="text-white text-lg font-medium leading-6 tracking-tighter whitespace-nowrap items-center border self-stretch grow px-5 py-4 rounded-[30px] border-solid border-white border-opacity-40">
        Register
      </div>
      </Link>
    </div>
    </nav>
    
    <div className="w-full mt-36 max-md:max-w-full max-md:mt-10">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[55%] max-md:w-full max-md:ml-0">
          <div className="flex flex-col items-stretch mt-2.5 md:p-36 max-md:max-w-full max-md:mt-10">
            <h1 className="text-white text-6xl font-medium leading-[77px] tracking-tighter max-md:max-w-full max-md:text-4xl max-md:leading-[53px]">
              Easily Manage Your Employee with Payflow
            </h1>
            <p className="text-white text-lg leading-8 tracking-tighter opacity-80 mt-8 max-md:max-w-full">
              It’s not that hard to manage your employee, know when they start working, and leave. It comes with
              statistical features to find out workflow, and project.
            </p>
            <Link to="/register"
            className="text-indigo-800 text-lg font-medium leading-6 tracking-tighter whitespace-nowrap items-center bg-white w-[156px] max-w-full mt-11 px-5 py-5 rounded-[30px] self-start max-md:mt-10"
            >
              Get Started
            </Link>
            <div className="items-center flex w-[424px] max-w-full justify-between gap-5 mt-16 self-start max-md:flex-wrap max-md:justify-center max-md:mt-10">
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                <div className="text-white text-3xl font-medium leading-10 tracking-tighter whitespace-nowrap">
                  500+
                </div>
                <div className="text-white text-lg leading-7 tracking-tight opacity-80 mt-2">
                  Partners
                  <br />
                  Worldwide
                </div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f2a201a-7627-46c5-9c5e-93d820cacc6b?apiKey=1eee870be0724020a87e0cd58fee52f4&"
                className="aspect-[0.02] object-contain object-center w-px stroke-[1px] stroke-white stroke-opacity-20 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                <div className="text-white text-3xl font-medium leading-10 tracking-tighter whitespace-nowrap">
                  100k+
                </div>
                <div className="text-white text-lg leading-7 tracking-tight opacity-80 mt-2">
                  Users
                  <br />
                  Worldwide
                </div>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e690ff65-4889-4a38-a211-c00c6825911b?apiKey=1eee870be0724020a87e0cd58fee52f4&"
                className="aspect-[0.02] object-contain object-center w-px stroke-[1px] stroke-white stroke-opacity-20 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                <div className="text-white text-3xl font-medium leading-10 tracking-tighter whitespace-nowrap">
                  3.7m+
                </div>
                <div className="text-white text-lg leading-7 tracking-tight opacity-80 mt-2">
                  Downloads
                  <br />
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[45%] ml-5 max-md:w-full max-md:ml-0">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ec59e7e-ce9f-477f-aecc-b1ac280703c0?apiKey=1eee870be0724020a87e0cd58fee52f4&"className="aspect-[0.82] object-contain object-center w-full overflow-hidden grow rounded-[30px_0px_0px_0px] max-md:max-w-full max-md:mt-10"
          />
        </div>
      </div>
    </div>
  </div>
  );
}


export default Home;