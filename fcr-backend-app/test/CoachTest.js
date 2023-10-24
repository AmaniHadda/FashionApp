const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add coach - Test Case -------------------- ", () => {
    it("Add Coach function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/coach/create")
      //  .set('Authorization','Bearer'+authToken)
        .send({email:"Email here", name:"test baher",phone:"93556898"})
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
describe(" -------------------- Find all coach - Test Case -------------------- ", () => {
    it("Find Coach function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/coach/getall")
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
describe(" -------------------- Enable  coach - Test Case -------------------- ", () => {
    it("Enable Coach function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .put("/coach/enable/64caaced5a944233e46b8903")
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
describe(" -------------------- Search coach - Test Case -------------------- ", () => {
    it("Search Coach function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/coach/search/test")
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