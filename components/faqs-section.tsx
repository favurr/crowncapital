"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Search, SearchSlash } from "lucide-react";
import React from "react";

export function FaqsSection() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "company", label: "Company" },
    { id: "account", label: "Account" },
    { id: "wallet", label: "Wallet" },
    { id: "returns", label: "Returns" },
    { id: "contracts", label: "Contracts" },
    { id: "affiliate", label: "Affiliate" },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto min-h-screen w-full py-8 max-w-3xl">
      <div className="px-4 py-16 lg:px-6">
        <h1 className="mb-4 font-semibold text-3xl md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Find answers to common questions about AlphaWealth. Can't find what
          you're looking for? Our support team is here to help.
        </p>

        <InputGroup className="max-w-sm">
          <InputGroupInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs..."
            value={searchTerm}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-wrap gap-1 border-b px-4 md:gap-3">
        {categories.map((cat) => (
          <button
            className="flex flex-col"
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
          >
            <span
              className={cn(
                "p-1 text-muted-foreground text-sm hover:text-primary md:p-2 md:text-base",
                activeCategory === cat.id && "text-primary",
              )}
            >
              {cat.label}
            </span>
            {activeCategory === cat.id && (
              <span className="h-0.5 w-full rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      <Accordion
        className="space-y-2 px-4 py-12 lg:px-6"
        collapsible
        defaultValue="item-1"
        type="single"
      >
        {filtered.map((faq) => (
          <AccordionItem
            className="rounded-md border bg-card/20 shadow outline-none last:border-b has-focus-visible:border-ring data-[state=open]:bg-card"
            key={faq.id}
            value={faq.id.toString()}
          >
            <AccordionTrigger className="px-4 hover:no-underline focus-visible:ring-0">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4 text-muted-foreground">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No FAQs found matching your search.</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              <SearchSlash />
              Clear search
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <div className="flex items-center px-4 py-6 lg:px-6">
        <p className="text-muted-foreground">
          Can't find what you're looking for?{" "}
          <a className="text-primary hover:underline" href="#">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}

const faqs = [
  {
    id: 1,
    category: "company",
    title: "Are you a registered company?",
    content:
      "Yes, Alpha Wealth Chaining Investment is an officially registered, UK-based cloud crypto mining initiative that prides itself on the security of its users",
  },
  {
    id: 2,
    category: "account",
    title: "How do i make a new account?",
    content:
      "Opening a new Elite Wealth Chaining Investment account is easy. Just follow the directions to sign up, enter your details and quickly form an account with your chosen email and password. Once you have agreed to Elite Wealth Chaining Investment terms and conditions, you will receive a confirmation email asking that you verify your email address. If you do not receive a confirmation email, please check your spam folder and adjust your email settings to ensure you don’t miss out on exciting future opportunities reserved for our newsletter recipients. Once you have followed this, you will have access to your new Elite Wealth Chaining Investment account section and be able to begin enjoying the profitable world of Elite Wealth Chaining Investment Mining!",
  },
  {
    id: 3,
    category: "account",
    title: "How do I unlock my account?",
    content:
      "The Elite Wealth Chaining Investment customer support team reserves the ability to unlock your Elite Wealth Chaining Investment account for security reasons. If you require this service, simply use the web contact form to submit a ticket to customer support. We will contact you using your Elite Wealth Chaining Investment account linked email to alert you when your account has been successfully unlocked and is ready for use once more.",
  },
  {
    id: 4,
    category: "account",
    title: "How can I erase my account?",
    content:
      "In the unfortunate occasion that you wish to end your time with Elite Wealth Chaining Investment, closing your account could not be easier. Just get in touch with our friendly customer support team and let them know that you wish to terminate your account. Please remember that if you terminate your account you will permanently lose your stored details and any funds.",
  },
  {
    id: 5,
    category: "wallet",
    title: "Is it possible to set up a new wallet?",
    content:
      "At current, Elite Wealth Chaining Investment does not provide a wallet service. We cannot recommend any specific wallet, only suggest you do your own research to discover the wallet that best suits your needs. We do however feature explanations on different types of crypto wallet available as a starting point for your research. Please be aware that it can take up to 48 hours for changes in linked wallets to be recognised by your Elite Wealth Chaining Investment account.",
  },
  {
    id: 6,
    category: "wallet",
    title: "What are the payment methods and limits by which you operate?",
    content: `Please find an overall list of our payment methods and limits. Elite Wealth Chaining Investment accepts payment methods including credit/debit card (Visa, Mastercard) and cryptocurrency (Bitcoin, Bitcoin Cash, Zcash, Litecoin, Dogecoin).`,
  },
  {
    id: 7,
    category: "returns",
    title: "Can you tell me the expected retums?",
    content:
      "We cannot make any concrete statements regarding your contract’s performance due to the flexibility of the crypto mining market.    However, we can provide a general explanation of mining scenarios and their potential avenues, plus provide guidance on generating your own predictions with some level of accuracy.",
  },
  {
    id: 8,
    category: "returns",
    title: "Can you please explain why my mining output is dropping?",
    content:
      "Crypto Mining users recognise the volatility of the crypto markets and understand we have no outright control over the rewards you enjoy. Occasionally they are less than expected, often they are greater than expected. Reasons for the drop in your mining output performance are mostly temporary and with excellent potential to reverse. If you are concerned by your contract’s performance, please contact our customer support for a swift explanation and sound resolution.",
  },
  {
    id: 9,
    category: "returns",
    title: "How frequent is the payment?",
    content:
      "Elite Wealth Chaining Investment contracts are a simple one time only payment. Certain variations of contract will have a maintenance fee that will be deducted from your mining outputs. These will be expressed clearly to you before you agree to any contract.",
  },
  {
    id: 10,
    category: "contracts",
    title: "How do I get started mining?",
    content:
      "simply signup, invest and our professional account manager mine on your behalf.",
  },
  {
    id: 11,
    category: "contracts",
    title: "My purchase order is expired - Why?",
    content:
      "For those paying for orders via cryptocurrency, there is a 30-minute window in which cryptocurrencies can be sent to the Crypto Mining wallet. After this length of time, the order window expires. Simply set up the payment again and send your funds within 30 minutes or contact our customer support to have the order approved manually.",
  },
  {
    id: 12,
    category: "contracts",
    title: "Can I be refunded?",
    content: "As clearly stated, all orders are non-refundable.",
  },
  {
    id: 13,
    category: "affiliate",
    title: "Can you explain how the affiliate program works?",
    content:
      "The Elite Wealth Chaining Investment affiliate program could not be easier to use or more profitable. It all begins with an affiliate code that is unique to your account. Whenever a user registers and inputs your referral code, they receive 3% discount on whatever purchase they make. And you enjoy a significant hash power boost. The more referrals you make, the higher your affiliate rank rises. And the higher your affiliate rank, the bigger hashpower boost you enjoy. It’s as simple and as profitable as that. We will be sure to remind you via your linked email whenever your referral code is used.",
  },
  {
    id: 14,
    category: "affiliate",
    title: "Can you explain the ranking method?",
    content:
      "Elite Wealth Chaining Investment provides a tiered affiliate program that acknowledges the efforts and results of those who contribute to the growth of our platform. The number of referrals you secure correlates directly to the bonuses you enjoy. Why not see how far up the Elite Wealth Chaining Investment rankings you can climb? With no limit to the rewarding potential of our affiliate program, it’s a great idea!",
  },
  {
    id: 15,
    category: "affiliate",
    title: "How good are the affiliate rewards?",
    content:
      "Elite Wealth Chaining Investment is proud to provide industry-leading reward rates to our affiliate users. From the start of your contribution, you will enjoy 5% of the hashpower your referral chooses to purchase. So if your referral enters your affiliate code then purchases a 10MH/s contract, you enjoy a totally free 25MH/s. They also receive a discount of 3% on the price.",
  },
];
