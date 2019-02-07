import { validate } from './utils';

const defaultCampaign = {
  createdAt: new Date(),
  passedReview: false,
  status: 'incomplete',
  facebook: false,
  instagram: false,
  ageMax: 18,
  ageMin: 21,
  budget: 100,
  gender: 'any',
  locations: [],
  audienceInterests: []
};

const CreateNewCampaign = ({ profile, auth, firestore }) => (campaign, callback) => {
  // Validate params
  validate('FirestoreFunctions.CreateNewCampaign()', { profile, auth, firestore });
  // Make call
  firestore
    .add('campaigns', {
      ...defaultCampaign,
      ...campaign,
      owner: { id: auth.uid, profile: { email: profile.email, name: profile.name } }
    })
    .then(doc => {
      if (callback) {
        callback(doc);
      }
    });
};

export default { CreateNewCampaign };
