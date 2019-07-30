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
    records: [],
    data: {},
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
