import VuexEasyFirestore from "vuex-easy-firestore";

export default ({ store }) => {
  VuexEasyFirestore([
    {
      firestorePath: "users/{userId}",
      firestoreRefType: "doc", // 'collection' or 'doc'
      moduleName: "userModule",
      statePropName: "data",
    },
  ])(store);
};
