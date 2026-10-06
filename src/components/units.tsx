"use client";

import { useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { buttonVariants } from "@/components/ui/button";
import { mapEmbedUrl, mapLinkUrl, units } from "@/constants/units";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Units() {
  const [activeId, setActiveId] = useState(units[0].id);
  const unit = units.find((u) => u.id === activeId) ?? units[0];
  const many = units.length > 1;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <Reveal>
        <p className="text-[0.7rem] font-medium tracking-[0.25em] text-primary uppercase">
          {many ? "Unidades" : "Onde estamos"}
        </p>
        <h2 className="mt-3 text-4xl leading-tight font-semibold text-balance md:text-5xl">
          Venha nos <span className="text-rose-strong italic">visitar.</span>
        </h2>

        {/* Com mais de uma unidade, a lista troca o mapa ao lado */}
        {many && (
          <div role="tablist" aria-label="Unidades" className="mt-6 flex flex-wrap gap-2">
            {units.map((u) => (
              <button
                key={u.id}
                role="tab"
                aria-selected={u.id === activeId}
                onClick={() => setActiveId(u.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium ring-1 transition-colors",
                  u.id === activeId
                    ? "bg-primary text-primary-foreground ring-primary"
                    : "bg-card text-muted-foreground ring-border hover:text-foreground",
                )}
              >
                {u.name}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-6 space-y-4 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <address className="not-italic">
              <span className="block font-medium">{unit.name}</span>
              <span className="text-muted-foreground">
                {unit.street}, {unit.district}
                <br />
                {unit.city}/{unit.state} · CEP {unit.zip}
              </span>
            </address>
          </li>
          {unit.phone && (
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={unit.phone.href} className="hover:underline">
                {unit.phone.display}
              </a>
            </li>
          )}
          {unit.hours && (
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span className="text-muted-foreground">
                {unit.hours.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </span>
            </li>
          )}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={mapLinkUrl(unit)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "rounded-full px-5")}
          >
            <Navigation /> Como chegar
          </a>
          {unit.phone && (
            <a href={unit.phone.href} className={cn(buttonVariants({ variant: "outline" }), "rounded-full px-5")}>
              <Phone /> Ligar
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border md:aspect-square">
          <AnimatePresence mode="wait" initial={false}>
            <motion.iframe
              key={unit.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              title={`Mapa: ${unit.street}, ${unit.district}, ${unit.city}/${unit.state}`}
              src={mapEmbedUrl(unit)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  );
}
