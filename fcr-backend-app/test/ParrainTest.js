const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add parrain - Test Case -------------------- ", () => {
    it("Add Parrain function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/parrain/AjouterParrain")
      //  .set('Authorization','Bearer'+authToken)
        .send({email:"Email here",phone:"93556898"})
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.text);
            done();
          }
        });
    });
  });
  describe(" -------------------- Find all parrain - Test Case -------------------- ", () => {
    it("Find Parrain function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/parrain/retrieveParrain")
      //  .set('Authorization','Bearer'+authToken)
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.text);
            done();
          }
        });
    });
  });
  describe(" -------------------- Disable parrain - Test Case -------------------- ", () => {
    it("Disable Parrain function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/parrain/disableP/64cd93b298de752324ea5341")
      //  .set('Authorization','Bearer'+authToken)
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.text);
            done();
          }
        });
    });
  });
  describe(" -------------------- Search parrain - Test Case -------------------- ", () => {
    it("Search Parrain function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/parrain/searchP/test")
      //  .set('Authorization','Bearer'+authToken)
        .end(function (err, res) {
          if (err) {
            console.log("Error",err.text);
          } else {
            console.log("Res : "+res.text);
            done();
          }
        });
    });
  });