import axios from "axios";

const mt5RatingsService = {
  getWidgets: async (orderBy = "rank", order = "asc", filter, skip) => {
    return axios.get("https://ratings-mt5.tiomarkets.com/api/rating/1", {
      params: {
        $top: 10,
        $skip: skip,
        $filter: filter,
        $orderby: `${orderBy} ${order}`,
        $count: true,
        widget_key: "mt5_ratings",
      },
    });
  },
};

export default mt5RatingsService;
