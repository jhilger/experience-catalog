const defaultState = {
  user: {},
  contacts: {
    data: {},
    loading: false
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
    data: {},
    records: [],
    total: null,
    size: null
  },
  contactId: null,
  requestId: null,
  filtered: [],
  filter: "home",
  tempReqData: [
    { id: "100", name: "Request 1", url: "http://thisgoesnowhere.com" },
    { id: "200", name: "Request 2", url: "http://thisgoesnowhere.com" },
    { id: "300", name: "Request 3", url: "http://thisgoesnowhere.com" }
  ],
  tempExpData: [
    { id: "400", name: "Experience 1", url: "http://thisgoesnowhere.com" },
    { id: "500", name: "Experience 2", url: "http://thisgoesnowhere.com" },
    { id: "600", name: "Experinece 3", url: "http://thisgoesnowhere.com" }
  ]
};

export default defaultState;
