'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";
import IncomeCalculator from "@/components/calculators/RequiredIncomeCalc";
import LandTransferTaxCalculator from "@/components/calculators/LandTransferCalc";
import TotalMonthlyCostCalculator from "@/components/calculators/TotalMonthlyCost";
import MaxMortgageCalculator from "@/components/calculators/MaxMortgage";
import MortgagePaymentCalculator from "@/components/calculators/MortgagePaymentCalc";
export default function Page() {
  // State to store active calculator and its label
  const [activeCalculator, setActiveCalculator] = useState<string>('#max-mortgage');
  const [activeLabel, setActiveLabel] = useState<string>('Select Calculator'); // Default text

  const handleSelectChange = (calculator: string, label: string) => {
    setActiveCalculator(calculator);
    setActiveLabel(label); // Update label when a calculator is selected
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#083784] w-full py-20 px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl">
          Be Sure With Our Mortgage Calculators
        </h1>
        <p className="text-md md:text-xl font-semibold text-white mb-4">
          Take the Guesswork Out of Mortgage Planning | Use Our Tools to Make Confident Decisions
        </p>
        <p className="text-sm md:text-lg text-white mb-8 max-w-4xl">
          This structure emphasizes trust and clarity, reassuring users they can rely on the calculators to make informed choices.
        </p>

        {/* Dropdown with Chevron */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-between border border-black text-md md:text-xl py-4 px-6 rounded-xl font-bold transition duration-300 w-full max-w-sm bg-black text-white">
              {activeLabel}
              <ChevronDown size={30} className="ml-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select a Calculator</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSelectChange('#max-mortgage', 'Max Mortgage Calculator')}>
              Max Mortgage Calculator
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectChange('#mortgage-payment', 'Payment Calculator')}>
              Payment Calculator
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectChange('#required-income', 'Required Income')}>
              Required Income
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectChange('#monthly-cost', 'Monthly Cost Calculator')}>
              Monthly Cost Calculator
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelectChange('#land-transfer-tax', 'Land Transfer Tax')}>
              Land Transfer Tax
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Calculator Section */}
      <section className="py-10 w-full px-2">
        {activeCalculator === '#required-income' && <IncomeCalculator />}
        {activeCalculator === '#mortgage-payment' && <MortgagePaymentCalculator />}
        {activeCalculator === '#monthly-cost' && <TotalMonthlyCostCalculator />}
        {activeCalculator === '#max-mortgage' && <MaxMortgageCalculator />}
        {activeCalculator === '#land-transfer-tax' && <LandTransferTaxCalculator />}
      </section>
    </>
  );
}
