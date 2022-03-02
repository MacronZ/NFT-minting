import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColumnMenu, GridOverlay } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { transactionsHistoryHelper } from '../../../../helpers';
import transactionsHistoryOptions from '../../../../utils/transactionsHistoryOptions';
import '../../../../styles/Dashboard/WalletPage.scss';
import AcceptedIcon from '../../../../media/images/icons/approved.svg';
import RejectedIcon from '../../../../media/images/icons/rejected.svg';
import { userController } from '../../../../controllers';
import CancellationDialog from './WithdrawalCancellationModal';
import { TransactionStatus } from '../../../../enums';

const useStyles = makeStyles({
  columnMenu: {
    '& li': {
      fontWeight: 400,
      fontSize: '15px',
    },
    '& li:hover': {
      fontWeight: 500,
      backgroundColor: 'navy',
      color: 'navy',
    },
  },
  datagrid: {
    border: 'unset !important',
    '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': {
      display: 'none !important',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      padding: 0,
      fontWeight: 'bold',
      fontSize: 15,
    },
    '& .MuiDataGrid-cell': {
      fontWeight: 'normal',
      fontSize: 12,
    },
    '& .MuiDataGrid-main ': {
    },
  },
});

export default function TransactionHistoryPage() {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [status, setStatus] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successfulDeletion, setSuccessfulDeletion] = useState(false);
  const [withdrawToCancel, setWithdrawToCancel] = useState({});
  const [allWithdrawals, setAllWithdrawals] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const gridClasses = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const openDeleteConfirmationDialog = (params) => {
    setWithdrawToCancel(params);
    setOpenDialog(true);
  };

  const handleDeletePending = async (id) => {
    try {
      setIsLoading(true);
      const user = await JSON.parse(localStorage.getItem('user'));
      const withdrawData = {
        paymentId: id,
        entity: user.entity,
      };
      await userController.cancelWithdrawal(withdrawData);
      enqueueSnackbar('Withdrawal cancelled!', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }

    setSuccessfulDeletion(true);
    setIsLoading(false);
    setOpenDialog(false);
  };

  const cancelButtonAction = (rowParams) => (
    <button
      type="button"
      title="Cancel transaction"
      className="cancelTransactionButton"
      // style={{
      //   cursor: 'pointer',
      //   fontWeight: '500',
      //   backgroundColor: 'transparent',
      //   border: '1px solid #bbbbbb',
      //   borderRadius: '3px',
      // }}
      onClick={() => openDeleteConfirmationDialog(rowParams)}
    >
      Cancel
    </button>
  );

  const columns = [
    {
      field: 'paymentId',
      hide: true,
    },
    {
      field: 'creationTimeFormatted',
      headerName: 'Creation Time',
      width: 170,
      sortable: false,
    },
    {
      field: 'paymentType',
      headerName: 'Type',
      width: 150,
      sortable: false,
    },
    {
      field: 'account',
      headerName: 'Account',
      width: 470,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: function Action(cellValues) {
        switch (cellValues.value) {
          case TransactionStatus.COMPLETED:
            return <img src={AcceptedIcon} alt="accepted" width={20} />;
          case TransactionStatus.FAILED:
            return <img src={RejectedIcon} alt="failed" width={20} />;
          case TransactionStatus.PENDING:
            return <span style={{ fontSize: '12px' }}>{TransactionStatus.PENDING}</span>;
          default:
            return <span style={{ fontSize: '12px' }}>{cellValues.value}</span>;
        }
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      sortable: false,
    },
    {
      field: ' ',
      headerName: 'Action',
      width: 150,
      sortable: false,
      renderCell: function RowColumnDelete(params) {
        return (
          params.row.status === TransactionStatus.PENDING && cancelButtonAction(params.row)
        );
      },
    },
  ];

  const ColumnMenu = (
    other,
  ) => (
    <div
      className={gridClasses.columnMenu}
    >
      <GridColumnMenu other={other} />
    </div>
  );

  const customNoRowsOverlay = () => (
    <GridOverlay>
      <div>{t('dashboard.wallet.noTransactions') }</div>
    </GridOverlay>
  );

  const setPaymentTypeText = (paymentType) => {
    const type = paymentType.toLowerCase();
    return type[0].toUpperCase() + type.slice(1);
  };

  const setStatusMapping = (withdrawalStatus) => {
    switch (withdrawalStatus) {
      case 'PAYMENT_FAILED':
      case 'PAYMENT_REFUSED':
      case 'PAYMENT_CANCELED':
      case 'TRANSACTION_FAILED':
      case 'MT4_FAILED':
        return TransactionStatus.FAILED;
      case 'PAYMENT_PENDING':
      case 'PAYMENT_APPROVED':
        return TransactionStatus.PENDING;
      case 'PAYMENT_CHARGEBACK':
      case 'TRANSACTION_COMPLETED':
      case 'PAYMENT_COMPLETED':
        return TransactionStatus.COMPLETED;
      default:
        return withdrawalStatus;
    }
  };

  const getIBTransactions = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem('user'));
      const withdrawalsfromAPI = await userController.getWithdrawals({
        uuid: user.uuid,
      });
      const withdrawals = withdrawalsfromAPI.map((record) => ({
        paymentId: record.paymentId,
        creationTime: record.creationTime,
        creationTimeFormatted: moment.utc(record.creationTime).format('DD/MM/YYYY HH:mm:ss'),
        paymentType: setPaymentTypeText(record.paymentType),
        account: `${record.accountType} ${record.login} ${record.paymentId}`,
        status: setStatusMapping(record.status),
        amount: `${record.amount} USD`,
      }));

      setAllWithdrawals(withdrawals);
      setFilteredTransactions(withdrawals);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }

    setIsDataLoading(false);
  };

  useEffect(() => {
    getIBTransactions();
  }, []);

  useEffect(() => {
    if (successfulDeletion) {
      getIBTransactions();
      setSuccessfulDeletion(false);
    }
  }, [successfulDeletion]);

  useEffect(async () => {
    setFilteredTransactions(transactionsHistoryHelper(fromDate, toDate, status, allWithdrawals));
  }, [fromDate, toDate, status]);

  return (
    <>
      <div className="marketing-video">
        <div className="transactions-title">{t('dashboard.wallet.transactionsTitle')}</div>
        <div className="transactionSelectors" style={{ marginBottom: '30px' }}>
          <div className="selector">
            <label htmlFor="fromDate" className="optionsLabel">
              {t('dashboard.wallet.transactionsFromDate')}
            </label>
            <DatePicker
              isClearable
              clearButtonClassName="clearValue"
              dateFormat="dd/MM/yyyy"
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              maxDate={toDate || new Date()}
              placeholderText="No date selected"
              className="optionsSelector"
            />
          </div>

          <div className="selector">
            <label htmlFor="toDate" className="optionsLabel">
              {t('dashboard.wallet.transactionsToDate')}
            </label>
            <DatePicker
              isClearable
              clearButtonClassName="clearValue"
              dateFormat="dd/MM/yyyy"
              minDate={fromDate}
              selected={toDate}
              onChange={(date) => setToDate(date)}
              maxDate={new Date()}
              placeholderText="No date selected"
              className="optionsSelector"
            />
          </div>

          <div className="selector">
            <label htmlFor="status" className="optionsLabel">
              {t('dashboard.wallet.transactionsStatus')}
            </label>
            <select
              id="status"
              value={status}
              className="optionsSelector"
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              {transactionsHistoryOptions.statusOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.name}</option>
              ))}
            </select>
          </div>

        </div>
        <div className="datagrid-container">
          <DataGrid
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
            rows={filteredTransactions}
            columns={columns}
            pageSize={10}
            disableMultipleSelection
            components={{
              ColumnMenu,
              NoRowsOverlay: customNoRowsOverlay,
            }}
            className={gridClasses.datagrid}
            getRowId={(row) => row.paymentId}
            disableSelectionOnClick
            loading={isDataLoading}
          />
        </div>
      </div>
      <CancellationDialog open={openDialog} onClose={() => setOpenDialog(!openDialog)} withdrawalData={withdrawToCancel} handleDelete={handleDeletePending} isLoading={isLoading} />
    </>
  );
}
