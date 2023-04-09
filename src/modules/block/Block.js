import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { alchemy } from "../../lib/alchemy";

import './Block.css';

/**
 * A component that gets the latest block or a block by hash if provided and displays it.
 */
export function Block () {
  const { hash } = useParams();

  const { data: block, isLoading, error } = useQuery({
    queryKey: ['block', hash],
    queryFn: () => alchemy.core.getBlockWithTransactions(hash),
    refetchInterval: !hash ? 1000 : null,
  });

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error! Please try again.';
  }

  const date = new Date();

  return (
    <div className="Block">
      {date.toLocaleString()}
      <h1>Block Details</h1>
      <dl>
        <dt>Hash</dt>
        <dd>{block.hash}</dd>
        <dt>Parent Hash</dt>
        <dd>{block.parentHash}</dd>
        <dt>Number</dt>
        <dd>{block.number}</dd>
        <dt>Timestamp</dt>
        <dd>{block.timestamp}</dd>
        <dt>Difficulty</dt>
        <dd>{block.difficulty}</dd>
        <dt>Gas Limit</dt>
        <dd>{block.gasLimit.toString()}</dd>
        <dt>Gas Used</dt>
        <dd>{block.gasUsed.toString()}</dd>
        <dt>Nonce</dt>
        <dd>{block.nonce}</dd>
        <dt>Transactions</dt>
        <dd>
          <ul>
            {block.transactions.map(({hash}) => (
              <li key={hash}>
                <Link to={`/transaction/${hash}`}>
                  {hash}
                </Link>
              </li>
            ))}
          </ul>  
        </dd>
      </dl>
    </div>
  );
}