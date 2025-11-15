import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LoadingDots } from "../../components/loader-dots/LoadingDots";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const YOUR_EMAIL = "mo.af1376@gmail.com";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
  | string
  | undefined;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as
  | string
  | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
  | string
  | undefined;

type Step = "form" | "sending" | "done" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);

  const canUseEmailJS =
    !!EMAILJS_PUBLIC_KEY && !!EMAILJS_SERVICE_ID && !!EMAILJS_TEMPLATE_ID;

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const isValid =
    title.trim().length > 0 &&
    message.trim().length > 0 &&
    emailRegex.test(userEmail.trim());

  const buildMailto = () => {
    const subject = encodeURIComponent(title.trim());
    const body = encodeURIComponent(`From: ${userEmail}\n\n${message}`);
    return `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  };

  const sendViaEmailJS = async () => {
    const emailjs = await import("@emailjs/browser");
    emailjs.init(EMAILJS_PUBLIC_KEY!);

    const params = {
      title,
      message,
      user_email: userEmail,
      recipient: YOUR_EMAIL,
    };

    return emailjs.send(EMAILJS_SERVICE_ID!, EMAILJS_TEMPLATE_ID!, params);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValid) {
      setError("Please provide a valid email, title, and message.");
      return;
    }

    setStep("sending");

    try {
      if (canUseEmailJS) {
        await sendViaEmailJS();
        setStep("done");
      } else {
        window.location.href = buildMailto();
        setTimeout(() => setStep("done"), 600);
      }
    } catch (err: any) {
      setError(
        err?.text ||
          err?.message ||
          "Something went wrong while sending the message."
      );
      setStep("error");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-y-auto"
      dir="ltr"
    >
      {/* Header */}
      <div className="flex items-start mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </motion.div>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-green-600/40 bg-black/60 shadow-xl p-6 sm:p-8"
        >
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl text-green-400 mb-2">
              <span className="text-green-500">{">"}_</span> Contact
            </h1>
            <p className="text-green-400/70 text-sm">
              Send me a message
            </p>
          </header>

          {/* FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-green-400">Title</label>
                <input
                  ref={titleRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Subject of your message"
                  className="w-full bg-black/40 border border-green-600/50 focus:border-green-400 outline-none rounded-lg px-4 py-3 text-green-200 placeholder-green-700"
                />
              </div>

              <div>
                <label className="block mb-2 text-green-400">Your Email</label>
                <input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="name@example.com"
                  inputMode="email"
                  className="w-full bg-black/40 border border-green-600/50 focus:border-green-400 outline-none rounded-lg px-4 py-3 text-green-200 placeholder-green-700"
                />
                {!userEmail || emailRegex.test(userEmail) ? null : (
                  <p className="text-red-400 text-xs mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-green-400">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                  rows={8}
                  className="w-full bg-black/40 border border-green-600/50 focus:border-green-400 outline-none rounded-lg px-4 py-3 text-green-200 placeholder-green-700 resize-y"
                />
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="bg-green-950/30 border px-10 py-5 cursor-pointer border-green-500/50 text-green-300 hover:bg-green-900/50 hover:text-green-200 hover:border-green-400"
                  variant="outline"
                >
                  Send
                </Button>

                {!canUseEmailJS && (
                  <a
                    href={buildMailto()}
                    className="inline-flex items-center rounded-md border border-green-500/40 px-3 py-2 text-sm hover:bg-green-900/30"
                    onClick={() => setStep("sending")}
                  >
                    Open in your email app
                  </a>
                )}
              </div>
            </form>
          )}

          {/* STATES */}
          {step === "sending" && (
            <div className="py-10 text-center">
              <div className="flex justify-center mb-3">
                <LoadingDots />
              </div>
              <p className="text-green-400">Sending your message…</p>
            </div>
          )}

          {step === "done" && (
            <div className="py-10 text-center">
              <p className="text-green-400 text-lg">
                Message sent successfully ^-^
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => {
                    setTitle("");
                    setUserEmail("");
                    setMessage("");
                    setError(null);
                    setStep("form");
                    titleRef.current?.focus();
                  }}
                  className="bg-green-950/30 border cursor-pointer border-green-500/50 text-green-300 hover:bg-green-900/50 hover:text-green-200 hover:border-green-400"
                  variant="outline"
                >
                  Send another
                </Button>
              </div>
            </div>
          )}

          {step === "error" && (
            <div className="py-10 text-center">
              <p className="text-red-400 text-lg">Send failed</p>
              <p className="text-green-400/70 mt-2">{error}</p>
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  onClick={() => setStep("form")}
                  className="bg-green-950/30 border border-green-500/50 text-green-300 hover:bg-green-900/50 hover:text-green-200 hover:border-green-400"
                  variant="outline"
                >
                  Back
                </Button>
                <a
                  href={buildMailto()}
                  className="inline-flex items-center rounded-md border border-green-500/40 px-3 py-2 text-sm hover:bg-green-900/30"
                  onClick={() => setStep("sending")}
                >
                  Try mailto instead
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
