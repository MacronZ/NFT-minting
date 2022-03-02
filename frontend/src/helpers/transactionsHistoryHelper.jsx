import transactionsHistoryOptions from '../utils/transactionsHistoryOptions';

function filterTransactions(fromDate, toDate, status, withdrawals) {
  let filtered = withdrawals;

  if (fromDate !== null) {
    filtered = filtered.filter((it) => new Date(it.creationTime) >= new Date(fromDate));
  }

  if (toDate !== null) {
    filtered = filtered.filter((it) => new Date(it.creationTime).setHours(0, 0, 0, 0) <= new Date(toDate).setHours(0, 0, 0, 0));
  }

  if (status !== 0) {
    const option = transactionsHistoryOptions.statusOptions.find((it) => it.key === status);
    if (option) {
      filtered = filtered.filter((it) => it.status === option.name);
    }
  }

  return filtered;
}

export default filterTransactions;
