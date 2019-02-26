import { validate } from './utils';

const defaultCampaign = {
  // --- Campaign Status Indicators ---
  // Whether or not the user has submitted this campaign for review
  submittedForReview: false,
  // Whether or not the review passed & reason for denial if not
  reviewPassed: false,
  reviewDenied: false,
  reviewDenialReason: '',
  // Whether or not the user is waiting for an adset update
  waitingForAdsetUpdate: false,

  // --- Campaign setup details ---
  createdAt: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  facebook: false,
  instagram: false,
  ageMax: 18,
  ageMin: 21,
  budget: 100,
  gender: 'any',
  locations: [],
  audienceInterests: [],
  ads: []
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
      business: {
        id: profile.activeBusiness
      }
    })
    .then(doc => {
      if (callback) {
        callback(doc);
      }
    });
};

/**
 * PassCampaignReview
 * Pass this campaign review and open all sections for this campaign
 */
const PassCampaignReview = props => {
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      submittedForReview: true,
      reviewDenied: false,
      reviewPassed: true
    }
  );
};

/**
 * DenyCampaignReview
 * @param reason reason for denying this campaign
 */
const DenyCampaignReview = props => reason => {
  props.firestore.update(
    { collection: 'campaigns', doc: props.router.query.campaignId },
    {
      submittedForReview: false,
      reviewDenied: true,
      reviewPassed: false,
      reviewDenialReason: reason
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
  PassCampaignReview,
  DenyCampaignReview,
  CreateNewAd,
  AddNewVersionToAd,
  AcceptAdVersion,
  DenyAdVersion
};
