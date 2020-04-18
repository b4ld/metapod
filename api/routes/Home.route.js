const express = require('express');
const homeRouter = express.Router();
/**
 * Get All docker container
 * 
 * @param {Object http} request 
 * @param {Object http} response 
 * @param {function} next  
 */
homeRouter.get('/home',
  async (request, response, next) => {
    return response.sendFile('/_public/', { root: __dirname })
  });
  
module.exports = homeRouter;