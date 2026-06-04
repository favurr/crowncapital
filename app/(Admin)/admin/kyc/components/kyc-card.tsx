"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface KycCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    kyc?: {
      status: string;
      gender?: string;
      countryCode?: string;
      country?: string;
      phoneNumber?: string;
      documentId?: string;
      idFrontImage?: string;
      idBackImage?: string;
    };
  };
  onCheck: () => void;
}

export default function KycCard({ user, onCheck }: KycCardProps) {
  const kyc = user.kyc;

  const progress = kyc
    ? Math.round(
        ([
          "gender",
          "countryCode",
          "country",
          "phoneNumber",
          "documentId",
          "idFrontImage",
          "idBackImage",
        ].filter((f) => kyc[f as keyof typeof kyc]).length /
          7) *
          100,
      )
    : 0;

  const [openImage, setOpenImage] = useState<string | null>(null);
  const handleImageClick = (src?: string | null) => {
    if (src) setOpenImage(src);
  };

  return (
    <Card className="p-4 flex flex-col gap-4 items-start relative">
      {/* Check KYC button */}
      <div className="absolute top-4 right-4">
        <Button
          className="bg-primary text-white btn-sm cursor-pointer"
          onClick={onCheck}
        >
          Check KYC
        </Button>
      </div>

      <CardContent className="flex flex-col gap-3 w-full">
        {/* Avatar */}
        <Avatar className="w-16 h-16">
          {user.image ? (
            <AvatarImage
              src={user.image || undefined} // Fix TypeScript error
              alt={user.name}
              onClick={() => handleImageClick(user.image)}
              className="cursor-pointer"
            />
          ) : (
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          )}
        </Avatar>

        {/* Name and Email */}
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        {/* KYC Status */}
        <p className="text-xs mt-1">
          Status: {progress === 100 ? "Completed" : "Pending"}
        </p>

        {/* Progress inline */}
        <div className="flex items-center gap-2 w-full">
          <p className="text-xs">{progress + "%"}</p>
          <Progress value={progress} className="flex-1" />
        </div>
      </CardContent>

      {/* Image Dialog */}
      {openImage && (
        <Dialog open={true} onOpenChange={() => setOpenImage(null)}>
          <DialogContent className="max-w-md p-0">
            <DialogHeader>
              <DialogTitle className="px-4 pt-4">Image Preview</DialogTitle>
              <DialogClose className="btn btn-sm absolute right-2 top-2" />
            </DialogHeader>
            <Image
              src={openImage}
              alt="KYC Image"
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
