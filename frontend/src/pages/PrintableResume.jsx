import { useEffect, useState } from "react";

export default function PrintableResume() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load html2pdf.js dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("resume-content");
    const opt = {
      margin: [10, 10, 10, 10], // tight margins
      filename: "Dawit_Solomon_Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center py-10 print:p-0 print:m-0 print:bg-white text-gray-900 font-serif">
      
      {/* Control Bar */}
      <div className="fixed top-8 right-8 z-50 print:hidden flex flex-col gap-2">
        <button
          onClick={handleDownload}
          disabled={!isReady}
          className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-bold rounded shadow-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {isReady ? "Download PDF" : "Loading..."}
        </button>
      </div>

      {/* A4 Paper Container - "Classic Academic Style" */}
      <div 
        id="resume-content"
        className="w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] relative box-border"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Dawit Solomon</h1>
          <div className="text-sm flex flex-wrap justify-center gap-1 text-blue-700">
            <a href="mailto:dawit8908@gmail.com" className="hover:underline">dawit8908@gmail.com</a>
            <span className="text-black">—</span>
            <span className="text-black">+251 974-079-812</span>
            <span className="text-black">—</span>
            <span className="text-black">Addis Ababa, Ethiopia</span>
            <span className="text-black">—</span>
            <a href="https://linkedin.com/in/dawit-solomon-t" className="hover:underline">linkedin.com/in/dawit-solomon-t</a>
            <span className="text-black">—</span>
            <a href="https://dawitsolomon.com" className="hover:underline">dawitsolomon.com</a>
          </div>
          <div className="w-full border-b border-gray-400 mt-3"></div>
        </div>

        {/* Summary */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-3 text-black border-b border-gray-300 pb-1">Summary</h2>
          <p className="text-[15px] leading-relaxed text-black text-justify">
            Motivated <strong>Junior Full Stack Developer</strong> with a strong foundation in the MERN stack (MongoDB, Express.js, React.js, Node.js). 
            Proficient in designing and developing responsive, user-friendly web applications and RESTful APIs. 
            Demonstrated ability to deliver high-quality code through internships and personal projects, improving performance metrics and user engagement. 
            Eager to leverage technical skills in a collaborative agile environment.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-3 text-black border-b border-gray-300 pb-1">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[15px]">
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-bold">Frontend:</span> React.js, Next.js, Redux, Tailwind CSS, Material-UI, Vite
              </li>
              <li>
                <span className="font-bold">Backend:</span> Node.js, Express.js, MongoDB, REST APIs, Socket.io
              </li>
            </ul>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-bold">Languages:</span> JavaScript (ES6+), TypeScript, Python, C++, Java
              </li>
              <li>
                <span className="font-bold">Tools:</span> Git, GitHub, Docker (Basic), Postman, VS Code
              </li>
            </ul>
          </div>
        </section>

        {/* Experience - Pure Work Experience */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-4 text-black border-b border-gray-300 pb-1">Experience</h2>
          
          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">Software Development Intern</h3>
              <span className="text-[15px]">Oct 2024 – Present</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="italic text-[15px]">Prodigy InfoTech</span>
              <span className="text-[15px]">Addis Ababa, Ethiopia</span>
            </div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Optimized React component rendering, reducing application page load times by <strong>30%</strong> through effective code splitting and lazy loading.</li>
              <li>Implemented responsive design improvements, increasing mobile user retention by <strong>25%</strong> across supported devices.</li>
              <li>Collaborated with a cross-functional Agile team to ship features weekly, participating in code reviews to ensure 100% adherence to style guides.</li>
            </ul>
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">Freelance Web Developer</h3>
              <span className="text-[15px]">Jan 2024 – Present</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="italic text-[15px]">Self-Employed</span>
              <span className="text-[15px]">Remote</span>
            </div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Delivered 3+ custom high-performance websites for clients, including full E-Commerce solutions, consistently achieving Google Lighthouse performance scores of <strong>95+</strong>.</li>
              <li>Integrated secure payment gateways and CMS solutions, improving client content management efficiency by <strong>40%</strong>.</li>
            </ul>
          </div>
        </section>

        {/* Projects - Separated */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-4 text-black border-b border-gray-300 pb-1">Projects</h2>
          
          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">
                <a href="https://pinquest-app.onrender.com/" target="_blank" className="text-blue-900 hover:underline">PinQuest</a>
              </h3>
              <span className="text-[15px]">Creator & Lead Developer</span>
            </div>
            <div className="text-[15px] italic mb-1 text-gray-700">React 19, Node.js, MongoDB, Socket.io</div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Engineered a real-time social mapping platform capable of handling concurrent geolocation updates via <strong>Socket.io</strong> loops.</li>
              <li>Designed an interactive UI allowing users to discover/share local landmarks, resulting in a seamless user experience.</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">
                <a href="https://get-dlms.onrender.com/" target="_blank" className="text-blue-900 hover:underline">Driving License Management System (DLMS)</a>
              </h3>
              <span className="text-[15px]">Full Stack Developer</span>
            </div>
            <div className="text-[15px] italic mb-1 text-gray-700">React, Material-UI, Node.js, JWT</div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Developed a comprehensive digital verification system, reducing manual license processing time by approximately <strong>40%</strong>.</li>
              <li>Built a secure admin dashboard with role-based access control (RBAC) to streamline traffic police operations.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-2" style={{ pageBreakBefore: 'always' }}>
          <h2 className="text-xl font-bold mb-4 text-black border-b border-gray-300 pb-1">Education</h2>
          
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">B.Sc. in Computer Science</h3>
              <span className="text-[15px]">2021 – Present</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="italic text-[15px]">Unity University</span>
              <span className="text-[15px]">Addis Ababa, Ethiopia</span>
            </div>
            <div className="text-[15px] mb-1">
              <strong>Expected Graduation:</strong> July 2025
            </div>
            <div className="text-[15px]">
              <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Software Engineering, Web Programming.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
