// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SlHome } from 'react-icons/sl'
import { BsInfoSquare, BsEnvelopeAt } from 'react-icons/bs'
import { FaTshirt, FaRedhat } from 'react-icons/fa'
import { MdAdminPanelSettings } from "react-icons/md";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import logo from '@/img/logo uum.png'

export default function Sidebar({ show, setter }) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Check if the user has the admin custom claim
                user.getIdTokenResult().then((idTokenResult) => {
                    setIsAdmin(idTokenResult.claims.admin);
                });
            } else {
                // User is signed out
                setIsAdmin(false);
            }
        });
    }, []);

    // Define our base class
    const className = "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="p-2 flex">
                    <Link href="/">
                        <div style={{backgroundColor: 'white', padding: '10px'}}>
                            {/*eslint-disable-next-line*/}
                            <img src={logo.src} alt="Company Logo" width={300} height={300} />
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Home"
                        route="/"
                        icon={<SlHome />}
                    />
                    <MenuItem
                        name="Assets Declaration"
                        route="/assets-declaration"
                        icon={<FaTshirt />}
                    />
                    <MenuItem
                        name="View Assets"
                        route="/view-assets"
                        icon={<FaRedhat />}
                    />
                    {/*<MenuItem*/}
                    {/*    name="About Us"*/}
                    {/*    route="/about"*/}
                    {/*    icon={<BsInfoSquare />}*/}
                    {/*/>*/}
                    {/*<MenuItem*/}
                    {/*    name="Contact"*/}
                    {/*    route="/contact"*/}
                    {/*    icon={<BsEnvelopeAt />}*/}
                    {/*/>*/}
                    {isAdmin && (
                        <MenuItem
                            name="Admin"
                            route="/admin"
                            icon={<MdAdminPanelSettings/>} // Replace YourAdminIcon with the actual icon component for Admin
                        />
                    )}
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}
