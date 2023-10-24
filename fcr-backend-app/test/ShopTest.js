const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe(" -------------------- Add shop - Test Case -------------------- ", () => {
    it("Add Shop function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .post("/shop/shops")
      //  .set('Authorization','Bearer'+authToken)
        .send({titre:"Titre here", description:"test baher",heure1:"1111",heure2:"5555",lienMap:""})
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
describe(" -------------------- Find all shop - Test Case -------------------- ", () => {
    it("Find Shop function ", function (done) {
      this.timeout(10000);
      chai
        .request("http://127.0.0.1:5002")
        .get("/shop/shops")
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