"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { siteConfig } from "@/lib/siteConfig";
import { Send, CheckCircle2, Mail, Clock, MessageSquare, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot field for bot spam mitigation
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Silently reject bot spam if honeypot is filled
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (trimmedMessage.length < 10) {
      setFormError("Message must be at least 10 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: subject.trim() || "General Inquiry",
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to deliver message.");
      }

      setSubmitted(true);
      success("Message sent successfully!");
    } catch {
      error("Unable to send message. Please try emailing us directly.");
      setFormError(`Failed to send via form. You can also reach us directly at ${siteConfig.contactEmail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
    setFormError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Information Sidebar */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-sm">Direct Support</span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-sm">Response Time</span>
              <span className="text-slate-500 dark:text-slate-400">Within 24–48 business hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
            <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block text-sm">Tool Suggestions</span>
              <span className="text-slate-500 dark:text-slate-400">New features deployed weekly</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/30 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
          <p className="font-bold text-slate-900 dark:text-white">Privacy Guarantee</p>
          <p>
            Your email address is only used to respond to your inquiry. We never share, sell, or subscribe you to marketing newsletters.
          </p>
        </div>
      </div>

      {/* Main Contact Form Container */}
      <div className="lg:col-span-2">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 space-y-4 shadow-lg dark:shadow-xl"
            noValidate
          >
            {/* Honeypot field (hidden from real users, tricks automated spam bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url">Do not fill this field</label>
              <input
                id="website_url"
                type="text"
                tabIndex={-1}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
              />
            </div>

            {formError && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Alex Morgan"
              />
              <Input
                label="Email Address *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="alex@example.com"
              />
            </div>

            <Input
              label="Subject / Topic"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Feature suggestion, bug report, or partnership"
            />

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#090e1c] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Describe what utility you need, provide bug reproduction steps, or share your feedback..."
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full cursor-pointer"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </form>
        ) : (
          <div className="p-12 rounded-3xl bg-white/80 dark:bg-[#0c1322]/80 border border-slate-200/90 dark:border-white/10 text-center space-y-4 shadow-lg">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Delivered</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out! Our engineering team has received your message and will reply back to{" "}
              <strong className="text-slate-900 dark:text-white font-medium">{email}</strong> within 24–48 business hours.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="cursor-pointer">
                Send Another Message
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
