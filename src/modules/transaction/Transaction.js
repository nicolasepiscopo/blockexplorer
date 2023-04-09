import { useQueries } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { alchemy } from "../../lib/alchemy";

import './Transaction.css'

/**
 * A component that looks up a transaction by hash and displays it.
 * If the transaction has been mined, it will also display the status as mined.
 */
export function Transaction () {
  const {
    hash,
  } = useParams();
  const [{
    data: transaction,
    isLoading,
    error,
  }, { data: receipt, isFetched: isFetchedReceipt }] = useQueries({
    queries: [
      {
        queryKey: ['transaction', hash],
        queryFn: () => alchemy.core.getTransaction(hash),
      },
      {
        queryKey: ['receipt', hash],
        queryFn: () => alchemy.core.getTransactionReceipt(hash),
      }
    ]
  });
  const wasMined = !!receipt;

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error! Please try again.';
  }

  return (
    <div>
      <h1>Transaction Details</h1>

      {!transaction && 'Loading...'}

      {transaction && (
        <dl>
          <dt>Hash</dt>
          <dd>{transaction.hash}</dd>
          <dt>Block Hash</dt>
          <dd>
            <Link to={`/${transaction.blockHash}`}>
              {transaction.blockHash}
            </Link>
          </dd>
          <dt>Block Number</dt>
          <dd>{transaction.blockNumber}</dd>
          <dt>From</dt>
          <dd><Link to={`/accounts/${transaction.from}`}>{transaction.from}</Link></dd>
          <dt>To</dt>
          <dd><Link to={`/accounts/${transaction.to}`}>{transaction.to}</Link></dd>
          <dt>Value</dt>
          <dd>{transaction.value.toString()}</dd>
          <dt>Gas Limit</dt>
          <dd>{transaction.gasLimit.toString()}</dd>
          <dt>Gas Price</dt>
          <dd>{transaction.gasPrice.toString()}</dd>
          <dt>Nonce</dt>
          <dd>{transaction.nonce}</dd>
          {isFetchedReceipt && (
            <>
              <dt>Status</dt>
              <dd>{wasMined ? 'Mined' : 'Pending'}</dd>
            </>
          )}
        </dl>
      )}
    </div>
  );
}