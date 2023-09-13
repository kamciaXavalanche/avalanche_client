import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const Regulations = () => {
  return (
    <section className="px-16 lg:px-80 py-10 ">
      <h1 className="text-center font-semibold text-xl">
        REGULAMIN SKLEPU INTERNETOWEGO <br />
        Levarde
      </h1>
      <ol className="text-center ">
        <li className="">
          <h2 className="my-6 font-medium text-lg">1. POSTANOWIENIA OGÓLNE</h2>
          <ol className="list-decimal text-left flex flex-col gap-6 ">
            <li>
              Sklep internetowy Levarde, działający pod adresem:
              www.levarde.com, prowadzony jest przez Kamila Buksa, z siedzibą
              przy: Ul. Podhalańska 20/16 34-400 Nowy Targ, działający pod
              numerem NIP: 7352891817, REGON: 386720034.
            </li>
            <li>
              Niniejszy Regulamin Sklepu internetowego określa zasady
              dokonywania zakupów w sklepie internetowym Levarde a w
              szczególności zasady i tryb zawierania umów sprzedaży na odległość
              za pośrednictwem Sklepu, jak również tryb postępowania
              reklamacyjnego oraz tryb odstąpienia od umowy przez Konsumenta
            </li>
            <li>
              Wzakresie Usług świadczonych drogą elektroniczną niniejszy
              Regulamin jest regulaminem, októrym mowa wart. 9 ustawy
              oświadczeniu usług drogą elektroniczną zdnia 18 lipca 2002 r. (tj.
              Dz.U. z2020 r. poz. 344, zezm.).
            </li>
            <li>
              Regulamin skierowany jest do wszystkich Klientów Sklepu. Wszyscy
              Klienci są obowiązani zapoznać się zpostanowieniami Regulaminu,
              przed dokonaniem zakupu.
            </li>
            <li>
              Każdy Klient zobowiązany jest do przestrzegania postanowień
              Regulaminu. Sprzedaż odbywa się na podstawie wersji Regulaminu,
              obowiązującej wmomencie złożenia zamówienia.
            </li>
            <li>
              Każdy Klient ma możliwość zapoznać się z Regulaminem wkażdym
              czasie, klikając na stronie internetowej Sklepu www.levarde.com
              whiperlink „Regulamin Sklepu". Regulamin można w każdym czasie
              pobrać i wydrukować.
            </li>
            <li>
              Wszystkie informacje zawarte na stronie internetowej Sklepu
              Www.levarde.com odnoszące się do produktów (łącznie z cenami), nie
              stanowią oferty w rozumieniu art. 66 Kodeksu Cywilnego z dnia 23
              kwietnia 1964 r. (tj. Dz.U. z 2020 r. poz. 1740, ze zm.), lecz
              zaproszenie do zawarcia umowy, w myśl art. 71 Kodeksu Cywilnego z
              dnia 23 kwietnia 1964 r. (tj. Dz.U. z 2020 r. poz. 1740, zezm.).
              Klient wysyłając Formularz Zamówienia składa ofertę kupna
              wskazanego Towaru za cenę i na warunkach określonych w opisie.
            </li>
          </ol>
        </li>
      </ol>
      <div className="mt-10 flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg mb-4">
          Formularz odstąpienia od umowy
        </h2>
        <a href="/formularz.odt" download>
          <AiOutlineDownload size={28} />
        </a>
      </div>
    </section>
  );
};

export default Regulations;
