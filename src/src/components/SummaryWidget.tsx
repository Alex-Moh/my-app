import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";

import SummaryGraphWidget from "./SummaryGraphWidget";

import { useTransactionsStates } from "../redux/reduxStates";

export default function SummaryWidget() {
  const { transactions } = useTransactionsStates();

  const getRecentInvoicesCount = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return transactions.filter(transaction => {
      const creationDate = new Date(transaction.creationDate);
      return transaction.type === "AR" && creationDate > thirtyDaysAgo;
    }).length;
  };

  const recentInvoicesCount = getRecentInvoicesCount();


  const calculateTotalAmount = () => {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  const totalAmount = calculateTotalAmount();
  const threshold = 1000; // Configurable threshold
  let amountColor: TChipsColors = "error";
  const recentInvoicesCountColor: TChipsColors = "info";
  if (totalAmount > 0)
    amountColor = totalAmount > threshold ? "success" : "warning";

    return (
      <Card sx={{ 
        display: 'flex',
        flexDirection: 'column', // Stack content vertically
        padding: '16px'
      }}>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h5" gutterBottom>
            Financial Summary
          </Typography>
          <Chip
            label={`Total Balance: ${totalAmount.toFixed(2)}`}
            color={amountColor}
            sx={{ my: 1 }} // Margin top and bottom for vertical spacing
          />
          <Chip
            label={`Invoices in the last 30 days: ${recentInvoicesCount}`}
            color={recentInvoicesCountColor}
            sx={{ my: 1 }} // Adjust for consistent spacing
          />
        </CardContent>
        <Box sx={{ 
          marginTop: '-150px',
          width: '100%', 
          display: 'flex', 
          justifyContent: 'flex-end', // Align graph to the right
          p: 2 // Padding for spacing around the graph
        }}>
          <div style={{ width: '400px', height: '250px' }}> {/* Consider making these responsive */}
            <SummaryGraphWidget transactions={transactions} />
          </div>
        </Box>
      </Card>
    );
}

type TChipsColors = "error" | "success" | "warning" | 'info';
