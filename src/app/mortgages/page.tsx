'use client';
import MiniCard from '@/components/MiniCard';
import MiniCardRate from '@/components/MiniCardRates'
import Card from '@/components/MortgageCard';
import Link from 'next/link';
import Mortgage1 from '../../../public/images/mortgages/mortgages-1.svg';
import Mortgage2 from '../../../public/images/mortgages/mortgages-2.svg';
import Mortgage3 from '../../../public/images/mortgages/mortgages-3.svg';
import Mortgage9 from '../../../public/images/mortgages/mortgages-9.svg';
import FirstTimeHomeBuyerContent from '@/components/popup/FirstTimeHomeBuyer';
import RenewMortgageContent from '@/components/popup/MortgageRenewal';
import RefinanceMortgageContent from '@/components/popup/MortgageRefinance';
import CustomSolutionsForm from '@/components/popup/CustomSolutions';
import { ModalProvider, useModal } from '@/components/ModalContext';
import CustomSolutionsCard from '@/components/CustomSolutionsCard';
import StrategyVideo from '@/components/videos/StrategyVideo';
  
export default function MortgagePage() {

  return (
      <ModalProvider>
          {/* Hero Section */}
          <section className="bg-[#083784] w-full py-16 px-2 md:px-8 text-center flex flex-col items-center justify-center">
              <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-2 md:mb-6 md:max-w-4xl">
              Find a Better Mortgage Solution for You
              </h1>
              <p className="text-md md:text-xl font-semibold text-white mb-2 md:mb-4">
              Tailored Mortgage Solutions to Fit Your Life and Financial Goals
              </p>
              <p className="text-sm md:text-lg text-white mb-8 max-w-4xl">
              Whether you&apos;re buying your first home, refinancing, or renewing your mortgage, 
              we&apos;re here to guide you every step of the way.
              </p>

              {/* Disclaimer Section
              <p className="text-[11px] text-center text-gray-700 mt-4 px-2 max-w-2xl mx-auto">
              </p> */}

              {/* Buttons Section */}
              <div className="flex gap-4 flex-col md:flex-row mt-8">
                  <Link href="#first-time-homebuyer" className="border border-white text-white hover:bg-white hover:text-[#083784] text-md md:text-lg py-4 px-6 rounded-xl font-bold">
                      FIRST TIME HOMEBUYER
                  </Link>
                  <Link href="#mortgage-refinance" className="border border-white text-white hover:bg-white hover:text-[#083784] text-md md:text-lg py-4 px-6 rounded-xl font-bold">
                      MORTGAGE REFINANCE
                  </Link>
                  <Link href="#mortgage-renewal" className="border border-white text-white hover:bg-white hover:text-[#083784] text-md md:text-lg py-4 px-6 rounded-xl font-bold">
                      MORTGAGE RENEWAL
                  </Link>
                  <Link href="#custom-solutions" className="border border-white text-white hover:bg-white hover:text-[#083784] text-md md:text-lg py-4 px-6 rounded-xl font-bold">
                      CUSTOM SOLUTIONS
                  </Link>
              </div>
        </section>
        

        <section className="py-16 pb-0 px-6 md:px-8 flex flex-col items-center" id="rates">
          <h2 className="text-2xl md:text-4xl font-bold mb-10">Current Rates</h2>

            <MiniCardRate
                title="Variable Rate: 4.45%"
                title2="Fixed Rate: 4.19%"
                description='These are the available rates and not guaranteed. Every mortgage solution is specifically tailored to you and your financial goals. Rates available to you are dependent on your current income, credit, debt, and employment.'
                description2=""
                content={null}
                content2={null}
                // description="Predictable payments that remain consistent throughout the term of the mortgage."
                
                // content={
                //   <div className="text-gray-700">
                //       <h4 className="text-lg font-semibold mb-4">Key Aspects of Fixed-Rate Mortgages:</h4>
                //       <ul className="list-disc pl-6 mb-6 space-y-2">
                //       <li>
                //           <strong>Interest Rate Stability:</strong> Since the interest rate is locked in at the beginning of the term, you won&apos;t be affected by any rate hikes during that period. 
                //           This offers predictability and makes it easier to plan your finances, as you&apos;ll know exactly how much you&apos;ll pay each month.
                //       </li>
                // </div>
                // }
            />
        </section>

        {/* Understanding Rates Section */}
        <section className="py-16 px-6 md:px-8 flex flex-col items-center" id="rates">
          <h2 className="text-2xl md:text-4xl font-bold mb-10">Understanding Rates</h2>

          <MiniCard
            title="Fixed Rate"
            description="Predictable payments that remain consistent throughout the term of the mortgage."
            
            content={
              <div className="text-gray-700">
                  <h4 className="text-lg font-semibold mb-4">Key Aspects of Fixed-Rate Mortgages:</h4>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                      <strong>Interest Rate Stability:</strong> Since the interest rate is locked in at the beginning of the term, you won&apos;t be affected by any rate hikes during that period. 
                      This offers predictability and makes it easier to plan your finances, as you&apos;ll know exactly how much you&apos;ll pay each month.
                  </li>
                  <li>
                      <strong>Term vs. Amortization:</strong> The term refers to the length of time your mortgage agreement is in place, while amortization is the total length of time it will 
                      take to fully repay your mortgage. For example, you might have a 5-year fixed-rate mortgage term with a 25-year amortization period. At the end of the 5-year term, you&apos;ll 
                      need to renew or refinance the remaining balance.
                  </li>
                  <li>
                      <strong>Early Payment Penalties:</strong> One drawback of fixed-rate mortgages is that breaking the mortgage contract early (for example, if you sell your home or refinance 
                      before the term ends) can result in hefty penalties. These penalties are usually calculated using an Interest Rate Differential (IRD) or a set amount of months&apos; interest, whichever is higher.
                  </li>
                  <li>
                      <strong>Higher Initial Rates:</strong> Fixed-rate mortgages typically have slightly higher interest rates than variable-rate mortgages at the outset, as they offer the 
                      security of predictable payments. Lenders price this in as a premium for the borrower&apos;s peace of mind.
                  </li>
                  <li>
                      <strong>Portability:</strong> Many fixed-rate mortgages in Canada are portable, meaning you can transfer your mortgage to a new property if you move, without incurring 
                      penalties or losing your interest rate. This can be useful if you expect to relocate but still want the stability of a fixed rate.
                  </li>
                  <li>
                      <strong>Common Terms:</strong> Fixed-rate mortgages are available in various term lengths, but the 5-year fixed-rate mortgage is the most popular choice. It strikes a balance 
                      between rate security and flexibility, giving you enough time to weather potential market changes before you need to renegotiate.
                  </li>
                  </ul>
                  <h5 className="text-lg font-semibold mb-2">Pros:</h5>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Predictable Payments: The fixed interest rate means your payments remain consistent, making budgeting easier.</li>
                  <li>Protection from Rate Increases: Even if market rates rise, your rate stays the same for the entire term.</li>
                  </ul>
                  <h5 className="text-lg font-semibold mb-2">Cons:</h5>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Less Flexibility: You may face significant penalties if you need to break the mortgage early.</li>
                  <li>Potentially Higher Cost: Fixed rates are often higher than variable rates when you first sign the mortgage, especially during periods when interest rates are relatively low.</li>
                  </ul>
                  <h5 className="text-lg font-semibold mb-2">Renewal Process:</h5>
                  <p>
                  When the term of your fixed-rate mortgage ends, you&apos;ll have to renew it. This could involve renegotiating the interest rate, changing the term, or even switching to a variable rate 
                  or another lender. If interest rates have fallen, you could benefit from a better deal. However, if rates have risen, you&apos;ll need to accept the higher rate unless you qualify for 
                  and find a better deal with a new lender.
                  </p>
            </div>
            }
          />
          <MiniCard
          title="Variable Rate"
          description="Payments stay fixed, but the interest and principal portions vary with rate changes, affecting amortization."
          content={
              <div className="text-gray-700">
              <h4 className="text-lg font-semibold mb-4">Key Aspects of Variable-Rate Mortgages (VRMs):</h4>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                  <strong>Fixed Payments with Variable Allocation:</strong> While your monthly payment remains the same, rising rates reduce the portion allocated to the principal, while falling rates increase it.
                  </li>
                  <li>
                  <strong>Impact on Amortization:</strong> Rising rates can lead to longer amortization periods, while falling rates can help shorten the term by increasing principal repayment.
                  </li>
                  <li>
                  <strong>Trigger Rate and Point:</strong> If rates rise to your trigger rate or trigger point, your balance and amortization may increase, potentially requiring higher payments or lump sums to manage the mortgage.
                  </li>
                  <li>
                  <strong>Risk of Payment Shock:</strong> At renewal, if rates have remained high or increased, you may face significantly higher payments to stay on track.
                  </li>
                  <li>
                  <strong>Negative Amortization Risk:</strong> If rates rise above the trigger point and your payments remain fixed, your mortgage balance can increase instead of decrease, leading to extended repayment terms.
                  </li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">Pros:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Lower Penalties for Breaking: VRMs usually carry a 3-month interest penalty instead of higher IRD calculations.</li>
                  <li>If Rates Fall: More of your payment will go towards the principal, helping you pay off the mortgage faster.</li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">Cons:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Payment Shock at Renewal: Rising rates may result in significantly higher payments at renewal.</li>
                  <li>Negative Amortization Risk: Fixed payments during rising rates may not cover interest, increasing the mortgage balance.</li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">Managing a VRM:</h5>
              <p>
                  VRMs require careful monitoring, especially during periods of rising rates. Lenders may contact you to raise your payments or make a lump sum payment if you hit your trigger point before renewal.
              </p>

              <h5 className="text-lg font-semibold mb-2">When Does a VRM Work Best?</h5>
              <p>
                  A VRM can work well if you expect rates to remain stable or decrease, allowing more payments to go towards the principal. However, you must be prepared for possible payment increases if rates rise during your term.
              </p>
              </div>
          }
          />
          <MiniCard
          title="Adjustable-Rate Mortgage (ARM)"
          description="Payments adjust with interest rate changes, keeping your mortgage on track regardless of rate fluctuations."
          content={
              <div className="text-gray-700">
              <h4 className="text-lg font-semibold mb-4">Key Aspects of Adjustable-Rate Mortgages (ARMs):</h4>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                  <strong>Payment Adjustments:</strong> With an ARM, your payments increase or decrease as interest rates change, maintaining a consistent mortgage timeline.
                  </li>
                  <li>
                  <strong>Amortization Remains Stable:</strong> Even with rate changes, the total length of your mortgage is unaffected, keeping you on track to repay on schedule.
                  </li>
                  <li>
                  <strong>No Trigger Rate or Point:</strong> ARMs do not rely on a trigger rate, so the mortgage balance won’t increase unexpectedly if rates rise.
                  </li>
                  <li>
                  <strong>Gradual Payment Increases:</strong> If rates rise, payments adjust gradually, allowing time for financial planning and avoiding sudden shocks.
                  </li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">Pros:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Consistency: Adjusted payments ensure that your mortgage is repaid on time, even with fluctuating rates.</li>
                  <li>Long-Term Savings: When rates drop, payments decrease, providing immediate budget relief.</li>
                  <li>Lower Penalties: Like other variable products, ARMs often carry lower penalties if you switch lenders (3 months&apos; interest).</li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">Cons:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Payment Increases: Rising rates can lead to higher monthly payments, requiring careful budget management.</li>
                  <li>Uncertainty: ARM borrowers must be prepared for payment changes during the loan term.</li>
              </ul>

              <h5 className="text-lg font-semibold mb-2">When Does an ARM Work Best?</h5>
              <p>
                  An ARM is ideal for borrowers who can handle fluctuating payments and want to avoid the risk of negative amortization. It provides peace of mind that your mortgage will remain on schedule, even if rates increase.
              </p>

              <h5 className="text-lg font-semibold mb-2">Managing an ARM:</h5>
              <p>
                  ARMs offer a flexible way to manage mortgage payments, especially during periods of falling rates. As rates decline, you&apos;ll benefit from lower payments without the risk of accumulating unpaid interest.
              </p>

              <h5 className="text-lg font-semibold mb-2">Why Choose an ARM?</h5>
              <p>
                  The ARM&apos;s gradually adjusting payments offer a more manageable solution for borrowers who prefer to avoid sudden payment shocks at renewal. This product ensures that rising rates won&apos;t derail your repayment schedule, providing stability across varying market conditions.
              </p>
              </div>
          }
          />


        </section>
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Mortgage Types</h2>
        <section id="first-time-homebuyer" className="py-16 px-6 md:px-8 flex justify-center">

          <Card
              subContent={<FirstTimeHomeBuyerContent />}
              title="First Time Home Buyers Mortgage"
              subtitle="Buying your first home can be an exciting journey, but knowing how to secure the right mortgage is essential."
              content={
              <>
                  <ul className="list-disc pl-5 mb-4 text-left">
                  <li><strong>Review Your Finances:</strong> We help you assess your income, expenses, and how a new mortgage will affect your budget.</li>
                  <li><strong>Pre-Approval:</strong> Secure pre-approval to know your price range when looking at homes.</li>
                  <li><strong>Expert Guidance:</strong> We’ll provide advice on the steps to obtain your first mortgage with ease.</li>
                  </ul>
                  <p className="font-semibold mb-2">When Applying, You’ll Need:</p>
                  <ul className="list-disc pl-5 text-left">
                  <li>Accepted Offer To Purchase Agreement</li>
                  <li>MLS Real Estate Listing</li>
                  <li>Salary letter and paystub (or financial statements for self-employed buyers)</li>
                  <li>Confirmation of your down payment (bank statements or gift letter)</li>
                  <li>List of assets and debts</li>
                  <li>For new builds: building plans, land survey, and builder agreement</li>
                  </ul>
              </>
              }
              image={<Mortgage1 className="w-full" />}
          />
          </section>

          <section id="mortgage-refinance" className="py-16 px-6 md:px-8 flex justify-center">
          <Card
              subContent={<RefinanceMortgageContent />}
              title="Mortgage Refinance"
              subtitle="Tap into the equity of your home to consolidate debt or fund your dreams. Refinancing your mortgage gives you access to additional money while potentially lowering your interest rate and monthly payments."
              content={
              <>
                  <ul className="list-disc pl-5 mb-4 text-left">
                  <li><strong>Lower Interest Rates:</strong> Secure a lower fixed rate compared to your existing mortgage, saving you money over time.</li>
                  <li><strong>Access Funds:</strong> Use your home’s equity for renovations, education, a dream vacation, or other life goals.</li>
                  <li><strong>Consolidate Debt:</strong> Simplify your finances by consolidating multiple mortgages or debts into one convenient monthly payment.</li>
                  </ul>
                  <p className="font-semibold mb-2">Benefits of Refinancing:</p>
                  <ul className="list-disc pl-5 text-left">
                  <li>Pay off high-interest debt like credit card bills and other loans with a lower mortgage interest rate.</li>
                  <li>Free up emergency cash or fund large purchases.</li>
                  <li>Finance multiple properties, including rentals, through a refinance.</li>
                  </ul>
              </>
              }
              image={<Mortgage2 className="w-full" />}
          />
          </section>
          {/* Mortgage Renewal Card */}
          <section id="mortgage-renewal" className="py-16 px-6 md:px-8 flex justify-center">
          <Card
              subContent={<RenewMortgageContent />}
              title="Mortgage Renewal"
              subtitle="Don&apos;t settle for your lender&apos;s default renewal offer. Let us shop around for you to secure a better rate and terms that fit your needs. We make the mortgage renewal process easier, faster, and more cost-effective."
              content={
              <>
                  <ul className="list-disc pl-5 mb-4 text-left">
                  <li><strong>Better Rates:</strong> We compare rates from multiple lenders to ensure you get the most competitive deal.</li>
                  <li><strong>Avoid Overpaying:</strong> Don&apos;t get locked into a high rate just because it&apos;s convenient—let us find the best offer.</li>
                  <li><strong>Tailored Advice:</strong> We help you choose the renewal package that matches your financial goals and lifestyle.</li>
                  </ul>
                  <p className="font-semibold mb-2">Additional Benefits:</p>
                  <ul className="list-disc pl-5 text-left">
                  <li><strong>Flexibility:</strong> Adjust your mortgage terms to better suit your current financial situation—whether you need shorter terms, lower monthly payments, or a flexible payment schedule.</li>
                  <li><strong>Save on Interest:</strong> Renewing at a lower interest rate can save you thousands over the life of your mortgage.</li>
                  <li><strong>Stress-Free Process:</strong> We handle the research, negotiation, and paperwork so that you can focus on what matters most.</li>
                  <li><strong>Loyalty Benefits:</strong> Some lenders may offer special rates and perks for switching at renewal—let us help you find those hidden gems.</li>
                  </ul>
              </>
              }
              image={<Mortgage3 className="w-full h-full flex-1" />}  // SVG for the right-side image
          />
          </section>
          {/* Custom Solutions Section */}
          <section id="custom-solutions" className="py-16 px-6 md:px-8 bg-white text-black mb-8">

              {/* <Card
                  title="Explore Our Custom Mortgage Solutions"
                  subtitle='Our custom mortgage solutions are designed to meet your unique needs, whether you’re buying an investment property, refinancing, or looking for a self-employed mortgage.'
                  subContent={<CustomSolutionsForm />}
                  content={
                      <ul className="list-disc pl-5 space-y-4">
                          {customSolutions.map((solution, index) => (
                          <li
                              key={index}
                              className="cursor-pointer text-blue-600 hover:underline"
                              onClick={() => handleSolutionClick(solution)}
                          >
                              {solution.title}
                          </li>
                          ))}
                      </ul>
                  }
                  image={<Mortgage9 className="w-full h-full md:h-[300px]" />}
                /> */}
                <CustomSolutionsCard />
          </section>
    </ModalProvider>

  );
}
