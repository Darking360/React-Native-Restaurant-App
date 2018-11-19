import request from './request';
import { FOOD_INFO_URL, FOOD_TYPES_URL, RESTAURANT_URL, SEARCH_FOOD, SEARCH_RESTAURANT } from './api_constants';

function getFood(id = null, headers = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
  }
  return request({
    url: FOOD_INFO_URL, method: 'GET', params, headers,
  });
}


function getAllCuisineTypes(headers = null) {
  return request({
    url: FOOD_TYPES_URL, method: 'GET', headers,
  });
}

function doSearchFood(search) {
  return request({
    url: `${SEARCH_RESTAURANT}/?name=${search}`, method: 'GET',
  });

}

function doSearchRestaurant(search) {
  return request({
    url: `${SEARCH_FOOD}?name=${search}`, method: 'GET',
  });
}

export default {
  getFood,
  getAllCuisineTypes,
  doSearchFood,
  doSearchRestaurant,
};
