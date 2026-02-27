"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function KraepelinGame({ duration, layout, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [question, setQuestion] = useState({ a: 0, b: 0 });
  const [keyboardLayout, setKeyboardLayout] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [progressData, setProgressData] = useState([]);
  const [segmentCounts, setSegmentCounts] = useState([0, 0, 0, 0]);

  const endTimeRef = useRef(null);
  const rafRef = useRef(null);
  const answerCount = useRef(0);

  const SEGMENT_DURATION = (duration * 60) / 4;

  const generateQuestion = useCallback(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setQuestion({ a, b });
  }, []);

  // Reset game state
  useEffect(() => {
    setKeyboardLayout(
      layout === "123"
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        : [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
    );
    generateQuestion();
    setTimeLeft(duration * 60);
    setRunning(false);
    setStarted(false);
    setScore({ correct: 0, wrong: 0 });
    setProgressData([]);
    answerCount.current = 0;
    setSegmentCounts([0, 0, 0, 0]);
    cancelAnimationFrame(rafRef.current);
  }, [layout, generateQuestion, duration]);

  const startTimer = () => {
    endTimeRef.current = Date.now() + duration * 60 * 1000;
    const tick = () => {
      const now = Date.now();
      const remainSec = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
      setTimeLeft(remainSec);
      if (remainSec <= 0) {
        setRunning(false);
        setShowModal(true);
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleAnswer = (val) => {
    if (timeLeft <= 0) return;
    if (!started) {
      setStarted(true);
      setRunning(true);
      startTimer();
    }
    const correctAnswer = (question.a + question.b) % 10;
    const isCorrect = val === correctAnswer;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (!isCorrect ? 1 : 0),
    }));
    answerCount.current += 1;

    const elapsed = duration * 60 - timeLeft;
    const raw = Math.floor(elapsed / SEGMENT_DURATION);
    const segmentIndex = Math.min(4, raw);
    setSegmentCounts((prev) => {
      const updated = [...prev];
      updated[segmentIndex] = (updated[segmentIndex] || 0) + 1;
      return updated;
    });

    setProgressData((prev) => {
      const last = prev[prev.length - 1] || { totalBenar: 0, totalSalah: 0 };
      return [
        ...prev,
        {
          soal: answerCount.current,
          benar: isCorrect ? 1 : 0,
          salah: isCorrect ? 0 : 1,
          totalBenar: last.totalBenar + (isCorrect ? 1 : 0),
          totalSalah: last.totalSalah + (!isCorrect ? 1 : 0),
        },
      ];
    });
    generateQuestion();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (/^[0-9]$/.test(e.key)) handleAnswer(Number(e.key));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Rumus Kraepelin
  const totalQuestions = score.correct + score.wrong;
  const percentCorrect = totalQuestions > 0
    ? ((score.correct / totalQuestions) * 100).toFixed(0)
    : 0;
  const maxQuestionsPerMinute = 50;
  const pankerValuePerMinute = totalQuestions / duration;
  const panker = Math.min(
    ((pankerValuePerMinute / maxQuestionsPerMinute) * 100).toFixed(0),
    100
  );
  const tinker = totalQuestions > 0
    ? Math.min(((score.correct / totalQuestions) * 100).toFixed(0), 100)
    : 0;
  const totalSegments = segmentCounts.length || 1;
  const mean = segmentCounts.reduce((a, b) => a + b, 0) / totalSegments;
  const variance = segmentCounts.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / totalSegments;
  const stdDev = Math.sqrt(variance || 0);
  const janker = mean > 0
    ? Math.max(0, Math.min(100, (100 - (stdDev / mean) * 100).toFixed(0)))
    : 0;
  const hanker =
    segmentCounts[0] > 0
      ? Math.max(
        0,
        Math.min(
          100,
          (
            (segmentCounts[segmentCounts.length - 1] / segmentCounts[0]) *
            100
          ).toFixed(0)
        )
      )
      : 0;

  const getLabel = (metric, value) => {
    if (metric === "panker" || metric === "tinker" || metric === "janker") {
      if (value < 40) return "Rendah";
      if (value < 70) return "Sedang";
      if (value < 85) return "Tinggi";
      return "Sangat Tinggi";
    }
    if (metric === "hanker") {
      if (value < 50) return "Rendah";
      if (value < 70) return "Sedang";
      if (value < 90) return "Tinggi";
      return "Sangat Tinggi";
    }
    return "";
  };

  // Data grafik mulai dari S1
  const segmentChartData = segmentCounts.map((val, idx) => ({
    segment: `S${idx + 1}`,
    jumlah: val,
  }));

  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl glass-card-strong">
        {/* Header Score & Timer */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-500 px-5 py-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="bg-white/20 rounded-lg px-2 py-0.5">✅ {score.correct}</span>
            <span className="bg-white/20 rounded-lg px-2 py-0.5">❌ {score.wrong}</span>
          </div>
          <div className="text-lg font-black tracking-widest font-mono">{formatTime(timeLeft)}</div>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900">
          {/* Soal */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-center py-6 rounded-2xl mb-5 shadow-sm">
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {question.a} + {question.b} = ?
            </span>
          </div>

          {/* Tombol Jawaban */}
          <div className="grid grid-cols-3 gap-2.5 items-start">
            {keyboardLayout.map((num, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(num)}
                className={`cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:bg-sky-50 dark:hover:bg-sky-600/10 hover:border-sky-300 dark:hover:border-sky-600/30 text-slate-900 dark:text-white transition-all duration-150 rounded-xl py-3.5 text-xl font-bold shadow-sm hover:-translate-y-0.5 active:scale-95 ${index === keyboardLayout.length - 1 ? "col-start-2" : ""
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {
        showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-200 dark:border-white/10">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-sky-600 to-blue-500 p-5 text-white">
                <h2 className="text-xl font-bold text-center">📊 Hasil Tes Kraepelin</h2>
              </div>
              <div className="p-5">
                {/* Grafik */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-center text-slate-700 dark:text-slate-200">
                    Grafik Produktivitas per Segmen
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={segmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.15)" />
                      <XAxis dataKey="segment" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12 }}
                        labelStyle={{ color: '#a5b4fc' }}
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                      <Line type="monotone" dataKey="jumlah" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Statistik */}
                <div className="space-y-2 mb-6">
                  {[
                    { label: "Total Soal", val: totalQuestions },
                    { label: "Benar", val: score.correct, color: "text-green-500" },
                    { label: "Salah", val: score.wrong, color: "text-red-500" },
                    { label: "Persentase Benar", val: `${percentCorrect}%` },
                    { label: "Total Waktu", val: `${duration} menit` },
                    { label: "Waktu per Segment", val: `${Math.round(SEGMENT_DURATION)} detik` },
                    { label: "⚡ PANKER", val: `${panker} (${getLabel("panker", Number(panker))})` },
                    { label: "🎯 TINKER", val: `${tinker} (${getLabel("tinker", Number(tinker))})` },
                    { label: "📈 JANKER", val: `${janker} (${getLabel("janker", Number(janker))})` },
                    { label: "💪 HANKER", val: `${hanker} (${getLabel("hanker", Number(hanker))})` },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                      <span className="text-slate-600 dark:text-slate-400">{label}</span>
                      <span className={`font-semibold ${color || "text-slate-900 dark:text-white"}`}>{val}</span>
                    </div>
                  ))}
                </div>

                {/* Tombol Kembali */}
                <button
                  onClick={() => { setShowModal(false); onEnd({ score, progressData, segmentCounts }); }}
                  className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-500 text-white font-semibold hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-sky-600/25"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

