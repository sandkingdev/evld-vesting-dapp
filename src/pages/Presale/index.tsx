import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import BigNumber from 'bignumber.js/bignumber.js';
import axios from 'axios';

import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetNetworkConfig,
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
  AddressValue,
  Address,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Interaction,
  QueryResponseBundle,
  ProxyProvider,
} from '@elrondnetwork/erdjs/out';

import { dAppName } from 'config';
import { routeNames } from 'routes';
import './index.scss';
// import Time from './Time';
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
  WEGLD_TOKEN_ID,
  VESTING_CONTRACT_ADDRESS,
  VESTING_CONTRACT_ABI_URL,
  VESTING_CONTRACT_NAME,
  VESTING_TOKEN_ID,
  TOKEN_DECIMAL,
} from '../../config';
import {
  PRICES,
  BUY_AMOUNT,
  USDC_AMOUNT,
  AMOUT_PER_USDC
} from 'data';
import { TIMEOUT } from 'utils/const';
import { sendQuery } from 'utils/transaction';
import { convertWeiToEgld } from 'utils/convert';

import Loading from '../../components/LoadingPage/loadingPage';


const Presale = () => {
  const { account } = useGetAccountInfo();

  const tokenSaleTargetRef = React.useRef(null);

  const saleStatus = React.useContext<ISaleStatusProvider | undefined>(SaleStatusContext);
  // const accountState = React.useContext<IAccountStateProvider | undefined>(AccountStateContext);
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
  const { network } = useGetNetworkConfig();
  const isLoggedIn = Boolean(address);
  const [isTransaction, setIsTransaction] = React.useState<boolean>(true);
  const proxy = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

  // load smart contract abi and parse it to SmartContract object for tx
  const [contract, setContract] = React.useState<any>(undefined);
  React.useEffect(() => {
    (async () => {
      const abiRegistry = await AbiRegistry.load({
        urls: [VESTING_CONTRACT_ABI_URL],
      });
      const con = new SmartContract({
        address: new Address(VESTING_CONTRACT_ADDRESS),
        abi: new SmartContractAbi(abiRegistry, [VESTING_CONTRACT_NAME]),
      });
      setContract(con);
    })();
  }, []); // [] makes useEffect run once

  const [vestingAddress, setVestingAddress] = React.useState<string>('');
  const [vestingAmount, setVestingAmount] = React.useState<number>(0);

  const handleVestingAddress = (e: any) => {
    const address = e.target.value;
    setVestingAddress(address.trim());
  };

  const handleVestingAmount = (e: any) => {
    setVestingAmount(e.target.value);
  };

  const handleVesting = async () => {
    if (vestingAddress.length <= 0 || vestingAmount <= 0) return;

    if (!isLoggedIn) {
      alert('Authentication with your wallet is required');
      return;
    }

    const value = (new BigNumber(vestingAmount)).multipliedBy(Math.pow(10, 6));
    const args: TypedValue[] = [
      BytesValue.fromUTF8(VESTING_TOKEN_ID),
      new BigUIntValue(Balance.fromString(value.valueOf()).valueOf()),
      BytesValue.fromUTF8('vesting'),
      new AddressValue(new Address(vestingAddress.trim())),
    ];

    const { argumentsString } = new ArgSerializer().valuesToString(args);
    const data = new TransactionPayload(`ESDTTransfer@${argumentsString}`);
    const tx = {
      receiver: VESTING_CONTRACT_ADDRESS,
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

  };

  const [accountState, setAccountState] = React.useState<IAccountStateProvider>({
    initialLockedAmount: 0, 
    currentLockedAmount: 0, 
    claimableReleaseAmount: 0, 
    last_claim_timestamp: 0
  });
  const handleAddress = async (address: any) => {
    // console.log(address);
    const args = [new AddressValue(new Address(address))];
    const interaction: Interaction = contract.methods.getAccountState(args);
    const res: QueryResponseBundle | undefined = await sendQuery(contract, proxy, interaction);
    if (!res || !res.returnCode.isSuccess()) return;
    const value = res.firstValue.valueOf();

    const initialLockedAmount = convertWeiToEgld(value.user_vesting_amount.toNumber(), TOKEN_DECIMAL);
    const currentLockedAmount = convertWeiToEgld(value.user_locked_amount.toNumber(), TOKEN_DECIMAL);
    const claimableReleaseAmount = convertWeiToEgld(value.user_claimable_release_amount.toNumber(), TOKEN_DECIMAL);
    const last_claim_timestamp = value.last_claim_timestamp.toNumber() * SECOND_IN_MILLI;

    setAccountState({ initialLockedAmount, currentLockedAmount, claimableReleaseAmount, last_claim_timestamp });
  };

  const handleClaim = async () => {
    const tx = {
      data: 'claim',
      receiver: VESTING_CONTRACT_ADDRESS,
      gasLimit: new GasLimit(GAS_LIMIT),
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx
    });
  };



  return (
    <>
      <StartBanner pageName="VESTING"></StartBanner>

      <div className='section-4 container'>
        <div className='row'>
          {/* <div className='col-lg-3 col-md-3 col-sm-12'></div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            
          </div>
          <div className='col-lg-3 col-md-3 col-sm-12'></div> */}
          Address: <input type='text' className='mb-3' value={vestingAddress} onChange={handleVestingAddress}></input>
          <br />
          Amount: <input type='number' value={vestingAmount} onChange={handleVestingAmount}></input>
          <br />
          <button className='mt-3' onClick={handleVesting}>VESTING</button>
        </div>
        <div className='row mt-5'>
          <button onClick={handleClaim}>SEND</button>
        </div>
        <div className='row mt-5'>Addresses</div>
        <div className='row mt-3'>
          <div className='col-lg-5 col-md-5 col-sm-12'>
            {saleStatus?.addresses.map((item: any, index: any) => {
              return <p key={index} className='vesting-address' onClick={() => handleAddress(item.toString())} style={{ cursor: 'pointer' }}>{item.toString()}</p>;
            })}
          </div>
          <div className='col-lg-7 col-md-7 col-sm-12 account-state'>
            <p>initialLockedAmount : {accountState?.initialLockedAmount}</p>
            <p>currentLockedAmount : {accountState?.currentLockedAmount}</p>
            <p>claimableReleaseAmount : {accountState?.claimableReleaseAmount}</p>
            <p>last_claim_timestamp : {new Date(accountState?.last_claim_timestamp).toUTCString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Presale;













