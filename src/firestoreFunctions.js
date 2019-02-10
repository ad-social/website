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
  audienceInterests: []
};

const defaultAdset = {
  // Name of the adset
  name: 'Adset 1',
  // All the versions (revisions)
  versions: [],
  acceptedVersion: false
};

const defaultAdsetVersion = {
  adImage: '',
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
      owner: { id: auth.uid, profile: { email: profile.email, name: profile.name } },
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

// ----------------
// ---- ADSETS ----
// ----------------

/**
 * CreateNewAdset
 * Must be used in a location where router query has campaignId
 * @param name Name of the new adset
 */
const CreateNewAdset = props => name => {
  props.firestore.add(
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'adsets' }]
    },
    {
      ...defaultAdset,
      name
    }
  );
};

/**
 * Adsets have multiple versions or "revisions" which can get accepted
 * or denied. This function adds a new version to the adset.
 * @param adsetId The id of the adset to add a version to
 * @param adset The object of the adset so we can append to the versions array
 * @param newAdsetVersion The adset version you would like to add
 */
const AddNewVersionToAdset = props => (adsetId, adset, newAdsetVersion) => {
  const { versions } = adset;
  versions.push({
    ...defaultAdsetVersion,
    ...newAdsetVersion
  });

  props.firestore.update(
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'adsets', doc: adsetId }]
    },
    {
      versions
    }
  );
};

export default { CreateNewCampaign, CreateNewAdset, AddNewVersionToAdset };
