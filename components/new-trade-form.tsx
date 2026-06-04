"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  account: z.string(),
  market: z.string(),
  pair: z.string(),
  time: z.string(),
  amount: z.string(),
});

const NewTradeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      market: "",
      pair: "",
      time: "",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Account type"
                      {...field}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Account Type</SelectLabel>
                      <SelectItem {...field} value="demo">
                        Demo Account ($100,000.00)
                      </SelectItem>
                      <SelectItem {...field} value="real">
                        Real Account ($0.00)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="market"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Markets</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a market" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Markets</SelectLabel>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="stock">Stocks</SelectItem>
                      <SelectItem value="indicies">Indicies</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pair"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pairs</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a pair" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pairs</SelectLabel>
                      <SelectItem value="usdt_btc">USDT/BTC</SelectItem>
                      <SelectItem value="usdt_eth">USDT/ETH</SelectItem>
                      <SelectItem value="usdt_trx">USDT/TRX</SelectItem>
                      <SelectItem value="usdt_sol">USDT/SOL</SelectItem>
                      <SelectItem value="usdt_ltc">USDT/LTC</SelectItem>
                      <SelectItem value="usdt_bnb">USDT/BNB</SelectItem>
                      <SelectItem value="usdt_link">USDT/LINK</SelectItem>
                      <SelectItem value="usdt_ftt">USDT/FTT</SelectItem>
                      <SelectItem value="usdt_shib">USDT/SHIB</SelectItem>
                      <SelectItem value="usdt_etc">USDT/ETC</SelectItem>
                      <SelectItem value="usdt_tfuel">USDT/TFUEL</SelectItem>
                      <SelectItem value="usdt_ada">USDT/ADA</SelectItem>
                      <SelectItem value="usdt_vet">USDT/VET</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Time frame" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time</SelectLabel>
                      <SelectItem value="1min">1min</SelectItem>
                      <SelectItem value="2min">2mins</SelectItem>
                      <SelectItem value="3min">3mins</SelectItem>
                      <SelectItem value="4min">4mins</SelectItem>
                      <SelectItem value="5min">5mins</SelectItem>
                      <SelectItem value="6min">6mins</SelectItem>
                      <SelectItem value="7min">7mins</SelectItem>
                      <SelectItem value="8min">8mins</SelectItem>
                      <SelectItem value="9min">9mins</SelectItem>
                      <SelectItem value="10min">10mins</SelectItem>
                      <SelectItem value="15min">15mins</SelectItem>
                      <SelectItem value="20min">20mins</SelectItem>
                      <SelectItem value="30min">30mins</SelectItem>
                      <SelectItem value="60min">60mins</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trade Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Amount in USDT" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-between">
          <Button
            type="submit"
            variant="destructive"
            size="lg"
            className="w-4/12"
          >
            Sell
          </Button>
          <Button type="submit" size="lg" className="w-4/12">
            Buy
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTradeForm;
