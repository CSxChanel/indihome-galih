
import Image from "next/image";
import Logo from "@/public/Logo_indiHome.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-6">
      <div className="container mx-auto text-center">
        <Image src={Logo} alt="IndiHome Logo" width={150} height={50} style={{ width: "auto", height: "auto" }} className="mx-auto mb-4" />
        <p className="text-sm">&copy; {currentYear} IndiHome-Area. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
