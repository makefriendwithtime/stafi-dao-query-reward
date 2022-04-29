import { Transaction} from "../types";
import { FrontierEvmEvent, FrontierEvmCall } from '@subql/contract-processors/dist/frontierEvm';

import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & { from: string; to: string; value: BigNumber; };

export async function handleFrontierEvmEvent(event: FrontierEvmEvent<TransferEventArgs>): Promise<void> {
    const transaction = new Transaction(event.transactionHash);

    transaction.value = event.args.value.toBigInt();
    transaction.from = event.args.from;
    transaction.to = event.args.to;
    transaction.contractAddress = event.address;

    await transaction.save();
}