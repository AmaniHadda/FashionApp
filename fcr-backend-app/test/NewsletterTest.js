const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);


describe("Add new - Test Case", () => {
    it("Add new function", function (done) {
      this.timeout(10000);

      chai
        .request("http://127.0.0.1:5002")
        .post("/subscribe/addSubscriber")
        .send({email : 'mohamedamine.laribi@esprit.tn'})
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
