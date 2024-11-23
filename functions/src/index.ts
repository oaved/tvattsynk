import { killbilling } from "./billingKillswitch";
import { handleAdminSignUp } from "./handleAdminSignUp";

//  gcloud functions deploy handlebilligkillswitch --trigger-topic=billing-killswitch --region=europe-north1 --runtime=nodejs20
export const handlebillingkillswitch = killbilling;
//  firebase deploy --only functions:handleadminsignup
export const handleadminsignup = handleAdminSignUp;

