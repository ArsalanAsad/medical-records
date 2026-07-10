// src/services/recordService.js

import {
  getAllRecords,
  getUserRecords,
  getRecordById,
  addRecord,
  updateRecord,
  deleteRecord,
} from "./localStorage";


const recordService = {

  getAll: () => {
    return getAllRecords();
  },


  getByUser: (email) => {
    return getUserRecords(email);
  },


  getById: (id) => {
    return getRecordById(id);
  },


  create: (record) => {
    return addRecord(record);
  },


  update: (record) => {
    return updateRecord(record);
  },


  remove: (id) => {
    return deleteRecord(id);
  },

};


export default recordService;