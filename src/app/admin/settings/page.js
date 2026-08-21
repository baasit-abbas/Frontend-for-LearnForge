"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { logout } from "@/utils/serviceClient";
import { useRouter } from "next/navigation";
import api from "@/utils/authClient";
import { Field, FieldLabel } from "@/Components/ui/field";
import { Input } from "@/Components/ui/input";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { FileTextIcon, XIcon } from "lucide-react";
import { useSidebar } from "@/Components/ui/sidebar";
import { GoDotFill } from "react-icons/go";

const Page = () => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [logo, setlogo] = useState("None");
  const [access_token, setaccess] = useState();
  const [refresh_token, setrefresh] = useState();
  const [isChange, setisChange] = useState(false);

  const { open } = useSidebar();

  useEffect(() => {
    const loadData = async () => {
      const data = await api.get("lifetime");
      const settings = data.data;
      setaccess(settings.access_token);
      setrefresh(settings.refresh_token);
      setname(settings.name);
      setlogo(settings.logo);
    };
    loadData();
  }, []);

  useEffect(() => {
    const change = () => {
      setisChange(true)
    }
    change()
  }, [access_token , refresh_token , name , logo])
  

  const handleChanges = async () => {
    const data = await api.patch("lifetime", {
      access_token,
      refresh_token,
      name,
    });
  };

  const handleLogOut = () => {
    logout();
    router.push("/register");
  };
  return (
    <div className="min-h-screen bg-slate-800 px-10 py-30">
      <div
        className={`flex items-center justify-between text-gray-100 fixed top-6  z-10  ${open ? "w-290 left-74" : "w-355 left-10"} transition-all duration-300`}
      >
        <h1 className="font-bold text-5xl">Page Settings</h1>
        <div className="flex gap-4">
          <div className="relative w-50 h-13 rounded-md">
            <button
              onClick={handleChanges}
              className="w-full h-full text-center rounded-md bg-slate-700 hover:bg-slate-600 hover:transition-all duration-300 cursor-pointer font-bold text-lg"
            >
              Save Changes
            </button>
            {isChange && (
              <div className="absolute top-[-10] right-[-8] animate-pulse">
                <GoDotFill size={25} />
              </div>
            )}
          </div>

          <button
            onClick={handleLogOut}
            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 hover:transition-all duration-300 cursor-pointer font-bold text-lg"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-9 justify-center mb-8">
        <Field orientation="horizontal">
          <FieldLabel className="text-xl font-bold w-80" htmlFor="name">
            Change Platform Name:
          </FieldLabel>

          <Input
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Field>
        <Field className="flex" orientation="horizontal w-60">
          <FieldLabel
            className="text-lg font-bold p-1 rounded-md bg-slate-700 transition-all duration-300 hover:bg-slate-600 cursor-pointer "
            htmlFor="logo"
          >
            Change Logo
          </FieldLabel>
          <Input
            id="logo"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setlogo(e.target.files[0])}
          />
          {logo != "None" && (
            <Attachment className="">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{logo.name}</AttachmentTitle>
                <AttachmentDescription className="flex gap-1">
                  <p className="font-bold uppercase">
                    {logo.name.split(".")[1]}
                  </p>
                  · <p>{(logo.size / (1024 * 1024)).toFixed(2)}</p> MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction onClick={() => setlogo("None")}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
        </Field>
      </div>
      <div className="flex flex-col gap-10 justify-center pr-90">
        <h1 className="text-3xl font-bold">Change Lifetime:</h1>
        <div className="flex flex-col gap-3  w-full">
          <h1 className="text-xl font-bold">
            Access Token Lifetime in Minutes
          </h1>
          <Slider
            className=" h-1 bg-gray-100"
            value={[access_token]}
            onValueChange={setaccess}
            max={120}
            step={1}
          />
          <p>Current Value : {access_token}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-xl font-bold">Refresh Token Lifetime in Days</h1>
          <Slider
            className=" h-1 bg-gray-100"
            value={refresh_token}
            onValueChange={setrefresh}
            min={1}
            max={15}
            step={1}
          />
          <p>Current Value : {refresh_token}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
