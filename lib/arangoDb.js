const { Database, aql } = require("arangojs");

const getConnection = () => {
  return new Database({
    url: "http://192.168.254.197:8529/",
    databaseName: "SKI",
    auth: { username: "ski", password: "ski12345" },
  });
};

const getCollection = async (cName, db) => {
  const collections = await db.collections();

  if (collections.find((c) => c._name === cName)) {
    return await db.collection(cName);
  } else {
    return db.createCollection(cName);
  }
};

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

export const checkUid = async (uid) => {
  const db = getConnection();

  await getCollection("user_ski", db);

  let result = [];

  const resx = await db.query(aql`
    FOR u IN user_ski
      FILTER u._key == ${uid}
    RETURN u
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const allOutlet = async () => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
    for i in outlet
    let orders = (
    for j in order
    filter i._key == j.outlet.key and j.status == "1758745"
    collect with count into a
    return a
    )
    let products = (
    for k in product
    filter k.outlet == i._key
    collect with count into b
    return b
    )
    let sub_categories = (
    for l in sub_category
    filter l.outlet == i._key
    collect with count into c
    return c
    )
    return 
    {
        "key" : i._key,
        "name" : i.name,
        "pict" : i.pict,
        "description" : i.description,
        "orders" : orders[0],
        "products" : products[0],
        "sub_categories" : sub_categories[0],
        "active" : i.active,
        "created_at" : i.created_at
    }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const allUsers = async () => {
  const db = getConnection();

  await getCollection("user_ski", db);

  let result = [];

  const resx = await db.query(aql`
    for i in user_ski
    for j in outlet
    filter i.outlet != ""  and i.outlet == j._key

    return 
    {
        "key" : i._key,
        "username": i.username,
        "fullname": i.fullname,
        "address" : i.address,
        "email" : i.email,
        "phone" : i.phone,
        "pict" : i.pict,
        "outlet" : {"key" : j._key, "name" : j.name},
        "active" : i.active,
        "created_at" : i.created_at
    }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOutlet = async () => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
   for i in outlet
  return 
  {
    "key" : i._key,
    "name" : i.name
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const mainCategory = async () => {
  const db = getConnection();

  await getCollection("category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in category
  return 
  {
      "key" : i._key,
      "name" : i.name,
      "active" : i.active,
      "created_at" : i.created_at
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getContent = async () => {
  const db = getConnection();

  await getCollection("content_slider", db);

  let result = [];

  const resx = await db.query(aql`
  for i in content_slider
  return 
  {
    "key" : i._key,
    "title" : i.title,
    "description" : i.description,
    "pict" : i.pict,
    "type" : i.type,
    "label" : i.label,
    "active" : i.active,
    "created_at" : i.created_at
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getVoucher = async () => {
  const db = getConnection();

  await getCollection("voucher", db);

  let result = [];

  const resx = await db.query(aql`
  for i in voucher
  for j in outlet
  filter i.outlet == j._key
  return
  {
    "key" : i._key,
    "outlet" : j.name,
    "name" : i.name,
    "percentage" : i.percentage,
    "min" : i.min,
    "expired" : i.expired,
    "created_at" : i.created_at
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};
export const allCst = async () => {
  const db = getConnection();

  await getCollection("customer", db);

  let result = [];

  const resx = await db.query(aql`
for i in customer
return 
{
    "key" : i._key,
    "username": i.username,
    "fullname": i.fullname,
    "email" : i.email,
    "male" : i.male,
    "address" : i.address.detail,
    "phone" : i.phone,
    "date_of_birth" : i.date_of_birth,
    "active" : i.active,
    "created_at" : i.created_at
}
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

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
