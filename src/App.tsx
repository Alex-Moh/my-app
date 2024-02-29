import { Stack } from "@mui/material";

import SummaryWidget from "./src/components/SummaryWidget";
import InvoicesWidget from "./src/components/invoice/InvoicesWidget";

export default function App() {
  return (
    <Stack>
      <SummaryWidget />
      <InvoicesWidget />
    </Stack>
  );
}

/**
 * Product Requirements
You are building a responsive web application that helps self-employed individuals to track their income and expenses in order to give them better insights of their monetary situation, 
so they can focus on what they love doing without worrying about their finances!

In order to do so, you need to create a dashboard which contains a set of widgets:

1). A widget (Summary Widget) to track a summary of the customer’s financial status.

-It should read the data from the list of transactions from the customer’s bank account.
-Where each transaction contains the transaction date; a description; a unique reference number; and a monetary amount which could be positive (cash in) or negative (cash out)
-This widget should show the total monetary amount in the bank account looking at the transaction data.
--If the total is greater than a configured positive threshold, the number should be shown in green
--If the total is lower than the same configured threshold from before (but the total is still positive) the number should be shown in yellow
--If the total is lower than 0.00, the number should be shown in red

2). One widget (Invoices Widget) to manage the list of invoices the user has for his/her customers, which supports both editing existing invoices as well as creating new ones.

	-Each invoice contains the following:
		--name of the client
		--the creation date
		--a unique reference number
		--a monetary amount, which could be positive (money to be received) or negative (a refund to the customer)
		--a status (PAID or NOT PAID).
	-Every field should be modifiable, except the invoice status which is read only and it is worked out in the following way:
		--An invoice is considered PAID if there is a bank transaction for the same amount, with the bank transaction’s reference number being equal to the invoice’s reference number, 
		and with the bank transaction date being later than the invoice creation date.
		--An invoice is considered NOT PAID if the previous criteria is not matched.
		--Users should be able to create a new invoice.
		
Other Requirements:

Summary widget should also show the number of invoices created in the last 30 days.
Changes in one widget should automatically update other widgets. - I.e. the creation of an invoice should affect the summary widget, as this shows the number of invoices created in the month.
Additional instructions¶

Add pseudocode or an actual example of a unit test.
Sample data has been provided (data.json).
In the sample data there is a field "type"
AR = accounts receivable (owed to me)
AP = accounts payable (I need to pay)
The data provided should be used for both invoices and "transactions".
 */
