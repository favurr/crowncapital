"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type KycPayload = {
  gender?: string;
  countryCode?: string;
  country?: string;
  phoneNumber?: string;
  documentId?: string;
  password?: string;
  idFrontImage?: string | null;
  idBackImage?: string | null;
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
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse rounded ${width} h-${height}`}
    />
  );
}

export default function Kyc() {
  const [data, setData] = useState<KycPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  // Fetch KYC data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/kyc/me");
        const json = await res.json();
        setData(json);
        setFrontPreview(json.idFrontImage ?? null);
        setBackPreview(json.idBackImage ?? null);
      } catch {
        toast.error("Failed to load KYC data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dropzone handlers
  const onDropFront = useCallback((files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
  }, []);

  const onDropBack = useCallback((files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps: getFrontProps, getInputProps: getFrontInput } =
    useDropzone({
      onDrop: onDropFront,
      accept: { "image/*": [] },
      multiple: false,
    });

  const { getRootProps: getBackProps, getInputProps: getBackInput } =
    useDropzone({
      onDrop: onDropBack,
      accept: { "image/*": [] },
      multiple: false,
    });

  const uploadFile = async (file: File | null) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload/kyc", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setIsSaving(true);
    try {
      const idFrontImage = (await uploadFile(frontFile)) ?? frontPreview;
      const idBackImage = (await uploadFile(backFile)) ?? backPreview;

      const res = await fetch("/api/kyc/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, idFrontImage, idBackImage }),
      });

      if (!res.ok) throw new Error();
      toast.success("KYC updated successfully");
      setFrontPreview(idFrontImage);
      setBackPreview(idBackImage);
    } catch {
      toast.error("Failed to update KYC");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl space-y-4">
        <SkeletonRow width="full" height={6} />
        <SkeletonRow width="full" height={6} />
        <SkeletonRow width="full" height={6} />
        <SkeletonRow width="full" height={6} />
        <SkeletonRow width="24" height={10} />
      </div>
    );
  }

  if (!data)
    return <p className="text-sm text-muted-foreground">Failed to load KYC.</p>;

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-lg font-semibold">KYC Verification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Gender</label>
          <input
            value={data.gender ?? ""}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Country Code</label>
          <input
            value={data.countryCode ?? ""}
            onChange={(e) => setData({ ...data, countryCode: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Country</label>
          <input
            value={data.country ?? ""}
            onChange={(e) => setData({ ...data, country: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            value={data.phoneNumber ?? ""}
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Document ID</label>
          <input
            value={data.documentId ?? ""}
            onChange={(e) => setData({ ...data, documentId: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-4">
          {/* Front ID */}
          <div>
            <label className="text-sm font-medium">Front of ID</label>
            <div
              {...getFrontProps()}
              className="w-32 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <input {...getFrontInput()} />
              {frontPreview ? (
                <Image
                  src={frontPreview}
                  alt="Front ID"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-xs text-gray-500">Upload</p>
              )}
            </div>
          </div>

          {/* Back ID */}
          <div>
            <label className="text-sm font-medium">Back of ID</label>
            <div
              {...getBackProps()}
              className="w-32 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <input {...getBackInput()} />
              {backPreview ? (
                <Image
                  src={backPreview}
                  alt="Back ID"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-xs text-gray-500">Upload</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Password (optional)</label>
          <input
            type="password"
            value={data.password ?? ""}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <button
          disabled={isSaving}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save KYC"}
        </button>
      </form>
    </div>
  );
}
