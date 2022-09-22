import * as React from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { routeNames } from 'routes';
import './index.scss';

import { TOTAL_RELEASE_COUNT } from '../../config';
import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from '@elrondnetwork/dapp-core';
import {
  ProxyProvider,
  Interaction,
  QueryResponseBundle,
  Address,
  AddressValue,
  Egld,
  GasLimit
} from '@elrondnetwork/erdjs';


import StartBanner from '../../components/Layout/StartBanner/';

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
  convertWeiToEgld,
  getDaysFromNow
} from '../../utils/convert';
import {
  endpointAccountToken
} from '../../utils/endpoint';
import {
  PRESALE_CONTRACT_ADDRESS,
  RELEASE_TIMESTAMPS,
  TOKEN_IDENTIFERS,
  GAS_LIMIT
} from 'config';

const Account = () => {
  const tokenSaleTargetRef = React.useRef(null);

  const { hasPendingTransactions } = useGetPendingTransactions();
  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  const accountState = React.useContext<IAccountStateProvider | undefined>(AccountStateContext);

  const [daysFromNextUnlock, setDaysFromNextUnlock] = React.useState<number>(0);
  const [daysFromFullUnlock, setDaysFromFullUnlock] = React.useState<number>(0);
  const [daysFromNextUnlock_2, setDaysFromNextUnlock_2] = React.useState<number>(0);
  const [daysFromFullUnlock_2, setDaysFromFullUnlock_2] = React.useState<number>(0);
  const [daysFromNextUnlock_3, setDaysFromNextUnlock_3] = React.useState<number>(0);
  const [daysFromFullUnlock_3, setDaysFromFullUnlock_3] = React.useState<number>(0);

  // React.useEffect(() => {
  //   let i;
  //   const currentTimestamp = (new Date()).getTime();
  //   for (i = 0; i < RELEASE_TIMESTAMPS.length - 1; i++) {
  //     if (currentTimestamp < RELEASE_TIMESTAMPS[i]) {
  //       break;
  //     }
  //   }
  //   //console.log('i =>', i);
  //   setDaysFromNextUnlock(getDaysFromNow(RELEASE_TIMESTAMPS[i]));
  //   setDaysFromFullUnlock(getDaysFromNow(RELEASE_TIMESTAMPS[RELEASE_TIMESTAMPS.length - 1]));
  // }, []);
  // React.useEffect(() => {
  //   let i;
  //   const currentTimestamp = (new Date()).getTime();
  //   for (i = 0; i < RELEASE_TIMESTAMPS_2.length - 1; i++) {
  //     if (currentTimestamp < RELEASE_TIMESTAMPS_2[i]) {
  //       break;
  //     }
  //   }
  //   //console.log('i =>', i);
  //   setDaysFromNextUnlock_2(getDaysFromNow(RELEASE_TIMESTAMPS_2[i]));
  //   setDaysFromFullUnlock_2(getDaysFromNow(RELEASE_TIMESTAMPS_2[RELEASE_TIMESTAMPS_2.length - 1]));
  // }, []);
  // React.useEffect(() => {
  //   let i;
  //   const currentTimestamp = (new Date()).getTime();
  //   for (i = 0; i < RELEASE_TIMESTAMPS_3.length - 1; i++) {
  //     if (currentTimestamp < RELEASE_TIMESTAMPS_3[i]) {
  //       break;
  //     }
  //   }
  //   //console.log('i =>', i);
  //   setDaysFromNextUnlock_3(getDaysFromNow(RELEASE_TIMESTAMPS_3[i]));
  //   setDaysFromFullUnlock_3(getDaysFromNow(RELEASE_TIMESTAMPS_3[RELEASE_TIMESTAMPS_3.length - 1]));
  // }, []);

  interface ITokenProvider {
    ticker: string;
    balance: number;
  }

  const [token1, setToken1] = React.useState<ITokenProvider>();
  const [token2, setToken2] = React.useState<ITokenProvider>();

  const fetchAccountBalance = (tokenIdentifer: string, setFunc: any) => {
    const endpoint = endpointAccountToken(network.apiAddress, account.address, tokenIdentifer);
    // console.log('endpoint', endpoint);
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          console.log('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(json => {
        // console.log(json);
        setFunc({
          ticker: json.ticker,
          balance: convertWeiToEgld(json.balance, json.decimals)
        });
      });
  };

  React.useEffect(() => {
    fetchAccountBalance(TOKEN_IDENTIFERS[0], setToken1);
    fetchAccountBalance(TOKEN_IDENTIFERS[1], setToken2);
  }, [hasPendingTransactions]);

  async function claim(e: any) {
    e.preventDefault();
    const tx = {
      data: 'claim',
      receiver: PRESALE_CONTRACT_ADDRESS,
      gasLimit: new GasLimit(GAS_LIMIT),
    };
    await refreshAccount();
    await sendTransactions({
      transactions: tx
    });
  }


  return (
    <>
      <StartBanner pageName="My Account"></StartBanner>

      <div className='container'>
        <div className="row">
          <div className='col-12'>
            <div className='w-100 wallet-box'>
              <h4 className='account-heading'>My wallet address:</h4>
              <p className='wallet-addre'>{account.address}</p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 mt-5'>
            <div className='ev-box'>
              <h4 className='epad-account-heading'>Wallet balance</h4>
              <div className='amountcrypto'> EVLD: {token1?.balance ? token1.balance : '0'}</div>
              <div className='amountcrypto'> USDC: {token2?.balance ? token2.balance : '0'}</div>
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-6 col-sm-12 mt-5">
            <div className='ev-box'>
              <h4 className='epad-account-heading'> Vesting Progress</h4>

              <div className='amountcrypto'><strong>CLAIMABLE:</strong> {accountState?.claimableReleaseAmount.toFixed(2)} EVLD</div>
              <div className='amountcrypto'><strong>LOCKED:</strong> {accountState && accountState.currentLockedAmount.toFixed(2)} EVLD</div>
              <div className='amountcrypto bottom'><strong>ROUNDS:</strong> {accountState?.round} / {TOTAL_RELEASE_COUNT}</div>
              <div className='amountcrypto bottom'><strong>NEXT UNLOCK:</strong> {getDaysFromNow(accountState?.nextReleaseTimestamp)} days</div>
              <div className='amountcrypto bottom'><strong>FULL UNLOCK:</strong> {getDaysFromNow(accountState?.fullReleaseTimestamp)} days</div>
            </div>
          </div> */} 
        </div>

        {/* <div className='row'>
        <div className='col-lg-6 mt-5'>
          <div className='ev-box'>
            <h4 className='epad-account-heading'>Secondary Sale Phase 1 Vesting</h4>
            <div className='amountcrypto'><strong>CLAIMABLE:</strong> {accountState_2?.claimableAmount_2} EVLD</div>
            <div className='amountcrypto'><strong>LOCKED:</strong> {accountState_2 && (accountState_2.lockedAmount_2 - accountState_2.claimableAmount_2)} EVLD</div>
            <div className='amountcrypto bottom'><strong>NEXT UNLOCK:</strong> {daysFromNextUnlock_2} days</div>
            <div className='amountcrypto bottom'><strong>FULL UNLOCK:</strong> {daysFromFullUnlock_2} days</div>
          </div>
        </div> 

        <div className='col-lg-6 mt-5'>
          <div className='ev-box'>
            <h4 className='epad-account-heading'>Secondary Sale Phase 2 Vesting</h4>
            <div className='amountcrypto'><strong>CLAIMABLE:</strong> {accountState?.claimableAmount} EVLD</div>
            <div className='amountcrypto'><strong>LOCKED:</strong> {accountState && (accountState.lockedAmount - accountState.claimableAmount)} EVLD</div>
            <div className='amountcrypto bottom'><strong>NEXT UNLOCK:</strong> {daysFromNextUnlock} days</div>
            <div className='amountcrypto bottom'><strong>FULL UNLOCK:</strong> {daysFromFullUnlock} days</div>
          </div>
        </div>

      </div> */}

        <div className='epad-account-claim'>

          {/* <button className='button-type-1 mb-4' disabled={!(accountState_3 && accountState_3.claimableReleaseCount_3 > 0)} onClick={claim_3}>Claim Locked Initial Sale Tokens</button>
        <button className='button-type-1 mb-4' disabled={!(accountState_2 && accountState_2.claimableReleaseCount_2 > 0)} onClick={claim_2}>Claim Locked Secondary Sale Phase 1 Tokens</button>
         */}

          <button className='button-type-1 mb-4' disabled={!(accountState && accountState.claimableReleaseAmount > 0)} onClick={claim}> Claim Locked Tokens</button>
        </div>
      </div>
    </>
  );
};

export default Account;
