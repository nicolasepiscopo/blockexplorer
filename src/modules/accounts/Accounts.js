import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { alchemy } from "../../lib/alchemy";

import './Accounts.css'

/**
 * A component that looks up a balance for a wallet address from an input and displays it.
 */
export function Accounts () {
  const { address: defaultAddress } = useParams();
  const [address, setAddress] = useState(defaultAddress);
  const [{ data: balance, error: balanceError }, { data: receivedTransactions, error: receivedTransactionsError }] = useQueries({
    queries: [
      {
        queryKey: ['balance', address],
        queryFn: () => alchemy.core.getBalance(address),
        enabled: !!address,
      },
      {
        queryKey: ['transfers', address],
        queryFn: () => alchemy.core.getAssetTransfers({
          category: [
            'external'
          ],
          toAddress: address,
          withMetadata: true,
        }),
        enabled: !!address,
      }
    ]
  });
  const error = balanceError || receivedTransactionsError;
  const currentYearTransactions = receivedTransactions?.transfers?.filter(({ metadata: { blockTimestamp } }) => {
    const date = new Date(blockTimestamp);
    return date.getFullYear() === new Date().getFullYear();
  });

  useEffect(() => {
    if (defaultAddress) {
      setAddress(defaultAddress);
    }
  }, [defaultAddress])

  return (
    <div className="Accounts">
      <h1>Accounts</h1>
      <input
        type="text"
        placeholder="Enter an address. e.g. 0x00000000000"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {
        error && <p>Error! Please try again.</p>
      }

      {
        balance && (
          <div>
            <h2>Balance</h2>
            <p>{parseInt(balance)/(10**18)} ETH</p>
          </div>
        )
      }

      {
        currentYearTransactions && (
          <div>
            <h2>Transactions this year ({currentYearTransactions.length})</h2>
            {
              currentYearTransactions.map(({ metadata: { blockTimestamp }, from, value, hash }) => {
                const date = new Date(blockTimestamp);

                return (
                  <p key={hash}>
                    Received {value} ETH From <Link to={`/accounts/${from}`}>{from}</Link> on {date.toLocaleDateString()}
                  </p>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}