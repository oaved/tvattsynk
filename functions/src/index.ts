import { killbilling } from "./billingKillswitch";
import { handleAdminSignUp } from "./handleAdminSignUp";

//  gcloud functions deploy getbillinginfo --trigger-topic=billing-killswitch --region=europe-north1 --runtime=nodejs20
export const handlebillingkillswitch = killbilling;
export const handleadminsignup = handleAdminSignUp;

