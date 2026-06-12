"use client";

import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Calendar, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { DynamicContent } from "@/components/dynamic-content";

type Grecaptcha = {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

const OSKVID_RECIPIENT_EMAIL = "info@oskvid.com";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const inputClassName =
  "w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-sm focus:border-[#cc5339] focus:outline-none focus:ring-1 focus:ring-[#cc5339]";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    preferredDate: new Date().toISOString().split("T")[0],
    message: "",
    projectWebsite: "", // honeypot (should stay empty)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setStatusMessage({ type: "", text: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({
        type: "error",
        text: "Lūdzu aizpildiet visus obligātos laukus (Vārds, E-pasts, Ziņojums).",
      });
      return;
    }

    setIsSubmitting(true);

    const fullSubject = `Jauna saziņas forma no: ${formData.name} ${formData.surname || ""}`;

    if (formData.projectWebsite) {
      setStatusMessage({
        type: "error",
        text: "Neizdevās validēt iesniegumu. Lūdzu mēģiniet vēlreiz.",
      });
      setIsSubmitting(false);
      return;
    }

    let recaptchaToken = "";

    if (RECAPTCHA_SITE_KEY) {
      const grecaptcha = (window as typeof window & { grecaptcha?: Grecaptcha })
        .grecaptcha;

      if (!grecaptcha) {
        setStatusMessage({
          type: "error",
          text: "reCAPTCHA nav ielādēts. Lūdzu pārlādējiet lapu un mēģiniet vēlreiz.",
        });
        setIsSubmitting(false);
        return;
      }

      try {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          grecaptcha.ready(() => {
            grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
              .then(resolve)
              .catch(reject);
          });
        });
      } catch (captchaError) {
        console.error("reCAPTCHA Error:", captchaError);
        setStatusMessage({
          type: "error",
          text: "Neizdevās apstiprināt, ka neesat robots. Lūdzu mēģiniet vēlreiz.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    const apiPayload = {
      toEmail: OSKVID_RECIPIENT_EMAIL,
      subject: fullSubject,
      name: formData.name,
      surname: formData.surname,
      fromEmail: formData.email,
      preferredDate: formData.preferredDate,
      message: formData.message,
      honeypot: formData.projectWebsite,
      recaptchaToken,
    };

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "Paldies! Jūsu ziņojums ir nosūtīts. Mēs drīz ar jums sazināsimies.",
        });
        setFormData({
          name: "",
          surname: "",
          email: "",
          preferredDate: new Date().toISOString().split("T")[0],
          message: "",
          projectWebsite: "",
        });
      } else {
        console.error("API Error:", result.error);
        setStatusMessage({
          type: "error",
          text: `Kļūda nosūtot ziņojumu: ${result.message || "Servera kļūda."}`,
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatusMessage({
        type: "error",
        text: "Tīkla kļūda. Lūdzu mēģiniet vēlreiz vai rakstiet mums tieši.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#cc5339]">
              <DynamicContent
                contentKey="contactPageTitle"
                fallback="Sazināties"
                as="span"
              />
            </h1>
            <p className="mx-auto max-w-2xl text-gray-500">
              Sazinies ar mums par savu projektu
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
              <h2 className="mb-6 text-xl font-semibold text-[#cc5339]">
                <DynamicContent
                  contentKey="contactPageFormTitle"
                  fallback="Sazināties ar Oskvid"
                  as="span"
                />
              </h2>

              {statusMessage.text && (
                <div
                  className={`p-4 mb-5 rounded-lg flex items-center gap-3 ${
                    statusMessage.type === "success"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle className="h-5 w-5 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0" />
                  )}
                  <p className="text-sm font-medium">{statusMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
                  <div className="space-y-2">
                    <Label htmlFor="name">Vārds *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jūsu vārds"
                      required
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Uzvārds</Label>
                    <Input
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      type="text"
                      placeholder="Jūsu uzvārds"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-pasts *</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="jūsu@epasts.lv"
                    required
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="preferredDate"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Vēlamais datums
                  </Label>
                  <Input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={inputClassName}
                  />
                  <p className="text-xs text-gray-500">
                    Izvēlieties vēlamo datumu pakalpojuma sniegšanai
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Ziņojums *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Aprakstiet savu projektu vai uzdodiet jautājumu..."
                    rows={5}
                    required
                    className={inputClassName}
                  />
                </div>

                <div className="sr-only" aria-hidden="true">
                  <Label htmlFor="projectWebsite">Projekta mājaslapa</Label>
                  <Input
                    id="projectWebsite"
                    name="projectWebsite"
                    value={formData.projectWebsite}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-[#cc5339] hover:bg-[#b8472f] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#cc5339]/50 hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Sūta..." : "Nosūtīt ziņojumu"}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
