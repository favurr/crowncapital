"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface KycDialogProps {
  user: {
    name: string;
    email: string;
    kyc?: {
      gender?: string;
      countryCode?: string;
      country?: string;
      phoneNumber?: string;
      documentId?: string;
      idFrontImage?: string;
      idBackImage?: string;
      status: string;
    };
    image?: string | null;
  };
  onClose: () => void;
}

export default function KycDialog({ user, onClose }: KycDialogProps) {
  const kyc = user.kyc;
  const [openImage, setOpenImage] = useState<string | null>(null);

  const handleImageClick = (src?: string | null) => {
    if (src) setOpenImage(src);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{user.name}&aposs KYC Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4 items-start">
          {/* Avatar */}
          <Avatar
            className="w-24 h-24 mx-auto cursor-pointer"
            onClick={() => handleImageClick(user.image)}
          >
            {user.image ? (
              <AvatarImage src={user.image || undefined} alt={user.name} />
            ) : (
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            )}
          </Avatar>

          {/* Email */}
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          {kyc ? (
            <>
              <p>
                <strong>Gender:</strong> {kyc.gender || "-"}
              </p>
              <p>
                <strong>Country:</strong> {kyc.country || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {kyc.phoneNumber || "-"}
              </p>
              <p>
                <strong>Document ID:</strong> {kyc.documentId || "-"}
              </p>

              {/* KYC Images */}
              <div className="flex gap-2 mt-2">
                {kyc.idFrontImage && (
                  <Image
                    src={kyc.idFrontImage}
                    alt="ID Front"
                    className="w-24 h-16 object-cover border cursor-pointer"
                    onClick={() => handleImageClick(kyc.idFrontImage)}
                  />
                )}
                {kyc.idBackImage && (
                  <Image
                    src={kyc.idBackImage}
                    alt="ID Back"
                    className="w-24 h-16 object-cover border cursor-pointer"
                    onClick={() => handleImageClick(kyc.idBackImage)}
                  />
                )}
              </div>

              <p className="mt-2">
                <strong>Status:</strong> {kyc.status}
              </p>
            </>
          ) : (
            <p>KYC not submitted</p>
          )}
        </div>

        <DialogClose className="mt-4 btn w-full">Close</DialogClose>

        {/* Image Preview Dialog */}
        {openImage && (
          <Dialog open={true} onOpenChange={() => setOpenImage(null)}>
            <DialogContent className="max-w-md p-0">
              <DialogHeader>
                <DialogTitle className="px-4 pt-4">Image Preview</DialogTitle>
                <DialogClose className="btn btn-sm absolute right-2 top-2" />
              </DialogHeader>
              <Image
                src={openImage}
                alt="Preview"
                className="w-full object-contain"
              />
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
