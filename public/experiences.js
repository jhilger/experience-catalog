var sideNavFilters = (function (window) {
  //return ["wine", "driving", "art", "music", "outdoor", "sports" ];
  return ["wine", "driving"];
} (window));

var experiences = (function (window) {
  /*type: wine, driving, art, music, outdoor, sports */
  return [
    {
      id: 1000,
      display: true,
      type: "wine",
      name: "Historic Tour & Tasting",
      company: "Davis Estates",
      hero : "img/davisestates1.jpg",
      content : "<p>Travel back in time on a tour of our historic property, offering a glimpse of how Davis Estates developed. The tour concludes in the tasting room, where our terrace provides stunning views of the Calistoga terroir.</p><p>Take in the sights and enjoy a tasting flight of our flagship wines paired with an array of seasonal delicacies from our Executive Chef.</p><p class=\"exp-card-tagline\">Davis Estates is a beautiful property with some of the most unique and cutting-edge tasting experiences in Napa Valley. With various experiential culinary and wine offerings across the estate, this will be an unforgettable experience for you and your customers to enjoy together.</p>",
      keepinmind : [
        "Limited to 10 guests",
        "Available at 10 am and 2 pm",
        "Please allow 90 minutes"
      ],
      partnerdetails : "<p>All experiences are available for booking 3-4 weeks in advance, and are complimentary with the purchase of two bottles of wine per person. (Pricing ranges from $100-$250/bottle)</p><p>Sales team members are not obligated to purchase wine. If the minimum purchase is not reached by customers, please expense and allocate to Partnerships Department.</p>"
    },
    {
      id: 1001,
      display: true,
      type: "wine",
      name: "Library Tasting",
      company: "Davis Estates",
      hero : "img/davisestates3.jpg",
      content : "<p>Embark on a private journey of our breathtaking estate that draws you into our leading-edge winery. Savor the premier Cabernets of Davis Estates crafted by Cary Gott and the exclusive Phase V wines by Philippe Melka.</p><p>Hosted deep within our caves in the exclusive Library Cellar. The unique flight features five richly textured reds perfectly paired with artisan cheeses and charcuterie hand selected by our Executive Chef.</p><p class=\"exp-card-tagline\">Davis Estates is a beautiful property with some of the most unique and cutting-edge tasting experiences in Napa Valley. With various experiential culinary and wine offerings across the estate, this will be an unforgettable experience for you and your customers to enjoy together.</p>",
      keepinmind : [
        "Limited to 8 guests",
        "Available at 10 am and 1 pm",
        "Monday, Wednesday and Friday",
        "Please allow 90 minutes"
      ],
      partnerdetails : "<p>All experiences are available for booking 3-4 weeks in advance, and are complimentary with the purchase of two bottles of wine per person. (Pricing ranges from $100-$250/bottle)</p><p>Sales team members are not obligated to purchase wine. If the minimum purchase is not reached by customers, please expense and allocate to Partnerships Department.</p>"
    },
    {
      id : 1002,
      display: true,
      type: "wine",
      name: "VIP Experience",
      company: "Davis Estates",
      hero : "img/davisestates2.jpg",
      content : "<p>For serious wine collectors and wine lovers, we offer a behind the scenes tour of our property. Begin with a walk through our vineyard and estate. Continue into our Howard Backen designed, cutting-edge winery and tour 11,000 square feet of caves.</p><p>After the tour enjoy a private seated tasting hosted in our VIP Crush Room and indulge in our reserve wines beautifully paired with seasonal gourmet bites crafted by our Executive Chef.</p><p class=\"exp-card-tagline\">Davis Estates is a beautiful property with some of the most unique and cutting-edge tasting experiences in Napa Valley. With various experiential culinary and wine offerings across the estate, this will be an unforgettable experience for you and your customers to enjoy together.</p>",
      keepinmind : [
        "Limited to 4 guests",
        "Available daily",
        "Please allow 120 minutes"
      ],
      partnerdetails : "<p>All experiences are available for booking 3-4 weeks in advance, and are complimentary with the purchase of two bottles of wine per person. (Pricing ranges from $100-$250/bottle)</p><p>Sales team members are not obligated to purchase wine. If the minimum purchase is not reached by customers, please expense and allocate to Partnerships Department.</p>"
    },
    {
      id : 1003,
      display: true,
      type: "wine",
      name: "Cellarium Experience",
      company: "Davis Estates",
      hero : "img/davisestates4.jpg",
      content : "<p>For our Founders Club members only, this is your personal access to our rarest wines and most intimate space. Take an in-depth tour behind the scenes and personally open the Phase V room by your infrared palm scan.</p><p>The Cellarium hidden within our caves is where you will enjoy a private seated tasting of Phase V wines hand crafted by winemaker Philippe Melka. Our Executive Chef has wonderfully paired these wines with seasonal food pairings.</p><p class=\"exp-card-tagline\">Davis Estates is a beautiful property with some of the most unique and cutting-edge tasting experiences in Napa Valley. With various experiential culinary and wine offerings across the estate, this will be an unforgettable experience for you and your customers to enjoy together.</p>",
      keepinmind : [
        "Limited to 8 guests",
        "Available daily",
        "Please allow 120 minutes"
      ],
      partnerdetails : "<p>All experiences are available for booking 3-4 weeks in advance, and are complimentary with the purchase of two bottles of wine per person. (Pricing ranges from $100-$250/bottle)</p><p>Sales team members are not obligated to purchase wine. If the minimum purchase is not reached by customers, please expense and allocate to Partnerships Department.</p>"
    },
    {
      id : 1004,
      display: true,
      type: "driving",
      name: "Performance Drives",
      company: "Porsche",
      hero : "img/porsche1.jpg",
      content : "<p>Customers will participate in two (2) sessions per day – roughly a 4 hour experience. There will be a brief classroom session and then participants are put into 3 groups that will rotate throughout the session (street drive, lead /follow and autocross).</p><p class=\"exp-card-tagline\">Autocross: Performance & value of a Cayman with minimal options</p><p class=\"exp-card-tagline\">Lifestyle Drive: Versatility, quality and cutting edge technology of the new E3 Cayenne and 2019 Macan</p><p class=\"exp-card-tagline\">Lead / Follow: Panamera as a \"Sports Sedan\", a true Sports Car for every day. Showcasing the halo model in our lineup, the 911</p><p class=\"exp-card-tagline\">Hot Laps: PHEV as a benefit to Performance vs. solely \"Economy.\" The incredible Performance level of our top-trim Panamera</p>",
      keepinmind : [
        "Circuit of the Americas",
        "Austin, Texas",
        "June 3-5, 2019"
      ],
      partnerdetails : "<p>N/A</p>"
    },
    {
      id : 1005,
      display: true,
      type: "driving",
      name: "Performance Drives",
      company: "Porsche",
      hero : "img/porsche2.jpg",
      content : "<p>Customers will participate in two (2) sessions per day – roughly a 4 hour experience. There will be a brief classroom session and then participants are put into 3 groups that will rotate throughout the session (street drive, lead /follow and autocross).</p><p class=\"exp-card-tagline\">Autocross: Performance & value of a Cayman with minimal options</p><p class=\"exp-card-tagline\">Lifestyle Drive: Versatility, quality and cutting edge technology of the new E3 Cayenne and 2019 Macan</p><p class=\"exp-card-tagline\">Lead / Follow: Panamera as a \"Sports Sedan\", a true Sports Car for every day. Showcasing the halo model in our lineup, the 911</p><p class=\"exp-card-tagline\">Hot Laps: PHEV as a benefit to Performance vs. solely \"Economy.\" The incredible Performance level of our top-trim Panamera</p>",
      keepinmind : [
        "Laguna Seca",
        "Monterey, California",
        "June 21-23, 2019"
      ],
      partnerdetails : "<p>N/A</p>"
    },
    {
      id : 1006,
      display: true,
      type: "driving",
      name: "Performance Drives",
      company: "Porsche",
      hero : "img/porsche3.jpg",
      content : "<p>Customers will participate in two (2) sessions per day – roughly a 4 hour experience. There will be a brief classroom session and then participants are put into 3 groups that will rotate throughout the session (street drive, lead /follow and autocross).</p><p class=\"exp-card-tagline\">Autocross: Performance & value of a Cayman with minimal options</p><p class=\"exp-card-tagline\">Lifestyle Drive: Versatility, quality and cutting edge technology of the new E3 Cayenne and 2019 Macan</p><p class=\"exp-card-tagline\">Lead / Follow: Panamera as a \"Sports Sedan\", a true Sports Car for every day. Showcasing the halo model in our lineup, the 911</p><p class=\"exp-card-tagline\">Hot Laps: PHEV as a benefit to Performance vs. solely \"Economy.\" The incredible Performance level of our top-trim Panamera</p>",
      keepinmind : [
        "Road America",
        "Elkhart Lake, Wisconsin",
        "August 12-14, 2019"
      ],
      partnerdetails : "<p>N/A</p>"
    },
    {
      id : 1007,
      display: true,
      type: "driving",
      name: "Performance Drives",
      company: "Porsche",
      hero : "img/porsche4.jpg",
      content : "<p>Customers will participate in two (2) sessions per day – roughly a 4 hour experience. There will be a brief classroom session and then participants are put into 3 groups that will rotate throughout the session (street drive, lead /follow and autocross).</p><p class=\"exp-card-tagline\">Autocross: Performance & value of a Cayman with minimal options</p><p class=\"exp-card-tagline\">Lifestyle Drive: Versatility, quality and cutting edge technology of the new E3 Cayenne and 2019 Macan</p><p class=\"exp-card-tagline\">Lead / Follow: Panamera as a \"Sports Sedan\", a true Sports Car for every day. Showcasing the halo model in our lineup, the 911</p><p class=\"exp-card-tagline\">Hot Laps: PHEV as a benefit to Performance vs. solely \"Economy.\" The incredible Performance level of our top-trim Panamera</p>",
      keepinmind : [
        "Summit Point",
        "Summit Point, West Virginia",
        "September 27-29, 2019"
      ],
      partnerdetails : "<p>N/A</p>"
    }
  ];

} (window));