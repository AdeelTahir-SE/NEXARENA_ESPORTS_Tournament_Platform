"use client";

import { Navbar, Footer } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useState } from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    name: "",
    game: "",
    format: "",
    maxTeams: "32",
    prizePool: "",
    entryFee: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    (async () => {
      try {
        setSubmitting(true);
        // basic client-side validation
        const allowedFormats = ["single_elimination", "double_elimination", "round_robin"];
        if (!formData.game || formData.game.trim().length < 2) {
          setError("Please select a valid game.");
          return;
        }
        if (!allowedFormats.includes(formData.format)) {
          setError("Please select a valid tournament format.");
          return;
        }

        // prepare payload
        const payload = {
          name: formData.name.trim(),
          game: formData.game,
          format: formData.format,
          maxTeams: parseInt(formData.maxTeams || "0", 10),
          prizePool: parseFloat((formData.prizePool || "").replace(/[^0-9.-]+/g, "")) || 0,
          entryFee: parseFloat((formData.entryFee || "").replace(/[^0-9.-]+/g, "")) || 0,
          description: formData.description || undefined,
        };

        const res = await fetch("/api/tournaments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        if (!res.ok) {
          console.error("Create tournament failed:", json);
          setError(json.error || JSON.stringify(json));
          return;
        }

        const id = json.data?.id;
        if (id) window.location.href = `/tournaments/${id}`;
        else window.location.href = "/tournaments";
      } catch (err) {
        console.error(err);
        setError(String(err));
      } finally {
        setSubmitting(false);
      }
    })();
  };

  const games = [
    { value: "valorant", label: "Valorant" },
    { value: "cs2", label: "Counter-Strike 2" },
    { value: "lol", label: "League of Legends" },
    { value: "dota2", label: "Dota 2" },
    { value: "overwatch2", label: "Overwatch 2" },
    { value: "apex", label: "Apex Legends" },
  ];

  const formats = [
    { value: "single_elimination", label: "Single Elimination" },
    { value: "double_elimination", label: "Double Elimination" },
    { value: "round_robin", label: "Round Robin" },
  ];

  const maxTeamsOptions = [
    { value: "4", label: "4 Teams" },
    { value: "8", label: "8 Teams" },
    { value: "16", label: "16 Teams" },
    { value: "32", label: "32 Teams" },
    { value: "64", label: "64 Teams" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Zap size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Create Tournament</h1>
            </div>
            <p className="text-text-secondary">
              Set up your competitive esports tournament and start building your community
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h2 className="text-h3 font-display font-bold mb-4">
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Tournament Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Valorant Pro Championship"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Game Title"
                        name="game"
                        options={games}
                        value={formData.game}
                        onChange={handleChange}
                        required
                      />
                      <Select
                        label="Tournament Format"
                        name="format"
                        options={formats}
                        value={formData.format}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div
                      className="bg-background-elevated border border-border rounded-md p-4"
                    >
                      <label htmlFor="description" className="text-sm font-medium text-text-primary block mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your tournament, rules, and what makes it special..."
                        className="w-full bg-background border border-border rounded-md text-text-primary placeholder:text-text-muted p-3 outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(124,58,237,0.3)] resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div>
                  <h2 className="text-h3 font-display font-bold mb-4">Logistics</h2>
                  <div className="space-y-4">
                    <Select
                      label="Maximum Teams"
                      name="maxTeams"
                      options={maxTeamsOptions}
                      value={formData.maxTeams}
                      onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Prize Pool"
                        name="prizePool"
                        value={formData.prizePool}
                        onChange={handleChange}
                        placeholder="e.g., $50,000"
                      />
                      <Input
                        label="Entry Fee per Team"
                        name="entryFee"
                        value={formData.entryFee}
                        onChange={handleChange}
                        placeholder="e.g., $500"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border flex gap-3">
                  <Link href="/tournaments" className="flex-1">
                    <Button variant="secondary" fullWidth>
                      Cancel
                    </Button>
                  </Link>
                  <div className="flex-1">
                    <Button type="submit" fullWidth disabled={submitting}>
                      {submitting ? "Creating..." : "Create Tournament"}
                    </Button>
                  </div>
                </div>
                {error && <div className="text-sm text-[#EF4444]">{error}</div>}
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
