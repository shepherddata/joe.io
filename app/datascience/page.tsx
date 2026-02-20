interface DSProject {
  title: string;
  description: string;
  tools: string[];
  link?: string;
}

interface DSSkill {
  category: string;
  items: string[];
}

interface DSExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function DataScience() {
  const projects: DSProject[] = [
    {
      title: 'Customer Churn Model',
      description: 'Built a predictive model to identify churn risk using gradient boosting and feature engineering.',
      tools: ['Python', 'scikit-learn', 'Pandas', 'SQL'],
    },
    {
      title: 'Sales Forecasting',
      description: 'Time-series forecasting pipeline for monthly sales using Prophet and model ensembles.',
      tools: ['Prophet', 'Pandas', 'Matplotlib'],
    },
  ];

  const skills: DSSkill[] = [
    {
      category: 'Data Analysis',
      items: ['Pandas', 'NumPy', 'SQL', 'Data Wrangling'],
    },
    {
      category: 'Machine Learning',
      items: ['scikit-learn', 'Model Evaluation', 'Feature Engineering'],
    },
    {
      category: 'Tools',
      items: ['Python', 'Jupyter', 'Docker', 'AWS'],
    },
  ];

  const experience: DSExperience[] = [
    {
      role: 'Masters Student - Data Science',
      company: 'Indiana University - Bloomington',
      period: '2022 - 2024',
      description: 'Focus on machine learning. Completed projects in ML algorithms, predictive modeling, and data visualization.',
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        <section className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold text-black dark:text-white">Data Scientist / Analyst</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mt-2">Extracting insights and building models to drive smart business decisions</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/api/resume"
              download="resume.pdf"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition inline-flex items-center gap-2"
            >
              <span>Download Resume</span>
              <span>↓</span>
            </a>
            <a
              href="https://github.com/shepherddata"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-black dark:text-white rounded-lg font-medium transition"
            >
              GitHub
            </a>
            <a
              href="www.linkedin.com/in/joseph-shepherd-linked"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-black dark:text-white rounded-lg font-medium transition"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-black dark:text-white">Data Projects</h3>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-black dark:text-white">{project.title}</h4>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tech, j) => (
                    <span key={j} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-black dark:text-white">Skills</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
                <h4 className="font-semibold text-black dark:text-white mb-4">{skill.category}</h4>
                <ul className="space-y-2">
                  {skill.items.map((item, j) => (
                    <li key={j} className="text-zinc-600 dark:text-zinc-400 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-black dark:text-white">Experience & Education</h3>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-blue-600 pl-6 py-2">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white">{exp.role}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">{exp.company}</p>
                  </div>
                  <span className="text-sm text-zinc-500">{exp.period}</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
