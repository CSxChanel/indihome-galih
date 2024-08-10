import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { AiOutlineMenuUnfold, AiOutlineVerticalLeft } from "react-icons/ai";

import { NavLinks } from "@/services/Nav-Link";
import Logo from "@/public/Logo_indihome";
import Form from "@/components/Form/Form.jsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const Nav = () => {
        const router = useRouter();
        return (
            <>
                {NavLinks.map(link => (
                    <div key={link.id}>
                        <Link
                            href={link.path}
                            target={link.target}
                            className={`px-3 py-1 hover:border hover:text-slate-100 hover:bg-rose-600 hover:rounded-full
                            ${router.pathname === link.path ? "active" : ""}
                        `}
                        >
                            {link.text}
                        </Link>
                    </div>
                ))}
            </>
        );
    };

    const whatsappMessage = encodeURIComponent(
        "Halo, saya tertarik dengan paket IndiHome."
    );

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="navbar fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 bg-slate-50 border-b-2 border-b-rose-400">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Logo_indihome"
                        className="h-[50px] w-[170px]"
                    />
                </Link>
                <div>
                    <div className="nav font-semibold lg:flex lg:flex-1 lg:gap-x-5 lg:items-center hidden">
                        <Nav />
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="text-3xl focus:outline-none z-30 lg:hidden"
                    >
                        {isOpen ? (
                            <AiOutlineVerticalLeft />
                        ) : (
                            <AiOutlineMenuUnfold />
                        )}
                    </button>
                </div>
            </div>
            <div
                className={`fixed top-20 right-0 h-full w-full bg-white/50 backdrop-blur ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-500 ease-in-out z-40 overflow-y-scroll`}
            >
                <div className="toggleNav flex flex-col items-center my-10 gap-y-10 text-xl font-semibold font-primary">
                    <Nav />
                    <button
                        onClick={handleOpen}
                        type="button"
                        className="px-5  border rounded-2xl bg-rose-600 text-sm text-center text-slate-50 py-2 font-bold hover:bg-rose-700 hover:text-slate-100 animate-bounce"
                    >
                        Berlangganan Sekarang
                    </button>
                </div>
            </div>
            {open && <Form onClose={handleClose} />}
        </div>
    );
};

export default Navbar;
