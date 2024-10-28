import { killbilling } from "./billingKillswitch";

//  gcloud functions deploy getbillinginfo --trigger-topic=billing-killswitch --region=europe-north1 --runtime=nodejs20
export const handlebilling = killbilling;
