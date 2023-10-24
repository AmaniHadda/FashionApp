const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);



  describe(" -------------------- Find all   - Test Case -------------------- ", () => {
    it("Fetch all  function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/brands/retrieve")
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
        .post("/brands/create")
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
        .put("/brands/update/64803c57bf99874c38637342")
        .send({name : 'test'})
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