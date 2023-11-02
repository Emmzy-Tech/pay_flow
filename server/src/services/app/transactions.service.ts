import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";

export class TransactionService extends DolphServiceHandler<Dolph>{
    constructor(){
        super("transactionService")
    }

    public readonly processPayment = async()=>{
        
    }
}