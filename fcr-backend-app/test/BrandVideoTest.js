const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe("Add new - Test Case", () => {
    it("Add new function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .post("/brandvideo/create")
        .send({linkvideo : 'testlink'})
        .end(function (err, res) {

          if (err) {
            console.error("Error", err); 
            done(err);
          } else {
            console.log("Res : " + res.text);
            done(); 
          }
        });
    });
  });


  describe("Update - Test Case", () => {
    it("Update function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .get("/brandvideo/retrieve")
        .end(function (err, res) {

          if (err) {
            console.error("Error", err); 
            done(err);
          } else {
            console.log("Res : " + res.text);
            done(); 
          }
        });
    });
  });


