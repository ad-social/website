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
  acceptedVersion: ''
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
 */
const CreateNewAdset = props => adset => {
  props.firestore.add(
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'adsets' }]
    },
    {
      ...defaultAdset,
      ...adset
    }
  );
};

export default { CreateNewCampaign, CreateNewAdset };
