import { TransactionStatus } from '../enums';

const transactionsHistoryFilterOptions = {
  statusOptions: [
    { key: 0, name: 'All' },
    { key: 1, name: TransactionStatus.COMPLETED },
    { key: 2, name: TransactionStatus.FAILED },
    { key: 3, name: TransactionStatus.PENDING },
  ],
};

export default transactionsHistoryFilterOptions;
