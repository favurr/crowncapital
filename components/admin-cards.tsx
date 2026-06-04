import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import {
  Bitcoin,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Tags,
  UserRound,
  TrendingUpDown,
} from "lucide-react";

export async function AdminCards() {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
    where: {
      role: "USER",
    },
  });

  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {users.length} users
            </CardTitle>
            <CardAction>
              <UserRound size={"32px"} />
            </CardAction>
          </CardHeader>
        </Card>
        {/* <Card className="@container/card">
          <CardHeader>
            <CardDescription>Accumulating Balance</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $0.00
            </CardTitle>
            <CardAction>
              <CircleDollarSign size={"32px"} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-row gap-1.5 text-sm">
            <div className="flex-1">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <Bitcoin className="size-3.5" /> BTC
              </div>
              <div className="text-muted-foreground">0.00000000</div>
            </div>
            <div className="">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                Bonus
              </div>
              <div className="text-muted-foreground">0.00000000</div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Trade Status</CardDescription>
            <CardAction>
              <TrendingUpDown size={"32px"} />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-row items-start gap-1.5 text-sm">
            <div className="flex-1">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <ChevronUp
                  strokeWidth={"10px"}
                  className="size-6 text-primary"
                />{" "}
                0
              </div>
              <div className="text-muted-foreground">Total Won</div>
            </div>
            <div className="">
              <div className="line-clamp-1 flex items-center gap-2 font-medium">
                <ChevronDown
                  strokeWidth={"10px"}
                  className="size-6 text-destructive"
                />{" "}
                0
              </div>
              <div className="text-muted-foreground">Total Loss</div>
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Crypto Plan</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <div className="line-clamp-1 flex gap-2 text-sm! font-normal!">
                Package Status:
              </div>
              Silver
            </CardTitle>
            <CardAction>
              <Tags size={"32px"} />
            </CardAction>
          </CardHeader>
        </Card> */}
      </div>
    </>
  );
}
