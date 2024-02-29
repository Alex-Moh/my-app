import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { Transaction } from "../../../types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  invoice: Transaction;
  setInvoice: React.Dispatch<React.SetStateAction<Transaction | null>>;
}
export default function InvoiceDialog({
  open,
  onClose,
  onSave,
  invoice,
  setInvoice,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {invoice?.invoiceId ? "Edit Invoice" : "Create Invoice"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={invoice?.name || ""}
          onChange={(e) => setInvoice({ ...invoice, name: e.target.value })}
        />

        <TextField
          type="date"
          label="Creation Date"
          fullWidth
          margin="normal"
          value={invoice?.creationDate || ""}
          onChange={(e) =>
            setInvoice({
              ...invoice,
              creationDate: e.target.value,
            })
          }
        />

        <TextField
          type="number"
          label="Amount"
          fullWidth
          margin="normal"
          value={invoice?.amount.toString() || "0"}
          onChange={(e) => {
            const newAmount = parseInt(e.target.value, 10);
            if (invoice && !isNaN(newAmount)) {
              setInvoice({ ...invoice, amount: newAmount });
            }
          }}
        />

        <TextField
          type="string"
          label="referenceNumber"
          fullWidth
          margin="normal"
          value={invoice?.referenceNumber || " "}
          onChange={(e) => setInvoice({ ...invoice, referenceNumber: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
