const defaultState = {
  user: {},
  contacts: {
    data: {}
  },
  toasts: [],
  experiences: {
    records: [],
    total: null,
    size: null,
    filtered: [],
    filter: "home"
  },
  requests: {
    records: [],
    total: null,
    size: null
  },
  contactId: null,
  filtered: [],
  filter: "home",
  tempReqData: [
    { id: "100", experience: "Library Tasting", url: "http://thisgoestosalesforce.com", status : "pending" , contact : "George Michael" , date : "7/31/2019" },
    { id: "101", experience: "VIP Experience", url: "http://thisgoestosalesforce.com", status: "pending", contact: "Michael", date: "8/20/2019" },
    { id: "102", experience: "Cellarium Experience", url: "http://thisgoestosalesforce.com", status: "approved", contact: "Lucille", date: "9/13/2019" },
    { id: "103", experience: "Circuit of the Americas", url: "http://thisgoestosalesforce.com", status: "pending", contact: "Tobias", date: "10/9/2019" },
    { id: "104", experience: "Road America", url: "http://thisgoestosalesforce.com", status: "approved", contact: "GOB", date: "11/1/2019" },
    { id: "104", experience: "Summit Point", url: "http://thisgoestosalesforce.com", status: "pending", contact: "Lindsay", date: "12/25/2019" },
  ]
};

export default defaultState;
