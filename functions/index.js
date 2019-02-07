// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.onCreateCampaign = functions.firestore
  .document('campaigns/{campaignId}')
  .onCreate(async (snap, context) => {
    const auth = context.auth;
    // Default values for the campaign
    const campaign = {
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

    // Add owner data to campaign
    if (auth) {
      // Fetch user's profile
      const profile = await admin
        .database()
        .ref(`/users/${auth.uid}`)
        .get();

      // Add profile data to campaign
      campaign.owner = {
        id: auth.uid,
        profile: {
          email: profile.email,
          name: profile.name
        }
      };
      campaign.business = profile.activeBusiness;
    }

    // Merge in the changes
    return snap.ref.set(campaign, { merge: true });
  });
