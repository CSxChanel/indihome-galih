import { ReactNode } from "react";
import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import Foother from "../Foother/Foother"

//components


type LayoutProps = {
    children: ReactNode;
    pageTitle: string;

};

function Layout ({ children, pageTitle }: LayoutProps) {
    return (
        <>
            <Head>
                <title>IndiHome Area | {pageTitle}</title>
                <meta name="description" content="Home Page" />
            </Head>
            <Navbar/>
            <main className="min-h-screen">{children}</main>
            <Foother />
        </>
    );
}
export default Layout;