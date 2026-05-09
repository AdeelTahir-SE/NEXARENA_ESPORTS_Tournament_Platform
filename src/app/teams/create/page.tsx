"use client";

import { Navbar, Footer } from "@/components/shared";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useState } from "react";
import { Users } from "lucide-react";
import Link from "next/link";

export default function CreateTeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    game: "",
    description: "",
    maxMembers: "5",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating team:", formData);
    // Handle team creation
  };

  const games = [
    { value: "valorant", label: "Valorant" },
    { value: "cs2", label: "Counter-Strike 2" },
    { value: "lol", label: "League of Legends" },
    { value: "dota2", label: "Dota 2" },
    { value: "overwatch2", label: "Overwatch 2" },
    { value: "apex", label: "Apex Legends" },
  ];

  const memberOptions = [
    { value: "3", label: "3 Players" },
    { value: "4", label: "4 Players" },
    { value: "5", label: "5 Players" },
    { value: "6", label: "6 Players" },
    { value: "10", label: "10 Players" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="px-6 py-12 border-b border-border bg-background-surface/50">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Users size={32} className="text-primary" />
              <h1 className="text-h1 font-display font-bold">Create Team</h1>
            </div>
            <p className="text-text-secondary">
              Build your competitive team and invite players to join
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
                    Team Information
                  </h2>
                  <div className="space-y-4">
                    <Input
                      label="Team Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Eternal Knights"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Primary Game"
                        name="game"
                        options={games}
                        value={formData.game}
                        onChange={handleChange}
                        required
                      />
                      <Select
                        label="Team Size"
                        name="maxMembers"
                        options={memberOptions}
                        value={formData.maxMembers}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="bg-background-elevated border border-border rounded-md p-4">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-text-primary block mb-2"
                      >
                        Team Description (Optional)
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell players about your team, your goals, and your playing style..."
                        className="w-full bg-background border border-border rounded-md text-text-primary placeholder:text-text-muted p-3 outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(124,58,237,0.3)] resize-none"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-text-primary">
                    <span className="font-semibold">Pro Tip:</span> After creating
                    your team, you'll be able to invite other players to join. Make
                    sure your team information is clear and accurate to attract the
                    right players.
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border flex gap-3">
                  <Link href="/teams" className="flex-1">
                    <Button variant="secondary" fullWidth>
                      Cancel
                    </Button>
                  </Link>
                  <button type="submit" className="flex-1">
                    <Button fullWidth>Create Team</Button>
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
