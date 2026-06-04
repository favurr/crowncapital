"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type AccountPayload = {
  name: string;
  email: string;
  image: string | null;
  phoneNumber: string;
  country: string;
};

function SkeletonRow({
  width = "full",
  height = 4,
}: {
  width?: string;
  height?: number;
}) {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-${width} h-${height}`}
    />
  );
}

export default function AccountInfo() {
  const [data, setData] = useState<AccountPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Fetch account data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/account/me");
        const json = await res.json();
        setData(json);
        setAvatarPreview(json.image ?? null);
      } catch {
        toast.error("Failed to load account data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dropzone setup
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;
    setAvatarFile(acceptedFiles[0]);
    setAvatarPreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Upload avatar to ImageKit
  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile) return avatarPreview ?? null;

    const formData = new FormData();
    formData.append("file", avatarFile);

    const res = await fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Avatar upload failed");

    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setIsSaving(true);
    try {
      const image = await uploadAvatar();

      // Update user data including avatar URL
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          image,
          phoneNumber: data.phoneNumber,
          country: data.country,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Account updated successfully");
      setAvatarPreview(image);
    } catch {
      toast.error("Failed to update account");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Account Information</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal details.
          </p>
        </div>

        {/* Avatar skeleton */}
        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full w-24 h-24" />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <SkeletonRow width="full" height={10} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <SkeletonRow width="full" height={10} />
          </div>
          <div>
            <label className="text-sm font-medium">Phone number</label>
            <SkeletonRow width="full" height={10} />
          </div>
          <div>
            <label className="text-sm font-medium">Country</label>
            <SkeletonRow width="full" height={10} />
          </div>
        </div>

        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse rounded w-24 h-10" />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">Failed to load data.</p>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Account Information</h2>
        <p className="text-sm text-muted-foreground">
          Update your personal details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar */}
        <div>
          <label className="text-sm font-medium mb-2 block">Avatar</label>
          <div
            {...getRootProps()}
            className="w-24 h-24 border border-dashed rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <input {...getInputProps()} />
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : isDragActive ? (
              <p className="text-xs text-gray-500">Drop here</p>
            ) : (
              <p className="text-xs text-gray-500">Upload</p>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={data.email}
            disabled
            className="w-full rounded-md border bg-muted px-3 py-2 text-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone number</label>
          <input
            value={data.phoneNumber}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium">Country</label>
          <input
            value={data.country}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          disabled={isSaving}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
