import {GovernEntity,VoteEntity} from "../types";
import { FrontierEvmEvent} from '@subql/contract-processors/dist/frontierEvm';

// Setup types from ABI
type GovernEventArgs = [string, number, number, Date, Date, bigint, string, bigint]
    & {creator: string; number: number; governType: number; startDate: Date; endDate: Date; uintValue: bigint; strValue: string; totalVoter:bigint;};
type VoteEventArgs = [string, number, number, bigint, bigint, bigint, boolean]
    & {votor: string; number: number; governType: number; totalVoter: bigint; approveVoter: bigint; opposeVoter:bigint; success:boolean;};

export async function handleGovernEvent(event: FrontierEvmEvent<GovernEventArgs>): Promise<void> {
    const governEntity = new GovernEntity(event.transactionHash);

    governEntity.creator = event.args.creator;
    governEntity.number = event.args.number;
    governEntity.governType = event.args.governType;
    governEntity.startDate = event.args.startDate;
    governEntity.endDate = event.args.endDate;
    governEntity.uintValue = event.args.uintValue;
    governEntity.strValue = event.args.strValue;
    governEntity.totalVoter = event.args.totalVoter;
    governEntity.contractAddress = event.address;

    await governEntity.save();
}


