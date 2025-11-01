import { motion } from "motion/react";
import { Language, translations } from "../translations";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface ResumeProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Resume({
  language,
  onLanguageChange,
}: ResumeProps) {
  const t = translations[language].resume;
  const isRTL = language === "fa";
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(`/${language}`);
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-y-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header with Language Switcher and Back Button */}
      <div
        className={`flex items-start mb-8 ${isRTL ? "items-end text-right" : ""}`}
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          className=""
        >
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2"
          >
            {isRTL ? (
              <>
                <span>{t.backToHome}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                <span>{t.backToHome}</span>
              </>
            )}
          </Button>
        </motion.div>

        {/* Language Switcher */}
        <div className={isRTL ? "ml-auto" : "ml-auto"}>
          <LanguageSwitcher
            currentLang={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 ${isRTL ? "text-right" : "text-left"}`}
        >
          <h1 className="text-4xl mb-4 text-green-400">
            {isRTL ? (
              <>
                {t.title}{" "}
                <span className="text-green-500">_{"<"}</span>
              </>
            ) : (
              <>
                <span className="text-green-500">{">"}_</span>{" "}
                {t.title}
              </>
            )}
          </h1>
          <p className="text-green-300/80 text-lg">
            {t.summary}
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2
            className={`text-2xl mb-6 text-green-400 ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-green-500">#</span>{" "}
            {t.experience.title}
          </h2>
          <div className="space-y-8">
            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`border-green-500/30 ${isRTL ? "border-l-0 border-r-2 pl-0 pr-6" : "border-l-2  pl-6"}`}
              >
                <h3
                  className={`text-xl text-green-400 mb-1 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {job.title}
                </h3>
                <div
                  className={`text-green-500 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {job.company} • {job.period}
                </div>
                <ul className="space-y-2 list-none">
                  {job.description.map((item, i) => (
                    <li
                      key={i}
                      className={`text-green-300/80 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <span
                        className={`text-green-500 ${isRTL ? "ml-2" : "mr-2"}`}
                      >
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2
            className={`text-2xl mb-6 text-green-400 ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-green-500">#</span>{" "}
            {t.education.title}
          </h2>
          <div className="space-y-6">
            {t.education.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`border-l-2 border-green-500/30 pl-6 ${isRTL ? "border-l-0 border-r-2 pl-0 pr-6" : ""}`}
              >
                <h3
                  className={`text-xl text-green-400 mb-1 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {item.degree}
                </h3>
                <div
                  className={`text-green-500 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {item.school} • {item.period}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2
            className={`text-2xl mb-6 text-green-400 ${isRTL ? "text-right" : "text-left"}`}
          >
            <span className="text-green-500">#</span>{" "}
            {t.skills.title}
          </h2>
          <div
            className={`grid md:grid-cols-3 gap-6 ${isRTL ? "text-right" : "text-left"}`}
          >
            {t.skills.categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-green-950/20 border border-green-500/30 rounded-lg p-4"
              >
                <h3
                  className={`text-lg text-green-400 mb-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {category.name}
                </h3>
                <ul className="space-y-1">
                  {category.items.map((skill, i) => (
                    <li
                      key={i}
                      className={`text-green-300/80 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {isRTL ? (
                        <>
                          {skill}{" "}
                          <span className="text-green-500">
                            {"<"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-green-500">
                            {">"}
                          </span>{" "}
                          {skill}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}