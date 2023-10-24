const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);



  describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/seasons/retrieve")
      //  .set('Authorization','Bearer'+authToken)
        .end(function (err, res) {
          if (err) {
            console.log(err.text);
          } else {
            console.log(res.text);
            done();
          }
        });
    });
  });


  describe("Add new - Test Case", () => {
    it("Add new function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .post("/seasons/create")
        .send({name : 'test2'})
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
        .put("/seasons/update/64cefe7e633bd0191c6d055b")
        .send({name : 'test updated'})
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