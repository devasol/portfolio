import React from 'react';
import FadeIn from '../common/FadeIn';

const Analytics = () => {
  const stats = [
    {
      value: '1+',
      label: 'Years of Experience',
      description: 'Professional development journey'
    },
    {
      value: '5+',
      label: 'Projects Completed',
      description: 'Successful client deliveries'
    },
    {
      value: '15+',
      label: 'Technologies Mastered',
      description: 'Diverse tech stack expertise'
    },
    {
      value: '100+',
      label: 'Code Commits',
      description: 'Lines of quality code'
    }
  ];

  return (
    <section id="analytics" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="display-font text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Analytics</span>
            </h2>
            <p className="text-lg text-ink/80 max-w-2xl mx-auto">
              Measurable achievements that showcase my dedication and expertise in software development
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card p-6 md:p-8 flex flex-col items-center text-center group hover:transform hover:-translate-y-1 transition-all duration-300 h-full flex-1 sm:w-[calc(50%-12px)] lg:w-auto"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  {stat.value}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm md:text-base text-ink/70 mt-auto">
                  {stat.description}
                </p>
                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Analytics;