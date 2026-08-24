import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";

function Field({ id, label, required, error, children, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {!required && <span className="ml-1 text-xs text-ink-faint">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-accent-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function initialForm(ref) {
  return {
    name: "",
    email: "",
    phone: "",
    ref,
    message: ref ? `I would like a quote for VIN ${ref}.` : "",
  };
}

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref") ?? "";

  const [form, setForm] = useState(() => initialForm(ref));
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const successRef = useRef(null);

  useDocumentTitle("Talk to a broker");

  // Re-seed when the ?ref VIN changes (e.g. header link after a vehicle
  // page), so a fresh inquiry never silently carries the previous car.
  useEffect(() => {
    setForm(initialForm(ref));
    setErrors({});
    setSent(false);
  }, [ref]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) {
      nextErrors.message = "Tell us which car you are after, or what you need.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="shell flex justify-center py-20">
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-card focus:outline-none"
        >
          <CheckCircle size={44} className="mx-auto text-sold" weight="fill" />
          <h1 className="mt-4 text-xl font-bold tracking-tight text-ink">
            Request received
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            A broker will get back to you within one business day. In this
            preview build the form does not send anywhere yet; delivery goes
            live together with the auction API integration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Talk to a broker
        </h1>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Tell us what you are looking for, or paste a VIN or lot number. We
          answer with a full landed-cost quote: car, fees, shipping, and
          customs to Klaipėda.
        </p>

        <form
          onSubmit={submit}
          noValidate
          className="mt-8 space-y-5 rounded-lg border border-line bg-white p-6 shadow-card"
        >
          <Field id="name" label="Name" required error={errors.name}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="field"
              value={form.name}
              onChange={set("name")}
              aria-required="true"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="email" label="Email" required error={errors.email}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="field"
                value={form.email}
                onChange={set("email")}
                aria-required="true"
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>
            <Field id="phone" label="Phone" error={errors.phone}>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="field"
                value={form.phone}
                onChange={set("phone")}
              />
            </Field>
          </div>
          <Field
            id="ref"
            label="VIN or lot number"
            error={errors.ref}
            hint="If you already found the car, paste its VIN or lot here."
          >
            <input
              id="ref"
              type="text"
              className="field font-mono"
              value={form.ref}
              onChange={set("ref")}
              aria-describedby="ref-hint"
            />
          </Field>
          <Field id="message" label="What do you need?" required error={errors.message}>
            <textarea
              id="message"
              rows={4}
              className="field resize-y"
              value={form.message}
              onChange={set("message")}
              aria-required="true"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </Field>
          <button type="submit" className="btn-accent w-full">
            Send request
          </button>
        </form>
      </div>
    </div>
  );
}
