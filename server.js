const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.post("/search", (req, res) => {
  let url = "https://collectionapi.metmuseum.org/public/collection/v1";
  axios
    .get(`${url}/search`, { params: { q: req.body.q } })
    .then(response => {
      const promises = response.data.objectIDs
        .slice(0, 19)
        .map(id => axios.get(`${url}/objects/${id}`));
      return promises;
    })
    .then(async response => {
      const res = await Promise.all(response);
      return res.map(response => response.data);
    })
    .then(response => {
      const pluckedResponse = response.map(item => {
        return {
          title: item.title,
          objectID: item.objectID,
          department: item.department,
          culture: item.culture,
          origin: item.region
            ? `${item.country} - ${item.region}`
            : item.country,
          date: item.objectDate,
          dimensions: item.dimensions,
          creditLine: item.creditLine,
          medium: item.medium,
          primaryImageSmall: item.primaryImageSmall,
          objectURL: item.objectURL,
          location: item.repository,
          images: item.additionalImages,
          tags: item.tags
        };
      });
      return res.send(pluckedResponse);
    })
    .catch(err => {
      console.log(err);
      return res.send([]);
    });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("SERVER RUNNING ON 8080");
});
