import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Trusted worldwide, Voices From the Community
          </h2>
          <p>
            AlphaWealth delivers a smoother, smarter trading experience. Iur
            community's feedback shows how much it elevates their day-to-day
            investing.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  A program like AlphaWealthChainingInvestment has given me the
                  ability to run the kind of one-on-one business I have always
                  wanted to build. It provides a level of structure, clarity,
                  and control that allows me to focus on my clients in a more
                  personal and effective way. Since using it, I have seen a
                  noticeable improvement in how we operate and how we deliver
                  value. The platform helps streamline every part of our process
                  and makes it easier to stay connected with clients while
                  maintaining consistency and professionalism in everything we
                  do. It is genuinely helping us grow and move the entire
                  business into a stronger, more refined, and more professional
                  direction.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <Image
                      src="/customer.jpg"
                      alt="Simone Washington"
                      height="400"
                      width="400"
                      loading="lazy"
                      className="aspect-square size-full"
                    />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="text-sm font-medium">
                      Simone Washington
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      Irvine, CA, USA
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  I've always liked good stylish programs, but never invested
                  quite enough to have a good profit. Now, thanks to Elite
                  Wealth Chaining Investment, we have a program we can be proud
                  of.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/jonathan.webp"
                      alt="Jonathan Yombo"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Aisha Patel</cite>
                    <span className="text-muted-foreground block text-sm">
                      Johannesburg, GP, ZA
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Easy, Fast And reliable. got my profits immediately after
                  trading. Elite Wealth Chaining Investment is Awesome
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/yucel.webp"
                      alt="Liam Thompson"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>LT</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Liam Thompson</cite>
                    <span className="text-muted-foreground block text-sm">
                      Toronto, ON, CAN
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="card variant-mixed">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Thanks for the opportunity Elite Wealth Chaining Investment.
                  And, thanks Janalle for assisting me till the end of my trade.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/rodrigo.webp"
                      alt="Valentina Romero"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>VR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Valentina Romero</p>
                    <span className="text-muted-foreground block text-sm">
                      Córdoba, ARG
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
