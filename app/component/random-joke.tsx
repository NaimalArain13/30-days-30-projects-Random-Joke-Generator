"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Joke {
  setup: string;
  punchline: string;
}
export default function RandomJoke() {
  const [joke, setJoke] = useState<string>("");
  useEffect(() => {
    fetchJoke();
  }, []);
  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: Joke = await response.json();
      console.log(data)
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.log(error);
      setJoke("Failed to fetch Joke. Please Try Again");
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#03c4ff] to-[#ff6b6b] p-4">
      <Card className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#333] text-center">
          😜Random Joke👈{" "}
        </h1>
        <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
          {joke || "Loading..."}
        </div>
        <Button
          className="bg-[#5e4caf] hover:bg-[#4382a0] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          onClick={fetchJoke}
        >
          😂Get Random Joke😂
        </Button>
      </Card>
    </div>
  );
}
