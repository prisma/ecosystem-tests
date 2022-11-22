export const config = {
  'lots-of-activities': {
    amount: 1000, // Amount of read and writes inside a transaction
  },
  'long-running': {
    transactionDelay: 12000, // How long to delay the transaction
  },
  'batch-itx': {
    batchAmount: 2000, // How many records to create and update
    transactionDelay: 12000, // How long to delay the transaction
  },
  concurrent: {
    amount: 20, // How many concurrent to run at once
  },
  'burst-load': {
    bursts: 20, // How many bursts to perform
    children: 20, // How many ITX to do in a burst
    backoff: 1000, // How long to wait in-between each burst
  },
}
