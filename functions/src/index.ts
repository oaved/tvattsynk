import { killbilling } from "./billingKillswitch";
import { handleAdminSignUp } from "./handleAdminSignUp";
import { handleUserSignUp } from "./handleUserSignUp";

//  gcloud functions deploy handlebilligkillswitch --trigger-topic=billing-killswitch --region=europe-north1 --runtime=nodejs20
export const handlebillingkillswitch = killbilling;
//  firebase deploy --only functions:handleadminsignup
export const handleadminsignup = handleAdminSignUp;
//  firebase deploy --only functions:handleusersignup
export const handleusersignup = handleUserSignUp;
