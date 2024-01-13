export const config = {
  globalTimeout: 900_000_000,
  'lots-of-activities': {
    amount: 10, // Amount of read and writes inside a transaction
  },
  'long-running': {},
  'batch-itx': {
    batchAmount: 100, // How many records to create and update
    transactionDelay: 2_000, // How long to delay the transaction
  },
  concurrent: {
    amount: 5, // How many concurrent to run at once
  },
  'burst-load': {
    bursts: 2, // How many bursts to perform
    children: 2, // How many ITX to do in a burst
    backoff: 1_000, // How long to wait in-between each burst
  },
}
