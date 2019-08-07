const defaultState = {
  user: {},
  contacts: {
    data: {},
    loading: false
  },
  toasts: [],
  experiences: {
    data: {},
    records: [],
    total: null,
    size: null,
    filtered: [],
    filter: "home"
  },
  requests: {
    data: {},
    records: [],
    submitted: [],
    approved: [],
    total: null,
    size: null
  },
  experienceId: null,
  contactId: null,
  requestId: null,
  filtered: [],
  filter: "home"
};

export default defaultState;
