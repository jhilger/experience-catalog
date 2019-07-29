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
    submitted: [],
    approved: [],
    total: null,
    size: null
  },
  contactId: null,
  filtered: [],
  filter: "home"
};

export default defaultState;
