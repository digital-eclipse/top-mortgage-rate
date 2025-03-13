// blogs.ts

export interface Blog {
    id: string;
    title: string;
    slug: string;        // URL-friendly slug, for routing
    content: string;     // Main content of the blog
    author: string;
    publishDate: string; // ISO string for the date, for example '2024-09-25'
    tags?: string[];     // Optional tags for categorization or filtering
    categories?: string[]; // Optional categories for broader grouping
    featuredImage: string; // Path to the blog's featured image
    readTime?: string;      // Optional read time estimate, e.g., "5 min read"
  }
  
  const blogs: Blog[] = [
    {
        id: '1',
        title: 'Mortgages for the Self-Employed',
        slug: 'mortgages-for-the-self-employed',
        content: `
          When it comes to self-employed individuals seeking a mortgage, there are some key things to note as this process can differ from the standard mortgage.
      
          For self-employed individuals with an established business seeking best rate financing, the business must have a minimum of two years of history. This includes self-employed applicants who own a full or part-time business and covers sole proprietorships, incorporations, and partnerships.
      
          In order to obtain a mortgage when self-employed, most lenders require Revenue Canada personal tax Notices of Assessment and respective T1 Generals be included with the mortgage application for the previous two years. Typically, individuals who can provide these documents – with acceptable income levels – should have little issue obtaining a mortgage product and rates available to the traditional borrower.
      
          One primary benefit of being self-employed is the privilege of writing your income down. You enjoy less tax because you get to write-off expenses, but you lose borrowing power. It is important to be aware of this because you can either pay less tax or have more borrowing power.
      
          As a self-employed individual, you will fall into one of the following three categories:
      
          1. You can provide the tax documents and you have a high enough income, so there aren’t any initial impediments to your application.
          2. You can provide the Revenue Canada / Revenue Quebec documents, but don’t have enough stated income due to write-offs. In this case, you need a minimum of 10% down with standard interest rates.
          3. If you put down less than 20% down payment when relying on stated income, the default insurance premiums are higher.
          4. You cannot provide the Revenue Canada / Revenue Quebec documents, which means you will be required to put down 20% and may have higher interest rates.
      
          For a typical borrower, lenders often require a letter of employment and recent pay stubs to confirm and calculate income. When it comes to calculating income for a self-employed application, lenders will either take an average of two years’ income or your most recent annual income if it’s lower. When it comes to submitting your mortgage application, you will need to provide the standard documentation in addition to the following:
      
          - For incorporated businesses – two years of accountant prepared financial statements (Income Statement and Balance Sheet)
          - Two most recent years of Personal NOAs (Notice of Assessments) and tax returns
          - Potentially 6-12 months of business bank statements
          - Confirmation that HST/Source Deductions are current
      
          If you’re self-employed and looking to qualify for a mortgage, or simply have some questions for when you are ready in the future, please don’t hesitate to reach out today! We would be happy to work with you to ensure you have the necessary documentation, understand your options and can obtain a pre-approval to help you understand how much you qualify for.
        `,
        author: 'Mike Moore',
        publishDate: '2024-12-23',
        tags: ['mortgage', 'self-employed', 'financing'],
        categories: ['Mortgages', 'Self-employed', 'Financial Planning'],
        featuredImage: '/images/blog/blog-1.svg',
        readTime: '5 min read',
    },
    {
        id: '2',
        title: '7 Steps for Mortgage Prep',
        slug: '7-steps-for-mortgage-prep',
        content: `
            **Step 1 – Your Credit Score**  
            Whether you qualify for a mortgage through a bank, credit union or other financial institution, you should be aiming for a credit score of 680 for at least one borrower (or guarantor), especially if you are putting under 20% down. If you are able to make a larger down payment of 20% or more, then a score of 680 may not be required.
            
            Here are some tips to help you improve your credit:
            - Paying your bills in full and on time. If you cannot afford the full amount, try paying at least the minimum required.
            - Pay off your debts (such as loans, credit cards, lines of credit, etc.) as quickly as possible.
            - Stay within your credit card limit and try to keep your balances as low as possible.
            - Reduce the number of credit card or loan applications you submit.
            - Consider an Alternative Lender (or B Lender) if you are struggling with credit issues.
            
            We can help review your credit score and provide you with options for your mortgage needs.
            
            **Step 2 – Your Budget**  
            When considering your budget, it is important to look at the purchase price budget, as well as your cash flow budget. Being house rich and cash poor makes for a no-fun home! The home price based on your cash flow budget may be dramatically different from the budget home price you qualify for. Not only does having a budget help you to understand your purchase price range and help you to find an affordable home, but it can also help you to see any gaps or opportunities for future savings. This will be instrumental when you become responsible for mortgage payments.
            
            **Step 3 – Your Down Payment**  
            The ideal down payment for purchasing a home is 20%. However, we understand in today’s market that is not always possible. Therefore, it is important to note that any potential home buyer with less than a 20% down payment must purchase default insurance on the mortgage, and they must have a minimum down payment of 5%.
            
            **Step 4 – Your Mortgage Options**  
            Rate is only one of the many features in selecting the best mortgage product that meets your financial goals. With access to hundreds of lending institutions, we are familiar with a variety of mortgage products allowing us to help find the best mortgage for you.
            
            **Step 5 – Your Paperwork**  
            When you apply for a mortgage, you will typically need to provide a standard package of documents, which almost always includes:
            - Your government-issued personal identification
            - Most recent pay stub (Employee)
            - Letter of employment (Employee)
            - Last 2 Years of T4’s (Employed)
            - Most recent T1 generals and NOA’s (Self-Employed)
            - Confirmation of business ownership (Self-Employed)
            - 3 months of bank account statements (Self-Employed)
            - Two years’ worth of personal CRA tax filings and financials (If Incorporated)
            - Your down payment (minimum 5%)
            
            **Step 6 – Your Pre-Approval**  
            To have the best success with your mortgage, it is recommended that you get pre-approved. Pre-approval helps verify your budget and locks in a rate for up to 120 days, protecting you from interest rate increases.
            
            **Step 7 – You’re Ready to Shop**  
            Once you have your down payment and have qualified for a pre-approved mortgage, you are ready to start searching for your perfect home.
        `,
        author: 'Mike Moore',
        publishDate: '2024-11-30',
        tags: ['mortgage', 'preparation', 'financial planning'],
        categories: ['Mortgages', 'Financial Preparation', 'Home Buying'],
        featuredImage: '/images/blog/blog-2.svg',
        readTime: '6 min read',
    },
    {
        id: '3',
        title: 'Get Better Credit With The 5 C’s',
        slug: 'get-better-credit-with-the-5-cs',
        content: `
          Buying your first home is an incredible step in life, but it is not without its hurdles! One of which is demonstrating that you are creditworthy, which all comes down to your ability to manage credit. This is how lenders and credit agencies determine the interest rate you pay. A higher credit rating could mean a lower interest rate and save you thousands of dollars over the life of your mortgage.
          
          There are several attributes that lenders consider before granting credit, and these are commonly referred to as the “Five C’s” and consist of: Character, Capacity, Capital, Collateral and Conditions. Let’s take a closer look at each:
          
          **Character:** The first C focuses on YOU and your personal habits, specifically whether you have the nature to pay debts on time. It includes factors like whether you habitually pay your bills on time, have delinquent accounts, your total outstanding debt, and how you use your available credit.
          
          *Quick Tip:* Using all or most of your available credit is not advised. It is better to increase your credit limit versus utilizing more than 70% of what is available each month. For instance, if you have a limit of $1,000 on your credit card, you should never go over $700. If you need to increase your score faster, a good place to start is using less than 30% of your credit limit. If you need to use more, pay off your credit cards early so you do not go above 30%.
          
          **Capacity:** Capacity refers to your ability to pay back the loan and factors in your cash flow versus your outstanding debt, as well as your employment history. Lenders calculate this by taking your total monthly debt payments divided by your gross monthly income.
          
          **Capital:** Capital is the amount of money that a borrower puts towards a potential loan. For mortgages, this is your down payment. A larger down payment often results in better rates and better terms.
          
          **Collateral:** Collateral is what you pledge against the loan for security of repayment. For mortgages, lenders look at the value of the property and your overall net worth.
          
          **Conditions:** Conditions refer to the terms of the loan, such as the interest rate, loan amount, and the purpose of the loan. Loans with specific purposes, like mortgages or home improvement loans, are generally more likely to be approved.
          
          There is no better time than now to recognize the importance of your credit score and check if you are on track with the Five C’s. If you want more information, please don’t hesitate to reach out to us today!
        `,
        author: 'Mike Moore',
        publishDate: '2024-10-29',
        tags: ['credit', 'home buying', 'financial planning'],
        categories: ['Credit Score', 'Home Buying', 'Financial Planning'],
        featuredImage: '/images/blog/blog-3.svg',
        readTime: '8 min read',
      },
      {
        id: '4',
        title: 'Should You Use Spare Cash to Pay Off a Mortgage or Invest?',
        slug: 'should-you-use-spare-cash-to-pay-off-mortgage-or-invest',
        content: `
          It’s a long-running debate: What’s the best way to get the most from your hard-earned dollars?
          You have debts to pay, retirement savings to pad, and an investment portfolio to build. 
          If you find yourself with a bit more money than expected — maybe because you’re spending less while hunkered down during the pandemic — you have options for how to use that extra cash flow.
      
          There’s no one-size-fits-all approach. You have to consider your appetite for risk and your long-term goals.
      
          Timing can also play an important role. Today, mortgage rates are near all-time lows while stocks continue to reach new highs.
      
          Which is why many people are asking themselves: Should I use it to pay off my mortgage or invest in the stock market? Here are some pros and cons to help you with that decision.
      
          Option 1: Pay off your mortgage early
      
          Let’s make the math easy, and presume you’re not buying in a major city that’s experiencing record price appreciation:
      
          - You borrow $200,000 on a 25-year loan.
          - Your interest rate is level at 3 per cent.
          - Your mortgage loan payment is $946.50 per month.
          - If you increase your mortgage payment by an extra $1,000 per month, the Government of Canada’s mortgage calculator shows you’ll pay off your mortgage in 10 years and save $52,738 in interest — that’s a big number.
      
          Pros:
          - Peace of mind: Paying off your mortgage brings comfort and helps some homeowners sleep better.
          - Less financial risk: Mortgage payments can feel burdensome when trying to take on other financial risks.
          - Cash flow flexibility: Paying down your mortgage frees up cash for other debts like credit cards or student loans.
          - Equity building: Paying down your mortgage builds equity, which could be helpful for the future.
      
          Cons:
          - Cash liquidity: Paying too much towards your mortgage could reduce the real cash you have access to.
          - Missed opportunities: By focusing on your mortgage, you could miss out on higher returns from other investments.
      
          Option 2: Invest in the stock market
      
          Let’s compare how much you can earn by investing instead of paying off your mortgage early.
      
          - Instead of adding $1,000 every month to your mortgage repayments, you invest that money for 10 years.
          - The long-term annual return rate on the S&P/TSX Composite Index was 9.3 per cent per year between 1960 and 2020.
          - In total, you’d earn $193,453 before taxes, according to an investment returns calculator.
      
          Pros:
          - Higher returns: You could potentially earn $193,453 by investing, while only saving $52,738 in interest by paying off your mortgage early.
          - Tax benefits: Investing in an RRSP can offer tax-sheltered gains.
      
          Cons:
          - Risk: The stock market is not guaranteed, and there’s always a possibility of loss.
          - Certainty of savings: Paying off a fixed-rate mortgage offers guaranteed savings, while investing comes with risk.
      
          Weigh your options and decide what helps you sleep better at night while still achieving the financial gains you’re aiming for.
        `,
        author: 'Mike Moore',
        publishDate: '2024-08-24',
        tags: ['mortgage', 'investment', 'financial planning'],
        categories: ['Financial Planning', 'Investment', 'Mortgage'],
        featuredImage: '/images/blog/blog-4.svg',
        readTime: '10 min read',
      },{
        id: '5',
        title: 'Low Rates Helping Borrowers Pay Off Mortgages at Record Pace',
        slug: 'low-rates-helping-borrowers-pay-off-mortgages',
        content: `
          Home prices may be astronomical in certain parts of the country, but historically low mortgage rates are allowing borrowers to pay off their mortgages faster than ever.
      
          At today’s average rates, 61% of a new homebuyer’s very first mortgage payment is going towards principal repayment, according to data from Edge Realty Analytics.
      
          In the early 2000s, that percentage was 26.5%. The change is even more drastic when looking back at the 1990s, where just 11.9% of a homebuyer’s first payment went towards paying down the principal, or the 1980s, when that percentage was a minuscule 4.6%.
      
          The result is a much faster build-up of equity over a short period of time, so long as interest rates remain low.
      
          After the first five years of mortgage payments, today’s homebuyers borrowing at today’s prevailing rates will have paid back more than a fifth of their mortgage (16.5%). Here’s a look at how that compares to past decades:
      
          - Early 2000s: 26.5% of the first payment went to principal repayment.
          - 1990s: 11.9% of the first payment went to principal repayment.
          - 1980s: 4.6% of the first payment went to principal repayment.
      
          “Homeownership represents a very aggressive forced saving program,” Mortgage Professionals Canada noted in its annual consumer report.
      
          “As a result (and even before we consider the impact of price growth) housing equity is built very rapidly,” the report noted. “This excellent ‘net affordability’ goes a long way to explaining why homebuying activity has remained strong in Canada and why a large majority of Canadians see homeownership as financially better than renting, despite the rapid run-up in house prices and the higher burden of mortgage (principal plus interest) payments.”
      
          Not only have low interest rates allowed borrowers to repay their mortgages more quickly, but it’s also kept housing moderately “affordable” despite the 38.4% run-up in average home price in the past 12 months.
      
          “If it were not for the extremely low interest rate, most cities in Canada, especially Toronto, Ottawa, Vancouver, and Montreal, would be in overvalued territory,” Alberta Central chief economist Charles St-Arnaud wrote in a recent analysis. “It means that the main driver for affordability is the record low level of interest rates.”
      
          But Rates Won’t Stay Low Forever
      
          All good things must come to an end, and that goes for ultra-low mortgage rates.
      
          The Bank of Canada has made it abundantly clear that it expects to start raising interest rates by late next year.
      
          How much rates will increase in the Bank’s next rate-hike cycle is anyone’s guess. But for what it’s worth, markets are pricing in at least eight 25-bps hikes over the next five years, which would bring Canada’s overnight rate to 2.25%, up two percentage points from its current record-low of 0.25%.
      
          But even a more modest rise in rates of as little as 100-150 basis points could “push the valuation metrics into overvalued territory,” St-Arnaud noted, making today’s still somewhat “affordable” housing market patently unaffordable for most.
      
          “Our simulations show that many cities in Canada will struggle with housing affordability as interest rates increase,” he added. “A 150-bps increase in mortgage rates could be enough to generate significant headwinds on some housing markets and house prices.”
        `,
        author: 'Mike Moore',
        publishDate: '2024-06-25',
        tags: ['mortgage', 'interest rates', 'real estate'],
        categories: ['Mortgage', 'Real Estate', 'Market Trends'],
        featuredImage: '/images/blog/blog-5.svg',
        readTime: '8 min read',
      },
      {
        id: '6',
        title: 'Insured and Uninsured Mortgage Stress Test Changes Confirmed for June 1',
        slug: 'insured-uninsured-mortgage-stress-test-changes',
        content: `
          Starting June 1, both insured and uninsured mortgage borrowers will be subject to a stricter stress test when qualifying for their mortgage.
      
          The Office of the Superintendent of Financial Institutions (OSFI) confirmed on Thursday that it will move ahead with its stress test changes first announced last month, which will apply to uninsured mortgages (typically those with more than a 20% down payment).
      
          Soon after, the Department of Finance confirmed it will follow OSFI’s lead, and apply the same higher qualifying rate to insured mortgages, or those with less than 20% down.
      
          In both cases, borrowers will need to prove they can afford payments based on the higher of the contract rate plus 2%, or a new floor rate of 5.25%, up from the current 4.79%.
      
          “The recent and rapid rise in housing prices is squeezing middle class Canadians across the entire country and raises concerns about the stability of the overall market,” Finance Minister Chrystia Freeland said in a statement. “The federal government will align with OSFI by establishing a new minimum qualifying rate for insured mortgages…It is vitally important that homeownership remain within reach for Canadians.”
      
          Both OSFI and the DoF said they will review the floor rate annually, likely each December at a minimum.
      
          The Impact on Borrowers
      
          Applying the higher stress test to insured borrowers will impact roughly 1 in 5 mortgage borrowers, according to data from the Bank of Canada. It will also take direct aim at first-time borrowers who are more likely to be putting less than 20% down on a mortgage.
      
          The higher minimum stress test is expected to cut maximum buying power by between 4% and 4.5%. For a median-income household, that would reduce the maximum purchase price from $442,000 to $422,000, according to previous estimates from National Bank.
      
          It’s estimated that this change will reduce purchasing power for uninsured borrowers by between 4% and 4.5%. By comparison, the B-20 stress test implemented in January 2019 requiring homebuyers to qualify at the higher of either the 5-year posted rate or the contractual rate plus 200 basis points reduced purchasing power by 22%.
      
          “Today’s news is both bad news and good news for (first-time buyers),” wrote Rob McLister, mortgage editor at RATESDOTCA. “Obviously, it cuts buying power, but that also means fewer people will be able to bid as much for homes, reducing some price pressure.”
      
          Mortgage Professionals Canada issued a statement to members on Thursday, noting it was disappointed that the minister decided to move so quickly in applying the stricter stress test to insured mortgages.
      
          “Given the traditional audience for insured mortgages, namely young aspiring middle-class families, single individuals, and the recently separated, all owner occupiers of the properties they purchase, MPC would have preferred the insured qualification rate had not been increased in the interest of this community,” the association said. “Given the rapid rise in prices, making qualification more stringent now will disqualify many of the Canadians the government has promised to support.”
      
          Bank of Canada Concerned About Home Prices, Household Debt
      
          The new stress test changes fell on the same day that the Bank of Canada voiced concern about unsustainable house prices and growing household debt.
      
          “It is important to understand that the recent rapid increases in home prices are not normal,” Bank of Canada Governor Tiff Macklem said following the release of the Bank’s annual Financial System Review, which found the share of highly indebted households taking out mortgages is now up to 22%.
      
          “Some people may be thinking that the kind of price increases we have seen recently will continue. That would be a mistake,” Macklem added. “Interest rates are very low. That means there is more potential for them to go up…Borrowers and lenders both have roles in ensuring that households can still afford to service their debt at higher rates.”
      
          The Bank also unveiled a “House Price Exuberance Indicator” meant to measure nine major markets across Canada for expectations that local home prices will continue to rise. The indicator currently finds that the Toronto region, Montreal and Hamilton are in exuberant territory, with Ottawa not far off.
        `,
        author: 'Mike Moore',
        publishDate: '2024-05-21',
        tags: ['mortgage stress test', 'interest rates', 'real estate'],
        categories: ['Mortgage', 'Market Trends', 'Finance'],
        featuredImage: '/images/blog/blog-6.svg',
        readTime: '7 min read',
      },

  ];
  
  export default blogs;
  