const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add Venteflash - Test Case -------------------- ", () => {
    it("Add Venteflash function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/coach/create/64ce88929c7f3435e0e83898")
      //  .set('Authorization','Bearer'+authToken)
        .send({reduction:10, date:"2023-09-06"})
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

describe(" -------------------- Find all Venteflash - Test Case -------------------- ", () => {
    it("Find Venteflash function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/venteflash/retrieve")
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
describe(" -------------------- Find  Venteflash - Test Case -------------------- ", () => {
    it("Find one Venteflash function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/venteflash/retrieveOneFlash/64ce88929c7f3435e0e83898")
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