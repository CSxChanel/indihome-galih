import React, { useState, useEffect, useRef, useCallback } from "react";

const Form = ({ onClose }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [nama, setNama] = useState('');
   const [email, setEmail] = useState('');
   const [alamat, setAlamat] = useState('');
   const [selectedProvinsi, setSelectedProvinsi] = useState('');
   const [selectedKabupaten, setSelectedKabupaten] = useState('');
   const [kabupatenKota, setKabupatenKota] = useState([]);
   const modalRef = useRef(null);


   const handleClose = useCallback(() => {
      setIsVisible(false);
      setTimeout(() => {
         onClose();
      }, 300); // Durasi yang sama dengan transisi
   }, [onClose]); // Pastikan onClose termasuk dalam array ketergantungan

   useEffect(() => {
      setIsVisible(true);

      // Close modal on outside click
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [handleClose]);

   // Handle Provinsi
   const handleProvinsiChange = (e) => {
      const selectedProvId = e.target.value;
      setSelectedProvinsi(selectedProvId);
      setKabupatenKota(data.kabupaten[selectedProvId] || []);
      setSelectedKabupaten(''); // Reset kabupaten/kota saat provinsi berubah
   };

   // Handle Submit
   const handleSubmit = () => {
      const provinsiName = data.provinsi.find((p) => p.id == selectedProvinsi)?.name || '';
      const kabupatenName = kabupatenKota.find((k) => k.id == selectedKabupaten)?.name || '';

      const whatsappMessage = encodeURIComponent(
         `Halo, saya tertarik dengan paket IndiHome\n` + `\n*Data Pelanggan*` + `\nNama : ${nama}` + `\nE-mail : ${email}` + `\nAlamat : ${alamat}` + `\nProvinsi : ${provinsiName}` + `\nKabupaten/Kota : ${kabupatenName}`
      );

      const waLink = `https://wa.me/6281210489840?text=${whatsappMessage}`;
      window.open(waLink, '_blank');
      handleClose(); // Close modal after submitting
   };

   return (
      <div className={`fixed z-50 inset-0 flex items-center justify-center left-5 right-5 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         <div className={`fixed top-0 right-0 h-full w-full backdrop-blur ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></div>
         <div
            ref={modalRef}
            className={`bg-slate-200 bg-opacity-75 pt-4 border-2 border-rose-500 backdrop-blur rounded-lg overflow-hidden w-full max-w-4xl max-h-[70vh] transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-90'}`}
         >
            <div className="max-h-[50vh] overflow-y-scroll">
               <div className="p-2">
                  <form className="gap-y-6 pb-24 p-6 items-start" onSubmit={(e) => e.preventDefault()}>
                     <input
                        className="bg-transparent border-rose-500 border-b py-3 outline-none w-full placeholder:text-slate-950 focus:border-accent transition-all text-cyan-700 font-semibold"
                        type="text"
                        placeholder="Nama :"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                     />
                     <input
                        className="bg-transparent border-rose-500 border-b py-3 outline-none w-full placeholder:text-slate-950 focus:border-accent transition-all text-cyan-700 font-semibold"
                        type="email"
                        placeholder="E-mail :"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <input
                        className="bg-transparent border-rose-500 border-b py-3 outline-none w-full placeholder:text-slate-950 focus:border-accent transition-all text-cyan-700 font-semibold"
                        type="text"
                        placeholder="Alamat pemasangan :"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                     />
                     <select className="bg-transparent border-rose-500 border-b py-3 outline-none w-full placeholder:text-slate-950 focus:border-accent transition-all" value={selectedProvinsi} onChange={handleProvinsiChange}>
                        <option className="option" value="">
                           Pilih Provinsi :
                        </option>
                        {data.provinsi.map((provinsi) => (
                           <option key={provinsi.id} value={provinsi.id}>
                              {provinsi.name}
                           </option>
                        ))}
                     </select>
                     <select
                        className="bg-transparent border-rose-500 border-b py-3 outline-none w-full placeholder:text-rose-500 focus:border-accent transition-all"
                        value={selectedKabupaten}
                        onChange={(e) => setSelectedKabupaten(e.target.value)}
                     >
                        <option value="">Pilih Kabupaten/Kota :</option>
                        {kabupatenKota.map((kab) => (
                           <option key={kab.id} value={kab.id}>
                              {kab.name}
                           </option>
                        ))}
                     </select>
                  </form>
               </div>
            </div>

            <div className="bg-slate-300 px-4 py-3">
               <button onClick={handleSubmit} type="button" className="bg-rose-600 text-slate-100 font-bold border-2 justify-center w-full rounded-md px-4 py-2">
                  Submit
               </button>
            </div>
         </div>
      </div>
   );
};

export default Form;

// data statis
const data = {
    provinsi: [
        { id: 1, name: "DKI-Jakarta" },
        { id: 2, name: "Jawa Barat" },
        { id: 3, name: "Banten" },
        { id: 4, name: "Lampung" },
        { id: 5, name: "Jawa Tengah" }
    ],
    kabupaten: {
        1: [
            { id: 1, name: "Kepulauan-seribu" },
            { id: 2, name: "Jakarta-barat" },
            { id: 3, name: "Jakarta-pusat" },
            { id: 4, name: "Jakarta-selatan" },
            { id: 5, name: "Jakarta-timur" },
            { id: 6, name: "Jakarta-utara" }
        ],
        2: [
            { id: 1, name: "Kab-bandung" },
            { id: 2, name: "Kab-bandung-barat" },
            { id: 3, name: "Kab-bekasi" },
            { id: 4, name: "Kab-bogor" },
            { id: 5, name: "Kab-ciamis" },
            { id: 6, name: "Kab-cianjur" },
            { id: 7, name: "Kab-cirebon" },
            { id: 8, name: "Kab-garut" },
            { id: 9, name: "Kab-indramayu" },
            { id: 10, name: "Kab-karawang" },
            { id: 11, name: "Kab-kuningan" },
            { id: 12, name: "Kab-majalengka" },
            { id: 13, name: "Kab-pangandaran" },
            { id: 14, name: "Kab-purwakarta" },
            { id: 15, name: "Kab-subang" },
            { id: 16, name: "Kab-sukabumi" },
            { id: 17, name: "Kab-sumedang" },
            { id: 18, name: "Kab-tasikmalaya" },
            { id: 19, name: "Kota-bandung" },
            { id: 20, name: "Kota-banjar" },
            { id: 21, name: "Kota-bekasi" },
            { id: 22, name: "Kota-bogor" },
            { id: 23, name: "Kota-cimahi" },
            { id: 24, name: "Kota-cirebon" },
            { id: 25, name: "Kota-depok" },
            { id: 26, name: "Kota-sukabumi" },
            { id: 27, name: "Kota-tasikmalaya" }
        ],
        3: [
            { id: 1, name: "Pandeglang" },
            { id: 2, name: "Tangerang" },
            { id: 3, name: "Lebak" },
            { id: 4, name: "Serang" },
            { id: 5, name: "Kota-Tangerang" },
            { id: 6, name: "Kota-Cilegon" },
            { id: 7, name: "Tangerang-selatan" },
            { id: 8, name: "Kota-Serang" }
        ],
        4: [
            { id: 1, name: "Kab-lampung-barat" },
            { id: 2, name: "Kab-lampung-selatan" },
            { id: 3, name: "Kab-lampung-tengah" },
            { id: 4, name: "Kab-lampung-timur" },
            { id: 5, name: "Kab-lampung-utara" },
            { id: 6, name: "Kab-masuji" },
            { id: 7, name: "Kab-pasawaran" },
            { id: 8, name: "Kab-pesisir-barat" },
            { id: 9, name: "Kab-pringsewu" },
            { id: 10, name: "Kab-tanggamus" },
            { id: 11, name: "Kab-tulang-bawang" },
            { id: 12, name: "Kab-tulang-bawang-barat" },
            { id: 13, name: "Kab-way-kanan" },
            { id: 14, name: "Kota-bandar-lampung" },
            { id: 15, name: "Kota-metro" }
        ],
        5: [
            { id: 1, name: "Kab-banjarnegara" },
            { id: 2, name: "Kab-banyumas" },
            { id: 3, name: "Kab-batang" },
            { id: 4, name: "Kab-blora" },
            { id: 5, name: "Kab-boyolali" },
            { id: 6, name: "Kab-brebes" },
            { id: 7, name: "Kab-cilacap" },
            { id: 8, name: "Kab-demak" },
            { id: 9, name: "Kab-grobogan" },
            { id: 10, name: "Kab-jepara" },
            { id: 11, name: "Kab-karanganyar" },
            { id: 12, name: "Kab-kebumen" },
            { id: 13, name: "Kab-kendal" },

            { id: 14, name: "Kab-klaten" },
            { id: 15, name: "Kab-kudus" },
            { id: 16, name: "Kab-magelang" },
            { id: 17, name: "Kab-pati" },
            { id: 18, name: "Kab-pekalongan" },
            { id: 19, name: "Kab-pemalang" },
            { id: 20, name: "Kab-purbalingga" },
            { id: 21, name: "Kab-purworejo" },
            { id: 22, name: "Kab-rembang" },
            { id: 23, name: "Kab-semarang" },
            { id: 24, name: "Kab-sragen" },
            { id: 25, name: "Kab-sukoharjo" },
            { id: 26, name: "Kab-tegal" },
            { id: 27, name: "Kab-temanggung" },
            { id: 28, name: "Kab-wonogiri" },
            { id: 29, name: "Kab-wonosobo" },
            { id: 30, name: "Kota-magelang" },
            { id: 31, name: "Kota-pekalongan" },
            { id: 32, name: "Kota-salatiga" },
            { id: 33, name: "Kota-semarang" },
            { id: 34, name: "Kota-surakarta" },
            { id: 35, name: "Kota-tegal" }
        ]
    }
};
