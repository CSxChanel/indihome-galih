import { ReactNode } from "react";
import Head from "next/head";

//components
import Navbar from '@/components/Navbar'
import Foother from '@/components/Foother'

type LayoutProps = {
    children: ReactNode;
    pageTitle: string;
};

function Layout({ children, pageTitle }: LayoutProps) {
    return (
        <>
            <Head>
                <title>IndiHome Area | {pageTitle}</title>
                <meta name="description" conten="Home Page" />
            </Head>
            <Navbar />
            {children}
            <Foother />
        </>
    );
}
export {Layout}