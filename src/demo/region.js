export default {
  id: "1",
  name: "Demo Region w/ DMAs and Locations",
  type: "location",
  locations: [
    {
      id: "1",
      country: "United States",
      state: "Washington",
      city: "Seattle",
      zipCode: ""
    },
    {
      id: "2",
      country: "United States",
      state: "Washington",
      city: "Bellevue",
      zipCode: "98007"
    },
    {
      id: "3",
      country: "United States",
      state: "Washington",
      city: "Everett",
      zipCode: ""
    }
  ],
  designatedMarketAreas: [
    {
      country: 'United States',
      areas: [
        {
          id: "sea",
          name: "Greater Seattle, WA Area"
        },
        {
          id: "tac",
          name: "Greater Tacoma, WA Area"
        },
        {
          id: "oly",
          name: "Greater Olympia, WA Area"
        }
      ]
    },
    {
      country: 'Canada',
      areas: [
        {
          id: "1",
          name: "Greater Vancouver, BC Area"
        },
        {
          id: "2",
          name: "Greater Richmond, BC Area"
        },
      ]
    }

  ]
};
