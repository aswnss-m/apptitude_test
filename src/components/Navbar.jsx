import React, { useEffect, useState } from 'react'

function Navbar() {
    const [email, setEmail] = useState(null);
    useEffect(() => {
        if (sessionStorage.getItem('email')) {
            setEmail(sessionStorage.getItem('email'))
        }
        else {
            setEmail(null)
        }
    }, []);
  return (
    <>
        <nav class="bg-white border-gray-200 dark:bg-gray-500 absolute w-screen">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <p class="flex items-center">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Traya</span>
                </p>
                <div class="flex items-center">
                    <p class="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">
                        {/* if email present view that */}
                        {email ? email : ' '}
                    </p>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar