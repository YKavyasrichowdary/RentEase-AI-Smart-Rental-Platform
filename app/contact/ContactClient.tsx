"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Section,
  SectionHeading,
} from "@/components/rentease/Section";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "support@rentease.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 40 4000 1200",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Gachibowli, Hyderabad 500032",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] =
    useState<string | null>(null);

  const submit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(
        form.email,
      ) ||
      form.message.trim().length < 10
    ) {
      setError(
        "Add your name, a valid email and a message of at least 10 characters.",
      );

      return;
    }

    setError(null);

    setForm({
      name: "",
      email: "",
      message: "",
    });

    toast.success("Message sent", {
      description:
        "The RentEase team will reply within a day.",
    });
  };

  return (
    <Section>
      <SectionHeading
        eyebrow="Contact"
        title="Talk to the RentEase team."
        description="Questions about a listing, a Trust Score or a rent estimate? Send a note and we'll come back to you."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact information */}
        <div className="surface-panel space-y-5 p-6">
          {CONTACT_INFO.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex gap-3.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-4" />
                </span>

                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="mt-0.5 text-sm font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact form */}
        <form
          onSubmit={submit}
          className="surface-panel space-y-5 p-6 sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="c-name">
                Name
              </Label>

              <Input
                id="c-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-email">
                Email
              </Label>

              <Input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="c-msg">
              Message
            </Label>

            <Textarea
              id="c-msg"
              rows={5}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  message:
                    event.target.value,
                }))
              }
            />
          </div>

          {error ? (
            <p className="text-xs text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full"
          >
            Send message
          </Button>
        </form>
      </div>
    </Section>
  );
}