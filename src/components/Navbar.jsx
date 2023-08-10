import React, { useEffect, useState } from 'react'
import Logo from "../assets/logo.svg";
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
        <nav className="w-screen">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <p className="flex items-center">
                    <img src={Logo} alt="" />
                </p>
                <div className="flex items-center">
                    <p className="mr-6 text-m hover:underline">
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