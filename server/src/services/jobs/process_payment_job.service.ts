import { mongoose } from "@dolphjs/dolph/packages";
import { PaymentType } from "./types";
import { configs } from "@/configs";
import { generateTransactionId } from "@/utils";
import { Opay } from "../helpers";

export const processPayment = async ({userId, amount, currentBalance,receiver}: PaymentType)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const reference = `${new Date().getTime()}_${configs.opay.id}`

    const transactionReference = generateTransactionId(userId);

    try {
        const creditAccount = await new Opay().sendToBank({
            reference,
            amount,
            currency: "ngn",
            country: "Nigeria",
            reason: "payment for montly salary",
            receiver,
        });

        console.info(creditAccount);

        // await 
    } catch (e:any) {
        console.error("Error: ", e.message);
        throw e;
    }
};