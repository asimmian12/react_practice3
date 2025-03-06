import React from 'react'



function Sidenav() {
  return (
    <>
      <nav class="bg-[#2e2e48] h-screen mt-30 min-w-[260px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto">
        <div class="flex flex-wrap flex-col justify-center items-center cursor-pointer">
          <p class="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">
            P
          </p>

          <div class="text-center mt-2">
            <p class="text-base text-white">Patient Name</p>
            <p class="text-xs text-gray-300 mt-0.5">Hospital Patient ID</p>
          </div>
        </div>

        <hr class="my-6 border-gray-400" />

        <ul class="space-y-3 flex-1">
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512"
              >
                <path
                  d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                  data-original="#000000"
                />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-[18px] h-[18px] mr-4"
                viewBox="0 0 512 512"
              >
                <path
                  d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                  data-original="#000000"
                />
              </svg>
              <span>Department Details</span>
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-[18px] h-[18px] mr-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                  data-original="#000000"
                />
                <path
                  d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                  data-original="#000000"
                />
                <path
                  d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z"
                  data-original="#000000"
                />
              </svg>
              <span>Information</span>
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              class="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-[18px] h-[18px] mr-4"
                viewBox="0 0 510 510"
              >
                <g fill-opacity=".9">
                  <path
                    d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                    data-original="#000000"
                  />
                  <path
                    d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z"
                    data-original="#000000"
                  />
                </g>
              </svg>
              <span>Logout</span>
            </a>
          </li>
         
        </ul>

        <div class="min-h-[180px] max-w-[228px] p-6 flex flex-col bg-[#e3401f] rounded-3xl mt-4">
          <div class="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              class="w-12"
              viewBox="0 0 24 24"
            >
              <circle cx="4" cy="6" r="3" data-original="#000000" />
              <path
                d="M7.29 11.07A6.991 6.991 0 0 0 4 17H2a2.006 2.006 0 0 1-2-2v-2a3.009 3.009 0 0 1 3-3h2a3 3 0 0 1 2.29 1.07z"
                data-original="#000000"
              />
              <circle cx="20" cy="6" r="3" data-original="#000000" />
              <path
                d="M24 13v2a2.006 2.006 0 0 1-2 2h-2a6.991 6.991 0 0 0-3.29-5.93A3 3 0 0 1 19 10h2a3.009 3.009 0 0 1 3 3z"
                data-original="#000000"
              />
              <circle cx="12" cy="7" r="4" data-original="#000000" />
              <path
                d="M18 17v1a3.009 3.009 0 0 1-3 3H9a3.009 3.009 0 0 1-3-3v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5z"
                data-original="#000000"
              />
            </svg>
            <h6 class="text-white text-sm mt-2 font-semibold">Games</h6>
            <p class="text-gray-300 text-xs mt-1">
                Play Games
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidenav