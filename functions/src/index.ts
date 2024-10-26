import {CloudBillingClient} from "@google-cloud/billing";

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = new CloudBillingClient();

//  gcloud functions deploy getbillinginfo --trigger-topic=billing-killswitch --region=europe-north1 --runtime=nodejs20
export const killbilling = async (pubsubEvent: any) => {
  console.log("Hello from inside getbillinginfo");
  try {
    const pubsubData = JSON.parse(
      Buffer.from(pubsubEvent.data, "base64").toString()
    );

    if (pubsubData.costAmount <= pubsubData.budgetAmount) {
      console.log(`Cost amount didn't exceed budget, all good! (Current cost: ${pubsubData.costAmount})`);
      return;
    };

    if (!PROJECT_ID) {
      console.log("No project id was specified")
      return;
    };

    const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
    console.log(`Billing enabled: ${billingEnabled}`);
    return;
    // if (billingEnabled) {
    //   _disableBilling(PROJECT_NAME);
    //   console.log("Billing was disabled");
    //   return;

    // } else {
    //   return "Billing already disabled"
    // }

  } catch (error) {
    console.error("ERROR parsing pubsubEvent.data", error);
    return;
  };
};

async function _isBillingEnabled(projectName: string) {
  try {
    const [res] = await billing.getProjectBillingInfo({name: projectName});
    return res.billingEnabled;

  } catch (error) {
    console.log(
      "Unable to determine if billing is enabled or not, assuming billing is enabled."
    );
    return true;
  };
};

async function _disableBilling(projectName: string) {
  const [res] = await billing.updateProjectBillingInfo({
    projectBillingInfo: {
      name: projectName,
      billingAccountName: "",
    }
  });
  return res;
  
};

