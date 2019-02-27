import { validate } from './utils';

const defaultCampaign = {
  createdAt: new Date(),

  // Whether or not the user is waiting for an adset update
  waitingForAdUpdate: false,
  // List of ads this campaign uses
  ads: [],

  // --- Campaign setup details ---
  strategyStatement: {
    isReadyForUser: false,
    isAcceptedByUser: false
    // // Business details
    // business: {
    //   product: '',
    //   supposition: '',
    //   objective: '',
    //   competition: '',
    //   problem: '',
    //   productFeatures: ''
    // },
    // // Targeting strategy
    // targeting: {
    //   audienceSummary: '',
    //   targetingTags: [],
    //   locations: []
    // },

    // // Positioning
    // positioning: {
    //   desiredMessage: '',
    //   usp: '',
    //   smp: '',
    //   reasoning: '',
    //   desiredReaction: '',
    //   branding: ''
    // },
    // extra: {
    //   toneOfVoice: '',
    //   mandatories: [],
    //   facebook: {
    //     feed: false
    //   },
    //   instagram: {
    //     feed: false
    //   }
    // },
    // final: {
    //   budget: 5,
    //   startDate: new Date(),
    //   endDate: new Date()
    // }
  }
};

const defaultAd = {
  // Name of the adset
  name: 'Ad 1',
  // All the versions (revisions)
  versions: [],
  acceptedVersion: false
};

const defaultAdVersion = {
  image: '',
  copy: '',
  accepted: false,
  denied: false,
  denialReason: ''
};

// ----------------
// --- CAMPAIGN ---
// ----------------

/**
 * CreateNewCampaign
 */
const CreateNewCampaign = ({ profile, auth, firestore }) => (campaign, callback) => {
  // Validate params
  validate('FirestoreFunctions.CreateNewCampaign()', { profile, auth, firestore });
  // Make call
  firestore
    .add('campaigns', {
      ...defaultCampaign,
      ...campaign,
      owner: auth.uid,
      business: profile.activeBusiness
    })
    .then(doc => {
      if (callback) {
        callback(doc);
      }
    });
};

const UpdateCampaignStrategyStatement = props => (fieldName, value) => {
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      [`strategyStatement.${fieldName}`]: value
    }
  );
};

// ----------------
// ---- ADSETS ----
// ----------------

/**
 * CreateNewAdset
 * Must be used in a location where router query has campaignId
 * @param name Name of the new adset
 */
const CreateNewAd = props => name => {
  // Add the adset
  props.firestore.add(
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'ads' }]
    },
    {
      ...defaultAd,
      name
    }
  );
  // Update the campaign to show it is waiting for an adset update
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      waitingForAdsetUpdate: true
    }
  );
};

/**
 * AddNewVersionToAdset
 * Adsets have multiple versions or "revisions" which can get accepted
 * or denied. This function adds a new version to the adset.
 * @param adsetId The id of the adset to add a version to
 * @param adset The object of the adset so we can append to the versions array
 * @param newAdsetVersion The adset version you would like to add
 */
const AddNewVersionToAd = props => (adId, ad, newAdVersion) => {
  const { versions } = ad;
  versions.push({
    ...defaultAdVersion,
    ...newAdVersion
  });
  // Add the new version to the adset
  props.firestore.update(
    {
      collection: 'ads',
      doc: adId
    },
    {
      versions
    }
  );
  // Campaign is now NOT waiting for an ad update
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      waitingForAdsetUpdate: false
    }
  );
};

/**
 * AccepetAdVersion
 * Accept the most recent ad version for this ad
 * @param adId Id for the ad
 */
const AcceptAdVersion = props => adId => {
  props.firestore.update(
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'ads', doc: adId }]
    },
    {
      acceptedVersion: true
    }
  );
  // Campaign is now NOT waiting for an ad update
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      waitingForAdUpdate: false
    }
  );
};

/**
 * DenyAdVersion
 * @param adId Id for the ad
 * @param ad Ad object
 * @param denialReason Reason for denying this ad
 */
const DenyAdVersion = props => (adId, ad, denialReason) => {
  const { versions } = ad;
  versions[versions.length - 1].denied = true;
  versions[versions.length - 1].denialReason = denialReason;
  props.firestore.update(
    {
      collection: 'ads',
      doc: adId
    },
    {
      versions
    }
  );
  // Campaign IS now waiting for an adset update
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      waitingForAdUpdate: true
    }
  );
};

export default {
  CreateNewCampaign,
  UpdateCampaignStrategyStatement,
  CreateNewAd,
  AddNewVersionToAd,
  AcceptAdVersion,
  DenyAdVersion
};
