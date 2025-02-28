import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Upload,
  Sparkles,
  Star,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Clock,
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";
import Waves from "./blocks/Backgrounds/Waves/Waves";
// import useCanvasCursor from "./blocks/canvasCursor";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/analyze";
const AnimBg = () => (
  <div className="fixed inset-0 -z-10 bg-black opacity-50">
    <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[40rem] w-[40rem] animate-pulse rounded-full bg-purple-500 opacity-20 blur-3xl" />
      <div className="absolute h-[35rem] w-[35rem] animate-pulse rounded-full bg-indigo-500 opacity-20 blur-3xl" />
    </div>
  </div>
);
const ScrollP = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-orange-100/95 to-indigo-50/90 transition-all duration-150 backdrop-blur-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};const Hero = ({ funcUpload, loading }) => (
  <div className="w-screen p-4 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-7xl">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            ElevateU.ai
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Transform your career with AI insights
          </p>
        </div>
        <label className="block w-full max-w-xl mx-auto cursor-pointer">
          <div className="bg-white shadow-lg p-6 sm:p-8 rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-all group">
            <div className="flex flex-col text-blue-600 items-center gap-4">
              <Upload className="w-16 h-16 text-green-500 group-hover:text-blue-500 transition-colors" />
              <div className="text-center">
                <p className="text-xl font-medium">Drop your resume here</p>
                <p>or click to browse (PDF only)</p>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={funcUpload}
              className="hidden"
              disabled={loading}
            />
          </div>
        </label>
        {!loading && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  </div>
);

Hero.propTypes = {
  funcUpload: PropTypes.func,
  loading: PropTypes.bool,
};
const Loader = () => (
  <div className="min-h-screen w-screen p-4 sm:p-6 absolute inset-0 flex backdrop-blur-3xl items-center justify-center z-50 bg-white/80">
    <div className="w-full max-w-7xl">
      <div className="flex flex-col items-center justify-center gap-8 text-gray-900">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-blue-300/20 border-t-blue-500 animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-blue-500" />
        </div>
        <div className="text-lg sm:text-xl text-gray-700">
          Analyzing your resume... <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RuntimeTerrors 🥷
        </div>
      </div>
    </div>
  </div>
);
const Courses = ({ courses = [] }) => {
  if (!courses?.length) return <p className="text-center text-gray-500">No courses available.</p>;

  return (
    <div className="p-6 sm:p-8 w-full mt-8">
      <div className="bg-white w-full lg:max-w-screen-xl rounded-2xl text-gray-900 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            📚 Recommended Courses
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="flex gap-4 min-w-max pb-4">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="w-full sm:w-80 bg-gradient-to-b from-green-100 to-white p-4 sm:p-6 rounded-xl border border-green-300 hover:border-green-400 transition-all group"
              >
                <div className="flex flex-col h-full">
                  {course.image && (
                    <div className="mb-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 rounded-lg object-cover bg-gray-100"
                      />
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <span className="font-medium truncate">{course.provider}</span>
                  </div>

                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-green-600/80">
                      <span>📍 {course.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600/80">
                      <span>⏳ {course.duration}</span>
                    </div>
                  </div>

                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 sm:py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-700 hover:text-green-600 rounded-lg transition-all font-medium"
                  >
                    View Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
Courses.propTypes = {
  courses: PropTypes.array,
};
const Jobs = ({ jobs = [] }) => {
  if (!jobs?.length) return null;
  const displayJobs = jobs;
  return (
    <div className="p-6 sm:p-8 w-full mt-8">
      <div className="bg-white w-full lg:max-w-screen-xl rounded-2xl text-gray-900 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-500" />
            Matching Job Opportunities
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="flex gap-4 min-w-max pb-4">
            {displayJobs.map((job, idx) => (
              <div
                key={idx}
                className="w-full sm:w-80 bg-gradient-to-b from-blue-100 to-white p-4 sm:p-6 rounded-xl border border-blue-300 hover:border-blue-400 transition-all group"
              >
                <div className="flex flex-col h-full">
                  {job.companyLogo && (
                    <div className="mb-4">
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="w-12 h-12 rounded-lg object-contain bg-gray-100 p-1"
                      />
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                    {job.position}
                  </h3>

                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium truncate">{job.company}</span>
                  </div>

                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-blue-600/80">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600/80">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{job.agoTime}</span>
                    </div>
                  </div>

                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 sm:py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 hover:text-blue-600 rounded-lg transition-all font-medium"
                  >
                    View Position
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


Jobs.propTypes = {
  jobs: PropTypes.array,
};
export default function ResumeAnalyzer() {
  const{ loginWithRedirect , logout, user, isAuthenticated } = useAuth0();
  loginWithRedirect;
  isAuthenticated;
  logout;
  user;
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);
  const fileUp = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze resume");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);
  /*useCanvasCursor();*/
  return (
    
      <>
      
      
      <canvas className="pointer-events-none fixed z-50 inset-0" id="canvas" />
      <div className={`relative ${loading ? "backdrop-blur-lg" : ""}`}>
        <Waves
          className="h-screen w-screen"
          lineColor="#D6BCFA" // Light purple
          backgroundColor="rgba(255, 255, 255, 0.9)" // Light background
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.001}
          maxCursorMove={200}
          xGap={12}
          yGap={36}
        />

        <AnimBg />
        <ScrollP />
        <Hero funcUpload={fileUp} loading={loading} />
        {loading && <Loader />}
        <div
          ref={resultsRef}
          id="results-container"
          className="bg-[#F3E8FF] backdrop-blur-lg rounded-2xl p-4 sm:p-8 text-gray-800" // Light purple background
        >
          {error && (
            <div className="min-h-screen w-screen flex items-center justify-center p-4 sm:p-6 ">
              <div className="w-full max-w-7xl">
                <div className="bg-red-100 backdrop-blur-lg text-red-800 p-4 sm:p-8 rounded-2xl border border-red-200">
                  <AlertTriangle className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Analysis Failed
                  </h3>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
          {results && !loading && (
            <div ref={resultsRef} className="w-full">
              {/* Resume Score Section */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Resume Score Analysis
                </h2>
                <div className="text-4xl sm:text-5xl font-bold text-purple-500">
                  {results?.score?.total}{" "}
                  <span className="text-lg sm:text-xl">/ 100</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  {results?.score?.breakdown &&
                    Object.entries(results.score.breakdown).map(
                      ([key, value]) => {
                        if (
                          key == "ats_compatibility" ||
                          key == "industry_benchmark"
                        ) {
                          return;
                        }
                        const maxScores = {
                          skills: 25,
                          experience: 25,
                          achievements: 25,
                          education: 25,
                        };

                        const maxScore = maxScores[key];

                        return (
                          <div
                            key={key}
                            className="bg-white p-3 sm:p-4 rounded-xl border border-purple-200 shadow-sm"
                          >
                            <h3 className="text-lg font-semibold capitalize">
                              {key}
                            </h3>
                            <div className="text-xl font-bold">
                              {value}{" "}
                              <span className="text-sm">/ {maxScore}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-lg overflow-hidden">
                              <div
                                className="h-full bg-purple-400 rounded-lg"
                                style={{
                                  width: `${(value / maxScore) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              {/* Industry Benchmarks Section */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 mt-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Company Benchmarks
                </h2>
                <div className="text-4xl sm:text-5xl font-bold text-purple-500">
                  {results?.score?.breakdown.industry_benchmark}{" "}
                  <span className="text-lg sm:text-xl">/ 100</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 mb-8">
                  <div className="w-full bg-gray-100 h-2 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-lg"
                      style={{
                        width: `${
                          (results?.score?.breakdown.industry_benchmark / 100) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-600">Industry</span>
                        <span className="capitalize font-medium text-purple-700">
                          {results?.industry_analysis?.industry}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600">
                          Experience Level
                        </span>
                        <span className="capitalize font-medium text-purple-700">
                          {results?.industry_analysis?.experience_level}
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-600">
                          Average Industry Score
                        </span>
                        <span className="font-medium text-purple-700">
                          {
                            results?.industry_analysis?.benchmark_comparison
                              ?.average_score
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg text-green-600 font-semibold mb-2">
                        Present Industry Skills
                      </h3>
                      <div className="space-y-2">
                        {results?.industry_analysis?.benchmark_comparison?.industry_skills_present.map(
                          (skill, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-purple-600"
                            >
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{skill}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg text-red-600 font-semibold mb-2">
                        Missing Industry Skills
                      </h3>
                      <div className="space-y-2">
                        {results?.industry_analysis?.benchmark_comparison?.industry_skills_missing.map(
                          (skill, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-purple-600"
                            >
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{skill}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ATS Analysis Section */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 mt-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  ATS Analysis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h3 className="text-xl font-semibold mb-4">
                        Keyword Match Score
                      </h3>
                      <div className="relative pt-4">
                        <div className="text-4xl font-bold text-purple-500 mb-2">
                          {results?.ats_analysis?.keyword_match_score}%
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-purple-400 rounded-lg"
                            style={{
                              width: `${results?.ats_analysis?.keyword_match_score}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h3 className="text-xl font-semibold mb-4">
                        Keyword Frequency
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(
                          results?.ats_analysis?.keyword_frequency || {}
                        ).map(([keyword, frequency]) => (
                          <div
                            key={keyword}
                            className="flex justify-between items-center"
                          >
                            <span className="text-purple-600">{keyword}</span>
                            <span className="font-medium text-purple-700">
                              {frequency}x
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg text-green-600 font-semibold mb-2">
                        Keywords Found
                      </h3>
                      <div className="space-y-2">
                        {results?.ats_analysis?.keywords_found.map(
                          (keyword, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-purple-600"
                            >
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{keyword}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg text-red-600 font-semibold mb-2">
                        Missing Keywords
                      </h3>
                      <div className="space-y-2">
                        {results?.ats_analysis?.missing_critical_keywords.map(
                          (keyword, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-purple-600"
                            >
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{keyword}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Salary Insights Section */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 mt-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Salary Insights
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-semibold mb-4">
                      Estimated Salary Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600">Low</span>
                        <span className="font-medium text-purple-700">
                          {
                            results?.salary_insights?.estimated_salary_range
                              ?.currency
                          }{" "}
                          {results?.salary_insights?.estimated_salary_range?.low?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-600">High</span>
                        <span className="font-medium text-purple-700">
                          {
                            results?.salary_insights?.estimated_salary_range
                              ?.currency
                          }{" "}
                          {results?.salary_insights?.estimated_salary_range?.high?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-semibold mb-4">
                      Salary Factors
                    </h3>
                    <div className="space-y-2">
                      {results?.salary_insights?.salary_factors.map(
                        (factor, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-purple-600"
                          >
                            <Star className="w-5 h-5 text-purple-500" />
                            <span>{factor}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Recommended Roles*/}
              {results?.roles?.length > 0 && (
                <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 mt-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Recommended Roles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 sm:p-6 rounded-xl border border-purple-200 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-purple-700">
                            {role?.title ?? "Unknown Role"}
                          </h3>
                          <div className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {role?.match_percentage ?? 0}% Match
                          </div>
                        </div>
                        <div className="space-y-2">
                          {role?.key_qualifications?.map((qual, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-purple-600"
                            >
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{qual}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-gray-800 mt-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Skills Analysis
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg text-green-600 font-semibold mb-2">
                      Strong Skills
                    </h3>
                    <div className="space-y-2 text-purple-600">
                      {results?.skills_analysis?.strong_skills?.length ? (
                        results.skills_analysis.strong_skills.map(
                          (skill, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{skill}</span>
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-purple-500" />
                          <span>None</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg text-red-600 font-semibold mb-2">
                      Missing Skills
                    </h3>
                    <div className="space-y-2 text-purple-600">
                      {results?.skills_analysis?.missing_skills?.length ? (
                        results.skills_analysis.missing_skills.map(
                          (skill, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{skill}</span>
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-purple-500" />
                          <span>None</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg text-yellow-600 font-semibold mb-2">
                      Improvement Areas
                    </h3>
                    <div className="space-y-2 text-purple-600">
                      {results?.skills_analysis?.improvement_areas?.length ? (
                        results.skills_analysis.improvement_areas.map(
                          (area, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-purple-500" />
                              <span>{area}</span>
                            </div>
                          )
                        )
                      ) : (
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-purple-500" />
                          <span>None</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Feedback*/}
              <div className="bg-white rounded-2xl p-4 sm:p-8 text-purple-600 mt-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl text-gray-800 font-bold mb-4">
                  Detailed Feedback
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col min-h-full">
                    <h3 className="text-lg text-green-600 font-semibold mb-2">
                      Strengths
                    </h3>
                    <ul className="space-y-2 list-disc text-purple-600 flex-grow">
                      {results?.detailed_feedback?.strengths?.length ? (
                        results.detailed_feedback.strengths.map(
                          (strength, i) => (
                            <li key={i} className="text-lg">
                              {strength}
                            </li>
                          )
                        )
                      ) : (
                        <li className="text-lg">None</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col min-h-full">
                    <h3 className="text-lg text-red-600 font-semibold mb-2">
                      Weaknesses
                    </h3>
                    <ul className="space-y-2 list-disc text-purple-600 flex-grow">
                      {results?.detailed_feedback?.weaknesses?.length ? (
                        results.detailed_feedback.weaknesses.map(
                          (weakness, i) => (
                            <li key={i} className="text-lg">
                              {weakness}
                            </li>
                          )
                        )
                      ) : (
                        <li className="text-lg">None</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col min-h-full">
                    <h3 className="text-lg text-yellow-600 font-semibold mb-2">
                      Improvement Tips
                    </h3>
                    <ul className="space-y-2 list-disc text-purple-600 flex-grow">
                      {results?.detailed_feedback?.improvement_tips?.length ? (
                        results.detailed_feedback.improvement_tips.map(
                          (tip, i) => (
                            <li key={i} className="text-lg">
                              {tip}
                            </li>
                          )
                        )
                      ) : (
                        <li className="text-lg">None</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Job Section */}
              {/* {results?.courses_search_results?.length > 0 && */(
                <div className="bg-white flex p-4 sm:p-6 rounded-xl border border-purple-200 mt-8 shadow-sm" style={{justifyContent:'space-between'}}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Course Recommendation
                  </h2>
                <a href="http://127.0.0.1:5000/" style={{textDecoration:'none'}}><button style={{color:'whitesmoke',backgroundColor:'purple',width:'20vw'}}>go to Courses</button></a>
                  {/* <Courses courses={results.courses_search_results} /> */}
                </div>
              )}
              {results?.job_search_results?.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-purple-200 mt-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Job Listings
                  </h2>
                  <Jobs jobs={results.job_search_results} />
                </div>
              )}
            </div>
          )}
        </div>
        <footer style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
          <p>&copy; 2025 ElevateU.ai. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}