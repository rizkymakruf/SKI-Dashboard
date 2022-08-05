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
    for x in sub_category
    filter k.outlet == i._key and x.outlet == i._key and position(x.products,k._key) and k.active == true
    collect with count into b
    return b
    )
    let sub_categories = (
    for l in sub_category
    filter l.outlet == i._key
    collect with count into c
    return c
    )
    sort i.created_at DESC
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
    sort i.created_at DESC
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
  sort i.created_at DESC
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
  sort i.created_at DESC
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
  sort i.created_at DESC
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
  sort i.created_at DESC
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
  sort i.created_at DESC
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
  sort i.created_at DESC
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
  for j in outlet
	for y in i.detail_order
  filter i.outlet.key == j._key and (i.status == "1757300" or i.status == "1757312") and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
  collect b = DATE_TRUNC(i.created_at*1000, "month") INTO data = y.qty
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

export const PenjualanRp = async () => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  FOR x IN [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
  let a = (
  for i in order
  for j in outlet
  filter i.outlet.key == j._key and (i.status == "1757300" or i.status == "1757312") and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
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
  filter i.position < 6
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

export const listBrand = async (start, length) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in outlet
  filter i.position == 6 and i.active == true
  sort i.created_at DESC
  limit ${start},${length}
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
  filter i.position == 6 and i.active == true
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

export const getOutletByShortname = async (shortname) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in outlet
  filter i.shortname == ${shortname}
  return {
      "key" : i._key,
      "name" : i.name,
      "shortname" : i.shortname
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOutletDashboardQty = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  FOR x IN [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
  let a = (
  for i in order 
  filter i.status == "1757300" and i.outlet.key == ${key} and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
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

export const getOutletDashboardRp = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  FOR x IN [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
let a = (
for i in order 
filter i.status == "1757300" and i.outlet.key == ${key} and DATE_YEAR(i.created_at*1000) == DATE_YEAR(DATE_NOW()) and DATE_MONTH(i.created_at*1000) == x
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

export const getOutletDashboardCategory = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
for i in sub_category
filter i.outlet == ${key}
collect with count into length
return length`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};
export const getOutletDashboardOrder = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
for i in order
filter i.outlet.key == ${key} and (i.status == "1757252" or i.status == "1758745")
collect with count into length
return length`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};
export const getOutletDashboardUnpack = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
for i in order
filter i.outlet.key == ${key} and i.status == "2045415"
collect with count into length
return length`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOutletDashboardProduct = async (key) => {
  const db = getConnection();

  await getCollection("outlet", db);

  let result = [];

  const resx = await db.query(aql`
  for i in product
  for j in sub_category
  filter i.outlet == ${key} and j.outlet == ${key} and position(j.products,i._key) and i.active == true
  collect with count into length
  return length`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOutletProductList = async (key, start, length) => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
for i in product
for j in sub_category
filter i.outlet == ${key} and j.outlet == ${key} and position(j.products,i._key) and i.active == true
limit ${start}, ${length}
return 
{
    "key" : i._key,
    "name" : i.name,
    "main" : j.name,
    "description" : i.description,
    "price" : i.price,
    "weight" : i.weight,
    "stock" : i.stock,
    "pict" : i.pict,
    "add_info" : i.add_info,
    "active" : i.active,
    "created_at": i.created_at
}`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getTotalOutletProduct = async (key) => {
  const db = getConnection();

  await getCollection("product", db);

  let result = [];

  const resx = await db.query(aql`
for i in product
for j in sub_category
filter i.outlet == ${key} and j.outlet == ${key} and position(j.products,i._key) and i.active == true
collect with count into length
return { "total" : length}`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getAllCategory = async () => {
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
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getAllSubCategory = async (key, start, length) => {
  const db = getConnection();

  await getCollection("sub_category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in sub_category
  for j in category
  filter i.outlet == ${key} and i.category == j._key 
  sort i.created_at DESC
  limit ${start}, ${length}
  return 
  {
      "main" : j.name,
      "category" : j._key,
      "key" : i._key,
      "name" : i.name,
      "active" : i.active,
      "created_at" : i.created_at
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getListSubCategory = async (key) => {
  const db = getConnection();

  await getCollection("sub_category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in sub_category
  for j in category
  filter i.outlet == ${key} and i.category == j._key 
  sort i.created_at DESC
  return 
  {
      "main" : j.name,
      "category" : j._key,
      "key" : i._key,
      "name" : i.name,
      "active" : i.active,
      "created_at" : i.created_at
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getTotalSubCategory = async (key) => {
  const db = getConnection();

  await getCollection("sub_category", db);

  let result = [];

  const resx = await db.query(aql`
  for i in sub_category
  for j in category
  filter i.outlet == ${key} and i.category == j._key 
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

export const getAllOrder = async (key, start, length) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  for x in expedition
  for k in transaction
  for l in customer
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key and position(k.order, i._key) and k.customer == l._key and i.expedition == x._key
  sort i.created_at DESC
  limit ${start}, ${length}
  return 
  {
    "key" : i._key,
    "invoice" : i.invoice,
    "detail_order" : i.detail_order,
    "customer" : {
      "fullname" : l.fullname,
      "address" : l.address
    },
    "total" : i.total,
    "ongkir" : i.ongkir,
    "expedition" : x.name,
    "voucher" : i.voucher,
    "status" : j.name,
    "created_at" : i.created_at
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOrderPacked = async (key, start, length) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  for x in expedition
  for k in transaction
  for l in customer
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key and position(k.order, i._key) and k.customer == l._key and i.status == "1757268" and i.expedition == x._key
  sort i.created_at DESC
  limit ${start}, ${length}
  return 
  {
    "key" : i._key,
    "invoice" : i.invoice,
    "detail_order" : i.detail_order,
    "customer" : {
      "fullname" : l.fullname,
      "address" : l.address
    },
    "total" : i.total,
    "ongkir" : i.ongkir,
    "expedition" : x.name,
    "voucher" : i.voucher,
    "status" : j.name,
    "created_at" : i.created_at
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const getOrderConfirmed = async (key, start, length) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  for x in expedition
  for k in transaction
  for l in customer
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key and position(k.order, i._key) and k.customer == l._key and i.status == "2045415" and i.expedition == x._key
  sort i.created_at DESC
  limit ${start}, ${length}
  return 
  {
    "key" : i._key,
    "invoice" : i.invoice,
    "detail_order" : i.detail_order,
    "customer" : {
      "fullname" : l.fullname,
      "address" : l.address
    },
    "total" : i.total,
    "ongkir" : i.ongkir,
    "expedition" : x.name,
    "voucher" : i.voucher,
    "status" : j.name,
    "created_at" : i.created_at
  }`);

  for await (let config of resx) {
    result.push(config);
  }

  return result;
};

export const totalAllOrder = async (key) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key
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

export const totalOrderPacked = async (key) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key and i.status == "1757268"
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

export const totalOrderConfirmed = async (key) => {
  const db = getConnection();

  await getCollection("order", db);

  let result = [];

  const resx = await db.query(aql`
  for i in order
  for j in global
  filter i.outlet.key == ${key} and j.type == "order_status" and i.status == j._key and i.status == "2045415"
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
