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
import { Spinner } from "@/Components/ui/spinner";
import { toast } from "@/Components/ui/toast";

const Page = () => {
  const router = useRouter();
  const [initialSettings, setinitialSettings] = useState({});
  const [settings, setsettings] = useState({});
  const [image, setimage] = useState();
  const [loading, setloading] = useState(false);

  const { open } = useSidebar();

  useEffect(() => {
    const loadData = async () => {
      const response = await api.get("settings");
      const data = response.data;
      setsettings(data);
      setinitialSettings(data);
    };
    loadData();
  }, []);

  const isChange =
    initialSettings &&
    JSON.stringify(initialSettings) !== JSON.stringify(settings);

  const handleChanges = async () => {
    setloading(true);
    const data = new FormData();
    const { logo, logo_size, ...remaining } = settings;
    Object.entries(remaining).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (logo != initialSettings.logo) {
      data.append("logo", image);
    }
    try {
      await api.patch("settings", data);
      setinitialSettings({ ...settings });
      toast.add({ title: "Saved Changes Sucessfully" });
    } catch (error) {
      console.log(error);
      for (const field in error.response.data) {
        toast.add({ title:`${field} : ${error.response.data[field]}`  });
      }
    } finally {
      setloading(false);
    }
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
              disabled={loading}
              className="w-full h-full text-center rounded-md bg-slate-700 hover:bg-slate-600 hover:transition-all duration-300 cursor-pointer font-bold text-lg flex items-center justify-center"
            >
              {loading ? <Spinner className="w-10 h-10" /> : "Save Changes"}
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
            value={settings?.name || ""}
            onChange={(e) =>
              setsettings((prev) => ({ ...prev, name: e.target.value }))
            }
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
            onChange={(e) => {
              setimage(
                e.target.files[0],
                setsettings((prev) => ({
                  ...prev,
                  logo: e.target.files[0].name,
                  logo_size: (e.target.files[0].size / (1024 * 1024)).toFixed(
                    2,
                  ),
                })),
              );
            }}
          />
          {settings.logo && (
            <Attachment className="">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{settings.logo}</AttachmentTitle>
                <AttachmentDescription className="flex gap-1">
                  <p className="font-bold uppercase">
                    {settings.logo.split(".")[1]}
                  </p>
                  · <p>{settings.logo_size}</p> MB
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  className="cursor-pointer"
                  onClick={() =>
                    setsettings((prev) => ({
                      ...prev,
                      logo: "",
                      logo_size: null,
                    }))
                  }
                >
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
            value={[settings.access_token]}
            onValueChange={(value) =>
              setsettings((prev) => ({ ...prev, access_token: value }))
            }
            max={120}
            step={1}
          />
          <p>Current Value : {settings.access_token}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-xl font-bold">Refresh Token Lifetime in Days</h1>
          <Slider
            className=" h-1 bg-gray-100"
            value={[settings.refresh_token]}
            onValueChange={(value) =>
              setsettings((prev) => ({ ...prev, refresh_token: value[0] }))
            }
            min={1}
            max={15}
            step={1}
          />
          <p>Current Value : {settings.refresh_token}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
