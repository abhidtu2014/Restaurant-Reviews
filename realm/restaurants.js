// This function is the webhook's request handler.
exports = async function(payload, response) {
    
  const {restaurantsPerPage = 20, page = 0} = payload.query

  let query = {};
  if (payload.query.cuisine) {
    query = {"cuisine": { $eq: payload.query.cuisine }};
  } else if (payload.query.zipcode) {
    query = { "address.zipcode": { $eq: payload.query.zipcode } };
  } else if (payload.query.name) {
    query = { $text: { $search: payload.query.name } }
  }
  
  const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
  let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray();
  
  restaurantsList.forEach(restaurant => {
    restaurant._id = restaurant._id.toString()
  })
  

  let responseData = {
    restaurants: restaurantsList,
    page,
    filters: {},
    entries_per_page: restaurantsPerPage.toString(),
    total_results: await collection.count(query).then(num => num.toString())
  }
  
  return  responseData;
};