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
            <a href="https://dawitsolomon-t.onrender.com/" className="hover:underline">dawitsolomon-t.onrender.com</a>
          </div>
          <div className="w-full border-b border-gray-400 mt-3"></div>
        </div>

        {/* Summary */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-3 text-black border-b border-gray-300 pb-1">Summary</h2>
          <p className="text-[15px] leading-relaxed text-black text-justify">
            Dynamic <strong>Full Stack Developer</strong> specializing in the MERN stack with a proven track record of building scalable, high-performance web applications. Expertise in crafting seamless user experiences across various domains, including e-commerce, localized payment systems, and administrative platforms. Focused on delivering technical excellence that drives measurable business outcomes and user satisfaction.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-3 text-black border-b border-gray-300 pb-1">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[15px]">
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-bold">Frontend:</span> React, Next.js, Redux, Tailwind CSS, Framer Motion, GSAP
              </li>
              <li>
                <span className="font-bold">Backend:</span> Node.js, Express, MongoDB, RESTful APIs, Socket.io, JWT
              </li>
            </ul>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <span className="font-bold">Languages:</span> JavaScript (ES6+), TypeScript, Python, C++, Java
              </li>
              <li>
                <span className="font-bold">Tools:</span> Git, GitHub, Docker (Basic), Postman, Vite, VS Code, Figma
              </li>
            </ul>
          </div>
        </section>

        {/* Experience - Pure Work Experience */}
        <section className="mb-5">
          <h2 className="text-xl font-bold mb-4 text-black border-b border-gray-300 pb-1">Experience</h2>
          
          <div className="mb-5">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">Full Stack Developer</h3>
              <span className="text-[15px]">2021 – Present</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="italic text-[15px]">Freelance / Client Projects</span>
              <span className="text-[15px]">Addis Ababa, Ethiopia</span>
            </div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Engineered high-performance web applications using the MERN stack, <strong>reducing page load times by 35%</strong> through optimal component rendering and database indexing.</li>
              <li>Developed custom e-commerce solutions with secure multi-gateway payment integrations, contributing to a <strong>20% increase in client sales conversions</strong>.</li>
              <li>Optimized administrative and dispatching systems for business operations, streamlining workflows and <strong>reducing manual processing time by over 50%</strong>.</li>
            </ul>
          </div>

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
              <li>Collaborating in an agile environment to deliver modular React components, improving code reusability across projects by <strong>40%</strong>.</li>
              <li>Refined legacy codebases for performance and SEO, resulting in a <strong>25-point average improvement</strong> in Lighthouse scores.</li>
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
              <span className="text-[15px]">Lead Developer</span>
            </div>
            <div className="text-[15px] italic mb-1 text-gray-700">React 19, Node.js, MongoDB, Socket.io</div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Engineered a real-time social mapping platform for high-performance location discovery using React 19 concurrent features.</li>
              <li>Optimized data synchronization through Socket.io, ensuring seamless real-time interactions for users.</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-[16px] font-bold">
                <a href="https://get-dlms.onrender.com/" target="_blank" className="text-blue-900 hover:underline">DLMS - Driving License Management</a>
              </h3>
              <span className="text-[15px]">Full Stack Developer</span>
            </div>
            <div className="text-[15px] italic mb-1 text-gray-700">React, Material-UI, Node.js, JWT</div>
            <ul className="list-disc ml-5 text-[15px] space-y-1 text-justify">
              <li>Developed a comprehensive digital verification system, <strong>reducing manual license processing time by 40%</strong>.</li>
              <li>Built a secure admin dashboard with role-based access control (RBAC) to streamline verification operations.</li>
            </ul>
          </div>
        </section>



        {/* Education */}
        <section className="mb-2">
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
          </div>
        </section>
      </div>
    </div>
  );
}
