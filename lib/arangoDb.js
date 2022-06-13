const { Database, aql } = require("arangojs");

const getConnection = () => {
  return new Database({
    url: "http://127.0.0.1:8529/",
    databaseName: "SKI",
    auth: { username: "ski", password: "ski12345" },
  });
};

// const getCollection = async (cName, db) => {
//   const collections = await db.collections();

//   if (collections.find((c) => c._name === cName)) {
//     return await db.collection(cName);
//   } else {
//     return db.createCollection(cName);
//   }
// };

// export const findMerchant = async (kex) => {
//   const db = getConnection();

//   await getCollection("merchant", db);

//   let result = [];

//   const resx = await db.query(aql`
//     FOR u IN merchant
//       FILTER u.owner == ${kex}
//     RETURN u
//   `);

//   for await (let config of resx) {
//     result.push(config);
//   }

//   return result;
// };

// export const taggingList = async () => {
//   const db = getConnection();

//   await getCollection("tag", db);

//   let result = [];

//   const resx = await db.query(aql`
//     FOR u IN tag
//     RETURN {name: u.name, _key: u._key}
//   `);

//   for await (let config of resx) {
//     result.push(config);
//   }

//   return result;
// };

// export const businessTypeList = async () => {
//   const db = getConnection();

//   await getCollection("user_alamerchant", db);

//   let result = [];

//   const resx = await db.query(aql`
//     FOR u IN global
//       FILTER u.type == "business_type"
//     RETURN u
//   `);

//   for await (let config of resx) {
//     result.push(config);
//   }

//   return result;
// };

// export const checkUid = async (uid) => {
//   const db = getConnection();

//   await getCollection("user_alamerchant", db);

//   let result = [];

//   const resx = await db.query(aql`
//     FOR u IN backoffice
//       FILTER u._key == ${uid}
//     RETURN u
//   `);

//   for await (let config of resx) {
//     result.push(config);
//   }

//   return result;
// };

// export const bankList = async () => {
//   const db = getConnection();

//   await getCollection("global", db);

//   let result = [];

//   const resx = await db.query(aql`
//     FOR u IN global
//       FILTER u.type == "bank_list"
//     RETURN u
//   `);

//   for await (let config of resx) {
//     result.push(config);
//   }

//   return result;
// };
