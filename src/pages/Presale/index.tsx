import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import BigNumber from 'bignumber.js/bignumber.js';
import axios from 'axios';

import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetTransactionDisplayInfo,
  useGetNotification,
  transactionServices
} from '@elrondnetwork/dapp-core';
import {
  Balance,
  GasLimit,
  BalanceBuilder,
  createBalanceBuilder,
  TransactionPayload,
  BytesValue,
  BigUIntValue,
  Egld,
  TypedValue,
  ArgSerializer,
  Transaction,
  U32Value,
} from '@elrondnetwork/erdjs/out';

import { dAppName } from 'config';
import { routeNames } from 'routes';
import './index.scss';
import Time from './Time';
import StartBanner from '../../components/Layout/StartBanner';
import {
  ContractContext,
  SaleStatusContext,
  AccountStateContext,
} from '../../ContextWrapper';
import {
  Status,
  ISaleStatusProvider,
  IAccountStateProvider,
} from '../../utils/state';
import {
  calculatePercentage,
  precisionRound
} from '../../utils/convert';
import {
  ONE_DAY_IN_SECONDS,
  SECOND_IN_MILLI
} from '../../utils/const';
import {
  EXCHANGE_RATE,
  PRESALE_CONTRACT_ADDRESS,
  MIN_BUY_LIMIT,
  MAX_BUY_LIMIT,
  GAS_LIMIT,
  USDC_TOKEN_ID,
  MEX_TOKEN_ID,
  GATEWAY,
  WEGLD_TOKEN_ID
} from '../../config';
import {
  PRICES,
  BUY_AMOUNT,
  USDC_AMOUNT,
  AMOUT_PER_USDC
} from 'data';

import Loading from '../../components/LoadingPage/loadingPage';


const Presale = () => {
  const { account } = useGetAccountInfo();

  const tokenSaleTargetRef = React.useRef(null);

  const saleStatus = React.useContext<ISaleStatusProvider | undefined>(SaleStatusContext);
  const accountState = React.useContext<IAccountStateProvider | undefined>(AccountStateContext);
  // const accountState_2 = React.useContext<IAccountStateProvider_2 | undefined>(AccountStateContext_2);
  // const accountState_3 = React.useContext<IAccountStateProvider_3 | undefined>(AccountStateContext_3);

  const [buyAmountInEgld, setBuyAmountInEgld] = React.useState<number>(0);
  const [buyAmountInEsdt, setBuyAmountInEsdt] = React.useState<number>(0);

  const onBuyAmountInEgld = (e: any) => {
    e.preventDefault();
    setBuyAmountInEgld(e.target.value);
    setBuyAmountInEsdt(precisionRound(e.target.value / EXCHANGE_RATE));
  };

  const getTokenPrice = (e: any) => {
    //
  };

  const [buyButtonDisabled, setBuyButtonDisabled] = React.useState<boolean>(false);
  const [buyPermissionInfo, setBuyPermissionInfo] = React.useState<string>('');
  const { address } = useGetAccountInfo();
  const isLoggedIn = Boolean(address);
  const [isTransaction, setIsTransaction] = React.useState<boolean>(true);
  

  async function buyToken(e: any, index: number) {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Authentication with your wallet is required');
      return;
    }
    // const amount = new BigNumber(BUY_AMOUNT[index]);

    // USDC
    const value = (new BigNumber(USDC_AMOUNT[index])).multipliedBy(Math.pow(10, 6));
    const args: TypedValue[] = [
      BytesValue.fromUTF8(USDC_TOKEN_ID),
      new BigUIntValue(Balance.fromString(value.valueOf()).valueOf()),
      BytesValue.fromUTF8('buy'),
    ];

    const { argumentsString } = new ArgSerializer().valuesToString(args);
    const data = new TransactionPayload(`ESDTTransfer@${argumentsString}`);
    const tx = {
      receiver: PRESALE_CONTRACT_ADDRESS,
      gasLimit: new GasLimit(GAS_LIMIT),
      data: data.toString(),
    };

    // setTimeout(() => {
    //   window.location.assign('/account');
    // }, 10000);

    await refreshAccount();
    await sendTransactions({
      transactions: tx
    });

  }



  return (

    <>

      <StartBanner pageName="BUY EVLD"></StartBanner>

      <div className='section-2'>
        <div className='div-block-19'>
        </div>
      </div>

      <div className='section-4 container'>
        <div className=' row '>
        </div>
      </div>
    </>


  );
};

export default Presale;













