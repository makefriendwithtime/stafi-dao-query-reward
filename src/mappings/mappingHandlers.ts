import {GovernEntity,VoteEntity} from "../types";
import { FrontierEvmEvent} from '@subql/contract-processors/dist/frontierEvm';
import { BigNumber } from "ethers";

// Setup types from ABI
type GovernEventArgs = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, string, BigNumber]
    & {creator: string; number: BigNumber; governType: BigNumber; startDate: BigNumber; endDate: BigNumber; uintValue: BigNumber; strValue: string; totalVoter:BigNumber;};
type VoteEventArgs = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, boolean]
    & {votor: string; number: BigNumber; governType: BigNumber; totalVoter: BigNumber; approveVoter: BigNumber; opposeVoter:BigNumber; success:boolean;};

export async function handleFrontierEvmEvent(event: FrontierEvmEvent<GovernEventArgs>): Promise<void> {
    const governEntity = new GovernEntity(event.transactionHash);

    governEntity.creator = event.args.creator;
    governEntity.number = event.args.number.toBigInt();
    governEntity.governType = event.args.governType.toBigInt();
    governEntity.startDate = event.args.startDate.toBigInt();
    governEntity.endDate = event.args.endDate.toBigInt();
    governEntity.uintValue = event.args.uintValue.toBigInt();
    governEntity.strValue = event.args.strValue;
    governEntity.totalVoter = event.args.totalVoter.toBigInt();
    governEntity.contractAddress = event.address;

    await governEntity.save();
}


