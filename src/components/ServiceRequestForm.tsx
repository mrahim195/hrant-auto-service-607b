"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { serviceOptions } from "@/lib/site";

type Status = "idle" | "loading" | "ok" | "err";

function CustomSelect({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!btnRef.current?.parentElement?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <span className="field-label">
        {label}
        {required ? <span className="req">*</span> : null}
      </span>
      <input type="hidden" name={name} value={value} />
      <button
        ref={btnRef}
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        {value || "Select a service"}
        <span aria-hidden="true">▾</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            className="select-list"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className={value === opt ? "is-selected" : undefined}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function DatePicker({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const d = value ? new Date(value + "T12:00:00") : new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const reduce = useReducedMotion();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const first = new Date(view.y, view.m, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function pick(day: number) {
    const d = new Date(view.y, view.m, day);
    if (d < today) return;
    // Skip Sundays (shop closed Sat/Sun - also skip Saturdays)
    if (d.getDay() === 0 || d.getDay() === 6) return;
    const iso = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  }

  const labelText = value
    ? new Date(value + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Optional preferred day";

  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="select-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {labelText}
        <span aria-hidden="true" className="select-chevron">
          ▾
        </span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="datepicker"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-label="Choose a preferred weekday"
          >
            <div className="datepicker__nav">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() =>
                  setView((v) =>
                    v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }
                  )
                }
              >
                ‹
              </button>
              <strong>
                {new Date(view.y, view.m).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </strong>
              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setView((v) =>
                    v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }
                  )
                }
              >
                ›
              </button>
            </div>
            <div className="datepicker__dow" aria-hidden="true">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="datepicker__grid">
              {cells.map((day, i) => {
                if (day === null) return <span key={`e-${i}`} />;
                const d = new Date(view.y, view.m, day);
                const iso = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const disabled =
                  d < today || d.getDay() === 0 || d.getDay() === 6;
                const selected = value === iso;
                const isToday = d.getTime() === today.getTime();
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled}
                    className={[
                      selected ? "is-selected" : "",
                      isToday ? "is-today" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => pick(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <p className="datepicker__hint">
              Weekdays only. This is a preferred day request, not a confirmed
              appointment.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ServiceRequestForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduce = useReducedMotion();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const vehicle = String(data.get("vehicle") || "").trim();
    const details = String(data.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!phone) nextErrors.phone = "Please enter a phone number.";
    else if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!service) nextErrors.service = "Please select a service.";
    if (!details) nextErrors.message = "Tell us a bit about the issue.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("err");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          service,
          vehicle,
          preferredDate: preferredDate || undefined,
          message: details,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send request.");
      setStatus("ok");
      setMessage(
        "Request sent. The shop will follow up by phone during business hours."
      );
      form.reset();
      setService("");
      setPreferredDate("");
      setErrors({});
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Send failed. Try again.");
    }
  }

  return (
    <form
      className={`service-form ${compact ? "service-form--compact" : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-grid">
        <label className={`field ${errors.name ? "has-error" : ""}`}>
          <span className="field-label">
            Name <span className="req">*</span>
          </span>
          <input name="name" autoComplete="name" placeholder="Your name" />
          {errors.name ? (
            <span className="field-error" role="alert">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className={`field ${errors.phone ? "has-error" : ""}`}>
          <span className="field-label">
            Phone <span className="req">*</span>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="626-555-0142"
          />
          {errors.phone ? (
            <span className="field-error" role="alert">
              {errors.phone}
            </span>
          ) : null}
        </label>

        <label className={`field ${errors.email ? "has-error" : ""}`}>
          <span className="field-label">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Optional"
          />
          {errors.email ? (
            <span className="field-error" role="alert">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="field">
          <span className="field-label">Vehicle</span>
          <input
            name="vehicle"
            placeholder="Year, make, model"
            autoComplete="off"
          />
        </label>

        <CustomSelect
          label="Service needed"
          name="service"
          options={serviceOptions}
          value={service}
          onChange={setService}
          error={errors.service}
          required
        />

        <DatePicker
          label="Preferred weekday"
          name="preferredDate"
          value={preferredDate}
          onChange={setPreferredDate}
        />
      </div>

      <label className={`field ${errors.message ? "has-error" : ""}`}>
        <span className="field-label">
          What is going on? <span className="req">*</span>
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Noises, warning lights, brake feel, recent work…"
        />
        {errors.message ? (
          <span className="field-error" role="alert">
            {errors.message}
          </span>
        ) : null}
      </label>

      <motion.button
        className="btn btn-primary"
        type="submit"
        disabled={status === "loading"}
        whileTap={reduce || status === "loading" ? undefined : { scale: 0.97 }}
      >
        {status === "loading" ? "Sending…" : "Send service request"}
      </motion.button>

      {message ? (
        <p
          className={`form-msg ${status === "ok" ? "ok" : "err"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
