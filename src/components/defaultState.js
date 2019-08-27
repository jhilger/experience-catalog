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
    filter: "home",
    types: {
      data: {},
      list: []
    }
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
  filter: "home",
  tiers: [
    {
      id: "1100",
      name: "Gold",
      description: "This tier is for customers with any product oppportunity.",
      doc: "/img/doc.pdf"
    },
    {
      id: "2200",
      name: "Platinum",
      description:
        "This tier is for customers with a Light Jet or Corporate Jet opportunity.",
      doc: "/img/doc.pdf"
    },
    {
      id: "3300",
      name: "Diamond",
      description:
        "This tier is for customers with a Corporate Jet opportunity.",
      doc: "/img/doc.pdf"
    }
  ]
};

export default defaultState;
