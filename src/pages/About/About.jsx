import AboutSection1 from "./AboutSection1";
import AboutSection2 from "./AboutSection2";
import AboutSection3 from "./AboutSection3";
import AboutSection4 from "./AboutSection4";

export default function About() {
  return (
    <>
      <main className="grow">
        <div className="bg-[#0a0a0a]">
          <AboutSection1/>
          <AboutSection2/>
          <AboutSection3/>
          <AboutSection4/>
        </div>
      </main>
    </>
  );
}
