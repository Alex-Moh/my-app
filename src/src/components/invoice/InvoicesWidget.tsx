import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ListItemButton,
  Card,
} from "@mui/material";

import { useTransactionsStates } from "../../redux/reduxStates";
import { Transaction } from "../../../types/types";
import InvoiceDialog from "./InvoiceDialog";
import { useAppDispatch } from "../../redux/reduxHooks";
import { convertToDate } from "../../utils/utilFuncs";
import { setTransactions } from "../../redux/slices/transactionsSlice";
import { deleteTransaction } from "../../redux/slices/transactionsSlice";

export default function InvoicesWidget() {
  const dispatch = useAppDispatch();
  const { transactions } = useTransactionsStates();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewInvoice, setIsNewInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Transaction | null>(
    null
  );

  const invoices = transactions.filter(
    (transaction) => transaction.type === "AR"
  );

  const determineInvoiceStatus = (invoice: Transaction) => {
    return transactions.some(
      (transaction) =>
        transaction.invoiceId === invoice.invoiceId &&
        transaction.amount === Math.abs(invoice.amount) &&
        convertToDate(transaction.transactionDate) >=
          convertToDate(invoice.creationDate)
    )
      ? "PAID"
      : "NOT PAID";
  };

  const handleEditOrCreateClick = (invoice?: Transaction) => {
    if (!invoice) {
      // Generate a unique reference number for the new invoice immediately
      const referenceNumber = `INV-${Date.now()}`;
  
      setCurrentInvoice({
        transactionId: Date.now(), // Temporary ID for new invoice
        invoiceId: invoices.length + 1, // Assign a new invoiceId
        type: "AR",
        transactionDate: new Date().toISOString().split("T")[0],
        description: "",
        amount: 0,
        creationDate: new Date().toISOString().split("T")[0],
        name: "",
        referenceNumber, // Assign the generated reference number here
      });
    } else {
      setCurrentInvoice(invoice);
    }
    setIsNewInvoice(!invoice);
    setIsDialogOpen(true);
  };

  const handleDeleteTransaction = (transactionId: number) => {
    // Dispatch the deleteTransaction action with the transactionId
    dispatch(deleteTransaction(transactionId));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentInvoice(null);
  };

  const handleSave = () => {
    if (currentInvoice) {
      let updatedTransactions;
      if (isNewInvoice) {
        // Generate a unique reference number for the new invoice
        // const referenceNumber = `INV-${Date.now()}`;
  
        // Generate a new transactionId, ensuring it's unique
        const newTransactionId = Math.max(0, ...transactions.map(t => t.transactionId)) + 1;
  
        updatedTransactions = [
          ...transactions,
          { ...currentInvoice, transactionId: newTransactionId },
        ];
      } else {
        // For existing invoices, just update them without changing the reference number
        updatedTransactions = transactions.map(t =>
          t.transactionId === currentInvoice.transactionId ? currentInvoice : t
        );
      }
      dispatch(setTransactions(updatedTransactions));
    }
    handleCloseDialog();
    setIsNewInvoice(false);
    setCurrentInvoice(null);
  };  

  return (
    <Card sx={{ mt: 2 }}>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        onClick={() => handleEditOrCreateClick()}
      >
        Create New Invoice
      </Button>
      <List>
        {invoices.map((invoice) => (
          <React.Fragment key={invoice.transactionId}>
            <Divider />
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleEditOrCreateClick(invoice)}>
                <ListItemText
                  primary={`${invoice.name} - $${invoice.amount}`}
                  secondary={`Due Date: ${
                    invoice.creationDate
                  } - Status: ${determineInvoiceStatus(invoice)} - Ref#: ${invoice.referenceNumber}`}
                />
              </ListItemButton>
              <Button
                sx={{
                  m: 1,
                  bgcolor: "error.main",
                  "&:hover": { bgcolor: "error.dark" },
                }}
                variant="contained"
                onClick={() => handleDeleteTransaction(invoice.transactionId)}
              >
                Delete Invoice
              </Button>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      {currentInvoice && (
        <InvoiceDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          invoice={currentInvoice}
          setInvoice={setCurrentInvoice}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
