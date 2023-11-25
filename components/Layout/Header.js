// @/components/Layout/Header.js
import React from 'react'
import Link from "next/link";
import {FaUser} from "react-icons/fa";

export default function Header({ title }) {
    return (
        <header className="p-4 bg-black text-white flex justify-between items-center">
            <div></div>
            <h1 className="mx-auto">{title}</h1>
            <Link
                className="text-3xl text-white"
                href="/profile"
            >
                <FaUser />
            </Link>
        </header>
    )
}
