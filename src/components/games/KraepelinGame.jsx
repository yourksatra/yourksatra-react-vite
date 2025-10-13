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
  const [segmentCounts, setSegmentCounts] = useState([0, 0, 0, 0, 0]);

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
    setSegmentCounts([0, 0, 0, 0, 0]);
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
    <div className="w-full max-w-md mx-auto bg-sky-500 text-white rounded-lg p-4 shadow-lg">
      {/* Header Score & Timer */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <div>Score {score.correct} | {score.wrong}</div>
        <div>{formatTime(timeLeft)}</div>
      </div>

      {/* Soal */}
      <div className="bg-sky-600 text-center py-4 rounded mb-4 text-2xl font-bold">
        {question.a} + {question.b} = ?
      </div>

      {/* Tombol Jawaban */}
      <div className="grid grid-cols-3 gap-2 items-start">
        {keyboardLayout.map((num, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(num)}
            className={`cursor-pointer bg-sky-600 hover:bg-sky-700 transition rounded py-3 text-xl font-semibold ${
              index === keyboardLayout.length - 1 ? "col-start-2" : ""
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Modal Hasil Tes */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-[95%] max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-center">📊 Hasil Tes Kraepelin</h2>

            {/* Grafik */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-center">
                Grafik Produktivitas per Segmen
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={segmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="jumlah"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Statistik */}
            <div className="text-sm md:text-base space-y-2 mb-6">
              <div className="flex justify-between"><span>Total Soal</span><span>{totalQuestions}</span></div>
              <div className="flex justify-between"><span>Benar</span><span>{score.correct}</span></div>
              <div className="flex justify-between"><span>Salah</span><span>{score.wrong}</span></div>
              <div className="flex justify-between"><span>Persentase Benar</span><span>{percentCorrect}%</span></div>
              <div className="flex justify-between"><span>Total Waktu</span><span>{duration} menit</span></div>
              <div className="flex justify-between"><span>Waktu per Segment (S)</span><span>{Math.round(SEGMENT_DURATION)} detik</span></div>
              <div className="flex justify-between"><span>⚡ Kecepatan kerja (PANKER)</span><span>{panker} ({getLabel("panker", Number(panker))})</span></div>
              <div className="flex justify-between"><span>🎯 Ketelitian kerja (TINKER)</span><span>{tinker} ({getLabel("tinker", Number(tinker))})</span></div>
              <div className="flex justify-between"><span>📈 Keajegan kerja (JANKER)</span><span>{janker} ({getLabel("janker", Number(janker))})</span></div>
              <div className="flex justify-between"><span>💪 Ketahanan kerja (HANKER)</span><span>{hanker} ({getLabel("hanker", Number(hanker))})</span></div>
            </div>

            {/* Tombol Kembali */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowModal(false);
                  onEnd({ score, progressData, segmentCounts });
                }}
                className="cursor-pointer bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-500"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
