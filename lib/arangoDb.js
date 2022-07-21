const { Database, aql } = require("arangojs");

const getConnection = () => {
  return new Database({
    url: "http://127.0.0.1:8529/",
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

export const findOutlet = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
    FOR u IN outlet
      FILTER u._key == ${key}
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
        "shortname" : i.shortname,
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

export const allUsers = async (start, length) => {
  const db = getConnection();

  await getCollection("user_ski", db);

  let result = [];

  const resx = await db.query(aql`
    for i in user_ski
    for j in outlet
    filter i.outlet != ""  and i.outlet == j._key
    sort i.active DESC
    limit ${start}, ${length}
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

export const getTotalAdmin = async () => {
  const db = getConnection();

  await getCollection("user_ski", db);

  let result = [];

  const resx = await db.query(aql`
  for i in user_ski
  for j in outlet
  filter i.outlet != "" and i.outlet == j._key
    collect with count into length
    return 
    {
        "total" : length
    }`);

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

export const mainCategory = async (start, length) => {
  const db = getConnection();

  await getCollection("category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in category
  sort i.active DESC
  limit ${start},${length}
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

export const getTotalCategory = async () => {
  const db = getConnection();

  await getCollection("category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in category
	collect with count into length
	return 
	{
	    "total" : length
	}`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getContent = async (start, length) => {
  const db = getConnection();

  await getCollection("content_slider", db);

  let result = [];

  const resx = await db.query(aql`
  for i in content_slider
  sort i.active DESC
  limit ${start},${length}
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

export const getTotalContent = async () => {
  const db = getConnection();

  await getCollection("content_slider", db);

  let result = [];

  const resx = await db.query(aql`
  for i in content_slider
  collect with count into length
  return 
  {
      "total" : length
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getVoucher = async (start, length) => {
  const db = getConnection();

  await getCollection("voucher", db);

  let result = [];

  const resx = await db.query(aql`
  for i in voucher
  for j in outlet
  filter i.outlet == j._key
  limit ${start},${length}
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

export const getTotalVoucher = async () => {
  const db = getConnection();

  await getCollection("voucher", db);

  let result = [];

  const resx = await db.query(aql`
  for i in voucher
  for j in outlet
  filter i.outlet == j._key
  collect with count into length
  return
  {
    "total" : length
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const allCst = async (start, length) => {
  const db = getConnection();

  await getCollection("customer", db);

  let result = [];

  const resx = await db.query(aql`
  for i in customer
  sort i.active DESC
  limit ${start},${length}
  return 
  {
      "key" : i._key,
      "username": i.username,
      "fullname": i.fullname,
      "email" : i.email,
      "male" : i.male,
      "address" : i.address.detail,
      "pict": i.pict,
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

export const getTotalCust = async () => {
  const db = getConnection();

  await getCollection("customer", db);

  let result = [];

  const resx = await db.query(aql`
  for i in customer
  collect with count into length
  return 
  {
    "total" : length
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getProducts = async () => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
  for i in product
  filter i.recommend == false
  limit 0, 10
  return 
  {
    "key" : i._key,
    "name" : i.name,
    "description" : i.description,
    "outlet" : i.outlet,
    "price" : i.price,
    "weight" : i.weight,
    "stock" : i.stock,
    "discount" : i.discount,
    "recommend" : i.recommend,
    "created_at" : i.created_at
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getTotalProducts = async () => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
  for i in product
  filter i.recommend == false
  collect with count into length
  return 
  {
    "total" : length
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getProductsRecomd = async () => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
  for i in product
  filter i.recommend == true
  limit 0, 10
  return 
  {
    "key" : i._key,
    "name" : i.name,
    "description" : i.description,
    "outlet" : i.outlet,
    "price" : i.price,
    "weight" : i.weight,
    "stock" : i.stock,
    "discount" : i.discount,
    "recommend" : i.recommend,
    "created_at" : i.created_at
  }
  `);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getTotalProductsRecomd = async () => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
  for i in product
  filter i.recommend == true
  collect with count into length
  return 
  {
    "total" : length
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const PenjualanQty = async () => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  FOR x IN [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
  let a = (
  for i in order 
  filter i.status == "1757300" and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
  collect b = DATE_TRUNC(i.created_at*1000, "month") INTO data = i._key
  return 
  {
    "month" : DATE_MONTH(b),
    "data" : length(data)
  }
  )
  return a[0].month == x ? a[0].data : 0`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const PenjualanRp = async () => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  FOR x IN [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
  let a = (
  for i in order 
  filter i.status == "1757300" and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
  collect b = DATE_TRUNC(i.created_at*1000, "month") INTO data = i.total - (i.total * i.voucher / 100)
  return 
  {
    "month" : DATE_MONTH(b),
    "data" : sum(data)
  }
  )
  return a[0].month == x ? a[0].data : 0`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const topBrand = async () => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in outlet
  filter i.position != 4
  sort i.position ASC
  return 
  {
    "key": i._key,
    "name" : i.name,
    "pict" : i.pict,
    "description" : i.description,
    "province" : i.province,
    "city" : i.city,
    "position" : i.position,
    "active" : i.active,
    "created_at" : i.created_at
}`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const listBrand = async () => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in outlet
  filter i.position == 4
  sort i.active DESC
  limit 0,10
  return 
  {
    "key": i._key,
    "name" : i.name,
    "pict" : i.pict,
    "description" : i.description,
    "province" : i.province,
    "city" : i.city,
    "position" : i.position,
    "active" : i.active,
    "created_at" : i.created_at
  }
`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getTotalBrand = async () => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in outlet
  filter i.position == 4
  collect with count into length
  return 
  {
    "total" : length
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};
