import React, { useEffect } from 'react';
import { DappUI, DappProvider } from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Interaction,
  QueryResponseBundle,
  ProxyProvider,
} from '@elrondnetwork/erdjs';
import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
import '@elrondnetwork/dapp-core/build/index.css';

import { 
  VESTING_CONTRACT_ADDRESS,
  VESTING_CONTRACT_ABI_URL,
  VESTING_CONTRACT_NAME,
  TOKEN_DECIMAL,
  CONTRACT_ADDRESS, 
  CONTRACT_ABI_URL, 
  CONTRACT_NAME, 
  TOTAL_RELEASE_COUNT, 
  CONTRACT_ADDRESS_2, 
  CONTRACT_ABI_URL_2, 
  CONTRACT_NAME_2, 
  TOTAL_RELEASE_COUNT_2, 
  CONTRACT_ADDRESS_3, 
  CONTRACT_ABI_URL_3, 
  CONTRACT_NAME_3, 
  TOTAL_RELEASE_COUNT_3
} from './config';

import {
  convertToStatus,
  ISaleStatusProvider,
  IAccountStateProvider,
  IAccountStateProvider_2,
  IAccountStateProvider_3
} from './utils/state';
import { SECOND_IN_MILLI, TIMEOUT } from './utils/const';
import { convertWeiToEgld } from './utils/convert';
import { sendQuery } from './utils/transaction';


const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
  DappCorePages: { UnlockPage }
} = DappUI;

export const ContractContext = React.createContext<any>(undefined);
export const SaleStatusContext = React.createContext<ISaleStatusProvider | undefined>(undefined);
export const AccountStateContext = React.createContext<IAccountStateProvider | undefined>(undefined);
// export const ContractContext_2 = React.createContext<any>(undefined);
// export const AccountStateContext_2 = React.createContext<IAccountStateProvider_2 | undefined>(undefined);
// export const ContractContext_3 = React.createContext<any>(undefined);
// export const AccountStateContext_3 = React.createContext<IAccountStateProvider_3 | undefined>(undefined);


const ContextWrapper = () => {
  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { account } = useGetAccountInfo();
  const proxy = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

  // load smart contract abi and parse it to SmartContract object for tx
  const [contract, setContract] = React.useState<any>(undefined);
  React.useEffect(() => {
    (async() => {
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
  // const [contract_2, setContract_2] = React.useState<any>(undefined);
  // React.useEffect(() => {
  //   (async() => {
  //     const abiRegistry_2 = await AbiRegistry.load({
  //       urls: [CONTRACT_ABI_URL_2],
  //     });
  //     const con_2 = new SmartContract({
  //       address: new Address(CONTRACT_ADDRESS_2),
  //       abi: new SmartContractAbi(abiRegistry_2, [CONTRACT_NAME_2]),
  //     });
  //     setContract_2(con_2);
  //   })();
  // }, []); // [] makes useEffect run once
  // const [contract_3, setContract_3] = React.useState<any>(undefined);
  // React.useEffect(() => {
  //   (async() => {
  //     const abiRegistry_3 = await AbiRegistry.load({
  //       urls: [CONTRACT_ABI_URL_3],
  //     });
  //     const con_3 = new SmartContract({
  //       address: new Address(CONTRACT_ADDRESS_3),
  //       abi: new SmartContractAbi(abiRegistry_3, [CONTRACT_NAME_3]),
  //     });
  //     setContract_3(con_3);
  //   })();
  // }, []); // [] makes useEffect run once

  const [saleStatus, setSaleStatus] = React.useState<ISaleStatusProvider | undefined>();
  const [accountState, setAccountState] = React.useState<IAccountStateProvider>();
  // const [accountState_2, setAccountState_2] = React.useState<IAccountStateProvider_2>();
  // const [accountState_3, setAccountState_3] = React.useState<IAccountStateProvider_3>();

  React.useEffect(() => {
    (async () => {
      if (!contract) return;
      const interaction: Interaction = contract.methods.getVestingAddresses();
      const res: QueryResponseBundle | undefined = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const addresses = res.firstValue.valueOf();

      setSaleStatus({addresses});
    })();
  }, [contract, hasPendingTransactions]);

  React.useEffect(() => {
    (async () => {
      if (!contract || !account.address) return;
      const args = [new AddressValue(new Address(account.address))];
      const interaction: Interaction = contract.methods.getAccountState(args);
      const res: QueryResponseBundle | undefined = await sendQuery(contract, proxy, interaction);
      if (!res || !res.returnCode.isSuccess()) return;
      const value = res.firstValue.valueOf();

      const initialLockedAmount = convertWeiToEgld(value.user_vesting_amount.toNumber(), TOKEN_DECIMAL);
      const currentLockedAmount = convertWeiToEgld(value.user_locked_amount.toNumber(), TOKEN_DECIMAL);
      const claimableReleaseAmount = convertWeiToEgld(value.user_claimable_release_amount.toNumber(), TOKEN_DECIMAL);
      const last_claim_timestamp = value.last_claim_timestamp.toNumber() * SECOND_IN_MILLI;
      
      setAccountState({initialLockedAmount, currentLockedAmount, claimableReleaseAmount, last_claim_timestamp});
    })();
  }, [contract, hasPendingTransactions, account]);
  // React.useEffect(() => {
  //   (async () => {
  //     if (!contract_2 || !account.address) return;
  //     const args_2 = [new AddressValue(new Address(account.address))];
  //     const interaction_2: Interaction = contract_2.methods.getAccountState(args_2);
  //     const res_2: QueryResponseBundle | undefined = await sendQuery(contract_2, proxy, interaction_2);
  //     if (!res_2 || !res_2.returnCode.isSuccess()) return;
  //     const value_2 = res_2.firstValue.valueOf();

  //     const boughtAmount_2 = convertWeiToEgld(value_2.field0.toNumber());
  //     const lockedAmount_2 = convertWeiToEgld(value_2.field1.toNumber());
  //     const claimedReleaseCount_2 = value_2.field2.toNumber();
  //     const claimableReleaseCount_2 = value_2.field3.toNumber();

  //     const claimableAmount_2 = lockedAmount_2 * claimableReleaseCount_2 / TOTAL_RELEASE_COUNT_2;
      
  //     setAccountState_2({boughtAmount_2, lockedAmount_2, claimableAmount_2, claimedReleaseCount_2, claimableReleaseCount_2});
  //   })();
  // }, [contract_2, hasPendingTransactions, account]);
  // React.useEffect(() => {
  //   (async () => {
  //     if (!contract_3 || !account.address) return;
  //     const args_3 = [new AddressValue(new Address(account.address))];
  //     const interaction_3: Interaction = contract_3.methods.getAccountState(args_3);
  //     const res_3: QueryResponseBundle | undefined = await sendQuery(contract_3, proxy, interaction_3);
  //     if (!res_3 || !res_3.returnCode.isSuccess()) return;
  //     const value_3 = res_3.firstValue.valueOf();

  //     const boughtAmount_3 = convertWeiToEgld(value_3.field0.toNumber());
  //     const lockedAmount_3 = convertWeiToEgld(value_3.field1.toNumber());
  //     const claimedReleaseCount_3 = value_3.field2.toNumber();
  //     const claimableReleaseCount_3 = value_3.field3.toNumber();

  //     const claimableAmount_3 = lockedAmount_3 * claimableReleaseCount_3 / TOTAL_RELEASE_COUNT_3;
      
  //     setAccountState_3({boughtAmount_3, lockedAmount_3, claimableAmount_3, claimedReleaseCount_3, claimableReleaseCount_3});
  //   })();
  // }, [contract_3, hasPendingTransactions, account]);

  return (
    <ContractContext.Provider value={contract}>
        <SaleStatusContext.Provider value={saleStatus}>
            <AccountStateContext.Provider value={accountState}>
                <Layout>
                    <TransactionsToastList />
                    <NotificationModal />
                    <SignTransactionsModals className='custom-class-for-modals' />
                    <Routes>
                        <Route
                        path={routeNames.unlock}
                        element={<UnlockPage loginRoute={routeNames.presale} />}
                        />
                        {routes.map((route: any, index: number) => (
                            <Route
                            path={route.path}
                            key={'route-key-' + index}
                            element={<route.component />}
                            />
                        ))}
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </Layout>
            </AccountStateContext.Provider>
        </SaleStatusContext.Provider>
    </ContractContext.Provider>
  );
};

export default ContextWrapper;
