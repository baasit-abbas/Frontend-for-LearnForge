"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { logout } from "@/utils/serviceClient";
import { useRouter } from "next/navigation";
import api from "@/utils/authClient";

const Page = () => {
  const router = useRouter();
  const [access, setaccess] = useState();
  const [refresh, setrefresh] = useState();
  useEffect(() => {
    const loadData = async () => {
      const data = await api.get("lifetime");
      setaccess(data.data.access_token);
      setrefresh(data.data.refresh_token);
    };
    loadData();
  }, []);

  const handleLogOut = () => {
    logout();
    router.push("/register");
  };
  return (
    <div className="min-h-screen bg-slate-800 px-10 py-15">
      <div className="flex flex-col gap-10 justify-center pr-90">
        <h1 className="text-3xl font-bold">Change Lifetime:</h1>
        <div className="flex gap-15 w-full items-center justify-between">
          <h1 className="text-xl font-bold">
            Access Token Lifetime in Minutes
          </h1>
          <div className="w-90 flex flex-col">
            <Slider
              className=" h-1 bg-gray-100"
              value={[access]}
              onValueChange={setaccess}
              max={120}
              step={1}
            />
            <p>Current Value : {access}</p>
          </div>
        </div>

        <div className="flex gap-15 w-full items-center justify-between">
          <h1 className="text-xl font-bold">Refresh Token Lifetime in Days</h1>
          <div className="w-90 flex flex-col">
            <Slider
              className=" h-1 bg-gray-100"
              value={refresh}
              onValueChange={setrefresh}
              min={1}
              max={15}
              step={1}
            />
            <p>Current Value : {refresh}</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-10 right-7">
        <button
          onClick={handleLogOut}
          className="px-7 py-5 rounded-md bg-slate-700 hover:bg-slate-600 hover:transition-all duration-300 cursor-pointer font-bold text-lg"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Page;
