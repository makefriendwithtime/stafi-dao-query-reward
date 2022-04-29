import {GovernEntity,VoteEntity} from "../types";
import { FrontierEvmEvent} from '@subql/contract-processors/dist/frontierEvm';
import { BigNumber } from "ethers";

// Setup types from ABI
type GovernEventArgs = [string, number, number, Date, Date, BigNumber, string, BigNumber]
    & {creator: string; number: number; governType: number; startDate: Date; endDate: Date; uintValue: BigNumber; strValue: string; totalVoter:BigNumber;};
type VoteEventArgs = [string, number, number, BigNumber, BigNumber, BigNumber, boolean]
    & {votor: string; number: number; governType: number; totalVoter: BigNumber; approveVoter: BigNumber; opposeVoter:BigNumber; success:boolean;};

export async function handleGovernEvent(event: FrontierEvmEvent<GovernEventArgs>): Promise<void> {
    const governEntity = new GovernEntity(event.transactionHash);

    governEntity.creator = event.args.creator;
    governEntity.number = event.args.number;
    governEntity.governType = event.args.governType;
    governEntity.startDate = event.args.startDate;
    governEntity.endDate = event.args.endDate;
    governEntity.uintValue = event.args.uintValue.toBigInt();
    governEntity.strValue = event.args.strValue;
    governEntity.totalVoter = event.args.totalVoter.toBigInt();
    governEntity.contractAddress = event.address;

    await governEntity.save();
}


