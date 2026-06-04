"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";

export default function ClientTable() {
  return (
    <Table>
      <TableCaption>Bitcoin Price Across Major Global Currencies</TableCaption>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="flex gap-2 items-end justify-center">
            <Image
              src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png?1696501400"
              alt="BTC logo"
              width={40}
              height={60}
            />
            <span className="text-lg">BTC</span>
          </TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
