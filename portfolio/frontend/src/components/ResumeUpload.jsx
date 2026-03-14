import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { resumeAPI } from "../utils/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      setStatus("error");
      setMessage("Please upload a PDF file.");
      return;
    }
    setFile(f);
    setStatus("idle");
    setMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage("Parsing resume with AI...");
    try {
      const data = await resumeAPI.uploadResume(file);
      setStatus("success");
      setMessage("Resume parsed and profile updated successfully!");
      setProfile(data.profile);
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.error || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="panel-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText size={16} className="text-cyan-400" />
          <span className="font-mono text-sm text-[#e8e8f0]">Resume Parser</span>
          <span className="ml-auto font-mono text-[10px] text-[#4a4a6a] bg-[#0d0d14] px-2 py-1 rounded border border-[#1e1e32]">
            AI-powered
          </span>
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            file
              ? "border-cyan-400/40 bg-cyan-400/5"
              : "border-[#1e1e32] hover:border-cyan-400/30 hover:bg-cyan-400/2"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <Upload size={24} className={`mx-auto mb-3 ${file ? "text-cyan-400" : "text-[#4a4a6a]"}`} />
          {file ? (
            <>
              <p className="font-mono text-sm text-cyan-400">{file.name}</p>
              <p className="font-body text-xs text-[#4a4a6a] mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-sm text-[#9090b0]">
                Drop your PDF resume here, or click to browse
              </p>
              <p className="font-mono text-xs text-[#4a4a6a] mt-1">Max 10MB</p>
            </>
          )}
        </div>

        {/* Upload button */}
        {file && status !== "success" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleUpload}
            disabled={status === "uploading"}
            className="w-full mt-4 py-3 font-mono text-sm bg-cyan-400 text-[#050508] rounded-lg hover:bg-cyan-400/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {status === "uploading" ? (
              <>
                <Loader size={14} className="animate-spin" />
                {message}
              </>
            ) : (
              "Parse Resume with AI →"
            )}
          </motion.button>
        )}

        {/* Status messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-center gap-2 text-lime-400 bg-lime-400/5 border border-lime-400/20 rounded-lg px-4 py-3"
          >
            <CheckCircle size={14} />
            <span className="font-body text-sm">{message}</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/5 border border-red-400/20 rounded-lg px-4 py-3"
          >
            <AlertCircle size={14} />
            <span className="font-body text-sm">{message}</span>
          </motion.div>
        )}

        {/* Preview parsed data */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 bg-[#0d0d14] border border-[#1e1e32] rounded-lg p-4"
          >
            <p className="font-mono text-xs text-[#4a4a6a] mb-3">Parsed profile preview</p>
            <div className="space-y-1.5">
              <p className="font-mono text-sm text-[#e8e8f0]">{profile.name}</p>
              <p className="font-body text-xs text-[#9090b0]">{profile.title}</p>
              <p className="font-mono text-xs text-cyan-400 mt-2">
                ✓ {(profile.skills?.programmingLanguages || []).length} languages detected
              </p>
              <p className="font-mono text-xs text-cyan-400">
                ✓ {(profile.projects || []).length} projects extracted
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
